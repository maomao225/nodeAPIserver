// 守护程序// watchDog.js
// 看门狗


//========================================
//  守护程序
//  今天讲讲如何创建守护进程，保证我们写的程序在crush之后自动重启
//  这次的主角是 child_process.fork(modulePath, [args], [options])
//  fork函数可以直接运行的node模块，是spawn函数的封装，与spawn函数不同的是，
//  fork之后的子进程与父进程之间会建立IPC管道，用于进程之间的通信，并返回子进程的实例，
//  该实例拥有node进程所有属性与方法。child_process.fork(‘./helloWork.js’); 
//  与 child_process.spawn(‘node’,[‘./helloWork.js’]) 很相似，不同的就是fork建立了IPC管道。
//  守护进程要做的事儿，就是启动被守护进程，并监听其运行状态，在被守护进程关闭后再次启动，
//  同时，守护进程退出时自动杀掉全部的子进程。
// 
//  针对以上需求，思路应该是：
//      ->启动守护进程
//      ->依次启动各个子进程，并将返回的object进程实例存下来
//      ->监听子进程的exit事件
//      ->触发子进程exit事件后再次启动子进程
//      ->监听守护进程exit事件,退出时杀死所有子进程
//==========================================


var fork = require('child_process').fork;
var cpus = require('os').cpus();


//保存被子进程实例数组
var workers = {};
//这里的被子进程理论上可以无限多
// var appsPath = ['./child1.js','./child2.js','./child2.js'];
var appsPath = ['./index.js'];
var createWorker = function(appPath){
    //保存fork返回的进程实例
    var worker = fork(appPath);
    //监听子进程exit事件
    worker.on('exit',function(){
        console.log('worker:' + worker.pid + 'exited');
        delete workers[worker.pid];
        createWorker(appPath);
    });
    workers[worker.pid] = worker;
    console.log('Create worker:' + worker.pid);
}
//启动所有子进程
for (var i = appsPath.length - 1; i >= 0; i--) {
    createWorker(appsPath[i]);
};
//父进程退出时杀死所有子进程
process.on('exit',function(){
    for(var pid in workers){
        workers[pid].kill();
    }
})




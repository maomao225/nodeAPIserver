//findPassword.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');

module.exports = (req, res ,next) => {
	var userName = req.body.username;
	var token = req.body.code;
	var password = req.body.password;
	//{"status":1,"message":"success","data":{"note":"验证码发送成功"}}
	//{"status":0,"message":"过于频繁"}
	var url = conf.javaApi.userUrl+"/user/resetPwd?ucToken="+conf.javaApi.ucToken;
	var rData = {status:0,message:""};
	//console.log(reception+" ^^^^^^ "+type);
	request.post(url).send({
		 	userName:userName,
		 	token:token,
		 	password:password
		 	}).then(dd=>{	     	
	    	if(dd.body.status){
	    		var status = parseInt(dd.body.status);
	    		if(status==200){
	    			rData.status=1;
	    			rData.message="success";
	    		}else if(status==301){
	    			rData.message = "验证码错误！";
				}else if(status==402){
	    			rData.message = "用户不存在！";
				}else{
					rData.message = "找回失败！";
				}
				res.send(rData);
	    	}else{
	    		rData.message = "找回失败！";
	    		res.send(rData);
	    	}
		 }).catch(e=>{
		 	//console.log(e)
		 	rData.message = e.text;
	    	res.send(rData);
	     })  
}
//submit.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');
const redis = require('redis');

module.exports = (req, res ,next) => {
	var userName = req.body.username;
	var password = req.body.password;
//console.log(userName+"%%%%%%%"+password);
	var url = conf.javaApi.userUrl+"/vcglogin/access";

	var rData = {"status":1,"message":"success","data":{}};
	 request.post(url).send({ "userName": userName,"password": password })
	    .then(function(dd){	    	
	    		
	    		var status = parseInt(dd.body.status);
				if(status==200&&dd.body.TGT){
	    			var tgt = dd.body.TGT;
	    			
					request.get(conf.javaApi.userUrl+"/user/getUserByTGT").query({ucToken:conf.javaApi.ucToken}).query({tgt:tgt}).then(function(aa){
						var dd2 = aa.body;
						
						if(parseInt(dd2.status)==200){
							rData.data.uid = dd2.data.userId;
							rData.data.username = dd2.data.userName;
							rData.data.token = tgt;
							if(dd2.data.realName){
								rData.data.name = dd2.data.realName;
							}else if(dd2.data.mobile){
								rData.data.mobile = dd2.data.mobile;
							}else if(dd2.data.email){
								rData.data.email = dd2.data.email
							}
							var client = redis.createClient(conf.Redis.RDS_PORT,conf.Redis.RDS_HOST,conf.Redis.RDS_OPTS);
							client.select('1', function(error){
							    if(error) {
							        //console.log(error);
							    } else {
							        client.set(tgt, JSON.stringify(rData), function(error, res) {
							        	client.expire(tgt, 86400);
							        	client.quit();
							        });
							    }
							});
							res.send(rData);
						}else{
							//{"status":0,"message":"用户名或密码错误","data":{"uid":0}}
							rData.status=0;
							rData.message='获取用户信息错误';
							rData.data={"uid":0};
							res.send(rData);
						}
					});
	    		}else if(status==401){
	    			rData.status=0;
					rData.message='用户名或密码错误';
					rData.data={"uid":0};
					res.send(rData);
	    		}else if(status==402){
	    			rData.status=0;
					rData.message='用户名不存在';
					rData.data={"uid":0};
					res.send(rData);
	    		}else if(status==404){
	    			rData.status=0;
					rData.message='用户名或密码不能为空';
					rData.data={"uid":0};
					res.send(rData);
	    		}	
	    	}
	    ).catch(function(e){
	    	rData.status=0;
			rData.message='登录接口访问错误';
			rData.data={"uid":0};
			res.send(rData);
	    });
};

//rePassword.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');
const redis = require('redis');

module.exports = (req, res ,next) => {
	var oldPassword = req.body.oldPassword;
	var password = req.body.password;
	var rePassword = req.body.rePassword;
	var apiToken = req.query.api_token;

	var rData = {status:0,message:""};
	if(password!==rePassword){
		rData.message="两次密码输入不一致。";
		res.send(rData);
	}else{
		var client = redis.createClient(conf.Redis.RDS_PORT,conf.Redis.RDS_HOST,conf.Redis.RDS_OPTS);
			client.select('1', function(error){
				if(error) {
							//console.log(error);
					}else {
						client.get(apiToken,function(err,reply){
					    	if(!err){
					    		if(reply){
					    			var rObj = JSON.parse(reply);
					    			console.log("ididididid:"+rObj.id);
					    			var url = conf.javaApi.userUrl+"/user/resetPwd?ucToken="+conf.javaApi.ucToken;
					    			var param = {id:rObj.id,newPassword:password,oldPassword:oldPassword};
					    			request.post(url).send(param).then(dd=>{	
					    				console.log(dd.body);
					    				if(dd.body.status){
								    		var status = parseInt(dd.body.status);
								    		if(status==200){
								    			rData.status=1;
								    			rData.message="success";
								    		}else if(status==422){
								    			rData.message = "原密码错误。";
											}else{
												rData.message = "找回失败！";
											}
											res.send(rData);
								    	}else{
								    		rData.message = "server error";
								    		res.send(rData);
								    	}
					    				})
					    			}else{
					    				rData.message="未登录。";
					    				res.send(rData);
					    			}	
					    		}else{
					    			console.log("redis get err");
					    			rData.message="redis error";
					    			res.send(rData);
								}
							});
						}
				});
	}
}
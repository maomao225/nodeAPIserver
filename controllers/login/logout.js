//logout.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');
const redis = require('redis');

module.exports = (req, res ,next) => {
	var api_token=req.query.api_token;

	var url = conf.javaApi.userUrl+"/vcglogin/logout";
	var rData = {status:0,message:""};
 	request.get(url).query({TGT:api_token}).then(result=>{	    	
	    		var status = parseInt(result.body.status);
				if(status==200){
					//rData.status = 1;
					//rData.message = "success";
				var client = redis.createClient(conf.Redis.RDS_PORT,conf.Redis.RDS_HOST,conf.Redis.RDS_OPTS);
					client.select('1', function(error){
					if(error) {
							rData.message = "Redis connect failed";
							res.send(rData);
						}else {
							client.del(api_token,function(err,reply){
								if(err){
									rData.message = "redis del failed";
									res.send(rData);
								}else{
									rData.status = 1;
									rData.message = "success";
									res.send(rData);
								}
							});      
						}
					})
				}else{
					rData.message = "Logout failed.";
					res.send(rData);
				}
	}).catch(e=>{
		rData.message = "Logout failed.";
		res.send(rData);
	})
}
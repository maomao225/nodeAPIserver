//userIsExist.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');

module.exports = (req, res ,next) => {
	var username=req.query.username;
	var url = conf.javaApi.userUrl+"/user/userIsExist";
	var rData = {status:0,message:""};
 	request.get(url).query({
		 	loginname:username,
		 	ucToken:conf.javaApi.ucToken
		 	}).then(result=>{	    	
	    		var status = parseInt(result.body.status);
				if(status==200){
					rData.status = 1;
					rData.message = "The user is not exist.";
				}else if(status==403){
					rData.status = 2;
					rData.message = "用户已存在，请使用其它账号注册.";
				}else{
					rData.message = "请求失败，请稍后重试.";
				}
				res.send(rData);
	}).catch(e=>{
		rData.message = "请求失败，请稍后重试.";
		res.send(rData);
	})
}
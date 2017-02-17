//sendEmailCode.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');

module.exports = (req, res ,next) => {
	var email = req.body.email;
	//{"status":1,"message":"success","data":{"note":"验证码发送成功"}}
	//{"status":0,"message":"过于频繁"}
	var url = conf.javaApi.userUrl+"/message/sendsms";
	var rData = {status:0,message:""};
	//console.log(reception+" ^^^^^^ "+type);
	request.get(url).query({
		 	email:email,
		 	content:"视觉中国",
		 	codeToken:"39bbc5b2f4714aac949d9d9f7300f2763"
		 	}).then(dd=>{	     	
	    	if(dd.body.status){
	    		var status = parseInt(dd.body.status);
	    		if(status==200){
	    			rData.status=1;
	    			rData.data={"note":"验证码发送成功"};
	    		}else if(status==414||status==424){
	    			rData.message = "发送过频繁，稍微重发。";
				}else{
					rData.message = "error";
				}
				res.send(rData);
	    	}else{
	    		rData.message = "error";
	    		res.send(rData);
	    	}
		 }).catch(e=>{
		 	//console.log(e)
		 	rData.message = e.text;
	    	res.send(rData);
	     })  
}
//register.js
const conf = require('../../conf.js')[process.env.NODE_ENV || 'development'];
const request = require('superagent');
const mysql = require('../../mysql.js');

module.exports = (req, res ,next) => {
	var userName = req.body.mobile;
	var code = req.body.code;
	var password = req.body.password;
	var name = req.body.name;
	var type = req.body.type;
	var company = req.body.company;
	var companyType= req.body.companyType;

	var param = {};
	if(userName){
		param.userName = userName;
		param.mobile = userName;
	}
	if(code){
		param.mobiletoken = code;
	}
	if(password){
		param.password = password;
	}
	if(name){
		param.realName = name;
	}
	param.userFrom = 9;
	param.userType = type==1?2:1;

	//{"status":1,"message":"success","data":{"note":"验证码发送成功"}}
	//{"status":0,"message":"过于频繁"}
	var url = conf.javaApi.userUrl+"/user/register?ucToken="+conf.javaApi.ucToken;
	var rData = {status:0,message:""};

	request.post(url).send(param).then(dd=>{	     	
	    	if(dd.body.status){
	    		var status = parseInt(dd.body.status);
	    		if(status==200){
	    			rData.status=1;
	    			var uId = dd.body.userId;
	    			mysql.getMicroUsersAuthConncetion().then(connection=>{
						var sql1 = "select * from users where user_id = '"+uId+"'";
	    				connection.query( sql1, function(err, resultData) {
					    if(err){
							//reject({code:200,message:'error',error:err.message,data:{}});
							console.log("QueryError:",err.message);
							throw err;
					    }else{
					    	if(resultData.length<=0){
					    		var sql2;
					    		var sqlParam = [uId,type,name,name]
					    		if(type==1){
					    			sqlParam.push(company);
					    			sqlParam.push(companyType);
					    			sql2 = "insert into users (user_id,type,display_name,nick_name,company,company_type) values(?,?,?,?,?,?)";
								}else{
					    			sql2 = "insert into users (user_id,type,display_name,nick_name) values(?,?,?,?)";
					    		}
					    		connection.query( sql2,sqlParam,function(err, resultData) {
					    			connection.release();
					    		})
							}else{
								connection.release();
					    	}
						}
					 });
				});

				}else if(status==404){
	    			rData.message = "手机、邮箱、用户名不能为空";
				}else if(status==423){
	    			rData.message = "密码不能为空";
				}else if(status==408){
	    			rData.message = "用户名已存在";
				}else if(status==411){
	    			rData.message = "手机不能为空";
				}else if(status==500){
	    			rData.message = "服务器错误";
				}else if(status==301){
	    			rData.message = "手机验证码错误";
				}else{
					rData.message = "服务器错误";
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
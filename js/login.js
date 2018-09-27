 $(function(){
 	$("#login").click(function(){
 		
 		$.ajax({
 			type:"post",
 			async:"true",
 			url:"http://47.104.244.134:8080/userlogin.do",
 			data:{
 				"name":$("#txt").val(),
 				"password":$("#pw").val()
 			},
 			success:function(data){
 				console.log(data);
 				if(data.msg=="OK"){
 					alert("登录成功");
		 				//$("window").attr("location","../index.html");
		 				
						var otoken=data.data.token;
						//console.log(otoken);
						$.cookie("tk",otoken);
						
						location.href="../index.html";
	 				} else{
	 					alert("用户名或密码错误，请重新登录");
	 				}
 				
 			}
 		})
 		
 	})
 })

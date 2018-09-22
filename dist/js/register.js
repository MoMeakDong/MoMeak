$(function(){
	
	//验证
	//email 
	var flag1;
	var flag2;
	var flag3;
	var flag4;
	$("#txt").change(function(){
		var str1=/^[a-zA-Z0-9_-]{5,16}$/;
		var val1=$(this).val();
		if(str1.test(val1)){
			flag1=true;
		}else{
			alert("用户名格式有误，请重新输入");
			//$(this).empty();
			flag1=false;
			$(this).focus();
			
		}
	});
	$("#pw").change(function(){
		var str2=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){6,12}$/
		var val2=$(this).val();
		if(str2.test(val2)){
			flag2=true;
		}else{
			flag2=false;
			alert("密码格式有误，请重新输入");
			$(this).focus();
		}
	});
	$("#email").change(function(){
		var str3= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		var val3=$(this).val();
		if(str3.test(val3)){
			flag3=true;
		}else{
			flag3=false;
			alert("格式错误，请输入正确格式！");
			$(this).focus();
		}
	});
	//sexy
	$("#sexy").change(function(){
		var val4=$(this).val();
		if(val4=="男" || val4=="女"){
			flag4=true;
		}else{
			flag4=false;
			alert("请输入“男”或“女”！");
			$(this).focus();
		}
	});
	$("#check").click(function(){
		if(flag1 && flag2 && flag3 && flag4 && $(this).prop("checked")){
			$("#reg").css({"background":"springgreen"});

		}else{
			$("#reg").css({"background":"#ddd"});	
		}
	});
	
	//接口
	$("#reg").click(function(){
		$.ajax({
			type:"post",
			async:"true",
			url:"http://47.104.244.134:8080/usersave.do",
			data:{
				"username":$("#txt").val(),
				"password":$("#pw").val(),
				"email":$("#email").val(),
				"sex":$("#sexy").val()
				},
			success:function(data){
				console.log(data);
				if(data.msg=="成功"){
					alert("注册成功");
					$(location).attr("href","login.html");
				}else{
					alert("用户名重复，请重新注册");
				}
			}
			
		})
		/*$.post("http://47.104.244.134:8080/usersave.do",{
					"username":$("#txt").val(),
					"password":$("#pw").val(),
					"email":$("#email").val(),
					"sex":$("#sexy").val()
				},function(data){
					console.log(data);
				})*/
	})
	
	
	
})

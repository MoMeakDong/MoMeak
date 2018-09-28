$(function(){
	//给top的ul li加滑过事件
	$("#right li:not(:eq(6)) a").hover(function(){
		$(this).css({"color":"blue"})
	},function(){
		$(this).css({"color":"#666"})
	});
	
	//nav上div
	$(".nav .side div").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");	
	})
	
	//side
	$("#side li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	
	//获取登陆的token值---tk
		var tk=$.cookie("tk");
		//console.log(tk);
		
	//获取商品列表
	$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/cartlist.do",
			async:true,
			data:{
				token:tk
			},
			success:function(data){
				console.log(data);
				var str = "";
				var str2=0;
					for(var i = 0 ; i < data.length ;i++){
						str += `<li>
							<input type="checkbox" id="chec" />
							<div class="oimg">
								<img class="Img" src="${data[i].goods.picurl}"/>
							</div>
							<p>${data[i].goods.name}</p>
							<h3>￥<i>${data[i].goods.price}</i></h3>
							<div class="onum">
								<span class="jian">-</span>
								<p class="num" gid="${data[i].gid}" data-id="${data[i].id}">${data[i].count}</p>
								<span class="jia">+</span>
							</div>
							<button count="${data[i].count}">删除商品</button>
							
						</li>`
						str2+=data[i].count;
					}
					$("#list").append(str);
					
					$(".shopcar").html(str2);
					
					$.cookie("num",str2);						
		}	
	});


//  多选
$("#all").click(function(){
	$("#list input").prop("checked",$(this).prop("checked"));					
	var sum=0;
	for(let i=0;i<$("#list li").length;i++){
		var pr=parseInt($("#list li").eq(i).find("i").text());
		var nm=parseInt($("#list li").eq(i).find(".num").text())
		sum+=parseInt(pr*nm);
	}
	$("#listwrap .end span").html(sum);
});

$("#list").on("click","input",function(){
	if($("#list input:checked").length==$("#list input").length){
		$("#all").prop("checked",true);
	}else{
		$("#all").prop("checked",false);
	}
	//结算
	CN();
})
			
			
//加减，删除//修改购物车	
//加	的点击事件
$("#list").on("click",".jia",function(){
	var gid=$(this).prev("p").attr("gid");
	var id=$(this).prev("p").attr("data-id");
	//console.log(gid,id)
				
	var num = parseInt($(this).prev("p").text())+1;
	$(this).prev("p").text(num);
	var count=parseInt($.cookie("num"))+1;
	$.cookie("num",count);
	$(".shopcar").text(count);
	//请求ajax
	$.ajax({
		type:"get",
			url:"http://47.104.244.134:8080/cartupdate.do",
			async:true,
			data:{
				id:id,
				gid:gid,
				num:1,
				token:tk
			},
			success:function(data){
				console.log(data);
				//结算
				CN();
			}	
	})
})
//减的点击事件			
$("#list").on("click",".jian",function(){
	var gid=$(this).next("p").attr("gid");
	var id=$(this).next("p").attr("data-id");
	//console.log(gid,id)
				
	var num = parseInt($(this).next("p").text());
	if(num<=1){
		num=1;
	}else{
		num--;
		var count=parseInt($.cookie("num"))-1;
		if(count>=1){
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/cartupdate.do",
				async:true,
				data:{
					id:id,
					gid:gid,
					num:-1,
					token:tk
				},
				success:function(data){
				console.log(data);
					//结算
					CN();
				}
			});
		}
		$.cookie("num",count);
		$(".shopcar").text(count);
	}
	$(this).next("p").text(num);
})						
			
//删除的点击事件			
$("#list").on("click","button",function(){
	//从cookie中减去这个商品的件数
	var count=parseInt($.cookie("num"))-parseInt($(this).attr("count"));
	$.cookie("num",count);
	$(".shopcar").text(count);				
	var gid=$(this).prev(".onum").find(".num").attr("gid");
	var id=$(this).prev(".onum").find(".num").attr("data-id");
	//console.log(gid,id)
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/cartupdate.do",
		async:true,
		data:{
			id:id,
			gid:gid,
			num:0,
			token:tk
		},
		success:function(data){
			console.log(data);
			window.location.reload();
			//结算
			CN();
		}
	})
})		

//封装结算函数
function CN(){
	var sum=0;
	//遍历每一个li,取每一个li,判断prop为true的条件下，取它的价格，和数量相乘，求和
	console.log($("#list li").length)
	for(let i=0;i<$("#list li").length;i++){
		console.log("aaa");
		if($("#list li").eq(i).find("input").prop("checked")){
			var pr=parseInt($("#list li").eq(i).find("i").text());
			var nm=parseInt($("#list li").eq(i).find(".num").text())
			sum+=parseInt(pr*nm);
		}
	}					
	$("#listwrap .end span").html(sum);	
}	

})

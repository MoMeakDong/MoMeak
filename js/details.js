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
	
	
	
	
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbyid.do",
		async:true,
		data:{
			//给li即每个商品加点击事件，点击谁获取并保存谁的id，再把id传过来
			//问题，怎么把在list上得到的id，传到这个页面
			//点击事件中存cookie，在这里取cookie，放进data；
			id:$.cookie("id")
		},
		success:function(data){
			console.log(data);
			var str="";
			str=`
				<img src="${data.picurl}" />
				<p>${data.name}</p>
				<span>￥${data.price}</span>
				<em>加入购物车</em>
			`
			$("#good").append(str);
		}
		
		
	})
})

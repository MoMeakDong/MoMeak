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
	
	
	$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/goodsbytid.do",
				async:true,
				data:{
					tid:13,
					page:1,
					limit:12
				},
				success:function(data){
					console.log(data);
					data = data.data;
					var str = "";
					for(var i = 0 ; i < data.length ;i++){
						str += `<li>
							<img src="${data[i].picurl}"/>
							<p>${data[i].name}</p>
							<h3>￥${data[i].price}</h3>
							<a id = "${data[i].id}" href="details.html">查看详情</a>
							<span><a href="goodscar.html">加入购物车</a></span>	
						</li>`
					}
					$("._ul").html(str);
			}
		
	})
	
	//给每一页加点击事件，点击第几页请求第几页的数据；
	$("button").click(function(){
		//console.log($(this).html());
		$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/goodsbytid.do",
				async:true,
				data:{
					tid:13,
					page:$(this).html(),
					limit:12
				},
				success:function(data){
					data = data.data;
					var str = "";
					for(var i = 0 ; i < data.length ;i++){
						str += `<li>
							<img src="${data[i].picurl}"/>
							<p>${data[i].info}</p>
							<h3>￥${data[i].price}</h3>
							<a id = "${data[i].id}" href="details.html">查看详情</a>
							<span><a href="goodscar.html">加入购物车</a></span>	
						</li>`
					}
					$("._ul").html(str);
				}
			})			
		})
	//给li即每个商品加点击事件，点击谁获取并保存谁的id，把id存进cookie
	$("._ul").on("click","a",function(){
		var oid=$(this).attr("id");
		//console.log(oid);
		$.cookie("id",oid);
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//side
	$("#side li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})

	
	
})

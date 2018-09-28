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
	//
	$("#goodlist span").click(function(){
		$(this).addClass("bgblue").siblings().removeClass("bgblue");
	})
	
	
	$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/goodsbytid.do",
				async:true,
				data:{
					tid:13,
					page:1,
					limit:6
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
					limit:6
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
	
	//购物车数量
	var cc=$.cookie("num");
	$(".shopcar").html(cc);

	//定义一个对象，去保存id和数量{id:num,id:num}，以对象的形式存到cookie中
			// 判断cookie里有没有存过数据，有就用，没有就赋值为{}
			/*var count=0;
			if($.cookie("cart")){
				var obj=JSON.parse($.cookie("cart"));//将json字符串转换成对象
			}	else{
				var obj={};
			}
			//遍历obj，取每一个id对应的num，求和
			for(ver i in obj){
				count+=obj[i];
				//console.log(typeof(obj[i]));
				//console.log(count)//取所有商品所加购物车里的数量
			}
			$(".shopcar").html(count);
			
			//添加一个点击事件，每次点input的时候取id和num，          保存到obj中
			$("#good").on("click",".jian",function(){
				
				
			})
			/*for(var i = 0; i < oInputs.length; i++) {
				oInputs[i].onclick = function() {
					//建立对象的属性名为id
					var oId = this.getAttribute("in-id");
					if(obj[oId] == undefined) { //对象里没有存这个id，因为没有点击过这个，第一次点，属性值为次数
						obj[oId] = 1;
					} else {
						obj[oId]++; //不为undefined说明不是第一次点，点一次，次数加加
					}
					//把对象存入cookie中
					//console.log(obj);
					var objTostr = JSON.stringify(obj);
					setCookie("cart", objTostr, 7);
					//console.log(getCookie("cart"));

					//在购物篮中显示 
					carNum.value = ++count;
				}
			}

			//跳转到购物车
			carNum.onclick = function() {
				location.assign("cart.html");
			}

			//商品列表页中的数据来自后台
			//在js里定义一组商品
			//var data = [{},{},{},{},{}];
			//通过数据去生成html结构

			//点击一下添加购物车按钮 ，购物篮中的数量+1

			//从购物篮点击 进入 cart.html

			//cart页面显示添加过的商品以及商品数量

			//cookie  cart 10001 1  10002 4 10003 1
*/
	
})

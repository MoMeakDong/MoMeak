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
				<div id="zoombox">
					<div class="zoom"></div>
					<img src="${data.picurl}" />
				</div>
				<div class="xinxi">
					<p>${data.name}</p>
					<span>￥${data.price}</span>
					<div>
						<span class="jian">-</span>
						<p class="num">0</p>
						<span class="jia">+</span>
					</div>
					<em id="${data.id}">加入购物车</em>
				</div>
				<div id="bigarea"><img src="${data.picurl}" /></div>
			`
			$("#good").append(str);
		}
	})
	
	//放大镜
	$("#good").on("mouseover","#zoombox",function(){
//		console.log($(this));
		$(".zoom").css("display","block");
		$("#bigarea").css("display","block");
		
		
	})
	$("#good").on("mouseout","#zoombox",function(){
		$(".zoom").css("display","none");
		$("#bigarea").css("display","none");
	})
	
	
	$("#good").on("mousemove","#zoombox",function(e){
		var evt = e || event;
		var x = evt.pageX -$("#zoombox").offset().left -$(".zoom").width()/2;
		var y = evt.pageY -$("#zoombox").offset().top -$(".zoom").height()/2;
		if(x<=0){
			x=0;
		}
		if(y<=0){
			y=0;
		}
		if(x>=$("#zoombox").width()-$(".zoom").width()){
			x=$("#zoombox").width()-$(".zoom").width();
		}
		if(y>=$("#zoombox").width()-$(".zoom").width()){
			y=$("#zoombox").height()-$(".zoom").height();
		}
		
		$(".zoom").css({"left":x+"px","top":y+"px"});
		
		$("#bigarea img").css({"left":-x/250*600+"px","top":-y/270*600+"px"});
		
	})
	
	//加入购物车
	var count=0;
	$("#good").on("click",".jia",function(){
		count++;
		$(".xinxi .num").html(count);
	})
	$("#good").on("click",".jian",function(){
		
		if(count<=0){ count==0;
			}
		else{ count--;
			}
		$(".xinxi .num").html(count);
	})
	
	//点击加入购物车的时候，获取id :.num,存cookie;
	$("#good").on("click","em",function(){
		var oid=$(this).attr("id");
		var onum=$(".xinxi .num").text();
		
		//获取登陆的token值---tk
		var tk=$.cookie("tk");
		console.log(tk);
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/cartsave.do",
			async:true,
			data:{
				gid:oid,
				token:tk
			},
			success:function(data){
				//console.log(data);
				if(data.msg=="成功"){
					alert("加入购物车成功！");
				}else{
					alert("请重试！");
				}
			}
			
		});
	});	
	
	//购物车数量
	var cc=$.cookie("num");
	$(".shopcar").html(cc);
	
})

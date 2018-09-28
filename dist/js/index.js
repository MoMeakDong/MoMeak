$(function(){
	//给top的ul li加滑过事件
	$("#right li:not(:eq(6)) a").hover(function(){
		$(this).css({"color":"blue"})
	},function(){
		$(this).css({"color":"#666"})
	});
	
	
	//nav上div
	$(".nav .side div").mouseover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	
	
	//   轮  播   图
	$(".index").eq(0).fadeIn();
	$("#banwrap").css("background","#2c0345");
			
	var i = 0;
	var bgarr=["#2c0345","#1a1613","#fff8cc","#f59c02","#e7ecff"];
	var timer = setInterval(function(){
		move();
	},2000);
	
	function move(){
		i++;
		if(i>=$(".index").length){
			i = 0;
		}
		//console.log($(".index").length)
		$(".index").eq(i).fadeIn().siblings().fadeOut();
		$("#banwrap").css("background",bgarr[i]);
		$("#nums li").eq(i).addClass("hover").siblings().removeClass("hover");
	};
	
			//添加点击事件后，点击事件触发的定时器和自动的会重复
			//所以给banner加一个鼠标事件，鼠标进去，清除原自动的定时器
			//鼠标出来，重新加一个定时器
			$(".banner").hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(function(){
					move();
				},2000)
			})
			//添加角标
			$.each($("#nums li"), function(index,item) {
				$(this).hover(function(){
					i=index-1;
					console.log(index)
					move();
				})
				
			});
			//rBox中效果
			$(".rBox img").hover(function(){
				$(this).stop().animate({"left":-10},300);
			},function(){
				$(this).stop().animate({"left":0},300);
			})
			

	//conduct里li的滑过事件
	$("#conduct .time li").hover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	//动画
	$("#conduct #con img").hover(function(){
		$(this).stop().animate({"top":-15,"opacity":0.7},300);

	},function(){
		$(this).stop().animate({"top":0,"opacity":1},300);
	})
	$("#conduct #con a").hover(function(){
		$(this).stop().animate({"opacity":0.7},300)
	},function(){
		$(this).stop().animate({"opacity":1},100)
	})
	
	//foods中hover特效	
	$("#foods .foodnav li").mouseover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		$(this).find("div").stop().animate({"display":"block"},300);
		$(this).siblings().find("div").stop().animate({"display":"none"},200)
	});
	 $(".dog img").hover(function(){
			$(this).stop().animate({"left":-10},300);
		},function(){
			$(this).stop().animate({"left":0},300);
	})
	 $(".bom img").hover(function(){
			$(this).stop().animate({"left":-10},300);
		},function(){
			$(this).stop().animate({"left":0},300);
	})
	
	
	
	//photo
	$("#photowrap li").hover(function(){
			$(this).find("img").stop().animate({"top":-10},300);
			$(this).find("a").stop().animate({"top":-10},300);
			$(this).find("a").css("color","red");
		},function(){
			$(this).find("img").stop().animate({"top":0},300);
			$(this).find("a").stop().animate({"top":0},300);
			$(this).find("a").css("color","#444");
			
	})
	
	
	//side
	$("#side li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	})
	
	
	$("#doglist2 li").hover(function(){
		$(this).find("a").css("color","red");
	},function(){
		$(this).find("a").css("color","#444");
	})
	
	
	
	$("body").mouseenter(function(){
		//购物车数量
		var cc=$.cookie("num");
		console.log(cc);
		$(".shopcar").html(cc);
	})
	
	
})

	


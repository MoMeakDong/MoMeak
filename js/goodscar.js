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
							<h3>￥${data[i].goods.price}</h3>
							<div class="onum">
								<span class="jian">-</span>
								<p class="num">${data[i].count}</p>
								<span class="jia">+</span>
							</div>
							<button>删除商品</button>
							
						</li>`
						str2+=data[i].count;
					}
					$("#list").append(str);
					
					$(".shopcar").html(str2);
					
					$.cookie("num",str2);
					
			}	
	});

				//加减，删除
					$("#list").on("click",".jia",function(){
						var cou1=$(this).prev("p").text();
						cou1++;
						$(this).prev("p").html(cou1);
					})
					$("#list").on("click",".jian",function(){
						var cou2=$(this).next("p").text();
						
						
						if(cou2<=1){cou2=1;}
							else{ cou2--;}
						$(this).next("p").html(cou2);
					})
					$("#list").on("click","button",function(){
						$(this).prev(".onum").find(".num").html("0");
					})
					
			//多选
				$("#all").click(function(){
					$("#list input").prop("checked",$(this).prop("checked"));
					
				});
				$("#list").on("click","input",function(){
					if($("#list input:checked").length==$("#list input").length){
						$("#all").prop("checked",true);						
					}else{
						$("#all").prop("checked",false);
					}
				})
			//
			
	
})

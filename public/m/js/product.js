$(function(){
	
	var productid = CT.getParmsUrl().productId;
	getData(productid,function(data){
		console.log(data);
		//删除加载样式
		$(".logding").remove();
		
		$(".mui-scroll").html(template("proudcts",data));


		mui('.mui-slider').slider({
		  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
		});

		mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false
		});
		//尺码选择
		$(".btn_size").on("tap",function(){
		$(this).addClass("size_select").siblings().removeClass("size_select");
		});

		//加减按钮
		$(".p_number span").on("tap",function(){
			var $input = $(this).siblings("input");
			var number =  $input.val();
			var maxnumber = parseInt($input.attr("data-max"));
			if($(this).hasClass("jian")){
				if(number==0){
					return false;
				}
				number--;
			}else{
				if (number >= maxnumber) {
					setTimeout(function(){mui.toast("库存不足");},100);
					
					return false;
				}
				number++;
			}
			 $input.val(number);
		});

		$(".add_cart").on("tap",function(){
			var $sizeSelect = $(".btn_size.size_select");
			
			if(!$sizeSelect.length){
				mui.toast("请选择尺码");
				return false;
			}
			var $productNum = $(".p_number input").val();
			if ($productNum==0) {
				mui.toast("至少选择一件哦!");
				return false;
			}
			//发送请求
			CT.logingAjax({
				url:"/cart/addCart",
				type:"post",
				data:{productId:productid,num:$productNum,size:$sizeSelect.html()},
				dataType:"json",
				success:function(data){
					if (data.success == true) {
						location.href=CT.cartUrl;
					};
				}
			})

		})
	});


})

var getData = function(productId,callback){
	$.ajax({
		url:"/product/queryProductDetail",
		type:"get",
		data:{
			id:productId
		},
		dataType:"json",
		success:function(data){
			setTimeout(function(){
				callback&&callback(data);
			},1500);
			
		}
	})
}
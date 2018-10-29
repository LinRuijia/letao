$(function(){
	
	getData(CT.getParmsUrl().productId,function(data){
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
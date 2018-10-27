$(function(){
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false
});


getFirstCateData(function(data){
	$(".cate_left ul").html(template('firstCate',data));
	var cateid = $(".cate_left ul a").attr("data-id");
	getSecondCateData({id:cateid},function(data){
	console.log(data);
	$(".cate_right ul").html(template('secondCate',data));
	});
	//委托事件
	$(".cate_left").on("tap","li",function(){
		//如果当前点击了这个分类，则不再请求和渲染页面
		if ($(this).hasClass("active")) {return false;};
		//移除所有样式
		$(".cate_left ul li").removeClass("active");
		//点击样式
		$(this).addClass("active");
		//请求，渲染页面
		rend($(this).find("a").attr("data-id"));
	})
});

})

var getFirstCateData=function(callback){
	$.ajax({
		url:"/category/queryTopCategory",
		type:"get",
		success:function(data){
			callback && callback(data);
		}
	});
}
var getSecondCateData=function(parms,callback){
	$.ajax({
		url:"/category/querySecondCategory",
		type:"get",
		data:parms,
		success:function(data){
			callback && callback(data);
		}
	});
}
var rend = function(cateId){
	getSecondCateData({id:cateId},function(data){
	$(".cate_right ul").html(template('secondCate',data));
	});
}
$(function(){
	
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false
	});
	var urlParams = CT.getParmsUrl();
	var key = urlParams.key || "";
	//console.log(key.key);
	getData({proName:key,page:1,pageSize:4},function(data){
		console.log(data);
		
		$(".lt_pdt").html(template('list',data));
	});
})	
var getData = function(parms,callback){
	$.ajax({
		url:"/product/queryProduct",
		type:"get",
		data:parms,
		dataType:"json",
		success:function(data){
			callback && callback(data);
		}
	});
}

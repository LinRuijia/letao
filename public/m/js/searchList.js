$(function(){
	
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false
	});
	//接收url数据
	var urlParams = CT.getParmsUrl();
	var key = urlParams.key || "";
	$("input").val(key);
	/*自动加载则可以取消默认搜索
	//console.log(key.key);
	getData({proName:key,page:1,pageSize:6},function(data){
		//console.log(data);
		//模版数据
		$(".lt_pdt").html(template('list',data));
	});
*/
	//搜索事件
	$("#serach").on("tap",function(){
		getData({proName:$("input").val(),page:1,pageSize:4},function(data){
		console.log(data);
		setTimeout(function(){
			$(".lt_pdt").html(template('list',data));
		},1500);
		
		});
	});
	//排序按钮点击数据
	$(".lt_order a").on("tap",function(){
		var $this = $(this);
		var $orderspan = $(this).find("span");
		//改变样式
		//1.如果没有select样式，则加上select样式
		//2.点击默认样式是升序样式
		if (!$this.hasClass("select")) {
			//加上select样式
			$this.addClass("select").siblings().removeClass("select");
			//span默认升序样式
			$orderspan.removeClass("fa-angle-down").addClass("fa-angle-up");
		}else{
			//已有样式按钮的点击则切换样式
			if ($orderspan.hasClass("fa-angle-up")) {
				$orderspan.removeClass("fa-angle-up").addClass("fa-angle-down");

			}else{
				$orderspan.removeClass("fa-angle-down").addClass("fa-angle-up");
			}
		}
		//排序类型
		var dataOrder = $this.attr("data-order");
		/*	1升序
			2.降序
		*/
		var orderTypeVlue = $orderspan.hasClass("fa-angle-down")?2:1;
		//重新获取数据，并渲染模版
		var parms = {proName:$("input").val(),page:1,pageSize:4};
		parms[dataOrder] = orderTypeVlue;
		getData(parms,function(data){
		
		$(".lt_pdt").html(template('list',data));
		});
		//每次点击排序后下拉加载应该重置
		mui('#refresh').pullRefresh().refresh(true);
	});

	/*下来刷新*/
	mui.init({
		
		pullRefresh:{
			container:"#refresh",
			down:{
				auto:true,
			callback:function(){
				var that = this;

					getData({proName:key,page:1,pageSize:4},function(data){
					//console.log(data);
						setTimeout(function(){
						//模版数据
						$(".lt_pdt").html(template('list',data));
						that.endPulldownToRefresh();
						//mui("#refresh").pullRefresh().endPulldown();
						//上拉加载重置
						that.refresh(true);
						},1500);
					});
				}
			},
			up:{ 

      			callback :function(){
      				window.page ++;
      				var that = this;
      				var parms = {proName:key,page:window.page,pageSize:4}
      				var dataOrder = $(".lt_order a.select").attr("data-order");
					/*	1升序
						2.降序
					*/
					var orderTypeVlue = $(".lt_order a.select span").hasClass("fa-angle-down")?2:1;
					parms[dataOrder] = orderTypeVlue;
					getData(parms,function(data){
					//console.log(data);
						setTimeout(function(){
						//模版数据
						$(".lt_pdt").append(template('list',data));
						if (data.data.length) {
							that.endPullupToRefresh();
						}else{
							that.endPullupToRefresh(true);
						}
						
						//mui("#refresh").pullRefresh().endPulldown();
						},1500);
					});
				}
      		} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    	}
		

		
	});
 	mui('body').on('tap','a',function(){document.location.href=this.href;});
})	
//获取产品数据
var getData = function(parms,callback){
	$.ajax({
		url:"/product/queryProduct",
		type:"get",
		data:parms,
		dataType:"json",
		success:function(data){
			console.log(data);
			window.page = data.page;
			callback && callback(data);
		}
	});
}

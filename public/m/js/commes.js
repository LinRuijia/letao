window.CT={};
CT.getParmsUrl=function(){
	var parms = {};
	var search = location.search;

	if (search) {
		search = search.replace("?","");
		var arr = search.split("&");
		arr.forEach(function(item,i){
			var itemArr = item.split("=");
			parms[itemArr[0]] = itemArr[1];
		})
	};
	return parms;
}
CT.getFormData = function(fromData){
	var parms = {};
	var arr = fromData.split("&");
	arr.forEach(function(item,i){
		var itemArr = item.split("=");
		parms[itemArr[0]] = itemArr[1];
	});
	return parms;
}
CT.logingUrl = "user/login.html";
CT.cartUrl = "user/cart.html";
CT.indexUrl = "index.html";
CT.logingAjax=function(request){
	$.ajax({
				url:request.url,
				type:request.type,
				data:request.data,
				dataType:request.dataType,
				success:function(data){
					if(data.error== 400){
						location.href = CT.logingUrl + "?returnUrl="+location.href;
						return false;
					}else{
						request.success && request.success(data);
					}
				}
			})
}
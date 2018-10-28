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
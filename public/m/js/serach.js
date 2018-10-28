$(function(){
	$("#serach").on("tap",function(){
		var key =$.trim( $(".lt_header form input").val());
		if (!key) {
			//console.log("no");
			mui.toast("请输入关键词");
			return false;
		};
		location.href="searchList.html?key="+key;
	})
})
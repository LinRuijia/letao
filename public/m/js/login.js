$(function(){

	$("#login").on("tap",function(){
		var formData = $("form").serialize();
		var dataArr = CT.getFormData(formData);
		if(!dataArr.name){
			mui.toast("用户名不能为空哦");
			return false;
		}
		if(!dataArr.pass){
			mui.toast("密码不能为空哦");
			return false;
		}

		$.ajax({
			url:"/user/login",
			type:"post",
			data:{username:dataArr.name,password:dataArr.pass},
			dataType:"json",
			success:function(data){
				if (data.success == true) {
					var returnUrl = location.search.replace("?returnUrl=","");
					if (returnUrl) {
						location.href = returnUrl;
					}else{
						location.href = CT.indexUrl;
					}
				}else{
					mui.toast(data.message);
				}

			}
		});
	});
	
	
});
$(function(){
	$("#yjfkform").form({
		url :appPath+"/Hpwlm/insertAdvice",
		onSubmit : function() {
			$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.progress('close');
				$("#slider1").slider("restore");
			}
			return isValid;
		},
		success : function(result) {
			$.messager.progress('close');
			if (result) {
				$("#slider1").slider("restore");
				$("#yjfkform").form('clear');
				layer.close(layer.index);
				swalAlert('提交成功','反馈意见，已提交成功','success',2000);
			}else{
				swalAlert('提交失败','反馈意见，提交失败，请稍后重试','error',2000);
			}
		}
	});
	
	$("#slider1").slider({
		width:494,
		fontSize: 14,
		bgColor: "#33CC00", 
		textMsg: "请向右拖拽滑块，提交反馈意见！",
		successMsg: "正在提交反馈意见...",
		callback: function(result) {
			if(result){
				$('#yjfkform').submit();
			}
		}
	});
	
});
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script type="text/javascript">
    	$(document).ready(function(){
    		var appPath = '${ctx}';
    		$('#msg_ps').html(parent.BUILD_MSG_SHOW_PS);
    	});
    </script>
</head>

<body>
<div style="width:500px;text-align:center;overflow:hidden;height:600px;background:linear-gradient(-360deg, #ed825f 23%, #ea5146 111%);">
	<div style="position:relative;width:500px;height:300px;">
		<div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:2px solid #fff;margin-top:50px;">
			<i class="glyphicon glyphicon-remove" style="font-size:40px;color:#fff;margin-top:10px;margin-bottom:-10px;"></i>
			<div style="color:#fff;font-size:18px;">审核不通过</div>
		</div>
		<div class="waveWrapper waveAnimation">
			<div class="waveWrapperInner bgTop">
				<div class="wave waveTop" style="background-image: url('${ctx}/static/images/wave/wave-top.png')"></div>
			</div>
			<div class="waveWrapperInner bgMiddle">
				<div class="wave waveMiddle" style="background-image: url('${ctx}/static/images/wave/wave-mid.png')"></div>
			</div>
			<div class="waveWrapperInner bgBottom">
				<div class="wave waveBottom" style="background-image: url('${ctx}/static/images/wave/wave-bot.png')"></div>
			</div>
		</div>
	</div>
	<div style="height:300px;background:#fff;padding-top:40px;">
  		<h1><strong style="font-size:15px;font-weight:bold !important;">抱歉，您的申请未通过，具体原因如下：</strong></h1>
  		<div style="display:inline-block;width:270px;text-align:left;">
  			<h1><pre id="msg_ps"></pre></h1>
  		</div>
  		<h1><strong style="font-size:15px;font-weight:bold !important;">请按要求修改后重新申请或与学会联系！</strong></h1>
  	</div>
</div>
</body>
</html>
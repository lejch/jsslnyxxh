<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script type="text/javascript">
    	$(document).ready(function(){
    		window.parent.setIframeHeight(550);
    	});
    </script>
</head>

<body>
<div id="wlcmSpg">
	<div id="plTtleshow" class="plTtleshowd plTtswdadj">
		<li style="cursor:pointer;" onclick="parent.turnAthrPg(&quot;views/welcome/wlcmPg.jsp&quot;)">
        	<a href="javascript:void(0)">首页</a>
        	<div class="backTriangle"></div>
        	<div class="backTriangleBorder"></div>
        </li>
        <li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">正在建设</a><div class="backTriangle"></div></li>
	</div>
	<div style="text-align:center;">
		<div id="wlcmSpgTopTitle" style="margin-bottom:60px;margin-top:0px;margin-left:30px;color:#666;">网站功能正在建设中，敬请期待 ~</div>
		<img src="${ctx}/static/images/stillBuilding/sggcs.png" style="width:450px !important;"></img>
	</div>
</div>
</body>
</html>
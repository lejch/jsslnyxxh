<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script type="text/javascript" src="abortSociety.js"></script>
    <script>var appPath='${ctx}';</script>
</head>

<body>
<div id="wlcmlcContainer" style="position:relative;">
	<div id="wlcmPgBd" class="mainListCntDg">
        <div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">
        	<li style="cursor:pointer;" onclick="parent.turnAthrPg(&quot;views/welcome/wlcmPg.jsp&quot;)">
        	<a href="javascript:void(0)">首页</a>
        	<div class="backTriangle"></div>
        	<div class="backTriangleBorder"></div></li>
        		<li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">学会概况</a><div class="backTriangle"></div></li>
        	</div>
		<div class="mainArticleList">
			
		</div>
	</div>
	<div id="wlcmMlcd" class="mainListCntLd">
		<div class="mainListCntTitle">
			<div></div><i class="glyphicon glyphicon-flag"></i><span>关于学会</span>
		</div>
		<div class="navbarx navbarx_clk" type="0" onclick='abortSocietyCg(this)'>学会概况</div>
		<div class="navbarx" type="1" onclick='abortSocietyCg(this)'>组织架构</div>
	</div>
</div>
</body>
</html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	String type = request.getParameter("type");
	String IMGSHOW_PATHFIX=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX_NOPRJ");
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
	<link href="${ctx}/static/pagination/pagination.css" rel="stylesheet" />
    <script type="text/javascript" src="${ctx}/static/pagination/jquery.pagination.js"></script>
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script type="text/javascript" src="mainListCnt.js"></script>
    
    <script>var TYPE = '<%=type%>';
    var imgshow_pathfix='<%=IMGSHOW_PATHFIX%>';</script>
</head>

<body>
<div id="wlcmlcContainer" style="position:relative;">
	<div id="wlcmPgBd" class="mainListCntDg">
        <div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">
        <li style='cursor:pointer;' onclick='parent.turnAthrPg("views/welcome/wlcmPg.jsp")'>
        <a href='javascript:void(0)'>首页</a>
        <div class='backTriangle'></div>
        <div class='backTriangleBorder'></div></li>
        <li class='activeLL'><div class='frontTriangle'></div><a href='javascript:void(0);'></a><div class='backTriangle'></div></li>
        </div>
		<div class="mainArticleList"><ul class="mainListUl"></ul></div>
		<div style="text-align:center;"><div class="m-style M-box11"></div></div>
	</div>
	<div id="wlcmMlcd" class="mainListCntLd"></div>
</div>
</body>
</html>
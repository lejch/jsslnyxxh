<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	String IMGSHOW_PATHFIX=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX");
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <link href="${ctx}/static/pagination/pagination.css" rel="stylesheet" />
    <script type="text/javascript" src="${ctx}/static/pagination/jquery.pagination.js"></script>
    <script type="text/javascript" src="xhFileList.js"></script>
    <script>var appPath = '${ctx}';var imgshow_pathfix='<%=IMGSHOW_PATHFIX%>';</script>
    <style>
    	#xhfile_list .mainListpic img {width:70px !important;left:30px !important;height:70px !important;overflow:hidden;transition:0.5s;border:0;vertical-align:middle;position:absolute;left:0px;top:0px;}
    	#xhfile_list .quick_desc{margin-left:120px !important;margin-top:0px !important;width:500px !important;height:70px !important;}
    	#xhfile_list .mainListLi{height:70px !important;}
    	#xhfile_list .quick_desc .time {padding-left:0px !important;}
    	#xhfile_list .btn_plugin_style{padding:3px 7px;margin-right:2px;}
    	#xhfile_list .btn_plugin_style i{font-size:18px;color:#0b386e;}
    </style>
</head>

<body>
<div id="wlcmlcContainer" style="position:relative;">
	<div id="wlcmMlcd" class="mainListCntLd">
		<div class="mainListCntTitle"><div></div><i class="glyphicon glyphicon-list"></i><span>学会文件</span></div>
		<div class="navbarx">文件下载</div>
	</div>
	<div id="wlcmPgBd" class="mainListCntDg">
		<div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">
        <li style='cursor:pointer;' onclick='parent.turnAthrPg("views/welcome/wlcmPg.jsp")'>
        <a href='javascript:void(0)'>首页</a>
        <div class='backTriangle'></div>
        <div class='backTriangleBorder'></div></li>
        <li class='activeLL'><div class='frontTriangle'></div><a href='javascript:void(0);'>学会文件</a><div class='backTriangle'></div></li>
        </div>
        <ul class="mainListUl">
        	
        </ul>
        <div style="text-align:center;"><div class="m-style M-box11"></div></div>
	</div>
</div>
</body>
</html>
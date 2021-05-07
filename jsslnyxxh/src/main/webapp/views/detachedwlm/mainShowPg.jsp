<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	String NOTE_ID = request.getParameter("noteId");
	String IMGSHOW_PATHFIX_NOPRJ=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX_NOPRJ");
%>
<html>
<head>
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <script type="text/javascript" src="mainShowPg.js"></script>
    <script type="text/javascript" charset="utf-8" src="${ctx}/static/ckeditor/ckeditor.js"></script>
    <script>var noteid = '<%=NOTE_ID%>';
    var imgshow_pathfix='<%=IMGSHOW_PATHFIX_NOPRJ%>';</script>
    <style>.rtf_div:hover{color:white;}</style>
</head>

<body>
<div id="wlcmSpg">
	<div id="plTtleshow" class="plTtleshowd plTtswdadj"></div>
	<div id="wlcmSpgTopTitle"></div>
	<div id="wlcmSpilter"></div>
	<div  id="wlcmSpgMainPl" style="display:none;" class="ck ck-content ck-editor__editable ck-rounded-corners ck-blurred ck-editor__editable_inline"></div>
	<div id="wlcmAttachMent"></div>
</div>
</body>
</html>
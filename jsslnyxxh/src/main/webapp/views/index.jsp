<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>江苏省老年医学学会</title>
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	
  </head>
 <body>
	<div data-options="region:'north',border:false" style="height:35px;
														   overflow: hidden;
														   background:#38474f;"  href="">
        <%@include file="/views/themeLayouts/layout/north.jsp" %>
	</div>
	<div data-options="region:'center',plain:false,border:false,title:''" style="height:100%;overflow:hidden;"  href="views/themeLayouts/layout/center.jsp"></div>
</body>
</html>

<!DOCTYPE html>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.jsslnyxxh.app.web.filter.UserFormAuthenticationFilter"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>
<%@ page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
Boolean isLogin = false;
String user_alias = null;
Object obj =  SecurityUtils.getSubject().getPrincipal();
if(obj!=null){isLogin=true;ShiroUser user=(ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();user_alias=user.getUseralias();}
String errorMsg = "";
if(StringUtils.isNotBlank((String)request.getSession().getAttribute("error"))){
	errorMsg = (String)request.getSession().getAttribute("error");
}
String IMGSHOW_PATHFIX_NOPRJ=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX_NOPRJ");
String IMGSHOW_PATHFIX=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX");
%>
<html style="">
  <head>     
	<title>江苏省老年医学学会</title>
	<link rel="icon" href="${ctx}/static/favicon/favicon.ico" mce_href="${ctx}/static/favicon/favicon.ico" type="image/x-icon">
	<script src="${ctx}/static/jquery/jquery.min.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/easyui/themes/metro/easyui.css">
	<script type="text/javascript" src="${ctx}/static/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${ctx}/static/easyui/locale/easyui-lang-zh_CN.js"></script>
 	<link href="${ctx}/static/mystatic/css/mystatic.min.css" rel="stylesheet" />
 	<script src="${ctx}/static/mystatic/mystatic.min.js"></script>
    <link href="${ctx}/static/css/mystaic.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="${ctx}/static/scollbarPlugin/jquery.mCustomScrollbar.min.css">
	<script type="text/javascript" src="${ctx}/static/scollbarPlugin/jquery.mCustomScrollbar.concat.min.js"></script>
	<script src="${ctx}/views/welcome/mystaic.min.js"></script>
	<script>
	var appPath="${ctx}";
	var errorMsg = '';
	errorMsg = '<%=errorMsg%>';
	var isLogin =<%=isLogin%>;
	var user_alias='<%=user_alias%>';
	var imgshow_pathfix='<%=IMGSHOW_PATHFIX%>';
	var imgshow_pathfix_noprj='<%=IMGSHOW_PATHFIX_NOPRJ%>';
	</script>
	<style>
		.easyui-textbox{width:170px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset;transition:border 0.2s linear 0s, box-shadow 0.2s linear 0s;}
		textarea:focus,input[type="text"]:focus{border-color:rgba(82,168,236,0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset,0 0 8px rgba(82, 168, 236, 0.6);outline:0 none;}
		table{background-color:transparent;border-collapse:collapse;border-spacing:0;max-width:100%;}
		fieldset{border:0 none;margin:0;padding:0;}
		legend{-moz-border-bottom-colors:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none;border-color:#E5E5E5;border-image:none;border-style:none none solid;border-width:0 0 1px;color:#999999;line-height:20px;display:block;margin-bottom:10px;padding:0;width:100%;}
		input,textarea{font-weight:normal;}
		textarea{padding:5px;font-size:14px;}
		table ,th,td{font-size:13px;text-align:left;padding:6px 3px 6px 3px;}
		.textbox .textbox-text{font-size:15px;}
		#fblSupportLy{overflow:hidden;}
		.down-button-more{width:104px;height:36px;background-color:#fff;color:#1985ff;border:1px solid #8ec2ff;border-radius:4px;display:inline-block;cursor:pointer;font-size:13px;font-weight:500;transition-duration:.4s;}
        .down-button-more:hover{background-color: #ecf5ff;}	
	</style>
  </head>
  
<body class="content" style="overflow:hidden !important;background:#e9f0f5;">
<div class="content">
	<div class="topbar" style="background:url(${ctx}/static/images/hpimpg02.jpg) bottom;background-size:100% auto;">
		<img wo='1' src="${ctx}/static/images/hptittop.png" style="width:600px;position:absolute;top:40px;left:50px;">
		<div class="newSignUp" onclick="initSignUp()"><i style="font-size:10px;margin-right:6px;" class="glyphicon glyphicon-edit"></i>注册</div>
	</div>
	<div id="transformTopnavBar" style="height:0px;"></div>
	<div style="box-shadow: 0 0 10px rgba(0, 0, 0, .15);">
		<div id="zlight-nav">
			<ul id="zlight-main-nav"></ul>
		</div> 
	</div>
	
	<div style="background:#e9f0f5;color:rgb(47,47,47);width:1050px;margin: 0px auto;">
		<div id="shyepgmn" style="background:#e9f0f5;color:rgb(47,47,47);width:1050px;margin: 0px auto;"></div>
		<a class="to-top"><i class="glyphicon glyphicon-arrow-up"></i></a>
	</div>
	
	
	<div style="background:#f1f1f1;">
		<div class="mainHpPgFooter">
			<div class="yqlj">
				<div class="ac-gf-directory-column" style="margin-right:20px !important;">
					<h3 class="ac-gf-directory-column-section-title">友情链接</h3>
					<ul class="ac-gf-directory-column-section-list">
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.jskx.org.cn" target="_blank">江苏公众科技网（江苏省科协）</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://wjw.jiangsu.gov.cn" target="_blank">江苏省卫生健康委员会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://kxjst.jiangsu.gov.cn" target="_blank">江苏省科学技术厅</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.zglnyxxh.com" target="_blank">中国老年医学学会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.jsma.net.cn" target="_blank">江苏省医学会</a></li>
					</ul>
				</div>
				<div class="ac-gf-directory-column" style="margin-right:60px !important;">
					<h3 class="ac-gf-directory-column-section-title">&nbsp;</h3>
					<ul class="ac-gf-directory-column-section-list">
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.jsmda.org" target="_blank">江苏省医师协会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.jsyxh.org" target="_blank">江苏省医院协会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.jspoh.com" target="_blank">江苏省老年医院</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.sylnyx.com:8081/sylnyx/CN/volumn/home.shtml" target="_blank">实用老年医学杂志</a></li>
					</ul>
				</div>
				<div class="ac-gf-directory-column">
				    <h3 class="ac-gf-directory-column-section-title">地方学会</h3>
					<ul class="ac-gf-directory-column-section-list">
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.ahlnyj.org" target="_blank">安徽省老年医学学会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.sdsasg.com" target="_blank">山东省老年医学学会</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="http://www.scgs.sc.cn" target="_blank">四川省老年医学学会</a></li>
					</ul>
				</div>
				<div class="ac-gf-directory-column">
				    <h3 class="ac-gf-directory-column-section-title">常用操作</h3>
					<ul class="ac-gf-directory-column-section-list">
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="${ctx}/static/chrome/download_chrome.jsp">下载Chrome</a></li>
					</ul>
				</div>
				<div class="ac-gf-directory-column" style="width:200px;margin-right:0px !important;">
				    <h3 class="ac-gf-directory-column-section-title">联系我们</h3>
					<ul class="ac-gf-directory-column-section-list">
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="javascript:void(0)">电话：025-83712838-3036 3153</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="javascript:void(0)">地址：江苏省南京市珞珈路30号</a></li>
						<li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="javascript:void(0)">邮编：210024</a></li>
					</ul>
				</div>
			</div>
			<div style="text-align:left;width:900px;margin-left:auto;margin-right:auto;margin-top:5px;font-size:12px;cursor:default;">Copyright ◎ 江苏省老年医学学会 版权所有</div>
			<div onclick="window.open('http://beian.miit.gov.cn')" style="text-align:left;width:900px;margin-left:auto;margin-right:auto;margin-top:5px;margin-bottom:20px;font-size:12px;cursor:pointer;">苏ICP备18055201号-1</div>
		</div>
	</div>
	<div id="search" class="cd-main-search">
		<input id="titlesearchinp" type="search" placeholder="请输入关键字,按回车键搜索,按ESC键退出...">
		<div class="cd-search-suggestions" style="display:none;">
			<div class="news">
				<h3 id="searchResultTitle">搜索结果</h3>
				<div id="slx" style="height:450px;overflow:hidden;">
				<table id="shRsltble"></table>
				</div>
			</div>
		</div>
		<a href="javascript:void(0)" class="close cd-text-replace"></a>
	</div>
	<div class="cd-cover-layer"></div> 
</body>
</div>
</div>
</html>
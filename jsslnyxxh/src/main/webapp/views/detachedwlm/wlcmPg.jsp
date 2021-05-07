<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
Boolean isLogin=false;Object obj=SecurityUtils.getSubject().getPrincipal();if(obj!=null){isLogin=true;}
String IMGSHOW_PATHFIX=PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX_NOPRJ");
%>
<html>
<head>
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script src="${ctx}/static/superSlide/jquery.SuperSlide.2.1.1.js"></script>
    <script src="${ctx}/static/edslider/js/jquery.edslider.js"></script>
    <link href="${ctx}/static/edslider/css/edslider.css" rel="stylesheet" />
    <link href="${ctx}/static/edslider/css/animate-custom.css" rel="stylesheet" />
    <link href="${ctx}/static/hoverAnimation/css/cpnt_wlcmPg.css" rel="stylesheet" />
    <link href="${ctx}/static/edslider/css/styles.css" rel="stylesheet" />
	<script type="text/javascript" src="wlcmPg.js"></script>
	<script>var isLogin =<%=isLogin%>;
	var imgshow_pathfix='<%=IMGSHOW_PATHFIX%>';</script>
</head>

<body>
<div id="wlcmPgBd" style="width:1110px;margin-left:auto;margin-right:auto;">
<div class="notePanel">
	<a href="javascript:void(0)" class="txtLeftTitle">
		<i class="glyphicon glyphicon-volume-up" style="margin-right:2px;position:absolute;top:11px;left:-20px;"></i>
	重要通知：</a>
	<div class="txtScroll-top">
		<div class="bd">
			<ul class="infoList" id="topInfoList"></ul>
		</div>
	</div>
</div>
<table id="mainModalTb" style="margin-top:30px;margin-bottom:30px;">
	<tr><td class="tbLeftSqr" width="527"><ul class="mySlideshow"></ul></td><td style="width:40px;"></td><td width="527" class="tbLeftSqr" valign="top" id="MainPanel_1_td"></td></tr>
	<tr style="height:30px;"></tr>
	<tr><td class="tbLeftSqr" width="527" valign="top" id="MainPanel_2_td"></td><td style="width:40px;"></td><td width="527" class="tbLeftSqr" valign="top" id="MainPanel_3_td"></td></tr>
	<tr style="height:30px;"></tr>
	<tr>
		<td class="tbLeftSqr" width="527" valign="top" id="MainPanel_4_td"></td>
		<td style="width:40px;"></td>
		<td class="tbLeftSqr" valign="top" width="527">
			<div class="divHpPgTitle"><i class="zxfw"></i>会员服务</div>
			<div class="ul_1_right">
				<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9b">
					<div class="containerForHicon" id="membreg">
						<a href="javascript:void(0)" class="hi-icon hi-icon-lsuser" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会会员申请</a>
					</div>
					<div class="containerForHicon" id="groupreg">
						<a href="javascript:void(0)" class="hi-icon hi-icon-lsgroup" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会团体申请</a>
					</div>
					<div class="containerForHicon" id="zlxz">
						<a href="javascript:void(0)" class="hi-icon hi-icon-lsstock" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon">资料下载</a>
					</div>
					<div class="containerForHicon" id="yjfk">
						<a href="javascript:void(0)" class="hi-icon hi-icon-lsedit" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon">意见反馈</a>
					</div>
					<div class="containerForHicon" id="councilreg">
						<a href="javascript:void(0)" class="hi-icon hi-icon-myspace" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会理事申请</a>
					</div>
					<div class="containerForHicon" id="companyreg">
						<a href="javascript:void(0)" class="hi-icon hi-icon-lscmpn" style="position:relative;"></a>
						<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">企业会员申请</a>
					</div>
				</div>
			</div>
		</td>
	</tr>
</table>
</div>
</body>
</html>
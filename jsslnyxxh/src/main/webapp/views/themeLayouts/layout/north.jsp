<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<% 
	ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
	String USER_NAME = user.getUseralias();
%>
<style>
	.webui-popover-content{
		padding:0px 0px !important;
		overflow: auto;
	}
</style>
<script type="text/javascript" charset="utf-8">
	function logout(b) {
		$.messager.confirm("提示", "确认退出吗?",function(r){
			if(r){
                window.location.href=appPath+'/logout';
			}
		});
		
	}

	var userInfoWindow;
	function showUserInfo() {
		userInfoWindow = $('<div/>').window({
			modal : true,
			title : '当前用户信息',
			width : 350,
			height : 300,
			collapsible : false,
			minimizable : false,
			maximizable : false,
			onClose : function() {
				$(this).window('destroy');
			}
		});
		$('#userCPanel').webuiPopover('hide');
	}
	
	function changeLayout(layout){
		$.ajax({
		   type: "POST",
		   async: false,//同步发送请求数据
		   url: appPath+"/user/changeLayout",
		   data : {"layout":layout},
		   timeout:120*1000,
		   dataType:"json",
	       success: function(data){
		   },
		   error:function(xhr,textStatus,errorThrown){
		       $.messager.alert('错误',textStatus);
		   }
		});
		
		var time = new Date();
		window.location.href = appPath+"?time="+time;
		
		$('#userCPanel').webuiPopover('hide');
	}
	
	$(document).ready(function(){
		var userInfoTarget = $('#userCPanel');
		$(userInfoTarget).webuiPopover('destroy').webuiPopover({
				placement:'bottom',
				trigger:'click',
				content:'<div class="userInfoOpeaList" onclick="showUserInfo();">'+
							'<a><i class="glyphicon glyphicon-info-sign" style="margin-right:10px;" />个人信息</a>'+
						'</div>'+
						'<div class="divider"></div>'+
						'<div class="userInfoOpeaList" onclick="changePassword();">'+
							'<a><i class="glyphicon glyphicon-cog" style="margin-right:10px;" />密码修改</a>'+
						'</div>'+
						'<div class="divider"></div>'+
						'<div class="userInfoOpeaList" onclick="logout();">'+
							'<a><i class="glyphicon glyphicon-log-out" style="margin-right:10px;" />重新登录</a>'+
						'</div>'+
						'<div class="divider"></div>'+
						'<div class="userInfoOpeaList" onclick="logout(true);">'+
							'<a><i class="glyphicon glyphicon-off" style="margin-right:10px;" />退出系统</a>'+
						'</div>',
				width:150,						
				multi:true,						
				closeable:false,
				style:'',
				onShown:function(){$('#userCPanel').addClass('userCPanelClk');},
				onHiden:function(){$('#userCPanel').removeClass('userCPanelClk');},
				padding:true
		});
		
		var count=1;
		for(var i=0;i<Menus.length;i++){
			if(Menus[i]['opertype']=='0'){
				$('#childSys').append(
						'<li>'+
							'<a href="javascript:void(0)" appcode="'+Menus[i]['app_id']+'">'+
// 								'<i class="'+Menus[i]['icon']+'"></i>'+
								'<span>'+Menus[i]['title']+'</span>'+
								'<div></div>'+
							'</a>'+
						'</li>');
			}
		}
		$(".nav li a").click(function(){
			$(".nav li a.selected").removeClass("selected")
			$(this).addClass("selected");
			tpclk(this);
		});
	});
</script>

<div class="topleft">	
</div>
<ul id="childSys" class="nav"></ul>
<div id="toprightt" class="topright">    
    <div id="userOperaPanel" class="user">
    	<div style="display:inline-block;" id="userCPanel">
	    	<span><%=USER_NAME %></span>
	    	<i class="glyphicon glyphicon-triangle-bottom" style="font-size:11px;margin-right:5px;"></i>
	    </div>
	    <div style="display:inline-block;width:40px;
	    background-color:#327695;
	    border-radius: 7px;
	    padding:2px;
	    margin-right:5px;margin-left:5px;position:relative;">
		    <i class="glyphicon glyphicon-envelope" style="top:2px;left:8px;color:#fff;"></i>
		    <b>0</b>
	    </div>
    </div>    
</div>
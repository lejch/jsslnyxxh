<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
<script type="text/javascript" charset="utf-8">
	var centerTabs;
	var tabsMenu;
	var ht = null;
	var cth = null;
	$(document).ready(function(){
		if(typeof(window.innerHeight)!="undefined"){
	        ht = window.innerHeight-50;
	    }
	    if(typeof(window.innerHeight)=="undefined"){//156
	        ht = document.documentElement.clientHeight-50;
	    }
	    $('#mainPanelStyle').css("cssText",'height:'+ht+'px !important;padding:15px 20px 0px 20px;background:#f0f2f7;');
	    cth = ht-60;
	    
	    $('#centerTabs').css("cssText",'height:'+cth+'px !important;');
	    
		centerTabs = $('#centerTabs').tabs({
			border : false,
			showHeader : false,
			height:cth
		});
		
		var chldsl = document.getElementById('childSys');
		if(chldsl.children){
			chldsl.firstChild.firstChild.click();
		}
	});

	function addTabNew(node) {
		var nodes=node.split("||");
		$("#plTtleshow").html("<li onclick='backTSY();'><a href='javascript:void(0)'>首页</a><div class='backTriangle'></div></li>"
				+"<li class='activeLL'>"
					+"<div class='frontTriangle' />"
					+"<a href='javascript:void(0)' onclick='backTSY();'>"+nodes[0]+"</a>"
					+"<div class='backTriangle'></div>"
				+"</li>"+
				"<div class='rftpFront' />"+
				"<div class='hi-icon-wrap hi-icon-effect-6 rtf_div' onclick='refreshTab(this)' rft="+nodes[0]+">"+
					"<a href='javascript:void(0)' class='hi-icon hi-icon-refresh'></a>"+
				"</div>"
			 );
		if (centerTabs.tabs('exists', nodes[0])) {
			centerTabs.tabs('select', nodes[0]);
		} else {
			var allTabs = centerTabs.tabs('tabs');
			$.each(allTabs, function() {
				var opt = $(this).panel('options');
				if(opt.title!='首页'){
					centerTabs.tabs('close', opt.title);
				}
			});
			centerTabs.tabs('add', {
				title : nodes[0],
				closable : true,
				content : "<iframe src="+nodes[2]+" frameborder=\"0\" style=\"border:0;width:100%;height:"+cth+"px;\"></iframe>"
			});
		}
	}
	function syclick(index){
		var node = Menus[index]['title']+"||"+Menus[index]['icon']+"||"+Menus[index]['location'];
		var nodes=node.split("||");
		$("#plTtleshow").html("<li onclick='backTSY();'><a href='javascript:void(0)'>首页</a><div class='backTriangle'></div></li>"
			+"<li class='activeLL>"
				+"<div class='frontTriangle' />"
				+"<a href='javascript:void(0)' onclick='backTSY();'>"+nodes[0]+"</a>"
				+"<div class='backTriangle'></div>"
			+"</li>"+
			"<div class='rftpFront' />"+
			"<div class='hi-icon-wrap hi-icon-effect-6 rtf_div' onclick='refreshTab(this)' rft="+nodes[0]+">"+
				"<a href='javascript:void(0)' class='hi-icon hi-icon-refresh'></a>"+
			"</div>"
		 );
		if (centerTabs.tabs('exists', nodes[0])) {
			centerTabs.tabs('select', nodes[0]);
		} else {
			var allTabs = centerTabs.tabs('tabs');
			$.each(allTabs, function() {
				var opt = $(this).panel('options');
				if(opt.title!='首页'){
					centerTabs.tabs('close', opt.title);
				}
			});
			centerTabs.tabs('add', {
				height:100,
				title : nodes[0],
				closable : true,
				content : "<iframe src="+nodes[2]+" frameborder=\"0\" style=\"border:0;width:100%;height:"+cth+"px;\"></iframe>"
			});
		}
	}
	function backTSY(){
		$('.newlgnTreeBtnSelected').removeClass('newlgnTreeBtnSelected');
		var tab = centerTabs.tabs('select', '首页');
		$("#plTtleshow").html("<li onclick='backTSY();'><a href='javascript:void(0)'>首页</a><div class='backTriangle'></div></li>");
	}
	function refreshTab(obj) {
		var title = $(obj).attr('rft');
		var tab = centerTabs.tabs('getTab', title);
		centerTabs.tabs('update', {
			tab : tab,
			options : tab.panel('options')
		});
	}
</script>
<div id="mainPanelStyle" style="">
	<div id="topMenuList" class="tmldivx"></div>
	<div id="plTtleshow" class="plTtleshowd">
			<li onclick='backTSY();'>
				<a href='javascript:void(0)' onclick='backTSY();'>首页</a>
				<div class="backTriangle"></div>
			</li>
	</div>
	<div id="centerTabs">
		<div title="首页" border="false" style="overflow: hidden;">
			<iframe src="views/helloEditDlg.jsp" frameborder="0" style="border:0;width:100%;"></iframe>
		</div>
	</div>
</div>
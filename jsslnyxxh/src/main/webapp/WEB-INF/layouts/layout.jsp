<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.jsslnyxxh.app.entity.account.Role"%>
<%@page import="java.util.List"%>
<%@page import="com.jsslnyxxh.common.util.PropertiesUtil"%>
<%@page import="com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@page import="org.apache.shiro.session.Session"%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%String OS_TIME_OUT=PropertiesUtil.getInstance("/application.properties").getConfig("OS.TimeOut");
String APP_ID="";
String USER_ID="";
String USER_NAME="";
String USER_ALIAS="";
String USER_PHONE="";
Boolean isAdmin=false;
List<Role> rList=null;
JSONArray menus=null;
String rids="";
JSONObject js=null;
try{
	ShiroUser user=(ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
SecurityUtils.getSubject().getSession().setTimeout(Integer.parseInt(OS_TIME_OUT));
USER_ID=user.getUserId();
USER_NAME=user.getUsername();
USER_ALIAS=user.getUseralias();
USER_PHONE=user.getPhone();
if(USER_PHONE==null){USER_PHONE="";}
Role highPermissionRole = rList.get(0);
for(int i=0;i<rList.size();i++){Role role=rList.get(i);rids=rids+role.getRoleId();if(i!=rList.size()-1){rids=rids+",";}if(role.getRoleType().equals("0")){isAdmin=true;break;}}}catch (Exception e){}%>
<!DOCTYPE html>
<html>
<head>
<title>江苏省老年医学学会</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<jsp:include page="script.jsp"></jsp:include>
<script type="text/javascript">
var appPath="${ctx}";
var os_timeout='<%=OS_TIME_OUT%>';
$.ajaxSetup({error:function(XMLHttpRequest,textStatus){},complete:function(XMLHttpRequest,textStatus){if(textStatus=="parsererror"){$('.messager-window').remove();$('.window-shadow').remove();iosOverlay({text:"登录超时!请重新登录",duration: 2000,icon:appPath+"/static/iOS-Overlay/img/cross.png",onhide:function(){top.location=appPath+'/login';}});}}});
function jspReqControl(callback){$.ajax({type:"POST",async:false,url:appPath+"/ursm/rc",timeout:120*1000,dataType:"json",success:function(data){callback();},error:function(xhr,textStatus,errorThrown){}});}
function removejscssfile(filename,filetype){var targetelement=(filetype=="js")?"script":(filetype=="css")?"link":"none";var targetattr=(filetype=="js")?"src":(filetype=="css")?"href":"none";var allsuspects=document.getElementsByTagName(targetelement);for(var i=allsuspects.length;i>=0;i--){if(allsuspects[i]&&allsuspects[i].getAttribute(targetattr)!=null&&allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)allsuspects[i].parentNode.removeChild(allsuspects[i]);}}function loadjscssfile(filename,filetype){if(filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src",filename);}else if(filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",filename);}if(typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}
var USER_ID="<%=USER_ID%>";
var USER_NAME="<%=USER_NAME%>";
var USER_ALIAS='<%=USER_ALIAS%>';
var USER_PHONE='<%=USER_PHONE%>';
var isAdmin = <%=isAdmin%>;
var rids = '<%=rids%>';
var sysHeight=null;if(typeof(window.innerHeight)!="undefined"){sysHeight=window.innerHeight;}if(typeof(window.innerHeight)=="undefined"){sysHeight=document.documentElement.clientHeight;}
var welcomeWods = null;now=new Date(),hour=now.getHours();if(hour<6){welcomeWods="早上好！"}else if(hour<9){welcomeWods="早上好！"}else if(hour<12){welcomeWods="上午好！"}else if(hour<14){welcomeWods="中午好！"}else if(hour<17){welcomeWods="下午好！"}else if(hour<19){welcomeWods="傍晚好！"}else if(hour<22){welcomeWods="晚上好！"}else{welcomeWods="晚上好！"}	
function dealBackJson(result){var start=result.indexOf('*%23%40*');var end=result.indexOf('*%40%23*');var rls=result.substr(start+8,end-start-8);return decodeURIComponent(rls,'UTF-8');}
</script>
<sitemesh:head/>
</head>
<body>
<sitemesh:body/>
</body>
</html>
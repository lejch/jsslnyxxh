<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/static/css/centerJsp.css">
    <link href="${ctx}/static/css/wlc_lgn.css" rel="stylesheet" />
    <script>var appPath = '${ctx}';</script>
    <style>
    	.sgupbtn{font-family:'Open Sans','Helvetica','Arial',sans-serif;font-weight:400;font-size:13px;line-height:15px;border-radius:5px;padding:8px 20px;margin-top:5px;background:#23b7ef;color:#fff;cursor:pointer;border:none;-moz-border-radius:5px;-webkit-border-radius:5px;}
		.sgupbtn:hover{background: #0d89b8;}
    	.signupmaindiv{width:320px;height:413px;display:table-cell;padding:35px;}
    	.styled-text{font-size:30px;font-weight: 300;display: inline-block;color: #6d6d6d;}
    	.styled-text:after{content:'';display:block;border-bottom:1px solid #23b7ef;margin-bottom:25px;}
    	.signup_form_div{width:100%;margin-bottom:20px;position:relative;}
    	.signup_form_div label{margin-bottom:0;font-size:13px;font-weight:600;display:inline-block;width:100%;line-height:14px;color:#6d6d6d;}
		.minimal{border-top:none;border-right:none;border-left:none;padding:3px 0px;width:100%;background:#f3f3fa;border-bottom:1px solid #ddd;line-height:26px;height:26px;}
		.signup_form_div input:focus,.signup_form_div input:active:focus,.signup_form_div input.active:focus,.signup_form_div input .focus,.signup_form_div input:active.focus,.signup_form_div input.active.focus{outline:none;}
		.signup_form_div button:focus,.signup_form_div button:active:focus,.signup_form_div button.active:focus,.signup_form_div button .focus,.signup_form_div button:active.focus,.signup_form_div button.active.focus{outline:none;}
		input::-webkit-input-placeholder{color:#677897;}input::-moz-placeholder{color:#677897;}input:-moz-placeholder{color:#677897;}input:-ms-input-placeholder{color:#677897;}
		::-webkit-input-placeholder {font-size:12px;} :-moz-placeholder {font-size:12px;} ::-moz-placeholder {font-size:12px;} :-ms-input-placeholder {font-size:12px;}
    </style>
    <script type="text/javascript">
    	$(document).ready(function(){
    		var appPath = '${ctx}';
    		$.extend($.fn.validatebox.defaults.rules, {
    		    checkUsername:{
    		        validator: function (value) {  
    		            var checkR=$.ajax({async:false,cache:false,type:'post',url:appPath+'/user/checkHasUserName',data:{'signcode':value}}).responseText;   
    		            return checkR==="true";   
    		        },  
    		        message: '该邮箱已被占用！'  
    		    },
    		    checkPhone:{
    		        validator: function (value){
    		        	if(value.match(/^1[3|4|5|6|7|8][0-9]{9}$/)){
    		        		var checkR=$.ajax({async:false,cache:false,type:'post',url:appPath+'/user/checkHasPhone',data:{'signcode':value}}).responseText;   
        		            return checkR==="true";
    		        	}else{
    		        		return false
    		        	}
    		        },  
    		        message: '该手机号已被绑定,或输入的手机号不正确！'  
    		    }
    		      
    		}); 
    		$('#xmtips').hover(function(){layer.tips('填写的姓名将作为昵称显示，请填写真实姓名！','#xmtips',{tips: [1,'#000'],area: '290px',tipsMore:true});},function(){layer.close(layer.index);});
    		$('#phtips').hover(function(){layer.tips('绑定手机号后，可直接使用手机号和密码登陆！( 非必填 )','#phtips',{tips:[1,'#000'],area:'285px',tipsMore:true});},function(){layer.close(layer.index);});
        	var canvas = document.getElementById('canvas');var ctx=canvas.getContext('2d');canvas.width=390;canvas.height=230;window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();var step=0;var lines=["rgba(0,222,255,0.2)","rgba(157,192,249,0.2)","rgba(0,168,255,0.2)"];function loop(){ctx.clearRect(0,0,canvas.width,canvas.height);step++;for(var j=lines.length-1;j>=0;j--){ctx.fillStyle=lines[j];var angle=(step+j*60)*Math.PI/180;var deltaHeight=Math.sin(angle)*50;var deltaHeightRight=Math.cos(angle)*50;ctx.beginPath();ctx.moveTo(0,canvas.height/2+deltaHeight);ctx.bezierCurveTo(canvas.width/2,canvas.height/2+deltaHeight-50,canvas.width/2,canvas.height/2+deltaHeightRight-50,canvas.width,canvas.height/2+deltaHeightRight);ctx.lineTo(canvas.width,canvas.height);ctx.lineTo(0,canvas.height);ctx.lineTo(0,canvas.height/2+deltaHeight);ctx.closePath();ctx.fill();}requestAnimFrame(loop);}loop();
        	$('.sgupbtn').bind('click',function(){
        		if(checkIsAllInsert()&&(isNotSend)){
        			if(isNotSend){
        				isNotSend = false;
        				parent.initImgVaild(function(){
        					if(parent.GETIMGVAILDRESULT()){
        						$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",data:{'data':$("form").serialize()},url:appPath+"/user/register",
        						success: function(data){
        							if(data){
        								parent.closeAllLayer();
        								if(data[0]['result']=='success'){
        									parent.launchMsg('注册成功！','请使用您注册的用户名密码，登录网站','success',3000);
        								}else{
        									parent.launchMsg('注册失败！','注册失败，请稍后再试，或联系管理员','error',3000);isSend = false;
        								}
        							}
        						},error:function(xhr,textStatus,errorThrown){parent.closeAllLayer();parent.launchMsg("系统异常:"+textStatus);}});
        					}else{
        						layer.tips('验证码错误或未验证,请重新验证登录!','#sgupbtns',{tips:[1, '#000'],area:'250px',tipsMore:true,time:3000,zIndex:19999999});
        						isNotSend=true;
        					}
        				},
        				function(){parent.endLoading();isNotSend=true;},
        				'auto');
        			}
        		}
        	});
    	});
    	var isNotSend = true;
    	function checkIsAllInsert(){
    		var result = true;
    		$('.minimal').each(function(){
    			result = result&&($(this).validatebox('isValid'));
    			if(!result){$(this).focus(); }
    			return result;
    		});
    		return result;
    	}
    </script>
</head>

<body>
<div>
	<div class="signupmaindiv" style="background: linear-gradient(-360deg, #8785ff 23%, #23b7ef 111%);">
		<canvas id="canvas" style="position:absolute;bottom:0px;left:0px;"></canvas>
	</div>
	<div class="signupmaindiv">
		<h3 class="styled-text">新用户注册</h3>
        <form>
           <div class="signup_form_div">
              <label>姓名 *</label><i id="xmtips" class="glyphicon glyphicon-question-sign" style="cursor:pointer;font-size:16px;position:absolute;left:40px;"></i>
              <i class="glyphicon glyphicon-user" style="position:absolute;right:12px;top:25px;"></i>
              <input type="text" class="minimal easyui-validatebox" data-options="required:true" name="useralias" missingMessage="请填写您的真实姓名" placeholder="请填写您的真实姓名">
           </div>
           <div class="signup_form_div">
              <label>登录账号（ e-mail ）*</label>
              <i class="glyphicon glyphicon-envelope" style="position:absolute;right:12px;top:25px;"></i>
              <input type="text" class="minimal easyui-validatebox" name="username" data-options="required:true,validType:['email','checkUsername']" missingMessage="请填写您的有效的邮箱" placeholder="请使用有效的邮箱作为登录账号">
           </div>
           <div class="signup_form_div">
              <label>密码 *</label>
              <i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>
              <input type="password" class="minimal easyui-validatebox" data-options="required:true" name="password" missingMessage="请填写您的密码" placeholder="请填写密码">
           </div>
           <div class="signup_form_div">
              <label>绑定手机号</label><i id="phtips" class="glyphicon glyphicon-question-sign" style="cursor:pointer;font-size:16px;position:absolute;left:72px;"></i>
              <i class="glyphicon glyphicon-phone" style="position:absolute;right:12px;top:25px;"></i>
              <input type="phone" class="minimal easyui-validatebox" data-options="validType:'checkPhone'" name="phone" placeholder="请输入手机号">
           </div>
           <div class="signup_form_div">
              <button type="button" id="sgupbtns" class="sgupbtn">确认注册</button>
           </div>
        </form>
	</div>
</div>
</body>
</html>
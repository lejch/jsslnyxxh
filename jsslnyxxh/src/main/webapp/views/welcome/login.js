var wth = null;
var ENTERED_LOCA = null;
var sumbitted = false;
$(document).ready(function(){
	var isIE = false || !!document.documentMode;
	if(isIE){isIELogin();}else{
	    if(window.screen.width<1280){
	    	notSupFbl();
	    }
	    $('#zlight-main-nav').width(1050);$('#zlight-main-nav').css('marginLeft',$('#shyepgmn').offset().left+"px");
    	initTopNavBar();
    	initHomePage();
    	var resizing=false,navigationWrapper=$('.cd-main-nav-wrapper'),navigation=navigationWrapper.children('.cd-main-nav'),searchForm=$('.cd-main-search'),pageContent=$('.cd-main-content'),searchTrigger=$('.cd-search-trigger'),coverLayer=$('.cd-cover-layer'),navigationTrigger=$('.cd-nav-trigger'),mainHeader=$('.cd-main-header');function checkWindowWidth(){var mq=window.getComputedStyle(mainHeader.get(0),'::before').getPropertyValue('content').replace(/"/g,'').replace(/'/g,"");return mq;}function checkResize(){if(!resizing){resizing=true;(!window.requestAnimationFrame)?setTimeout(moveNavigation,300):window.requestAnimationFrame(moveNavigation);}}function moveNavigation(){var screenSize=checkWindowWidth();if(screenSize=='desktop'&&(navigationTrigger.siblings('.cd-main-search').length==0)){searchForm.detach().insertBefore(navigationTrigger);navigationWrapper.detach().insertBefore(searchForm).find('.cd-serch-wrapper').remove();}else if(screenSize=='mobile'&&!(mainHeader.children('.cd-main-nav-wrapper').length==0)){navigationWrapper.detach().insertAfter('.cd-main-content');var newListItem=$('<li class="cd-serch-wrapper"></li>');searchForm.detach().appendTo(newListItem);newListItem.appendTo(navigation);}resizing=false;}(!Modernizr.testProp('pointerEvents'))&&$('html').addClass('no-pointerevents');moveNavigation();$(window).on('resize',checkResize);navigationTrigger.on('click',function(event){mainHeader.add(navigation).add(pageContent).toggleClass('nav-is-visible');});searchForm.on('click','.close',function(){closeSearchForm();});coverLayer.on('click',function(){closeSearchForm();});
    	function closeSearchForm(){$('#titlesearchinp').val('');searchTrigger.removeClass('search-form-visible');searchForm.removeClass('is-visible');coverLayer.removeClass('search-form-visible');$('.content').mCustomScrollbar("update");$('.cd-search-suggestions').hide();}
    	searchTrigger.on('click',function(event){$('#searchResultTitle').text('搜索结果');$('#searchResults').empty();if(searchTrigger.hasClass('search-form-visible')){initSearch();}else{searchTrigger.addClass('search-form-visible');coverLayer.addClass('search-form-visible');searchForm.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){searchForm.find('input[type="search"]').focus().end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');if($('#transformTopnavBar').offset().top>0){$('.content').mCustomScrollbar('scrollTo',215);}});}});
    	$(document).keyup(function(event){if(event.which=='27')closeSearchForm();if(event.which=='13'){if($('.search-form-visible').length>0){initSearch();}else{submit_form('loginForm','submit_btn');}}});
	}
	$('.topbar img').css('left',$('.zlight-active').offset().left+'px');
	$('.newSignUp').css('left',$('.zlight-active').offset().left+930+'px');
});
function initTopNavBar(){
	$.ajax({
		type:"POST",url:appPath+"/Hpwlm/initTopNavBar",async:false,data:{}
		,success: function(data){
			$('.cd-main-nav-wrapper').empty();
			$('#zlight-main-nav').append('<header class="cd-main-header animate-search"><nav class="cd-main-nav-wrapper"></nav><a href="javascript:void(0)" class="cd-nav-trigger cd-text-replace">Menu<span></span></a></header>');
			$('.cd-main-nav-wrapper').append('<li class="zlight-active" xindex="0"><a href="javascript:void(0);">'+data[0]['TITLE']+'</a></li>');
			for(var i=1;i<data.length;i++){$('.cd-main-nav-wrapper').append('<li xindex="'+i+'"><a href="javascript:void(0);">'+data[i]['TITLE']+'</a></li>');}
			$('.cd-main-nav-wrapper').append('<a href="javascript:void(0)" class="cd-search-trigger cd-text-replace"></a>');
			if(isLogin){
				$('.cd-main-nav-wrapper').append('<div class="UserAliLogin"><div class="newEmailNum" style="display:none;"></div><i class="glyphicon glyphicon-envelope emnotion" onclick="initMessageList()"></i>'+
						'<div class="userLoginedSqr" onclick="initUserOptions(this)" >'+
						'<i class="glyphicon glyphicon-user" style="color:#fff;"></i>'+user_alias+'</div></div>');
				$.ajax({
					   type:"POST",async:false,timeout:120*1000,dataType:"json",data:{},
					   url:appPath+"/hrwp/initMsgList",
				       success: function(data){
				    	   msglistdata = data;
				    	   if(data.length>0){$('.newEmailNum').text(''+data.length);$('.newEmailNum').show();}
				       },
					   error:function(xhr,textStatus,errorThrown){layer.msg("系统异常:"+textStatus);}
				});
			}else{
				$('.cd-main-nav-wrapper').append('<li id="userlogin" onclick="startLogin(this)"><a href="javascript:void(0);">会员登录</a></li>');
			}
			$('#zlight-nav').zlightMenu();
			$('#zlight-nav li[xindex]').bind('click',function(){
				var index = $(this).attr("xindex");
				var locs = '';
				try{locs = data[index]['LOCATION'].trim();}catch(e){}
				var ifrm = document.getElementById("mainIfmSpc");
				if(locs!=null&&locs!=''){
					entrancefnc(data[index]['LOCATION']);
				}else{
					pageStillBuilding();
				}
			});
			if(errorMsg!=''&&errorMsg!=null){initloginDlg($('#userlogin'),true);}
			
			$('.to-top').bind('click',function(){
				localScrollTo(0);
			});
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
}
function initSignUp(){
	layer.open({type:2,title:false,id:'sign_up_frm',shadeClose:true,closeBtn:0,shade:[0.1,'#000'],area:['790px','483px'],
	      content:[appPath+'/views/welcome/sign_up.jsp','no']});
}
function initSignUpInLogin(){
	layer.close(layer.index);
	initSignUp();
}
var isLoginDlgLaunched=false;
function initloginDlg(obj,hasError){
	if(!isLoginDlgLaunched){isLoginDlgLaunched=true;
	var content = '<form id="loginForm" method="post" name="login" action="'+appPath+'/login" autoComplete="off">';
	if(hasError){content+='<p id="authenticationResult">'+errorMsg+'</p>';}else{content+='<p id="authenticationResult"></p>';}
	content+=('<p class="pipt"><i class="u_logo"></i><input class="ipt" type="text" name="username" id="username"  placeholder="请输入邮箱或手机号" value=""></p>'+
'<p class="pipt"><i class="p_logo"></i><input class="ipt" name="password" id="password" type="password" placeholder="请输入密码" value=""></p>'+
'</form><a id="submit_btn" onclick="submit_form(\'loginForm\',\'submit_btn\');">登 录</a>'+
'<p class="newuserreg" onclick="initSignUpInLogin()">新用户注册</p><p class="forgotmm">忘记密码？</p>');
var CUR_OFFSET=$('#transformTopnavBar').offset().top>0?$('#transformTopnavBar').offset().top:0;
layer.open({title:false,move:false,type:1,anim:0,offset:[CUR_OFFSET+50+'px',($('#userlogin').offset().left-140)+'px'],resize:false,shade:[0.01,'#fff'],area:['390px','230px'],shadeClose:true,content:content,
      end:function(){isLoginDlgLaunched=false;},cancel:function(index,layero){layer.close(index);isLoginDlgLaunched=false;}});
	}
}
var ADVICELAYERIDX=null;
function initAdvice(){
	var content='<form id="yjfkform" style="margin-left:10px;margin-top:15px;" action="" method="post">'+
	'<table><tr><th>姓名</th><td><input name="NAME" id="NAME" style="width:90px;height:30px;font-size:14px;" required="required" class="easyui-textbox" type="text"/></td>'+
	'<th>电子邮件</th><td><input name="EMAIL" id="EMAIL" style="width:142px;height:30px;font-size:14px;" data-options="required:true,validType:\'email\'" class="easyui-textbox easyui-validatebox" type="text"/></td>'+
	'<th>联系方式</th><td><input name="LW" id="LW" style="width:133px;height:30px;font-size:14px;" class="easyui-textbox" type="text"/></td></tr><tr><th>主题</th><td colspan="5"><input name="TITLE" id="TITLE" style="width:493px;height:30px;font-size:14px;" required="required" class="easyui-textbox" type="text"/></td></tr><tr><th>正文</th><td colspan="5"><input id="ZW" name="ZW" class="easyui-textbox easyui-validatebox" data-options="multiline:true" required="required" style="font-size:14px;width:493px;height:200px"></input></td></tr></table><div id="slider1" class="slider" style="display:inline-block;margin-left:34px;margin-top:10px;"></div></form>';
layer.open({zIndex:9990,title:false,move:false,type:1,resize:false,shade:[0.01,'#fff'],area:['570px','380px'],shadeClose:true,content:content,
	      success: function(layero,index){
	    	  ADVICELAYERIDX = index;
	    	  $('#yjfkform input').textbox();
	    	  $("#slider1").slider({width:494,fontSize:14,bgColor:"#33CC00",textMsg:"请向右拖拽滑块，提交反馈意见！",successMsg:"正在提交反馈意见...",callback:function(result){if(result){
	    		  if($('#yjfkform').form('validate')){
	    					  $('#yjfkform').submit();
	    		  }else{
	    			  $("#slider1").slider("restore");
	    		  }
	    	  }}});
	    	  $("#yjfkform").form({url:appPath+"/Hpwlm/insertAdvice",onSubmit:function(){$.messager.progress({title:'提示',text:'数据处理中，请稍后....'});
	    	  var isValid=$(this).form('validate');
	    	  if(!isValid){
	    		  $.messager.progress('close');
	    		  $("#slider1").slider("restore");
	    	  }
	    	  return isValid;},success:function(result){$.messager.progress('close');if(result){$("#slider1").slider("restore");layer.close(ADVICELAYERIDX);swalAlert('提交成功','反馈意见，已提交成功','success',2000);}else{swalAlert('提交失败','反馈意见，提交失败，请稍后重试','error',2000);}}});
	      }
	});
}
function CLOSEIMGVAILD(){layer.close(layer.index);}
function SETIMGVAILDRESULT(result){IMGVAILDRESULT=result;}
function GETIMGVAILDRESULT(){return IMGVAILDRESULT;}
var IMGVAILDRESULT=false;
function initImgVaild(endCallback,cancelCallback,offset){layer.open({offset:offset,title:false,move:false,type:2,resize:false,shade:[0.1,'#fff'],area:['260px','230px'],shadeClose:false,
content:[appPath+'/views/welcome/imgValidCode3.jsp','no'],end:function(){endCallback();},cancel:function(){cancelCallback();}});}
var MBR_RECMIT_DATA = null;
function initMemberReg(){
	jspReqControl(function(){
		$.ajax({type:"POST",async:false
			,error:function(xhr,textStatus,errorThrown){}
			,url: appPath+"/hrwp/checkRegState",data:{}
			,success: function(data){
				if(data.result=='success'){
					layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','490px'],shadeClose:true,content:[appPath+'/views/welcome/memberRegStep.jsp','no']});
				}else if(data.result=='recomit'){
					var rcmtmsg = "<p>您最近于"+data.lastData.FIRST_CREATETIME+"提交的<strong>个人会员申请审核不通过</strong>！</p>"+
					"<p style='margin-top:5px;'><strong>审核不通过原因：</strong></p>"+
					"<div class='minimal'><pre>"+data.lastData.HYSH_ERR_REASON+"</pre></div>"+
					"<p style='margin-top:5px;'>点击<strong>确定</strong>将加载上次申请时填写的内容，请修改后重新申请</p>";
					layer.alert(rcmtmsg,{id:'itmbrrecmitlyr',title:false,area:['445px','auto'],closeBtn:0,yes:function(index){
					    	layer.close(index);
					    	MBR_RECMIT_DATA = data.lastData;
					    	layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','490px'],shadeClose:true,content:[appPath+'/views/welcome/memberRegStep.jsp','no']});
						}
					});
				}else{
					layer.alert(data.msg,{id:'itmbrrecmitlyr',title:false,area:['380px','auto'],closeBtn:0});
				}
			}
		});
	});
}
function initCompanyReg(){
	jspReqControl(function(){
		$.ajax({type:"POST",async:false,error:function(xhr,textStatus,errorThrown){}
		,url: appPath+"/hrwp/checkCpyRegState",data:{}
		,success: function(data){
			if(data.result=='success'){
				layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','520px'],shadeClose:true,content:[appPath+'/views/welcome/companyRegStep.jsp','no']});
			}else if(data.result=='recomit'){
				var rcmtmsg = "<p>您最近于"+data.lastData.CREATETIME+"提交的<strong>个人会员申请审核不通过</strong>！</p>"+
				"<p style='margin-top:5px;'><strong>审核不通过原因：</strong></p>"+
				"<div class='minimal'><pre>"+data.lastData.QYSH_ERR_REASON+"</pre></div>"+
				"<p style='margin-top:5px;'>点击<strong>确定</strong>将加载上次申请时填写的内容，请修改后重新申请</p>";
				layer.alert(rcmtmsg,{id:'itmbrrecmitlyr',title:false,area:['445px','auto'],closeBtn:0,yes:function(index){
					layer.close(index);
					MBR_RECMIT_DATA = data.lastData;
					layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','520px'],shadeClose:true,content:[appPath+'/views/welcome/companyRegStep.jsp','no']});
				}
				});
			}else{
				layer.alert(data.msg,{id:'itmbrrecmitlyr',title:false,area:['380px','auto'],closeBtn:0});
			}
		}
		});
	});
}

var COUNCIL_REG_FROM_MBR = "";
function initCouncilReg(){
	jspReqControl(function(){
		$.ajax({type:"POST",async:false
			,error:function(xhr,textStatus,errorThrown){}
		,url: appPath+"/hrwp/checkCouncilRegState",data:{}
		,success: function(data){
			if(data.result=='success'){
				COUNCIL_REG_FROM_MBR = data.msg;
				layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['1050px','580px'],shadeClose:true,content:[appPath+'/views/welcome/councilRegStep.jsp','no']});
			}else if(data.result=='recomit'){
				var rcmtmsg = "<p>您最近于"+data.lastData.CREATETIME+"提交的<strong>理事申请审核不通过</strong>！</p>"+
				"<p style='margin-top:5px;'><strong>审核不通过原因：</strong></p>"+
				"<div class='minimal'><pre>"+data.lastData.LSSH_ERR_REASON+"</pre></div>"+
				"<p style='margin-top:5px;'>点击<strong>确定</strong>重新申请，或与学会联系</p>";
				layer.alert(rcmtmsg,{id:'itmbrrecmitlyr',title:false,area:['445px','auto'],closeBtn:0,yes:function(index){
						layer.close(index);
				    	COUNCIL_REG_FROM_MBR = data.lastData;
				    	layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['1050px','580px'],shadeClose:true,content:[appPath+'/views/welcome/councilRegStep.jsp','no']});
					}
				});
			}else if(data.result=='info'){
				layer.alert(data.msg,{id:'itmbrrecmitlyr',title:false,area:['300px','auto'],closeBtn:0});
			}else{
				layer.alert(data.msg,{id:'itmbrrecmitlyr',title:false,area:['380px','auto'],closeBtn:0});
			}
		}
		});
		
	});
}
var GRP_RECMIT_DATA=null;
function initGroupReg(){
	jspReqControl(function(){
		$.ajax({type:"POST",async:false
			,error:function(xhr,textStatus,errorThrown){}
			,url: appPath+"/hrwp/checkGroupRegState",data:{}
			,success: function(data){
				if(data.result=='success'){
					layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','460px'],shadeClose:true,content:[appPath+'/views/welcome/groupRegStep.jsp','no']});
				}else if(data.result=='recomit'){
					var rcmtmsg = "<p>您最近于"+data.lastData.CREATETIME+"提交的<strong>团体会员申请审核不通过</strong>！</p>"+
					"<p style='margin-top:5px;'><strong>审核不通过原因：</strong></p>"+
					"<div class='minimal'><pre>"+data.lastData.TTSH_ERR_REASON+"</pre></div>"+
					"<p style='margin-top:5px;'>点击<strong>确定</strong>将加载上次申请时填写的内容，请修改后重新申请</p>";
					layer.alert(rcmtmsg,{id:'itmbrrecmitlyr',title:false,area:['445px','auto'],closeBtn:0,yes:function(index){
					    	layer.close(index);
					    	GRP_RECMIT_DATA = data.lastData;
					    	layer.open({title:false,move:false,type:2,resize:false,shade:[0.01,'#fff'],area:['620px','460px'],shadeClose:true,content:[appPath+'/views/welcome/groupRegStep.jsp','no']});
						}
					});
				}else{
					layer.alert(data.msg,{id:'itmbrrecmitlyr',title:false,area:['380px','auto'],closeBtn:0});
				}
			}
		});
	});
}
function isIELogin(){
layer.open({title:false,move:false,id:'loginSupportLy',type:1,resize:false,area:['450px','500px'],shade:[0.9,'#000'],shadeClose:false,closeBtn:0,
content:'<div class="alert alert-danger alert-dismissible fade in" style="padding-right:15px !important;" role="alert">'+
'<h4 style="margin-bottom:5px;font-size:16px;font-weight:bold;color:black;">不支持IE浏览器</h4>'+
'<p style="font-size:12px;text-indent:2em;">您使用的浏览器是<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>IE浏览器</strong>，建议使用<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>Chrome浏览器</strong>浏览网页！</p>'+
'<p style="font-size:13px;font-weight:bold;margin-top:10px;color:black;">建议使用浏览器：</p>'+
'<table class="dataintable browsersupport" style="width:95%;"><tr><th>Chrome（谷歌浏览器）</th></tr><tr><td class="bsChrome"></td></tr></table>'+
'<p style="font-size:12px;text-indent:2em;">其他浏览器，如<strong style="color:red;font-weight:bold;">firefox、safari、360浏览器极速模式、搜狗浏览器极速模式等</strong>都是<strong style="color:red;font-weight:bold;">支持</strong>的。</p>'+
'<p style="font-size:12px;text-indent:2em;">若使用<strong style="color:red;font-weight:bold;">360浏览器、搜狗浏览器</strong>等访问，请按下图设置成<strong style="color:red;font-weight:bold;">极速模式</strong></p>'+
'<table class="dataintable browsersupport" style="width:95%;"><tr><th>浏览器极速模式设置示意</th></tr><tr><td class="bs360"></td></tr></table>'+
'<p style="font-size:13px;font-weight:bold;margin-top:15px;position:relative;color:black;">浏览器下载：</p>'+
'<p style="line-height:20px;margin-bottom:20px;"><img style="height:20px;position:absolute;left:25px;" src="'+appPath+'/static/images/compatible_chrome.png">'+
'<a href="'+appPath+'/static/chrome/download_chrome.jsp" class="dcrme">Chrome浏览器(点击下载)</a></p></div>'});
}
function notSupFbl(){
layer.open({title:false,move:false,id:'fblSupportLy',type:1,resize:false,area:['450px','108px'],shade:[0.9,'#000'],shadeClose:true,
content:'<div class="alert alert-danger alert-dismissible fade in" style="padding-right:15px !important;" role="alert">'+
'<h4 style="margin-bottom:5px;font-size:16px;font-weight:bold;color:black;">请使用更大的分辨率</h4>'+
'<p style="font-size:12px;">您当前使用的分辨率是：<strong style="color:red;font-weight:bold;">'+window.screen.width+'x'+window.screen.height+'</strong>，使用该分辨率会导致网站显示错位。</p>'+
'<p style="font-size:12px;">建议使用<strong style="color:red;font-weight:bold;"> 1280x768 </strong>及其以上分辨率浏览本网站！</p>'+
'</div>'});
}
var msglistdata = null;
function initMessageList(){
   jspReqControl(function(){
	   var titletxt = "无 新消息";
	   if(msglistdata.length>0){titletxt = msglistdata.length+"条 新消息";}
	   
	   var content ='<div class="dropdown-menu" aria-labelledby="alertsDropdown">'+
						'<div class="dropdown-header text-center accent-bg">'+
						'<span class="a-dropdown__header-title" style="color:#FFF;text-align:left;cursor:default;">'+titletxt+'</span>'+
					'</div><ul class="msglistul">';
	   for(var i=0;i<msglistdata.length;i++){
		   content+=('<li msglistindex="'+i+'"><i class="glyphicon glyphicon-envelope"></i><a href="javascript:void(0)">'+msglistdata[i]['TITLE']+'</a><span>'+msglistdata[i]['CREATETIME']+'</span></li>');
	   }
	   content+='</ul><a class="dropdown-item view-all" onclick="initAllMsgs()" style="color:#5b6a86;font-size:12px;" href="javascript:void(0)">查看所有消息</a></div>';
	   
	   $('html,body').addClass("lockBody");
	   var CUR_OFFSET=$('#transformTopnavBar').offset().top>0?$('#transformTopnavBar').offset().top:0;
	   layer.open({title:false,skin:'animated flipInX show',id:'msglisthp',move:false,type:1,resize:false,closeBtn:0,area:['350px','280px'],shade:[0.01,'#fff'],
			offset:[CUR_OFFSET+50+'px',$('#shyepgmn').offset().left+780+'px'],shadeClose:true,anim:-1,
			success:function(layero, index){
				$('.msglistul').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
				$('.msglistul li').bind('click',function(){
					var msglistindex = $(this).attr('msglistindex');
					var msgps = '';
					if(msglistdata[msglistindex]['MSG_PS']){msgps=msglistdata[msglistindex]['MSG_PS'];}
					buildMsgShow(msglistdata[msglistindex]['CONTENT'],
								 msglistdata[msglistindex]['TYPE'],
								 msgps);
				});
				$('.msglistul li').one('click',function(){
					var msglistindex = $(this).attr('msglistindex');
					$.ajax({type:"POST",async:true,timeout:120*1000,dataType:"json",data:{'id':msglistdata[msglistindex]['ID']},
						   url:appPath+"/hrwp/setMsgIsRead",
					       success: function(data){
					    	   var emailnum = parseInt($('.newEmailNum').text())-1;
					    	   if(emailnum>0){$('.newEmailNum').text(emailnum);}else{$('.newEmailNum').hide();}
					       },error:function(xhr,textStatus,errorThrown){}
					});
				});
			},
			end:function(){$('html,body').removeClass("lockBody");},
			content:content
		});
   });
}
var BUILD_MSG_SHOW_PS = '';
function buildMsgShow(content,type,msgps){
	BUILD_MSG_SHOW_PS = msgps;
	if(type=='1'){
		layer.open({type:2,title:false,shadeClose:true,shade:[0.01,'#000'],area:['500px','600px'],
		      content:[appPath+'/views/welcome/'+content,'no']});
	}
}
function submit_form(formid,buttonid){
	IMGVAILDRESULT=false;
	var username=$('#username').val().trim();
	var password=$('#password').val().trim();
	if(username!=null&&username!=''&&password!=null&&password!=''){
		if(!sumbitted){
			sumbitted=true;
			var CUR_OFFSET=$('#transformTopnavBar').offset().top>0?$('#transformTopnavBar').offset().top:0;
			initImgVaild(function(){if(IMGVAILDRESULT){document.getElementById(formid).submit();document.getElementById(buttonid).disabled=true;}
			else{
				layer.open({move:false,type:4,resize:false,time:2000,closeBtn:0,tips:1,shade:[0.01,'#fff'],shadeClose:false,content:['验证码错误或未验证,请重新验证登录!','#submit_btn']});
				sumbitted=false;}
			},
			function(){layer.close(layer.index);sumbitted=false;},
			[CUR_OFFSET+50+'px',($('#userlogin').offset().left-80)+'px']);
		}
	}
}
var typetrans = ['','学会动态','学术活动','继续教育','地方快讯'];
function initSearch(){
	$('.content').mCustomScrollbar("disable");
	var searchval = $('#titlesearchinp').val().trim();
	if(searchval!=null&&searchval!=''){
		$('.cd-search-suggestions').show();
		$("#shRsltble").datagrid({
			width:$('#slx').width()-50,
			url:appPath+"/Hpwlm/initSearch",
			queryParams:{'search':searchval},
			border:false,
			fitColumns:true,
			nowrap:false,
			striped:false,
			singleSelect:true,
			showHeader:false,
			scrollbarSize:0,
			pagination:true,
			pageSize:10,
			columns:[[{field:'ID',hidden:true},
{field:'TITLE',title:'',width:100,formatter:function(value,row,index){if(value.length>30){return '<div class="trangelright"></div><a href="javascript:void(0)" style="font-size:13px;">'+value.substring(0,30)+'...</a>';}else{return '<div class="trangelright"></div><a href="javascript:void(0)" style="font-size:13px;">'+value+'</a>';}}},
{field:'DATETIME',title:'',width:20,formatter:function(value,row,index){return '[&nbsp;'+value+'&nbsp;]';}}
			]],
			onLoadSuccess:function(data){
				var total=data.total;
				$('#searchResultTitle').text('搜索结果（共'+total+'条记录）');
				if(total>10){ht_dg=500;}else{ht_dg=40*total+100;}
				$('#shRsltble').datagrid('resize',{width:$('#slx').width()-50,height:ht_dg});},
			onClickRow:function(rowIndex,rowData){
				$('#titlesearchinp').val('');
				$('.cd-search-trigger').removeClass('search-form-visible');
				$('.cd-main-search').removeClass('is-visible');
				$('.cd-cover-layer').removeClass('search-form-visible');
				setEnteredLoca(typetrans[rowData.TYPE]);
				$('.content').mCustomScrollbar("update");
				mainShowPg(rowData.ID);
				$('#shRsltble').datagrid('unselectRow',rowIndex);}
		});
		var pager = $('#shRsltble').datagrid().datagrid('getPager');pager.pagination({layout:['first','prev','links','next','last']});
	}
}
var AllMsgRows = null;
function initAllMsgs(){
	jspReqControl(function(){
		layer.close(layer.index);
		$.ajax({type:"POST",async:true,timeout:120*1000,dataType:"json",data:{'page':'1'},
			   url:appPath+"/hrwp/getAllMsgList",
			   beforeSend:function(){initLoading();},
		       success: function(data){
		    	   endLoading();
		    	   $('html,body').addClass("lockBody");
		    	   AllMsgRows = data.rows;
		    	   var content ='<div class="dropdown-menu" style="height:100%;border-radius:6px;overflow:hidden;" aria-labelledby="alertsDropdown">'+
		    		'<div class="dropdown-headern text-center accent-bgn">'+
		    		'<span class="a-dropdown__header-titlen" style="cursor:default;">用户消息列表</span></div><ul class="msglistul" style="height:360px !important;">';
		    	   for(var i=0;i<AllMsgRows.length;i++){
		    		   content+=('<li msglistindex="'+i+'"><i class="glyphicon glyphicon-envelope"></i><a href="javascript:void(0)">'+AllMsgRows[i]['TITLE']+'</a><span>'+AllMsgRows[i]['CREATETIME']+'</span></li>');
		    	   }
		    	   content+='</ul><div style="text-align:center;position:absolute;width:100%;bottom:0;"><div class="m-style M-box11" style="margin:5px auto !important;"></div></div>';
		    	   
		    	   layer.open({title:false,skin:'animated flipInX show',id:'AllMsgListXD',move:false,type:1,resize:false,closeBtn:0,area:['450px','500px'],shade:[0.2,'#000'],
		    			shadeClose:true,
		    			success:function(layero, index){
		    				$('.M-box11').pgnew({
				    		    mode: 'fixed',
				    		    totalData: parseInt(data.total),
				    		    showData: 10,
				    		    callback:function(api){
				    		    	$('.msglistul').mCustomScrollbar('destroy');
				    		    	initNextAllMsgList(api.getCurrent());
				    		    }
				    		});
		    				$('.msglistul').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		    				$('.msglistul li').bind('click',function(){
		    					var msglistindex = $(this).attr('msglistindex');
		    					var msgps = '';
		    					if(AllMsgRows[msglistindex]['MSG_PS']){msgps=AllMsgRows[msglistindex]['MSG_PS'];}
		    					buildMsgShow(AllMsgRows[msglistindex]['CONTENT'],
		    								 AllMsgRows[msglistindex]['TYPE'],
		    								 msgps);
		    				});
		    			},
		    			end:function(){$('html,body').removeClass("lockBody");},
		    			content:content
		    		});
		       },error:function(xhr,textStatus,errorThrown){}
		});
	});
}
function initNextAllMsgList(page){
	jspReqControl(function(){
		$.ajax({type:"POST",async:true,timeout:120*1000,dataType:"json",data:{'page':page},
			   url:appPath+"/hrwp/getAllMsgList",
			   beforeSend:function(){initLoading();},
		       success: function(data){
		    	   endLoading();
		    	   $('.msglistul').empty();
		    	   AllMsgRows = data.rows;
		    	   for(var i=0;i<AllMsgRows.length;i++){
		    		   $('.msglistul').append('<li msglistindex="'+i+'"><i class="glyphicon glyphicon-envelope"></i><a href="javascript:void(0)">'+AllMsgRows[i]['TITLE']+'</a><span>'+AllMsgRows[i]['CREATETIME']+'</span></li>');
		    	   }
		    	   
		    	   $('.msglistul').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		    	   
		    	   $('.msglistul li').bind('click',function(){
						var msglistindex = $(this).attr('msglistindex');
						var msgps = '';
						if(AllMsgRows[msglistindex]['MSG_PS']){msgps=AllMsgRows[msglistindex]['MSG_PS'];}
						buildMsgShow(AllMsgRows[msglistindex]['CONTENT'],
									 AllMsgRows[msglistindex]['TYPE'],
									 msgps);
					});
		       },error:function(xhr,textStatus,errorThrown){}
		});
	});
}
function initPdfReader(url){
	jspReqControl(function(){
		layer.open({
			   type: 2,
			   title:false,
			   content: imgshow_pathfix_noprj+'/static/pdfjs/web/viewer.html?file='+url,
			   shadeClose: true,
			   shade: [0.3,'#000'],
			   area: ['810px', '95%'],
			   maxmin: false
			 });
	});
}
function initImgPreview(url){
	jspReqControl(function(){
		var nImg = new Image();
		nImg.onload = function () {
			w = nImg.width;
			h = nImg.height;
			var imgheight = window.innerHeight-50;
			var imgwidth = w*(imgheight/h)
			layer.open({
			  type: 1,title:"文档预览",shadeClose: true,
			  shade: [0.3,'#000'],
			  area: [imgwidth+'px', imgheight+'px'],
			  content: '<div style="background:url(\''+imgshow_pathfix_noprj+'/'+url+'\');background-size: cover !important;background-repeat: no-repeat !important;background-position: center !important;overflow: hidden;width:'+imgwidth+'px;height:'+(imgheight-43)+'px;transition: 0.5s;border: 0;vertical-align: middle;"></div>'
			});
		}
		nImg.src = imgshow_pathfix_noprj+'/'+url;
	});
}
function initUserOptions(obj){
	jspReqControl(function(){
		$(obj).addClass("userloginIsInUser");
		var CUR_OFFSET=$('#transformTopnavBar').offset().top>0?$('#transformTopnavBar').offset().top:0;
		layer.open({title:false,skin:'animated flipInX show',id:'msglisthp',move:false,type:1,resize:false,closeBtn:0,area:['150px','215px'],shade:[0.01,'#fff'],
			offset:[CUR_OFFSET+50+'px',$('#shyepgmn').offset().left+950+'px'],shadeClose:true,
			end:function(){$(obj).removeClass("userloginIsInUser");$('html,body').removeClass("lockBody");},
			content:'<div class="webui-popover-content" style="padding:2px 0 !important;overflow:hidden;">'+
				'<div class="userInfoOpeaList" id="lginpgbnc" onclick="UserChgName();">'+
					'<a><i class="glyphicon glyphicon-pencil" style="margin-right:10px;"></i>昵称修改</a>'+
				'</div>'+
				'<div class="userInfoOpeaList" id="lginpgbdp" onclick="bindPhone2User();">'+
					'<a><i class="glyphicon glyphicon-phone" style="margin-right:10px;"></i>绑定手机号</a>'+
				'</div>'+
				'<div class="userInfoOpeaList" onclick="UserChgPassword();">'+
					'<a><i class="glyphicon glyphicon-lock" style="margin-right:10px;"></i>密码修改</a>'+
				'</div>'+
				'<div class="divider"></div>'+
				'<div class="userInfoOpeaList" onclick="initMyReg();">'+
					'<a><i class="glyphicon glyphicon-list-alt" style="margin-right:10px;"></i>我的申请</a>'+
				'</div>'+
				'<div class="userInfoOpeaList" onclick="initDldRegTb();">'+
				'<a><i class="glyphicon glyphicon-save" style="margin-right:10px;"></i>会员申请表下载</a>'+
				'</div>'+
				'<div class="divider"></div>'+
				'<div class="userInfoOpeaList" onclick="logout();">'+
					'<a><i class="glyphicon glyphicon-off" style="margin-right:10px;"></i>退出登录</a>'+
				'</div>'+
			'</div>'
		});
	});
}
function initDldRegTb(){
	jspReqControl(function(){
		layer.close(layer.index);
	   $('html,body').addClass("lockBody");
	   
	   var content ='<div class="dropdown-menu" style="height:100%;border-radius:6px;overflow:hidden;" aria-labelledby="alertsDropdown">'+
		'<div class="dropdown-headern text-center accent-bgn"><span class="a-dropdown__header-titlen" style="cursor:default;">会员申请表下载</span></div>'+
		'<ul class="AllMsgListXDul" style="width:280px !important;height:420px !important;">'+
			'<li class="myregmsglistinx" style="cursor:pointer;width:220px !important;height:50px;"><a href="'+appPath+'/template/memberRegOrg.docx" download="江苏省老年医学学会会员登记表.docx"><img style="position:absolute;left:2px;" src="'+appPath+'/static/imagess/office/docx.png" width="50"></img><span style="position:absolute;left:55px;top:20px;font-size:15px;font-weight:bold;">会员登记表（点击下载）</span></a></li>'+
			'<li class="myregmsglistinx" style="cursor:pointer;width:220px !important;height:50px;"><a href="'+appPath+'/template/groupRegOrg.docx" download="团体会员登记表.docx"><img style="position:absolute;left:2px;" src="'+appPath+'/static/imagess/office/docx.png" width="50"></img><span style="position:absolute;left:56px;top:20px;font-size:15px;font-weight:bold;">团体会员登记（点击下载）</span></a></li>'+
			'<li class="myregmsglistinx" style="cursor:pointer;width:220px !important;height:50px;"><a href="'+appPath+'/template/councilOrg.docx" download="江苏省老年医学学会理事登记表.docx"><img style="position:absolute;left:2px;" src="'+appPath+'/static/imagess/office/docx.png" width="50"></img><span style="position:absolute;left:55px;top:20px;font-size:15px;font-weight:bold;">理事登记表（点击下载）</span></a></li>'+
			'<li class="myregmsglistinx" style="cursor:pointer;width:220px !important;height:50px;"><a href="'+appPath+'/template/companyRegOrg.docx" download="江苏省老年医学学会企业会员申请表.docx"><img style="position:absolute;left:2px;" src="'+appPath+'/static/imagess/office/docx.png" width="50"></img><span style="position:absolute;left:55px;top:20px;font-size:15px;font-weight:bold;">企业登记表（点击下载）</span></a></li>'+
		'</ul>';
	   
	   layer.open({title:false,skin:'animated flipInX show',id:'DldRegTables',move:false,type:1,resize:false,closeBtn:0,area:['280px','380px'],shade:[0.1,'#000'],
			shadeClose:true,
			success:function(layero, index){
			},
			end:function(){$('html,body').removeClass("lockBody");},
			content:content
		});
	});
}
var ALLMyRegData = null;
var MYREG_FTRANS = ['<a class="label label-success" style="color:white !important;cursor:default;margin-right:5px;">已通过</a>',
                    '<a class="label label-warning" style="color:white !important;cursor:default;margin-right:5px;">审核中</a>',
                    '<a class="label label-danger" style="color:white !important;cursor:default;margin-right:5px;">不通过</a>',
                    '<a class="label label-danger" style="color:white !important;cursor:default;margin-right:5px;">不通过</a>'];
function initMyReg(){
	jspReqControl(function(){
		layer.close(layer.index);
		$.ajax({type:"POST",async:true,timeout:120*1000,dataType:"json",data:{},
			   url:appPath+"/hrwp/getMyRegs",
			   beforeSend:function(){initLoading();},
		       success: function(data){
		    	   ALLMyRegData = data;
		    	   endLoading();
		    	   $('html,body').addClass("lockBody");
		    	   
		    	   var content ='<div class="dropdown-menu" style="height:100%;border-radius:6px;overflow:hidden;" aria-labelledby="alertsDropdown">'+
		    						'<div class="dropdown-headern text-center accent-bgn">'+
		    						'<span class="a-dropdown__header-titlen" style="cursor:default;">我的申请列表</span>'+
		    					'</div>';
		    	   var ul1 = '<ul class="AllMsgListXDul" style="height:420px !important;"><p style="margin-bottom:5px;font-weight:bold;">个人会员申请</p>';
		    	   var ul2 = '<ul class="AllMsgListXDul" style="height:420px !important;"><p style="margin-bottom:5px;font-weight:bold;">团体会员申请</p>';
		    	   var ul3 = '<ul class="AllMsgListXDul" style="height:420px !important;"><p style="margin-bottom:5px;font-weight:bold;">理事会员申请</p>';
		    	   var ul4 = '<ul class="AllMsgListXDul" style="height:420px !important;"><p style="margin-bottom:5px;font-weight:bold;">企业会员申请</p>';
		    	   for(var i=0;i<ALLMyRegData.length;i++){
		    		   if(ALLMyRegData[i]['sqlx']=='个人会员申请'){
		    			   ul1+=('<li msglistindex="'+i+'" class="myregmsglistinx">'+MYREG_FTRANS[parseInt(ALLMyRegData[i]['FLAG'])]+'<a href="javascript:void(0)">'+ALLMyRegData[i]['sqlx']+'</a><p>'+ALLMyRegData[i]['CREATETIME']+'</p></li>');
		    		   }else if(ALLMyRegData[i]['sqlx']=='团体会员申请'){
		    			   ul2+=('<li msglistindex="'+i+'" class="myregmsglistinx">'+MYREG_FTRANS[parseInt(ALLMyRegData[i]['FLAG'])]+'<a href="javascript:void(0)">'+ALLMyRegData[i]['sqlx']+'</a><p>'+ALLMyRegData[i]['CREATETIME']+'</p></li>');
		    		   }else if(ALLMyRegData[i]['sqlx']=='理事会员申请'){
		    			   ul3+=('<li msglistindex="'+i+'" class="myregmsglistinx">'+MYREG_FTRANS[parseInt(ALLMyRegData[i]['FLAG'])]+'<a href="javascript:void(0)">'+ALLMyRegData[i]['sqlx']+'</a><p>'+ALLMyRegData[i]['CREATETIME']+'</p></li>');
		    		   }else{
		    			   ul4+=('<li msglistindex="'+i+'" class="myregmsglistinx">'+MYREG_FTRANS[parseInt(ALLMyRegData[i]['FLAG'])]+'<a href="javascript:void(0)">'+ALLMyRegData[i]['sqlx']+'</a><p>'+ALLMyRegData[i]['CREATETIME']+'</p></li>');
		    		   }
		    	   }
		    	   ul1+='</ul>';ul2+='</ul>';ul3+='</ul>';ul4+='</ul>';
		    	   content+=ul1;content+=ul2;content+=ul3;content+=ul4;
		    	   
		    	   layer.open({title:false,skin:'animated flipInX show',id:'AllMsgListXD',move:false,type:1,resize:false,closeBtn:0,area:['808px','500px'],shade:[0.1,'#000'],
		    			shadeClose:true,
		    			success:function(layero, index){
		    				$('.AllMsgListXDul').mCustomScrollbar({theme:"minimal-dark",scrollInertia:100});
		    				$('.AllMsgListXDul li').bind('click',function(){
		    					var msglistindex = $(this).attr('msglistindex');
		    					buildRegShow(ALLMyRegData[msglistindex]);
		    				});
		    			},
		    			end:function(){$('html,body').removeClass("lockBody");},
		    			content:content
		    		});
		       },error:function(xhr,textStatus,errorThrown){}
		});
	});
}
var BUILDREGDATA=null;
function buildRegShow(data){
	BUILDREGDATA = data;
	if(data.sqlx=='团体会员申请'){
		layer.open({type:2,title:false,shadeClose:true,shade:[0.7,'#000'],area:['1220px','610px'],
		      content:[appPath+'/views/welcome/groupRegStepEditDlg.jsp','no']});
	}else if(data.sqlx=='理事会员申请'){
		layer.open({type:2,title:false,shadeClose:true,shade:[0.7,'#000'],area:['1050px','580px'],
		      content:[appPath+'/views/welcome/councilRegStepEditDlg.jsp','no']});
	}else if(data.sqlx=='个人会员申请'){
		layer.open({type:2,title:false,shadeClose:true,shade:[0.7,'#000'],area:['1220px','610px'],
		      content:[appPath+'/views/welcome/memberRegStepEditDlg.jsp','no']});
	}else{
		layer.open({type:2,title:false,shadeClose:true,shade:[0.7,'#000'],area:['650px','700px'],
		      content:[appPath+'/views/welcome/companyRegStepEditDlg.jsp','no']});
	}
}
function UserChgName(){
	jspReqControl(function(){
		layer.close(layer.index);
		layer.open({title:false,id:'hnusername',move:false,type:1,resize:false,closeBtn:0,area:['400px','130px'],shade:[0.01,'#fff'],shadeClose:true,
			zIndex:10,
			end:function(){$('html,body').removeClass("lockBody");},
			success:function(){
				chagUnmBtnIsNotClick = true;
				$('#usermn').validatebox({
				    required: true,
				    validType:'length[1,20]',
				    invalidMessage:'您的昵称不能超过20个字符',
				    missingMessage:'请输入新的昵称'
				});
				$('#nmxxsgupbtns').bind('click',function(){
					if($('#usermn').validatebox('isValid')){
						if(chagUnmBtnIsNotClick){
							chagUnmBtnIsNotClick = false;
							$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",
								data:{'data':$("#usermn").val(),'id':USER_ID},
								url:appPath+"/hrwp/changeUserName",
        						success: function(data){
        							if(data){
        								closeAllLayer();
        								if(data[0]['result']=='success'){
        									USER_PHONE=$("#bindphone").val();
        									launchMsg('修改成功！','新的昵称，将在您下次登录时启用','success',3000);
        								}else{
        									launchMsg('修改失败！','修改失败，请稍后再试，或联系管理员','error',3000);chagUnmBtnIsNotClick = true;
        								}
        							}
        						},error:function(xhr,textStatus,errorThrown){closeAllLayer();launchMsg("系统异常","系统异常:"+textStatus,'error',3000);}});
						}
					}else{
						$('#usermn').focus();
					}
				});
			},
			content:'<div style="padding:20px;"><div class="signup_form_div">'+
	              '<label>修改昵称</label>'+
	              '<i class="glyphicon glyphicon-edit" style="position:absolute;right:12px;top:25px;"></i>'+
	              '<input type="text" id="usermn" class="minimal" name="usermn" placeholder="请输入新的昵称">'+
	           '</div>'+
	              '<div class="signup_form_div">'+
	              '<button type="button" id="nmxxsgupbtns" class="sgupbtn">确认修改</button>'+
	              '</div>'+
	           '</div>'
		});
	});
}
function UserChgPassword(){
	jspReqControl(function(){
	layer.close(layer.index);
	layer.open({title:false,id:'uchagpswd',move:false,type:1,resize:false,closeBtn:0,area:['400px','250px'],shade:[0.01,'#fff'],shadeClose:true,
		zIndex:10,
		end:function(){$('html,body').removeClass("lockBody");},
		success:function(){
			chagPwdBtnIsNotClick = true;
			$.extend($.fn.validatebox.defaults.rules, {
			    equals: {
			        validator: function(value,param){
			            return value == $(param[0]).val();
			        },
			        message: '两次输入的密码不匹配！'
			    }
			});
			$('#chagPswd').validatebox({
			    required: true,
			    missingMessage:'请输入目前正在使用的密码'
			});
			$('#plainPassword').validatebox({
				required: true,
				missingMessage:'请输入新密码'
			});
			$('#surePassword').validatebox({
				required: true,
				validType: 'equals["#plainPassword"]',
				missingMessage:'请再次输入新密码'
			});
			$('#lgxxchagpwd').bind('click',function(){
				if(checkIsAllInsert()&&(chagPwdBtnIsNotClick)){
					chagPwdBtnIsNotClick = false;
					$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",data:{'data':$('#changeUserPasswordForm').serialize()},
						url:appPath+"/user/changePassword",
						success: function(data){
							if(data){
								closeAllLayer();
								if(data['flag']=='success'){
									launchMsg('密码修改成功！',data['result'],'success',3000);
								}else{
									launchMsg('密码修改失败！',data['result'],'error',3000);chagPwdBtnIsNotClick = true;
								}
							}
					},error:function(xhr,textStatus,errorThrown){closeAllLayer();launchMsg("系统异常","系统异常:"+textStatus,'error',3000);}});
				}
			});
		},
		content:'<div style="padding:20px;"><form id="changeUserPasswordForm" method="post"><div class="signup_form_div">'+
              '<label>目前正在使用的密码</label>'+
              '<i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>'+
              '<input type="password" id="chagPswd" class="minimal" name="PASSWORD" placeholder="请输入目前正在使用的密码">'+
           '</div>'+
           '<div class="signup_form_div">'+
              '<label>新密码</label>'+
              '<i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>'+
              '<input type="password" id="plainPassword" class="minimal" name="plainPassword" placeholder="请输入新密码">'+
           '</div>'+
           '<div class="signup_form_div">'+
              '<label>确认新密码</label>'+
              '<i class="glyphicon glyphicon-lock" style="position:absolute;right:12px;top:25px;"></i>'+
              '<input type="password" id="surePassword" class="minimal" name="surePassword" placeholder="请再次输入新密码">'+
           '</div>'+
              '<div class="signup_form_div">'+
              '<button type="button" id="lgxxchagpwd" class="sgupbtn">确认修改密码</button>'+
              '</div></form>'+
           '</div>'
	});
	});
}
function checkIsAllInsert(){
	var result = true;
	$('.minimal').each(function(){
		result = result&&($(this).validatebox('isValid'));
		if(!result){$(this).focus(); }
		return result;
	});
	return result;
}
function bindPhone2User(){
	jspReqControl(function(){
	if(USER_PHONE!=''&&USER_PHONE!=null){
		layer.tips('您已绑定了手机号，如需更换，请联系管理员！', '#lginpgbdp', {
		    tips: [4, '#000'],timer:2000,shade:[0.01,'#fff'],shadeClose:false
		});
	}else{
		layer.close(layer.index);
		layer.open({title:false,id:'hnphone',move:false,type:1,resize:false,closeBtn:0,area:['400px','130px'],shade:[0.01,'#fff'],shadeClose:true,
			zIndex:10,
			end:function(){$('html,body').removeClass("lockBody");},
			success:function(){
				bindPhoneBtnIsNotClick = true;
				$.extend($.fn.validatebox.defaults.rules, {
				    checkPhone:{
				        validator: function (value){
				        	if(value.match(/^1[3|4|5|6|7|8][0-9]{9}$/)){
				        		var checkR=$.ajax({  
					                async : false,    
					                cache : false,  
					                type : 'post',    
					                url : appPath+'/user/checkHasPhone',    
					                data : {'signcode' : value}   
					            }).responseText;   
					            return checkR==="true";
				        	}else{
				        		return false
				        	}
				        },  
				        message: '该手机号已被绑定,或输入的手机号不正确！'  
				    }
				});
				$('#bindphone').validatebox({
				    required: true,
				    validType: 'checkPhone',
				    missingMessage:'请输入手机号'
				});
				$('#lgxxsgupbtns').bind('click',function(){
					if($('#bindphone').validatebox('isValid')){
						if(bindPhoneBtnIsNotClick){
							bindPhoneBtnIsNotClick = false;
							$.ajax({type:"POST",async:false,timeout:120*1000,dataType:"json",data:{'data':$("#bindphone").val(),'id':USER_ID},
								url:appPath+"/hrwp/bindPhone",
        						success: function(data){
        							if(data){
        								closeAllLayer();
        								if(data[0]['result']=='success'){
        									USER_PHONE=$("#bindphone").val();
        									launchMsg('绑定成功！','您现在可以通过，绑定的手机号，登录网站','success',3000);
        								}else{
        									launchMsg('绑定失败！','绑定失败，请稍后再试，或联系管理员','error',3000);bindPhoneBtnIsNotClick = true;
        								}
        							}
        						},error:function(xhr,textStatus,errorThrown){closeAllLayer();launchMsg("系统异常","系统异常:"+textStatus,'error',3000);}});
						}
					}else{
						$('#bindphone').focus();
					}
				});
			},
			content:'<div style="padding:20px;"><div class="signup_form_div">'+
	              '<label>绑定手机号</label>'+
	              '<i class="glyphicon glyphicon-phone" style="position:absolute;right:12px;top:25px;"></i>'+
	              '<input type="phone" id="bindphone" class="minimal" name="phone" placeholder="请输入手机号">'+
	           '</div>'+
	              '<div class="signup_form_div">'+
	              '<button type="button" id="lgxxsgupbtns" class="sgupbtn">确认绑定</button>'+
	              '</div>'+
	           '</div>'
		});
	}
	});
}
var chagPwdBtnIsNotClick = true;
var bindPhoneBtnIsNotClick = true;
var chagUnmBtnIsNotClick = true;
function launchMsg(title,text,type,timer){swal({title:title,text:text,type:type,timer:timer,showConfirmButton:false});}
function initLoading(){layer.msg('加载中', {icon:16,shade:0.5,zIndex:99999999});}
function closeAllLayer(){layer.closeAll();}
function endLoading(){layer.close(layer.index);}
function initAutnc(){layer.msg('请先注册并登录后，再次尝试！');};
function logout(){window.location.href=appPath+'/logout';}
function startLogin(obj){initloginDlg($(obj),false);}
function initDownLoad(action,fileName,fileLocation,fileType){var form=$("<form>");form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",action);var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","fileName");input1.attr("value",fileName);var input2=$("<input>");input2.attr("type","hidden");input2.attr("name","fileLocation");input2.attr("value",fileLocation);var input3=$("<input>");input3.attr("type","hidden");input3.attr("name","fileType");input3.attr("value",fileType);$("body").append(form);form.append(input1);form.append(input2);form.append(input3);form.submit();$(form).remove();}
function setEnteredLoca(loca){ENTERED_LOCA=loca;}
function localScrollTop(){return $(window).scrollTop();}
function localScrollTo(h){$('.content').mCustomScrollbar('scrollTo',h,{scrollInertia:0});}
function setIframeHeight(h){document.getElementById("mainIfmSpc").style.height=h+"px";}
function turnAthrPg(src){document.getElementById("mainIfmSpc").src=src;}
function swalAlert(title,text,type,timer){swal({title:title,text:text,type:type,timer:timer,showConfirmButton:false});}
function initStillBuilding(){layer.msg('网站功能正在建设中！');}
function jspReqControl(callback){$.ajax({type:"POST",async:false,url:appPath+"/ursm/rc",timeout:120*1000,dataType:"json",success:function(data){callback();},error:function(xhr,textStatus,errorThrown){}});}
function initHomePage(){
	$('#shyepgmn').html('<div id="wlcmPgBd" style="width:1050px;margin-left:auto;margin-right:auto;padding:20px 0px;">'+
			'<div style="display:none;" class="homepageeventloc"></div>'+
		'<div class="notePanel">'+
			'<a href="javascript:void(0)" class="txtLeftTitle"><i class="glyphicon glyphicon-volume-up" style="margin-right:2px;position:absolute;top:11px;left:-20px;"></i>重要通知：</a>'+
			'<div class="txtScroll-top"><div class="bd"><ul class="infoList" id="topInfoList"></ul></div></div>'+
		'</div>'+
		'<table id="mainModalTb" style="margin-top:30px;margin-bottom:30px;">'+
			'<tr><td width="500"><div class="tbLeftSqr"><ul class="mySlideshow"></ul></div></td><td style="width:30px;"></td><td width="500" valign="top"><div class="tbLeftSqr" id="MainPanel_1_td"></div></td></tr>'+
			'<tr style="height:30px;"></tr>'+
			'<tr><td width="500" valign="top"><div id="MainPanel_2_td" class="tbLeftSqr"></div></td><td style="width:30px;"></td><td width="500" valign="top"><div id="MainPanel_3_td" class="tbLeftSqr"></div></td></tr>'+
			'<tr style="height:30px;"></tr>'+
			'<tr>'+
				'<td width="500" valign="top"><div id="MainPanel_4_td" class="tbLeftSqr"></div></td>'+
				'<td style="width:30px;"></td>'+
				'<td valign="top" width="500">'+
					'<div class="tbLeftSqr"><div class="divHpPgTitle"><i class="zxfw"></i>会员服务</div>'+
					'<div class="ul_1_right">'+
						'<div class="hi-icon-wrap hi-icon-effect-9 hi-icon-effect-9b">'+
							'<div class="containerForHicon" id="membreg">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-lsuser" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会会员申请</a>'+
							'</div>'+
							'<div class="containerForHicon" id="groupreg">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-lsgroup" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会团体申请</a>'+
							'</div>'+
							'<div class="containerForHicon" id="zlxz">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-lsstock" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon">资料下载</a>'+
							'</div>'+
							'<div class="containerForHicon" id="yjfk">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-lsedit" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon">意见反馈</a>'+
							'</div>'+
							'<div class="containerForHicon" id="councilreg">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-myspace" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">学会理事申请</a>'+
							'</div>'+
							'<div class="containerForHicon" id="companyreg">'+
								'<a href="javascript:void(0)" class="hi-icon hi-icon-lscmpn" style="position:relative;"></a>'+
								'<a href="javascript:void(0)" class="txtForHicon" style="left:7px !important;">企业会员申请</a>'+
							'</div>'+
						'</div>'+
					'</div></div>'+
				'</td>'+
			'</tr>'+
		'</table>'+
		'</div>');
	
	initInfoList();
	initMainModalTables();
	$('.topbar').show();$('#zlight-nav').css('position','relative');localScrollTo(0);
}
var icons_list=["xxdt","xxjl","jxjy","dfkx"]
function initMainModalTables(){
$.ajax({
	type: "POST"
	,url: appPath+"/Hpwlm/initMainModalTables"
	,async:false
	,data: {}
	,success: function(data){
		var imgloops = data['IMGS_LOOP'];
		var imgloopTarget = $('.mySlideshow');
		for(var imx=0;imx<imgloops.length;imx++){
			var img_tar_url = imgloops[imx]['SET_HPIC_URI'];
			if((img_tar_url.toLowerCase().indexOf('http://')==-1)&&(img_tar_url.toLowerCase().indexOf('http:\\')==-1)){
				img_tar_url = imgshow_pathfix_noprj + img_tar_url;
			}
			$(imgloopTarget).append('<li idx="'+imx+'" style="background:url('+img_tar_url+') center no-repeat;background-size:contain;">'+
	                '<div class="animated fadeInRight" style="font-size:14px;padding:10px 0px 10px 5px;">'+imgloops[imx]['TITLE']+'</div></li>');
		}
		$(imgloopTarget).edslider({width:500,height:400});			
		$('.mySlideshow li').bind('click',function(){
			openMainAricle(imgloops[$(this).attr('idx')]['ID'],'最新资讯');
		});
		
		var leftTitles = data['MODAL_TITLE'];
		for(var lt=0;lt<leftTitles.length;lt++){
			$('#MainPanel_'+leftTitles[lt]['TYPE']+'_td').append('<div class="divHpPgTitle divHpPgListInUse" type="'+leftTitles[lt]['TYPE']+'"><i class="'+icons_list[lt]+'"></i>'+leftTitles[lt]['TITLE']+'<a href="javascript:void(0)" class="show-more"><i class="ti-arrow-right"></i></a></div><div><ul class="ul_1_right"></ul></div>');
		}
		
		var modalInside = data['MODAL_INSIDE'];
		for(var mi=0;mi<modalInside.length;mi++){
			var titleTxt = modalInside[mi]['TITLE'];
			if(titleTxt.length>25){titleTxt = titleTxt.substr(0,25)+'...';}
			$('#MainPanel_'+modalInside[mi]['TYPE']+'_td .ul_1_right').append('<li id="'+modalInside[mi]['ID']+'" type="'+modalInside[mi]['TYPE']+'">'+
					'<a href="javascript:void(0);">'+titleTxt+'</a>'+
					'<a href="javascript:void(0);" class="mainHpPgTimeFlag">['+modalInside[mi]['DATETIME']+']</a>'+
					'</li>');
		}
		$('.divHpPgListInUse').bind('click',function(){
			setEnteredLoca($(this).text());
			mainListCnt($(this).attr('type'));
		});
		$('.ul_1_right li').bind('click',function(){
			openMainAricle($(this).attr("id"),$('#MainPanel_'+$(this).attr('type')+'_td .divHpPgTitle').text());
		});
		
		$('#zlxz').bind('click',function(){ zlFile();localScrollTo(0);});
		
		if(isLogin){
			$('#membreg').bind('click',function(){initMemberReg();});
			$('#groupreg').bind('click',function(){initGroupReg();});
			$('#yjfk').bind('click',function(){initAdvice();});
			$('#councilreg').bind('click',function(){initCouncilReg();});
			$('#companyreg').bind('click',function(){initCompanyReg();});
		}else{
			$('#membreg').bind('click',function(){initAutnc();});
			$('#groupreg').bind('click',function(){initAutnc();});
			$('#yjfk').bind('click',function(){initAutnc();});
			$('#councilreg').bind('click',function(){initAutnc();});
			$('#companyreg').bind('click',function(){initAutnc();});
		}
	}
	,error:function(xhr,textStatus,errorThrown){}
});
}
function initInfoList(){
	$.ajax({
		type:"POST",async:true,data:{},url:appPath+"/Hpwlm/initInfoList",error:function(xhr,textStatus,errorThrown){},
		success: function(data){
			var til = $('#topInfoList');
			til.empty();
			for(var x in data){$(til).append('<li id="'+data[x]['ID']+'"><a href="javascript:void(0);">'+data[x]['TITLE']+'</a><span>['+data[x]['DATETIME']+']</span></li>');}
			$('#topInfoList li').bind('click',function(){ENTERED_LOCA = "重要通知";mainShowPg($(this).attr("id"));});
			$(".txtScroll-top").slide({mainCell:".bd ul",autoPlay:true,effect:"top",vis:1});
		}
	});
}
function mainShowPg(noteid){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:45px 0px 30px 0px;" class="fixedLockBar"><div id="wlcmSpg">'+
			'<div id="wlcmSpgTopTitle"></div>'+
			'<div id="wlcmSpilter"></div>'+
			'<div id="wlcmSpgMainPl"></div>'+
			'<div id="wlcmAttachMent"></div>'+
		'</div></div>');
	
    $.ajax({
		type: "POST"
		,url: appPath+"/Hpwlm/getHpNewsById"
		,async:false
		,data: {'noteId':noteid}
		,success: function(data){
			$('#wlcmSpgTopTitle').html(data['TITLE']);
			$('#wlcmSpgMainPl').html(data['CONTENT']);
			var attachments = data['ATTACHMENT'];
			$('#wlcmAttachMent').empty();
			if(attachments!=null&&attachments!=''){
				$('#wlcmAttachMent').addClass('wlcmAttachTopBd');
				$('#wlcmAttachMent').append('<div class="AttachmentTitle">附件：</div>');
				var attachList = attachments.split(',');
				for(var i=0;i<attachList.length;i++){
					var attchtitle = attachList[i].substring(attachList[i].lastIndexOf('/')+1)
					$('#wlcmAttachMent').append('<li style="position:relative;margin-left:10px;" dnm="'+attchtitle+'"  dnuri="'+attachList[i]+'"><a href="javascript:void(0)" class="glyphicon glyphicon-file"></a><a href="javascript:void(0)">'+attchtitle+'</a></li>');
				    $('#wlcmAttachMent li').bind('click',function(){
				    	initDownLoad(imgshow_pathfix_noprj+'/Hpwlm/downloadHasName',$(this).attr('dnm'),$(this).attr('dnuri'),"")
				    });
				}
			}
			
			localScrollTo(0);
			$('#wlcmSpilter').html("<i class='glyphicon glyphicon-time plTtauthAdj'></i><span>"+data["CREATE_TIME"]+
					"</span><div class='lineSpaceDiff' /><i class='glyphicon glyphicon-pencil plTtauthAdj'></i><span>"+data["CREATOR"]+"</span>");
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
}
function mainListCnt(type){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:60px 0px 0px 0px;" class="fixedLockBar"><div id="wlcmlcContainer" style="position:relative;">'+
			'<div id="wlcmPgBd" class="mainListCntDg">'+
	        '<div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;"><li style="cursor:pointer;" onclick="initHomePage()"><a href="javascript:void(0)" style="color:#000;">首页</a><div class="backTriangle"></div><div class="backTriangleBorder"></div></li><li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);"></a><div class="backTriangle"></div></li></div>'+
			'<div class="mainArticleList"><ul class="mainListUl"></ul></div>'+
			'<div style="text-align:center;margin:35px 0;">'+
				'<button class="down-button-more" pageno="1" style="width: 104px; height: 36px;">'+
					'<span id="moreText">查看更多</span>'+
				'</button>'+
			'</div>'+
		'</div>'+
		'<div id="wlcmMlcd" class="mainListCntLd"></div>'+
	'</div></div>');
	getContentList(1,type);
}
var initState = false;
function getContentList(page,type){
	$.ajax({
		   type:"POST",async:false,timeout:120*1000,dataType:"json",error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);},
		   url:appPath+"/Hpwlm/getHpNewsList",data:{'TYPE':type,"page":page},
		   beforeSend:function(){initLoading();initState = false;},
	       success: function(data){
	    	   endLoading();
	    	   if(!initState){
		    	   $('.activeLL a').text(data.DGTOP_TITLE);
				   var leftTitle = data.LEFT_TITLE;
				   $('#wlcmMlcd').empty();
				   $('#wlcmMlcd').append('<div class="mainListCntTitle"><div></div><i class="glyphicon glyphicon-list"></i><span>'+leftTitle[0]['TITLE']+'</span></div>');
				   for(var i=1;i<leftTitle.length;i++){
					  $('#wlcmMlcd').append('<div class="navbarx" type="'+type+'">'+leftTitle[i]['TITLE']+'</div>');
				   }
				   $('.navbarx').bind('click',function(){mainListCnt($(this).attr('type'));});

				   if(page==Math.ceil(parseInt(data.total)/10)){
					   $('#moreText').html('已无更多文章');
				   }else{
					   $('.down-button-more').one('click',function(){
						   var nextwlpage = parseInt($('.down-button-more').attr('pageno'))+1;
						   getContentList(nextwlpage,type);
						   $('.down-button-more').attr('pageno',nextwlpage);
					   });
				   }
				   initState = true;
	    	   }
			   
			   var rowsdata = data.rows;
			   if(rowsdata.length!=0){
				   for(var i=0;i<rowsdata.length;i++){
					   if(rowsdata[i]['QUICK_IMG']!=null&&rowsdata[i]['QUICK_IMG']!=''){
						   var qick_img = rowsdata[i]['QUICK_IMG'];
						   if(qick_img.toLowerCase().indexOf('http://')>-1||qick_img.toLowerCase().indexOf('http:\\')>-1){
							   qick_img = qick_img;
						   }else{
							   qick_img = imgshow_pathfix+qick_img;
						   }
						   $('.mainListUl').append('<li class="mainListLi"><a class="mainListpic">'+
					             "<div style=\"background:url('"+qick_img+"');\"></div>"+
					             "<span>"+(type=='4'?"分会":data.DGTOP_TITLE.substring(2,4))+"</span></a>"+
					         '<p class="quick_desc">'+
					         '<a class="quick_desc_title" id="'+rowsdata[i]['ID']+'">'+rowsdata[i]['TITLE']+'</a>'+
					         '<span class="time"><i class="glyphicon glyphicon-time"></i>'+rowsdata[i]['DATETIME']+'</span>'+
					         '<span class="introduction">'+rowsdata[i]['QUICK_DESC']+'</span></p></li>');
					   }else{
						   $('.mainListUl').append('<li class="mainListLi mainListLi-nopic"><p class="mainListpic"><span>'+data.LIST_FLAG+'</span></a></p>'+
						     '<p class="quick_desc">'+
						     '<a class="quick_desc_title" id="'+rowsdata[i]['ID']+'">'+rowsdata[i]['TITLE']+'</a>'+
						     '<span class="time"><i class="glyphicon glyphicon-time"></i>'+rowsdata[i]['DATETIME']+'</span>'+
							 '<span class="introduction">'+rowsdata[i]['QUICK_DESC']+'</span></p></li>');
					   }
				   }
				   $('.mainListUl li:last').attr('id','pageAnchor_'+page);
				   $('.quick_desc_title').bind('click',function(){
					   openMainAricle($(this).attr('id'),'');
				   });
		    	   ht_dg = null;
				   $('#wlcmlcContainer').height(162*($('.mainListUl li').length)+10+200);
				   if(page!=1){
		    		   $('.content').mCustomScrollbar("stop");
		    	   }else{
		    		   localScrollTop();
		    		   localScrollTo(0);
		    	   }
			   }
		   }
		});
}
function entrancefnc(loc){
	if(loc=='HOMEPAGE'){initHomePage();}
	else if(loc=='ABORTSOCIETY'){abortSociety();}
	else if(loc=='XHFILE'){xhfilelist();}
	else{
		if(loc.indexOf('MAINLIST')>-1){mainListCnt(loc.substring(loc.length-1,loc.length));}
	}
}
function pageStillBuilding(){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:60px 0px 30px 0px;" class="fixedLockBar"><div id="wlcmSpg"><div id="plTtleshow" class="plTtleshowd plTtswdadj"><li style="cursor:pointer;" onclick="initHomePage()"><a href="javascript:void(0)" style="color:#000;">首页</a><div class="backTriangle"></div><div class="backTriangleBorder"></div></li><li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">正在建设</a><div class="backTriangle"></div></li></div><div style="text-align:center;"><div id="wlcmSpgTopTitle" style="margin-bottom:60px;margin-top:0px;margin-left:30px;color:#666;">网站功能正在建设中，敬请期待 ~</div><img src="'+appPath+'/static/images/stillBuilding/sggcs.png" style="width:450px !important;"></img></div></div></div>');
}
function abortSociety(){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:60px 0px 30px 0px;" class="fixedLockBar"><div id="wlcmlcContainer" style="position:relative;">'+
			'<div id="wlcmPgBd" class="mainListCntDg">'+
	        '<div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">'+
	        	'<li style="cursor:pointer;" onclick="initHomePage()">'+
	        	'<a href="javascript:void(0)" style="color:#000;">首页</a>'+
	        	'<div class="backTriangle"></div>'+
	        	'<div class="backTriangleBorder"></div></li>'+
	        		'<li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">学会概况</a><div class="backTriangle"></div></li>'+
	        	'</div>'+
			'<div class="mainArticleList">'+
			'</div>'+
		'</div>'+
		'<div id="wlcmMlcd" class="mainListCntLd">'+
			'<div class="mainListCntTitle">'+
				'<div></div><i class="glyphicon glyphicon-flag"></i><span>关于学会</span>'+
			'</div>'+
			'<div class="navbarx navbarx_clk" type="0" onclick="abortSocietyCg(this)">学会概况</div>'+
			'<div class="navbarx" type="1" onclick="abortSocietyCg(this)">组织架构</div>'+
		'</div>'+
	'</div></div>');
	var hmags = ascgarray[0];
	while(hmags.indexOf('${ctx}')>-1){
		hmags = hmags.replace('${ctx}',appPath);
	}
	$('.mainArticleList').html(hmags);
	$('#wlcmlcContainer').height(setHgval[0]);
}
var ascgarray = ['<div id="wlcmSpgTopTitle">江苏省老年医学学会概况</div>'+
    			 '<div id="wlcmSpgMainPl" style="margin-top: 10px !important;">'+
    			 	'<p style="line-height:35px;">江苏省老年医学学会（Jiangsu Geriatrics Society，JGS）是经江苏省民政厅注册核准的全省性、学术性、非营利性的社会团体。学会坐落于省会城市南京著名的颐和公馆风景区旁；学会由立志从事研究和推进老年医学的医疗卫生机构、科研院所、医养结合机构等单位及医药卫生科技工作者、社会各界热心老年医学事业的人士自愿组成，具有社会团体法人资格。学会于2018年5月12日在南京成立，许家仁当选学会会长，冯美江、任利群、王春、吴剑卿、熊亚晴当选学会副会长<font style="font-size:10px;">（副会长按拼音排序）</font>。会员范围涵盖全省十三个地级市的综合医院和专科医院，目前在册会员1288名，理事单位46家，理事109名，常务理事35名。已成立有血液、营养与食品安全、医养结合、重症医学、代谢与衰弱、中医老年医学和老年内分泌等七个分会/专业委员会，正在筹备成立的分会/专业委员会有：心血管病、肿瘤、慢性病健康管理、神经病学和妇科学五个分会。</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会宗旨：</font>认真贯彻我国老龄和卫生工作方针，充分运用现代医学、中国传统医学的理论和高新技术，围绕老年人口健康需求，研究、探索老年健康与老年医学发展的规律和延缓衰老的对策，推进老年医学学科体系建设和科技进步，促进与老年医疗相关的科学技术繁荣和发展、普及和推广，培养造就老年医学人才，不断提高为老年人医疗健康服务的技术水平和服务质量，为实现健康老龄化、全面建成小康社会做出积极贡献。</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">业务范围：</font>积极开展老年医学学术研究，国内外学术交流与合作；协助卫生行政主管部门、行业协会建设高素质的老年医学人才队伍；探索医养结合新模式，推动信息化技术在老年医疗健康服务中的应用；编辑出版学术和科普刊物、著作、案例、资料和会刊，以满足老年人不同层次的医疗卫生服务及康复保健需求。</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会会徽：</p>'+
    				'<img src="${ctx}/static/images/abortSociety/xhgk_hh.png" style="width:250px !important;"></img>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">会徽诠释：</font>上方是江苏省老年医学学会中文，下方是江苏省老年医学学会英文（Jiangsu Geriatrics Society）。桃形代表健康长寿，桃底部代表具有生命力的绿叶。中央图案中的蛇杖寓意医学，背景为江苏地图；主体以深浅绿色交替，象征老年医学事业生机盎然。</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会地址：</font>江苏省南京市鼓楼区珞珈路30号</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会邮编：</font>210024</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会网址：</font>www.jsslnyxxh.com</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会邮箱：</font>jsslnyxxh@126.com</p>'+
    				'<p style="line-height:35px;"><font style="font-weight:900;font-size:17px;">学会电话：</font>025-83723225</p>'+
    				'<br/>'+
    			 '</div>',
                 '<div id="wlcmSpgTopTitle">江苏省老年医学学会机构设置及职能</div><div class="subSpilter" style="width: 640px !important;margin-top: 30px;"></div><div id="wlcmSpgMainPl" style="margin-top: 0px !important;"><img src="${ctx}/static/images/abortSociety/jsslnyxxhjgsz.png" style="width:650px !important;"></img><br/></div>']
var setHgval = [1500,730]
function abortSocietyCg(obj){
	var idx = parseInt($(obj).attr('type'));
	$('.mainArticleList').empty();
	var hmags = ascgarray[idx];
	while(hmags.indexOf('${ctx}')>-1){
		hmags = hmags.replace('${ctx}',appPath);
	}
	$('.mainArticleList').html(hmags);
	$('#wlcmlcContainer').height(setHgval[idx]);
	$('.navbarx_clk').removeClass('navbarx_clk');
	$(obj).addClass('navbarx_clk');
}
var cur_rows = null;
var allowed2Pdf = "doc,docx,xls,xlsx,bmp,gif,jpg,png";
function xhfilelist(){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:60px 0px 30px 0px;" class="fixedLockBar"><div id="wlcmlcContainer" style="position:relative;">'+
	'<div id="wlcmMlcd" class="mainListCntLd">'+
		'<div class="mainListCntTitle"><div></div><i class="glyphicon glyphicon-list"></i><span>学会文件</span></div>'+
		'<div class="navbarx">文件下载</div>'+
	'</div>'+
	'<div id="wlcmPgBd" class="mainListCntDg">'+
		'<div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">'+
        '<li style="cursor:pointer;" onclick="initHomePage()">'+
        '<a href="javascript:void(0)" style="color:#000;">首页</a>'+
        '<div class="backTriangle"></div>'+
        '<div class="backTriangleBorder"></div></li>'+
        '<li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">学会文件</a><div class="backTriangle"></div></li>'+
        '</div>'+
        '<ul class="mainListUl" id="xhfile_list">'+
        '</ul>'+
        '<div style="text-align:center;margin:35px 0;">'+
	        '<button class="down-button-more" pageno="1" style="width: 104px; height: 36px;">'+
				'<span id="moreText">查看更多</span>'+
			'</button>'+
        '</div>'+
	'</div>'+
'</div></div>');
	$.ajax({
		   type:"POST",async:false,url:appPath+"/Hpwlm/getXhFiles",data:{"page":"1"},timeout:120*1000,dataType:"json",
		   beforeSend:function(){initLoading();},
	       success: function(data){
	    	   endLoading();
	    	   
	    	   $('.mainListUl').empty();
	    	   cur_rows = data.rows;
	    	   var rows = data.rows;
	    	   for(var i=0;i<rows.length;i++){
	    		   var appendstr = '<li class="mainListLi">'+
		       		'<a class="mainListpic">'+
			       		'<img src="'+appPath+'/static/imagess/office/'+rows[i]['FILE_TYPE']+'.png" onerror=\'this.src="'+appPath+'/static/imagess/office/hlp.png"\' ></img>'+
		       		'</a>'+
		       		'<p class="quick_desc">'+
		       			'<a class="quick_desc_title">'+rows[i]['TITLE']+'</a>'+
		       			'<span class="time">上传时间：'+rows[i]['CREATE_TIME']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件大小：'+rows[i]['FILE_SIZE']+'</span>'+
		       		'</p>';
	    		   if(allowed2Pdf.indexOf(rows[i]['FILE_TYPE'])>-1||rows[i]['FILE_TYPE']=='pdf'){
	    			   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_pdf" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style previewpdf">'+
		   	   							'<i class="glyphicon glyphicon-eye-open" style="font-weight:500;" ></i>'+
		   		   				   '</button>');
			   	   		   if(rows[i]['CAN_DLD']==0){
			   	   			   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
						   	   					'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
								   				'</button>'+
									       	'</li>');
			   	   		   }
	    		   }else{
	    			   if(rows[i]['CAN_DLD']==0){
			    		   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-left:35px;margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
						   	   				'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
							   				'</button>'+
								       	'</li>');
	    			   }
	    		   }
	    			   
	    		   $('.mainListUl').append(appendstr);
	    	   }
	    	   
	    	   if(isLogin){
		    	   $('.dlmdown').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   initDownLoad(imgshow_pathfix+"/Hpwlm/download",cur_rows[xidx]['TITLE'],cur_rows[xidx]['FILE_LOC'],cur_rows[xidx]['FILE_TYPE']);
		    	   });
		    	   
		    	   $('.previewpdf').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   if(cur_rows[xidx]['FILE_TYPE']=='pdf'){
		    			   initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['FILE_LOC']);
		    		   }else{
		    			   var cur_allowed_index = allowed2Pdf.indexOf(cur_rows[xidx]['FILE_TYPE']);
			    		   if(cur_allowed_index<18){
			    			   initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['PDF_LOC']);
			    		   }
			    		   if(cur_allowed_index>17){
			    			   initImgPreview(cur_rows[xidx]['FILE_LOC']);
			    		   }
		    		   }
		    	   });
	    	   }else{
	    		   $('.dlmdown').bind('click',function(){initAutnc();});
	    		   $('.previewpdf').bind('click',function(){initAutnc();});
	    	   }
	    	   
	    	   if(Math.ceil(parseInt(data.total)/10)=='1'){
				   $('#moreText').html('已无更多文章');
			   }else{
				   $('.down-button-more').one('click',function(){
					   var nextwlpage = parseInt($('.down-button-more').attr('pageno'))+1;
					   getXhFiles(nextwlpage);
					   $('.down-button-more').attr('pageno',nextwlpage);
				   });
			   }
	    	   $('.mainListUl li:last').attr('id','pageAnchor_1');
			   $('#wlcmlcContainer').height($('#wlcmPgBd').height());
	    	   localScrollTop();
	    	   localScrollTo(0);
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
}
function getXhFiles(page){
	$.ajax({
		   type:"POST",async:false,url:appPath+"/Hpwlm/getXhFiles",data:{"page":page},timeout:120*1000,dataType:"json",
		   beforeSend:function(){initLoading();},
	       success: function(data){
	    	   endLoading();
	    	   cur_rows = data.rows;
	    	   var rows = data.rows;
	    	   for(var i=0;i<rows.length;i++){
	    		   var appendstr = '<li class="mainListLi">'+
		       		'<a class="mainListpic">'+
		       		'<img src="'+appPath+'/static/imagess/office/'+rows[i]['FILE_TYPE']+'.png" onerror=\'this.src="'+appPath+'/static/imagess/office/hlp.png"\' ></img>'+
	       		'</a>'+
	       		'<p class="quick_desc">'+
	       			'<a class="quick_desc_title">'+rows[i]['TITLE']+'</a>'+
	       			'<span class="time">上传时间：'+rows[i]['CREATE_TIME']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件大小：'+rows[i]['FILE_SIZE']+'</span>'+
	       		'</p>';
	    		   if(allowed2Pdf.indexOf(rows[i]['FILE_TYPE'])>-1||rows[i]['FILE_TYPE']=='pdf'){
	    			   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_pdf" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style previewpdf">'+
				   	   					'<i class="glyphicon glyphicon-eye-open" style="font-weight:500;" ></i>'+
				   		   				'</button>'+
				   		   			'<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
				   	   					'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
					   				'</button>'+
						       	'</li>');
	    		   }else{
		    		   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-left:35px;margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
					   	   				'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
						   				'</button>'+
							       	'</li>');
	    		   }
	    			   
	    		   $('.mainListUl').append(appendstr);
	    	   }
	    	   
	    	   if(isLogin){
		    	   $('.dlmdown').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   initDownLoad(imgshow_pathfix+"/Hpwlm/download",cur_rows[xidx]['TITLE'],cur_rows[xidx]['FILE_LOC'],cur_rows[xidx]['FILE_TYPE']);
		    	   });
		    	   
		    	   $('.previewpdf').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   if(cur_rows[xidx]['FILE_TYPE']=='pdf'){
		    			   initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['FILE_LOC']);
		    		   }else{
		    			   var cur_allowed_index = allowed2Pdf.indexOf(cur_rows[xidx]['FILE_TYPE']);
			    		   if(cur_allowed_index<18){
			    			   initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['PDF_LOC']);
			    		   }
			    		   if(cur_allowed_index>17){
			    			   initImgPreview(cur_rows[xidx]['FILE_LOC']);
			    		   }
		    		   }
		    	   });
		       }else{
	    		   $('.dlmdown').bind('click',function(){initAutnc();});
	    		   $('.previewpdf').bind('click',function(){initAutnc();});
	    	   }
	    	   
	    	   if(page==Math.ceil(parseInt(data.total)/10)){
				   $('#moreText').html('已无更多文件');
			   }else{
				   $('.down-button-more').one('click',function(){
					   var nextwlpage = parseInt($('.down-button-more').attr('pageno'))+1;
					   getXhFiles(nextwlpage,type);
					   $('.down-button-more').attr('pageno',nextwlpage);
				   });
			   }
	    	   $('.mainListUl li:last').attr('id','pageAnchor_'+page);
			   $('#wlcmlcContainer').height($('#wlcmPgBd').height());
			   if(page!=1){
	    		   $('.content').mCustomScrollbar("stop");
	    	   }else{
	    		   localScrollTop();
	    		   localScrollTo(0);
	    	   }
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
}
function initBtnTips(obj){event.stopPropagation();layer.tips('下载文件', '#'+$(obj).attr('id'), {tips: 1});}
function initBtnTips1(obj){event.stopPropagation();layer.tips('预览', '#'+$(obj).attr('id'), {tips: 1});}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
function zlFile(){
	fixZlightMenu();
	$('#shyepgmn').html('<div style="padding:60px 0px 30px 0px;" class="fixedLockBar"><div id="wlcmlcContainer" style="position:relative;">'+
	'<div id="wlcmMlcd" class="mainListCntLd"><div class="mainListCntTitle"><div></div><i class="glyphicon glyphicon-list"></i><span>资料下载</span></div><div class="navbarx">文件下载</div></div>'+
	'<div id="wlcmPgBd" class="mainListCntDg">'+
		'<div id="plTtleshow" class="plTtleshowd plTtswdadj" style="width:760px !important;">'+
        '<li style="cursor:pointer;" onclick="initHomePage()">'+
        '<a href="javascript:void(0)" style="color:#000">首页</a>'+
        '<div class="backTriangle"></div>'+
        '<div class="backTriangleBorder"></div></li>'+
        '<li class="activeLL"><div class="frontTriangle"></div><a href="javascript:void(0);">资料下载</a><div class="backTriangle"></div></li>'+
        '</div>'+
        '<ul id="zlfilezx" class="mainListUl"></ul>'+
        '<div style="text-align:center;margin:35px 0;">'+
	        '<button class="down-button-more" pageno="1" style="width: 104px; height: 36px;">'+
				'<span id="moreText">查看更多</span>'+
			'</button>'+
        '</div>'+
	'</div>'+
'</div></div>');
	
	$.ajax({
		   type: "POST",timeout:120*1000,dataType:"json",async: false,
		   url: appPath+"/Hpwlm/getDownloadList",data : {"page":"1"},
		   beforeSend:function(){initLoading();},
	       success: function(data){
	    	   endLoading();
	    	   
	    	   $('.mainListUl').empty();
	    	   cur_rows = data.rows;
	    	   var rows = data.rows;
	    	   buildzlfilepage(rows);
	    	   
	    	   if(Math.ceil(parseInt(data.total)/10)=='1'){
				   $('#moreText').html('已无更多文章');
			   }else{
				   $('.down-button-more').one('click',function(){
					   var nextwlpage = parseInt($('.down-button-more').attr('pageno'))+1;
					   getDownloadList(nextwlpage);
					   $('.down-button-more').attr('pageno',nextwlpage);
				   });
			   }
	    	   $('.mainListUl li:last').attr('id','pageAnchor_1');
	    	   var total = rows.length;
	    	   $('#wlcmlcContainer').height($('#wlcmPgBd').height());
	    	   localScrollTop();
	    	   localScrollTo(0);
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
}
function getDownloadList(page){
	$.ajax({
		   type: "POST",
		   async: false,
		   url: appPath+"/Hpwlm/getDownloadList",
		   data : {"page":page},
		   timeout:120*1000,
		   dataType:"json",
		   beforeSend:function(){initLoading();},
	       success: function(data){
	    	   endLoading();
	    	   cur_rows = data.rows;
	    	   var rows = data.rows;
	    	   buildzlfilepage(rows);
	    	   
	    	   if(page==Math.ceil(parseInt(data.total)/10)){
				   $('#moreText').html('已无更多文件');
			   }else{
				   $('.down-button-more').one('click',function(){
					   var nextwlpage = parseInt($('.down-button-more').attr('pageno'))+1;
					   getDownloadList(nextwlpage,type);
					   $('.down-button-more').attr('pageno',nextwlpage);
				   });
			   }
	    	   $('.mainListUl li:last').attr('id','pageAnchor_'+page);
			   $('#wlcmlcContainer').height($('#wlcmPgBd').height());
			   if(page!=1){
				   $('.content').mCustomScrollbar("stop");
	    	   }else{
	    		   localScrollTop();
	    		   localScrollTo(0);
	    	   }
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
}
function buildzlfilepage(rows){
	for(var i=0;i<rows.length;i++){
		   var appendstr = '<li class="mainListLi">'+
    		'<a class="mainListpic">'+
    		'<img src="'+appPath+'/static/imagess/office/'+rows[i]['FILE_TYPE']+'.png" onerror=\'this.src="'+appPath+'/static/imagess/office/hlp.png"\' ></img>'+
		'</a>'+
		'<p class="quick_desc">'+
			'<a class="quick_desc_title">'+rows[i]['TITLE']+'</a>'+
			'<span class="time">上传时间：'+rows[i]['CREATE_TIME']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件大小：'+rows[i]['FILE_SIZE']+'</span>'+
		'</p>';
		   if(allowed2Pdf.indexOf(rows[i]['FILE_TYPE'])>-1||rows[i]['FILE_TYPE']=='pdf'){
			   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_pdf" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips1(this)" class="btn btn-default btn-xs btn_plugin_style previewpdf">'+
	   					'<i class="glyphicon glyphicon-eye-open" style="font-weight:500;" ></i>'+
		   				'</button>'+
		   			'<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
	   					'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
	   				'</button>'+
		       	'</li>');
		   }else{
 		   appendstr+=('<button type="button" xindex="'+i+'" id="'+rows[i]['ID']+'_dlm" style="margin-left:35px;margin-top:20px;" onmouseleave="delBtnTips()" onmouseenter="initBtnTips(this)" class="btn btn-default btn-xs btn_plugin_style dlmdown">'+
	   				'<i class="glyphicon glyphicon-floppy-save" style="font-weight:500;" ></i>'+
	   				'</button>'+
		       	'</li>');
		   }
			   
		   $('.mainListUl').append(appendstr);
	   }
	   
	   if(isLogin){
	 	   $('.dlmdown').bind('click',function(){
	 		   var xidx = $(this).attr('xindex');
	 		   initDownLoad(imgshow_pathfix_noprj+"/Hpwlm/download",cur_rows[xidx]['TITLE'],cur_rows[xidx]['FILE_LOC'],cur_rows[xidx]['FILE_TYPE']);
	 	   });
	 	   
	 	   $('.previewpdf').bind('click',function(){
	 		   var xidx = $(this).attr('xindex');
	 		   if(cur_rows[xidx]['FILE_TYPE']=='pdf'){
	 			   initPdfReader(imgshow_pathfix_noprj+'/'+cur_rows[xidx]['FILE_LOC']);
	 		   }else{
	 			   var cur_allowed_index = allowed2Pdf.indexOf(cur_rows[xidx]['FILE_TYPE']);
		    		   if(cur_allowed_index<18){
		    			   initPdfReader(imgshow_pathfix_noprj+'/'+cur_rows[xidx]['PDF_LOC']);
		    		   }
		    		   if(cur_allowed_index>17){
		    			   initImgPreview(cur_rows[xidx]['FILE_LOC']);
		    		   }
	 		   }
	 	   });
	    }else{
		   $('.dlmdown').bind('click',function(){initAutnc();});
		   $('.previewpdf').bind('click',function(){initAutnc();});
	   }
}
function fixZlightMenu(){
	$('.topbar').hide();
	$('#zlight-nav').css({'position': 'fixed','top': '0','left': '0','padding': '0','margin': '0'}).stop(0,0).animate({'top': '0'}, 0, 'swing');
}
function openMainAricle(no,enterloca){
	$.ajax({
		type: "POST"
		,url: appPath+"/Hpwlm/mainAricle"
		,async:false
		,data: {"id":no,"enterloca":enterloca}
		,success: function(data){
			window.open(appPath+"/views/p/MainAricle.jsp");
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
}
$.ajaxSetup({error:function(XMLHttpRequest,textStatus){},complete:function(XMLHttpRequest,textStatus){if(textStatus=="parsererror"){$('.messager-window').remove();$('.window-shadow').remove();iosOverlay({text:"登录超时!请重新登录",duration: 2000,icon:appPath+"/static/iOS-Overlay/img/cross.png",onhide:function(){top.location=appPath+'/login';}});}}});
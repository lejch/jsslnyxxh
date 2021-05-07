function initSavePopover(obj,str){
	var svbtn = $('#'+obj);
	$(svbtn).webuiPopover('destroy').webuiPopover({
		placement:'left',
		trigger:'click',
		width:250,
		height:50,
		multi:true,
		closeable:false,
		padding:false,
		content:'<div style="padding-left:20px;line-height:50px;">'+str+'</div>',
		type:'html'});
	$(svbtn).webuiPopover('show');
}
function initDownLoad(action,fileName,fileLocation,fileType){var form=$("<form>");form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",action);var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","fileName");input1.attr("value",fileName);var input2=$("<input>");input2.attr("type","hidden");input2.attr("name","fileLocation");input2.attr("value",fileLocation);var input3=$("<input>");input3.attr("type","hidden");input3.attr("name","fileType");input3.attr("value",fileType);$("body").append(form);form.append(input1);form.append(input2);form.append(input3);form.submit();}
function initWelcomeGoway(nextTitle){
	$('#plTtleshow').empty();
	$('#plTtleshow').append("<li style='cursor:pointer;' onclick='parent.turnAthrPg(\"views/welcome/wlcmPg.jsp\")'>"+
			"<a href='javascript:void(0)'>首页</a>"+
			"<div class='backTriangle'></div>"+
		"</li>"+
		"<li class='activeLL'>"+
			"<div class='frontTriangle'></div>"+
			"<a href='javascript:void(0);'>"+nextTitle+"</a>"+
			"<div class='backTriangle'></div>"+
		"</li>"+
		"<div class='rftpFront' />"+
		"<div class='hi-icon-wrap rtf_div' style='line-height:30px;' onclick='window.history.back(-1);'>&nbsp;&nbsp;&nbsp;&nbsp;返回</div>");
}
function iosStyleSuccessAlert(str,duration){
	iosOverlay({
		text: str,
		duration: duration,
		icon: appPath+"/static/iOS-Overlay/img/check.png"
	});
}
function iosStyleErrorAlert(str,duration){
	iosOverlay({
		text: str,
		duration: duration,
		icon: appPath+"/static/iOS-Overlay/img/cross.png"
	});
}

function swalAlert(title,text,type,timer){
	swal({
		   title:title,
		   text:text,
		   type:type,
		   timer:timer,
		   showConfirmButton:false
	   	});
}

var $ma = null;

function tpclk(obj){
	var leftMeter = $(obj).offset().left;
	var parentid = $(obj).attr('appcode');
	$('#topMenuList').empty();
	
	var initMenus = new Array();
	for(var k=0;k<Menus.length;k++){
		if(Menus[k]['app_id']==parentid&&Menus[k]['opertype']=='1'){
			initMenus.push(Menus[k]);
		}
	}
	var menulist = initMenus;
	for(var i = 0;i<initMenus.length;i++){
		if(initMenus[i]['parentId']==parentid){
			var icon = initMenus[i]['icon'];
			var title = initMenus[i]['title'];
        	var str = title+"||"+icon+"||"+initMenus[i]['location'];
        	
			$('#topMenuList').append('<a href="javascript:void(0);" id="'+initMenus[i]['menuId']+'" onclick="addTabNew(\''+str+'\');" class="aHfbtn">'+
					'<i class="'+icon+'" style="margin-right:2px;" />'+title+"</a>");
			$('#topMenuList').css('left',leftMeter+80);
			
	        
		}
	}
}

function changePassword() {
	parent.$.modalDialog({
		title : "密码修改",
		width : 350,
		height : 230,
		href : appPath+"/views/account/user/userPasswordEditDlg.jsp",
		buttons : [ {
			id : 'savebtncls',
			text : '保存',
			handler : function() {
				var f = parent.$.modalDialog.handler.find("#changeUserPasswordForm");
				f.submit();
			}
		}, {
			id : 'cancelbtncls',
			text : '取消',
			handler : function() {
				parent.$.modalDialog.handler.dialog('destroy');
				parent.$.modalDialog.handler = undefined;
			}
		}
		]
	});
	$('#userCPanel').webuiPopover('hide');
}

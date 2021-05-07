<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="${ctx}/static/iCheck/skins/square/blue.css" rel="stylesheet">
<script type="text/javascript" src="${ctx}/static/iCheck/icheck.js"></script>
<script type="text/javascript" src="${ctx}/static/stepform/js/scrollable.js"></script>
<style type="text/css">
*{font-weight:400;list-style:none;font:14px/1.5 Helvetica,'Hiragino Sans GB','Microsoft Yahei','微软雅黑',Arial,sans-serif;text-shadow:1px 1px rgba(100, 100, 100, 0.1);}}
input{padding:0px;}
#wizard {font-size:13px;height:500px;width:600px;overflow:hidden;position:relative;margin-left:10px;}
#wizard .items{width:20000px; clear:both; position:absolute;top:50px;}
#wizard .right{float:right;}
#wizard #status{height:45px;overflow:hidden;width:600px;padding:0px;margin-left:auto;margin-right:auto;border-radius:3px;background:#ddd !important;margin-top:15px;}
#status li{float:left;color:#fff;font-size:14px;cursor:default;text-align:center;height:45px;line-height:45px;position:relative;}
#status li strong{color:#999;}
#status li.active{background-color:#5097d5;font-weight:normal;}
.active .stepCircle{color:#fff;border:1px solid #fff;}
.active .stepText{color:#fff !important;}
.page{width:570px;height:350px;float:left;    padding: 20px 15px 0px 15px;}
.page h3{height:22px; font-size:16px; border-bottom:1px dotted #ccc;padding-bottom:5px}
.page h3 em{font-size:12px; font-weight:500; font-style:normal}
.page p{line-height:30px;}
.page p label{font-size:14px; display:block;}
.btn_nav{width:555px;height:36px;line-height:36px;margin-top:10px;position:absolute;bottom: -80px;margin-left:15px;}
.prev{font-size:14px;width:100px; height:32px; line-height:30px;border:1px solid #d3d3d3; cursor:pointer;border-radius:3px;background:#ddd;color:#999;}
.next{font-size:14px;width:100px; height:32px; line-height:30px;border:1px solid #d3d3d3; cursor:pointer;border-radius:3px;background:#5097d5;color:#fff;}
.easyui-textbox{width:200px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset;transition:border 0.2s linear 0s, box-shadow 0.2s linear 0s;}
textarea:focus,input[type="text"]:focus{border-color:rgba(82, 168, 236, 0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);outline:0 none;}
input,textarea{font-weight:normal;}
textarea{padding:5px;font-size:14px;}
#membRegForm table,th,td{font-size:12px;text-align:left;    margin: 15px 0px;}
#membRegForm th{width:80px;padding-left:20px;}
.textbox .textbox-text{font-size:15px;}
h3 em{color:#777;}
.inputmark{}
.rshover{margin-left:15px;color: rgb(68, 68, 68);cursor: pointer;display: inline;font-size: 14px;font-stretch: normal;font-style: normal;font-weight: normal;height: auto;line-height: 18px;list-style-image: none;list-style-position: outside;list-style-type: none;text-align: left;}
.stepCircle{font-size:14px;display:inline-block;width:16px;height:16px;border:1px solid #999;color:#999;border-radius:50%;text-align:center;margin-right:5px;position:absolute;top:11px;left:15px;line-height:16px;}
.stepText{position: absolute;font-size:14px;left:40px;top: 10px;}
.fmcomplete{background:#5097d5;font-weight:normal;}
.fmcomplete .stepCircle{color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.4);}
.fmcomplete .stepText{color:rgba(255,255,255,0.4) !important;}
</style>
</head>

<body style="overflow:hidden;">
   <form id="membRegForm" style="overflow:hidden;position:absolute;top:0px;" action="" method="post">
	<div id="wizard">
		<ul id="status">
			<li class="active" style="width:146px;" step="1"><div class="stepCircle" step="1">1</div><strong class="stepText">企业基本资料</strong></li>
			<li style="width:238px;" step="2"><div class="stepCircle" step="2">2</div><strong class="stepText">法人(负责人)、联系人情况</strong></li>
			<li style="width:120px;" step="3"><div class="stepCircle" step="3">3</div><strong class="stepText">单位简介</strong></li>
			<li style="width:96px;" step="4"><div class="stepCircle" step="4">4</div><strong class="stepText">完成</strong></li>
		</ul>

		<div class="items">
			<div class="page" id="mrform1">
               <h3>企业基本资料<em style="margin-left:15px;">请填写企业的基本资料</em></h3>
               <table>
					 <tr>
					 	<th>企业名称(中文)</th>
					 	<td><input name="CPY_NAME_CN" id="CPY_NAME_CN" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>企业名称(英文)</th>
					 	<td><input name="CPY_NAME_EN" id="CPY_NAME_EN" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 </tr>
					 <tr>
					 	<th>工商注册号</th>
					 	<td><input name="CPY_GSZCH" id="CPY_GSZCH" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>成立时间</th>
					 	<td><input name="CPY_CREATE_TIME" id="CPY_CREATE_TIME" style="width:170px;font-size:14px;" type="text"/></td>
					 </tr>
					 <tr>
					 	<th>单位地址</th>
					 	<td><input name="CPY_ADDR" id="CPY_ADDR" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>邮政编码</th>
					 	<td><input name="CPY_UB" id="CPY_UB" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 </tr>
				</table>
				<h3>企业性质<em style="margin-left:15px;">请选择企业性质</em></h3>
				<table>
					 <tr style="height:30px;">
					 	<td colspan="4" align="left" style="padding-left:20px;">
							<input type="radio" name="qyxz" class="qyxz" id="qyxz1" value="1"><label for="qyxz1" style="cursor:pointer;margin-right:20px;">&nbsp;私营</label>
							<input type="radio" name="qyxz" class="qyxz" id="qyxz2" value="2"><label for="qyxz2" style="cursor:pointer;margin-right:20px;">&nbsp;集体</label>
							<input type="radio" name="qyxz" class="qyxz" id="qyxz3" value="3"><label for="qyxz3" style="cursor:pointer;margin-right:20px;">&nbsp;联营</label>
							<input type="radio" name="qyxz" class="qyxz" id="qyxz4" value="4"><label for="qyxz4" style="cursor:pointer;margin-right:20px;">&nbsp;三资</label>
							<input type="radio" name="qyxz" class="qyxz" id="qyxz5" value="5"><label for="qyxz5" style="cursor:pointer;margin-right:20px;">&nbsp;国有</label>
							<input type="radio" name="qyxz" class="qyxz" id="qyxz6" value="6"><label for="qyxz6" style="cursor:pointer;">&nbsp;其他</label>
					 	</td>
					 </tr>
					 <tr style="display:none;" id="cpy_qyxz_tr"><th>补充说明</th><td colspan="3" align="left" id="cpy_qyxz_other"></td></tr>
				</table>
				<h3>所属行业<em style="margin-left:15px;">请选择所属行业</em></h3>
				<table>
					 <tr style="height:30px;">
					 	<td colspan="4" align="left" style="padding-left:20px;">
							<input type="radio" name="sshy" class="sshy" id="sshy1" value="1"><label for="sshy1" style="cursor:pointer;margin-right:10px;">&nbsp;农林渔牧业</label>
							<input type="radio" name="sshy" class="sshy" id="sshy2" value="2"><label for="sshy2" style="cursor:pointer;margin-right:10px;">&nbsp;商贸</label>
							<input type="radio" name="sshy" class="sshy" id="sshy3" value="3"><label for="sshy3" style="cursor:pointer;margin-right:10px;">&nbsp;房地产</label>
							<input type="radio" name="sshy" class="sshy" id="sshy4" value="4"><label for="sshy4" style="cursor:pointer;margin-right:10px;">&nbsp;制造业</label>
							<input type="radio" name="sshy" class="sshy" id="sshy5" value="5"><label for="sshy5" style="cursor:pointer;margin-right:10px;">&nbsp;服务业</label>
							<input type="radio" name="sshy" class="sshy" id="sshy6" value="6"><label for="sshy6" style="cursor:pointer;">&nbsp;其他行业</label>
					 	</td>
					 </tr>
					 <tr style="display:none;" id="cpy_sshy_tr"><th>补充说明</th><td colspan="3" align="left" id="cpy_sshy_other"></td></tr>
				 </table>
	             <div class="btn_nav"><input type="button" class="next right" value="下一步" /></div>
          	 </div>
        
			  <div class="page" id="mrform2">
				  <h3>法人（负责人）情况<em style="margin-left:15px;">请填写法人或负责人的基本信息</em></h3>
				  <table>
					<tr>
					 	<th>姓名</th>
					 	<td><input name="FR_NAME" id="FR_NAME" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">职务</th>
					 	<td><input name="FR_ZW" id="FR_ZW" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
					<tr>
					 	<th>办公电话</th>
					 	<td><input name="FR_BGDH" id="FR_BGDH" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">手机</th>
					 	<td><input name="FR_PHONE" id="FR_PHONE" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
			      </table>
				  <h3>联系人情况<em style="margin-left:15px;">请填写联系人的基本信息</em></h3>
				  <table>
					<tr>
					 	<th>姓名</th>
					 	<td><input name="LXR_NAME" id="LXR_NAME" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">职务</th>
					 	<td><input name="LXR_ZW" id="LXR_ZW" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
					 <tr>
					 	<th>办公电话</th>
					 	<td><input name="LXR_BGDH" id="LXR_BGDH" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">手机</th>
					 	<td><input name="LXR_PHONE" id="LXR_PHONE" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
				    <tr>
				    	<th>办公邮箱</th>
					 	<td><input name="LXR_EMAIL" id="LXR_EMAIL" style="width:170px;font-size:14px;" class="easyui-validatebox inputmark easyui-textbox" data-options="required:true,validType:'email'" type="text"/></td>
				    </tr>
				  </table>
				  <div class="btn_nav"><input type="button" class="prev" style="float:left" value="上一步" /><input type="button" class="next right" value="下一步" /></div>
	   		</div>
	
			<div class="page" id="mrform3">
				<h3>单位简介<em style="margin-left:15px;">请填写主营业务、主要产品等，营业执照复印件另附页</em></h3>
				<table>
					<tr>
					 	<th>单位简介</th>
					 	<td>
					 		<textarea id="JL" name="JL" class="inputmark easyui-textbox easyui-validatebox" data-options="multiline:true,required:true" style="font-size:12px;width:455px;height:250px"></textarea>
					 	</td>
				    </tr>
				</table>
				<div class="btn_nav"><input type="button" class="prev" style="float:left" value="上一步" /><input type="button" class="next right" value="下一步" /></div>
			</div>
			<div class="page">
               <h3>完成申请<em style="margin-left:15px;">点击提交并导出按钮,完成会员申请。</em></h3>
               <h4 style="padding-left:20px;margin:15px 0px;"><strong style="font-weight:bold;">江苏省老年医学会 欢迎您！</strong></h4>
               <p style="padding-left:20px;">请点击“<strong style="font-weight:bold;">提交并导出</strong>”按钮完成会员申请。</p>
               <p style="padding-left:20px;">按钮点击后，将会提交会员申请，并同时导出WORD文档。</p>
               <p style="padding-left:20px;"><strong style="font-weight:bold;">请完善WORD文档并打印，同时按要求与纸质材料一并提交。</strong></p>
               <br/><br/><br/>
               <div class="btn_nav">
                  <input type="button" class="prev" style="float:left" value="上一步" />
                  <input type="button" class="next right" style="color:white;background-color:#5cb85c;border-color:#4cae4c;" id="sub" value="提交并导出" />
               </div>
            </div>
		</div>
	</div>
</form><br />

<script type="text/javascript">
var isNotSubmitClk = true;
var curStep = 1;
var isQyxzChecked = false;
var isSshyChecked = false;
$(document).ready(function(){
	$('.qyxz').iCheck({checkboxClass:'icheckbox_square-blue',radioClass:'iradio_square-blue'}).on('ifChecked',function(event){
		  isQyxzChecked = true;
		  if($(this).attr('id')=='qyxz6'){
			  $('#cpy_qyxz_other').append($('<input name="CPY_TYPE_OTHER" id="CPY_TYPE_OTHER" style="width:170px;font-size:14px;" class="easyui-textbox easyui-validatebox" type="text"/>'));
			  $('#CPY_TYPE_OTHER').textbox({required:true});
			  $('#cpy_qyxz_tr').show();
		  }else{
			  $('#cpy_qyxz_tr').hide();
			  $('#cpy_qyxz_other').empty();
		  }
	  });
	$('.sshy').iCheck({checkboxClass:'icheckbox_square-blue',radioClass:'iradio_square-blue'}).on('ifChecked',function(event){
		  isSshyChecked = true;
		  var id = $(this).attr('id');
		  if(id=='sshy4'||id=='sshy5'||id=='sshy6'){
			  if($('#CPY_BELONG_DEC').length==0){
				  $('#cpy_sshy_other').append($('<input name="CPY_BELONG_DEC" id="CPY_BELONG_DEC" style="width:170px;font-size:14px;" class="easyui-textbox easyui-validatebox" type="text"/>'));
				  $('#CPY_BELONG_DEC').textbox({required:true});
				  $('#cpy_sshy_tr').show();
			  }
		  }else{
			  $('#cpy_sshy_tr').hide();
			  $('#cpy_sshy_other').empty();
		  }
	  });
	
	$('#CPY_CREATE_TIME').datebox({
		required:true,
        onShowPanel: function () {
          span.trigger('click'); 
          if (!tds)
            setTimeout(function(){
                tds = p.find('div.calendar-menu-month-inner td');
                tds.click(function(e) {
                   e.stopPropagation(); 
                   var year = /\d{4}/.exec(span.html())[0] ,month = parseInt($(this).attr('abbr'), 10);  
         		   $('#CPY_CREATE_TIME').datebox('hidePanel').datebox('setValue', year + '-' + month); 
                });
            }, 0);
          },
          parser:function(s){if(!s)return new Date();var arr = s.split('-');return new Date(parseInt(arr[0],10),parseInt(arr[1],10)-1,1);},
          formatter: function (d) {var currentMonth = (d.getMonth()+1);var currentMonthStr = currentMonth < 10 ? ('0' + currentMonth) : (currentMonth + '');return d.getFullYear() + '-' + currentMonthStr;}
     });
     var p = $('#CPY_CREATE_TIME').datebox('panel'),tds = false,span = p.find('span.calendar-text'); 
	
	$("#wizard").scrollable({
		onSeek: function(event,i){
			if((parseInt(i)+1)>curStep){
				$("#status .active").addClass("fmcomplete");
				$('.stepCircle[step='+parseInt(i)+']').html('<i class="glyphicon glyphicon-ok" style="font-size:10px;"></i>');
			}else{
				$("#status li[step="+(parseInt(i)+1)+"]").removeClass("fmcomplete");
				$(".stepCircle[step="+(parseInt(i)+1)+"]").html(parseInt(i)+1);
			}
			curStep = (parseInt(i)+1);
			$("#status li").removeClass("active").eq(i).addClass("active");
		},
		onBeforeSeek:function(event,i){
			if(i==1){
				var ciai = checkIsAllInsert(i);
				if(!ciai){return ciai;}
				var edbr = $('#CPY_CREATE_TIME').datebox('isValid');
				if(!edbr){$('#CPY_CREATE_TIME').datebox('textbox').focus();return false;}
				if(!isQyxzChecked){layer.msg('请选择企业性质！');return false;}
				if($('#CPY_TYPE_OTHER').length>0){
					var zzv = $('#CPY_TYPE_OTHER').textbox('isValid');
					if(!zzv){$('#CPY_TYPE_OTHER').textbox('textbox').focus();return false;}
				}
				if(!isSshyChecked){layer.msg('请选择所属行业！');return false;}
				if($('#CPY_BELONG_DEC').length>0){
					var xbre = $('#CPY_BELONG_DEC').textbox('isValid');
					if(!xbre){$('#CPY_BELONG_DEC').textbox('textbox').focus();return false;}
				}
				return true;
			}else{
				return checkIsAllInsert(i);
			}
		}
	});
	
	$("#sub").click(function(){
		if(isNotSubmitClk){
			isNotSubmitClk = false;
			swalAlert('提交申请','正在提交申请，请稍后...','warning',2000)
			var data = $("form").serialize();
			initFormSubmit(data);
		}
	});
	
	if(parent.MBR_RECMIT_DATA!=null&&parent.MBR_RECMIT_DATA!=''){
		for(var key in parent.MBR_RECMIT_DATA){
			if(key=='CPY_CREATE_TIME'){
				$("#CPY_CREATE_TIME").datebox("setValue", parent.MBR_RECMIT_DATA['CPY_ORGINAL_CTIME']);
			}else if(key=='CPY_TYPE'){
				$('#qyxz'+parent.MBR_RECMIT_DATA['CPY_TYPE']).iCheck('toggle');
				if(parseInt(parent.MBR_RECMIT_DATA['CPY_TYPE'])==6){
					$('#CPY_TYPE_OTHER').textbox('setValue',parent.MBR_RECMIT_DATA['CPY_TYPE_OTHER']);
				}
			}else if(key=='CPY_BELONG'){
				$('#sshy'+parent.MBR_RECMIT_DATA['CPY_BELONG']).iCheck('toggle');
				if(parseInt(parent.MBR_RECMIT_DATA['CPY_BELONG'])>3){
					$('#CPY_BELONG_DEC').textbox('setValue',parent.MBR_RECMIT_DATA['CPY_BELONG_OTHER']);
				}
			}else{
				$('#'+key).textbox('setValue',parent.MBR_RECMIT_DATA[key]);
			}
		}
	}
});
function checkIsAllInsert(id){
	var result = true;
	$('#mrform'+id+' .inputmark').each(function(){
		result = result&&($(this).validatebox('isValid'));
		if(!result){$(this).textbox('textbox').focus();}
		return result;
	});
	return result;
}
function initFormSubmit(data){
	var form=$("<form>");form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",appPath+'/hrwp/companyReg');var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","data");input1.attr("value",data);$("body").append(form);form.append(input1);form.submit();
}
</script>

</div>
</body>
</html>

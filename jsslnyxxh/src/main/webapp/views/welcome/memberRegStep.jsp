<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
.btn_nav{width:555px;height:36px;line-height:36px;margin-top:10px;position:absolute;bottom:-40px;margin-left:15px;}
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
   <form id="membRegForm" style="overflow:hidden;" action="" method="post">
	<div id="wizard">
		<ul id="status">
			<li class="active" style="width:126px;" step="1"><div class="stepCircle" step="1">1</div><strong class="stepText">基本资料</strong></li>
			<li style="width:189px;" step="2"><div class="stepCircle" step="2">2</div><strong class="stepText">教育经历和工作情况</strong></li>
			<li style="width:189px;" step="3"><div class="stepCircle" step="3">3</div><strong class="stepText">个人简历和主要业绩</strong></li>
			<li style="width:96px;" step="4"><div class="stepCircle" step="4">4</div><strong class="stepText">完成</strong></li>
		</ul>

		<div class="items">
			<div class="page" id="mrform1">
               <h3>基本资料<em style="margin-left:15px;">请认真填写您的基本资料</em></h3>
               <table>
					 <tr>
					 	<th>姓名</th>
					 	<td><input name="NAME" id="NAME" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>性别</th>
					 	<td><input id="SEX" class="easyui-combobox easyui-validatebox" name="SEX" data-options="valueField:'id',textField:'text',data:[{'id':1,'text':'男'},{'id':2,'text':'女'}],required:true,editable:false,panelHeight:80" style="width:170px;"></input></td>
				     </tr>
				     <tr>
					 	<th>出生年月</th>
					 	<td><input id="BIRTH" name="BIRTH" type="text" class="easyui-datebox easyui-validatebox" data-options="width:170,border:0,editable:false,required:true"></td>
					 	<th>籍贯</th>
			 			<td><input name="JG" id="JG" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
			 		 </tr>
				     <tr>
			 			<th>民族</th>
			 			<td><input name="MZ" id="MZ" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
			 			<th>党派</th>
			 			<td><input name="DP" id="DP" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 </tr>
					 <tr>
				 		<th>身份证号码</th>
				 		<td><input name="SFZ" id="SFZ" style="width:170px;font-size:14px;" data-options="required:true,validType:'length[18,18]',invalidMessage:'请输入18位身份证号码!'" class="inputmark easyui-textbox easyui-validatebox" type="text"/></td>
				 	</tr>
				 </table>
			 
				 <h3>填写联系方式<em style="margin-left:15px;">请告诉我们您的联系方式</em></h3>
				 <table>
					<tr>
					 	<th>办公电话</th>
					 	<td><input name="GZDH" id="GZDH" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>手机</th>
					 	<td><input name="PHONE" id="PHONE" style="width:170px;font-size:14px;" class="easyui-validatebox inputmark easyui-numberbox" data-options="required:true,precision:0" type="text"/></td>
				    </tr>
					<tr>
					 	<th>E-mail</th>
					 	<td><input name="EMAIL" id="EMAIL" style="width:170px;font-size:14px;" data-options="required:true,validType:'email'" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th>邮政编码</th>
					 	<td><input name="YZBM" id="YZBM" style="width:170px;font-size:14px;" class="easyui-validatebox inputmark easyui-numberbox" data-options="required:true,precision:0" type="text"/></td>
				    </tr>
					<tr>
					 	<th>联系地址</th>
					 	<td colspan="3"><input name="LXDZ" id="LXDZ" style="width:447px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				     </tr>
				 </table>
	             <div class="btn_nav"><input type="button" class="next right" value="下一步" /></div>
          	 </div>
        
			  <div class="page" id="mrform2">
				  <h3>填写教育经历<em style="margin-left:15px;">请告诉我们您的相关教育经历</em></h3>
				  <table>
					<tr>
					 	<th>最后毕业院校</th>
					 	<td><input name="ZHBYYX" id="ZHBYYX" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">所学专业</th>
					 	<td><input name="SXZY" id="SXZY" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
					<tr>
					 	<th>学历/学位</th>
					 	<td><input name="XL" id="XL" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">从事专业</th>
					 	<td><input name="CSZY" id="CSZY" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
			      </table>
				  <h3>填写工作情况<em style="margin-left:15px;">请告诉我们您的相关工作情况</em></h3>
				  <table>
					<tr>
					 	<th>工作单位</th>
					 	<td><input name="GZDW" id="GZDW" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">科室</th>
					 	<td><input name="KS" id="KS" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
					 <tr>
					 	<th>单位职务</th>
					 	<td><input name="DWZW" id="DWZW" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
					 	<th style="width:100px !important;">技术职称</th>
					 	<td><input name="JSZC" id="JSZC" style="width:170px;font-size:14px;" data-options="required:true" class="easyui-textbox easyui-validatebox inputmark" type="text"/></td>
				    </tr>
				  </table>
				  <table>
					 <tr>
					 	<th>是否有其他学会任职及职务</th>
					 	<td><input name="ISRDZX" id="ISRDZX" style="width:170px;font-size:14px;" class="easyui-textbox" type="text"/></td>
				    </tr>	
				  </table>
				  <div class="btn_nav"><input type="button" class="prev" style="float:left" value="上一步" /><input type="button" class="next right" value="下一步" /></div>
	   		</div>
	
			<div class="page" id="mrform3">
				<h3>填写个人简历和主要业绩<em style="margin-left:15px;">请填写您的个人简历和主要业绩。</em></h3>
				<table>
					<tr>
					 	<th>个人简历和主要业绩</th>
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
$(document).ready(function(){
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
				var edbr = $('#mrform1 .easyui-datebox').datebox('isValid');
				if(!edbr){$('#mrform1 .easyui-datebox').datebox('textbox').focus();return edbr;}
				var cbbr = $('#mrform1 .easyui-combobox').combobox('isValid');
				if(!cbbr){$('#mrform1 .easyui-combobox').combobox('textbox').focus();return cbbr;}
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
	
	var sexTrans = {'男':1,'女':2}
	if(parent.MBR_RECMIT_DATA!=null&&parent.MBR_RECMIT_DATA!=''){
		for(var key in parent.MBR_RECMIT_DATA){
			if(key=='BIRTH'){
				$('#'+key).datebox({value:parent.MBR_RECMIT_DATA[key]});
			}else if(key=='SEX'){
				$('#'+key).combobox({value:sexTrans[parent.MBR_RECMIT_DATA[key]]});
			}else if(key=='PHONE'||key=='YZBM'){
				$('#'+key).numberbox('setValue',parent.MBR_RECMIT_DATA[key]);
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
		if(!result){$(this).textbox('textbox').focus(); }
		return result;
	});
	return result;
}
function initFormSubmit(data){
	var form=$("<form>");form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",appPath+'/hrwp/memberReg');var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","data");input1.attr("value",data);$("body").append(form);form.append(input1);form.submit();
}
</script>

</div>
</body>
</html>

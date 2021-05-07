<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body style="overflow:hidden;">
<style type="text/css">
#membRegForm *{font-weight:400;list-style:none;
font :12px/1.2 Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}}
#membRegForm input{padding:0px;}
.page{padding-left:10px;width:500px;height:500px;float:left;margin-top: -6px;}
.page h3{height:20px;padding-left:20px;font-size:15px !important;margin-top: 5px;border-bottom:1px dotted #ccc; margin-bottom:5px;color:#3496f0;}
.page p{line-height:24px;}
.page p label{font-size:12px; display:block;}
.easyui-textbox{width:150px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset;transition:border 0.2s linear 0s, box-shadow 0.2s linear 0s;}
#membRegForm textarea:focus,input[type="text"]:focus{border-color:rgba(82, 168, 236, 0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);outline:0 none;}
#membRegForm input,textarea{font-weight:normal;}
#membRegForm textarea{padding:5px;font-size:12px;}
#membRegForm table,th,td{font-size:12px;text-align:left;padding:1px}
#membRegForm th{width:80px;padding-left:20px;}
.textbox .textbox-text{font-size:13px;}
#membRegForm h3 em{color:#777;}
.inputmark{}
.expbtn{position:absolute;right:27px;bottom:12px;padding:6px 10px;background-color:#5bb962;color:white !important;}
.expbtn:hover{color:white;background-color:#449d44;border:1px solid #4cae4c;}
.rshover{margin-left:15px;color: rgb(68, 68, 68);cursor: pointer;display: inline;font-size: 14px;font-stretch: normal;font-style: normal;font-weight: normal;height: auto;line-height: 18px;list-style-image: none;list-style-position: outside;list-style-type: none;text-align: left;}
</style>
<script>
	$(document).ready(function(){
		$('#loadInfoStf').html('已载入<strong>会员号'+parent.COUNCIL_REG_FROM_MBR.HY_ID+'</strong>的会员申请数据，本数据<strong>只做展示，修改无效</strong>！请<strong>确认是本人</strong>后，点击<strong>右下角按钮</strong>提交！');
		$('#membRegForm').form('load',parent.COUNCIL_REG_FROM_MBR);
		
		$('#exportAllMemberReg').one('click',function(){
			$('#exportAllMemberReg').text('已提交理事申请，正在导出...请稍后');
			var form=$("<form>");
			form.attr("style","display:none");form.attr("target","");form.attr("method","post");form.attr("action",appPath+'/hrwp/cmitCouncilReg');
			var input1=$("<input>");input1.attr("type","hidden");input1.attr("name","id");input1.attr("value",parent.COUNCIL_REG_FROM_MBR.ID);
			$("body").append(form);form.append(input1);form.submit();
		});
	});
</script>
<div id="loadInfoStf" class="alert alert-info" role="alert" style="padding:10px;margin-top:15px;margin-left:15px;margin-right:15px;"></div>
   <form id="membRegForm" style="overflow:hidden;" action="" method="post">
		<div class="items">
			<div class="page" id="mrform1">
               <h3>基本资料</h3>
               <table style="height:128px;">
				 <tr>
				 	<th>姓名</th>
				 	<td><input name="NAME" id="NAME" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
				 	<th>性别</th>
				 	<td><input name="SEX" id="SEX" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
			    </tr>
			    <tr>
				 	<th>出生年月</th>
				 	<td><input name="BIRTH" id="BIRTH" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
				 	<th>籍贯</th>
		 			<td><input name="JG" id="JG" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 		</tr>
			    <tr>
				 	<th>民族</th>
				 	<td><input name="MZ" id="MZ" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
				 	<th>党派</th>
				 	<td><input name="DP" id="DP" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
				 </tr>
				 <tr>
				 	<th>身份证号码</th>
				 	<td><input name="SFZ" id="SFZ" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 		 </tr>
			    </table>
				<h3>个人简历和主要业绩</h3>
				<table>
					<tr>
					 	<th>个人简历和主要业绩</th>
					 	<td style="padding-top:10px;">
					 		<textarea id="JL" name="JL" data-options="multiline:true" class="easyui-textbox" style="font-size:12px;width:455px;height:250px"></textarea>
					 	</td>
				    </tr>
				</table>
            </div>
<div class="page" id="mrform2">
	<h3>教育经历</h3>
	<table style="height:140px;">
		<tr>
		 	<th style="width:130px !important;">最后毕业院校</th>
		 	<td><input name="ZHBYYX" id="ZHBYYX" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th style="width:100px !important;">所学专业</th>
		 	<td><input name="SXZY" id="SXZY" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		<tr>
		 	<th style="width:130px !important;">学历/学位</th>
		 	<td><input name="XL" id="XL" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th style="width:100px !important;">从事专业</th>
		 	<td><input name="CSZY" id="CSZY" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
	</table>
	<h3>工作情况<br/></h3>
	<table style="height:110px;">
		<tr>
		 	<th style="width:130px !important;">工作单位</th>
		 	<td><input name="GZDW" id="GZDW" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th style="width:100px !important;">科室</th>
		 	<td><input name="KS" id="KS" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th style="width:130px !important;">单位职务</th>
		 	<td><input name="DWZW" id="DWZW" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
		 	<th style="width:100px !important;">技术职称</th>
		 	<td><input name="JSZC" id="JSZC" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>
		 <tr>
		 	<th style="width:130px !important;">是否有其他学会任职及职务</th>
		 	<td><input name="ISRDZX" id="ISRDZX" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	    </tr>	
	</table>
	<h3>联系方式<br/></h3>
	<table style="height:110px;">
	<tr>
	 	<th style="width:130px !important;">办公电话</th>
	 	<td><input name="GZDH" id="GZDH" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:63px !important;">手机</th>
	 	<td><input name="PHONE" id="PHONE" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th style="width:130px !important;">E-mail</th>
	 	<td><input name="EMAIL" id="EMAIL" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
	 	<th style="width:63px !important;">邮政编码</th>
	 	<td><input name="YZBM" id="YZBM" style="width:150px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>
	 <tr>
	 	<th style="width:130px !important;">联系地址</th>
	 	<td colspan="3"><input name="LXDZ" id="LXDZ" style="width:390px;font-size:14px;" class="easyui-textbox" type="text"/></td>
    </tr>	
</table>
</div>
</form>
	<button id='exportAllMemberReg' type="button" class="btn btn-xs expbtn" style="font-size:14px;">提交理事申请</button>
</body>
</html>

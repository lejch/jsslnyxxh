<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="${ctx}/static/slideValid/css/jquery.slider.css" />
<script type="text/javascript" src="${ctx}/static/slideValid/js/jquery.slider.min.js"></script>
<script type="text/javascript" src="${ctx}/views/welcome/yjfkEditDlg.js"></script>
<style>
	.easyui-textbox{
		width: 170px;
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
	    transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
	}
	
	textarea:focus, input[type="text"]:focus{
	    border-color: rgba(82, 168, 236, 0.8);
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
	    outline: 0 none;
	}
	table {
	    background-color: transparent;
	    border-collapse: collapse;
	    border-spacing: 0;
	    max-width: 100%;
	}

	fieldset {
	    border: 0 none;
	    margin: 0;
	    padding: 0;
	}
	legend {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    border-color: #E5E5E5;
	    border-image: none;
	    border-style: none none solid;
	    border-width: 0 0 1px;
	    color: #999999;
	    line-height: 20px;
	    display: block;
	    margin-bottom: 10px;
	    padding: 0;
	    width: 100%;
	}
	input, textarea {
	    font-weight: normal;
	}
	textarea{padding:5px;font-size:14px;}
	table ,th,td{
		text-align:left;
		padding: 6px 3px 6px 3px;
	}
	.textbox .textbox-text{font-size:15px;}
</style>

<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: hidden;padding: 10px;">
    <div class="form-div">
        <form id="yjfkform" action="" method="post">
            <fieldset>
				 <table>
					 <tr>
					    <th>姓名</th>
						<td><input name="NAME" id="NAME" style="width:90px;height:30px;font-size:14px;" required="required" class="easyui-textbox" type="text"/></td>
						<th>电子邮件</th>
						<td><input name="EMAIL" id="EMAIL" style="width:142px;height:30px;font-size:14px;" data-options="required:true,validType:'email'" class="easyui-textbox easyui-validatebox" type="text"/></td>
					    <th>联系方式</th>
						<td><input name="LW" id="LW" style="width:133px;height:30px;font-size:14px;" class="easyui-textbox" type="text"/></td>
					 </tr>
					 <tr>
					 	<th>主题</th>
						<td colspan="5"><input name="TITLE" id="TITLE" style="width:493px;height:30px;font-size:14px;" required="required" class="easyui-textbox" type="text"/></td>
					 </tr>
					 <tr>
						<th>正文</th>
						<td colspan="5">
						<textarea id="ZW" name="ZW" class="easyui-textbox" data-options="multiline:true" required="required" style="font-size:14px;width:493px;height:200px"></textarea>
						</td>
					</tr>
				 </table>
			</fieldset>
			<div id="slider1" class="slider" style="display:inline-block;margin-left:34px;margin-top:10px;"></div>
        </form>
</div>
	</div>
</div>

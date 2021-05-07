var tid = null;
var cur_rows = null;
var allowed2Pdf = "doc,docx,xls,xlsx,bmp,gif,jpg,png";
$(document).ready(function(){
	$.ajax({
		   type: "POST",
		   async: false,
		   url: appPath+"/Hpwlm/getXhFiles",
		   data : {"page":"1"},
		   timeout:120*1000,
		   dataType:"json",
		   beforeSend:function(){parent.initLoading();},
	       success: function(data){
	    	   parent.endLoading();
	    	   
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
	    	   
	    	   if(parent.isLogin){
		    	   $('.dlmdown').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   parent.initDownLoad(imgshow_pathfix+"/Hpwlm/download",cur_rows[xidx]['TITLE'],cur_rows[xidx]['FILE_LOC'],cur_rows[xidx]['FILE_TYPE']);
		    	   });
		    	   
		    	   $('.previewpdf').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   if(cur_rows[xidx]['FILE_TYPE']=='pdf'){
		    			   parent.initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['FILE_LOC']);
		    		   }else{
		    			   var cur_allowed_index = allowed2Pdf.indexOf(cur_rows[xidx]['FILE_TYPE']);
			    		   if(cur_allowed_index<18){
			    			   parent.initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['PDF_LOC']);
			    		   }
			    		   if(cur_allowed_index>17){
			    			   parent.initImgPreview(cur_rows[xidx]['FILE_LOC']);
			    		   }
		    		   }
		    	   });
	    	   }else{
	    		   $('.dlmdown').bind('click',function(){parent.initAutnc();});
	    		   $('.previewpdf').bind('click',function(){parent.initAutnc();});
	    	   }
	    	   
			   $('.M-box11').pgnew({
	    		    mode: 'fixed',
	    		    totalData: parseInt(data.total),
	    		    showData: 10,
	    		    callback:function(api){
	    		    	getDownloadList(api.getCurrent());
	    		    }
	    		});
				   
	    	   var total = rows.length;
	    	   ht_dg = null;
			   if(rows.length<10){ht_dg=120*total+10;}else{ht_dg=1210;}
				$('#wlcmlcContainer').height(ht_dg+200);
				setHeight();
				parent.localScrollTo(0);
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
});
function getDownloadList(page){
	$.ajax({
		   type: "POST",
		   async: false,
		   url: appPath+"/Hpwlm/getDownloadList",
		   data : {"page":page},
		   timeout:120*1000,
		   dataType:"json",
		   beforeSend:function(){parent.initLoading();},
	       success: function(data){
	    	   parent.endLoading();
	    	   
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
	    	   
	    	   if(parent.isLogin){
		    	   $('.dlmdown').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   parent.initDownLoad(imgshow_pathfix+"/Hpwlm/download",cur_rows[xidx]['TITLE'],cur_rows[xidx]['FILE_LOC'],cur_rows[xidx]['FILE_TYPE']);
		    	   });
		    	   
		    	   $('.previewpdf').bind('click',function(){
		    		   var xidx = $(this).attr('xindex');
		    		   if(cur_rows[xidx]['FILE_TYPE']=='pdf'){
		    			   parent.initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['FILE_LOC']);
		    		   }else{
		    			   var cur_allowed_index = allowed2Pdf.indexOf(cur_rows[xidx]['FILE_TYPE']);
			    		   if(cur_allowed_index<18){
			    			   parent.initPdfReader(imgshow_pathfix+'/'+cur_rows[xidx]['PDF_LOC']);
			    		   }
			    		   if(cur_allowed_index>17){
			    			   parent.initImgPreview(cur_rows[xidx]['FILE_LOC']);
			    		   }
		    		   }
		    	   });
		       }else{
	    		   $('.dlmdown').bind('click',function(){parent.initAutnc();});
	    		   $('.previewpdf').bind('click',function(){parent.initAutnc();});
	    	   }
	    	   
	    	   var total = rows.length;
	    	   ht_dg = null;
			   if(rows.length<10){ht_dg=120*total+10;}else{ht_dg=1210;}
				$('#wlcmlcContainer').height(ht_dg+200);
				setHeight();
				parent.localScrollTo(0);
		   },
		   error:function(xhr,textStatus,errorThrown){swalAlert("系统异常", textStatus, "error",2000);}
		});
}
function setHeight(){
    var h = $('#wlcmlcContainer').height();
    window.parent.setIframeHeight(h);
}
function initBtnTips(obj){
		event.stopPropagation();
		layer.tips('下载文件', '#'+$(obj).attr('id'), {tips: 1});
}
function initBtnTips1(obj){
	event.stopPropagation();
	layer.tips('预览', '#'+$(obj).attr('id'), {tips: 1});
}
function delBtnTips(){event.stopPropagation();layer.closeAll('tips');}
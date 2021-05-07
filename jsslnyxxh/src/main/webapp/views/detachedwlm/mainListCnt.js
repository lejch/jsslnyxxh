var tid = null;
$(document).ready(function(){
	parent.unlockScrollEvent();
	getContentList(1);
});
var initState = false;
function getContentList(page){
	$.ajax({
		   type: "POST",
		   async: false,
		   url: appPath+"/Hpwlm/getHpNewsList",
		   data : {'TYPE':TYPE,"page":page},
		   timeout:120*1000,
		   dataType:"json",
		   beforeSend:function(){parent.initLoading();},
	       success: function(data){
	    	   parent.endLoading();
	    	   
	    	   if(!initState){
		    	   $('.activeLL a').text(data.DGTOP_TITLE);
				   var leftTitle = data.LEFT_TITLE;
				   $('#wlcmMlcd').empty();
				   $('#wlcmMlcd').append('<div class="mainListCntTitle"><div></div><i class="glyphicon glyphicon-list"></i><span>'+leftTitle[0]['TITLE']+'</span></div>');
				   for(var i=1;i<leftTitle.length;i++){
					  $('#wlcmMlcd').append('<div class="navbarx" type="'+TYPE+'">'+leftTitle[i]['TITLE']+'</div>');
				   }
				   $('.navbarx').bind('click',function(){
					  window.parent.turnAthrPg('views/welcome/mainListCnt.jsp?type='+$(this).attr('type'));
				   });
				   
				   $('.M-box11').pgnew({
		    		    mode: 'fixed',
		    		    totalData: parseInt(data.total),
		    		    showData: 10,
		    		    callback:function(api){
		    		    	getContentList(api.getCurrent());
		    		    }
		    		});
				   initState = true;
	    	   }
			   
			   $('.mainListUl').empty();
			   var rowsdata = data.rows;
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
				             "<span>"+data.DGTOP_TITLE.substring(2,4)+"</span></a>"+
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
			   $('.quick_desc_title').bind('click',function(){
				   window.parent.turnAthrPg('views/welcome/mainShowPg.jsp?noteId='+$(this).attr('id'));
				   parent.localScrollTo(0);
			   });
	    	   var total = rowsdata.length;
	    	   ht_dg = null;
			   if(rowsdata.length<10){ht_dg=162*total+10;}else{ht_dg=1630;}
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
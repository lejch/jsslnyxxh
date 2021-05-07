$(document).ready(function(){
	parent.lockScrollEvent();
	parent.initLoading();
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
				    	parent.initDownLoad(imgshow_pathfix+'/Hpwlm/downloadHasName',$(this).attr('dnm'),$(this).attr('dnuri'),"")
				    });
				}
			}
			var dealImgHeight = 0;
			var titleHeight = $('#wlcmSpgTopTitle').height();
			var spgMainPlHeight = $('#wlcmSpgMainPl').height();
			var spgAttachMentHeight = $('#wlcmAttachMent').height();
			var imgNum=$('#wlcmSpgMainPl img').length;
			if(imgNum==0){
				$('#wlcmSpgMainPl').show();
				parent.endLoading();
			}
			
			var deal_650 = 600;
			
			$.each($('#wlcmSpgMainPl img'),function(){
				if(this.height==0){
					this.onload = function(){
						dealImgHeight += (deal_650*parseInt(this.height))/parseInt(this.width);
						var h = titleHeight+spgMainPlHeight+dealImgHeight+spgAttachMentHeight+300;
						$('#wlcmSpg').css('height',h);
						setHeight();
						if(!--imgNum){
							$('#wlcmSpgMainPl').show();
							parent.endLoading();
						}
					}
				}else{
					this.onload = function(){
						var h = titleHeight+spgMainPlHeight+dealImgHeight+spgAttachMentHeight+300;
						$('#wlcmSpg').css('height',h);
						setHeight();
						if(!--imgNum){
							$('#wlcmSpgMainPl').show();
							parent.endLoading();
						}
					}
				}
			});
			
			$('#wlcmSpg').css('height',titleHeight+spgMainPlHeight+spgAttachMentHeight+300);
			setHeight();
			
			parent.localScrollTo(0);
			
			$('#plTtleshow').empty();
			$('#plTtleshow').append("<li style='cursor:pointer;' onclick='parent.turnAthrPg(\"views/welcome/wlcmPg.jsp\")'>"+
					"<a href='javascript:void(0)'>首页</a>"+
					"<div class='backTriangle'></div>"+
					"<div class='backTriangleBorder'></div>"+
				"</li>"+
				"<li class='activeLL'>"+
					"<div class='frontTriangle'></div>"+
					"<a href='javascript:void(0);'>"+parent.ENTERED_LOCA+"</a>"+
					"<div class='backTriangle'></div>"+
				"</li>");
			$('#wlcmSpilter').html("<i class='glyphicon glyphicon-time plTtauthAdj'></i><span>"+data["CREATE_TIME"]+
					"</span><div class='lineSpaceDiff' /><i class='glyphicon glyphicon-pencil plTtauthAdj'></i><span>"+data["CREATOR"]+"</span>");
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
});

 function setHeight(){var h = $('#wlcmSpg').height();window.parent.setIframeHeight(h+50);}
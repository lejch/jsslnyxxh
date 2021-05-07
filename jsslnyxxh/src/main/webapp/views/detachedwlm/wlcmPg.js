$(document).ready(function(){
	
	if(typeof(window.innerWidth)!="undefined"){
		wth = window.innerWidth;
	}
	if(typeof(window.innerWidth)=="undefined"){
		wth = document.documentElement.clientWidth;
	}
	parent.unlockScrollEvent();
	
	initInfoList();
	initMainModalTables();
	
	setHeight();
});
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
					img_tar_url = imgshow_pathfix + img_tar_url;
				}
				$(imgloopTarget).append('<li idx="'+imx+'" style="background:url('+img_tar_url+') center no-repeat;">'+
		                '<div class="animated fadeInRight" style="font-size:14px;padding:10px 0px 10px 5px;">'+imgloops[imx]['TITLE']+'</div></li>');
			}
			$(imgloopTarget).edslider({width:527,height:400});			
			$('.mySlideshow li').bind('click',function(){
				parent.setEnteredLoca('最新资讯');
				window.parent.turnAthrPg('views/welcome/mainShowPg.jsp?noteId='+imgloops[$(this).attr('idx')]['ID']);
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
				parent.setEnteredLoca($(this).text());
				window.parent.turnAthrPg('views/welcome/mainListCnt.jsp?type='+$(this).attr('type'));
			});
			$('.ul_1_right li').bind('click',function(){
				parent.setEnteredLoca($('#MainPanel_'+$(this).attr('type')+'_td .divHpPgTitle').text());
				window.parent.turnAthrPg('views/welcome/mainShowPg.jsp?noteId='+$(this).attr("id"));
			});
			
			$('#zlxz').bind('click',function(){window.parent.turnAthrPg('views/welcome/downLoadList.jsp');parent.localScrollTo(0);});
			
			if(isLogin){
				$('#membreg').bind('click',function(){parent.initMemberReg();});
				$('#groupreg').bind('click',function(){parent.initGroupReg();});
				$('#yjfk').bind('click',function(){parent.initAdvice();});
				$('#councilreg').bind('click',function(){parent.initCouncilReg();});
			}else{
				$('#membreg').bind('click',function(){parent.initAutnc();});
				$('#groupreg').bind('click',function(){parent.initAutnc();});
				$('#yjfk').bind('click',function(){parent.initAutnc();});
				$('#councilreg').bind('click',function(){parent.initAutnc();});
			}
			$('#companyreg').bind('click',function(){parent.initStillBuilding();});
			
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
}
function initInfoList(){
	$.ajax({
		type: "POST"
		,url: appPath+"/Hpwlm/initInfoList"
		,async:true
		,data: {}
		,success: function(data){
			var til = $('#topInfoList');
			
			til.empty();
			
			for(var x in data){
				$(til).append('<li id="'+data[x]['ID']+'">'+
						'<a href="javascript:void(0);">'+data[x]['TITLE']+'</a>'+
						'<span>['+data[x]['DATETIME']+']</span></li>');
			}
			
			$('#topInfoList li').bind('click',function(){
				parent.ENTERED_LOCA = "重要通知";
				window.parent.turnAthrPg('views/welcome/mainShowPg.jsp?noteId='+$(this).attr("id"));
			});
			
			$(".txtScroll-top").slide({
				mainCell:".bd ul",
				autoPlay:true,
				effect:"top",
				vis:1
			});
		}
		,error:function(xhr,textStatus,errorThrown){}
	});
}
function setHeight(){var h = $('#wlcmPgBd').height();window.parent.setIframeHeight(h+30);}
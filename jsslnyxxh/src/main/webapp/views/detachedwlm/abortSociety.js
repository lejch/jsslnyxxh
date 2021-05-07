$(document).ready(function(){
	var hmags = ascgarray[0];
	while(hmags.indexOf('${ctx}')>-1){
		hmags = hmags.replace('${ctx}',appPath);
	}
	$('.mainArticleList').html(hmags);
	
	window.parent.setIframeHeight(1850);
});
var ascgarray = ['<div id="wlcmSpgTopTitle">江苏省老年医学学会概况</div>'+
     			 '<div class="subSpilter" style="width: 640px !important;margin-top: 30px;"></div>'+
    			 '<div id="wlcmSpgMainPl" style="margin-top: -20px !important;">'+
    				'<p>江苏省老年医学学会（Jiangsu Geriatrics Society，JGS）是经江苏省民政厅注册核准的全省性、学术性、非营利性的社会团体。学会坐落于省会城市南京著名的颐和公馆风景区旁；学会由立志从事研究和推进老年医学的医疗卫生机构、科研院所、医养结合机构等单位及医药卫生科技工作者、社会各界热心老年医学事业的人士自愿组成，具有社会团体法人资格。学会于2018年5月12日在南京成立，许家仁当选学会会长，冯美江、任利群、王春、吴剑卿、熊亚晴当选学会副会长<font style="font-size:10px;">（副会长按拼音排序）</font>。会员范围涵盖全省十三个地级市的综合医院和专科医院，目前在册会员809名，理事109名，常务理事29名。目前正在筹备设立的专业委员会有：肾脏专业、血液专业、营养专业、医养结合专业、重症医学专业和中医专业等六个专业委员会</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会宗旨：</font>认真贯彻我国老龄和卫生工作方针，充分运用现代医学、中国传统医学的理论和高新技术，围绕老年人口健康需求，研究、探索老年健康与老年医学发展的规律和延缓衰老的对策，推进老年医学学科体系建设和科技进步，促进与老年医疗相关的科学技术繁荣和发展、普及和推广，培养造就老年医学人才，不断提高为老年人医疗健康服务的技术水平和服务质量，为实现健康老龄化、全面建成小康社会做出积极贡献。</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">业务范围：</font>积极开展老年医学学术研究，国内外学术交流与合作；协助卫生行政主管部门、行业协会建设高素质的老年医学人才队伍；探索医养结合新模式，推动信息化技术在老年医疗健康服务中的应用；编辑出版学术和科普刊物、著作、案例、资料和会刊，以满足老年人不同层次的医疗卫生服务及康复保健需求。</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会会徽：</p>'+
    				'<img src="${ctx}/static/images/abortSociety/xhgk_hh.png" style="width:250px !important;"></img>'+
    				'<p><font style="font-weight:900;font-size:17px;">会徽诠释：</font>上方是江苏省老年医学学会中文，下方是江苏省老年医学学会英文（Jiangsu Geriatrics Society）。桃形代表健康长寿，桃底部代表具有生命力的绿叶。中央图案中的蛇杖寓意医学，背景为江苏地图；主体以深浅绿色交替，象征老年医学事业生机盎然。</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会地址：</font>江苏省南京市鼓楼区珞珈路30号</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会邮编：</font>210024</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会邮箱：</font>jsslnyxxh@126.com</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会地址：</font>江苏省南京市鼓楼区珞珈路30号</p>'+
    				'<p><font style="font-weight:900;font-size:17px;">学会电话：</font>025-83723225</p>'+
    				'<br/>'+
    			 '</div>',
                 '<div id="wlcmSpgTopTitle">江苏省老年医学学会机构设置及职能</div><div class="subSpilter" style="width: 640px !important;margin-top: 30px;"></div><div id="wlcmSpgMainPl" style="margin-top: 0px !important;"><img src="${ctx}/static/images/abortSociety/jsslnyxxhjgsz.png" style="width:650px !important;"></img><br/></div>']

var setHgval = [1850,
                780]

function abortSocietyCg(obj){
	var idx = parseInt($(obj).attr('type'));
	
	$('.mainArticleList').empty();
	
	var hmags = ascgarray[idx];
	while(hmags.indexOf('${ctx}')>-1){
		hmags = hmags.replace('${ctx}',appPath);
	}
	$('.mainArticleList').html(hmags);
	
	window.parent.setIframeHeight(setHgval[idx]);
	
	$('.navbarx_clk').removeClass('navbarx_clk');
	$(obj).addClass('navbarx_clk');
}
package com.jsslnyxxh.app.service.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsslnyxxh.app.repository.biz.HpwlmDao;
import com.jsslnyxxh.app.service.BaseLogUtil;

@Service(value = "hpwlmService")
public class HpwlmService extends BaseLogUtil {

	@Autowired
	private HpwlmDao hpwlmDao;
	
	public JSONObject initSearch(RowBounds rowbounds,Map map) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			total = hpwlmDao.initSearchCount(map);
			rows = hpwlmDao.initSearch(rowbounds,map);
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}
	
	public List<Map> getHpNewsById(Map map) {
		return hpwlmDao.getHpNewsById(map);
	}

	public void insertAdvice(Map map) {
		hpwlmDao.insertAdvice(map);
	}

	public JSONObject initMainModalTables(String IMGSHOW_PATHREPLACE,String IMGSHOW_PATHFIX) {
		JSONObject data = new JSONObject();
		data.put("MODAL_TITLE", JSONArray.fromObject("[{'TYPE':'1','TITLE':'热点新闻'},{'TYPE':'2','TITLE':'学术活动'},{'TYPE':'3','TITLE':'医学资讯'},{'TYPE':'4','TITLE':'分会之窗'}]"));
		data.put("MODAL_INSIDE", JSONArray.fromObject(hpwlmDao.initModalInsideData()));
		List<Map> imgsloop = hpwlmDao.initImgsLoop();
		for(Map img : imgsloop){
			String content = String.valueOf(img.get("SET_HPIC_URI"));
			img.put("SET_HPIC_URI",content.replaceAll(IMGSHOW_PATHREPLACE, IMGSHOW_PATHFIX));
		}
		data.put("IMGS_LOOP", JSONArray.fromObject(imgsloop));
		
		return data;
	}

	public List<Map> initTopNavBar() {
		return hpwlmDao.initTopNavBar();
	}

	public JSONObject getHpNewsList(RowBounds rowbounds, String opt) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			if (opt.equals("1")) {// xhdt
				json.put("DGTOP_TITLE", "热点新闻");
				json.put("LEFT_TITLE", JSONArray.fromObject("[{'TITLE':'热点新闻'},{'TITLE':'最新动态'}]"));
				json.put("LIST_FLAG", "新闻");
			}

			if (opt.equals("2")) {// xshd
				json.put("DGTOP_TITLE", "学术活动");
				json.put("LEFT_TITLE", JSONArray.fromObject("[{'TITLE':'学术活动'},{'TITLE':'最新活动'}]"));
				json.put("LIST_FLAG", "活动");
			}

			if (opt.equals("3")) {// jxjy
				json.put("DGTOP_TITLE", "医学资讯");
				json.put("LEFT_TITLE", JSONArray.fromObject("[{'TITLE':'医学资讯'},{'TITLE':'最新资讯'}]"));
				json.put("LIST_FLAG", "资讯");
			}

			if (opt.equals("4")) {// dfkx
				json.put("DGTOP_TITLE", "分会之窗");
				json.put("LEFT_TITLE", JSONArray.fromObject("[{'TITLE':'分会之窗'},{'TITLE':'地方快讯'}]"));
				json.put("LIST_FLAG", "分会");
			}
			
			Map map = new HashMap();
			map.put("TYPE", opt);
			total = hpwlmDao.getOrgNewsCount(map);
			rows = hpwlmDao.getOrgNews(rowbounds,map);
			
			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}

	public List<Map> initInfoList() {
		return hpwlmDao.initInfoList();
	}
	
	public JSONObject getDownloadList(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			total = hpwlmDao.getDownloadListCount();
			rows = hpwlmDao.getDownloadList(rowbounds, new HashMap());
			json.put("BACK_TITLE", "资料下载");

			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}
	public JSONObject getXhFiles(RowBounds rowbounds) {
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			total = hpwlmDao.getXhFilesCount();
			rows = hpwlmDao.getXhFiles(rowbounds, new HashMap());
			json.put("BACK_TITLE", "学会文件");

			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
	}
}
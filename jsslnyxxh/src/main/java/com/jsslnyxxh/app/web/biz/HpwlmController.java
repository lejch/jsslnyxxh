package com.jsslnyxxh.app.web.biz;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.RowBounds;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jsslnyxxh.app.web.biz.WordUtil;
import com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser;
import com.jsslnyxxh.app.service.biz.HpwlmService;
import com.jsslnyxxh.common.util.PropertiesUtil;

@Controller
@RequestMapping("/Hpwlm")
public class HpwlmController {
	public static String IMGSHOW_PATHREPLACE = PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHREPLACE");
	public static String IMGSHOW_PATHFIX = PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX");

	@Autowired
	public HpwlmService hpwlmService;
	
	@RequestMapping(value = "/mainAricle")
	@ResponseBody
	public Object mainAricle(HttpServletRequest req,HttpServletResponse response) throws Exception {
		req.setCharacterEncoding("UTF-8");
		String id = "";
		String enterloca = "";
		
		id = req.getParameter("id");
		enterloca = req.getParameter("enterloca");
		
		System.out.println("id = "+id);
		System.out.println("enterloca ="+enterloca);
		
		req.getSession().setAttribute("aricleno", id);
		req.getSession().setAttribute("enterloca", enterloca);
		
//		response.sendRedirect("");
		String result = "SUCCESS";
		Map results = new HashMap();
		results.put("result", result);
		response.setContentType("text/html;charset=utf-8");
		return JSONObject.fromObject(results);
	}

	@RequestMapping(value = "/getHpNewsList")
	@ResponseBody
	public Object getHpNewsList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONObject data = null;

		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = "10";
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);

		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);

		String TYPE = request.getParameter("TYPE");

		data = hpwlmService.getHpNewsList(rowbounds, TYPE);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}

	@RequestMapping(value = "/initMainModalTables")
	@ResponseBody
	public Object initMainModalTables(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONObject data = hpwlmService.initMainModalTables(IMGSHOW_PATHREPLACE,IMGSHOW_PATHFIX);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}

	@RequestMapping(value = "/insertAdvice")
	@ResponseBody
	public Object insertAdvice(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");

		String result = "SUCCESS";

		try {
			String NAME = request.getParameter("NAME");
			String EMAIL = request.getParameter("EMAIL");
			String LW = request.getParameter("LW");
			String TITLE = request.getParameter("TITLE");
			String ZW = request.getParameter("ZW");

			Map map = new HashMap();
			map.put("NAME", NAME);
			map.put("EMAIL", EMAIL);
			map.put("LW", LW);
			map.put("TITLE", TITLE);
			map.put("ZW", ZW);
			map.put("ID", UUID.randomUUID().toString());

			hpwlmService.insertAdvice(map);
		} catch (Exception e) {
			result = null;
		}
		return result;
	}

	@RequestMapping(value = "/initTopNavBar")
	@ResponseBody
	public Object initTopNavBar(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		List<Map> data = hpwlmService.initTopNavBar();

		response.setContentType("text/html;charset=utf-8");

		return JSONArray.fromObject(data);
	}

	@RequestMapping(value = "/initInfoList")
	@ResponseBody
	public Object initInfoList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		List<Map> data = hpwlmService.initInfoList();
		return data;
	}

	@RequestMapping(value = "/initSearch")
	@ResponseBody
	public Object initSearch(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONObject data = null;

		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);

		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);

		String search = request.getParameter("search");
		map.put("VAL", "%"+search+"%");
		
		data = hpwlmService.initSearch(rowbounds,map);

		response.setContentType("text/html;charset=utf-8");
		return data;
	}

	@RequestMapping(value = "/getHpNewsById")
	@ResponseBody
	public Object getHpNewsById(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");

		String id = request.getParameter("noteId");
		String type = request.getParameter("type");
		
		Map map = new HashMap();
		map.put("ID", id);
		map.put("TYPE", type);
		List<Map> data = hpwlmService.getHpNewsById(map);
		Map returnData = data.get(0);
		String content = String.valueOf(returnData.get("CONTENT"));
		returnData.put("CONTENT", content.replaceAll(IMGSHOW_PATHREPLACE, IMGSHOW_PATHFIX));
		JSONObject result = null;
		return JSONObject.fromObject(returnData);
	}
	
	@RequestMapping(value = "/getDownloadList")
	@ResponseBody
	public Object getDownloadList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONObject data = null;

		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = "10";
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);

		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);

		data = hpwlmService.getDownloadList(rowbounds);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/getXhFiles")
	@ResponseBody
	public Object getXhFiles(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		JSONObject data = null;
		
		Map map = new HashMap();
		String pageNum = request.getParameter("page");
		String pageSize = "10";
		map.put("pageNum", pageNum);
		map.put("pageSize", pageSize);
		
		int limit = Integer.valueOf(pageSize);
		int offset = (Integer.valueOf(pageNum) - 1) * limit;
		RowBounds rowbounds = new RowBounds(offset, limit);
		
		data = hpwlmService.getXhFiles(rowbounds);
		
		response.setContentType("text/html;charset=utf-8");
		
		return data;
	}
}
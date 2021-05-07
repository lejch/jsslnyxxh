package com.jsslnyxxh.app.web.biz;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jsslnyxxh.app.web.biz.WordUtil;
import com.jsslnyxxh.app.service.account.ShiroDbRealm.ShiroUser;
import com.jsslnyxxh.app.service.biz.HpReqWithPermitService;
import com.jsslnyxxh.common.util.PropertiesUtil;

@Controller
@RequestMapping("/hrwp")
public class HpReqWithPermitController {
	public static String IMGSHOW_PATHREPLACE = PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHREPLACE");
	public static String IMGSHOW_PATHFIX = PropertiesUtil.getInstance("/application.properties").getConfig("IMGSHOW_PATHFIX");

	@Autowired
	public HpReqWithPermitService hrwpService;
	
	@RequestMapping(value = "/checkGroupRegState")
	@ResponseBody
	public Object checkGroupRegState(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = null;
		try{
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			result = hrwpService.checkGroupRegState(user.getUserId());
	
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			e.printStackTrace();
			result = "{'result':'error','msg':'系统处理异常！请与管理员联系'}";
		}
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping(value = "/checkRegState")
	@ResponseBody
	public Object checkRegState(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = null;
		try{
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			result = hrwpService.checkRegState(user.getUserId());
			
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			e.printStackTrace();
			result = "{'result':'error','msg':'系统处理异常！请与管理员联系'}";
		}
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping(value = "/checkCpyRegState")
	@ResponseBody
	public Object checkCpyRegState(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = null;
		try{
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			result = hrwpService.checkCpyRegState(user.getUserId());
			
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			e.printStackTrace();
			result = "{'result':'error','msg':'系统处理异常！请与管理员联系'}";
		}
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping(value = "/checkCouncilRegState")
	@ResponseBody
	public Object checkCouncilRegState(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = null;
		try{
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			result = hrwpService.checkCouncilRegState(user.getUserId());
			
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			e.printStackTrace();
			result = "{'result':'error','msg':'系统处理异常！请与管理员联系'}";
		}
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping(value = "/changeUserName")
	@ResponseBody
	public Object changeUserName(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = "[{'result':'success'}]";
		try{
			String data = request.getParameter("data");
			String userid = request.getParameter("id");
			Map map = new HashMap();
			map.put("USER_ID", userid);
			map.put("USER_ALIAS", data);
			hrwpService.changeUserNameById(map);
			
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			result = "[{'result':'error'}]";
		}
		return JSONArray.fromObject(result);
	}
	
	@RequestMapping(value = "/bindPhone")
	@ResponseBody
	public Object bindPhone(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String result = "[{'result':'success'}]";
		try{
			String data = request.getParameter("data");
			
			int havePhone = hrwpService.getPhoneUserByPhone(data);
			if(havePhone>0){
				result = "[{'result':'error'}]";
			}else{
				String userid = request.getParameter("id");
				Map map = new HashMap();
				map.put("USER_ID", userid);
				map.put("PHONE", data);
				hrwpService.bindUserPhone(map);
			}
			
			response.setContentType("text/html;charset=utf-8");
		}catch(Exception e){
			result = "[{'result':'error'}]";
		}
		return JSONArray.fromObject(result);
	}
	
	@RequestMapping(value = "/getAllMsgList")
	@ResponseBody
	public Object getAllMsgList(HttpServletRequest request,HttpServletResponse response) throws Exception {
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

		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		map.put("USERID", user.getUserId());

		data = hrwpService.getAllMsgList(rowbounds, map);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/getMyRegs")
	@ResponseBody
	public Object getMyRegs(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");

		JSONArray data = null;

		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Map map = new HashMap();
		map.put("USERID", user.getUserId());

		data = hrwpService.getMyRegs(map);

		response.setContentType("text/html;charset=utf-8");

		return data;
	}
	
	@RequestMapping(value = "/setMsgIsRead")
	@ResponseBody
	public Object setMsgIsRead(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		String ID = request.getParameter("id");
		Map map = new HashMap();
		map.put("ID", ID);
		
		hrwpService.setMsgIsRead(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject("[{'result':'success'}]");
	}
	
	@RequestMapping(value = "/initMsgList")
	@ResponseBody
	public Object initMsgList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		Map map = new HashMap();
		map.put("USERID", user.getUserId());
		List<Map> data = hrwpService.initMsgList(map);
		
		response.setContentType("text/html;charset=utf-8");
		
		return JSONArray.fromObject(data);
	}
	
	private static final int[] CODE_IS_CHECKED = {0};
	private static final int[] CODE_UNCHECKED = {1};

	@RequestMapping("/companyReg")
	public String companyReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日");
		
		OutputStream servletOS = null;
		try{
			String data = request.getParameter("data");
			String str1=URLDecoder.decode(data, "UTF-8");
			System.out.println(str1);
			
			Boolean hasBelongDec = false;
			
			Map docxmap = new HashMap();
			docxmap.put("{1}", CODE_UNCHECKED);
			docxmap.put("{2}", CODE_UNCHECKED);
			docxmap.put("{3}", CODE_UNCHECKED);
			docxmap.put("{4}", CODE_UNCHECKED);
			docxmap.put("{5}", CODE_UNCHECKED);
			docxmap.put("{6}", CODE_UNCHECKED);
			docxmap.put("${CPY_TYPE_OTHER}", "     ");
			docxmap.put("${HY_ID}", "");
			docxmap.put("{a1}", CODE_UNCHECKED);
			docxmap.put("{a2}", CODE_UNCHECKED);
			docxmap.put("{a3}", CODE_UNCHECKED);
			docxmap.put("{a4}", CODE_UNCHECKED);
			docxmap.put("{a5}", CODE_UNCHECKED);
			docxmap.put("{a6}", CODE_UNCHECKED);
			docxmap.put("{b4}", "     ");
			docxmap.put("{b5}", "     ");
			docxmap.put("{b6}", "     ");
			
			Map<String,String> map = new HashMap<String,String>();
			map.put("CPY_TYPE_OTHER", "");
			map.put("CPY_BELONG4", "");
			
			String[] params = str1.split("&");
			for(String singleparam : params){
				String[] key_val = singleparam.split("=");
				try{
					if(key_val[0].equals("qyxz")){
						map.put("CPY_TYPE", key_val[1]);
						docxmap.put("{"+key_val[1]+"}", CODE_IS_CHECKED);
					}else if(key_val[0].equals("CPY_TYPE_OTHER")){
						map.put("CPY_TYPE_OTHER", key_val[1]);
						docxmap.put("${CPY_TYPE_OTHER}", key_val[1]);
					}else if(key_val[0].equals("CPY_BELONG_DEC")){
						map.put("CPY_BELONG_OTHER", key_val[1]);
						hasBelongDec = true;
					}else if(key_val[0].equals("CPY_CREATE_TIME")){
						map.put("CPY_ORGINAL_CTIME", key_val[1]);
						String CPY_CREATE_TIME = key_val[1]+"月";
						CPY_CREATE_TIME = CPY_CREATE_TIME.replaceAll("-", "年");
						map.put("CPY_CREATE_TIME", CPY_CREATE_TIME);
					}else{
						map.put(key_val[0], key_val[1]);
					}
				}catch(ArrayIndexOutOfBoundsException ee){
					map.put(key_val[0], "");
				}
			}
			
			String belong_int = (String)map.get("sshy");
			docxmap.put("{a"+belong_int+"}", CODE_IS_CHECKED);
			map.put("CPY_BELONG", belong_int);
			if(hasBelongDec){
				String descblong = (String)map.get("CPY_BELONG_OTHER");
				docxmap.put("{b"+belong_int+"}", descblong);
			}
			
			Date now = new Date();
			map.put("CREATETIME", sdf.format(now));
			map.put("CREATETIME_CN", sdf1.format(now));
			map.put("ID", UUID.randomUUID().toString());
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			map.put("USERID", user.getUserId());
			map.put("USERALIAS", user.getUseralias());
			
			System.out.println("------------------------------");
			System.out.println(map);
			System.out.println("------------------------------");
			
			hrwpService.insertCpyRegForm(map);
			
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			System.out.println("------------------------------");
			System.out.println(docxmap);
			System.out.println("------------------------------");
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/companyReg.docx";
	    	XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
	    	String fileName = "企业会员申请表";
	        response.reset();
	        response.setContentType("multipart/form-data");   
	    	response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
	        servletOS = response.getOutputStream();
            doc.write(servletOS);
		}catch(Exception e){}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {
		}}
		
		return null;
	}
	
	@RequestMapping("/groupReg")
	public String groupReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		OutputStream servletOS = null;
		try{
			String data = request.getParameter("data");
			String str1=URLDecoder.decode(data, "UTF-8");
			System.out.println(str1);
			
			Map<String,String> map = new HashMap<String,String>();
			String[] params = str1.split("&");
			for(String singleparam : params){
				String[] key_val = singleparam.split("=");
				try{
					if(key_val[0].equals("SEX")){
						map.put(key_val[0], sexTrans[Integer.parseInt(key_val[1])]);
					}else{
						map.put(key_val[0], key_val[1]);
					}
				}catch(ArrayIndexOutOfBoundsException ee){
					map.put(key_val[0], "");
				}
			}
			
			map.put("ID", UUID.randomUUID().toString());
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			map.put("USERID", user.getUserId());
			map.put("USERALIAS", user.getUseralias());
			hrwpService.insertGroupRegForm(map);
			
			System.out.println("------------------------------");
			System.out.println(map);
			System.out.println("------------------------------");
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/groupReg.docx";
			
			XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
			
			String fileName = "团体会员登记";
			response.reset();
			response.setContentType("multipart/form-data");   
			response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
			servletOS = response.getOutputStream();
			doc.write(servletOS);
		}catch(Exception e){}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {
		}}
		
		return null;
	}
	
	public String[] sexTrans = {"","男","女"};
	@RequestMapping("/memberReg")
	public String memberReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		OutputStream servletOS = null;
		try{
			request.setCharacterEncoding("UTF-8");
			String data = request.getParameter("data");
			String str1=URLDecoder.decode(data, "UTF-8");
			System.out.println(str1);
			
			Map<String,String> map = new HashMap<String,String>();
			String[] params = str1.split("&");
			for(String singleparam : params){
				String[] key_val = singleparam.split("=");
				try{
					if(key_val[0].equals("SEX")){
						map.put(key_val[0], sexTrans[Integer.parseInt(key_val[1])]);
					}else{
						map.put(key_val[0], key_val[1]);
					}
				}catch(ArrayIndexOutOfBoundsException ee){
					map.put(key_val[0], "");
				}
			}
			
			System.out.println("------------------------------");
			System.out.println(map);
			System.out.println("------------------------------");
			
			map.put("ID", UUID.randomUUID().toString());
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			map.put("USERID", user.getUserId());
			map.put("USERALIAS", user.getUseralias());
			hrwpService.insertMemberRegForm(map);
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) {
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("SFZ")){
					int i;
					for(i=0;i<val.length();i++){
						docxmap.put("{"+i+"}", ""+val.charAt(i));
					}
					for(int j=i;j<18;j++){
						docxmap.put("{"+j+"}", "");
					}
				}else if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/memberReg.docx";
			
			XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
			
			String fileName = "江苏省老年医学学会会员登记表";
			response.reset();
			response.setContentType("multipart/form-data");   
			response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
			servletOS = response.getOutputStream();
			doc.write(servletOS);
		}catch(Exception e){}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {}}
		
		return null;
	}
	
	@RequestMapping("/reExpMemberReg")
	public String reExpMemberReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		OutputStream servletOS = null;
		try{
			String id = request.getParameter("id");
			
			Map<String,String> map = hrwpService.getMemberRegById(id);
			
			String curflag = String.valueOf(map.get("FLAG"));
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("SFZ")){
					int i;
					for(i=0;i<val.length();i++){
						docxmap.put("{"+i+"}", ""+val.charAt(i));
					}
					for(int j=i;j<18;j++){
						docxmap.put("{"+j+"}", "");
					}
				}else if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			if(!(map.containsKey("ISRDZX"))){
				docxmap.put("${ISRDZX}", "");
			}
			
			String filePath = null;
			if(curflag.equals("0")){
				filePath = request.getSession().getServletContext().getRealPath("/")+"template/memberRegSuc.docx";
			}else{
				filePath = request.getSession().getServletContext().getRealPath("/")+"template/memberReg.docx";
			}
			
			XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
			
			String fileName = "江苏省老年医学学会会员登记表";
			response.reset();
			response.setContentType("multipart/form-data");   
			response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
			servletOS = response.getOutputStream();
			doc.write(servletOS);
		}catch(Exception e){e.printStackTrace();}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {
			e.printStackTrace();
		}}
		
		return null;
	}
	
	@RequestMapping("/rexpCouncilReg")
	public String rexpCouncilReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		OutputStream servletOS = null;
		try{
			String id = request.getParameter("id");
			
			Map<String,String> map = hrwpService.getMemberRegById(id);
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("SFZ")){
					int i;
					for(i=0;i<val.length();i++){
						docxmap.put("{"+i+"}", ""+val.charAt(i));
					}
					for(int j=i;j<18;j++){
						docxmap.put("{"+j+"}", "");
					}
				}else if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			if(!(map.containsKey("ISRDZX"))){
				docxmap.put("${ISRDZX}", "");
			}
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/council.docx";
			
			XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
			
			String fileName = "江苏省老年医学理事会员登记表";
			response.reset();
			response.setContentType("multipart/form-data");   
			response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
			servletOS = response.getOutputStream();
			doc.write(servletOS);
		}catch(Exception e){e.printStackTrace();}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {
			e.printStackTrace();
		}}
		
		return null;
	}
	
	@RequestMapping("/cmitCouncilReg")
	public String cmitCouncilReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		
		OutputStream servletOS = null;
		try{
			String id = request.getParameter("id");
			
			Map param = new HashMap();
			param.put("ID", UUID.randomUUID().toString());
			ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
			param.put("USERID", user.getUserId());
			param.put("USERALIAS", user.getUseralias());
			param.put("ORG_MBR_ID", id);
			
			Map<String,String> map = hrwpService.cmitCouncilReg(param,id);
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("SFZ")){
					int i;
					for(i=0;i<val.length();i++){
						docxmap.put("{"+i+"}", ""+val.charAt(i));
					}
					for(int j=i;j<18;j++){
						docxmap.put("{"+j+"}", "");
					}
				}else if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			if(!(map.containsKey("ISRDZX"))){
				docxmap.put("${ISRDZX}", "");
			}
			
			System.out.println(docxmap);
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/council.docx";
			
			XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
			
			String fileName = "江苏省老年医学学会理事登记表";
			response.reset();
			response.setContentType("multipart/form-data");   
			response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
			servletOS = response.getOutputStream();
			doc.write(servletOS);
		}catch(Exception e){e.printStackTrace();}
		finally{try{servletOS.close();servletOS=null;}catch(IOException e){e.printStackTrace();}}
		
		return null;
	}
	
	@RequestMapping("/reExpGroupReg")
	public String reExpGroupReg(HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");

		OutputStream servletOS = null;
		try{
			String id = request.getParameter("id");
			
			Map<String,String> map = hrwpService.getGroupRegById(id);
			
			Map docxmap = new HashMap();
			for (Map.Entry<String,String> entry : map.entrySet()) { 
				String key = entry.getKey();
				String val = entry.getValue();
				if(key.equals("JL")){
					docxmap.put("${JL}", val.replace("\n","<w:br/>"));
				}else{
					docxmap.put("${"+key+"}", val);
				}
			}
			
			String filePath = request.getSession().getServletContext().getRealPath("/")+"template/groupReg.docx";
	    	
	    	XWPFDocument doc = WordUtil.generateWord(docxmap,filePath);
	    	
	    	String fileName = "团体会员登记";
	        response.reset();
	        response.setContentType("multipart/form-data");   
	    	response.setHeader("Content-Disposition","attachment;filename="+URLEncoder.encode(fileName+".docx","UTF-8"));
	        servletOS = response.getOutputStream();
            doc.write(servletOS);
		}catch(Exception e){e.printStackTrace();}
		finally{try {
			servletOS.close();
			servletOS = null;
		} catch (IOException e) {
			e.printStackTrace();
		}}
		
		return null;
	}

}
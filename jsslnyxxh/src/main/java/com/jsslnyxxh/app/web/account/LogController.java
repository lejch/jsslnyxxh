package com.jsslnyxxh.app.web.account;

import com.jsslnyxxh.app.service.account.LogService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping(value = "/LogController")
public class LogController {

	@Autowired
	protected LogService logService;
	
	/**
	 * @throws java.io.IOException
	 *
	* @param @param model
	* @param @param request
	* @return String    返回类型
	* @throws
	 */
	@RequestMapping(value = "listDetailLog")
	@ResponseBody
	public Object listDetailLog(ServletRequest request,ServletResponse response) throws Exception {
		try
		{
			String detail = request.getParameter("detail");
			
			JSONArray detailList = JSONArray.fromObject(detail);
			
			JSONObject cancelInfo = detailList.getJSONObject(0);
			JSONObject addInfo = detailList.getJSONObject(1);
			
			String addString = addInfo.getString("addResult");
			String cancelString = cancelInfo.getString("cancelResult");
			
			String sql = "";
			if(addString.length()!=0){
				String[] addResult = addString.split(",");
				String inOption = "";
				for(int i=0;i<addResult.length;i++){
					UUID.fromString(addResult[i]);
					inOption += ("'"+addResult[i]+"',");
				}
				sql = "select 'addResult' result,app_id,title from sys_menu where menu_id in ("+inOption.substring(0, inOption.length()-1)+")";
				
			}
			if(cancelString.length()!=0){
				String[] cancelResult = cancelString.split(",");
				String inOption = "";
				for(int i=0;i<cancelResult.length;i++){
					UUID.fromString(cancelResult[i]);
					inOption += ("'"+cancelResult[i]+"',");
				}
				if(sql.length()>0){
					sql += " union all select 'cancelResult' result,app_id,title from sys_menu where menu_id in ("+inOption.substring(0, inOption.length()-1)+")";
				}else{
					sql = "select 'cancelResult' result,app_id,title from sys_menu where menu_id in ("+inOption.substring(0, inOption.length()-1)+")";
				}
			}
			String querySql = "select result,a.app_name,title from ("+sql+
							") t left join sys_app a on t.app_id=a.id";
			Map map = new HashMap();
			map.put("sql", querySql);
			List<Map> data = logService.execSql(map);
			
			return JSONArray.fromObject(data);
		} catch (Exception e)
		{
			return null;
		}
	}
	
	@RequestMapping(value = "listLog")
	@ResponseBody
	public Object listLog(ServletRequest request,ServletResponse response) throws IOException {
		try
		{
			//查询参数
			Map map = new HashMap();
			String pageNum = request.getParameter("page");
			String pageSize = request.getParameter("rows");
			map.put("pageNum", pageNum);
			map.put("pageSize", pageSize);
			
			int limit = Integer.valueOf(pageSize);
			int offset = (Integer.valueOf(pageNum)-1)*limit;
			RowBounds rowbounds = new RowBounds(offset, limit);
			
			List<Map> logList = logService.listLog(rowbounds,map);
			for(int i=0;i<logList.size();i++){
				Map log = logList.get(i);
				if(log.get("OPEATE_DETAIL")!=null){
					String detail = clobToString((Clob)log.get("OPEATE_DETAIL"));
					log.put("OPEATE_DETAIL", detail);
				}else{
					log.put("OPEATE_DETAIL", "");
				}
			}
			
			JSONObject json = new JSONObject();
			json.put("total", logService.getCount(map));
			json.put("rows", JSONArray.fromObject(logList));
			
			return json;
		} catch (Exception e)
		{
			return null;
		}
	}
	
	public static String clobToString(Clob clob){  
        try{  
            Reader inStream = clob.getCharacterStream();  
            char[] c = new char[(int) clob.length()];  
            inStream.read(c);  
            String data = new String(c);  
            inStream.close();  
            return data;  
        }catch(Exception e){  
            e.printStackTrace();  
            return "";  
        }  
    }
}

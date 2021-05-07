package com.jsslnyxxh.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jsslnyxxh.app.repository.BizRepository;

@BizRepository
public interface HpwlmDao {
	
	public List<Map> initImgsLoop();
	
	public List<Map> initModalInsideData();
	
	public List<Map> initTopNavBar();
	
	public List<Map> initSearch(RowBounds rowbounds,Map map);
	public int initSearchCount(Map map);
	
	public void insertAdvice(Map map);
	
	public List<Map> getHpNewsById(Map map);
	
	public List<Map> getOrgNews(RowBounds rowbounds,Map map);
	public int getOrgNewsCount(Map map);
	
	public List<Map> initInfoList();
	
	public List<Map> getDownloadList(RowBounds rowbounds,Map map);
	public int getDownloadListCount();
	
	public List<Map> getXhFiles(RowBounds rowbounds,Map map);
	public int getXhFilesCount();
}

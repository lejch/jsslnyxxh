package com.jsslnyxxh.app.repository.biz;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jsslnyxxh.app.repository.BizRepository;

@BizRepository
public interface HpReqWithPermitDao {
	
	public List<Map> checkCpyRegState(String userid);
	
	public List<Map> checkRegState(String userid);
	
	public void updateCouncilReg(Map map);
	
	public void insertCouncilRecord(Map map);
	
	public List<Map> checkCouncilRegState(String userid);
	
	public List<Map> checkGroupRegState(String userid);
	
	public void changeUserNameById(Map map);
	
	public void bindUserPhone(Map map);
	
	public int checkHasUserName(String username);
	
	public void setMsgIsRead(Map map);
	
	public List<Map> initMsgList(Map map);
	
	public void insertMemberRegForm(Map map);
	
	public void insertGroupRegForm(Map map);
	
	public void insertCpyRegForm(Map map);
	
	public int getPhoneUserByPhone(String phone);
	
	public List<Map> getAllMsgList(RowBounds rowbounds,Map map);
	public int getAllMsgListCount(Map map);
	
	public List<Map> getRegmbr(Map map);
	public List<Map> getReggrp(Map map);
	public List<Map> getCilreg(Map map);
	public List<Map> getCpyreg(Map map);
	
	public Map getMemberRegById(String id);
	public Map getGroupRegById(String id);
}

package com.jsslnyxxh.app.service.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsslnyxxh.app.repository.biz.HpReqWithPermitDao;
import com.jsslnyxxh.app.service.BaseLogUtil;

@Service(value="hrwpService")
public class HpReqWithPermitService extends BaseLogUtil {

	@Autowired
	private HpReqWithPermitDao hpReqWithPermitDao;
	
	private static String[] flagRegTrans = {"通过审核","正在审核"};
	private static String[] councilFlagTrans = {"通过审核","正在审核","未申请","审核不通过"};
	
	public String checkGroupRegState(String userid){
		String result = "{'result':'success'}";
		List<Map> data = hpReqWithPermitDao.checkGroupRegState(userid);
		if(data.size()>0){
			Map map = data.get(0);
			String flag = String.valueOf(map.get("FLAG"));
			if(flag.equals("2")){
				result = "{'result':'recomit','lastData':"+JSONObject.fromObject(map).toString()+"}";
			}else{
				result = "{'result':'error','msg':'<p>您最近已于 "+String.valueOf(map.get("CREATETIME"))+" 提交了团体会员申请</p><p>目前状态为：<strong>"+flagRegTrans[Integer.parseInt(flag)]+"</strong></p><p>请勿重复申请！</p>'}";
			}
		}
		return result;
	}
	
	public String checkRegState(String userid){
		String result = "{'result':'success'}";
		List<Map> data = hpReqWithPermitDao.checkRegState(userid);
		if(data.size()>0){
			Map map = data.get(0);
			String flag = String.valueOf(map.get("FLAG"));
			if(flag.equals("2")){
				result = "{'result':'recomit','lastData':"+JSONObject.fromObject(map).toString()+"}";
			}else{
				result = "{'result':'error','msg':'<p>您最近已于 "+String.valueOf(map.get("FIRST_CREATETIME"))+" 提交了个人会员申请</p><p>目前状态为：<strong>"+flagRegTrans[Integer.parseInt(flag)]+"</strong></p><p>请勿重复申请！</p>'}";
			}
		}
		return result;
	}
	
	public String checkCpyRegState(String userid){
		String result = "{'result':'success'}";
		List<Map> data = hpReqWithPermitDao.checkCpyRegState(userid);
		if(data.size()>0){
			Map map = data.get(0);
			String flag = String.valueOf(map.get("FLAG"));
			if(flag.equals("2")){
				result = "{'result':'recomit','lastData':"+JSONObject.fromObject(map).toString()+"}";
			}else{
				result = "{'result':'error','msg':'<p>您最近已于 "+String.valueOf(map.get("CREATETIME"))+" 提交了企业会员申请</p><p>目前状态为：<strong>"+flagRegTrans[Integer.parseInt(flag)]+"</strong></p><p>请勿重复申请！</p>'}";
			}
		}
		return result;
	}
	
	public String checkCouncilRegState(String userid){
		String result = "{'result':'info','msg':'<p>申请学会理事之前，需先申请成为会员！</p><p>请<strong>先申请会员</strong>或<strong>等待会员申请审核通过</strong>！</p>'}";
		List<Map> data = hpReqWithPermitDao.checkCouncilRegState(userid);
		if(data.size()>0){
			Map map = data.get(0);
			String councilFlag = String.valueOf(map.get("COUNCIL_FLAG"));
			if(councilFlag.equals("2")){
				result = "{'result':'info','msg':'<p>您是会员，暂不能申请理事！</p>'}";
			}else if(councilFlag.equals("4")){
				result = "{'result':'success','msg':"+JSONObject.fromObject(map).toString()+"}";
			}else if(councilFlag.equals("3")){
				result = "{'result':'recomit','lastData':"+JSONObject.fromObject(map).toString()+"}";
			}else{
				result = "{'result':'error','msg':'<p>您最近已于 "+String.valueOf(map.get("CREATETIME"))+" 提交了理事申请</p><p>目前状态为：<strong>"+councilFlagTrans[Integer.parseInt(String.valueOf(map.get("COUNCIL_FLAG")))]+"</strong></p><p>请勿重复申请！</p>'}";
			}
		}
		return result;
	}
	
	public void changeUserNameById(Map map){
		hpReqWithPermitDao.changeUserNameById(map);
	}
	
	public void bindUserPhone(Map map){
		hpReqWithPermitDao.bindUserPhone(map);
	}
	
	public int getPhoneUserByPhone(String phone){
		return hpReqWithPermitDao.getPhoneUserByPhone(phone);
	}
	
	public JSONObject getAllMsgList(RowBounds rowbounds,Map map){
		JSONObject json = null;
		int total = 0;
		List<Map> rows = null;

		try {
			json = new JSONObject();

			total = hpReqWithPermitDao.getAllMsgListCount(map);
			rows = hpReqWithPermitDao.getAllMsgList(rowbounds,map);

			json.put("total", total);
			json.put("rows", JSONArray.fromObject(rows));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	
	public JSONArray getMyRegs(Map map){
		JSONArray json = null;
		try {
			json = new JSONArray();
			
			List<Map> memberReg = hpReqWithPermitDao.getRegmbr(map);
			List<Map> groupReg = hpReqWithPermitDao.getReggrp(map);
			List<Map> cilReg = hpReqWithPermitDao.getCilreg(map);
			List<Map> cpyReg = hpReqWithPermitDao.getCpyreg(map);
			
			json.addAll(JSONArray.fromObject(memberReg));
			json.addAll(JSONArray.fromObject(groupReg));
			json.addAll(JSONArray.fromObject(cilReg));
			json.addAll(JSONArray.fromObject(cpyReg));
		} catch (Exception e) {e.printStackTrace();}
		return json;
	}
	
	public void setMsgIsRead(Map map){
		hpReqWithPermitDao.setMsgIsRead(map);
	}
	
	public List<Map> initMsgList(Map map){
		return hpReqWithPermitDao.initMsgList(map);
	}
	
	public void insertMemberRegForm(Map map){
		hpReqWithPermitDao.insertMemberRegForm(map);
	}
	
	public void insertGroupRegForm(Map map){
		hpReqWithPermitDao.insertGroupRegForm(map);
	}
	
	public void insertCpyRegForm(Map map){
		hpReqWithPermitDao.insertCpyRegForm(map);
	}
	
	public Map getMemberRegById(String id){
		return hpReqWithPermitDao.getMemberRegById(id);
	}
	
	@Transactional(value="t_biz",rollbackFor=Exception.class)
	public Map cmitCouncilReg(Map param,String id){
		hpReqWithPermitDao.insertCouncilRecord(param);
		hpReqWithPermitDao.updateCouncilReg(param);
		return hpReqWithPermitDao.getMemberRegById(id);
	}
	public Map getGroupRegById(String id){
		return hpReqWithPermitDao.getGroupRegById(id);
	}

}

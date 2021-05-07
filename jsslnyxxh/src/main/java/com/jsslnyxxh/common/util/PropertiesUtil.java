package com.jsslnyxxh.common.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * 
 * @author yugy
 * 
 *         读取配置工具类
 */
public class PropertiesUtil {

	private static PropertiesUtil _instance = null;
	private static String filePath = null;
	private Properties properties = new Properties();

	/**
	 * 读取类路径下属性文件
	 */
	private PropertiesUtil() {
		try {
			InputStream is = this.getClass().getResourceAsStream(filePath);
			properties.load(is);
			if (is != null)
				is.close();
		} catch (Exception e) {
			System.out.println(e + "没有发现配置文件，请将属性文件放入类路径");
		}
	}

	synchronized public static PropertiesUtil getInstance(String filepath) {
		filePath = filepath;
		if (_instance == null) {
			_instance = new PropertiesUtil();
		}
		return _instance;
	}

	public PropertiesUtil clone() {
		return getInstance(filePath);
	}

	public String getConfig(String key) {
		return properties.getProperty(key);
	}

	public Set getKey() {
		return properties.keySet();
	}

	public void reset() {
		_instance = null;
	}

	/**
	 * 更新properties文件的键值对 如果该主键已经存在，更新该主键的值； 如果该主键不存在，则插件一对键值。
	 * 
	 * @param keyname
	 *            键名
	 * @param keyvalue
	 *            键值
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	public void updateProperties(String profilepath, String keyname,
			String keyvalue) throws Exception {
		// try {
		properties.load(this.getClass().getResourceAsStream(profilepath));
		// 调用 Hashtable 的方法 put，使用 getProperty 方法提供并行性。
		// 强制要求为属性的键和值使用字符串。返回值是 Hashtable 调用 put 的结果。
		OutputStream fos = new FileOutputStream(profilepath);
		// fos.write("test".getBytes("utf-8"));
		properties.setProperty(keyname, keyvalue);
		// 以适合使用 load 方法加载到 Properties 表中的格式，
		// 将此 Properties 表中的属性列表（键和元素对）写入输出流
		properties.store(fos, "Update '" + keyname + "' value");
		fos.close();
		// } catch (IOException e) {
		// System.err.println("属性文件更新错误");
		// }
	}

	public static void generWordMark() {
		String[] outerArray = { "0", "1", "2", "3", "4", "5", "6", "7", "8",
				"9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k",
				"l", "m", "n" };
		int outer = 6;
		int inter = 2;
		for (int i = 1; i <= outer; i++) {
			for (int j = 1; j <= inter; j++) {
				System.out.println("${" + outerArray[i] + String.valueOf(j)
						+ "}");
			}
		}
	}
	
	public static void main(String[] args) throws Exception {
		for(int i=2;i<16;i++){
			String a = "<tr>"+
				"<td align=\"center\">第 <strong>"+i+"</strong> 天<br/>（<span id=\""+(i+6)+"\"></span>月<span id=\""+(i+7)+"\"></span>日）</td>"+
				"<td><span id=\""+(i+8)+"\"></span></td>"+
				"<td><span id=\""+(i+23)+"\"></span></td>"+
			"</tr>";
	
			System.out.println(a);
		}
		
//		generWordMark();
		// generCheckBox("${c11-1},${c11-2},${c11-3},${c11-4},${c11-5},${c11-6}",
		// "c11-2,c11-4,c11-5,c11-6");
		// System.out.println(PropertiesUtil.getInstance("/qzj_sql_table.properties").getConfig("mlcm.del"));
		// PropertiesUtil prop =
		// PropertiesUtil.getInstance("/qzj_sql_table.properties");
		// System.out.println(prop.getConfig("prms.url"));
		// prop.updateProperties("application.properties", "test", "dsadas");
		// Set set = prop.getKey();
		// Iterator it = set.iterator();
		// int i =1;
		// String pname = null;
		// while(it.hasNext()) {
		// pname = (String)it.next();
		// System.out.println(i+++". "+pname+"="+prop.getConfig(pname));
		// }
	}

}

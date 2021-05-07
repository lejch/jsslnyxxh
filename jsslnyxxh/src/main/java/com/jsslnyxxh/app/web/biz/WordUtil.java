package com.jsslnyxxh.app.web.biz;

import java.io.ByteArrayInputStream;  
import java.io.FileInputStream;  
import java.io.FileNotFoundException;  
import java.io.IOException;  
import java.io.InputStream;  
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;  
import java.util.Map.Entry;  
import org.apache.poi.POIXMLDocument;  
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;  
import org.apache.poi.openxml4j.opc.OPCPackage;  
import org.apache.poi.xwpf.usermodel.XWPFDocument;  
import org.apache.poi.xwpf.usermodel.XWPFParagraph;  
import org.apache.poi.xwpf.usermodel.XWPFRun;  
import org.apache.poi.xwpf.usermodel.XWPFTable;  
import org.apache.poi.xwpf.usermodel.XWPFTableCell;  
import org.apache.poi.xwpf.usermodel.XWPFTableRow;  
import org.apache.xmlbeans.XmlException;  
import org.apache.xmlbeans.XmlToken;  
import org.openxmlformats.schemas.drawingml.x2006.main.CTNonVisualDrawingProps;  
import org.openxmlformats.schemas.drawingml.x2006.main.CTPositiveSize2D;  
import org.openxmlformats.schemas.drawingml.x2006.wordprocessingDrawing.CTInline;  
  
/** 
 * 适用于word 2007 
 * poi 版本 3.7 
 */  
public class WordUtil {  
  
	public static final int[] CHECK_UNCHECK = { 9745, 9744, 12295, 8730 };
	
    /** 
     * 根据指定的参数值、模板，生成 word 文档 
     * @param param 需要替换的变量 
     * @param template 模板 
     */  
    public static XWPFDocument generateWord(Map<String, Object> param, String template) {  
        XWPFDocument doc = null;  
        try {  
            OPCPackage pack = POIXMLDocument.openPackage(template);  
            doc = new XWPFDocument(pack);  
            if (param != null && param.size() > 0) {  
                  
                //处理段落  
                List<XWPFParagraph> paragraphList = doc.getParagraphs();  
                processParagraphs(paragraphList, param, doc);  
                  
                //处理表格  
                Iterator<XWPFTable> it = doc.getTablesIterator();  
                while (it.hasNext()) {  
                    XWPFTable table = it.next();  
                    List<XWPFTableRow> rows = table.getRows();  
                    for (XWPFTableRow row : rows) {  
                        List<XWPFTableCell> cells = row.getTableCells();  
                        for (XWPFTableCell cell : cells) {  
                            List<XWPFParagraph> paragraphListTable =  cell.getParagraphs();  
                            processParagraphs(paragraphListTable, param, doc);  
                        }  
                    }  
                }  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return doc;  
    }  
    /** 
     * 处理段落 
     * @param paragraphList 
     * @throws FileNotFoundException  
     * @throws InvalidFormatException  
     */  
    public static void processParagraphs(List<XWPFParagraph> paragraphList,Map<String, Object> param,XWPFDocument doc) throws InvalidFormatException, FileNotFoundException{  
        if(paragraphList != null && paragraphList.size() > 0){  
            for(int p=0;p<paragraphList.size();p++){  
            	XWPFParagraph paragraph = paragraphList.get(p);
                List<XWPFRun> runs = paragraph.getRuns();  
                for(int r=0;r<runs.size();r++) {  
                	XWPFRun run = runs.get(r);
                    String text = run.getText(0);  
//                    System.out.println("text=="+text);  
                    if(text != null){  
                        boolean isSetText = false;  
                        for (Entry<String, Object> entry : param.entrySet()) {  
                            String key = entry.getKey();  
                            if(text.indexOf(key) != -1){  
                                isSetText = true;  
                                Object value = entry.getValue();  
                                	//文本替换  
//                                	System.out.println("key=="+key);  
                                if(key.equals("${JL}")){
                                	String[] vals = value.toString().split("<w:br/>");
                                	text = text.replace(key, ""); 
                                	for(int i=0;i<vals.length;i++){
                                		XWPFRun runxxx = paragraph.createRun();
                                		runxxx.setText(vals[i]);
                                		runxxx.addBreak();
                                	}
                                }else if((value instanceof int[])) {
                                    int isCheckFlag = ((int[])value)[0];
                                    text = text.replace(key, new String(CHECK_UNCHECK, isCheckFlag, 1));
                                }else{
                                	text = text.replace(key, value.toString()); 
                                }
                            }  
                        }  
                        if(isSetText){  
                            run.setText(text,0);  
                        }  
                    }  
                }  
            }  
        }  
    }  
    
}  
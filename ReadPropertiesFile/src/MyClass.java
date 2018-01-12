import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;


public class MyClass{

    static String strXml = "<DataRuleFunctions><DataRuleFunction name=\"coalesce\" displayName=\"%function.coalesce.displayName\" returnType=\"any\" className=\"com.ibm.infosphere.dataquality.ruleengine.functions.Coalesce\"	categoryID=\"general\"><description>%function.coalesce.desc</description><Parameter type=\"any\" name=\"value\"><description>%function.coalesce.param1.desc</description></Parameter><Parameter type=\"any\" name=\"replacementValue\" optional=\"true\"><description>%function.coalesce.param2.desc</description></Parameter></DataRuleFunction></DataRuleFunctions>";
    static HashMap<String, String> hmap;
    
    public static void main(String[] args) throws Exception {
    		File fXmlFile = new File("DataRuleFunctionsLibrary.xml");
    		File testXmlFile = new File("Tests.xml");
    		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
    		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
    		Document doc = dBuilder.parse(fXmlFile);
    		Document docTests = dBuilder.parse(testXmlFile);
    		String inputDoc = DocumentToString(doc);
        	//System.out.println(inputDoc);
       		//Document doc = StringToDocument(strXml);
        	updateNodeValue(doc);
       		updateNodeValueTests(docTests);
        
    		String newxml = DocumentToString(doc);
    		String testxml = DocumentToString(docTests);
        	System.out.println(newxml);
    		System.out.print(testxml);

    }

    public static void updateNodeValue(Document doc) {
    	
        doc.getDocumentElement().normalize();
        
        Node rootNode = doc.getFirstChild();
        //System.out.println(rootNode.toString());
        NodeList listFunctions = doc.getElementsByTagName("DataRuleFunction");
        NodeList listTests = doc.getElementsByTagName("DataRuleTest");
        //NodeList list = rootNode.getChildNodes();
        try {
			File file = new File("FunctionsDefinition.properties");
			FileInputStream fileInput = new FileInputStream(file);
			Properties properties = new Properties();
			properties.load(fileInput);
			fileInput.close();
			
			

			Enumeration enuKeys = properties.keys();
			hmap = new HashMap<String, String>();
			while (enuKeys.hasMoreElements()) {
				String key = (String) enuKeys.nextElement();
				String value = properties.getProperty(key);
				//System.out.println(key + " = \"" + value + "\"");
				hmap.put("%" + key, value);
				
			}
        } catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

        for (int i = 0; i < listFunctions.getLength(); i++) {
           // System.out.println(list.item(i).toString());   
            Element element = (Element) listFunctions.item(i);
            Node node = listFunctions.item(i);
           
    			for (Entry<String, String> entry : hmap.entrySet()) {
    			    String key = entry.getKey().toString();
    			    String value = entry.getValue();
    			    if (node.getNodeName().equals("DataRuleFunction")) {
    			    		//System.out.println(element.getAttribute("displayName"));
    			    		//System.out.println(key);
    			    		if(element.getAttribute("displayName").equals(key)) {
    			    			//System.out.println("displayName");
    			    			//System.out.println(value);
    			    			element.setAttribute("displayName", value);
    			    			//System.out.println(element.getElementsByTagName("description").item(0).getTextContent());
    			    			
    			    		}
    			    		if(element.getElementsByTagName("description").item(0).getTextContent().equals(key)) {
    			    			element.getElementsByTagName("description").item(0).setTextContent(value);
    			    		}
    			    		
    			    		
    	                
    	            }
    			    //System.out.println("key, " + key + " value " + value);
    			}
    			
            
        }
    }
public static void updateNodeValueTests(Document doc) {
    	
        doc.getDocumentElement().normalize();
        
        Node rootNode = doc.getFirstChild();
        //System.out.println(rootNode.toString());
        NodeList listTests = doc.getElementsByTagName("DataRuleTest");
        System.out.println(listTests.item(0));
        //NodeList list = rootNode.getChildNodes();
        try {
			File file = new File("FunctionsDefinition.properties");
			FileInputStream fileInput = new FileInputStream(file);
			Properties properties = new Properties();
			properties.load(fileInput);
			fileInput.close();
			
			

			Enumeration enuKeys = properties.keys();
			hmap = new HashMap<String, String>();
			while (enuKeys.hasMoreElements()) {
				String key = (String) enuKeys.nextElement();
				String value = properties.getProperty(key);
				value.replace("%","Parameter");
				//System.out.println(key + " = \"" + value + "\"");
				hmap.put("%" + key, value);
				
			}
        } catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

        for (int i = 0; i < listTests.getLength(); i++) {
           // System.out.println(list.item(i).toString());   
            Element element = (Element) listTests.item(i);
            Node node = listTests.item(i);
           
    			for (Entry<String, String> entry : hmap.entrySet()) {
    			    String key = entry.getKey().toString();
    			    String value = entry.getValue();
    			    if (node.getNodeName().equals("DataRuleTest")) {
    			    		//System.out.println(element.getAttribute("displayName"));
    			    		//System.out.println(key);
    			    		if(element.getAttribute("displayName").equals(key)) {
    			    			//System.out.println("displayName");
    			    			//System.out.println(value);
    			    			element.setAttribute("displayName", value);
    			    			//System.out.println(element.getElementsByTagName("description").item(0).getTextContent());
    			    			
    			    		}
    			    		if(element.getElementsByTagName("description").item(0).getTextContent().equals(key)) {
    			    			element.getElementsByTagName("description").item(0).setTextContent(value);
    			    		}
    			    		
    			    		
    	                
    	            }
    			    //System.out.println("key, " + key + " value " + value);
    			}
    			
            
        }
    }

    public static String DocumentToString(Document doc) throws Exception {

        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer();
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
        StringWriter writer = new StringWriter();
        transformer.transform(new DOMSource(doc), new StreamResult(writer));
        String output = writer.getBuffer().toString();
        return output;
    }

    public static Document StringToDocument(String strXml) throws Exception {

        Document doc = null;
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            StringReader strReader = new StringReader(strXml);
            InputSource is = new InputSource(strReader);
            doc = (Document) builder.parse(is);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return doc;
    }
}

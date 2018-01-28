
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;

public class ReadPropertiesFile {
	public static void main(String[] args) {
		try {
			File file = new File("FunctionsDefinition.properties");
			FileInputStream fileInput = new FileInputStream(file);
			File xmlFile = new File("DataRuleFunctionsLibrary.xml");
			FileInputStream xmlFileInput = new FileInputStream(xmlFile);
			Properties properties = new Properties();
			properties.load(fileInput);
			fileInput.close();
			
			

			Enumeration enuKeys = properties.keys();
			HashMap<String, String> hmap = new HashMap<String, String>();
			while (enuKeys.hasMoreElements()) {
				String key = (String) enuKeys.nextElement();
				String value = properties.getProperty(key);
				value.replace("%","Parameter");
				//System.out.println(key + " = \"" + value + "\"");
				hmap.put("%" + key, value);
				
			}
			for (Entry<String, String> entry : hmap.entrySet()) {
			    String key = entry.getKey().toString();
			    String value = entry.getValue();
			    System.out.println("key, " + key + " value " + value);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}

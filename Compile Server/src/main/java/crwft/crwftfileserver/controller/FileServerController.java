package crwft.crwftfileserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
public class FileServerController {

    private String sourceDir = "/root/api/basic/";
    private String compileDir = "/root/api/users/";
    //private String sourceDir = "/Users/aneunne7/Desktop/basic/";
    //private String compileDir = "/Users/aneunne7/Desktop/files/";
    private String []basicFiles = {".gitignore", "package.json", "rollup.config.js",
            "src/main.js", "src/App.svelte", "public/index.html", "public/global.css"};
    private String []compiledFiles = {"index.html", "global.css", "build/bundle.css",
            "build/bundle.js", "build/bundle.js.map"};
    private String abundantCompileError = "<!DOCTYPE HTML><html><head><title>Error!!</title></head>" +
            "<body><h3>The Server is already compiling your project, Please wait a moment</h3></body></html>";

    public void shellCommand(String cmd) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process process = runtime.exec(cmd);
        InputStream in = process.getInputStream();
        InputStreamReader inr = new InputStreamReader(in);
        BufferedReader br = new BufferedReader(inr);
        String line;
        while ((line = br.readLine()) != null){
            System.out.println(line);
        }
    }

    public boolean deleteAllDirectory(File parent){
        File[] allFiles = parent.listFiles();
        if(allFiles != null){
            for(File f : allFiles) deleteAllDirectory(f);
        }
        return parent.delete();
    }

    @GetMapping("/")
    public String root(@RequestParam String userName, Model model) {
        model.addAttribute("userName", userName);
        return "welcome";
    }

    @PostMapping("downloadSvelte")
    public void downloadSvelte(@RequestParam String userName,
                               @RequestParam String projectName,
                               HttpServletResponse res) throws IOException{

        System.out.println(userName+"("+projectName+") : Will Download Svelte File");
        String outputDir = compileDir+userName+"/"+projectName+"/download/";

        try{
            byte[] buf = new byte[1024];
            res.setContentType("application/octet-stream");
            res.setHeader("Content-Disposition", "attachment;fileName=source.zip");

            FileInputStream fis = new FileInputStream(outputDir+"source.zip");
            BufferedInputStream bis = new BufferedInputStream(fis);
            ServletOutputStream so = res.getOutputStream();
            BufferedOutputStream bos = new BufferedOutputStream(so);

            int n = 0;
            while((n = bis.read(buf)) > 0) {
                bos.write(buf, 0, n);
                bos.flush();
            }

            if(bos != null) bos.close();
            if(bis != null) bis.close();
            if(so != null) so.close();
            if(fis != null) fis.close();

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("downloadCompiled")
    public void downloadCompiled(@RequestParam String userName,
                                 @RequestParam String projectName,
                                 HttpServletResponse res) throws IOException{

        System.out.println(userName+"("+projectName+") : Will Download Compiled File");
        String outputDir = compileDir+userName+"/"+projectName+"/download/";

        try{
            byte[] buf = new byte[1024];
            res.setContentType("application/octet-stream");
            res.setHeader("Content-Disposition", "attachment;fileName=compile.zip");

            FileInputStream fis = new FileInputStream(outputDir+"compile.zip");
            BufferedInputStream bis = new BufferedInputStream(fis);
            ServletOutputStream so = res.getOutputStream();
            BufferedOutputStream bos = new BufferedOutputStream(so);

            int n = 0;
            while((n = bis.read(buf)) > 0) {
                bos.write(buf, 0, n);
                bos.flush();
            }

            if(bos != null) bos.close();
            if(bis != null) bis.close();
            if(so != null) so.close();
            if(fis != null) fis.close();

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("showDemoPage")
    public void showDemoPage(@RequestParam String userName,
                             @RequestParam String projectName,
                             HttpServletResponse res) throws IOException{

        System.out.println(userName+"("+projectName+") : Will Show Demo Page");
        String output = "", buf = "";

        BufferedReader reader;
        reader = new BufferedReader(new FileReader(compileDir+userName+"/"+projectName+"/download/demo.html"));
        while ((buf = reader.readLine()) != null) output += buf;
        reader.close();

        res.setContentType("text/html");
        res.setCharacterEncoding("utf-8");
        res.getWriter().print(output);
    }

    @PostMapping("compile")
    public void file(@RequestParam String userName,
                     @RequestParam String projectName,
                     @RequestParam int count,
                     @RequestParam String []fileName,
                     @RequestParam String []contents,
                     @RequestParam String todo,
                     HttpServletResponse res, Model model) throws IOException{

        String userDirPath = compileDir+userName;
        String projectDirPath = userDirPath+"/"+projectName;
        String output="";

        System.out.println(userName+"("+projectName+") : Will Compile");

        //디렉토리 생성
        try{
            File userDir = new File(userDirPath);
            if(!userDir.exists()) {
                userDir.mkdir();
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        try {
            File f = new File(userDirPath+"/status.txt");
            if(!f.exists()){
                f.createNewFile();
                FileWriter fw = new FileWriter(f);
                BufferedWriter writer = new BufferedWriter(fw);
                writer.write("Compile");
                writer.close();
            } else {
                FileReader fr = new FileReader(f);
                BufferedReader reader = new BufferedReader(fr);
                if(reader.readLine().equals("Compile")) {
                    reader.close();
                    res.setContentType("text/html");
                    res.setCharacterEncoding("utf-8");
                    res.getWriter().print(abundantCompileError);
                    return;
                } else {
                    reader.close();
                    FileWriter fw = new FileWriter(f);
                    BufferedWriter writer = new BufferedWriter(fw);
                    writer.write("Compile");
                    writer.close();
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        try{
            File projectDir = new File(projectDirPath);
            deleteAllDirectory(projectDir);
            projectDir.mkdir();
        }catch(Exception e){
            e.printStackTrace();
        }

        String []createDir = {"public", "src", "src/component"};
        for(String d: createDir){
            File dir = new File(projectDirPath+"/"+d);
            if(!dir.exists()){
                try{
                    dir.mkdir();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }


        //기본 파일 생성
        for (String f: basicFiles) {
            File file = new File(sourceDir+f);
            File newFile = new File(projectDirPath+"/"+f);

            FileInputStream in = new FileInputStream(file);
            FileOutputStream out = new FileOutputStream(newFile);

            byte[] buf = new byte[1024];

            int readData;
            while((readData = in.read(buf)) > 0) {
                out.write(buf, 0, readData);
            }

            in.close();
            out.close();
        }

        //컴포넌트, 페이지 파일 생성
        for(int i=0;i<count;i++){
            try{
                File f = new File(projectDirPath+"/src/"+fileName[i]);
                if(!f.exists()) f.createNewFile();
                FileWriter fw = new FileWriter(f);
                BufferedWriter writer = new BufferedWriter(fw);
                writer.write(contents[i].replaceAll("ST47-B2F5", ","));
                writer.close();
            } catch (Exception e){
                e.printStackTrace();
            }
        }

        //컴파일
        try{
            String batch = "#!/bin/bash\ncd "+projectDirPath+"\nnpm i\nnpm i svelte-spa-router\nnpm run build";
            File f = new File("/root/api/users/"+userName+"/command.sh");
            //File f = new File("/Users/aneunne7/Desktop/command");
            FileWriter fw = new FileWriter(f);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(batch);
            writer.close();

            shellCommand("chmod +x /root/api/users/"+userName+"/command.sh");
            shellCommand("/root/api/users/"+userName+"/command.sh");
            //shellCommand("chmod +x /Users/aneunne7/Desktop/command");
            //shellCommand("/Users/aneunne7/Desktop/command");

            f.delete();
        } catch (Exception e){
            e.printStackTrace();
        }

        //컴파일 파일 합쳐서 미리보기
        try{
            String globalCSS = "", bundleCss = "", bundleJS = "", indexHtml = "";
            String buf;
            BufferedReader reader;

            reader = new BufferedReader(new FileReader(projectDirPath+"/public/global.css"));
            buf="";
            while ((buf = reader.readLine()) != null) globalCSS += buf;
            globalCSS = globalCSS.replace("\n", "");
            globalCSS = globalCSS.replace("\t", "");
            globalCSS = globalCSS.replace("\"", "'");
            globalCSS = "<style>"+globalCSS+"</style>";
            reader.close();

            reader = new BufferedReader(new FileReader(projectDirPath+"/public/build/bundle.css"));
            buf="";
            while ((buf = reader.readLine()) != null) bundleCss += buf;
            bundleCss = "<style>"+bundleCss+"</style>";
            reader.close();

            reader = new BufferedReader(new FileReader(projectDirPath+"/public/build/bundle.js"));
            buf="";
            while ((buf = reader.readLine()) != null) bundleJS += buf;
            bundleJS = "<script>"+bundleJS+"</script>";
            reader.close();

            reader = new BufferedReader(new FileReader(sourceDir+"public/temp.html"));
            buf="";
            while ((buf = reader.readLine()) != null) indexHtml += buf;
            reader.close();

            output = indexHtml;
            output = output.replace("Demo Page", projectName);
            output = output.replace("AA", globalCSS);
            output = output.replace("BB", bundleCss);
            output = output.replace("CC", bundleJS);

            File downloadDir = new File(projectDirPath+"/download");
            if(!downloadDir.exists()){
                try{
                    downloadDir.mkdir();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }

            File f = new File(projectDirPath+"/download/demo.html");
            FileWriter fw = new FileWriter(f);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(output);
            writer.close();

        }catch (Exception e){
            e.printStackTrace();
        }

        //컴파일 zip 파일
        ZipOutputStream zipout1 = null;
        ZipOutputStream zipout2 = null;

        try{
            String inputDir = projectDirPath+"/public/";
            String outputDir = projectDirPath+"/download/";
            zipout1 = new ZipOutputStream(new FileOutputStream(outputDir+"compile.zip"));
            byte[] buf = new byte[1024];
            FileInputStream in = null;

            for(int i=0;i<compiledFiles.length;i++){
                in = new FileInputStream(inputDir+compiledFiles[i]);
                zipout1.putNextEntry(new ZipEntry(compiledFiles[i]));
                int len;
                while((len = in.read(buf)) > 0) zipout1.write(buf, 0, len);
                zipout1.closeEntry();
                in.close();
            }

            zipout1.close();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(zipout1 != null){
                zipout1 = null;
            }
        }

        try{
            String inputDir = projectDirPath+"/src/";
            String outputDir = projectDirPath+"/download/";
            zipout2 = new ZipOutputStream(new FileOutputStream(outputDir+"source.zip"));
            byte[] buf = new byte[1024];
            String[] addFiles = {"App.svelte", "main.js"};
            FileInputStream in = null;

            for(int i=0;i<addFiles.length;i++){
                in = new FileInputStream(inputDir+addFiles[i]);
                zipout2.putNextEntry(new ZipEntry(addFiles[i]));
                int len;
                while((len = in.read(buf)) > 0) zipout2.write(buf, 0, len);
                zipout2.closeEntry();
                in.close();
            }
            for(int i=0;i<fileName.length;i++){
                in = new FileInputStream(inputDir+fileName[i]);
                zipout2.putNextEntry(new ZipEntry(fileName[i]));
                int len;
                while((len = in.read(buf)) > 0) zipout2.write(buf, 0, len);
                zipout2.closeEntry();
                in.close();
            }

            zipout2.close();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(zipout2 != null){
                zipout2 = null;
            }
        }

        try {
            File f = new File(userDirPath+"/status.txt");
            FileWriter fw = new FileWriter(f);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write("Idle");
            writer.close();
        }catch(Exception e){
            e.printStackTrace();
        }

        if(todo.equals("downloadSvelte")){
            downloadSvelte(userName, projectName, res);
        }else if(todo.equals("downloadCompiled")){
            downloadCompiled(userName, projectName, res);
        }else{
            showDemoPage(userName, projectName,res);
        }
    }
}

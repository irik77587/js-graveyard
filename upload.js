const fs = require('fs'),
      http = require('http'),
      args = process.argv.slice(2),
      rootdir = args[0] || process.cwd(),
      port = process.env.PORT || 9000,
      host = process.env.HOST || '127.0.0.1';;
//tested on node=v10.19.0
http.createServer(function(req, res) {
  if (req.method == "POST") {
    // generate temporary file name
    var temp = 'temp' + Math.floor(Math.random() * 10);

    // This opens up the writeable stream to temporary file
    var writeStream = fs.createWriteStream(temp);

    // This is here incase any errors occur
    writeStream.on('error', function (err) {
      console.log(err);
    });

    // This pipes the POST data to the file
    req.pipe(writeStream);

    // After all the data is saved, respond with a simple html form so they can post more data
    req.on('end', () => {
      writeStream.close(() => {

        file = fs.readFileSync(temp);
        filename = file.slice(file.indexOf("filename=\"") + "filename=\"".length, file.indexOf('"\r\nContent-Type'));
        hash = file.slice(0,file.indexOf('\r\n'));
        content = file.slice(file.indexOf('\r\n\r\n') + '\r\n\r\n'.length, file.lastIndexOf(Buffer.from('\r\n') + hash));

        fs.writeFile(filename.toString(), content, err => {
          if (err)
            console.error(err);
          else
            try { fs.unlinkSync(temp) } catch (err) { console.error(err) }
        });
      });
    });
  }

  res.writeHead(200, {"content-type":"text/html; charset=utf-8"});
  res.end(`
<form  method="post" enctype="multipart/form-data">
  <input type="file" name="fileUpload">
  <input type="submit" value="Upload">
</form>`);

}).listen(port, host, () => console.dir(`Serving at http://${host}:${port}`));


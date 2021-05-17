const fs = require('fs'),
      http = require('http'),
      args = process.argv.slice(2),
      rootdir = args[0] || process.cwd(),
      port = process.env.PORT || 9000,
      host = process.env.HOST || '127.0.0.1';
//tested on node=v10.19.0, export HOST="192.168.0.103"
http.createServer(function(req, res) {
  if (req.method == "POST") try {
    // Generate temporary file name
    var temp = 'temp' + Math.floor(Math.random() * 10);

    // This opens up the writeable stream to temporary file
    var writeStream = fs.createWriteStream(temp);

    // This pipes the POST data to the file
    req.pipe(writeStream);

    // After the temporary file is creates, create real file
    writeStream.on('finish', () => {

      reader = fs.readFileSync(temp);
      filename = reader.slice(reader.indexOf("filename=\"") + "filename=\"".length, reader.indexOf('"\r\nContent-Type'));
      hash = reader.slice(0,reader.indexOf('\r\n'));
      content = reader.slice(reader.indexOf('\r\n\r\n') + '\r\n\r\n'.length, reader.lastIndexOf(Buffer.from('\r\n') + hash));

      // After real file is created, delete temporary file
      fs.writeFileSync(filename.toString(), content);
      fs.unlinkSync(temp);

    });

    // This is here incase any errors occur
  } catch (err) {
    res.end('Server Borked');
    return;
  }

  // respond with a simple html form so they can post more data
  res.writeHead(200, {"content-type":"text/html; charset=utf-8"});
  res.end(`
<form  method="post" enctype="multipart/form-data">
  <input type="file" name="fileUpload">
  <input type="submit" value="Upload">
</form>`);
}).listen(port, host, () => console.dir(`Serving at http://${host}:${port}`));


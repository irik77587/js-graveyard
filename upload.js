const fs = require('fs'),
      os = require('os'),
      path = require('path'),
      http = require('http'),
      port = process.env.PORT || 9000,
      host = process.env.HOST || '127.0.0.1';
//tested on node=v10.19.0, export HOST="192.168.0.103"
http.createServer(function(req, res) {

  // Check if form is submitted and save its content
  if (req.method == "POST") try {
    store_file(req);

  // This is here incase any errors occur
  } catch (error) {
    res.writeHead(404, {"content-type":"text/plain; charset=utf-8"});
    res.end("Server Borked");

    // error is object but response.write require string/buffer
    console.dir(error);
    return;
  }

  // respond with a simple html form so they can post more data
  res.writeHead(200, {"content-type":"text/html; charset=utf-8"});
  res.end(simple_html_form());
}).listen(port, host, () => console.dir(`Serving at http://${host}:${port}`));

function store_file(req) {
  // Resolve path/to/temp/file
  var temp = path.resolve(os.tmpdir(), 'temp' + Math.floor(Math.random() * 10));

  // This opens up the writeable stream to temporary file
  var writeStream = fs.createWriteStream(temp);

  // Write data in memory instead of storage
  //writeStream.cork(); // disabled for causing hang

  // This pipes the POST data to the file
  req.pipe(writeStream);

  // After the temporary file is creates, create real file
  writeStream.on('finish', () => {

    reader = fs.readFileSync(temp);
    filename = reader.slice(reader.indexOf("filename=\"") + "filename=\"".length, reader.indexOf("\"\r\nContent-Type"));
    boundary = reader.slice(0,reader.indexOf('\r\n'));
    content = reader.slice(reader.indexOf('\r\n\r\n') + '\r\n\r\n'.length, reader.lastIndexOf(Buffer.from('\r\n') + boundary));

    // After real file is created, delete temporary file
    fs.writeFileSync(filename.toString(), content);
    fs.unlinkSync(temp);
  });
}

function simple_html_form() {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html" charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Upload</title>
</head>
<body>
<form  method="post" enctype="multipart/form-data">
  <input type="file" name="fileUpload">
  <input type="submit" value="Upload">
</form>
</body>
</html>`;
}

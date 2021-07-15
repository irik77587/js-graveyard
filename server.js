const fs = require('fs'),
      http = require('http'),
      arg = process.argv.slice(2),
      rootdir = arg[0] || process.cwd(),
      port = process.env.PORT || 9000,
      host = process.env.HOST || '127.0.0.1';
//tested on node=v10.19.0
http.createServer(function (req, res) {

	// Normalize request.url into path and get status of path
  try {
    req_url = decodeURIComponent(req.url).replace(/\/+/g, '/');
    stats = fs.statSync(rootdir + req_url);
    console.dir(req_url + ' ' + rootdir);

		// If path is file, response content of file
    if (stats.isFile()) {
    	[start, end] = [0, stats.size]
    	range = req.headers.range;
    	if (range) {// workaround for safari
    		[start_range, end_range] = range.replace("bytes=","").split("-");
    		[start, end] = [parseInt(start_range, 10), parseInt(end_range, 10)]
    		if(end + 1 == stats.size) {
    			end++;
    		}
    		res.writeHead(206, { 
    			'Content-Range': `bytes ${start}-${end}/${stats.size}`, 
    			'Accept-Ranges': 'bytes', 
    			'Content-Length': end-start
    		});
    	}
    	console.dir([start, end, stats.size]);
    	// actually send content of file
      buffer = fs.createReadStream(rootdir + req_url, { start: start, end: end });
      buffer.on('open', () => buffer.pipe(res));
    }

		// If path is folder, response html page listing content in folder
    if (stats.isDirectory()) {
      lsof = fs.readdirSync(rootdir + req_url, {encoding:'utf8', withFileTypes:false});
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(html_page(`http://${host}:${port}`, req_url, lsof));
    }

  } catch (err) {
    	res.writeHead(404, {"content-type":"text/plain; charset=utf-8"});// header; 404 goes here
    	res.end("Server Borked");// body
      console.dir(err);
  }
}).listen(port, host, () => console.dir(`Server running at http://${host}:${port}`));


function html_page(root_url, url, ls_dir) {//this is a Function declarations can be called before it is defined

  list = url == '/' ? [] : [`<div style = "grid-column: 1 / span 3;"><a href="${root_url}">/</a></div>`,
  `<div style = "grid-column: 1 / span 3;"><a href="${root_url}${encodeURI(url.slice(0,url.lastIndexOf('/')))}">..</a></div>`];

  templete = (root_url, url, filename) => {// the above is a Function expressions cannot be called before it is defined
    return `<div><a href="${root_url}${encodeURI(url)}${url.slice(-1) == '/' ? '' : '/'}${encodeURI(filename)}">${filename}</a></div>`; }

  ls_dir.forEach(file => {
    list.push(templete(root_url, url, file));
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html" charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Directory of ${url}</title>
</head>
<body>
<h1>Directory of ${url}</h1>
<style>
.grid-container{
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>
<div class="grid-container">
${list.join('\n')}
</div>
</body>
</html>`;
}


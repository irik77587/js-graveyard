const fs = require('fs'),
      http = require('http'),
      arg = process.argv.slice(2),
      rootdir = arg[0] || process.cwd(),
      port = process.env.PORT || 9000,
      hostname = process.env.HOST || '127.0.0.1';

http.createServer(async function (req, res) {

  try {
    req_url = decodeURIComponent(req.url);
    stats = await fs.statSync(rootdir + req_url);

    if (stats.isFile()) {
      data = await fs.readFileSync(rootdir + req_url);
      res.writeHead(200);
      res.end(data);
      return;
    }

    if (stats.isDirectory()) {
      dir = await fs.readdirSync(rootdir + req_url, {encoding:'utf8', withFileTypes:false});
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(html_page(`http://${hostname}:${port}`, req_url, dir));
      return;
    }

  } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
  }
}).listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));



//this is a Function declarations can be called before it is defined
function html_page(host, req_url, dir) {

list = [`<div style = "grid-column: 1 / span 3;"><a href="${host}${encodeURI(req_url.slice(0,req_url.lastIndexOf('/')))}">..</a></div>`];
templete = (host, req_url, file) => { return `<div><a href="${host}${encodeURI(req_url)}${req_url.slice(-1) == '/' ? '' : '/'}${encodeURI(file)}">${file}</a></div>`; }
// the above is a Function expressions cannot be called before it is defined
dir.forEach(file => {
  list.push(templete(host, req_url, file));
});

return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html" charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Directory of ${req_url}</title>
</head>
<body>
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
</html>`
}

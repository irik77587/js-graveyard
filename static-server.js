const fs = require('fs'),
      http = require('http'),
      arg = process.argv.slice(2),
      rootdir = arg[0] || process.cwd(),
      port = process.env.PORT || 9000,
      hostname = process.env.HOST || '127.0.0.1';

http.createServer(async function (req, res) {

  try{
    req_url = decodeURIComponent(req.url);
    stats = await fs.statSync(rootdir + req_url);

    if (stats.isFile()) {
      data = await fs.readFileSync(rootdir + req_url);
      res.writeHead(200);
      res.end(data);
      return;
    }

    if (stats.isDirectory()) {
      parent = req_url.slice(0,req_url.lastIndexOf('/'));
      data = [`<li><a href="http://${hostname}:${port}${parent}">..</a></li>`];
      dir = await fs.readdirSync(rootdir + req_url, {encoding:'utf8', withFileTypes:false});
      dir.forEach(file=> data.push(`<li><a href="http://${hostname}:${port}${encodeURI(req_url)}${req_url.slice(-1) == '/' ? '' : '/'}${encodeURI(file)}">${file}</a></li>`));
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(data.join(''));
      return;
    }

  } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
  }
}).listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));

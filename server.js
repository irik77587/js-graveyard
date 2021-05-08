var fs = require('fs'),
    http = require('http');

const arg = process.argv.slice(2),
      rootdir = arg[0] || process.cwd(),
      port = arg[1] || 9000,
      hostname = arg[2] || '127.0.0.1';

http.createServer(async function (req, res) {

  try{
    var url = req.url;
    var data;
    var stats = await fs.statSync(rootdir + url);

    if (stats.isFile()) {
      data = await fs.readFileSync(rootdir + url);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
      return;
    }

    if (stats.isDirectory()) {
      parent = url.split('/').slice(0,-1).join('/');
      data = [`<a href="http://${hostname}:${port}${parent}">${url}</a>`];
      dir = await fs.readdirSync(rootdir + url, {encoding:'utf8', withFileTypes:false});
      dir.forEach(file=> data.push(`<a href="http://${hostname}:${port}${url}${url == '/' ? '' : '/'}${file}">${file}</a>`));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data.join('<br>'));
      data = [];
      return;
    }

  } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
  }
}).listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));


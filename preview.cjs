const http = require('http');
const fs = require('fs');
const path = require('path');
const root=path.join(__dirname,'build');
http.createServer((req,res)=>{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/portfolio\/?/,'');
  let file=path.resolve(root,name.replace(/^\//,''));
  if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(403);res.end();return;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile())file=path.join(root,'index.html');
  const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.pdf':'application/pdf','.json':'application/json','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':type});res.end(fs.readFileSync(file));
}).listen(3000,()=>console.log('Portfolio ready on http://localhost:3000/portfolio/'));

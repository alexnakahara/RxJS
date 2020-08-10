const http = require('http');

const hostname = 'localhost';
const port = 5200;

http.createServer((req, resp) => { 
  resp.writeHead(200, {
    'Content-Type' : 'application/json', 
    'Access-Control-Allow-Origin' : '*', 
  });

  const macthUrl = /^\/response\/(.+)\/delay\/(\d+)\/?$/;
  // http://localhost:5200/response/{"data": "Hello World"}/delay/1000/

  if (!macthUrl.test(req.url)) return resp.end();

  const [, response, delay] = macthUrl.exec(req.url);
  const jsonResponse = decodeURIComponent(response);

  setTimeout(() => {
    resp.write(jsonResponse);
    resp.end();
  }, +delay);

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
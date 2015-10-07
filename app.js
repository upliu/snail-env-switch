var http = require('http');
var httpProxy = require('http-proxy');
var env = require('./env');
var ui = require('./ui');

var PORT = 8888;
var UI_PORT = 8889;

process.on('uncaughtException', function (err) {
    console.error(err);
});

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer();

http.createServer(function(req, res){
    var parts = req.headers['host'].split(':');
    var host = parts[0];
    var port = parts[1] || 80;
    host = env.findIpByHost(host);
    proxy.web(req, res, {
        target: {
            host: host,
            port: port
        }
    });
})
    .listen(PORT);

ui.run(UI_PORT);
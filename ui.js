var express = require('express');
var env = require('./env');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/hello/world', function(req, res){
    res.send('hello,world');
});

app.get('/config', function(req, res){
    var config = env.getConfig();
    res.send(config);
});

app.post('/config/save', function(req, res){

});

module.exports = {
    run: function (port){
        app.listen(port, function() {
            console.log('ui listening on port %d, http://127.0.0.1:%d', port, port);
        });
    }
};
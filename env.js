var env = {};
var fs = require('fs');
var _config = require('./config.json');

var _matched = {};

env.saveConfig = function(config)
{
    _config = config;
    _matched = {};
    fs.writeFile('./config.json', JSON.stringify(config, null, 2), function(){
        console.log('config saved.');
    });
};

env.getConfig = function(){
    return _config;
};

env.findIpByHost = function(host)
{
    if (!_matched[host]) {
        _matched[host] = findIpByHost(host);
    }
    return _matched[host];
};

var findIpByHost = function(host)
{
    if (!_config['is_enabled']) {
        return host;
    }

    for (var env_name in _config['envs'])
    {
        var env = _config['envs'][env_name];
        if (!env['is_enabled']) {
            continue;
        }

        var _ip = '';
        env['ips'].forEach(function(row){
            var ip = row.shift();
            if (row.some(function(the_host){
                return the_host == host;
            })) {
                _ip = ip;
                return false;
            }
        });
        if (_ip) {
            return _ip;
        }
    }

    return host;
};

module.exports = env;
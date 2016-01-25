var fs, configurationFile;

configurationFile = 'emuconf.json';
fs = require('fs');

var cfg = JSON.parse(
    fs.readFileSync(configurationFile)
);

console.log(cfg);
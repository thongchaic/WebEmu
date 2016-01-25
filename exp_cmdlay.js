require('shelljs/global');
var microtime = require('microtime')
var call = "vcmd -c /tmp/pycore.38056/n9 -- ps";
for (var i = 0; i < 30; i++) {
	var start = microtime.now();
	//console.log(start+" : "+microtime.now());
	var output = exec(call, {silent:true}).output;
	//console.log(output);
	var stop = microtime.now();
	var delay = (stop-start)/1000;
	console.log(delay);
};

 
require('shelljs/global');
var express = require('express');
var multer  = require('multer');
var upload = multer();
var app = express();

var fs = require('fs');
var configurationFile = 'myconfig.json';

var nodes = [];

var cfg = JSON.parse(
    fs.readFileSync(configurationFile)
);

console.log(cfg.nodes);



app.use(express.static('html'));

/*for(var i=0;i<cfg.nodes.length;i++){
    var node = {id:"node"+i,ip:ips[i]};
    nodes.push(node);
}*/

app.get('/du/:id/:cmd', function (req, res) {

  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  //var reqnode = req.url.replace("/du-","");
  //console.log("out=>"+reqnode);
  var call = "vcmd -c /tmp/pycore.38153/"+req.params.id+" -- "+req.params.cmd;
  var output = exec(call, {silent:true}).output;
  res.send(output);

});

app.get('/cfg',function (req, res){

    console.log("Get CFG ==> ");
    console.log(req.headers);
    res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
//{ size: nodes.length, nodes:nodes }
    res.json(cfg);
});

app.get('/n*', function (req, res) {
    //res.send('Admin Homepage');
//    console.log("redirect to "+ips[0]);
    var reqnode = req.url.replace("/","");
    for(var i=0;i<cfg.nodes.length;i++){
    	console.log(cfg.nodes[i].id+" "+reqnode);
    	if(cfg.nodes[i].id == reqnode){
    		var dest = "http://"+cfg.nodes[i].ip+"/";
    		res.redirect(dest);
    		break;
    	}
    }
});

app.post('/upload',upload.single('recfile'), function (req, res, next) {
  // req.body contains the text fields
   console.log("----upload----");
   console.log(req.file);
  var tmp_path = ""+req.file.path;
  var target_path = 'html/uploads/' + req.file.originalname;
  console.log(tmp_path+" > "+target_path);
  /*var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { res.render('complete'); });
  src.on('error', function(err) { res.render('error'); });
  */
 res.send("OK");
});

/*app.post('/upload', upload.single('imnfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  //req.file write 
  console.log("----upload----");
  console.log(req.body);
  res.send("OK");
});*/

/*
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "resmed_final.html" );
});
app.get('/src.jpg', function (req, res) {
   res.sendFile( __dirname + "/" + "src.jpg" );
})
*/

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
var lineReader = require('line-reader');
var jsonfile = require('jsonfile')
var version = "0.2";
var details = "WebEmu : JSON Configuration file";
var file = 'myconfig.json'

var parse = [];
var started = false;
var stoped = false;
var corecfg = [];
var id="", type="", model="";
var coords = [];
var lbcoords = [];
var peers = [];
var interfaces = [];
var ifpeers = [];

lineReader.eachLine('num.imn', function(line, last) {
line = line.trim();

	if(started){
   		
  	 	var data = line.split(" ");
  	 	//console.log(data);
  	 	
  	 	for(var i=0;i<data.length;i++){
  	 		if(data[i] == "}"){
  	 			parse.pop();
  	 			//started = false;
  	 			//console.log("====================== : =====================");
  	 		}
  	 		if(data[i] == "{"){
  	 			parse.push(data[i]);
  	 			//started = false;
  	 			//console.log("====================== : =====================");
  	 		}


  	 		if(data[i] == "type"){
  	 			type = data[i+1];
  	 		}else if(data[i] == "model"){
  	 			if(parse.length==1){
  	 				model = data[i+1];
  	 			}else if(parse.length == 2){
  	 				model = type;
  	 			}
  	 		}else if(data[i] == "iconcoords"){
  	 			var x = Number(data[i+1].replace("{",""));
  	 			var y = Number(data[i+2].replace("}",""));
  	 			coords.push(x);
  	 			coords.push(y);
  	 			//console.log(data[i]+" "+data[i+1]+" , "+data[i+2]);
  	 		}
  	 		else if(data[i] == "labelcoords"){
  	 			var x = Number(data[i+1].replace("{",""));
  	 			var y = Number(data[i+2].replace("}",""));
  	 			lbcoords.push(x);
  	 			lbcoords.push(y);
  	 			//console.log(data[i]+" "+data[i+1]+" , "+data[i+2]);
  	 		}else if(data[i] == "interface"){
  	 			interfaces.push(data[i+1]);
  	 			//console.log(data);

  	 		}else if(data[i] == "ip"){
  	 			interfaces.push(data[i+2]);
  	 			//console.log(data);
  	 		}else if(data[i] == "interface-peer"){
  	 			var tmp = data[i+2].replace("}","")
  	 			ifpeers.push(tmp);
  	 			//console.log(data);
  	 		}

  	 	}

  	 	if(parse.length == 0){
  	 		started = false;
			/*console.log("id="+id+", type="+type+", model= "+model+", coords="+coords);
			console.log(coords);
			console.log(lbcoords);
			console.log(interfaces);*/
			var infs = [];
			for(var j=0;j<interfaces.length-1;j+=2){
        console.log(interfaces.length+":"+interfaces[j+1])
				var ip = interfaces[j+1].split("/");

				var tmp = {interface:interfaces[j], ip:ip[0], ifnet:interfaces[j+1]};
				infs.push(tmp);
			}
			//console.log(coords[0]);
			var cds = {x:coords[0],y:coords[1]};
			var lbcds = {x:lbcoords[0],y:lbcoords[1]};
			var peers = [];//ifpeers;
			for(var k=0;k<ifpeers.length;k++){
				peers.push(ifpeers[k]);
			}
			console.log(infs);
			var arr = {id:id, type:type, model:model,peer:peers,coords:cds,lbcoords:lbcds,infs:infs};

			//console.log(arr);
			corecfg.push(arr);
			console.log("-----------------------------------"+parse.length);
			id="";
			type="";
			model="";
			coords.splice(0,coords.length);
			lbcoords.splice(0,lbcoords.length);
			interfaces.splice(0,interfaces.length);
			ifpeers.splice(0,ifpeers.length);
  	 	}
  	}

  if(line.startsWith("node")){
  	 var start = line.split(" ");

  	 if(start[0] === "node" && start.length==3 && start[2] === "{" ){

  	 	id = start[1];
  	 	parse.push(start[2]);
  	 	started = true;
  	 }
  }


  if (last) {
  	console.log("overall -------------------------------------------");
  	var immtoJson = {version:version, details:details , nodes:corecfg};
	console.log(immtoJson);


	jsonfile.writeFile(file, immtoJson, function (err) {
	  console.error(err);
	});

    return false; // stop reading
  }
});



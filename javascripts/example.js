var yell = function(data) { 
	return data + "!"; 
}

window.onmessage = function(e) { 
	// reverse JSON.stringify ( < IE10 can only postMessage(String) )
	var data = JSON.parse( e.data );  
	if( typeof data.json != "undefined" ) { 
		if(typeof data.JSONTableOpts == "undefined") { 
			data.JSONTableOpts = {}; 
		}
		JSONTable("table", data.json, data.JSONTableOpts); 
	}
}
/* Create Element Function can be invoked via window.create({ type: STRING, attributes: {}, contains: [STRING || {}] }) */
(function() {
	var $, createElem, creator, 
	__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	$ = jQuery;

	window.create = function(obj) {
		return creator(obj);
	};

	creator = function(obj) {
		var contentsObj, elem, innerElem, _i, _len, _ref;
		if (obj.contains == null) {
		  obj.contains = [];
		}
		if (obj.attributes == null) {
		  obj.attributes = {};
		}
		if (obj.type != null) {
		  elem = createElem(obj.type, obj.attributes);
		  _ref = obj.contains;
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		    contentsObj = _ref[_i];
		    if(typeof contentsObj == 'object') { 
		    	innerElem = create(contentsObj); 
		    	elem.appendChild(innerElem); 
		    } else { 
		    	elem.innerHTML = contentsObj; 
		    }
		  }
		  return elem;
		}
	};

	createElem = function(type, attributes) {
		var elem, key, val;
		elem = document.createElement(type);
		for (key in attributes) {
		  	val = attributes[key];
		    if (typeof attributes !== "undefined") {
		      elem.setAttribute(key, val);
		    }
		}
		return elem;
	};

	var defaultopts = { 
		// default opts go here:
		show: 'first_6', 
		trim: [],
		keyMap: {}, 
		filterMap: {}, 
		breakpoints: { phone: 480, tablet: 1024, desktop: 10000 }, 
		searchId: '', 
		paginationId: '', 
		perPage: 10, 
		paginate: false, 
		makeFootable: true
	}

	var inArray = function(has,arr) { 
		for(var i=0; i < arr.length; ++i) { 
			if(arr[i] == has) { return true; } 
		}
		return false; 
	}

	window.JSONTable = function(id,json,opts) { 
		return table(id,json,opts); 
	}
	var table = function(id, json, opts) { 
		var targetdiv, columns, settings, table, thead, tbody, columnsJSON, visiblecols; 

		targetdiv = document.getElementById(id); 

		columns = []; columnsJSON = []; visiblecols = []; 

		settings = (typeof opts == "undefined") ? {} : opts; 
		settings = $.extend({}, defaultopts, opts);

		for(var key in json[0]) { 
			if(!inArray(key,settings.trim)) { 
				columns.push(key);  
				
				var dataClass = ""; 
				var dataHide = ""; 

				if(typeof settings.show == "string") { 
					if(settings.show.indexOf("first_") > -1) { 
						var maxShown = parseInt(settings.show.split('first_')[1]); 
					} else { 
						maxShown = 3; 
						console.log("JSONTAble: Unrecognized format for 'show' parameter (must be string in form: 'first_@', where @ is an integer or an array of JSON Keys).");
					}
					if(columns.length == 1) { 
						dataClass = "expand"; 
					} 
					if(columns.length > maxShown) { 
						dataHide = "phone,tablet,desktop"; 
					} else if(columns.length > 3) { 
						dataHide = "phone,tablet"; 
					} else if(columns.length > 2) { 
						dataHide = "phone"; 
					}
				} else { 
					if(inArray(key,settings.show)) { 
						visiblecols.push(key); 
						dataHide = ""; 
						if(visiblecols.length == 1) { 
							dataClass = "expand"; 
						}
						if(visiblecols.length > 5) { 
							dataHide = "phone,tablet"; 
						} else if(visiblecols.length > 3) { 
							dataHide = "phone"; 
						}					
					} else { 
						dataHide = "phone,tablet,desktop"
					}
				}
				
				if(typeof settings.keyMap[key] != "undefined") { 
					key = settings.keyMap[key]; 
				}

				columnsJSON.push({
					type: 'th', 
					attributes: {
						'data-class': dataClass, 
						'data-hide': dataHide
					}, 
					contains: [ key ] 			
				})
			}
		}
		
		var tableAttrs = { 'class': 'footable' }; 
		if(settings.searchId != "") { 
			tableAttrs['data-filter'] = "#" + settings.searchId; 
		}
		if(settings.paginationId != "") { 
			settings.paginate = true; 
			tableAttrs['data-page-navigation'] = "#" + settings.paginationId; 
			tableAttrs['data-page-size'] = settings.perPage; 
		}

		table = window.create({
			type: 'table', 
			attributes: tableAttrs,
			contains: [
				{
					type: 'thead', 
					attributes: { }, 
					contains: [
						{
							type: 'tr', 
							attributes: { }, 
							contains: columnsJSON
						}
					] 
				}
			] 
		})

		tbody = window.create({
			type: 'tbody', 
			attributes: { }, 
			contains: []
		})

		for(var i=0; i < json.length; ++i) { 
			var row = window.create({
				type: 'tr', 
				attributes: { }
			}); 
			for(var j=0; j < columns.length; ++j) { 
				if(json[i][columns[j]] == null) { 
					json[i][columns[j]] = ""; 
				}
				
				var data = json[i][columns[j]]; 

				// check if a filter is defined for this json key: 
				if(typeof settings.filterMap[columns[j]] != "undefined") { 
					// make sure it's a function: 
					if(typeof window[settings.filterMap[columns[j]]] == "function") { 
						// call that function: 
						data = window[settings.filterMap[columns[j]]](json[i][columns[j]]); 
					}
				}
				var td = window.create({
					type: 'td', 
					attributes: {}, 
					contains: [ data ]
				})
				row.appendChild(td); 
			} 
			tbody.appendChild(row); 
		}

		table.appendChild(tbody); 
		targetdiv.appendChild(table); 

		if(settings.makeFootable) { 
			$(table).footable({breakpoints: settings.breakpoints, paginate: settings.paginate });
		}
		return table; 
	}
}).call(this);

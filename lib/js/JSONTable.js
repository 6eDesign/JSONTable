/* Create Element Function can be invoked via window.create({ type: STRING, attributes: {}, contains: [STRING || {}] }) */
(function($) {
	var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	var defaultopts = {
		// default opts go here:
		show: [],
		numCols: 6,
		trim: [],
		keyMap: {},
		filterMap: {},
		sortMap: {},
		breakpoints: { phone: 480, tablet: 1024, desktop: 10000 },
		searchId: '',
		paginationId: '',
		perPage: 10,
		paginate: false,
		makeFootable: true,
		deepScan: false
	}

	window.create = function(obj) {
		return creator(obj);
	};

	var creator = function(obj) {
		var contentsObj, elem, innerElem, _i, _len, _ref;
		if (obj.contains == null) {
			obj.contains = [];
		}
		if (obj.attributes == null) {
			obj.attributes = {};
		}
		if (obj.type != null) {
			elem = createElem(obj.type, obj.attributes, obj.events);
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

	var createElem = function(type, attributes, events) {
		var elem, key, val;
		elem = document.createElement(type);
		for (key in attributes) {
			val = attributes[key];
			if (typeof attributes !== "undefined") {
				elem.setAttribute(key, val);
			}
		}
		events = typeof events == 'undefined' ? { } : events; 
		for(var key in events) { 
			$(elem).on(key,events[key]);
		}
		return elem;
	};

	var extend = function() {
		for(var i=1; i<arguments.length; i++)
			for(var key in arguments[i])
				if(arguments[i].hasOwnProperty(key))
					arguments[0][key] = arguments[i][key];
		return arguments[0];
	}

	var inArray = function(has,arr) {
		for(var i=0; i < arr.length; ++i) {
			if(arr[i] == has) { return true; }
		}
		return false;
	}

	window.JSONTable = function(id,json,opts) {
		if(typeof id != "undefined" && id != "" && typeof json != "undefined") {
			opts = (typeof opts == "undefined") ? {} : opts;
			return table(id,json,opts);
		} else {
			console.log("JSONTable: 'id' or 'json' parameters were not supplied or are invalid.");
		}
	}

	// getColumn's only function is to return an ordered list of column keys
	var getColumns = function(json, settings) {
		var columns = [];
		for(var i=0; i < settings.show.length; ++i) {
			columns.push(settings.show[i]);
		}
		for(var i=0; i < json.length; ++i) {
			for(var key in json[i]) {
				if( !inArray(key,settings.trim) && !inArray(key,columns) ) {
					columns.push(key);
				}
			}
		}
		return columns;
	}

	var table = function(id,json,opts) {
		var targetdiv, columns, settings, table, thead, tbody, columnsJSON, tableAttrs;

		columnsJSON = [];
		targetdiv = document.getElementById(id);

		settings = extend({},defaultopts,opts)

		// send the whole array only if(deepScan):
		columns = (settings.deepScan) ? getColumns(json, settings) : getColumns([json[0]], settings);

		for(var i=0; i < columns.length; ++i) {
			var columnObj = {};
			columnObj.type = "th";
			columnObj.attributes = {};

			// add expand class to first column: 
			if(i==0) { columnObj.attributes['class'] = "expand" }

			if( settings.show.length == 0 ) {
				// limit cols shown in desktop breakpoint by settings.numCols
				if(i > (settings.numCols-1)) {
					columnObj.attributes['data-hide'] = "phone,tablet,desktop";
				} else if(i > 2) {
					columnObj.attributes['data-hide'] = "phone,tablet";
				} else if(i > 0) {
					columnObj.attributes['data-hide'] = "phone";
				}
			} else {
				// limit cols shown by settings.show array
				if( inArray(columns[i],settings.show) ) {
					// this col needs to be shown at desktop breakpoint: 
					if(i > 2) {
						columnObj.attributes['data-hide'] = "phone,tablet";
					} else if(i > 0) {
						columnObj.attributes['data-hide'] = "phone";
					}
				} else {
					// this col is not one of those specified in settings.show
					columnObj.attributes['data-hide'] = "phone,tablet,desktop";
				}
			}
			// replace column name from keyMap if a definition exists
			columnObj.contains = [];
			columnObj.contains.push( (typeof settings.keyMap[columns[i]] != "undefined") ? settings.keyMap[columns[i]] : columns[i] );
			columnsJSON.push(columnObj);
		}

		tableAttrs = { 'class': 'footable' };
		if(settings.searchId != "") {
			tableAttrs['data-filter'] = "#" + settings.searchId;
		}
		if(settings.paginationId != "") {
			settings.paginate = true;
			tableAttrs['data-page-navigation'] = "#" + settings.paginationId;
			tableAttrs['data-page-size'] = settings.perPage;
		} else {
			settings.paginate = false;
		}

		/* Build the table: */
		table = create({
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
		});

		tbody = create({
			type: 'tbody',
			attributes: {},
			contains: []
		})

		var rowClickWrapper = function() { 
			if(typeof settings.rowClick == 'function') { 
				settings.rowClick.apply(this,[json[this.getAttribute('data-index')]]); 				
			}
		}; 

		/* Create the rows: */
		for(var i=0; i < json.length; ++i) {
			var rowEvents = { }; 
			if(typeof settings.rowClick == 'function') { 
				rowEvents.click = rowClickWrapper; 
			}
			var row = create({
				type: 'tr',
				attributes: { 'data-index': i },
				events: rowEvents,
				contains: []
			})
			for(var j=0; j < columns.length; ++j) {
				var className = (j==0) ? "expand" : "";
				if(typeof json[i][columns[j]] == "undefined" || json[i][columns[j]] == null) {
					if(json[i][columns[j]] == null) {
						var data = "null";
					} else {
						var data = "";
					}
				} else {
					var data = json[i][columns[j]];
				}

				// check if a filter exists for this key:
				if(typeof settings.filterMap[columns[j]] == "function") {
					// call that function:
					data = settings.filterMap[columns[j]](json[i][columns[j]],columns[j],json[i][columns[j]]);
				} else if(typeof data == "object") {
					if(typeof data['length'] == 'undefined') {
						data = JSON.stringify(data,null,2);
					} else {
						// This item is an array without a filterMap function, concatenate values:
						var txt = "", abort = false;
						for(var k=0; k < data.length; ++k) {
							if(typeof data[k] != 'string') {
								abort = true;
								break;
							}
							txt += data[k];
						}
						data = abort ? '<pre>' + JSON.stringify(data,null,2) + '</pre>' : txt;
					}
				}

				var attrs = {
					'class': className
				};
				if(typeof settings.sortMap[columns[j]] != 'undefined') {
					attrs['data-value'] = settings.sortMap[columns[j]](data);
				}

				var td = create({
					type: 'td',
					attributes: attrs,
					contains: [data]
				});

				row.appendChild(td);
			}
			tbody.appendChild(row);
		}

		// join the table, thead, and tbody: 
		table.appendChild(tbody);

		targetdiv.appendChild(table);

		if(settings.makeFootable) {
			$(table).footable({breakpoints: settings.breakpoints, paginate: settings.paginate });
		}

		return table;
	}
})(jQuery);
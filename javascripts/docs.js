var options = [
	{
		"paramName": "'show'",
		"paramType": "String or [Array]", 
		"paramDefault": "'first_6'", 
		"paramExplanation": "Specify how many (String) or which (Array) of the JSON keys should be included in the default column layout.", 
		"paramExample": "show: 'first_#' // where # is an integer representing the number of columns to show by default<br>" 
						+ "show: ['key1', 'key2', 'key3']" 
	},
	{
		"paramName": "'trim'",
		"paramType": "[Array]", 
		"paramDefault": "[]", 
		"paramExplanation": "Provide an array of JSON keys which you would like completely excluded from the view.", 
		"paramExample": "trim: ['key1', 'key2', 'key3']" 
	},
	{
		"paramName": "'keyMap'",
		"paramType": "{Object}", 
		"paramDefault": "{}", 
		"paramExplanation": "Provide more friendly names/translations for JSON keys.", 
		"paramExample": "keyMap: {'originalKeyName': 'My Fancy New Keyname'}" 
	},
	{
		"paramName": "'filterMap'",
		"paramType": "{Object}", 
		"paramDefault": "{}", 
		"paramExplanation": "Specify functions to filter specific JSON values before displaying them in the table."
							+ " Filter should be setup like this: <br>"
							+ " <pre>var myFilter = function(data) { \r\n\t " 
							+ "return '&lt;em&gt;' + data + '&lt;/em&gt;' \r\n}", 
		"paramExample": "filterMap: 'myFilter'" 
	},
	{
		"paramName": "'paginationId'",
		"paramType": "String", 
		"paramDefault": "'' // disabled", 
		"paramExplanation": "Provide an element ID where you would like the pagination links.  If left unset, will default to an empty string and disable pagination for the FooTable.", 
		"paramExample": "paginationId: 'mylistID'" 
	},
	{
		"paramName": "'perPage'",
		"paramType": "Int", 
		"paramDefault": "10", 
		"paramExplanation": "How many results should be presented on each page?", 
		"paramExample": "perPage: 15" 
	},
	{
		"paramName": "'searchId'",
		"paramType": "String", 
		"paramDefault": "'' // disabled", 
		"paramExplanation": "Allow searching of the JSON data by providing an ID for your search text input.  Leaving this unset will disable FooTable filtering.", 
		"paramExample": "searchId: 'myInputId'" 
	},
	{
		"paramName": "'breakpoints'",
		"paramType": "{Object}", 
		"paramDefault": "{ phone: 480, tablet: 1024, desktop: 10000 }", 
		"paramExplanation": "These breakpoints will be passed to the FooTable plugin.", 
		"paramExample": "breakpoints: { phone: 220 } // it is only necessary to specify the breakpoints you wish to change" 
	},
	{
		"paramName": "'makeFootable'",
		"paramType": "Boolean", 
		"paramDefault": "true", 
		"paramExplanation": "Setting this option to false will generate a plain HTML table (without triggering the creation of a 'FooTable')." + 
							"  This will also remove the need for any of the FooTable dependencies (including jQuery), leaving only 'JSONTable.js' as a dependency.", 
		"paramExample": "makeFootable: false" 
	}
]

$(document).ready(function($) { 
	tableopts = { 
		'show': [ 'paramName', 'paramType', 'paramExplanation' ],
		'breakpoints': { phone: 250, tablet: 300, desktop: 10000 } 
	}
	JSONTable('optionsTable', options, tableopts); 
}); 
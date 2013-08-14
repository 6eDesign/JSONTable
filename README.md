# JSONTable

## JSONTable <img src="https://drone.io/github.com/6eDesign/JSONTable/status.png" align="right" />
JSON is awesome but it doesn't look that great.  JSONTable can help: 

### Usage
````js
var options = { pageSize: 20 }
JSONTable('myTargetID', myJSON, options)
````
### Options
Key | Type | Description | Example
--- | --- | --- | ---
'show' | String | Specify how many JSON keys should be included in the default column layout. | 'first_6'
'show' | [] | Specify the exact JSON keys to include in the default column layout. | [ 'key1', 'key2', 'key3' ]
'trim' | [] | Provide an array of JSON keys which you would like excluded from the view. | [ 'key1', 'key2', 'key3' ]
'keyMap' | {} | Provide more friendly names/translations for JSON keys. | { 'origKeyName': 'My Fancy New Key Name' } 
'filterMap' | String | Specify functions to filter JSON values before displaying them in the table. | 'myFilterFunctionsName'
'pageSize' | Int | How many results should be on each 'page'? | default: 10

### Advanced Usage
````js
var doStuff = function(data) { 
	return "<a>" + data + "!</a>"; 
}

$(document).ready(function($){
	JSONTable("table", JSON, { 
		/*
			show also accepts a string in the form of: 
				show: "first_@" // where @ is an integer representing the number of cols to show
		*/ 
		// show: 'first_5'
		show: ['a','c','e'] 
		/*
			keyMap instructs JSONTable to rename JSON Keys
		*/
		, keyMap: { 
			'a': 'Alphabet Soup'
		}
		/*
			filterMap instructs JSONTable to run content through your own custom filter functions.  
			setup your filter functions like so: 

			var myFilter = function(data) { 
				// manipulate your data here and then: 
				return data; // so we can render it into the JSONTable
			}
		*/
		, filterMap: { 
			'a': 'doStuff'
		}
	}); 
}); 
````

### License
````js
The MIT License (MIT)

Copyright (c) 2013 Jonathan Greenemeier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
````
# JSONTable
Quickly & Easily render responsive and customize-able views for virtually any JSON data-set.  
![alt tag](https://raw.github.com/6eDesign/JSONTable/master/lib/img/example.png)
Now accompanied by the power of a customized FooTable build for sorting, filtering, column-picking, and pagination capabilities.  

### Usage (Simple Case)
##### HTML:
````html
<div id="table"></div>

```` 
##### Javascript: 
````js
// create JSONTable from 'myJSON' and append it to the element with ID: 'myTargetId':
JSONTable('myTargetID', myJSON) 
````

### Options
Key | Type | Description | Example
--- | --- | --- | ---
'show' | String (or) [] | Specify how many (String) or which (Array) JSON keys should be included in the default column layout. | 'first_6' OR [ 'key1', 'key2', 'key3' ]
'trim' | [] | Provide an array of JSON keys which you would like excluded from the view. | [ 'key1', 'key2', 'key3' ]
'keyMap' | {} | Provide more friendly names/translations for JSON keys. | { 'origKeyName': 'My Fancy New Key Name' } 
'filterMap' | {} | Specify functions to filter specific JSON values before displaying them in the table. | { 'keyIWantToFilter': 'myFilterFunctionsName' } 
'paginationId' | String | Provide an element ID for the pagination links if you would like to enable pagination | default: Disabled
'perPage' | Int | How many results should be on each 'page'? | default: 10
'searchId' | String | Allow searching of the JSON data by providing the ID for your search text box input. | 'myInputID'
'breakpoints' | {} | Provide custom breakpoints for the FooTable. | default: { phone: 480, tablet: 1024, desktop: 10000 }

### Usage (Advanced Case)

#### HTML: 
````html 

Filter: <input id="myFilter" type="text" /> 

<div id="table"></div>

<ul id="pagination1" class="footable-nav">
	<span>Pages:</span>
</ul>

````

#### Javascript: 
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
			'a': 'yell'
		}
		// provide the ID of the text box used for searching/filtering JSON data: 
		, searchId: 'myFilter'
		// provide the ID of the element where you would like to store your pagination links: 
		, paginationId:  'pagination1'
		// let JSON table know how many items you would like per page: 
		, perPage: 10
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
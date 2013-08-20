var someJSON = {
    "total": 664,
    "rows": [
        {
            "id": 575,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Go back",
            "sample": "backwards",
            "verb": "",
            "followup_state": "MAIN",
            "keyword": [
                "backwards"
            ],
            "vars": null,
            "commands": "system_back"
        },
        {
            "id": 578,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Open help",
            "sample": "I am confused",
            "verb": "",
            "followup_state": "HELP",
            "keyword": [
                "confused"
            ],
            "vars": null,
            "commands": "system_help"
        },
        {
            "id": 247,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Get weather forecast for {location}",
            "sample": "What's the forecast (around here)?",
            "verb": "",
            "grammars_used": [
                "user.locations"
            ],
            "followup_state": "MAIN",
            "keyword": [
                "forecast"
            ],
            "vars": [
                "location_w"
            ],
            "commands": "get_forecast"
        },
        {
            "id": 236,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Get weather forecast for {city}, {state}, {country}",
            "sample": "What's the forecast for Palo Alto, California, United States",
            "verb": "",
            "grammars_used": [
                "local.city_state_country"
            ],
            "followup_state": "MAIN",
            "keyword": [
                "forecast"
            ],
            "vars": [
                "city",
                "state",
                "country"
            ],
            "commands": "get_forecast"
        },
        {
            "id": 237,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Get weather forecast for {city}, {state}",
            "sample": "What's the forecast for Palo Alto, California",
            "verb": "",
            "grammars_used": [
                "local.city_state_country"
            ],
            "followup_state": "MAIN",
            "keyword": [
                "forecast"
            ],
            "vars": [
                "city",
                "state"
            ],
            "commands": "get_forecast"
        },
        {
            "id": 238,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Get weather forecast for {city}",
            "sample": "What's the forecast for Palo Alto",
            "verb": "",
            "grammars_used": [
                "local.city_state_country"
            ],
            "followup_state": "MAIN",
            "keyword": [
                "forecast"
            ],
            "vars": [
                "city"
            ],
            "commands": "get_forecast"
        },
        {
            "id": 624,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Get weather forecast nearby",
            "sample": "What's the forecast?",
            "verb": "",
            "followup_state": "MAIN",
            "keyword": [
                "forecast"
            ],
            "vars": null,
            "commands": "get_forecast"
        },
        {
            "id": 270,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Show recently played stations",
            "sample": "what's my  history on Slacker",
            "verb": "",
            "grammars_used": [
                "global.services"
            ],
            "followup_state": "MAIN",
            "keyword": [
                "history"
            ],
            "vars": [
                "service_w"
            ],
            "commands": "list_recent_stations"
        },
        {
            "id": 271,
            "key": "0",
            "language": "en_us",
            "main_state": "MAIN",
            "optional_state": "",
            "human_readable": "Show recently played stations",
            "sample": "What's my history",
            "verb": "",
            "followup_state": "MAIN",
            "keyword": [
                "history"
            ],
            "vars": null,
            "commands": "list_recent_stations"
        },
        {
            "id": 15,
            "key": "0",
            "language": "en_us",
            "main_state": "{ANY}",
            "optional_state": "AUDIO_CONTROL",
            "human_readable": "Set volume to {level}",
            "sample": "sound to level 8",
            "verb": "",
            "grammars_used": [
                "system.numbers"
            ],
            "followup_state": "{LAST}",
            "keyword": [
                "level"
            ],
            "vars": [
                "NUMBER"
            ],
            "commands": "volume_level"
        }
    ],
    "footer": []
};


var yell = function(data) {
    return data + "!";
}

var handleArray = function(data) { 
	var txt = ""; 
	for(var i=0; i < data.length; ++i) { 
		txt += data[i]; 
	}
	return txt; 
}

$(document).ready(function($) {
    JSONTable("table", someJSON['rows'], {
        /*
			show also accepts a string in the form of: 
				show: "first_@" // where @ is an integer representing the number of cols to show
		*/
        // show: 'first_5'
        show: [
        	// 'a', 
        	// 'c', 
        	// 'e'
        ]
        /*
			keyMap instructs JSONTable to rename JSON Keys
		*/
        ,
        keyMap: {
            // 'a': 'Customer',
            // 'c': 'E-Mail',
            // 'e': 'Lorem Ipsum'
        }
        /*
			filterMap instructs JSONTable to run content through your own custom filter functions.  
			setup your filter functions like so: 

			var myFilter = function(data) { 
				// manipulate your data here and then: 
				return data; // so we can render it into the JSONTable
			}
		*/
        ,
        filterMap: {
            'a': 'yell', 
            'keyword': 'handleArray', 
            // 'vars': 'handleArray', 
            'grammars_used': 'handleArray'
        }
        // provide the ID of the text box used for searching/filtering JSON data: 
        ,
        searchId: 'myFilter'
        // provide the ID of the element where you would like to store your pagination links: 
        ,
        paginationId: 'pagination1'
        // let JSON table how many items you would like per page: 
        ,
        perPage: 5
        // , makeFootable: false
        ,
        breakpoints: {
            phone: 400,
            tablet: 500,
            desktop: 10000
        }, 
        /*
			If your JSON data-provider omits keys for empty/NULL fields, you need deep scan: 
			ex: 
			var myJSON = [
				{ 
					// this item is missing the 'c' key/value pair
					'a': 'lorem', 
					'b': 'ipsum'
				}, {
					// other items might have the 'c' key/value pair
					'a': 'some', 
					'b': 'filler',
					'c': 'text' 
				}
			]
        */
        deepScan: true
    });
});

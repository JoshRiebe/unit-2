//initialize function called when the script loads, which in turn calls cities function
function initialize(){
	cities();
};

//function to create a table with cities and their populations
function cities(){
	//array for storing cities and population, which are stored as objects
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//appends table element to the div
	$("#mydiv").append("<table>");

	//appends header row to table
	$("table").append("<tr>");
	
	//adds "City" and "Population" columns to header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //variable assigned to each city and its population
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //rowHtml variable appended to the table through iteration
        $("table").append(rowHtml);
    };
	//calls two functions, that are added on top of and after the table
    addColumns(cityPop);
    addEvents();
};
//function to add the city size column
function addColumns(cityPop){
    //function to be applied to each city by table row
    $('tr').each(function(i){
		//conditional to get the column header in place	
    	if (i == 0){
    		$(this).append('<th>City Size</th>');	
		//other part of conditional function if it is not satisfied
    	} else {
			//variable created for the city size of each city
    		var citySize;
			//conditional to find city with specific population to be assigned variable as small 
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
			//continued conditional to find city with specific population to be assigned variable as medium
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
			//continued conditional to find city that doesn't satisfy previous conditions to be assigned variable as large
    		} else {
    			citySize = 'Large';
    		};
			//appends city size of city to the City Size column
    		$(this).append("<td>" + citySize + "</td>");
    	};	
    });
};
//function to add special affects
function addEvents(){
	//creates mouseover for the table to cycle through different colors generated
	$('table').mouseover(function(){
		//creates color variable
		var color = "rgb(";
		//for loop to iterate to get three values for RGB
		for (var i = 0; i < 3; i++){
			//variable to hold random number between 1 and 255
			var random = Math.round(Math.random() * 255);
			//color variable adds the the value from the random variable	
			color = color += random;
			//conditional to add comma if i<2
			if (i<2){
				color += ",";
			//other part of conditional to close the color value for the CSS to be understood by jQuery
			} else {
				color += ")";
		};
		//defines color of the table
		$(this).css('color', color);
	
	};
	});
	//function for clicking the table, with its message
	function clickme(){
		alert('Hey, you clicked me!');
	};
	//creates the click, so that the message will pop up in the webpage
	$('table').on('click', clickme);	
};

//calls initialize function when document has loaded
$(document).ready(initialize);

//function to use AJAX and print data to webpage
function debugAjax(){
	//variable to hold the data
	var mydata;
    //defines jQuery AJAX method with data location and settings object (data type and callback function)
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
            //assigns variable to the parameter, so that they show the same value
            mydata = response;
            //call the callback function with the data
            debugCallback(mydata);
        }
    });
    //adds 'GeoJSON data:' to the webpage with line breaks
    $(mydiv).append('<br>GeoJSON data:<br>');

    //callback function, called from AJAX method
    function debugCallback(response){
        //adds the GEOJSON data to the webpage
        $(mydiv).append(JSON.stringify(mydata));
    };
};
//calls initialize function when document has loaded
$(document).ready(debugAjax); 
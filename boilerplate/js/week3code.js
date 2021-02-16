 /* function jsAjax(){
    // Step 1: Create the request 
    var ajaxRequest = new XMLHttpRequest();

    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState == 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
    ajaxRequest.open('GET', 'data/MegaCities.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
}; */
 
function jQueryAjax(){
    //basic jQuery ajax method
    $.get("data/MegaCities.geojson", callback, "json");

    $.getJSON("data/MegaCities.geojson", callback);
    
    var mydata;

    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;

            console.log(mydata); //data can be accessed
        }
    }); 

    console.log(mydata); //data cannot be accessed
};

$(document).ready(jQueryAjax); 
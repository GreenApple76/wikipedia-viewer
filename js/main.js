$(document).ready(function() {

// place cursor in textbox
$('.searchBox').focus();

// detect enter key being pressed
// if pressed then search for keyword
$(document).keypress(function(e) {
    if(e.which == 13) {
    	search();
    }
});

// setup search button event handler
$('.search').click(function() {
	search();
});

// setup random button event handler
// to open new window with random
// web page from wikipedia
$('.random').click(function() {
	window.open('https://en.wikipedia.org/wiki/Special:Random');
});

function search() {
	// retrieve keyword
	var keyword = $('.searchBox').val();
	var url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=';
	var encoded = encodeURIComponent(keyword);
	url += encoded + '&utf8=';

	// retrieve json data from wikipedia api
	// parse json data and output to web page
	$.getJSON(url, function(json) {
		var result = '<dl>';
		for (var i = 0; i < json.query.search.length; i++) {
			result += '<dt><a href="http://en.wikipedia.org/?curid=' + json.query.search[0].pageid + '">'
					+ json.query.search[i].title + '</a></dt>'
					+ '<dd>' + json.query.search[i].snippet + '</dd><br>';
		}
		result += '</dl>';

		$('.searchResults').html(result);
		// callback function, upon failure notify user of server communication error
		}).fail(function( jqxhr, textStatus, error ) {
    		var err = textStatus + ", " + error;
    		$(".searchResults").html( "OOPS! unable to retrieve data due to error: " + err + ". Please try your request again later.");

	});
}

});
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------

		kickoff(jQuery);

	}
	}, 10);
});


function kickoff($) {

	//ADD BUTTON
	$('#vB_Editor_QR_controls').find('tr').first()
		.prepend('<td id="voz-sticker-btn">Voz sticker</td>');

	//REGISTER EVENT WHEN CLICK THE BUTTON
	$('#voz-sticker-btn').on('click', function() {
		alert('hahaaha');
	});

	//CREATE PLACE HOLDER FOR BOX
	$('#vB_Editor_QR').prepend('<div id="voz-sticker-holder"></div>')
	
	//ADD THE BOX
	$('#voz-sticker-holder')
		.load(chrome.extension.getURL('views/box.html'), function() {
			//INIT BOX
			initBox( angular, $('#voz-sticker-box').get(0) );
		});

}
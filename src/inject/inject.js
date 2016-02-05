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
		$('#voz-sticker-box').toggleClass('vs-hidden');
	});

	//CREATE PLACE HOLDER FOR BOX
	$('#vB_Editor_QR').prepend('<div id="voz-sticker-holder"></div>')
	
	//ADD THE BOX
	$('#voz-sticker-holder')
		.load(chrome.extension.getURL('views/box.html'), function() {
			//INIT BOX
			var other = {
				addImgTag: addImgTag
			}

			initBox( angular, $('#voz-sticker-box').get(0), other );
		});

	//LOAD FONT
	loadFontAwesome();
}

function loadFontAwesome() {
	var fa = document.createElement('style');
    fa.type = 'text/css';
    fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
        + chrome.extension.getURL('css/font-awesome/fonts/fontawesome-webfont.woff')
        + '"); }';
	document.head.appendChild(fa);
}

function addImgTag(url) {
	var tag = '[IMG]' + url + '[/IMG]';
	var editor = $('#vB_Editor_QR_textarea');
	var position = editor.getCursorPosition();

	var content = editor.val();
	var newContent = content.substr(0, position) + tag + content.substr(position);

	editor.val(newContent);
}

//GET CURSOR POSITION JQUERY PLUGIN
(function ($, undefined) {
    $.fn.getCursorPosition = function () {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);
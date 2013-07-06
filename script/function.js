document.addEventListener("DOMContentLoaded", function() {
	//The intent edit
	var timeout;
	Voyeur.find("#input").addEventListener("keydown", function() {
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(runExample, 1000);
	});

	//Create the output iFrame
	Voyeur.find(".output").create.iframe.use(function(iframe) {
		
	})

	//Initially run the example
	runExample();
})
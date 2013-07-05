var timeout;
Voyeur.find("#input").addEventListener("keydown", function() {
	if(timeout) clearTimeout(timeout);
	timeout = setTimeout(runExample, 1000);
});

function runExample() {
	var iframe = Voyeur.create.iframe;

	
}
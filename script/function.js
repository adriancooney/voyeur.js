var timeout;
Voyeur.find("#input").addEventListener("keydown", function() {
	if(timeout) clearTimeout(timeout);
	timeout = setTimeout(runExample, 1000);
});

function runExample() {
	var iframe = Voyeur.find(".output").create.iframe.use(function(iframe) {
		iframe.style.display = "none";
		

		var text = Voyeur.find("#input").textContent;
	});
}
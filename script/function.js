function runExample() {
	if(Voyeur.find("#hidden-doc")) Voyeur.find("#hidden-doc").parentNode.removeChild(Voyeur.find("#hidden-doc"));
	Voyeur.find(".output").create.iframe.use(function(iframe) {
		iframe.id = "hidden-doc";
		iframe.style.display = "none";

		var text = Voyeur.find("#input").textContent;

		//Slightly embarrassing that I can't use Voyeur here
		var doc = iframe.contentWindow.document;

		var script = doc.createElement("script"),
			externals = ["Voyeur.js", "../HTML.stringify/HTML.stringify.js"].map(function(val) { return "<script type='text/javascript' src='" + val + "'></script>"; }).join("");

		//Append the code
		script.textContent = "window.addEventListener('DOMContentLoaded', function() { console.log('IFRAME:',  Voyeur); });"

		//Append the script
		doc.body.innerHTML = externals;
		doc.body.appendChild(script);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	//The intent edit
	var timeout;
	Voyeur.find("#input").addEventListener("keydown", function() {
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(runExample, 1000);
	});

	//Initially run the example
	runExample();
})
var timeout;
Voyeur.find("#input").addEventListener("keydown", function() {
	if(timeout) clearTimeout(timeout);
	timeout = setTimeout(runExample, 1000);
});

function runExample() {
	console.log(Voyeur.find("#hidden-doc"));
	if(Voyeur.find("#hidden-doc")) Voyeur.find("#hidden-doc").parentNode.removeChild(Voyeur.find("#hidden-doc"));
	Voyeur.find(".output").create.iframe.use(function(iframe) {
		iframe.id = "hidden-doc";
		iframe.style.display = "none";

		//Slightly embarrassing that I can't use Voyeur here
		var doc = iframe.contentWindow.document;

		var script = doc.createElement("script"),
			voyeurjs = doc.createElement("script");

		voyeurjs.src = "../Voyeur.js";

		//Append the code
		script.textContent = "document.addEventListener('DOMContextLoaded', function() { " + text + " });";

		//Append the script
		doc.appendChild(voyeurjs);
		doc.appendChild(script);

		setTimeout(function() {

		}, 100)
	});
}
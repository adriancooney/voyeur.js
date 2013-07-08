//Globs
var frame, input;

document.addEventListener("DOMContentLoaded", function() {
	input = Voyeur.find("#input");
	frame = Voyeur.find("#output").iframe;

	//The intent edit
	var timeout;
	input.addEventListener("keydown", function() {
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(executeInput, 1000);
	});

	//Syntax highlighting
	Sintax.highlight();

	setTimeout(Storyboard.resume, 1000);
});

function executeInput() {
	var data = input.value,
		doc = frame.contentWindow.document;

	var script = doc.createElement("script");
	script.innerHTML = data;
	script.id = "executable";

	if(doc.getElementById("executable")) doc.body.removeChild(doc.getElementById("executable"));
	doc.body.appendChild(script);
}

function animateText(from, to, fn, done) {
	var str = from, i = to.length, index = (to.indexOf(from) == 0) ? from.length : 0;
	console.log(index);
	(function animate() {
		if(str.length > index) str = str.substr(0, str.length - 1), fn(str);
		else {
			if(i) fn(to.substr(0, (to.length - (i-1)) + index)), i--;
			else return done();
		}

		setTimeout(animate, 50);
	})();
}

var Storyboard = {
	current: 0,
	running: true,
	pause: function() {
		Storyboard.running = false;
	},

	resume: function() {
		Storyboard.running = true;
		Storyboard.nextStory();
	},

	nextStory: function() {
		if(Storyboard.running) {
			var code = Storyboard.story[Storyboard.current];
			if(code) {
				animateText(input.value, code, function(str) {
					input.value = str;
				}, function() {
					executeInput();
					setTimeout(Storyboard.nextStory, 2000);
				});

				Storyboard.current++;
			}
		}
	},

	story: [
		"Voyeur.div",
		"Voyeur.div.section",
		"Voyeur.div.section.eq(1)",
		"Voyeur.div.section.eq(1).ul.li",
		"Voyeur.div.section.eq(1).ul.li.use(function(li, i) {\n\tli.textContent = \"List item #\" + i; \n});",
		"Voyeur.find(\"#empty\")",
		"Voyeur.find(\"#empty\").create.h1",
		"Voyeur.find(\"#empty\").create.h1.em\n\t.textContent = \"Another h1\";",
		"Voyeur.find(\"#empty\").create.h3.mult(3)",
		"Voyeur.find(\"#empty\").innerHTML = \"\"",
		"Voyeur.find(\"#empty\").create.ul.li.mult(10)\n\t.use(function(li, i) {\n\tli.textContent = \"More list items!\"; \n});",
		"Now you try it out for yourself! Edit me."
	]
};
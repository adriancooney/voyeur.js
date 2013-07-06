module("Voyeur element creation");

test("Voyeur.create.<tag> -- Creates tag", function() {
	equal(Voyeur.create.div.tagName, "DIV", "Tag created.");
});

test("Voyeur.create.<tag>.<tag> -- Creates tag from getter", function() {
	equal(Voyeur.create.div.div.tagName, "DIV", "Tag created.");
});

test("Voyeur.create.<tag>.<tag>.use() -- returns root node", function() {
	equal(Voyeur.create.div.span.use().tagName, "DIV", "Root node returned");
});

test("Voyeur.create.special(<tag>)", function() {
	equal(Voyeur.create.special("style").tagName, "STYLE", "Style tag created.");
});

test("Voyeur.<tag>.create.<tag> -- Creates and append tag within scope", 2, function() {
	var span = Voyeur.section.create.span;

	equal(span.tagName, "SPAN", "Tag created");
	equal(span.parentNode.tagName, "SECTION", "Tag within parent");
});

test("Voyeur.<tag>.create.<tag>.mult(<int>) -- Element multiplication on tag and appended", 4, function() {
	var spans = Voyeur.section.create.span.mult(10);

	ok(spans instanceof Array, "Multiple elements created and is array");
	ok(spans.length == 10, "Exact amount of elements preset");
	equal(spans[0].tagName, "SPAN", "Element specified created");
	equal(spans[0].parentNode.tagName, "SECTION", "Appended!");
});
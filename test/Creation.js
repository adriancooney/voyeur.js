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
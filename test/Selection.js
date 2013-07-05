module("Voyeur element selection");

test("Voyeur.find(<selector>) -- Returns array not nodelist", function() {
	ok(Voyeur.find("div") instanceof Array, "Is array!");
});

test("Voyeur.find(<id>) -- Returns single element", function() {
	ok(Voyeur.find("#identity") instanceof HTMLElement, "Is an element");
});

test("Voyeur.find(<selector>) -- Returns undefined if not elements found", function() {
	equal(Voyeur.find("#idontexist"), undefined, "Undefined!");
});

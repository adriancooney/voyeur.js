module("Voyeur element selection");

test("Voyeur -- Voyeur is the document body", function() {
	equal(Voyeur.tagName, "BODY", "Voyeur is the body");
})

test("Voyeur.find(<selector>) -- Returns array not nodelist", function() {
	ok(Voyeur.find("div") instanceof Array, "Is array!");
});

test("Voyeur.find(<id>) -- Returns single element", function() {
	ok(Voyeur.find("#identity") instanceof HTMLElement, "Is an element");
});

test("Voyeur.find(<selector>) -- Returns undefined if not elements found", function() {
	equal(Voyeur.find("#idontexist"), undefined, "Undefined!");
});

test("Voyeur.<tag>.find(<selector>) -- Scoped find selection", function() {
	ok(Voyeur.section.find("div"), "Selection!");
});

test("Voyeur.find(<selector>).<tag> -- DOM transversal after selector", function() {
	ok(Voyeur.find("section").div, "Exists!");
});

test("Voyeur.<tag> -- Getter selection and HTMLElement", 2, function() {
	ok(Voyeur.section, "Exists!");
	ok(Voyeur.section instanceof HTMLElement, "Is a HTML element!");
});

test("Voyeur.<tag>.<tag> -- Getter DOM transversal and returns array", 2, function() {
	ok(Voyeur.section.div, "Exists!");
	ok(Voyeur.section.div instanceof Array, "Is an array!")
});

asyncTest("Voyeur.<tag>.use() -- Sends node as parameter", 2, function() {
	Voyeur.section.use(function(section) {
		ok(section instanceof HTMLElement, "Is an element!");
		equal(section.tagName, "SECTION", "Is the node");
		start();
	});
});

test("Voyeur.<tag>.eq(<int>) -- Specific node select in list", function() {
	ok(Voyeur.section.div.eq(1) instanceof HTMLElement, "Node selected!");
});

test("Voyeur.<tag>.eq(<int>, <int>) -- Range selection in list", function() {
	ok(Voyeur.section.div.eq(0, 3).length > 2, "Nodes selected!")
});

test("Voyeur.<tag> -- Returns nodes in descending order", function() {
	var div = Voyeur.section.div;
	ok(div[0].id == "first" && div[div.length - 1].id == "last", "Order is descending");
})


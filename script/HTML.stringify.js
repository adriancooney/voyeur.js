HTMLElement.prototype.stringify = function(options) {
	options = options || {};
	var defaults = {
		string: "string",
		attr: "attr",
		tag: "tag",
		markup: "markup",
		tab: "&nbsp;&nbsp;&nbsp;&nbsp;",
		gt: "&gt;",
		lt: "&lt;",
		end: "/",
		newline: "<br>"
	};

	for(var key in defaults) if(!options[key]) options[key] = defaults[key];

	var str = "", textElems = /\b(?:(?:h\d)|(?:li))\b/;

	(function recur(elements, level) {
		elements.forEach(function(elem) {
			var tagName = elem.tagName.toLowerCase(),
				isInline = ((elem.currentStyle || window.getComputedStyle(elem, "")).display == "inline"),
				highlight = !!elem.getAttribute("data-highlight");

			str += tag(elem, isInline ? 0 : level, highlight);
			if(!elem.children.length && (tagName.match(textElems) || isInline)) str += elem.textContent;

			if(elem.children.length) {
				recur(Array.prototype.slice.call(elem.children), level + 1);
				str += tag(elem, (tagName.match(textElems) || isInline) ? 0 : level, highlight, true, !level);
			} else {
				str += tag(elem, 0, highlight, true);
			}
		});
	})([this], 0);

	function tag(elem, tab, highlight, close, newline) { 
		return (tab || newline ? options.newline : "") +
			(function() { str = ""; for(var i = 0; i < tab; i++) str += options.tab; return str; })() +
			"<span class='" + (highlight ? "highlight" : "") + "'>" +
			"<span class='" + options.markup + "''>" + options.lt +
			(close ? options.end : "") + "</span>" +
			"<span class='" + options.tag + "'>" + elem.tagName.toLowerCase() + "</span>" +
			(close ? "" : (function() { return Array.prototype.map.call(elem.attributes, function(attr) { if(attr.nodeName !== "data-highlight") return " <span class='" + options.attr + "'>" + attr.nodeName + "=</span><span class='" + options.string + "'>\"" + attr.nodeValue + "\"</span>"}).join(""); })()) +
			"<span class='" + options.markup + "'>" + options.gt + "</span>" +
			"</span>";
	}

	return str
};
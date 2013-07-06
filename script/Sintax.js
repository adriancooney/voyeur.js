/**
 * Sintax - An extremely lightweight Javascript syntax highlighter.
 * Highlights the text within <pre>'s on document load. Just include
 * and it'll do it's job.
 */
var Sintax = {
	highlight: function(pre) {
		if(pre) pre.innerHTML = Sintax.syntaxHighlight(pre.innerText || pre.textContent);
		else Array.prototype.forEach.call(document.getElementsByTagName("pre"), function(pre) {
			pre.innerHTML = Sintax.syntaxHighlight(pre.innerText || pre.textContent);
		});
	},

	syntaxHighlight: function(text) {
		var rules = {
			//Quotes
			"((?:\"|')[^\"']*(?:\"|'))": "<span class=\"quote\">$1</span>",

			//Match numbers
			"\\b([0-9]+)\\b": "<span class=\"number\">$1</span>",

			//Operators
			"(\\+|\\-|\\*|\\^)": "<span class=\"operator\">$1</span>",
		};

		var keywords = {
			//Javascript keywords
			"js": ["var", "new", "function", "return"],
			"element": ["document", "Aristochart"],

			//Types
			"type": ["Object", "Number", "String", "Array", "Boolean"],

			//Boolean
			"bool": ["true", "false"],

			"reserved": ["if", "for", "in", "while", "switch", "try", "catch", "else"]
		};

		for(var rule in rules) {
			text = text.replace(new RegExp(rule, "g"), rules[rule]);
		}

		//And replace the keywords
		for(var replace in keywords) {
			keywords[replace].forEach(function(keyword) {
				text = text.replace(new RegExp("\\b(" + keyword + ")\\b", "g"), "<span class=\"keyword " + replace + "\">$1</span>");
			})
		}

		//And now comments, line by line
		text = text.replace(new RegExp("(\\/\\/.*)", "g"), "<span class=\"comment\">$1</span>");
		text = text.replace(new RegExp("(/\\*[^(?:\\*/)]*\\*/)", "g"), "<span class=\"comment\">$1</span>");

		//Finally, replace tabs
		text = text.replace(new RegExp("\\t", "g"), "<span class=\"tab\">&#8213;&#8213; </span>");

		return text;
	}
};
var fn = function() {
	var that = this;
	var self = function(sel) {
		console.log(that);

		return that;
	};

	Object.defineProperty(self, "tag", {
		get: function() {
			return fn.bind({
				parent: this,
				root: this.root,
				tag: "tag"
			})();
		}
	});

	return self;
};

var a = fn.bind({
	frube: "World Hellow."
})()
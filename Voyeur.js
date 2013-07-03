(function() {
	var Voyeur = function(selector) {
		var elems = document.querySelectorAll(selector);
		if(elems.length == 1) return Voyeur.extendNode(elems[0]);
		else return Voyeur.extendNode({}, elems);
	};

	Voyeur.nodes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,nav,nobr,noframes,noscript,object,ol,optgroup,option,output,p,param,plaintext,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp".split(",");

	Voyeur.extendCreate = function(obj) {
		Voyeur.nodes.forEach(function(tag) {
			Object.defineProperty(obj, tag, {
				get: function() {
					this.tag = tag;
					this.factor = 1;
					this.attr = {};
					this.root = this.root || this;

					this.child = Voyeur.extendCreate({
						parent: this,
						root: this.root
					});

					return this.child;
				}
			});
		});

		obj.text = function(text) {
			this.parent._text = text;
			return this;
		};

		obj.eq = function(u, v) {
			this._eqU = u;
			this._eqV = v || u + 1;
			return this;
		};

		obj.attr = function(attr, val) {
			this.parent.attr[attr] = val;
			return this;
		};

		obj.mult = function(factor) {
			this.parent.factor = factor;
			return this;
		};

		["class", "href"].forEach(function(attr) {
			obj[attr] = function(val) {
				this.attr(attr, val);
				return this;
			}
		})

		obj["return"] = function() {
			var root;
			(function recur(parents, node) {	
				if(node) {
					var newParents = [];

					//Sort on the eq
					if(parents && node._eqU) parents = parents.slice(node._eqU, node._eqV);


					if(parents) {
						parents.forEach(function(elem) {
							for(var i = 0; i < node.factor; i++) {
								var addition = createElem(node);
								newParents.push(addition);
								elem.appendChild(addition);
							}
						}); 
					} else {
						for(var i = 0; i < node.factor; i++) {
							var addition = createElem(node);
							newParents.push(addition);
							root = newParents;
						}
					}

					recur(newParents, node.child);
				}
			})(undefined, this.root);

			return Voyeur.extendNode({}, root);
		}

		function createElem(node) {
			var elem = document.createElement(node.tag);
			for(var attr in node.attr) elem.setAttribute(attr, node.attr[attr]);
			if(node._text) elem.textContent = node._text;
			return elem;
		}

		return obj;
	};

	/**
	 * Expand a node's children vie their tags
	 * and expose them onto the node.
	 * @param  {HTMLElement} node 
	 * @return {null}
	 */
	Voyeur.extendNode = function(node, children, recipient) {
		var children = children || Array.prototype.slice.call(node.children),
			nodes = {};

		//Sort out the node amounts
		for (var i = children.length - 1; i >= 0; i--) {
			var tag = children[i].tagName.toLowerCase();

			if(!nodes[tag]) nodes[tag] = [children[i]];
			else nodes[tag].push(children[i]);
		};

		//We need a closure
		Object.keys(nodes).forEach(function(child) {
			var nodeList = nodes[child];

			if(!node[child]) {
				if(nodeList.length == 1) {
					// console.log("Extending node ", node, " with tag ", child, nodeList[0]);
					Object.defineProperty(recipient || node, child, {
						get: function() {
							return Voyeur.extendNode(nodeList[0]);
						}
					})
				} else {
					node = Voyeur.extendNodeList(recipient || node, (children) ? false : child, nodeList);
				}
			}
		});

		//Add Voyeur.fn functions. Not sure if this is a good idea but anyway.
		if(!recipient) {
			for(var fn in Voyeur.fn) {
				node[fn] = function() {
					Voyeur.fn[fn].apply(node, arguments);
				}
			}
		}

		//Give the user a little information about the tree
		node.nodes = Object.keys(nodes);

		return recipient || node;
	};

	/**
	 * Extends a node[tag] to a node list. I choose and object and
	 * getters and setters for performance instead of creating a "new"
	 * Voyeur object for every node within the nodeList.
	 * @param  {HTMLElement} node     The node to extend
	 * @param  {String} tag      The tag to extend on the node
	 * @param  {Array} nodeList An array of elements
	 * @return {Object} The new voyeur node          
	 */
	Voyeur.extendNodeList = function(node, tag, nodeList) {
		// console.log("Extending ", node, " with the tag ", tag, nodeList);
		var obj = {};

		nodeList.forEach(function(elem, i) {
			Object.defineProperty(obj, i, {
				get: function() {
					return Voyeur.extendNode(elem);
				}
			});
		});

		obj.length = nodeList.length;

		var arrayFn = Object.getOwnPropertyNames(Array.prototype),
			objectFn = Object.getOwnPropertyNames(Object.prototype);

		//Don't include "length"
		objectFn.push("length");

		//Extend all the array functions (excluding Array.prototype INTERSECT Object.prototype)
		arrayFn.forEach(function(fn) {
			if(objectFn.indexOf(fn) == -1)
				obj[fn] = function() {
					Array.prototype[fn].apply(obj, arguments)
				}
		});

		if(tag) node[tag] = obj;
		else node = obj;

		return node;
	};

	Voyeur.fn = {
		"class": function(_class, force) {
			var classes = (this.getAttribute("class") || "").split(" ");
			if(classes.indexOf(_class) == -1) classes.push(_class);
			else if(!force) classes.splice(classes.indexOf(_class), 1);

			this.setAttribute("class", classes.join(" ").trim());
		}
	};

	window.Voyeur = Voyeur.extendNode(document.body, undefined, Voyeur);
	window.Voyeur.create = Voyeur.extendCreate({});
})();
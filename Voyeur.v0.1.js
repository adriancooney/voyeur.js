/**
 * Planned API
 *
 * Voyeur.div.header.h1; //HTMLElement
 * Voyeur("#header").h1;
 * Voyeur.div("#header").h1
 * Voyeur.div.header.h1.create.em; //HTMLElement inside header.h1
 * Voyeur.div.create.section(function(section) {
 * 		section.create.h1.innerText = "Hello world!"
 * });
 *
 * Voyeur.div.create.section(5).forEach(function(section) {
 * 		section.create.h1(function(h1) {
 * 			h1.create.span.em.innerText = "Hello world!";
 * 		})
 * })
 */
(function() {
	var Voyeur = function() {
		var that = this; //Common this between functions
		var self = function(sel) {
			console.log(that);

			return that;
		};

		Object.defineProperty(self, "create", {
			get: function() {
				return Voyeur.extendCreate({}, function(tag) {
					return Voyeur.create.bind({
						tag: tag
					})()
				})
			}
		});

		return self;
	};

	Voyeur.create = function() {
		this.stack = Voyeur.createElement(this.stack, this.tag)

		this.root = this.root || this.stack;

		var that = this;
		Voyeur.extendCreate(this.root, function(tag) {
			return Voyeur.create.bind({
				root: that.root,
				stack: that.stack,
				tag: tag
			})()
		});

		//Define the functions
		this.root.use = function(fn) {
			if(this.stack instanceof Array) this.stack.forEach(function(elem) { 
				fn.call(that.root, elem)
			})
		}

		return this.root;
	};

	Voyeur.createElement = function(parents, tag) {
		if(parents) {
			if(parents instanceof Array) {
				var newParents = [];
				parents.forEach(function(mummy) {
					var elem = create();
					mummy.appendChild(elem);
					newParents.push(elem);
				});

				return newParents;
			} else {
				var elem = create();
				parents.appendChild(elem);
				return elem;
			}
		} else {
			return create();
		}

		function create() {
			return document.createElement(tag);
		}
	};

	Voyeur.nodes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,nav,nobr,noframes,noscript,object,ol,optgroup,option,output,p,param,plaintext,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp".split(",");
	Voyeur.extendCreate = function(obj, fn) {
		Voyeur.nodes.forEach(function(tag) {
			obj.__defineGetter__(tag, function() {
				return fn.call(obj, tag);
			})
		});

		return obj;
	};

	Voyeur.proxy = function(proxy, obj) {
		var props = Object.getOwnPropertyNames(obj);
		props.forEach(function(prop) {
			Object.defineProperty(proxy, prop, {
				get: function() {
					return obj[prop];
				},

				set: function(val) {
					return obj[prop] = val;
				}
			});
		})
	}

	window.Voyeur = Voyeur.bind({})();
})();
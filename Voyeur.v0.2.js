(function() {
	"use strict";

	var Voyeur = {};

	Voyeur.create = function() {
		var self = this;

		self.stack = Voyeur.createElement(self.stack, self.tag);
		self.root = self.root || self.stack;

		var create = function() {
			return self.root;
		};

		Voyeur.extendCreate(create, function(tag) {
			return Voyeur.create.bind({
				parent: self,
				root: self.root,
				stack: self.stack,
				tag: tag
			})()
		});

		create.use = function(fn) {
			fn.call(self, Voyeur.create.bind({
				root: self.root,
				stack: self.stack,
				
			}))

			return self.root;
		};

		return create;
	};

	Voyeur.nodes = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,nav,nobr,noframes,noscript,object,ol,optgroup,option,output,p,param,plaintext,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp".split(",");
	Voyeur.extendCreate = function(obj, fn) {
		Voyeur.nodes.forEach(function(tag) {
			Object.defineProperty(obj, tag, {
				get: function() {
					return fn.call(obj, tag);
				}
			});
		});

		return obj;
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

	window.Voyeur = {};
	window.Voyeur.create = Voyeur.extendCreate({}, function(tag) {
		return Voyeur.create.bind({
			tag: tag
		})()
	});
})();
# Voyeur
### [http://dunxrion.github.io/voyeur.js](http://dunxrion.github.io/voyeur.js)
Voyeur is a tiny (1.2kb) Javascript library that lets you transverse and manipulate the DOM the way it should have been. See [here](http://dunxrion.github.io/voyeur.js) for a demo, more information and documentation.

```html
<body>
	<div>
		<header>
			<h1 id="title"><em><a href="/">Hello world!</a></em></h1>
		</header>
		<section>
			<ul>
				<li class="item"><a href="#">Navigation Item</a></li>
				<li class="item"><a href="#">Navigation Item</a></li>
				<li class="item"><a href="#">Navigation Item</a></li>
				<li class="item"><a href="#">Navigation Item</a></li>
				<li class="item"><a href="#">Navigation Item</a></li>
			</ul>
		</section>
	</div>
</body>
```

```js
//Lets get the title link
Voyeur.div.header.h1.em.a.href = "http://google.com"
Voyeur.find("#title").em.a.innerText = "New title!";

//Let's get those navigation items
Voyeur.div.section.ul.li.use(function(li, i) {
	li.a.innerText = "Link #" + i;
});

Voyeur.div.section.ul.li.eq(3).classList.add("Highlighted!");

//How about we create some content
var content = Voyeur.create.div
	.section.mult(5).p.em.use(function(em) {
		em.textContext = "Hello world!";
	});

Voyeur.div.appendChild(content);
```

## Publishing to bower.io registry

```shell
$ # You need grunt to uglify, jshint, bumpup version, release (= tagging new version)
$ npm install grunt-cli

$ # check and minify Voyeur.js
$ grunt

$ # bump up version (patch version) 
$ grunt bumpup
$ # or bump up version (minor version)
$ grunt bumpup:minor

$ # commit your changes
$ git commit -a "bumpup to v0.2.x"
$ git push

# release: tagging, commit, push
$ grunt release

```

## Todo
* Initilize Voyeur after the DOMContentLoaded
* Make Voyeur handle the DOMSubtreeModified event.

License: _MIT_
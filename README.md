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
$ # Install grunt tasks modules
$ npm install

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

## License

The MIT License (MIT)

Copyright (c) 2013 Adrian Cooney <cooney.adrian@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
# Voyeur
### [http://adriancooney.github.io/voyeur.js](http://adriancooney.github.io/voyeur.js)
Voyeur is a tiny (1.2kb) Javascript library that lets you traverse and manipulate the DOM the way it should have been. See [here](http://adriancooney.github.io/voyeur.js) for a demo, more information and documentation.

## Warning
Voyeur is a great concept but I highly recommend you **avoid it in production**. There is serious performance issues yet to be worked out. [See here](https://github.com/adriancooney/voyeur.js/issues/20).

## Example
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

## Usage
Install via bower (courtesy of @pid)

	bower install Voyeur

Install via component

	component install dunxrion/voyeur.js
	
Include the script somewhere on the page.

```html
<script type="text/javascript" src="Voyeur.min.js"></script>
```

## Outside
Voyeur has managed to inspire a couple of other spin-off projects.
* https://gist.github.com/yckart/6627671 - @yckart managed to whittle down the basic functionality to an incredibly 140 bytes.
* http://nbubna.github.io/HTML/ - @nbubna has created HTML.js, check it out, it's worth it.

## Todo
* Make Voyeur handle <del>DOMSubtreeModified</del> DOM changes with `MutationObserver`.

##INTRODUCTION :(Non Technical Description)
voyeur.js is a tiny javascript library that lets you traverse and manipulate the DOM(Document Object Model) the way it should have been.
One of the main goals of Voyeur was to abstract as little as possible from the DOM and keep things clean.
Voyeur works by utilizing object getter functions to expose an element's children via their tag names on itself.
This does not mean that we expose every element's children onto itself.An element's children is only exposed when it's required so only the elements used will be Voyeur'fied.
Voyeur's advantage over JQuery :
you can avoid huge libraries because generally we never use half of the great tools provided. 
Voyeur does one job and it does it well, in a friendly way too which is always a plus.
voyeur is an open-source project by Adrian Cooney.

## License
[MIT License](https://raw.github.com/adriancooney/voyeur.js/master/LICENSE)

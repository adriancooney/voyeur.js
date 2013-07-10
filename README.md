# Voyeur
### [http://dunxrion.github.io/voyeur.js](http://dunxrion.github.io/voyeur.js)
Voyeur is a tiny (1.2kb) Javascript library that lets you traverse and manipulate the DOM the way it should have been. See [here](http://dunxrion.github.io/voyeur.js) for a demo, more information and documentation.

## Warning
**Voyeur is a great concept but I highly reccommend you _avoid_ it for production. There is serious performance issues yet to work out.**

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

## Todo
* Make Voyeur handle <del>DOMSubtreeModified</del> DOM changes with `MutationObserver`.

## License
[MIT License](https://raw.github.com/dunxrion/voyeur.js/master/LICENSE)

# Voyeur
### Transversing the DOM just became a bit more naughty
Voyeur exposes the DOM for transversing via the dot operator in a natural, intuitive way.

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
Voyeur("#title").em.a.innerText = "New title!";

//Let's get those navigation items
Voyeur.div.section.ul.li.forEach(function(li, i) {
	li.a.innerText = "Link #" + i;
});
Voyeur.div.section.ul.li[3].classList.add("Highlighted!");

//How about we create some content
var content = Voyeur.create.div.class("content")
	.section.mult(5).p.em.text("Hello world!");

Voyuer.div.appendChild(content);
```

### Concept
The goal of Voyeur is to make transversing the DOM as simple and as natural as possible. Voyeur uses some fancy 'getter' techniques to allow for dot operator selection of a node's children.

### API
#### `Voyeur`

#### `Voyeur( _&lt;selector&gt;_ )

#### `Voyeur.create.__&lt;tag name&gt;__`

License: _MIT_
#Voyeur
##Let's expose that document, honey.
Voyeur.js exposes the document into a pretty variable for easy access.

#API
The API is incredibly simple stuff. The whole document is stored in `Voyeur` or `V`. It stores the document with hierarchical structure within the object. Each element is accessed using the dot (.) operator. For example; HTML:

	<body>
		<div>
			<h1><a href="#">Hi</a></h1>
			<p><img src="logo.png"></p>
		</div>

		<ul>
			<li><a href="#">Hi!</a></li>
			<li><a href="#">Hi!</a></li>
			<li><a href="#">Hi!</a></li>
			<li><a href="#">Hi!</a></li>
		</ul>
	<body>

And the Javascript:
	
	//for the <a>
	V.div.a; //Returns Element

	//For the image
	V.div.p.img;

	//List item
	V.ul.li //Returns array [Note: Array, not nodeList!]

##Classes
Classes can be accessed by prepending `$$` to the name of the class and then continue using as normal. For Example; HTML:

	<body>
		<div>
			<p>Loren gimpsum <span class="spanner">dove</span></p>
		</div>
	</body

And the Javascript:

	V.$$spanner; //Returns span element or array if multiple items


##IDs
IDs can be accessed similiarly to classes except with only _one_ dollar sign ('$'). For example; HTML

	<body>
		<div>
			<p>Loren gimpsum <span id="hammer">dove</span></p>
		</div>
	</body

And the Javascript:

	V.$hammer; //Will always return only one element

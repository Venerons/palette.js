# Palette.js

_Copyright (c) 2013-2014 Daniele Veneroni._  
_Released under MIT License (X11 License). See [LICENSE.md](LICENSE.md) for further information._

Palette.js is a new full-standard HTML5 Canvas framework. With Palette.js you can easily create canvas graphics and animation in seconds!

## Usage

Just add the script to your HTML page to import Palette.js

```html
<script src="js/palette.min.js"></script>
```

Then add a canvas tag on your HTML with a id.

```html
<canvas id="myCanvas"></canvas>
```

Finally, use the Palette.js APIs to manipulate your canvas! Remember that you can also chain the APIs!

```js
var paper = new Palette("myCanvas");

// draw a text
paper.text("Hello World", 10, 30, "20px Arial", "blue");

// change the color and paint a circle
paper.setColor("#ABCDEF").circle(50, 50, 10);

// draw a image
paper.image("path/to/image.png", 10, 100);

// create an image from the canvas
var image = new Image();
image.src = paper.exportDataURL();
```

## Licensing

Palette.js is released under MIT License (X11 License). [Read the full license](LICENSE.md). 

## Credits

Created and maintained by Daniele Veneroni ([@Venerons](http://twitter.com/Venerons)).

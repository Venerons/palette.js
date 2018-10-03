# Palette.js

_Copyright (c) 2013-2018 Daniele Veneroni._  
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
var paper = new Palette('myCanvas');

// draw a text
paper.text({ text: 'Hello World!', x: 10, y: 30, font: '20px Arial', fill: 'blue' });

// draw a circle
paper.circle({ x: 50, y: 30, r: 10, fill: 'red' });

// draw a image
paper.image({ src: 'path/to/image.png', x: 10, y: 100 });

// create an image from the canvas
var dataURL = paper.toDataURL();
```

## Licensing

Palette.js is released under MIT License (X11 License). [Read the full license](LICENSE.md). 

## Credits

Created and maintained by Daniele Veneroni ([@Venerons](http://twitter.com/Venerons)).

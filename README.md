# palette.js

Palette.js is a framework to make drawing a canvas easy, providing all the features available from vanilla JavaScript, but without the complexity and verbosity of it.

## Usage

Add the script to your page:

```html
<script src="palette.min.js"></script>
```

You can also use jsDelivr as CDN if you prefer:

[![](https://data.jsdelivr.com/v1/package/gh/Venerons/palette.js/badge)](https://www.jsdelivr.com/package/gh/Venerons/palette.js)

```html
<!-- latest relase -->
<script src="https://cdn.jsdelivr.net/gh/Venerons/palette.js/palette.min.js"></script>

<!-- tagged relase -->
<script src="https://cdn.jsdelivr.net/gh/Venerons/palette.js@3.1.0/palette.min.js"></script>
```

Add a canvas:

```html
<canvas id="my_canvas"></canvas>
```

Finally, use the Palette.js APIs to manipulate your canvas. Remember that you can also chain the APIs.

```js
const paper = new Palette('#my_canvas');

// draw a text
paper.text({ text: 'Hello World!', x: 10, y: 30, font: '20px Arial', fill: 'black' });

// draw a circle
paper.circle({ x: 50, y: 30, r: 10, fill: 'black' });

// draw an image
paper.image({ src: 'path/to/image.png', x: 10, y: 100 });

// draw a custom path
paper.path({ path: 'M,10,10 L,20,20 M,10,20 L,20,10', stroke: 'black' });
```

[Read the full documentation](docs.md). 

## Licensing

palette.js is released under MIT License (X11 License). [Read the full license](LICENSE.md). 

## Credits

Created and maintained by [Daniele Veneroni](https://venerons.github.io).

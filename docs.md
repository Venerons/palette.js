# Quick Start

To start using palette.js you just need to create a Palette instance passing as argument a CSS selector of your canvas, or a canvas element. An optional second argument can be used to disable the alpha channel of the canvas, useful to improve performance if you don't need it.

```js
const paper = new Palette('#mycanvas');
```
```js
const paper = new Palette(document.createElement('canvas'));
```
```js
const paper = new Palette('#mycanvas', { alpha: false });
```

After you created an instance of Palette, you can start manipulating the canvas and drawing on it. Note that if you ever need direct access to the canvas element you can access it via `paper.canvas`, and if you ever need direct access to the drawing context you can access it via `paper.context`.

Following a complete example of getting a canvas, setting it fullscreen, drawing a white background and finally drawing a black circle in the middle.

```js
const paper = new Palette('#canvas', { alpha: false });
paper.size(window.innerWidth, window.innerHeight);
paper.clear();
paper.rect({ x: 0, y: 0, width: paper.width, height: paper.height, fill: 'white' });
paper.circle({ x: paper.width / 2, y: paper.height / 2, r: 100, fill: 'black' });
```

# Reference

## .size()

Resize the canvas. Please note that resizing the canvas will clear all content. Also, it will adapt the canvas for best rendering on retina/hi-dpi display, so the final real size of the canvas might differ from the one on input, even if then is correctly resized on the page. The values useful for drawing (that are equal to the input values) are stored in `paper.width` and `paper.height`.

```js
paper.size(480, 320);
```
```js
paper.size(window.innerWidth, window.innerHeight);
```

## .clear()

Clear a rectangular area by removing any content between it's area.

```js
paper.clear({ x: 100, y: 150, width: 100, height: 100 });
```

To clear the entire canvas area, you can call it without any argument

```js
paper.clear();
```

## .style()

Setup the canvas style for future use. Using this method, you can change the state for the next drawing functions to inherit. Any setting that is not overridden by the specific drawing function will inherit this.

```js
// setup the fill color to red
paper.style({ fill: '#dc143c' });

// the following two circles will be red as they will inherit the fill color from above
paper.circle({ x: 100, y: 100, r: 10, fill: true });
paper.circle({ x: 100, y: 200, r: 10, fill: true });

// the following circle will be black as it override the setting
paper.circle({ x: 100, y: 300, r: 10, fill: '#000000' });
```

Property | Values | Description
--- | --- | ---
fill | CSS color | Fill color.
stroke | CSS color | Stroke color.
shadow | `[offset_x] [offset_y] [blur] [color]` | Shadow. Example: `0 0 5 #8a2be2`.
cap | `butt`, `round`, `square` | Determines the shape used to draw the end points of lines. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)
join | `round`. `bevel`, `miter` | Determines the shape used to join two line segments where they meet. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)
thickness | number | Determines the thickness of lines. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
miterLimit | number | Sets the miter limit ratio. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit)
alpha | number between 0.0 (fully transparent) and 1.0 (fully opaque), inclusive. | Specifies the alpha (transparency) value that is applied to shapes and images before they are drawn onto the canvas. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha)
composite | `source-over`, `source-in`, `source-out`, `source-atop`, `destination-over`, `destination-in`, `destination-out`, `destination-atop`, `lighter`, `copy`, `xor`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity` | Sets the type of compositing operation to apply when drawing new shapes. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

## .image()

Load and draw an existing image.

```js
// draw image at position keeping original size
paper.image({ src: 'path/to/image.png', x: 10, y: 10 });

// draw image and resize it
paper.image({ src: 'path/to/image.png', x: 10, y: 10, width: 100, height: 100 });
```

## .text()

Draw a text.

```js
// filled text
paper.text({ text: 'Hello World!', x: 100, y: 150, font: 'Consolas', fill: 'red' });

// stroked text
paper.text({ text: 'Hello World!', x: 100, y: 150, font: 'Consolas', stroke: 'red' });

// styling
paper.text({
	text: 'Hello World!',
	x: 100,
	y: 150,
	font: '14px Arial, sans-serif', // CSS font
	align: 'start', // start, end, left, right, center
	baseline: 'top', // top, hanging, middle, alphabetic, ideographic, bottom
	direction: 'ltr', // ltr, rtl, inherit
	fill: 'black'
});
```

## .line()

Draw a line.

```js
// draw a line with inherited color
paper.line({ x1: 100, y1: 100, x2: 200, y2: 200 });

// draw a line overriding the color
paper.line({ x1: 100, y1: 100, x2: 200, y2: 200, stroke: 'red' });
```

## .rect()

Draw a rectangle.

```js
// filled rectangle
paper.rect({ x: 100, y: 150, width: 100, height: 100, fill: 'red' });

// stroked rectangle
paper.rect({ x: 100, y: 150, width: 100, height: 100, stroke: 'red' });

// filled and stroked rectangle
paper.rect({ x: 100, y: 150, width: 100, height: 100, fill: 'red', stroke: 'blue' });
```

## .circle()

Draw a circle.

```js
// filled circle
paper.circle({ x: 100, y: 150, r: 100, fill: 'red' });

// stroked circle
paper.circle({ x: 100, y: 150, r: 100, stroke: 'red' });

// filled and stroked circle
paper.circle({ x: 100, y: 150, r: 100, fill: 'red', stroke: 'blue' });
```

## .arc()

Draw an arc.

```js
// filled arc
paper.arc({ x: 100, y: 150, r: 50, start: 3, stop: 2 * Math.PI, fill: 'red' });

// stroked arc
paper.arc({ x: 100, y: 150, r: 50, start: 3, stop: 2 * Math.PI, stroke: 'red' });

// filled and stroked arc
paper.arc({ x: 100, y: 150, r: 50, start: 3, stop: 2 * Math.PI, fill: 'red', stroke: 'blue' });
```

## .polygon()

Draw a regular polygon centered at position `x` and `y`.

```js
// draw an hexagon
paper.polygon({
	x: 100,
	y: 100,
	sides: 6,
	size: 20,
	degree: 45,
	fill: 'black'
});
```

Property | Description
--- | ---
x | Center position on X axis.
y | Center position on Y axis.
sides | Number of sides.
size | Size of the polygon.
degree | (Optional) Rotation in degree.

## .path()

Draw a path. The path can be filled, stroked or both as you like.

The path is a set of instructions separated by ` ` (space). Each instruction is a set of values depending on the action:

Syntax | Description
--- | ---
`M,x,y` | Move to point at x,y
`L,x,y` | Draw line from current position to point at x,y
`Q,cpx,cpy,x,y` | Draw line from current position using control point at cpx,cpy and end point x,y

```js
paper.path({ path: 'M,10,10 L,20,20 M,10,20 L,20,10', stroke: 'black' });
```

## .conic_gradient()

Returns a conic gradient for later use.

```js
const gradient = paper.conic_gradient({
	degree: 0,
	x: 50,
	y: 50,
	stops: '0,red 0.25,orange 0.5,yellow 0.75,green 1,blue'
});
paper.rect({ x: 0, y: 0, width: 100, height: 100, fill: gradient })
```

## .linear_gradient()

Returns a linear gradient for later use.

```js
const gradient = paper.linear_gradient({
	x1: 0,
	y1: 0,
	x2: 100,
	y2: 0,
	stops: '0,red 0.25,orange 0.5,yellow 0.75,green 1,blue'
});
paper.rect({ x: 0, y: 0, width: 100, height: 100, fill: gradient })
```

## .radial_gradient()

Returns a radial gradient for later use.

```js
const gradient = paper.radial_gradient({
	x1: 50,
	y1: 50,
	r1: 0,
	x2: 50,
	y2: 50,
	r2: 50,
	stops: '0,red 0.25,orange 0.5,yellow 0.75,green 1,blue'
});
paper.rect({ x: 0, y: 0, width: 100, height: 100, fill: gradient })
```

## .toDataURL()

Export the canvas as a data URL string.

```js
const data = paper.toDataURL();
const data = paper.toDataURL({ type: 'image/png' });
const data = paper.toDataURL({ type: 'image/jpeg', quality: 0.5 });
const data = paper.toDataURL({ type: 'image/webp', quality: 0.5 });
```

## .toBlob()

Export the canvas as a blob.

```js
paper.toBlob({ type: 'image/png' }, function (blob) {
	console.log('Done.');
});
paper.toBlob({ type: 'image/jpeg', quality: 0.5 }, function (blob) {
	console.log('Done.');
});
paper.toBlob({ type: 'image/webp', quality: 0.5 }, function (blob) {
	console.log('Done.');
});
```

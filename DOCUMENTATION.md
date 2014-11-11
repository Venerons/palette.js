# Palette.js Documentation

## Quick Start

To start using Palette.js you just need to create a Palette instance passing as argument the ID of your canvas

```js
var paper = new Palette('myCanvas');
```

## Reference

#### .size()

Resize the canvas. Please note that resizing the canvas will clear all content.

```js
paper.size(480, 320);
```

---

#### .clear()

Clear a rectangular area by removing any content between it's area.

```js
paper.clear({ x: 100, y: 150, width: 100, height: 100 });
```

To clear the entire canvas area, you can call it without any argument

```js
paper.clear();
```

---

#### .style()

Setup the canvas style for future use.

```js
paper.style({
	fill: '#dc143c', // color string or true
	shadow: '0 0 5 #8a2be2',
	stroke: '#66cdaa', // color string or true
	cap: 'round',
	join: 'round', // 'miter', 'round' or 'bevel' - default: 'miter'
	thickness: 5, // default: 1
	miterLimit: 10 // default: 5
});
```

---

```js
paper.rect({ x: 100, y: 150, width: 100, height: 100, fill: '#ff0000' }); // filled rectangle
paper.rect({ x: 100, y: 150, width: 100, height: 100, stroke: '#ff0000' }); // stroked rectangle
paper.rect({ x: 100, y: 150, width: 100, height: 100, fill: '#ff0000', stroke: '#ff0000' }); // filled and stroked rectangle

paper.circle({ x: 100, y: 150, r: 100, fill: '#ff0000' }); // filled circle
paper.circle({ x: 100, y: 150, r: 100, stroke: '#ff0000' }); // stroked circle
paper.circle({ x: 100, y: 150, r: 100, fill: '#ff0000', stroke: '#ff0000' }); // filled and stroked circle

paper.line({ x1: 100, y1: 100, x2: 200, y2: 200 });
paper.line({ x1: 100, y1: 100, x2: 200, y2: 200, stroke: '#ff0000' });

paper.arc({ x: 100, y: 150, r: 100, start: , stop: , fill: '#ff0000' });
paper.arc({ x: 100, y: 150, r: 100, start: , stop: , stroke: '#ff0000' });
paper.arc({ x: 100, y: 150, r: 100, start: , stop: , fill: '#ff0000', stroke: '#ff0000' });

paper.text({ text: 'Hello World!', x: 100, y: 150, font: 'Consolas', fill: '#ff0000' });
paper.text({ text: 'Hello World!', x: 100, y: 150, font: 'Consolas', stroke: '#ff0000' });
paper.text({ text: 'Hello World!', x: 100, y: 150, font: 'Consolas', fill: '#ff0000', stroke: '#ff0000' });

paper.image({ src: 'myimage.png', x: 100, y: 150 });
paper.image({ src: 'myimage.png', x: 100, y: 150, width: 100, height: 100 });

paper.animation(function[, fps]);

var data = paper.toDataURL();
var data = paper.toDataURL({ type: 'image/png' });
var data = paper.toDataURL({ type: 'image/jpeg', quality: 0.5 });

paper.toBlob(null, function (blob) {
	console.log('Done.');
});
paper.toBlob({ type: 'image/png' }, function (blob) {
	console.log('Done.');
});
paper.toBlob({ type: 'image/jpeg', quality: 0.5 }, function (blob) {
	console.log('Done.');
});
```

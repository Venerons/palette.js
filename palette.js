// ┌───────────────────────────────────────────────────────────────────────┐
// │ Palette.js                                                            │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Version 1.0.2 - 03/10/2018                                            │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Copyright (c) 2013-2018 Daniele Veneroni (http://venerons.github.io)  │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Licensed under the MIT License (X11 License).                         │
// └───────────────────────────────────────────────────────────────────────┘

/*

// POLYGONS

http://www.arungudelli.com/html5/html5-canvas-polygon/

function regularpolygon(ctx, x, y, radius, sides) {
  if (sides < 3) return;
  ctx.beginPath();
  var a = ((Math.PI * 2)/sides);
  ctx.translate(x,y);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.stroke();
}

// GRADIENTS

'90-#fff-#000'

create and set a linear gradient
Example:
paper.gradient({
	x1: 0,
	y1: 0,
	x2: 100,
	y2: 0,
	color1: 'blue',
	color2: 'red'
});

Palette.prototype.gradient = function (settings) {
	var gradient = this.context.createLinearGradient(settings.x1, settings.y1, settings.x2, settings.y2);
	gradient.addColorStop(0, settings.color1);
	gradient.addColorStop(1, settings.color2);
	this.setColor(gradient);
	return this;
};

---

.rotate(degrees)

```js
context.rotate(degrees * Math.PI / 180);
```

.scale()  
.translate()  
.transform() - see transform() and setTransform() 

---

#### compositing

globalAlpha  
globalCompositeOperation

*/

(function () {
	'use strict';

	// Example: var paper = new Palette('myCanvas');
	function Palette(canvasID) {
		if (canvasID instanceof HTMLCanvasElement) {
			this.canvas = canvasID;
		} else {
			this.canvas = document.getElementById(canvasID);
		}
		this.context = this.canvas.getContext('2d');
	}

	// change canvas size (warning: this will clear the canvas!)
	Palette.prototype.size = function (w, h) {
		this.canvas.width = w;
		this.canvas.height = h;
		return this;
	};

	// clear a rectangular area
	Palette.prototype.clear = function (settings) {
		if (settings) {
			this.context.clearRect(settings.x, settings.y, settings.width, settings.height);
		} else {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
		return this;
	};

	// set the style for future use
	Palette.prototype.style = function (settings) {
		if (settings.fill) {
			this.context.fillStyle = settings.fill;
		}
		if (settings.shadow) {
			var shadow = settings.shadow.split(' ');
			this.context.shadowOffsetX = parseInt(shadow[0], 10);
			this.context.shadowOffsetY = parseInt(shadow[1], 10);
			this.context.shadowBlur = parseInt(shadow[2], 10);
			this.context.shadowColor = shadow[3];
		}
		if (settings.stroke) {
			this.context.strokeStyle = settings.stroke;
		}
		if (settings.cap) {
			this.context.lineCap = settings.cap;
		}
		if (settings.join) {
			this.context.lineJoin = settings.join;
		}
		if (settings.thickness) {
			this.context.lineWidth = settings.thickness;
		}
		if (settings.miterLimit) {
			this.context.miterLimit = settings.miterLimit;
		}
		return this;
	};

	// paint a line
	Palette.prototype.line = function (settings) {
		this.context.save();
		this.style(settings);
		this.context.beginPath();
		this.context.moveTo(settings.x1, settings.y1);
		this.context.lineTo(settings.x2, settings.y2);
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
		return this;
	};

	// paint a rectangle
	Palette.prototype.rect = function (settings) {
		this.context.save();
		this.style(settings);
		this.context.beginPath();
		this.context.rect(settings.x, settings.y, settings.width, settings.height);
		this.context.closePath();
		if (settings.fill) {
			this.context.fill();
		}
		if (settings.stroke) {
			this.context.stroke();
		}
		this.context.restore();
		return this;
	};

	// paint a circle
	Palette.prototype.circle = function (settings) {
		this.context.save();
		this.style(settings);
		this.context.beginPath();
		this.context.arc(settings.x, settings.y, settings.r, 0, 2 * Math.PI);
		this.context.closePath();
		if (settings.fill) {
			this.context.fill();
		}
		if (settings.stroke) {
			this.context.stroke();
		}
		this.context.restore();
		return this;
	};

	// paint an arc
	Palette.prototype.arc = function (settings) {
		this.context.save();
		this.style(settings);
		this.context.beginPath();
		this.context.arc(settings.x, settings.y, settings.r, settings.start, settings.stop);
		this.context.closePath();
		if (settings.fill) {
			this.context.fill();
		}
		if (settings.stroke) {
			this.context.stroke();
		}
		this.context.restore();
		return this;
	};

	/*

	Palette.prototype.path = function (settings) {
		this.context.save();
		this.style(settings);
		this.context.beginPath();

		// path engine

		this.context.closePath();
		if (settings.fill) {
			this.context.fill();
		}
		if (settings.stroke) {
			this.context.stroke();
		}
		this.context.restore();
		return this;
	};

	*/

	// paint a text
	Palette.prototype.text = function (settings) {
		this.context.save();
		this.style(settings);
		if (settings.font){
			this.context.font = settings.font;
		}
		if (settings.align){
			this.context.textAlign = settings.align;
		}
		if (settings.baseline){
			this.context.textBaseline = settings.baseline;
		}
		if (settings.measure) {
			this.context.measureText = settings.measure;
		}
		if (settings.stroke) {
			this.context.strokeText(settings.text, settings.x, settings.y);
		} else {
			this.context.fillText(settings.text, settings.x, settings.y);
		}
		this.context.restore();
		return this;
	};

	// paint an image (width and height are optionals)
	Palette.prototype.image = function (settings) {
		var ctx = this.context,
			image = new Image();
		image.onload = function() {
			if (settings.width && settings.height) {
				ctx.drawImage(image, settings.x, settings.y, settings.width, settings.height);
			} else {
				ctx.drawImage(image, settings.x, settings.y);
			}
		};
		image.src = settings.src;
		return this;
	};

	// requestAnimationFrame polyfill
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	// start an animation loop
	Palette.prototype.animation = function (animation, fps) {
		var palette = this;
		if (!fps) {
			animation();
			requestAnimationFrame(palette.animation(animation));
		} else {
			setTimeout(function() {
				animation();
				requestAnimationFrame(palette.animation(animation, fps));
			}, 1000 / fps);
		}
		//return this;
	};

	// export the canvas as a DataURL image, returning a string with the DataURL image. Both arguments are optional.
	// Supported type: 'image/png', 'image/jpeg', 'image/webp'
	// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
	Palette.prototype.toDataURL = function (settings) {
		settings = settings || {};
		var type = settings.type || 'image/png',
			quality = settings.quality || 1.0;
		if (this.canvas.toDataURLHD) {
			return this.canvas.toDataURLHD(type, quality); // Legacy
		} else {
			return this.canvas.toDataURL(type, quality);
		}
	};

	// export the canvas as a blob image. You must pass a callback function, because this method is a void.
	// Supported type: 'image/png', 'image/jpeg', 'image/webp'
	// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
	Palette.prototype.toBlob = function (settings, callback) {
		settings = settings || {};
		var type = settings.type || 'image/png',
			quality = settings.quality || 1.0;
		if (this.canvas.toBlobHD) {
			this.canvas.toBlobHD(callback, type, quality); // Legacy
		} else {
			this.canvas.toBlob(callback, type, quality);
		}
		return this;
	};

	window.Palette = Palette;
})();

// ┌───────────────────────────────────────────────────────────────────────┐
// │ Palette.js                                                            │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Version 0.9.0 - 13/01/2014                                            │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Copyright (c) 2013-2014 Daniele Veneroni (http://venerons.github.io)  │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Licensed under the MIT License (X11 License).                         │
// └───────────────────────────────────────────────────────────────────────┘

"use strict";

function Palette(canvas) {
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext("2d");
}

// change canvas size (warning: this will clear the canvas!)
Palette.prototype.size = function (w, h) {
	this.canvas.width = w;
	this.canvas.height = h;
	return this;
};

// export the canvas as a DataURL image, returning a string with the DataURL image. Both arguments are optional.
// Supported type: "image/png", "image/jpeg", "image/webp"
// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
Palette.prototype.exportDataURL = function (type, quality) {
	type = type || "image/png";
	quality = quality || 1.0;
	if (this.canvas.toDataURLHD) {
		return this.canvas.toDataURLHD(type, quality);
	} else {
		return this.canvas.toDataURL(type, quality);
	}
};

// export the canvas as a blob image. You must pass a callback function, because this method is a void.
// Supported type: "image/png", "image/jpeg", "image/webp"
// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
Palette.prototype.exportBlob = function (callback, type, quality) {
	type = type || "image/png";
	quality = quality || 1.0;
	if (this.canvas.toBlobHD) {
		this.canvas.toBlobHD(callback, type, quality);
	} else {
		this.canvas.toBlob(callback, type, quality);
	}
	return this;
};

// set the color for future use
Palette.prototype.setColor = function (color) {
	this.context.fillStyle = color || "#000000";
	this.context.strokeStyle = color || "#000000";
	return this;
};

// create and set a linear gradient
Palette.prototype.gradient = function (x1, y1, x2, y2, color1, color2) {
	var gradient = this.context.createLinearGradient(x1, y1, x2, y2);
	gradient.addColorStop(0, color1);
	gradient.addColorStop(1, color2);
	this.setColor(gradient);
	return this;
};

// paint a filled rectangle (color is optional)
Palette.prototype.rect = function (x, y, w, h, color) {
	if (color) { this.setColor(color); }
	this.context.fillRect(x, y, w, h);
	return this;
};

// paint a stroked rectangle (color is optional)
Palette.prototype.strokedRect = function (x, y, w, h, color) {
	if (color) { this.setColor(color); }
	this.context.strokeRect(x, y, w, h);
	return this;
};

// clear a rectangular area
Palette.prototype.clear = function (x, y, w, h) {
	this.context.clearRect(x, y, w, h);
	return this;
};

// paint a line (color is optional)
Palette.prototype.line = function (x1, y1, x2, y2, join, w, color) {
	if (color) { this.setColor(color); }
	this.context.lineJoin = join || "miter"; // miter, round, bevel
	this.context.lineWidth = w || 1;
	this.context.beginPath();
	this.context.moveTo(x1, y1);
	this.context.lineTo(x2, y2);
	this.context.closePath();
	this.context.stroke();
	return this;
};

// paint a filled circle (color is optional)
Palette.prototype.circle = function (x, y, r, color) {
	if (color) { this.setColor(color); }
	this.context.beginPath();
	this.context.arc(x, y, r, 0, 2*Math.PI);
	this.context.closePath();
	this.context.fill();
	return this;
};

// paint a stroked circle (color is optional)
Palette.prototype.strokedCircle = function (x, y, r, color) {
	if (color) { this.setColor(color); }
	this.context.beginPath();
	this.context.arc(x, y, r, 0, 2*Math.PI);
	this.context.closePath();
	this.context.stroke();
	return this;
};

// paint a filled arc (color is optional)
Palette.prototype.arc = function (x, y, r, start, stop, color) {
	if (color) { this.setColor(color); }
	this.context.beginPath();
	this.context.arc(x, y, r, start, stop);
	this.context.closePath();
	this.context.fill();
	return this;
};

// paint a stroked arc (color is optional)
Palette.prototype.strokedArc = function (x, y, r, start, stop, color) {
	if (color) { this.setColor(color); }
	this.context.beginPath();
	this.context.arc(x, y, r, start, stop);
	this.context.closePath();
	this.context.stroke();
	return this;
};

// paint a filled text (color is optional)
Palette.prototype.text = function (text, x, y, font, color) {
	if (color) { this.setColor(color); }
	this.context.font = font;
	this.context.fillText(text, x, y);
	return this;
};

// paint a stroked text (color is optional)
Palette.prototype.strokedText = function (text, x, y, font, color) {
	if (color) { this.setColor(color); }
	this.context.font = font;
	this.context.strokeText(text, x, y);
	return this;
};

// paint an image (width and height are optionals)
Palette.prototype.image = function (src, x, y, w, h) {
	var ctx = this.context;
	var image = new Image();
	image.onload = function() {
		if (w && h) {
			ctx.drawImage(image, x, y, w, h);
		} else {
			ctx.drawImage(image, x, y);
		}
	};
	image.src = src;
	return this;
};

// requestAnimationFrame polyfill
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// set an animation at a specified fps. fps is optional, if not specified default is 60fps
Palette.prototype.animation = function (animation, fps) {
	var palette = this;
	if (!fps) { fps = 60; }
	setTimeout(function() {
		animation();
		window.requestAnimationFrame(palette.animation(animation, fps));
	}, 1000 / fps);
	//return this;
};

// palette.js v3.0.0
// Copyright (c) 2013 – 2022 Daniele Veneroni. All rights reserved.
// Licensed under the MIT License (X11 License)
(function () {
	'use strict';

	function Palette(canvas, settings) {
		if (canvas instanceof HTMLCanvasElement) {
			this.canvas = canvas;
		} else {
			this.canvas = document.querySelector(canvas);
		}
		this.context = this.canvas.getContext('2d', settings);
	}

	Palette.prototype.size = function (w, h) {
		this.canvas.width = w;
		this.canvas.height = h;
		return this;
	};

	Palette.prototype.clear = function (settings) {
		const ctx = this.context;
		if (settings) {
			ctx.clearRect(settings.x, settings.y, settings.width, settings.height);
		} else {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
		return this;
	};

	Palette.prototype.style = function (settings) {
		const ctx = this.context;
		if (settings.fill) {
			ctx.fillStyle = settings.fill;
		}
		if (settings.shadow) {
			const shadow = settings.shadow.split(' ');
			ctx.shadowOffsetX = parseInt(shadow[0], 10);
			ctx.shadowOffsetY = parseInt(shadow[1], 10);
			ctx.shadowBlur = parseInt(shadow[2], 10);
			ctx.shadowColor = shadow[3];
		}
		if (settings.stroke) {
			ctx.strokeStyle = settings.stroke;
		}
		if (settings.cap) {
			ctx.lineCap = settings.cap;
		}
		if (settings.join) {
			ctx.lineJoin = settings.join;
		}
		if (settings.thickness) {
			ctx.lineWidth = settings.thickness;
		}
		if (settings.miterLimit) {
			ctx.miterLimit = settings.miterLimit;
		}
		if (settings.alpha) {
			ctx.globalAlpha = settings.alpha;
		}
		if (settings.composite) {
			ctx.globalCompositeOperation = settings.composite;
		}
		return this;
	};

	Palette.prototype.image = function (settings) {
		const ctx = this.context;
		const image = new Image();
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

	Palette.prototype.text = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		if (settings.font) {
			ctx.font = settings.font;
		}
		if (settings.align) {
			ctx.textAlign = settings.align;
		}
		if (settings.baseline) {
			ctx.textBaseline = settings.baseline;
		}
		if (settings.direction) {
			ctx.direction = settings.direction;
		}
		if (settings.stroke) {
			ctx.strokeText(settings.text, settings.x, settings.y);
		} else {
			ctx.fillText(settings.text, settings.x, settings.y);
		}
		ctx.restore();
		return this;
	};

	Palette.prototype.line = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		ctx.beginPath();
		ctx.moveTo(settings.x1, settings.y1);
		ctx.lineTo(settings.x2, settings.y2);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		return this;
	};

	Palette.prototype.rect = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		const radians = settings.degree !== undefined ? settings.degree * Math.PI / 180 : null;
		if (radians) {
			const c_w = settings.x + (settings.width / 2);
			const c_h = settings.y + (settings.height / 2);
			ctx.translate(c_w, c_h);
			ctx.rotate(radians);
			ctx.translate(-c_w, -c_h);
		}
		ctx.beginPath();
		ctx.rect(settings.x, settings.y, settings.width, settings.height);
		ctx.closePath();
		if (radians) {
			// reset transformation matrix to the identity matrix
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
		if (settings.fill) {
			ctx.fill();
		}
		if (settings.stroke) {
			ctx.stroke();
		}
		ctx.restore();
		return this;
	};

	Palette.prototype.circle = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		ctx.beginPath();
		ctx.arc(settings.x, settings.y, settings.r, 0, 2 * Math.PI);
		ctx.closePath();
		if (settings.fill) {
			ctx.fill();
		}
		if (settings.stroke) {
			ctx.stroke();
		}
		ctx.restore();
		return this;
	};

	Palette.prototype.arc = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		ctx.beginPath();
		ctx.arc(settings.x, settings.y, settings.r, settings.start, settings.stop);
		ctx.closePath();
		if (settings.fill) {
			ctx.fill();
		}
		if (settings.stroke) {
			ctx.stroke();
		}
		ctx.restore();
		return this;
	};

	Palette.prototype.polygon = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		const radians = settings.degree !== undefined ? settings.degree * Math.PI / 180 : 0;
		ctx.translate(settings.x, settings.y);
		ctx.rotate(radians);
		ctx.beginPath();
		ctx.moveTo(settings.size * Math.cos(0), settings.size * Math.sin(0));
		for (let i = 1; i <= settings.sides; ++i) {
			ctx.lineTo(settings.size * Math.cos(i * 2 * Math.PI / settings.sides), settings.size * Math.sin(i * 2 * Math.PI / settings.sides));
		}
		ctx.closePath();
		// reset transformation matrix to the identity matrix
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		if (settings.fill) {
			ctx.fill();
		}
		if (settings.stroke) {
			ctx.stroke();
		}
		ctx.restore();
		return this;
	};

	Palette.prototype.path = function (settings) {
		const ctx = this.context;
		ctx.save();
		this.style(settings);
		ctx.beginPath();
		const steps = settings.path.split(' ');
		steps.forEach(function (step) {
			const command = step.split(',');
			if (command[0] === 'm' || command[0] === 'M') {
				ctx.moveTo(command[1], command[2]);
			} else if (command[0] === 'l' || command[0] === 'L') {
				ctx.lineTo(command[1], command[2]);
			}
		});
		ctx.closePath();
		if (settings.fill) {
			ctx.fill();
		}
		if (settings.stroke) {
			ctx.stroke();
		}
		ctx.restore();
		return this;
	};

	/*
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
	*/

	// export the canvas as a DataURL image, returning a string with the DataURL image. Both arguments are optional.
	// Supported type: 'image/png', 'image/jpeg', 'image/webp'
	// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
	Palette.prototype.toDataURL = function (settings) {
		settings = settings || {};
		const type = settings.type || 'image/png';
		const quality = settings.quality || 1.0;
		return this.canvas.toDataURL(type, quality);
	};

	// export the canvas as a blob image. You must pass a callback function, because this method is a void.
	// Supported type: 'image/png', 'image/jpeg', 'image/webp'
	// quality is applied only if type is jpeg or webp, and must be between 0.0 and 1.0
	Palette.prototype.toBlob = function (settings, callback) {
		settings = settings || {};
		const type = settings.type || 'image/png';
		const quality = settings.quality || 1.0;
		return this.canvas.toBlob(callback, type, quality);
	};

	window.Palette = Palette;
})();

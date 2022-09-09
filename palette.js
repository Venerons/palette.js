// palette.js v3.1.0
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
		this.width = this.canvas.width;
		this.height = this.canvas.height;
	}

	Palette.prototype.size = function (w, h) {
		this.width = w;
		this.height = h;
		const canvas = this.canvas;
		const ctx = this.context;
		const pixel_ratio = window.devicePixelRatio;
		if (pixel_ratio > 1) {
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			canvas.width = w * pixel_ratio;
			canvas.height = h * pixel_ratio;
			//ctx.scale(pixel_ratio, pixel_ratio);
			ctx.setTransform(pixel_ratio, 0, 0, pixel_ratio, 0, 0);
		} else {
			canvas.width = w;
			canvas.height = h;
		}
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
			} else if (command[0] === 'q' || command[0] === 'Q') {
				ctx.quadraticCurveTo(command[1], command[2], command[3], command[4]);
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

	Palette.prototype.conic_gradient = function (settings) {
		const ctx = this.context;
		const gradient = ctx.createConicGradient(settings.degree * Math.PI / 180, settings.x, settings.y);
		settings.stops.split(' ').forEach(function (item) {
			const tokens = item.split(',');
			gradient.addColorStop(parseFloat(tokens[0]), tokens[1]);
		});
		return gradient;
	};

	Palette.prototype.linear_gradient = function (settings) {
		const ctx = this.context;
		const gradient = ctx.createLinearGradient(settings.x1, settings.y1, settings.x2, settings.y2);
		settings.stops.split(' ').forEach(function (item) {
			const tokens = item.split(',');
			gradient.addColorStop(parseFloat(tokens[0]), tokens[1]);
		});
		return gradient;
	};

	Palette.prototype.radial_gradient = function (settings) {
		const ctx = this.context;
		const gradient = ctx.createRadialGradient(settings.x1, settings.y1, settings.r1, settings.x2, settings.y2, settings.r2);
		settings.stops.split(' ').forEach(function (item) {
			const tokens = item.split(',');
			gradient.addColorStop(parseFloat(tokens[0]), tokens[1]);
		});
		return gradient;
	};

	Palette.prototype.toDataURL = function (settings) {
		settings = settings || {};
		const type = settings.type || 'image/png';
		const quality = settings.quality || 1.0;
		return this.canvas.toDataURL(type, quality);
	};

	Palette.prototype.toBlob = function (settings, callback) {
		settings = settings || {};
		const type = settings.type || 'image/png';
		const quality = settings.quality || 1.0;
		return this.canvas.toBlob(callback, type, quality);
	};

	window.Palette = Palette;
})();

/**
 * The ImageDecorator class is used for image processing.
 */
Ext.define("Terrasoft.utils.common.ImageDecorator", {

	alternateClassName: "Terrasoft.ImageDecorator",

	//region Fields: Private

	/**
	 * The object storage methods of the decoration.
	 * @private
	 * @type {Array}
	 */
	decorations: null,

	/**
	 * Link of the image source.
	 * @private
	 * @type {String}
	 */
	source: null,

	//endregion

	//region Fields: Protected

	/**
	 * Attribute for CORS requests for the element's fetched data.
	 * @protected
	 * @type {String}
	 * @default
	 */
	crossOrigin: "use-credentials",

	/**
	 * The identifier (ID) of the type of canvas to create.
	 * @protected
	 * @type {String}
	 */
	contextType: "2d",

	//endregion

	//region Methods: Private

	/**
	 * Initialize image/
	 */
	initImage: function() {
		var image = new Image();
		image.crossOrigin = this.crossOrigin;
		image.onload = this.onLoadImage.bind(this, image);
		image.src = this.source;
	},

	/**
	 * Handler after a image has been loaded.
	 * @param  {Object} image The object an HTML element.
	 */
	onLoadImage: function(image) {
		var canvas = this.getInstanceCanvas(),
			context = this.getContext(canvas);
		context.save();
		if (Ext.isArray(this.decorations)) {
			Terrasoft.each(this.decorations, function(item) {
				item.apply(this, [canvas, context, image]);
			}.bind(this));
		}
		context.restore();
		this.destroyCanvas(canvas);
	},

	/**
	 * Returns a drawing context on the canvas.
	 * @param {Object} canvas A canvas.
	 * @return {Object} A context on the canvas.
	 */
	getContext: function(canvas) {
		return canvas.getContext(this.contextType);
	},

	/**
	 * Returns a created canvas element.
	 * @return {Object} The new canvas.
	 */
	getInstanceCanvas: function() {
		var dom = Ext.getDoc().dom;
		var element = {
			tag: "canvas",
			style: "display: none"
		};
		return Ext.DomHelper.append(dom.body, element);
	},

	/**
	 * Remove canvas from the DOM/
	 * @param  {Object} canvas A canvas.
	 */
	destroyCanvas: function(canvas) {
		canvas.remove();
	},

	/**
	 * Append method decor and parametres of decor.
	 * @param {Function} decorator Method decor.
	 */
	addDecor: function(decorator) {
		if (!Ext.isArray(this.decorations)) {
			this.decorations = [];
		}
		this.decorations.push(decorator);
	},

	/**
	 * Returns a data URIs in callback function.
	 * @param  {Function} callback The callback function.
	 * @param  {Object} [scope] Scope for callback.
	 */
	getBinaryUrl: function(callback, scope) {
		this.addDecor(function(canvas) {
			var binaryUrl = canvas.toDataURL();
			callback.apply(scope || this, [binaryUrl]);
		});
	},

	/**
	 * Checks filling parameters.
	 * @param  {Object} parameters  Configuration object.
	 * @return {Boolean} Returns true if successful validation.
	 */
	checkFillingParameters: function(parameters) {
		Terrasoft.each(parameters, function(item, key) {
			if (Ext.isEmpty(item)) {
				throw new Terrasoft.ArgumentNullOrEmptyException({
					"argumentsName": key
				});
			}
		});
		return true;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Change size of canvas.
	 * @param {Object} parameters The coordinate where to start clipping.
	 * @param {Number} parameters.width Canvas width.
	 * @param {Number} parameters.height Canvas height.
	 */
	resizeImage: function(parameters) {
		var width = parameters.width,
			height = parameters.height;
		this.addDecor(function(canvas) {
			canvas.width = width;
			canvas.height = height;
		});
	},

	/**
	 * Create a arc.
	 * @param {Object} parameters The coordinate where to start clipping.
	 * @param {Number} parameters.x The x-coordinate of the center of the circle.
	 * @param {Number} parameters.y The y-coordinate of the center of the circle.
	 * @param {Number} parameters.radius The radius of the circle.
	 * @param {Number} parameters.start The starting angle, in radians (0 is at the 3 o'clock position
	 * of the arc's circle).
	 * @param {Number} parameters.end The ending angle, in radians.
	 * @param {Boolean} [parameters.route=true] Specifies whether the drawing should be counterclockwise or clockwise.
	 * False is default, and indicates clockwise, while true indicates counter-clockwise.
	 */
	arcImage: function(parameters) {
		var x = parameters.x,
			y = parameters.y,
			radius = parameters.radius,
			start = parameters.start,
			end = parameters.end,
			route = parameters.route || true;
		this.addDecor(function(canvas, context) {
			context.beginPath();
			context.arc(x, y, radius, start * Math.PI, end * Math.PI, route || true);
			context.closePath();
			context.clip();
		});
	},

	/**
	 * Create a cirlce.
	 * @param {Object} parameters The coordinate where to start clipping.
	 * @param {Number} parameters.x The x-coordinate of the center of the circle.
	 * @param {Number} parameters.y The y-coordinate of the center of the circle.
	 * @param {Number} parameters.radius The radius of the circle.
	 * @param {Boolean} [parameters.route=true] Specifies whether the drawing should be counterclockwise or clockwise.
	 * False is default, and indicates clockwise, while true indicates counter-clockwise.
	 */
	roundImage: function(parameters) {
		parameters.start = 0;
		parameters.end = 2;
		this.arcImage(parameters);
	},

	/**
	 * Draw the image onto the canvas.
	 * @param {Object} parameters The coordinate where to start clipping.
	 * @param {Number} parameters.x The x-coordinate of the center of the draw.
	 * @param {Number} parameters.y The y-coordinate of the center of the draw.
	 */
	drawImage: function(parameters) {
		var x = parameters.x,
			y = parameters.y;
		this.addDecor(function(canvas, context, image) {
			context.drawImage(image, x, y, canvas.width, canvas.height);
		});
	},

	//endregion

	//region Methods: Public

	/**
	 * Converts image to circle.
	 * @param {Object} parameters Configuration object.
	 * @param {String} parameters.source Link of the image source.
	 * @param {Number} parameters.radius The radius of the circle.
	 * @param {Number} [parameters.roundX = radius] The x-coordinate of the center of the circle.
	 * @param {Number} [parameters.roundY = radius] The y-coordinate of the center of the circle.
	 * @param {Number} [parameters.resizeWidth = radius * 2] Canvas width.
	 * @param {Number} [parameters.resizeHeight = radius * 2] Canvas height.
	 * @param {Number} [parameters.drawX = 0] The x-coordinate of the center of the draw.
	 * @param {Number} [parameters.drawY = 0] The y-coordinate of the center of the draw.
	 */
	round: function(parameters) {
		this.checkFillingParameters(parameters);
		var radius = parameters.radius,
			diameter = radius * 2,
			roundParam = {
				x: parameters.roundX || radius,
				y: parameters.roundX || radius,
				radius: radius
			},
			resizeParam = {
				width: parameters.resizeWidth || diameter,
				height: parameters.resizeHeight || diameter
			},
			drawParam = {
				x: parameters.drawX || 0,
				y: parameters.drawY || 0
			};
		this.source = parameters.source;
		this.resizeImage(resizeParam);
		this.roundImage(roundParam);
		this.drawImage(drawParam);
	},

	/**
	 * Execute decorations.
	 * @param  {Function} callback The callback function.
	 * @param  {Object} [scope] Scope for callback.
	 */
	execute: function(callback, scope) {
		this.getBinaryUrl(callback, scope);
		this.initImage();
	}

	//endregion

});

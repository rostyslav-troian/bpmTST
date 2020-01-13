Ext.ns("Terrasoft");
Ext.ns("Terrasoft.controls.ImageEditEnums");

/**
 * @enum {string} Terrasoft.controls.ImageEditEnums.ImageStyle
 * Enumeration of image styles.
 */
Terrasoft.controls.ImageEditEnums.ImageStyle = {

	/** Rectangular style of the picture. */
	RECTANGULAR: "rectangular",

	/** Round style of the picture. */
	CIRCLE: "circle"
};

/**
 * Abbreviation for {@link Terrasoft.controls.Image Edit Enums.Image Style} * @member Terrasoft * @inheritdoc
 * Terrasoft.controls.ImageEditEnums.ImageStyle
*/
Terrasoft.ImageStyle = Terrasoft.controls.ImageEditEnums.ImageStyle;

/**
 * The control class for displaying pictures
 */
Ext.define("Terrasoft.controls.ImageEdit", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.ImageEdit",
	mixins: {
		fileUpload: "Terrasoft.FileUpload"
	},

	/**
  * The style of the picture.
  * @type {Terrasoft.ImageStyle}
  */
	imageStyle: Terrasoft.ImageStyle.RECTANGULAR,

	/**
  * Control Width
  * @type {String}
  */
	width: "8em",

	/**
  * The height of the control
  * @type {String}
  */
	height: "8em",

	/**
  * A flag of the image editing mode
  * @type {Boolean}
  */
	readonly: false,

	/**
  * Activity flag for the image download button
  * @type {Boolean}
  */
	uploadButtonEnabled: true,

	/**
  * Activity flag for the image cleanup button
  * @type {Boolean}
  */
	clearButtonEnabled: true,

	/**
  * Pop-up title of the image
  * @type {String}
  */
	imageTitle: "",

	/**
  * Url images by default
  * @type {String}
  */
	defaultImageSrc: "",

	/**
  * Url of the  image
  * @private
  * @type {String}
  */
	imageSrc: "",

	/**
	 * An object with image file metadata returned by the browser after selecting a file (using either a flash or
	 * built-in FileAPI).
	 * @private
	 * @type {Object}
	*/
	value: null,

	/**
  * An object with metadata of the image file received from outside.
  * @private
  * @type {Object}
  */
	file: null,

	/**
  * CSS class for the control.
  * @private
  * @property {String} wrapClasses
  */
	wrapClasses: "ts-image-edit-wrap ts-box-sizing",

	/**
  * CSS class for image container
  * @private
  * @property {String} imageContainerClasses
  */
	imageContainerClasses: "ts-image-edit-container ts-box-sizing ts-image-edit-full-size",

	/**
  * CSS class for the image
  * @private
  * @property {String} imageElClasses
  */
	imageElClasses: "ts-image-edit-full-size-element",

	/**
  * CSS class for the 'open' button
  * @private
  * @property {String} uploadButtonClasses
  */
	uploadButtonClasses: "ts-image-edit-button ts-image-edit-upload",

	/**
  * CSS class for the  'clear' button
  * @private
  * @property {String} clearButtonClasses
  */
	clearButtonClasses: "ts-image-edit-button ts-image-edit-clear",

	/**
  * CSS class for the pressed button
  * @property {String} pressedButtonClass
  * @private
  */
	pressedButtonClass: "ts-image-edit-pressed",

	/**
  * CSS class for inactive button
  * @private
  * @property {String} disabledButtonClass
  */
	disabledButtonClass: "ts-image-edit-disabled",

	/**
  * The prefix of the picture style class.
  * @type {String}
  */
	imageStylePrefix: "ts-image-style-",

	/**
  * Prefix of the picture container style class.
  * @type {String}
  */
	imageContainerStylePrefix: "ts-image-container-style-",

	/**
  * Flag of file download
  * @private
  * @type {Boolean}
  */
	fileUpload: true,

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 * @protected
	 * @override
	 */
	tpl: [
		/*jshint quotmark:true */
		/*jshint white:false */
		/*jscs:disable */
		'<div id="{id}-image-edit" class="{wrapClass}" style="{wrapStyles}">',
		'<div id="{id}-image-edit-container" class="{imageContainerClasses}" style="{imageContainerStyles}">',
		'<div class="ts-image-edit-inner-container"><img id="{id}-image-edit-element" class="{imageElClasses}" ' +
		'src="{imageSrc}" title="{imageTitle}"></div>',
		'</div>',
		'<span id="{id}-image-edit-upload" class="{uploadButtonClasses}" style="{uploadButtonStyles}">' +
		'<span></span></span>',
		'<span id="{id}-image-edit-clear" class="{clearButtonClasses}" style="{clearButtonStyles}">' +
		'<span></span></span>',
		'</div>'
		/*jscs:enable */
		/*jshint quotmark:double */
		/*jshint white:true */
	],

	/**
  * Calculates data for the template and updates the selectors
  * @protected
  * @override
  * @return {Object} tplData Updated dataset for the template
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, this.combineClasses());
		this.styles = this.combineStyles();
		tplData.imageSrc = this.imageSrc;
		tplData.imageTitle = this.imageTitle;
		this.updateSelectors(tplData);
		return tplData;
	},

	/**
  * Updates the selectors based on the data generated to create the markup
  * @protected
  * @param {Object} tplData data object for the template that will be used to build the markup
  * @return {Object} selectors Updated selectors
  */
	updateSelectors: function(tplData) {
		var id = tplData.id;
		var baseIdSuffix = "-image-edit";
		var selectors = this.selectors = {};
		selectors.wrapEl = "#" + id + baseIdSuffix;
		selectors.imageContainerEl = "#" + id + baseIdSuffix + "-container";
		selectors.imageEl = "#" + id + baseIdSuffix + "-element";
		selectors.uploadButtonEl = "#" + id + baseIdSuffix + "-upload";
		selectors.clearButtonEl = "#" + id + baseIdSuffix + "-clear";
		return selectors;
	},

	/**
  * Computes the styles for the control based on the configuration
  * @protected
  * @return {String} A string containing a list of CSS classes
  */
	combineClasses: function() {
		var classes = {};
		classes.wrapClass = this.wrapClasses;
		classes.imageContainerClasses = [this.imageContainerClasses,
			this.getImageStyleClass(this.imageContainerStylePrefix)];
		classes.imageElClasses = [this.imageElClasses, this.getImageStyleClass(this.imageStylePrefix)];
		classes.uploadButtonClasses = [this.uploadButtonClasses];
		classes.clearButtonClasses = [this.clearButtonClasses];
		if (!this.uploadButtonEnabled) {
			classes.uploadButtonClasses.push(this.disabledButtonClass);
		}
		this.clearButtonEnabled = (this.imageSrc !== this.defaultImageSrc);
		if (!this.clearButtonEnabled) {
			classes.clearButtonClasses.push(this.disabledButtonClass);
		}
		return classes;
	},

	/**
  * Initializes the styles for the control template.
  * @protected
  * @return {Object} Object containing styles
  */
	combineStyles: function() {
		var styles = this.styles || {};
		var wrapStyles = styles.wrapStyles = styles.wrapStyles || {};
		wrapStyles.width = this.width;
		wrapStyles.height = this.height;
		var uploadButtonStyles = styles.uploadButtonStyles = {};
		var clearButtonStyles = styles.clearButtonStyles = {};
		var imageContainerStyles = styles.imageContainerStyles = {};
		if (this.readonly) {
			uploadButtonStyles.display = "none";
			clearButtonStyles.display = "none";
			imageContainerStyles.border = "none";
			imageContainerStyles.padding = "0";
			wrapStyles[Terrasoft.getIsRtlMode() ? "marginLeft" : "marginRight"] = "0px";
		}
		return styles;
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
    * @event change
    * Called when the value of the 'value' of the control changes.
    * The event is called when an image is selected
    */
			"change",
			/**
    * @event beforefileselected
    * Called before the file selection dialog is called.
    * The event is called whenever the file selection dialog box is opened.
    * The dialog is not opened, the change event is not called,
    * the further file selection functionality is not executed if the function handler of this event returns false.
    */
			"beforefileselected",
			/**
    * @event
    * Click event on the main element
    */
			"onImageClick"
		);
		this.on("filesSelected", this.onFileSelected, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#constructor
	 * @override
	 */
	constructor: function() {
		this.mixins.fileUpload.constructor.call(this);
		this.fileTypeFilter.push("image/*");
  this.callParent(arguments);
 },

 /**
  * Subscription to control item's events
  * @protected
  * @override
  */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.on("click", this.onClick, this);
		}
		var clearButtonEl = this.clearButtonEl;
		if (clearButtonEl) {
			clearButtonEl.on("mousedown", this.onButtonsMouseDown, this);
			clearButtonEl.on("mouseup", this.onButtonsMouseUp, this);
		}
		var uploadButtonEl = this.uploadButtonEl;
		if (uploadButtonEl) {
			uploadButtonEl.on("mousedown", this.onButtonsMouseDown, this);
			uploadButtonEl.on("mouseup", this.onButtonsMouseUp, this);
		}
		var uploadButtonEnabled = this.uploadButtonEnabled;
		if (uploadButtonEnabled && uploadButtonEl) {
			uploadButtonEl.on("click", this.onUploadButtonClick, this);
		}
		if (this.clearButtonEnabled && clearButtonEl) {
			clearButtonEl.on("click", this.onClearButtonClick, this);
		}
		// BrowserSupport: <IE> IE browsers use the mechanism of working with the file system
		// with flash, so the necessary condition is already created DOM-elements of the control

		this.mixins.fileUpload.destroy.call(this);
		var wrapperEl = (Ext.isIE && uploadButtonEnabled) ? uploadButtonEl : null;
		this.addInputFile(wrapperEl);
	},

	/**
	 * Click event handler on main element.
	 * @param {Object} event Event.
	 */
	onClick: function(event) {
		var canExecute = this.canExecute({
			method: this.onClick,
			args: arguments
		});
		if (canExecute === false) {
			return;
		}
		event.stopEvent();
		this.fireEvent("onImageClick", this);
	},

	/**
  * Mouse click handler
  * @private
  * @param  {Ext.EventObjectImpl} e event object
  */
	onButtonsMouseDown: function(e) {
		var el = Ext.fly(e.currentTarget);
		el.addCls(this.pressedButtonClass);
	},

	/**
  * Mouse click handler
  * @private
  * @param  {Ext.EventObjectImpl} e event object
  */
	onButtonsMouseUp: function(e) {
		var el = Ext.fly(e.currentTarget);
		el.removeCls(this.pressedButtonClass);
	},

	/**
	 * Sets default image URL.
	 * @param {String} src Default image URL.
	 */
	setDefaultImageSrc: function(src) {
		this.defaultImageSrc = src || "";
	},

	/**
  * Changes the main url of the picture
  * @param {String} src The picture's URL address
  * @param {String} title pictures tooltip
  */
	setImageSrc: function(src, title) {
		this.imageSrc = src || this.defaultImageSrc;
		this.imageTitle = Ext.isEmpty(title, true) ? this.imageTitle : title;
		this.clearButtonEnabled = (this.imageSrc !== this.defaultImageSrc);
		this.safeRerender();
	},

	/**
  * Clears the image by setting the default image
  * @private
  */
	clearImage: function() {
		this.value = null;
		this.setImageSrc(this.defaultImageSrc, "");
	},

	/**
  * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
  * @override
  */
	getBindConfig: function() {
		var parentBindConfig = this.callParent(arguments);
		var bindConfig = {
			defaultImageSrc: {
				changeMethod: "setDefaultImageSrc"
			},
			imageSrc: {
				changeMethod: "setImageSrc"
			},
			uploadButtonEnabled: {
				changeMethod: "setUploadButtonEnabled"
			},
			readonly: {
				changeMethod: "setReadonly"
			},
			width: {
				changeMethod: "setWidth"
			},
			height: {
				changeMethod: "setHeight"
			},
			file: {
				changeMethod: "setFile"
			},
			imageStyle: {
				changeMethod: "setImageStyle"
			}
		};
		Ext.apply(bindConfig, parentBindConfig);
		return bindConfig;
	},

	/**
  * Sets a new file to be placed in a container
  * @param {Object} file An object with a file metadata to load
  */
	setFile: function(file) {
		if (!Ext.isEmpty(file)) {
			this.onFileSelected([file]);
		}
	},

	/**
  * Sets picture style.
  * @param {Terrasoft.ImageStyle} imageStyle Picture Style.
  */
	setImageStyle: function(imageStyle) {
		if (this.imageStyle === imageStyle) {
			return;
		}
		var imageStylePrefix = this.imageStylePrefix;
		var imageContainerStylePrefix = this.imageContainerStylePrefix;
		var oldImageStyleClass = this.getImageStyleClass(imageStylePrefix);
		var oldImageContainerStyleClass = this.getImageStyleClass(imageContainerStylePrefix);
		this.imageStyle = imageStyle;
		if (!this.rendered) {
			return;
		}
		var imageEl = this.imageEl;
		var imageContainerEl = this.imageContainerEl;
		if (!imageEl || !imageContainerEl) {
			return;
		}
		imageEl.removeCls(oldImageStyleClass);
		imageEl.addCls(this.getImageStyleClass(imageStylePrefix));
		imageContainerEl.removeCls(oldImageContainerStyleClass);
		imageContainerEl.addCls(this.getImageStyleClass(imageContainerStylePrefix));
	},

	/**
  * Gets the CSS style class based on the current state of the control.
  * @protected
  * @param {String} prefix Prefix for the style.
  * @return {String} CSS style class.
  */
	getImageStyleClass: function(prefix) {
		var style = this.imageStyle;
		return prefix + (style ? style.toLowerCase() : Terrasoft.ImageStyle.RECTANGULAR);
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.Component#destroy
	 */
	onDestroy: function() {
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.un("onImageClick", this.onClick, this);
		}
		this.mixins.fileUpload.destroy.call(this);
		this.callParent(arguments);
	},

	/**
	 * Sets the enabled/disabled image loading buttons
	 * @param {Boolean} uploadButtonEnabled the value of the button activity: true - the button is active,
	 * false - the button is inactive
	*/
	setUploadButtonEnabled: function(uploadButtonEnabled) {
		if (this.uploadButtonEnabled === uploadButtonEnabled) {
			return;
		}
		this.uploadButtonEnabled = uploadButtonEnabled;
		this.safeRerender();
	},

	/**
  * Sets the value of the read-only flag
  * @param {Boolean} readonly The value of the flag is read-only. If true, the control is set to
  * read-only mode, false - the operating mode of the control
  */
	setReadonly: function(readonly) {
		if (this.readonly === readonly) {
			return;
		}
		this.readonly = readonly;
		this.safeRerender();
	},

	/**
  * Sets the width of the control
  * @param {String} width Control Width
  */
	setWidth: function(width) {
		if (this.width === width) {
			return;
		}
		this.width = width;
		this.wrapEl.setStyle("width", width);
	},

	/**
  * Sets the height of the control
  * @param {String} height The height of the control
  */
	setHeight: function(height) {
		if (this.height === height) {
			return;
		}
		this.height = height;
		this.wrapEl.setStyle("height", height);
	},

	/**
  * Calling the 'change' event
  * @param {Object} value selected file
  * @private
  */
	fireChangeValue: function(value) {
		this.fireEvent("change", value, this);
	},

	/**
  * Click event handler for the download button
  * @private
  */
	onUploadButtonClick: function() {
		if (this.fireEvent("beforefileselected", this) !== false) {
			this.fireEvent("click", this);
		}
	},

	/**
  * Click event handler for the clear button
  * @private
  */
	onClearButtonClick: function() {
		this.clearImage();
		this.fireChangeValue(null);
	},

	/**
  * Image file selection event handler
  * @private
  * @param {Object} file - the selected file list generated by FileAPI
  */
	onFileSelected: function(file) {
		this.value = file[0];
		this.fireChangeValue(this.value);
	}

});

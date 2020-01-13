Terrasoft.configuration.Structures["ModalBox"] = {innerHierarchyStack: ["ModalBox"]};
define("ModalBox", ["ext-base", "css!ModalBox"], function(Ext) {
	/**
	 * ############ ###### ###### # #########.
	 * @private
	 * @type {Number}
	 */
	var fullSize = 100;

	/**
	 * ###### ###### ## #########.
	 * @private
	 * @type {Number}
	 */
	var defaultSize = 50;

	/**
	 * id ######.
	 * @private
	 * @type {String}
	 */
	var id = "";

	/**
	 * ###### ## ####### div ######## ######.
	 * @private
	 * @type {Ext.Element}
	 */
	var modalBoxEl = null;

	/**
	 * ###### ## ####### ###########.
	 * @private
	 * @type {Ext.Element}
	 */
	var coverEl = null;

	/**
	 * ###### ## ######### div #######.
	 * @private
	 * @type {Ext.Element}
	 */
	var innerBoxEl = null;

	/**
	 * ###### ## ######### div ####### # ############ ##########.
	 * @private
	 * @type {Ext.Element}
	 */
	var fixedBoxEl = null;

	/**
	 * ###### ########## ########### # ############ ####### ###### # ########.
	 * @private
	 * @type {Number}
	 */
	var boxSize = null;

	/**
	 * ###### ##########
	 * @private
	 * @type {Object}
	 */
	var selectors = null;

	/**
	 * ####### ####### ############ ###### #########.
	 */
	var disableScroll = false;

	var openedModalBoxCssClass = "ts-modalbox-opened";

	/**
	 * ###### ######## css ####### ############ # ######.
	 * @private
	 * @type {Object}
	 */
	var configCssClasses = {
		modalBox: "ts-modalbox",
		cover: "ts-modalbox-cover",
		centerPosition: "ts-modalbox-center-position",
		innerBox: "ts-modalbox-innerbox",
		fixedBox: "ts-modalbox-fixedbox"
	};

	/*jshint white:false */
	/**
	 * ###### ######## ######.
	 * @private
	 * @type {Array}
	 */
	var boxTemplate = [
		"<div id=\"{id}-cover\" class=\"{coverClass}\"></div>",
		"<div id=\"{id}-box\" class=\"{boxClasses}\" style=\"{boxStyles}\">",
		"<div id=\"{id}-fixedBox\" class=\"{fixedBoxClasses}\"></div>",
		"<div id=\"{id}-innerBox\" class=\"{innerBoxClasses}\"",
		"<tpl if=\"innerBoxStyles\"> style=\"{innerBoxStyles}\"</tpl>",
		"></div>",
		"</div>"
	];
	/*jshint white:true */

	/**
	 * ######### ###### Ext.KeyMap ### ######### ####### ###### esc.
	 * @private
	 * @type {Ext.KeyMap}
	 */
	var keyMap = null;

	/**
	 * Callback-####### ########## ### ######## ####.
	 * @private
	 * @type {Function|null}
	 */
	var onClosed = null;

	/**
	 * ############# ######### ######## ######.
	 * @private
	 * @param {Object} cfg ######### ######.
	 * @param {Function} onCloseCallback Callback-####### ####### ##### ####### ### ######## ####.
	 * @param {Object} scope ######## ########## onCloseCallback.
	 */
	function init(cfg, onCloseCallback, scope) {
		id = Ext.id();
		cfg = cfg || {};
		selectors = {
			modalBoxEl: id + "-box",
			coverEl: id + "-cover",
			innerBoxEl: id + "-innerBox",
			fixedBoxEl: id + "-fixedBox"
		};
		if (cfg.widthPixels && cfg.heightPixels) {
			boxSize = {
				minWidth: cfg.widthPixels,
				minHeight: cfg.heightPixels
			};
		} else {
			boxSize = calculatePixelSizes(cfg);
		}
		disableScroll = cfg.disableScroll || false;
		if (onCloseCallback) {
			onClosed = onCloseCallback.bind(scope);
		}
	}

	/**
	 * ######### Ext ######## ## ##########.
	 * @private
	 */
	function applySelectors() {
		modalBoxEl = Ext.get(selectors.modalBoxEl);
		if (!modalBoxEl) {
			throw new Terrasoft.ItemNotFoundException();
		}
		coverEl = Ext.get(selectors.coverEl);
		if (!coverEl) {
			throw new Terrasoft.ItemNotFoundException();
		}
		innerBoxEl = Ext.get(selectors.innerBoxEl);
		if (!innerBoxEl) {
			throw new Terrasoft.ItemNotFoundException();
		}
		fixedBoxEl = Ext.get(selectors.fixedBoxEl);
		if (!fixedBoxEl) {
			throw  new Terrasoft.ItemNotFoundException();
		}
		modalBoxEl.on("click", function(event) {
			event.stopPropagation();
		});
		coverEl.on("wheel", function(event) {
			event.preventDefault();
		});
		coverEl.on("click", function(event) {
			event.stopEvent();
		});
		fixedBoxEl.on("wheel", function(event) {
			event.preventDefault();
		});
		if (Ext.isChrome || Ext.isSafari || Ext.isOpera) {
			coverEl.on("mousewheel", function(event) {
				event.preventDefault();
			});
			fixedBoxEl.on("mousewheel", function(event) {
				event.preventDefault();
			});
		} else if (Ext.isGecko) {
			coverEl.on("DOMMouseScroll", function(event) {
				event.preventDefault();
			});
			fixedBoxEl.on("DOMMouseScroll", function(event) {
				event.preventDefault();
			});
		} else {
			coverEl.on("onmousewheel", function(event) {
				event.preventDefault();
			});
			fixedBoxEl.on("onmousewheel", function(event) {
				event.preventDefault();
			});
		}
	}

	function getFixedBoxClasses() {
		var fixedBoxClasses = [];
		fixedBoxClasses.push(configCssClasses.fixedBox);
		return fixedBoxClasses.join(" ");
	}

	/**
	 * Returns a string with a list of inline styles for a inner box element.
	 * @private
	 * @param {Object} config Modal box configuration.
	 * @return {String}
	 */
	function _getInnerBoxStyles(config) {
		var innerStyle = config.innerBoxStyles;
		return Ext.DomHelper.generateStyles(innerStyle);
	}

	/**
	 * ########## ######## ######.
	 * @private
	 * @param {Object} config ############ ########## ####.
	 * @return {Ext.XTemplate}
	 */
	function prepareModalBoxHtml(config) {
		var template = new Ext.XTemplate(boxTemplate.join(""));
		return template.apply({
			coverClass: getCoverClasses(),
			boxClasses: getBoxClasses(config),
			boxStyles: getBoxStyles(),
			innerBoxClasses: configCssClasses.innerBox,
			id: id,
			fixedBoxClasses: getFixedBoxClasses(),
			innerBoxStyles: _getInnerBoxStyles(config)
		});
	}

	/**
	 * ########## ###### ## ####### css-####### ### ######## ###########.
	 * @private
	 * @return {String}
	 */
	function getCoverClasses() {
		var coverClasses = [];
		coverClasses.push(configCssClasses.cover);
		return coverClasses.join(" ");
	}

	/**
	 * ########## ###### ## ####### css-####### ### ####### div ######## ######.
	 * @private
	 * @param {Object} config ############ ########## ####.
	 * @return {String}
	 */
	function getBoxClasses(config) {
		var boxClasses = [];
		boxClasses.push(configCssClasses.modalBox);
		boxClasses.push(configCssClasses.centerPosition);
		boxClasses = boxClasses.concat(config.boxClasses);
		return boxClasses.join(" ");
	}

	/**
	 * ########## ###### ## ####### inline-###### ### ####### div ######## ######.
	 * @private
	 * @return {String}
	 */
	function getBoxStyles() {
		var styles = {
			minWidth: boxSize.minWidth + "px",
			minHeight: boxSize.minHeight + "px",
			maxHeight: boxSize.maxHeight + "px",
			maxWidth: boxSize.maxWidth + "px",
			width: boxSize.minWidth + "px",
			height: boxSize.minHeight + "px"
		};
		return Ext.DomHelper.generateStyles(styles);
	}

	/**
	 * ############# ############# ####### ####### # ######### # ####### ######.
	 * @private
	 * @param {Object} boxSizePercents ###### ########## ########### # ############ ####### # #########.
	 * @return {Object} ###### ########## ########### # ############ ####### # ########.
	 */
	function calculatePixelSizes(boxSizePercents) {
		var boxSizePixels = {};
		var minHeight = boxSizePercents.minHeight;
		var maxHeight = boxSizePercents.maxHeight;
		var minWidth = boxSizePercents.minWidth;
		var maxWidth = boxSizePercents.maxWidth;
		var viewportHeight = Ext.Element.getViewportHeight() / fullSize;
		var viewportWidth = Ext.Element.getViewportWidth() / fullSize;
		boxSizePixels.minHeight = (minHeight > 0) ? viewportHeight * minHeight : viewportHeight * defaultSize;
		boxSizePixels.minWidth = (minWidth > 0) ? viewportWidth * minWidth : viewportWidth * defaultSize;
		boxSizePixels.maxHeight = (maxHeight > 0) ? viewportHeight * maxHeight : viewportWidth * fullSize;
		boxSizePixels.maxWidth = (maxWidth > 0) ? viewportWidth * maxWidth : viewportWidth * fullSize;
		return boxSizePixels;
	}

	/**
	 * ########## ####### ####### ###### ESC.
	 * @private
	 */
	function onEscKeyPressed() {
		close(true);
	}

	/**
	 * ########## ######, ########## ###### ## ####### #### ##### ########### ########## ################# ########.
	 * @param {Object} [config] ###### ########## ############# ####### # ######## ###
	 * ########### # ############ ####### # ######### ## ####### ######.
	 * @param {Number} [config.minWidth] ########### ###### # #########.
	 * @param {Number} [config.maxHeight] ############ ###### # #########.
	 * @param {Number} [config.maxWidth] ############ ###### # #########.
	 * @param {Number} [config.minHeight] ########### ###### # #########.
	 * @param {Number} [config.widthPixels] ############# ###### # ########.
	 * @param {Number} [config.heightPixels] ############# ###### # ########.
	 * @param {Array} [config.boxClasses] Css-###### ######## ##########.
	 * @param {Function} onCloseCallback Callback-####### ####### ##### ####### ### ######## ####.
	 * @param {Object} scope ######## ########## onCloseCallback.
	 * @return {Ext.Element} ######### ### ###########.
	 */
	function show(config, onCloseCallback, scope) {
		if (modalBoxEl || coverEl) {
			return;
		}
		var body = document.body;
		if (!body) {
			return;
		}
		var bodyEl = Ext.getBody();
		bodyEl.addCls(openedModalBoxCssClass);
		keyMap =  new Ext.util.KeyMap(Ext.getBody(), [{
			key: Ext.EventObject.ESC,
			scope: this,
			fn: onEscKeyPressed
		}]);
		init(config, onCloseCallback, scope);
		var modalBoxHtml = prepareModalBoxHtml(config);
		Ext.DomHelper.insertHtml("beforeEnd", body, modalBoxHtml);
		applySelectors();
		return innerBoxEl;
	}

	/**
	 * ######### ####### ####. #### ####### ####### ######### ####### ############ ###### -
	 * ########## ############ #########.
	 */
	function updateSizeByContent() {
		if (!modalBoxEl) {
			return;
		}
		var modalBoxWidthOffset = modalBoxEl.getPadding("lr") + modalBoxEl.getBorderWidth("lr");
		var modalBoxHeightOffset = modalBoxEl.getPadding("tb") + modalBoxEl.getBorderWidth("tb");
		var width = innerBoxEl.getComputedWidth() + modalBoxWidthOffset;
		// ######## ########### - ##### ######### # ######### ###### #########
		var height = innerBoxEl.getComputedHeight() + modalBoxHeightOffset + 1;
		var maxHeight = boxSize.maxHeight;
		// BrowserSupport: IE8 ##### ######### ###### #.#. ### height > maxHeight #### ########
		// ######### ##### ## ####### ######
		if (Ext.isIE8 && height > maxHeight) {
			height = maxHeight;
		}
		if (disableScroll) {
			modalBoxEl.applyStyles("overflow-y: hidden");
		}
		modalBoxEl.setSize(width, height);
	}

	/**
	 * ############# ####### ########## #### # ########.
	 */
	function setSize(width, height) {
		if (modalBoxEl) {
			modalBoxEl.setSize(width, height);
		}
	}

	/**
	 * ######### ####, ########## DOM ######, ####### ###### ## ########.
	 * @param {Boolean} needDestroyNestedModule #### ######## ########### # ######### #### ######.
	 * ########## ### ######## # callback-####### onClosed.
	 */
	function close(needDestroyNestedModule) {
		if (onClosed) {
			onClosed(needDestroyNestedModule);
		}
		var bodyEl = Ext.getBody();
		if (bodyEl) {
			bodyEl.removeCls(openedModalBoxCssClass);
		}
		keyMap.destroy();
		modalBoxEl.destroy();
		coverEl.destroy();
		innerBoxEl.destroy();
		id = "";
		modalBoxEl = null;
		innerBoxEl = null;
		coverEl = null;
		boxSize = null;
		selectors = null;
		disableScroll = false;
		fixedBoxEl = null;
	}

	/**
	 * ########## ###### ## ######### div ####### # ############ ##########.
	 * @return {Ext.Element} ######### div ####### # ############ ##########.
	 */
	function getFixedBox() {
		return fixedBoxEl;
	}

	/**
	 * ########## ###### ## ######### div #######.
	 * @return {Ext.Element} ######### div #######.
	 */
	function getInnerBox() {
		return innerBoxEl;
	}

	Ext.define("Terrasoft.configuration.ModalBox", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ModalBox",
		getFixedBox: getFixedBox,
		getInnerBox: getInnerBox,
		show: show,
		setSize: setSize,
		updateSizeByContent: updateSizeByContent,
		close: close
	});
	return Ext.create("Terrasoft.ModalBox");
});



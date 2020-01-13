/**
 * Fix for IE11 by sencha
 * https://www.sencha.com/forum/showthread.php?281297-Ext.util.CSS.createStyleSheet-fails-in-IE11.
 */
Ext.util.CSS.createStyleSheet = function(cssText, id) {
	var CSS = this,
		doc = document;
	var ss,
		head = doc.getElementsByTagName("head")[0],
		styleEl = doc.createElement("style");
	styleEl.setAttribute("type", "text/css");
	if (id) {
		styleEl.setAttribute("id", id);
	}
	try {
		styleEl.appendChild(doc.createTextNode(cssText));
	} catch (e) {
		styleEl.cssText = cssText;
	}
	head.appendChild(styleEl);
	ss = styleEl.styleSheet ? styleEl.styleSheet : (styleEl.sheet || doc.styleSheets[doc.styleSheets.length - 1]);
	CSS.cacheStyleSheet(ss);
	return ss;
};

Ext.ns("Terrasoft.utils.dom");

/**
 * @singleton
 */

/**
 * Returns the length of the selected text if the text is not selected - returns zero
 * @param {HTMLElement} el HTML element in which the selected text is present
 * @return {Number} length of the selected text
 */
Terrasoft.utils.dom.getSelectedTextLength = function(el) {
	var selectedText = "";
	if (el.selectionStart != null && el.selectionEnd != null) {
		var start = el.selectionStart;
		var end = el.selectionEnd;
		selectedText = el.value.substring(start, end);
	} else if (document.selection) {
		selectedText = document.selection.createRange().text;
	}
	return selectedText.length;
};

/**
 * Sets attribute value to body attribute.
 * @param {String} attribute Attribute.
 * @param {Mixed} value Attribute value.
 */
Terrasoft.utils.dom.setAttributeToBody = function(attribute, value) {
	var body = Ext.getBody();
	if (!body) {
		return;
	}
	var dataAttribute = {};
	dataAttribute[attribute] = value;
	body.set(dataAttribute);
};

/**
 * Checks whether the dom-element contains an el css class named className.
 * @param {HTMLElement} el dom-element in which the presence of the class is checked.
 * @param {String} className A string containing the names of the css class to search for.
 * @return {Boolean} true if the class with the specified name finds, false - if not found.
 */
Terrasoft.utils.dom.hasClassName = function(el, className) {
	return (el.className.indexOf(className) !== -1);
};

/**
 * Adds css class to the html element.
 * @param {HTMLElement} el Html element.
 * @param {String} className Name of css class.
 */
Terrasoft.utils.dom.addClassName = function(el, className) {
	var classNames = el.className.split(/\s/);
	if (classNames.indexOf(className) === -1) {
		classNames.push(className);
		el.className = classNames.join(" ");
	}
};

/**
 * Removes the css class of html element.
 * @param {HTMLElement} el Html element.
 * @param {String} className Name of css class.
 */
Terrasoft.utils.dom.removeClassName = function(el, className) {
	var classNames = el.className.split(/\s/);
	var index = classNames.indexOf(className);
	if (index !== -1) {
		classNames.splice(index, 1);
		el.className = classNames.join(" ");
	}
};

/**
 * Returns the current position of the carriage, the count is from left to right
 * @param {HTMLElement} el HTML element in which the carriage is located
 * @return {Number} number of characters before the carriage
 */
Terrasoft.utils.dom.getCaretPosition = function(el) {
	var cursorPos = null;
	if (document.selection) {
		var range = document.selection.createRange();
		range.moveStart("textedit", -1);
		cursorPos = range.text.length;
	} else {
		cursorPos = el.selectionStart;
	}
	return cursorPos;
};

/**
 * Sets the carriage to the pos position
 * @param {HTMLElement} ctrl HTML element in which the card is inserted
 * @param {Number} pos The location in which the card is inserted
 */
Terrasoft.utils.dom.setCaretPosition = function(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select();
	}
};

/**
 * Returns only visible items from items array.
 * @param {Array} items Array of DOM nodes.
 * @param {Array} excludeNodes Array of DOM nodes to exclude from result.
 * @return {Array} Array of visible items.
 */
Terrasoft.utils.dom.getVisibleDomItems = function(items, excludeNodes) {
	var visibleItems = [];
	var exclude = excludeNodes || [];
	for (var i = 0, length = items.length; i < length; i++) {
		var item = items[i];
		if (exclude.indexOf(item) !== -1) {
			continue;
		}
		if (item.style.display !== "none") {
			visibleItems.push(item);
		}
	}
	return visibleItems;
};

/**
 * @member Terrasoft
 * @method getVisibleDomItems
 * @inheritdoc Terrasoft.utils.dom#getVisibleDomItems
 */
Terrasoft.getVisibleDomItems = Terrasoft.utils.dom.getVisibleDomItems;

/**
 * Converts from Em to Px.
 * @param {Number | String} value in Em. Can be passed as a number and a string. String value
 * should not contain spaces.
 * @throws {Terrasoft.NotImplementedException} An exception is thrown when the value in
 * wrong format, or not a number.
 * @return {Number}
 **/
Terrasoft.utils.dom.convertEmToPx = function(value) {
	var unitRe = /([+-]?\d*([.,]\d*)?)(px|em|%|en|ex|pt|in|cm|mm|pc)?$/i;
	var valueType = typeof value;
	var emValue = value;
	if (valueType === "string") {
		var unitData = unitRe.exec(value);
		if (!unitData) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var stringValue = unitData[1];
		stringValue = stringValue.replace(",", ".");
		emValue = parseFloat(stringValue);
		if (isNaN(emValue)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
	} else if (valueType !== "number") {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var body = Ext.getBody();
	var fontSizeStyle = body.getStyle("fontSize");
	var fontSizeData = unitRe.exec(fontSizeStyle);
	var fontSize = parseFloat(fontSizeData[1]);
	return fontSize * emValue;
};

/**
 * @member Terrasoft
 * @method convertEmToPx
 * short notation for {@link Terrasoft.utils.dom#convertEmToPx}
 * @inheritdoc Terrasoft.utils.dom#convertEmToPx
 */
Terrasoft.convertEmToPx = Terrasoft.utils.dom.convertEmToPx;

/**
 * Calculates the lineHeight property for the DOM tree element.
 * Some browsers (WebKit), return the "normal" value  if the lineHeight property is not overridden by styles.
 * The method calculates this property using a fake element.
 * @param {Ext.dom.Element} el The element for which you want to calculate.
 * @throws {Terrasoft.ArgumentNullOrEmptyException} An exception is thrown when the argument is not passed.
 * @return {Number} The value of the lineHeight property
 **/
Terrasoft.utils.dom.getLineHeight = function(el) {
	if (!el || !el.dom) {
		throw new Terrasoft.ArgumentNullOrEmptyException();
	}
	var node = el.dom;
	var cloneElement = node.cloneNode();
	cloneElement.innerHTML = "<br>";
	node.appendChild(cloneElement);
	var singleLineHeight = cloneElement.offsetHeight;
	cloneElement.innerHTML = "<br><br>";
	var doubleLineHeight = cloneElement.offsetHeight;
	node.removeChild(cloneElement);
	var lineHeight = doubleLineHeight - singleLineHeight;
	return lineHeight;
};

/**
 * @member Terrasoft
 * @method convertEmToPx
 * short notation for {@link Terrasoft.utils.dom#getLineHeight}
 * @inheritdoc Terrasoft.utils.dom#getLineHeight
 */
Terrasoft.getLineHeight = Terrasoft.utils.dom.getLineHeight;

/**
 * Converts DOM-node to Canvas.
 * @param {String} elementId Node Id.
 * @param {Object} options Options config.
 * Available options http://html2canvas.hertzen.com/documentation.html
 * @param {Function} callback Callback function.
 * @param {Object} scope Scope of callback function.
 * @return {Canvas} Canvas object.
 */
Terrasoft.utils.dom.convertElementToCanvas = function(elementId, options, callback, scope) {
	var element = document.getElementById(elementId);
	if (element) {
		require(["html2canvas"], function(html2canvas) {
			html2canvas(element, options).then(function(canvas) {
				callback.call(scope, canvas);
			});
		});
	} else {
		callback.call(scope);
	}
};

/**
 * @member Terrasoft
 * @method convertElementToCanvas
 * short notation for {@link Terrasoft.utils.dom#convertElementToCanvas}
 * @inheritdoc Terrasoft.utils.dom#convertElementToCanvas
 */
Terrasoft.convertElementToCanvas = Terrasoft.utils.dom.convertElementToCanvas;

/**
 * Returns topScroll value.
 * @return {Number} ScrollTop value.
 */
Terrasoft.utils.dom.getTopScroll = function() {
	var body = Ext.getBody();
	return body.getScrollTop();
};

/**
 * @member Terrasoft.
 * @method getTopScroll.
 * Reduction for {@link Terrasoft.utils.dom#getTopScroll}.
 * @inheritdoc Terrasoft.utils.dom#getTopScroll.
 */
Terrasoft.getTopScroll = Terrasoft.utils.dom.getTopScroll;

/**
 * Sets topScroll value.
 * @param {Number} value ScrollTop value.
 */
Terrasoft.utils.dom.setTopScroll = function(value) {
	if (!Ext.isEmpty(value)) {
		var body = Ext.getBody();
		body.setScrollTop(value);
		if (body.dom.scrollTop === 0) {
			document.documentElement.scrollTop = value;
		}
	}
};

/**
 * @member Terrasoft.
 * @method setTopScroll.
 * Reduction for {@link Terrasoft.utils.dom#setTopScroll}.
 * @inheritdoc Terrasoft.utils.dom#setTopScroll.
 */
Terrasoft.setTopScroll = Terrasoft.utils.dom.setTopScroll;

/**
 * Scrolls to element if it is not visible on the screen.
 * @param {Ext.dom.Element} el DOM Element.
 * @param {Ext.dom.Element} [parentEl] DOM parent of Element.
 * @param {Boolean} [scrollParent] use parent element for positioning.
 */
Terrasoft.utils.dom.scrollToEl = function(el, parentEl, scrollParent) {
	if (!Ext.isEmpty(el)) {
		parentEl = parentEl || el.parent();
		var parent = scrollParent ? parentEl : Ext.getBody();
		var parentViewRegion = parentEl.getViewRegion();
		var visibleTop = parentViewRegion.top;
		var visibleBottom = parentViewRegion.bottom;
		if (el.getTop() < visibleTop || el.getBottom() > visibleBottom) {
			var yOfffset = el.getOffsetsTo(parentEl);
			parent.setScrollTop(yOfffset[1]);
		}
	}
};

/**
 * @member Terrasoft.
 * @method scrollToEl.
 * Reduction for {@link Terrasoft.utils.dom#scrollToEl}.
 * @inheritdoc Terrasoft.utils.dom#scrollToEl.
 */
Terrasoft.scrollToEl = Terrasoft.utils.dom.scrollToEl;

/**
 * Removes a style or link tag by id.
 * @param {String} id Style id.
 */
Terrasoft.utils.dom.removeStyleSheet = function(id) {
	Ext.util.CSS.removeStyleSheet(id);
};

/**
 * @member Terrasoft.
 * @method removeStyleSheet.
 * Reduction for {@link Terrasoft.utils.dom#removeStyleSheet}.
 * @inheritdoc Terrasoft.utils.dom#removeStyleSheet.
 */
Terrasoft.removeStyleSheet = Terrasoft.utils.dom.removeStyleSheet;

/**
 * Updates CSS rule.
 * @param {String} cssSelector CSS selector.
 * @param {String} cssProperty Name of CSS property.
 * @param {String} cssValue Value of CSS property.
 */
Terrasoft.utils.dom.updateStyleSheet = function() {
	Ext.util.CSS.updateRule.apply(Ext.util.CSS, arguments);
};

/**
 * @member Terrasoft.
 * @method updateStyleSheet.
 * Reduction for {@link Terrasoft.utils.dom#updateStyleSheet}.
 * @inheritdoc Terrasoft.utils.dom#updateStyleSheet.
 */
Terrasoft.updateStyleSheet = Terrasoft.utils.dom.updateStyleSheet;

/**
 * Refreshes CSS cache.
 */
Terrasoft.utils.dom.refreshStyleSheetCache = function() {
	Ext.util.CSS.refreshCache();
};

/**
 * @member Terrasoft.
 * @method refreshStyleSheetCache.
 * Reduction for {@link Terrasoft.utils.dom#refreshStyleSheetCache}.
 * @inheritdoc Terrasoft.utils.dom#refreshStyleSheetCache.
 */
Terrasoft.refreshStyleSheetCache = Terrasoft.utils.dom.refreshStyleSheetCache;

/**
 * Dynamically creates stylesheets from a text blob of rules.
 * The text will wrapped in a style tag and appended to the HEAD of the document.
 * @param {String} cssText The text containing the css rules.
 * @param {String} id An id to add to the stylesheet for later removal.
 */
Terrasoft.utils.dom.createStyleSheet = function(cssText, id) {
	Ext.util.CSS.createStyleSheet(cssText, id);
};

/**
 * @member Terrasoft.
 * @method createStyleSheet.
 * Reduction for {@link Terrasoft.utils.dom#createStyleSheet}.
 * @inheritdoc Terrasoft.utils.dom#createStyleSheet.
 */
Terrasoft.createStyleSheet = Terrasoft.utils.dom.createStyleSheet;

/**
 * Creates new or replaces existing stylesheet.
 * @param {String} cssSelector Css selector.
 * @param {String} cssProperty Name of CSS property.
 * @param {String} cssValue Value of CSS property.
 * @param {String} id Id for later removal.
 */
Terrasoft.utils.dom.appendStyleSheet = function(cssSelector, cssProperty, cssValue, id) {
	var rule = Ext.util.CSS.getRule(cssSelector, true);
	if (rule) {
		Terrasoft.updateStyleSheet(cssSelector, cssProperty, cssValue);
	} else {
		var cssText = Ext.String.format("{0} {{1}: {2};}", cssSelector, cssProperty, cssValue);
		Terrasoft.createStyleSheet(cssText, id);
	}
};

/**
 * @member Terrasoft.
 * @method appendStyleSheet.
 * Reduction for {@link Terrasoft.utils.dom#appendStyleSheet}.
 * @inheritdoc Terrasoft.utils.dom#appendStyleSheet.
 */
Terrasoft.appendStyleSheet = Terrasoft.utils.dom.appendStyleSheet;

/**
 * Removes stylsheet if exists and recreates it.
 * @param {String} cssSelector Css selector.
 * @param {String} cssProperty Name of CSS property.
 * @param {String} cssValue Value of CSS property.
 * @param {String} id Id for later removal.
 */
Terrasoft.utils.dom.reCreateStyleSheet = function(cssSelector, cssProperty, cssValue, id) {
	Terrasoft.removeStyleSheet(id);
	var cssText = Ext.String.format("{0} {{1}: {2};}", cssSelector, cssProperty, cssValue);
	Terrasoft.createStyleSheet(cssText, id);
};

/**
 * @member Terrasoft.
 * @method reCreateStyleSheet.
 * Reduction for {@link Terrasoft.utils.dom#reCreateStyleSheet}.
 * @inheritdoc Terrasoft.utils.dom#reCreateStyleSheet.
 */
Terrasoft.reCreateStyleSheet = Terrasoft.utils.dom.reCreateStyleSheet;

/**
 * Lightens color if percent value is positive or darkens if percent value is negative.
 * @param {String} color Color in #RRGGBB representation.
 * @param {Number} percent Shading percent from -1 to 1.
 * @return {String} New colot in #RRGGBB representation.
 */
Terrasoft.utils.dom.shadeColor = function(color, percent) {
	var floor = percent < 0 ? 0 : 255;
	percent = percent < 0 ? percent * -1 : percent;
	var hexRed = color.slice(1, 3);
	var hexGreen = color.slice(3, 5);
	var hexBlue = color.slice(5);
	var red = parseInt(hexRed, 16);
	var green = parseInt(hexGreen, 16);
	var blue = parseInt(hexBlue, 16);
	red = Math.round((floor - red) * percent) + red;
	green = Math.round((floor - green) * percent) + green;
	blue = Math.round((floor - blue) * percent) + blue;
	hexRed = red.toString(16);
	hexGreen = green.toString(16);
	hexBlue = blue.toString(16);
	var hexRedPadded = Terrasoft.pad(hexRed, 2, "0");
	var hexGreenPadded = Terrasoft.pad(hexGreen, 2, "0");
	var hexBluePadded = Terrasoft.pad(hexBlue, 2, "0");
	return Ext.String.format("#{0}{1}{2}", hexRedPadded, hexGreenPadded, hexBluePadded);
};

/**
 * @member Terrasoft.
 * @method shadeColor.
 * Reduction for {@link Terrasoft.utils.dom#shadeColor}.
 * @inheritdoc Terrasoft.utils.dom#shadeColor.
 */
Terrasoft.shadeColor = Terrasoft.utils.dom.shadeColor;

/**
 * Downloads data.
 * @param {String} href Data href.
 * @param {String} fileName File name.
 */
Terrasoft.utils.dom.download = function(href, fileName) {
	var hrefEl = document.createElement("a");
	hrefEl.href = href;
	hrefEl.download = fileName;
	document.body.appendChild(hrefEl);
	hrefEl.click();
	document.body.removeChild(hrefEl);
};

/**
 * @member Terrasoft.
 * @method download.
 * Reduction for {@link Terrasoft.utils.dom#download}.
 * @inheritdoc Terrasoft.utils.dom#download.
 */
Terrasoft.download = Terrasoft.utils.dom.download;

/**
 * Convert base64/URLEncoded data component to raw binary data held in a string.
 * @param {String} dataURI Uri of the image.
 * @return {Image} Image.
 */
Terrasoft.utils.dom.getImageFile = function(dataURI, name) {
	var getMimeType = function(uriParts) {
		var firstPart = uriParts[0];
		var data = firstPart.split(":")[1];
		var mimeString = data.split(";")[0];
		return mimeString;
	};
	var getByteArray = function(uriParts) {
		var byteString;
		if (uriParts[0].indexOf("base64") >= 0) {
			byteString = atob(uriParts[1]);
		} else {
			byteString = decodeURIComponent(uriParts[1]);
		}
		var byteArray = new Uint8Array(byteString.length);
		for (var i = byteString.length - 1; i >= 0; i--) {
			byteArray[i] = byteString.charCodeAt(i);
		}
		return byteArray;
	};
	var uriParts = dataURI.split(",");
	var mimeString = getMimeType(uriParts);
	var byteArray = getByteArray(uriParts);
	var newDate = new Date();
	var guid = Terrasoft.generateGUID();
	var blob = new Blob([byteArray], {type: mimeString});
	Ext.apply(blob, {
		lastModified: newDate.valueOf(),
		lastModifiedDate: newDate.toString(),
		name: name || guid.toString(),
		webkitRelativePath: ""
	});
	return blob;
};

/**
 * @member Terrasoft.
 * @method getImageFile.
 * Reduction for {@link Terrasoft.utils.dom#getImageFile}.
 * @inheritdoc Terrasoft.utils.dom#getImageFile
 */
Terrasoft.getImageFile = Terrasoft.utils.dom.getImageFile;

/**
 * Retrieves the viewport size of the document.
 */
Terrasoft.utils.dom.getViewSize = function() {
	return Ext.getBody().getViewSize();
};

/**
 * @member Terrasoft.
 * @method getViewSize.
 * Reduction for {@link Terrasoft.utils.dom#getViewSize}.
 * @inheritdoc Terrasoft.utils.dom#getViewSize.
 */
Terrasoft.getViewSize = Terrasoft.utils.dom.getViewSize;

/**
 * Returns flag that indicates if dom element is body element.
 * @param {Object} element Dom element.
 * @return {Boolean}
 */
Terrasoft.utils.dom.getIsBodyElement = function(element) {
	var nodeName = element.nodeName.toLowerCase();
	return nodeName === "body";
};

/**
 * @member Terrasoft.
 * @method getIsBodyElement.
 * Reduction for {@link Terrasoft.utils.dom#getIsBodyElement}.
 * @inheritdoc Terrasoft.utils.dom#getIsBodyElement.
 */
Terrasoft.getIsBodyElement = Terrasoft.utils.dom.getIsBodyElement;

/**
 * Scrolls the current element into the visible area of the browser window.
 * @param {Object} element Dom element.
 * @param {Object} options Scroll options.
 * @return {Boolean}
 */
Terrasoft.utils.dom.scrollIntoView = function(element, options) {
	if (element.scrollIntoViewIfNeeded) {
		element.scrollIntoViewIfNeeded(options);
	} else {
		element.scrollIntoView(options);
	}
};

/**
 * @member Terrasoft.
 * @method scrollIntoView.
 * Reduction for {@link Terrasoft.utils.dom#scrollIntoView}.
 * @inheritdoc Terrasoft.utils.dom#scrollIntoView.
 */
Terrasoft.scrollIntoView = Terrasoft.utils.dom.scrollIntoView;

/**
 * Applies to dom element full screen css class.
 * @param {String} cssSelector Dom element css selector.
 * @returns {Boolean} Is full screen mode enabled tag.
 */
Terrasoft.utils.dom.toggleFullScreenMode = function(cssSelector) {
	var fullScreenOverlayCssClass = "full-screen-overlay-el";
	var fullScreenOverlayId = "full-screen-overlay-el";
	var fullScreenCssClass = "full-screen-el";
	var domElements = Ext.select(cssSelector);
	var domEl = domElements.first();
	if (!domEl) {
		console.warn("toggleFullScreenMode failed. Not found element by selector " + cssSelector);
		return false;
	}
	var fullScreenOverlayEl = Ext.get(fullScreenOverlayId);
	if (!fullScreenOverlayEl) {
		var overlayDiv = Ext.DomHelper.insertBefore(domEl, {
			id: fullScreenOverlayId,
			tag: "div"
		});
		fullScreenOverlayEl = Ext.get(overlayDiv);
	}
	fullScreenOverlayEl.toggleCls(fullScreenOverlayCssClass);
	domEl.toggleCls(fullScreenCssClass);
	var hasFullScreen = domEl.hasCls(fullScreenCssClass);
	if (Terrasoft.toggleFullScreenMode.fsKeyMap) {
		Terrasoft.toggleFullScreenMode.fsKeyMap.destroy();
		Terrasoft.toggleFullScreenMode.fsKeyMap = null;
	}
	if (hasFullScreen) {
		Terrasoft.toggleFullScreenMode.fsKeyMap = new Ext.util.KeyMap(Ext.getBody(), [{
			key: Ext.EventObject.ESC,
			fn: function() {
				Terrasoft.toggleFullScreenMode(cssSelector);
			}
		}]);
	}
	Terrasoft.utils.dom.setAttributeToBody("full-screen-enabled", hasFullScreen);
	return hasFullScreen;
};

/**
 * @member Terrasoft.
 * @method toggleFullScreenMode.
 * Reduction for {@link Terrasoft.utils.dom#toggleFullScreenMode}.
 * @inheritdoc Terrasoft.utils.dom#toggleFullScreenMode.
 */
Terrasoft.toggleFullScreenMode = Terrasoft.utils.dom.toggleFullScreenMode;

/**
 * Calculate scroll position of the element.
 * @param {Ext.Element} el Element in which you need to calculate the position of the scroll.
 * @throws {Terrasoft.UnsupportedTypeException} An exception is thrown when the el is not valid object type.
 * @returns {{top: Number, left: Number}} Left and top scroll position.
 */
Terrasoft.utils.dom.getScrollPosition = function(el) {
	if (!el || !el.getScroll || !el.dom) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	const scroll = el.getScroll();
	let left = Math.abs(scroll.left);
	const scrollType = Terrasoft.getScrollTypeInRtl();
	if (Terrasoft.getIsRtlMode() && scrollType !== Terrasoft.ScrollTypeInRtl.DEFAULT) {
		const width = el.dom.scrollWidth - el.dom.clientWidth;
		left = width - left;
	}
	return {
		left: left,
		top: scroll.top
	};
};

/**
 * @member Terrasoft.
 * @method getScrollPosition.
 * Reduction for {@link Terrasoft.utils.dom#getScrollPosition}.
 * @inheritdoc Terrasoft.utils.dom#getScrollPosition.
 */
Terrasoft.getScrollPosition = Terrasoft.utils.dom.getScrollPosition;

/**
 * Detects scroll type in RTL. By example, mozilla firefox, returns the negative value by el.getScrollLeft()
 * in rtl mode.
 * @returns {Terrasoft.ScrollTypeInRtl} Scroll type in rtl mode.
 */
Terrasoft.utils.dom.getScrollTypeInRtl = function() {
	let reverseScrollType = Terrasoft.utils.dom.getScrollTypeInRtl;
	if (Ext.isDefined(reverseScrollType.cache)) {
		return reverseScrollType.cache;
	}
	const tempEl = Ext.DomHelper.createTemplate({
		tag: "div",
		dir: "rtl",
		style: {
			fontSize: "14px",
			width: "4px",
			height: "1px",
			position: "absolute",
			top: "-10000px",
			overflow: "scroll"
		}
	}).append(document.body);
	tempEl.appendChild(document.createTextNode("ABCD"));
	reverseScrollType = Terrasoft.ScrollTypeInRtl.REVERSE;
	if (tempEl.scrollLeft > 0) {
		reverseScrollType = Terrasoft.ScrollTypeInRtl.DEFAULT;
	} else {
		tempEl.scrollLeft = 1;
		if (tempEl.scrollLeft === 0) {
			reverseScrollType = Terrasoft.ScrollTypeInRtl.NEGATIVE;
		}
	}
	document.body.removeChild(tempEl);
	Terrasoft.utils.dom.getScrollTypeInRtl.cache = reverseScrollType;
	return reverseScrollType;
};

/**
 * @member Terrasoft.
 * @method getScrollTypeInRtl.
 * Reduction for {@link Terrasoft.utils.dom#getScrollTypeInRtl}.
 * @inheritdoc Terrasoft.utils.dom#getScrollTypeInRtl.
 */
Terrasoft.getScrollTypeInRtl = Terrasoft.utils.dom.getScrollTypeInRtl;

/**
 * @obsolete
 */
Terrasoft.focustFirstInput = function(selector) {
	var obsoleteMessage = Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
		"Terrasoft.focustFirstInput", "focusFirstInput");
	console.warn(obsoleteMessage);
	Terrasoft.focusFirstInput(selector);
};

/**
 * @obsolete
 */
Terrasoft.utils.dom.focustFirstInput = Terrasoft.focustFirstInput;

/**
 * Focus first found input by selector if exists.
 * @param {String} selector CSS selector.
 */
Terrasoft.focusFirstInput = function(selector) {
	var inputs = Ext.query(selector);
	var firstVisible = _.find(inputs, function(input) {
		return Ext.get(input.id).isVisible();
	}, this);
	while (firstVisible && firstVisible.childElementCount) {
		firstVisible = firstVisible.children[0];
	}
	if (firstVisible) {
		firstVisible.focus();
	}
};

/**
 * @member Terrasoft
 * @method focusFirstInput
 * @inheritdoc Terrasoft#focusFirstInput
 */
Terrasoft.utils.dom.focusFirstInput = Terrasoft.focusFirstInput;

/**
 * Returns width of element styles.
 * @param {Object} stylesJSON Styles json.
 * @return {Number} Width in pixels.
 */
Terrasoft.calculateStylesWidth = function(stylesJSON) {
	let result = 0;
	if (stylesJSON) {
		const stylesJSONClone = Terrasoft.deepClone(stylesJSON);
		Ext.apply(stylesJSONClone, {width: "0px"});
		const styles = Ext.DomHelper.generateStyles(stylesJSONClone);
		const element = Ext.DomHelper.insertHtml("beforeEnd", document.body, `<div style="${styles}"></div>`);
		result = element.offsetWidth;
		document.body.removeChild(element);
	}
	return result;
};
Terrasoft.utils.dom.calculateStylesWidth = Terrasoft.calculateStylesWidth;

/**
 * Returns height of element styles.
 * @param {Object} stylesJSON Styles json.
 * @return {Number} Height in pixels.
 */
Terrasoft.calculateStylesHeight = function(stylesJSON) {
	let result = 0;
	if (stylesJSON) {
		const stylesJSONClone = Terrasoft.deepClone(stylesJSON);
		Ext.apply(stylesJSONClone, {height: "0px"});
		const styles = Ext.DomHelper.generateStyles(stylesJSONClone);
		const element = Ext.DomHelper.insertHtml("beforeEnd", document.body, `<div style="${styles}"></div>`);
		result = element.offsetHeight;
		document.body.removeChild(element);
	}
	return result;
};
Terrasoft.utils.dom.calculateStylesHeight = Terrasoft.calculateStylesHeight;

/**
 * Returns borders config.
 * @param {Object} stylesJSON Styles json.
 * @return {Object} Borders config.
 */
Terrasoft.calculateBorderStyles = function(stylesJSON) {
	const result = {};
	if (stylesJSON) {
		const stylesJSONClone = Terrasoft.deepClone(stylesJSON);
		Ext.apply(stylesJSONClone, {width: "0px"});
		const styles = Ext.DomHelper.generateStyles(stylesJSONClone);
		const element = Ext.DomHelper.insertHtml("beforeEnd", document.body, `<div style="${styles}"></div>`);
		const positions = ["Top", "Bottom", "Left", "Right"];
		positions.map(position => {
			result[position.toLowerCase()] = {
				color: element.style[`border${position}Color`],
				width: element.style[`border${position}Width`],
				style: element.style[`border${position}Style`]
			};
		});
		document.body.removeChild(element);
	}
	return result;
};
Terrasoft.utils.dom.calculateBorderStyles = Terrasoft.calculateBorderStyles;

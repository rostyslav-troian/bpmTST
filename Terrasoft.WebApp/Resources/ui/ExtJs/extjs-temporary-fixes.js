/* jshint ignore:start */
/**
 * BrowserSupport: <IE11> Added Ext extension for which IE11, IE and Gecko are defined.
 * This is done because the current version does not support the correct definition of IE11 and Gecko.
 * After the upgrade to the new version of ExtJS, this file must be deleted.
 */
(function() {
	var check = function(regex) {
			return regex.test(Ext.userAgent);
		},
		docMode = document.documentMode,
		isOpera = check(/opera/),
		isWebKit = check(/webkit/),
		isIE = !isOpera && (check(/msie/) || check(/trident/)),
		isIE11 = isIE && ((check(/trident\/7\.0/) && docMode != 7 && docMode != 8 && docMode != 9 && docMode != 10) ||
			docMode == 11),
		isGecko = !isWebKit && !isIE && check(/gecko/), // IE11 adds "like gecko" into the user agent string
		isEdge = check(/edge/);

	/**
	 * True if the detected browser is Microsoft Edge.
	 * @type Boolean
	 */
	Ext.isEdge = isEdge;

	/**
	 * True if the detected browser is Internet Explorer.
	 * @type Boolean
	 */
	Ext.isIE = isIE;

	/**
	 * True if the detected browser is Internet Explorer 11.x.
	 * @type Boolean
	 */
	Ext.isIE11 = isIE11;

	/**
	 * True if the detected browser uses the Gecko layout engine (e.g. Mozilla, Firefox).
	 * @type Boolean
	 */
	Ext.isGecko = isGecko;

	/**
	 * True if the detected browser is Internet Explorer or Microsoft Edge.
	 * @type Boolean
	 */
	Ext.isIEOrEdge = isIE || isEdge;
})();
/* jshint ignore:end */

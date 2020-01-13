Ext.ns("Terrasoft.utils.html");

	//region properties: private 

	let _xss = null;

	let _defaultXssWhiteList = null;

	let _allowedCommentsRegex = [
		/<!--[\s\S]*?-->/g,
		/<!--\[if.*?\]>/g,
		/<!\[endif\]-->/g
	];

	//endregion

	//region methods: private

	let _isBpmonlineFileServiceUrl = function(url) {
		/* jshint ignore:start */
		let regex = /^..\/rest\/(Portal)?FileService\/Get(Activity)?File\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/gi;
		/* jshint ignore:end */
		return regex.test(url);
	};

	let _getDefautlXssConfig = function() {
		let defaultWhiteList = _defaultXssWhiteList;
		if (Ext.isEmpty(defaultWhiteList)) {
			defaultWhiteList = _createDefaultWhiteList();
		}
		return {
			"whiteList": defaultWhiteList,
			"escapeHtml": function(html) {
				return html;
			},
			"onIgnoreTag": _onIgnoreTag,
			"onTagAttr": _onTagAttr,
			"allowCommentTag": true,
			"css": false
		};
	};

	let _createDefaultWhiteList = function() {
		let defaultWhiteList = _defaultXssWhiteList = _xss.getDefaultWhiteList();
		defaultWhiteList.svg = ["src", "style"];
		defaultWhiteList.base = [];
		defaultWhiteList.table.push("cellspacing");
		defaultWhiteList.table.push("cellpadding");
		defaultWhiteList.table.push("bgcolor");
		defaultWhiteList.td.push("border");
		defaultWhiteList.td.push("height");
		defaultWhiteList.td.push("bgcolor");
		defaultWhiteList.img.push("align");
		defaultWhiteList.img.push("alt");
		defaultWhiteList.a.push("vngrop");
		defaultWhiteList.link = ["href"];
		defaultWhiteList.style = ["type"];
		defaultWhiteList.signature = [];
		return defaultWhiteList;
	};

	let _onIgnoreTag = function(tag, html, info) {
		if (!info.isWhite && !_checkIsAllowedComment(html)) {
			return "";
		}
	};

	let _checkIsAllowedComment = function(html) {
		let result = false;
		Terrasoft.each(_allowedCommentsRegex, function(regex) {
			if (regex.test(html)) {
				result = true;
				return false;
			}
		});
		return result;
	};

	let _onTagAttr = function(tag, rawName, value, isWhiteAttr) {
		let name = rawName.toLowerCase();
		if (name === "class" || name === "style" || _isBpmonlineFileServiceUrl(value)) {
			return name + '="' + _xss.friendlyAttrValue(value) + '"';
		}
	};

	let _initXss = function() {
		if (Ext.isEmpty(_xss)) {
			_xss = filterXSS;
		}
	};

	//endregion

	//region methods: public

	/**
	 * Decodes special characters of HTML-markup.
	 * @param {String} value String to decode.
	 * @return {String} Decoded value.
	 */
	Terrasoft.utils.html.decodeHtml = function(value) {
		return Ext.util.Format.htmlDecode(value);
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#decodeHtml}
	 * @member Terrasoft
	 * @method decodeHtml
	 * @inheritdoc Terrasoft.utils.html#decodeHtml
	 */
	Terrasoft.decodeHtml = Terrasoft.utils.html.decodeHtml;

	/**
	 * Encodes special characters of HTML-markup.
	 * @param {String} value String to encode.
	 * @return {String} Encoded value.
	 */
	Terrasoft.utils.html.encodeHtml = function(value) {
		return Ext.util.Format.htmlEncode(value);
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#encodeHtml}
	 * @member Terrasoft
	 * @method encodeHtml
	 * @inheritdoc Terrasoft.utils.html#encodeHtml
	 */
	Terrasoft.encodeHtml = Terrasoft.utils.html.encodeHtml;

	/**
	 * Replaces mnemonic symbols of HTML-markup.
	 * @param {String} value String to replace.
	 * @return {String} Encoded value.
	 */
	Terrasoft.utils.html.decodeHtmlEntities = function(value) {
		if (!Ext.isString(value) || value === "") {
			return value;
		}
		var element = document.createElement("textarea");
		element.innerHTML = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		var result = element.value;
		element = null;
		return result;
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#decodeHtmlEntities}
	 * @member Terrasoft
	 * @method decodeHtmlEntities
	 * @inheritdoc Terrasoft.utils.html#decodeHtmlEntities
	 */
	Terrasoft.decodeHtmlEntities = Terrasoft.utils.html.decodeHtmlEntities;

	/**
	 * Strips all HTML tags from text.
	 * @param {Object} value The text with tags.
	 * @return {String} The text without tags.
	 */
	Terrasoft.utils.html.stripTags = function(value) {
		return Ext.util.Format.stripTags(value);
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#stripTags}
	 * @member Terrasoft
	 * @method stripTags
	 * @inheritdoc Terrasoft.utils.html#stripTags
	 */
	Terrasoft.stripTags = Terrasoft.utils.html.stripTags;

	/**
	 * Replaces html spec symbols for normal symbols.
	 * @param {String} value The text with html spec symbols.
	 * @return {String} The text with replaced symbols.
	 */
	Terrasoft.utils.html.unescape = function(value) {
		return _.unescape(value);
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#unescape}
	 * @member Terrasoft
	 * @method unescape
	 * @inheritdoc Terrasoft.utils.html#unescape
	 */
	Terrasoft.unescape = Terrasoft.utils.html.unescape;

	/**
	 * Removes html tags from string.
	 * @param {String} value Source string.
	 * @return {String} String without html tags.
	 */
	Terrasoft.utils.html.removeHtmlTags = function(value) {
		if (Ext.isString(value)) {
			value = Terrasoft.decodeHtml(value);
			value = value.replace(/<head>[\s\S]*<\/head>/, "");
			value = value.replace(/<style>[\s\S]*<\/style>/, "");
			value = value.replace(/<script>[\s\S]*<\/script>/, "");
			value = value.replace(/<noscript>[\s\S]*<\/noscript>/, "");
			value = value.replace(/<svg[\s\S]*<\/svg>/, "");
			value = value.replace(/<form[\s\S]*<\/form>/, "");
			/* jshint ignore:start */
			var regExp = /(<([\s/]*(a|o:p|xml|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound|blockquote|big|body|blink|br|button|canvas|caption|center|cite|code|col|colgroup|command|comment|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|form|footer|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|isindex|kbd|keygen|label|legend|li|link|main|map|marquee|mark|menu|meta|meter|nav|nobr|noembed|noframes|noscript|object|ol|optgroup|option|output|p|param|plaintext|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|signature|small|span|source|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp)(\b|\/)[^@>]*)>)/ig;
			value = value.replace(regExp, "");
			value = value.replace(/&nbsp;/g, " ");
			value = value.replace(/<![\s\S]*?>/g, "");
			value = value.replace(/<!DOCTYPE[\s\S]*?>/g, "");
			/* jshint ignore:end */
		}
		return value;
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#removeHtmlTags}
	 * @member Terrasoft
	 * @method removeHtmlTags
	 * @inheritdoc Terrasoft.utils.html#removeHtmlTags
	 */
	Terrasoft.removeHtmlTags = Terrasoft.utils.html.removeHtmlTags;

	/**
	 * Generate new html with  safe content only, using for protect against XSS
	 * @param {String} html Html to sanitize.
	 * @method sanitizeHTML
	 * @return {String} XSS-safe html.
	 */
	Terrasoft.utils.html.sanitizeHTML = function(html, config) {
		if (!html) {
			return "";
		}
		if (!Terrasoft.enableSanitizeHtml) {
			return html;
		}
		_initXss();
		const defautlConfig = _getDefautlXssConfig();
		config = Ext.apply(defautlConfig, config);
		return _xss.filterXSS(html, config);
	};

	/**
	 * Alias for {@link Terrasoft.utils.html#sanitizeHTML}
	 * @member Terrasoft
	 * @method sanitizeHTML
	 * @inheritdoc Terrasoft.utils.html#sanitizeHTML
	 */
	Terrasoft.sanitizeHTML = Terrasoft.utils.html.sanitizeHTML;

	//endregion

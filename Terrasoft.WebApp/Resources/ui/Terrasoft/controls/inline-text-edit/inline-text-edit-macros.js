/**
 */
Ext.define("Terrasoft.controls.InlineTextEditMacros", {
	alternateClassName: "Terrasoft.InlineTextEditMacros",

	/**
	 * Parameter value.
	 * @type {String}
	 */
	value: null,

	/**
	 * Parameter display value.
	 * @type {String}
	 */
	displayValue: null,

	/**
	 * Parameter html representation.
	 * @type {String}
	 */
	html: null,

	/**
	 * Value from html regex.
	 * @private
	 * @type {RegExp}
	 */
	valueRegex: /(?:data-value=")(\S*?)"/g,

	/**
	 * Display value from html regex.
	 * @private
	 * @type {RegExp}
	 */
	displayValueRegex: /(?:alt=")(.*?)"/g,

	/**
	 * Initializes properties from html if given.
	 * @private
	 * @param {Object} config Config object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var html = config.html;
		if (html) {
			this.html = html;
			this.initFromHtml(html);
		} else {
			this.value = config.value;
			this.displayValue = config.displayValue;
			this.html = this.toHtml();
		}
	},

	/**
	 * Initializes parameter object values from html string.
	 * @private
	 * @param {String} html Parameter as html.
	 */
	initFromHtml: function(html) {
		this.value = this.execAndReset(this.valueRegex, html)[1];
		this.displayValue = this.execAndReset(this.displayValueRegex, html)[1];
	},

	/**
	 * Execute regexp and resets it`s state.
	 * @private
	 * @param {RegExp} regex Regexp string.
	 * @param {String} string String to exec regexp with.
	 * @returns {Array} Regex exec result.
	 */
	execAndReset: function(regex, string) {
		var result = regex.exec(string);
		regex.lastIndex = 0;
		return result;
	},

	/**
	 * Returns parameter as html.
	 * @returns {String} Parameter html string.
	 */
	toHtml: function() {
		var pattern = "<img data-type=\"ProcessParameter\" data-value=\"{1}\" alt=\"{2}\" />";
		return Ext.String.format(pattern, this.id, this.value, this.displayValue);
	}
});

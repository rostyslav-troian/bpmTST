Ext.define("Terrasoft.controls.ExternalWidget", {
	extend: "Terrasoft.Container",
	alternateClassName: "Terrasoft.ExternalWidget",

	//region Properties: Private

	/**
	 * @private
	 * @Type{Object}
	 */
	iframe: null,

	/**
	 * @private
	 * @Type{Array}
	 */
	iframeDefaultWrapClass:  ["widget-iframe"],

	/**
	 * @private
	 * @Type{String}
	 */
	defaultWrapClassName: "widget-module",

	//endregion

	//region Properties: Public

	/**
	 * Url for iframe.
	 * @Type{String}
	 */
	iframeSrc: "",

	/**
	 * Css class' name for iframe.
	 * @Type{String}
	 */
	iframeWrapClass: null,

	/**
	 * Delay for request on availability of source.
	 * @Type{Integer}
	 */
	updateDelay: 1,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_tryShowIframeSourceContent: function(value) {
		if (!value || !Terrasoft.isUrl(value)) {
			return;
		}
		Ext.defer(function() {
			this._sendRequestToIframeSource(value, this._onIframeSourceResponse, this);
		}, this.updateDelay, this);
	},

	/**
	 * @param {string} source
	 * @param {Function} callback
	 * @param {Object} scope
	 * @private
	 */
	_sendRequestToIframeSource: function(source, callback, scope) {
		var provider = Terrasoft.AjaxProvider;
		provider.request({
			"url": source,
			"scope": scope,
			"callback": function(response, success) {
				callback.call(scope, source, success);
			}
		});
	},

	/**
	 * @private
	 */
	_onIframeSourceResponse: function(source, success) {
		if (success) {
			this.iframeSrc = source;
			this.setVisible(true);
			this.iframe.setIframeSrc(this.iframeSrc);
		}

	},

	/**
	 * @private
	 */
	_initIframe: function() {
		this.iframe = Ext.create("Terrasoft.IframeControl", {
			"wrapClass": this.iframeWrapClass || this.iframeDefaultWrapClass
		});
		this.add(this.iframe);
		if (this.iframeSrc) {
			this.setVisible(false);
			this._tryShowIframeSourceContent(this.iframeSrc);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Set new source url to iframe
	 * @protected
	 * @param {String} value
	 */
	setIframeSrc: function(value) {
		if (this.iframeSrc === value) {
			return;
		}
		this.setVisible(false);
		this._tryShowIframeSourceContent(value);
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this._initIframe();
	},

	/**
	 * @inheritDoc Terrasoft.Component#destroy
	 * @override
	 */
	onDestroy: function() {
		this.iframe.destroy();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 * @returns {Object}
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var widgetBindConfig = {
			"iframeSrc": {
				"changeMethod": "setIframeSrc"
			}
		};
		return Ext.apply(widgetBindConfig, bindConfig);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 * @returns {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var classes = this.classes || {
			wrapClassName: [this.defaultWrapClassName]
		};
		Ext.apply(tplData, classes);
		return tplData;
	}

	//endregion
});

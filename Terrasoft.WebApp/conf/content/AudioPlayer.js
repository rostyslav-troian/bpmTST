Terrasoft.configuration.Structures["AudioPlayer"] = {innerHierarchyStack: ["AudioPlayer"]};
/**
 * @class Terrasoft.controls.AudioPlayer
 * #####, ########### ##########.
 */
Ext.define("Terrasoft.controls.AudioPlayer", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.AudioPlayer",

	//region Fields: Private

	/**
	 * ### ###########.
	 * @private
	 * @type {String}
	 */
	name: "",

	/**
	 * ######## ####### ########## ####### ###### #### ## ######## ##########.
	 * @private
	 * @deprecated
	 * @type {Function}
	 */
	handler: Terrasoft.emptyFn,

	/**
	 * ############# ###########.
	 * @private
	 * @type {String}
	 */
	sourceId: "",

	/**
	 * Url ###########.
	 * @private
	 * @type {String}
	 */
	sourceUrl: "",

	//endregion

	//region Fields: Protected

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 * @overridden
	 */
	/* jshint quotmark: false */
	/* jscs:disable */
	tpl: [
		'<audio id="{id}" preload="none" src="{sourceUrl}" sourceId="{sourceId}"/>'
	],
	/* jscs:enable */
	/* jshint quotmark: true */

	//endregion

	//region Methods: Private

	/**
	 * Indicates html element is attached to DOM.
	 * @private
	 * @param {Object} element Html-element.
	 * @return {Boolean}
	 */
	getIsElementAttachedToDom: function(element) {
		while (element) {
			element = element.parentNode;
			if (element === document) {
				return true;
			}
		}
		return false;
	},

	/**
	 * ############# ############# ###########.
	 * @private
	 * @param {String} sourceId ############# ###########.
	 */
	setSourceId: function(sourceId) {
		if (this.sourceId === sourceId) {
			return;
		}
		this.sourceId = sourceId;
		this.reRender();
	},

	/**
	 * ############# Url ###########.
	 * ###### ####### ######## ######## ###########, ### #### ### ## ###### ############ reRender.
	 * @private
	 * @param {String} sourceUrl Url ###########.
	 */
	setSourceUrl: function(sourceUrl) {
		if (this.sourceUrl === sourceUrl) {
			return;
		}
		this.sourceUrl = sourceUrl;
		if (!this.rendered) {
			return;
		}
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		var elDom = wrapEl.dom;
		if (!this.getIsElementAttachedToDom(elDom)) {
			// TODO #CC-1124 Audio element should be created as single instance
			return;
		}
		elDom.src = sourceUrl;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @overridden
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var audioPlayerBindConfig = {
			sourceId: {
				changeMethod: "setSourceId"
			},
			sourceUrl: {
				changeMethod: "setSourceUrl"
			}
		};
		Ext.apply(audioPlayerBindConfig, bindConfig);
		return audioPlayerBindConfig;
	},

	/**
	 * ##### ########## ######### ######## ########## ###########.
	 * @protected
	 * @return {Object} ###### ##########.
	 */
	getSelectors: function() {
		return {
			wrapEl: "#" + this.id,
			el: "#" + this.id
		};
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @overriden
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var audioTplData = {
			sourceId: this.sourceId,
			sourceUrl: Terrasoft.utils.string.encodeHtml(this.sourceUrl)
		};
		Ext.apply(audioTplData, tplData);
		this.selectors = this.getSelectors();
		return audioTplData;
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @overriden
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		wrapEl.on({
			ended: {
				fn: this.onPlaybackEnded,
				scope: this
			},
			error: {
				fn: this.onError,
				scope: this
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.Component#clearDomListeners
	 * @overriden
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		wrapEl.removeAllListeners();
	},

	/**
	 * ############ ####### ######### ###############.
	 * @protected
	 */
	onPlaybackEnded: function() {
		this.fireEvent("playbackended");
	},

	/**
	 * ############ ####### ######.
	 * @protected
	 * @param {Object} errorObject ###### # ########### # ######.
	 */
	onError: function(errorObject) {
		var errorCode = errorObject.target.error.code;
		if ((errorCode === errorObject.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) &&
				Ext.isEmpty(errorObject.target.currentSrc)) {
			return;
		}
		this.fireEvent("error", errorCode);
	},

	/**
	 * @inheritDoc Terrasoft.Component#init
	 * @protected
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(

			/**
			 * @event
			 * ############### #########.
			 */
			"playbackended",

			/**
			 * @event
			 * ######.
			 */
			"error"
		);
	},

	//endregion

	//region Methods: Public

	/**
	 * ######### ############ ###########.
	 */
	play: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		var elDom = wrapEl.dom;
		if (!this.getIsElementAttachedToDom(elDom)) {
			// TODO #CC-1124 Audio element should be created as single instance
			return;
		}
		elDom.play();
	},

	/**
	 * ############# ############### ###########.
	 */
	stop: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		var elDom = wrapEl.dom;
		if (!this.getIsElementAttachedToDom(elDom)) {
			// TODO #CC-1124 Audio element should be created as single instance
			return;
		}
		if (!elDom.paused) {
			elDom.pause();
		}
		if (elDom.currentTime !== 0) {
			elDom.currentTime = 0;
		}
	},

	/**
	 * Enables or disables embedded browser controls.
	 * @param {Boolean} [isEnabled=true] Enable controls.
	 */
	setControlsEnabled: function(isEnabled) {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		var elDom = wrapEl.dom;
		elDom.controls = (isEnabled !== false);
	},

	/**
	 * Indicates embedded browser controls enabled.
	 * @return {Boolean}
	 */
	getControlsEnabled: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return true;
		}
		return wrapEl.dom.controls;
	}

	//endregion

});



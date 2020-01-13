Terrasoft.configuration.Structures["ImageView"] = {innerHierarchyStack: ["ImageView"]};
define("ImageView", [], function() {
	/**
	 * @class Terrasoft.controls.ImageView
	 * ##### ######## ########## ### ########### ########.
	 */
	Ext.define("Terrasoft.controls.ImageView", {
		extend: "Terrasoft.Component",
		alternateClassName: "Terrasoft.ImageView",

		/**
		 * ########### ######## ###########.
		 * @type {String}
		 */
		imageTitle: "",

		/**
		 * Url ########### ## #########.
		 * @type {String}
		 */
		defaultImageSrc: "",

		/**
		 * Url ###########.
		 * @private
		 * @type {String}
		 */
		imageSrc: "",

		/**
		 * CSS class ### ######## ##########.
		 * @private
		 */
		wrapClasses: "",

		/**
		 * @inheritdoc Terrasoft.Component#tpl
		 * @protected
		 * @overridden
		 */
		tpl: [
			/*jshint white:false */
			/*jshint quotmark: false*/
			'<img id="{id}-image-view" class="{wrapClass}" src="{imageSrc}" title="{imageTitle}" />'
			/*jshint quotmark: true*/
			/*jshint white:true */
		],

		/**
		 * ############# ########## ####
		 * @protected
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
					/**
					 * @event
					 * ####### ####### ## ####### ########### ########.
					 * @param {Terrasoft.ImageView} this
					 */
					"click"
			);
		},

		/**
		 * ############# ####### DOM.
		 * @protected
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var wrapEl = this.getWrapEl();
			if (wrapEl) {
				wrapEl.on({
					click: {
						fn: this.onClick,
						scope: this
					}
				});
			}
		},

		/**
		 * ######### ##### ######.
		 * @protected
		 */
		onClick: function(e) {
			var canExecute = this.canExecute({
				method: this.onClick,
				args: arguments
			});
			if (canExecute === false) {
				return;
			}
			e.stopEvent();
			this.fireEvent("click", this, null);
		},

		/**
		 * ############ ###### ### ####### # ######### #########.
		 * @protected
		 * @overridden
		 * @return {Object} tplData ########### ##### ###### ### #######.
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			Ext.apply(tplData, this.combineClasses());
			tplData.imageSrc = this.imageSrc;
			tplData.imageTitle = this.imageTitle;
			this.updateSelectors(tplData);
			return tplData;
		},

		/**
		 * ######### ######### ###### ## ###### ############## ### ######## ########.
		 * @protected
		 * @param  {Object} tplData ###### ###### ### #######, ## ######## ##### ######### ########.
		 * @return {Object} selectors ########### #########.
		 */
		updateSelectors: function(tplData) {
			var id = tplData.id;
			var selectors = this.selectors = {};
			selectors.wrapEl = "#" + id + "-image-view";
			return selectors;
		},

		/**
		 * ######### ##### ### ######## ########## ## ######### ############.
		 * @protected
		 * @return {Object} ###### ########## ###### CSS - #######.
		 */
		combineClasses: function() {
			return {
				wrapClass: [this.wrapClasses]
			};
		},

		/**
		 * ######## ######## url ########.
		 * @param {String} src URL ##### ########.
		 * @param {String} title ########### ######### ########.
		 */
		setImageSrc: function(src, title) {
			this.imageSrc = src || this.defaultImageSrc;
			this.imageTitle = Ext.isEmpty(title, true) ? this.imageTitle : title;
			this.safeRerender();
		},

		/**
		 * ######## ########### ######## ###########.
		 * @param {String} title ########### ######## ###########.
		 */
		setImageTitle: function(title) {
			this.imageTitle = Ext.isEmpty(title, true) ? this.imageTitle : title;
			this.safeRerender();
		},

		/**
		 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
		 * @overridden
		 */
		getBindConfig: function() {
			var parentBindConfig = this.callParent(arguments);
			var bindConfig = {
				imageSrc: {changeMethod: "setImageSrc"},
				imageTitle: {changeMethod: "setImageTitle"}
			};
			Ext.apply(bindConfig, parentBindConfig);
			return bindConfig;
		}
	});

});



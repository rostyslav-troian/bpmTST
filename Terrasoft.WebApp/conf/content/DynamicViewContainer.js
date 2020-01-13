Terrasoft.configuration.Structures["DynamicViewContainer"] = {innerHierarchyStack: ["DynamicViewContainer"]};
define("DynamicViewContainer", ["ext-base"], function(Ext) {
	/**
	 * @class Terrasoft.configuration.DynamicViewContainer
	 * Container which supports dynamic content configuration.
	 */
	Ext.define("Terrasoft.controls.DynamicViewContainer", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.DynamicViewContainer",

		//region Properties: Protected

		/**
		 * Component created using current {@link #viewConfig}.
		 * @protected
		 * @type {Terrasoft.Component}
		 */
		view: null,

		/**
		 * Default class name for inner view component.
		 * @protected
		 */
		defComponentClassName: "Terrasoft.Component",

		//endregion

		//region Properties: Public

		/**
		 * Current inner item view configuration.
		 * @type {Object}
		 */
		viewConfig: null,

		//endregion

		//region Methods: Private

		/**
		 * Initializes component from current {@link #viewConfig} and adds it to items collection.
		 * @private
		 */
		initInnerItem: function() {
			var innerItem = this.view;
			if (innerItem) {
				this.remove(innerItem);
				innerItem.destroy();
				innerItem = null;
			}
			var viewConfig = this.viewConfig;
			if (viewConfig) {
				innerItem = this.createItemView(viewConfig);
				this.add(innerItem);
			}
			this.view = innerItem;
		},

		/**
		 * Updates current inner item view configuration.
		 * @private
		 * @param {Object} viewConfig Configuration of inner view.
		 */
		setViewConfig: function(viewConfig) {
			this.viewConfig = viewConfig;
			this.initInnerItem();
		},

		//endregion

		//region Methods: Protected

		/**
		 * Creates instance of component by its config.
		 * @protected
		 * @param {Object} viewConfig Configuration of component.
		 * @return {Terrasoft.Component}
		 */
		createItemView: function(viewConfig) {
			var className = viewConfig.className || this.defComponentClassName;
			var instance = Ext.create(className, viewConfig);
			instance.bind(this.model);
			return instance;
		},

		/**
		 * @inheritdoc Terrasoft.Container#init
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.callParent();
			this.initInnerItem();
		},

		//endregion

		//region Methods: Public

		/**
		 * Returns binding configuration. Implements interface of {@link Terrasoft.Bindable} mixin.
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			Ext.apply(bindConfig,  {
				viewConfig: {
					changeMethod: "setViewConfig"
				}
			});
			return bindConfig;
		}

		//endregion

	});
});



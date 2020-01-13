Terrasoft.configuration.Structures["SearchableTextEdit"] = {innerHierarchyStack: ["SearchableTextEdit"]};
define("SearchableTextEdit", ["ext-base", "terrasoft", "SearchEdit"], function(Ext) {
	/**
	 * @class Terrasoft.controls.SearchableTextEdit
	 * Edit control with search ability and expandable list for found items.
	 */
	Ext.define("Terrasoft.controls.SearchableTextEdit", {
		extend: "Terrasoft.SearchEdit",
		alternateClassName: "Terrasoft.SearchableTextEdit",

		mixins: {
			expandableList: "Terrasoft.ExpandableList"
		},

		/**
		 * @inheritdoc Terrasoft.ExpandableList#maskDelay
		 * @overridden
		 */
		maskDelay: 500,

		/**
		 * @inheritdoc Terrasoft.SearchEdit#searchDelay
		 * @overridden
		 */
		searchDelay: 200,

		/**
		 * @inheritdoc Terrasoft.ExpandableList#enableLocalFilter
		 * @overridden
		 */
		enableLocalFilter: false,

		/**
		 * @inheritdoc Terrasoft.ExpandableList#enableRightIcon
		 * @overridden
		 */
		enableRightIcon: false,

		/**
		 * Sign that drop-down list is displayed on focus event.
		 * @protected
		 */
		showExpandableListOnFocus: true,


		//region Methods: Private

		/**
		 * Set bind config params.
		 * @private
		 * @param {Object} bindConfig Base bind config.
		 * @return {Object} Bind config.
		 */
		setBindConfigParams: function(bindConfig) {
			var expandableBindConfig = this.mixins.expandableList.getBindConfig();
			Ext.apply(bindConfig, expandableBindConfig);
			return bindConfig;
		},

		/**
		 * Search value changed handler.
		 * @private
		 */
		onSearchValueChanged: function() {
			var value = this.getTypedValue();
			this.typedValue = value;
			if ((value.length >= this.minSearchCharsCount) && value !== "") {
				this.expandList(value);
			}
		},

		/**
		 * Search value cleared handler.
		 * @private
		 */
		onSearchValueDeleted: function() {
			this.typedValue = "";
			this.collapseList();
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @overridden
		 */
		init: function() {
			this.mixins.expandableList.init.call(this);
			this.addEvents(
				/**
				 * @event listViewItemRender
				 * Event list view item renders.
				 * @param {Object} item List element.
				 */
				"listViewItemRender",
				/**
				 * @event itemSelected
				 * Event item selected.
				 * @param {Object} item List element.
				 */
				"itemSelected"
			);
			this.callParent(arguments);
		},

		/**
		 * Handles list element selected event.
		 * @protected
		 * @virtual
		 * @param {Object} item Selected element property.
		 */
		onListElementSelected: function(item) {
			if (item.isSeparatorItem) {
				return;
			}
			this.fireEvent("itemSelected", item, this);
			this.mixins.expandableList.onListElementSelected.call(this, item.displayValue);
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#onFocus
		 * @overridden
		 */
		onFocus: function() {
			if (!this.showExpandableListOnFocus) {
				return;
			}
			this.callParent(arguments);
			this.mixins.expandableList.onFocus.call(this);
			var value = this.getTypedValue();
			this.expandList(value);
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#onBlur
		 * @overridden
		 */
		onBlur: function() {
			this.callParent(arguments);
			this.mixins.expandableList.onBlur.call(this);
			if (this.listView) {
				this.listView.hide();
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#onKeyDown
		 * @overridden
		 */
		onKeyDown: function(e) {
			if (!this.enabled || this.readonly) {
				return;
			}
			this.callParent(arguments);
			this.mixins.expandableList.onKeyDown.call(this, e, true);
			var key = e.getKey();
			var searchValue = this.typedValue;
			var listView = this.listView;
			switch (key) {
				case e.DOWN:
					if (listView === null || !listView.visible) {
						this.expandList(searchValue);
					}
					break;
				case e.ENTER:
					if (listView && listView.visible && !e.ctrlKey && !e.altKey && !e.shiftKey) {
						if (this.listView.selectedItem) {
							this.listView.fireEvent("listPressEnter");
						} else {
							this.collapseList();
						}
					}
					break;
				default:
					break;
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseEdit#onEnterKeyPressed
		 * @overridden
		 */
		onEnterKeyPressed: function () {
			if (this.listView && this.listView.selectedItem) {
				return;
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @inheritdoc BaseSearchEdit#fireOnKeyUpEvents
		 * @overridden
		 */
		fireOnKeyUpEvents: function(e, fieldValue) {
			this.callParent(arguments);
			var key = e.getKey();
			if ((key === e.DELETE || key === e.BACKSPACE) && Ext.isEmpty(fieldValue)) {
				this.collapseList();
			}
		},

		//endregion

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			return this.setBindConfigParams(bindConfig);
		},

		/**
		 * @inheritdoc Terrasoft.HtmlEdit#subscribeForEvents
		 * @overridden
		 */
		subscribeForEvents: function(binding, property, model) {
			this.callParent(arguments);
			this.mixins.expandableList.subscribeForEvents.call(this, binding, property, model);
			this.on("searchValueChanged", this.onSearchValueChanged, this);
			this.on("searchValueDeleted", this.onSearchValueDeleted, this);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#initBinding
		 * @overridden
		 */
		initBinding: function(configItem, bindingRule, bindConfig) {
			var binding = this.callParent(arguments);
			var expandableListBinding =
				this.mixins.expandableList.initBinding.call(this, configItem, bindingRule, bindConfig);
			return Ext.apply(binding, expandableListBinding);
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			this.mixins.expandableList.destroy.call(this);
			this.callParent(arguments);
		}

	});
});



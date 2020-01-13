Terrasoft.configuration.Structures["PopUpContainer"] = {innerHierarchyStack: ["PopUpContainer"]};
define("PopUpContainer", [], function() {
	/**
	 * @class Terrasoft.controls.PopUpContainer
	 * #########, ####### ######### ###### ########### ##########.
	 */
	Ext.define("Terrasoft.controls.PopUpContainer", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.PopUpContainer",

		mixins: {
			/**
			 * ###### ########### ##########.
			 */
			expandable: "Terrasoft.Expandable"
		},

		/**
		 * ############# ##########, ### ########## ######### ########,
		 * ## ####### mousedown ## ########### ########## #########.
		 * @type {String}
		 */
		innerContainerId: null,

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.mixins.expandable.init.call(this);
			this.initEvents();
		},

		/**
		 * @inheritdoc Terrasoft.Component
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var expandableBindConfig = this.mixins.expandable.getBindConfig();
			Ext.apply(bindConfig, expandableBindConfig);
			return bindConfig;
		},

		/**
		 * ############## #########.
		 * @protected
		 */
		initEvents: function() {
			this.on("show", this.subscribeMouseDown, this);
			this.on("hide", this.unsubscribeMouseDown, this);
		},

		/**
		 * ######## ## ####### mousedown #########.
		 * @protected
		 */
		subscribeMouseDown: function() {
			var doc = Ext.getDoc();
			doc.on("mousedown", this.onMouseDown, this);
		},

		/**
		 * ####### ## ####### mousedown #########.
		 * @protected
		 */
		unsubscribeMouseDown: function() {
			var doc = Ext.getDoc();
			doc.un("mousedown", this.onMouseDown, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @overridden
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			this.unsubscribeMouseDown();
		},

		/**
		 * ########## ####### ####### ####, ############# ## ######### ######## ########## # ########### ####.
		 * @protected
		 * @param {Event} e ####### mousedown.
		 */
		onMouseDown: function(e) {
			var expandableContainer = this.mixins.expandable.getContainer.call(this);
			var isInContainerWrap = this.withinItem(e, expandableContainer);
			var isInInnerItem = isInContainerWrap || this.checkEventInInnerItem(e);
			if (!isInContainerWrap && !isInInnerItem) {
				this.mixins.expandable.setExpanded.call(this, false);
			}
		},

		/**
		 * #########, ######## ## ####### ####### ####### ######### ######### ### ########### ##########.
		 * @private
		 * @param {Event} e ####### ### ########.
		 * @return {Boolean} true # ###### ############## ##########.
		 */
		checkEventInInnerItem: function(e) {
			var isWithin = false;
			if (this.innerContainerId) {
				var innerComponent = Ext.getCmp(this.innerContainerId);
				if (innerComponent) {
					isWithin = this.withinItem(e, innerComponent);
				}
			}
			return isWithin;
		},

		/**
		 * ######### ######## ## ####### ####### ####### ######## ### ######### ##########.
		 * @private
		 * @param {Event} event ####### ### ########.
		 * @param {Ext.Component} component ####### ### ########.
		 * @return {Boolean} true # ###### ############## ##########.
		 */
		withinItem: function(event, component) {
			var isWithin = !component || event.within(component.getWrapEl());
			if (!isWithin && component instanceof Terrasoft.AbstractContainer) {
				component.items.each(function(item) {
					if (item instanceof Terrasoft.Component) {
						isWithin = this.withinItem(event, item);
						if (isWithin) {
							return false;
						}
					}
				}, this);
			}
			if (!isWithin && component.listView instanceof Terrasoft.ListView) {
				isWithin =  this.withinItem(event, component.listView);
			}
			return isWithin;
		}
	});
});



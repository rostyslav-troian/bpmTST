Terrasoft.configuration.Structures["MiniPageListener"] = {innerHierarchyStack: ["MiniPageListener"]};
define("MiniPageListener", ["sandbox", "MaskHelper", "ModuleUtils", "BaseModule", "AlignableContainer",
	"MiniPageContainerViewModel"
], function(sandbox) {
	Ext.define("Terrasoft.configuration.MiniPageListener", {
		extend: "Terrasoft.BaseModule",
		alternateClassName: "Terrasoft.MiniPageListener",

		singleton: true,

		view: null,

		/**
		 * Extended menu element id (BaseExtendedMenu).
		 * @type {String}
		 */
		menuElId: "ExtendedMenu-list",

		/**
		 * MiniPage container module view model class name.
		 * @type {String}
		 */
		viewModelClass: "Terrasoft.MiniPageContainerViewModel",

		/**
		 * Returns instance of MiniPage container view model.
		 * @return {Object} Instance of MiniPage container view model.
		 */
		initViewModel: function() {
			return Ext.create(this.viewModelClass, {
				"sandbox": sandbox
			});
		},

		/**
		 * Returns instance of MiniPage container.
		 * @return {Terrasoft.Container} Instance of MiniPage container.
		 */
		initView: function() {
			return Ext.create("Terrasoft.Container", {
				"id": "MainMiniPageContainer",
				"items": [
					Ext.create("Terrasoft.Container", {
						"id": "MiniPageContainer",
						"visible": {
							"bindTo": "Visible",
							"bindConfig": {
								"converter": function(value) {
									return value !== false;
								}
							}
						},
						"items": []
					})
				]
			});
		},

		/**
		 * Initialize events for MiniPage container and MiniPage align element.
		 * @param {Object} options Event options.
		 * @param {Boolean} options.isFixed True if need subscribe.
		 * @param {String} options.floatTo Align element.
		 */
		initEvents: function(options) {
			var container = this.view.getWrapEl();
			var isFixed = options.isFixed;
			if (container) {
				this.unsubscribeContainerEvents(container);
				this.subscribeContainerEvents(container, isFixed);
			}
			var alignEl = Ext.get(options.floatTo);
			if (alignEl) {
				this.unsubscribeChildEvents(alignEl);
				this.subscribeChildEvents(alignEl, isFixed);
			}
		},

		/**
		 * Method appends event handlers to extended menu container.
		 * @param {Boolean} isFixed True if mini page need be fixed.
		 */
		subscribeMenuContainerEvents: function(isFixed) {
			var menuEl = Ext.get(this.menuElId);
			if (menuEl) {
				this.unsubscribeChildEvents(menuEl);
				this.subscribeChildEvents(menuEl, isFixed);
			}
		},

		/**
		 * Removes event handlers from MiniPageContainer.
		 * @param {Object} container Mini page container.
		 * @param {Function} container.un  Removes event.
		 */
		unsubscribeContainerEvents: function(container) {
			var scope = this.viewModel;
			this.unSubscribeGlobalEvents(scope);
			container.un("mouseover", scope.mouseOver, scope);
			container.un("mouseleave", scope.mouseLeave, scope);
		},

		/**
		 * Appends event handlers to MiniPageContainer.
		 * @param {Object} container Mini page container.
		 * @param {Boolean} isFixed True if mini page need be fixed.
		 */
		subscribeContainerEvents: function(container, isFixed) {
			var scope = this.viewModel;
			this.subscribeGlobalEvents(scope, isFixed);
			if (!isFixed) {
				container.on("mouseleave", scope.mouseLeave, scope);
				container.on("mouseover", scope.mouseOver, scope);
			}
		},

		/**
		 * Removes event handlers from MiniPageContainer child element.
		 * @param {Object} childEl Child element.
		 * @param {Function} childEl.un Remove events.
		 */
		unsubscribeChildEvents: function(childEl) {
			var scope = this.viewModel;
			this.unSubscribeGlobalEvents(scope);
			childEl.un("mouseleave", scope.childElMouseLeave, scope);
			childEl.un("click", scope.childElMouseLeave, scope);
			childEl.un("mouseover", scope.childElMouseOver, scope);
		},

		/**
		 * Appends event handlers to MiniPageContainer child element.
		 * @param {Object} childEl Child element.
		 * @param {Boolean} isFixed True if mini page need be fixed.
		 */
		subscribeChildEvents: function(childEl, isFixed) {
			var scope = this.viewModel;
			this.subscribeGlobalEvents(scope, isFixed);
			if (!isFixed) {
				childEl.on("mouseleave", scope.childElMouseLeave, scope);
				childEl.on("click", scope.childElMouseLeave, scope);
				childEl.on("mouseover", scope.childElMouseOver, scope);
			}
		},

		/**
		 * Appends global event handlers.
		 * @protected
		 * @param {Object} scope Context.
		 * @param {Boolean} isFixed True if mini page need be fixed.
		 */
		subscribeGlobalEvents: function(scope, isFixed) {
			var doc = Ext.getDoc();
			if (isFixed) {
				doc.on("mousedown", scope.mouseDown, scope);
			}
			doc.on("wheel", scope.mouseWheel, scope);
			doc.on("keydown", scope.keyPress, scope);
		},

		/**
		 * Removes global event handlers.
		 * @protected
		 * @param {Object} scope Context.
		 */
		unSubscribeGlobalEvents: function(scope) {
			var doc = Ext.getDoc();
			this.unSubscribeFixedGlobalEvents(scope);
			doc.un("keydown", scope.keyPress, scope);
		},

		/**
		 * Removes fixed event handlers.
		 * @protected
		 * @param {Object} scope Context.
		 */
		unSubscribeFixedGlobalEvents: function(scope) {
			var doc = Ext.getDoc();
			doc.un("mousedown", scope.mouseDown, scope);
			doc.un("wheel", scope.mouseWheel, scope);
		},

		/**
		 * Opens mini page.
		 * @param {Object} config MiniPage configuration object.
		 */
		open: function(config) {
			var addOperation = config.operation === Terrasoft.ConfigurationEnums.CardOperation.ADD;
			if (addOperation) {
				Terrasoft.MaskHelper.showBodyMask({
					timeout: 1000,
					showHidden: true
				});
			}
			var viewModel = this.viewModel;
			if (viewModel) {
				if (config.floatTo !== viewModel.alignToElId || addOperation) {
					this.showMiniPageContainer(config);
					this.initEvents(config);
				} else if (config.isFixed && !viewModel.isFixed) {
					viewModel.isFixed = config.isFixed;
					if (!viewModel.get("Visible")) {
						this.showMiniPageContainer(config);
					}
					this.initEvents(config);
				}
			} else {
				this.showMiniPageContainer(config);
				this.initEvents(config);
			}
		},

		/**
		 * Closes MiniPage.
		 */
		close: function() {
			var viewModel = this.viewModel;
			if (viewModel && viewModel.$Visible) {
				viewModel.hide();
			}
		},

		/**
		 * Shows MiniPageContainer.
		 * @param {Object} config MiniPage configuration object.
		 */
		showMiniPageContainer: function(config) {
			var viewModel = this.viewModel;
			var view = this.view;
			if (!viewModel) {
				viewModel = this.viewModel = this.initViewModel();
			}
			if (!view || view.destroyed) {
				view = this.view = this.initView();
				view.bind(viewModel);
				view.render(Ext.getBody());
			}
			viewModel.init(config);
		}
	});
	return {
		init: Ext.emptyFn
	};
});



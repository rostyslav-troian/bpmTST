Terrasoft.configuration.Structures["ContextTipManager"] = {innerHierarchyStack: ["ContextTipManager"]};
define("ContextTipManager", ["ext-base", "terrasoft", "css!ContextTipManager"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.ContextTipManager
	 * Class "ContextTipManager"
	 */
	Ext.define("Terrasoft.configuration.ContextTipManager", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ContextTipManager",
		singleton: true,

		//region Properties: Private

		/**
		 * Used to store collections of tips for each tip group.
		 * @private
		 * @type {Object}
		 */
		tipGroupsStore: {},

		/**
		 * Used to store information about registered tip.
		 * @private
		 * @type {Object}
		 */
		tipInfoStore: {},

		/**
		 * Id of current visible mask.
		 * @private
		 * @type {String}
		 */
		maskId: null,

		/**
		 * Tools menu array.
		 * @private
		 * @type {Object[]}
		 */
		tools: null,

		/**
		 * Id of top container for context mode.
		 * @private
		 */
		contextModeContainerId: "context-tips-mode-container",

		/**
		 * Id of border container for context mode.
		 * @private
		 */
		borderContainerId: "context-tips-mode-border",

		//endregion

		//region Properties: Protected

		/**
		 * Class name of type which used to store tips in group.
		 * @protected
		 * @type {String}
		 */
		collectionClassName: "Terrasoft.Collection",

		/**
		 * Number of visible tips need to display mask. Value is initializing in {@link #displayGroup} method.
		 * @protected
		 * @type {Number}
		 */
		maskVisibleTipsCount: null,

		/**
		 * Default number of visible tips need to display mask.
		 * @protected
		 * @type {Number}
		 */
		defMaskVisibleTipsCount: 3,

		/**
		 * Id of current visible tips group.
		 * @protected
		 * @type {String}
		 */
		activeGroupId: null,

		//endregion

		//region Constructor: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
					/**
					 * @param {String} tag Value of clicked tool tag property.
					 */
					"toolClick",

					/**
					 * Fires when count of tips registered in group is changed.
					 * @param {String} groupId Id of group in which tip is registered.
					 * @param {Boolean} itemsAdded True, if items count has grown otherwise false.
					 */
					"groupChanged"
			);
		},

		//endregion

		//region Methods: Private

		/**
		 * Used to initialize tools displayed in mask mode. Click on each button will fires toolClick event.
		 * @param {Object[]} toolConfigs Array contains buttons configuration.
		 * For example to add button with caption and tag:
		 *	Terrasoft.ContextTipManager.setTools([
		 *		{
		 *			caption: "Tool button caption",
		 *			tag: "toolButtonTag"
		 *		}
		 *	]);
		 */
		setTools: function(toolConfigs) {
			this.clearTools();
			this.tools = toolConfigs;
			this.initTools();
		},

		/**
		 * Clears items in {@link #toolsContainer}.
		 * @private
		 */
		clearTools: function() {
			if (this.isContextModeViewActive() && this.toolsContainer) {
				this.toolsContainer.items.each(function(tool) {
					tool.destroy();
				});
				this.toolsContainer.items.clear();
			}
		},

		/**
		 * Returns true if {@link #contextModeContainer} is initialized and not destroyed, otherwise returns false.
		 * @return {Boolean}
		 */
		isContextModeViewActive: function() {
			return this.contextModeContainer ? !this.contextModeContainer.destroyed : false;
		},

		/**
		 * Returns true if {@link #toolsContainer} is initialized and not destroyed, otherwise returns false.
		 * @return {Boolean}
		 */
		isToolsContainerActive: function() {
			return this.toolsContainer ? !this.toolsContainer.destroyed : false;
		},

		/**
		 * Returns configuration for container used for displaying border.
		 * @private
		 * @return {Object} Configuration of container for border.
		 */
		getBorderContainerConfig: function() {
			return {
				className: "Terrasoft.Container",
				id: this.borderContainerId,
				selectors: {
					el: "#context-tips-mode-border",
					wrapEl: "#context-tips-mode-border"
				},
				classes: {
					wrapClassName: ["context-tips-mode-border"]
				}
			};
		},

		/**
		 * Initializes tools and container for it.
		 * @private
		 */
		initToolsContainer: function() {
			this.toolsContainer = Ext.create("Terrasoft.Container", {
				id: "context-tips-mode-tools",
				selectors: {
					el: "#context-tips-mode-tools",
					wrapEl: "#context-tips-mode-tools"
				},
				classes: {
					wrapClassName: ["context-tips-mode-tools"]
				}
			});
			this.toolsContainer.on("add", this.onToolsAdd, this);
			this.initTools();
		},

		/**
		 * Handler for add event on tools container. Subscribes on tool click event.
		 * @private
		 * @param {Terrasoft.Container} container Tools container instance.
		 * @param {Terrasoft.Component[]} tools Added tools.
		 */
		onToolsAdd: function(container, tools) {
			Terrasoft.each(tools, function(tool) {
				tool.on("click", this.onToolClick, this);
			}, this);
		},

		/**
		 * Handler for click event on tool. Fires toolClick event.
		 * @private
		 * @param {Terrasoft.Button} tool
		 */
		onToolClick: function(tool) {
			this.fireEvent("toolClick", tool.tag);
		},

		/**
		 * Initializes tools from config and add it to the tools container.
		 * @private
		 */
		initTools: function() {
			if (!this.isToolsContainerActive()) {
				return;
			}
			var tools = [];
			Terrasoft.each(this.tools, function(tool) {
				tools.push(Ext.apply({
					className: "Terrasoft.Button"
				}, tool));
			}, this);
			this.toolsContainer.add(tools);
		},

		/**
		 * Renders view for context mode including tools panel and border.
		 * @private
		 */
		renderContextModeView: function() {
			this.initToolsContainer();
			var borderContainerConfig = this.getBorderContainerConfig();
			this.contextModeContainer = Ext.create("Terrasoft.Container", {
				id: this.contextModeContainerId,
				selectors: {
					el: "#" + this.contextModeContainerId,
					wrapEl: "#" + this.contextModeContainerId
				},
				classes: {
					wrapClassName: ["context-tips-mode-container"]
				},
				renderTo: Ext.getBody(),
				items: [
					borderContainerConfig,
					{
						className: "Terrasoft.Container",
						id: "context-tips-mode-tools-wrap",
						selectors: {
							el: "#context-tips-mode-tools-wrap",
							wrapEl: "#context-tips-mode-tools-wrap"
						},
						classes: {
							wrapClassName: ["context-tips-mode-tools-wrap"]
						},
						items: [this.toolsContainer]
					}
				]
			});
		},

		/**
		 * Shows mask if passed {@link @param visibleTipsCount} is greater than current {@link #maskVisibleTipsCount}.
		 * @private
		 * @param {Number} visibleTipsCount Count of current visible tips.
		 */
		tryEnterContextMode: function(visibleTipsCount) {
			if (visibleTipsCount >= this.maskVisibleTipsCount) {
				var maskConfig = this.getMaskConfig();
				if (Ext.isEmpty(this.maskId)) {
					this.hideBodyOverflow();
					this.renderContextModeView();
					this.subscribeContextModeDomEvents();
					this.maskId = Terrasoft.Mask.show(maskConfig);
				}
			}
		},

		/**
		 * Performs subscription on DOM element events of view for context mode.
		 * @private
		 */
		subscribeContextModeDomEvents: function() {
			var borderContainer = Ext.get(this.borderContainerId);
			if (borderContainer) {
				borderContainer.on("mousedown", this.hideActiveGroup, this);
			}
		},

		/**
		 * Performs canceling subscription on DOM element events of view for context mode.
		 * @private
		 */
		unsubscribeContextModeDomEvents: function() {
			var borderContainer = Ext.get(this.borderContainerId);
			if (borderContainer) {
				borderContainer.un("mousedown", this.hideActiveGroup, this);
			}
		},

		/**
		 * Hides mask and tools if visible tips count in active group is less than {@link #maskVisibleTipsCount}.
		 * @private
		 */
		tryLeaveContextMode: function() {
			var tipCollection = this.getTipCollection(this.activeGroupId);
			var visibleTips = tipCollection.filterByFn(function(tip) {
				var tipInfo = this.getTipInfo(tip);
				return !tipInfo.destroyPending && tip.isVisible();
			}, this);
			var visibleTipsCount = visibleTips.getCount();
			if (visibleTipsCount < this.maskVisibleTipsCount) {
				this.restoreBodyOverflow();
				this.hideMask();
			}
		},

		/**
		 * Hides mask if it is visible and destroys context mode view.
		 * @private
		 */
		hideMask: function() {
			if (!Ext.isEmpty(this.maskId)) {
				Terrasoft.Mask.hide(this.maskId);
				this.maskId = null;
				if (this.contextModeContainer) {
					this.unsubscribeContextModeDomEvents();
					this.contextModeContainer.destroy();
					this.contextModeContainer = null;
				}
			}
		},

		/**
		 * Set's tips visibility for passed group and updates mask state if it's needed.
		 * @private
		 * @param {String} groupId Id of tips group.
		 * @param {Boolean} visible If defined as true tips will be showed, else tips will be hidden.
		 */
		changeTipsVisibility: function(groupId, visible) {
			var tipsCollection = this.getTipCollection(groupId);
			this.tipsVisibleEventEnabled = false;
			tipsCollection.each(function(tip) {
				if (visible) {
					tip.show();
				} else {
					tip.hide();
				}
			});
			this.tipsVisibleEventEnabled = true;
			if (visible) {
				var visibleTipsCount = tipsCollection.getCount();
				this.tryEnterContextMode(visibleTipsCount);
			} else {
				this.tryLeaveContextMode();
			}
		},

		/**
		 * Saves initial body overflow and applies hidden style to it.
		 * @private
		 */
		hideBodyOverflow: function() {
			var body = Ext.getBody();
			this.initialBodyOverflow = body.getStyle("overflow");
			body.setStyle("overflow", "hidden");
		},

		/**
		 * Restores body overflow style to initial position.
		 * @private
		 */
		restoreBodyOverflow: function() {
			var body = Ext.getBody();
			body.setStyle("overflow", this.initialBodyOverflow);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Returns mask configuration.
		 * @protected
		 * @return {Object}
		 */
		getMaskConfig: function() {
			return {
				selector: "#" + this.contextModeContainerId,
				frameVisible: false,
				caption: null,
				backgroundColor: "#000",
				opacity: 0.15,
				timeout: 0
			};
		},

		/**
		 * Handler for visiblechanged event on tip.
		 * @protected
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @param {Boolean} newValue Current tip visibility state.
		 */
		onTipVisibleChanged: function(tip, newValue) {
			if (newValue === true || !this.tipsVisibleEventEnabled) {
				return;
			}
			this.iterateTipGroups(tip, function(groupId) {
				if (Ext.isEmpty(groupId) || (this.activeGroupId !== groupId)) {
					return;
				}
				this.tryLeaveContextMode();
			});
		},

		/**
		 * Handler for destroy event on tip.
		 * @protected
		 * @param {Terrasoft.Tip} tip Tip instance.
		 */
		onTipDestroy: function(tip) {
			var tipInfo = this.getTipInfo(tip);
			tipInfo.destroyPending = true;
			this.onTipVisibleChanged(tip, false);
			this.iterateTipGroups(tip, function(groupId) {
				var tipCollection = this.getTipCollection(groupId);
				tipCollection.remove(tip);
				this.fireEvent("groupChanged", groupId, false);
			});
			this.removeTipInfo(tip);
		},

		/**
		 * Calls callback for each id of group on which tip is registered.
		 * @protected
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @param {Function} callback Callback to proceed.
		 */
		iterateTipGroups: function(tip, callback) {
			var tipInfo = this.getTipInfo(tip);
			Terrasoft.each(tipInfo.groupIds, callback, this);
		},

		/**
		 * Returns metadata for tip registration including registration state and current group Ids. Metadata for tip is
		 * not found, empty value will be returned.
		 * @protected
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @param {Boolean} [createIfEmpty] If defined as true, and metadata not found, metadata will be saved.
		 * @return {Object} Tip information.
		 */
		getTipInfo: function(tip, createIfEmpty) {
			var tipId = tip.id;
			var tipInfo = this.tipInfoStore[tipId];
			if (Ext.isEmpty(tipInfo)) {
				tipInfo = {
					groupIds: [],
					tipRegistered: false
				};
				if (createIfEmpty) {
					this.tipInfoStore[tipId] = tipInfo;
				}
			}
			return tipInfo;
		},

		/**
		 * Removes tip information from inner storage.
		 * @protected
		 * @param {Terrasoft.Tip} tip Tip instance.
		 */
		removeTipInfo: function(tip) {
			delete this.tipInfoStore[tip.id];
		},

		/**
		 * Returns collections of tips for passed group. If there is no tip registered in group an empty collection
		 * will be returned.
		 * @protected
		 * @param {String} groupId Id of tips group.
		 * @param {Boolean} [createIfNotExists] If defined as true, and tips is registered in group, collection will
		 * be saved for passed group.
		 * return {Terrasoft.Collection} Returns collections of tips.
		 */
		getTipCollection: function(groupId, createIfNotExists) {
			var store = this.tipGroupsStore[groupId];
			if (!store) {
				store = Ext.create(this.collectionClassName);
				if (createIfNotExists && groupId) {
					this.tipGroupsStore[groupId] = store;
				}
			}
			return store;
		},

		//endregion

		//region Methods: Public

		/**
		 * Performs registration of tip in passed groups.
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @param {String[]} groupIdList Array of group id's to register tip.
		 * @throws {Terrasoft.UnsupportedTypeException} Throws Terrasoft.UnsupportedTypeException if passed tip
		 * is not instance of Terrasoft.Tip.
		 */
		register: function(tip, groupIdList) {
			if (!(tip instanceof Terrasoft.Tip)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			if (Ext.isEmpty(groupIdList)) {
				return;
			}
			var tipInfo = this.getTipInfo(tip, true);
			Terrasoft.each(groupIdList, function(groupId) {
				var tipCollection = this.getTipCollection(groupId, true);
				tipCollection.add(tip.id, tip);
				tipInfo.groupIds.push(groupId);
				this.fireEvent("groupChanged", groupId, true);
			}, this);
			if (!tipInfo.tipRegistered) {
				tip.on("visiblechanged", this.onTipVisibleChanged, this);
				tip.on("destroy", this.onTipDestroy, this);
				tipInfo.tipRegistered = true;
			}
		},

		/**
		 * Displays registered in passed group tips.
		 * @param {String} groupId Id of tips group.
		 * @param {Number} [maskVisibleTipsCount] Count of visible tips starting from which mask will be displayed.
		 * If defined as 0 mask will be now shown. If not defined default value {@link #defMaskVisibleTipsCount}
		 * will be used.
		 */
		displayGroup: function(groupId, maskVisibleTipsCount) {
			if (this.activeGroupId !== groupId) {
				this.changeTipsVisibility(this.activeGroupId, false);
			}
			this.activeGroupId = groupId;
			if (Ext.isEmpty(maskVisibleTipsCount)) {
				this.maskVisibleTipsCount = this.defMaskVisibleTipsCount;
			} else {
				this.maskVisibleTipsCount = (maskVisibleTipsCount <= 0) ?
						Number.MAX_VALUE
						: maskVisibleTipsCount;
			}
			this.changeTipsVisibility(groupId, true);
		},

		/**
		 * Hides registered in active group tips.
		 */
		hideActiveGroup: function() {
			if (this.activeGroupId) {
				this.changeTipsVisibility(this.activeGroupId, false);
				this.activeGroupId = null;
			}
		},

		/**
		 * Returns array of group id's in which tip is registered.
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @returns {Array} Array of group id's.
		 */
		getTipGroupIdList: function(tip) {
			var tipInfo = this.getTipInfo(tip);
			return tipInfo.groupIds;
		},

		/**
		 * Returns count of tips registered in group.
		 * @param {String} groupId Id of tips group.
		 * @return {Number}
		 */
		getTipsCount: function(groupId) {
			var tips = this.getTipCollection(groupId);
			return tips.getCount();
		},

		/**
		 * Check if tip registered in group that actually is active.
		 * @param {Terrasoft.Tip} tip Tip instance.
		 * @return {Boolean} True if tip registered in active group, otherwise false.
		 * @throws {Terrasoft.UnsupportedTypeException} Throws Terrasoft.UnsupportedTypeException if passed tip
		 * is not instance of Terrasoft.Tip.
		 */
		isTipInActiveGroup: function(tip) {
			if (!(tip instanceof Terrasoft.Tip)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var result = false;
			if (this.maskId && this.activeGroupId) {
				var tipInfo = this.getTipInfo(tip);
				result = Ext.Array.contains(tipInfo.groupIds, this.activeGroupId);
			}
			return result;
		},

		/**
		 * Clears current tips registration.
		 */
		clear: function() {
			Terrasoft.each(this.tipGroupsStore, function(tipsCollection, groupId) {
				tipsCollection.destroy();
				this.fireEvent("groupChanged", groupId, false);
			}, this);
			this.tipGroupsStore = {};
			this.tipInfoStore = {};
			this.clearTools();
		}

		//endregion

	});

	return Terrasoft.ContextTipManager;

});



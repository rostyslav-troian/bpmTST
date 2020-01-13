/**
 */
Ext.define("Terrasoft.controls.EmbeddedProcessSchemaDesignerLeftToolbar", {
	extend: "Terrasoft.Container",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaDesignerLeftToolbar",

	classes: {
		wrapClassName: ["manager-items", "ts-box-sizing", "scroll"]
	},

	/**
	 * Process schema designer instance.
	 * @private
	 * @type {Terrasoft.ProcessSchemaDesigner}
	 */
	designer: null,

	/**
	 * Process schema designer instance.
	 * @protected
	 * @type {Terrasoft.ProcessFlowElementSchemaManager}
	 */
	elementSchemaManager: Terrasoft.ProcessFlowElementSchemaManager,

	/**
	 * @inheritdoc Terrasoft.controls.Container#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			"itemDrop"
		);
		this.on("afterRender", this.onToolbarAfterRender, this);
	},

	/**
	 * Handler for after render event.
	 */
	onToolbarAfterRender: function() {
		this.wrapEl.on("scroll", this.showScrollShadow, this);
	},

	/**
	 * Fills left panel with groups.
	 * @protected
	 */
	initToolbarGroups: function() {
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.ElementsToolbarGroup;
		Terrasoft.each(Terrasoft.FlowElementGroup, function(group) {
			if (["UserTask"].indexOf(group) > -1 ) {
				return;
			}
			var controlGroup = Ext.create("Terrasoft.ControlGroup", {
				id: this.getGroupId(group),
				caption: resources[group],
				collapsed: false,
				toggleCollapsed: Terrasoft.emptyFn
			});
			this.add(controlGroup);
		}, this);
	},

	/**
	 * Fill left panel with items.
	 */
	initToolbarItems: function() {
		var manager = this.elementSchemaManager;
		manager.initialize(function() {
			this.initToolbarGroups();
			var items = [];
			manager.items.each(function(managerItem) {
				var item = managerItem.instance;
				if (!item.isDeprecated && item.group && item.usageType !== Terrasoft.ProcessSchemaUsageType.NONE) {
					if (["ScriptTask",
						"UserTask",
						"StartMessage",
						"IntermediateCatchMessage",
						"IntermediateCatchSignal",
						"IntermediateThrowMessage",
						"IntermediateThrowSignal",
						"TerminateEvent",
						"ExclusiveGateway",
						"InclusiveGateway",
						"ParallelGateway",
						"EventSubProcess"].indexOf(item.name) > -1) {
						items.push(item);
					}
				}
			});
			this.sortToolbarItems(items);
			items.forEach(function(item) {
				var toolbarItem = this.createDraggableItem(item);
				var groupId = this.getGroupId(item.group);
				var controlGroup = this.items.getByKey(groupId);
				controlGroup.items.add(toolbarItem);
			}, this);
		}, this);
	},

	/**
	 * Sorts toolbar items.
	 * @private
	 * @param {Object[]} items Toolbar items array.
	 */
	sortToolbarItems: function(items) {
		items.sort(function(item1, item2) {
			var index1 = this.getToolbarItemOrderIndex(item1.name);
			var index2 = this.getToolbarItemOrderIndex(item2.name);
			return index1 - index2;
		}.bind(this));
	},

	/**
	 * Returns toolbar item index order.
	 * @private
	 * @param itemName Item name.
	 * @return {Number}
	 */
	getToolbarItemOrderIndex: function(itemName) {
		var itemsOrder = Terrasoft.process.constants.DESIGNER_LEFT_TOOLBAR_ITEMS_ORDER;
		var maxIndex = itemsOrder.length;
		var index = itemsOrder.indexOf(itemName);
		if (index < 0) {
			index = maxIndex + 1;
		}
		return index;
	},

	/**
	 * Returns element id from group container.
	 * @param {String} group Group name.
	 * @private
	 * @returns {String}
	 */
	getGroupId: function(group) {
		return "ts-group-" + group;
	},

	/**
	 * Creates designer left panel container element.
	 * @param {Object} config Config.
	 * @param {String} svgToolbarItemId Item identifier.
	 * @param {String} name Container name.
	 * @param {String} caption Container caption.
	 * @return {Terrasoft.DiagramDraggableContainer}
	 */
	createDiagramDragableContainer: function(config, svgToolbarItemId, name, itemConfig) {
		var toolbarItemHtml = this.getToolbarItemHtml(svgToolbarItemId, itemConfig);
		return Ext.create("Terrasoft.DiagramDraggableContainer", {
			tag: config,
			markerValue: name,
			classes: {
				wrapClassName: ["toolbar-item", "ts-box-sizing"]
			},
			items: [
				{
					className: "Terrasoft.Component",
					selectors: {
						wrapEl: "#" + svgToolbarItemId
					},
					html: toolbarItemHtml
				}
			],
			tips: [
				{
					tip: {
						className: "Terrasoft.Tip",
						displayMode: Terrasoft.TipDisplayMode.NARROW,
						style: Terrasoft.controls.TipEnums.style.BLUE,
						content: itemConfig.caption,
						isContentEmpty: this.isToolbarItemTipContentEmpty.bind(this)
					},
					settings: {
						displayEvent: Terrasoft.TipDisplayEvent.HOVER
					}
				}
			]
		});
	},

	/**
	 * Creates designer left panel element.
	 * @param {Terrasoft.ProcessFlowElementSchemaManagerItem} item Process flow element schema manager item.
	 * @private
	 * @return {Terrasoft.DiagramDraggableContainer}
	 */
	createDraggableItem: function(item) {
		var config = {
			element: item
		};
		config = Ext.apply(config, item.initialConfig);
		var svgToolbarItemId = Terrasoft.Component.generateId();
		var itemConfig = item.getToolbarHtml();
		var toolItem = this.createDiagramDragableContainer(config, svgToolbarItemId, item.name, itemConfig);
		if (this.getIsToggled(item)) {
			toolItem.classes.wrapClassName.push("togled");
		}
		toolItem.on("onDragDrop", function(e) {
			return this.fireEvent("itemDrop", e);
		}, this);
		return toolItem;
	},

	/**
	 * Returns flag that indicates toggled item.
	 * @private
	 * @param {Terrasoft.ProcessFlowElementSchemaManagerItem} item Manager item.
	 * @return {Boolean}
	 */
	getIsToggled: function(item) {
		var manager = this.elementSchemaManager;
		var toggledElements = [].concat(manager.obsoleteElementNames).concat(manager.notImplementedElementNames);
		return toggledElements.indexOf(item.name) > -1;
	},

	/**
	 * Returns whether toolbar item tip content is empty if left panel not collapsed.
	 */
	isToolbarItemTipContentEmpty: function() {
		return !this.designer.leftPanelCollapsed;
	},

	/**
	 * Returns config for element visualize on designer's toolbar.
	 * @param {String} id Element ID.
	 * @param {Object} config Element config.
	 * @private
	 * @return {String}
	 */
	getToolbarItemHtml: function(id, config) {
		var width = 32;
		var height = 32;
		var image = Ext.String.format("<image width=\"{0}\" height=\"{1}\" opacity=\"1\" xlink:href=\"{2}\" />",
			width, height, Terrasoft.ImageUrlBuilder.getUrl(config.image));
		var html = Ext.String.format("<svg id=\"" + id + "\" xmlns=\"http://www.w3.org/2000/svg\"" +
			" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" preserveAspectRatio=\"none\"" +
			" width=\"{0}px\" height=\"{1}px\" viewBox=\"0 0 {0} {1}\"><g>{2}</g></svg>" +
			"<label class=\"t-label\">{3}</label>",
			width, height, image, config.caption);
		return html;
	},

	/**
	 * Shows top inset shadow when elements scrolled.
	 * @private
	 */
	showScrollShadow: function() {
		var wrapEl = this.wrapEl;
		if (wrapEl.dom.scrollTop > 0) {
			wrapEl.addCls("top-scroll-shadow");
		} else {
			wrapEl.removeCls("top-scroll-shadow");
		}
	}
});

﻿Terrasoft.configuration.Structures["DesignTimeReorderableContainer"] = {innerHierarchyStack: ["DesignTimeReorderableContainer"]};
define("DesignTimeReorderableContainer", ["ext-base", "terrasoft", "DesignTimeReorderableItem"],
	function(Ext, Terrasoft) {

		/**
		 * @class Terrasoft.TabLabelPanelContainer
		 * Tabs container class.
		 */
		Ext.define("Terrasoft.configuration.DesignTimeReorderableContainer", {
			alternateClassName: "Terrasoft.DesignTimeReorderableContainer",
			extend: "Terrasoft.Container",

			mixins: {
				reorderable: "Terrasoft.Reorderable",
				droppable: "Terrasoft.Droppable"
			},

			/**
			 * @inheritDoc Terrasoft.Reorderable#reorderableElCls
			 * @protected
			 */
			reorderableElCls: "design-time-reorderable-position",

			/**
			 * @inheritDoc Terrasoft.Reorderable#zeroElClassName
			 * @protected
			 */
			zeroElClassName: "design-time-reorderable-zero-element",

			/**
			 * @inheritDoc Terrasoft.AbstractContainer#bindItems
			 * @protected
			 */
			bindItems: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.component#onAfterRender
			 * @overridden
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterRender.apply(this, arguments);
				this.mixins.reorderable.onAfterRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.component#onAfterReRender
			 * @overridden
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterReRender.apply(this, arguments);
				this.mixins.reorderable.onAfterReRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.component#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.mixins.droppable.onDestroy.apply(this, arguments);
				this.mixins.reorderable.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Bindable#getBindConfig
			 * @protected
			 */
			getBindConfig: function() {
				var reorderableBindConfig = this.mixins.reorderable.getBindConfig.apply(this, arguments);
				var parentBindConfig = Ext.apply(reorderableBindConfig, this.callParent(arguments));
				return Ext.apply(parentBindConfig, {});
			},

			/**
			 * @inheritDoc Terrasoft.Reorderable#getItemConfig
			 * @protected
			 */
			getItemConfig: function(viewModelItem) {
				var self = this;
				return {
					className: "Terrasoft.DesignTimeReorderableItem",
					id: viewModelItem.get("Id"),
					ondragenter: {
						bindTo: "onDragEnter"
					},
					ondragdrop: {
						bindTo: "onDragDrop"
					},
					ondragout: {
						bindTo: "onDragOut"
					},
					getGroupName: function() {
						return self.getGroupName();
					}
				};
			},

			/**
			 * @inheritDoc Terrasoft.Reorderable#subscribeForCollectionEvents
			 * @protected
			 */
			subscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.subscribeForCollectionEvents.apply(this, arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Reorderable#unSubscribeForCollectionEvents
			 * @protected
			 */
			unSubscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.unSubscribeForCollectionEvents.apply(this, arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Reorderable#createZeroElement
			 * @protected
			 */
			createZeroElement: function() {
				var zeroElementId = this.getZeroElementId();
				var zeroElementControl = Ext.get(zeroElementId);
				if (zeroElementControl) {
					zeroElementControl.destroy();
				}
				var zeroElementHtml = Ext.String.format(this.zeroElTpl, this.getZeroElementId(), this.zeroElClassName);
				this.wrapEl.insertHtml("beforebegin", zeroElementHtml);
				var zeroElement = Ext.get(zeroElementId);
				var zeroDDElement = zeroElement.initDD(zeroElementId, {isTarget: true, instance: this, tag: zeroElementId}, {});
				if (Ext.isFunction(this.getGroupName)) {
					var groups = this.getGroupName();
					if (Ext.isArray(groups)) {
						Terrasoft.each(groups, function(group) {
							zeroDDElement.addToGroup(group);
						}, this);
					} else {
						zeroDDElement.addToGroup(groups);
					}
				}
			}
		});
	});



Terrasoft.configuration.Structures["ViewModelSchemaDesignerTabContainer"] = {innerHierarchyStack: ["ViewModelSchemaDesignerTabContainer"]};
define("ViewModelSchemaDesignerTabContainer", ["ext-base", "terrasoft", "ViewModelSchemaDesignerTabItem"],
	function(Ext, Terrasoft) {
		/**
		 * Class for reorderable tab container.
		 * @class Terrasoft.ViewModelSchemaDesignerTabContainer
		 * @extends {@link Terrasoft.Container}
		 */
		Ext.define("Terrasoft.ViewModelSchemaDesignerTabContainer", {
			extend: "Terrasoft.Container",

			mixins: {
				reorderable: "Terrasoft.Reorderable",
				droppable: "Terrasoft.Droppable"
			},

			/**
			 * @inheritdoc Terrasoft.Reorderable#zeroElClassName
			 * @overridden
			 */
			zeroElClassName: "tab-item-content-reorderable-zero-element",

			/**
			 * @inheritdoc Terrasoft.Component#onAfterRender
			 * @overridden
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterRender.apply(this, arguments);
				this.mixins.reorderable.onAfterRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterReRender
			 * @overridden
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterReRender.apply(this, arguments);
				this.mixins.reorderable.onAfterReRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.mixins.droppable.onDestroy.apply(this, arguments);
				this.mixins.reorderable.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#getBindConfig
			 * @overridden
			 */
			getBindConfig: function() {
				var reorderableBindConfig = this.mixins.reorderable.getBindConfig.apply(this, arguments);
				var droppableBindConfig = this.mixins.droppable.getBindConfig.apply(this, arguments);
				var parentBindConfig = this.callParent(arguments);
				return Ext.apply(droppableBindConfig, reorderableBindConfig, parentBindConfig);
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
			 * @overridden
			 */
			subscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.subscribeForCollectionEvents.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
			 * @overridden
			 */
			unSubscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.unSubscribeForCollectionEvents.apply(this, arguments);
			}
		});

		return Terrasoft.ViewModelSchemaDesignerTabContainer;
	});



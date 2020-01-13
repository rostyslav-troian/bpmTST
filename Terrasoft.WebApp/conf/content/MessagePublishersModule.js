Terrasoft.configuration.Structures["MessagePublishersModule"] = {innerHierarchyStack: ["MessagePublishersModule"]};
define("MessagePublishersModule", [],
	function() {
		/**
		 * @class Terrasoft.configuration.MessagePublishersModule
		 */
		Ext.define("Terrasoft.configuration.MessagePublishersModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MessagePublishersModule",

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
			 * @overridden
			 */
			generateViewContainerId: false,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "MessagePublishersPage";
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
			 * @overridden
			 */
			initHistoryState: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#getViewConfig
			 * @overridden
			 */
			getViewConfig: function() {
				var viewConfig = this.callParent(arguments);
				var publishersControls = this.getPublishersControls();
				viewConfig.items.push(publishersControls);
				return viewConfig;
			},

			/**
			 * Returns view configuration of controls for publisher functionality.
			 * @protected
			 * @virtual
			 * @return {Object} publishersControlsContainer view configuration of controls.
			 */
			getPublishersControls: function() {
				var modules = this.viewModel.get("MessagePublishers");
				var containers = [];
				var buttons = [];
				modules.each(function(moduleConfig) {
					var container = this.getPublisherModuleContainer(moduleConfig);
					var button = this.getPublisherButton(moduleConfig);
					buttons.push(button);
					containers.push(container);
				}, this);
				var modulesContainer = this.getBaseContainerConfig();
				modulesContainer.items = containers;
				var buttonsContainer = this.getBaseContainerConfig();
				buttonsContainer.classes = {
					wrapClassName: ["publisherButtonsContainer"]
				};
				buttonsContainer.items = buttons;
				var publishersControlsContainer = this.getBaseContainerConfig();
				publishersControlsContainer.items = [buttonsContainer, modulesContainer];
				return publishersControlsContainer;
			},

			/**
			 * Returns view configuration of container for publisher module.
			 * @protected
			 * @virtual
			 * @param {Object} config Publishers config.
			 * @return {Object} container view configuration of container.
			 */
			getPublisherModuleContainer: function(config) {
				var containerId = config.containerId;
				var moduleName = config.moduleName;
				var visibilityAttribute = config.visibilityAttribute;
				var handlerMethodName = "load" + moduleName;
				var afterRenderHandler = function() {
					var moduleId = this.sandbox.id + "_" + moduleName;
					var rendered = this.sandbox.publish("RerenderPublisherModule", {
						renderTo: containerId
					}, [moduleId]);
					if (!rendered) {
						this.showBodyMask();
						this.sandbox.loadModule(moduleName, {
							renderTo: containerId,
							id: moduleId
						});
					}
				};
				this.viewModel[handlerMethodName] = afterRenderHandler;
				var container = this.getBaseContainerConfig();
				container.id = containerId;
				container.afterrender = {"bindTo": handlerMethodName};
				container.afterrerender = {"bindTo": handlerMethodName};
				container.visible = {"bindTo": visibilityAttribute};
				return container;
			},

			/**
			 * Returns view configuration of button for publisher.
			 * @protected
			 * @virtual
			 * @param {Object} config Publishers config.
			 * @return {Object} button view configuration of button.
			 */
			getPublisherButton: function(config) {
				var code = config.code;
				var caption = config.caption;
				var tag = config.visibilityAttribute;
				var imageId = config.imageId;
				var button = this.getBaseButtonConfig(code, caption, tag, imageId);
				return button;
			},

			/**
			 * Returns view configuration of base container.
			 * @protected
			 * @virtual
			 * @return {Object} view configuration of base container.
			 */
			getBaseContainerConfig: function() {
				return {
					"className": "Terrasoft.Container"
				};
			},

			/**
			 * Returns view configuration of base button.
			 * @protected
			 * @virtual
			 * @param {String} code Publisher code.
			 * @param {String} caption Publisher caption.
			 * @param {String} tag Publisher tag.
			 * @param {String} imageId Publisher imageId.
			 * @return {Object} view configuration of base button.
			 */
			getBaseButtonConfig: function(code, caption, tag, imageId) {
				return {
					"className": "Terrasoft.Button",
					"caption": caption,
					"click": {
						"bindTo": "onPublisherButtonClick"
					},
					"id": tag,
					"tag": tag,
					"markerValue": code,
					"imageConfig": {
						"source": this.Terrasoft.ImageSources.ENTITY_COLUMN,
						"params": {
							"schemaName": "SysImage",
							"columnName": "Data",
							"primaryColumnValue": imageId
						}
					},
					"classes": {
						"wrapperClass": ["publisherButton"],
						"imageClass": ["publisherButtonImage"],
						"textClass": ["publisherButtonLabel"]
					},
					"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.subscribeMessages();
			},

			/**
			 * Subscribes to messages of the module.
			 * @protected
			 */
			subscribeMessages: function() {
				this.sandbox.subscribe("RerenderModule", function(config) {
					if (this.viewModel) {
						this.render(this.Ext.get(config.renderTo));
						return true;
					}
				}, this, [this.sandbox.id]);
			}
		});

		return this.Terrasoft.MessagePublishersModule;
	});



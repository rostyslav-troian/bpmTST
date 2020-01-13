Terrasoft.configuration.Structures["CampaignDiagramToolsModule"] = {innerHierarchyStack: ["CampaignDiagramToolsModule"]};
define("CampaignDiagramToolsModule", ["CampaignDiagramToolsModuleResources", "CampaignLocalizableHelper",
		"CampaignEnums", "BaseNestedModule",
		"CampaignDraggableContainer"],
	function(resources, LocalizableHelper, CampaignEnums) {

		/**
		 * @class Terrasoft.configuration.CampaignDiagramToolsViewConfig
		 * ##### ############ ############ ############# ###### ###### ############ ########.
		 */
		Ext.define("Terrasoft.configuration.CampaignDiagramToolsViewConfig", {
			extend: "Terrasoft.BaseModel",
			alternateClassName: "Terrasoft.CampaignDiagramToolsViewConfig",

			/**
			 * ########## ############ ############# ###### ###### ############ ########.
			 * @protected
			 * @virtual
			 * @return {Object[]} ########## ############ ############# ###### ###### ############ ########.
			 */
			generate: function() {
				return {
					"name": "CampaignDiagramTools",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["campaign-diagram-tools-container"],
					"items": [
						{
							"name": "Row-1",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-caption"],
							"items": [
								{
									"name": "ToolsCaption",
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": resources.localizableStrings.ToolsCaption,
									"classes": {
										"labelClass": ["tools-caption"]
									}
								}
							]
						},
						{
							"name": "Row-2",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-icon"],
							"items": [
								{
									"name": "EmailToolIconDrag",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"className": "Terrasoft.CampaignDraggableContainer",
									"wrapClass": ["drag-icon-container"],
									"onDragDrop": {"bindTo": "onToolsIconDrop"},
									"tag": "Email",
									"items": [
										{
											"name": "EmailToolIcon",
											"getSrcMethod": "getEmailToolIconSrc",
											"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
											"onPhotoChange": Terrasoft.emptyFn,
											"classes": {
												"wrapClass": ["tools-icon"]
											}
										}
									]
								}
							]
						},
						{
							"name": "Row-4",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-icon"],
							"items": [
								{
									"name": "EventToolIconDrag",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"className": "Terrasoft.CampaignDraggableContainer",
									"wrapClass": ["drag-icon-container"],
									"onDragDrop": {"bindTo": "onToolsIconDrop"},
									"tag": "Event",
									"items": [
										{
											"name": "EventToolIcon",
											"getSrcMethod": "getEventToolIconSrc",
											"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
											"onPhotoChange": Terrasoft.emptyFn,
											"classes": {
												"wrapClass": ["tools-icon"]
											}
										}
									]
								}
							]
						},
						{
							"name": "Row-6",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-icon"],
							"items": [
								{
									"name": "LandingToolIconDrag",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"className": "Terrasoft.CampaignDraggableContainer",
									"wrapClass": ["drag-icon-container"],
									"onDragDrop": {"bindTo": "onToolsIconDrop"},
									"tag": "Landing",
									"items": [
										{
											"name": "LandingToolIcon",
											"getSrcMethod": "getLandingToolIconSrc",
											"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
											"onPhotoChange": Terrasoft.emptyFn,
											"classes": {
												"wrapClass": ["tools-icon"]
											}
										}
									]
								}
							]
						},
						{
							"name": "Row-8",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-icon"],
							"items": [
								{
									"name": "AudienceToolIconDrag",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"className": "Terrasoft.CampaignDraggableContainer",
									"wrapClass": ["drag-icon-container"],
									"onDragDrop": {"bindTo": "onToolsIconDrop"},
									"tag": "Audience",
									"items": [
										{
											"name": "AudienceToolIcon",
											"getSrcMethod": "getAudienceToolIconSrc",
											"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
											"onPhotoChange": Terrasoft.emptyFn,
											"classes": {
												"wrapClass": ["tools-icon"]
											}
										}
									]
								}
							]
						},
						{
							"name": "Row-10",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["tools-cell", "tools-cell-icon"],
							"items": [
								{
									"name": "CreateLeadToolIconDrag",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"className": "Terrasoft.CampaignDraggableContainer",
									"wrapClass": ["drag-icon-container"],
									"onDragDrop": {"bindTo": "onToolsIconDrop"},
									"tag": "CreateLead",
									"items": [
										{
											"name": "CreateLeadToolIcon",
											"getSrcMethod": "getCreateLeadToolIconSrc",
											"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
											"onPhotoChange": Terrasoft.emptyFn,
											"classes": {
												"wrapClass": ["tools-icon"]
											}
										}
									]
								}
							]
						}
					]
				};
			}
		});

		/**
		 * @class Terrasoft.configuration.CampaignDiagramToolsViewModel
		 * ##### ###### ###### ############ ########.
		 */
		Ext.define("Terrasoft.configuration.CampaignDiagramToolsViewModel", {
			extend: "Terrasoft.BaseModel",
			alternateClassName: "Terrasoft.CampaignDiagramToolsViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			onRender: Ext.emptyFn,

			/**
			 * ############## ######### ######## ######.
			 * @protected
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback
			 */
			init: function(callback, scope) {
				callback.call(scope);
			},

			/**
			 * ########## URL-##### ###### ########.
			 * @protected
			 * @return {String} URL-#####.
			 */
			getEmailToolIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(LocalizableHelper.localizableImages.StepTypeEmailToolImage);
			},

			/**
			 * ########## URL-##### ###### ##########.
			 * @protected
			 * @return {String} URL-#####.
			 */
			getEventToolIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(LocalizableHelper.localizableImages.StepTypeEventToolImage);
			},

			/**
			 * ########## URL-##### ###### #######.
			 * @protected
			 * @return {String} URL-#####.
			 */
			getLandingToolIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(LocalizableHelper.localizableImages.StepTypeLandingToolImage);
			},

			/**
			 * ########## URL-##### ###### #########.
			 * @protected
			 * @return {String} URL-#####.
			 */
			getAudienceToolIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(LocalizableHelper.localizableImages.StepTypeAudienceToolImage);
			},

			/**
			 * ########## URL-##### ###### ####### ###.
			 * @protected
			 * @return {String} URL-#####.
			 */
			getCreateLeadToolIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(LocalizableHelper.localizableImages.StepTypeCreateLeadImage);
			},

			/**
			 * ######### ####### drop ########.
			 * @protected
			 * @param {Object} event ###.
			 */
			onToolsIconDrop: function(event) {
				var config = {nodes: []};
				var node = CampaignEnums["GetDefault" + event.element.tag + "Node"]();
				node.offsetX = event.localX;
				node.offsetY = event.localY;
				config.nodes.push(node);
				this.sandbox.publish("ToolIconDropped", config, [this.sandbox.id]);
			}
		});

		/**
		 * @class Terrasoft.configuration.CampaignDiagramToolsModule
		 * ###### ###### ############ ########.
		 */
		Ext.define("Terrasoft.configuration.CampaignDiagramToolsModule", {
			extend: "Terrasoft.BaseNestedModule",
			alternateClassName: "Terrasoft.CampaignDiagramToolsModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: false,

			/**
			 * ### ###### ###### ############# ### ###### ##########.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.CampaignDiagramToolsViewModel",

			/**
			 * ### ##### ########## ############ ############# ###### ##########.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.CampaignDiagramToolsViewConfig",

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ####### ######### ###### Terrasoft.ViewGenerator.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.ViewGenerator} ########## ###### Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return Ext.create(this.viewGeneratorClass);
			},

			/**
			 * ####### ############ ############# ########## ######.
			 * @protected
			 * @virtual
			 * param {Object} config ###### ############.
			 * param {Function} callback ####### ######### ######.
			 * param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
			 * @return {Object[]} ########## ############ ############# ########## ######.
			 */
			buildView: function(config, callback, scope) {
				var viewGenerator = this.createViewGenerator();
				var viewClass = Ext.create(this.viewConfigClassName);
				var schema = {
					viewConfig: [viewClass.generate(config)]
				};
				var viewConfig = Ext.apply({
					schema: schema
				}, config);
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				var generatorConfig = Terrasoft.deepClone(this.moduleConfig) || {};
				generatorConfig.viewModelClass = this.viewModelClass;
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
				callback.call(scope);
			}
		});

		return Terrasoft.CampaignDiagramToolsModule;
	});



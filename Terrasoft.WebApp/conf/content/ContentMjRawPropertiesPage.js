Terrasoft.configuration.Structures["ContentMjRawPropertiesPage"] = {innerHierarchyStack: ["ContentMjRawPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentMjRawPropertiesPageStructure', ['ContentMjRawPropertiesPageResources'], function(resources) {return {schemaUId:'12e451a5-6fa4-4f75-aa4a-9837f8b956b4',schemaCaption: "ContentMjRawPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentMjRawPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("ContentMjRawPropertiesPage", ["ContentMjRawPropertiesPageResources",
		 "SourceCodeEditEnums", "SourceCodeEdit", "css!ContentMjRawPropertiesPageCSS"],
		 function(resources, sourceCodeEditEnums) {
	return {
		attributes: {
			/**
			 * HTML content.
			 */
			"Content": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "",
				onChange: "_onContentChanged"
			},

			/**
			 * Source code edit language. See SourceCodeEditEnums module.
			 */
			"Language": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: sourceCodeEditEnums.Language.HTML
			},

			/**
			 * Flag that indicates whether whitespaces in source code editor is visible.
			 */
			"ShowWhitespaces": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Flag that indicates whether source code editor is expanded.
			 */
			"IsExpanded": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Source code edit wrap container marker.
			 */
			"HtmlEditContainerMarkerValue": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * @private
			 */
			_onContentChanged: function(model, value) {
				this.$Config.Content = value;
				if (!this.$IsExpanded) {
					this.save();
				}
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				this.set("HtmlEditContainerMarkerValue", "html-edit-container");
				if (config) {
					this.$Content = config.Content;
				}
			},

			/**
			 * Uploads html file.
			 * @protected
			 * @param {Object|Object[]} file Photo.
			 */
			onFileSelected: function(file) {
				if (!file || !Ext.isArray(file)) {
					this.set("Content", "");
					return;
				}
				FileAPI.readAsText(file[0], null, function(e) {
					if (e.type === "load") {
						var bodyHtml = e.result;
						var bodyRegex = /<body.*?>([\s\S]*)<\/body>/;
						if (bodyRegex.test(e.result)) {
							bodyHtml = bodyRegex.exec(bodyHtml)[1];
						}
						this.set("Content", bodyHtml);
					}
				}.bind(this));
			},

			/**
			 * ShowWhitespacesButton click handler. Shows/hides whitespaces in source code editor.
			 * @private
			 */
			onShowWhitespacesButtonClick: function() {
				var showWhitespaces = this.$ShowWhitespaces;
				this.set("ShowWhitespaces", !showWhitespaces);
			},

			/**
			 * ExpandButton click handler. Expand/collapse source code editor.
			 * @private
			 */
			onExpandButtonClick: function() {
				var isExpanded = this.$IsExpanded;
				var markerValue = "html-edit-container" + (isExpanded ? "" : "-expanded");
				this.set("HtmlEditContainerMarkerValue", markerValue);
				if (isExpanded) {
					this.save();
				}
				this.set("IsExpanded", !isExpanded);
			},

			/**
			 * Returns image config for expand button. If IsExpanded attribute sets to true, returns
			 * collapse image config, else returns expand image.
			 * @return {Object} Image config. For config properties see {@link Terrasoft.ImageUrlBuilder} class.
			 */
			getExpandButtonImageConfig: function() {
				if (this.$IsExpanded) {
					return resources.localizableImages.CollapseImage;
				}
				return resources.localizableImages.ExpandImageFull;
			},

			/**
			 * Returns hint for ExpandButton. If IsExpanded attribute sets to true, returns hint for expanded mode,
			 * else returns hint for collapsed mode.
			 * @return {String} Expand button hint.
			 */
			getExpandButtonHint: function() {
				if (this.$IsExpanded) {
					return resources.localizableStrings.CollapseButtonHint;
				}
				return resources.localizableStrings.ExpandButtonHint;
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-mjraw-properties-container"]
				}
			},
			{
				"operation": "insert",
				"name": "BackgroundContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["background-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditMaskContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["source-code-edit-mask-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditExpandableContainer",
				"parentName": "ContentPropertiesContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"markerValue": "$HtmlEditContainerMarkerValue",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditContainer",
				"parentName": "SourceCodeEditExpandableContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["source-code-edit-container"]
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditToolsGrid",
				"parentName": "SourceCodeEditContainer",
				"propertyName": "items",
				"values": {
					"items": [],
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditToolsContainer",
				"parentName": "SourceCodeEditToolsGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"wrapClass": ["source-code-edit-tools-container"]
				}
			},
			{
				"operation": "insert",
				"name": "UploadFileButton",
				"parentName": "SourceCodeEditToolsContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": "$Resources.Images.UploadFileImageSearch",
					"markerValue": "file-upload-button",
					"fileUpload": true,
					"fileTypeFilter": Ext.isGecko ? [".html", ".htm"] : ["text/html"],
					"filesSelected": "$onFileSelected",
					"classes": {
						"wrapperClass": ["source-code-edit-tool-button"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeViewToolsContainer",
				"parentName": "SourceCodeEditToolsGrid",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"wrapClass": ["source-code-view-tools-container"]
				}
			},
			{
				"operation": "insert",
				"name": "ShowWhitespacesButton",
				"parentName": "SourceCodeViewToolsContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": "$Resources.Images.ShowWhitespacesImage",
					"hint": "$Resources.Strings.ShowWhitespacesButtonHint",
					"classes": {
						"wrapperClass": ["source-code-view-tool-button", "show-whitespaces-button"]
					},
					"click": "$onShowWhitespacesButtonClick",
					"pressed": {
						bindTo: "ShowWhitespaces",
						converter: "invertBooleanValue"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ExpandButton",
				"parentName": "SourceCodeViewToolsContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"hint": "$getExpandButtonHint",
					"imageConfig": "$getExpandButtonImageConfig",
					"classes": {
						"wrapperClass": ["source-code-view-tool-button", "expand-button"]
					},
					"click": "$onExpandButtonClick"
				}
			},
			{
				"operation": "insert",
				"name": "SourceCodeEditControlWrapContainer",
				"parentName": "SourceCodeEditContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["source-code-edit-control-wrap-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Content",
				"parentName": "SourceCodeEditControlWrapContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"generator": "SourceCodeEditGenerator.generate",
					"language": "$Language",
					"printMargin": null,
					"markerValue": "SourceCodeEdit",
					"theme": sourceCodeEditEnums.Theme.CRIMSON_EDITOR,
					"showWhitespaces": "$ShowWhitespaces",
					"expandEditor": "$onExpandButtonClick"
				}
			}
		]
	};
});



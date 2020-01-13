Terrasoft.configuration.Structures["SourceCodeEditPage"] = {innerHierarchyStack: ["SourceCodeEditPage"]};
define('SourceCodeEditPageStructure', ['SourceCodeEditPageResources'], function(resources) {return {schemaUId:'3b77f4c4-3ba2-4bcc-b362-c07ef1a5f6c8',schemaCaption: "Source code edit page schema", parentSchemaName: "", schemaName:'SourceCodeEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Source code edit page schema.
 * Parent: BaseSchemaViewModel
 */
define("SourceCodeEditPage", ["terrasoft", "SourceCodeEditEnums", "SourceCodeEditPageResources", "SourceCodeEdit"],
	function(Terrasoft, sourceCodeEditEnums) {
		return {
			messages: {
				/**
				 * @message GetValue
				 * Returns source code edit value.
				 */
				"GetValue": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message GetSourceCodeData
				 * Receive source code edit data. As result expect following object:
				 *  * sourceCode {String} Initial source code value.
				 *  * dataItemMarker {String} Source code edit marker value.
				 *  * caption {String} Caption to display in expand mode.
				 *  * name {String} Editor name. Optional.
				 *  * showCaptionInCollapsedMode {Boolean} Flag that indicates whether caption is visible
				 *  in collapsed mode. Optional.
				 *  Default is false.
				 *  * hideSearchButton {Boolean} Flag that indicates whether search button is hidden. Optional.
				 *  Default is false.
				 *  * hideWhitespaceButton {Boolean} Flag that indicates whether whitespace button is hidden. Optional.
				 *  Default is false.
				 *  * hideExpandButton {Boolean} Flag that indicates whether expand button is hidden. Optional.
				 *  Default is false.
				 *  * readonly {Boolean} Flag that indicates whether source coed editor is readonly. Optional.
				 *  Default is false.
				 *  * enabled {Boolean} Flag that indicates whether source coed editor is enabled. Optional.
				 *  Default is true.
				 *  * language {String} Source code editor language. See SourceCodeEditEnums module. Optional.
				 *  Default is 'javascript'.
				 *  * theme {String} Source code editor theme. See SourceCodeEditEnums module. Optional.
				 *  Default is 'crimson_editor'.
				 */
				"GetSourceCodeData": {
					"direction": Terrasoft.MessageDirectionType.PUBLISH,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message SourceCodeChanged
				 * Returns current source code edit value.
				 */
				"SourceCodeChanged": {
					"direction": Terrasoft.MessageDirectionType.PUBLISH,
					"mode": Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				/**
				 * Source code.
				 */
				"SourceCode": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Source code edit marker value.
				 */
				"SourceCodeEditMarkerValue": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "SourceCodeEdit"
				},

				/**
				 * Source code edit tag. Used to communicate with owner module.
				 */
				"Tag": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Source code tooltip message
				 */
				"TooltipMessage": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Source code edit language. See SourceCodeEditEnums module.
				 */
				"Language": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Source code edit theme. See SourceCodeEditEnums module.
				 */
				"Theme": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether caption is visible in collapsed mode.
				 */
				"IsCaptionVisibleInCollapsedMode": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether source code edit is readonly.
				 */
				"IsSourceCodeReadonly": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether source code edit is enabled.
				 */
				"IsSourceCodeEnabled": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Caption to display in expanded mode.
				 */
				"Caption": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Source code edit wrap container marker value.
				 */
				"MainContainerMarkerValue": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether search button is visible.
				 */
				"IsSearchButtonVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether search box is visible.
				 */
				"IsSearchBoxVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether whitespaces in source code editor is visible.
				 */
				"ShowWhitespaces": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether show whitespace button is visible.
				 */
				"IsWhitespaceButtonVisible": {
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
				 * Flag that indicates whether expand button is visible.
				 */
				"IsExpandedButtonVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether tooltip info button is visible or not.
				 */
				"IsTooltipInfoButtonVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			methods: {
				/**
				 * @inheritdoc BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						if (this.destroyed) {
							callback.call(scope || this);
							return;
						}
						var sandbox = this.sandbox;
						var messageTags = [sandbox.id];
						sandbox.subscribe("GetValue", this.onGetSourceCodeValue, this, messageTags);
						var tag = this.get("Tag");
						var sourceCodeData = this.sandbox.publish("GetSourceCodeData", tag, messageTags);
						var defaultSourceCodeSettings = this.getDefaultSourceCodeSettings();
						this.Ext.applyIf(sourceCodeData, defaultSourceCodeSettings);
						this.setSourceCodeEditData(sourceCodeData);
						this.set("MainContainerMarkerValue", "source-code-edit-page");
						this.on("change:SourceCode", this.onSourceCodeChange, this);
						this.set("TooltipMessage", this.get("Resources.Strings.UseFlowEngineBodyHint"));
						callback.call(scope || this);
					}.bind(this), scope || this]);
				},

				/**
				 * Sets source code edit data.
				 * @protected
				 * @param {Object} sourceCodeData Source code data.
				 * @param {String} sourceCodeData.sourceCode Source code value.
				 * @param {String} sourceCodeData.dataItemMarker Source code edit marker value.
				 * @param {String} sourceCodeData.language Source code language.
				 * @param {String} sourceCodeData.theme Source code theme.
				 * @param {String} sourceCodeData.caption Caption to display in expand mode.
				 * @param {Boolean} sourceCodeData.showCaptionInCollapsedMode Flag that indicates whether caption
				 * is visible in collapsed mode.
				 * @param {Boolean} sourceCodeData.hideSearchButton Flag that indicates whether search button is hidden.
				 * @param {Boolean} sourceCodeData.hideWhitespaceButton Flag that indicates whether whitespace button
				 * is hidden.
				 * @param {Boolean} sourceCodeData.hideExpandButton Flag that indicates whether expand button is hidden.
				 * @param {Boolean} sourceCodeData.readonly Flag that indicates whether source coed editor is readonly.
				 * @param {Boolean} sourceCodeData.enabled Flag that indicates whether source coed editor is enabled.
				 */
				setSourceCodeEditData: function(sourceCodeData) {
					this.set("SourceCode", sourceCodeData.sourceCode);
					if (sourceCodeData.dataItemMarker) {
						this.set("SourceCodeEditMarkerValue", sourceCodeData.dataItemMarker);
					}
					this.set("Language", sourceCodeData.language);
					this.set("Theme", sourceCodeData.theme);
					this.set("Caption", sourceCodeData.caption);
					this.set("IsSearchButtonVisible", (sourceCodeData.hideSearchButton !== true));
					this.set("IsWhitespaceButtonVisible", (sourceCodeData.hideWhitespaceButton !== true));
					this.set("IsExpandedButtonVisible", (sourceCodeData.hideExpandButton !== true));
					this.set("IsSourceCodeReadonly", (sourceCodeData.readonly === true));
					this.set("IsSourceCodeEnabled", (sourceCodeData.enabled !== false));
					this.set("IsCaptionVisibleInCollapsedMode", (sourceCodeData.showCaptionInCollapsedMode === true));
				},

				/**
				 * Returns default source code edit settings.
				 * @protected
				 * @return {Object} Source code edit settings.
				 * @return {Boolean} return.showCaptionInCollapsedMode Caption is visible in collapsed mode.
				 * Default false.
				 * @return {Boolean} return.hideSearchButton Search button hidden. Default false.
				 * @return {Boolean} return.hideWhitespaceButton ShowWhitespace button hidden. Default false.
				 * @return {Boolean} return.hideExpandButton Expand button hidden. Default false.
				 * @return {Boolean} return.readonly Editor is readonly. Default false.
				 * @return {Boolean} return.enabled Editor is enabled. Default true.
				 * @return {Boolean} return.language Editor language. Default is 'javascript'.
				 * @return {Boolean} return.theme Editor theme. Default is 'crimson_editor'.
				 */
				getDefaultSourceCodeSettings: function() {
					return {
						hideSearchButton: false,
						hideWhitespaceButton: false,
						hideExpandButton: false,
						showCaptionInCollapsedMode: false,
						readonly: false,
						enabled: true,
						language: sourceCodeEditEnums.Language.JAVASCRIPT,
						theme: sourceCodeEditEnums.Theme.CRIMSON_EDITOR
					};
				},

				/**
				 * GetValue message handler. Returns current source code value.
				 * @private
				 * @return {Object} Source code data.
				 * @return {String} return.tag Source code tag.
				 * @return {String} return.value Source code value.
				 */
				onGetSourceCodeValue: function() {
					return {
						tag: this.get("Tag"),
						value: this.get("SourceCode")
					};
				},

				/**
				 * SourceCode attribute change handler. Publish SourceCodeChanged message.
				 * @private
				 */
				onSourceCodeChange: function() {
					var sandbox = this.sandbox;
					var tag = this.get("Tag");
					sandbox.publish("SourceCodeChanged", {
						tag: tag,
						sourceCode: this.get("SourceCode")
					}, [sandbox.id]);
				},

				/**
				 * ShowFindWindowButton click handler. Shows/hides search box.
				 * @private
				 */
				onSearchButtonClick: function() {
					var searchBoxVisible = this.get("IsSearchBoxVisible");
					this.set("IsSearchBoxVisible", !searchBoxVisible);
				},

				/**
				 * ShowWhitespacesButton click handler. Shows/hides whitespaces in source code editor.
				 * @private
				 */
				onShowWhitespacesButtonClick: function() {
					var showWhitespaces = this.get("ShowWhitespaces");
					this.set("ShowWhitespaces", !showWhitespaces);
				},

				/**
				 * ExpandButton click handler. Expand/collapse source code editor.
				 * @private
				 */
				onExpandButtonClick: function() {
					var isExpanded = this.get("IsExpanded");
					var markerValue = "source-code-edit-page" + (isExpanded ? "" : "-expand");
					this.set("MainContainerMarkerValue", markerValue);
					this.set("IsExpanded", !isExpanded);
				},

				/**
				 * Returns image config for expand button. If IsExpanded attribute sets to true, returns
				 * collapse image config, else returns expand image.
				 * @return {Object} Image config. For config properties see {@link Terrasoft.ImageUrlBuilder} class.
				 */
				getExpandButtonImageConfig: function() {
					if (this.get("IsExpanded")) {
						return this.get("Resources.Images.CollapseImage");
					}
					return this.get("Resources.Images.ExpandImage");
				},

				/**
				 * Returns hint for ExpandButton. If IsExpanded attribute sets to true, returns hint for expanded mode,
				 * else returns hint for collapsed mode.
				 * @return {String} Expand button hint.
				 */
				getExpandButtonHint: function() {
					if (this.get("IsExpanded")) {
						return this.get("Resources.Strings.CollapseButtonHint");
					}
					return this.get("Resources.Strings.ExpandButtonHint");
				},

				/**
				 * Returns source code edit container marker value. Use for hide tools panel if each tool button
				 * or caption is hidden.
				 * @return {String} Source code edit container marker value.
				 */
				getSourceCodeEditContainerMarkerValue: function() {
					var isCaptionVisibleInCollapsedMode = this.get("IsCaptionVisibleInCollapsedMode");
					var toolsVisible = (this.get("IsSearchButtonVisible") || this.get("IsWhitespaceButtonVisible") ||
						this.get("IsExpandedButtonVisible") || isCaptionVisibleInCollapsedMode);
					var markerValue = [];
					markerValue.push(toolsVisible ? "" : "source-code-edit-container-tools-hidden");
					if (isCaptionVisibleInCollapsedMode) {
						markerValue.push("caption-visible");
					}
					return markerValue.join(" ");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "SourceCodeEditMainContainer",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["source-code-edit-page-container"],
						"markerValue": {bindTo: "MainContainerMarkerValue"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BackgroundContainer",
					"parentName": "SourceCodeEditMainContainer",
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
					"parentName": "SourceCodeEditMainContainer",
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
					"parentName": "SourceCodeEditMainContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["source-code-edit-expandable-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SourceCodeEditContainer",
					"parentName": "SourceCodeEditExpandableContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["source-code-edit-container"]},
						"markerValue": {bindTo: "getSourceCodeEditContainerMarkerValue"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SourceCodeEditContainer",
					"propertyName": "items",
					"name": "SourceCodeEditToolsContainer",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["source-code-edit-tools-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SourceCodeEditToolsContainer",
					"propertyName": "items",
					"name": "ScriptTaskExpandLabelContainer",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ScriptTaskExpandLabelContainer",
					"propertyName": "items",
					"name": "ScriptTaskExpandLabel",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "Caption"},
						"classes": {"labelClass": ["source-code-caption"]}
					}
				},
				{
					"operation": "insert",
					"parentName": "ScriptTaskExpandLabelContainer",
					"propertyName": "items",
					"name": "TooltipMessageInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {bindTo: "TooltipMessage"},
						"controlConfig": {
							"visible": {bindTo: "IsTooltipInfoButtonVisible"},
							"classes": {"wrapperClass": "tooltip-message-info-button"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ShowFindWindowButton",
					"parentName": "SourceCodeEditToolsContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"hint": {bindTo: "Resources.Strings.ShowFindWindowButtonHint"},
						"imageConfig": {bindTo: "Resources.Images.SearchImage"},
						"classes": {"wrapperClass": ["source-code-edit-tool-button", "find-button"]},
						"click": {bindTo: "onSearchButtonClick"},
						"visible": {bindTo: "IsSearchButtonVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "ShowWhitespacesButton",
					"parentName": "SourceCodeEditToolsContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {bindTo: "Resources.Images.ShowWhitespacesImage"},
						"hint": {bindTo: "Resources.Strings.ShowWhitespacesButtonHint"},
						"classes": {"wrapperClass": ["source-code-edit-tool-button", "show-whitespaces-button"]},
						"click": {bindTo: "onShowWhitespacesButtonClick"},
						"pressed": {
							bindTo: "ShowWhitespaces",
							converter: "invertBooleanValue"
						},
						"visible": {bindTo: "IsWhitespaceButtonVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "ExpandButton",
					"parentName": "SourceCodeEditToolsContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"hint": {bindTo: "getExpandButtonHint"},
						"imageConfig": {bindTo: "getExpandButtonImageConfig"},
						"classes": {"wrapperClass": ["source-code-edit-tool-button", "expand-button"]},
						"click": {bindTo: "onExpandButtonClick"},
						"visible": {bindTo: "IsExpandedButtonVisible"}
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
						"classes": {"wrapClassName": ["source-code-edit-control-wrap-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SourceCode",
					"parentName": "SourceCodeEditControlWrapContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"generator": "SourceCodeEditGenerator.generate",
						"markerValue": {bindTo: "SourceCodeEditMarkerValue"},
						"readonly": {bindTo: "IsSourceCodeReadonly"},
						"enabled": {bindTo: "IsSourceCodeEnabled"},
						"language": {bindTo: "Language"},
						"theme": {bindTo: "Theme"},
						"searchVisible": {bindTo: "IsSearchBoxVisible"},
						"showWhitespaces": {bindTo: "ShowWhitespaces"},
						"expandEditor": {bindTo: "onExpandButtonClick"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);



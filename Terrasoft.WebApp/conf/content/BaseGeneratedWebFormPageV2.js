Terrasoft.configuration.Structures["BaseGeneratedWebFormPageV2"] = {innerHierarchyStack: ["BaseGeneratedWebFormPageV2WebForm", "BaseGeneratedWebFormPageV2"], structureParent: "BaseModulePageV2"};
define('BaseGeneratedWebFormPageV2WebFormStructure', ['BaseGeneratedWebFormPageV2WebFormResources'], function(resources) {return {schemaUId:'424d9da7-8f97-4524-8089-e64620d8b3fa',schemaCaption: "Edit page, landing", parentSchemaName: "BaseModulePageV2", schemaName:'BaseGeneratedWebFormPageV2WebForm',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseGeneratedWebFormPageV2Structure', ['BaseGeneratedWebFormPageV2Resources'], function(resources) {return {schemaUId:'11a51998-b109-4113-bce3-36186b101ced',schemaCaption: "Edit page, landing", parentSchemaName: "BaseGeneratedWebFormPageV2WebForm", schemaName:'BaseGeneratedWebFormPageV2',parentSchemaUId:'424d9da7-8f97-4524-8089-e64620d8b3fa',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseGeneratedWebFormPageV2WebForm",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseGeneratedWebFormPageV2WebFormResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseGeneratedWebFormPageV2WebForm", ["BaseGeneratedWebFormPageV2Resources", "TooltipUtilities", "MultilineLabel",
		"css!MultilineLabel", "css!BaseGeneratedWebFormPageV2CSS"],
	function() {
		return {
			entitySchemaName: "GeneratedWebForm",
			mixins: {
				TooltipUtilities: "Terrasoft.TooltipUtilities"
			},
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "GeneratedWebFormFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "GeneratedWebForm"
					}
				},
				ObjectDefaults: {
					schemaName: "LandingObjectDefaultsDetailV2",
					entitySchemaName: "LandingObjectDefaults",
					filter: {
						masterColumn: "Id",
						detailColumn: "Landing"
					}
				}
			}/**SCHEMA_DETAILS*/,
			properties: {
				/**
				 * Landing's object schema.
				 */
				objectSchema: null,
				/**
				 * Custom columns of object schema.
				 */
				objectSchemaCustomColumns: null,
				/**
				 * External service URL.
				 */
				serviceUrl: Terrasoft.workspaceBaseUrl +
					"/ServiceModel/GeneratedObjectWebFormService.svc/SaveWebFormObjectData"
			},
			attributes: {
				/**
				 * Landing's object schema Uid.
				 */
				"TypeSchemaUId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					columnPath: "Type.SchemaUid"
				},
				/**
				 * Url API.
				 */
				"ApiUrl": {
					"value": "",
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Service Url.
				 */
				"ServiceUrl": {
					"value": "",
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Template script.
				 */
				"SubmitScript": {
					"value": "onSubmit=\"createObject(); return false\"",
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Prefix for object name
				 */
				"SchemaNamePrefix": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Template text of the script.
				 */
				"TemplateScript": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @inheritdoc BasePageV2#addSectionDesignerViewOptions
				 * @overridden
				 */
				addSectionDesignerViewOptions: Terrasoft.emptyFn,

				/**
				 * Save changes to DB.
				 * @inheritdoc BasePageV2#save
				 * @overridden
				 */
				save: function() {
					this.callParent(arguments);
					this.initializeTemplateScript();
				},

				/**
				 * Method which returns object which contains functions representing macros name
				 * and transformation realization.
				 * @return {object}
				 */
				getMacrosList: function() {
					return {
						"##apiUrl##": function() {
							var value = this.get("ApiUrl");
							if (!Ext.isEmpty(value)) {
								return "\"" + value + "\"";
							}
							return "\"\"";
						},
						"##landingId##": function() {
							var value = this.get("Id");
							if (!Ext.isEmpty(value)) {
								return "\"" + value + "\"";
							}
							return "\"\"";
						},
						"##serviceUrl##": function() {
							var value = this.get("ServiceUrl");
							if (!Ext.isEmpty(value)) {
								return "\"" + value + "\"";
							}
							return "\"\"";
						},
						"##redirectUrl##": function() {
							var value = this.get("ReturnURL");
							if (!Ext.isEmpty(value)) {
								return "\"" + value + "\"";
							}
							return "\"\"";
						},
						"##customColumns##": function() {
							var result = "";
							var customColumns = this.objectSchemaCustomColumns;
							var extStr = this.Ext.String;
							if (!this.Ext.isEmpty(customColumns)) {
								var columnTemplate = this.get("Resources.Strings.UserDefinedColumnTemplate");
								var lastColumn = _.last(customColumns);
								this.Terrasoft.each(customColumns, function(column) {
									var comma = (column === lastColumn) ? "" : ",";
									result += extStr.format(columnTemplate, column.name, column.caption, comma);
								});
							}
							return result;
						},
						"##customColumnsComma##": function() {
							var customColumns = this.objectSchemaCustomColumns;
							var result = ",";
							if (this.Ext.isEmpty(customColumns)) {
								result = "";
							}
							return result;
						}
					};
				},

				/**
				 * Replaces the macros in the template text.
				 * @param {String} text Template text.
				 * @returns {String} Text with substituted values.
				 */
				replaceMacrosInText: function(text) {
					var macrosList = this.getMacrosList();
					for (var macros in macrosList) {
						if (Ext.isFunction(macrosList[macros])) {
							var value = macrosList[macros].apply(this);
							text = text.split(macros).join(value);
						}
					}
					return text;
				},

				/**
				 * Initializes template.
				 * @private
				 */
				initializeTemplateScript: function() {
					Terrasoft.SysSettings.querySysSettings(["ApiUrl", "ServiceUrl", "SchemaNamePrefix"],
						function(settings) {
							var serviceUrl = settings.ServiceUrl || this.serviceUrl;
							this.set("ServiceUrl", serviceUrl);
							this.set("ApiUrl", settings.ApiUrl);
							this.set("SchemaNamePrefix", settings.SchemaNamePrefix);
							this.initializeObjectCustomColumns(function() {
								var scriptTemplate = this.getScriptTemplateFromResources();
								scriptTemplate = this.replaceMacrosInText(scriptTemplate);
								this.set("TemplateScript", scriptTemplate);
							}, this);
						}, this);
				},

				/**
				 * Initializes custom columns.
				 * @private
				 * @param {function} callback The callback function.
				 * @param scope Current scope.
				 */
				initializeObjectCustomColumns: function(callback, scope) {
					this.Terrasoft.require([this.objectSchema.name], function(entitySchema) {
						var customColumns = [];
						var schemaNamePrefix = this.get("SchemaNamePrefix");
						if(entitySchema && entitySchema.columns && schemaNamePrefix) {
							var extStr = this.Ext.String;
							this.Terrasoft.each(entitySchema.columns, function(column) {
								var columnName = column.name;
								if (extStr.startsWith(columnName, schemaNamePrefix)) {
									var caption = column.caption && column.caption;
									customColumns.push({
										name: columnName,
										caption: caption
									});
								}
							});
						}
						this.objectSchemaCustomColumns = customColumns;
						this.Ext.callback(callback, scope);
					}, scope);
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (this.isNewMode()) {
						this.getLandingType(this.initObjectSchema, this);
					} else {
						this.initObjectSchema(null);
					}
				},

				/**
				 * Gets landing type entity
				 * @private
				 * @param {function} callback The callback function.
				 * @param scope Current scope.
				 */
				getLandingType: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "LandingType"
					});
					esq.addColumn("SchemaUid");
					var type = this.get("Type");
					if (type && type.value) {
						esq.getEntity(type.value, callback, scope);
					}
				},

				/**
				 * Initializes objectSchema by TypeSchemaUId
				 * @private
				 * @param {object} response Response from entity schema query.
				 */
				initObjectSchema: function(response) {
					var objectSchemaUid = null;
					if (response && response.success) {
						var entity = response.entity;
						var schemaUid = entity.get("SchemaUid");
						objectSchemaUid = schemaUid.value;
					} else {
						var landing = this.get("TypeSchemaUId");
						objectSchemaUid = landing.value;
					}
					this.Terrasoft.EntitySchemaManager.getInstanceByUId(
						objectSchemaUid, this.onGetTypeEntitySchema, this);
				},

				/**
				 * Sets objectSchema and initializes TemplateScript
				 * @private
				 * @param {Terrasoft.EntitySchema} objectSchema The entity schema.
				 */
				onGetTypeEntitySchema: function(objectSchema) {
					this.objectSchema = objectSchema;
					this.initializeTemplateScript();
				},

				/**
				 * Handles click on FAQ buttons to open Academy urls.
				 * @private
				 */
				onFaqClick: function(btnArgA, btnArgB, btnArgC, linkTag) {
					this.onTipLinkClick(linkTag);
				},

				/**
				 * Returns FAQ photo image url.
				 * @private
				 * @return {String} Photo image url.
				 */
				getFaqIcon: function() {
					var resourceImage = this.get("Resources.Images.FAQIcon");
					return this.Terrasoft.ImageUrlBuilder.getUrl(resourceImage);
				},

				/**
				 * Creates link object.
				 * @returns {Object} Link object.
				 */
				getLink: function(value) {
					if (Terrasoft.isUrl(value)) {
						return {
							url: value,
							caption: value
						};
					}
					return {};
				},

				/**
				 * Creates link object for the return url.
				 * @returns {Object} Link object.
				 */
				getReturnURLLink: function() {
					var value = this.get("ReturnURL");
					if (!Ext.isEmpty(value)) {
						return this.getLink(value);
					}
					return {};
				},

				/**
				 * Returns script template string for landing page.
				 * @protected
				 * @returns {String} Landing page template script.
				 */
				getScriptTemplateFromResources: function() {
					var scriptTemplate;
					if (this.getIsFeatureEnabled("OutboundCampaign")) {
						scriptTemplate = this.get("Resources.Strings.TogledScriptTemplate");
					} else {
						scriptTemplate = this.get("Resources.Strings.ScriptTemplate");
					}
					return scriptTemplate;
				},

				/**
				 * Handles clicks for the return url.
				 * @returns {Boolean} Use default click handler.
				 */
				onReturnLinkClick: function() {
					var value = this.get("ReturnURL");
					if (!Ext.isEmpty(value)) {
						window.open(value, "_blank");
					}
					return false;
				},

				/**
				 * Returns true if OutboundCampaign feature enabled.
				 * @return {Boolean}
				 */
				getIsOutboundCampaignFeatureEnabled: function() {
					return this.getIsFeatureEnabled("OutboundCampaign");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "DefaultsTab",
					"index": 2,
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.ObjectDefaultsCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs"
				},
				{
					"name": "ObjectDefaults",
					"operation": "insert",
					"parentName": "DefaultsTab",
					"propertyName": "items",
					"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
				},
				{
					"name": "Name",
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						}
					}
				},
				{
					"name": "ExternalURL",
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ExternalURLTipCaption"}
						}
					}
				},
				{
					"name": "Description",
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "State",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "TabSiteIntegration",
					"index": 0,
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.IntegrationFormTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs"
				},
				{
					"name": "NotesTab",
					"index": 1,
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.NotesTabCaption"
						},
						"items": []
					}
				},
				{
					"name": "ControlGroupRedirect",
					"operation": "insert",
					"parentName": "TabSiteIntegration",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.AfterFormFillControlGroupCaption"
						},
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["detail landing-redirect-control-group"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "RedirectInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.RedirectionUrlTipCaption"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "webform-info-button-control-group",
								"imageClass": "webform-info-button-image"
							}
						}
					},
					"parentName": "ControlGroupRedirect",
					"propertyName": "tools",
					"index": 1
				},
				{
					"name": "ReturnURL",
					"operation": "insert",
					"parentName": "ControlGroupRedirect",
					"propertyName": "items",
					"values": {
						"hasClearIcon": true,
						"showValueAsLink": true,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"controlConfig": {
							"href": {"bindTo": "getReturnURLLink"},
							"linkclick": {"bindTo": "onReturnLinkClick"}
						}
					}
				},
				{
					"name": "ControlGroupPlaceForm",
					"operation": "insert",
					"parentName": "TabSiteIntegration",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.HowToPlaceFormControlGroupCaption"
						},
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["detail place-form-control-group"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "PlaceFormInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.PlaceFormTipCaption"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "webform-info-button-control-group",
								"imageClass": "webform-info-button-image"
							}
						}
					},
					"parentName": "ControlGroupPlaceForm",
					"propertyName": "tools",
					"index": 1
				},
				{
					"name": "ControlGroupSubmitCode",
					"operation": "insert",
					"parentName": "TabSiteIntegration",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.SubmitScriptControlGroupCaption"
						},
						"tools": [],
						"items": [],
						"controlConfig": {
							"classes": ["detail place-form-control-group"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SubmitCodeInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.SubmitScriptTipCaption"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "webform-info-button-control-group",
								"imageClass": "webform-info-button-image"
							}
						}
					},
					"parentName": "ControlGroupSubmitCode",
					"propertyName": "tools",
					"index": 1
				},
				{
					"name": "SubmitScriptHelpTextLabel",
					"operation": "insert",
					"parentName": "ControlGroupSubmitCode",
					"propertyName": "items",
					"values": {
						"className": "Terrasoft.MultilineLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SubmitScriptHelpText"},
						"contentVisible": true,
						"classes": {
							"labelClass": ["help-text-label"]
						}
					}
				},
				{
					"name": "SubmitScript",
					"operation": "insert",
					"parentName": "ControlGroupSubmitCode",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"height": "18px",
							"classes": ["template-script-text-box"],
							"fontSize": "10pt",
							"fontFamily": "Courier New, monospace"
						},
						"readonly": true
					}
				},
				{
					"name": "Files",
					"operation": "insert",
					"parentName": "NotesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"name": "NotesControlGroup",
					"operation": "insert",
					"parentName": "NotesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
						"controlConfig": {"collapsed": false}
					}
				},
				{
					"name": "Notes",
					"operation": "insert",
					"parentName": "NotesControlGroup",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"labelConfig": {"visible": false},
						"controlConfig": {
							"imageLoaded": {"bindTo": "insertImagesToNotes"},
							"images": {"bindTo": "NotesImagesCollection"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "TemplateScript",
					"parentName": "ControlGroupPlaceForm",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "landing-script-template-iframe",
								"className": "Terrasoft.HtmlControl",
								"htmlContent": {"bindTo": "TemplateScript"},
								"markerValue": "ScriptTemplate"
							};
						},
						"readonly": true
					}
				},
				{
					"operation": "merge",
					"name": "ViewOptionsButton",
					"values": {
						"visible": {"bindTo": "IsSectionVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "FaqContainer",
					"parentName": "LeftModulesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"rowClassName": ["faq-button-grid-layout"],
							"columnClassName": ["faq-button-grid-layout"]
						},
						"items": [],
						"markerValue": "FaqContainer"
					}
				},
				{
					"operation": "insert",
					"name": "FaqIcon",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getFaqIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["profile-icon"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 4
						}
					}
				},
				{
					"operation": "insert",
					"name": "FaqHeaderCaption",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.FAQContainerCaption"
						},
						"classes": {
							"labelClass": ["webform-island-header", "label-green-color"]
						},
						"layout": {
							"column": 4,
							"row": 0,
							"colSpan": 20
						}
					}
				},
				{
					"name": "TypicalSetupErrorsAcademyUrl",
					"operation": "insert",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": {"bindTo": "Resources.Strings.TypicalSetupErrorsAcademyUrl"},
						"tag": {"data-context-help-code": "LandingTypicalErrors"},
						"layout": {
							"column": 4,
							"row": 1,
							"colSpan": 20
						}
					}
				},
				{
					"name": "SetupSpecialFieldsAcademyUrl",
					"operation": "insert",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": {"bindTo": "Resources.Strings.SetupSpecialFieldsAcademyUrl"},
						"tag": {"data-context-help-code": "LandingSetupLookupFields"},
						"layout": {
							"column": 4,
							"row": 2,
							"colSpan": 20
						}
					}
				},
				{
					"name": "SetupUserFieldsAcademyUrl",
					"operation": "insert",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": {"bindTo": "Resources.Strings.SetupUserFieldsAcademyUrl"},
						"tag": {"data-context-help-code": "LandingSetupUserFields"},
						"layout": {
							"column": 4,
							"row": 3,
							"colSpan": 20
						}
					}
				},
				{
					"name": "FormPrepopulationSetupAcademyUrl",
					"operation": "insert",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": {"bindTo": "Resources.Strings.FormPrepopulationSetupAcademyUrl"},
						"tag": {"data-context-help-code": "FormPrepopulationSetup"},
						"layout": {
							"column": 4,
							"row": 4,
							"colSpan": 20
						}
					}
				},
				{
					"name": "WebFormSetupAcademyUrl",
					"operation": "insert",
					"parentName": "FaqContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": ["faq-button", "base-edit-link"]
						},
						"click": {"bindTo": "onFaqClick"},
						"caption": {"bindTo": "Resources.Strings.WebFormSetupAcademyUrl"},
						"tag": {"data-context-help-code": "WebFormSetup"},
						"layout": {
							"column": 4,
							"row": 5,
							"colSpan": 20
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define("BaseGeneratedWebFormPageV2", [],
	function() {
		return {
			entitySchemaName: "GeneratedWebForm",
			details: /**SCHEMA_DETAILS*/{
				LandingCampaign: {
					schemaName: "CampaignWithLandingDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Landing"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"name": "HistoryTab",
					"index": 3,
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.HistoryTabCaption"
						},
						"items": []
					}
				},
				{
					"name": "LandingCampaign",
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});



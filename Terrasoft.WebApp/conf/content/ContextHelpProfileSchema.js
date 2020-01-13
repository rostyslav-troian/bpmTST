Terrasoft.configuration.Structures["ContextHelpProfileSchema"] = {innerHierarchyStack: ["ContextHelpProfileSchema"], structureParent: "BaseProfileSchema"};
define('ContextHelpProfileSchemaStructure', ['ContextHelpProfileSchemaResources'], function(resources) {return {schemaUId:'86d50eda-3fed-45b4-b212-05fccd68d664',schemaCaption: "ContextHelpProfileSchema", parentSchemaName: "BaseProfileSchema", schemaName:'ContextHelpProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContextHelpProfileSchema", ["AcademyUtilities", "css!ContextHelpProfileSchemaCSS"], function(AcademyUtilities) {
	return {
		attributes: {
			/**
			 * Url of academy article.
			 * @protected
			 */
			"ContextHelpUrl": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: null
			},
			/**
			 * Config of academy article image.
			 */
			"ContextHelpIconConfig": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: null
			},
			/**
			 * Description for academy article.
			 */
			"ContextHelpDescription": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: null
			},
			/**
			 * Id of academy article.
			 */
			"ContextHelpId": {
				dataValueType: Terrasoft.DataValueType.NUMBER,
				value: null
			}
		},
		methods: {
			/**
			 * How it works hyperlink click handler.
			 */
			onContextHelpLinkClick: function() {
				var url = this.get("ContextHelpUrl");
				var openedWindow = window.open(url, "_blank");
				openedWindow.focus();
			},

			/**
			 * Initalizes viewModel properties.
			 * @protected
			 */
			initProperties: function() {
				var values = this.values || {};
				this.set("ContextHelpId", values.contextHelpId);
				this.set("ContextHelpDescription", values.contextHelpDescription);
				this.set("ContextHelpIconConfig", values.contextHelpIconConfig);
			},

			/**
			 * Callback function for initDescriptionLinkText.
			 * @protected
			 * @param {String} url Academy url.
			 */
			initContextHelpLinkCallback: function(url) {
				this.set("ContextHelpUrl", url);
			},

			/**
			 * Initializes academy link.
			 * @protected
			 */
			initContextHelpLink: function() {
				AcademyUtilities.getUrl({
					scope: this,
					contextHelpId: this.get("ContextHelpId"),
					callback: this.initContextHelpLinkCallback
				});
			},

			/**
			 * Initialize model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						this.initProperties();
						this.initContextHelpLink();
						this.Ext.callback(callback, scope, arguments);
					}, this
				]);
			}
		},
		diff: [
			{
				"operation": "remove",
				"name": "AddButton"
			},
			{
				"operation": "remove",
				"name": "FindButton"
			},
			{
				"operation": "remove",
				"name": "BlankSlateIcon"
			},
			{
				"operation": "insert",
				"name": "ContextHelpImage",
				"parentName": "BlankSlateContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onContextHelpLinkClick"},
					"classes": {"imageClass": ["context-help-image"]},
					"imageConfig": {"bindTo": "ContextHelpIconConfig"},
					"layout": {
						"column": 5,
						"row": 0,
						"colSpan": 16,
						"rowSpan": 3
					}
				}
			},
			{
				"operation": "insert",
				"name": "ContextHelpDescription",
				"parentName": "BlankSlateContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "ContextHelpDescription"},
					"classes": {
						"labelClass": ["context-help-description"]
					},
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				}
			}
		]
	};
});



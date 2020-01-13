Terrasoft.configuration.Structures["ContentMjButtonElementViewModel"] = {innerHierarchyStack: ["ContentMjButtonElementViewModel"]};
define('ContentMjButtonElementViewModelStructure', ['ContentMjButtonElementViewModelResources'], function(resources) {return {schemaUId:'5fe8866e-8956-4828-a228-4997e8956700',schemaCaption: "ContentMjButtonElementViewModel", parentSchemaName: "", schemaName:'ContentMjButtonElementViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentMjButtonElementViewModel", ["ContentMjButtonElementViewModelResources",
		"ContentButtonElementViewModel", "ContentBuilderConstants"], function(resources) {
	Ext.define("Terrasoft.ContentBuilder.ContentMjButtonElementViewModel", {
		extend: "Terrasoft.ContentButtonElementViewModel",
		alternateClassName: "Terrasoft.ContentMjButtonElementViewModel",

		/**
		 * View model element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentMjButtonElement",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles", "WrapperStyles", "Link", "Align",
			"HtmlText", "PlainText"],

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			changedConfig.Align = config.Align || Terrasoft.Align.CENTER;
			changedConfig.VerticalAlign = config.VerticalAlign || Terrasoft.Valign.MIDDLE;
			changedConfig.Styles = Ext.apply({
				"height": "auto",
				"padding-left": "10px",
				"padding-right": "10px",
				"padding-top": "5px",
				"padding-bottom": "5px",
				"border-radius": "3px",
				"font-family": Terrasoft.FontSet.ARIAL,
				"font-size": "13px",
				"color": "#000000",
				"line-height": "22px"
			}, config.Styles);
			changedConfig.WrapperStyles = Ext.apply({
				"padding-left": "10px",
				"padding-right": "10px",
				"padding-top": "5px",
				"padding-bottom": "5px",
				"width": "auto"
			}, config.WrapperStyles) ;
			return changedConfig;
		},

		/**
		 * Returns config object of view model edit page.
		 * @protected
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function() {
			var config = {
				ItemType: this.$ItemType,
				Styles: this.$Styles,
				WrapperStyles: this.$WrapperStyles,
				Link: this.$Link,
				Align: this.$Align,
				ElementInfo: {
					Type: this.$ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentMjButtonPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp,
						useBackgroundImage: false,
						isStylesVisible: true
					}
				}
			};
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"markerValue": "$PlainText",
				"align": "$Align",
				"wrapStyle": "$WrapperStyles",
				"buttonStyle": "$Styles",
				"items": [{
					"className": "Terrasoft.InlineTextEdit",
					"value": "$HtmlText",
					"markerValue": "HtmlText",
					"ckeditorDefaultConfig": {
						"allowedContent": true,
						"removeButtons":
							"Font," +
							"FontSize," +
							"JustifyCenter," +
							"JustifyLeft," +
							"JustifyRight," +
							"Link," +
							"JustifyBlock," +
							"NumberedList," +
							"BulletedList," +
							"Indent," +
							"Outdent," +
							"bpmonlinesource," +
							"bpmonlinemacros," +
							"indentpanel," +
							"lineheight," +
							"lineheightpanel," +
							"letterspacing," +
							"letterspacingpanel"
					}
				}]
			});
			return config;
		}
	});
});



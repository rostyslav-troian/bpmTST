Terrasoft.configuration.Structures["HTMLCodeEditModalBox"] = {innerHierarchyStack: ["HTMLCodeEditModalBox"], structureParent: "BaseModalBoxPage"};
define('HTMLCodeEditModalBoxStructure', ['HTMLCodeEditModalBoxResources'], function(resources) {return {schemaUId:'657af58f-8085-41b1-bbb8-9a0a6c47cd3a',schemaCaption: "HTML code edit modal box", parentSchemaName: "BaseModalBoxPage", schemaName:'HTMLCodeEditModalBox',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("HTMLCodeEditModalBox", ["SourceCodeEditEnums", "SourceCodeEdit", "HTMLCodeEditModalBoxResources",
	"css!HTMLCodeEditModalBoxCss"], function(SourceCodeEditEnums) {
	return {
		messages: {
			/**
			 * @message GetDesignerDisplayConfig
			 */
			"SaveHTMLElementContent": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * HTML content.
			 */
			"Content": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Source code edit language. See SourceCodeEditEnums module.
			 */
			"Language": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: SourceCodeEditEnums.Language.HTML
			},

			/**
			 * Source code edit marker value.
			 */
			"SourceCodeEditMarkerValue": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "SourceCodeEdit"
			}
		},
		methods: {

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					var moduleInfo = this.get("moduleInfo");
					this.set("Content", moduleInfo.content || "");
					callback.call(scope);
				}, this]);
			},

			/**
			 * @inheritDoc Terrasoft.BaseModalBoxPage#getHeader.
			 * @overridden
			 */
			getHeader: function() {
				return this.get("Resources.Strings.HTMLCodeEditModalBoxHeader");
			},

			/**
			 * Returns HTML content.
			 * @protected
			 * @virtual
			 * @return {Object} HTML content.
			 */
			getConfig: function() {
				return {content: this.get("Content")};
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#onRender.
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				var moduleInfo = this.get("moduleInfo");
				var boxSizes = moduleInfo.modalBoxSize;
				this.updateSize(boxSizes.width, boxSizes.height);
			},

			/**
			 * Save button click handler.
			 * @protected
			 * @virtual
			 */
			save: function() {
				this.sandbox.publish("SaveHTMLElementContent", this.getConfig(), [this.sandbox.id]);
				this.close();
			}
		},

		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,

		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["modal-box-card-content-wrap", "html-code-edit-modal-box"]
				}
			},
			{
				"operation": "insert",
				"name": "SourceCode",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"generator": "SourceCodeEditGenerator.generate",
					"language": {"bindTo": "Language"},
					"value": {"bindTo": "Content"},
					"markerValue": {"bindTo": "SourceCodeEditMarkerValue"}
				}
			},
			{
				"operation": "insert",
				"name": "OkButton",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"click": {"bindTo": "save"},
					"caption": {"bindTo": "Resources.Strings.OkButtonCaption"},
					"classes": {"textClass": ["tap-panel-box"]}
				}
			},
			{
				"operation": "insert",
				"name": "CancelButton",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"click": {"bindTo": "close"},
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaptionBox"},
					"classes": {"textClass": ["tap-panel-box"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



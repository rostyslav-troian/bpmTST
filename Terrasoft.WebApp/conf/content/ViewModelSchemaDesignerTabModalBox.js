Terrasoft.configuration.Structures["ViewModelSchemaDesignerTabModalBox"] = {innerHierarchyStack: ["ViewModelSchemaDesignerTabModalBox"], structureParent: "BaseModalBoxPage"};
define('ViewModelSchemaDesignerTabModalBoxStructure', ['ViewModelSchemaDesignerTabModalBoxResources'], function(resources) {return {schemaUId:'22aff2b1-5b3d-49cb-8faf-95181abf198c',schemaCaption: "ViewModelSchemaDesignerTabModalBox", parentSchemaName: "BaseModalBoxPage", schemaName:'ViewModelSchemaDesignerTabModalBox',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ViewModelSchemaDesignerTabModalBox", ["css!ViewModelSchemaDesignerTabModalBoxCss"], function() {
	return {
		messages: {

			/**
			 * @message GetDesignerDisplayConfig
			 */
			"SaveTabConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Tab caption.
			 */
			"TabCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				isRequired: true,
				size: 50,
				value: ""
			}
		},
		methods: {

			/**
			 * Returns modal box config.
			 * @return {Object}
			 */
			getModuleInfo: function() {
				return this.get("moduleInfo");
			},

			/**
			 * Returns modal box header.
			 * @return {String}
			 */
			getHeader: function() {
				return this.get("Resources.Strings.TabModalBoxHeader");
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					var moduleInfo = this.getModuleInfo();
					this.set("TabCaption", moduleInfo.tabCaption);
					callback.call(scope);
				}, this]);
			},

			/**
			 * Returns new tab config.
			 * @return {Object}
			 */
			getTabConfig: function() {
				return {
					caption: this.get("TabCaption")
				};
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#onRender.
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				var moduleInfo = this.getModuleInfo();
				var boxSizes = moduleInfo.modalBoxSize;
				var width = boxSizes.width;
				var height = boxSizes.height;
				this.updateSize(width, height);
			},

			/**
			 * Handler save button by click.
			 * @protected
			 */
			okButtonClick: function() {
				if (this.validate()) {
					var tabConfig = this.getTabConfig();
					this.sandbox.publish("SaveTabConfig", tabConfig, [this.sandbox.id]);
					this.close();
				}
			},

			/**
			 * @protected
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("TabCaption", this.tabCaptionLengthValidator);
			},

			/**
			 * Validate TabCaption length.
			 * @protected
			 * @virtual
			 * @param {String} value TabCaption value.
			 * @param {Object} column Model column.
			 * @return {Object} Result of validate.
			 */
			tabCaptionLengthValidator: function(value, column) {
				var message = "";
				if (this.get("TabCaption")) {
					var maxLength = column.size;
					if (value.length >= maxLength) {
						message = Ext.String.format(this.get("Resources.Strings.WrongTabCaptionLengthMessage"),
								maxLength);
					}
				}
				return {invalidMessage: message};
			}

		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["modal-box-card-content-wrap", "tab-modal-box"]
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"name": "TabCaption",
				"values": {
					"bindTo": "TabCaption",
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.TabBoxTitleCaption"}
					}
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
					"click": {"bindTo": "okButtonClick"},
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
					"caption": {"bindTo": "Resources.Strings.CancelButtonBoxCaption"},
					"classes": {"textClass": ["tap-panel-box"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



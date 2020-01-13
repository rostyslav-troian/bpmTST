Terrasoft.configuration.Structures["BaseElementPropertiesPage"] = {innerHierarchyStack: ["BaseElementPropertiesPage"]};
define('BaseElementPropertiesPageStructure', ['BaseElementPropertiesPageResources'], function(resources) {return {schemaUId:'6d5763fd-93ae-4f8b-8308-748e9f40d663',schemaCaption: "BaseElementPropertiesPage", parentSchemaName: "", schemaName:'BaseElementPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseElementPropertiesPage", [], function() {
	return {
		messages: {
			"GetDesignSchema": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			"DesignSchema": {
				type: Terrasoft.DataValueType.CUSTOM_OBJECT,
				autoBind: false
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getAutoBindAttributes: function() {
				return Terrasoft.filter(this.columns, {autoBind: true});
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.$DesignSchema = this.sandbox.publish("GetDesignSchema");
					this.loadData();
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Returns current edited item.
			 * @protected
			 */
			getDesignSchemaItem: function() {
				return this.$DesignSchema && this.$DesignSchema.$ActionLayoutItem;
			},

			/**
			 * Init element properties.
			 * @protected
			 */
			loadData: function() {
				var item = this.getDesignSchemaItem();
				var attributes = this._getAutoBindAttributes();
				Terrasoft.each(attributes, function(attribute) {
					var name = attribute.name;
					this.set(name, item.get(name));
				}, this);
			},

			/**
			 * Saves element properties.
			 * @protected
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback function context
			 */
			saveData: function(callback, scope) {
				if (this.validate()) {
					var item = this.getDesignSchemaItem();
					var attributes = this._getAutoBindAttributes();
					Terrasoft.each(attributes, function(attribute) {
						var name = attribute.name;
						item.set(name, this.get(name));
					}, this);
					Ext.callback(callback, scope);
				}
			},

			/**
			 * Closes properties page.
			 * @protected
			 */
			closePropertiesPage: function() {
				var modalBox = this.$DesignSchema.getModalBox();
				modalBox.close();
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns properties page title.
			 * @return {String}
			 */
			getTitle: function() {
				return this.get("Resources.Strings.PropertiesPageTitle");
			},

			/**
			 * Handler for CancelButton click.
			 */
			onCancelClick: function() {
				this.closePropertiesPage();
			},

			/**
			 * Handler for SaveButton click.
			 */
			onSaveClick: function() {
				if (this.validate()) {
					this.saveData(function() {
						this.closePropertiesPage();
					}, this);
				}
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["modal-box-schema-module-header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "Title",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "getTitle"},
					"labelConfig": {"classes": ["modal-box-title"]}
				}
			},
			{
				"operation": "insert",
				"name": "MainContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MainContainer",
				"propertyName": "items",
				"name": "ButtonsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["buttons-container"],
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ButtonsContainer",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"layout": {"column": 0, "row": 0, "colSpan": 2},
					"click": {"bindTo": "onSaveClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ButtonsContainer",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"layout": {"column": 4, "row": 0, "colSpan": 2},
					"click": {"bindTo": "onCancelClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainContainer",
				"propertyName": "items",
				"name": "MainGridContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"classes": {"wrapClassName": ["main-grid-container"]},
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



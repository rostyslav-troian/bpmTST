Terrasoft.configuration.Structures["PageDesignerPropertyPage"] = {innerHierarchyStack: ["PageDesignerPropertyPage"], structureParent: "BaseElementPropertiesPage"};
define('PageDesignerPropertyPageStructure', ['PageDesignerPropertyPageResources'], function(resources) {return {schemaUId:'78226772-f519-4034-ae69-416cc3f4b030',schemaCaption: "Page designer property page", parentSchemaName: "BaseElementPropertiesPage", schemaName:'PageDesignerPropertyPage',parentSchemaUId:'6d5763fd-93ae-4f8b-8308-748e9f40d663',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseElementPropertiesPage.
 */
define("PageDesignerPropertyPage", ["terrasoft", "PageDesignerPropertyPageResources", "ModalBox"],
	function(Terrasoft, resources, ModalBox) {
		return {
			attributes: {
				"Caption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					caption: resources.localizableStrings.SchemaCaptionCaption,
					size: 250
				},
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					caption: resources.localizableStrings.SchemaNameCaption,
					size: 250
				},
				"PackageName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.PackageCaption
				},
				"ParentPageCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.ParentPageCaption
				},
				"Page": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * @private
				 */
				_initPackage: function(callback, scope) {
					const packageUId = this.get("Page").packageUId;
					Terrasoft.BaseSchemaDesignerUtilities.loadSysPackageByUId(packageUId, function(sysPackage) {
						this.set("PackageName", sysPackage && sysPackage.get("Name"));
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @private
				 */
				_initParentPage: function(callback, scope) {
					const item = this.get("Page");
					item.getInstance(function(schema) {
						const parentSchemaUId = schema.parentSchemaUId;
						const parentItem = Terrasoft.ClientUnitSchemaManager.findRootItemByUId(parentSchemaUId);
						this.set("ParentPageCaption", parentItem && parentItem.caption);
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @private
				 */
				_nameValidator: function(code) {
					var regExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]*$/;
					var message = regExp.test(code) ? "" : resources.localizableStrings.WrongNameMessage;
					return {invalidMessage: message};
				},

				/**
				 * @private
				 */
				_duplicateNameValidator: function(name) {
					var currentItem = this.get("Page");
					var itemWithSameName = Terrasoft.ClientUnitSchemaManager.findByFn(function(item) {
						return item.name === name && !item.extendParent && currentItem.id !== item.id;
					}, this);
					var message = itemWithSameName ? resources.localizableStrings.DuplicateNameMessage : "";
					return {invalidMessage: message};
				},

				/**
				 * @private
				 */
				_namePrefixValidator: function(value) {
					let message = "";
					const schemaNamePrefix = Terrasoft.ClientUnitSchemaManager.schemaNamePrefix;
					if (!Ext.isEmpty(schemaNamePrefix)) {
						const prefixRegExp = new RegExp("^" + schemaNamePrefix + ".*$");
						if (!prefixRegExp.test(value)) {
							const template = resources.localizableStrings.WrongPrefixMessage;
							message = Ext.String.format(template, schemaNamePrefix);
						}
					}
					return {invalidMessage: message};
				},

				/**
				 * @private
				 */
				_initPage: function(callback, scope) {
					Terrasoft.PackageManager.getCurrentPackageUId(function(currentPackageUId) {
						const pageUId = this.get("pageUId");
						const page = Terrasoft.ClientUnitSchemaManager.findExtendedItem(pageUId, currentPackageUId) ||
							Terrasoft.ClientUnitSchemaManager.get(pageUId);
						this.set("Page", page);
						Ext.callback(callback, scope);
					}, this);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseElementPropertiesPage#init
				 * @override
				 */
				init: function(callback, scope) {
					const parentMethod = this.getParentMethod();
					Terrasoft.chain(
						this._initPage,
						this._initPackage,
						this._initParentPage,
						function() {
							this.set("Caption", this.get("Page").caption);
							this.set("Name", this.get("Page").name);
							parentMethod.call(this, callback, scope);
						}, this
					);
				},

				/**
				 * @inheritdoc Terrasoft.BaseElementPropertiesPage#saveData
				 * @override
				 */
				saveData: function(callback, scope) {
					this.callParent([function() {
						var page = this.get("Page");
						page.setPropertyValue("name", this.get("Name"));
						var caption = new Terrasoft.LocalizableString({
							cultureValues: this.get("Caption")
						});
						page.setPropertyValue("caption", caption);
						page.instance.define(callback, scope);
					}, this]);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					if (this.canChangeSchemaName()) {
						this.addColumnValidator("Name", this._nameValidator);
						this.addColumnValidator("Name", this._duplicateNameValidator);
						this.addColumnValidator("Name", this._namePrefixValidator);
					}
				},

				/**
				 * @inheritdoc BaseElementPropertiesPage#closePropertiesPage
				 * @overridden
				 */
				closePropertiesPage: function() {
					ModalBox.close();
				},

				/**
				 * Returns true if schema name can changing.
				 * @protected
				 * @return {Boolean}
				 */
				canChangeSchemaName: function() {
					const page = this.get("Page");
					return !page.extendParent;
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "MainGridContainer",
					"propertyName": "items",
					"name": "Caption",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"layout": {"column": 0, "row": 0, "colSpan": 24}
					}
				},
				{
					"operation": "insert",
					"parentName": "MainGridContainer",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"enabled": {"bindTo": "canChangeSchemaName"}
					}
				},
				{
					"operation": "insert",
					"parentName": "MainGridContainer",
					"propertyName": "items",
					"name": "PackageName",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "MainGridContainer",
					"propertyName": "items",
					"name": "ParentPageCaption",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"enabled": false
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);



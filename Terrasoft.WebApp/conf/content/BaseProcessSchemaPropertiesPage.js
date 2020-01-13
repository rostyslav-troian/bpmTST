Terrasoft.configuration.Structures["BaseProcessSchemaPropertiesPage"] = {innerHierarchyStack: ["BaseProcessSchemaPropertiesPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('BaseProcessSchemaPropertiesPageStructure', ['BaseProcessSchemaPropertiesPageResources'], function(resources) {return {schemaUId:'e3c8b7af-2c99-4da9-8a53-dc40df1911a8',schemaCaption: "BaseProcessSchemaPropertiesPage", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'BaseProcessSchemaPropertiesPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page schema for base process schema properties.
 * Parent: ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("BaseProcessSchemaPropertiesPage", ["terrasoft", "BaseProcessSchemaPropertiesPageResources",
		"ProcessModuleUtilities"],
	function(Terrasoft, resources, ProcessModuleUtilities) {
		return {
			messages: {
				/**
				 * @message SchemaPropertyChanged
				 * Receive current schema property value.
				 */
				"SchemaPropertiesChanged": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				/**
				 * Flag that indicates enabled schema or not.
				 */
				"enabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.EnabledCaption
				},
				/**
				 * Indicates whether this schema is the actual version in current package.
				 */
				"isActualVersion": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.IsActiveVersionCaption
				},
				/**
				 * Package.
				 */
				"SysPackage": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					caption: resources.localizableStrings.SysPackageCaption
				},
				/**
				 * Maximum repeat count.
				 */
				"maxLoopCount": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.MaxLoopCountCaption
				},
				/**
				 * Package list for drop down menu.
				 */
				"SysPackageList": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true,
					value: Ext.create("Terrasoft.Collection")
				},
				/**
				 * Flag that indicates whether SysPackage edit is enabled.
				 */
				"IsSysPackageEnabled": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Indicates whether is system security context used during runtime.
				 */
				"useSystemSecurityContext": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.UseSystemSecurityContextCaption
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Initializes SysPackage.
				 * @private
				 * @param {GUID} packageUId Package unique identifier.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Execution context.
				 */
				initSysPackage: function(packageUId, callback, scope) {
					if (Terrasoft.isEmptyGUID(packageUId)) {
						const value = {
							UId: Terrasoft.GUID_EMPTY,
							value: Terrasoft.GUID_EMPTY,
							displayValue: resources.localizableStrings.CustomPackageName
						};
						this.set("SysPackage", value);
						this.on("change:SysPackage", this.onSysPackageChanged, this);
						callback.call(scope || this);
					} else {
						this.loadSysPackageDisplayValue(packageUId, callback, scope);
					}
				},

				/**
				 * Loads SysPackage display value.
				 * @private
				 * @param {String} packageUId Package identifier.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Execution context.
				 */
				loadSysPackageDisplayValue: function(packageUId, callback, scope) {
					this.set("SysPackage", {UId: packageUId});
					Terrasoft.BaseSchemaDesignerUtilities.loadSysPackageByUId(packageUId, function(sysPackage) {
						if (sysPackage) {
							const value = {
								UId: sysPackage.get("UId"),
								value: sysPackage.get("Id"),
								displayValue: sysPackage.get("Name")
							};
							this.set("SysPackage", value);
							const maintainer = sysPackage.get("Maintainer");
							this.set("IsSysPackageEnabled", maintainer === Terrasoft.SysValue.CURRENT_MAINTAINER.value);
						}
						this.on("change:SysPackage", this.onSysPackageChanged, this);
						callback.call(scope || this);
					}, this);
				},

				/**
				 * Handles on SysPackage change, shows confirmation message.
				 * @private
				 * @param {Terrasoft.BaseViewModel} model Page view model.
				 * @param {Object} sysPackage Current SysPackage value.
				 * @param {Object} options Binding options.
				 */
				onSysPackageChanged: function(model, sysPackage, options) {
					let previousSysPackage = model.previous("SysPackage");
					if (!sysPackage && previousSysPackage) {
						this.set("PreviousSysPackage", previousSysPackage);
						return;
					}
					if (options.showConfirmationDialog === false) {
						return;
					}
					const value = sysPackage ? sysPackage.value : null;
					const oldValue = previousSysPackage ? previousSysPackage.value : null;
					if (value === oldValue) {
						return;
					}
					const buttonCaption = resources.localizableStrings.ChangSysPackageButtonCaption;
					const message = resources.localizableStrings.ChangeSysPackageConfirmationMessage;
					const changeButton = Terrasoft.getButtonConfig("modify", buttonCaption, "Modify");
					this.showConfirmationDialog(message, function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.NO.returnCode) {
							previousSysPackage = previousSysPackage || this.get("PreviousSysPackage");
							this.set("SysPackage", previousSysPackage, {showConfirmationDialog: false});
						}
					}, [changeButton, Terrasoft.MessageBoxButtons.NO], {defaultButton: 0});
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getExtendedModeMenuItem.
				 * @overridden
				 */
				getExtendedModeMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initIsSerializeToDBEnabled.
				 * @overridden
				 */
				initIsSerializeToDBEnabled: function(element, callback, scope) {
					this.set("IsSerializeToDBEnabled", true);
					callback.call(scope);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#duplicateNameValidator
				 * @overridden
				 */
				duplicateNameValidator: function() {
					return {invalidMessage: ""};
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#sortParameterViewModelCollectionByCaption
				 * @overridden
				 */
				sortParameterViewModelCollectionByCaption: Terrasoft.emptyFn,

				/**
				 * Subscribes on diagram caption change event.
				 * @private
				 */
				subscribeOnDiagramCaptionChanged: function() {
					this.sandbox.subscribe("DiagramPageCaptionChanged", function(schemaCaption) {
						this.set("caption", schemaCaption);
					}, this);
				},

				/**
				 * Returns if name is required.
				 * @private
				 * @return {Boolean}
				 */
				_getIsNameRequired: function() {
					return this.getIsNewProcess() === false;
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(schema, callback, scope) {
					this.set("FeatureDisableAdminRightsInScriptTaskEnabled",
						Terrasoft.Features.getIsEnabled("DisableAdminRightsInScriptTask"));
					this.subscribeOnDiagramCaptionChanged();
					this.callParent([schema, function() {
						this.sandbox.subscribe("SchemaPropertiesChanged", this.schemaPropertiesChanged, this);
						this.set("enabled", schema.enabled);
						this.set("isActualVersion", schema.getIsActualVersion());
						this.set("maxLoopCount", schema.maxLoopCount);
						this.set("useSystemSecurityContext", schema.useSystemSecurityContext);
						this.initSysPackage(schema.packageUId, function() {
							callback.call(scope);
						}, this);
					}, this]);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
				 * @overridden
				 */
				saveValues: function() {
					this.callParent(arguments);
					const process = this.get("ProcessElement");
					process.setPropertyValue("enabled", this.get("enabled"));
					const sysPackage = this.get("SysPackage") || this.get("PreviousSysPackage") || {};
					process.setPropertyValue("packageUId", sysPackage.UId);
					process.setPropertyValue("maxLoopCount", this.get("maxLoopCount"));
					process.setPropertyValue("useSystemSecurityContext", this.get("useSystemSecurityContext"));
				},

				/**
				 * Sets schema properties
				 */
				schemaPropertiesChanged: function(changeObject) {
					Terrasoft.each(changeObject, function(value, name) {
						this.set(name, value);
					}, this);
				},

				/**
				 * Data handler preparation event for the drop-down package list.
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				onPrepareSysPackageList: function(filter, list) {
					ProcessModuleUtilities.onPrepareSysPackageList(filter, list);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#onPageCaptionChanged.
				 * @overridden
				 */
				onElementCaptionChanged: function(model, caption) {
					this.sandbox.publish("PropertiesPageCaptionChanged", caption);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#nameValidator
				 * @override
				 */
				nameValidator: function(code) {
					const isNew = this.getIsNewProcess();
					if (isNew && !code) {
						return {invalidMessage: ""};
					}
					return this.callParent(arguments);
				},

				/**
				 * Returns if process schema is new or not.
				 * @protected
				 * @return {Boolean}
				 */
				getIsNewProcess: function() {
					const managerItem = this.sandbox.publish("GetSchemaManagerItem");
					const isNew = managerItem && managerItem.isNew();
					return Boolean(isNew);
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "name",
					"values": {
						"isRequired": {"bindTo": "_getIsNameRequired"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);



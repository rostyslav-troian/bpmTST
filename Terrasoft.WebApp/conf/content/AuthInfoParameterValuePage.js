Terrasoft.configuration.Structures["AuthInfoParameterValuePage"] = {innerHierarchyStack: ["AuthInfoParameterValuePage"], structureParent: "BaseServiceParameterValuePage"};
define('AuthInfoParameterValuePageStructure', ['AuthInfoParameterValuePageResources'], function(resources) {return {schemaUId:'14c99d52-3f74-4839-9720-fb520db4ba10',schemaCaption: "AuthInfoParameterValuePage", parentSchemaName: "BaseServiceParameterValuePage", schemaName:'AuthInfoParameterValuePage',parentSchemaUId:'ab52022b-f8c2-4465-8a4d-7e19196d7f51',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AuthInfoParameterValuePage", ["ServiceEnums", "ServiceDesignerUtilities"],
	function() {
	return {
		properties: {

			//region Properties: Private

			/**
			 * @private
			 */
			_serviceSchema: null,

			//endregion

			//region Properties: Protected

			/**
			 * Service auth info value.
			 * @protected
			 * @type{Terrasoft.ServiceParameterValue}
			 */
			authInfoValue: null

			//endregion

		},
		attributes: {
			AuthInfoPropertyName: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			ServiceSchemaUid: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_onServiceSchemaChanged: function(changedValues) {
				if (changedValues.hasOwnProperty("authType")) {
					this._initAuthInfoValue();
				} else {
					if (changedValues.hasOwnProperty("authInfoValues")) {
						this.authInfoValue = this._serviceSchema.authInfo.values.find(this.$AuthInfoPropertyName);
						if (this.authInfoValue) {
							this.$Source = this.authInfoValue.source;
							this.$Value = this.authInfoValue.value;
							this._setSpecifiedValue();
							this.updateAuth();
						}
					}
				}
			},

			/**
			 * @private
			 */
			_initAuthInfoValue: function() {
				this.authInfoValue = this._serviceSchema.authInfo.values.find(this.$AuthInfoPropertyName);
				if (!this.authInfoValue) {
					this.authInfoValue = new Terrasoft.ServiceParameterValue({
						_serviceSchema: this._serviceSchema,
						source: Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING,
						value: ""
					});
					this._serviceSchema.authInfo.values.add(this.$AuthInfoPropertyName, this.authInfoValue);
				}
				this.$Source = this.authInfoValue.source;
				if (this.isSysSettingSource()) {
					this.$SysSettingValue = Terrasoft.ServiceDesignerUtilities.getFormattedValue(this.authInfoValue);
				} else {
					this.$Value = this.authInfoValue.value;
				}
			},

			/**
			 * @private
			 */
			_initServiceSchema: function(callback, scope) {
				Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceSchemaUid, function(instance) {
					this._serviceSchema = instance;
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			_setSpecifiedValue: function() {
				if (this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST) {
					this.$TextValue = this.$Value;
					this.$SysSettingValue = null;
				}
				if (this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING) {
					this.$TextValue = null;
					if (this.$Value) {
						this.$SysSettingValue = Terrasoft.ServiceDesignerUtilities.getFormattedValue({
							value: this.$Value,
							source: this.$Source
						});
					}
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#updateMetaItemValue
			 * @override
			 */
			updateMetaItemValue: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#getValueCaption
			 * @override
			 */
			getValueCaption: function() {
				var resourcesName = Ext.String.format("Resources.Strings.{0}Caption",
					Ext.String.capitalize(this.$AuthInfoPropertyName));
				return this.get(resourcesName);
			},

			/**
			 * Updates view model when auth info changed.
			 * @virtual
			 */
			updateAuth: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseServiceParameterValuePage#onValueChanged
			 * @override
			 */
			onValueChanged: function() {
				this._setSpecifiedValue();
				this.authInfoValue.setPropertyValue("value", this.$Value);
			},

			/**
			 * @inheritdoc BaseServiceParameterValuePage#onSourceChanged
			 * @override
			 */
			onSourceChanged: function() {
				this._setSpecifiedValue();
				this.authInfoValue.setPropertyValue("source", this.$Source);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					Terrasoft.chain(
						function(next) {
							Terrasoft.ServiceSchemaManager.initialize(next, this);
						},
						function(next) {
							this._initServiceSchema(next, this);
						},
						function() {
							this._initAuthInfoValue();
							this._serviceSchema.on("changed", this._onServiceSchemaChanged, this);
							Ext.callback(callback, scope);
						}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#getSourcesMenuItems
			 * @override
			 */
			getSourcesMenuItems: function() {
				var sources = this.callParent(arguments);
				if (!this.canUseConstants()) {
					sources = sources.filter(function(item) {
						return item.$Tag !== Terrasoft.services.enums.ServiceParameterValueSource.CONST;
					});
				}
				return sources;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				if (this._serviceSchema) {
					this._serviceSchema.un("changed", this._onServiceSchemaChanged, this);
				}
			},

			/**
			 * Is allow to use constants as a source.
			 * @return {Boolean}
			 */
			canUseConstants: function() {
				return Terrasoft.isDebug || Terrasoft.Features.getIsEnabled("AuthInfoAllowUseConstants");
			}

			//endregion

		},
		diff: [{
			operation: "merge",
			name: "Source",
			values: {
				markerValue: "$AuthInfoPropertyName",
				enabled: "$canUseConstants"
			}
		}]
	};
});



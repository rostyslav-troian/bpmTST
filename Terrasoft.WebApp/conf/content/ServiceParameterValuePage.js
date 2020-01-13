Terrasoft.configuration.Structures["ServiceParameterValuePage"] = {innerHierarchyStack: ["ServiceParameterValuePage"], structureParent: "BaseServiceParameterValuePage"};
define('ServiceParameterValuePageStructure', ['ServiceParameterValuePageResources'], function(resources) {return {schemaUId:'3861153d-7d5b-4f97-8964-9faa395dfa35',schemaCaption: "ServiceParameterValuePage", parentSchemaName: "BaseServiceParameterValuePage", schemaName:'ServiceParameterValuePage',parentSchemaUId:'ab52022b-f8c2-4465-8a4d-7e19196d7f51',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceParameterValuePage", ["ServiceEnums", "ServiceDesignerUtilities", "css!ServiceDesignerStyles"],
	function() {
	return {
		mixins: {
			observableItem: "Terrasoft.ObservableItem"
		},
		messages: {

			/**
			 * @message ParameterUIdChange
			 * Receives parameters for update state of ServiceParameterPage from ServiceParameterGrid.
			 * @return {Object} Parameters for get target parameter from ServiceSchemaManager.
			 */
			"ParameterUIdChange": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetParameterUId
			 * @return {String} Publishes request for parameter uid.
			 */
			"GetParameterUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Parameter.
			 */
			"Parameter": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onParameterChanged"
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_onParameterChanged: function() {
				this.subscribeOnItemChanged(this.$Parameter);
			},

			/**
			 * @private
			 */
			_onParameterMetaItemPropertyChange: function(changedValues) {
				if (changedValues && changedValues.isArray) {
					this.$Source = Terrasoft.services.enums.ServiceParameterValueSource.UNDEFINED;
					this.$Value = null;
				}
				if (changedValues && changedValues.dataValueTypeName) {
					this.$DataValueTypeName = changedValues.dataValueTypeName;
					this.$Value = null;
					this.$SysSettingValue = null;
					this._updateSpecifiedValues(null);
				}
				if (changedValues && changedValues.defValue) {
					this.$Source = changedValues.defValue.source;
					this._updateSpecifiedValues(changedValues.defValue.value);
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#updateMetaItemValue
			 * @override
			 */
			updateMetaItemValue: function(attributeName, propertyName) {
				if (this.$Parameter) {
					var defValue = this.$Parameter.getPropertyValue("defValue");
					var changedValue = this.get(attributeName);
					if (Ext.isDefined(changedValue) && (changedValue !== defValue[propertyName])) {
						this.$Parameter.setPropertyValue("defValue", { value: this.$Value, source: this.$Source });
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#getValueCaption
			 * @override
			 */
			getValueCaption: function() {
				return this.get("Resources.Strings.SourceCaption");
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.sandbox.subscribe("ParameterUIdChange", this.onParameterUIdChange, this,
						[this.sandbox.id]);
					this.initialConfig.values.parameterUId = this.sandbox.publish("GetParameterUId", null,
						[this.sandbox.id]);
					this.onParameterUIdChange(this.initialConfig.values, callback, scope);
				}, this]);
			},

			/**
			 * @param config
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			onParameterUIdChange: function(config, callback, scope) {
				if (this.$Parameter) {
					this.unsubscribeAllItems();
					this.$Parameter.un("changed", this._onParameterMetaItemPropertyChange, this);
				}
				Terrasoft.ServiceSchemaManager[config.findParameterMethodName](config, function(parameter) {
					if (parameter) {
						this.$DataValueTypeName = parameter.getPropertyValue("dataValueTypeName");
						this.$Parameter = parameter;
						var defValue = this.$Parameter.getPropertyValue("defValue");
						this._initSource(defValue.source);
						this._updateSpecifiedValues(defValue.value);
						this.$Value = defValue.value;
						if (this.isSysSettingSource()) {
							this.$SysSettingValue = Terrasoft.ServiceDesignerUtilities.getFormattedValue(defValue);
						}
						this.$DataValueTypeName = this.$Parameter.getPropertyValue("dataValueTypeName");
						this.$Parameter.on("changed", this._onParameterMetaItemPropertyChange, this);
					}
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
			 * @override
			 */
			getAttributeMap: function() {
				return {dataValueTypeName: "DataValueTypeName"};
			},

			/**
			 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				if (this.$Parameter) {
					this.$Parameter.un("changed", this._onParameterMetaItemPropertyChange, this);
					this.unsubscribeAllItems();
				}
				this.callParent(arguments);
			}

			//endregion

		}
	};
});



Terrasoft.configuration.Structures["ContentItemPropertiesPage"] = {innerHierarchyStack: ["ContentItemPropertiesPage"]};
define('ContentItemPropertiesPageStructure', ['ContentItemPropertiesPageResources'], function(resources) {return {schemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',schemaCaption: "ContentItemPropertiesPage", parentSchemaName: "", schemaName:'ContentItemPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentItemPropertiesPage", ["css!ContentItemPropertiesPageCSS"], function() {
	return {
		attributes: {

			/**
			 * Content item config.
			 */
			Config: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		properties: {
			sandboxId: "ContentItemPropertiesPage",
			workStyles: [],
			_isLoaded: false
		},
		messages: {

			/**
			 * @message UpdateContentItemConfig.
			 * Sets actual content item config.
			 */
			UpdateContentItemConfig: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ContentItemConfigChanged.
			 * Actualize current config.
			 */
			ContentItemConfigChanged: {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Save initial config state.
			 * @param {Object} config Content item config.
			 * @private
			 */
			_onContentItemChanged: function(config) {
				this._isLoaded = false;
				this.setConfig(config);
				this.onContentItemConfigChanged(this.$Config);
				this._isLoaded = true;
			},

			// endregion

			// region Methods: Protected

			/**
			 * Handles change of content item config.
			 * @virtual
			 * @protected
			 */
			onContentItemConfigChanged: Terrasoft.emptyFn,

			// endregion

			// region Methods: Public

			/**
			 * Gets properties config.
			 * @param {String} propertyName Name of the changed property.
			 * @return {Object} config Content item config.
			 */
			getConfig: function(propertyName) {
				if (propertyName) {
					var config = {};
					config[propertyName] = this.$Config[propertyName];
					return config;
				}
				return this.$Config;
			},

			/**
			 * Sets config state.
			 * @param {Object} config Content item config.
			 */
			setConfig: function(config) {
				this.$Config = config;
			},

			/**
			 * @puplic
			 * @param {Object} previousValue.
			 * @param {Object} currentValue.
			 * @return {Boolean} previous value is changed.
			 */
			isChanged: function(previousValue, currentValue) {
				return !(Ext.isEmpty(previousValue) && Ext.isEmpty(currentValue)) &&
						!Terrasoft.isEqual(previousValue, currentValue);
			},

			/**
			 * Sends current config to content item.
			 * @param {Array} filter List of applicable parameters.
			 * @param {String} propertyName Name of the changed property.
			 */
			save: function(filter, propertyName) {
				if (this._isLoaded) {
					this.validateConfig(function(result) {
						if (result.valid) {
							Terrasoft.defer(function() {
								this.sandbox.publish("UpdateContentItemConfig", {
										config: this.getConfig(propertyName),
										stylesFilter: filter || this.workStyles,
										propertyName: propertyName
									},
									[this.sandboxId]);
							}, this);
						}
					}, this);
				}
			},

			/**
			 * Performs validation of item config.
			 * @virtual
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope.
			 */
			validateConfig: function(callback, scope) {
				Ext.callback(callback, scope, [{valid: true}]);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this._onContentItemChanged(this.$Config);
					this.sandbox.subscribe("ContentItemConfigChanged", this._onContentItemChanged, this,
						["PropertiesPage"]);
					Ext.callback(callback, scope);
				}, this]);
			}

			// endregion

		}
	};
});



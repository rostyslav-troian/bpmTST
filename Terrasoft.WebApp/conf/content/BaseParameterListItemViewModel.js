Terrasoft.configuration.Structures["BaseParameterListItemViewModel"] = {innerHierarchyStack: ["BaseParameterListItemViewModel"]};
define('BaseParameterListItemViewModelStructure', ['BaseParameterListItemViewModelResources'], function(resources) {return {schemaUId:'c6f32544-3bfa-4c33-90b9-4681734adfba',schemaCaption: "Base parameter list item ViewModel", parentSchemaName: "", schemaName:'BaseParameterListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * View model for parameter item in container list.
 */
define("BaseParameterListItemViewModel", ["BaseParameterListItemViewModelResources", "ModalBox",
		"MultilineLabel", "css!MultilineLabel", "CampaignElementMixin", "MacrosUtilities"],
	function(resources, ModalBox) {
		/**
		 * @class Terrasoft.configuration.BaseParameterListItemViewModel
		 */
		Ext.define("Terrasoft.configuration.BaseParameterListItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.BaseParameterListItemViewModel",
			/**
			 * Prefix for control marker value.
			 * @type {String}
			 */
			markerValuePrefix: "parameter-value",
			/**
			 * Postfix for container marker value.
			 * @type {String}
			 */
			markerValuePostfix: "param-container",
			/**
			 * Macros format template.
			 * @type {String}
			 */
			macroTemplate: "[#{0}#]",

			mixins: {
				campaignElementMixin: Terrasoft.CampaignElementMixin,
				MacrosUtilities: Terrasoft.MacrosUtilities
			},

			messages: {
				/**
				 * @message DateTimeMacroSelected
				 * Reacts on DateTime macro selected action.
				 */
				"DateTimeMacroSelected": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message DateTimeMacroSelectCancel
				 * Reacts on DateTime macro cancelled selection action.
				 */
				"DateTimeMacroSelectCancel": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				}
			},

			attributes: {
				/**
				 * Parameter caption.
				 * @type {String}
				 */
				"Caption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Parameter unique identifier.
				 * @type {String}
				 */
				"Id": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Parameter value.
				 * @type {Object}
				 */
				"Value": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Parameter name.
				 * @type {String}
				 */
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Parameter has macros value sign.
				 * @type {Boolean}
				 */
				"HasMacrosValue": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				}
			},

			// #region Methods: Private

			/**
			 * Returns sandbox id for DateTime Macro constructor module.
			 * @private
			 * @returns {String} DateTime Macro constructor module sandbox id.
			 */
			_getDateTimeMacroModuleId: function() {
				return this.sandbox.id + "_" + this.$Id + "_DateTimeMacroConstructorModule";
			},

			/**
			 * Handles cancel select hyperlink event.
			 * Closes modal box.
			 * @private
			 */
			_closeModalBox: function() {
				ModalBox.close();
			},

			/**
			 * Subscribes on sandbox messages.
			 * @private
			 */
			_subscribeOnMessages: function() {
				var dateTimeMacroModuleId = this._getDateTimeMacroModuleId();
				this.sandbox.subscribe("DateTimeMacroSelected", this.onDateTimeMacroSelected,
					this, [dateTimeMacroModuleId]);
				this.sandbox.subscribe("DateTimeMacroSelectCancel", this._closeModalBox,
					this, [dateTimeMacroModuleId]);
			},

			/**
			 * Gets selected macro value.
			 * @private
			 * @return {String} Selected macro value.
			 */
			_getMacroValue: function() {
				return this.$HasMacrosValue ? this.$Value : null;
			},

			// #endregion

			// #region Methods: Protected

			/**
			 * Initializes model with resources.
			 * @protected
			 * @virtual
			 * @param {Object} resourcesObj Resources object.
			 */
			initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Returns control marker value.
			 * @protected
			 * @returns {String} Marker value.
			 */
			getControlMarkerValue: function() {
				return this.markerValuePrefix + "-" + this.$Name;
			},

			/**
			 * Returns container marker value.
			 * @protected
			 * @returns {String} Marker value.
			 */
			getContainerMarkerValue: function() {
				return this.$Name + "-" + this.markerValuePostfix;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function(config, parameterConfig) {
				if (parameterConfig) {
					config = config || {};
					config.values = config.values || {};
					this.initParameter(config.values, parameterConfig);
				}
				this.callParent([config]);
				this.initResourcesValues(resources);
				if (this.sandbox) {
					this.sandbox.registerMessages(this.messages);
					this._subscribeOnMessages();
				}
				this.setValidationConfig();
				this.initParameterValue(parameterConfig && parameterConfig.value);
			},

			/**
			 * Initializes properties of parameter.
			 * @protected
			 * @param {Object} values Base view model config values.
			 * @param {Object} config Parameter view model config.
			 */
			initParameter: function(values, config) {
				values.Id = config.id;
				values.Name = config.name;
				values.Caption = config.caption;
				values.HasMacrosValue = config.hasMacrosValue || false;
				values.Value = null;
				this.dataValueType = config.dataValueType;
				this.isRequired = config.isRequired;
				this.parentViewModel = config.parentViewModel;
				this.sandbox = config.sandbox;
			},

			/**
			 * Initializes parameter value.
			 * @protected
			 */
			initParameterValue: function(value) {
				this.$Value = value;
			},

			/**
			 * Returns parameter value menu items list.
			 * @protected
			 * @returns {Terrasoft.Collection} Menu items list.
			 */
			getValueMenuItems: function() {
				var result = new Terrasoft.Collection();
				result.add("InputValue",new Terrasoft.BaseViewModel(
					{
						values: {
							Id: "InputValue",
							Caption: resources.localizableStrings.InputValue,
							ImageConfig: this.getImage(resources.localizableImages.InputIcon),
							MarkerValue: "InputValue",
							Enabled: this.$HasMacrosValue,
							Click: "$resetParameterValue"
						}
					}));
				result.add("CustomMacros", new Terrasoft.BaseViewModel(
					{
						values: {
							Id: "CustomMacros",
							Caption: resources.localizableStrings.CustomMacro,
							ImageConfig: this.getImage(resources.localizableImages.MacrosIcon),
							MarkerValue: "CustomMacros",
							Click: "$openEntityMacrosPage"
						}
					}));
				return result;
			},

			/**
			 * Initialize user validators.
			 * @protected
			 */
			setValidationConfig: function() {
				this.addColumnValidator("Value", this.validateValue);
			},

			/**
			 * Add validator for specified column.
			 * @protected
			 * @param {String} columnName Column name for validation.
			 * @param {Function} validatorFn validation function.
			 */
			addColumnValidator: function(columnName, validatorFn) {
				var config = this.validationConfig[columnName] = this.validationConfig[columnName] || [];
				config.push(validatorFn);
			},

			/**
			 * Validation of value attribute.
			 * @protected
			 * @param {Object} value Column Value
			 * @return {Object} Object containing the text of the error during the validation
			 */
			validateValue: function(value) {
				if (this.$HasMacrosValue) {
					return { invalidMessage: "" };
				}
				var column = {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.dataValueType,
					isRequired: this.isRequired
				};
				var result = this.requiredValidator(value, column);
				if (result.invalidMessage) {
					return result;
				}
				return this.typeValidator(value, column);
			},

			/**
			 * Returns config of current parameter input view.
			 * @protected
			 * @returns {Array[Object]} Parameter input view config.
			 */
			getParameterInputConfig: function() {
				return [
					{
						className: "Terrasoft.MultilineLabel",
						contentVisible: true,
						showReadMoreButton: false,
						caption: "$Caption"
					},
					{
						className: "Terrasoft.TextEdit",
						value: "$Value",
						markerValue: this.getControlMarkerValue()
					}
				];
			},

			/**
			 * Returns True when parameter value input is allowed.
			 * @protected
			 * @returns {Boolean} True when parameter value input is allowed.
			 */
			allowValueInput: function() {
				return !this.$HasMacrosValue;
			},

			/**
			 * Handles parameter reset event.
			 * @protected
			 */
			resetParameterValue: function() {
				this.$HasMacrosValue = false;
				this.$Value = null;
			},

			/**
			 * Handler for parameter remove click.
			 * @protected
			 */
			removeParameter: function() {
				this.parentViewModel.fireEvent("removeparameter", this.$Id);
			},

			/**
			 * Formats selected column to macros format.
			 * @protected
			 * @param {String} columnName Column name.
			 * @return {String} Macros.
			 */
			formatMacrosColumn: function(columnName) {
				return Ext.String.format(this.macroTemplate, columnName);
			},

			/**
			 * Handles macros receiving.
			 * @protected
			 * @param {String} macros Macros.
			 */
			onGetMacros: function(macros) {
				this.$HasMacrosValue = true;
				this.$Value = macros;
			},

			/**
			 * Opens DateTime macro constructor page
			 * @protected
			 */
			loadDateTimeMacrosPage: function() {
				var self = this;
				var moduleId = this._getDateTimeMacroModuleId();
				var modalBoxContainer = ModalBox.show({
					heightPixels: 480,
					widthPixels: 360,
					boxClasses: ["dt-modal-box"]
				}, function() {
					this.sandbox.unloadModule(moduleId, modalBoxContainer.id);
				}, this);
				this.sandbox.loadModule("DateTimeMacroConstructorModule", {
					renderTo: modalBoxContainer.id,
					id: moduleId ,
					keepAlive: false,
					parameters: {
						viewModelConfig: {
							DataValueType: self.dataValueType,
							MacroValue: self._getMacroValue()
						}
					}
				});
			},

			/**
			 * Handles select of DateTime macro event.
			 * @protected
			 * @param {String} macro Selected DateTime macro
			 */
			onDateTimeMacroSelected: function(macro) {
				ModalBox.close();
				macro = this.formatMacrosColumn(macro);
				this.onGetMacros(macro);
			},

			/**
			 * Open entity structure explorer module for select column macros.
			 * @protected
			 * @virtual
			 */
			openEntityMacrosPage: function() {
				var macrosEntity = "Contact";
				Terrasoft.StructureExplorerUtilities.open({
					scope: this,
					handlerMethod: this.onMacrosColumnSelected,
					moduleConfig: {
						useBackwards: false,
						schemaName: macrosEntity
					}
				});
			},

			// #endregion

			// #region Methods: Public

			/**
			 * Returns value of parameter.
			 * @public
			 * @returns {String} View config.
			 */
			getParameterValue: function() {
				return this.$Value;
			},

			/**
			 * Returns config of current item view.
			 * @public
			 * @returns {Object} View config.
			 */
			getViewConfig: function() {
				return {
					id: "parameter",
					className: "Terrasoft.Container",
					markerValue: this.getContainerMarkerValue(),
					classes: {
						wrapClassName: ["parameter-item-container"]
					},
					items: [
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["parameter-tools-container"]
							},
							items: [
								{
									className: "Terrasoft.Button",
									markerValue: "remove-" + this.$Name + "-btn",
									classes: {
										wrapperClass: ["value-remove-btn"]
									},
									style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
									imageConfig: "$Resources.Images.RemoveIcon",
									click: "$removeParameter"
								},
								{
									className: "Terrasoft.Button",
									markerValue: "value-menu-" + this.$Name + "-btn",
									classes: {
										wrapperClass: ["value-menu-btn"]
									},
									style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
									imageConfig: "$Resources.Images.ValueIcon",
									menu: {
										id: "innerMenu",
										items: "$getValueMenuItems"
									}
								}
							]
						},
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["parameter-input-container"]
							},
							visible: "$allowValueInput",
							items: this.getParameterInputConfig()
						},
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["macros-input-container"]
							},
							visible: "$HasMacrosValue",
							items: [
								{
									className: "Terrasoft.MultilineLabel",
									contentVisible: true,
									showReadMoreButton: false,
									caption: "$Caption"
								},
								{
									className: "Terrasoft.TextEdit",
									value: "$Value",
									enabled: false,
									markerValue: this.getControlMarkerValue()
								}
							]
						}
					]
				};
			}

			// #endregion

		});
		return Terrasoft.BaseParameterListItemViewModel;
	}
);



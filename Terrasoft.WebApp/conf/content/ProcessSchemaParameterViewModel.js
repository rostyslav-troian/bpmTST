Terrasoft.configuration.Structures["ProcessSchemaParameterViewModel"] = {innerHierarchyStack: ["ProcessSchemaParameterViewModel"]};
define("ProcessSchemaParameterViewModel", [
	"ProcessSchemaParameterViewModelResources",
	"MappingEditMixin"
],	function(resources) {
	Ext.define("Terrasoft.configuration.ProcessSchemaParameterViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.ProcessSchemaParameterViewModel",
		mixins: {
			mappingEditMixin: "Terrasoft.MappingEditMixin"
		},
		sandbox: null,
		columns: {
			Id: {dataValueType: Terrasoft.DataValueType.TEXT},
			UId: {dataValueType: Terrasoft.DataValueType.GUID},
			InvokerUId: {dataValueType: Terrasoft.DataValueType.GUID},
			Name: {dataValueType: Terrasoft.DataValueType.TEXT},
			Caption: {dataValueType: Terrasoft.DataValueType.TEXT},
			DataValueType: {dataValueType: Terrasoft.DataValueType.INTEGER},
			DataValueTypeImage: {dataValueType: Terrasoft.DataValueType.TEXT},
			IsRequired: {dataValueType: Terrasoft.DataValueType.BOOLEAN},
			ReferenceSchemaUId: {dataValueType: Terrasoft.DataValueType.LOOKUP},
			InitialReferenceSchemaUId: {dataValueType: Terrasoft.DataValueType.LOOKUP},
			Value: {dataValueType: Terrasoft.DataValueType.MAPPING},
			Enabled: {dataValueType: Terrasoft.DataValueType.BOOLEAN},
			Visible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			packageUId: {dataValueType: Terrasoft.DataValueType.GUID},
			ParameterEditToolsButtonMenu: {dataValueType: Terrasoft.DataValueType.COLLECTION},
			ActiveParameterEditUId: {dataValueType: Terrasoft.DataValueType.GUID},
			Parameters: {dataValueType: Terrasoft.DataValueType.COLLECTION},
			ProcessElement: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			Direction: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Item properties.
			 */
			ItemProperties: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Has nested parameters.
			 */
			HasNestedParameters: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Is nested control group collapsed.
			 */
			HideNestedItems: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Caption of control group for nested parameters.
			 */
			ControlGroupCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: resources.localizableStrings.CollapseControl
			},

			/**
			 * Parent parameter uId.
			 */
			ParentUId: { dataValueType: Terrasoft.DataValueType.GUID },

			/**
			 * Process schema.
			 */
			ProcessSchema: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},

		//region Methods: Private

		/**
		 * @private
		 */
		_mappingValidator: function(value) {
			var result = {invalidMessage: ""};
			if (value && value.isValid === false && Terrasoft.ProcessSchemaDesignerUtilities.hasMapping(value)) {
				var resource = this.get("Resources.Strings.InavalidMappingColumn");
				result.invalidMessage = resource || "Invalid formula";
			}
			return result;
		},

		/**
		 * @private
		 */
		_onItemPropertiesChanged: function() {
			this.$HasNestedParameters = this.$ItemProperties && !this.$ItemProperties.isEmpty();
		},

		//endregion

		/**
		 * @private
		 */
		_requiredParameterValidator: function(mapping) {
			if ((this.$ProcessElement instanceof Terrasoft.ProcessWebServiceSchema) &&
					this.$IsRequired && !mapping.value && !Ext.isBoolean(mapping.value)) {
				return {invalidMessage: Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage};
			}
			return {invalidMessage: ""};
		},

		/**
		 * @private
		 */
		_initProcessSchema: function(config) {
			if (config && config.values && config.values.ProcessElement) {
				var element = config.values.ProcessElement;
				this.$ProcessSchema = element.parentSchema || element;
			}
		},

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constuctor
		 * @protected
		 */
		constructor: function(config) {
			this.callParent(arguments);
			this._initProcessSchema(config);
			this.addColumnValidator("Value", Terrasoft.ProcessSchemaDesignerUtilities.mappingValidator);
			this.addColumnValidator("Value", this._requiredParameterValidator);
			this.on("change:ItemProperties", this._onItemPropertiesChanged, this);
			this.$HasNestedParameters = this.$ItemProperties && !this.$ItemProperties.isEmpty();
		},

		/**
		 * @inheritdoc MappingEditMixin#getInvokerUId
		 * @override
		 */
		getInvokerUId: function() {
			return this.get("InvokerUId");
		},

		/**
		 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
		 * @override
		 */
		getParameterReferenceSchemaUId: function() {
			return this.get("InitialReferenceSchemaUId");
		},

		/**
		 * Returns parameter edit tools button image.
		 * @protected
		 */
		getParameterEditToolsButtonImage: function() {
			return resources.localizableImages.ParameterEditToolsButtonImage;
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this.un("change:ItemProperties", this._onItemPropertiesChanged, this);
			this.callParent(arguments);
		},

		/**
		 * Handles control group collapsedchange event.
		 * @protected
		 */
		onCollapsedChanged: function() {
			var resourceName = !this.$HideNestedItems ? "ExpandControl" : "CollapseControl";
			this.$ControlGroupCaption = resources.localizableStrings[resourceName];
		},

		// endregion

		// region Methods: Public

		/**
		 * Returns true is $ItemProperties not empty.
		 * @return {Boolean} Has nested parameters.
		 * @public
		 */
		hasItemProperties: function() {
			return this.$ItemProperties && !this.$ItemProperties.isEmpty();
		},

		/**
		 * Returns true if parameter available to use.
		 * @return {Boolean}.
		 * @public
		 */
		isAvailable: function() {
			if (!Terrasoft.Features.getIsEnabled("NoCompilationFeature") && !Terrasoft.isDebug) {
				return true;
			}
			return Terrasoft.isInstanceOfClass(this.$ProcessSchema, "Terrasoft.ProcessSchema")
				? !(this.$ProcessSchema.shouldBeCompiled() && Terrasoft.isEnumerableDataValueType(this.$DataValueType))
				: true;
		},

		/**
		 * Returns true if input parameter is available.
		 * @return {Boolean}
		 * @public
		 */
		isInputParameterAvailable: function() {
			return this.isAvailable() && this.$Direction === Terrasoft.ProcessSchemaParameterDirection.IN;
		}

		// endregion

	});

	return Terrasoft.ProcessSchemaParameterViewModel;
});



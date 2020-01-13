Terrasoft.configuration.Structures["ServiceParameterViewModel"] = {innerHierarchyStack: ["ServiceParameterViewModel"]};
define("ServiceParameterViewModel",
	["ServiceEnums","ServiceMetaItemViewModelMixin","ServiceDesignerUtilities"], function() {
	Ext.define("Terrasoft.services.ServiceParameterViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.ServiceParameterViewModel",
		mixins: {
			ObservableItem: "Terrasoft.ObservableItem",
			MetaItem: "Terrasoft.ServiceMetaItemViewModelMixin"
		},
		attributes: {

			/**
			 * Service parameter.
			 * @type {Terrasoft.ServiceParameter}
			 */
			ServiceParameter: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Name of value type.
			 * @type {String}
			 */
			DataValueTypeName: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Default value complex object of parameter.
			 * @type {Terrasoft.ServiceParameterValue}
			 */
			DefaultValue: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Parameter type.
			 * @type {Terrasoft.ServiceParameterValue}
			 */
			Type: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			}
		},

		/**
		 * Primary column name in grid.
		 */
		primaryColumnName: "Id",
		columns: {

			/**
			 * Parameter UId.
			 * @type {Guid}
			 */
			Id: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Id",
				dataValueType: Terrasoft.core.enums.DataValueType.GUID
			},

			/**
			 * Name of parameter.
			 * @type {String}
			 */
			Name: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Name",
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Parent parameter UId.
			 * @type {Guid}
			 */
			ParentId: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "ParentId",
				dataValueType: Terrasoft.core.enums.DataValueType.GUID
			},

			/**
			 * Url to image of parameter data type.
			 * @type {String}
			 */
			TypeIcon: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "TypeIcon",
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Indicates is parameter array.
			 * @type {Boolean}
			 */
			IsArray: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "IsArray",
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
			},

			/**
			 * Caption of parameter.
			 * @type {String}
			 */
			Caption: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Caption",
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Default value of parameter.
			 * @type {String}
			 */
			DisplayDefValue: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "ValueInDefaultValue",
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Caption of parameter type.
			 * @type {String}
			 */
			TypeCaption: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "TypeCaption",
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			}
		},

		//region Methods: Private

		/**
		 * Update values in columns from attributes with complex types.
		 * @private
		 */
		_updateValues: function() {
			var dataValueTypeName = this.$ServiceParameter.getPropertyValue("dataValueTypeName");
			this.$DisplayDefValue = Terrasoft.ServiceDesignerUtilities.getFormattedValue(this.$DefaultValue, dataValueTypeName);
			this.$TypeCaption = Terrasoft.services.enums.ServiceParameterTypeCaption[this.$Type];
			this.$TypeIcon = Terrasoft.ServiceDesignerUtilities.getImageUrlByDataValueTypeName(this.$DataValueTypeName);
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
		 * @protected
		 * @overridden
		 */
		getAttributeMap: function() {
			return {
				uId: "Id",
				name: "Name",
				isArray: "IsArray",
				dataValueTypeName: "DataValueTypeName",
				caption: "Caption",
				defValue: "DefaultValue",
				type: "Type"
			};
		},

		/**
		 * @inheritdoc BaseObject#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			this.unsubscribeAllItems();
			this.callParent(arguments);
		},

		//endregion

		//region Methods: Public

		/**
		 * Initialize type icon and set event handlers on change view model state.
		 * @public
		 */
		init: function() {
			this.useItemInitialValues = true;
			this.useViewModelToItemBinding = true;
			this.subscribeOnItemChanged(this.$ServiceParameter);
			this._updateValues();
			this.on("change", this._updateValues, this);
		}

		//endregion

	});
	return Terrasoft.ServiceParameterViewModel;
});



Terrasoft.configuration.Structures["BaseContentItemViewModel"] = {innerHierarchyStack: ["BaseContentItemViewModel"]};
/**
 * Base view model for all view models which adds on ContentBuilder sheet.
 */
define("BaseContentItemViewModel", ["BaseContentSerializableViewModelMixin"], function() {
	Ext.define("Terrasoft.configuration.BaseContentItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.BaseContentItemViewModel",

		mixins: {
			SerializableMixin: "Terrasoft.BaseContentSerializableViewModelMixin"
		},

		/**
		 * Creates config clone and defines additional or empty properties.
		 * @protected
		 * @virtual
		 * @param {Object} config Config object from constructor.
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = Terrasoft.deepClone(config);
			changedConfig.Styles = config.Styles || {};
			return changedConfig;
		},

		/**
		 * Extends childItemTypes collection from Terrasoft.BaseContentSerializableViewModelMixin.
		 * Function calls first of all in constructor for defines new or replace existing items in collection.
		 * @protected
		 */
		extendChildrenItemTypes: Terrasoft.emptyFn,

		/**
		 * Extends serializableSlicePropertiesCollection from Terrasoft.BaseContentSerializableViewModelMixin.
		 * Function calls first of all in constructor for defines new or replace existing items in collection.
		 * @protected
		 */
		extendSerializableSlicePropertiesCollection: Terrasoft.emptyFn,

		/**
		 * Constructor which prepared values for create instance.
		 * If class contains children elements - constructor creates child elements.
		 * @public
		 * @param {Object} config Contains values property for create view model instance with defined values properties.
		 * @param {Boolean} isOldElement Flag indicates how view model creates.
		 * If true - view model creates by Terrasoft.ContentBuilderHelper, in otherwise - without helper.
		 */
		constructor: function(config, isOldElement) {
			this.extendChildrenItemTypes();
			this.extendSerializableSlicePropertiesCollection();
			var copiedConfig = Ext.apply({}, config);
			if (isOldElement !== true && config && config.values) {
				var preparedConfig = this.getPreparedConfigBeforeCreate(config.values);
				var values = this.prepareValues(preparedConfig);
				if (preparedConfig.Items) {
					values.Items = new Terrasoft.BaseViewModelCollection();
					Terrasoft.each(preparedConfig.Items, function (item) {
						var vm = this.createItemViewModel(item);
						values.Items.add(vm.$Id, vm);
					}, this);
				}
				copiedConfig.values = values;
				arguments[0] = copiedConfig;
			}
			this.callParent(arguments);
		}
	});
	return Terrasoft.BaseContentItemViewModel;
});



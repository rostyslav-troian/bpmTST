Terrasoft.configuration.Structures["BaseContentSerializableViewModelMixin"] = {innerHierarchyStack: ["BaseContentSerializableViewModelMixin"]};
define("BaseContentSerializableViewModelMixin", [], function() {
	Ext.define("Terrasoft.configuration.mixins.BaseContentSerializableViewModelMixin", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.BaseContentSerializableViewModelMixin",

		/**
		 * View model properties collection which will be serialized.
		 * @protected
		 */
		serializableSlicePropertiesCollection: [],

		/**
		 * Objects contains mapping for children item types created by view model.
		 * @protected
		 */
		childItemTypes: {},

		/**
		 * View model children collection source name.
		 * @protected
		 */
		serializableChildrenCollectionSource: Terrasoft.emptyString,

		/**
		 * @private
		 */
		_sliceViewModel: function(serializedParameters) {
			var result = {};
			Terrasoft.each(serializedParameters, function(parameterName) {
				result[parameterName] = this.get(parameterName);
			}, this);
			return result;
		},

		/**
		 * @private
		 */
		_sliceObject: function(source, serializedParameters) {
			var result = {};
			Terrasoft.each(serializedParameters, function(parameterName) {
				result[parameterName] = source[parameterName];
			}, this);
			return result;
		},

		/**
		 * @private
		 */
		_serializeChildViewModels: function() {
			if (this.serializableChildrenCollectionSource === Terrasoft.emptyString) {
				return undefined;
			}
			var childViewModels = this.get(this.serializableChildrenCollectionSource);
			if (childViewModels === undefined
					&& typeof this[this.serializableChildrenCollectionSource] === "function") {
				childViewModels = this[this.serializableChildrenCollectionSource]();
			}
			var serializedChildCollection = [];
			if(childViewModels) {
				childViewModels.each(function (itemViewModel) {
					if (itemViewModel instanceof Terrasoft.BaseContentItemViewModel) {
						var serializedItem = itemViewModel.serializeViewModel();
						serializedChildCollection.push(serializedItem);
					}
				}, this);
			}
			return serializedChildCollection;
		},

		/**
		 * Serializes view model.
		 * @returns {Object} Serialized view model with their children.
		 */
		serializeViewModel: function() {
			var result = this._sliceViewModel(this.serializableSlicePropertiesCollection);
			var serializedChildCollection = this._serializeChildViewModels();
			if(serializedChildCollection !== undefined) {
				result.Items = serializedChildCollection;
			}
			return result;
		},

		/**
		 * Prepares values for view model constructor.
		 * @public
		 * @param {Object} config Config for create view model.
		 * @returns {Object} Sliced values object.
		 */
		prepareValues: function(config) {
			var values = this._sliceObject(config, this.serializableSlicePropertiesCollection);
			values.Id = config.Id || Terrasoft.generateGUID();
			return values;
		},

		/**
		 * Creates child item view model.
		 * @public
		 * @param {Object} itemConfig Config for create class.
		 * @returns {BaseContentItemViewModel} Returns instance of one of inherited classes BaseContentItemViewModel.
		 */
		createItemViewModel: function(itemConfig) {
			var itemType = itemConfig.ItemType || itemConfig.get("ItemType");
			var className = this.childItemTypes[itemType];
			if (!className) {
				throw Ext.create("Terrasoft.NotImplementedException");
			}
			return Ext.create(className, {values: itemConfig});
		},

		/**
		 * Creates child item from config and adds it into Items collection.
		 * @public
		 * @param {Object} itemConfig Config for create item view model.
		 * @param {Number} index Index for insert element.
		 * @param {Guid} id View model identifier.
		 */
		addChildItem: function(itemConfig, index, id) {
			var vm = this.createItemViewModel(itemConfig);
			index = Ext.isNumber(index) ? index : this.$Items.getCount();
			this.$Items.insert(index, id || vm.$Id, vm);
		},

		/**
		 * Removes child item from Items collection by identifier.
		 * @public
		 * @param {Guid} itemId View model identifier.
		 */
		removeChildItem: function(itemId) {
			var itemToDelete = !Terrasoft.isEmpty(this.$Items) && this.$Items.find(itemId);
			if (itemToDelete) {
				return this.$Items.removeByKey(itemId);
			}
			return false;
		}
	});
	return Terrasoft.BaseContentSerializableViewModelMixin;
});



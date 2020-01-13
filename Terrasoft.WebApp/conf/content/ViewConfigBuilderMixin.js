Terrasoft.configuration.Structures["ViewConfigBuilderMixin"] = {innerHierarchyStack: ["ViewConfigBuilderMixin"]};
define("ViewConfigBuilderMixin", ["ViewConfigBuilderMixinResources"], function(resources) {
	Ext.define("Terrasoft.configuration.mixins.ViewConfigBuilderMixin", {
		alternateClassName: "Terrasoft.ViewConfigBuilderMixin",

		/**
		 * Duplicated viewConfig elements with property names from this config should not be removed.
		 * @protected
		 * @virtual
		 * @type {Object[]}
		 */
		getExcludedPropertyNamesConfig: function() {
			return [{
				itemType : Terrasoft.ViewItemType.GRID,
				excludedPropertyNames : ["activeRowActions"]
			}];
		},

		/**
		 * @private
		 **/
		_getCollectionsToIterate: function(item, propertyNames) {
			const result = [];
			propertyNames.forEach(function(propertyName) {
				const collection = item[propertyName];
				if (!Ext.isEmpty(collection) && !this._isPropertyNameExcludable(item, propertyName)) {
					result.push(collection);
				}
			}, this);
			return result;
		},

		/**
		 * @private
		 **/
		_removeDuplicatesFromObject: function(item, propertyNames) {
			const iterateCollections = this._getCollectionsToIterate(item, propertyNames);
			return this._removeDuplicatesFromArray(iterateCollections, propertyNames);
		},

		/**
		 * @private
		 **/
		_warnAboutRemovingElement: function(name) {
			const messageTemplate = resources.localizableStrings.RemovingElementWarningMessageTemplate;
			window.console.warn(Ext.String.format(messageTemplate, name));
		},

		/**
		 * @private
		 **/
		_removeDuplicatesFromArray: function(items, propertyNames) {
			let indexesToRemove = [];
			const insertedItems = [];
			for (var i = items.length - 1; i >= 0; i--) {
				const item = items[i];
				this.removeDuplicates(item, propertyNames);
				if (item.name) {
					if (insertedItems.indexOf(item.name) >= 0) {
						indexesToRemove.push(i);
					}
					insertedItems.push(item.name);
				}
			}
			indexesToRemove = _.sortBy(indexesToRemove).reverse();
			indexesToRemove.forEach(function(index) {
				this._warnAboutRemovingElement(items[index].name);
				items.splice(index, 1);
			}, this);
		},

		/**
		 * @private
		 **/
		_isPropertyNameExcludable: function(item, propertyName) {
			let result = false;
			const config = this.getExcludedPropertyNamesConfig();
			config.forEach(function(config) {
				if (config.itemType === item.itemType && config.excludedPropertyNames.indexOf(propertyName) >= 0) {
					result = true;
				}
			});
			return result;
		},

		/**
		 * Collects unique property names from all diffs in hierarchy except excludedPropertyNames.
		 * @protected
		 * @param {Object[]} hierarchy The hierarchy of schemas.
		 * @returns {String[]} Returns property names.
		 */
		collectPropertyNames: function(hierarchy) {
			const result = [];
			hierarchy.forEach(function(hierarchyItem) {
				if (hierarchyItem.diff) {
					hierarchyItem.diff.forEach(function(diffItem) {
						const diffItemPropertyName = diffItem.propertyName;
						if (diffItemPropertyName && result.indexOf(diffItemPropertyName) === -1) {
							result.push(diffItemPropertyName);
						}
					});
				}
			});
			return result;
		},

		/**
		 * Applies the package differences on the view of the parent schema.
		 * @protected
		 * @param {Object[]} parentView Configuration parent view of the scheme.
		 * @param {Object[]} diff Package difference. Is an array of modification operations to the parent schema.
		 * @return {Object[]} Returns a structure with the applied package difference.
		 */
		applyViewDiff: function(parentView, diff) {
			return Terrasoft.JsonApplier.applyDiff(parentView, diff);
		},

		/**
		 * Deduplicates viewConfig.
		 * {Object} itemArg ViewConfig or viewConfig part to deduplicate/
		 * {String[]} propertyNames Property names.
		 */
		removeDuplicates: function(itemArg, propertyNames) {
			Ext.isArray(itemArg) ?  this._removeDuplicatesFromArray(itemArg, propertyNames) :
				this._removeDuplicatesFromObject(itemArg, propertyNames);
		},

		/**
		 * Adds deduplicated viewConfig to each schema in hierarchy.
		 * @param {Object[]} hierarchy The hierarchy of schemas.
		 */
		addViewConfigs: function(hierarchy) {
			let viewConfig = [];
			const propertyNames = this.collectPropertyNames(hierarchy);
			Terrasoft.each(hierarchy, function(hierarchyItem) {
				viewConfig = this.applyViewDiff(viewConfig, hierarchyItem.diff);
				this.removeDuplicates(viewConfig, propertyNames);
				if (Ext.isEmpty(hierarchyItem.viewConfig)) {
					hierarchyItem.viewConfig = viewConfig;
				}
			}, this);
		}
	});
});



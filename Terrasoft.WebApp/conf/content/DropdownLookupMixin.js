Terrasoft.configuration.Structures["DropdownLookupMixin"] = {innerHierarchyStack: ["DropdownLookupMixin"]};
define("DropdownLookupMixin", [], function() {
	Ext.define("Terrasoft.configuration.mixins.DropdownLookupMixin", {
		alternateClassName: "Terrasoft.DropdownLookupMixin",

		/**
		 * Initializes value of Current Lookup.
		 * @public
		 * @param {Boolean} isDefaultValue Is selected value default.
		 * @param {String} lookupName Name of current lookup.
		 * @param {String} alterValueName Name of not default value item.
		 * @param {Object} scope Current scope.
		 * @param {Object} options Specific options.
		 */
		setLookupValue: function(isDefaultValue, lookupName, alterValueName, scope, options) {
			var lookupEnumName = lookupName + "Enum";
			var lookupEnum = scope.get(lookupEnumName);
			var lookupValue = isDefaultValue
				? lookupEnum.Default.value
				: lookupEnum[alterValueName].value;
			var lookupList = this.getListFromEnum(lookupEnumName, scope);
			var lookupItems = lookupList.getItems();
			scope.set(lookupName, lookupItems[lookupValue], options);
		},

		/**
		 * Returns value to set for Lookup.
		 * @public
		 * @param {String} lookupEnumName Name of current lookup enum.
		 * @param {String} value Selected value as key.
		 * @param {Object} scope Current scope.
		 * @return {Object} Lookup value to set.
		 */
		getLookupValueForInit: function(lookupEnumName, value, scope) {
			var lookupList = this.getListFromEnum(lookupEnumName, scope);
			var lookupItems = lookupList.getItems();
			return lookupItems[value];
		},

		/**
		 * Loads the Terrasoft.Collection created from enum into the list.
		 * @public
		 * @param {String} enumName Name of the enum.
		 * @param {Terrasoft.Collection} list.
		 * @param {Object} scope Current scope.
		 */
		prepareList: function(enumName, list, scope) {
			var collection = this.getListFromEnum(enumName, scope);
			list.clear();
			list.loadAll(collection);
		},

		/**
		 * Returns Terrasoft.Collection created from the enum definition.
		 * @private
		 * @param {String} enumName.
		 * @param {Object} scope Current scope.
		 * return {Terrasoft.Collection}.
		 */
		getListFromEnum: function(enumName, scope) {
			var collection = scope.get(enumName + "List");
			if (collection) {
				return collection;
			}
			var enums = scope.get(enumName);
			collection = scope.Ext.create("Terrasoft.Collection");
			scope.Terrasoft.each(enums, function(item) {
				collection.add(item.value, {
					value: item.value,
					displayValue: scope.get(item.captionName)
				});
			}, scope);
			scope.set(enumName + "List", collection);
			return collection;
		},

		/**
		 * Returns value of the lookup property by name.
		 * @private
		 * @param {String} parameterName Name of the lookup property.
		 * @param {Object} scope Current scope.
		 * @return {Object}.
		 */
		getLookupValue: function(parameterName, scope) {
			var value = scope.get(parameterName);
			return value ? value.value : null;
		},

		/**
		 * Returns true if second item selected
		 * @param {string} lookupName Current lookup name.
		 * @param {string} value Expected lookup value.
		 * @param {Object} scope Current scope.
		 * @public
		 * @return {Boolean} is current item selected
		 */
		isLookupValueEqual: function(lookupName, value, scope) {
			var result = this.getLookupValue(lookupName, scope);
			return result === value;
		},

		/**
		 * Returns EntitySchemaQuery for current lookup.
		 * @private
		 * @param {string} entitySchemaName name of current lookup schema.
		 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery for current lookup.
		 */
		getEsqForLookup: function(entitySchemaName) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: entitySchemaName
			});
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
			return esq;
		},

		/**
		 * Loads data to init source collection of Expected entity type to display.
		 * @public
		 * @param {Terrasoft.FilterGroup} filterGroup Filters to apply.
		 * @param {string} filterParameter text for search.
		 * @param {string} columnName Name of root schema for lookup.
		 * @param {string} listAttrName Name of collection to bind lookup.
		 * @param {object} scope caller's context.
		 */
		prepareLookupList: function(filterGroup, filterParameter, columnName, listAttrName, scope) {
			var esq = this.getEsqForLookup(columnName);
			filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.CONTAIN, "Name", filterParameter));
			esq.filters.add(filterGroup);
			esq.getEntityCollection(function(result) {
				if (!result.success) {
					return;
				}
				var viewModelCollection = Ext.create("Terrasoft.Collection");
				result.collection.each(function(el) {
					var item = el.values;
					item.Id = item.value;
					viewModelCollection.add(item.value, item);
				});
				scope.set(listAttrName, viewModelCollection);
			});
		}
	});

	return Terrasoft.DropdownLookupMixin;
});



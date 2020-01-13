/**
 * A class that implements the use of an array-difference on a JSON object
 */
Ext.define("Terrasoft.json.JsonApplier", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.JsonApplier",
	singleton: true,

	//region Properties: Private

	/**
	 * The object to which the changes apply
	 * @private
	 * @type {Object}
	 */
	sourceObject: null,

	/**
	 * An object that caches search results
	 * @private
	 * @type {Terrasoft.MemoryStore}
	 */
	memoryStore: null,

	/**
	 * An object that contains information about the required parameters for an action
	 * @private
	 * @type {Object}
	 */
	operationRequiredParameters: {
		insert: [],
		set: ["name", "values"],
		merge: ["name", "values"],
		move: ["name"],
		remove: ["name"]
	},

	/**
	 * The name of the parameter containing the name of the operation on the object
	 * @private
	 * @type {String}
	 */
	operationParameterName: "operation",

	/**
	 * Items aliases.
	 * @private
	 * @type {Object}
	 * Example:
	 *
	 *      {
	 *      		"operation": "insert",
	 *      		"name": "NewName",
	 *      		"parentName": "ProfileContainer",
	 *      		"propertyName": "items",
	 *      		"values": {
	 *      			"bindTo": "Name",
	 *      	        		"layout": {
	 *      				"column": 0,
	 *      				"row": 0,
	 *      				"colSpan": 24
	 *      			}
	 *      		},
	 *      		"alias": {
	 *      			name: "Name",
	 *      			excludeProperties: ["layout"]
	 *      		}
	 *      	}
	 *        and ...
	 *        {
	 *      		 "operation": "merge",
	 *      		 "name": "Name",
	 *      		 "values": {
	 *      			 "layout": {
	 *      				 "column": 0,
	 *      				 "row": 0,
	 *      				 "colSpan": 2
	 *      			 },
	 *      			 "markerValue": "new marker value"
	 *      		 }
	 *      	 }
	 *
	 * Result:
	 *
	 *      {
	 *  		"operation": "insert",
	 *  		"name": "NewName",
	 *  		"parentName": "ProfileContainer",
	 *  		"propertyName": "items",
	 *  		"values": {
	 *  			"bindTo": "Name",
	 *  			"layout": {
	 *  				"column": 0,
	 *  				"row": 0,
	 *  				"colSpan": 24
	 *  			},
	 *  			"markerValue": "new marker value"
	 *  		}
	 *  	}
	 *
	 */
	aliases: null,

	//endregion

	//region Methods: Private

	/**
	 * Hierarchically removes an object from the storage
	 * @private
	 * @param {Object} item The item to be deleted
	 */
	removeFromCache: function(item) {
		Terrasoft.iterateChildItems(item, function(iterationConfig) {
			var item = iterationConfig.item;
			this.memoryStore.removeItem(item.name);
		}, this);
		this.memoryStore.removeItem(item.name);
	},

	/**
	 * Finds element by name in parent object structure.
	 * @private
	 * @param {String} name Element name.
	 * @param {Object} parent The object in which there is a search.
	 * @return {Object} Object that contains information about items found.
	 * @return {String} return.nameTo Parent element name.
	 * @return {Object} return.item Json object element.
	 */
	findItemInfo: function(name, parent) {
		if (Ext.isEmpty(name)) {
			return null;
		}
		var cachedItem = this.memoryStore.getItem(name);
		if (cachedItem) {
			return cachedItem;
		}
		var aliases = this.aliases;
		var alias = aliases && aliases[name];
		var aliasName = alias && alias.name;
		var result = null;
		Terrasoft.iterateChildItems(parent, function(iterationConfig) {
			var item = iterationConfig.item;
			var isAliasFound = aliasName && item.name === aliasName;
			var isItemFound = item.name === name || isAliasFound;
			if (!iterationConfig.childIterationResult || isItemFound) {
				var parentName = iterationConfig.parent.name;
				var currentItemInfo = {
					item: item,
					parentName: parentName,
					propertyName: iterationConfig.propertyName
				};
				this.memoryStore.setItem(item.name, currentItemInfo);
				if (isItemFound) {
					result = currentItemInfo;
				}
			}
			return (!isItemFound);
		}, this);
		return result;
	},

	/**
	 * Searches for an element by name in the structure of the current object
	 * @private
	 * @param {String} name Element name
	 * @return {Object} An object containing information about the found element
	 * @return {String} return.nameTo The name of the parent element
	 * @return {Object} return.item The json object element
	 */
	findItemInfoInSourceObject: function(name) {
		var rootSearchObject = {
			items: this.sourceObject
		};
		return this.findItemInfo(name, rootSearchObject);
	},

	/**
	 * Checks for the presence of fields in the object
	 * @private
	 * @throws {Terrasoft.InvalidObjectState}
	 * @param {Object} operationConfig The object to test
	 * @param {String []} requiredParameters Array of required fields
	 */
	checkRequiredParameters: function(operationConfig, requiredParameters) {
		if (Ext.isEmpty(requiredParameters)) {
			return;
		}
		Terrasoft.each(requiredParameters, function(parameterName) {
			if (!operationConfig[parameterName]) {
				var errorMessage = Ext.String.format(
					Terrasoft.Resources.JsonApplier.Exception.RequiredParameterNotFound,
					parameterName
				);
				throw new Terrasoft.InvalidObjectState({
					message: errorMessage
				});
			}
		}, this);
	},

	/**
	 * Returns an object separated operations.
	 * @private
	 * @param {Object} operations Differences operations.
	 * @return {Object} Converted internal collection operations.
	 */
	getSplittedOperations: function(operations) {
		var result = {
			merge: [],
			set: [],
			removeProperties: [],
			remove: [],
			move: [],
			insert: []
		};
		Terrasoft.each(operations, function(operationItem) {
			this.checkOperation(operationItem);
			var operation = operationItem.operation;
			if (this.isExcludeAliasOperation(operationItem.name, operation, operationItem.properties)) {
				return;
			}
			switch (operation) {
				case "merge":
					result.merge.push(operationItem);
					break;
				case "set":
					result.set.push(operationItem);
					break;
				case "insert":
					result.insert.push(operationItem);
					break;
				case "move":
					result.move.push(operationItem);
					break;
				case "remove":
					var properties = operationItem.properties;
					if (properties && Ext.isArray(properties)) {
						result.removeProperties.push(operationItem);
					} else {
						result.remove.push(operationItem);
					}
					break;
				default:
			}
		}, this);
		return result;
	},

	/**
	 * Converts the move operation to remove
	 * @private
	 * @param {Object} operationItem The operation object
	 * @return {Object} Conversion result
	 */
	convertMoveOperationToRemove: function(operationItem) {
		var result = {};
		var operationItemName = operationItem.name;
		var item = Terrasoft.deepClone(this.findItemInfoInSourceObject(operationItemName));
		if (item) {
			var removeOperationItem = {
				parentName: item.parentName || item.nameTo,
				propertyName: item.propertyName,
				index: item.propertyName,
				operation: "remove",
				name: operationItemName
			};
			result = removeOperationItem;
		}
		return result;
	},

	/**
	 * Converts the move operation to insert
	 * @private
	 * @param {Object} operationItem The operation object
	 * @return {Object} Conversion result
	 */
	convertMoveOperationToInsert: function(operationItem) {
		var result = {};
		var operationItemName = operationItem.name;
		var item = Terrasoft.deepClone(this.findItemInfoInSourceObject(operationItemName));
		if (item) {
			var insertOperationItem = {
				values: item.item
			};
			delete insertOperationItem.values.name;
			Ext.apply(insertOperationItem, operationItem);
			insertOperationItem.operation = "insert";
			result = insertOperationItem;
		}
		return result;
	},

	/**
	 * In the correct sequence, applies a list of operations of object difference
	 * @private
	 * @param {Object} operations List of operations
	 */
	applyOperations: function(operations) {
		var splittedOperations = this.getSplittedOperations(operations);
		this.applyOperationGroup(this.merge, splittedOperations.merge);
		this.applyChangePositionOperationGroup(splittedOperations.remove, splittedOperations.insert,
			splittedOperations.move);
		this.applyOperationGroup(this.remove, splittedOperations.removeProperties);
		this.applyOperationGroup(this.set, splittedOperations.set);
	},

	/**
	 * Removes extra move operation with objects, that are removed.
	 * @param {Object} removes Remove operation list.
	 * @param {Object} moves Move operation list.
	 */
	filterMoveOperation: function(removes, moves) {
		Terrasoft.each(removes, function(removesItem) {
			moves = Ext.Array.filter(moves, function(movesItem) {
				return removesItem.name !== movesItem.name;
			});
		}, this);
		return moves;
	},

	/**
	 * Applies remove, insert, move operation list in the correct sequence.
	 * @private
	 * @param {Array} removes Remove operation list.
	 * @param {Array} inserts Insert operation list.
	 * @param {Array} moves Move operation list.
	 */
	applyChangePositionOperationGroup: function(removes, inserts, moves) {
		moves = this.filterMoveOperation(removes, moves);
		Ext.Array.insert(removes, removes.length, moves);
		var removeOperations = [];
		Terrasoft.each(removes, function(operationItem) {
			removeOperations.push(this.convertMoveOperationToRemove(operationItem));
		}, this);
		removeOperations = this.getOperationsSequenceByPath(removeOperations, false);
		var insertOperations = [];
		var objectNameOperationsGroup = this.getObjectNameOperationsGroup(moves);
		Terrasoft.each(removeOperations, function(operationItem) {
			var objectNameOperations = objectNameOperationsGroup[operationItem.name];
			if (Ext.isArray(objectNameOperations)) {
				objectNameOperations.forEach((moveOperation) => {
					var insertOperation = this.convertMoveOperationToInsert(moveOperation);
					insertOperations.push(insertOperation);
				});
			}
			this.remove(operationItem);
		}, this);
		Ext.Array.insert(inserts, inserts.length, insertOperations);
		inserts = this.getOperationsSequenceByPath(inserts, true);
		var unsuccessful = this.applyOperationGroup(this.insert, inserts);
		if (Ext.isArray(unsuccessful) && unsuccessful.length > 0) {
			this.applyUnsuccessfulInsertOperationGroup(unsuccessful);
		}
	},

	/**
	 * Applies insert operation list in the correct sequence repeatedly.
	 * @private
	 * @param {Array} unsuccessful Unsuccessful insert operation list.
	 */
	applyUnsuccessfulInsertOperationGroup: function(unsuccessful) {
		unsuccessful.forEach((unsuccessfulItem, index) => {
			unsuccessfulItem.operation = "move";
			if (!this.findItemInfoInSourceObject(unsuccessfulItem.parentName)) {
				unsuccessful.splice(index, 1);
			}
		});
		if (unsuccessful.length > 0) {
			this.applyChangePositionOperationGroup([], [], unsuccessful);
		}
	},

	/**
	 * Applies operation group according specified method.
	 * @private
	 * @param {Function} operationMethod Operation method.
	 * @param {Array} operations Operation list.
	 * @return {Array} Unsuccessful operations.
	 */
	applyOperationGroup: function(operationMethod, operations) {
		var unsuccessful = [];
		Terrasoft.each(operations, function(operationItem) {
			if (!operationMethod.call(this, operationItem)) {
				unsuccessful.push(operationItem);
			}
		}, this);
		return unsuccessful;
	},

	/**
	 * Group operations by object name
	 * @private
	 * @param {Object} operations List of operations
	 * @return {Object} Operations groups
	 */
	getObjectNameOperationsGroup: function(operations) {
		var result = {};
		operations.forEach((operationItem) => {
			var name = operationItem.name;
			result[name] = result[name] || [];
			result[name].push(operationItem);
		});
		return result;
	},

	/**
	 t * Gets the hierarchy of operations objects
	 t * @private
	 t * @param {Object} operations List of operations
	 t * @return {Object} The operation object hierarchy
	 t */
	getOperationHierarchy: function(operations) {
		var result = {};
		operations.forEach((operationItem) => {
			var name = operationItem.name;
			var parentName = operationItem.parentName || "_";
			var propertyName = operationItem.propertyName || "_";
			result[name] = {
				parentName: parentName,
				propertyName: propertyName
			};
		});
		return result;
	},

	/**
	 * Returns the object path in the operation object hierarchy
	 * @private
	 * @param {String} name Name of the object
	 * @param {Object} operationHierarchy The operation objects hierarchy
	 * @param {String} resultOut Intermediate result
	 * @return {String} The object path in the operation object hierarchy
	 */
	getOperationItemPath: function(name, operationHierarchy, resultOut = "") {
		var result = resultOut;
		if (operationHierarchy[name]) {
			var parentName = operationHierarchy[name].parentName;
			var propertyName = operationHierarchy[name].propertyName;
			result = parentName + "=" + propertyName + "==" + result;
			result = this.getOperationItemPath(parentName, operationHierarchy, result);
		}
		return result;
	},

	/**
	 * Adds information about the path of the operation object element in the list of operation objects
	 * @private
	 * @param {Object[]} operations List of operations
	 * @return {Object} List of operations with paths
	 */
	addOperationItemPathInfo: function(operations) {
		var result = [];
		var operationHierarchy = this.getOperationHierarchy(operations);
		operations.forEach((operationItem) => {
			operationItem.__path = this.getOperationItemPath(operationItem.name, operationHierarchy);
			result.push(operationItem);
		});
		return result;
	},

	/**
	 * Performs the grouping of operations along the path of the operation object element in the list of operation objects
	 * @private
	 * @param {Object} operations List of operations
	 * @param {Boolean} isASC Sort by ascend
	 * @return {Object}
	 */
	getOperationPathGroupsInfo: function(operations, isASC) {
		var sortOrder = (isASC) ? 1 : -1;
		var result;
		var groups = {};
		var order = [];
		operations.forEach((operationItem) => {
			var path = operationItem.__path;
			groups[path] = groups[path] || [];
			groups[path].push(operationItem);
			Ext.Array.include(order, path);
		});
		result = {
			groups: groups,
			order: order.sort(function(itemA, itemB) {
				var sortResult;
				if (itemA.length === itemB.length) {
					sortResult = 0;
				} else if (itemA.length > itemB.length) {
					sortResult = sortOrder;
				} else {
					sortResult = (sortOrder * -1);
				}
				return sortResult;
			})
		};
		return result;
	},

	/**
	 * Creates a sequence of insertion operations
	 * @private
	 * @param {Object[]} operations List of operations
	 * @param {Boolean} isASC Sort by ascend
	 * @return {Object} List of operations in the correct sequence
	 */
	getOperationsSequenceByPath: function(operations, isASC) {
		operations = this.addOperationItemPathInfo(operations);
		var operationPathGroupsInfo = this.getOperationPathGroupsInfo(operations, isASC);
		var pathOrder = operationPathGroupsInfo.order;
		var pathGroups = operationPathGroupsInfo.groups;
		var result = [];
		if (Terrasoft.Features.getIsEnabled("UseJsonApplierOldSortFunction")) {
			pathOrder.forEach((path) => {
				var sortOrder = (isASC) ? 1 : -1;
				const pathOperationCollection = pathGroups[path].sort((itemA, itemB) => {
					var sortResult;
					if (!itemA.index && !itemB.index) {
						sortResult = 0;
					} else if (itemA.index > itemB.index) {
						sortResult = sortOrder;
					} else {
						sortResult = (sortOrder * -1);
					}
					return sortResult;
				});
				Ext.Array.insert(result, result.length, pathOperationCollection);
			});
			return result;
		}
		pathOrder.forEach((path) => {
			const pathOperationCollection = _.sortBy(pathGroups[path], "index");
			if (!isASC) {
				pathOperationCollection.reverse();
			}
			Ext.Array.insert(result, result.length, pathOperationCollection);
		});
		return result;
	},

	/**
	 * Saves alias to object if it exists in the config.
	 * @private
	 * @param {Object} config Action configuration item.
	 * @param {Name} config.name Item name.
	 * @param {Object} [config.alias] item alias.
	 */
	saveAlias: function(config) {
		if (Ext.isEmpty(config.alias)) {
			return;
		}
		var cloneConfig = Terrasoft.deepClone(config);
		var alias = cloneConfig.alias;
		if (Ext.isEmpty(this.aliases)) {
			this.aliases = {};
		}
		var aliasName = alias.name;
		alias.name = cloneConfig.name;
		this.aliases[aliasName] = alias;
	},

	/**
	 * Resets all aliases.
	 * @private
	 */
	resetAliases: function() {
		this.aliases = null;
	},

	/**
	 * Excludes properties of configValues if they are found in alias exclude array.
	 * @private
	 * @param {String} name Action configuration property name.
	 * @param {Object} configValues Action configuration property values.
	 * @return {Array} Action configuration properties without alias exclude properties.
	 */
	excludeAliasProperties: function(name, configValues) {
		var properties = Object.keys(configValues);
		var alias = this.aliases && this.aliases[name];
		var excludeProperties = alias && alias.excludeProperties;
		if (excludeProperties) {
			properties = Ext.Array.difference(properties, excludeProperties);
		}
		return properties;
	},

	/**
	 * Returns operation has in alias excludeOperations properties.
	 * @private
	 * @param {String} name Action item name.
	 * @param {String} operationName Operation name.
	 * @param {Object|null|undefined} [properties] Operation properties.
	 * @return {Boolean} Operation has in alias excludeOperations properties.
	 */
	isExcludeAliasOperation: function(name, operationName, properties) {
		if (properties && operationName === "remove") {
			return false;
		}
		var alias = this.aliases && this.aliases[name];
		var excludeOperations = alias && alias.excludeOperations;
		return Terrasoft.contains(excludeOperations, operationName);
	},

	/**
	 * Performs insert action.
	 * @private
	 * @throws {Terrasoft.InvalidOperationException}
	 * @param {Object} config Action configuration.
	 * @return {Boolean} If item was inserted correctly.
	 */
	insert: function(config) {
		var obsoleteMessage;
		var parentName = config.parentName;
		var name = config.name;
		if (config.nameTo) {
			obsoleteMessage = Terrasoft.Resources.JsonApplier.ObsoleteMessages.ParameterNameObsolete;
			this.log(Ext.String.format(obsoleteMessage, "nameTo", "parentName"), Terrasoft.LogMessageType.ERROR);
			parentName = config.nameTo;
		}
		var itemInfo = this.findItemInfoInSourceObject(parentName);
		var parentExists = !(!itemInfo && config.parentName);
		var item = config.values || {};
		this.saveAlias(config);
		var parent = (itemInfo === null) ? this.sourceObject : itemInfo.item[config.propertyName];
		if (Ext.isEmpty(name)) {
			obsoleteMessage = Terrasoft.Resources.JsonApplier.ObsoleteMessages.PropertyInParameterObsolete;
			this.log(Ext.String.format(obsoleteMessage, "values", "name"), Terrasoft.LogMessageType.WARNING);
		} else {
			Ext.apply(item, {name: name});
		}
		if (Ext.isArray(parent)) {
			var itemIndex = Ext.isEmpty(config.index) ? parent.length : config.index;
			Ext.Array.insert(parent, itemIndex, [item]);
		} else if (Ext.isObject(parent)) {
			itemInfo.item[config.propertyName] = item;
		} else {
			var errorMessage = Ext.String.format(
				Terrasoft.Resources.JsonApplier.Exception.NotContainerItemInsertException,
				parentName
			);
			throw new Terrasoft.InvalidOperationException({
				message: errorMessage
			});
		}
		return parentExists;
	},

	/**
	 * Performs an item rewriting operation
	 * @private
	 * @param {Object} config Configuration of the action
	 * @return {Boolean} If item has parent.
	 */
	set: function(config) {
		var parentName = config.parentName;
		if (config.nameTo) {
			var obsoleteMessage = Terrasoft.Resources.JsonApplier.ObsoleteMessages.ParameterNameObsolete;
			this.log(Ext.String.format(obsoleteMessage, "nameTo", "parentName"), Terrasoft.LogMessageType.ERROR);
			parentName = config.nameTo;
		}
		var itemInfo = this.remove(config);
		var parentExists = !Ext.isEmpty(itemInfo);
		if (parentExists) {
			config.index = itemInfo.index;
			config.nameTo = parentName;
			config.parentName = parentName;
			config.propertyName = itemInfo.propertyName;
		}
		this.insert(config);
		return parentExists;
	},

	/**
	 * Performs update action.
	 * @private
	 * @throws {Terrasoft.InvalidOperationException}
	 * @param {Object} config Action configuration.
	 * @return {Boolean} If item was merged correctly.
	 */
	merge: function(config) {
		var itemInfo = this.findItemInfoInSourceObject(config.name);
		var parentExists = !Ext.isEmpty(itemInfo);
		if (parentExists) {
			Terrasoft.each(itemInfo.item, function(property, propertyName) {
				var firstChild = Ext.isArray(property) ? property[0] : property;
				if (Terrasoft.isItemConfig(firstChild) && config.values.hasOwnProperty(propertyName)) {
					var errorMessage = Ext.String.format(
						Terrasoft.Resources.JsonApplier.Exception.ItemWithItemsPropertyMergeException,
						config.name, propertyName
					);
					throw new Terrasoft.InvalidOperationException({
						message: errorMessage
					});
				}
			}, this);
			var properties = this.excludeAliasProperties(config.name, config.values);
			Terrasoft.each(properties, function(propertyName) {
				itemInfo.item[propertyName] = config.values[propertyName];
			}, this);
		}
		return parentExists;
	},

	/**
	 * Performs a deleting action of an item
	 * @private
	 * @param {Object} config Configuration of the action
	 * @return {Object} Object-information about the remote object
	 * @return {Number} return.index The index of the remote element in the parent
	 * @return {Object} return.item The remote object
	 * @return {String} return.nameTo Parent name
	 */
	remove: function(config) {
		var result = {};
		var itemInfo = this.findItemInfoInSourceObject(config.name);
		if (Ext.isEmpty(itemInfo)) {
			return null;
		}
		var removeProperties = config.properties;
		if (removeProperties && Ext.isArray(removeProperties)) {
			var itemProperties = itemInfo.item;
			removeProperties.forEach((removeProperty) => {
				delete itemProperties[removeProperty];
			});
		} else {
			var removedItem = itemInfo.item;
			var parentItemName = itemInfo.parentName;
			if (itemInfo.nameTo) {
				var obsoleteMessage = Terrasoft.Resources.JsonApplier.ObsoleteMessages.ParameterNameObsolete;
				this.log(Ext.String.format(obsoleteMessage, "nameTo", "parentName"), Terrasoft.LogMessageType.ERROR);
				parentItemName = itemInfo.nameTo;
			}
			var parentItemInfo = this.findItemInfoInSourceObject(parentItemName);
			var items = (parentItemInfo) ? parentItemInfo.item[itemInfo.propertyName] : this.sourceObject;
			var itemIndex = 0;
			if (Ext.isArray(items)) {
				itemIndex = items.indexOf(removedItem);
				items.splice(itemIndex, 1);
			} else {
				delete parentItemInfo.item[itemInfo.propertyName];
			}
			this.removeFromCache(removedItem);
			result = {
				index: itemIndex,
				item: removedItem,
				nameTo: parentItemName,
				parentName: parentItemName,
				propertyName: itemInfo.propertyName
			};
		}
		return result;
	},

	/**
	 * Checks for the required parameters in the action configuration
	 * @private
	 * @param {Object} config Configuration of the action
	 */
	checkOperation: function(config) {
		var name = config.name;
		var parentName = config.parentName;
		if (!Ext.isEmpty(name) && parentName === name) {
			throw new Terrasoft.InvalidOperationException({
				message: Ext.String.format(Terrasoft.Resources.JsonApplier.Exception.LoopDependency, name)
			});
		}
		this.checkRequiredParameters(config, [this.operationParameterName]);
		var operationName = config[this.operationParameterName];
		this.checkRequiredParameters(config, this.operationRequiredParameters[operationName]);
	},

	//endregion

	//region Methods: Public

	/**
	 * Applies the difference in JSON object.
	 * @throws {Terrasoft.InvalidObjectState}
	 * @param {Object} sourceObject JSON object.
	 * @param {Object} operations Difference object.
	 * @return {Object} Applied JSON object.
	 */
	applyDiff: function(sourceObject, operations) {
		var result;
		this.memoryStore = Ext.create("Terrasoft.MemoryStore");
		this.sourceObject = Terrasoft.deepClone(sourceObject);
		if (Ext.isEmpty(sourceObject)) {
			this.resetAliases();
		}
		try {
			var innerOperationCollection = Terrasoft.deepClone(operations);
			this.applyOperations(innerOperationCollection);
			result = this.sourceObject;
		} finally {
			this.sourceObject = null;
			this.memoryStore.destroy();
			this.memoryStore = null;
		}
		return result;
	}

	//endregion

});

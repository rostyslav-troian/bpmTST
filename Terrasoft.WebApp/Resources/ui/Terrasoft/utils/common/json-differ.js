Ext.ns("Terrasoft.json");

/** @enum
 * Type of operation of the modification
 */
Terrasoft.ObjectModificationType = {

	/** No changes */
	NONE: 0,

	/** Insert */
	INSERT: 1,

	/** Delete */
	REMOVE: 2,

	/** Edit */
	MERGE: 3,

	/** Delete attribute */
	REMOVE_PROPERTY: 4,

	/** Change position */
	CHANGE_POSITION: 5,

	/** Move */
	MOVE: 6

};

/**
 * Full name for {@link Terrasoft.ObjectModificationType}
 * @inheritdoc Terrasoft.ObjectModificationType
 */
Terrasoft.json.ObjectModificationType = Terrasoft.ObjectModificationType;

/**
 * Class forming the list of operations of object difference
 */
Ext.define("Terrasoft.json.JsonDiffer", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.JsonDiffer",
	singleton: true,

	//region Properties: Private

	/**
	 * Utility for getting object differences
	 * @type {Object}
	 */
	patch: null,

	/**
	 * The configuration object of special object parameter names
	 * @type {Object}
	 */
	objectProperties: {

		/**
		 * Name of the name parameter of the parent object
		 * @type {String}
		 */
		parent: "parentName",

		/**
		 * Property name of the parent property of the object
		 * @type {String}
		 */
		parentPropertyName: "propertyName",

		/**
		 * The name of the index parameter in the parent collection
		 * @type {String}
		 */
		index: "index",

		/**
		 * Name of the operational name parameter of the object
		 * @type {String}
		 */
		operationalName: "__operationalName",

		/**
		 * Name of object name parameter
		 * @type {String}
		 */
		name: "name",

		/**
		 * Root object name
		 * @type {String}
		 */
		root: "__root",

		/**
		 * Name of the element type ID of the object difference
		 * @type {String}
		 */
		patchDiffNodeTypeSymbol: "_t"

	},

	/**
	 * Delimiter for building element path.
	 * @type {String}
	 */
	pathDelimiter: "(#@",

	/**
	 * Name of the move parameter
	 * @type {String[]}
	 */
	moveOperationProperties: ["parentName", "propertyName", "index"],

	/**
	 * Operational parameters
	 * @type {Object}
	 */
	operationalValues: {},

	//endregion

	//region Methods: Private

	/**
	 * Initializes an instance of the class
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		const jsondiffpatch = window.jsondiffpatch;
		jsondiffpatch.config.objectHash = function(object) {
			if (Ext.isString(object.name)) {
				return object.name;
			}
		};
		this.patch = jsondiffpatch;
	},

	/**
	 * Checks the need to bring the object to a flat view
	 * @private
	 * @param {Object} sourceObject The object to test
	 * @param {Boolean} resultOut Intermediate result of execution
	 * @return {Object} A flag of the need to be brought to a flat form
	 */
	needFlatten: function(sourceObject, resultOut) {
		let result = resultOut || false;
		result = !Ext.isEmpty(sourceObject.name);
		if (!result) {
			if (Ext.isArray(sourceObject) && (sourceObject.length > 0)) {
				result = !Ext.isEmpty(sourceObject[0].name);
			} else if (Ext.isObject(sourceObject)) {
				Terrasoft.each(sourceObject, function(item) {
					result = this.needFlatten(item, result);
				}, this);
			}
		}
		return result;
	},

	/**
	 * Determines property for using like a key for building flattenObject.
	 * @private
	 * @param {String} path Path of sourceObject.
	 * @param {String} name Name of sourceObject.
	 * @param {Object} options Options.
	 * @param {Boolean} options.identifyItemByPath Whether to build flat object by sourceObject paths.
	 * @return {String} According to options.identifyItemByPath flag returns key for flattenObject.
	 */
	_getFlattenObjectKey: function(path, name, options) {
		return options && options.identifyItemByPath ? path : name;
	},

	/**
	 * Converts a presentation schema object from a hierarchical view to a flat view.
	 * @private
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * Raises an exception if the object does not have a name property.
	 * @throws {Terrasoft.ItemAlreadyExistsException}
	 * Generates an exception if the name property is duplicated.
	 * @param {Object} sourceObject The view schema object.
	 * @param {Object} flatObjectOut Flat object.
	 * @param {String} parentObjectName The name of the parent object.
	 * @param {Number} itemIndex The index of the element in the array.
	 * @param {String} propertyNameOut Property name.
	 * @param {Object} options Options.
	 * @param {Boolean} options.identifyItemByPath Whether to build flat object by sourceObject paths.
	 * @return {Object} Returns a flat object.
	 */
	flattenObject: function(sourceObject, flatObjectOut, parentObjectName, itemIndex, propertyNameOut, options) {
		let flatObject = flatObjectOut || {};
		let path = parentObjectName || "";
		let key;
		if (Ext.isEmpty(sourceObject)) {
			flatObject = null;
		} else if (Ext.isArray(sourceObject)) {
			for (let i = 0, sourceObjectLength = sourceObject.length; i < sourceObjectLength; i++) {
				key = this._getFlattenObjectKey(path, parentObjectName, options);
				this.flattenObject(sourceObject[i], flatObject, key, i, propertyNameOut, options);
			}
		} else {
			const sourceObjectClone = Terrasoft.deepClone(sourceObject);
			const name = sourceObjectClone.name;
			const format = Ext.isEmpty(path) ? "{1}" : "{0}{1}";
			path += Ext.String.format(format, this.pathDelimiter, name);
			key = this._getFlattenObjectKey(path, name, options);
			if (Ext.isEmpty(key)) {
				throw new Terrasoft.UnsupportedTypeException({
					message: Ext.String.format(Terrasoft.Resources.JsonDiffer.Exception.RequiredParameterNotFound,
						this.objectProperties.name)
				});
			}
			if (flatObject[key]) {
				throw new Terrasoft.ItemAlreadyExistsException({
					message: Ext.String.format(Terrasoft.Resources.JsonDiffer.Exception.ItemNameAlreadyExists, name)
				});
			}
			delete sourceObjectClone.name;
			if (!Ext.isEmpty(parentObjectName)) {
				sourceObjectClone.parentName = parentObjectName;
			}
			if (!Ext.isEmpty(itemIndex)) {
				sourceObjectClone.index = itemIndex;
			}
			if (!Ext.isEmpty(propertyNameOut)) {
				sourceObjectClone.propertyName = propertyNameOut;
			}
			const needFlattenObject = [];
			const propertyName = [];
			Terrasoft.each(sourceObjectClone, function(item, itemName) {
				if (item && this.needFlatten(item)) {
					needFlattenObject.push(item);
					propertyName.push(itemName);
					const sourceObjectItem = sourceObjectClone[itemName];
					sourceObjectClone[itemName] = (Ext.isArray(sourceObjectItem)) ? [] : {};
				}
			}, this);
			flatObject[key] = sourceObjectClone;
			const needFlattenArrLength = needFlattenObject.length;
			if (needFlattenArrLength > 0) {
				for (let j = 0; j < needFlattenArrLength; j++) {
					this.flattenObject(needFlattenObject[j], flatObject, key, j, propertyName[j], options);
				}
			}
		}
		return flatObject;
	},

	/**
	 * Adds the operation of the object
	 * @private
	 * @param {Terrasoft.ObjectModificationType []} objectModifications Array of object change types
	 * @param {Terrasoft.ObjectModificationType} objectModificationType Type of object change
	 * @return {Terrasoft.ObjectModificationType []} Array of object operations
	 */
	includeObjectOperations: function(objectModifications, objectModificationType) {
		let result = objectModifications || [];
		if (objectModificationType === Terrasoft.ObjectModificationType.REMOVE) {
			result = [Terrasoft.ObjectModificationType.REMOVE];
		} else {
			Ext.Array.include(result, objectModificationType);
		}
		return result;
	},

	/**
	 * Returns the collection object of the object
	 * @private
	 * @param {Object} object Source object
	 * @param {Object} resultObject The intermediate result object
	 * @return {Object} Returns the collection object of the object
	 */
	getObjectCollectionPropertyNames: function(object, resultObject) {
		const result = resultObject || {};
		const objectProperties = this.objectProperties;
		const parentPropertyName = objectProperties.parentPropertyName;
		const parent = objectProperties.parent;
		Terrasoft.each(object, function(item) {
			const collectionName = item[parentPropertyName];
			const parentName = item[parent];
			if (!Ext.isEmpty(parentName) && !Ext.isEmpty(collectionName)) {
				result[parentName] = result[parentName] || [];
				Ext.Array.include(result[parentName], collectionName);
			}
		}, this);
		return result;
	},

	/**
	 * Returns the collection object of the difference objects
	 * @private
	 * @return {Object} Returns the collection object of difference objects
	 */
	getCollectionPropertyNames: function() {
		const operationalValues = this.operationalValues;
		const flatPrimaryObject = operationalValues.flatPrimaryObject;
		const flatModifiedObject = operationalValues.flatModifiedObject;
		let result = {};
		result = this.getObjectCollectionPropertyNames(flatPrimaryObject, result);
		result = this.getObjectCollectionPropertyNames(flatModifiedObject, result);
		return result;
	},

	/**
	 * Returns a set of operations for unique objects
	 * @private
	 * @return {Object} Returns a set of operations for unique objects
	 */
	getObjectOperations: function() {
		const objectProperties = this.objectProperties;
		const primaryObject = this.operationalValues.primaryObject;
		const modifiedObject = this.operationalValues.modifiedObject;
		const flatModifiedObject = this.operationalValues.flatModifiedObject;
		const flatDelta = this.operationalValues.flatDelta;
		const specialModifiedObject = Terrasoft.deepClone(modifiedObject);
		this.addOperationalNames(specialModifiedObject);
		const operationalDelta = this.makeDiff(primaryObject, specialModifiedObject);
		let result = {};
		const positionChangedCollections = this.getCollectionPropertyNames();
		Terrasoft.each(flatDelta, function(object, objectName) {
			if (this.isAdded(object)) {
				result[objectName] = this.includeObjectOperations(result[objectName],
					Terrasoft.ObjectModificationType.INSERT);
			} else if (this.isRemoved(object)) {
				result[objectName] = this.includeObjectOperations(result[objectName],
					Terrasoft.ObjectModificationType.REMOVE);
			} else {
				Terrasoft.each(object, function(property, propertyName) {
					if (Terrasoft.contains([objectProperties.parent, objectProperties.parentPropertyName],
						propertyName)) {
						if (this.isAdded(property) || this.isModified(property) || this.isRemoved(property)) {
							result[objectName] = this.includeObjectOperations(result[objectName],
								Terrasoft.ObjectModificationType.MOVE);
						}
					} else if (propertyName === objectProperties.index) {
						if (this.isAdded(property) || this.isModified(property) || this.isRemoved(property)) {
							const flatModifiedObjectItem = flatModifiedObject[objectName];
							const movedToParentName = flatModifiedObjectItem[objectProperties.parent] ||
								objectProperties.root;
							const movedToCollectionName = flatModifiedObjectItem[objectProperties.parentPropertyName] ||
								objectProperties.root;
							const parentObjectCollections = positionChangedCollections[movedToParentName] || [];
							Ext.Array.include(parentObjectCollections, movedToCollectionName);
							positionChangedCollections[movedToParentName] = parentObjectCollections;
						}
					} else if (this.isRemoved(property)) {
							result[objectName] = this.includeObjectOperations(result[objectName],
								Terrasoft.ObjectModificationType.REMOVE_PROPERTY);
						} else {
							result[objectName] = this.includeObjectOperations(result[objectName],
								Terrasoft.ObjectModificationType.MERGE);
						}
				}, this);
			}
		}, this);
		result = this.getObjectChangePositionOperations(operationalDelta, positionChangedCollections, result, flatDelta);
		return result;
	},

	/**
	 * Returns a change type object for moved objects with unique names.
	 * @private
	 * @param {Object} delta Difference object.
	 * @param {Object} positionChangedCollections Moving Object Names Object.
	 * @param {Terrasoft.ObjectModificationType []} objectModifications Object of object changes.
	 * @param {Object} flatDelta Flat difference object.
	 * @return {Object} Object of change types for moved objects with unique names.
	 */
	getObjectChangePositionOperations: function(delta, positionChangedCollections, objectModifications, flatDelta) {
		const result = objectModifications || {};
		let changedPositionObjectNames = [];
		Terrasoft.each(positionChangedCollections, function(object, objectName) {
			let items;
			if (objectName === this.objectProperties.root) {
				items = this.getChangePositionObjectName(delta, flatDelta, objectName);
				changedPositionObjectNames = Ext.Array.merge(changedPositionObjectNames, items);
			} else {
				const simpleName = this._getModifiedObjectSimpleName(objectName);
				const parentObject = this.findOperationDeltaItem(simpleName, delta);
				if (parentObject) {
					let collectionName = positionChangedCollections[objectName].shift();
					while (!Ext.isEmpty(collectionName)) {
						const parentCollection = parentObject[collectionName];
						items = this.getChangePositionObjectName(parentCollection, flatDelta, objectName);
						changedPositionObjectNames = Ext.Array.merge(changedPositionObjectNames, items);
						collectionName = positionChangedCollections[objectName].shift();
					}
				}
			}
		}, this);
		let changedPositionObjectName = changedPositionObjectNames.shift();
		while (!Ext.isEmpty(changedPositionObjectName)) {
			result[changedPositionObjectName] = this.includeObjectOperations(result[changedPositionObjectName],
				Terrasoft.ObjectModificationType.CHANGE_POSITION);
			changedPositionObjectName = changedPositionObjectNames.shift();
		}
		return result;
	},

	/**
	 * Returns the names of objects that have changed the position in the collection.
	 * @private
	 * @param {Object} collection Collection object.
	 * @param {Object} flatDelta Flat difference object.
	 * @param {String} objectName Name of moving object container.
	 * @return {String []} Returns the names of objects that have changed the position in the collection.
	 */
	getChangePositionObjectName: function(collection, flatDelta, objectName) {
		const result = [];
		const patchDiffNodeTypeSymbol = this.objectProperties.patchDiffNodeTypeSymbol;
		Terrasoft.each(collection, function(moveConfig, name) {
			if (name !== patchDiffNodeTypeSymbol && Terrasoft.contains(name, "_")) {
				if (this.isMoved(moveConfig)) {
					const newIndex = moveConfig[1];
					const item = collection[newIndex];
					if (item) {
						const itemName = item[this.objectProperties.operationalName][0];
						const itemPath = this._getChangePositionObjectPath(itemName, flatDelta, objectName);
						result.push(itemPath);
					}
				}
			}
		}, this);
		return result;
	},

	/**
	 * Searches for the difference object by the operating name in the object
	 * @private
	 * @param {String} searchName Object name
	 * @param {Object} searchObject The search object
	 * @param {Object} resultOut Intermediate result object
	 * @return {Object} Found object
	 */
	findOperationDeltaItem: function(searchName, searchObject, resultOut) {
		const operationalSearchObject = Terrasoft.deepClone(searchObject);
		let result = resultOut;
		const operationalName = operationalSearchObject[this.objectProperties.operationalName];
		const name = (operationalName) ? operationalName[0] : null;
		if (name === searchName) {
			result = operationalSearchObject;
		} else if (!result) {
			delete operationalSearchObject[this.objectProperties.operationalName];
			Terrasoft.each(operationalSearchObject, function(property) {
				if (Ext.isArray(property) || Ext.isObject(property)) {
					result = this.findOperationDeltaItem(searchName, property, result);
				}
			}, this);
		}
		return result;
	},

	/**
	 * Adds an operating name to each object that has the name property
	 * @private
	 * @param {Object} object The object to convert
	 */
	addOperationalNames: function(object) {
		if (object.hasOwnProperty(this.objectProperties.name)) {
			object[this.objectProperties.operationalName] = object[this.objectProperties.name];
		}
		if (Ext.isObject(object) || (Ext.isArray(object))) {
			Terrasoft.each(object, function(property) {
				if (property) {
					this.addOperationalNames(property);
				}
			}, this);
		}
	},

	/**
	 * @private
	 */
	_getModifiedObjectSimpleName: function(name) {
		return name.split(this.pathDelimiter).pop();
	},

	/**
	 * @private
	 */
	_getChangePositionObjectPath: function(itemName, flatObject, objectPath) {
		if (objectPath.indexOf(this.pathDelimiter) === -1) {
			return itemName;
		}
		const fullObjectPath = `${objectPath}${this.pathDelimiter}${itemName}`;
		if (flatObject.hasOwnProperty(fullObjectPath)) {
			return fullObjectPath;
		}
		return null;
	},

	/**
	 * Returns the result collection of operations
	 * @private
	 * @param {Object} objectOperations Object of changes of objects with unique names
	 * @return {Object []} The resulting collection of operations
	 */
	getObjectResultOperations: function(objectOperations) {
		const result = [];
		Terrasoft.each(objectOperations, function(operations, modifiedObjectName) {
			for (let i = 0, operationsLength = operations.length; i < operationsLength; i++) {
				const operation = operations[i];
				const resultItem = {
					operation: this.getObjectModificationTypeName(operation),
					name: this._getModifiedObjectSimpleName(modifiedObjectName)
				};
				switch (operation) {
					case Terrasoft.ObjectModificationType.INSERT:
						Ext.apply(resultItem, this.getOperationValues(modifiedObjectName, operation));
						Ext.apply(resultItem, this.getOperationMoveProperties(modifiedObjectName));
						result.push(resultItem);
						break;
					case Terrasoft.ObjectModificationType.CHANGE_POSITION:
					case Terrasoft.ObjectModificationType.MOVE:
						Ext.apply(resultItem, this.getOperationMoveProperties(modifiedObjectName));
						result.push(resultItem);
						break;
					case Terrasoft.ObjectModificationType.REMOVE_PROPERTY:
						Ext.apply(resultItem, this.getOperationRemovedProperties(modifiedObjectName));
						if (resultItem.properties.length > 0) {
							result.push(resultItem);
						}
						break;
					case Terrasoft.ObjectModificationType.MERGE:
						Ext.apply(resultItem, this.getOperationValues(modifiedObjectName, operation));
						if (resultItem.values) {
							result.push(resultItem);
						}
						break;
					default:
						result.push(resultItem);
						break;
				}
			}
		}, this);
		return result;
	},

	/**
	 * Returns the move object of the modified object
	 * @private
	 * @param {String} objectName Name of the object
	 * @return {Object} Object of object moving properties
	 */
	getOperationMoveProperties: function(objectName) {
		const flatModifiedObjectItem = this.operationalValues.flatModifiedObject[objectName];
		const result = {};
		const moveOperationProperties = this.moveOperationProperties;
		for (let k = 0, moveOperationPropertiesLength = moveOperationProperties.length;
			k < moveOperationPropertiesLength; k++) {
			const propertyName = moveOperationProperties[k];
			let property = flatModifiedObjectItem[propertyName];
			if (!Ext.isEmpty(property)) {
				if (propertyName === "parentName") {
					property = this._getModifiedObjectSimpleName(property);
				}
				result[propertyName] = property;
			}
		}
		return result;
	},

	/**
	 * Returns the object of the deleted properties of the modified object
	 * @private
	 * @param {String} objectName Name of the object
	 * @return {Object} The object of the deleted object properties
	 */
	getOperationRemovedProperties: function(objectName) {
		const flatDelta = this.operationalValues.flatDelta;
		const result = {};
		const removedProperties = [];
		const flatDeltaItem = flatDelta[objectName];
		Terrasoft.each(flatDeltaItem, function(property, propertyName) {
			if (this.isRemoved(property)) {
				removedProperties.push(propertyName);
			}
		}, this);
		result.properties = removedProperties;
		return result;
	},

	/**
	 * Returns the object of the values of the modified object
	 * @private
	 * @param {String} objectName Name of the object
	 * @param {Terrasoft.ObjectModificationType} modificationType Type of object change
	 * @return {Object} The object of the values of the modified object
	 */
	getOperationValues: function(objectName, modificationType) {
		const flatModifiedObject = this.operationalValues.flatModifiedObject;
		const flatDelta = this.operationalValues.flatDelta;
		const result = {};
		const values = {};
		let modifiedObjectItem;
		switch (modificationType) {
			case Terrasoft.ObjectModificationType.INSERT:
				modifiedObjectItem = flatModifiedObject[objectName];
				Terrasoft.each(modifiedObjectItem, function(propertyItem, propertyName) {
					const skip = Terrasoft.contains(this.moveOperationProperties, propertyName);
					if (!skip) {
						values[propertyName] = Terrasoft.deepClone(propertyItem);
					}
				}, this);
				break;
			case Terrasoft.ObjectModificationType.MERGE:
				modifiedObjectItem = flatDelta[objectName];
				Terrasoft.each(modifiedObjectItem, function(property, propertyName) {
					const skip = Terrasoft.contains(this.moveOperationProperties, propertyName) ||
						this.isRemoved(property);
					if (!skip) {
						let propertyValue;
						if (property[this.objectProperties.patchDiffNodeTypeSymbol] === "a") {
							propertyValue = flatModifiedObject[objectName][propertyName];
						} else if (Ext.isObject(property) && !Ext.Object.isEmpty(property)) {
							propertyValue = flatModifiedObject[objectName][propertyName];
						} else {
							propertyValue = (this.isAdded(property)) ? property[0] : property[1];
						}
						values[propertyName] = propertyValue;
					}
				}, this);
				break;
		}
		if (!Ext.Object.isEmpty(values)) {
			result.values = values;
		}
		return result;
	},

	/**
	 * Returns the name of the operation of the object change type
	 * @private
	 * @param {Terrasoft.ObjectModificationType} objectModificationType Type of object change
	 * @return {String} the name of the operation of the object change type
	 */
	getObjectModificationTypeName: function(objectModificationType) {
		let result;
		switch (objectModificationType) {
			case Terrasoft.ObjectModificationType.INSERT:
				result = "insert";
				break;
			case Terrasoft.ObjectModificationType.REMOVE:
			case Terrasoft.ObjectModificationType.REMOVE_PROPERTY:
				result = "remove";
				break;
			case Terrasoft.ObjectModificationType.MOVE:
			case Terrasoft.ObjectModificationType.CHANGE_POSITION:
				result = "move";
				break;
			case Terrasoft.ObjectModificationType.MERGE:
				result = "merge";
				break;
		}
		return result;
	},

	/**
	 * Checks whether the difference object is an addition operation
	 * @private
	 * @param {Object} delta Difference object
	 * @return {Boolean} Test result
	 */
	isAdded: function(delta) {
		const objectLength = delta.length;
		return objectLength === 1;
	},

	/**
	 * Checks whether the difference object is a modification operation
	 * @private
	 * @param {Object} delta Difference object
	 * @return {Boolean} Test result
	 */
	isModified: function(delta) {
		const objectLength = delta.length;
		return objectLength === 2;
	},

	/**
	 * Checks whether the difference object is a move operation
	 * @private
	 * @param {Object} delta Difference object
	 * @return {Boolean} Test result
	 */
	isMoved: function(delta) {
		const objectLength = delta.length;
		return ((objectLength === 3) && (delta[2] === 3));
	},

	/**
	 * Checks whether the difference object is a delete operation
	 * @private
	 * @param {Object} delta Difference object
	 * @return {Boolean} Test result
	 */
	isRemoved: function(delta) {
		const objectLength = delta.length;
		return ((objectLength === 3) && (delta[2] === 0));
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns the object of the difference objects in the jsondiffpatch utility format
	 * @param {Object} primaryObject Primary object
	 * @param {Object} modifiedObject The modified object
	 * @return {Object} Difference Object
	 */
	makeDiff: function(primaryObject, modifiedObject) {
		if (!this.patch) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.JsonDiffer.Exception.JsonDiffPatchIsNotDefined
			});
		}
		return this.patch.diff(primaryObject, modifiedObject);
	},

	/**
	 * Converts a presentation schema object from a hierarchical view to a flat view
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * If the presentation schema object is not of the appropriate format
	 * @param {Object} sourceObject The view schema object
	 * @param {Object} options Options
	 * @param {Boolean} options.identifyItemByPath FlatObject is built by sourceObject paths.
	 * @return {Object} A flat object
	 */
	getFlatObject: function(sourceObject, options) {
		return this.flattenObject(sourceObject, null, null, null, null, options) || {};
	},

	/**
	 * Creates a difference array for two JSON objects
	 * @param {Object} primaryObject Primary object
	 * @param {Object} modifiedObject The modified object
	 * @param {Object} options Options
	 * @param {Boolean} options.identifyItemByPath FlatObject is built by sourceObject paths.
	 * @return {Array} Array-difference
	 */
	getJsonDiff: function(primaryObject, modifiedObject, options) {
		let result = [];
		try {
			const delta = this.makeDiff(primaryObject, modifiedObject);
			if (delta) {
				const flatPrimaryObject = this.getFlatObject(primaryObject, options);
				const flatModifiedObject = this.getFlatObject(modifiedObject, options);
				const flatDelta = this.makeDiff(flatPrimaryObject, flatModifiedObject);
				this.operationalValues = {
					primaryObject: primaryObject,
					modifiedObject: modifiedObject,
					delta: delta,
					flatPrimaryObject: flatPrimaryObject,
					flatModifiedObject: flatModifiedObject,
					flatDelta: flatDelta
				};
				const modifiedObjectsOperations = this.getObjectOperations();
				result = this.getObjectResultOperations(modifiedObjectsOperations);
			}
		} finally {
			for (const operationValuePropertyName in this.operationalValues) {
				if (this.operationalValues.hasOwnProperty(operationValuePropertyName)) {
					delete this.operationalValues[operationValuePropertyName];
				}
			}
			this.operationalValues = {};
		}
		return result;
	}

	//endregion

});

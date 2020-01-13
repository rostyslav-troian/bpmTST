Ext.ns("Terrasoft.utils.array");

/**
 * @singleton
 */


/**
 * Checks whether arrays are equal.
 * @param {Array} array1 Array 1
 * @param {Array} array2 Array 2
 * @return {Boolean} Returns true if arrays are equal.
 */
Terrasoft.utils.array.areArraysEqual = function(array1, array2) {
	array1 = array1 || [];
	array2 = array2 || [];
	if (array1.length !== array2.length) {
		return false;
	}
	return (JSON.stringify(array1.sort()) === JSON.stringify(array2.sort()));
};

/**
 * Alias for {@link Terrasoft.utils.array#areArraysEqual}
 * @member Terrasoft
 * @method areArraysEqual
 * @inheritdoc Terrasoft.utils.array#areArraysEqual
 */
Terrasoft.areArraysEqual = Terrasoft.utils.array.areArraysEqual;

/**
 * Returns copy of array with all falsy values (e.g. false, null, 0, "", undefined, NaN) deleted.
 * For example:
 *
 *      Terrasoft.compact([0, 1, false, 2, '', 3]);
 *
 * Result:
 *      [1, 2, 3]
 * @param array {Array}
 * @return {Array}
 */
Terrasoft.utils.array.compact = function(array) {
	return _.compact(array);
};

/**
 * Alias for {@link Terrasoft.utils.array#compact}
 * @member Terrasoft
 * @method compact
 * @inheritdoc Terrasoft.utils.arrayN#compact
 */
Terrasoft.compact = Terrasoft.utils.array.compact;

/**
 * Checks whether array contains value.
 * @param {Array} list Set of values
 * @param {String|Object} value The iterator function
 * @return {Boolean} Returns true if list contains value
 */
Terrasoft.contains = function(list, value) {
	return _.contains(list, value);
};

/**
 * Old alias for {@link Terrasoft#contains}
 * @member Terrasoft.utils.array
 * @method contains
 * @inheritdoc Terrasoft#contains
 */
Terrasoft.utils.array.contains = Terrasoft.contains;

/**
 * Returns copy of array with items of second array removed.
 * @param {Array} array Source array.
 * @param {Array} others Array with items to be removed.
 * @return {Array} A copy of the array from which the values of the second array are deleted.
 */
Terrasoft.utils.array.difference = function(array, others) {
	return _.difference(array, others);
};

/**
 * Alias for {@link Terrasoft.utils.array#difference}
 * @member Terrasoft
 * @method difference
 * @inheritdoc Terrasoft.utils.array#difference
 */
Terrasoft.difference = Terrasoft.utils.array.difference;

/**
 * Returns iterator function for each element of array. Iterator is called with 3 parameters:
 * element, index, list. If list - is JavaScript object, parameters are: value, key, list.
 * @param {Array|Object|Terrasoft.Collection} list List.
 * @param {Function} iterator Iterator function.
 * @param {Object} context Context.
 * @return {Boolean}
 */
Terrasoft.each = function(list, iterator, context) {
	if (Terrasoft.isArray(list)) {
		for (var i = 0, len = list.length; i !== len; i++) {
			if (iterator.call(context || list, list[i], i, list) === false) {
				return;
			}
		}
		return true;
	}
	if (list && Ext.isFunction(list.each)) {
		list.each(iterator, context);
		return true;
	}
	for (var property in list) {
		if (list.hasOwnProperty(property)) {
			if (iterator.call(context || list, list[property], property, list) === false) {
				return;
			}
		}
	}
	return true;
};

/**
 * Alias for {@link Terrasoft#each}
 * @member Terrasoft.utils.array
 * @method each
 * @inheritdoc Terrasoft#each
 */
Terrasoft.utils.array.each = Terrasoft.each;

/**
 * Looks through each value in the list, returning the first one that passes a truth test (predicate),
 * or undefined if no value passes the test.
 * @param {Array|undefined} list The array to search.
 * @param {Object|undefined} predicate The selection function to execute for each item.
 * @param {Object|undefined} scope The scope (this reference) in which the function is executed.
 * @return {Object}
 */
Terrasoft.utils.array.find = function(list, predicate, scope) {
	return _.find(list, predicate, scope);
};

/**
 * Alias for {@link Terrasoft.utils.array#find}
 * @member Terrasoft
 * @method find
 * @inheritdoc Terrasoft.utils.array#find
 */
Terrasoft.find = Terrasoft.utils.array.find;

/**
 * Finds object in array of any nested depth array-object-array.
 * @param {Object[]} container Array to start search.
 * @param {Object} filter Properties of object to search.
 * @return {Object} result Search result.
 * @return {Array} result.parent Link to array which contains parent object.
 * @return {Number} result.index Index of found element in parent array.
 * @return {Object} result.item Link to found object.
 */
Terrasoft.utils.array.findItem = function(container, filter) {
	var result = _.findWhere(container, filter);
	if (result) {
		return {
			item: result,
			parent: container,
			index: container.indexOf(result)
		};
	}
	Terrasoft.each(container, function(item) {
		if (Ext.isObject(item) || Terrasoft.isArray(item)) {
			result = Terrasoft.findItem(item, filter);
		}
		return Ext.isEmpty(result);
	}, this);
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.array#findItem}
 * @member Terrasoft
 * @method findItem
 * @inheritdoc Terrasoft.utils.array#findItem
 */
Terrasoft.findItem = Terrasoft.utils.array.findItem;

/**
 * Looks through the list and returns the first value that matches all of the key-value pairs listed in properties.
 * @param {Array} list An array of objects.
 * @param {Object} properties Key-value pairs to filter.
 * @return {Object}
 */
Terrasoft.utils.array.findWhere = function(list, properties) {
	return _.findWhere(list, properties);
};

/**
 * Alias for {@link Terrasoft.utils.array#findWhere}
 * @member Terrasoft
 * @method findWhere
 * @inheritdoc Terrasoft.utils.array#findWhere
 */
Terrasoft.findWhere = Terrasoft.utils.array.findWhere;

/**
 * Return all the elements that pass a truth test.
 * @param {Object} list List.
 * @param {Function} iterator Iterator function.
 * @param {Object} context Context.
 */
Terrasoft.utils.array.filter = function(list, iterator, context) {
	return _.filter(list, iterator, context);
};

/**
 * Alias for {@link Terrasoft.utils.array#filter}
 * @member Terrasoft
 * @method filter
 * @inheritdoc Terrasoft.utils.array#filter
 */
Terrasoft.filter = Terrasoft.utils.array.filter;


/**
 * Checks if an object is an array.
 * @param {Array} target The target to test.
 * @return {Boolean} Returns true if the passed value is a JavaScript Array, false otherwise.
 */
Terrasoft.utils.array.isArray = function(target) {
	return Ext.isArray(target);
};

/**
 * Alias for {@link Terrasoft.utils.array#isArray}
 * @member Terrasoft
 * @method isArray
 * @inheritdoc Terrasoft.utils.array#isArray
 */
Terrasoft.isArray = Terrasoft.utils.array.isArray;

/**
 * Return the results of applying the iterator to each element.
 * @param {Object} list List.
 * @param {Function} iterator Iterator function.
 * @param {Object} context Context.
 */
Terrasoft.utils.array.map = function(list, iterator, context) {
	return _.map(list, iterator, context);
};

/**
 * Alias for {@link Terrasoft.utils.array#map}
 * @member Terrasoft
 * @method map
 * @inheritdoc Terrasoft.utils.array#map
 */
Terrasoft.map = Terrasoft.utils.array.map;

/**
 * Rotate array.
 * @throws {Terrasoft.exceptions.ArgumentNullOrEmptyException}
 * Generate an exception if the parameters are empty.
 * *    Example
 *      Terrasoft.utils.array.rotateArray([0, 1, 2, 3], 2);
 *
 *      Result
 *      [2, 3, 0, 1];
 *
 * *    Example
 *      Terrasoft.utils.array.rotateArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7);
 *
 *      Result
 *      [7, 8, 9, 0, 1, 2, 3, 4, 5, 6];
 *
 * @param {Array} array Array to rotate.
 * @param {Number} rotationCount Count rotation.
 */
Terrasoft.utils.array.rotateArray = function(array, rotationCount) {
	if (Ext.isEmpty(array) || Ext.isEmpty(rotationCount)) {
		throw new Terrasoft.ArgumentNullOrEmptyException();
	}
	var rotationIndex = (array.length - (rotationCount % array.length)) % array.length;
	for (var i = 0; i < rotationIndex; i++) {
		for (var j = array.length - 1; j > 0; j--) {
			var temp = array[j];
			array[j] = array[j - 1];
			array[j - 1] = temp;
		}
	}
};

/**
 * Alias for {@link Terrasoft.utils.array#rotateArray}
 * @member Terrasoft
 * @method rotateArray
 * @inheritdoc Terrasoft.utils.array#rotateArray
 */
Terrasoft.rotateArray = Terrasoft.utils.array.rotateArray;

/**
 * Returns true if any of the values in the list pass the iterator truth test. Short-circuits and stops traversing
 * the list if a true element is found. Delegates to the native method some, if present.
 * @param list
 * @param iterator
 * @param context
 */
Terrasoft.utils.array.some = function(list, iterator, context) {
	return _.some(list, iterator, context);
};

/**
 * Alias for {@link Terrasoft.utils.array#some}
 * @member Terrasoft
 * @method some
 * @inheritdoc Terrasoft.utils.array#some
 */
Terrasoft.some = Terrasoft.utils.array.some;

/**
 * Returns position where value should be inserted, in order not to break order of sorted array.
 * @param {Array} list Sorted array.
 * @param {Mixed} value Value to be inserted.
 * @param {Mixed} iterator Function used to calculate rank for sorting.
 * @param {Object} context Context of iterator execution.
 * @return {Number} Position where value should be inserted.
 */
Terrasoft.utils.array.sortedIndex = function(list, value, iterator, context) {
	return _.sortedIndex(list, value, iterator, context);
};

/**
 * Alias for {@link Terrasoft.utils.array#sortedIndex}
 * @member Terrasoft
 * @method sortedIndex
 * @inheritdoc Terrasoft.utils.array#sortedIndex
 */
Terrasoft.sortedIndex = Terrasoft.utils.array.sortedIndex;

/**
 * Returns array of elements which contain key-value pairs of properties.
 *
 * Example:
 *  Terrasoft.utils.array.where(listOfPlays, {author: "Shakespeare", year: 1611});
 *  // Result:
 *  [{title: "Cymbeline", author: "Shakespeare", year: 1611},
 *  {title: "The Tempest", author: "Shakespeare", year: 1611}]
 * @param {Array/Object} list Collection where search is performed.
 * @param {Object} properties Key-value pairs.
 * @return {Array} Array of elements which contain key-value pairs of properties.
 */
Terrasoft.utils.array.where = function(list, properties) {
	return _.where(list, properties);
};

/**
 * Alias for {@link Terrasoft.array.array#where}
 * @member Terrasoft
 * @method where
 * @inheritdoc Terrasoft.utils.array#where
 */
Terrasoft.where = Terrasoft.utils.array.where;

/**
 * Returns copy of array with values of second array removed.
 * @param array {Array}
 * @param values {Array}
 */
Terrasoft.utils.array.without = function(array, values) {
	return _.without(array, values);
};

/**
 * Alias for {@link Terrasoft.utils.array#without}
 * @member Terrasoft
 * @method without
 * @inheritdoc Terrasoft.utils.array#without
 */
Terrasoft.without = Terrasoft.utils.array.without;

/**
 * Groups array by criteria.
 * Example:
 * var list = [
 *    {
 * 		author: "Shakespeare",
 * 		year: 1564
 * 	},
 *    {
 * 		author: "d'Anthès",
 * 		year: 1799
 * 	}
 *    {
 * 		author: "Pushkin",
 * 		year: 1799
 * 	},
 *    {
 * 		author: "King"
 * 	}
 * ];
 * Terrasoft.utils.array.groupBy(list, "year");
 * // Result:
 *    {
 * 		"1564" : [
 * 			{
 * 				author: "Shakespeare",
 * 				year: 1564
 * 			}
 * 		],
 * 		"1799": [
 * 			{
 * 				author: "Pushkin",
 * 				year: 1799
 * 			},
 * 			{
 * 				author: "d'Anthès",
 * 				year: 1799
 * 			}
 * 		],
 * 		"undefined": [
 * 			{
 * 				author: "King"
 * 			}
 * 		]
 * 	}
 * @param {Array} array Source array.
 * @param {String|Function} criteria Group criteria.
 * @param {Object} scope Context.
 */
Terrasoft.utils.array.groupBy = function(array, criteria, scope) {
	return _.groupBy(array, criteria, scope);
};

/**
 * Alias for {@link Terrasoft.utils.array#groupBy}
 * @member Terrasoft
 * @method groupBy
 * @inheritdoc Terrasoft.utils.array#groupBy
 */
Terrasoft.groupBy = Terrasoft.utils.array.groupBy;

/**
 * Reduce boils down a list of values into a single value.
 * Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee.
 * @param {Array} list Source array.
 * @param {Function} iteratee Transformation function.
 * @param {Object} memo  Initial state of the reduction.
 * @param {Object} context Execution context.
 * @return {Object}
 */
Terrasoft.utils.array.reduce = function(list, iteratee, memo, context) {
	return _.reduce(list, iteratee, memo, context);
};

/**
 * Alias for {@link Terrasoft.utils.array#reduce}
 * @member Terrasoft
 * @method reduce
 * @inheritdoc Terrasoft.utils.array#reduce
 */
Terrasoft.reduce = Terrasoft.utils.array.reduce;

/**
 * Returns last item in array.
 * @param {Array} array Given array.
 * @returns {Object} Last array item.
 */
Terrasoft.utils.array.last = function(array) {
	if (Ext.isEmpty(array)) {
		throw new Terrasoft.ArgumentNullOrEmptyException();
	}
	return array[array.length - 1];
};

/**
 * Alias for {@link Terrasoft.utils.array#last}
 * @member Terrasoft
 * @method last
 * @inheritdoc Terrasoft.utils.array#last
 */
Terrasoft.last = Terrasoft.utils.array.last;

/**
 * Returns last item in array.
 * @param {Array} array Given array.
 * @returns {Object} Last array item.
 */
Terrasoft.utils.array.lastOrDefault = function(array) {
	if (!Ext.isEmpty(array)) {
		return array[array.length - 1];
	}
};

/**
 * Alias for {@link Terrasoft.utils.array#lastOrDefault}
 * @member Terrasoft
 * @method lastOrDefault
 * @inheritdoc Terrasoft.utils.array#lastOrDefault
 */
Terrasoft.lastOrDefault = Terrasoft.utils.array.lastOrDefault;

/**
 * Returns first item in array.
 * @param {Array} array Given array.
 * @returns {Object} First item of the array.
 */
Terrasoft.utils.array.first = function(array) {
	if (Ext.isEmpty(array)) {
		throw new Terrasoft.ArgumentNullOrEmptyException();
	}
	return array[0];
};

/**
 * Alias for {@link Terrasoft.utils.array#first}
 * @member Terrasoft
 * @method first
 * @inheritdoc Terrasoft.utils.array#first
 */
Terrasoft.first = Terrasoft.utils.array.first;

/**
 * Returns first item in array or default value.
 * @param {Array} array Given array.
 * @param {Object} [defaultValue] Default value if array not has first element.
 * @returns {Object} First item of the array, or defaultValue.
 */
Terrasoft.utils.array.firstOrDefault = function(array, defaultValue) {
	if (!Ext.isEmpty(array)) {
		return array[0];
	}
	return defaultValue;
};

/**
 * Alias for {@link Terrasoft.utils.array#firstOrDefault}
 * @member Terrasoft
 * @method firstOrDefault
 * @inheritdoc Terrasoft.utils.array#firstOrDefault
 */
Terrasoft.firstOrDefault = Terrasoft.utils.array.firstOrDefault;

/**
 * Returns enumerator over array.
 * @param {Array} array Array to enumerate over.
 * @returns {Object} Array enumerator.
 */
Terrasoft.getEnumerator = function(array) {
	return {
		array: array,
		currentIndex: 0,
		hasNext: function() {
			return this.currentIndex < this.array.length;
		},
		next: function() {
			return this.array[this.currentIndex++];
		}
	};
};

/**
 * Alias for {@link Terrasoft.utils.array#getEnumerator}
 * @member Terrasoft
 * @method getEnumerator
 * @inheritdoc Terrasoft.utils.array#getEnumerator
 */
Terrasoft.utils.array.getEnumerator = Terrasoft.getEnumerator;

/**
 * Enumerates async over an array.
 * @param {Object} enumerable Enumerable object to enumerate over.
 * @param {Function} iteratorFn Iteration function.
 * @param {Function} callback Callback in the end of iteration.
 * @param {Object} scope Callback scope.
 */
Terrasoft.eachAsync = function(enumerable, iteratorFn, callback, scope) {
	if (Ext.isEmpty(enumerable)) {
		callback.call(scope);
		return;
	}
	var enumerator = Terrasoft.getEnumerator(enumerable);
	var nextIterationFn = function() {
		if (enumerator.hasNext()) {
			iteratorFn.call(scope, enumerator.next(), nextIterationFn);
		} else {
			Ext.callback(callback, scope, arguments);
		}
	};
	iteratorFn.call(scope, enumerator.next(), nextIterationFn);
};

/**
 * Alias for {@link Terrasoft.utils.array#eachAsync}
 * @member Terrasoft
 * @method eachAsync
 * @inheritdoc Terrasoft.utils.array#eachAsync
 */
Terrasoft.utils.array.eachAsync = Terrasoft.eachAsync;

/**
 * Enumerates async over an array asynchronously in parallel.
 * @param {Object[]} items Array of objects to enumerate over.
 * @param {Function} [iteratorFn] Iteration function.
 * @param {Mixed} iteratorFn.item Item of array to process.
 * @param {Function} callback Callback in the end of iteration.
 * @param {Object} scope Callback scope.
 */
Terrasoft.eachAsyncAll = function(items, iteratorFn, callback, scope) {
	if (Ext.isEmpty(items)) {
		Ext.callback(callback, scope);
		return;
	}
	var args;
	if (Ext.isFunction(items[0])) {
		args = scope || [];
		scope = callback;
		callback = iteratorFn;
	}
	var chain = items.map(
		(item) => new Promise((resolve) => {
			if (Ext.isFunction(item)) {
				item.apply(scope, [(result) => resolve(result)].concat(args));
			} else {
				iteratorFn.call(scope, item, (result) => resolve(result));
			}
		})
	);
	Promise.all(chain).then((results) => Ext.callback(callback, scope, [results]));
};

/**
 * Alias for {@link Terrasoft.utils.array#eachAsyncAll}
 * @member Terrasoft
 * @method eachAsyncAll
 * @inheritdoc Terrasoft.utils.array#eachAsyncAll
 */
Terrasoft.utils.array.eachAsyncAll = Terrasoft.eachAsyncAll;

/**
 * Append values to the array.
 * @param {Array} array An array to add values.
 * @param {Object|Array} items Value or array of values to add.
 * @param {Boolean} appendIfNotExist Flag that indicates whether adds only unique values.
 */
Terrasoft.utils.array.append = function(array, items, appendIfNotExist) {
	if (!array) {
		throw new Terrasoft.ArgumentNullOrEmptyException({
			argumentName: "array"
		});
	}
	if (!Terrasoft.isArray(array)) {
		throw new Terrasoft.UnsupportedTypeException({
			message: "argumentName: array"
		});
	}
	var appendItems = Ext.Array.from(items);
	appendItems.forEach(function(item) {
		if (!Ext.Array.contains(array, item) || !appendIfNotExist) {
			array.push(item);
		}
	}, this);
};

/**
 * Alias for {@link Terrasoft.utils.array#append}
 * @member Terrasoft
 * @method append
 * @inheritdoc Terrasoft.utils.array#append
 */
Terrasoft.append = Terrasoft.utils.array.append;

/**
 * Append values to the array if they don't already exist.
 * @param {Array} array An array to add values.
 * @param {Object|Array} items Value or array of values to add.
 */
Terrasoft.utils.array.appendIf = function(array, items) {
	Terrasoft.append(array, items, true);
};

/**
 * Alias for {@link Terrasoft.utils.array#appendIf}
 * @member Terrasoft
 * @method appendIf
 * @inheritdoc Terrasoft.utils.array#appendIf
 */
Terrasoft.appendIf = Terrasoft.utils.array.appendIf;

/**
 * Merges duplicate items into new array.
 * @param {Array} array An array to merge.
 * @param {Function} equalityFn Equality function that determines duplicates.
 * @param {Function} mergeFn Merge function that combines duplicates into one item.
 * @param {Object} scope Functions scope.
 */
Terrasoft.utils.array.mergeSame = function(array, equalityFn, mergeFn, scope) {
	var result = [];
	array.forEach(function(item) {
		var duplicate = Ext.Array.findBy(result, function(searchItem) {
			return equalityFn.call(scope, item, searchItem);
		}, scope);
		if (Ext.isEmpty(duplicate)) {
			result.push(item);
		} else {
			var mergeResult = mergeFn.call(scope, duplicate, item);
			if (!Ext.isEmpty(mergeResult)) {
				var index = result.indexOf(duplicate);
				result[index] = mergeResult;
			}
		}
	});
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.array#mergeSame}
 * @member Terrasoft
 * @method mergeSame
 * @inheritdoc Terrasoft.utils.array#mergeSame
 */
Terrasoft.mergeSame = Terrasoft.utils.array.mergeSame;

/**
 * Generates unique value.
 * @member Terrasoft
 * @method getUniqueValue
 * Example:
 *
 *      Terrasoft.getUniqueValue(["item", "item1", "item2"], "item");
 *
 * Result: "item3"
 * @param {String[]} array Array of string values.
 * @param {String} prefix Value prefix.
 * @return {String}
 */
Terrasoft.getUniqueValue = function(array, prefix) {
	var lowerCaseArray = array.map(function(item) {
		return item.toLowerCase();
	}, this);
	var value, notUnique;
	var i = 0;
	do {
		i++;
		value = prefix + i;
		notUnique = Terrasoft.contains(lowerCaseArray, value.toLowerCase());
	} while (notUnique);
	return value;
};

/**
 * Returns an array that contains elements included in both given arrays.
 * @member Terrasoft
 * @method intersect
 * Example:
 *
 *      Terrasoft.intersect([1, 2, 3], [2, 3, 4]);
 *
 * Result: [2, 3]
 * @param {Array} array1 First array.
 * @param {Array} array2 Second array.
 * @return {Array} Intersection of the given arrays.
 */
Terrasoft.intersect = function(array1, array2) {
	return array1.filter(function(value) {
		return -1 !== array2.indexOf(value);
	});
};

/**
 * Flattens a nested array (the nesting can be to any depth).
 * @param {Array} array Array to flatten.
 * @param {Boolean} shallow If specified the array will only be flattened a single level.
 * @return {Array}
 */
Terrasoft.utils.array.flatten = function(array, shallow) {
	return _.flatten(array, shallow);
};

/**
 * Alias for {@link Terrasoft.utils.array#flatten}
 * @member Terrasoft
 * @method flatten
 * @inheritdoc Terrasoft.utils.array#flatten
 */
Terrasoft.flatten = Terrasoft.utils.array.flatten;

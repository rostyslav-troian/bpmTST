Terrasoft.configuration.Structures["MobileBaseDesignerSettings"] = {innerHierarchyStack: ["MobileBaseDesignerSettings"]};
define("MobileBaseDesignerSettings", ["ext-base"],
	function(Ext) {

		/**
		 * @class Terrasoft.configuration.MobileBaseDesignerSettings
		 * ####### ##### ######### #########.
		 */
		var module = Ext.define("Terrasoft.configuration.MobileBaseDesignerSettings", {
			alternateClassName: "Terrasoft.MobileBaseDesignerSettings",
			extend: "Terrasoft.BaseObject",

			name: null,

			/**
			 * ######### #####.
			 * @type {Object}
			 */
			entitySchema: null,

			/**
			 * ### #####.
			 * @type {String}
			 */
			entitySchemaName: null,

			/**
			 * ############ ######### #########.
			 * @type {Object}
			 */
			settingsConfig: null,

			/**
			 * @type {Object}
			 */
			sandbox: null,

			/**
			 * @private
			 */
			swapItems: function(items, indexA, indexB) {
				var tmp = items[indexA];
				items[indexA] = items[indexB];
				items[indexB] = tmp;
			},

			/**
			 * @inheritDoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function(config) {
				var settingsConfig = config.settingsConfig;
				for (var property in settingsConfig) {
					if (this[property] !== undefined) {
						this[property] = settingsConfig[property];
					}
				}
				this.callParent(arguments);
			},

			/**
			 * ############# ######## ## #########.
			 * @protected
			 * @virtual
			 */
			initializeDefaultValues: function() {
			},

			/**
			 * ############## ######### #######.
			 * @param {Object} config ################ ###### # ########### ###### ######:
			 * @param {Function} config.callback ####### ######### ######.
			 * @param {Object} config.scope ######## ####### ######### ######.
			 * @protected
			 * @virtual
			 */
			initializeCaptionValues: function(config) {
				Ext.callback(config.callback, config.scope);
			},

			/**
			 * ######### #############.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			initialize: function(callback, scope) {
				this.getEntitySchemaByName(this.entitySchemaName, function(entitySchema) {
					this.entitySchema = entitySchema;
					this.initializeDefaultValues();
					this.initializeCaptionValues({
						callback: callback,
						scope: scope
					});
				}, this);
			},

			/**
			 * ##### ########## ###### ## ### #####.
			 * @param {String} entitySchemaName ### #######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			getEntitySchemaByName: function(entitySchemaName, callback, scope) {
				scope = scope || this;
				this.sandbox.requireModuleDescriptors(["force!" + entitySchemaName], function() {
					Terrasoft.require([entitySchemaName], callback, scope);
				}, scope);
			},

			/**
			 * ######### ####### ## ##### ########.
			 * @param {String} name ### ########, ########### ###### #########.
			 * @param {Object} item #######.
			 */
			addItem: function(name, item) {
				this[name].push(item);
			},

			/**
			 * ####### ####### ## ##### ########.
			 * @param {String} name ### ######## ####### ######## ###### #########.
			 * @param item #######.
			 */
			removeItem: function(name, item) {
				this[name] = Ext.Array.difference(this[name], [item]);
			},

			/**
			 * ######### ##### ######## ######## ## ##### ########.
			 * @param {String} name ### ######## ####### ######## ###### #########.
			 * @param {Object} item #######.
			 * @param {Object} newItem ##### #######.
			 */
			applyItem: function(name, item, newItem) {
				Ext.apply(item, newItem);
			},

			/**
			 * ########## ####### ####### ## #### #######.
			 * @param {String} name ### ########, ####### ######## ###### #########.
			 * @param {Object} item #######.
			 * @param {Number} offset ######## ########.
			 * @returns {Boolean} true, #### ########## ####### ########.
			 */
			moveItem: function(name, item, offset) {
				var items = this[name];
				var indexA = items.indexOf(item);
				var indexB = indexA + offset;
				if (indexB < 0 || indexB >=  items.length) {
					return false;
				}
				this.swapItems(items, indexA, indexB);
				return true;
			},

			/**
			 * ####### ####### ## ##### ######## # ########.
			 * @param {String} itemsPropertyName ### ######## ####### ######## ###### #########.
			 * @param {String} propertyName ### ######## ########.
			 * @param {String} value ######## ######## ########.
			 * @returns {Object|null} ####### ########.
			 */
			findItemByPropertyName: function(itemsPropertyName, propertyName, value) {
				var items = this[itemsPropertyName];
				for (var i = 0, ln = items.length; i < ln; i++) {
					var item = items[i];
					if (item[propertyName] === value) {
						return item;
					}
				}
				return null;
			},

			/**
			 * ####### ############ ######## #######.
			 * @param config ############ #######.
			 * @param {Number} config.row ##### ######.
			 * @param {String} config.caption ######### #######.
			 * @param {String} config.columnName ### #######.
			 * @param {Terrasoft.DataValueType} config.dataValueType ### ######.
			 * @returns {Object} ############ ######## #######.
			 */
			createColumnItem: function(config) {
				return {
					name: Terrasoft.generateGUID(),
					row: config.row,
					content: config.caption,
					columnName: config.columnName,
					dataValueType: config.dataValueType
				};
			},

			/**
			 * ########## ############ ######### ######### ## ######### ########## ######.
			 * @returns {Object} ############ ######### #########.
			 */
			getSettingsConfig: function() {
				return this.settingsConfig;
			}

		});
		return module;

	});



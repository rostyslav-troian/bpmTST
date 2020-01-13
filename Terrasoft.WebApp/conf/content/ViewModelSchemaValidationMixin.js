Terrasoft.configuration.Structures["ViewModelSchemaValidationMixin"] = {innerHierarchyStack: ["ViewModelSchemaValidationMixin"]};
define("ViewModelSchemaValidationMixin", ["ViewModelSchemaValidationMixinResources"], function(resources) {
		/**
		 * @class Terrasoft.configuration.mixins.ViewModelSchemaValidationMixin
		 * Client schema validation mixin
		 */
		const schemaValidationMixin = Ext.define("Terrasoft.configuration.mixins.ViewModelSchemaValidationMixin", {
			alternateClassName: "Terrasoft.ViewModelSchemaValidationMixin",

			/**
			 * Returns localized string value.
			 * @protected
			 * @param {String} name Localized string name.
			 * @return {String} Localized string value.
			 */
			getLocalizableStringValue: function(name) {
				return resources.localizableStrings[name];
			},

			/**
			 * Returns schema root element name depending on schema type.
			 * @protected
			 * @param {Terrasoft.SchemaType} schemaType Schema type.
			 * @return {string} Schema root element name.
			 */
			getViewSchemaRootItemName: function(schemaType) {
				switch (schemaType) {
					case Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA:
						return "CardContentWrapper";
					case Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA:
						return "SectionWrapContainer";
					case Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA:
					case Terrasoft.SchemaType.EDIT_CONTROLS_DETAIL_VIEW_MODEL_SCHEMA:
					case Terrasoft.SchemaType.MODULE:
						throw new Terrasoft.UnsupportedTypeException();
				}
			},

			/**
			 * Validates schema with the rules:
			 * First root element must has name of root element of base schema with this type
			 * @param {Object} schema Schema.
			 * @return {Object} Validation result.
			 */
			viewSchemaRootValidator: function(schema) {
				const viewSchema = schema.viewConfig;
				const rootItemName = this.getViewSchemaRootItemName(schema.type);
				const result = {success: true};
				let rootItem = viewSchema;
				if (Ext.isArray(viewSchema)) {
					viewSchema.forEach(function(item) {
						const itemName = item.name;
						if (itemName === rootItemName) {
							rootItem = item;
						} else {
							const warningMessage = Ext.String.format(
								this.getLocalizableStringValue("ViewSchemaAbsentParentValidatorMessage"), itemName);
							window.console.warn(warningMessage);
						}
					}, this);
				}
				if (rootItem.name !== rootItemName) {
					result.success = false;
					result.message = Ext.String.format(
						this.getLocalizableStringValue("ViewSchemaRootNameValidatorMessage"), rootItemName);
				}
				return result;
			},

			/**
			 * Validates are all schema elements names unique.
			 * @param {Object} schema Schema.
			 * @return {Object} Validation result.
			 */
			viewSchemaUniqueNamesValidator: function(schema) {
				const viewSchema = schema.viewConfig;
				const result = {success: true};
				const itemsNames = [];
				Terrasoft.iterateChildItems(viewSchema, function(iterationConfig) {
					const item = iterationConfig.item;
					const itemName = item.name;
					if (Ext.Array.contains(itemsNames, itemName)) {
						result.success = false;
						result.message = Ext.String.format(
							this.getLocalizableStringValue("ViewSchemaUniqueNamesValidatorMessage"), itemName);
						return false;
					}
					itemsNames.push(itemName);
				}, this);
				return result;
			},

			/**
			 * Validates are all model elements in grid.
			 * @param {Object} schema Schema.
			 * @return {Object} Validation result.
			 */
			viewSchemaModelItemsValidator: function(schema) {
				const viewSchema = Terrasoft.deepClone(schema.viewConfig);
				Terrasoft.iterateChildItems(viewSchema, function(iterationConfig) {
					const item = iterationConfig.item;
					const itemType = item.itemType;
					if (!Ext.isEmpty(item.generator) ||
						itemType === Terrasoft.ViewItemType.BUTTON &&
						itemType === Terrasoft.ViewItemType.MENU) {
						const parent = iterationConfig.parent;
						const propertyName = iterationConfig.propertyName;
						delete parent[propertyName];
					}
				}, this);
				const result = {success: true};
				Terrasoft.iterateChildItems(viewSchema, function(iterationConfig) {
					const item = iterationConfig.item;
					const itemType = item.itemType;
					const parent = iterationConfig.parent;
					const parentItemType = parent.itemType;
					if ((Ext.isEmpty(itemType) || (itemType === Terrasoft.ViewItemType.MODEL_ITEM)) &&
						(parentItemType !== Terrasoft.ViewItemType.GRID_LAYOUT &&
						parentItemType !== Terrasoft.ViewItemType.TAB_PANEL)) {
						result.success = false;
						result.message = Ext.String.format(
							this.getLocalizableStringValue("ViewSchemaModelItemsValidatorMessage"), item.name);
						return false;
					}
				}, this);
				return result;
			},

			/**
			 * Validates schema with functions using in schema view.
			 * @param {Object} schema Schema.
			 * @return {Object} Validation result.
			 */
			viewSchemaJsonStructureValidator: function(schema) {
				const viewSchema = schema.viewConfig;
				let result = {success: true};
				Terrasoft.each(viewSchema, function(propertyValue) {
					if (!propertyValue || typeof propertyValue !== "object" || propertyValue.constructor === Date) {
						return result.success;
					}
					if (Ext.isFunction(propertyValue)) {
						result.success = false;
						result.message = this.getLocalizableStringValue("ViewSchemaIsJsonFunctionValidatorMessage");
						return result;
					}
					const propertyResult = this.viewSchemaJsonStructureValidator(propertyValue);
					if (!propertyResult.success) {
						result = propertyResult;
					}
					return result.success;
				}, this);
				return result;
			},

			/**
			 * Generates schema validators list.
			 * @protected
			 * @return {Function[]} Validators list.
			 */
			getSchemaValidators: function() {
				return [this.viewSchemaRootValidator, this.viewSchemaJsonStructureValidator];
			},

			/**
			 * Generates list of duplicated diff items in different containers.
			 * @protected
			 * @param schema Schema to inspect.
			 * @return {Array} List of duplicated diff items.
			 */
			getSchemaDuplicates: function(schema) {
				const viewConfig = schema.viewConfig;
				const messageConfig = {};
				const result = [];
				const pathDelimiter = Terrasoft.JsonDiffer.pathDelimiter;
				const flatViewConfig = Terrasoft.JsonDiffer.getFlatObject(viewConfig, {identifyItemByPath: true});
				Object.keys(flatViewConfig).forEach(function(path) {
					const name = path.split(pathDelimiter).pop();
					const formattedPath = path.split(pathDelimiter).join(".");
					const diffObject = flatViewConfig[path];
					const caption = diffObject.caption ||
						(diffObject.labelConfig && diffObject.labelConfig.caption) ||
						"";
					messageConfig[name] = messageConfig[name] || [];
					messageConfig[name].push({
						path: formattedPath,
						caption: caption
					});
				});
				Object.keys(messageConfig).forEach(function(name) {
					if (messageConfig[name].length > 1) {
						result.push({
							name: name,
							items: messageConfig[name]
						});
					}
				});
				return result;
			},

			/**
			 * Check whether schema contains duplicated view config items. Shows error message if any are present.
			 * @protected
			 * @param schema Schema to inspect.
			 * @return {Object} Attribute warning.
			 */
			checkDuplicates: function(schema) {
				let warning = {};
				const duplicates = this.getSchemaDuplicates(schema);
				if (Ext.isEmpty(duplicates)) {
					return warning;
				}
				const localizableStrings = schema.resources.localizableStrings;
				const nameMessage = this.getLocalizableStringValue("DuplicatedDiffNameMessage");
				const diffCaptionPathMessage = this.getLocalizableStringValue("DuplicatedDiffCaptionPathMessage");
				const diffPathMessage = this.getLocalizableStringValue("DuplicatedDiffPathMessage");
				const duplicatesMessage = duplicates.reduce(function(accumulator, duplicateObject) {
					const elementName = Ext.String.format(nameMessage, duplicateObject.name);
					const items = duplicateObject.items;
					const itemsMessage = items.reduce(function(acc, duplicate) {
						let caption = duplicate.caption || "";
						if (caption.bindTo) {
							const resourceName = caption.bindTo.split(".").pop();
							caption = localizableStrings[resourceName];
						}
						const path = duplicate.path;
						const elementMessage = caption
							? Ext.String.format(diffCaptionPathMessage, caption, path)
							: Ext.String.format(diffPathMessage, path);
						return Ext.String.format("{0}\n{1}", acc, elementMessage);
					}, "");
					return Ext.String.format("{0}\n{1}{2}", accumulator, elementName, itemsMessage);
				}, "");
				warning = {
					mainMessage: this.getLocalizableStringValue("DuplicatedDiffElementsMessage"),
					additionalMessage: duplicatesMessage
				};
				return warning;
			},

			/**
			 * Validates schema.
			 * @param {Object} schema Schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function execution scope.
			 */
			validateSchema: function(schema, callback, scope) {
				const validators = this.getSchemaValidators();
				let validationResult = {success: true};
				Terrasoft.each(validators, function(validator) {
					validationResult = validator.call(this, schema);
					return validationResult.success;
				}, this);
				callback.call(scope, validationResult);
			}
		});
		return schemaValidationMixin;
	});



Terrasoft.configuration.Structures["ApplicationStructureWizardUtils"] = {innerHierarchyStack: ["ApplicationStructureWizardUtils"]};
define("ApplicationStructureWizardUtils", ["terrasoft", "ApplicationStructureWizardUtilsResources",
	"DesignTimeEnums", "LookupManager"
], function(Terrasoft, resources) {

	/**
	 * Class for ApplicationStructureWizardUtils.
	 */
	Ext.define("Terrasoft.configuration.ApplicationStructureWizardUtils", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.ApplicationStructureWizardUtils",
		singleton: true,

		/**
		 * Creates Entity schemas for new section.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {Function} callback The callback function.
		 * @param {String} callback.config.sectionEntityUId New section entity UId.
		 * @param {String} callback.config.sectionEntityFolderUId New folder entity UId.
		 * @param {String} callback.config.sectionEntityTagUId New tag entity UId.
		 * @param {String} callback.config.uId UId.
		 * @param {Object} scope The scope of callback function.
		 */
		createNewSectionEntitySchemas: function(config, callback, scope) {
			config.sectionEntityUId = Terrasoft.generateGUID();
			config.sectionEntityFolderUId = Terrasoft.generateGUID();
			config.sectionEntityTagUId = Terrasoft.generateGUID();
			config.uId = null;
			Terrasoft.chain(
				function(next) {
					next(config);
				},
				this.createSectionEntity,
				this.createSectionFile,
				this.createSectionFolder,
				this.createSectionInFolder,
				this.createSectionTag,
				this.createSectionInTag,
				this.defineSectionEntity,
				function() {
					Ext.callback(callback, scope);
				}, this
			);
		},

		/**
		 * Returns entity name with user prefix.
		 * @param {String} name Section code.
		 * @param {String} [target] Optional, target string.
		 * @return {String} Generated full name.
		 */
		getEntityFullName: function(name, target) {
			var prefix = Terrasoft.EntitySchemaManager.getSchemaNamePrefix() || "";
			target = target || "";
			return prefix + name.replace(prefix, "") + target;
		},

		/**
		 * Create section entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 */
		createSectionEntity: function(callback, config) {
			var name = this.getEntityFullName(config.name);
			var caption = config.caption;
			var packageUId = config.packageUId;
			var nameColumnUId = Terrasoft.generateGUID();
			var newSchema = Terrasoft.EntitySchemaManager.createSchema({
				"uId": config.sectionEntityUId,
				"name": name,
				"packageUId": packageUId,
				"caption": {},
				"primaryDisplayColumnUId": nameColumnUId
			});
			newSchema.setLocalizableStringPropertyValue("caption", caption);
			var nameColumn = newSchema.createColumn({
				"name": this.getEntityFullName("Name"),
				"uId": nameColumnUId,
				"caption": {},
				"isRequired": true,
				"dataValueType": Terrasoft.DataValueType.TEXT
			});
			nameColumn.setLocalizableStringPropertyValue("caption",
				resources.localizableStrings.SectionEntityDisplayColumnName);
			newSchema.addColumn(nameColumn);
			var notesColumn = newSchema.createColumn({
				"name": this.getEntityFullName("Notes"),
				"uId": Terrasoft.generateGUID(),
				"caption": {},
				"dataValueType": Terrasoft.DataValueType.MAXSIZE_TEXT
			});
			notesColumn.setLocalizableStringPropertyValue("caption",
				resources.localizableStrings.NotesColumnCaption);
			newSchema.addColumn(notesColumn);
			var parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_ENTITY;
			newSchema.setParent(parentUId, function() {
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			}, this);
		},

		/**
		 * Create section File entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.schemaCaption Caption for current entity.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 */
		createSectionFile: function(callback, config) {
			config.entityName = this.getEntityFullName(config.name, "File");
			const schemaCaptionTemplate = resources.localizableStrings.SectionEntityFileCaption;
			config.schemaCaption = Ext.String.format(schemaCaptionTemplate, config.caption);
			var newSchema = this.createNewSchema(config);
			this.createNewLookupColumn(config, newSchema);
			var parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_FILE;
			newSchema.setParent(parentUId, function() {
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			});
		},

		/**
		 * Create section Folder entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityFolderUId Entity folder UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 */
		createSectionFolder: function(callback, config) {
			config.entityName = this.getEntityFullName(config.name, "Folder");
			const schemaCaptionTemplate = resources.localizableStrings.SectionEntityFolderCaption;
			config.schemaCaption = Ext.String.format(schemaCaptionTemplate, config.caption);
			config.uId = config.sectionEntityFolderUId;
			config.administratedByRecords = true;
			const newSchema = this.createNewSchema(config);
			config.uId = null;
			const parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_FOLDER;
			newSchema.setParent(parentUId, function() {
				var columns = newSchema.getPropertyValue("columns");
				var filteredColumns = columns.filterByFn(function(item) {
					return item.name === "Parent";
				});
				var column = filteredColumns.getByIndex(0);
				column.referenceSchemaUId = config.sectionEntityFolderUId;
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			});
		},

		/**
		 * Create section InFolder entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 * @param {String} config.sectionEntityFolderUId New folder entity UId.
		 */
		createSectionInFolder: function(callback, config) {
			config.entityName = this.getEntityFullName(config.name, "InFolder");
			const schemaCaptionTemplate = resources.localizableStrings.SectionEntityInFolderCaption;
			config.schemaCaption = Ext.String.format(schemaCaptionTemplate, config.caption);
			const newSchema = this.createNewSchema(config);
			this.createNewLookupColumn(config, newSchema);
			const parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_ITEM_IN_FOLDER;
			newSchema.setParent(parentUId, function() {
				var columns = newSchema.getPropertyValue("columns");
				var filteredColumns = columns.filterByFn(function(item) {
					return item.name === "Folder";
				});
				var column = filteredColumns.getByIndex(0);
				if (config.sectionEntityFolderUId) {
					var columnCaption = Ext.String.format(resources.localizableStrings.SectionEntityFolderCaption,
						config.caption);
					column.setPropertyValue("referenceSchemaUId", config.sectionEntityFolderUId);
					column.setPropertyValue("isVirtual", false);
					column.setLocalizableStringPropertyValue("caption", columnCaption);
				}
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			});
		},

		/**
		 * Create section Tag entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 */
		createSectionTag: function(callback, config) {
			config.entityName = this.getEntityFullName(config.name, "Tag");
			const schemaCaptionTemplate = resources.localizableStrings.SectionEntityTagCaption;
			config.schemaCaption = Ext.String.format(schemaCaptionTemplate, config.caption);
			config.uId = config.sectionEntityTagUId;
			const newSchema = this.createNewSchema(config);
			config.uId = null;
			const parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_TAG;
			newSchema.setParent(parentUId, function() {
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			});
		},

		/**
		 * Create section InTag entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.packageUId Current package UId.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 * @param {String} config.sectionEntityTagUId New folder entity UId.
		 */
		createSectionInTag: function(callback, config) {
			config.entityName = this.getEntityFullName(config.name, "InTag");
			const schemaCaptionTemplate = resources.localizableStrings.SectionEntityInTagCaption;
			config.schemaCaption = Ext.String.format(schemaCaptionTemplate, config.caption);
			const newSchema = this.createNewSchema(config);
			const parentUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_ITEM_IN_TAG;
			newSchema.setParent(parentUId, function() {
				var columns = newSchema.getPropertyValue("columns");
				var tagColumns = columns.filterByPath("name", "Tag");
				var entityColumns = columns.filterByPath("name", "Entity");
				var tagColumn = tagColumns.first();
				var entityColumn = entityColumns.first();
				if (config.sectionEntityTagUId) {
					var tagColumnCaption = Ext.String.format(resources.localizableStrings.SectionEntityTagCaption,
						config.caption);
					tagColumn.setPropertyValue("referenceSchemaUId", config.sectionEntityTagUId);
					tagColumn.setPropertyValue("isVirtual", false);
					tagColumn.setLocalizableStringPropertyValue("caption", tagColumnCaption);
					entityColumn.setPropertyValue("referenceSchemaUId", config.sectionEntityUId);
					entityColumn.setPropertyValue("isVirtual", false);
					entityColumn.setLocalizableStringPropertyValue("caption", config.caption);
				}
				Terrasoft.EntitySchemaManager.addSchema(newSchema);
				callback(config);
			});
		},

		/**
		 * Creates and returns new lookup column.
		 * @param {Object} config Configuration.
		 * @param {String} config.name Code of new section.
		 * @param {String} config.caption Caption of new section.
		 * @param {String} config.sectionEntityUId New section entity UId.
		 * @param {Terrasoft.manager.EntitySchema} schema Entity schema.
		 */
		createNewLookupColumn: function(config, schema) {
			var name = this.getEntityFullName(config.name);
			var newColumn = schema.createColumn({
				"name": name,
				"uId": Terrasoft.generateGUID(),
				"caption": {},
				"isRequired": true,
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"referenceSchemaUId": config.sectionEntityUId,
				"isCascade": true
			});
			newColumn.setLocalizableStringPropertyValue("caption", config.caption);
			return schema.addColumn(newColumn);
		},

		/**
		 * Create new entity schema.
		 * @param {Object} config Configuration.
		 * @param {String} config.uId UId.
		 * @param {String} config.entityName Name of new entity.
		 * @param {String} config.schemaCaption Caption for current entity.
		 * @param {String} config.packageUId Current package UId.
		 * @param {Boolean} [config.administratedByRecords] Enable administered by records.
		 */
		createNewSchema: function(config) {
			const uId = config.uId || Terrasoft.generateGUID();
			const newSchema = Terrasoft.EntitySchemaManager.createSchema({
				"uId": uId,
				"name": config.entityName,
				"packageUId": config.packageUId,
				"caption": {},
				"administratedByRecords": Boolean(config.administratedByRecords)
			});
			newSchema.setLocalizableStringPropertyValue("caption", config.schemaCaption);
			return newSchema;
		},

		/**
		 * Return validate schema exist in the EntitySchemaManager.
		 * @param {String} name Schema name.
		 * @return {Object}
		 */
		validateEntitySchemaExist: function(name) {
			var itemCount = this.getEntitySchemaExistCount(name);
			var itemExist = itemCount !== 0;
			var message = itemExist ? resources.localizableStrings.EntitySchemaExistValidateMessage : "";
			return {
				message: message,
				isValid: !itemExist
			};
		},

		/**
		 * Return count of existing schemas.
		 * @private
		 * @param {String} name Schema name.
		 * @return {Number} Count of schemas exist.
		 */
		getEntitySchemaExistCount: function(name) {
			name = this.getEntityFullName(name);
			var items = Terrasoft.EntitySchemaManager.getItems();
			var systemEntitySchemaNames = this.getSectionEntitySchemaAdditionalSchemaNames(name);
			var filteredItems = items.filterByFn(
				function(item) {
					var itemName = item.name;
					return Terrasoft.contains(
						systemEntitySchemaNames,
						itemName
					);
				}
			);
			return filteredItems.getCount();
		},

		/**
		 * Defines section entity schema.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} config Configuration object.
		 * @param {String} config.sectionEntityUId Section entity schema UId.
		 */
		defineSectionEntity: function(callback, config) {
			Terrasoft.EntitySchemaManager.getInstanceByUId(config.sectionEntityUId, function(entitySchema) {
				entitySchema.define();
				callback();
			}, this);
		},

		/**
		 * Updates lookup manager if typeColumn lookup doesn't registered.
		 * @param {Object} entitySchema Instance of Terrasoft.EntitySchema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		createLookupManagerItem: function(entitySchema, callback, scope) {
			Terrasoft.LookupManager.initialize(null, function() {
				var referenceSchemaUId = entitySchema.uId;
				if (Terrasoft.LookupManager.findItemBySysEntitySchemaUId(referenceSchemaUId)) {
					return Ext.callback(callback, scope);
				}
				var config = {
					propertyValues: {
						name: entitySchema.caption,
						sysEntitySchemaUId: referenceSchemaUId
					}
				};
				Terrasoft.LookupManager.createItem(config, function(lookupManagerItem) {
					Terrasoft.LookupManager.addItem(lookupManagerItem);
					Ext.callback(callback, scope);
				}, this);
			}, this);
		},

		/**
		 * Creates array of names of section schemas.
		 * @param {String} name Entity schema name.
		 * @return {Array} Array of section entity schema names.
		 */
		getSectionEntitySchemaAdditionalSchemaNames: function(name) {
			return [
				name,
				name + "Folder",
				name + "File",
				name + "InFolder",
				name + "Tag",
				name + "InTag"
			];
		},

		/**
		 * Creates array of uIds of system schemas.
		 * @param {String} name Entity schema name.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		getSectionEntitySchemaAdditionalSchemaUIds: function(name, callback, scope) {
			const schemaUIds = [];
			const currentEntitySchemas = this.getSectionEntitySchemaAdditionalSchemaNames(name);
			Terrasoft.each(currentEntitySchemas, function(itemName) {
				var schema = Terrasoft.EntitySchemaManager.findRootSchemaItemByName(itemName);
				if (schema && schema.uId) {
					schemaUIds.push(schema.uId);
				}
			}, this);
			Ext.callback(callback, scope, [schemaUIds]);
		}
	});
});



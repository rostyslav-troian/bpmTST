Terrasoft.configuration.Structures["FileImportColumnsMappingPage"] = {innerHierarchyStack: ["FileImportColumnsMappingPage"], structureParent: "FileImportWizardStepPage"};
define('FileImportColumnsMappingPageStructure', ['FileImportColumnsMappingPageResources'], function(resources) {return {schemaUId:'301f0c29-0fe2-495e-9df2-0903f2ebeeac',schemaCaption: "FileImportColumnsMappingPage", parentSchemaName: "FileImportWizardStepPage", schemaName:'FileImportColumnsMappingPage',parentSchemaUId:'c28ed8d9-a852-43ed-ad8d-f594bb3a094f',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileImportColumnsMappingPage", ["FileImportColumnsMappingPageResources", "ConfigurationEnums",
		"ConfigurationConstants", "ConfigurationItemGenerator", "ColumnMappingViewModel",
		"CommunicationDestinationViewModel", "AddressDestinationViewModel", "ContainerList"],
		function(resources, ConfigurationEnums, ConfigurationConstants) {
	return {
		attributes: {
			HasReferences: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			NextStepPageName: {
				value: "FileImportDuplicateManagementPage"
			}
		},
		messages: {
			"StructureExplorerInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ColumnSelected": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Returns key for destination column.
			 * @private
			 * @param {Object} config Key configuration.
			 * @return {String} Key for destination column.
			 */
			getMapKey: function(config) {
				return config.schemaUId + config.columnName;
			},

			/**
			 * Returns serializable columns mapping.
			 * @private
			 * return {Array} Serializable columns mapping.
			 */
			getSerializableColumnsMapping: function() {
				var columnsMapping = this.get("ColumnsMapping");
				var serializedColumnsMapping = [];
				columnsMapping.each(function(columnMapping) {
					var serializedColumnMapping = columnMapping.getSerializableObject();
					serializedColumnsMapping.push(serializedColumnMapping);
				});
				return serializedColumnsMapping;
			},

			/**
			 * Returns DeleteImage configuration.
			 * @private
			 * @return {Object}
			 */
			getDeleteImageConfig: function() {
				return resources.localizableImages.DeleteImage;
			},

			/**
			 * Returns account schema unique identifier.
			 * @private
			 * return {String}
			 */
			getAccountSchemaUId: function() {
				return ConfigurationConstants.SysSchema.Account;
			},

			/**
			 * Returns contact schema unique identifier.
			 * @private
			 * return {String}
			 */
			getContactSchemaUId: function() {
				return ConfigurationConstants.SysSchema.Contact;
			},

			/**
			 * Returns address type schema unique identifier.
			 * @private
			 * return {String}
			 */
			getAddressTypeSchemaUId: function() {
				return ConfigurationConstants.SysSchema.AddressType;
			},

			/**
			 * Returns communication type schema unique identifier.
			 * @private
			 * return {String}
			 */
			getCommunicationTypeSchemaUId: function() {
				return ConfigurationConstants.SysSchema.CommunicationType;
			},

			/**
			 * Returns linkedIn communication type unique identifier.
			 * @private
			 * return {String}
			 */
			getLinkedInCommunicationTypeUId: function() {
				return ConfigurationConstants.CommunicationTypes.LinkedIn;
			},

			/**
			 * Returns destination item identifier.
			 * @private
			 * @return {String}
			 */
			getDestinationItemId: function() {
				return this.Terrasoft.generateGUID();
			},

			/**
			 * Finds destination in column mapping.
			 * @private
			 * @param {Object} config Key configuration for destination column.
			 * @param {String} config.schemaUId Destination schema unique identifier.
			 * @param {String} config.columnName Destination column name.
			 * @param {String} config.source File column caption.
			 * @return {Object} Destination.
			 */
			findDestinationInMap: function(config) {
				var map = this.get("Map");
				var key = this.getMapKey(config);
				return map[key];
			},

			/**
			 * Adds destination in column mapping.
			 * @private
			 * @param {Object} config Key configuration for destination column.
			 * @param {String} config.schemaUId Destination schema unique identifier.
			 * @param {String} config.columnName Destination column name.
			 * @param {String} config.source File column caption.
			 */
			addDestinationToMap: function(config) {
				var map = this.get("Map");
				var key = this.getMapKey(config);
				map[key] = config.source;
			},

			/**
			 * Removes destination from column mapping.
			 * @private
			 * @param {Object} config Key configuration for destination column.
			 */
			removeDestinationFromMap: function(config) {
				var map = this.get("Map");
				var key = this.getMapKey(config);
				delete map[key];
			},

			/**
			 * Inits import parameters.
			 * @private
			 * @param {Object} response Server response.
			 * @param {Array} response.Columns Import columns.
			 * @param {String} response.RootSchemaName Root schema name.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initImportParameters: function(response, callback, scope) {
				this.initImportSchemaReferences(function() {
					this.Terrasoft.require([response.RootSchemaName], function(schema) {
						this.set("RootSchema", schema);
						this.initImportSchemaParameters();
						this.initColumnsMapping(response.Columns);
						if (callback) {
							callback.call(scope || this);
						}
					}, this);
				}, this);
			},

			/**
			 * Initialises import schema parameters.
			 * @private
			 */
			initImportSchemaParameters: function() {
				var rootSchema = this.get("RootSchema");
				var rootSchemaUId = rootSchema.uId;
				var references = this.getImportSchemaParameters(rootSchemaUId);
				this.set("HasReferences", !this.Ext.isEmpty(references));
				if (references) {
					this.initSchemaReferencesButton(references);
				}
			},

			/**
			 * Initialises columns mapping.
			 * @private
			 * @param {Array} columns Import schema columns.
			 */
			initColumnsMapping: function(columns) {
				var collection = this.get("ColumnsMapping");
				this.Terrasoft.each(columns, function(column) {
					var columnMapping = this.createColumnMappingItem(column);
					collection.addItem(columnMapping);
				}, this);
			},

			/**
			 * Initialises columns mapping collection.
			 * @private
			 */
			initColumnsMappingCollection: function() {
				var collection = this.Ext.create(this.Terrasoft.BaseViewModelCollection);
				collection.on("add", this.subscribeColumnMappingEvents, this);
				collection.on("remove", this.unsubscribeColumnMappingEvents, this);
				this.set("ColumnsMapping", collection);
			},

			/**
			 * Gets import schema references.
			 * @private
			 * @param {String} rootSchemaUId Root schema unique identifier.
			 * @return {Array} Import schema references.
			 */
			getImportSchemaParameters: function(rootSchemaUId) {
				var references = this.get("ImportSchemaReferences");
				return references[rootSchemaUId];
			},

			/**
			 * Gets menu item.
			 * @private
			 * @param {String} caption Menu item caption.
			 * @param {Object} tag Menu item tag.
			 * @return {Terrasoft.BaseViewModel}
			 */
			getMenuItem: function(caption, tag) {
				return this.getButtonMenuItem({
					"Caption": caption,
					"Click": {"bindTo": "onMenuItemClick"},
					"Tag": tag
				});
			},

			/**
			 * Gets menu item tag.
			 * @private
			 * @param {Object} reference Import schema reference.
			 * @param {Object} attribute Attribute value.
			 * @param {Object} column Import column.
			 * @return {Object} Menu item tag.
			 */
			getMenuItemTag: function(reference, attribute, column) {
				return {
					reference: reference,
					rootSchema: this.get("RootSchema"),
					attribute: attribute,
					column: column
				};
			},

			/**
			 * Initialises contact communication options references.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initContactCommunicationImportSchemaReference: function(callback, scope) {
				var contactCommunicationFilters = this.getContactCommunicationFilters();
				var importSchemaConfig = {
					referenceSchemaName: "ContactCommunication",
					rootSchemaUId: this.getContactSchemaUId(),
					filters: contactCommunicationFilters
				};
				this.initCommunicationImportSchemaReference(importSchemaConfig, callback, scope);
			},

			/**
			 * Initialises account communication options references.
			 * @private
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initAccountCommunicationImportSchemaReference: function(callback, scope) {
				var accountCommunicationFilters = this.getAccountCommunicationFilters();
				var importSchemaConfig = {
					referenceSchemaName: "AccountCommunication",
					rootSchemaUId: this.getAccountSchemaUId(),
					filters: accountCommunicationFilters
				};
				this.initCommunicationImportSchemaReference(importSchemaConfig, callback, scope);
			},

			/**
			 * Initialises communication import schema reference.
			 * @private
			 * @param {Object} importSchemaConfig Import schema config.
			 * @param {String} importSchemaConfig.referenceSchemaName Reference schema name.
			 * @param {Terrasoft.data.filters.FilterGroup} importSchemaConfig.filters Attributes filters.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initCommunicationImportSchemaReference: function(importSchemaConfig, callback, scope) {
				var attributeColumn = this.getCommunicationAttributeColumn();
				this.Ext.apply(importSchemaConfig, {
					displayValue: this.get("Resources.Strings.CommunicationOptionCaption"),
					getSchemaColumnsFunction: this.getCommunicationColumns,
					viewModelClassName: "Terrasoft.CommunicationDestinationViewModel",
					attributeColumn: attributeColumn
				});
				this.initImportSchemaReference(importSchemaConfig, callback, scope);
			},

			/**
			 * Gets communication attribute column information.
			 * @private
			 * @return {Object} Communication attribute column information.
			 */
			getCommunicationAttributeColumn: function() {
				return {
					schemaUId: this.getCommunicationTypeSchemaUId(),
					name: "CommunicationType",
					valueName: "CommunicationTypeId",
					dataValueTypeUId: this.Terrasoft.convertToServerDataValueType(this.Terrasoft.DataValueType.LOOKUP),
					schemaName: "CommunicationType",
					schemaColumnName: "Name"
				};
			},

			/**
			 * Initialises contact address import schema reference.
			 * @private
			 * @param {Function} callback Callback.
			 */
			initContactAddressImportSchemaReference: function(callback) {
				var contactAddressFilters = this.getContactAddressFilters();
				var importSchemaConfig = {
					referenceSchemaName: "ContactAddress",
					rootSchemaUId: this.getContactSchemaUId(),
					filters: contactAddressFilters
				};
				this.initAddressImportSchemaReference(importSchemaConfig, callback);
			},

			/**
			 * Initialises account address import schema reference.
			 * @private
			 * @param {Function} callback Callback.
			 */
			initAccountAddressImportSchemaReference: function(callback) {
				var accountAddressFilters = this.getAccountAddressFilters();
				var importSchemaConfig = {
					referenceSchemaName: "AccountAddress",
					rootSchemaUId: this.getAccountSchemaUId(),
					filters: accountAddressFilters
				};
				this.initAddressImportSchemaReference(importSchemaConfig, callback);
			},

			/**
			 * Gets contact address filters.
			 * @private
			 * @return {Terrasoft.FilterGroup}
			 */
			getContactAddressFilters: function() {
				var filters = this.Terrasoft.createFilterGroup();
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "ForContact", true));
				return filters;
			},

			/**
			 * Gets contact address filters.
			 * @private
			 * @return {Terrasoft.FilterGroup}
			 */
			getAccountAddressFilters: function() {
				var filters = this.Terrasoft.createFilterGroup();
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "ForAccount", true));
				return filters;
			},

			/**
			 * Initialises address import schema reference.
			 * @private
			 * @param {Object} importSchemaConfig Import schema config.
			 * @param {String} importSchemaConfig.referenceSchemaName Reference schema name.
			 * @param {Terrasoft.data.filters.FilterGroup} importSchemaConfig.filters Attributes filters.
			 * @param {Function} callback Callback.
			 */
			initAddressImportSchemaReference: function(importSchemaConfig, callback) {
				var attributeColumn = this.getAddressAttributeColumn();
				this.Ext.apply(importSchemaConfig, {
					displayValue: this.get("Resources.Strings.AddressCaption"),
					getSchemaColumnsFunction: this.getAddressColumns,
					viewModelClassName: "Terrasoft.AddressDestinationViewModel",
					attributeColumn: attributeColumn
				});
				this.initImportSchemaReference(importSchemaConfig, callback);
			},

			/**
			 * Gets address attribute column information.
			 * @private
			 * @return {Object}
			 */
			getAddressAttributeColumn: function() {
				return {
					schemaUId: this.getAddressTypeSchemaUId(),
					name: "AddressType",
					valueName: "AddressTypeId",
					dataValueTypeUId: this.Terrasoft.convertToServerDataValueType(this.Terrasoft.DataValueType.LOOKUP),
					schemaName: "AddressType",
					schemaColumnName: "Name"
				};
			},

			/**
			 * Gets communication columns.
			 * @private
			 * @param {Terrasoft.data.models.BaseEntitySchema} schema Entity schema.
			 * @return {Array} Communication columns.
			 */
			getCommunicationColumns: function(schema) {
				return [
					schema.columns.Number
				];
			},

			/**
			 * Gets address columns.
			 * @private
			 * @param {Terrasoft.data.models.BaseEntitySchema} schema Entity schema.
			 * @return {Array} Address columns.
			 */
			getAddressColumns: function(schema) {
				var columns = schema.columns;
				return [
					columns.Address,
					columns.City,
					columns.Country,
					columns.Region,
					columns.Zip
				];
			},

			/**
			 * Gets LinkedIn communication type filter.
			 * @private
			 * @return {Terrasoft.CompareFilter}
			 */
			getLinkedInTypeFilter: function() {
				var linkedInTypeId = this.getLinkedInCommunicationTypeUId();
				return this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", linkedInTypeId);
			},

			/**
			 * Gets contact communication filters.
			 * @private
			 * @return {Terrasoft.FilterGroup}
			 */
			getContactCommunicationFilters: function() {
				var filters = this.Terrasoft.createFilterGroup();
				var linkedInTypeFilter = this.getLinkedInTypeFilter();
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "UseforContacts", true));
				filters.addItem(linkedInTypeFilter);
				return filters;
			},

			/**
			 * Gets account communication filters.
			 * @private
			 * @return {Terrasoft.FilterGroup}
			 */
			getAccountCommunicationFilters: function() {
				var filters = this.Terrasoft.createFilterGroup();
				var linkedInTypeFilter = this.getLinkedInTypeFilter();
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "UseforAccounts", true));
				filters.addItem(linkedInTypeFilter);
				return filters;
			},

			/**
			 * Initialises import schema reference.
			 * @private
			 * @param {Object} importSchemaConfig Import schema config.
			 * @param {String} importSchemaConfig.referenceSchemaName Reference schema name.
			 * @param {Terrasoft.data.filters.FilterGroup} importSchemaConfig.filters Attributes filters.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initImportSchemaReference: function(importSchemaConfig, callback, scope) {
				var getSchemaColumnsFunction = importSchemaConfig.getSchemaColumnsFunction;
				this.Terrasoft.require([importSchemaConfig.referenceSchemaName], function(referenceSchema) {
					this.getAttributeColumnValues(importSchemaConfig, function(values) {
						var columns = getSchemaColumnsFunction(referenceSchema);
						this.Ext.apply(importSchemaConfig, {
							uId: referenceSchema.uId,
							caption: referenceSchema.caption,
							columns: columns,
							attributeColumnValues: values
						});
						this.addImportSchemaReference(importSchemaConfig);
						if (callback) {
							callback.call(scope || this);
						}
					}, this);
				}, this);
			},

			/**
			 * Adds import schema reference.
			 * @private
			 * @param {Object} importSchemaConfig Import schema config.
			 * @param {String} importSchemaConfig.referenceSchemaName Reference schema name.
			 * @param {Terrasoft.data.filters.FilterGroup} importSchemaConfig.filters Attributes filters.
			 */
			addImportSchemaReference: function(importSchemaConfig) {
				var references = this.get("ImportSchemaReferences");
				var rootSchemaUId = importSchemaConfig.rootSchemaUId;
				var schemaReferences = references[rootSchemaUId];
				if (!schemaReferences) {
					schemaReferences = [];
					references[rootSchemaUId] = schemaReferences;
				}
				schemaReferences.push(importSchemaConfig);
			},

			/**
			 * Gets attribute column values.
			 * @private
			 * @param {Object} importSchemaConfig Import schema config.
			 * @param {String} importSchemaConfig.referenceSchemaName Reference schema name.
			 * @param {Terrasoft.data.filters.FilterGroup} importSchemaConfig.filters Attributes filters.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			getAttributeColumnValues: function(importSchemaConfig, callback, scope) {
				var attributeColumn = importSchemaConfig.attributeColumn;
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: attributeColumn.schemaName
				});
				var columnName = attributeColumn.schemaColumnName;
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				esq.addColumn(columnName);
				if (importSchemaConfig.filters) {
					esq.filters.addItem(importSchemaConfig.filters);
				}
				esq.getEntityCollection(function(response) {
					var values = [];
					if (response.success) {
						var collection = response.collection;
						collection.each(function(item) {
							values.push({
								displayValue: item.get(columnName),
								value: item.get("value")
							});
						});
					}
					callback.call(scope, values);
				}, this);
			},

			/**
			 * Creates reference schema attribute view model.
			 * @private
			 * @param {Object} reference Import schema reference.
			 * @param {Object} attribute Attribute value.
			 * @param {Array} columns Reference schema columns.
			 * @return {Terrasoft.BaseViewModel}
			 */
			createReferenceSchemaAttributeViewModel: function(reference, attribute, columns) {
				var attributeViewModel = this.getMenuItem(attribute.displayValue, null);
				if (columns.length === 1) {
					var tag = this.getMenuItemTag(reference, attribute, columns[0]);
					attributeViewModel.set("Tag", tag);
				} else {
					var columnsCollection = this.createColumnsViewModelCollection(reference, attribute, columns);
					attributeViewModel.set("Items", columnsCollection);
				}
				return attributeViewModel;
			},

			/**
			 * Creates columns view model collection.
			 * @private
			 * @param {Object} reference Import schema reference.
			 * @param {Object} attribute Attribute value.
			 * @param {Array} columns Reference schema columns.
			 * @return {Terrasoft.BaseViewModelCollection}
			 */
			createColumnsViewModelCollection: function(reference, attribute, columns) {
				var columnsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.Terrasoft.each(columns, function(column) {
					var tag = this.getMenuItemTag(reference, attribute, column);
					var columnViewModel = this.getMenuItem(column.caption, tag);
					columnsCollection.addItem(columnViewModel);
				}, this);
				return columnsCollection;
			},

			/**
			 * Validates schema column properties for required and the presence of default value.
			 * @private
			 * @param {Object} schemaColumn Schema column.
			 * @return {Boolean}
			 */
			validateSchemaColumnProperties: function(schemaColumn) {
				var generalUsageType = ConfigurationEnums.EntitySchemaColumnUsageType.General;
				return (schemaColumn.isRequired && schemaColumn.usageType === generalUsageType &&
					this.Terrasoft.isEmptyObject(schemaColumn.defaultValue));
			},

			/**
			 * Validates schema column.
			 * @private
			 * @param {Object} schemaColumn Schema column.
			 * @param {Object} validationResult Validation result.
			 */
			validateSchemaColumn: function(schemaColumn, validationResult) {
				var rootSchema = this.get("RootSchema");
				var columnName = schemaColumn.name;
				var found = this.findDestinationInMap({
					schemaUId: rootSchema.uId,
					columnName: columnName
				});
				if (!found) {
					var column = rootSchema.getColumnByName(columnName);
					if (column) {
						validationResult.columnCaption = column.caption;
					}
					validationResult.success = false;
				}
				return validationResult;
			},

			/**
			 * Initialises typed destination index.
			 * @private
			 * @param {Object} eventArgs Typed destination "add" event arguments.
			 * @param {Terrasoft.configuration.ColumnMappingViewModel} eventArgs.columnMapping Column mapping instance.
			 * @param {Object} eventArgs.destinationConfig Import column destination.
			 * @param {Number} eventArgs.index Typed column destination index.
			 */
			initTypedDestinationIndex: function(eventArgs) {
				var columns = this.get("ColumnsMapping");
				columns.each(function(column) {
					var destinations = column.get("Destinations");
					destinations.each(function(destination) {
						var isIndexValid = destination.validateDestinationIndex(eventArgs);
						if (!isIndexValid) {
							eventArgs.index++;
						}
					}, this);
				}, this);
			},

			/**
			 * Subscribes column mapping events.
			 * @private
			 * @param {Terrasoft.configuration.ColumnMappingViewModel} item Column mapping instance.
			 */
			subscribeColumnMappingEvents: function(item) {
				item.on("beforedestinationadd", this.validateDestination, this);
				item.on("beforetypeddestinationadd", this.validateTypedDestination, this);
				item.on("typeddestinationadd", this.onTypedDestinationAdd, this);
				item.on("destinationdeleted", this.onDestinationDeleted, this);
			},

			/**
			 * Unsubscribes column mapping events.
			 * @private
			 * @param {Terrasoft.configuration.ColumnMappingViewModel} item Column mapping instance.
			 */
			unsubscribeColumnMappingEvents: function(item) {
				item.un("beforedestinationadd", this.validateDestination, this);
				item.un("beforetypeddestinationadd", this.validateTypedDestination, this);
				item.un("typeddestinationadd", this.onTypedDestinationAdd, this);
				item.un("destinationdeleted", this.onDestinationDeleted, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepPage#getSavingResult
			 * @overridden
			 */
			getSavingResult: function() {
				var serializedColumnsMapping = this.getSerializableColumnsMapping();
				this.setColumnsMappingParameters(serializedColumnsMapping, function(response) {
					if (!response.success) {
						this.logRequestError(response.errorInfo);
						return;
					}
					this.sandbox.publish("SavingResult", true, [this.sandbox.id]);
				}, this);
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepPage#getValidationResult
			 * @overridden
			 */
			getValidationResult: function(wizardInfo) {
				if (wizardInfo.newStepIndex < wizardInfo.currentStepIndex) {
					return true;
				}
				var validationResult = this.getColumnMappingValidationResult();
				if (!validationResult.success) {
					var messageTemplate = this.get("Resources.Strings.ValidationMessageTemplate");
					var messageText = this.Ext.String.format(messageTemplate, validationResult.columnCaption);
					this.showInformationDialog(messageText);
				}
				return validationResult.success;
			},

			/**
			 * Creates column mapping item.
			 * @protected
			 * @virtual
			 * @param {Object} columnMappingConfig Configuration for column mapping item.
			 * @param {Array} columnMappingConfig.destinations Import column destinations.
			 * @param {String} columnMappingConfig.index Column index.
			 * @param {String} columnMappingConfig.source File column caption..
			 * @return {Terrasoft.ColumnMappingViewModel}
			 */
			createColumnMappingItem: function(columnMappingConfig) {
				var rootSchema = this.get("RootSchema");
				var menuItems = this.get("MenuItems");
				var hasConnectedSchemas = this.get("HasReferences");
				var references = this.getImportSchemaParameters(rootSchema.uId);
				var newColumnMapping = this.Ext.create(Terrasoft.ColumnMappingViewModel, {
					values: {
						Index: columnMappingConfig.index,
						Source: columnMappingConfig.source,
						Schema: rootSchema,
						Properties: columnMappingConfig.properties,
						isEmpty: true,
						DestinationsInfo: references
					},
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox
				});
				newColumnMapping.addDestinations(columnMappingConfig.destinations, function(destination) {
					this.addDestinationToMap({
						schemaUId: destination.get("SchemaUId"),
						columnName: destination.get("ColumnName"),
						source: newColumnMapping.get("Source")
					});
				}, this);
				newColumnMapping.set("MenuItems", menuItems);
				newColumnMapping.set("HasReferences", hasConnectedSchemas);
				return newColumnMapping;
			},

			/**
			 * Returns configuration for one view of column mapping list item.
			 * @protected
			 * @virtual
			 * @return {Object} Configuration for one view of column mapping list item.
			 * @return {String} return.className Item view class name.
			 * @return {Object} return.classes Item view classes.
			 * @return {Array} return.items Item view child items.
			 * @return {String} return.markerValue Item view marker value.
			 */
			getRowViewConfig: function() {
				var sourceColumnViewConfig = this.getSourceColumnViewConfig();
				var destinationColumnsViewConfig = this.getDestinationColumnsViewConfig();
				return {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["column-matching-row-container"]
					},
					items: [
						sourceColumnViewConfig,
						destinationColumnsViewConfig
					],
					markerValue: {bindTo: "Source"}
				};
			},

			/**
			 * Returns configuration for source column view of column mapping list item.
			 * @protected
			 * @virtual
			 * @return {Object}
			 */
			getSourceColumnViewConfig: function() {
				return {
					className: "Terrasoft.Container",
					classes: {wrapClassName: ["column-matching-container", "source-column-container"]},
					items: [
						{
							className: "Terrasoft.Label",
							caption: {bindTo: "Source"}
						}
					]
				};
			},

			/**
			 * Returns configuration for destination columns view of column mapping list item.
			 * @protected
			 * @virtual
			 * @return {Object}
			 */
			getDestinationColumnsViewConfig: function() {
				var destinationConfig = this.getDestinationItemConfig();
				return {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["column-matching-container", "destination-columns-container"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							style: this.Terrasoft.controls.ButtonEnums.style.RED,
							imageConfig: {bindTo: "getEmptyDestinationImageConfig"},
							classes: {
								wrapperClass: ["destination-image-wrapper"],
								imageClass: ["destination-image"]
							},
							visible: {bindTo: "HasDestinations"}
						},
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["destinations-list-container"]
							},
							items: [
								{
									className: "Terrasoft.ContainerList",
									idProperty: "Id",
									collection: {bindTo: "Destinations"},
									defaultItemConfig: destinationConfig,
									itemPrefix: "_Destinations_ContainerList",
									classes: {
										wrapClassName: ["destinations-container-list"]
									}
								}
							]
						},
						{
							className: "Terrasoft.Button",
							caption: {bindTo: "getSelectColumnButtonCaption"},
							style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							click: {bindTo: "onSelectColumnButtonClick"},
							visible: {bindTo: "HasDestinations"},
							classes: {
								textClass: ["select-column-button"]
							},
							markerValue: "SelectColumn"
						},
						{
							className: "Terrasoft.Button",
							caption: {bindTo: "getAddReferenceSchemaColumnButtonCaption"},
							style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							visible: {bindTo: "getReferenceButtonVisibility"},
							classes: {
								wrapperClass: ["select-column-menu"],
								textClass: ["select-column-button", "connected-entity-button"]
							},
							menu: {items: {bindTo: "MenuItems"}},
							markerValue: "ReferencesButton"
						}
					]
				};
			},

			/**
			 * Returns configuration for destination column view of column mapping list item.
			 * @protected
			 * @virtual
			 * @return {Object}
			 */
			getDestinationItemConfig: function() {
				var deleteImageConfig = this.getDeleteImageConfig();
				var destinationItemId = this.getDestinationItemId();
				return {
					className: "Terrasoft.Container",
					items: [
						{
							className: "Terrasoft.Button",
							style: this.Terrasoft.controls.ButtonEnums.style.GREEN,
							imageConfig: {bindTo: "getDefaultImageConfig"},
							classes: {
								wrapperClass: ["destination-image-wrapper"],
								imageClass: ["destination-image"]
							}
						},
						{
							className: "Terrasoft.Label",
							caption: {bindTo: "getPath"},
							markerValue: {bindTo: "getPath"}
						},
						{
							className: "Terrasoft.Button",
							caption: "",
							style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							imageConfig: {
								source: this.Terrasoft.ImageSources.URL,
								url: this.Terrasoft.ImageUrlBuilder.getUrl(deleteImageConfig)
							},
							click: {bindTo: "onDeleteButtonClick"},
							classes: {
								wrapperClass: ["delete-button-wrapper"]
							},
							markerValue: "DeleteButton"
						}
					],
					id: destinationItemId
				};
			},

			/**
			 * Initialises schema references button.
			 * @protected
			 * @virtual
			 * @param {Array} references Schema references.
			 */
			initSchemaReferencesButton: function(references) {
				var menuItems = this.get("MenuItems");
				this.Terrasoft.each(references, function(reference) {
					var menuItemViewModel = this.getMenuItem(reference.displayValue);
					var attributesCollection = this.createReferenceSchemaAttributesCollection(reference);
					menuItemViewModel.set("Items", attributesCollection);
					menuItems.addItem(menuItemViewModel);
				}, this);
			},

			/**
			 * Creates reference schema attributes collection.
			 * @protected
			 * @virtual
			 * @param {Object} reference Import schema reference.
			 * @param {Array} reference.attributeColumnValues Attribute column values.
			 * @param {Array} reference.columns Reference schema columns.
			 * @return {Terrasoft.BaseViewModelCollection} Reference schema attributes collection.
			 */
			createReferenceSchemaAttributesCollection: function(reference) {
				var attributes = reference.attributeColumnValues;
				var columns = reference.columns;
				var attributesCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.Terrasoft.each(attributes, function(attribute) {
					var attributeViewModel = this.createReferenceSchemaAttributeViewModel(reference, attribute, columns);
					attributesCollection.addItem(attributeViewModel);
				}, this);
				return attributesCollection;
			},

			/**
			 * Returns column mapping validation result.
			 * @protected
			 * @virtual
			 * @return {Object}
			 */
			getColumnMappingValidationResult: function() {
				var rootSchema = this.get("RootSchema");
				var schemaColumns = rootSchema.columns;
				var validationResult = {
					columnCaption: "",
					success: true
				};
				this.Terrasoft.each(schemaColumns, function(schemaColumn) {
					if (this.validateSchemaColumnProperties(schemaColumn)) {
						this.validateSchemaColumn(schemaColumn, validationResult);
					}
					return validationResult.success;
				}, this);
				return validationResult;
			},

			/**
			 * Initialises import schema references information.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initImportSchemaReferences: function(callback, scope) {
				var references = {};
				this.set("ImportSchemaReferences", references);
				this.Terrasoft.chain(
					this.initContactCommunicationImportSchemaReference,
					this.initAccountCommunicationImportSchemaReference,
					this.initContactAddressImportSchemaReference,
					this.initAccountAddressImportSchemaReference,
					function() {
						callback.call(scope);
					},
					this
				);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepPage#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.showBodyMask();
				this.callParent([function() {
					this.initColumnsMappingCollection();
					this.set("Map", {});
					this.set("MenuItems", this.Ext.create(this.Terrasoft.BaseViewModelCollection));
					this.getImportParameters(function(response) {
						this.initImportParameters(response, function() {
							this.hideBodyMask();
							callback.call(scope);
						}, this);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
			 * @overridden
			 */
			destroy: function() {
				var collection = this.get("ColumnsMapping");
				if (collection) {
					collection.un("add", this.subscribeColumnMappingEvents, this);
					collection.un("remove", this.unsubscribeColumnMappingEvents, this);
				}
				this.callParent(arguments);
			},

			/**
			 * Validates destination.
			 * @param {Object} validationInfo
			 */
			validateDestination: function(validationInfo) {
				var columnMapping = validationInfo.columnMapping;
				var destinationConfig = validationInfo.destinationConfig;
				var config = {
					schemaUId: destinationConfig.SchemaUId,
					columnName: destinationConfig.ColumnName,
					source: columnMapping.get("Source")
				};
				var column = this.findDestinationInMap(config);
				if (!column) {
					this.addDestinationToMap(config);
					validationInfo.validationResult = true;
				} else {
					validationInfo.validationResult = false;
					var destinationColumn = destinationConfig.Schema.getColumnByName(destinationConfig.ColumnName);
					var columnCaption = destinationColumn.caption;
					var messageTemplate = this.get("Resources.Strings.DuplicateFieldMessageTemplate");
					var message = this.Ext.String.format(messageTemplate, columnCaption, column);
					this.showInformationDialog(message);
				}
			},

			/**
			 * Validates typed destination.
			 * @param {Object} validationInfo Typed destination validation info.
			 * @param {Object} validationInfo.columnMapping Column mapping information.
			 * @param {Object} validationInfo.destinationConfig Import column destination.
			 * @param {Object} validationInfo.type Destination type.
			 * @param {Boolean} validationInfo.result Validation result.
			 */
			validateTypedDestination: function(validationInfo) {
				var columns = this.get("ColumnsMapping");
				var isDestinationValid = true;
				columns.each(function(column) {
					var destinations = column.get("Destinations");
					destinations.each(function(destination) {
						isDestinationValid = destination.validateDestination(validationInfo);
						return isDestinationValid;
					}, this);
					return isDestinationValid;
				}, this);
				if (!isDestinationValid) {
					var messageTemplate = this.get("Resources.Strings.DuplicateAttributeMessageTemplate");
					var message = this.Ext.String.format(messageTemplate);
					this.showInformationDialog(message);
				}
				validationInfo.result = isDestinationValid;
			},

			/**
			 * Handles column destination "delete" event.
			 * @param {Object} destinationInfo Column destination information.
			 * @param {Object} destinationInfo.columnMapping Column mapping information.
			 * @param {Object} destinationInfo.destination Destination instance.
			 */
			onDestinationDeleted: function(destinationInfo) {
				var columnMapping = destinationInfo.columnMapping;
				var destination = destinationInfo.destination;
				var config = {
					schemaUId: destination.get("SchemaUId"),
					columnName: destination.get("ColumnName"),
					source: columnMapping.get("Source")
				};
				this.removeDestinationFromMap(config);
			},

			/**
			 * Handles typed destination "add" event.
			 * @param {Object} eventArgs Event arguments.
			 */
			onTypedDestinationAdd: function(eventArgs) {
				this.initTypedDestinationIndex(eventArgs);
			},

			/**
			 * Initialises columns list item view config.
			 * @param {Object} view Item view information.
			 * @param {Object} view.config Item view configuration.
			 */
			initColumnsListItemViewConfig: function(view) {
				view.config = this.getRowViewConfig();
			},

			/**
			 * Gets Excel logo.
			 * @return {String}
			 */
			getExcelLogo: function() {
				var image = this.get("Resources.Images.ExcelLogo");
				return Terrasoft.ImageUrlBuilder.getUrl(image);
			},

			/**
			 * Gets bpm'online logo.
			 * @return {String}
			 */
			getBpmonlineLogo: function() {
				return Terrasoft.ImageUrlBuilder.getUrl({
					params: {
						r: "LogoImage"
					},
					source: Terrasoft.ImageSources.SYS_SETTING
				});
			}

			//endregion

		},
		diff: [
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"classes": {"wrapClassName": ["header-container", "columns-mapping"]}
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsHeaderContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generateId": false,
					"classes": {"wrapClassName": ["columns-header-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExcelLogo",
				"parentName": "ColumnsHeaderContainer",
				"propertyName": "items",
				"values": {
					"readonly": true,
					"getSrcMethod": {"bindTo": "getExcelLogo"},
					"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.ExcelLogo),
					"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
				}
			},
			{
				"operation": "insert",
				"name": "BpmonlineLogo",
				"parentName": "ColumnsHeaderContainer",
				"propertyName": "items",
				"values": {
					"readonly": true,
					"getSrcMethod": "getBpmonlineLogo",
					"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsList",
				"parentName": "CenterContainer",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"itemPrefix": "FileImport",
					"collection": "ColumnsMapping",
					"onGetItemConfig": "initColumnsListItemViewConfig",
					"classes": {"wrapClassName": ["column-list-container"]}
				}
			}
		]
	};
});



Terrasoft.configuration.Structures["ColumnMappingViewModel"] = {innerHierarchyStack: ["ColumnMappingViewModel"]};
define("ColumnMappingViewModel", ["StructureExplorerUtilities", "ColumnMappingViewModelResources", "RightUtilities",
		"ColumnDestinationViewModel", "CommunicationDestinationViewModel", "LookupColumnDestinationViewModel"],
		function(StructureExplorerUtilities, resources, RightUtilities) {
	Ext.define("Terrasoft.configuration.ColumnMappingViewModel", {
		alternateClassName: "Terrasoft.ColumnMappingViewModel",
		extend: "Terrasoft.BaseViewModel",

		//region Properties: Protected

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * Default destination viewModel class name.
		 * @protected
		 * @type {String}
		 */
		defaultDestinationViewModelClassName: "Terrasoft.configuration.ColumnDestinationViewModel",

		/**
		 * Lookup destination viewModel class name.
		 * @protected
		 * @type {String}
		 */
		lookupDestinationViewModelClassName: "Terrasoft.configuration.LookupColumnDestinationViewModel",

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		columns: {
			"Index": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Source": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Destinations": {
				dataValueType: Terrasoft.DataValueType.ENTITY_COLLECTION
			},
			"Schema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			"Properties": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			"HasDestinations": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},

		//endregion

		//region Methods: Private

		/**
		 * Deletes item from destinations' collection.
		 * @private
		 * @param {Object} item Item to delete.
		 */
		deleteDestination: function(item) {
			var collection = this.get("Destinations");
			collection.remove(item);
		},

		/**
		 * Actualizes "HasDestinations" property value.
		 * @private
		 */
		updateHasDestinationsProperty: function() {
			var destinations = this.get("Destinations");
			var hasDestinations = destinations.isEmpty();
			this.set("HasDestinations", hasDestinations);
		},

		/**
		 * Returns schema column by its name.
		 * @private
		 * @param {String} columnName Column name.
		 * @return {Object} Column.
		 */
		getSchemaColumnByName: function(columnName) {
			var rootSchema = this.get("Schema");
			var column = rootSchema.getColumnByName(columnName);
			return column;
		},

		/**
		 * Finds destination information.
		 * @private
		 * @param {String} uId Destination schema unique identifier.
		 * return {Object|null}
		 */
		findDestinationInfo: function(uId) {
			var destinationsInfo = this.get("DestinationsInfo");
			var destinationInfo = this.Terrasoft.findWhere(destinationsInfo, {uId: uId});
			return destinationInfo;
		},

		/**
		 * Finds destination type.
		 * @private
		 * @param {Object} info Destination information.
		 * @param {Array} values Destination viewModel values.
		 * return {Object}
		 */
		findDestinationType: function(info, values) {
			var typeValue = this.getTypeValue(values);
			var attributeColumnValue = this.Terrasoft.findWhere(info.attributeColumnValues, {value: typeValue});
			return attributeColumnValue;
		},

		/**
		 * Finds destination type value.
		 * @private
		 * @param {Array} values Destination viewModel values.
		 * @return {String|null}
		 */
		getTypeValue: function(values) {
			var property = this.Terrasoft.findWhere(values.Properties, {Key: "AttributeColumnValueName"});
			var attributeName = property.Value;
			var attribute = this.Terrasoft.findWhere(values.Attributes, {Key: attributeName});
			return attribute.Value;
		},

		/**
		 * Finds destination column caption.
		 * @private
		 * @param {Object} info Destination information.
		 * @param {String} columnName Destination column name.
		 * @return {String}
		 */
		findDestinationColumnCaption: function(info, columnName) {
			var column = this.Terrasoft.findWhere(info.columns, {name: columnName});
			return column.caption;
		},

		/**
		 * Gets destination viewModel class name.
		 * @private
		 * @param {Object} values Initial values of viewModel.
		 * @return {String}
		 */
		getDestinationClassName: function(values) {
			var viewModelClassName = this.defaultDestinationViewModelClassName;
			var properties = values.Properties;
			if (properties && Terrasoft.findWhere(properties, {Key: "ImportColumnName"})) {
				viewModelClassName = this.lookupDestinationViewModelClassName;
			}
			return viewModelClassName;
		},

		/**
		 * Sets destination.
		 * @param {Object} destination Column destination.
		 */
		setDestination: function(destination) {
			var destinations = this.get("Destinations");
			destinations.addItem(destination);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Adds new item to destinations' collection.
		 * @protected
		 * @param {Object} config Destination configuration.
		 * @param {Object} config.values Destination viewModel values.
		 * @param {Function} [callback] Callback function.
		 * @param {Object} [scope] Execution context.
		 */
		addDestination: function(config, callback, scope) {
			var destination = this.createDestination(config);
			var rootSchema = this.get("Schema");
			var referenceSchemaName = destination.getReferenceSchemaName(rootSchema);
			if (Ext.isEmpty(referenceSchemaName)) {
				this.setDestination(destination);
				Ext.callback(callback, scope, [destination]);
			} else {
				RightUtilities.getSchemaEditRights({
					schemaName: referenceSchemaName
				}, function(result) {
					if (Ext.isEmpty(result)) {
						this.setDestination(destination);
						Ext.callback(callback, scope, [destination]);
					} else {
						var message = Ext.String.format(resources.localizableStrings.InvalidObjectRights,
							destination.get("ColumnName"));
						this.showInformationDialog(message);
					}
				}, this);
			}
		},

		/**
		 * Creates destination viewModel.
		 * @protected
		 * @param {Object} config Destination configuration.
		 * @param {Array} config.properties Destination properties.
		 * @param {Array} config.values Destination viewModel values.
		 * @return {Object} Destination viewModel.
		 */
		createDestination: function(config) {
			var values = config.values;
			var info = this.findDestinationInfo(values.SchemaUId);
			var viewModelClassName = this.getDestinationClassName(values);
			if (info) {
				viewModelClassName = info.viewModelClassName;
				values.Type = this.findDestinationType(info, values);
			}
			var destination = this.Ext.create(viewModelClassName, {
				values: values
			});
			return destination;
		},

		/**
		 * Returns information for destination validation.
		 * @protected
		 * @param {Object} destinationConfig Destination configuration.
		 * @return {Object} Information for destination validation.
		 */
		getValidationInfo: function(destinationConfig) {
			return {
				columnMapping: this,
				destinationConfig: destinationConfig,
				validationResult: false
			};
		},

		/**
		 * Handles "column selected" message of Structure Explorer.
		 * @protected
		 * @param {Object} columnConfig Selected column configuration.
		 * @param {String} columnConfig.referenceSchemaName Selected column reference schema name.
		 */
		onColumnSelected: function(columnConfig) {
			var destinationConfig = this.getDestinationConfig(columnConfig);
			var validationInfo = this.getValidationInfo(destinationConfig);
			this.fireEvent("beforedestinationadd", validationInfo);
			var validationResult = validationInfo.validationResult;
			if (!validationResult) {
				return;
			}
			this.addDestination({values: destinationConfig});
		},

		/**
		 * Returns destination configuration. Converts selected column configuration to viewmodel values format.
		 * @protected
		 * @param {Object} columnConfig Selected column configuration.
		 * @param {Array} columnConfig.path Column path.
		 * @return {Object} Destination configuration.
		 */
		getDestinationConfig: function(columnConfig) {
			var path = columnConfig.path;
			var columnName = path[0];
			var column = this.getSchemaColumnByName(columnName);
			var rootSchema = this.get("Schema");
			var referenceSchemaName = columnConfig.referenceSchemaName;
			var importColumnName = "";
			if (path.length > 1) {
				importColumnName = path[1];
				referenceSchemaName = column.referenceSchemaName;
			}
			var properties = [
				{
					Key: "TypeUId",
					Value: this.Terrasoft.convertToServerDataValueType(column.dataValueType)
				}
			];
			if (referenceSchemaName) {
				properties.push({
					Key: "ReferenceSchemaName",
					Value: referenceSchemaName
				});
			}
			if (importColumnName) {
				var importColumnCaption = columnConfig.caption[1];
				properties.push(
					{
						Key: "ImportColumnName",
						Value: importColumnName
					},
					{
						Key: "ImportColumnCaption",
						Value: importColumnCaption
					});
			}
			return {
				Id: this.Terrasoft.generateGUID(),
				IsKey: (rootSchema.primaryDisplayColumnName === columnName),
				Schema: rootSchema,
				SchemaUId: rootSchema.uId,
				ColumnName: columnName,
				Properties: properties
			};
		},

		/**
		 * Handles collection "remove" event.
		 * @protected
		 * @param {Object} item Destination item.
		 */
		onDestinationRemove: function(item) {
			item.un("delete", this.deleteDestination, this);
			var validationInfo = {
				columnMapping: this,
				destination: item
			};
			this.fireEvent("destinationdeleted", validationInfo);
			this.updateHasDestinationsProperty();
		},

		/**
		 * Handles collection "add" event.
		 * @protected
		 * @param {Object} item Destination item.
		 */
		onDestinationAdd: function(item) {
			item.on("delete", this.deleteDestination, this);
			this.updateHasDestinationsProperty();
		},

		/**
		 * Returns viewModel properties.
		 * @protected
		 * @virtual
		 * @param {Object} config Reference schema column configuration.
		 * @param {Object} config.reference Import schema reference.
		 * @param {Object} config.column Reference schema column configuration.
		 * @return {Array} ViewModel properties.
		 */
		getReferenceSchemaDestinationProperties: function(config) {
			var reference = config.reference;
			var column = config.column;
			return [
				{
					Key: "TypeUId",
					Value: this.Terrasoft.convertToServerDataValueType(column.dataValueType)
				},
				{
					Key: "AttributeColumnValueName",
					Value: reference.attributeColumn.valueName
				},
				{
					Key: "Index",
					Value: this.getIndex(config)
				}
			];
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * Before destination add event.
				 */
				"beforedestinationadd",
				/**
				 * @event
				 * Before typed destination add event.
				 */
				"beforetypeddestinationadd",
				/**
				 * @event
				 * After typed destination add event.
				 */
				"typeddestinationadd",
				/**
				 * @event
				 * Destination deleted event.
				 */
				"destinationdeleted",
				/**
				 * @event
				 * Before column add event.
				 */
				"beforecolumnadd"
			);
			var collection = this.Ext.create(this.Terrasoft.BaseViewModelCollection);
			this.set("Destinations", collection);
			this.updateHasDestinationsProperty();
			collection.on("add", this.onDestinationAdd, this);
			collection.on("remove", this.onDestinationRemove, this);
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		destroy: function() {
			var collection = this.get("Destinations");
			collection.un("add", this.onDestinationAdd, this);
			collection.un("remove", this.onDestinationRemove, this);
			this.callParent(arguments);
		},

		/**
		 * Adds reference schema destination.
		 * @param {Object} config Reference schema column configuration.
		 * @param {Object} config.reference Import schema reference.
		 * @param {Object} config.column Reference schema column configuration.
		 */
		addReferenceSchemaDestination: function(config) {
			var destinationProperties = this.getReferenceSchemaDestinationProperties(config);
			var column = config.column;
			if (column.isLookup) {
				destinationProperties.push({
					Key: "ReferenceSchemaName",
					Value: column.referenceSchemaName
				});
			}
			var destinationConfig = this.getReferenceSchemaDestinationViewModelConfig(config, destinationProperties);
			this.addDestination(destinationConfig);
		},

		/**
		 * Returns reference schema destination viewModel configuration.
		 * @param {Object} config Reference schema column configuration.
		 * @param {Object} config.reference Import schema reference.
		 * @param {Object} config.column Reference schema column configuration.
		 * @param {Object} config.attribute Reference schema attribute configuration.
		 * @param {Array} destinationProperties Destination properties.
		 * @return {Object} object reference schema destination viewModel configuration.
		 * @return {Object} object.values ViewModel values.
		 */
		getReferenceSchemaDestinationViewModelConfig: function(config, destinationProperties) {
			var reference = config.reference;
			var column = config.column;
			return {
				values: {
					Id: this.Terrasoft.generateGUID(),
					RootSchema: config.rootSchema,
					SchemaUId: reference.uId,
					ColumnName: column.name,
					Properties: destinationProperties,
					Attributes: [
						{
							Key: reference.attributeColumn.valueName,
							Value: config.attribute.value
						}
					],
					SchemaCaption: reference.caption,
					ColumnCaption: column.caption
				}
			};
		},

		/**
		 * Validates reference schema column.
		 * @param {Object} config Reference schema column configuration.
		 * @param {Object} config.reference Import schema reference.
		 * @param {Object} config.column Reference schema column configuration.
		 * @param {Object} config.attribute Attribute value.
		 * @return {Boolean} Validation result.
		 */
		validateReferenceSchemaDestination: function(config) {
			var validationInfo = {
				columnMapping: this,
				destinationConfig: {
					ColumnName: config.column.name,
					SchemaUId: config.reference.uId
				},
				type: config.attribute,
				result: false
			};
			this.fireEvent("beforetypeddestinationadd", validationInfo);
			return validationInfo.result;
		},

		/**
		 * Returns typed destination index.
		 * @param {Object} config Reference schema column configuration.
		 * @param {Object} config.reference Import schema reference.
		 * @param {Object} config.column Reference schema column configuration.
		 * @param {Object} config.attribute Attribute value.
		 * @return {Number} Typed destination index.
		 */
		getIndex: function(config) {
			var eventArgs = {
				columnMapping: this,
				destinationConfig: {
					ColumnName: config.column.name,
					SchemaUId: config.reference.uId
				},
				type: config.attribute,
				index: 0
			};
			this.fireEvent("typeddestinationadd", eventArgs);
			return eventArgs.index;
		},

		/**
		 * Adds column mapping destinations.
		 * @param {Array} destinationConfigs Destinations configurations.
		 * @param {Function} [callback] Callback function.
		 * @param {Object} [scope] Execution context.
		 */
		addDestinations: function(destinationConfigs, callback, scope) {
			var rootSchema = this.get("Schema");
			this.Terrasoft.each(destinationConfigs, function(config) {
				var schemaUId = config.schemaUId;
				var info = this.findDestinationInfo(schemaUId);
				var schemaCaption;
				var columnCaption;
				if (info) {
					schemaCaption = info.caption;
					columnCaption = this.findDestinationColumnCaption(info, config.columnName);
				}
				this.addDestination({
					values: {
						Id: this.Terrasoft.generateGUID(),
						IsKey: config.isKey,
						Schema: (rootSchema.uId === schemaUId) ? rootSchema : null,
						SchemaUId: schemaUId,
						ColumnName: config.columnName,
						Properties: config.properties,
						Attributes: config.attributes,
						SchemaCaption: schemaCaption,
						ColumnCaption: columnCaption
					}
				}, callback, scope);
			}, this);
		},

		/**
		 * Returns select column button caption.
		 * @return {String} Select column button caption.
		 */
		getSelectColumnButtonCaption: function() {
			return resources.localizableStrings.SelectColumnButtonCaption;
		},

		/**
		 * Returns add reference schema column button caption.
		 * @return {String} Add reference schema column button caption.
		 */
		getAddReferenceSchemaColumnButtonCaption: function() {
			return resources.localizableStrings.AddReferenceSchemaColumnButtonCaption;
		},

		/**
		 * Returns empty destination image configuration.
		 * @return {Object} config Image configuration.
		 * @return {String} config.source Image resource type.
		 * @return {String} config.url Source image url.
		 */
		getEmptyDestinationImageConfig: function() {
			return {
				source: Terrasoft.ImageSources.URL,
				url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.EmptyDestinationImage)
			};
		},

		/**
		 * Returns reference button visibility.
		 * @return {Boolean} Reference button visibility.
		 */
		getReferenceButtonVisibility: function() {
			var hasDestinations = this.get("HasDestinations");
			var hasReferences = this.get("HasReferences");
			return (hasDestinations && hasReferences);
		},

		/**
		 * Returns serializable object.
		 * @return {Object} object Serializable object.
		 * @return {String} object.index Import file column index.
		 * @return {String} object.source Import file column name.
		 * @return {Array}  object.destinations Column destinations.
		 * @return {Array}  object.properties Column mapping properties.
		 */
		getSerializableObject: function() {
			var destinations = this.get("Destinations");
			var destinationsArray = [];
			destinations.each(function(destination) {
				destinationsArray.push(destination.getSerializableObject());
			});
			return {
				index: this.get("Index"),
				source: this.get("Source"),
				destinations: destinationsArray,
				properties: this.get("Properties")
			};
		},

		/**
		 * Handles select column button click.
		 */
		onSelectColumnButtonClick: function() {
			var renderTo = "";
			var schema = this.get("Schema");
			var config = {
				schemaName: schema.name,
				firstColumnsOnly: false
			};
			StructureExplorerUtilities.Open(this.sandbox, config, this.onColumnSelected, renderTo, this);
		},

		/**
		 * Handles menu item click.
		 */
		onMenuItemClick: function(config) {
			if (!config) {
				return;
			}
			if (this.validateReferenceSchemaDestination(config)) {
				this.addReferenceSchemaDestination(config);
			}
		}

		//endregion
	});
});



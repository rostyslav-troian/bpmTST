Terrasoft.configuration.Structures["EntityColumnMappingMixin"] = {innerHierarchyStack: ["EntityColumnMappingMixin"]};
define("EntityColumnMappingMixin", ["terrasoft", "ModalBox", "EntityColumnMappingMixinResources",
	"EntityColumnMappingViewModel", "ProcessLookupPageMixin"],
	function(Terrasoft, ModalBox, resources) {

		/**
		 * Mixin for the Column-Value block.
		 */
		Ext.define("Terrasoft.configuration.mixins.EntityColumnMappingMixin", {
			alternateClassName: "Terrasoft.EntityColumnMappingMixin",

			//region Properties: Private
			mixins: {
				processLookupPageMixin: "Terrasoft.ProcessLookupPageMixin"
			},
			/**
			 * Attributes. Will be applied to the host class model.
			 * @private
			 */
			entityColumnMappingAttributes: {
				/**
				 * Cached collection of selected entity columns.
				 */
				"EntityColumns": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},

				/**
				 * Cached collection of source entity columns.
				 */
				"SourceSchemaColumns": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},

				/**
				 * Collection viewModel's controls for record column value element.
				 */
				"EntityColumnMappingsControls": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},

				/**
				 * Record column values view element config.
				 */
				"EntityColumnMappingsViewConfig": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				}
			},

			//endregion

			//region Methods: Private

			/**
			 * Applies attributes to the host class model.
			 * @private
			 */
			applyAttributes: function() {
				var entityColumnMappingAttributes = this.entityColumnMappingAttributes;
				Ext.applyIf(this.columns, entityColumnMappingAttributes);
				for (var attributeName in entityColumnMappingAttributes) {
					if (!entityColumnMappingAttributes.hasOwnProperty(attributeName)) {
						continue;
					}
					if (this.model[attributeName]) {
						continue;
					}
					var column = this.columns[attributeName];
					if (!column || !Ext.isDefined(column.value)) {
						this.set(attributeName, null);
					} else {
						this.set(attributeName, column.value);
					}
				}
			},

			/**
			 * Applies resources to the host class model.
			 * @private
			 */
			applyResources: function() {
				var attributes = this.model.attributes;
				var resourceKey, attributeName;
				var localizableStrings = resources.localizableStrings;
				var localizableImages = resources.localizableImages;
				for (resourceKey in localizableStrings) {
					if (!localizableStrings.hasOwnProperty(resourceKey)) {
						continue;
					}
					attributeName = "Resources.Strings." + resourceKey;
					if (attributes[attributeName]) {
						continue;
					}
					this.set(attributeName, localizableStrings[resourceKey]);
				}
				for (resourceKey in localizableImages) {
					if (!localizableImages.hasOwnProperty(resourceKey)) {
						continue;
					}
					attributeName = "Resources.Images." + resourceKey;
					if (attributes[attributeName]) {
						continue;
					}
					this.set(attributeName, localizableImages[resourceKey]);
				}
			},

			/**
			 * Fills EntityColumnMappingsControls with initial values from parameter EntityColumnMappings.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @param {Terrasoft.Collection} entityColumns Entity columns collection.
			 */
			initEntityColumnMappings: function(element, entityColumns, callback, scope) {
				var controlList = Ext.create("Terrasoft.ObjectCollection");
				if (entityColumns && !entityColumns.isEmpty()) {
					var recordColumnValuesParameterName = this.getEntityColumnMappingsParameterName();
					var parameter = element.getParameterByName(recordColumnValuesParameterName);
					var metaDataCollectionValue = Terrasoft.decode(parameter.sourceValue.value);
					if (metaDataCollectionValue) {
						var recordColumnValueList = metaDataCollectionValue.$values;
						recordColumnValueList.forEach(function(item) {
							var id = item.columnMetaPath.value;
							var column = entityColumns.find(id);
							if (!column) {
								return;
							}
							var config = {
								column: column,
								columnMapping: item
							};
							var viewModel = this.getEntityColumnMappingViewModel(config);
							controlList.add(id, viewModel);
							column.selected = true;
						}, this);
					}
				}
				this.set("EntityColumnMappingsControls", controlList);
				controlList.eachAsync(function(viewModel, next) {
					viewModel.init(next, this);
				}, callback, scope);
			},

			/**
			 * Updates menus of all column mapping controls.
			 * @private
			 * @param {Terrasoft.Collection} sourceSchemaColumns Source schema columns.
			 */
			updateEntityMappingControlsMenu: function(sourceSchemaColumns) {
				var mappingControls = this.get("EntityColumnMappingsControls");
				if (mappingControls) {
					mappingControls.each(function(mappingControl) {
						mappingControl.updateSourceColumns(sourceSchemaColumns);
					});
				}
			},

			/**
			 * Returns entity column mapping parameter value for new entity column mapping collection item.
			 * @private
			 * @param {Object} column Schema column.
			 * @return {Object} The value of the mapping parameter.
			 */
			getEmptyColumnMappingParameterValue: function(column) {
				var schemaColumn = column.schemaColumn;
				var dataValueType = schemaColumn.dataValueType;
				var dataValueTypeUId = Terrasoft.convertToServerDataValueType(dataValueType);
				var value = {
					value: "",
					displayValue: "",
					source: Terrasoft.ProcessSchemaParameterValueSource.None,
					dataValueType: dataValueType,
					dataValueTypeUId: dataValueTypeUId,
					referenceSchemaUId: schemaColumn.referenceSchemaUId
				};
				return value;
			},

			/**
			 * Returns entity column mapping parameter value.
			 * @private
			 * @param {Object} columnMapping Localizable column item.
			 * @return {Object} The value of the mapping parameter.
			 */
			getColumnMappingParameterValue: function(columnMapping) {
				var parameterValue = Terrasoft.decode(columnMapping.parameterValue.value);
				var referenceSchemaUId = parameterValue.ReferenceSchemaUId;
				if (Terrasoft.isEmptyGUID(referenceSchemaUId)) {
					referenceSchemaUId = null;
				}
				var value = this.getCurrentCultureValue(columnMapping.value.value);
				var displayValue = value ? this.getCurrentCultureValue(columnMapping.displayValue.value) : "";
				var dataValueType;
				var dataValueTypeUId = parameterValue.DataValueTypeUId;
				if (dataValueTypeUId && !Terrasoft.isEmptyGUID(dataValueTypeUId)) {
					dataValueType = Terrasoft.convertToClientDataValueType(dataValueTypeUId);
				}
				return {
					value: value,
					displayValue: displayValue,
					source: parameterValue.Source,
					dataValueType: dataValueType,
					dataValueTypeUId: dataValueTypeUId,
					referenceSchemaUId: referenceSchemaUId
				};
			},

			/**
			 * Returns culture value of localizable string.
			 * @private
			 * @param {Object} localizableString Localizable string like object.
			 * @return {String}
			 */
			getCurrentCultureValue: function(localizableString) {
				if (!localizableString) {
					return "";
				}
				if (typeof localizableString === "string") {
					return localizableString;
				}
				var currentCulture = Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue;
				var cultureValue = localizableString ? localizableString.cultureValues[currentCulture] : "";
				return cultureValue;
			},

			/**
			 * Returns tools button delete menu item ViewModel.
			 * @private
			 * @return {Terrasoft.BaseViewModel} Delete menu item ViewModel.
			 */
			getDeleteMenuItemViewModel: function() {
				var caption = this.get("Resources.Strings.EntityColumnMapping_DeleteMenuItemCaption");
				return Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: Terrasoft.generateGUID(),
						Caption: caption,
						Click: {"bindTo": "onDeleteClick"},
						MarkerValue: caption,
						Tag: "DeleteButton"
					}
				});
			},

			/**
			 * Returns entity column mapping element view model.
			 * @private
			 * @param {Object} config Mapping configuration.
			 * @param {Object} config.column Schema column for the mapping.
			 * @param {Object} [config.columnMapping] Entity column mapping collection item.
			 * @return {Terrasoft.EntityColumnMappingViewModel}
			 */
			getEntityColumnMappingViewModel: function(config) {
				var column = config.column;
				var schemaColumn = column.schemaColumn;
				var mapping = config.columnMapping;
				var value = (Ext.isEmpty(mapping))
					? this.getEmptyColumnMappingParameterValue(column)
					: this.getColumnMappingParameterValue(mapping);
				mapping = mapping || {};
				var deleteMenuItemViewModel = this.getDeleteMenuItemViewModel();
				var toolsButtonMenuViewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection", {
					items: {"delete": deleteMenuItemViewModel}
				});
				var toolButtonImage = this.get("Resources.Images.EntityColumnMapping_ToolButtonImage");
				var onItemRemoved = this.clearSelection.bind(this);
				var invokerUId = this.get("uId");
				var packageUId = this.get("packageUId");
				var localizableParameterValueId = mapping.ItemUId || Terrasoft.generateGUID();
				var sourceSchemaColumns = this.get("SourceSchemaColumns");
				var viewModel = Ext.create("Terrasoft.EntityColumnMappingViewModel", {
					sandbox: this.sandbox,
					values: {
						Id: column.id,
						ProcessElement: this.get("ProcessElement"),
						SchemaColumn: schemaColumn,
						Caption: column.caption,
						Value: value,
						MarkerValue: "RecordColumnValue-" + schemaColumn.name,
						LocalizableParameterValueId: localizableParameterValueId,
						ToolButtonMenu: toolsButtonMenuViewModelCollection,
						packageUId: packageUId,
						ToolButtonImage: toolButtonImage,
						InvokerUId: invokerUId
					},
					methods: {
						onItemFocused: this.onItemFocused,
						onItemRemoved: onItemRemoved
					}
				});
				viewModel.updateSourceColumns(sourceSchemaColumns);
				return viewModel;
			},

			/**
			 * Clears selection for the entity column mapping item.
			 * @private
			 * @param {String} id Column item identifier.
			 */
			clearSelection: function(id) {
				var entityColumns = this.get("EntityColumns");
				var entityColumn = entityColumns.get(id);
				entityColumn.selected = false;
			},

			/**
			 * Returns EntityColumnMappings parameter values in server format.
			 * @private
			 * @return {Object[]}
			 */
			getEntityColumnMappingsMetaValue: function() {
				var entitySchemaUId = this.getEntityColumnMappingSchemaUId();
				if (!entitySchemaUId) {
					return [];
				}
				var controlList = this.get("EntityColumnMappingsControls");
				if (!controlList) {
					return [];
				}
				var valuesList = [];
				controlList.each(function(control) {
					var mappingValue = control.get("Value");
					if (!mappingValue) {
						return;
					}
					var dataValueTypeUId = mappingValue.dataValueTypeUId;
					var source = mappingValue.source;
					var value = this.getLocalizableParameterValues(mappingValue.value, source, dataValueTypeUId);
					var displayValue = this.getLocalizableParameterValues(mappingValue.displayValue, source,
							dataValueTypeUId);
					var itemValue = {
						"ItemUId": control.get("LocalizableParameterValueId"),
						"columnMetaPath": {
							"value": control.get("Id")
						},
						"schemaUId": {
							"value": entitySchemaUId
						},
						"value": value,
						"displayValue": displayValue,
						"parameterValue": {
							"value": this.getEntityColumnMappingsParameterValue(mappingValue, dataValueTypeUId)
						}
					};
					valuesList.push(itemValue);
				}, this);
				return valuesList;
			},

			/**
			 * Gets a value indicating where column sourceValue can be localized.
			 * @private
			 * @param {String} dataValueTypeUId DataValueType identifier of the value.
			 * @param {Terrasoft.process.enums.ProcessSchemaParameterValueSource} source The source of the value.
			 * @return {Boolean} True, if value is localizable, otherwise - false.
			 */
			getIsValueLocalizable: function(source, dataValueTypeUId) {
				var sources = Terrasoft.process.enums.ProcessSchemaParameterValueSource;
				if (source === sources.Script || source === sources.Mapping) {
					return false;
				}
				var dataValueType = Terrasoft.ServerDataValueType[dataValueTypeUId];
				var isTextDataValueType = Terrasoft.isTextDataValueType(dataValueType);
				return isTextDataValueType;
			},

			/**
			 * Returns localizable parameter values of value in server format.
			 * @private
			 * @param {String} value Current culture value.
			 * @param {Terrasoft.process.enums.ProcessSchemaParameterValueSource} source The source of the value.
			 * @param {String} dataValueTypeUId DataValueType identifier of the value.
			 * @return {Object} Localizable parameter value item.
			 * @return {String|Terrasoft.LocalizableString} return.value Item value.
			 * @return {Boolean} [return.isLczValue=false] Indicates that the value is localizable.
			 */
			getLocalizableParameterValues: function(value, source, dataValueTypeUId) {
				if (!value) {
					return {
						"value": ""
					};
				}
				var isLczValue = this.getIsValueLocalizable(source, dataValueTypeUId);
				if (isLczValue) {
					return {
						"isLczValue": true,
						"value": value
					};
				}
				return {
					"value": value
				};
			},

			/**
			 * Returns EntityColumnMappings parameter value in server format.
			 * @private
			 * @param {Object} mappingValue Parameter mapping value.
			 * @param {String} dataValueTypeUId DataValueType identifier of the value.
			 * @return {String}
			 */
			getEntityColumnMappingsParameterValue: function(mappingValue, dataValueTypeUId) {
				var parameterValue = {
					"$type": "Terrasoft.Core.Process.ProcessSchemaParameterValue, Terrasoft.Core",
					"Source": mappingValue.source,
					"DisplayValue": "",
					"Value": "",
					"MetaPath": mappingValue.metaPath || null,
					"MetaDataValue": null,
					"ModifiedInSchemaUId": Terrasoft.GUID_EMPTY,
					"SchemaUId": Terrasoft.GUID_EMPTY,
					"SchemaManagerName": "",
					"DataValueTypeUId": dataValueTypeUId,
					"ReferenceSchemaUId": mappingValue.referenceSchemaUId || Terrasoft.GUID_EMPTY,
					"ResourceItemName": null
				};
				return Terrasoft.encode(parameterValue);
			},

			/**
			 * Queries entity columns for ReferenceSchemaUId.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.Collection} callback.entityColumns The collection of the entity schema columns.
			 * @param {Object} scope Callback function scope.
			 */
			queryEntityColumns: function(callback, scope) {
				var referenceSchemaUId = this.getEntityColumnMappingSchemaUId();
				if (!referenceSchemaUId) {
					callback.call(scope);
					return;
				}
				var entityColumns = this.get("EntityColumns");
				if (entityColumns) {
					callback.call(scope, entityColumns);
					return;
				}
				this.queryMappingEntitySchemaColumns(referenceSchemaUId, callback, scope);
			},

			/**
			 * Queries entity schema columns for ReferenceSchemaUId.
			 * @private
			 * @param {String} schemaUId UId of the entity schema.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.Collection} callback.entityColumns The collection of the entity schema columns.
			 * @param {Object} scope Callback function scope.
			 */
			queryMappingEntitySchemaColumns: function(schemaUId, callback, scope) {
				var entityColumns = Ext.create("Terrasoft.Collection");
				var packageUId = this.get("packageUId");
				var config = {
					schemaUId: schemaUId,
					packageUId: packageUId
				};
				Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(schema) {
					if (schema) {
						schema.columns.each(function(column) {
							var id = column.uId;
							var caption = column.caption.getValue();

							// TODO #CRM-22004
							if (!caption) {
								caption = column.name;
								var message = "Title for column \"{0}.{1}\" is not defined";
								message = Ext.String.format(message, schema.name, column.name);
								this.log(message, Terrasoft.LogMessageType.WARNING);
							}
							var entityColumn = {
								id: id,
								caption: caption,
								schemaColumn: column,
								selected: false
							};
							entityColumns.add(id, entityColumn);
						}, this);
						entityColumns.sort("caption");
						this.set("EntityColumns", entityColumns);
						callback.call(scope, entityColumns);
					} else {
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * Adds column default value.
			 * @private
			 */
			onAddEntityColumnMappings: function() {
				this.queryEntityColumns(function(entityColumns) {
					this.addSubscriptionsToColumnMappingSetParametersInfo();
					this.showEntitySchemaColumnSelectPage(entityColumns);
				}, this);
			},

			/**
			 * Adds subscriptions  on SetParametersInfo.
			 * @private
			 */
			addSubscriptionsToColumnMappingSetParametersInfo: function() {
				var schemaName = "ProcessLookupPage";
				var pageId = this.sandbox.id + schemaName;
				this.sandbox.subscribe("SetParametersInfo", function(parametersInfo) {
					if (parametersInfo) {
						this.addEntityColumnMappingsControls(parametersInfo.selectedRows);
					}
					this.closeSchemaColumnSelectPage();
				}, this, [pageId]);
			},

			/**
			 * Adds controls by selected columns if not exists.
			 * @private
			 * @param {String[]} selectedRows Selected columns.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			addEntityColumnMappingsControls: function(selectedRows, callback, scope) {
				var controlList = this.get("EntityColumnMappingsControls");
				this.queryEntityColumns(function(entityColumns) {
					entityColumns.each(function(column) {
						var id = column.id;
						var selected = Ext.Array.contains(selectedRows, id);
						if (selected && !controlList.contains(id)) {
							var viewModel = this.getEntityColumnMappingViewModel({column: column});
							controlList.add(id, viewModel);
						}
						if (!selected && controlList.contains(id)) {
							controlList.removeByKey(id);
						}
						column.selected = selected;
					}, this);
					if (Ext.isFunction(callback)) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Returns tools button configuration for parameter.
			 * @private
			 * @param {String} id Control identifier.
			 */
			getToolsButtonConfig: function(id) {
				var config = {
					id: id,
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					imageConfig: {"bindTo": "ToolButtonImage"},
					menu: {
						items: {
							bindTo: "ToolButtonMenu"
						}
					},
					classes: {
						imageClass: ["button-background-no-repeat"],
						wrapperClass: ["detail-tools-button-wrapper"],
						menuClass: ["detail-tools-button-menu"]
					},
					markerValue: {
						bindTo: "getToolsButtonContainerMarkerValue"
					}
				};
				return config;
			},

			/**
			 * Handles changing of 'SourceSchemaColumns' attribute.
			 * @private
			 * @param {Backbone.Model} model Model.
			 * @param {Terrasoft.Collection} sourceSchemaColumns Source schema columns.
			 */
			onSourceSchemaColumnsChanged: function(model, sourceSchemaColumns) {
				this.updateEntityMappingControlsMenu(sourceSchemaColumns);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Returns the name of the parameter that stores column values data.
			 * @protected
			 * @return {String}
			 */
			getEntityColumnMappingsParameterName: function() {
				return "RecordColumnValues";
			},

			/**
			 * Returns the entity schema identifier for columns.
			 * @abstract
			 * @protected
			 * @return {String}
			 */
			getEntityColumnMappingSchemaUId: function() {
				throw new Terrasoft.exceptions.NotImplementedException();
			},

			/**
			 * Returns the entity schema identifier, which columns could be source for the mappings.
			 * @protected
			 * @return {String}
			 */
			getMappingSourceSchemaUId: function() {
				return null;
			},

			/**
			 * Generates configuration view of the element.
			 * @protected
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 */
			getEntityColumnMappingsControlViewConfig: function(itemConfig) {
				var cachedViewConfig = this.get("EntityColumnMappingsViewConfig");
				if (cachedViewConfig) {
					itemConfig.config = cachedViewConfig;
					return;
				}
				var buttonConfig = this.getToolsButtonConfig("ToolsButton");
				var labelConfig = {
					id: "record-column-value-caption",
					className: "Terrasoft.Label",
					caption: {bindTo: "Caption"},
					labelClass: "t-label"
				};
				var mappingEditConfig = {
					id: "Value",
					className: "Terrasoft.MappingEdit",
					value: {bindTo: "Value"},
					openEditWindow: {bindTo: "openExtendedMappingEditWindow"},
					classes: {wrapperClass: "top-caption-control"},
					markerValue: {bindTo: "MarkerValue"},
					prepareMenu: {bindTo: "onPrepareMenu"},
					menu: {
						"items": {"bindTo": "MenuItems"}
					}
				};
				var buttonContainerConfig = this.getContainerConfig(
						"ToolsButtonWrap", ["tools-button-container-wrapClass"], [buttonConfig]);
				var labelContainerConfig = this.getContainerConfig(
						"LabelWrap", ["label-container-wrapClass"], [labelConfig]);
				var toolsContainerConfig = this.getContainerConfig(
						"ToolsContainer", ["tools-container-wrapClass"], [labelContainerConfig, buttonContainerConfig]);
				toolsContainerConfig.markerValue = "entityColumnMappingToolsContainer";
				var entityColumnContainerConfig = this.getContainerConfig(
				"EntityColumnContainer", ["entity-column-mapping"], [toolsContainerConfig, mappingEditConfig]);
				entityColumnContainerConfig.markerValue = "entityColumnMappingInnerContainer";
				var config = itemConfig.config = this.getContainerConfig(
						"item-view", ["top-caption-control", "control-width-15"], [entityColumnContainerConfig]);
				config.markerValue = {"bindTo": "getMarkerValue"};
				this.set("EntityColumnMappingsViewConfig", config);
			},

			/**
			 * Clears mapping of entity columns.
			 * @protected
			 */
			clearEntityColumnMapping: function() {
				var entityColumns = this.get("EntityColumns");
				if (entityColumns) {
					entityColumns.each(function(column) {
						column.selected = false;
					});
				}
				var controlList = this.get("EntityColumnMappingsControls");
				if (controlList) {
					controlList.each(function(control) {
						control.destroy();
					});
					controlList.clear();
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * Initializes the mixin.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @param {Function} callback Callback function.
			 * @param {Function} [scope] The scope for callback function.
			 */
			initEntityColumnMappingMixin: function(element, callback, scope) {
				this.applyAttributes();
				this.applyResources();
				this.on("change:SourceSchemaColumns", this.onSourceSchemaColumnsChanged, this);
				this.queryEntityColumns(function(entityColumns) {
					this.updateMappingSourceSchemaColumns(element, function() {
						this.initEntityColumnMappings(element, entityColumns, function() {
							callback.call(scope || this, entityColumns);
						}, this);
					}, this);
				}, this);
			},

			/**
			 * Updates mapping source schema columns.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @param {Function} callback Callback function.
			 * @param {Object} [scope] Callback function scope.
			 */
			updateMappingSourceSchemaColumns: function(element, callback, scope) {
				var entitySchemaUId = this.getMappingSourceSchemaUId();
				if (!entitySchemaUId) {
					this.set("SourceSchemaColumns", null);
					callback.call(scope || this);
					return;
				}
				var config = {
					schemaUId: entitySchemaUId,
					packageUId: element.getPackageUId()
				};
				this.Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(schema) {
					var columns = schema ? schema.columns.clone() : null;
					this.set("SourceSchemaColumns", columns);
					callback.call(scope || this);
				}, this);
			},

			/**
			 * Clears column items and initializes by current entity schema.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @param {Function} callback Callback function.
			 * @param {Function} [scope] The scope for callback function.
			 */
			reInitEntityColumnMapping: function(element, callback, scope) {
				this.set("EntityColumns", null);
				this.set("EntityColumnMappingsViewConfig", null);
				this.queryEntityColumns(function() {
					this.clearEntityColumnMapping();
					this.updateMappingSourceSchemaColumns(element, callback, scope);
				}, this);
			},

			/**
			 * Saves EntityColumnMappings parameter value.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			saveEntityColumnMappings: function(element) {
				var recordColumnValuesParameterName = this.getEntityColumnMappingsParameterName();
				var parameter = element.getParameterByName(recordColumnValuesParameterName);
				var values = this.getEntityColumnMappingsMetaValue();
				parameter.setLocalizableParameterValues(values);
			},

			/**
			 * Destroys the mixin.
			 */
			destroyEntityColumnMappings: function() {
				this.set("EntityColumns", null);
				this.set("EntityColumnMappingsViewConfig", null);
				var controlList = this.get("EntityColumnMappingsControls");
				if (controlList) {
					controlList.each(function(control) {
						control.destroy();
					});
					controlList.destroy();
				}
			}

			//endregion

		});
	}
);



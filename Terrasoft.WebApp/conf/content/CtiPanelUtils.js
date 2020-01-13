Terrasoft.configuration.Structures["CtiPanelUtils"] = {innerHierarchyStack: ["CtiPanelUtils"]};
define("CtiPanelUtils", [],
	function() {

		/**
		 * @class Terrasoft.configuration.mixins.CtiPanelUtils
		 * ###### ###### ########### ############ ####### Cti ######.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.CtiPanelUtils", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.CtiPanelUtils",

			//region Properties: Public

			/**
			 * ######## ##### ###### ################### ########.
			 * @type {String}
			 */
			identifiedSubscriberPanelSchema: "IdentifiedSubscriberItem",

			/**
			 * ######## ##### ###### ####### #######.
			 * @type {String}
			 */
			communicationHistoryPanelSchema: "CommunicationHistoryItem",

			/**
			 * ######## ##### ###### ########### ###### ########.
			 * @type {String}
			 */
			searchResultPanelSchema: "SubscriberSearchResultItem",

			/**
			 * ######## ##### ###### ######## ##### ########.
			 * @type {String}
			 */
			communicationPanelSchema: "SubscriberCommunicationItem",

			/**
			 * ######## ########, ### ######## ##### ###### ############# ###### ################### ########.
			 * @type {String}
			 */
			identifiedSubscriberPanelViewModelClass: "IdentifiedSubscriberPanelViewModelClass",

			/**
			 * ######## ########, ### ######## ##### ###### ############# ###### ####### ######.
			 * @type {String}
			 */
			communicationHistoryPanelViewModelClass: "CommunicationHistoryPanelViewModelClass",

			/**
			 * ######## ########, ### ######## ##### ###### ############# ###### ########### ###### ########.
			 * @type {String}
			 */
			searchResultPanelViewModelClass: "SearchResultPanelViewModelClass",

			/**
			 * ######## ########, ### ######## ##### ###### ############# ###### ######## ##### ########.
			 * @type {String}
			 */
			communicationPanelViewModelClass: "CommunicationPanelViewModelClass",

			/**
			 * ######## ########, ### ##### ######### ############# ###### ###### ################### ########.
			 * @type {String}
			 */
			identifiedSubscriberPanelView: "IdentifiedSubscriberPanelView",

			/**
			 * ######## ########, ### ##### ######### ############# ###### ###### ####### ######.
			 * @type {String}
			 */
			communicationHistoryPanelView: "CommunicationHistoryPanelView",

			/**
			 * ######## ########, ### ##### ######### ############# ###### ###### ########### ###### ########.
			 * @type {String}
			 */
			searchResultPanelView: "SearchResultPanelView",

			/**
			 * ######## ########, ### ##### ######### ############# ###### ###### ######## ##### ########.
			 * @type {String}
			 */
			communicationPanelView: "CommunicationPanelView",

			/**
			 * Postfix for lookup columns list column.
			 * @private
			 * @type {String}
			 */
			lookupColumnListSuffix: "List",

			/**
			 * History item main container name.
			 * @type {String}
			 */
			historyContainerName: "CommunicationHistoryItemContainer",

			/**
			 * History item call relations container name.
			 * @type {String}
			 */
			callRelationsContainerMarkerValue: "CallConnections",

			//endregion

			//region Methods: Private

			/**
			 * ####### ###### ###### ############# ######.
			 * @private
			 * @param {Object} panelConfig ############ ######.
			 * @param {Object} viewModelClassPropertyName ######## ########, ### ######## ##### ###### #############.
			 * @return {Object} ###### ###### ############# ######.
			 */
			createPanelViewModel: function(panelConfig, viewModelClassPropertyName) {
				var panelViewModelClass = Terrasoft.deepClone(this.get(viewModelClassPropertyName));
				var viewModel = this.Ext.create(panelViewModelClass, {
					Ext: this.Ext,
					sandbox: this.sandbox,
					Terrasoft: this.Terrasoft,
					values: panelConfig
				});
				this.setLookupListColumnsValue(viewModel);
				return viewModel;
			},

			/**
			 * ####### ############ ###### ############# #######.
			 * @private
			 * @param {String} viewModelClassPropertyName ######## ########, ### ######## ##### ###### #############.
			 * @param {String} viewPropertyName ######## ########, ### ##### ######### ############# ######.
			 * @param {Object} schema ##### ###### ################### ########.
			 * @param {Object} hierarchy ######## ##### ###### ################### ########.
			 * @param {Function} callback ####### ######### ######.
			 */
			generatePanelViewModel: function(viewModelClassPropertyName, viewPropertyName, schema, hierarchy, callback) {
				var viewModelGenerator = Ext.create("Terrasoft.ViewModelGenerator");
				var generatorConfig = {
					hierarchy: hierarchy
				};
				var viewModelGenerateCallBack = function(viewModelClass) {
					this.set(viewModelClassPropertyName, viewModelClass);
					var viewConfig = {
						schema: schema,
						viewModelClass: viewModelClass
					};
					var viewGenerator = Ext.create("Terrasoft.ViewGenerator");
					var viewGeneratorCallback = function(view) {
						this.set(viewPropertyName, view);
						callback();
					}.bind(this);
					viewGenerator.generate(viewConfig, viewGeneratorCallback, this);
				}.bind(this);
				viewModelGenerator.generate(generatorConfig, viewModelGenerateCallBack);
			},

			/**
			 * ####### ############ ###### # ############# #######.
			 * @private
			 * @param {Object} config ######### ###### ######.
			 * @param {String} config.schemaName ######## #####.
			 * @param {String} config.profileKey #### #######.
			 * @param {String} config.viewModelClassPropertyName ######## ########, ### ######## ##### ######
			 * #############.
			 * @param {String} config.viewPropertyName ######## ########, ### ##### ######### ############# ######.
			 * @param {Object} [config.customAttributes] ############## ######## ######.
			 * @param {Function} callback ####### ######### ######.
			 */
			generatePanelItemConfig: function(config, callback) {
				var schemaName = config.schemaName;
				var profileKey = config.profileKey;
				var viewModelClassPropertyName = config.viewModelClassPropertyName;
				var viewPropertyName = config.viewPropertyName;
				var customAttributes = config.customAttributes;
				var schemaBuilder = Ext.create("Terrasoft.SchemaBuilder");
				var requireAllSchemaHierarchyCallBack = function(hierarchy) {
					var schema = hierarchy[hierarchy.length - 1];
					schemaBuilder.generateViewConfig(schema, hierarchy);
					this.generatePanelViewModel(viewModelClassPropertyName, viewPropertyName, schema,
						hierarchy, callback);
				}.bind(this);
				var generatorConfig = {
					schemaName: schemaName,
					profileKey: profileKey,
					customAttributes: customAttributes
				};
				schemaBuilder.requireAllSchemaHierarchy(generatorConfig, requireAllSchemaHierarchyCallBack, this);
			},

			/**
			 * ####### ############ ###### # ############# ###### ################### ########.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 */
			generateIdentifiedSubscriberPanelItemConfig: function(callback) {
				this.generatePanelItemConfig({
					schemaName: this.identifiedSubscriberPanelSchema,
					profileKey: this.identifiedSubscriberPanelSchema,
					viewModelClassPropertyName: this.identifiedSubscriberPanelViewModelClass,
					viewPropertyName: this.identifiedSubscriberPanelView
				}, callback);
			},

			/**
			 * ####### ############ ###### # ############# ###### ####### #######.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 */
			generateCommunicationHistoryItemPanelItemConfig: function(callback) {
				this.generatePanelItemConfig({
					schemaName: this.communicationHistoryPanelSchema,
					profileKey: this.communicationHistoryPanelSchema,
					viewModelClassPropertyName: this.communicationHistoryPanelViewModelClass,
					viewPropertyName: this.communicationHistoryPanelView,
					customAttributes: this.getCallRelationsSchemaAttributes()
				}, function() {
					this.addCallRelationColumnsViewConfig(callback);
				}.bind(this));
			},

			/**
			 * ####### ############ ###### # ############# ###### ########### ###### ########.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 */
			generateSearchResultPanelItemConfig: function(callback) {
				this.generatePanelItemConfig({
					schemaName: this.searchResultPanelSchema,
					profileKey: this.searchResultPanelSchema,
					viewModelClassPropertyName: this.searchResultPanelViewModelClass,
					viewPropertyName: this.searchResultPanelView
				}, callback);
			},

			/**
			 * ####### ############ ###### # ############# ###### ######## ##### ########.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 */
			generateCommunicationPanelItemConfig: function(callback) {
				this.generatePanelItemConfig({
					schemaName: this.communicationPanelSchema,
					profileKey: this.communicationPanelSchema,
					viewModelClassPropertyName: this.communicationPanelViewModelClass,
					viewPropertyName: this.communicationPanelView
				}, callback);
			},

			/**
			 * ###### ############ ######## ######### ####### ################## #########.
			 * @private
			 * @param {Object} item ####### ######### ####### ################## #########.
			 */
			getIdentifiedSubscriberPanelViewConfig: function(item) {
				item.config = Terrasoft.deepClone(this.get(this.identifiedSubscriberPanelView));
			},

			/**
			 * ###### ############ ######## ######### ####### ########### ###### ########.
			 * @private
			 * @param {Object} item ####### ######### ####### ########### ###### ########.
			 */
			getSearchResultPanelViewConfig: function(item) {
				item.config = Terrasoft.deepClone(this.get(this.searchResultPanelView)[0]);
			},

			/**
			 * ###### ############ ######## ######### ####### #######.
			 * @private
			 * @param {Object} item ####### ######### ####### ####### ############### ######.
			 */
			getCommunicationHistoryPanelViewConfig: function(item) {
				item.config = Terrasoft.deepClone(this.get(this.communicationHistoryPanelView));
			},

			/**
			 * Sets new value for each lookup list columns. It's necessary because default value, that sets in view
			 * model generator, is the same object for each generated view model.
			 * @private
			 * @param {Object} viewModel View model of the panel.
			 */
			setLookupListColumnsValue: function(viewModel) {
				Terrasoft.each(viewModel.columns, function(column, columnName) {
					var listColumnName = columnName + this.lookupColumnListSuffix;
					if (column.dataValueType === Terrasoft.DataValueType.LOOKUP &&
							!Ext.isEmpty(viewModel.columns[listColumnName])) {
						viewModel.set(listColumnName, new Terrasoft.Collection());
					}
				}.bind(this));
			},

			/**
			 * Adds call relation columns view config.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Array|*} [callback.viewConfigItems] View configuration items.
			 */
			addCallRelationColumnsViewConfig: function(callback) {
				var viewConfigItems = this.get(this.communicationHistoryPanelView);
				if (this.Ext.isEmpty(viewConfigItems)) {
					callback();
					return;
				}
				var filterObject = {id: this.historyContainerName};
				var historyItemContainer = Terrasoft.findItem(viewConfigItems, filterObject);
				if (!Ext.isEmpty(historyItemContainer) && !Ext.isEmpty(historyItemContainer.item)) {
					filterObject = {markerValue: this.callRelationsContainerMarkerValue};
					var connectionsContainer = Terrasoft.findItem(historyItemContainer.item.items, filterObject);
					if (!Ext.isEmpty(connectionsContainer) && !Ext.isEmpty(connectionsContainer.item)) {
						callback(connectionsContainer.item.items, connectionsContainer.parent);
						return;
					}
				}
				callback();
			},

			/**
			 * Returns schema call relations attributes.
			 * @private
			 * @return {Object}
			 */
			getCallRelationsSchemaAttributes: function() {
				var attributes = {};
				var callRelationColumns = this.get("EntityConnectionColumnList");
				var entitySchema = this.get("EntityConnectionSchema");
				if (!Ext.isEmpty(callRelationColumns) && !Ext.isEmpty(entitySchema)) {
					this.Terrasoft.each(callRelationColumns, function(columnName) {
						var schemaColumn = entitySchema.getColumnByName(columnName);
						attributes[columnName] = {
							dataValueType: Terrasoft.DataValueType.LOOKUP,
							type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							referenceSchemaName: schemaColumn.referenceSchemaName,
							caption: schemaColumn.caption
						};
					}, this);
				}
				return attributes;
			}

			//endregion
		});
	});



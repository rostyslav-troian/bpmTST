Terrasoft.configuration.Structures["DetailRuleColumnsMixin"] = {innerHierarchyStack: ["DetailRuleColumnsMixin"]};
/**
 * @class Terrasoft.configuration.DetailRuleColumnsMixin
 * Mixin that configures the filling of parts columns for deduplication rules.
 */
define("DetailRuleColumnsMixin", ["ConfigurationConstants"], function(ConfigurationConstants) {
	Ext.define("Terrasoft.configuration.DetailRuleColumnsMixin", {
		alternateClassName: "Terrasoft.DetailRuleColumnsMixin",
		extend: "Terrasoft.BaseObject",

		//region Methods: Public

		/**
		 * Initialize mixin data.
		 * @return {Promise}
		 */
		init: function() {
			return this.fetchCommunications()
				.then(function() {
					this.requireDetailEntities();
				}.bind(this));
		},

		/**
		 * Gets details rule settings columns.
		 * @param {String} rootEntitySchemaName Name of the root entity schema.
		 * @return {DetailRuleConfigColumns[]} Detail rule settings columns.
		 */
		getDetailsRuleColumns: function(rootEntitySchemaName) {
			const detailsRuleColumnsConfig = this.getDetailsRuleConfig();
			const columnsConfig = Ext.Array.filter(detailsRuleColumnsConfig, function(config) {
				return config.rootEntitySchemaName === rootEntitySchemaName;
			});
			const columnsConfigArray = Ext.Array.pluck(columnsConfig, "columns");
			let detailRuleColumns = [];
			columnsConfigArray.forEach(function(columns) {
				detailRuleColumns = detailRuleColumns.concat(columns);
			});
			return detailRuleColumns;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Load entities from details rule columns.
		 * @protected
		 * @return {Promise}
		 */
		requireDetailEntities: function() {
			const ruleColumnsConfig = this.getDetailsRuleConfig();
			const schemaNameList = Ext.Array.pluck(ruleColumnsConfig, "entitySchemaName");
			const schemaNameListUnique = Ext.Array.unique(schemaNameList);
			return this.requireEntity(schemaNameListUnique);
		},

		/**
		 * Load entity.
		 * @protected
		 * @return {Promise}
		 */
		requireEntity: function(schemaNameList) {
			return new Promise(function(resolve, reject) {
				require(schemaNameList, resolve, reject);
			});
		},

		/**
		 * Load communication type names.
		 * @protected
		 * @return {Promise}
		 */
		fetchCommunications: function() {
			return new Promise(function(resolve) {
				const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Communication"
				});
				esq.addColumn("Name");
				esq.getEntityCollection(function(result) {
					const collection = result.collection;
					this.set("Communications", collection);
					resolve();
				}, this);
			}.bind(this));
		},

		/**
		 * @typedef {Object} DetailRuleConfig
		 * @property {String} entitySchemaName Detail entity schema name.
		 * @property {String} rootEntitySchemaName Root entity schema name of the detail.
		 * @property {DetailRuleConfigColumns[]} columns Available columns of the detail.
		 */
		/**
		 * @typedef {Object} DetailRuleConfigColumns
		 * @property {String} id Unique guid id of the column.
		 * @property {String} value Copy value from id.
		 * @property {Object} displayValue Display column name.
		 * @property {Object} dataValueType Data value type of the column.
		 * @property {Object} selectedConfig Config, which will be written to the column when saving.
		 */
		/**
		 * Gets details rule configs.
		 * @protected
		 * @return {DetailRuleConfig[]}
		 */
		getDetailsRuleConfig: function() {
			const communications = this._getCommunicationRulesConfig();
			const address = this._getAddressRulesConfig();
			return Ext.Array.merge(communications, address);
		},

		/**
		 * Gets detail column caption.
		 * @protected
		 * @param {Object} columnConfig Config of the detail column.
		 * @param {String} columnConfig.schemaName Schema name of the detail.
		 * @param {String} [columnConfig.type] Communication type.
		 * @param {String} [columnConfig.columnName] Column name of the detail.
		 * @param {Array} [columnConfig.rootSchemaColumns] Schema name of the detail.
		 * @return {String|null} Caption of the detail column.
		 */
		getDetailColumnCaption: function(columnConfig) {
			if (!this.isDetailColumn(columnConfig)) {
				return null;
			}
			const schemaName = columnConfig.schemaName;
			const columnName = columnConfig.columnName;
			const type = columnConfig.type;
			if (type) {
				return this._getCommunicationColumnName(schemaName, type);
			}
			if (columnName) {
				return this._getAddressColumnName(schemaName, columnName);
			}
		},

		/**
		 * Get type of column.
		 * @protected
		 * @param {Object} columnConfig Config of the detail column.
		 * @param {Array} [columnConfig.rootSchemaColumns] Schema name of the detail.
		 * @return {Boolean} True if column is from detail.
		 */
		isDetailColumn: function(columnConfig) {
			return Boolean(columnConfig.rootSchemaColumns);
		},

		/**
		 * Get type of column.
		 * @protected
		 * @param {Object} columnConfig Config of the detail column.
		 * @param {String} columnConfig.schemaName Schema name of the detail.
		 * @param {String} [columnConfig.type] Communication type.
		 * @param {String} [columnConfig.columnName] Column name of the detail.
		 * @param {Array} [columnConfig.rootSchemaColumns] Schema name of the detail.
		 * @param {Array} sourceRules Rule columns source.
		 * @return {Boolean} True if detail column exist in rules.
		 */
		hasDetailColumn: function(columnConfig, sourceRules) {
			if (!this.isDetailColumn(columnConfig)) {
				return false;
			}
			const schemaName = columnConfig.schemaName;
			const columnName = columnConfig.columnName;
			const rootSchemaColumns = columnConfig.rootSchemaColumns;
			const type = columnConfig.type;
			const hasColumn = Ext.Array.findBy(sourceRules, function(sourceColumnConfig) {
				return sourceColumnConfig.schemaName === schemaName
					&& sourceColumnConfig.columnName === columnName
					&& sourceColumnConfig.type === type
					&& Ext.Array.equals(rootSchemaColumns, sourceColumnConfig.rootSchemaColumns);
			});
			return Boolean(hasColumn);
		},

		//endregion

		//region Methods: Private

		_getCommunicationRulesConfig: function() {
			const columns = [
				{
					communicationType: ConfigurationConstants.Communication.Email,
					columnName: "Email"
				},
				{
					communicationType: ConfigurationConstants.Communication.Web,
					columnName: "Web"
				},
				{
					communicationType: ConfigurationConstants.Communication.Phone,
					columnName: "Phone"
				}
			];
			const accountCommunications = this._getCommunicationRuleConfig({
				entitySchemaName: "AccountCommunication",
				rootEntitySchemaName: "Account",
				columns: Terrasoft.deepClone(columns)
			});
			const contactCommunications = this._getCommunicationRuleConfig({
				entitySchemaName: "ContactCommunication",
				rootEntitySchemaName: "Contact",
				columns: Terrasoft.deepClone(columns)
			});
			return [accountCommunications, contactCommunications];
		},

		_getAddressRulesConfig: function() {
			const columns = [
				{
					columnName: "City"
				},
				{
					columnName: "Country"
				}
			];
			const accountAddress = this._getAddressRuleConfig({
				entitySchemaName: "AccountAddress",
				rootEntitySchemaName: "Account",
				columns: Terrasoft.deepClone(columns)
			});
			const contactAddress = this._getAddressRuleConfig({
				entitySchemaName: "ContactAddress",
				rootEntitySchemaName: "Contact",
				columns: Terrasoft.deepClone(columns)
			});
			return [accountAddress, contactAddress];
		},

		/**
		 * @typedef {Object} CommunicationRuleColumnConfig
		 * @property {String} communicationType Guid type of the communication.
		 * @property {String} columnName Name of the column.
		 */
		/**
		 * @private
		 * @param {Object} config
		 * @param {String} config.entitySchemaName
		 * @param {String} config.rootEntitySchemaName
		 * @param {CommunicationRuleColumnConfig[]} config.columns
		 * @return {{entitySchemaName: {String}, columns: {DetailRuleConfigColumns[]}, rootEntitySchemaName: String}}
		 */
		_getCommunicationRuleConfig: function(config) {
			const columnsConfig = config.columns;
			const columns = Ext.Array.map(columnsConfig, function(columnConfig) {
				const communicationType = columnConfig.communicationType;
				return {
					id: communicationType,
					value: communicationType,
					displayValue: this._getCommunicationColumnName(config.entitySchemaName, communicationType),
					dataValueType: Terrasoft.DataValueType.TEXT,
					selectedConfig: {
						schemaName: config.entitySchemaName,
						type: communicationType,
						rootSchemaColumns: [columnConfig.columnName]
					}
				};
			}, this);
			return {
				entitySchemaName: config.entitySchemaName,
				rootEntitySchemaName: config.rootEntitySchemaName,
				columns: columns
			};
		},

		/**
		 * @typedef {Object} AddressRuleColumnConfig
		 * @property {String} columnName Name of the column.
		 */
		/**
		 * @private
		 * @param {Object} config
		 * @param {String} config.entitySchemaName
		 * @param {String} config.rootEntitySchemaName
		 * @param {AddressRuleColumnConfig[]} config.columns
		 * @return {{entitySchemaName: {String}, columns: {DetailRuleConfigColumns[]}, rootEntitySchemaName: String}}
		 */
		_getAddressRuleConfig: function(config) {
			const columnsConfig = config.columns;
			const entitySchemaName = config.entitySchemaName;
			const rootEntitySchemaName = config.rootEntitySchemaName;
			const columns = Ext.Array.map(columnsConfig, function(columnConfig) {
				const id = Terrasoft.generateGUID();
				const columnName = columnConfig.columnName;
				return {
					id: id,
					value: id,
					displayValue: this._getAddressColumnName(entitySchemaName, columnName),
					dataValueType: Terrasoft.DataValueType.TEXT,
					selectedConfig: {
						schemaName: entitySchemaName,
						columnName: columnName,
						rootSchemaColumns: [columnName]
					}
				};
			}, this);
			return {
				entitySchemaName: entitySchemaName,
				rootEntitySchemaName: rootEntitySchemaName,
				columns: columns
			};
		},

		/**
		 * @private
		 * @param {String} schemaName detail schema name.
		 * @param {String} type Id of the communication type.
		 * @return {String|null}
		 */
		_getCommunicationColumnName: function(schemaName, type) {
			const communications = this.get("Communications");
			if (!communications || !communications.collection.containsKey(type)) {
				return null;
			}
			const communication = communications.get(type);
			const columnCaption = communication.get("Name");
			const entity = Terrasoft[schemaName] || {};
			const entityCaption = entity.caption;
			return Ext.String.format("{0} - {1}", entityCaption, columnCaption);
		},

		/**
		 * @private
		 * @param {String} schemaName detail schema name.
		 * @param {String} columnName Name of the detail column.
		 */
		_getAddressColumnName: function(schemaName, columnName) {
			const entity = Terrasoft[schemaName] || {};
			const columns = entity.columns || {};
			const entityCaption = entity.caption;
			const column = columns[columnName] || {};
			const columnCaption = column.caption;
			return Ext.String.format("{0} - {1}", entityCaption, columnCaption);
		}

		//endregion
	});
	return {};
});



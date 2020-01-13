/**
 */
Ext.define("Terrasoft.Designers.ProcessSchemaDesignerLogViewModel", {
	extend: "Terrasoft.ProcessSchemaDesignerViewModel",
	alternateClassName: "Terrasoft.ProcessSchemaDesignerLogViewModel",

	/**
	 * Method name to get statistics on the process.
	 * @private
	 * @type {String}
	 */
	statisticInfoRequestName: "ProcessStatisticInfoRequest",

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesignerViewModel#init
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.columns.SysProcessLogId = {
			dataValueType: Terrasoft.DataValueType.GUID
		};
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesignerViewModel#init
	 * @override
	 */
	init: function() {
		var schema;
		Terrasoft.chain(
			function(next) {
				this.getProcessSchemaUId(next, this);
			},
			function(next, schemaUId) {
				this.set("SchemaUId", schemaUId);
				var item = Terrasoft.ProcessSchemaManager.createManagerItem({uId: schemaUId});
				item.getInstance(next, this);
			},
			function(next, instance) {
				schema = instance;
				this.getProcessStatisticInfo(next, this);
			},
			function(next, statisticInfo) {
				schema.loadStatisticInfo(statisticInfo);
				this.onSchemaLoaded(schema);
				this.onSandboxInitialized();
			},
			this
		);
	},

	/**
	 * Returns schemaUId of the process log record.
	 * @private
	 * @param {Function} callback Callback function.
	 */
	getProcessSchemaUId: function(callback) {
		var sysProcessLogId = this.get("SysProcessLogId");
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: "SysSchema"
		});
		esq.addColumn("UId");
		esq.filters.addItem(esq.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "[VwSysProcessLog:SysSchema:Id].Id", sysProcessLogId));
		esq.getEntityCollection(function(response) {
			var message;
			if (response.success) {
				var collection = response.collection;
				if (collection && collection.getCount()) {
					var schemaUId = collection.getByIndex(0).values.UId;
					callback(schemaUId);
				} else {
					var template = Terrasoft.Resources.ProcessDiagram.Messages.ProcessSchemaNotFound;
					message = Ext.String.format(template, sysProcessLogId);
					this.showErrorMessage(message);
				}
			} else {
				message = response.errorInfo.message;
				this.showErrorMessage(message);
			}
		}, this);
	},

	/**
	 * Get statistical information about the process.
	 * @private
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.statisticInfo Statistical information.
	 * @param {Object} scope The context of the callback function.
	 */
	getProcessStatisticInfo: function(callback, scope) {
		var sysProcessLogId = this.get("SysProcessLogId");
		var jsonData = Terrasoft.encode({
			SysProcessLogId: sysProcessLogId
		});
		var statisticInfo = null;
		Terrasoft.ServiceProvider.executeRequest(this.statisticInfoRequestName, jsonData, function(result) {
			if (result.success) {
				statisticInfo = result.statisticInfo;
			} else {
				var errorInfo = result.errorInfo;
				var message = Ext.String.format("{0}: {1}\n{2}", errorInfo.errorCode, errorInfo.message,
					errorInfo.stackTrace);
				this.error(message);
			}
			callback.call(scope, statisticInfo);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
	 * @override
	 */
	onSchemaLoaded: function(schema) {
		this.loadItems(schema);
		this.fireEvent("initialized", this);
	}
});

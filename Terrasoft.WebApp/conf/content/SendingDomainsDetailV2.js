Terrasoft.configuration.Structures["SendingDomainsDetailV2"] = {innerHierarchyStack: ["SendingDomainsDetailV2"], structureParent: "BaseGridDetailV2"};
define('SendingDomainsDetailV2Structure', ['SendingDomainsDetailV2Resources'], function(resources) {return {schemaUId:'fa9f615b-12a3-416e-8aec-5f1e422d258e',schemaCaption: "SendingDomainsDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'SendingDomainsDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SendingDomainsDetailV2", ["SendingDomainsDetailV2Resources", "ConfigurationGridUtilities",
		"ConfigurationGrid", "BpmonlineCloudServiceApi", "BpmonlineCloudIntegrationEnums"],
	function(resources) {
		return {
			entitySchemaName: "DomainInfo",
			messages: {
				/**
				 * @message GetSenderDomainsInfo
				 * Gets the sender domains info.
				 */
				"GetSenderDomainsInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message DomainSelected
				 * Domain selected.
				 */
				"DomainSelected": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				IsEditable: {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			mixins: {
				ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
			},
			methods: {

				/**
				 * Creates row from domain and adds it to collection.
				 * @param {Object} domainInfo The senders domain info.
				 * @param {Terrasoft.Collection} collection.
				 */
				addDomainToCollection: function(domainInfo, collection) {
					var id = this.Terrasoft.generateGUID();
					this.createNewRow(id, null, function(row) {
						this.applyDomainInfo(row, domainInfo);
						collection.add(id, row);
					});
				},

				/**
				 * Applies domain info to the row.
				 * @param {Terrasoft.BaseViewModel} row Row to be saved.
				 * @param {Object} domainInfo The senders domain info.
				 */
				applyDomainInfo: function(row, domainInfo) {
					var status = this.getIsDKIMVerified(domainInfo.Status);
					row.set("Domain", domainInfo.Domain);
					row.set("Key", domainInfo.Key);
					row.set("DKIMVerified", status);
					row.set("IsNew", false);
				},

				/**
				 * Converts domains info to the collection of the ViewModels of grid.
				 * @param {Array[]} domains.
				 * @return {Terrasoft.Collection}.
				 */
				convertDomainsInfoToCollection: function(domains) {
					var collection = this.Ext.create("Terrasoft.Collection");
					this.Terrasoft.each(domains, function(domainInfo) {
						this.addDomainToCollection(domainInfo, collection);
					}, this);
					return collection;
				},

				/**
				 * Determines that is status is active or not.
				 * @param {String} status.
				 * @return {Boolean}.
				 */
				getIsDKIMVerified: function(status) {
					return status === "active";
				},

				/**
				 * Handles the senders domain info.
				 * @param {Object} domainsInfo The senders domain info.
				 */
				onGetDomainsInfo: function(domainsInfo) {
					this.onGridDataLoaded({
						collection: this.convertDomainsInfoToCollection(domainsInfo.Domains),
						success: true
					});
				},

				/**
				 * Gets the sender domains info.
				 */
				getDomainsInfo: function() {
					var data = {
						callback: this.onGetDomainsInfo,
						scope: this
					};
					this.sandbox.publish("GetSenderDomainsInfo", data, [this.sandbox.id]);
				},

				/**
				 * Saves domain.
				 * @param {Terrasoft.BaseViewModel} row Row to be saved.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Execution context.
				 */
				saveDomain: function(row, callback, scope) {
					var domain = row.get("Domain");
					var data = {domain: domain};
					Terrasoft.BpmonlineCloudServiceApi.addSenderDomain(data, function(response) {
						var domainsInfo = response.DomainsInfo;
						var responseCode = Terrasoft.BpmonlineCloudIntegration.enums.ResponseCode;
						var isSuccess = (domainsInfo && (domainsInfo.Code === responseCode.SUCCESS)
							&& !this.Ext.isEmpty(domainsInfo.Domains));
						if (isSuccess) {
							var domains = domainsInfo.Domains;
							var domainInfo = {};
							domains.forEach(function (item) {
								if (item.Domain === domain) {
									domainInfo = item;
								}
							});
							this.onSaveDomainSuccess(row, domainInfo, callback, scope);
						} else {
							var errorCode = (domainsInfo.Code || responseCode.SERVICE_UNAVAILABLE);
							this.onSaveDomainError(errorCode, domainsInfo.Message);
						}
					}, this);
				},

				/**
				 * On "Save" success handler.
				 * @param {Terrasoft.BaseViewModel} row.
				 * @param {Object} domainInfo The senders domain info.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope Execution context.
				 */
				onSaveDomainSuccess: function(row, domainInfo, callback, scope) {
					this.applyDomainInfo(row, domainInfo);
					this.Ext.callback(callback, scope || this);
				},

				/**
				 * On "Save" error handler.
				 * @param {Number} errorCode Error code.
				 * @param {String} errorMessage Error message.
				 */
				onSaveDomainError: function(errorCode, errorMessage) {
					var message = Terrasoft.BpmonlineCloudServiceApi.getMessageByResponseCode(errorCode);
					message = this.Ext.String.format(message, errorMessage || "");
					this.showInformationDialog(message);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					this.getDomainsInfo();
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addColumnLink
				 * @overridden
				 */
				addColumnLink: Ext.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#sortColumn
				 * @overridden
				 */
				sortColumn: Ext.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#onDetailCollapsedChanged
				 * @overridden
				 */
				onDetailCollapsedChanged: Ext.emptyFn,

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#onUpdateItem
				 * @overridden
				 */
				onUpdateItem: Ext.emptyFn,

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getIsRowChanged
				 * @overridden
				 */
				getIsRowChanged: function(row) {
					return (row instanceof Terrasoft.BaseViewModel) && row.get("IsNew");
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#initCanLoadMoreData
				 * @overridden
				 */
				initCanLoadMoreData: function() {
					this.set("CanLoadMoreData", false);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getToolsVisible
				 * @overridden
				 */
				getToolsVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return true;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
				 * @overridden
				 */
				initDetailOptions: function() {
					this.set("IsDetailCollapsed", false);
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#systemColumns
				 * @overridden
				 */
				systemColumns: ["Id", "DKIMVerified"],

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getCellControlsConfig
				 * @overridden
				 */
				getCellControlsConfig: function(entitySchemaColumn) {
					var config = this.mixins.ConfigurationGridUtilities.getCellControlsConfig.apply(this, arguments);
					if (!this.Ext.Array.contains(this.systemColumns, entitySchemaColumn.name)) {
						config.enabled = {bindTo: "IsNew"};
					}
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
				 * @overridden
				 */
				saveRowChanges: function(row, callback, scope) {
					if (row && this.getIsRowChanged(row)) {
						if (row.validate()) {
							this.saveDomain(row, callback, scope);
						} else {
							var message = row.getValidationMessage();
							this.showInformationDialog(message);
						}
					} else {
						this.Ext.callback(callback, scope || this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#onActiveRowAction
				 * @overridden
				 */
				onActiveRowAction: function(tag, rowId) {
					switch (tag) {
						case "cancel":
							this.discardChanges(rowId);
							break;
						case "save":
							this.onActiveRowSave(rowId);
							break;
					}
				},

				/**
				 * Handles "selectRow" event of the DataGrid.
				 * @param {String} domainId Identifier of the selected domain.
				 * @private
				 */
				rowSelected: function(domainId) {
					var domains = this.get("Collection");
					if (domains instanceof this.Terrasoft.Collection && domains.contains(domainId)) {
						var domain = domains.get(domainId);
						this.sandbox.publish("DomainSelected", domain, [this.sandbox.id]);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"className": "Terrasoft.ConfigurationGrid",
						"generator": "ConfigurationGridGenerator.generatePartial",
						"rowDataItemMarkerColumnName": "Domain",
						"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
						"unSelectRow": {"bindTo": "unSelectRow"},
						"changeRow": {"bindTo": "changeRow"},
						"selectRow": {"bindTo": "rowSelected"},
						"onGridClick": {"bindTo": "onGridClick"},
						"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"activeRowActions": []
					}
				},
				{
					"operation": "insert",
					"name": "activeRowActionSave",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "save",
						"markerValue": "save",
						"imageConfig": {"bindTo": "Resources.Images.SaveIcon"},
						"visible": {"bindTo": "IsNew"}
					}
				},
				{
					"operation": "insert",
					"name": "activeRowActionCancel",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "cancel",
						"markerValue": "cancel",
						"imageConfig": {"bindTo": "Resources.Images.CancelIcon"},
						"visible": {"bindTo": "IsNew"}
					}
				},
				{
					"operation": "insert",
					"name": "RefreshButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "reloadGridData"},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "Resources.Strings.RefreshButtonCation"}
					}
				},
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"columnsConfig": [
							{
								"cols": 12,
								"key": [
									{
										"name": {
											"bindTo": "Domain"
										}
									}
								]
							},
							{
								"cols": 12,
								"key": [
									{
										"name": {
											"bindTo": "DKIMVerified"
										}
									}
								]
							}
						],
						"captionsConfig": [
							{
								"name": resources.localizableStrings.DomainColumnCaption,
								"cols": 12
							},
							{
								"name": resources.localizableStrings.DKIMStatusColumnCaption,
								"cols": 12
							}
						]
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});



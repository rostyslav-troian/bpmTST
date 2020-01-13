Terrasoft.configuration.Structures["DevExpressPrintReportUtilities"] = {innerHierarchyStack: ["DevExpressPrintReportUtilities"]};
define("DevExpressPrintReportUtilities", ["SysModuleReport", "SysModuleAnalyticsReport", "PrintReportUtilities"],
	function(SysModuleReport, SysModuleAnalyticsReport) {

		/**
		 * @class Terrasoft.configuration.mixins.DevExpressPrintReportUtilities
		 * Modified printing mixin for DevExpress reports.
		 */
		Ext.define("Terrasoft.configuration.mixins.DevExpressPrintReportUtilities", {
			extend: "Terrasoft.PrintReportUtilities",
			alternateClassName: "Terrasoft.DevExpressPrintReportUtilities",

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.PrintReportUtilities#getSupportedReportTypes
			 * @override
			 */
			getSupportedReportTypes: function() {
				const baseTypes = this.callParent(arguments);
				baseTypes.push(Terrasoft.ConfigurationEnums.ReportType.DevExpress);
				return baseTypes;
			},

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.PrintReportUtilities#getPrintFormConfig
			 * @override
			 */
			getPrintFormConfig: function(printForm) {
				if (printForm.get("PrintFormType") === Terrasoft.ConfigurationEnums.ReportType.DevExpress) {
					return this.getDevExpressPrintFormConfig(printForm);
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.PrintReportUtilities#getDevExpressPrintFormConfig
			 * @override
			 */
			getDevExpressPrintFormConfig: function(printForm) {
				const filters = this.getReportFilters();
				const reportParameters =
					(filters instanceof Terrasoft.FilterGroup) ? {Filters: filters.serialize()} : filters;
				return {
					serviceRequest: {
						serviceName: "ReportService",
						methodName: "CreateReport",
						data: {
							reportParameters: Ext.JSON.encode(reportParameters),
							reportSchemaUId: printForm.getReportSchemaUId(),
							entitySchemaUId: this.getEntitySchemaUId()
						},
						timeout: this.reportDownloadTimeout
					},
					callback: function(response) {
						this.downloadReport(printForm.getCaption(), response.CreateReportResult);
					}
				};
			},

			/**
			 * ########## ########## ##### ### ######### ###### #######.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery} ########## ########## ######.
			 */
			getModuleReportsESQ: function() {
				const entitySchemaName = this.getEntitySchemaName();
				const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: SysModuleAnalyticsReport
				});
				esq.addColumn("Caption");
				esq.addColumn("SysSchemaUId");
				esq.addColumn("[VwSysSchemaInWorkspace:UId:SysOptionsPageSchemaUId].Name", "OptionSchemaName");
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"ModuleSchemaName", entitySchemaName));
				const workspaceIdFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[VwSysSchemaInWorkspace:UId:SysOptionsPageSchemaUId].SysWorkspace.Id",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value);
				esq.filters.addItem(workspaceIdFilter);
				return esq;
			},

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.PrintReportUtilities#initCurrentModuleReports
			 * @override
			 */
			initCurrentModuleReports: function(callback, scope) {
				this.callParent([
					function() {
						this.initReportModuleMessageSubscription();
						this.set(this.moduleReportsCollectionName, this.Ext.create("Terrasoft.Collection"));
						const esq = this.getModuleReportsESQ();
						esq.clientESQCacheParameters = {cacheItemName: this.getESQCacheName("CurrentModuleReports")};
						esq.getEntityCollection(function(response) {
							const collection = this.get(this.moduleReportsCollectionName);
							const entities = response.collection;
							if (response.success && !entities.isEmpty()) {
								entities.each(function(entity) {
									entity.set("Click", {"bindTo": "loadReportModule"});
									entity.set("Tag", entity.get("Id"));
								}, this);
								collection.loadAll(entities);
							}
							this.setReportsButtonVisible();
							if (callback) {
								callback.call(scope || this);
							}
						}, this);
					}, this
				]);
			},

			/**
			 * ############## ######## ## ######### ###### #######.
			 * @protected
			 */
			initReportModuleMessageSubscription: function() {
				const reportModuleId = this.getReportModuleId();
				this.sandbox.subscribe("GetReportConfig", function() {
					const key = this.get("CurrentReportId");
					const grid = this.get(this.moduleReportsCollectionName);
					const activeReport = grid.get(key);
					return {
						id: activeReport.get("Id"),
						caption: activeReport.get("Caption"),
						reportId: activeReport.get("SysSchemaUId"),
						sysSchemaName: activeReport.get("OptionSchemaName"),
						sectionUId: this.entitySchema.uId,
						activeRow: this.get("ActiveRow"),
						selectedRows: this.get("SelectedRows"),
						ReportType: Terrasoft.ConfigurationEnums.ReportType.DevExpress,
						parentModuleSandboxId: this.sandbox.id
					};
				}, this, [reportModuleId, "GetReportConfigKey"]);
			},

			/**
			 * ######### ###### #######.
			 * @protected
			 * @param {String} key ############# ######.
			 */
			loadReportModule: function(key) {
				this.set("CurrentReportId", key);
				const historyState = this.sandbox.publish("GetHistoryState");
				const moduleState = Ext.apply({hash: historyState.hash.historyState}, {});
				this.sandbox.publish("PushHistoryState", moduleState);
				const reportModuleId = this.getReportModuleId();
				this.sandbox.loadModule("ReportModule", {
					id: reportModuleId,
					renderTo: this.renderTo,
					keepAlive: true
				});
			}

		});

		return Terrasoft.DevExpressPrintReportUtilities;
	});



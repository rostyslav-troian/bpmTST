Terrasoft.configuration.Structures["PrintReportUtilities"] = {innerHierarchyStack: ["PrintReportUtilities"]};
define("PrintReportUtilities", ["LocalizationUtilities", "SysModuleReport", "SysModuleAnalyticsReport",
		"MenuUtilities", "DesktopPopupNotification", "PrintReportUtilitiesResources",
		"ConfigurationEnumsV2", "ReportStorage"],
	function(LocalizationUtilities, SysModuleReport, SysModuleAnalyticsReport,
			 MenuUtilities, DesktopPopupNotification, resources) {

	Terrasoft.ConfigurationEnums.ReportType = {
		"DevExpress": "DevExpress",
		"Word": "MS Word"
	};

	/**
	 * @class Terrasoft.configuration.BasePrintFormViewModel
	 * ##### ######## #####.
	 */
	Ext.define("Terrasoft.configuration.BasePrintFormViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.BasePrintFormViewModel",

		/**
		 * #########, ######## ## ### ###### DevExpress-#.
		 * @protected
		 * @return {Boolean} ########## true, #### ### ######  - DevExpress.
		 */
		isDevExpressReport: function() {
			return this.get("PrintFormType") === Terrasoft.ConfigurationEnums.ReportType.DevExpress;
		},

		/**
		 * ########## ######### ###### # ############ #######.
		 * @protected
		 * @return {String} ######### ######.
		 */
		getCaption: function() {
			var baseCaption = this.get("Caption") || this.get("NonLocalizedCaption");
			return baseCaption + ((this.get("ConvertInPDF") || this.isDevExpressReport()) ? ".pdf" : ".docx");
		},

		/**
		 * ########## UId ##### ######.
		 * @protected
		 * @return {String} UId ##### ######.
		 */
		getReportSchemaUId: function() {
			return this.isDevExpressReport() ? this.get("SysReportSchemaUId") : "";
		},

		/**
		 * ########## ############# ######.
		 * @protected
		 * @return {String} ############# ######.
		 */
		getTemplateId: function() {
			return this.isDevExpressReport() ? "" : this.get("Id");
		}
	});

	/**
	 * @class Terrasoft.configuration.mixins.PrintReportUtilities
	 * ##### - ######, ########### ###### # ######## # ######### #######.
	 */
	Ext.define("Terrasoft.configuration.mixins.PrintReportUtilities", {
		alternateClassName: "Terrasoft.PrintReportUtilities",

		/**
		 * ### ######### #######.
		 */
		moduleReportsCollectionName: "ReportGridData",

		/**
		 * ### ######### ######## #### ########.
		 */
		moduleCardPrintFormsCollectionName: "CardPrintMenuItems",

		/**
		 * ### ######### ######## #### #######.
		 */
		moduleSectionPrintFormsCollectionName: "SectionPrintMenuItems",

		/**
		 * Report download timeout.
		 * @type {Number}
		 */
		reportDownloadTimeout: 20 * 60 * 1000,
		
		/**
		 * Async report download timeout.
		 * @type {Number}
		 */
		asyncReportDownloadTimeout: 30 * 1000,

		/**
		 * Cache prefix for print forms select query.
		 * @type {String}
		 */
		printFormsCachePrefix: "PrintForms",

		/**
		 * Cache prefix for custom print forms select query.
		 * @type {String}
		 */
		customPrintFormsCachePrefix: "CustomPrintForms",
		
		//region Private
		
		/**
		 * @private
		 */
		_showPopup: function(body) {
			this.hideBodyMask();
			const popupConfig = DesktopPopupNotification.createConfig();
			DesktopPopupNotification.show(Ext.apply(popupConfig, {
				title: resources.localizableStrings.AsynGenerationPopupTitle,
				body: body,
				icon: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.AsynGenerationPopupIcon)
			}));
		},
		
		/**
		 * @private
		 */
		_asyncGenerationCallback: function(response) {
			const result = response && response.CreateReportsResult || {};
			if (!result.success) {
				this._showPopup(resources.localizableStrings.AsynGenerationErrorPopupBody);
				return;
			}
			Terrasoft.each(result.ReportGenerationTaskIds, function(taskId) {
				clearTimeout(Terrasoft.ReportStorage.getReportTimeoutId(taskId));
				this.showBodyMask({timeout: 0});
				const timeoutId = setTimeout(function() {
					this._showPopup(resources.localizableStrings.AsynGenerationPopupBody);
				}.bind(this), this.asyncReportDownloadTimeout);
				Terrasoft.ReportStorage.setReportTimeoutId(timeoutId, taskId);
			}, this);
		},
		
		//endregion
		
		/**
		 * ########## ######## ##### ###### # ######### ### ####### ######### ###### #######.
		 * @protected
		 * @param {String} cachePrefix ####### #####.
		 * @return {String}.
		 */
		getESQCacheName: function(cachePrefix) {
			var entitySchemaName = this.getEntitySchemaName();
			var cacheItemName = Ext.String.format("{0}_{1}", cachePrefix, entitySchemaName);
			return cacheItemName;
		},

		/**
		 * ########## ######## ####### #### ######.
		 * @protected
		 * @param {String} reportId ############# ######.
		 * @return {String} ########## ######## ####### #### ######.
		 */
		getReportTypeColumnValue: function(reportId) {
			var reportCollection = this.get(this.moduleCardPrintFormsCollectionName);
			var reportTypeColumnValue;
			var currentMenuItem = reportCollection.find(reportId);
			if (currentMenuItem) {
				reportTypeColumnValue = currentMenuItem.get("TypeColumnValue");
			}
			return reportTypeColumnValue;
		},

		/**
		 * ########## ############# ###### ######.
		 * @protected
		 * @return {String} ############# ###### ######.
		 */
		getReportModuleId: function() {
			return this.sandbox.id + "_ReportModule";
		},

		/**
		 * ########## ############# ###### ######.
		 * @protected
		 * @return {String} ############# ###### ######.
		 */
		getEntitySchemaName: function() {
			var processData = this.get("ProcessData");
			return (this.entitySchema)
				? this.entitySchemaName
				: (processData && processData.entitySchemaName);
		},

		/**
		 * ########## ########## ###### ### ######### ######## ####.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} ########## ########## ######.
		 */
		getModulePrintFormsESQ: function() {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchema: SysModuleReport,
				isDistinct: true,
				rowViewModelClassName: "Terrasoft.BasePrintFormViewModel"
			});
			esq.addColumn(SysModuleReport.primaryColumnName);
			const captionColumn = esq.addColumn("Caption");
			captionColumn.orderPosition = 0;
			captionColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			esq.addColumn("Caption", "NonLocalizedCaption");
			esq.addColumn("Type.Name", "PrintFormType");
			esq.addColumn("SysReportSchemaUId");
			esq.addColumn("ConvertInPDF");
			esq.addColumn("TypeColumnValue");
			esq.addColumn("ShowInCard");
			esq.addColumn("ShowInSection");
			const entitySchemaName = this.getEntitySchemaName();
			esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"SysModule.SysModuleEntity.[SysSchema:UId:SysEntitySchemaUId].Name", entitySchemaName));
			const supportedTypes = this.mixins.PrintReportUtilities.getSupportedReportTypes.call(this);
			esq.filters.add(Terrasoft.createColumnInFilterWithParameters("Type.Name", supportedTypes));
			return esq;
		},

		/**
		 * Returns supported report types.
		 * @protected
		 * @return {string[]} Report filters.
		 */
		getSupportedReportTypes: function() {
			return [Terrasoft.ConfigurationEnums.ReportType.Word];
		},

		/**
		 * ######### ######### ######### #### ######.
		 * @param {String} collectionName ######## #########.
		 * @return {Terrasoft.BaseViewModelCollection} #########, ####### # #########.
		 */
		preparePrintButtonCollection: function(collectionName) {
			var printMenuItems = this.get(collectionName);
			if (this.Ext.isEmpty(printMenuItems)) {
				printMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
			}
			printMenuItems.clear();
			return printMenuItems;
		},

		/**
		 * Initialize card print forms entity schema query filters.
		 * @protected
		 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
		 */
		initCardPrintFormsEsqFilters: Terrasoft.emptyFn,

		/**
		 * Initialize card print forms collection.
		 * @protected
		 * @param {Function} callback Callback-function.
		 * @param {Terrasoft.BaseViewModel} scope Execution context.
		 */
		initCardPrintForms: function(callback, scope) {
			var reportsEsq = this.getModulePrintFormsESQ();
			this.initCardPrintFormsEsqFilters(reportsEsq);
			var cachePrefix = this.initCardPrintFormsEsqFilters === this.Terrasoft.emptyFn
				? this.printFormsCachePrefix : this.customPrintFormsCachePrefix;
			reportsEsq.clientESQCacheParameters = {cacheItemName: this.getESQCacheName(cachePrefix)};
			reportsEsq.getEntityCollection(function(result) {
				if (this.destroyed) {
					return;
				}
				if (result.success && !result.collection.isEmpty()) {
					var resultCollection = result.collection;
					var printFormsMenuCollection = resultCollection.filterByFn(function(item) {
						return item.get("ShowInCard") === true;
					}, this);
					this.preparePrintFormsMenuCollection(printFormsMenuCollection);
					printFormsMenuCollection.each(function(item) {
						item.set("Click", {bindTo: "generateCardPrintForm"});
					}, this);
					var printMenuItems = this.preparePrintButtonCollection(this.moduleCardPrintFormsCollectionName);
					printMenuItems.loadAll(printFormsMenuCollection);
					this.set(this.moduleCardPrintFormsCollectionName, printMenuItems);
					this.getCardPrintButtonVisible();
				}
				Ext.callback(callback, scope || this);
			}, this);
		},

		/**
		 * Initializes a collection of possible printed forms for a section.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Terrasoft.BaseViewModel} scope Callback function call context.
		 */
		initSectionPrintForms: function(callback, scope) {
			var reportsEsq = this.getModulePrintFormsESQ();
			reportsEsq.clientESQCacheParameters = {cacheItemName: this.getESQCacheName(this.printFormsCachePrefix)};
			reportsEsq.getEntityCollection(function(result) {
				if (result.success && !result.collection.isEmpty()) {
					var resultCollection = result.collection;
					var printFormsMenuCollection = resultCollection.filterByFn(function(item) {
						return item.get("ShowInSection") === true;
					}, this);
					this.preparePrintFormsMenuCollection(printFormsMenuCollection);
					printFormsMenuCollection.each(function(item) {
						item.set("Enabled", {bindTo: "isSectionPrintFormEnabled"});
						item.set("Click", {bindTo: "generateSectionPrintForm"});
					}, this);
					var printMenuItems = this.preparePrintButtonCollection(this.moduleSectionPrintFormsCollectionName);
					printMenuItems.loadAll(printFormsMenuCollection);
					this.set(this.moduleSectionPrintFormsCollectionName, printMenuItems);
					this.getSectionPrintButtonVisible();
				}
				Ext.callback(callback, scope || this);
			}, this);
		},

		/**
		 * ############## ######### ######### ####### ### ########## #######.
		 * @protected
		 */
		initCurrentModuleReports: function(callback, scope) {
			if (callback) {
				callback.call(scope || this);
			}
		},

		/**
		 * Returns accessibility for editing of report in section.
		 * @private
		 * @param {String} reportId Report id.
		 * @return {Boolean} Accessibility for editing of report in section.
		 */
		isSectionPrintFormEnabled: function(reportId) {
			if (!this.isAnySelected()) {
				return false;
			}
			if (this.isSingleSelected() && !this.get("SelectAllMode")) {
				return true;
			} else {
				var reportCollection = this.get(this.moduleSectionPrintFormsCollectionName);
				var report = reportCollection.get(reportId);
				return (report && report.isDevExpressReport()) || !this.get("SelectAllMode");
			}
		},

		/**
		 * ############ ######### #### ######## ####.
		 * @protected
		 * @param {Terrasoft.Collection} printForms ######### ######## ####.
		 */
		preparePrintFormsMenuCollection: function(printForms) {
			printForms.eachKey(function(key, item) {
				if (!item.get("Caption")) {
					item.set("Caption", item.get("NonLocalizedCaption"));
				}
				item.set("Tag", key);
				if (item.get("TypeColumnValue")) {
					item.set("Visible", {bindTo: "getPrintMenuItemVisible"});
				}
			}, this);
		},

		/**
		 * Returns value of visibility of button "Print" in section.
		 * @protected
		 * @return {Boolean} Visibility of button.
		 */
		getSectionPrintButtonVisible: function() {
			var sectionPrintFormsCollection = this.get(this.moduleSectionPrintFormsCollectionName);
			var result = MenuUtilities.getMenuVisible(sectionPrintFormsCollection, this);
			this.set("IsSectionPrintButtonVisible", result);
			return result;
		},

		/**
		 * Returns value of visibility of button "Print" in card.
		 * @protected
		 * @return {Boolean} Visibility of button.
		 */
		getCardPrintButtonVisible: function() {
			var cardPrintFormsCollection = this.get(this.moduleCardPrintFormsCollectionName);
			var result = MenuUtilities.getMenuVisible(cardPrintFormsCollection, this);
			this.set("IsCardPrintButtonVisible", result);
			return result;
		},

		/**
		 * Returns value of visibility of button "Print" in row.
		 * @protected
		 * @return {Boolean} Visibility of button.
		 */
		getRowPrintButtonVisible: function() {
			var rowPrintFormsCollection = this.get(this.moduleCardPrintFormsCollectionName);
			var isVisible = rowPrintFormsCollection ? rowPrintFormsCollection.getCount() === 1 : false;
			return isVisible;
		},

		/**
		 * Returns visibility for "Report" button in analitics.
		 * @protected
		 * @obsolete
		 * @return {Boolean} Button visibility.
		 */
		getReportsButtonVisible: function() {
			var message = this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
					"getReportsButtonVisible", "setReportsButtonVisible");
			if (this.name) {
				message = this.name + ": " + message;
			}
			this.log(message, this.Terrasoft.LogMessageType.WARNING);
			this.setReportsButtonVisible();
			return this.get("IsAnalyticsPrintButtonVisible");
		},

		/**
		 * Sets "Report" button visibility.
		 * @protected
		 */
		setReportsButtonVisible: function() {
			var moduleReports = this.get(this.moduleReportsCollectionName);
			var visible = MenuUtilities.getMenuVisible(moduleReports, this);
			this.set("IsAnalyticsPrintButtonVisible", visible);
		},

		/**
		 * Receives a report corresponding to the selected record according to its type.
		 * @protected
		 */
		printRecord: function() {
			var printMenuItems = this.get(this.moduleCardPrintFormsCollectionName);
			if (this.isNotEmpty(printMenuItems) && printMenuItems.getCount() > 0) {
				var reportInfo;
				var typeColumnName = this.get("TypeColumnName");
				if (typeColumnName) {
					var activeRow = this.getActiveRow();
					var typeColumnValue = activeRow.get(typeColumnName);
					printMenuItems.each(function(printMenuItem) {
						if (printMenuItem.get("TypeColumnValue") === typeColumnValue.value) {
							reportInfo = printMenuItem;
							return false;
						}
					}, this);
				} else {
					reportInfo = printMenuItems.getByIndex(0);
				}
				if (reportInfo) {
					this.generatePrintForm(reportInfo);
				}
			}
		},

		/**
		 * Generates print form of card.
		 * @param {String} tag Print form identifier.
		 * @protected
		 */
		generateCardPrintForm: function(tag) {
			var cardPrintFormsCollection = this.get(this.moduleCardPrintFormsCollectionName);
			var printForm = cardPrintFormsCollection.get(tag);
			this.generatePrintForm(printForm);
		},

		/**
		 * Generates print form of section.
		 * @param {String} tag Print form identifier.
		 * @protected
		 */
		generateSectionPrintForm: function(tag) {
			var cardPrintFormsCollection = this.get(this.moduleSectionPrintFormsCollectionName);
			var printForm = cardPrintFormsCollection.get(tag);
			this.generatePrintForm(printForm);
		},

		/**
		 * Returns report filters.
		 * @protected
		 * @virtual
		 */
		getReportFilters: Terrasoft.emptyFn,

		/**
		 * Returns primary column value of selected item.
		 * @protected
		 * @virtual
		 */
		getPrimaryColumnValue: Terrasoft.emptyFn,

		/**
		 * Returns id of item to print.
		 * @protected
		 * @virtual
		 * @return {String} Entity Id.
		 */
		getPrintRecordId: function() {
			return this.getPrimaryColumnValue();
		},

		/**
		 * Returns entity schema UId.
		 * @protected
		 * @return {String} Entity UId.
		 */
		getEntitySchemaUId: function() {
			return this.entitySchema.uId;
		},

		/**
		 * Generates report.
		 * @protected
		 * @param {Terrasoft.BasePrintFormViewModel} printForm Print form.
		 */
		generatePrintForm: function(printForm) {
			const config = this.mixins.PrintReportUtilities.getPrintFormConfig.call(this, printForm);
			if (!config) {
				const message = "Unsupported report type: " + printForm.get("PrintFormType");
				this.log(message, Terrasoft.LogMessageType.ERROR);
				return;
			}
			this.showBodyMask();
			this.callService(config.serviceRequest, function(response) {
				this.hideBodyMask();
				config.callback.call(this, response);
			}, this);
		},

		/**
		 * Returns config of the print form.
		 * @protected
		 * @param printForm Print form to print.
		 * @return {Object} Config for print form request.
		 */
		getPrintFormConfig: function(printForm) {
			if (printForm.get("PrintFormType") === Terrasoft.ConfigurationEnums.ReportType.Word) {
				return this.getMsWordPrintFormConfig(printForm);
			}
			return null;
		},

		/**
		 * Returns config for MsWord print form request.
		 * @protected
		 * @param {Terrasoft.BasePrintFormViewModel} printForm Print form.
		 * @return {Object} Config for MsWord print form request
		 */
		getMsWordPrintFormConfig: function(printForm) {
			const recordIds = !this.get("MultiSelect") ? [this.getPrintRecordId()] : this.getSelectedItems();
			const convertInPdf = printForm.get("ConvertInPDF");
			const useNewPdfGeneration = convertInPdf && Terrasoft.Features.getIsEnabled("AsyncPdfReportGeneration");
			return {
				serviceRequest: {
					serviceName: useNewPdfGeneration ? "PdfAsyncReportGenerationController" : "ReportService",
					methodName: useNewPdfGeneration ? "CreateReports" : "CreateReportsList",
					data: {
						templateId: printForm.getTemplateId(),
						recordIds: recordIds,
						convertInPDF: convertInPdf
					},
					timeout: this.reportDownloadTimeout
				},
				callback: useNewPdfGeneration ? this._asyncGenerationCallback : function(response) {
					Terrasoft.each(response.CreateReportsListResult, function(key) {
						this.downloadReport(printForm.getCaption(), key);
					}, this);
				}
			};
		},

		/**
		 * Downloads the report.
		 * @protected
		 * @param {String} caption Caption.
		 * @param {String} key Report key.
		 */
		downloadReport: function(caption, key) {
			var report = document.createElement("a");
			report.href = "../rest/ReportService/GetReportFile/" + key;
			report.download = caption;
			if (this.Ext.isIE) {
				report.target = "_blank";
			}
			document.body.appendChild(report);
			report.click();
			document.body.removeChild(report);
		}

	});

	return Terrasoft.PrintReportUtilities;
});



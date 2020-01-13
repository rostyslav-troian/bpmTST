Terrasoft.configuration.Structures["ReportModule"] = {innerHierarchyStack: ["ReportModule"]};
define("ReportModule", ["ReportModuleResources", "DevExpressPrintReportUtilities"],
	function(resources) {

		/**
		 * @class Terrasoft.configuration.ReportModuleViewModel
		 * #####, ####### ############ ### ######## ###### ############# ###### #######.
		 */
		Ext.define("Terrasoft.configuration.ReportModuleViewModel", {
			extend: "Terrasoft.BaseSchemaViewModel",
			alternateClassName: "Terrasoft.ReportModuleViewModel",

			Ext: null,

			sandbox: null,

			Terrasoft: null,

			/**
			 * ######-####### (#######), ########### ################ ####### ######.
			 */
			mixins: {

				/**
				 * @class DevExpressPrintReportUtilities ########### ####### ###### ###### # ######## # ######### #######.
				 */
				PrintReportUtilities: "Terrasoft.DevExpressPrintReportUtilities"
			},

			/**
			 * ########## ######### ########## ######.
			 * @protected
			 * @return {Object} ######### ########## ######.
			 */
			getReportFilters: function() {
				var reportParameters = this.sandbox.publish("GetReportFilterCollection");
				return reportParameters;
			},

			/**
			 * ########## ######## UId ########.
			 * @protected
			 * @return {String} UId ########.
			 */
			getEntitySchemaUId: function() {
				return this.get("sectionUId");
			},


			/**
			 * ########## ######## ######### ####### ######### ######.
			 * @protected
			 */
			getPrimaryColumnValue: function() {
				return this.get("activeRow");
			},

			/**
			 * ########## ######### ######.
			 * @protected
			 */
			getSelectedItems: function() {
				return this.get("activeRow") ? [this.get("activeRow")] : this.get("selectedRows");
			},

			/**
			 * ############ ####### ## ###### ######## ######.
			 * @protected
			 */
			createReport: function() {
				var printFrom = this.Ext.create("Terrasoft.BasePrintFormViewModel", {
					values: {
						PrintFormType: this.get("ReportType"),
						Caption: this.get("caption"),
						SysReportSchemaUId: this.get("reportId")
					}
				});

				this.generatePrintForm(printFrom);
			},

			/**
			 * ############ ####### ## ###### "########".
			 * @protected
			 */
			cancel: function() {
				this.sandbox.publish("BackHistoryState");
			}
		});


		/**
		 * #######, ############ ########### ###### #######.
		 * @protected
		 */
		function createConstructor(context) {
			var Ext = context.Ext;
			var sandbox = context.sandbox;
			var Terrasoft = context.Terrasoft;
			var viewModel;

			/**
			 * ########## #############.
			 * @private
			 * @return {Terrasoft.Container} #############.
			 */
			function getView() {
				return Ext.create("Terrasoft.Container", {
					id: "report_container",
					selectors: {
						wrapEl: "#report_container"
					},
					items: [{
						className: "Terrasoft.Label",
						caption: { bindTo: "caption"},
						visible: true,
						classes: {
							labelClass: ["report-caption"]
						}
					}, {
						className: "Terrasoft.Button",
						classes: {
							wrapperClass: ["report-btn-wrapper"]
						},
						click: {
							bindTo: "createReport"
						},
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: resources.localizableStrings.CreateReportButton,
						markerValue: resources.localizableStrings.CreateReportButton
					}, {
						className: "Terrasoft.Button",
						classes: {
							wrapperClass: ["report-btn-wrapper"]
						},
						click: {
							bindTo: "cancel"
						},
						markerValue: "DiscardChangesButton",
						caption: resources.localizableStrings.CancelReportButton
					}, {
						className: "Terrasoft.Container",
						id: "report-filter-container",
						selectors: {
							wrapEl: "#report-filter-container"
						}
					}]
				});
			}

			/**
			 * ########## ###### #############.
			 * @private
			 * @return {Terrasoft.BaseViewModel} ###### #############.
			 */
			function getViewModel() {
				var reportConfig = sandbox.publish("GetReportConfig", null, [sandbox.id]);
				return Ext.create("Terrasoft.ReportModuleViewModel", {
					values: reportConfig,
					Ext: Ext,
					sandbox: sandbox,
					Terrasoft: Terrasoft
				});
			}

			var constructor = Ext.define("ReportModule", {

				/**
				 * ######### ############ - ########### ## ######.
				 */
				restored: false,

				/**
				 * ############## ########## ######### ######.
				 * @protected
				 * @virtual
				 */
				init: function() {
					if (!viewModel) {
						viewModel = getViewModel();
					} else {
						this.restored = true;
					}
				},

				/**
				 * ####### ######### ######.
				 * @param {Ext.Element} renderTo ######### ### ######### ######.
				 */
				render: function(renderTo) {
					var view = getView();
					view.bind(viewModel);
					view.render(renderTo);
					if (!this.restored) {
						var reportFilterContainer = Ext.get("report-filter-container");
						sandbox.loadModule("ReportFilterModule", {
							renderTo: reportFilterContainer
						});
						this.restored = false;
					}
				}
			});
			return constructor;
		}

		return createConstructor;

	});



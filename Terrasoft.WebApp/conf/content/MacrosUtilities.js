Terrasoft.configuration.Structures["MacrosUtilities"] = {innerHierarchyStack: ["MacrosUtilities"]};
define("MacrosUtilities", ["MacrosUtilitiesResources", "ModalBox"],
	function(resources, ModalBox) {
		/**
		 * @class Terrasoft.configuration.MacrosUtilities
		 */
		Ext.define("Terrasoft.configuration.MacrosUtilities", {
			alternateClassName: "Terrasoft.MacrosUtilities",

			/**
			 * It processes the macros.
			 * @protected
			 * @virtual
			 * @param {String} macros Macros.
			 */
			onGetMacros: Terrasoft.emptyFn,

			/**
			 * Handles selection of column for macros.
			 * @protected
			 * @virtual
			 * @param {Object} columnInfo Selected column information.
			 */
			onMacrosColumnSelected: function(columnInfo) {
				var leftExpressionColumnPath = columnInfo.leftExpressionColumnPath;
				var macros = this.formatMacrosColumn(leftExpressionColumnPath);
				this.onGetMacros(macros);
			},

			/**
			 * Formats selected column to macros format.
			 * @protected
			 * @virtual
			 * @param {String} columnName Column name.
			 * @return {String} Macros.
			 */
			formatMacrosColumn: function(columnName) {
				var macroTemplate = this.get("Resources.Strings.MacroTemplate");
				return this.Ext.String.format(macroTemplate, columnName);
			},

			/**
			 * It generates a unique identifier macro selection module.
			 * @protected
			 * @virtual
			 * @return {String} The unique identifier of the macro selection module.
			 */
			getMacrosModuleId: function() {
				return this.sandbox.id + "_MacrosModule";
			},

			/**
			 * Returns ModuleBox configuration.
			 * @protected
			 * @virtual
			 * @return {Object} ModuleBox configuration.
			 */
			getModalBoxConfig: function() {
				return {
					heightPixels: 420,
					widthPixels: 450,
					boxClasses: ["macros-page-modal-box"]
				};
			},

			/**
			 * Opens macros page.
			 * @protected
			 * @virtual
			 */
			openMacrosPage: function() {
				var config = this.getModalBoxConfig();
				var moduleId = this.getMacrosModuleId();
				var renderTo = ModalBox.show(config, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}.bind(this));
				this.sandbox.loadModule("MacrosModule", {
					id: moduleId,
					renderTo: renderTo
				});
			}
		});
	});



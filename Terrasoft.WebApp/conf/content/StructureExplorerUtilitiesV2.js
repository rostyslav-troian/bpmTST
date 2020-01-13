Terrasoft.configuration.Structures["StructureExplorerUtilitiesV2"] = {innerHierarchyStack: ["StructureExplorerUtilitiesV2"]};
define("StructureExplorerUtilitiesV2", ["terrasoft", "ModalBox"],
	function(Terrasoft, ModalBox) {

		/**
		 * Structure explorer utilities.
		 * Example:
		 *
		 *      Terrasoft.StructureExplorerUtilities.open({
		 *          handlerMethodName: "onLookupResult",
		 *          moduleConfig: config,
		 *          scope: this
		 *      });
		 *
		 */
		Ext.define("Terrasoft.configuration.StructureExplorerUtilities", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.StructureExplorerUtilities",

			singleton: true,

			/**
			 * ######### # ####### ##### ######### StructureExplorer.
			 * @private
			 * @type {Object}
			 */
			modalBoxContainer: null,

			/**
			 * ############ ######## ########## ####.
			 * @private
			 * @type {Object}
			 */
			modalBoxSize: {
				minHeight: "1",
				minWidth: "1",
				maxHeight: "100",
				maxWidth: "100"
			},

			_defaultStructureExploreModuleName: "StructureExploreModule",

			/**
			 * ########## ############# ######### # ######### ####.
			 * @protected
			 * @returns {Object}
			 */
			getFixedHeaderContainer: function() {
				return ModalBox.getFixedBox();
			},

			/**
			 * ########## ######## ######### # ######### ####.
			 * @protected
			 * @returns {Object}
			 */
			getGridContainer: function() {
				return this.modalBoxContainer;
			},

			/**
			 * ######### ####### #### # ############ # #########.
			 */
			UpdateSize: function() {
				ModalBox.updateSizeByContent();
			},

			/**
			 * ############## ######### #### ### ######## #### ######.
			 * @private
			 */
			prepareModalBox: function(onCloseHandler) {
				this.modalBoxContainer = ModalBox.show(this.modalBoxSize, onCloseHandler);
				ModalBox.setSize(568, 420);
			},

			/**
			 * ######### ######### ####.
			 */
			closeModalBox: function() {
				if (this.modalBoxContainer || ModalBox.getFixedBox()) {
					ModalBox.close();
					this.modalBoxContainer = null;
				}
			},

			/**
			 * ########## ############# ### ######.
			 * @private
			 * @param {Object} sandbox ######### ######, ########### ######## ###### #######.
			 * @return {string} ########## ############# ### ######.
			 */
			getStructureExplorerPageId: function(sandbox) {
				return sandbox.id + "_StructureExplorerModule";
			},

			/**
			 * ############ ########### ###### #########.
			 * @protected
			 * @param {Object} sandbox ######### ######.
			 */
			registerStructureExplorerModuleMessages: function(sandbox) {
				var messages = {
					"StructureExplorerInfo": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"ColumnSelected": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				};
				sandbox.registerMessages(messages);
			},

			/**
			 * Opens the window select the column.
			 * @param {Object} config Module configuration select the column.
			 * @param {String} [config.handlerMethodName] The name of the handler method to the election results.
			 * Should be contained in surrounded by "scope".
			 * @param {Function} config.handlerMethod Method is the result handler of choice.
			 * @param {Terrasoft.BaseViewModel} config.scope The environment in which the method is invoked the handler.
			 * Also stores the settings window is open, select from the directory.
			 * @param {Object} [config.sandbox] Sandbox module that calls the open directory
			 * Optional if it contains the environment.
			 * @param {Object} [config.lookupConfig] The settings object for the page select from the directory.
			 * @param {String} [config.moduleName] Structure explorer module name.
			 * @param {Object} [config.moduleConfig] Module config.
			 */
			open: function(config) {
				var scope = config.scope;
				var sandbox = config.sandbox || scope.sandbox;
				var moduleConfig = config.moduleConfig;
				var moduleName = config.moduleName || this._defaultStructureExploreModuleName;
				moduleConfig.handlerMethodName = config.handlerMethodName;
				moduleConfig.handlerMethod = config.handlerMethod;
				var structureExplorerPageId = moduleConfig.structureExplorerPageId = this.getStructureExplorerPageId(sandbox);
				scope.structureExplorerConfig = moduleConfig;
				this.registerStructureExplorerModuleMessages(sandbox);
				sandbox.subscribe("StructureExplorerInfo", function() {
					return this.structureExplorerConfig;
				}, scope, [structureExplorerPageId]);
				sandbox.subscribe("ColumnSelected", function(args) {
					var structureExplorerConfig = this.structureExplorerConfig;
					if (Ext.isFunction(this[structureExplorerConfig.handlerMethodName])) {
						this[structureExplorerConfig.handlerMethodName](args);
					}
					if (Ext.isFunction(structureExplorerConfig.handlerMethod)) {
						structureExplorerConfig.handlerMethod.call(scope, args, config.callback);
					}
					sandbox.unloadModule(structureExplorerConfig.structureExplorerPageId);
					Terrasoft.LookupUtilities.CloseModalBox();
					delete this.structureExplorerConfig;
				}, scope, [structureExplorerPageId]);
				this.prepareModalBox(function() {
					sandbox.unloadModule(structureExplorerPageId);
				}, this);
				sandbox.loadModule(moduleName, {
					renderTo: this.getGridContainer(),
					id: structureExplorerPageId,
					instanceConfig: {
						viewModelClassName: moduleConfig.viewModelClassName,
						viewConfigClassName: moduleConfig.viewConfigClassName
					}
				});
			}
		});

	});



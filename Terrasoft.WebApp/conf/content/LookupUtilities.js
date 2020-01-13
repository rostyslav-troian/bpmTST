Terrasoft.configuration.Structures["LookupUtilities"] = {innerHierarchyStack: ["LookupUtilities"]};
define("LookupUtilities", ["terrasoft", "MaskHelper", "ModalBox"], function(Terrasoft, MaskHelper, ModalBox) {

	/**
	 * Id LookupPage-#
	 * @private
	 * @type {String}
	 */
	var lookupPageId;

	/**
	 * ######### # ####### ##### ######### LookupPage
	 * @private
	 * @type {Object}
	 */
	var modalBoxContainer;

	/**
	 * ### ###### LookupPage-#
	 * @private
	 * @type {String}
	 */
	var lookupPageName = "LookupPage";
	/**
	 * ####, ####### ###############, # ###### #### ########## CardProcessModule
	 * @private
	 * @type {Boolean}
	 */
	var openProcess;
	var ModalBoxSize = {
		MinHeight: "1",
		MinWidth: "1",
		MaxHeight: "100",
		MaxWidth: "100"
	};

	/**
	 * ######## ######### # ###, ### ##### ####### ##########
	 * ############ ###### # #######
	 * @public
	 */
	function throwOpenLookupMessage(sandbox, config, callback, scope, tag) {
		window.console.warn(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
			"throwOpenLookupMessage", "open"));
		var handler = function(args) {
			callback.call(scope, args);
		};
		sandbox.publish("OpenLookupPage", {
			config: config,
			handler: handler
		}, tag ? [tag] : []);
	}

	function openFolderPage(sandbox, config, callback, scope) {
		var handler;
		if (callback) {
			handler = function(args) {
				callback.call(scope, args);
			};
		}
		MaskHelper.ShowBodyMask();
		sandbox.publish("OpenFolderPage", {
			config: config,
			handler: handler
		}, [sandbox.id]);
	}

	/**
	 * ########## ######### ####### ######## ###########
	 * @public
	 * @return {Object}
	 */
	function getBaseLookupPageStructure() {
		return [
			{
				type: Terrasoft.ViewModelSchemaItem.GROUP,
				name: "baseElementsControlGroup",
				visible: true,
				collapsed: false,
				wrapContainerClass: "main-elements-control-group-container",
				items: [{
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					name: "Id",
					columnPath: "Id",
					visible: false,
					viewVisible: false
				}, {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					name: "Name",
					columnPath: "Name",
					dataValueType: Terrasoft.DataValueType.TEXT
				}, {
					type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
					name: "Description",
					columnPath: "Description",
					dataValueType: Terrasoft.DataValueType.TEXT
				}]
			}
		];
	}

	/**
	 * ######### ######### #### Lookup-# # ## ## ######### ### ######
	 * ### ######### Lookup-# ########
	 * @public
	 */
	function hide() {
		if (!openProcess) {
			ModalBox.close();
			modalBoxContainer = null;
		}
	}

	function getFixedHeaderContainer() {
		return ModalBox.getFixedBox();
	}

	/**
	 * ########## ### ########## #############, #.#. ### ### ####### ##### Lookup ########### ## #### #####
	 * ############ ###### # ##########
	 * @public
	 */
	function openLookupPage(sandbox, openLookupPageArgs, scope, renderTo, keepAlive, useViewModule) {
		window.console.warn(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
			"openLookupPage", "open"));
		openProcess = true;
		if (Ext.isEmpty(openLookupPageArgs.config)) {
			return;
		}
		if (!Ext.isEmpty(openLookupPageArgs.config.lookupPageName)) {
			lookupPageName = openLookupPageArgs.config.lookupPageName;
		}
		sandbox.subscribe("CardProccessModuleInfo", function() {
			return true;
		}, [sandbox.id + "_LookupPage"]);
		if (!scope.lookupPageParamsById) {
			scope.lookupPageParamsById = [];
		}
		keepAlive = (keepAlive === undefined) ? true : keepAlive;
		lookupPageId = sandbox.id + "_LookupPage";
		sandbox.subscribe("LookupInfo", function() {
			scope.lookupPageParamsById[lookupPageId] = openLookupPageArgs.config;
			return scope.lookupPageParamsById[lookupPageId];
		}, [lookupPageId]);
		var params = sandbox.publish("GetHistoryState");
		if (keepAlive) {
			sandbox.publish("PushHistoryState", {hash: params.hash.historyState});
		}
		var moduleName = "LookupPage";
		if (openLookupPageArgs.config.moduleName) {
			moduleName = openLookupPageArgs.config.moduleName;
		}
		MaskHelper.ShowBodyMask();
		if (useViewModule) {
			sandbox.publish("LoadModule", {
				renderTo: renderTo,
				moduleId: lookupPageId,
				moduleName: moduleName,
				keepAlive: keepAlive
			});
		} else {
			sandbox.loadModule(moduleName, {
				renderTo: renderTo,
				id: lookupPageId,
				keepAlive: keepAlive
			});
		}
		sandbox.subscribe("ResultSelectedRows", openLookupPageArgs.handler, [lookupPageId]);
	}

	/**
	 * ######### Lookup # ######### ####
	 * @public
	 * @param {Object} sandbox
	 * @param {Object} config
	 * @param {Function} callback
	 * @param {Object} scope
	 * @param {Object} renderTo
	 * @param {Boolean} keepAlive
	 * @param {Boolean} useViewModule
	 * @param {Function} [cancelCallback] Cancel callback function.
	 *
	 * ###### ############ ### lookup, ### ######## ##### ######### ######### #######:
	 * var config = {
			 *		entitySchemaName: "SysAdminUnit",
			 *		multiSelect: true,
			 *		columns: ["Contact", "Name"],
			 *		hideActions: true,
			 *		lookupPostfix: "_UsersDetail"
			 * };
	 */
	function open(sandbox, config, callback, scope, renderTo, keepAlive, useViewModule, cancelCallback) {
		var openLookupConfig = {};
		if (Ext.isEmpty(config)) {
			return;
		}
		openLookupConfig.sandbox = sandbox;
		openLookupConfig.callback = callback;
		openLookupConfig.scope = scope;
		openLookupConfig.config = config;
		openLookupConfig.renderTo = renderTo;
		var lookupModuleName = Ext.isEmpty(config.lookupPageName) ? lookupPageName : config.lookupPageName;
		lookupPageId = sandbox.id + "_LookupPage";
		var lookupModuleId = Ext.isEmpty(config.lookupModuleId) ? lookupPageId : config.lookupModuleId;
		if (keepAlive === undefined) {
			openLookupConfig.keepAlive = false;
		} else {
			openLookupConfig.keepAlive = keepAlive;
		}
		if (useViewModule === undefined) {
			openProcess = false;
		}
		openLookupConfig.useViewModule = useViewModule;
		modalBoxContainer = ModalBox.show({
			minWidth: ModalBoxSize.MinWidth,
			maxWidth: ModalBoxSize.MaxWidth,
			minHeight: ModalBoxSize.MinHeight,
			maxHeight: ModalBoxSize.MaxHeight,
			boxClasses: config.modalBoxClasses
		}, function(destroy) {
			Ext.callback(cancelCallback, scope);
			if (destroy) {
				sandbox.unloadModule(sandbox.id + "_LookupPage");
			}
		}, this);
		ModalBox.setSize(820, 600);
		sandbox.subscribe("LookupInfo", function() {
			if (!scope.lookupPageParamsById) {
				scope.lookupPageParamsById = [];
			}
			scope.lookupPageParamsById[lookupPageId] = openLookupConfig.config;
			scope.lookupPageParamsById[lookupPageId].isQuickAdd = config.isQuickAdd;
			scope.lookupPageParamsById[lookupPageId].valuePairs = config.valuePairs;
			return scope.lookupPageParamsById[lookupPageId];
		}, [lookupPageId]);
		MaskHelper.ShowBodyMask();
		sandbox.loadModule(lookupModuleName, {
			renderTo: modalBoxContainer.id,
			id: lookupModuleId,
			keepAlive: keepAlive
		});
		sandbox.subscribe("ResultSelectedRows", function(args) {
			openLookupConfig.callback.call(openLookupConfig.scope, args);
			close(openLookupConfig.sandbox);
		}, [lookupPageId]);
	}

	/**
	 * Opens lookup in modal box.
	 * @param {Object} config Config object.
	 * @param {Object} config.sandbox Sandbox instance.
	 * @param {Object} config.lookupConfig Lookup config.
	 * @param {Object|String} config.renderTo Id or element where to render.
	 * @param {Boolean} [config.keepAlive] Keep alive chain module.
	 * @param {Boolean} [config.useViewModule] Use view module.
	 * @param {Function} [config.cancelCallback] Cancel callback function.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	function openLookup(config, callback, scope) {
		open(config.sandbox, config.lookupConfig, callback, scope, config.renderTo, config.keepAlive,
			config.useViewModule, config.cancelCallback);
	}

	function getGridContainer() {
		return modalBoxContainer;
	}

	/**
	 * ######### ######### #### Lookup-# # ######### ###### (#### ####### ## ###### ## ## CardProcessModule)
	 * @public
	 */
	function close(sandbox) {
		if (!openProcess) {
			if (modalBoxContainer && modalBoxContainer.dom) {
				ModalBox.close();
			}
			sandbox.unloadModule(sandbox.id + "_LookupPage");
		}
	}

	function updateSize() {
		ModalBox.updateSizeByContent();
	}

	return {
		Open: open,
		OpenLookup: openLookup,
		UpdateSize: updateSize,
		ThrowOpenLookupMessage: throwOpenLookupMessage,
		OpenLookupPage: openLookupPage,
		Close: close,
		Hide: hide,
		OpenFolder: openFolderPage,
		GetBaseLookupPageStructure: getBaseLookupPageStructure,
		GetFixedHeaderContainer: getFixedHeaderContainer,
		GetGridContainer: getGridContainer
	};
});



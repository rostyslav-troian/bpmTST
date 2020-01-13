Terrasoft.configuration.Structures["LookupUtilitiesV2"] = {innerHierarchyStack: ["LookupUtilitiesV2"]};
define("LookupUtilitiesV2", ["terrasoft", "ModalBox", "LookupUtilitiesV2Resources", "MaskHelper"
], function(Terrasoft, ModalBox, resources) {
	Ext.define("Terrasoft.configuration.LookupUtilities", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.LookupUtilities",

		//region Properties: Protected

		/**
		 * Parameter which indicates, that class is singleton.
		 * @protected
		 * @type {Boolean}
		 */
		singleton: true,

		/**
		 * Messages, used to work with lookup module.
		 * @protected
		 * @type {Object}
		 */
		messages: {
			"LookupInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ResultSelectedRows": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * Sandbox object of latest module called lookup utilities.
		 * @protected
		 * @type {Object}
		 */
		openerSandbox: null,

		/**
		 * Lookup module name.
		 * @protected
		 * @type {String}
		 */
		lookupPageName: "LookupPage",

		/**
		 * Open modal box window configuration.
		 * @protected
		 * @type {Object}
		 */
		modalBoxSize: {
			"minHeight": "1",
			"minWidth": "1",
			"maxHeight": "100",
			"maxWidth": "100"
		},

		//endregion

		//region Methods: Private

		/**
		 * Subscribes on LookupInfo message.
		 * @private
		 * @param {Object} sandbox Sandbox of lookup opener.
		 * @param {Object} openLookupConfig Open lookup config.
		 * @param {GUID} lookupPageId Lookup page id.
		 */
		_subscribeOnLookupInfoMessage: function(sandbox, openLookupConfig, lookupPageId) {
			sandbox.subscribe("LookupInfo", function() {
				return this.config;
			}, {config: openLookupConfig}, [lookupPageId]);
		},

		/**
		 * Subscribes on ResultSelectedRows message.
		 * @private
		 * @param {Object} sandbox Sandbox of lookup opener.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 * @param {GUID} lookupPageId Lookup page id.
		 */
		_subscribeOnResultSelectedRowsMessage: function(sandbox, callback, scope, lookupPageId) {
			sandbox.subscribe("ResultSelectedRows", function(args) {
				this.callback.call(this.scope, args);
				Terrasoft.LookupUtilities.unloadModule(this.scope.sandbox);
				Terrasoft.LookupUtilities.closeModalBox();
			}, {
				callback: callback,
				scope: scope
			}, [lookupPageId]);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Prepares modal box for rendering module. Opens and resize to default size.
		 * @protected
		 */
		prepareModalBox: function() {
			ModalBox.show(this.modalBoxSize, Terrasoft.emptyFn);
			ModalBox.setSize(820, 600);
		},

		/**
		 * Unloads current modal box module.
		 * @deprecated
		 */
		unloadPreviousModule: function() {
			this.unloadModule();
		},

		/**
		 * Unloads current modal box module.
		 * @protected
		 * @param {Object} openerSandbox  Sandbox of lookup opener.
		 */
		unloadModule: function(openerSandbox) {
			openerSandbox = openerSandbox || this.openerSandbox;
			if (openerSandbox) {
				var lookupPageId = this.getLookupPageId(openerSandbox);
				openerSandbox.unloadModule(lookupPageId);
				this.openerSandbox = null;
			}
		},

		/**
		 * Generates identifier for lookup module.
		 * @protected
		 * @param {Object} sandbox Sandbox of lookup opener.
		 * @return {string} Lookup module identifier.
		 */
		getLookupPageId: function(sandbox) {
			return sandbox.id + "_LookupPage";
		},

		//endregion

		//region Methods: Public

		/**
		 * Returns header container of opened modal box.
		 * @return {Ext.Element} Header container.
		 */
		getFixedHeaderContainer: function() {
			return ModalBox.getFixedBox();
		},

		/**
		 * Returns main content container of opened modal box.
		 * @return {Ext.Element} Main content container.
		 */
		getGridContainer: function() {
			return ModalBox.getInnerBox();
		},

		/**
		 * Updates modal box size by content.
		 */
		updateSize: function() {
			ModalBox.updateSizeByContent();
		},

		/**
		 * Closes modal box and destroys lookup module.
		 */
		closeModalBox: function() {
			if (this.getGridContainer()) {
				ModalBox.close(true);
				this.unloadModule();
			}
		},

		/**
		 * Closes modal box and keep lookup module alive.
		 */
		hideModalBox: function() {
			if (this.getGridContainer()) {
				ModalBox.close(false);
			}
		},

		/**
		 * Opens lookup page.
		 * @param {Object} config Lookup page opening configuration.
		 * @param {Object} config.lookupConfig Lookup page configuration.
		 * @param {Function} callback Function, which will be called when user selects something.
		 * @param {Object} scope Scope of callback function.
		 */
		open: function(config, callback, scope) {
			if (!Ext.isFunction(callback)) {
				throw Ext.create("Terrasoft.UnsupportedTypeException", {
					message: "callback must be a function"
				});
			}
			var sandbox = config.sandbox || scope.sandbox;
			this.openerSandbox = sandbox;
			if (Ext.isEmpty(sandbox)) {
				throw Ext.create("Terrasoft.NullOrEmptyException", {
					message: resources.localizableStrings.NotFoundSandbox
				});
			}
			var openLookupConfig = config.lookupConfig;
			Ext.Array.merge(openLookupConfig.valuePairs, config.valuePairs || []);
			if ("isQuickAdd" in config) {
				openLookupConfig.isQuickAdd = config.isQuickAdd;
			}
			var lookupPageName = config.lookupPageName || this.lookupPageName;
			var lookupPageId = openLookupConfig.lookupPageId = config.lookupModuleId || this.getLookupPageId(sandbox);
			if (config.keepAlive) {
				throw Ext.create("Terrasoft.InvalidOperationException", {
					message: resources.localizableStrings.CanNotUseKeepAlive
				});
			}
			sandbox.registerMessages(this.messages);
			this._subscribeOnLookupInfoMessage(sandbox, openLookupConfig, lookupPageId);
			this._subscribeOnResultSelectedRowsMessage(sandbox, callback, scope, lookupPageId);
			this.prepareModalBox(sandbox);
			Terrasoft.MaskHelper.showBodyMask();
			sandbox.loadModule(lookupPageName, {
				renderTo: this.getGridContainer(),
				id: lookupPageId
			});
		},

		//endregion

		// region Methods: Deprecated

		/**
		 * Updates modal box size by content.
		 */
		UpdateSize: function() {
			this.updateSize();
		},

		/**
		 * Closes modal box and destroys lookup module.
		 */
		CloseModalBox: function() {
			this.closeModalBox();
		},

		/**
		 * Closes modal box and keep lookup module alive.
		 */
		HideModalBox: function() {
			this.hideModalBox();
		},

		/**
		 * Opens lookup page.
		 * @param {Object} config Lookup page opening configuration.
		 * @param {Object} config.lookupConfig Lookup page configuration.
		 * @param {Function} callback Function, which will be called when user selects something.
		 * @param {Object} scope Scope of callback function.
		 */
		Open: function(config, callback, scope) {
			this.open(config, callback, scope);
		}

		// endregion

	});

});



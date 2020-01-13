Terrasoft.configuration.Structures["GoogleTagManagerUtilities"] = {innerHierarchyStack: ["GoogleTagManagerUtilities"]};
define("GoogleTagManagerUtilities", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.GoogleTagManagerUtilities", {
		alternateClassName: "Terrasoft.GoogleTagManagerUtilities",
		extend: "Terrasoft.BaseObject",
		singleton: true,

		/**
		 * Used to store default variables initialization state.
		 * @private
		 * @type {Boolean}
		 */
		defaultVariablesInitialized: false,

		/**
		 * If defined as true, custom variables will be cleared after sending to tag manager.
		 * @protected
		 * @type {Boolean}
		 */
		clearVariablesEnabled: true,

		/**
		 * Product name.
		 * @protected
		 * @type {String}
		 */
		productName: Ext.emptyString,

		/**
		 * Product edition.
		 * @protected
		 * @type {String}
		 */
		productEdition: Ext.emptyString,

		/**
		 * Configuration version.
		 * @protected
		 * @type {String}
		 */
		configurationVersion: Ext.emptyString,

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent();
			if (this.isTagManagerEnabled()) {
				this.initDefaultVariableValues(this.tryInitDefaultVariables, this);
			}
		},

		/**
		 * Initializes properties if Google Tag Manager is enabled.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		initDefaultVariableValues: function(callback, scope) {
			Terrasoft.SysSettings.querySysSettings([
				"ProductName", "ProductEdition", "ConfigurationVersion", "CustomerId"
			], function(values) {
				this.productName = Ext.util.Format.htmlDecode(values.ProductName);
				this.productEdition = values.ProductEdition;
				this.customerId = values.CustomerId;
				this.configurationVersion = values.ConfigurationVersion;
				callback.call(scope);
			}, this);
		},

		/**
		 * Initializes default Google Tag Manager variables if it is enabled.
		 * @private
		 */
		tryInitDefaultVariables: function() {
			if (this.defaultVariablesInitialized) {
				return;
			}
			if (!this.isTagManagerEnabled()) {
				return;
			}
			var defaultVariables = {
				productName: this.productName,
				productEdition: this.productEdition,
				primaryCulture: Terrasoft.SysValue.CURRENT_USER_CULTURE,
				customerId: this.customerId,
				version: this.configurationVersion,
				userId: Terrasoft.SysValue.CURRENT_USER.value
			};
			this.defaultVariablesInitialized = true;
			this.pushVariables(defaultVariables);
		},

		/**
		 * Pushes data to google tag manager data layer.
		 * @private
		 * @param {Object} variables Object containing new variables values.
		 */
		pushVariables: function(variables) {
			this.tryInitDefaultVariables();
			try {
				window.dataLayer.push(variables);
			} catch (e) {
				this.log(e.message);
			}
		},

		/**
		 * Actualizes config used to flush variables defined in passed data object.
		 * @private
		 * @param {Object} data Object contains custom variable names as property names.
		 */
		clearCustomVariableValues: function(data) {
			if (!this.clearVariablesEnabled) {
				return;
			}
			var clearCustomVariableConfig = {};
			Terrasoft.each(data, function(value, variableName) {
				clearCustomVariableConfig[variableName] = undefined;
			}, this);
			this.pushVariables(clearCustomVariableConfig);
		},

		/**
		 * Returns true if tag manager is enabled and can accept data.
		 * @private
		 * @return {boolean}
		 */
		isTagManagerEnabled: function() {
			return Boolean(window.dataLayer && window.dataLayer.push);
		},

		/**
		 * Sends data to Google Tag Manager.
		 * @private
		 * @param {Object} data Google Tag Manager data.
		 */
		send: function(data) {
			if (this.isTagManagerEnabled()) {
				var eventData = Ext.apply({event: "bpmonlineInfo"}, data);
				this.pushVariables(eventData);
				this.clearCustomVariableValues(data);
			}
		},

		/**
		 * Sends data to Google Tag Manager.
		 * @param {Object} data Google Tag Manager data.
		 */
		actionModule: function(data) {
			Terrasoft.defer(function() {
				this.send(data);
			}, this);
		}

	});

	return Terrasoft.GoogleTagManagerUtilities;
});



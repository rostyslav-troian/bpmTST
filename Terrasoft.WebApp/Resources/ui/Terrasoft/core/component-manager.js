Ext.ns("Terrasoft.core");
/**
 * Class provides functions for work with {@link Ext.ComponentManager component manager}.
 */
Ext.define("Terrasoft.core.ComponentManager", {
	alternateClassName: "Terrasoft.ComponentManager",
	extend: "Terrasoft.BaseObject",
	singleton: true,

	//region Properties: Private

	/**
	 * Default interval in milliseconds for unregister components.
	 * @private
	 * @type {Number}
	 */
	defaultUnregisterInterval: 1000,

	/**
	 * Default number of the components to unregister from the {@link Ext.ComponentManager component manager}.
	 * @protected
	 * @type {Number}
	 */
	defaultUnregisterComponentsCount: 100,

	/**
	 * Collection of the items ids to be unregistered.
	 * @private
	 * @type {Array}
	 */
	componentsToUnregister: [],

	//endregion

	//region Properties: Protected

	/**
	 * Default number of the components to unregister from the {@link Ext.ComponentManager component manager}.
	 * @protected
	 * @type {Number}
	 */
	unregisterComponentsCount: null,

	/**
	 * Interval in milliseconds for unregister components.
	 * @protected
	 * @type {Number}
	 */
	unregisterInterval: null,

	/**
	 * Name of the interval id.
	 * @protected
	 * @type {Number}
	 */
	unregisterIntervalId: null,

	//endregion

	//region Methods: Private

	/**
	 * Returns cached settings value by code.
	 * @private
	 * @param {String} code Code of the system setting.
	 * @return {Mixed}
	 */
	getCachedSetting: function(code) {
		if (!Terrasoft.SysSettings || !Terrasoft.SysSettings.cachedSettings) {
			return null;
		}
		return Terrasoft.SysSettings.cachedSettings[code];
	},

	/**
	 * Safely unregister component from the {@link Ext.ComponentManager component manager}.
	 * @private
	 */
	safeUnregister: function() {
		var unregisterBatch = this.componentsToUnregister.splice(0, this.getUnregisterComponentsCount());
		while (unregisterBatch.length) {
			var componentId = unregisterBatch.shift();
			var component = Ext.ComponentManager.get(componentId);
			if (component && component.destroyed) {
				Ext.ComponentManager.all.removeAtKey(component.id);
			}
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns count of the components to unregister per one iteration.
	 * @protected
	 * @return {Number}
	 */
	getUnregisterComponentsCount: function() {
		if (!Ext.isEmpty(this.unregisterComponentsCount)) {
			return this.unregisterComponentsCount;
		}
		var unregisterComponentsCount = this.getCachedSetting("UnregisterComponentsCount");
		this.unregisterComponentsCount = unregisterComponentsCount || this.defaultUnregisterComponentsCount;
		return this.unregisterComponentsCount;
	},

	/**
	 * Returns interval in milliseconds for unregister components.
	 * @protected
	 * @return {Number}
	 */
	getUnregisterInterval: function() {
		if (!Ext.isEmpty(this.unregisterInterval)) {
			return this.unregisterInterval;
		}
		var unregisterInterval = this.getCachedSetting("UnregisterComponentsInterval");
		this.unregisterInterval = unregisterInterval || this.defaultUnregisterInterval;
		return this.unregisterInterval;
	},

	//endregion

	//region Methods: Public

	/**
	 * Unregister component from {@link Ext.ComponentManager component manager}.
	 * @param {Object} component Component instance.
	 */
	unregister: function(component) {
		if (this.componentsToUnregister.indexOf(component.id) === -1) {
			this.componentsToUnregister.push(component.id);
		}
		if (Ext.isEmpty(this.unregisterIntervalId)) {
			this.unregisterIntervalId = setInterval(this.safeUnregister.bind(this), this.getUnregisterInterval());
		}
	},

	/**
	 * Registers component at the {@link Ext.ComponentManager component manager}.
	 * @param {Object} component Component instance.
	 */
	register: function(component) {
		Ext.ComponentManager.register(component);
	}

	//endregion

});

/**
 * Class for working with resources.
 */
Ext.define("Terrasoft.utils.common.ResourceUtility", {

	alternateClassName: "Terrasoft.ResourceUtility",
	singleton: true,

	//region Constructor

	/**
	 * Constructor of the class.
	 * @return {Object} Result call parent.
	 */
	constructor: function() {
		this.initResourceCaches();
		return this.callParent(arguments);
	},

	//endregion

	//region Mathods: Private

	/**
	 * Storage of resources.
	 * @type {Terrasoft.ResourceCache}
	 */
	resourceCaches: null,

	/**
	 * Initializes storage of resources.
	 */
	initResourceCaches: function() {
		var storeConfig = {
			"levelName": "Resource",
			"type": "Terrasoft.LocalStore",
			"isCache": true
		};
		if (Ext.isEmpty(Terrasoft.ResourceCache)) {
			Terrasoft.StoreManager.registerStore(storeConfig);
		}
		this.resourceCaches = Terrasoft.ResourceCache;
	},

	/**
	 * Returns a resource from the storage.
	 * @param {String} key Key of resource.
	 * @return {String|Array|Object} Resource.
	 */
	getResourceCaches: function(key) {
		return this.resourceCaches.getItem(key);
	},

	/**
	 * Sets the resource in the storage.
	 * @param {String} key Key of resource.
	 * @param {String|Array|Object} Resource.
	 */
	setResourceCaches: function(key, value) {
		this.resourceCaches.setItem(key, value);
	},

	/**
	 * Returns key of parameters.
	 * @param  {Object} parameters Configuration object
	 * @return {String} A key of parameters.
	 */
	getParametersKey: function(parameters) {
		var keys = Object.keys(parameters),
				values = keys.map(function(key) {
					return parameters[key];
				});
		return values.join("_");
	},

	//endregion

	//region Metods: Public

	/**
	 * Returns a URL to a binary type.
	 * @param  {Object} config Configuration object.
	 * Example: {
	 *      callback: callback,
	 *      source: Terrasoft.ImageSources.SYS_IMAGE,
	 *      params: {
	 *          primaryColumnValue: notify.ImageId
	 *      },
	 *      filter: {
	 *          round: {radius: 40}
	 *      }
	 * }
	 * The resulting URL is returned to the callback function.
	 */
	getDataUrl: function(config) {
		var url = Terrasoft.ImageUrlBuilder.getUrl(config),
				callback = config.callback,
				scope = config.scope || this,
				filter = config.filter,
				imageId = config.params && config.params.primaryColumnValue,
				decorName = Object.getOwnPropertyNames(filter),
				parameters = filter[decorName],
				parametersKey = this.getParametersKey(parameters),
				key = [imageId, decorName, parametersKey].join("_"),
				dataUrl = this.getResourceCaches(key);
		parameters.source = url;
		if (!Ext.isEmpty(dataUrl)) {
			callback.apply(scope, [dataUrl]);
			return;
		}
		var decorator = Ext.create("Terrasoft.ImageDecorator");
		decorator[decorName](parameters);
		decorator.execute(function(dataUrl) {
			this.setResourceCaches(key, dataUrl);
			callback.apply(scope, [dataUrl]);
		}, this);
	}

	//endregion

});

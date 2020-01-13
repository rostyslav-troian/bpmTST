Ext.define("Terrasoft.ResourceMutex", {
	singleton: true,

	/**
	 * @private
	 */
	_resources: [],

	/**
	 * Indicates if resource if locked.
	 * @param {String} resource Resource name.
	 * @return {Boolean} Indicator if resource is locked.
	 */
	locked: function(resource) {
		return this._resources.indexOf(resource) > -1;
	},

	/**
	 * Locks the recource.
	 * @param {String} resource Resource name.
	 */
	lock: function(resource) {
		if (this.locked(resource)) {
			throw new Terrasoft.InvalidOperationException();
		}
		Ext.Array.include(this._resources, resource);
	},

	/**
	 * Releases the recource.
	 * @param {String} resource Resource name.
	 */
	release: function(resource) {
		if (this.locked(resource)) {
			Ext.Array.remove(this._resources, resource);
		}
	}

});

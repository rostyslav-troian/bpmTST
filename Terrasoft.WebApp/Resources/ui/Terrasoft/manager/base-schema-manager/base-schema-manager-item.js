/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseSchemaManagerItem", {
	extend: "Terrasoft.manager.BaseManagerItem",
	alternateClassName: "Terrasoft.BaseSchemaManagerItem",

	//region Properties: Protected

	/**
	 * The class name of the schema instance.
	 * @protected
	 * @type {String}
	 */
	instanceClassName: "Terrasoft.BaseSchema",

	/**
	 * The class name for the schema selection.
	 * @protected
	 * @type {String}
	 */
	requestClassName: "Terrasoft.BaseSchemaRequest",

	/**
	 * The name of the schema save request class.
	 * @protected
	 * @type {String}
	 */
	updateRequestClassName: null,

	/**
	 * Schema removal request class name.
	 * @protected
	 * @type {String}
	 */
	removeRequestClassName: null,

	/**
	 * The schema identifier.
	 * @type {String}
	 */
	uId: null,

	/**
	 * Schema package Id.
	 * @protected
	 * @type {String}
	 */
	packageUId: null,

	/**
	 * Schema name.
	 * @type {String}
	 */
	name: null,

	/**
	 * Schema header.
	 * @protected
	 * @type {String}
	 */
	caption: null,

	/**
	 * Unique identifier of the parent schema.
	 * @protected
	 * @type {String}
	 */
	parentUId: null,

	/**
	 * Flag of locked schema.
	 * @protected
	 * @type {Boolean}
	 */
	isLocked: false,

	/**
	 * A Flag of the expansion of the parent schema.
	 * @protected
	 * @type {Boolean}
	 */
	extendParent: false,

	/**
	 * A unique identifier of the workspace of the schema.
	 * @protected
	 * @type {String}
	 */
	sysWorkspaceId: null,

	/**
	 * The status of the schema.
	 * @protected
	 * @type {String}
	 */
	status: Terrasoft.ModificationStatus.NOT_MODIFIED,

	/**
	 * Schema Id.
	 * @protected
	 * @type {Terrasoft.BaseSchema}
	 */
	instance: null,

	//endregion

	//region Methods: Protected

	/**
	 * Returns schema instance and response if instance was requested from server.
	 * @param {Function} callback The callback function.
	 * @param {Terrasoft.BaseSchema|null} callback.instance Schema instance.
	 * @param {Object} [callback.response] Server response.
	 * @param {Object} scope The scope for the callback.
	 * @protected
	 * Doesn't throw any exception. Check response success if needed.
	 */
	getInstanceWithResponse: function(callback, scope) {
		var safeCallback = this.getSafeCallback(callback, scope);
		if (this.instance) {
			safeCallback(this.instance);
		} else {
			this.forceGetInstance(function(instance, response) {
				this.setInstance(instance);
				safeCallback(instance, response);
			}, this);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * The method returns a schema identifier.
	 * @return {String}
	 */
	getUId: function() {
		return this.uId;
	},

	/**
	 * The method returns a schema package identifier.
	 * @return {String}
	 */
	getPackageUId: function() {
		return this.packageUId;
	},

	/**
	 * Gets schema name.
	 * @return {String}
	 */
	getName: function() {
		return this.name;
	},

	/**
	 * Gets the schema header.
	 * @return {String}
	 */
	getCaption: function() {
		return this.caption;
	},

	/**
	 * Returns display value. If caption not sets, returns name.
	 * @return {String} Display value.
	 */
	getDisplayValue: function() {
		return this.caption || this.name;
	},

	/**
	 * The method gets a unique identifier of the parent schema.
	 * @return {String}
	 */
	getParentUId: function() {
		return this.parentUId;
	},

	/**
	 * The method returns the blocking characteristic of the schema.
	 * @return {String}
	 */
	getIsLocked: function() {
		return this.isLocked;
	},

	/**
	 * The method returns a unique schema configuration identifier.
	 * @return {String}
	 */
	getSysWorkspaceId: function() {
		return this.sysWorkspaceId;
	},

	/**
	 * The method returns the extension character of the parent schema.
	 * @return {Boolean}
	 */
	getExtendParent: function() {
		return this.extendParent;
	},

	/**
	 * The method returns the status of the schema.
	 * @return {String}
	 */
	getStatus: function() {
		return this.status;
	},

	/**
	 * Checks if the schema has been changed.
	 * @return {String}
	 */
	isModified: function() {
		return this.getStatus() !== Terrasoft.ModificationStatus.NOT_MODIFIED;
	},

	/**
	 * Indicates whether schema manager item is new.
	 * @return {String}
	 */
	isNew: function() {
		return this.getStatus() === Terrasoft.ModificationStatus.NEW;
	},

	/**
	 * The method sets the state of the schema.
	 * @param {Terrasoft.ModificationStatus} status Schema condition.
	 */
	setStatus: function(status) {
		var previusStatus = this.status;
		this.status = status;
		if (previusStatus !== status) {
			this.fireEvent("statusChanged", this);
		}
	},

	/**
	 * Initializes and returns schema instance.
	 * @param {Function} callback The callback function.
	 * @param {Terrasoft.BaseSchema|null} callback.instance Schema instance.
	 * @param {Object} scope The scope for the callback.
	 * @throws {Terrasoft.InvalidOperationException} If server returned error.
	 */
	getInstance: function(callback, scope) {
		var safeCallback = this.getSafeCallback(callback, scope);
		if (this.instance) {
			safeCallback(this.instance);
		} else {
			this.forceGetInstance(function(instance, response) {
				this.setInstance(instance);
				if (response.success) {
					safeCallback(instance);
				} else {
					var errorInfo = response.errorInfo;
					var message = errorInfo ? errorInfo.toString() : "";
					throw new Terrasoft.InvalidOperationException({
						message: message
					});
				}
			}, this);
		}
	},

	/**
	 * Reverts changes in instance.
	 * @return {String}
	 */
	revert: function() {
		this.setStatus(Terrasoft.ModificationStatus.NOT_MODIFIED);
		this.instance = null;
	},

	/**
	 * The method of processing after saving the scheme.
	 * @param {Terrasoft.BaseResponse} response Server response.
	 */
	onAfterSave: function(response) {
		if (response && response.success) {
			this.fireEvent("outdated", this);
			this.status = Terrasoft.ModificationStatus.NOT_MODIFIED;
		}
	},

	/**
	 * Saves the changes to the data.
	 * @throws Terrasoft.exceptions.InvalidObjectState If the schema instance is not defined.
	 * @param {Object} config The configuration of the object's storage.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	save: function(config, callback, scope) {
		var saveChainArguments = [];
		if (this.isModified()) {
			if (this.status === Terrasoft.ModificationStatus.REMOVED) {
				saveChainArguments.push(this.applyRemove);
			} else {
				this.checkInstance();
				saveChainArguments.push(this.applyChanges);
				saveChainArguments.push(function(next, response) {
					this.onAfterSave(response);
					callback.call(scope, response);
				});
			}
		}
		var safeCallback = this.getSafeCallback(callback, scope);
		saveChainArguments.push(function(next, response) {
			safeCallback(response);
		});
		saveChainArguments.push(this);
		Terrasoft.chain.apply(this, saveChainArguments);
	},

	/**
	 * Prompts the schema instance from the server whether the element is initialized or not.
	 * @param {String} packageUId The unique identifier of the package.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	getPackageInstance: function(packageUId, callback, scope) {
		var requestConfig = {
			packageUId: packageUId
		};
		var query = this.getInstanceRequest(requestConfig);
		query.execute(function(response) {
			if (response && response.success) {
				callback.call(scope, response.schema);
			} else {
				throw new Terrasoft.InvalidOperationException({
					message: response.errorInfo.toString()
				});
			}
		}, scope);
	},

	/**
	 * @deprecated Use getPackageInstance instead
	 */
	getPackageInstace: function() {
		this.getPackageInstance.call(this, arguments);
	},

	/**
	 * Query server schema instance.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	forceGetInstance: function(callback, scope) {
		this.forceGetInstanceByConfig(null, callback, scope);
	},

	/**
	 * Query server schema instance with request config
	 * @param {Object} config Request config.
	 * @param {Function} callback The callback function.
	 * @param {Terrasoft.BaseSchema} callback.instance Schema instance.
	 * @param {Object} callback.response Server response.
	 * @param {Object} scope The scope of callback function.
	 */
	forceGetInstanceByConfig: function(config, callback, scope) {
		var query = this.getInstanceRequest(config);
		query.execute(function(response) {
			response = response || {};
			callback.call(scope, response.schema, response);
		}, scope);
	},

	/**
	 * Updates the schema instance.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	refresh: function(callback, scope) {
		var saveChainArguments = [];
		var canRefresh = (this.status !== Terrasoft.ModificationStatus.REMOVED) &&
			(this.status !== Terrasoft.ModificationStatus.NEW);
		if (canRefresh && this.instance) {
			this.clearInstance();
			saveChainArguments.push(this.getInstance);
		}
		saveChainArguments.push(function(next) {
			this.status = Terrasoft.ModificationStatus.NOT_MODIFIED;
			next();
		});
		var safeCallback = this.getSafeCallback(callback, scope);
		saveChainArguments.push(safeCallback);
		saveChainArguments.push(this);
		Terrasoft.chain.apply(this, saveChainArguments);
	},

	/**
	 * Sets the value of the element.
	 * @throws Terrasoft.exceptions.InvalidObjectState If the schema instance is not defined.
	 * @param {String} propertyName Property name.
	 * @param {Mixed} propertyValue Value.
	 */
	setPropertyValue: function(propertyName, propertyValue) {
		this.checkInstance();
		this.instance.setPropertyValue(propertyName, propertyValue);
		this.callParent(arguments);
	},

	/**
	 * Sets the value of the localized property of the element.
	 * @param {String} propertyName Property name.
	 * @param {String} propertyValue Value.
	 * @param {String} culture The name of the culture.
	 */
	setLocalizableStringPropertyValue: function(propertyName, propertyValue, culture) {
		this.checkInstance();
		this.instance.setLocalizableStringPropertyValue(propertyName, propertyValue, culture);
	},

	/**
	 * Sets the item deletion flag.
	 */
	remove: function() {
		this.callParent(arguments);
		if (this.status === Terrasoft.ModificationStatus.NEW) {
			this.fireEvent("removed", this);
		} else {
			this.status = Terrasoft.ModificationStatus.REMOVED;
		}
	},

	/**
	 * Copies the item.
	 * @return {Terrasoft.BaseManagerItem} Returns a copy of the element.
	 */
	copy: function() {
		throw new Terrasoft.exceptions.NotImplementedException();
	},

	/**
	 * Adds an event and subscribes to it.
	 */
	constructor: function(config) {
		if (config && config.instance) {
			Terrasoft.validateObjectClass(config.instance, this.instanceClassName);
		}
		this.callParent(arguments);
		if (this.instance) {
			this.instance.on("changed", this.onInstanceChanged, this);
		}
		this.addEvents("removed");
		this.addEvents("outdated");
		this.addEvents("statusChanged");
	},

	destroy: function() {
		if (this.instance && !this.instance.destroyed) {
			this.instance.un("changed", this.onInstanceChanged, this);
			this.instance.destroy();
		}
		delete this.instance;
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Clears the value of the cached schema instance.
	 * @protected
	 */
	clearInstance: function() {
		this.instance.un("changed", this.onInstanceChanged, this);
		this.status = Terrasoft.ModificationStatus.NOT_MODIFIED;
		this.instance = null;
	},

	/**
	 * Sets the value of the cached instance of the schema.
	 * @protected
	 */
	setInstance: function(instance) {
		this.instance = instance;
		if (this.instance) {
			this.instance.on("changed", this.onInstanceChanged, this);
			if (this.status !== Terrasoft.ModificationStatus.REMOVED) {
				this.status = Terrasoft.ModificationStatus.NOT_MODIFIED;
			}
		}
	},

	/**
	 * Sends the schema object to the server for storage.
	 * @protected
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	applyChanges: function(callback, scope) {
		var safeCallback = this.getSafeCallback(callback, scope);
		var updateRequest = this.getUpdateRequest();
		updateRequest.execute(function(response) {
			safeCallback(response);
		}, this);
	},

	/**
	 * Sends the request object to the server for deletion.
	 * @protected
	 * @param {Function} callback Callback function.
	 * @param {Object} scope The context for executing the callback function.
	 */
	applyRemove: function(callback, scope) {
		var safeCallback = this.getSafeCallback(callback, scope);
		var removeRequest = this.getRemoveRequest();
		removeRequest.execute(function(response) {
			if (response && response.success) {
				this.fireEvent("removed", this);
			}
			safeCallback(response);
		}, this);
	},

	/**
	 * Creates a query object for the schema instance.
	 * @param {Object} config A configuration object.
	 * @protected
	 * @return {Terrasoft.BaseSchemaRequest} The request object for the schema instance.
	 */
	getInstanceRequest: function(config) {
		if (!this.uId) {
			throw new Terrasoft.exceptions.InvalidObjectState();
		}
		var requestConfig = Ext.apply({uId: this.uId, packageUId: this.packageUId}, config);
		return Ext.create(this.requestClassName, requestConfig);
	},

	/**
	 * Creates an object of the schema delete request.
	 * @protected
	 * @return {Terrasoft.BaseSchemaRequest} The request object for the schema instance.
	 */
	getRemoveRequest: function() {
		if (!this.uId) {
			throw new Terrasoft.exceptions.InvalidObjectState();
		}
		return Ext.create(this.removeRequestClassName, {uId: this.uId, packageUId: this.packageUId});
	},

	/**
	 * Creates an object of the schema save request.
	 * @protected
	 * @return {Terrasoft.BaseSchemaRequest} The request object for the schema instance.
	 */
	getUpdateRequest: function() {
		if (!this.instance) {
			throw new Terrasoft.exceptions.InvalidObjectState();
		}
		return Ext.create(this.updateRequestClassName, {schema: this.instance});
	},

	/**
	 * Checks the instance of the schema.
	 * @protected
	 * @throws Terrasoft.exceptions.InvalidObjectState If the schema instance is not defined.
	 */
	checkInstance: function() {
		if (!this.instance) {
			throw new Terrasoft.exceptions.InvalidObjectState();
		}
	},

	/**
	 * Handles the change of the schema instance.
	 * @protected
	 * @param {Object} changedValues The object with changed values.
	 */
	onInstanceChanged: function(changedValues) {
		var connectedValues = ["uId", "packageUId", "parentUId", "name", "caption"];
		if (this.status === Terrasoft.ModificationStatus.NOT_MODIFIED) {
			this.status = Terrasoft.ModificationStatus.UPDATED;
		}
		Terrasoft.each(changedValues, function(value, propertyName) {
			if (Ext.Array.contains(connectedValues, propertyName)) {
				this[propertyName] = Terrasoft.isInstanceOfClass(value, "Terrasoft.LocalizableString")
					? value.getValue()
					: value;
			}
		}, this);
	},

	/**
	 * Creates a copy of the schema.
	 * @protected
	 * @throws Terrasoft.exceptions.InvalidObjectState The instance class of the schema is not defined.
	 * @param {Object} schemaConfig Configuration of the schema instance.
	 * @return {Terrasoft.BaseSchema} Instance instance
	 */
	createInstance: function(schemaConfig) {
		if (!this.instanceClassName) {
			throw new Terrasoft.exceptions.InvalidObjectState();
		}
		return Ext.create(this.instanceClassName, schemaConfig);
	}

	//endregion

});

/**
 */
Ext.define("Terrasoft.core.ServiceProviderMock", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ServiceProviderMock",
	singleton: true,

	executeRequest: function(serverMethod, data, callback, scope) {
		var jsonData;
		if (Ext.isString(data)) {
			jsonData = data;
		} else if (Ext.isFunction(data.serialize)) {
			jsonData = data.serialize();
		} else {
			jsonData = Terrasoft.encode(data);
		}
		var serviceMethodMock = this[serverMethod];
		if (serviceMethodMock && Ext.isFunction(serviceMethodMock)) {
			serviceMethodMock.call(this, serverMethod, jsonData, callback, scope);
		} else {
			callback.call(scope, this.getResponseJson(), jsonData);
		}
	},

	execute: function(config, callback, scope) {
		var serverMethod = config.serverMethod;
		var responseClassName = config.responseClassName;
		var data = config.data;
		this.executeRequest(serverMethod, data, function(response, jsonRequestData) {
			if (responseClassName) {
				var responseObject = Ext.create(responseClassName, response);
				callback.call(scope, responseObject, jsonRequestData, serverMethod, data);
			} else {
				callback.call(scope, response, jsonRequestData, serverMethod, data);
			}
		}, this);
	},

	getResponseJson: function(config) {
		var response = {
			success: true,
			errorInfo: null
		};
		return Ext.apply(response, config || {});
	},

	// Mock: Terrasoft.UpdatePackageSchemaDataRequest
	UpdatePackageSchemaDataRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	DeletePackageSchemaDataRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.ClientUnitSchemaUpdateRequest
	ClientUnitSchema: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.ClientUnitSchemaRequest
	ClientUnitSchemaRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.ClientUnitSchemaRemoveRequest
	RemoveClientUnitSchemaRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.EntitySchemaUpdateRequest
	EntitySchema: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.EntitySchemaRequest
	EntitySchemaRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	},

	// Mock: Terrasoft.EntitySchemaRemoveRequest
	RemoveEntitySchemaRequest: function(serverMethod, jsonData, callback, scope) {
		callback.call(scope, this.getResponseJson(), jsonData);
	}

});

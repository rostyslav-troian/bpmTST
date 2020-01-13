Ext.ns("Terrasoft.model");

/**
 * System Configuration View Model Class.
 */
Ext.define("Terrasoft.model.SysSettingViewModel", {
	extend: "Terrasoft.BaseViewModel",
	alternateClassName: "Terrasoft.SysSettingViewModel",

	/**
  * Name of the query query class for the system setting.
  * @protected
  * @type {String}
  */
	insertRequestClassName: "Terrasoft.InsertSysSettingRequest",

	/**
  * The class name of the system update prompt.
  * @protected
  * @type {String}
  */
	updateRequestClassName: "Terrasoft.UpdateSysSettingRequest",

	/**
  * The class name of the system configuration removal request.
  * @protected
  * @type {String}
  */
	deleteRequestClassName: "Terrasoft.DeleteSysSettingRequest",

	/**
	 * @inheritdoc Terrasoft.BaseViewModel#saveEntity.
	 * @override
	 */
	saveEntity: function(callback, scope) {
		if (!this.validate()) {
			return;
		}
		var modificationRequestClassName = this.isNew ? this.insertRequestClassName : this.updateRequestClassName;
		var	modificationRequest = Ext.create(modificationRequestClassName, {
			id: this.get(this.primaryColumnName)
		});
		Terrasoft.each(modificationRequest.propertyColumnName, function(columnName, propertyName) {
			modificationRequest[propertyName] = this.get(columnName);
		}, this);
		modificationRequest.execute(function(response) {
			callback.call(scope, response);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseViewModel#deleteEntity.
	 * @override
	 */
	deleteEntity: function(callback, scope) {
		var request = Ext.create(this.deleteRequestClassName, {
			primaryColumnValues: [this.get(this.primaryColumnName)]
		});
		request.execute(function(response) {
			callback.call(scope, response);
		}, this);
	}

});

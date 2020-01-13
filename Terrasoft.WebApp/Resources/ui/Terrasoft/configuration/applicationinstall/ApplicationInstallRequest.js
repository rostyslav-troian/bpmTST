/**
 * Request class for application installation service call.
 */
Ext.define("Terrasoft.core.configuration.applicationinstall.ApplicationInstallRequest", {
	alternateClassName: "Terrasoft.ApplicationInstallRequest",
    extend: "Terrasoft.BaseCoreRequest",

	/**
	 * @inheritdoc Terrasoft.core.BaseCoreRequest#serviceName
	 * @override
	 */
	serviceName: "AppInstallerService.svc",

	/**
	 * @inheritdoc Terrasoft.core.BaseCoreRequest#requestTimeout
	 * @override
	 */
	requestTimeout: 1 * 60 * 60 * 1000,

    /**
	 * Name of uploaded package file to install.
	 * @property {String}
	 */
	fileName: null,

	/**
	 * Returns serialized representation of request data.
	 * @returns Any
	 */
	serialize: function() {
		return "\"$1\"".replace("$1", this.fileName);
	}
});
Terrasoft.configuration.Structures["FileImportServiceRequest"] = {innerHierarchyStack: ["FileImportServiceRequest"]};
define("FileImportServiceRequest", ["ConfigurationServiceRequest"], function() {
	Ext.define("Terrasoft.configuration.fileImport.FileImportServiceRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.FileImportServiceRequest",

		/**
		 * Import session identifier.
		 * @type {String}
		 */
		importSessionId: "",

		/**
		 * File import columns.
		 * @type {Array}
		 */
		columns: null,

		/**
		 * Import object.
		 * @type {Object}
		 */
		importObject: null,

		/**
		 * Import file name.
		 * @type {String}
		 */
		fileName: "",

		/**
		 * @inheritdoc Terrasoft.ConfigurationServiceRequest#serviceName
		 * @overridden
		 */
		serviceName: "FileImportService",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			var request = serializableObject.request = serializableObject.request || {};
			if (this.importSessionId) {
				request.importSessionId = this.importSessionId;
			}
			if (this.columns) {
				request.columns = this.columns;
			}
			if (this.importObject) {
				request.importObject = this.importObject;
			}
			if (this.fileName) {
				request.fileName = this.fileName;
			}
		}
	});
});



/**
 * Utility class for working with files.
 */
Ext.define("Terrasoft.core.FileHelper", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.FileHelper",
	singleton: true,

	/**
	 * Forbidden characters regular pattern of the file name.
	 * @protected
	 * @type {Array}
	 */
	fileNameForbiddenSymbols: [
		"[?\\/:*\"'<>|+\s.%@&()#\]\[;,]",
		"[^0-9a-z\u00c0-\u017e\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFCа-я]"
	],

	/**
	 * Maximum length characters of the file name.
	 * @protected
	 * @type {Number}
	 */
	maxFileNameLength: 60,

	/**
  * Sending a request to upload a file to the server
  * @private
  * @param {Terrasoft.BaseQuery} query the query parameters
  * @param {String} fieldName Name of the Blob field, where the file is placed
  * @param {Object} file An object that describes a file in a browser
  * @param {Function} callback function that will be called when a response from the server is received
  * @param {Object} scope The context in which the callback function is called
  */
	executeUploadQuery: function(query, fieldName, file, callback, scope) {
		var fileToFieldCollection = {};
		fileToFieldCollection[fieldName] = file.name;
		// CR204820 ##### FileHelper: ############## DataProvider # ServiceProvider ##### #######,
		// ##### ##### executeUploadQuery ## ########### ## ######### ######
		var serverMethod = Terrasoft.DataProvider.dataServiceMethods[query.operationType];
		var requestConfig = Terrasoft.ServiceProvider.buildRequest(serverMethod, query, callback, scope);
		var url = Terrasoft.ServiceProvider.getRequestUrl("UploadFile");
		var csrfToken = Ext.util.Cookies.get("BPMCSRF");
		FileAPI.upload({
			url: url,
			data: {
				queryData: requestConfig.jsonData,
				operationType: query.operationType,
				fileToFieldData: Terrasoft.encode(fileToFieldCollection)
			},
			headers: {"BPMCSRF": csrfToken || ""},
			files: { file: file },
			filecomplete: function(error, xhr) {
				requestConfig.callback.call(Terrasoft.ServiceProvider, null, !error, xhr);
			}
		});
	},

	/**
	 * Loads file on server.
	 * @param {Terrasoft.QueryOperationType} queryType Query type for loading file.
	 * @param {Object} data Query parameters.
	 * @param {Function} callback Callback method.
	 * @param {Object} scope Callback method context.
	 */
	uploadFile: function(queryType, data, callback, scope) {
		var fieldName = data.fileFieldName;
		var parameters = data.parameters;
		var queryClassName = (queryType === Terrasoft.QueryOperationType.INSERT) ? "InsertQuery" : "UpdateQuery";
		var query = Ext.create("Terrasoft." + queryClassName, {
			rootSchemaName: data.entityName
		});
		if (queryType !== Terrasoft.QueryOperationType.INSERT) {
			query.enablePrimaryColumnFilter(data.id);
		}
		Terrasoft.each(parameters, function(parameter, name) {
			query.setParameterValue(name, parameter.value, parameter.type);
		}, this);
		query.setParameterValue(fieldName, null, Terrasoft.DataValueType.BLOB);
		this.executeUploadQuery(query, fieldName, data.file, callback, scope);
	},

	/**
	 * Removes forbidden characters from file name.
	 * @param {String} fileNameWithoutExtension File name without extension suffix.
	 * @return {String} File name without forbidden characters.
	 */
	stripFileName: function(fileNameWithoutExtension) {
		const fileNamePattern = new RegExp(this.fileNameForbiddenSymbols.join("|"), "gi");
		fileNameWithoutExtension = fileNameWithoutExtension.replace(fileNamePattern, "_");
		fileNameWithoutExtension = fileNameWithoutExtension.replace(/_{2,}/g, "_");
		fileNameWithoutExtension = fileNameWithoutExtension.slice(0, this.maxFileNameLength);
		return fileNameWithoutExtension.toLowerCase();
	}
});

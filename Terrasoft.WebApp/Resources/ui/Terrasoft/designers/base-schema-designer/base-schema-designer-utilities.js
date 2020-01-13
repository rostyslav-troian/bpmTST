/**
 */
Ext.define("Terrasoft.Designers.BaseSchemaDesignerUtilities", {

	extend: "Terrasoft.BaseObject",

	alternateClassName: "Terrasoft.BaseSchemaDesignerUtilities",

	singleton: true,

	//region Constants: Public

	/**
	 * Schema export metadata url template.
	 * @type {String}
	 */
	EXPORT_SCHEMA_METADATA_URL_TEMPLATE: "/ServiceModel/SchemaManagerService.svc/Export?managerName={0}&schemaUId={1}",

	/**
	 * Schema metadata url template.
	 * @type {String}
	 */
	SCHEMA_METADATA_URL_TEMPLATE: "/SchemaMetaData.aspx?schemaId={0}&schemaName={1}&packageUId={2}&manager={3}",

	/**
	 * Old UI window open params template.
	 * @type {String}
	 */
	WINDOW_PARAMS_TEMPLATE: "resizable,width={0},height={1},left={2},top={3}",

	/**
	 * Schema source code url template.
	 * @type {String}
	 */
	SCHEMA_SOURCECODE_URL_TEMPLATE: "/SchemaSource.aspx?schemaName={0}&key={1}_SchemaSource&line=-1&column=-1",

	/**
	 * Compilation errors url.
	 * @type {String}
	 */
	COMPILATION_ERRORS_URL: "/CompilationErrors.aspx",

	//endregion

	//region Methods: Private

	/**
	 * Returns schema source code file name.
	 * @private
	 * @param {String} schemaName Schema name.
	 * @param {String} packageName Schema package name.
	 * @return {String} Source code file name.
	 */
	getSourceCodeFileName: function(schemaName, packageName) {
		return schemaName + "." + packageName + ".cs";
	},

	/**
	 * Initializes WebSocket channel.
	 * @private
	 */
	initWebSocket: function() {
		var channel = Terrasoft.ServerChannel;
		var connectionState = channel.getConnectionState();
		if (connectionState === Terrasoft.SocketConnectionState.CLOSED) {
			channel.reconnectCount = 0;
			channel.init();
		}
	},

	/**
	 * Opens old user interface resizable blank window.
	 * @param {String} url URL.
	 * @private
	 */
	openOldUIBlankWindow: function(url) {
		var width = 810;
		var height = 600;
		var left = screen.availLeft + (screen.availWidth - width) / 2;
		var top = screen.availTop + (screen.availHeight - height) / 2;
		var windowParams = Ext.String.format(this.WINDOW_PARAMS_TEMPLATE,
			width, height, left, top);
		window.open(url, "_blank", windowParams);
	},

	//endregion

	//region Methods: Public

	/**
	 * Opens schema metadata.
	 * @param {Terrasoft.manager.BaseSchema} schema Schema.
	 */
	openMetaData: function(schema) {
		var hash = Ext.String.format(this.SCHEMA_METADATA_URL_TEMPLATE, schema.uId, schema.name,
			schema.packageUId, schema.managerName);
		var url = Terrasoft.workspaceBaseUrl + hash;
		this.openOldUIBlankWindow(url);
	},

	/**
	 * Exports schema metadata.
	 * @param {Terrasoft.manager.BaseSchema} schema Schema.
	 */
	exportMetaData: function (schema) {
		var hash = Ext.String.format(this.EXPORT_SCHEMA_METADATA_URL_TEMPLATE, schema.managerName, schema.uId);
		var href = Terrasoft.workspaceBaseUrl + hash;
		var fileName = schema.name + ".md";
		Terrasoft.download(href, fileName);
	},

	/**
	 * Opens schema source code.
	 * @param {Terrasoft.manager.BaseSchema} schema Schema.
	 */
	openSourceCode: function(schema) {
		this.loadSysPackageByUId(schema.packageUId, function(sysPackage) {
			var fileName = this.getSourceCodeFileName(schema.name, sysPackage && sysPackage.get("Name"));
			var hash = Ext.String.format(this.SCHEMA_SOURCECODE_URL_TEMPLATE, fileName, schema.uId);
			var url = Terrasoft.workspaceBaseUrl + hash;
			this.openOldUIBlankWindow(url);
		}, this);
	},

	/**
	 * Opens entity schema source code.
	 * @param {Terrasoft.manager.BaseSchema} schema Schema.
	 */
	openEntitySourceCode: function(schema) {
		this.loadSysPackageByUId(schema.packageUId, function(sysPackage) {
			const schemaName = schema.ownerSchemaName;
			const fileName = this.getSourceCodeFileName(schemaName, sysPackage && sysPackage.get("Name"));
			const hash = Ext.String.format(this.SCHEMA_SOURCECODE_URL_TEMPLATE, fileName, schema.realUId);
			const url = Terrasoft.workspaceBaseUrl + hash;
			this.openOldUIBlankWindow(url);
		}, this);
	},

	/**
	 * Opens compilation errors.
	 */
	openCompilationErrors: function() {
		var url = Terrasoft.workspaceBaseUrl + this.COMPILATION_ERRORS_URL;
		this.openOldUIBlankWindow(url);
	},

	/**
	 * Publish current workspace.
	 * @param {Terrasoft.configuration.ProcessModuleUtilities} serviceHelper Service helper.
	 * @param {Function} [callback] (optional) The callback function.
	 * @param {Object} [scope] (optional) Execution context.
	 */
	publish: function(serviceHelper, callback, scope) {
		scope = scope || this;
		var maskId = Terrasoft.Mask.show({
			caption: Terrasoft.Resources.SchemaDesigner.PublishingMaskCaption,
			timeout: 0
		});
		serviceHelper.publish(function(request, success, response) {
			serviceHelper.pingApplication(function() {
				Terrasoft.Mask.hide(maskId);
				var responseData = Ext.decode(Ext.decode(response.responseText));
				if (responseData && !responseData.success) {
					this.openCompilationErrors();
				} else {
					Ext.callback(callback, scope);
					serviceHelper.responseCallback(request, success, response);
				}
				if (success) {
					this.initWebSocket(success);
				}
			}, this);
		}, this);
	},

	/**
	 * Opens academy online help in new window.
	 * @param {Terrasoft.configuration.AcademyUtilities} academyHelper Academy helper.
	 * @param {String} helpCode Context help code.
	 */
	openHelp: function(academyHelper, helpCode) {
		var config = {
			contextHelpCode: helpCode,
			callback: function(url) {
				window.open(url);
			},
			scope: this
		};
		academyHelper.getUrl(config);
	},

	/**
	 * Loads SysPackage info by UId for current workspace.
	 * @param {String} packageUId Package unique identifier.
	 * @param {Function} callback Callback function.
	 * @param {Object} callback.sysPackage Package view model object (Id, UId, Name, Maintainer, InstallType).
	 * @param {String} callback.errorMessage Server query error message.
	 * @param {Object} scope Callback function context.
	 */
	loadSysPackageByUId: function(packageUId, callback, scope) {
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: "SysPackage",
			clientESQCacheParameters: {
				cacheItemName: packageUId + "-SysPackageName"
			}
		});
		esq.addColumn("Id");
		esq.addColumn("UId");
		esq.addColumn("Name");
		esq.addColumn("Maintainer");
		esq.addColumn("InstallType");
		esq.filters.add("UId", Terrasoft.createColumnFilterWithParameter(
			Terrasoft.ComparisonType.EQUAL, "UId", packageUId));
		esq.filters.add("SysWorkspace", Terrasoft.createColumnFilterWithParameter(
			Terrasoft.ComparisonType.EQUAL, "SysWorkspace", Terrasoft.SysValue.CURRENT_WORKSPACE.value));
		esq.getEntityCollection(function(response) {
			if (response.success) {
				var sysPackage = response.collection.first();
				callback.call(scope, sysPackage);
			} else {
				callback.call(scope, null, response.errorInfo.message);
			}
		}, this);
	},

	/**
	 * Gets the number of running process instances with specified schema identifier.
	 * @param {String} schemaUId UId of the schema.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Context of the callback function.
	 */
	getRunningProcessCountBySysSchemaUId: function(schemaUId, callback, scope) {
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: "SysProcessData"
		});
		esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "Count");
		var filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
			"[VwSysSchemaInWorkspace:Id:SysSchemaId].UId", schemaUId);
		esq.filters.addItem(filter);
		filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
			"[VwSysSchemaInWorkspace:Id:SysSchemaId].SysWorkspace.Id", Terrasoft.SysValue.CURRENT_WORKSPACE.value);
		esq.filters.addItem(filter);
		esq.getEntityCollection(function(response) {
			if (response.success) {
				var collection = response.collection;
				var result = collection.first();
				result = result.get("Count");
				callback.call(scope, result);
			} else {
				var errorInfo = response.errorInfo;
				callback.call(scope, null, errorInfo.message);
			}
		}, scope);
	},

	/**
	 * Determines whether the specified package was created by a third-party publisher or imported from an archive file.
	 * @param {String} packageUId UId of the package.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	getIsPackageForeign: function(packageUId, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.loadSysPackageByUId(packageUId, next, this);
			},
			function(next, sysPackage, errorMessage) {
				if (errorMessage) {
					callback.call(scope, null, errorMessage);
					return;
				}
				var isPackageForeign = false;
				if (sysPackage) {
					var maintainer = sysPackage.get("Maintainer");
					var installType = sysPackage.get("InstallType");
					isPackageForeign = maintainer !== Terrasoft.SysValue.CURRENT_MAINTAINER.value ||
						installType !== Terrasoft.SysPackageInstallType.SourceControl;
				}
				callback.call(scope, {
					isPackageForeign: isPackageForeign,
					sysPackage: sysPackage
				});
			}, this
		);
	}

	//endregion

});

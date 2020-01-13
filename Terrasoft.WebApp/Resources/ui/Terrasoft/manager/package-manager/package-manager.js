/**
 */
Ext.define("Terrasoft.manager.PackageManager", {
	extend: "Terrasoft.ObjectManager",
	alternateClassName: "Terrasoft.PackageManager",
	singleton: true,

	// region Constants: Public

	CUSTOM_PACKAGE_NAME: "Custom",

	// endregion

	// region Properties: Private

	currentPackageUId: null,

	// endregion

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ObjectManager#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.PackageManagerItem",

	/**
	 * @inheritdoc Terrasoft.ObjectManager#entitySchemaName
	 * @override
	 */
	entitySchemaName: "SysPackage",

	/**
	 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
	 * @override
	 */
	propertyColumnNames: {
		id: "Id",
		uId: "UId",
		caption: "Caption",
		name: "Name"
	},

	// endregion

	// region Methods: Public

	/**
	 * Gets UId of the custom package.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.packageUId Package identifier.
	 * @param {Object} scope The scope of callback function.
	 */
	getCustomPackageUId: function(callback, scope) {
		Terrasoft.SysSettings.querySysSettingsItem("CustomPackageUId", function(customPackage) {
			var packageUId = customPackage ? customPackage.value : Terrasoft.GUID_EMPTY;
			callback.call(scope, packageUId);
		}, this);
	},

	/**
	 * Gets current package identifier. If package is empty return custom package identifier.
	 * @param {Function} callback The callback function.
	 * @param {String} callback.packageUId Package identifier.
	 * @param {Object} scope The scope of callback function.
	 */
	getCurrentPackageUId: function(callback, scope) {
		if (this.currentPackageUId) {
			callback.call(scope, this.currentPackageUId);
			return;
		}
		Terrasoft.SchemaDesignerUtilities.getCurrentPackageUId(function(currentPackageUId) {
			this.currentPackageUId = currentPackageUId;
			callback.call(scope, currentPackageUId);
		}, this);
	},

	/**
	 * Returns package info.
	 * @param {Array} packageUIds List of packages uids.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Context of callback function.
	 * @return {Object} Map of UId and Name.
	 *     Example {"895da111-5683-46e5-b511-160b1525ae9e": "PackageName"}
	 */
	getPackageInfo: function(packageUIds, callback, scope) {
		if (Ext.isEmpty(packageUIds)) {
			throw Terrasoft.NullOrEmptyException("packageUIds");
		}
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: "SysPackage"
		});
		esq.addColumn("UId");
		esq.addColumn("Name");
		esq.filters.addItem(Terrasoft.createColumnInFilterWithParameters("UId", packageUIds));
		esq.getEntityCollection(function(response) {
			var result = {};
			if (response.success) {
				response.collection.each(function(item) {
					result[item.$UId] = item.$Name;
				});
			}
			Ext.callback(callback, scope, [result]);
		}, this);

	}

	// endregion

});

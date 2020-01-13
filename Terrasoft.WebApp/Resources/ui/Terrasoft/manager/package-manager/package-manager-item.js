/**
 */
Ext.define("Terrasoft.manager.PackageManagerItem", {
	extend: "Terrasoft.BaseManagerItem",
	alternateClassName: "Terrasoft.PackageManagerItem",

	// region Properties: Private

	/**
	 * Name.
	 * @private
	 * @type {String}
	 */
	name: null,

	/**
	 * Unique identifier.
	 * @private
	 * @type {String}
	 */
	uId: null,

	/**
	 * Caption.
	 * @private
	 * @type {String}
	 */
	caption: null,

	/**
	 * Entity of the package.
	 * @private
	 * @type {Object}
	 */
	sysPackageEntity: null

	// endregion

});

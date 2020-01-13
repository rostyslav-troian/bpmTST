Terrasoft.configuration.Structures["PackageUtilities"] = {innerHierarchyStack: ["PackageUtilities"]};
define("PackageUtilities", ["PackageUtilitiesResources"], function(resources) {

		/**
		 * @class Terrasoft.configuration.mixins.PackageUtilities
		 * ######, ########### ###### # ########.
		 */
		Ext.define("Terrasoft.configuration.mixins.PackageUtilities", {
			alternateClassName: "Terrasoft.PackageUtilities",

			/**
			 * ########## ############# ######.
			 * @private
			 * @type {String}
			 */
			packageUId: null,

			/**
			 * ########## ######## ################ ######.
			 * @protected
			 * @virtual
			 * @param {String} name ######## ################ ######.
			 * @return {String} ######## ################ ######.
			 */
			getLocalizableStringValue: function(name) {
				return resources.localizableStrings[name];
			},

			/**
			 * ############## ######.
			 * @obsolete
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			init: function(callback, scope) {
				Terrasoft.chain(
					this.initPackageUId,
					function(next, result) {
						callback.call(scope, result);
					},
					this
				);
			},

			/**
			 * ########## ###### ### ######### UId ######.
			 * @obsolete
			 * @param {String} packageId ############# ######### #########.
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			getSysPackageUId: function(packageId, callback, scope) {
				if (Ext.isEmpty(packageId) || Terrasoft.isEmptyGUID(packageId)) {
					callback.call(scope, null);
				}
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysPackage"
				});
				entitySchemaQuery.addColumn("UId");
				entitySchemaQuery.getEntity(packageId, function(result) {
					var resultUId = null;
					if (result.success && result.entity) {
						resultUId = result.entity.get("UId");
					}
					callback.call(scope, resultUId);
				}, this);
			},

			/**
			 * ########## ########## ############# ######.
			 * @protected
			 * @virtual
			 * @return ########## ############# ######.
			 */
			getPackageUId: function() {
				return this.packageUId;
			},

			/**
			 * ######### ######## ########### ############## ######.
			 * @obsolete
			 * @protected
			 * @overridden
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			initPackageUId: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						Terrasoft.PackageManager.getCurrentPackageUId(next, this);
					},
					function(next, packageUId) {
						this.packageUId = packageUId;
						Terrasoft.SchemaDesignerUtilities.getAvailablePackages(function(availablePackages) {
							var result = {
								success: true
							};
							if (!availablePackages[this.packageUId]) {
								var availablePackagesUIds = Ext.Object.getKeys(availablePackages);
								if (availablePackagesUIds.length > 0) {
									this.packageUId = availablePackagesUIds[0];
									var packageName = availablePackages[this.packageUId];
									result.message =
										Ext.String.format(this.getLocalizableStringValue("SetPackageNameInfo"),
											packageName);
								}
							}
							result.packageUId = this.packageUId;
							next(result);
						}, this);
					},
					function(next, result) {
						if (!this.packageUId || (Terrasoft.isEmptyGUID(this.packageUId))) {
							result.success = false;
							result.message = this.getLocalizableStringValue("CurrentPackageNotFound");
						}
						next(result);
					},
					function(next, result) {
						callback.call(scope, result);
					},
					this
				);
			},

			/**
			 * ######### ######## ########### ############## ###### ############### ################## ######.
			 * @protected
			 * @overridden
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			initCurrentPackageUId: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						Terrasoft.SchemaDesignerUtilities.getCurrentPackageUId(function(packageUId) {
							this.packageUId = packageUId;
							var result = {
								success: true,
								packageUId: this.packageUId
							};
							next(result);
						}, this);
					},
					function(next, result) {
						if (!this.packageUId || (Terrasoft.isEmptyGUID(this.packageUId))) {
							result.success = false;
							result.message = this.getLocalizableStringValue("CurrentPackageNotFound");
						}
						next(result);
					},
					function(next, result) {
						callback.call(scope, result);
					},
					this
				);
			}

		});

	});



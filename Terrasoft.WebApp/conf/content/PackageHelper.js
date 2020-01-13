Terrasoft.configuration.Structures["PackageHelper"] = {innerHierarchyStack: ["PackageHelper"]};
define("PackageHelper", ['ext-base', 'terrasoft', 'PackageHelperResources', 'SysPackage'],
		function(Ext, Terrasoft, resources, SysPackage) {

			/**
			 * ############ ######## ####### ############## ######
			 * @param {String} packageUId ########## ############# ######
			 * @param {Function} callback ####### ######### ######
			 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
			 * @return {Boolean} ######### ######## ####### ############## ######
			 */
			function getIsPackageInstalled(packageUId, callback, scope) {
				scope = scope || this;
				var select = Ext.create('Terrasoft.EntitySchemaQuery', {
					rootSchemaName: 'SysPackage'
				});
				var columnAlias = 'RecordsCount';
				select.addAggregationSchemaColumn('Id', Terrasoft.AggregationType.COUNT, columnAlias);
				select.filters.add('packageUId', Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, 'UId', packageUId));
				select.getEntityCollection(function(responce) {
					var isInstalled = false;
					if (responce.success) {
						var resultItem = responce.collection.getByIndex(0);
						if (resultItemValue = parseInt(resultItem.get(columnAlias))) {
							isInstalled = resultItemValue > 0;
						}
					}
					callback.call(scope, isInstalled);
				});
			}

			return {
				getIsPackageInstalled: getIsPackageInstalled
			};
		}
);



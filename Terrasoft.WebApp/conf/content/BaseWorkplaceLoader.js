Terrasoft.configuration.Structures["BaseWorkplaceLoader"] = {innerHierarchyStack: ["BaseWorkplaceLoader"]};
/**
 * Module for BaseWorkplaceLoader.
 */
define("BaseWorkplaceLoader", ["BaseWorkplaceLoaderResources", "sandbox", "SchemaBuilderV2", "MiniPageListener"
], function(resources, sandbox) {

	/**
	 * @private
	 */
	function hasModule(workplaceModules, sectionItem) {
		var has = false;
		if (workplaceModules && sectionItem) {
			Terrasoft.each(workplaceModules, function(item) {
				if (item.sectionName === sectionItem.sectionSchema ||
					item.sectionName === sectionItem.sectionModule) {
					has = true;
					return false;
				}
			}, this);
		}
		return has;
	}

	/**
	 * @private
	 */
	function setModulePosition(workplaceModules, sectionItem) {
		if (workplaceModules && sectionItem) {
			Terrasoft.each(workplaceModules, function(item) {
				if (item.sectionName === sectionItem.sectionSchema ||
					item.sectionName === sectionItem.sectionModule) {
					sectionItem.position = item.position;
					return false;
				}
			}, this);
		}
	}

	/**
	 * @private
	 */
	function resetMenuByWorkplaceId(workplace) {
		var structure = Terrasoft.configuration.ModuleStructure;
		if (structure) {
			Terrasoft.each(structure, function(item) {
				if (hasModule(workplace.modules, item)) {
					item.hide = "false";
					setModulePosition(workplace.modules, item);
				} else {
					item.hide = "true";
				}
			}, this);
		}
	}

	/**
	 * @private
	 */
	function hasSchemaDescriptor(schemaName) {
		const descriptors = Terrasoft.configuration.RootSchemaDescriptors;
		return descriptors ? descriptors.hasOwnProperty(schemaName) : true;
	}

	/**
	 * @private
	 */
	function warmUpSections() {
		var schemaNames = [];
		Terrasoft.each(Terrasoft.configuration.ModuleStructure, function(module) {
			const schemaName = module.sectionSchema;
			if (schemaName && !JSON.parse(module.hide) && hasSchemaDescriptor(schemaName)) {
				schemaNames.push(schemaName);
			}
		});
		Terrasoft.eachAsync(schemaNames, function(schemaName, next) {
			Terrasoft.defer(function() {
				var schemaBuilder = Ext.create("Terrasoft.SchemaBuilder");
				schemaBuilder.build({
					schemaName: schemaName,
					profileKey: schemaName + "GridSettingsGridDataView"
				}, next, this);
			}, this);
		}, Terrasoft.emptyFn, this);
	}

	/**
	 * @private
	 */
	function warmUpMiniPages() {
		var schemaNames = [];
		Terrasoft.each(Terrasoft.configuration.ModuleStructure, function(module) {
			const schemaName = module.miniPageSchema;
			if (schemaName && !JSON.parse(module.hide) && hasSchemaDescriptor(schemaName)) {
				schemaNames.push(module.miniPageSchema);
			}
		});
		Terrasoft.eachAsync(schemaNames, function(schemaName, next) {
			Terrasoft.defer(function() {
				var schemaBuilder = Ext.create("Terrasoft.SchemaBuilder");
				schemaBuilder.build({schemaName: schemaName}, next, this);
			}, this);
		}, Terrasoft.emptyFn, this);
	}

	/**
	 * @private
	 */
	function load(args) {
		resetMenuByWorkplaceId(args);
		var sectionMenuConfig = {
			modules: args.modules
		};
		sandbox.publish("PostSectionMenuConfig", sectionMenuConfig, ["SectionMenuModuleId"]);
		sandbox.subscribe("GetSectionMenuInfo", function(moduleId) {
			sandbox.publish("PostSectionMenuConfig", sectionMenuConfig, [moduleId]);
		});
	}

	/**
	 * @private
	 */
	function init() {
		var args = sandbox.publish("GetWorkplaceInfo");
		load(args);
		if (Terrasoft.Features.getIsEnabled("DisableWarmUpSections")) {
			return;
		}
		Terrasoft.delay(function() {
			warmUpSections();
		}, this, 2000);
	}

	return {
		init: init,
		load: load
	};
});



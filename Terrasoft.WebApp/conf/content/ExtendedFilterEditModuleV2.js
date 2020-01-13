Terrasoft.configuration.Structures["ExtendedFilterEditModuleV2"] = {innerHierarchyStack: ["ExtendedFilterEditModuleV2"]};
define("ExtendedFilterEditModuleV2", ["ext-base", "terrasoft", "sandbox", "ExtendedFilterEditModuleV2Resources",
	"ExtendedFilterEditModelV2", "ExtendedFilterEditViewV2"],
	function(Ext, Terrasoft, sandbox, resources, ExtendedFilterEditModel, ExtendedFilterEditView) {

		var viewModel;
		var entitySchemaProvider;
		var filterManager;
		var isProviderInitialized = false;
		var isInitialized = false;
		var sectionCaption = "";
		var schema = sandbox.publish("GetModuleSchema", null, [sandbox.id]);
		var schemaName = schema ? schema.name : sandbox.publish("GetSectionSchemaName", null, [sandbox.id]);
		var extendedFilterViewId = "ExtendedFilterEditViewV2";
		var extendedFilterViewModelId = "ExtendedFilterEditModelV2";
		var isCustomFilter = false;
		var isHeaderVisible = true;
		var currentFolder = null;

		function init() {
			registerMessages();
			var state = sandbox.publish("GetHistoryState");
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId === sandbox.id) {
				return;
			}
			isHeaderVisible = (currentHash.moduleName !== "FolderManager");
		}

		function registerMessages() {
			sandbox.registerMessages({
				/**
				 * @message UpdateFavoritesMenu
				 * Update favorites menu message.
				 */
				"UpdateFavoritesMenu": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetEntitySchemaFilterProviderModuleName
				 * Message for publishing EntitySchemaFilterProviderModule class name
				 */
				"GetEntitySchemaFilterProviderModuleName": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/*
				 * @message GetFolderEntitiesNames
				 * Get folder entities names.
				 */
				"GetFolderEntitiesNames": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			});
		}

		function destroy(config) {
			if (config.keepAlive) {
				return;
			}
			entitySchemaProvider.destroy();
			entitySchemaProvider = null;
			filterManager = null;
			requirejs.undef(this.entitySchemaFilterProviderModule);
		}

		function _setFiltersExpressions(filter, sectionFilterValue) {
			if (sectionFilterValue && Terrasoft.isGUID(sectionFilterValue.value)) {
				filterManager.setRightExpressionsValues(filter, [{
					value: Terrasoft.getRightExpressionValue(filter),
					displayValue: sectionFilterValue.displayValue}
				]);
			}
		}

		function _setFiltersAttribute(filters, filterConfig) {
			if (!Ext.isArray(filters)) {
				return;
			}
			Terrasoft.each(filters, function(filter) {
				if (filterConfig.sectionFilterValue && filter && filter.leftExpression) {
					var sectionFilterValue = filterConfig.sectionFilterValue[filter.leftExpression.columnPath];
					_setFiltersExpressions(filter, sectionFilterValue);
				}
			});
		}

		function initializeProvider(renderTo) {
			var filterConfig = sandbox.publish("GetExtendedFilter", null, [sandbox.id]);
			var filter = filterConfig.filter;
			if (!Ext.isEmpty(filter)) {
				if (filter.extendedFilterViewId) {
					extendedFilterViewId = filter.extendedFilterViewId;
					isCustomFilter = true;
				}
				if (filter.extendedFilterViewModelId) {
					extendedFilterViewModelId = filter.extendedFilterViewModelId;
					isCustomFilter = true;
				}
			}
			currentFolder = filterConfig.folder;
			this.entitySchemaFilterProviderModule = sandbox.publish("GetEntitySchemaFilterProviderModuleName",
					null, [sandbox.id]);
			var map = {};
			map.EntitySchemaFilterProviderModule = {
				sandbox: "sandbox_" + sandbox.id,
				"ext-base": "ext_" + Ext.id
			};
			requirejs.config({
				map: map
			});
			var entitySchemaName = Ext.isEmpty(filter) ? schemaName : filter.rootSchemaName || schemaName;
			require([this.entitySchemaFilterProviderModule], function(EntitySchemaFilterProviderModule) {
						entitySchemaProvider = new EntitySchemaFilterProviderModule({
							rootSchemaName: entitySchemaName,
							sandbox: sandbox
						});
						filterManager = Ext.create("Terrasoft.FilterManager", {
							provider: entitySchemaProvider,
							rootSchemaName: entitySchemaName
						});
						filterManager.setFilters(filter || Ext.create("Terrasoft.FilterGroup"));
						if (Terrasoft.Features.getIsEnabled("UseNewLookupComparison")) {
							var customFilters = filter && filter.getItems();
							_setFiltersAttribute(customFilters, filterConfig);
						}
						var moduleStructure = Terrasoft.configuration.ModuleStructure;
						var sectionStructure = moduleStructure[schemaName];
						if (sectionStructure) {
							sectionCaption = sectionStructure.moduleCaption;
						}
						isProviderInitialized = true;
						render(renderTo);
					}
			);
		}

		function createFilterEditContainer(renderTo) {
			var view = ExtendedFilterEditView.generateView(renderTo);
			var filterEditContainer = Ext.create("Terrasoft.Container", view);
			filterEditContainer.bind(viewModel);
		}

		function render(renderTo) {
			if (!isProviderInitialized) {
				initializeProvider(renderTo);
				return;
			}
			entitySchemaProvider.renderTo = renderTo;
			if (isInitialized) {
				createFilterEditContainer(renderTo);
				return;
			}
			var folderEntitiesNames = sandbox.publish("GetFolderEntitiesNames", null, [sandbox.id]);
			require([extendedFilterViewId, extendedFilterViewModelId],
				function(filterView, filterViewModel) {
					ExtendedFilterEditView = filterView;
					ExtendedFilterEditModel = filterViewModel;
					viewModel = ExtendedFilterEditModel.generateModel(sandbox, renderTo);
					viewModel = Ext.create("Terrasoft.BaseViewModel", viewModel);
					viewModel.set("FilterManager", filterManager);
					viewModel.set("EntitySchemaName", Ext.String.format("{0} {1}",
						resources.localizableStrings.ExtendedFilterSettingsCaption, sectionCaption));
					viewModel.set("isHeaderVisible", isHeaderVisible);
					//viewModel.set("currentFolderName", currentFolderName);
					if (isCustomFilter) {
						viewModel.set("sectionEntitySchemaName", schemaName);
						viewModel.assignEntitySchema(filterManager.filters, true);
					}
					viewModel.initActionFired();
					viewModel.set("activeFolder", currentFolder);
					viewModel.set("folderEntityName", folderEntitiesNames && folderEntitiesNames.folderSchemaName);
					createFilterEditContainer(renderTo);
					sandbox.publish("ChangeGridUtilitiesContainerSize");
					isInitialized = true;
				}
			);
		}

		return {
			init: init,
			render: render,
			destroy: destroy
		};
	});



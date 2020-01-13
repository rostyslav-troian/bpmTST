Terrasoft.configuration.Structures["LookupSection"] = {innerHierarchyStack: ["LookupSection"], structureParent: "BaseSectionV2"};
define('LookupSectionStructure', ['LookupSectionResources'], function(resources) {return {schemaUId:'c4f3f339-d146-40ca-8166-1b4613764020',schemaCaption: "Section page schema - Lookup", parentSchemaName: "BaseSectionV2", schemaName:'LookupSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LookupSection", ["ConfigurationEnums", "LookupSectionGridRowViewModel"],
function(ConfigurationEnums) {
	return {
		entitySchemaName: "Lookup",
		messages: {
			/**
			 * @message GetExtendedFilterConfig
			 * Generates config for quick filters.
			 */
			"GetExtendedFilterConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * ######## ######## ###### ## ####### ###### #### # ############ ### ############# ######
			 */
			SecurityOperationName: {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanManageLookups"
			},

			/**
			 * ########## ############# ########### #######.
			 */
			ContextHelpId: {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "271"
			}
		},
		methods: {

			/**
			 * @param {Object} viewModel
			 * @param {Object} currentFolder
			 * @private
			 */
			_onCurrentFolderChanged: function(viewModel, currentFolder) {
				this.set("activeFolderId", currentFolder && currentFolder.value);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#isMergeVisible
			 * @override
			 */
			isMergeVisible: function () {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @override
			 */
			init: function() {
				this.subscribeOnColumnChange("CurrentFolder", this._onCurrentFolderChanged, this);
				this.callParent(arguments);
				this.set("UseTagModule", false);
				this.set("UseStaticFolders", true);
				this.set("TagButtonVisible", false);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObjectV2#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.unsubscribeOnColumnChange("CurrentFolder", this._onCurrentFolderChanged, this);
				this.callParent(arguments);
			},

			/**
			 * ######### ###### ########### # #######.
			 * @protected
			 * @param {Object} config ############ ############## ######.
			 */
			openSectionInChain: function(config) {
				this.showBodyMask();
				this.saveCardScroll();
				this.scrollCardTop();
				const schemaName = config.schemaName || "BaseLookupConfigurationSection";
				const newHash = Terrasoft.combinePath("LookupSectionModule", schemaName);
				this.sandbox.publish("PushHistoryState", {
					hash: newHash,
					silent: true,
					stateObj: {
						caption: config.caption,
						entitySchemaName: config.entitySchemaName
					}
				});
				this.sandbox.loadModule("LookupSectionModule", {
					renderTo: this.renderTo,
					id: config.moduleId,
					keepAlive: true
				});
			},

			/**
			 * ######### ######### ########### # ###### ##########.
			 * @protected
			 * @param {String} sysLookup ########## ############# ########### # ###### ##########.
			 */
			openOldLookupConfiguration: function(sysLookup) {
				const sysLookupValue = (sysLookup && sysLookup.value) || sysLookup;
				const entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "SysLookup"});
				entitySchemaQuery.addColumn("Id");
				entitySchemaQuery.addColumn("SysEditPageSchemaUId");
				entitySchemaQuery.addColumn("SysEntitySchemaUId");
				entitySchemaQuery.addColumn("SysGridPageSchemaUId");
				entitySchemaQuery.getEntity(sysLookupValue, function(result) {
					if (result.success) {
						const entity = result.entity;
						const sysGridPageSchemaUId = entity.get("SysGridPageSchemaUId");
						const parameters = {
							editMode: "true"
						};
						if (!Ext.isEmpty(sysGridPageSchemaUId)) {
							Ext.apply(parameters, {Id: sysGridPageSchemaUId});
						} else {
							const sysEditPageSchemaUId = entity.get("SysEntitySchemaUId");
							Ext.apply(parameters, {
								Id: "33cc4a3a-babb-464d-82a0-1b904d198d31",
								schemaUId: sysEditPageSchemaUId
							});
						}
						const parameterString = [];
						Terrasoft.each(parameters, function(parameterValue, parameterName) {
							parameterString.push(Ext.String.format("{0}={1}", parameterName, parameterValue));
						}, this);
						const url = this.Terrasoft.workspaceBaseUrl + "/ViewPage.aspx?" + parameterString.join("&");
						const width = 600;
						const height = 400;
						const left = screen.availLeft + (screen.availWidth - width) / 2;
						const top = screen.availTop + (screen.availHeight - height) / 2;
						const windowParams = Ext.String.format("resizable,width={0},height={1},left={2},top={3}",
							width, height, left, top);
						window.open(url, "_blank", windowParams);
					}
				}, this);
			},

			/**
			 * Forms feature code for lookup entity.
			 * @protected
			 * @param {String} entityName  Lookup entity name.
			 */
			formFeatureCode: function(entityName) {
				return this.Ext.String.format("New{0}Lookup", entityName);
			},

			/**
			 * ######### ######## ############## ######
			 * @protected
			 * @param {String} primaryColumnValue ########## ############# ######
			 */
			editRecord: function(primaryColumnValue) {
				const gridData = this.getGridData();
				const activeRow = gridData.get(primaryColumnValue);
				const sysLookup = activeRow.get("SysLookup");
				const entitySchemaName = activeRow.get("EntitySchemaName");
				const featureCode = this.formFeatureCode(entitySchemaName);
				const isNewLookUpEnabled = this.getIsFeatureEnabled(featureCode);
				if (sysLookup && !isNewLookUpEnabled) {
					this.openOldLookupConfiguration(sysLookup);
					return;
				}
				if (!entitySchemaName) {
					this.log("cann't find entity");
					return;
				}
				const schemaName = activeRow.get("PageSchemaName");
				const caption = activeRow.get("Name");
				const config = {
					caption: caption,
					entitySchemaName: entitySchemaName,
					schemaName: schemaName,
					moduleId: this.sandbox.id + "_BaseLookupConfigurationSection"
				};
				this.openSectionInChain(config);
			},

			/**
			 * @inheritodoc BaseSectionV2#onActiveRowAction
			 * @override
			 */
			onActiveRowAction: function(buttonTag, primaryColumnValue) {
				switch (buttonTag) {
					case "openConfiguration":
						this.openConfiguration(primaryColumnValue);
						break;
					default:
						this.callParent(arguments);
						break;
				}
			},

			/**
			 * @inheritodoc BaseSectionV2#getGridRowViewModelClassName
			 * @override
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.LookupSectionGridRowViewModel";
			},

			/**
			 * @inheritodoc BaseSectionV2#getDefaultDataViews
			 * @override
			 */
			getDefaultDataViews: function() {
				const dataViews = this.callParent(arguments);
				delete dataViews.AnalyticsDataView;
				return dataViews;
			},

			/**
			 * ######### # ###### ####### ##### #####.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq ###### #######.
			 * @param {String} columnPath #### # #######.
			 * @param {String} columnAlias ######### #######.
			 */
			addSchemaNameColumn: function(esq, columnPath, columnAlias) {
				const expressionConfig = {
					columnPath: columnPath,
					parentCollection: this,
					aggregationType: Terrasoft.AggregationType.NONE
				};
				const column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				const filter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value
				);
				column.subFilters.addItem(filter);
				const esqColumn = esq.addColumn(columnAlias);
				esqColumn.expression = column;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#initQueryColumns
			 * @override
			 */
			initQueryColumns: function(esq) {
				this.callParent(arguments);
				this.addSchemaNameColumn(esq, "[VwSysSchemaInfo:UId:SysEntitySchemaUId].Name", "EntitySchemaName");
				this.addSchemaNameColumn(esq, "[VwSysSchemaInfo:UId:SysPageSchemaUId].Name", "PageSchemaName");
				esq.addColumn("SysLookup");
			},

			/**
			 * ######### ######## ######### ###########.
			 * @protected
			 * @param {String} primaryColumnValue ########## ############# ############# ######.
			 */
			openConfiguration: function(primaryColumnValue) {
				const activeRow = this.getActiveRow();
				const typeColumnValue = this.getTypeColumnValue(activeRow);
				const schemaName = this.getEditPageSchemaName(typeColumnValue);
				this.set("ShowCloseButton", true);
				this.openCard(schemaName, ConfigurationEnums.CardStateV2.EDIT, primaryColumnValue);
			},

			/**
			 * @inheritodoc BaseSectionV2#initFilters
			 * @override
			 */
			initFilters: function() {
				const sandbox = this.sandbox;
				const quickFilterModuleId = this.getQuickFilterModuleId();
				sandbox.subscribe("GetExtendedFilterConfig", function() {
					const foldersVisible = this.get("IsFolderManagerActionsContainerVisible");
					return {
						isExtendedModeHidden: foldersVisible,
						isFoldersHidden: !foldersVisible
					};
				}, this, [quickFilterModuleId]);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#addSectionDesignerViewOptions
			 * @override
			 */
			addSectionDesignerViewOptions: Terrasoft.emptyFn
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "DataGridActiveRowOpenConfigurationAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"index": 1,
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.GREY,
					"caption": {"bindTo": "Resources.Strings.OpenConfigurationButtonCaption"},
					"tag": "openConfiguration"
				}
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			},
			{
				"operation": "merge",
				"name": "CombinedModeActionsButton",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



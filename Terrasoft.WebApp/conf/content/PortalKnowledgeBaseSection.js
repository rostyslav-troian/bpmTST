Terrasoft.configuration.Structures["PortalKnowledgeBaseSection"] = {innerHierarchyStack: ["PortalKnowledgeBaseSection"], structureParent: "KnowledgeBaseSectionV2"};
define('PortalKnowledgeBaseSectionStructure', ['PortalKnowledgeBaseSectionResources'], function(resources) {return {schemaUId:'053ec0f5-ddce-4c94-bae9-7666691800c0',schemaCaption: "Page schema - \"Knowledge base\" section on Portal", parentSchemaName: "KnowledgeBaseSectionV2", schemaName:'PortalKnowledgeBaseSection',parentSchemaUId:'4d21db49-2ab4-4dff-8790-9b4741b7bf0f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalKnowledgeBaseSection", [],
		function() {
			return {
				entitySchemaName: "KnowledgeBase",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "DataGridActiveRowDeleteAction"
					},
					{
						"operation": "remove",
						"name": "DataGridActiveRowCopyAction"
					},
					{
						"operation": "remove",
						"name": "CombinedModeActionButtonsCardRightContainer"
					}
				]/**SCHEMA_DIFF*/,
				methods: {
					/**
					 * ############# ############# ########### #######.
					 * @overridden
					 * @protected
					 */
					initContextHelp: function() {
						this.enableContextHelp = false;
					},

					/**
					 * ############## ########## ###### ###### "########".
					 * @overridden
					 * @protected
					 * @param {String} modeType ######## #### ########### #######
					 * @param {Terrasoft.BaseViewModelCollection} actionMenuItems
					 */
					initActionButtonMenu: function(modeType, actionMenuItems) {
						var collectionName = modeType + "ModeActionsButtonMenuItems";
						var collection = this.get(collectionName);
						if (actionMenuItems.getCount()) {
							this.set(modeType + "ModeActionsButtonVisible", true);
							var newCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
							actionMenuItems.each(function(item) {
								if (item.values.Caption.bindTo !== "Resources.Strings.ExportListToFileButtonCaption" &&
										item.values.Caption.bindTo !== "Resources.Strings.DeleteRecordButtonCaption") {
									var newItem = this.cloneBaseViewModel(item);
									newCollection.addItem(newItem);
								}
							}, this);
							if (collection) {
								collection.clear();
								collection.loadAll(newCollection);
							} else {
								this.set(collectionName, newCollection);
							}
						} else {
							this.set(modeType + "ModeActionsButtonVisible", false);
						}
					},

					/**
					 * ####### ######### ###### ########.
					 * @overridden
					 * @protected
					 */
					initAddRecordButtonParameters: function() {
						this.set("AddRecordButtonEnabled", false);
					},

					/**
					 * ######## ############# ## #########.
					 * @overridden
					 * @protected
					 * @return {Object}
					 */
					getDefaultDataViews: function() {
						var gridDataView = {
							name: this.get("GridDataViewName"),
							caption: this.getDefaultGridDataViewCaption(),
							icon: this.getDefaultGridDataViewIcon()
						};
						return {
							"GridDataView": gridDataView
						};
					}
				}
			};
		});



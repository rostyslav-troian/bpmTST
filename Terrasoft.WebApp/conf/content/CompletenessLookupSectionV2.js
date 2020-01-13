Terrasoft.configuration.Structures["CompletenessLookupSectionV2"] = {innerHierarchyStack: ["CompletenessLookupSectionV2"], structureParent: "BaseSectionV2"};
define('CompletenessLookupSectionV2Structure', ['CompletenessLookupSectionV2Resources'], function(resources) {return {schemaUId:'4a49752d-c89c-4904-a4df-dabc2f4b95b9',schemaCaption: "List page  - Data entry compliance", parentSchemaName: "BaseSectionV2", schemaName:'CompletenessLookupSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CompletenessLookupSectionV2", ["ConfigurationEnums", "CompletenessLookupSectionV2Resources"],
	function(ConfigurationEnums) {
		return {
			entitySchemaName: "Completeness",
			attributes: {
				"UseTagModule": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#UseSeparatedPageHeader
				 * @overridden
				 */
				"UseSeparatedPageHeader": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#UseSectionHeaderCaption
				 * @overridden
				 */
				"UseSectionHeaderCaption": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			}, {
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			}, {
				"operation": "remove",
				"name": "ProcessEntryPointGridRowButton"
			}, {
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			}, {
				"operation": "remove",
				"name": "activeRowActionCopy"
			}, {
				"operation": "remove",
				"name": "activeRowActionRemove"
			}, {
				"operation": "remove",
				"name": "activeRowActionSave"
			}, {
				"operation": "insert",
				"name": "SeparateModeBackButton",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.BackButtonCaption"
					},
					"click": {
						"bindTo": "closeSection"
					},
					"classes": {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"visible": {
						"bindTo": "SeparateModeActionsButtonVisible"
					}
				}
			}, {
				"operation": "merge",
				"name": "DataViewsContainer",
				"values":
				{
					"wrapClass": ["data-views-container-wrapClass", "data-view-border-right",
						"right-inner-el", "lookup-views-container-wrapClass"]
				}
			}] /**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#addSectionDesignerViewOptions
				 * @overridden
				 */
				addSectionDesignerViewOptions: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				addSectionHistoryState: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				addCardHistoryState: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				removeCardHistoryState: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				removeSectionHistoryState: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#editRecord
				 * @overridden
				 */
				editRecord: function(primaryColumnValue) {
					var activeRow = this.getActiveRow();
					var typeColumnValue = this.getTypeColumnValue(activeRow);
					var schemaName = this.getEditPageSchemaName(typeColumnValue);
					this.openCardInChain({
						id: primaryColumnValue,
						schemaName: schemaName,
						operation: ConfigurationEnums.CardStateV2.EDIT,
						moduleId: this.getChainCardModuleSandboxId(typeColumnValue)
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					var currentTabName = this.getActiveViewName();
					var schemaName = this.name;
					return schemaName + this.entitySchemaName + "GridSettings" + currentTabName;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getViewOptions
				 * @overridden
				 */
				getViewOptions: function() {
					var viewOptions = this.Ext.create("Terrasoft.BaseViewModelCollection");
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {
							"bindTo": "Resources.Strings.SortMenuCaption"
						},
						"Items": this.get("SortColumns")
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {
							"bindTo": "Resources.Strings.OpenGridSettingsCaption"
						},
						"Click": {
							"bindTo": "openGridSettings"
						}
					}));
					return viewOptions;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getModuleCaption
				 * @overridden
				 */
				getModuleCaption: function() {
					return (this.entitySchema && this.entitySchema.caption);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getCardModuleResponseTags
				 * @overridden
				 */
				getCardModuleResponseTags: function() {
					var editCardsSandboxIds = this.callParent(arguments);
					editCardsSandboxIds.push(this.getChainCardModuleSandboxId(Terrasoft.GUID_EMPTY));
					return editCardsSandboxIds;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @overridden
				 */
				getDefaultDataViews: function() {
					var dataViews = this.callParent(arguments);
					delete dataViews.AnalyticsDataView;
					return dataViews;
				},

				/**
				 * Closes section.
				 * @protected
				 * @virtual
				 */
				closeSection: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#isMultiSelectVisible
				 * @overridden
				 */
				isMultiSelectVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#isSingleSelectVisible
				 * @overridden
				 */
				isSingleSelectVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#isUnSelectVisible
				 * @overridden
				 */
				isUnSelectVisible: function() {
					return false;
				}
			}
		};
	}
);



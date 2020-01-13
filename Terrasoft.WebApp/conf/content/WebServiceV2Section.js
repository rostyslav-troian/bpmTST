Terrasoft.configuration.Structures["WebServiceV2Section"] = {innerHierarchyStack: ["WebServiceV2Section"], structureParent: "BaseSectionV2"};
define('WebServiceV2SectionStructure', ['WebServiceV2SectionResources'], function(resources) {return {schemaUId:'c84d9745-119c-427e-bbc8-2c1a8647ee3d',schemaCaption: "Section schema: \"Web Services\"", parentSchemaName: "BaseSectionV2", schemaName:'WebServiceV2Section',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseSectionV2
 */
define("WebServiceV2Section", ["ConfigurationEnums", "RightUtilities", "WebServiceV2SectionResources",
	"ServiceDesignerUtilities", "css!ServiceDesignerStyles"
], function() {
	return {
		entitySchemaName: "VwWebServiceV2",
		attributes: {
			/**
			 * The name of the operation to which user has access.
			 */
			"SecurityOperationName": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanManageSolution"
			},

			/**
			 * The Uri to pass to edit page.
			 */
			"WizardUri": {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Gets is column clickable.
			 * @param {String} column Column to find
			 * @return {Boolean}
			 * @private
			 */
			_isClickableColumn: function(column) {
				var clickableColumns = ["Caption"];
				return this.Ext.Array.contains(clickableColumns, column);
			},

			/**
			 * @private
			 */
			_openServiceWizard: function(callback, scope) {
				Terrasoft.showInputBox(null, function(buttonCode, values) {
					if (buttonCode === "ok") {
						this.$WizardUri = values.uri.value;
						Ext.callback(callback, scope);
					}
				}, ["ok", "cancel"], this, {
					uri: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: "",
						caption: this.get("Resources.Strings.MiniCardUriCaption"),
						customConfig: {
							focused: true,
							classes: {wrapClass: "service-mini-card-uri"}
						}
					}
				});
			},

			/**
			 * @private
			 */
			_applyWizardUri: function(config) {
				if (config.instanceConfig) {
					config.instanceConfig.parameters = {
						viewModelConfig: {"wizardUri": this.$WizardUri}
					};
				}
				this.$WizardUri = "";
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init.
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					Terrasoft.ServiceSchemaManager.initialize(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2
			 * @override
			 */
			initAddRecordButtonParameters: function() {
				var caption = this.get("Resources.Strings.AddRecordButtonCaption");
				this.callParent();
				this.set("AddRecordButtonCaption", caption);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#isMultiSelectVisible
			 * @override
			 */
			isMultiSelectVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2
			 * @override
			 */
			getModuleCaption: function() {
				return this.get("Resources.Strings.Caption");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSection#getSectionCode.
			 * @override
			 */
			getSectionCode: function() {
				return "WebServiceV2";
			},

			/**
			 * @inheritdoc Terrasoft.ContextHelpMixin#getContextHelpConfig.
			 * @override
			 */
			getContextHelpConfig: function() {
				return {
					contextHelpId: "1862",
					contextHelpCode: "WebServiceV2Section"
				};
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#deleteRecords.
			 * @override
			 */
			onMultiDeleteAccept: function() {
				var items = this.getSelectedItems();
				if (!Ext.isEmpty(items)) {
					Terrasoft.ServiceSchemaManager.getItems()
						.filterByFn(function(item) {
							return Terrasoft.contains(items, item.uId);
						}, this)
						.each(function(item) {
							item.remove();
						});
					this.showBodyMask();
					Terrasoft.ServiceSchemaManager.save(function(response) {
						this.hideBodyMask();
						if (response.success) {
							this.reloadGridData();
						} else {
							this.showInformationDialog(response.errorInfo.toString());
						}
					}, this);
				}
			},

			/**
			 * @inheritodoc BaseSectionV2#getDefaultDataViews
			 * @override
			 */
			getDefaultDataViews: function() {
				var dataViews = this.callParent(arguments);
				delete dataViews.AnalyticsDataView;
				return dataViews;
			},

			/**
			 * @inheritdoc GridUtilitiesV2#addColumnLink
			 * @override
			 */
			addColumnLink: function(item, column) {
				var columnPath = column.columnPath;
				if (!this._isClickableColumn(columnPath)) {
					return;
				}
				var onColumnLinkClickHandler = "on" + columnPath + "LinkClick";
				var scope = this;
				item[onColumnLinkClickHandler] = function() {
					return scope.createLink("VwWebServiceV2", columnPath, item.get(columnPath), item.$Id);
				};
			},

			/**
			 * @inheritdoc GridUtilitiesV2#createLink
			 * @override
			 */
			createLink: function(entitySchemaName, columnPath, displayValue, recordId) {
				var link = Terrasoft.workspaceBaseUrl +
					"/Nui/ViewModule.aspx#" +
					["CardModuleV2", "WebServiceV2Page", "edit", recordId].join("/");
				return {
					caption: displayValue,
					target: "_self",
					title: displayValue,
					url: link
				};
			},

			/**
			 * @inheritdoc GridUtilitiesV2#checkCanDelete
			 * @override
			 */
			checkCanDelete: function(items, callback, scope) {
				var activeRow = this.$ActiveRow;
				Terrasoft.chain(
					function(next) {
						Terrasoft.ServiceSchemaManager.getInstanceByUId(activeRow, next, this);
					},
					function(next, instance) {
						Terrasoft.ServiceDesignerUtilities.canEditSchema(instance, function(result) {
							callback.call(scope, result ? null : "RightLevelWarningMessage");
						}, scope);
					}, this);
			},

			/**
			 * @inheritdoc BaseSectionV2#getExportToFileActionVisibility
			 * @override
			 */
			getExportToFileActionVisibility: function() {
				return false;
			},

			/**
			 * @inheritdoc BaseSectionV2#openCardInChain
			 * @override
			 */
			openCardInChain: function(config) {
				this._applyWizardUri(config);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#addRecord
			 * @override
			 */
			addRecord: function() {
				var parentMethod = this.getParentMethod();
				this._openServiceWizard(parentMethod, this);
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "SaveRecordButton",
				"values": {"style": Terrasoft.controls.ButtonEnums.style.GREEN}
			},
			{
				"operation": "remove",
				"name": "SeparateModeActionsButton"
			},
			{
				"operation": "remove",
				"name": "CombinedModeActionsButton"
			}
		]/**SCHEMA_DIFF*/
	};
});



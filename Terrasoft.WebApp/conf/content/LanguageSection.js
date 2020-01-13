Terrasoft.configuration.Structures["LanguageSection"] = {innerHierarchyStack: ["LanguageSection"], structureParent: "BaseSectionV2"};
define('LanguageSectionStructure', ['LanguageSectionResources'], function(resources) {return {schemaUId:'f559b8b0-8bc1-49a3-ace4-4868d48c4e3e',schemaCaption: "LanguageSection", parentSchemaName: "BaseSectionV2", schemaName:'LanguageSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LanguageSection", ["terrasoft", "css!TranslationCSS", "SysLanguageSectionGridRowViewModel"],
		function(Terrasoft) {
	return {
		entitySchemaName: "SysCulture",
		attributes: {
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
				value: false
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#SecurityOperationName
			 * @overridden
			 */
			"SecurityOperationName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "CanManageLanguageSection"
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Navigates to translation.
			 * @private
			 */
			navigateToTranslation: function() {
				this.sandbox.publish("PushHistoryState", {
					hash: "SectionModuleV2/TranslationSection"
				});
			},

			/**
			 * Exports translation.
			 * @private
			 */
			exportTranslation: function() {
				// TODO: CRM-18809
			},

			/**
			 * Imports translation.
			 * @private
			 */
			importTranslation: function() {
				// TODO: CRM-18810
			},

			/**
			 * Checks if cultures contain primary culture.
			 * @private
			 * @param {Array} cultures Cultures identifiers.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution scope.
			 */
			containsPrimaryCulture: function(cultures, callback, scope) {
				this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCulture", function(primaryCulture) {
					var containsPrimaryCulture = (cultures.indexOf(primaryCulture.value) > -1);
					callback.call(scope, containsPrimaryCulture);
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc
			 * @overridden
			 */
			initEditPages: function() {
				this.callParent(arguments);
				var editPages = this.Ext.create(this.Terrasoft.BaseViewModelCollection);
				var typeUId = this.Terrasoft.GUID_EMPTY;
				var item = this.getButtonMenuItem({
					Id: typeUId,
					Caption: this.get("Resources.Strings.NewLanguage"),
					Click: {
						bindTo: "addRecord"
					},
					Tag: typeUId,
					SchemaName: "LanguagePage"
				});
				editPages.add(typeUId, item);
				this.set("EditPages", editPages);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getModuleCaption: function() {
				return this.get("Resources.Strings.SectionCaption");
			},

			/**
			 * Gets data views.
			 * @protected
			 */
			getDataViews: function() {
				return this.Ext.create(Terrasoft.Collection);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			updateSectionHeader: function() {
				var caption = this.get("Resources.Strings.PageCaption");
				this.sandbox.publish("ChangeHeaderCaption", {
					caption: caption,
					dataViews: this.getDataViews(),
					moduleName: this.name
				});
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getSectionActions: function() {
				var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "navigateToTranslation"},
					"Caption": {"bindTo": "Resources.Strings.NavigateToTranslationCaption"},
					"Tag": "NavigateToTranslation"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "exportTranslation"},
					"Caption": {"bindTo": "Resources.Strings.ExportCaption"},
					"Tag": "Export",
					"Visible": false
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "importTranslation"},
					"Caption": {"bindTo": "Resources.Strings.ImportCaption"},
					"Tag": "Import",
					"Visible": false
				}));
				return actionMenuItems;
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
			 * @inheritdoc Terrasoft.BaseSectionV2#getGridRowViewModelClassName
			 * @overridden
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.SysLanguageSectionGridRowViewModel";
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#checkCanDelete
			 * @overridden
			 */
			checkCanDelete: function(items, callback, scope) {
				this.callParent([items, function(result) {
					if (result) {
						callback.call(scope, result);
						return;
					}
					this.containsPrimaryCulture(items, function(containsPrimaryCulture) {
						if (!containsPrimaryCulture) {
							callback.call(scope, result);
							return;
						}
						var message = this.get("Resources.Strings.PrimaryCultureDeleteMessage");
						this.showInformationDialog(message);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getDefaultDeleteExceptionMessage
			 * @overridden
			 * @protected
			 */
			getDefaultDeleteExceptionMessage: function() {
				return this.get("Resources.Strings.DefaultExceptionMessage");
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getRecordDependencyWarningMessage
			 * @overridden
			 * @protected
			 */
			getRecordDependencyWarningMessage: function() {
				return this.get("Resources.Strings.DefaultExceptionMessage");
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "SeparateModeViewOptionsButton",
				"values": {"visible": false}
			},
			{
				"operation": "merge",
				"name": "CombinedModeViewOptionsButton",
				"values": {"visible": false}
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			}
		]/**SCHEMA_DIFF*/
	};
});



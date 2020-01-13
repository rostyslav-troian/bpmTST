Terrasoft.configuration.Structures["FeaturesPage"] = {innerHierarchyStack: ["FeaturesPage"]};
define('FeaturesPageStructure', ['FeaturesPageResources'], function(resources) {return {schemaUId:'c290f8e2-3884-4ba5-ab7a-053d84478128',schemaCaption: "FeaturesPage", parentSchemaName: "", schemaName:'FeaturesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FeaturesPage", ["css!FeaturesPageCSS"], function() {
	return {
		entitySchemaName: "Feature",
		attributes: {
			/**
			 * List of features.
			 * @type {Terrasoft.DataValueType.COLLECTION}
			 */
			"FeaturesList": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": Ext.create("Terrasoft.BaseViewModelCollection")
			},
			/**
			 * Feature code.
			 * @type {Terrasoft.dataValueType.TEXT}
			 */
			"FeatureCode": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {"bindTo": "Resources.Strings.FeatureCodeCaption"},
				"isRequired": true
			},
			/**
			 * Feature name.
			 * @type {Terrasoft.dataValueType.TEXT}
			 */
			"FeatureName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {"bindTo": "Resources.Strings.FeatureNameCaption"}
			},
			/**
			 * Feature description.
			 * @type {Terrasoft.dataValueType.TEXT}
			 */
			"FeatureDescription": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {"bindTo": "Resources.Strings.FeatureDescriptionCaption"}
			},
			/**
			 * Feature visible.
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			"SaveButtonVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": false
			},
			/**
			 * Schema Generator Config
			 * @type {Terrasoft.DataValueType.CUSTOM_OBJECT}
			 */
			"SchemaGeneratorConfig": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": {
					schemaName: "FeatureItemSchema",
					profileKey: "FeatureItemSchema"
				}
			},
			/**
			 * Schema builder class name
			 * @type {Terrasoft.DataValueType.TEXT}
			 */
			"SchemaBuilderClassName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": "Terrasoft.SchemaBuilder"
			}
		},
		messages: {
			/**
			 * @message InitDataViews
			 * Changes current page header.
			 */
			"InitDataViews": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message ChangeHeaderCaption
			 * Changes current page header.
			 */
			"ChangeHeaderCaption": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message NeedHeaderCaption
			 */
			"NeedHeaderCaption": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FeaturesContentContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CreateFeatureContainer",
				"parentName": "FeaturesContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"classes": {
						"wrapClassName": ["add-feature-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CreateFeatureLabel",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"classes": {
						"labelClass": ["feature-item-label"]
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.CreateFeatureCaption"}
				}
			},
			{
				"operation": "insert",
				"name": "FeatureCode",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"value": {
						"bindTo": "FeatureCode"
					},
					"classes": {
						"labelClass": ["feature-item-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "FeatureName",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"value": {
						"bindTo": "FeatureName"
					},
					"classes": {
						"labelClass": ["feature-item-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "FeatureDescription",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 12
					},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"value": {
						"bindTo": "FeatureDescription"
					},
					"classes": {
						"labelClass": ["feature-item-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CreateFeatureButton",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 12,
						"row": 3,
						"colSpan": 12
					},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.CreateFeatureCaption"},
					"classes": {"wrapperClass": ["feature-item-button-wrap"]},
					"click": {"bindTo": "createFeature"}
				}
			},
			{
				"operation": "insert",
				"name": "ApplyChagesButton",
				"parentName": "CreateFeatureContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 4
					},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.FeatureSaveChangeButtonCaption"},
					"classes": {"wrapperClass": ["feature-item-button-wrap"]},
					"enabled": {"bindTo": "SaveButtonVisible"},
					"click": {"bindTo": "saveFeatureChanges"},
					"tips": []
				}
			},
			{
				"operation": "insert",
				"name": "FeatureItemsContainer",
				"parentName": "FeaturesContentContainer",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"classes": {"wrapClassName": ["features-container-list"]},
					"idProperty": "Id",
					"collection": "FeaturesList",
					"dataItemIdPrefix": "feature-item",
					"onGetItemConfig": "getItemViewConfig",
					"isAsync": false
				}
			}
		],
		methods: {
			/**
			 * Initializes Header.
			 * @private
			 */
			initHeader: function() {
				this.initPageCaption();
				this.sandbox.subscribe("NeedHeaderCaption", function() {
					this.sandbox.publish("InitDataViews", {caption: this.get("Resources.Strings.PageHeaderCaption")});
				}, this);
			},

			/**
			 * Initializes page caption.
			 * @protected
			 */
			initPageCaption: function() {
				this.sandbox.publish("ChangeHeaderCaption", {
					"caption": this.get("Resources.Strings.PageHeaderCaption"),
					"dataViews": Ext.create("Terrasoft.Collection")
				});
			},

			/**
			 * Initializes collection events.
			 * @private
			 */
			initCollectionEvents: function() {
				var featuresCollection = this.get("FeaturesList");
				featuresCollection.on("dataLoaded", function(items) {
					items.each(this.subscribeModelEvents, this);
				}, this);
			},

			/**
			 * Subscribes for model events.
			 * @private
			 * @param {Terrasoft.FeatureItemViewModel} model Feature item view model.
			 */
			subscribeModelEvents: function(model) {
				model.on("changeFeatureState", this.onChangeFeatureState, this);
			},

			/**
			 * Handles feature state changes.
			 * @private
			 */
			onChangeFeatureState: function() {
				var features = this.getChangedFeatureState();
				this.set("SaveButtonVisible", !Ext.isEmpty(features));
			},

			/**
			 * Gets features from FeaturesList if IsChanged = true.
			 * @private
			 * @return {Array}
			 */
			getChangedFeatureState: function() {
				var result = [];
				var featuresCollection = this.get("FeaturesList");
				featuresCollection.each(function(item) {
					if (item.get("IsChangedFeature")) {
						var state = item.get("ActualState");
						var code = item.get("Code");
						result.push({
							state: state,
							code: code
						});
					}
				}, this);
				return result;
			},

			/**
			 * Builds Schema.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			buildSchema: function(callback, scope) {
				var schemaBuilder = this.Ext.create(this.get("SchemaBuilderClassName"));
				var generatorConfig = this.Terrasoft.deepClone(this.get("SchemaGeneratorConfig"));
				schemaBuilder.build(generatorConfig, function(viewModelClass, viewConfig) {
					this.set("FeatureItemViewModelClass", viewModelClass);
					this.set("FeatureItemViewConfig", viewConfig);
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Initializes features list.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			initFeaturesList: function(callback, scope) {
				this.callService({
					serviceName: "FeatureService",
					methodName: "GetFeaturesInfo"
				}, function(response) {
					var features = (response && response.GetFeaturesInfoResult) || [];
					this.prepareFeatureModels(features);
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Set's up feature view models.
			 * @private
			 * @param {Array} features List of the features
			 * @param {Array} states List of the states
			 */
			prepareFeatureModels: function(features) {
				var featuresCollection = this.get("FeaturesList");
				featuresCollection.clear();
				var processedFeaturesCollection = Ext.create("Terrasoft.Collection");
				Terrasoft.each(features, function(feature) {
					var viewModel = this.getFeatureItemViewModel(feature);
					processedFeaturesCollection.add(feature.Id, viewModel);
				}, this);
				featuresCollection.loadAll(processedFeaturesCollection);
			},

			/**
			 * Returns feature item view model.
			 * @private
			 * @param {Array} entity Select item.
			 * @return {Terrasoft.FeatureItemViewModel} Feature item view model.
			 */
			getFeatureItemViewModel: function(entity) {
				var viewModelClass = this.get("FeatureItemViewModelClass");
				var viewModel = Ext.create(viewModelClass, {
					Terrasoft: this.Terrasoft,
					Ext: this.Ext,
					sandbox: this.sandbox,
					values: entity
				});
				viewModel.init();
				return viewModel;
			},

			/**
			 * Creates feature button handler.
			 * @private
			 */
			createFeature: function() {
				var featureCode = this.get("FeatureCode");
				var featureName = this.get("FeatureName") || featureCode;
				var featureDescription = this.get("FeatureDescription") || "";
				if (Ext.isEmpty(featureCode)) {
					var validateMsgTemplate = this.get("Resources.Strings.ValidateMsgTemplate");
					var codeCaption = this.get("Resources.Strings.FeatureCodeCaption");
					this.showInformationDialog(Ext.String.format(validateMsgTemplate, codeCaption));
					return;
				}
				this.callService({
					serviceName: "FeatureService",
					methodName: "CreateFeature",
					data: {
						code: featureCode,
						name: featureName,
						description: featureDescription
					}
				}, function(response) {
					if (!response.result.success) {
						Terrasoft.showErrorMessage(response.result.errorInfo.message);
						return;
					}
					this.showInformationDialog(this.get("Resources.Strings.CreateFeatureMessage"), function() {
						this.reloadPage();
					}, {buttons: [Terrasoft.MessageBoxButtons.OK.returnCode]}, this);
				}, this);
			},

			/**
			 * Saves all change state
			 * @private
			 */
			saveFeatureChanges: function() {
				var data = {
					"features": this.getChangedFeatureState()
				};
				this.callService({
					serviceName: "FeatureService",
					methodName: "SetFeaturesState",
					data: data
				}, function(response) {
					if (!response.result.success) {
						Terrasoft.showErrorMessage(response.result.errorInfo.message);
						return;
					}
					this.showInformationDialog(this.get("Resources.Strings.FeatureChangedMessage"), function() {
						this.reloadPage();
					}, {buttons: [Terrasoft.MessageBoxButtons.OK.returnCode]}, this);
				}, this);
			},

			/**
			 * Reloads page.
			 * @private
			 */
			reloadPage: function() {
				this.set("SaveButtonVisible", false);
				this.initFeaturesList();
			},

			/**
			 * Generates view config for feature item.
			 * @private
			 * @param {Object} itemConfig View config of item.
			 */
			getItemViewConfig: function(itemConfig) {
				var viewConfig = this.get("FeatureItemViewConfig");
				itemConfig.config = viewConfig[0];
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						this.initHeader();
						this.initCollectionEvents();
						Terrasoft.chain(
								this.buildSchema,
								this.initFeaturesList,
								function() {
									Ext.callback(callback, scope || this);
								}, this);
					}, this
				]);
			}
		}
	};
});



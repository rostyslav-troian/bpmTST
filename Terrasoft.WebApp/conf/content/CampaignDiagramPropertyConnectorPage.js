Terrasoft.configuration.Structures["CampaignDiagramPropertyConnectorPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyConnectorPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyConnectorPageStructure', ['CampaignDiagramPropertyConnectorPageResources'], function(resources) {return {schemaUId:'7bb53a81-17ee-45ce-8021-6edd9e8303ff',schemaCaption: "CampaignDiagramPropertyConnectorPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyConnectorPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyConnectorPage", ["CampaignDiagramPropertyConnectorPageResources", "terrasoft",
		"CampaignEnums", "EntityHelper", "MarketingEnums", "LookupUtilities", "CampaignDiagramConnectorFilter",
		"css!CampaignDiagramPropertyConnectorPageCSS"],
		function(resources, Terrasoft, CampaignEnums, EntityHelper, MarketingEnums, LookupUtilities) {
			return {
				entitySchemaName: "CampaignStepRoute",
				mixins: {
					EntityHelper: "Terrasoft.EntityHelper"
				},
				messages: {
					/**
					 * @message GetDiagramItems
					 * Returns diagram items.
					 */
					"GetDiagramItems": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					/**
					 * Filters collection.
					 */
					"FiltersCollection": {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * The number of days from the date of execution of the last step.
					 */
					"DayTransitionCount": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Field setting endpoint connection.
					 */
					"IsTargetElementSet": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: false
					},

					/**
					 * Field visibility information block.
					 */
					"InfoLayoutVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: false
					},

					/**
					 * Custom object of the chart element.
					 */
					"DiagramElementSourceNode": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Custom object of the chart element.
					 */
					"DiagramElementTargetNode": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Category mailing of the final assembly of the connector.
					 */
					"TargetNodeEmailCategory": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Startup type connector end node.
					 */
					"TargetNodeEmailLaunchOption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Text information field.
					 */
					"InfoCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Launch date.
					 */
					"LaunchDateStr": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Period in days.
					 */
					"CampaignPeriodDay": {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Period value.
					 */
					"CampaignPeriodTime": {
						dataValueType: Terrasoft.DataValueType.ENUM,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Period list.
					 */
					"CampaignPeriodTimeList": {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible filters time container group.
					 */
					"IsFiltersTimeContainerGroupVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible specified time radio button.
					 */
					"IsSpecifiedTimeRadioVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible campaign period day.
					 */
					"IsCampaignPeriodDayVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible start date.
					 */
					"IsStartDateVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible from campaign radio button.
					 */
					"IsFromCampaignRadioVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible campaign period time.
					 */
					"IsCampaignPeriodTimeVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible instantly radio button.
					 */
					"IsInstantlyRadioVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: true
					},

					/**
					 * Field for value control launch option.
					 */
					"LaunchOptionRadio": {
						dataValueType: Terrasoft.DataValueType.TEXT
					},

					/**
					 * Visible launch option specified time.
					 */
					"IsLaunchOptionSpecifiedTimeVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Visible launch option from campaign.
					 */
					"IsLaunchOptionFromCampaignVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Start date.
					 */
					"StartDate": {
						dataValueType: Terrasoft.DataValueType.TIME,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Source node type.
					 */
					"SourceNodeType": {
						dataValueType: Terrasoft.DataValueType.TIME,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Target node type.
					 */
					"TargetNodeType": {
						dataValueType: Terrasoft.DataValueType.TIME,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Collapsed filters group
					 */
					"IsCollapsedFiltersGroup": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: false
					}

				},
				methods: {

					/**
					 * Finds selected filter.
					 * @private
					 * @return {Object} Selected filter.
					 */
					findSelectedFilter: function() {
						var selectedFilter = null;
						var filterCollection = this.get("FiltersCollection");
						var checkedFilters = filterCollection.filter(function(filter) {
							return filter.get("Value");
						});
						selectedFilter = checkedFilters.first();
						return selectedFilter;
					},

					/**
					 * Gets all selected filters' identifiers.
					 * @private
					 * @return {Array} Selected filters.
					 */
					getSelectedFilters: function() {
						var filterCollection = this.get("FiltersCollection");
						var selectedFilters = [];
						if (filterCollection != null) {
							filterCollection.each(function(filter) {
								var filterValue = filter.get("Value");
								if (Terrasoft.isGUID(filterValue)) {
									selectedFilters.push(filterValue);
								} else if (filterValue) {
									selectedFilters.push(filter.get("Id"));
								}
							}, this);
						}
						return selectedFilters;
					},

					/**
					 * Resets all filters except changed one.
					 * @private
					 * @param {Object} changedFilter Changed filter.
					 */
					resetFilters: function(changedFilter) {
						var filterCollection = this.get("FiltersCollection");
						filterCollection.each(function(filter) {
							if (filter !== changedFilter && changedFilter && changedFilter.get("Value")) {
								filter.set("Value", false);
							}
						});
					},

					/**
					 * Returns source node type.
					 * @private
					 * @return {String}
					 */
					getSourceNodeType: function() {
						var type = null;
						var sourceNode = this.get("DiagramElementSourceNode");
						if (sourceNode && sourceNode.config) {
							type = sourceNode.config.stepType;
						}
						return type;
					},

					/**
					 * Returns target node type.
					 * @private
					 * @return {String}
					 */
					getTargetNodeType: function() {
						var type = null;
						var targetNode = this.get("DiagramElementTargetNode");
						if (targetNode && targetNode.config) {
							type = targetNode.config.stepType;
						}
						return type;
					},

					/**
					 * The handler of the "change" event of the filter collection.
					 * @protected
					 * @param {Object} [changedItem] Changed filter item.
					 */
					onFilterChanged: function(changedItem) {
						var selectedFilters = [];
						var diagramElementAddInfo = this.get("DiagramElementAddInfo");
						var outboundCampaign = this.getIsFeatureEnabled("OutboundCampaign");
						var sourceNodeType = this.getSourceNodeType();
						if (outboundCampaign && (sourceNodeType === CampaignEnums.StepType.LANDING)) {
							if (this.get("SkipChangedItem")) {
								return;
							}
							this.set("SkipChangedItem", true);
							changedItem = changedItem || this.findSelectedFilter();
							if (changedItem && changedItem.get("Value")) {
								var changedItemId = changedItem.get("Id");
								selectedFilters.push(changedItemId);
								this.changeLandingFilter(changedItem);
							} else {
								selectedFilters = this.getSelectedFilters();
							}
							this.resetFilters(changedItem);
							this.set("SkipChangedItem", false);
						} else {
							selectedFilters = this.getSelectedFilters();
						}
						var dayTransitionCount = this.get("DayTransitionCount");
						var launchOptionRadio = this.get("LaunchOptionRadio");
						var startDate = this.get("StartDate");
						var campaignPeriodDay = this.get("CampaignPeriodDay");
						var campaignPeriodTime = this.get("CampaignPeriodTime");
						var bulkEmailHyperlinks = diagramElementAddInfo.BulkEmailHyperlinks;
						if (changedItem) {
							bulkEmailHyperlinks = changedItem.get("BulkEmailHyperlinks");
						}
						var config = {
							elementId: this.get("DiagramElementId"),
							addInfo: {
								Filters: selectedFilters,
								DayTransitionCount: dayTransitionCount,
								LaunchOptionRadio: launchOptionRadio,
								StartDate: startDate,
								CampaignPeriodDay: campaignPeriodDay,
								CampaignPeriodTime: campaignPeriodTime,
								BulkEmailHyperlinks: bulkEmailHyperlinks
							}
						};
						this.sandbox.publish("UpdateDiagramElement", config);
					},

					/**
					 * Changes landing filter.
					 * @private
					 * @param {Object} changedItem Changed filter item.
					 */
					changeLandingFilter: function(changedItem) {
						var stepTypes = CampaignEnums.StepType;
						var changedItemId = changedItem.get("Id");
						var targetNodeType = this.getTargetNodeType();
						var invertedFilterValue = CampaignEnums.CampaignFilter.FORM_NOT_SUBMITTED;
						if (changedItemId === CampaignEnums.CampaignFilter.FORM_NOT_SUBMITTED) {
							this.set("IsFromCampaignRadioVisible", false);
							this.set("IsInstantlyRadioVisible", false);
							this.set("LaunchOptionRadio", MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED);
							if (!this.get("CampaignPeriodDay")) {
								this.set("CampaignPeriodDay", 1);
							}
							invertedFilterValue = CampaignEnums.CampaignFilter.FORM_SUBMITTED;
						} else {
							if (targetNodeType !== stepTypes.TARGET && targetNodeType !== stepTypes.EXITING_CAMPAIGN) {
								this.set("IsFromCampaignRadioVisible", true);
							}
							if (targetNodeType === stepTypes.EMAIL_MAILING || targetNodeType === stepTypes.TARGET ||
									targetNodeType === stepTypes.EXITING_CAMPAIGN) {
								this.set("IsInstantlyRadioVisible", true);
							}
							this.setDefaultValue();
						}
						this.setInvertedFilterInSecondConnector(invertedFilterValue);
					},

					/**
					 * Sets inverted filter value in second connector.
					 * @private
					 * @param {String} invertedFilterValue Inverted filter value.
					 */
					setInvertedFilterInSecondConnector: function(invertedFilterValue) {
						var sourceNodeSelectedFilters = this.getSourceNodeSelectedFilters();
						var invertedSourceConnection = _.find(sourceNodeSelectedFilters, function(filter) {
							return filter.name !== this.get("DiagramElementId");
						}, this);
						if (invertedSourceConnection) {
							this.sandbox.publish("UpdateDiagramElement", {
								elementId: invertedSourceConnection.name,
								addInfo: {
									Filters: [invertedFilterValue]
								}
							});
						}
					},

					/**
					 * Get collection filters from the database.
					 * @protected
					 */
					loadFilters: function() {
						var sourceNodeTypeId = this.getSourceNodeType();
						if (!sourceNodeTypeId) {
							return;
						}
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "CampaignFilter"});
						var isFirst = this.isSourceNodeFirst();
						esq.serverESQCacheParameters = {
							cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
							cacheGroup: this.name,
							cacheItemName: Ext.String.format("{0}_{1}", sourceNodeTypeId, isFirst)
						};
						esq.addColumn("Id");
						esq.addColumn("Title");
						this.initQueryFilters(esq);
						esq.getEntityCollection(function(result) {
							var items = null;
							if (result.success) {
								items = result.collection;
							}
							this.initFilters(items);
						}, this);
					},

					/**
					 * Determines if source node is first element on diagram.
					 * @private
					 * @return {Boolean}
					 */
					isSourceNodeFirst: function() {
						var sourceNode = this.get("DiagramElementSourceNode");
						return (sourceNode.config && sourceNode.config.inEdges &&
							(sourceNode.config.inEdges.length === 0));
					},

					/**
					 * Initializes campaign element filters.
					 * @private
					 * @param {Object} esq Campaign filters query.
					 */
					initQueryFilters: function(esq) {
						var sourceNodeTypeId = this.getSourceNodeType();
						esq.filters.add("filterStepType", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "StepType", sourceNodeTypeId));
						if (!this.getIsFeatureEnabled("OutboundCampaign") || this.isSourceNodeFirst()) {
							esq.filters.add("notLandingStepType", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.NOT_EQUAL, "StepType", CampaignEnums.StepType.LANDING));
						}
					},

					/**
					 * Initializes ViewModels collection using to display the filter.
					 * @protected
					 * @param {Terrasoft.BaseViewModelCollection} items Filters Collection.
					 * @param {object} addInfo For more information about filters.
					 */
					initFiltersCollection: function(items, addInfo) {
						if (!Ext.isEmpty(items)) {
							var viewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection");
							var sourceNode = this.get("DiagramElementSourceNode");
							items.each(function(item) {
								var id = item.get("Id");
								var viewModelItem = this.Ext.create("Terrasoft.CampaignDiagramConnectorFilter", {
									values: {
										Title: item.get("Title"),
										Id: id,
										Value: (addInfo && addInfo.Filters && (addInfo.Filters.indexOf(id) > -1)),
										IsStatusEnabled: this.get("IsStatusEnabled"),
										SourceNode: sourceNode,
										BulkEmailHyperlinks: addInfo.BulkEmailHyperlinks
									}
								});
								viewModelItem.sandbox = this.sandbox;
								viewModelCollection.add(id, viewModelItem);
							}, this);
							viewModelCollection.on("itemChanged", this.onFilterChanged, this);
							this.set("FiltersCollection", viewModelCollection);
						}
					},

					/**
					 * Initializes sign visibility panel filter settings.
					 * @protected
					 * @param {object} targetNode Elements of the diagram to transition.
					 * @param {object} sourceNode Elements of the diagram from transition.
					 */
					initInfoLayoutVisibility: function(targetNode, sourceNode) {
						if (!this.Ext.isEmpty(targetNode)) {
							var sourceNodeTypeId = sourceNode.config.stepType;
							var targetNodeTypeId = targetNode.config.stepType;
							this.set("SourceNodeType", sourceNodeTypeId);
							this.set("TargetNodeType", targetNodeTypeId);
							if (targetNodeTypeId === CampaignEnums.StepType.TARGET ||
								targetNodeTypeId === CampaignEnums.StepType.EXITING_CAMPAIGN) {
								this.set("IsFiltersTimeContainerGroupVisible", true);
								this.set("IsSpecifiedTimeRadioVisible", true);
								this.set("IsFromCampaignRadioVisible", false);
								this.set("IsStartDateVisible", false);
								this.set("IsInstantlyRadioVisible", true);
								this.set("InfoLayoutVisible", false);
								this.set("IsCollapsedFiltersGroup", true);
								this.setDefaultValue();
								return;
							} else if (targetNodeTypeId === CampaignEnums.StepType.LANDING &&
									this.getIsFeatureEnabled("OutboundCampaign")) {
								this.set("InfoLayoutVisible", true);
							} else if (sourceNodeTypeId === CampaignEnums.StepType.LANDING &&
									this.getIsFeatureEnabled("OutboundCampaign")) {
								this.set("IsSpecifiedTimeRadioVisible", true);
								if (targetNodeTypeId === CampaignEnums.StepType.EMAIL_MAILING) {
									this.set("IsInstantlyRadioVisible", true);
								} else {
									this.set("IsInstantlyRadioVisible", false);
								}
								this.setDefaultValue();
							}
						} else {
							this.set("InfoLayoutVisible", false);
						}
					},

					/**
					 * Initializes infomatsionnago text block.
					 * @protected
					 * @param {object} targetNode Elements of the diagram to transition.
					 */
					initInfoCaption: function(targetNode) {
						var recordId = targetNode && targetNode.config && targetNode.config.addInfo &&
							targetNode.config.addInfo.RecordId;
						if (Ext.isEmpty(recordId)) {
							this.set("IsTargetElementSet", false);
							if (!Ext.isEmpty(targetNode)) {
								var stepType = targetNode.config.stepType;
								var exceptStepTypes = [CampaignEnums.StepType.CREATE_LEAD,
									CampaignEnums.StepType.EXITING_CAMPAIGN, CampaignEnums.StepType.TARGET];
								if (!Terrasoft.contains(exceptStepTypes, stepType)) {
									this.set("InfoLayoutVisible", true);
									this.updateInfoCaption();
								}
							}
						} else {
							this.set("IsTargetElementSet", true);
							if (targetNode.config.stepType === CampaignEnums.StepType.EMAIL_MAILING) {
								this.readEntity("BulkEmail", recordId, ["Category", "LaunchOption", "StartDate"],
										this.readBulkEmailCallback);
								this.set("IsCollapsedFiltersGroup", true);
							} else if (targetNode.config.stepType === CampaignEnums.StepType.EVENT) {
								this.readEntity("Event", recordId, ["StartDate"],
										this.readEventCallback);
							} else {
								this.updateInfoCaption();
							}
						}
					},

					/**
					 * Initializes block filter settings.
					 * @protected
					 * @param {Terrasoft.BaseViewModelCollection} items Filters Collection.
					 */
					initFilters: function(items) {
						var addInfo = this.get("DiagramElementAddInfo");
						this.initFiltersCollection(items, addInfo);
						var dayTransitionCount = addInfo.DayTransitionCount;
						var launchOptionRadio = addInfo.LaunchOptionRadio;
						this.set("LaunchOptionRadio", launchOptionRadio);
						if (addInfo.StartDate) {
							var startDate = new Date(addInfo.StartDate);
							this.set("StartDate", startDate);
						}
						var campaignPeriodDay = addInfo.CampaignPeriodDay;
						this.set("CampaignPeriodDay", campaignPeriodDay);
						var campaignPeriodTime = addInfo.CampaignPeriodTime;
						this.set("CampaignPeriodTime", campaignPeriodTime);
						if (dayTransitionCount >= 0) {
							this.set("DayTransitionCount", dayTransitionCount);
							this.onFilterChanged();
						} else {
							this.set("DayTransitionCount", "0");
							this.onFilterChanged();
						}
						this.set("TargetNodeEmailCategory", "");
						this.set("TargetNodeEmailLaunchOption", "");
						var sourceNode = this.get("DiagramElementSourceNode");
						var targetNode = this.sandbox.publish("FindConnectorTargetNode",
							this.get("DiagramElementTargetNode"), [this.sandbox.id]);
						this.initInfoLayoutVisibility(targetNode, sourceNode);
						this.initInfoCaption(targetNode, sourceNode);
						this.setDefaultFilters();
					},

					/**
					 * Sets default filters.
					 * @private
					 */
					setDefaultFilters: function() {
						if (this.getIsFeatureEnabled("OutboundCampaign")) {
							var sourceNodeType = this.getSourceNodeType();
							if (sourceNodeType === CampaignEnums.StepType.LANDING) {
								var filters = this.get("FiltersCollection");
								var hasEnabledFilter = false;
								var defaultFilter;
								var landingFilters = [CampaignEnums.CampaignFilter.FORM_SUBMITTED,
									CampaignEnums.CampaignFilter.FORM_NOT_SUBMITTED];
								Terrasoft.each(filters.getItems(), function(filter) {
									if (filter.get("Value")) {
										hasEnabledFilter = true;
									}
									var filterId = filter.get("Id");
									if (Terrasoft.contains(landingFilters, filterId) &&
											!this.getIsFilterAlreadySelected(filterId) && !defaultFilter) {
										defaultFilter = filter;
									}
								}, this);
								if (!hasEnabledFilter && defaultFilter) {
									defaultFilter.set("Value", true);
								}
							}
						}
					},

					/**
					 * Returns true if filter with @filterId already selected in other source node connection.
					 * @private
					 * @param {String} filterId Filter unique identifier.
					 * @return {Boolean}
					 */
					getIsFilterAlreadySelected: function(filterId) {
						var result = false;
						var selectedFilters = this.getSourceNodeSelectedFilters();
						Terrasoft.each(selectedFilters, function(selectedFilter) {
							if (selectedFilter.name !== this.get("DiagramElementId") &&
									filterId === selectedFilter.filter) {
								result = true;
							}
						}, this);
						return result;
					},

					/**
					 * Returns source node selected filters.
					 * @private
					 * @return {Array}
					 */
					getSourceNodeSelectedFilters: function() {
						var diagram = {};
						this.sandbox.publish("GetDiagramItems", diagram);
						var sourceNode = this.get("DiagramElementSourceNode");
						var sourceConnectors = Terrasoft.where(diagram.connectors, {
							sourceNode: sourceNode.name
						});
						return Terrasoft.reduce(sourceConnectors, function(memo, connector) {
							var addInfo = connector.addInfo;
							if (addInfo && !Ext.isEmpty(addInfo.Filters)) {
								memo.push({
									name: connector.name,
									filter: addInfo.Filters[0]
								});
							}
							return memo;
						}, [], this);
					},

					/**
					 * The callback function read properties associated events.
					 * @param {Terrasoft.BaseModel} entity Entity model.
					 */
					readEventCallback: function(entity) {
						var startDate = entity.get("StartDate");
						var startDateStr = "";
						if (startDate) {
							startDateStr = Terrasoft.utils.getTypedStringValue(startDate, Terrasoft.DataValueType.DATE);
						}
						this.set("LaunchDateStr", startDateStr);
						this.updateInfoCaption();
					},

					/**
					 * The callback function read properties associated email.
					 * @param {Terrasoft.BaseModel} entity Entity model.
					 */
					readBulkEmailCallback: function(entity) {
						var addInfo = this.get("DiagramElementAddInfo");
						var category = entity.get("Category") || {};
						var launchOption = entity.get("LaunchOption") || {};
						var categoryValue = category.value || "";
						var launchOptionValue = launchOption.value || "";
						this.set("TargetNodeEmailCategory", categoryValue);
						this.set("TargetNodeEmailLaunchOption", launchOptionValue);
						var startDate = entity.get("StartDate");
						var sourceNodeType = this.get("SourceNodeType");
						if (categoryValue === MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL &&
								sourceNodeType !== CampaignEnums.StepType.LANDING &&
								sourceNodeType !== CampaignEnums.StepType.CREATE_LEAD) {
							this.set("IsFiltersTimeContainerGroupVisible", true);
							this.set("IsSpecifiedTimeRadioVisible", true);
							this.set("IsFromCampaignRadioVisible", true);
							this.set("IsInstantlyRadioVisible", false);
							this.set("InfoLayoutVisible", false);
						} else if (categoryValue === MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL &&
								sourceNodeType === CampaignEnums.StepType.LANDING) {
							this.set("IsFiltersTimeContainerGroupVisible", true);
							this.set("IsSpecifiedTimeRadioVisible", true);
							if (addInfo && addInfo.Filters &&
									Terrasoft.contains(addInfo.Filters, CampaignEnums.CampaignFilter.FORM_NOT_SUBMITTED)) {
								this.set("IsFromCampaignRadioVisible", false);
								this.set("IsInstantlyRadioVisible", false);
							} else {
								this.set("IsFromCampaignRadioVisible", true);
								this.set("IsInstantlyRadioVisible", true);
							}
							this.set("InfoLayoutVisible", false);
						} else {
							this.set("InfoLayoutVisible", true);
						}
						var startDateStr = "";
						if (startDate) {
							startDateStr = Terrasoft.utils.getTypedStringValue(startDate,
								Terrasoft.DataValueType.DATE_TIME);
						}
						var startDateTime = this.get("StartDate");
						if (Ext.isEmpty(startDateTime)) {
							this.set("StartDate", startDate);
						}
						this.set("LaunchDateStr", startDateStr);
						this.updateInfoCaption();
						if (categoryValue === MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL &&
								launchOptionValue === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY) {
							this.set("CampaignPeriodVisible", true);
						} else {
							this.set("CampaignPeriodVisible", false);
						}
						if (categoryValue === MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL &&
								sourceNodeType !== CampaignEnums.StepType.CREATE_LEAD) {
							this.setDefaultValue();
						}
					},

					/**
					 * The initialization function module.
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.loadFilters();
							this.loadCampaignPeriodTime();
							this.on("change:DayTransitionCount", this.onDayTransitionCountChanged, this);
							this.on("change:LaunchOptionRadio", this.onCampaignPeriodChange, this);
							this.on("change:StartDate", this.onCampaignPeriodChange, this);
							this.on("change:CampaignPeriodDay", this.onCampaignPeriodChange, this);
							this.on("change:CampaignPeriodTime", this.onCampaignPeriodChange, this);
							callback.call(scope);
						}, this]);
					},

					/**
					 * Returns true if @node has EMAIL_MAILING step type.
					 * @private
					 * @param {Object} node Diagram node.
					 * @return {Boolean}
					 */
					getIsEmailMailingNode: function(node) {
						return node && node.config && node.config.stepType === CampaignEnums.StepType.EMAIL_MAILING;
					},

					/**
					 * Returns view configuration of the label.
					 * @protected
					 * @virtual
					 * @return {Object}
					 */
					getLabelConfig: function() {
						return {
							className: "Terrasoft.Label",
							caption: {bindTo: "Title"},
							classes: {labelClass: ["filter-control-label"]}
						};
					},

					/**
					 * Returns multilookup config for Bulk Email hyperlinks.
					 * @private
					 * @return {Object}
					 */
					getMultiLookupURLConfig: function() {
						return {
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["filter-url-wrap"]
							},
							visible: {bindTo: "getIsMultiLookupVisible"},
							items: [
								{
									className: "Terrasoft.Label",
									caption:  this.get("Resources.Strings.URLLabel"),
									classes: {labelClass: ["filter-control-label", "color-gray"]}
								},
								{
									className: "Terrasoft.TextEdit",
									rightIconClasses: ["lookup-edit-right-icon"],
									rightIconClick: {bindTo: "openHyperlinksLookup"},
									value: {bindTo: "BulkEmailHyperlinksValue"},
									hint: {
										bindTo: "BulkEmailHyperlinks",
										bindConfig: {"converter": "getBulkEmailHyperlinksList"}
									}
								}
							]
						};
					},

					/**
					 * Returns view configuration of the checkbox.
					 * @protected
					 * @virtual
					 * @return {Object}
					 */
					getCheckBoxConfig: function() {
						var config = {
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["filters-grid-row"]
							},
							items: [
								{
									className: "Terrasoft.Container",
									classes: {
										wrapClassName: ["filter-control-wrap"]
									},
									items: [
										{
											className: "Terrasoft.CheckBoxEdit",
											classes: {wrapClass: ["filter-control-checkbox"]},
											checked: {bindTo: "Value"},
											enabled: {bindTo: "IsStatusEnabled"}
										}
									]
								},
								{
									className: "Terrasoft.Container",
									classes: {
										wrapClassName: ["filter-label-wrap"]
									},
									items: [
										this.getLabelConfig()
									]
								}
							]
						};
						var sourceNode = this.get("DiagramElementSourceNode");
						if (this.getIsFeatureEnabled("OutboundCampaign") && this.getIsEmailMailingNode(sourceNode)) {
							config.items.push(this.getMultiLookupURLConfig());
						}
						return config;
					},

					/**
					 * Returns view configuration of the radio button.
					 * @protected
					 * @virtual
					 * @return {Object}
					 */
					getRadioButtonConfig: function() {
						var labelConfig =  this.getLabelConfig();
						var radioButtonId = Terrasoft.Component.generateId();
						labelConfig.inputId = radioButtonId;
						return {
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["filters-grid-row", "radio-button-container"]
							},
							items: [
								{
									id: radioButtonId,
									className: "Terrasoft.RadioButton",
									tag: true,
									checked: {bindTo: "Value"},
									enabled: {bindTo: "IsStatusEnabled"},
									classes: {wrapClass: ["filter-control-checkbox"]}
								},
								labelConfig
							]
						};
					},

					/**
					 * Returns view configuration for campaign filters.
					 * @param {Object} itemConfig Item configuration.
					 * @private
					 */
					getItemViewConfig: function(itemConfig) {
						var outboundCampaign = this.getIsFeatureEnabled("OutboundCampaign");
						var sourceNode = this.get("DiagramElementSourceNode");
						if (outboundCampaign && (sourceNode && sourceNode.config &&
								sourceNode.config.stepType === CampaignEnums.StepType.LANDING)) {
							itemConfig.config = this.getRadioButtonConfig();
						} else {
							itemConfig.config = this.getCheckBoxConfig();
						}
					},

					/**
					 * Loads the value of the referenced object in the field DiagramElementLookup.
					 * @overridden
					 */
					loadDiagramEntity: function(callback, scope) {
						callback.call(scope);
					},

					/**
					 * The event handler field changes DayTransitionCount.
					 * @param {Array} events Array of events.
					 * @param {Number} value Setting value.
					 * @private
					 */
					onDayTransitionCountChanged: function(events, value) {
						this.validateDayTransitionCount(value);
						this.onFilterChanged();
					},

					/**
					 * Checks the limit values of the field DayTransitionCount.
					 * @param {Number} value Field value.
					 * @private
					 */
					validateDayTransitionCount: function(value) {
						var minDayTransitionCount = 0;
						var maxDayTransitionCount = 100;
						Terrasoft.SysSettings.querySysSettingsItem("MaxDayTransitionCount", function(value) {
							maxDayTransitionCount = value;
						}, this);
						if (!Ext.isEmpty(value)) {
							this.un("change:DayTransitionCount", this.onDayTransitionCountChanged, this);
							if (value > maxDayTransitionCount) {
								this.set("DayTransitionCount", maxDayTransitionCount);
								this.onFilterChanged();
							} else if (value < minDayTransitionCount) {
								this.set("DayTransitionCount", minDayTransitionCount);
								this.onFilterChanged();
							}
							this.on("change:DayTransitionCount", this.onDayTransitionCountChanged, this);
						} else {
							this.set("DayTransitionCount", minDayTransitionCount);
							this.onFilterChanged();
						}
					},

					/**
					 * Returns text information block when the next elemental Email.
					 * @return {String} Text.
					 */
					getEmailMailingInfoCaption: function() {
						var text = resources.localizableStrings.EmptyEmailInfoCaption;
						if (this.get("IsTargetElementSet")) {
							var targetNodeEmailCategory = this.get("TargetNodeEmailCategory");
							var targetNodeEmailLaunchOption = this.get("TargetNodeEmailLaunchOption");
							if (targetNodeEmailCategory === MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL) {
								if (targetNodeEmailLaunchOption ===
										MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE) {
									text = resources.localizableStrings.TriggerredEmailImmediateInfoCaption;
								} else if (targetNodeEmailLaunchOption ===
										MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) {
									text = resources.localizableStrings.TriggerredEmailScheduledInfoCaption;
								}
							} else if (targetNodeEmailCategory === MarketingEnums.BulkEmailCategory.MASS_MAILING) {
								text = resources.localizableStrings.MassMailingEmailInfoCaption;
							}
						}
						return text;
					},

					/**
					 * Returns text information block when the next elemental Event.
					 * @return {String} Text.
					 */
					getEventInfoCaption: function() {
						var text = resources.localizableStrings.EmptyEventInfoCaption;
						if (this.get("IsTargetElementSet")) {
							text = resources.localizableStrings.EventInfoCaption;
						}
						return text;
					},

					/**
					 * Sets the text of the information block.
					 * @return {String} Text.
					 */
					updateInfoCaption: function() {
						var text = "";
						var targetNode = this.sandbox.publish("FindConnectorTargetNode",
							this.get("DiagramElementTargetNode"), [this.sandbox.id]);
						if (this.Ext.isEmpty(targetNode)) {
							return;
						}
						if (targetNode.config.stepType === CampaignEnums.StepType.EMAIL_MAILING) {
							text = this.getEmailMailingInfoCaption();
						}
						if (targetNode.config.stepType === CampaignEnums.StepType.EVENT) {
							text = this.getEventInfoCaption();
						}
						if (targetNode.config.stepType === CampaignEnums.StepType.LANDING) {
							text = resources.localizableStrings.LandingInfoCaption;
						}
						text = Ext.String.format(text, this.get("LaunchDateStr"));
						this.set("InfoCaption", text);
					},

					/**
					 * Open lookup.
					 */
					loadCampaignPeriodLookup: function(arg, tag) {
						var config = {entitySchemaName: tag};
						if (tag !== undefined) {
							LookupUtilities.Open(this.sandbox, config, function(response) {
								if (response.selectedRows &&
									response.selectedRows.collection && response.selectedRows.collection.length > 0) {
									this.set(tag, response.selectedRows.collection.items[0]);
								}
							}, this);
						}
					},

					/**
					 * The event handler field changes CampaignPeriod.
					 * @private
					 */
					onCampaignPeriodChange: function() {
						var launchOption = this.get("LaunchOptionRadio");
						var dayTransitionCount = 0;
						if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) {
							var campaignPeriodDay = this.get("CampaignPeriodDay");
							if (!Ext.isEmpty(campaignPeriodDay)) {
								dayTransitionCount = campaignPeriodDay;
							}
							this.set("DayTransitionCount", dayTransitionCount);
							this.onFilterChanged();
							return;
						} else if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY) {
							var campaignPeriodTime = this.get("CampaignPeriodTime");
							if (!Ext.isEmpty(campaignPeriodTime)) {
								var recordId = campaignPeriodTime.value;
								this.readEntity("CampaignPeriodTime", recordId, ["Time"],
									this.readCampaignPeriodTimeCallback);
							} else {
								this.set("DayTransitionCount", dayTransitionCount);
								this.onFilterChanged();
							}
						} else if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE) {
							this.un("change:DayTransitionCount", this.onDayTransitionCountChanged, this);
							dayTransitionCount = -1;
							this.set("DayTransitionCount", dayTransitionCount);
							this.on("change:DayTransitionCount", this.onDayTransitionCountChanged, this);
							this.onFilterChanged();
						}
					},

					/**
					 * The callback function read properties associated CampaignPeriodTime.
					 * @param {Terrasoft.BaseModel} entity Entity model.
					 */
					readCampaignPeriodTimeCallback: function(entity) {
						var time = entity.get("Time") || {};
						this.set("DayTransitionCount", time);
						this.onFilterChanged();
					},

					/**
					 * Set default value launch option radio buttons and campaign period day
					 */
					setDefaultValue: function() {
						var launchOptionRadio = this.get("LaunchOptionRadio");
						if (Ext.isEmpty(launchOptionRadio)) {
							this.set("LaunchOptionRadio",
								MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED);
							this.set("CampaignPeriodDay", 1);
						}
						var campaignPeriodTime = this.get("CampaignPeriodTime");
						if (Ext.isEmpty(campaignPeriodTime)) {
							var list = this.get("CampaignPeriodTimeList");
							var item = list && list.collection && list.collection.items[0];
							if (!Ext.isEmpty(item)) {
								this.set("CampaignPeriodTime", item);
							}
						}
						/*var startDate = this.get("StartDate");
						if (Ext.isEmpty(startDate)) {
							this.set("StartDate", new Date("0001.01.01 00:00"));
						}*/
					},

					/**
					 * Processor group counterpart communication switches.
					 * @protected
					 * @param {Boolean} checked The current value of the radio buttons.
					 * @param {String} value The current value of the group of radio buttons.
					 */
					onLaunchOptionChanged: function(checked, value) {
						if (checked) {
							if (value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) {
								this.set("IsCampaignPeriodDayVisible", true);
								var targetNodeType = this.get("TargetNodeType");
								if (targetNodeType === CampaignEnums.StepType.TARGET ||
									targetNodeType === CampaignEnums.StepType.EXITING_CAMPAIGN) {
									this.set("IsStartDateVisible", false);
								} else {
									this.set("IsStartDateVisible", true);
								}
								this.set("IsCampaignPeriodTimeVisible", false);
							} else if (value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY) {
								this.set("IsCampaignPeriodDayVisible", false);
								this.set("IsStartDateVisible", false);
								this.set("IsCampaignPeriodTimeVisible", true);
							} else if (value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE) {
								this.set("IsCampaignPeriodDayVisible", false);
								this.set("IsStartDateVisible", false);
								this.set("IsCampaignPeriodTimeVisible", false);
							}
						}
					},

					/**
					 * Create collection, function call from CampaignDiagramPropertyModule before bind.
					 */
					beforeBind: function() {
						if (!this.get("CampaignPeriodTimeList")) {
							this.set("CampaignPeriodTimeList", this.Ext.create("Terrasoft.Collection"));
						}
					},

					/**
					 * Load CampaignPeriodTime and fill collection ComboBox control.
					 */
					loadCampaignPeriodTime: function() {
						var list = this.get("CampaignPeriodTimeList");
						if (list === null) {
							return;
						}
						list.clear();
						var selectCampaignPeriodTime = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "CampaignPeriodTime"
						});
						selectCampaignPeriodTime.addColumn("Id");
						selectCampaignPeriodTime.addColumn("Name");
						var columnTime = selectCampaignPeriodTime.addColumn("Time");
						columnTime.orderPosition = 1;
						columnTime.orderDirection = Terrasoft.OrderDirection.ASC;
						selectCampaignPeriodTime.getEntityCollection(function(result) {
							var collection = result.collection;
							var columns = {};
							if (collection && collection.collection.length > 0) {
								Terrasoft.each(collection.collection.items, function(item) {
									var lookupValue = {
										displayValue: item.values.Name,
										value: item.values.Id
									};
									if (!list.contains(item.values.Id)) {
										columns[item.values.Id] = lookupValue;
									}
								}, this);
								list.loadAll(columns);
							}
						}, this);
					}

				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "CampaignDiagramPropertyDescriptionContainer"
					},
					{
						"operation": "remove",
						"name": "DiagramElementLookup"
					},
					{
						"operation": "insert",
						"name": "InfoContainer",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "InfoLayout",
						"parentName": "InfoContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"visible": {"bindTo": "InfoLayoutVisible"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "InfoLayout",
						"propertyName": "items",
						"name": "InformationTooltipButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "InfoButtonImageConfig"},
							"classes": {
								"wrapperClass": ["no-padding", "info-button"],
								"imageClass": ["info-button-image", "size-24px"]
							},
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 1,
								"rowSpan": 1
							},
							"showTooltip": false
						}
					},
					{
						"operation": "insert",
						"parentName": "InfoLayout",
						"propertyName": "items",
						"name": "InformationLabel",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "InfoCaption"},
							"classes": {
								"labelClass": [
									"description-label", "color-gray"
								],
								"wrapClass": [
									"description-wrap"
								]
							},
							"layout": {
								"column": 3,
								"row": 0,
								"colSpan": 21,
								"rowSpan": 2
							}
						}
					},
					{
						"operation": "insert",
						"name": "FiltersCaption",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": resources.localizableStrings.FiltersContainerCaption,
							"items": [],
							"visible": {
								"bindTo": "FiltersCollection",
								"bindConfig": {
									converter: function(value) {
										return (value && value.collection.length > 0);
									}
								}
							},
							"controlConfig": {
								"collapsed": {
									"bindTo": "IsCollapsedFiltersGroup"
								}
							}
						}
					},
					{
						"operation": "insert",
						"name": "FiltersContainer",
						"parentName": "FiltersCaption",
						"propertyName": "items",
						"values": {
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"idProperty": "Id",
							"collection": "FiltersCollection",
							"observableRowNumber": 10,
							"onGetItemConfig": "getItemViewConfig",
							"classes": {
								"wrapClassName": ["connector-filters"]
							}
						}
					},
					{
						"operation": "merge",
						"name": "FiltersCaption",
						"values": {
							"visible": {
								"bindTo": "isFiltersContainerVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "FiltersTimeContainerGroup",
						"parentName": "InfoContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": resources.localizableStrings.FiltersTimeContainerCaption,
							"items": [],
							"visible": {
								"bindTo": "IsFiltersTimeContainerGroupVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "SpecifiedTimeRadio",
						"values": {
							"caption": "RADIO",
							"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
							"value": {"bindTo": "LaunchOptionRadio"},
							"items": [
								{
									"name": "SpecifiedTime",
									"caption": {"bindTo": "Resources.Strings.SpecifiedTimeCaption"},
									"value": MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED,
									"controlConfig": {
										"checkedchanged": {"bindTo": "onLaunchOptionChanged"}
									},
									"enabled": {
										"bindTo": "IsStatusEnabled"
									},
									"visible": {"bindTo": "IsSpecifiedTimeRadioVisible"}
								}
							]
						},
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items",
						"name": "CampaignPeriodDay",
						"values": {
							"caption": resources.localizableStrings.CampaignPeriodDayCaption,
							"dataValueType": Terrasoft.DataValueType.INTEGER,
							"visible": {
								"bindTo": "IsCampaignPeriodDayVisible"
							},
							"enabled": {
								"bindTo": "IsStatusEnabled"
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items",
						"name": "StartDate",
						"values": {
							"caption": resources.localizableStrings.StartDateCaption,
							"dataValueType": Terrasoft.DataValueType.TIME,
							"visible": {
								"bindTo": "IsStartDateVisible"
							},
							"enabled": {
								"bindTo": "IsStatusEnabled"
							}
						}
					},
					{
						"operation": "insert",
						"name": "FromCampaignRadio",
						"values": {
							"caption": "RADIO",
							"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
							"value": {"bindTo": "LaunchOptionRadio"},
							"items": [
								{
									"name": "FromCampaign",
									"caption": {"bindTo": "Resources.Strings.FromCampaignCaption"},
									"value": MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY,
									"controlConfig": {
										"checkedchanged": {"bindTo": "onLaunchOptionChanged"}
									},
									"enabled": {
										"bindTo": "IsStatusEnabled"
									},
									"visible": {"bindTo": "IsFromCampaignRadioVisible"}
								}
							]
						},
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items",
						"name": "CampaignPeriodTime",
						"values": {
							"dataValueType": Terrasoft.DataValueType.ENUM,
							"visible": {"bindTo": "IsCampaignPeriodTimeVisible"},
							"caption": resources.localizableStrings.CampaignPeriodTimeCaption,
							"controlConfig": {
								"className": "Terrasoft.ComboBoxEdit",
								"list": {
									"bindTo": "CampaignPeriodTimeList"
								},
								"prepareList": {
									"bindTo": "loadCampaignPeriodTime"
								},
								"value": {
									"bindTo": "CampaignPeriodTime"
								},
								"enabled": {
									"bindTo": "IsStatusEnabled"
								}
							}
						}
					},
					{
						"operation": "insert",
						"name": "InstantlyRadio",
						"values": {
							"caption": "RADIO",
							"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
							"value": {"bindTo": "LaunchOptionRadio"},
							"items": [
								{
									"name": "Instantly",
									"caption": {
										"bindTo": "Resources.Strings.InstantlyCaption"
									},
									"value": MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE,
									"controlConfig": {
										"checkedchanged": {
											"bindTo": "onLaunchOptionChanged"
										}
									},
									"enabled": {
										"bindTo": "IsStatusEnabled"
									},
									"visible": {
										"bindTo": "IsInstantlyRadioVisible"
									}
								}
							]
						},
						"parentName": "FiltersTimeContainerGroup",
						"propertyName": "items"
					}
				]/**SCHEMA_DIFF*/
			};
		});



Terrasoft.configuration.Structures["FullPipelineChartSchema"] = {innerHierarchyStack: ["FullPipelineChartSchema"]};
define('FullPipelineChartSchemaStructure', ['FullPipelineChartSchemaResources'], function(resources) {return {schemaUId:'4186bb62-e955-4f4e-8451-16d88647a837',schemaCaption: "FullPipelineChartSchema", parentSchemaName: "", schemaName:'FullPipelineChartSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FullPipelineChartSchema", [
	"GoogleTagManagerUtilities",
	"DashboardEnums",
	"FullPipelineServiceRequest"
], function(GoogleTagManagerUtilities) {
	return {
		parentClassName: "Terrasoft.ChartViewModel",
		entitySchemaName: "",
		properties: {
			/**
			 * Default full pipeline slice type.
			 * @type {Terrasoft.DashboardEnums.PipelineSliceType}
			 */
			defaultPipelineSliceType: Terrasoft.DashboardEnums.PipelineSliceType.BY_COUNT
		},
		attributes: {
			/**
			 * Show settings button flag.
			 * @type {Boolean}
			 */
			ShowSettingsButton: {
				value: false
			},
			/**
			 * Current full pipeline slice type.
			 * @type {Terrasoft.DashboardEnums.PipelineSliceType}
			 */
			CurrentSliceType: {
				dataValueType: Terrasoft.DataValueType.VIRTUAL_COLUMN
			},
			
			/**
			 * Slice's values attributes configuration
			 * @type {Array}
			 */
			SlicesValuesProperties: {
				dataValueType: Terrasoft.DataValueType.VIRTUAL_COLUMN
			},
			/**
			 * Symbol of primary currency.
			 * @type {String}
			 */
			PrimaryCurrencySymbol: {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},
		methods: {
			/**
			 * @inheritDoc Terrasoft.ChartViewModel#init
			 * @override
			 */
			init: function() {
				this.on("change:StartDate", this.onStartDateChange, this);
				this.on("change:DueDate", this.onDueDateChange, this);
				this.sandbox.subscribe("FiltersChanged", this.updateStartAndDueDateByPeriod, this);
				this.sandbox.subscribe(
					"RefreshFullPipelineWidget",
					function(entitiesConfig) {
						this.set("entities", entitiesConfig.entities);
						this.getChartSeriesData();
					},
					this,
					[this.sandbox.id]
				);
				this._initSlicesValuesProperties();
				this.callParent(arguments);
				this.Terrasoft.chain(
					this._loadReferencedSchemas,
					this.initProfile,
					this._initPrimaryCurrencySymbol,
					this.getChartSeriesData,
					this
				);
				this._sendGoogleTagManagerData();
			},
			
			/**
			 * @private
			 */
			_loadReferencedSchemas: function(callback, scope) {
				this.Terrasoft.eachAsync(
					this.$entities,
					function(entityConfig, next) {
						var schemaName = entityConfig.schemaName;
						var entity = this.Terrasoft[schemaName];
						if (schemaName && this.Ext.isEmpty(entity)) {
							this.Terrasoft.require([entityConfig.schemaName], next, this);
						} else {
							this.Ext.callback(next, scope);
						}
					},
					function() {
						this.Ext.callback(callback, scope);
					}
				);
			},
			
			/**
			 * @private
			 */
			_sendGoogleTagManagerData: function() {
				GoogleTagManagerUtilities.actionModule({
					virtualUrl: this.Terrasoft.workspaceBaseUrl + "/" + this.sandbox.id,
					moduleName: this.sandbox.moduleName,
					schemaName: this.name,
					chartType: "FullPipeline"
				});
			},
			
			/**
			 * Initializes slice's values attributes configuration.
			 * @private
			 */
			_initSlicesValuesProperties: function() {
				var slicesValuesProperties = this.getSlicesPropertiesConfig();
				this.set("SlicesValuesProperties", slicesValuesProperties);
			},
			
			/**
			 * Returns slice values properties.
			 * @private
			 * @param {Object} predicate Predicate object.
			 * @return {Object} Slice values properties.
			 */
			_getSliceProperties: function(predicate) {
				return this.Terrasoft.findWhere(this.get("SlicesValuesProperties"), predicate);
			},
			
			/**
			 * Returns configuration of slice's values.
			 * @protected
			 * @virtual
			 * @return [Array] Slice's values attributes configuration.
			 */
			getSlicesPropertiesConfig: function() {
				return [
					{
						slice: Terrasoft.DashboardEnums.PipelineSliceType.BY_COUNT,
						displayValueAttributeName: "CountInStage",
						popupValueAttributeNames: ["Amount"],
						tag: "byNumberConversion"
					},
					{
						slice: Terrasoft.DashboardEnums.PipelineSliceType.STAGE_CONVERSION,
						displayValueAttributeName: "ConversionToStage",
						popupValueAttributeNames: ["ConversionToStage", "ConversionToStageCount"],
						tag: "stageConversion"
					},
					{
						slice: Terrasoft.DashboardEnums.PipelineSliceType.TO_FIRST_STAGE,
						displayValueAttributeName: "ConversionToFirstStage",
						popupValueAttributeNames: ["ConversionToFirstStage", "ConversionToFirstStageCount"],
						tag: "toFirstConversion"
					}
				];
			},
			
			/**
			 * Returns true if current pressed button tag equals to passed tag.
			 * @param {String} tag Button tag to check.
			 * @return {Boolean} Check result.
			 */
			getIsPressedButtonSetting: function(tag) {
				var currentSliceConfig =
					this._getSliceProperties({
						slice: this.get("CurrentSliceType")
					}) || {};
				return currentSliceConfig.tag === tag;
			},
			
			/**
			 * Handles change slice type button click.
			 */
			updatePipelineSliceTypeHandler: function() {
				var tag = arguments[arguments.length - 1];
				var selectedSliceConfig = this._getSliceProperties({
					tag: tag
				});
				this._setActiveSlice(selectedSliceConfig.slice);
			},
			
			/**
			 * Returns default element attribute value template.
			 * @private
			 * @return {String} Element attribute value template.
			 */
			_getValueAttributeTemplate: function(attribute) {
				return this._getAttributeTemplate(attribute, "AttributeTemplate");
			},
			
			/**
			 * Returns element attribute template when pipeline has no data.
			 * @private
			 * @return {String} Element attribute template.
			 */
			_getNoDataAttributeTemplate: function(attribute) {
				return this._getAttributeTemplate(attribute, "NoDataTemplate");
			},
			
			/**
			 * Returns element attribute template.
			 * @private
			 * @return {String} Default element attribute template.
			 */
			_getAttributeTemplate: function(attribute, resourceName) {
				const template = this.get(this.Ext.String.format("Resources.Strings.{0}{1}", attribute, resourceName));
				return this.Ext.isEmpty(template) ? this.get("Resources.Strings.AttributeDefaultTemplate") : template;
			},
			
			/**
			 * Returns name of class used to get chart view. See {@link Terrasoft.ChartModule.viewConfigClassName} for
			 * details.
			 * @return {String}
			 */
			getViewConfigClassName: function() {
				return "Terrasoft.FullPipelineViewConfig";
			},
			
			/**
			 * Reserialize filter to remove incorrect filter items.
			 * @param config - full pipeline entity config.
			 * @private
			 */
			_sanitizeFilter: function(config) {
				const filter = Terrasoft.deserialize(config.filters);
				if (!filter) {
					return;
				}
				config.filters = filter.serialize();
			},
			
			/**
			 * Returns pipeline data request config.
			 * @protected
			 * @virtual
			 * @return {Object} Pipeline data request config.
			 */
			getRequestConfig: function() {
				const entitiesConfig = Terrasoft.deepClone(this.$entities);
				this.Terrasoft.each(entitiesConfig, this._sanitizeFilter);
				return {
					pipelineConfig: {
						entities: entitiesConfig
					}
				};
			},
			
			/**
			 * Handles full pipeline data load.
			 * @protected
			 * @virtual
			 * @param {Object} response Service data response.
			 * @param {Object} response.info Pipeline info.
			 * @param {Object} response.info.slices Pipeline slices data info.
			 * @param {Object} response.info.stagesInfo Pipeline stages info.
			 */
			onDataLoaded: function(response) {
				this._getEncodedValues(response.info.stagesInfo);
				this.set("Slices", response.info.slices);
				this.set("Stages", response.info.stagesInfo);
				this._setActiveSlice(this.get("CurrentSliceType") || this.defaultPipelineSliceType);
			},
			
			/**
			 * @private
			 */
			_getEncodedValues: function(stages) {
				stages.forEach(function(stage) {
					stage.displayValue = this.Terrasoft.encodeHtml(stage.displayValue);
				});
			},
			
			/**
			 * Returns available stage groups.
			 * @private
			 * @return {Array} available stage groups list
			 */
			_getStageGroups: function() {
				let result = [];
				this.Terrasoft.each(
					this.$entities,
					function(entity) {
						if (!this.Ext.isEmpty(entity.groups)) {
							result = result.concat(entity.groups);
						}
					},
					this
				);
				return result;
			},
			
			/**
			 * @private Returns collapsed stage groups list.
			 * @param {Array} stageGroups list of available stage groups.
			 * @param {Array} expandedRootStagesIdList list of stage group id which was expanded by user.
			 * @return {Array} collapsed stage groups list.
			 */
			_getCollapsedGroups: function(stageGroups, expandedRootStagesIdList) {
				if (!expandedRootStagesIdList) {
					return stageGroups;
				}
				return this.Terrasoft.filter(stageGroups, function(group) {
					return !expandedRootStagesIdList.includes(group.rootStageId);
				});
			},
			
			/**
			 * @private Calculates values amount by given char data field for concrete stage group.
			 * @param {Object} stageGroup stage group to filter chart data.
			 * @param {Array} rawData chart data.
			 * @param {string} fieldName field name to calculate value sum.
			 */
			_getChartDataFieldSumByGroup: function(stageGroup, rawData, fieldName) {
				let sum = 0;
				let row = null;
				let nextElement = null;
				const stageIdListToAggregate = stageGroup.childStageIdList.concat([stageGroup.rootStageId]);
				this.Terrasoft.each(
					stageIdListToAggregate,
					function(stageId) {
						row = this._findRawDataRow(stageId, rawData);
						if (!row) {
							return false;
						}
						nextElement = Terrasoft.findWhere(row.elements, {
							name: fieldName
						});
						sum += nextElement ? nextElement.value : 0;
					},
					this
				);
				return sum;
			},
			
			/**
			 * Aggregates chart data values by given field for concrete stage groups.
			 * @private
			 * @param {Array} stageGroupList stage groups for chart data aggregate.
			 * @param {Array} rawData chart data.
			 * @param {string} fieldName field to aggregate.
			 * @returns {Array} aggregated chart data.
			 */
			_getAggregatedDataByStageGroups: function(stageGroupList, rawData, fieldName) {
				let data = this.Terrasoft.deepClone(rawData);
				this.Terrasoft.each(
					stageGroupList,
					function(stageGroup) {
						let nextSum = this._getChartDataFieldSumByGroup(stageGroup, rawData, fieldName);
						const rootStageDataElement = this._findRawDataRow(stageGroup.rootStageId, data);
						const rawDataFieldIndex = this.Terrasoft.map(rootStageDataElement.elements, function(element) {
							return element.name;
						}).indexOf(fieldName);
						if (rawDataFieldIndex !== -1) {
							rootStageDataElement.elements[rawDataFieldIndex].value = nextSum;
						}
					},
					this
				);
				return data;
			},
			
			/**
			 * Excludes child stages from every group in given stage group list.
			 * @private
			 * @param {Array} stageGroupListToCollapse stage group list to collapse.
			 * @return {Array} list of stage groups which contains only root stages in groups.
			 */
			_collapseGroups: function(stageGroupListToCollapse) {
				let result = this.Terrasoft.deepClone(this.$Stages);
				this.Terrasoft.each(
					stageGroupListToCollapse,
					function(group) {
						result = this._excludeStagesFromStageInfo(group.childStageIdList, result);
					},
					this
				);
				return result;
			},
			
			/**
			 * Excludes list of stages from stage info array.
			 * @private
			 * @param {Array} stageIdList list of stage id to exclude from stage info array.
			 * @param {Array} stagesInfo stage info array.
			 * @return {Array} stage info array without excluded stages.
			 */
			_excludeStagesFromStageInfo: function(stageIdList, stagesInfo) {
				return this.Terrasoft.filter(stagesInfo, function(info) {
					return !stageIdList.includes(info.id);
				});
			},
			
			/**
			 * Searches stage data in chart data array.
			 * @private
			 * @param {string} stageId stage id to search stage data.
			 * @param {Array} rawData chart data.
			 * @return {Object} stage data.
			 */
			_findRawDataRow: function(stageId, rawData) {
				return this.Terrasoft.where(rawData.data, {stageId: stageId})[0];
			},
			
			/**
			 * Toggles the visual state (expand or collapse) of stage with given id.
			 * @private
			 * @param {string} stageId stage id to toggle state.
			 */
			_toggleStageState: function(stageId) {
				let expandedStages = this.$Profile.ExpandedStageIdCollection || [];
				if (!expandedStages.includes(stageId)) {
					expandedStages.push(stageId);
				} else {
					expandedStages = this.Terrasoft.without(expandedStages, stageId);
				}
				this._saveChartStateToProfile(expandedStages);
			},
			
			/**
			 * Processes service pipeline data.
			 * @protected
			 * @param {Object} rawData Raw response data.
			 * @param {Object} rawData.data Pipeline data.
			 * @return {Array} Formed pipeline data.
			 */
			processData: function(rawData) {
				const collapsedGroups = this._getCollapsedGroups(
					this._getStageGroups(),
					this.$Profile.ExpandedStageIdCollection || []
				);
				const aggregatedRawData = this._getAggregatedDataByStageGroups(collapsedGroups, rawData, "CountInStage");
				const stagesInfo = this._collapseGroups(collapsedGroups, this.$Stages);
				const resultData = [];
				const sliceProps = this._getSliceProperties({
					slice: this.get("CurrentSliceType")
				});
				const displayValueAttributeName = sliceProps.displayValueAttributeName;
				const popupValueAttributeNames = sliceProps.popupValueAttributeNames;
				const hasData = this._checkPipelineHasData(aggregatedRawData.data, displayValueAttributeName);
				this.Terrasoft.each(
					stagesInfo,
					function(stageInfo, index) {
						const isRootStage = this._isExpandableStage(stageInfo.id);
						const stage = this.Terrasoft.findWhere(aggregatedRawData.data, {
							stageId: stageInfo.id
						});
						const displayData = stage
							? this.Terrasoft.findWhere(stage.elements, {
								name: displayValueAttributeName
							})
							: null;
						const displayValueDefaultConfig = {
							defaultAttributeName: displayValueAttributeName,
							defaultAttributeValue: 0
						};
						if (!hasData) {
							const noDataDisplayValueTemplate = this._getNoDataAttributeTemplate(sliceProps.displayValueAttributeName);
							displayValueDefaultConfig.defaultTemplate = noDataDisplayValueTemplate;
						}
						const popupValues = this.formPopupValues(stage, popupValueAttributeNames);
						const resultElement = {
							schemaName: stageInfo.schemaName,
							schemaCaption: this._getSchemaCaption(stageInfo.schemaName),
							isExpandButtonVisible: isRootStage,
							stageId: stageInfo.id,
							stageName: stageInfo.displayValue,
							order: index,
							value: displayData ? displayData.value : 0,
							displayValue: this.formStageElementDisplayValue(displayData, displayValueDefaultConfig),
							popupValues: popupValues
						};
						resultData.push(resultElement);
					},
					this
				);
				return resultData;
			},
			
			/**
			 * Handles stage expand event.
			 * @public
			 * @param {string} stageId id of stage which was expanded/collapsed.
			 */
			onExpanded: function(stageId) {
				this._toggleStageState(stageId);
				this._setActiveSlice(this.get("CurrentSliceType") || this.defaultPipelineSliceType);
			},
			
			/**
			 * Forms popup values.
			 * @protected
			 * @param {Object} stage Stage data.
			 * @param {Array} stage.elements Stage data value elements.
			 * @param [Array] popupValueAttributeNames Array of popup value attributes.
			 * @return {Array} Formed popup values.
			 */
			formPopupValues: function(stage, popupValueAttributeNames) {
				const popupValues = [];
				popupValueAttributeNames = popupValueAttributeNames || [];
				popupValueAttributeNames.forEach(function(popupValueAttributeName) {
					let popupValue = "";
					const popupValueConfig = stage
						? this.Terrasoft.findWhere(stage.elements, {
							name: popupValueAttributeName
						})
						: null;
					popupValue = this.formStageElementDisplayValue(popupValueConfig, {
						defaultAttributeName: popupValueAttributeName,
						defaultAttributeValue: 0
					});
					popupValues.push(popupValue);
				}, this);
				return popupValues;
			},
			
			/**
			 * Checks if stage can be expanded by the user.
			 * @private
			 * @param {string} stageId stage id to check.
			 * @return {boolean} logic value that determinate whether the stage can be expanded.
			 */
			_isExpandableStage: function(stageId) {
				let isExpandableStage = false;
				Terrasoft.each(this.$entities, function(entity) {
					Terrasoft.each(entity.groups, function(group) {
						if (group.rootStageId === stageId) {
							isExpandableStage = true;
							return false;
						}
					});
				});
				return isExpandableStage;
			},
			
			/**
			 * @private
			 */
			_checkPipelineHasData: function(data, displayValueAttributeName) {
				const notEmptyStagesData = this.Terrasoft.filter(
					data,
					function(stageItem) {
						var element = this.Terrasoft.where(stageItem.elements, {
							name: displayValueAttributeName,
							value: 0
						});
						return !element.length;
					},
					this
				);
				return Boolean(notEmptyStagesData.length);
			},
			
			/**
			 * Returns schema caption.
			 * @private
			 * @param {String} schemaName Entity schema name.
			 * @return {String} Entity schema caption.
			 */
			_getSchemaCaption: function(schemaName) {
				const entity = this.Terrasoft[schemaName];
				return (entity && entity.caption) || schemaName;
			},
			
			/**
			 * Returns popup element caption.
			 * @private
			 * @param {String} attributeName Popup attribute name.
			 * @return {String} Popup element caption.
			 */
			_getStageElementCaption: function(attributeName) {
				return (
					this.get(this.Ext.String.format("Resources.Strings.{0}AttributeCaption", attributeName)) || attributeName
				);
			},
			
			/**
			 * Form stage element value.
			 * @protected
			 * @virtual
			 * @param {Object} elementData Stage element.
			 * @param {String} elementData.name Stage element name.
			 * @param {Object} elementData.value Stage element value.
			 * @param {Object} [defaultsConfig] Defaults config.
			 * @param {String} [defaultsConfig.defaultAttributeName] Defaults attribute name.
			 * @param {String} [defaultsConfig.defaultAttributeValue] Defaults attribute value.
			 * @param {String} [defaultsConfig.defaultTemplate] Defaults attribute value template.
			 * @return {String} Stage display value.
			 */
			formStageElementDisplayValue: function(elementData, defaultsConfig) {
				if (this.Ext.isEmpty(elementData) && this.Ext.isEmpty(defaultsConfig)) {
					return "";
				}
				const attributeName = (elementData && elementData.name) || defaultsConfig.defaultAttributeName;
				const stageElementTemplate = defaultsConfig.defaultTemplate || this._getValueAttributeTemplate(attributeName);
				const stageElementCaption = this._getStageElementCaption(attributeName);
				const value =
					(elementData && String(this.Terrasoft.roundValue(elementData.value, 2))) ||
					defaultsConfig.defaultAttributeValue;
				return this.Ext.String.format(stageElementTemplate, stageElementCaption, value);
			},
			
			/**
			 * Sets funnel data according to active slice.
			 * @param {Terrasoft.DashboardEnums.PipelineSliceType} slice Slice type.
			 * @private
			 */
			_setActiveSlice: function(slice) {
				this.set("CurrentSliceType", slice);
				let sliceData = this.Terrasoft.findWhere(this.$Slices, {
					type: slice
				});
				let resultData = this.processData(sliceData);
				this.set("SeriesData", [
					{
						name: slice,
						data: resultData
					}
				]);
			},
			
			/**
			 * @inheritdoc Terrasoft.ChartModule#getChartSeriesData
			 * @override
			 */
			getChartSeriesData: function() {
				this._applyPeriodFilter();
				const request = new Terrasoft.FullPipelineServiceRequest(this.getRequestConfig());
				request.execute(this.onDataLoaded, this);
			},
			
			/**
			 * @inheritdoc Terrasoft.ChartViewModel#onProfileInitialized
			 * @protected
			 * @override
			 */
			onProfileInitialized: function() {
				this._initializePeriod();
				this.callParent(arguments);
			},
			
			/**
			 * @private
			 */
			_executeInPeriodChangeMode: function(callback) {
				if (this.$IsPeriodChanged) {
					return;
				}
				this.set("IsPeriodChanged", true);
				callback.call(this);
				this.set("IsPeriodChanged", false);
			},
			
			/**
			 * @private
			 */
			_initializePeriod: function() {
				var periodProfile = this.$Profile || {};
				var periodConfig = periodProfile.Period || {};
				if (periodConfig.startDate || periodConfig.dueDate) {
					this._executeInPeriodChangeMode(function() {
						this.set("StartDate", periodConfig.startDate ? new Date(periodConfig.startDate) : null);
						this.set("DueDate", periodConfig.dueDate ? new Date(periodConfig.dueDate) : null);
					});
				} else {
					var period = periodConfig.periodName || this.get("defPeriod");
					this.updateStartAndDueDateByPeriod(period);
				}
			},
			
			/**
			 * Sets StartDate and DueDate by period.
			 * @param {String} period Period name.
			 */
			updateStartAndDueDateByPeriod: function(period) {
				this._updatePeriodValue({
					filterName: period,
					periodConfig: {
						startDateColumnName: "StartDate",
						dueDateColumnName: "DueDate"
					}
				});
			},
			
			/**
			 * @private
			 */
			_checkDatePeriod: function(changedColumnName) {
				this._executeInPeriodChangeMode(function() {
					const value = this.get(changedColumnName);
					const startDate = this.$StartDate;
					const dueDate = this.$DueDate;
					if (changedColumnName !== "StartDate") {
						if (value && startDate && value <= startDate) {
							this.set("StartDate", this.Terrasoft.deepClone(value));
						}
					} else {
						if (value && dueDate && value >= dueDate) {
							this.set("DueDate", this.Terrasoft.deepClone(value));
						}
					}
					this.saveDatePeriodToProfile({
						startDate: this.$StartDate,
						dueDate: this.$DueDate
					});
					this._refreshData();
				});
			},
			
			/**
			 * @private
			 */
			_applyPeriodFilter: function() {
				if (!this.Ext.isEmpty(this.$entities)) {
					this.Terrasoft.each(
						this.$entities,
						function(e) {
							e.startDate = this.$StartDate;
							e.dueDate = this.$DueDate;
						},
						this
					);
				}
			},
			
			/**
			 * Event handler change start date.
			 */
			onStartDateChange: function() {
				this._checkDatePeriod("StartDate");
			},
			
			/**
			 * Event handler change due date.
			 */
			onDueDateChange: function() {
				this._checkDatePeriod("DueDate");
			},
			
			/**
			 * Clears period filters.
			 */
			clearPeriodFilter: function() {
				var tag = arguments[arguments.length - 1];
				this.setPeriod(tag);
			},
			
			/**
			 * Sets chosen period date to filter configuration.
			 * @param {Object} tag Element tag from periods menu.
			 */
			setPeriod: function(tag) {
				if (!tag) {
					return;
				}
				this._updatePeriodValue(tag);
				this._refreshData();
			},
			
			/**
			 * @private
			 */
			_updatePeriodValue: function(tag) {
				var periodName = tag.filterName;
				var periodValues = {
					startDate: null,
					dueDate: null
				};
				if (periodName) {
					periodName = periodName.substring(periodName.lastIndexOf("_") + 1);
					periodValues = this.getPeriodByName(periodName);
				}
				var periodFilterConfig = tag.periodConfig;
				this._executeInPeriodChangeMode(function() {
					this.set(periodFilterConfig.startDateColumnName, periodValues.startDate);
					this.set(periodFilterConfig.dueDateColumnName, periodValues.dueDate);
					this.saveDatePeriodToProfile({
						periodName: tag.filterName
					});
				});
			},
			
			/**
			 * @private
			 */
			_refreshData: function() {
				this.getChartSeriesData();
				this.refresh();
			},
			
			/**
			 * Saves filter date values in schema profile.
			 * @protected
			 * @param {Object} periodConfig Date period config.
			 * @param {DateTime} [periodConfig.startDate] Filter start date.
			 * @param {DateTime} [periodConfig.dueDate] Filter due date.
			 */
			saveDatePeriodToProfile: function(periodConfig) {
				var profile = this.$Profile;
				var profileKey = this.getProfileKey();
				this.Terrasoft.saveUserProfile(profileKey, profile, false);
			},
			
			/**
			 * @private
			 */
			_saveChartStateToProfile: function(expandedStageIdCollection) {
				let profile = this.$Profile;
				let profileKey = this.getProfileKey();
				profile.ExpandedStageIdCollection = expandedStageIdCollection;
				this.Terrasoft.saveUserProfile(profileKey, profile, false);
			},
			
			/**
			 * @inheritdoc Terrasoft.ChartViewModel#getProfileKey
			 * @override
			 */
			getProfileKey: function() {
				return this.Ext.String.format("{0}_{1}", this.name, this.$instanceUniqueKey || this.$caption);
			},
			
			/**
			 * @inheritdoc Terrasoft.ChartViewModel#getProfileKeyByEntitySchemaName
			 * @override
			 */
			getProfileKeyByEntitySchemaName: function() {
				return this.Ext.String.format(
					"{0}_{1}",
					this.getProfileKey(),
					this.Terrasoft.map(this.$entities, function(e) {
						return e.schemaName;
					}).join("_")
				);
			},
			
			/**
			 * Returns start and end of period by its name.
			 * @protected
			 * @param {String} periodName Period name.
			 * @return {Object} Start and end of period.
			 */
			getPeriodByName: function(periodName) {
				var startDate = new Date();
				let result;
				var actions = [this._getPeriodByDay, this._getPeriodByWeek, this._getPeriodByMonth];
				actions.forEach(function(predicate) {
					result = predicate.call(this, periodName) || result;
				});
				if (this.Ext.isEmpty(result)) {
					return {
						startDate: this.Terrasoft.startOfMonth(startDate),
						dueDate: this.Terrasoft.endOfMonth(startDate)
					};
				}
				return result;
			},
			
			/**
			 * Returns start and end of period by day.
			 * @param {String} periodName Period name.
			 * @return {Object|Null} Start and end of period.
			 * @private
			 */
			_getPeriodByDay: function(periodName) {
				let startDate = new Date();
				let dueDate;
				switch (periodName) {
					case "Yesterday":
						startDate = this.Terrasoft.startOfDay(this.Ext.Date.add(startDate, "d", -1));
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					case "Today":
						startDate = this.Terrasoft.startOfDay(startDate);
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					case "Tomorrow":
						startDate = this.Terrasoft.startOfDay(this.Ext.Date.add(startDate, "d", 1));
						dueDate = this.Terrasoft.endOfDay(startDate);
						break;
					default:
						return null;
				}
				return {
					startDate: startDate,
					dueDate: dueDate
				};
			},
			
			/**
			 * Returns start and end of period by week.
			 * @param {String} periodName Period name.
			 * @return {Object|Null} Start and end of period.
			 * @private
			 */
			_getPeriodByWeek: function(periodName) {
				let startDate = new Date();
				let dueDate;
				switch (periodName) {
					case "PastWeek":
						startDate = this.Terrasoft.startOfWeek(this.Ext.Date.add(startDate, "d", -7));
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					case "CurrentWeek":
						startDate = this.Terrasoft.startOfWeek(startDate);
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					case "NextWeek":
						startDate = this.Terrasoft.startOfWeek(this.Ext.Date.add(startDate, "d", 7));
						dueDate = this.Terrasoft.endOfWeek(startDate);
						break;
					default:
						return null;
				}
				return {
					startDate: startDate,
					dueDate: dueDate
				};
			},
			
			/**
			 * Returns start and end of period by month.
			 * @param {String} periodName Period name.
			 * @return {Object|Null} Start and end of period.
			 * @private
			 */
			_getPeriodByMonth: function(periodName) {
				let startDate = new Date();
				let dueDate;
				switch (periodName) {
					case "PastMonth":
						startDate = this.Terrasoft.startOfMonth(this.Ext.Date.add(startDate, "mo", -1));
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					case "NextMonth":
						startDate = this.Terrasoft.startOfMonth(this.Ext.Date.add(startDate, "mo", 1));
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					case "CurrentMonth":
						startDate = this.Terrasoft.startOfMonth(startDate);
						dueDate = this.Terrasoft.endOfMonth(startDate);
						break;
					default:
						return null;
				}
				return {
					startDate: startDate,
					dueDate: dueDate
				};
			},
			
			/**
			 * @private
			 */
			_initPrimaryCurrencySymbol: function(callback, scope) {
				if (this.$PrimaryCurrencySymbol) {
					this.Ext.callback(callback, scope);
					return;
				}
				var initSymbolCallback = this._initPrimaryCurrencySymbolById.bind(this, callback, scope);
				this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", initSymbolCallback, this);
			},
			
			/**
			 * @private
			 */
			_initPrimaryCurrencySymbolById: function(callback, scope, item) {
				if (this.Ext.isEmpty(item)) {
					this.Ext.callback(callback, scope);
					return;
				}
				var entitySchemaQuery = this.getCurrencyEntitySchemaQuery();
				var primaryCurrencyId = item.value;
				entitySchemaQuery.getEntity(
					primaryCurrencyId,
					function(response) {
						if (response && response.success) {
							var row = response.entity;
							var symbol = row && row.get("Symbol");
							if (this.Ext.isEmpty(symbol)) {
								var warnMessage = this.Ext.String.format("Can't find symbol for currency: {0}", primaryCurrencyId);
								this.log(warnMessage, this.Terrasoft.LogMessageType.WARNING);
							} else {
								this.$PrimaryCurrencySymbol = symbol;
								const newAmountTemplate = this.Ext.String.format(
									"{0} {1}",
									this.get("Resources.Strings.AttributeDefaultTemplate"),
									symbol
								);
								this.set("Resources.Strings.AmountAttributeTemplate", newAmountTemplate);
							}
							this.Ext.callback(callback, scope);
						}
					},
					this
				);
			},
			
			/**
			 * Returns query for currency symbol.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery} ESQ.
			 */
			getCurrencyEntitySchemaQuery: function() {
				var currentCultureId = this.Terrasoft.SysValue.CURRENT_USER_CULTURE.value;
				var entitySchemaQuery = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Currency",
					serverESQCacheParameters: {
						cacheLevel: this.Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: "Currency",
						cacheItemName: "CurrencySymbolForFullpipeline" + currentCultureId
					}
				});
				entitySchemaQuery.addColumn("Symbol");
				return entitySchemaQuery;
			},
			
			/**
			 * @inheritdoc Terrasoft.GridUtilities#reloadGridData
			 * @protected
			 */
			reloadGridData: Terrasoft.emptyFn
		}
	};
});



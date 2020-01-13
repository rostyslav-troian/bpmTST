Terrasoft.configuration.Structures["SummaryModuleV2"] = {innerHierarchyStack: ["SummaryModuleV2"]};
define("SummaryModuleV2", [
		"SummaryModuleV2Resources",
		"performancecountermanager",
		"MaskHelper",
		"ConfigurationConstants",
		"BaseModule"
	],
	function(resources, performanceCounterManager, MaskHelper, ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.SummaryModule
		 * Class Summary Module is designed to create a partition outcome of the module instance.
		 */
		Ext.define("Terrasoft.configuration.SummaryModule", {
			alternateClassName: "Terrasoft.SummaryModule",
			extend: "Terrasoft.BaseModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * Name the schema, which operates module.
			 * @private
			 */
			schemaName: null,

			/**
			 * Profile.
			 * @private
			 */
			profile: null,

			/**
			 * Key of the profile.
			 * @private
			 */
			profileKey: null,

			/**
			 * A flag that indicates whether the results are downloaded the first time.
			 * @private
			 */
			firstLoad: true,

			/**
			 * ############# #######
			 * @private
			 */
			sectionModuleId: null,

			/**
			 * Collection of instances results.
			 * @private
			 */
			itemsCollection: new Terrasoft.Collection(),

			/**
			 * Summary container id.
			 * @private
			 * @type {String}
			 */
			containerId: "summariesContainer",

			/**
			 * Summary container view.
			 * @private
			 * @type {Object}
			 */
			view: null,

			/**
			 * Summary item label class name.
			 * @private
			 * @type {String}
			 */
			summaryItemLabelClass: "summary-item-value",

			/**
			 * Root container.
			 * @private
			 * @type {Ext.dom.Element}
			 */
			rootContainer: null,

			/**
			 * Id of the last entity schema query.
			 * @private
			 * @type {String}
			 */
			lastEsqId: null,

			/**
			 * Query optimize options.
			 * @private
			 * @type {Object}
			 */
			queryOptimizeOptions: null,

			/**
			 * Messages for the organization of data exchange between modules.
			 * @private
			 */
			messages: {
				"FiltersChanged": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"ReloadSummaryModule": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"RecordsCountChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetQueryOptimizeOptions": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"NeedToUseQueryMetrics": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"SaveSummaryOptimizeOptions": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"GetQuickFilter": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"PushHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"SummaryItemsUpdate": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"GetSectionModuleId": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"QuickFilterChanged": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetSectionSchemaName": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"GetFiltersCollection": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"GetQuickFilterModuleId": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"ChangeGridUtilitiesContainerSize": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
			},

			/**
			 * Tags to send on message publish.
			 * @private
			 * @type {Array}
			 */
			messagePublishTags: [],

			/**
			 * Body mask id value.
			 * @private
			 * @type {String}
			 */
			_maskId: null,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModuleV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.registerSandboxMessages();
			},

			/**
			 * Registers sandbox messages.
			 * @protected
			 * @virtual
			 */
			registerSandboxMessages: function() {
				this.sandbox.registerMessages(this.messages);
			},

			/**
			 * Gets CSS selector of the container.
			 * @protected
			 * @return {String} CSS selector of the container.
			 */
			getContainerIdSelector: function() {
				return Ext.String.format("#{0}", this.containerId);
			},

			/**
			 * Gets CSS selector of the value container.
			 * @protected
			 * @return {String} CSS selector of the value container.
			 */
			getValueSelector: function() {
				return Ext.String.format("#{0} .{1}", this.containerId, this.summaryItemLabelClass);
			},

			/**
			 * Gets CSS mask selector.
			 * @protected
			 * @return {String} CSS selector of the mask container.
			 */
			getMaskSelector: function() {
				var containerSelector = this.getContainerIdSelector();
				var valueSelector = this.getValueSelector();
				var elements = this.Ext.select(valueSelector);
				var selector = elements.getCount() === 1 ? valueSelector : containerSelector;
				return selector;
			},

			/**
			 * Publishes message after summary items inserted or deleted.
			 * @private
			 */
			publishItems: function() {
				this.sandbox.publish("SummaryItemsUpdate", this.itemsCollection, [this.sandbox.id]);
			},

			/**
			 * Render module into container.
			 * @private
			 * @param {Ext.Element} renderTo Container for render.
			 */
			render: function(renderTo) {
				if (this.destroyed || (this.Ext.isObject(renderTo) && !renderTo.dom)) {
					return;
				}
				this.rootContainer = renderTo;
				this.initSchemaName();
				this.initProfileKey();
				this.loadProfile();
			},

			/**
			 * Subscribes sandbox messages.
			 * @protected
			 * @virtual
			 */
			subscribeSandboxMessages: function() {
				this.sandbox.subscribe("FiltersChanged", this.onFiltersChanged, this, [this.sectionModuleId]);
				this.sandbox.subscribe("ReloadSummaryModule", this.onFiltersChanged, this, [this.sectionModuleId]);
				this.sandbox.subscribe("RecordsCountChanged", this.onRecordsCountChanged, this,
					[this.sandbox.id]);
			},

			/**
			 * Initializes query optimize options.
			 * @protected
			 */
			initQueryOptimizeOptions: function() {
				this.queryOptimizeOptions = this.sandbox.publish("GetQueryOptimizeOptions", null,
					[this.sandbox.id]) || {};
			},

			/**
			 * Initialize schema name.
			 * @protected
			 */
			initSchemaName: function() {
				this.schemaName = this.sandbox.publish("GetSectionSchemaName", null, [this.sandbox.id]);
			},

			/**
			 * Initialize profile key.
			 * @private
			 */
			initProfileKey: function() {
				this.profileKey = this.Ext.String.format(ConfigurationConstants.SummaryModule.ProfileKeyTemplate,
					this.schemaName);
			},

			/**
			 * Loaded data from profile.
			 * @protected
			 */
			loadProfile: function() {
				var profileKey = Ext.String.format("profile!{0}", this.profileKey);
				this.Terrasoft.require([profileKey], this.onProfileLoaded, this);
			},

			/**
			 * Handler of loaded profile data.
			 * @protected
			 * @param {Object} profile Loaded profile data.
			 */
			onProfileLoaded: function(profile) {
				this.profile = profile;
				this.renderWrapContainer();
				this.renderCells();
				var filters = this.sandbox.publish("GetFiltersCollection", null, this.messagePublishTags);
				this.initQueryOptimizeOptions();
				this.updateSummaryItems(this.itemsCollection, filters);
				this.subscribeSandboxMessages();
			},

			/**
			 * Handles section rows count change.
			 * @protected
			 * @param {Number} value Rows count value.
			 */
			onRecordsCountChanged: function(value) {
				var itemsCollection = this.itemsCollection;
				if (this._isProfileEmpty()) {
					return;
				}
				var filteredCollection = itemsCollection.filterByFn(function(item) {
					return item.array[1] === "COUNT";
				}, this);
				var countItem = filteredCollection.first();
				if (!countItem) {
					return;
				}
				countItem.viewModel.set("columnValue", value);
			},

			/**
			 * Returns profile emptiness flag.
			 * @private
			 * @return {Boolean} Profile emptiness flag
			 */
			_isProfileEmpty: function() {
				var profile = this.profile;
				return this.Ext.isEmpty(profile);
			},

			/**
			 * Render summary wrap container.
			 * @protected
			 */
			renderWrapContainer: function() {
				this.sectionModuleId = this.sandbox.publish("GetSectionModuleId", null, this.messagePublishTags);
				var view = this.view = this.Ext.create("Terrasoft.Container", this.generateView(this.rootContainer));
				var viewModel = this.Ext.create("Terrasoft.BaseViewModel", this.generateViewModel());
				view.bind(viewModel);
			},

			/**
			 * Render summary cells.
			 * @protected
			 */
			renderCells: function() {
				var itemsCollection = this.itemsCollection;
				var profile = this.profile;
				if (this._isProfileEmpty()) {
					return;
				}
				itemsCollection.clear();
				this.Terrasoft.each(profile, this.addCell, this);
				this.publishItems();
			},

			/**
			 * Updates summary data.
			 * @param {Terrasoft.Collection} itemsCollection Summary collection.
			 * @param {Object} filters Section filters.
			 */
			updateSummaryItems: function(itemsCollection, filters) {
				var profile = this.profile;
				if (!profile || !profile.length) {
					return;
				}
				this.getSummaries(filters, function(response) {
					this.summariesResponseHandler(response, this.afterUpdateSummaryItems, this);
				});
			},

			/**
			 * Adds cell to summary container.
			 * @private
			 * @param {Object} profileItem Profile item.
			 * @param {Number} index index of the profile item.
			 */
			addCell: function(profileItem, index) {
				var itemsCollection = this.itemsCollection;
				var renderTo = this.getContainerEl();
				var profileColumns = this.profile;
				var profileColumn = profileColumns[index];
				var key = Ext.String.format("item_{0}", index);
				var viewModel = this.getViewModelCell(key, profileColumn);
				var view = this.getViewCell(renderTo, key);
				view.bind(viewModel);
				itemsCollection.add(key, {
					view: view,
					viewModel: viewModel,
					array: profileColumn
				});
			},

			/**
			 * Gets view model of the cell.
			 * @private
			 * @param {String} key Key of the view model.
			 * @param profileColumn Profile column.
			 * @return {Terrasoft.BaseViewModel} View model of the cell.
			 */
			getViewModelCell: function(key, profileColumn) {
				var viewModel = this.Ext.create("Terrasoft.BaseViewModel", this.generateViewModelItem());
				Ext.apply(viewModel, {
					key: key,
					deleteItem: this.deleteCells.bind(viewModel, this)
				});
				var columnCaption = this.getColumnCaption(profileColumn);
				viewModel.set("columnCaption", columnCaption);
				return viewModel;
			},

			/**
			 * Gets view of the cell.
			 * @private
			 * @param {Ext.dom.Element} renderTo Render to container.
			 * @param {String} key Key of the view.
			 * @return {Terrasoft.Container} View of the cell.
			 */
			getViewCell: function(renderTo, key) {
				return this.Ext.create("Terrasoft.Container", this.generateViewItem(renderTo, key));
			},

			/**
			 * Handler of delete cell.
			 * @protected
			 * @param {Object} moduleContext
			 */
			deleteCells: function(moduleContext) {
				var itemsCollection = moduleContext.itemsCollection;
				var item = itemsCollection.removeByKey(this.key);
				item.view.destroy();
				this.destroy();
				moduleContext.saveDataToProfile(itemsCollection);
				moduleContext.publishItems();
			},

			/**
			 * Handler of FiltersChanged message.
			 * @protected
			 * @param {Object} config Config of the FiltersChanged message.
			 */
			onFiltersChanged: function() {
				var itemsCollection = this.itemsCollection;
				var filters = this.sandbox.publish("GetFiltersCollection", null, this.messagePublishTags);
				this.initQueryOptimizeOptions();
				this.updateSummaryItems(itemsCollection, filters);
			},

			/**
			 * Gets container element.
			 * @private
			 * @return {Ext.dom.Element} Container element.
			 */
			getContainerEl: function() {
				return Ext.get(this.containerId);
			},

			/**
			 * Updates view model cell of the response data model.
			 * @protected
			 * @param {Terrasoft.model.BaseViewModel} responseModel Response model.
			 */
			updateViewModelCells: function(responseModel) {
				var itemsCollection = this.itemsCollection;
				var profile = this.profile;
				this.Terrasoft.each(profile, function(profileColumn, index) {
					var key = this.Ext.String.format("item_{0}", index);
					if (!itemsCollection.contains(key)) {
						return;
					}
					var columns = profile[index];
					var columnName = this.Ext.String.format("{0}{1}", columns[0], columns[1]);
					var item = itemsCollection.get(key);
					var viewModel = item.viewModel;
					var columnValue = responseModel.get(columnName);
					var column = responseModel.getColumnByName(columnName);
					if (column || !this._canUseQueryOptimization) {
						columnValue = this.Terrasoft.utils.string.getTypedStringValue(columnValue,
							column && column.dataValueType);
						viewModel.set("columnValue", columnValue);
					}
				}, this);
			},

			/**
			 * Gets caption of the profile column.
			 * @private
			 * @param {Array} profileColumn profile column.
			 * @return {String} Profile column caption.
			 */
			getColumnCaption: function(profileColumn) {
				var columnCaption = profileColumn[2];
				return this.Ext.String.format("{0}: ", columnCaption);
			},

			/**
			 * Create a query based on the profile and filters
			 * and passed collection of elements to the callback function
			 * @param {Terrasoft.Collection} filters Filters collection.
			 * @param {Function} callback Callback function.
			 */
			getSummaries: function(filters, callback) {
				this.abortPreviousEsq();
				this.showContainerMask();
				var esq = this.getESQ(filters);
				this.usedReExecute = false;
				esq.on("reexecute", this.onQueryReExecute, this);
				if (!this._hasQueryAggregationColumns(esq) && this.queryOptimizeOptions.queryOptimizeCount) {
					this.hideContainerMask();
					return;
				}
				esq.getEntityCollection(function (response) {
					this.destroyQueryEvents(esq);
					callback.call(this, response);
				}, this);
				this.lastEsqId = esq.instanceId;
			},

			destroyQueryEvents: function(esq) {
				esq.un("reexecute", this.onQueryReExecute, this);
			},

			/**
			 * Returns flag that esq has aggregation columns.
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 * @return {Boolean} Has aggregation columns flag.
			 */
			_hasQueryAggregationColumns: function(esq) {
				var columns = esq.columns.filterByFn(function(column) {
					return column.aggregationType !== this.Terrasoft.AggregationType.NONE;
				}, this);
				return !columns.isEmpty();
			},

			/**
			 * Cancels previous summary request.
			 * @private
			 */
			abortPreviousEsq: function() {
				var lastEsqId = this.lastEsqId;
				if (lastEsqId) {
					this.Terrasoft.AjaxProvider.abortRequestByInstanceId(lastEsqId);
				}
			},

			/**
			 * Handles re execute event.
			 */
			onQueryReExecute: function() {
				this.usedReExecute = true;
			},

			/**
			 * Returns entity schema query.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
			 */
			createEsq: function() {
				const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.schemaName
				});
				esq.querySource = this.Terrasoft.QuerySource.FILTER_SUMMARY;
				esq.useMetrics = this.sandbox.publish("NeedToUseQueryMetrics", null,
					[this.sandbox.id]);
				if (this.queryOptimizeOptions) {
					esq.queryOptimize = this.queryOptimizeOptions.queryOptimizeCount;
					esq.useReExecute = this.queryOptimizeOptions.useReExecuteCount;
				}
				return esq;
			},

			/**
			 * Gets entity schema query with filters and aggregation columns.
			 * @private
			 * @param {Terrasoft.Collection} filters
			 * @return {Terrasoft.EntitySchemaQuery} Returns entity schema query with filters and aggregation columns.
			 */
			getESQ: function(filters) {
				var esq = this.createEsq();
				var count = this.profile.length;
				for (var i = 0; i < count; i++) {
					switch (this.profile[i][1]) {
						case "COUNT":
							if (!this.queryOptimizeOptions.useCountOver) {
								esq.addAggregationSchemaColumn(this.profile[i][0],
									this.Terrasoft.AggregationType.COUNT, this.profile[i][0] + this.profile[i][1]);
							}
							break;
						case "SUM":
							esq.addAggregationSchemaColumn(this.profile[i][0],
								this.Terrasoft.AggregationType.SUM, this.profile[i][0] + this.profile[i][1]);
							break;
						case "AVG":
							esq.addAggregationSchemaColumn(this.profile[i][0],
								this.Terrasoft.AggregationType.AVG, this.profile[i][0] + this.profile[i][1]);
							break;
						case "MIN":
							esq.addAggregationSchemaColumn(this.profile[i][0],
								this.Terrasoft.AggregationType.MIN, this.profile[i][0] + this.profile[i][1]);
							break;
						case "MAX":
							esq.addAggregationSchemaColumn(this.profile[i][0],
								this.Terrasoft.AggregationType.MAX, this.profile[i][0] + this.profile[i][1]);
							break;
						default:
							break;
					}
				}
				if (filters && filters.collection.length > 0) {
					esq.filters.add("quickFilter", filters);
				}
				return esq;
			},
			
			/**
			 * Handles after added items from profile.
			 * @protected
			 */
			afterAddItemsFromProfile: function() {
				this.hideContainerMask();
			},

			/**
			 * Handles after update summary items.
			 * @protected
			 */
			afterUpdateSummaryItems: function() {
				this.hideContainerMask();
			},

			/**
			 * ######### ######### ###### # #######
			 * @param {Terrasoft.Collection} itemsList
			 */
			saveDataToProfile: function(itemsList) {
				var array = [];
				itemsList.each(function(item) {
					array.push([item.array[0], item.array[1], item.array[2], item.array[3], item.array[4]]);
				});
				this.profile = array;
				this.Terrasoft.utils.saveUserProfile(this.profileKey, this.profile, false);
			},

			/**
			 * ########## ############# ######## ######
			 * @returns {Object}
			 */
			generateViewModelItem: function() {
				var viewModel = {
					values: {
						columnCaption: "",
						columnValue: ""
					},
					methods: {}
				};
				return viewModel;
			},

			/**
			 * ########## ###### ############# ######## ######
			 * @returns {Object}
			 */
			generateViewModel: function() {
				var viewModel = {
					values: {},
					methods: {}
				};
				return viewModel;
			},

			/**
			 * ########## ###### ############# ######## ######
			 * @param {Object} renderTo
			 * @param {String} key
			 * @returns {Object}
			 */
			generateViewItem: function(renderTo, key) {
				var summaryItemLabelClass = this.summaryItemLabelClass;
				var view = {
					renderTo: renderTo,
					id: "itemSummaryViewV2" + key,
					selectors: {
						el: "#itemSummaryViewV2" + key,
						wrapEl: "#itemSummaryViewV2" + key
					},
					classes: {
						wrapClassName: ["summary-item-container"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: {
								bindTo: "columnCaption"
							},
							classes: {
								labelClass: ["summary-item-caption"]
							},
							width: "auto"
						},
						{
							className: "Terrasoft.Label",
							caption: {
								bindTo: "columnValue"
							},
							classes: {
								labelClass: [summaryItemLabelClass]
							},
							width: "auto",
							markerValue: {
								bindTo: "columnCaption"
							}
						},
						{
							className: "Terrasoft.Button",
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							imageConfig: resources.localizableImages.ImageDeleteButton,
							classes: {
								wrapperClass: ["summary-delete-button-wrapperEl"],
								imageClass: ["summary-delete-button-image-size"]
							},
							click: {
								bindTo: "deleteItem"
							},
							markerValue: {
								bindTo: "columnCaption"
							}
						}
					]
				};
				return view;
			},

			/**
			 * Handles summary query response.
			 * @param {Object} response Response.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope.
			 */
			summariesResponseHandler: function(response, callback, scope) {
				this.sandbox.publish("SaveSummaryOptimizeOptions", {
					success: response.success,
					usedReExecute: this.usedReExecute
				}, [this.sandbox.id]);
				const collection = response.collection;
				const responseModel = collection.getByIndex(0);
				this.updateViewModelCells(responseModel);
				Ext.callback(callback, scope || this);
				performanceCounterManager.setTimeStamp("loadAdditionalModulesComplete");
			},

			/**
			 * ########## ############# ######## ######
			 * @param {Object} renderTo
			 * @returns {Object}
			 */
			generateView: function(renderTo) {
				var view = {
					renderTo: renderTo,
					id: this.containerId,
					selectors: {
						wrapEl: this.getContainerIdSelector()
					},
					classes: {
						wrapClassName: ["summaries-container"]
					},
					items: []
				};
				return view;
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @overridden
			 * @param {Object} config ######### ########### ######
			 */
			destroy: function(config) {
				if (this.destroyed) {
					return;
				}
				const messageKeys = Terrasoft.keys(this.messages);
				this.sandbox.unRegisterMessages(messageKeys);
				if (this.viewModel) {
					this.viewModel.destroy(config);
				}
			},

			/**
			 * Showing loading mask of the container.
			 * @protected
			 */
			showContainerMask: function() {
				if (this.isRendered()) {
					this._maskId = MaskHelper.showBodyMask({
						selector: this.getMaskSelector(),
						timeout: 0,
						caption: null
					});
				}
			},

			/**
			 * Hides loading mask of the container.
			 * @protected
			 */
			hideContainerMask: function() {
				MaskHelper.hideBodyMask({
					maskId: this._maskId,
					selector: this.getMaskSelector()
				});
			},

			/**
			 * Checks rendered view.
			 * @private
			 * @return {Boolean} True if view rendered to DOM.
			 */
			isRendered: function() {
				var view = this.view;
				var wrapEl = view && view.getWrapEl();
				return !Ext.isEmpty(wrapEl);
			},

			/**
			 * Adds summary items to collection by profile and filters.
			 * @deprecated
			 * @param {Object} renderTo Render container.
			 * @param {Terrasoft.Collection} itemsCollection Collection of summary items.
			 * @param {Object} filters Filters for summary items.
			 */
			addItemsFromProfile: function(renderTo, itemsCollection, filters) {
				var profile = this.profile;
				if (!profile || !profile.length) {
					return;
				}
				this.getSummaries(filters, function(response) {
					this.summariesResponseHandler(response, this.afterAddItemsFromProfile, this);
				});
			}
		});
		return Terrasoft.SummaryModule;
	}
);



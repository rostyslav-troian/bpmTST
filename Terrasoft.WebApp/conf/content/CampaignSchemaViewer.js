Terrasoft.configuration.Structures["CampaignSchemaViewer"] = {innerHierarchyStack: ["CampaignSchemaViewer"]};
define("CampaignSchemaViewer", ["CampaignSchemaViewerViewModel",
		"CampaignAnalyticsDiagram", "CampaignElementSchemaManager", "CampaignElementSchemaManagerEx"], function() {
	Ext.define("Terrasoft.configuration.CampaignSchemaViewer", {
		extend: "Terrasoft.BaseSchemaDesigner",
		alternateClassName: "Terrasoft.CampaignSchemaViewer",

		/**
		 * Name of ViewModel class.
		 * @type {String}
		 */
		designerViewModelClassName: "Terrasoft.CampaignSchemaViewerViewModel",

		/**
		 * Campaign diagram.
		 * @private
		 * @type {Terrasoft.Diagram}
		 */
		diagram: null,

		/**
		 * Diagram config.
		 * @type {Object}
		 */
		diagramConfig: {
			classes: {
				wrapClassName: ["ej-diagram", "ts-box-sizing"]
			},
			items: {
				bindTo: "Items"
			}
		},

		/**
		 * Default campaign entity schema unique identifier.
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * Default campaign unique identifier.
		 * @type {String}
		 */
		entityId: null,

		/**
		 * Designer ViewModel.
		 * @type {Terrasoft.BaseViewModel}
		 */
		designerViewModel: null,

		/**
		 * Container for designer content.
		 * @type {Terrasoft.Container}
		 */
		contentContainer: null,

		/**
		 * Name of schema diagram class name.
		 * @type {String}
		 */
		schemaDiagramClassName: "Terrasoft.CampaignAnalyticsDiagram",

		/**
		 * Creates diagram control.
		 * @private
		 * @return {Terrasoft.Diagram}
		 */
		_createDiagram: function() {
			var config = Ext.apply({}, this.diagramConfig, {
				id: this.id
			});
			var diagram = this.diagram = Ext.create(this.schemaDiagramClassName, config);
			return diagram;
		},

		/**
		 * Gets campaign participants analytics.
		 * @private
		 * @param {Object} filters The analytics filters.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The context.
		 */
		_getAnalyticsData: function(filters, callback, scope) {
			var dateNow = "\/Date(" + new Date().getTime() + ")\/";
			var startDate, dueDate;
			startDate = dueDate = dateNow;
			var useTimeFilters = !!(filters.startDate && filters.dueDate);
			if (useTimeFilters) {
				startDate = "\/Date(" + filters.startDate.getTime() + ")\/";
				dueDate = "\/Date(" + filters.dueDate.getTime() + ")\/";
			}
			var dataSend = {
				request: {
					campaignId: this.entityId,
					filterStartDate: startDate,
					filterDueDate: dueDate,
					useTimeFilters: useTimeFilters
				}
			};
			var config = {
				serviceName: "CampaignService",
				methodName: "GetParticipantsAnalytics",
				data: dataSend
			};
			Terrasoft.ConfigurationServiceProvider.callService.call(this, config, callback, scope);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaDesigner#render
		 * @override
		 */
		render: function(config) {
			this.onBeforeDesignerRender();
			this.renderDesignContainer(config.renderTo);
			this.initDesignerManagers(this.onAfterDesignerRender, this);
		},

		/**
		 * Method to execute additional operations before designer rendered.
		 * @protected
		 */
		onBeforeDesignerRender: function() {
			this.maskId = Terrasoft.Mask.show({timeout: 0});
		},

		/**
		 * Init managers.
		 * @protected
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		initDesignerManagers: function(callback, scope) {
			Terrasoft.CampaignElementSchemaManager.initialize(function() {
				callback.call(scope);
			});
		},

		/**
		 * Method to execute additional operations after designer rendered.
		 * @protected
		 */
		onAfterDesignerRender: function() {
			this.designerViewModel.init();
		},

		/**
		 * Renders design container.
		 * @param {Ext.dom.Element} renderTo Render container.
		 * @protected
		 */
		renderDesignContainer: function(renderTo) {
			this.designContainer = this.createDesignContainer();
			this.designerViewModel = this.createDesignerViewModel();
			var designContainer = this.designContainer;
			var designerViewModel = this.designerViewModel;
			designContainer.render(renderTo);
			designContainer.bind(designerViewModel);
			designerViewModel.on("initializeBadges", this.onInitializeBadges, this);
			designerViewModel.on("initialized", this.onDesignerViewModelInitialized, this);
		},

		/**
		 * Creates designer view model.
		 * @protected
		 * @return {Terrasoft.ProcessSchemaDesignerViewModel} View model
		 */
		createDesignerViewModel: function() {
			var config = this.getDesignerViewModelConfig();
			return Ext.create(this.designerViewModelClassName, config);
		},

		/**
		 * Returns config for designer view model.
		 * @protected
		 * @return {Object}
		 */
		getDesignerViewModelConfig: function() {
			return {
				sandbox: this.sandbox,
				id: this.id,
				values: {
					SchemaUId: this.schemaUId,
					PackageUId: this.packageUId,
					EntitySchemaUId: this.entitySchemaUId,
					EntityId: this.entityId
				}
			};
		},

		/**
		 * Handler for event "initialized" of DesignerViewModel.
		 * @protected
		 */
		onDesignerViewModelInitialized: function() {
			this.fireEvent("loadcomplete", this);
			Terrasoft.Mask.hide(this.maskId);
		},

		/**
		 * Creates diagram container.
		 * @return {Terrasoft.Container}
		 */
		createDiagramContainer: function() {
			var diagramContainer = Ext.create("Terrasoft.Container", {
				id: this.id + "-diagram-ct",
				classes: {
					wrapClassName: ["diagram", "ts-box-sizing"]
				},
				items: []
			});
			return diagramContainer;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaDesigner#createDesignContainer
		 * @override
		 */
		createDesignContainer: function() {
			var designContainer = this.callParent(arguments);
			var contentContainer = this.contentContainer = Ext.create("Terrasoft.Container", {
				id: this.id + "-content",
				classes: {wrapClassName: ["content", "ts-box-sizing"]},
				items: []
			});
			designContainer.add(contentContainer);
			var diagramContainer = this.diagramContainer = this.createDiagramContainer();
			contentContainer.add(diagramContainer);
			var diagram = this._createDiagram();
			this.diagramContainer.add(diagram);
			return designContainer;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaDesigner#onSandboxInitialized
		 * @override
		 */
		onSandboxInitialized: function() {
			this.callParent();
			var sandbox = this.sandbox;
			sandbox.registerMessages({
				"GetAnalyticsConfigForViewer": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},
				"AnalyticsFiltersChangeForViewer": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				"ShowBadgesChangeForViewer": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				}
			});
			sandbox.subscribe("AnalyticsFiltersChangeForViewer", this.onAnalyticsFiltersChange,
				this, [this.sandbox.id]);
			sandbox.subscribe("ShowBadgesChangeForViewer", this.onShowBadgesChange, this, [this.sandbox.id]);
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			if (this.designerViewModel) {
				this.designerViewModel.destroy();
			}
			this.callParent(arguments);
		},

		/**
		 * Handles changes of analytics filters.
		 * @param {Object} config The analytics config.
		 */
		onAnalyticsFiltersChange: function(config) {
			var startDate = config.periodFilter.startDate;
			var dueDate = config.periodFilter.dueDate;
			if ((startDate && dueDate) || (!startDate && !dueDate)) {
				this._getAnalyticsData(config.periodFilter, function(response) {
					var resultData = response.GetParticipantsAnalyticsResult;
					this.diagram.updateBadges(resultData.analyticsItems);
				}, this);
			} else {
				this.diagram.updateBadges([]);
			}
		},

		/**
		 * Handles changes of analytics visibility.
		 * @param {Object} showBadges The badges visibility config.
		 */
		onShowBadgesChange: function(showBadges) {
			this.diagram.showNonCompletedCount = showBadges.showNonComplete;
			this.diagram.showCompletedCount = showBadges.showComplete;
			this.diagram.showErrorCount = showBadges.showError;
			this.diagram.showProcessingCount = showBadges.showProcessing;
			this.diagram.showSuspendedCount = showBadges.showSuspended;
			var diagramInst = this.diagram.getInstance();
			this.diagram.renderBadges(diagramInst._svg, diagramInst._adornerLayer);
		},

		/**
		 * Handles initialization of analytics badges.
		 */
		onInitializeBadges: function() {
			var config = this.sandbox.publish("GetAnalyticsConfigForViewer", null, [this.sandbox.id]);
			if (config) {
				var showNonCompleted = config.badgesConfig.showNonComplete;
				var showCompleted = config.badgesConfig.showComplete;
				var showError = config.badgesConfig.showError;
				var showProcessing = config.badgesConfig.showProcessing;
				var showSuspended = config.badgesConfig.showSuspended;
				this.diagram.showNonCompletedCount = showNonCompleted;
				this.diagram.showCompletedCount = showCompleted;
				this.diagram.showErrorCount = showError;
				this.diagram.showProcessingCount = showProcessing;
				this.diagram.showSuspendedCount = showSuspended;
				var startDate = config.periodFilter.startDate;
				var dueDate = config.periodFilter.dueDate;
				if ((startDate && dueDate) || (!startDate && !dueDate)) {
					this._getAnalyticsData(config.periodFilter, function(response) {
						var resultData = response.GetParticipantsAnalyticsResult;
						if(resultData.analyticsItems.length) {
							this.diagram.updateBadges(resultData.analyticsItems);
						}
					}, this);
				}
			}
		}
	});
	return Terrasoft.CampaignSchemaViewer;
});



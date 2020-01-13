Terrasoft.configuration.Structures["CampaignDiagramPropertyModule"] = {innerHierarchyStack: ["CampaignDiagramPropertyModule"]};
define("CampaignDiagramPropertyModule", ["CampaignDiagramPropertyEnums"],
	function(PropertyEnums) {
		Ext.define("Terrasoft.configuration.CampaignDiagramPropertyModule", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.CampaignDiagramPropertyModule",
			Ext: null,
			Terrasoft: null,
			sandbox: null,
			renderTo: null,
			viewModel: null,
			isNew: true,
			isReady: true,
			columns: {
				DiagramElementId: null,
				DiagramElementCategory: "",
				DiagramElementCaption: "",
				DiagramElementPage: "",
				DiagramElementTypeId: "",
				DiagramElementPageTypeCaption: "",
				DiagramElementPageIcon: null,
				DiagramElementRecordId: null,
				DiagramElementSchemaName: null,
				DiagramElementAddInfo: null,
				DiagramElementSourceNode: null,
				DiagramElementTargetNode: null,
				DiagramElementInEdges: null,
				DiagramElementOutEdges: null
			},

			/**
			 * ####### ############# ######.
			 * @protected
			 * @overridden
			 */
			init: function() {
				this.subscribeMessages();
			},

			/**
			 * ####### ######### ######.
			 * @protected
			 * @virtual
			 */
			clearColumns: function() {
				this.columns.DiagramElementId = null;
				this.columns.DiagramElementCategory = PropertyEnums.DiagramElementCategory.DEFAULT;
				this.columns.DiagramElementCaption = "";
				this.columns.DiagramElementPage = "";
				this.columns.DiagramElementTypeId = "";
				this.columns.DiagramElementPageTypeCaption = "";
				this.columns.DiagramElementRecordId = null;
				this.columns.DiagramElementSchemaName = null;
				this.columns.DiagramElementAddInfo = null;
				this.columns.DiagramElementPageIcon = null;
				this.columns.DiagramElementSourceNode = null;
				this.columns.DiagramElementTargetNode = null;
				this.columns.DiagramElementInEdges = null;
				this.columns.DiagramElementOutEdges = null;
			},

			/**
			 * ############## ######### ######.
			 * @protected
			 * @virtual
			 * @param {Object} event ###### ####### #########.
			 */
			initColumns: function(event) {
				this.clearColumns();
				if (event) {
					var initConfig = {
						element: {
							addInfo: {RecordId: null},
							labels: [{text: ""}]
						},
						elementType: PropertyEnums.DiagramElementCategory.DEFAULT
					};
					event = Ext.merge({}, initConfig, event);
					var element =  event.element;
					var elementCaption = element.labels[0].text;
					elementCaption = elementCaption.trim() ? elementCaption : "";
					this.columns.DiagramElementCaption = elementCaption;
					this.columns.DiagramElementRecordId = element.addInfo.RecordId;
					this.columns.DiagramElementId = element.name;
					this.columns.DiagramElementCategory = event.elementType;
					this.columns.DiagramElementTypeId = element.stepType;
					this.columns.DiagramElementAddInfo = element.addInfo;
					this.columns.DiagramElementSourceNode = event.sourceNode;
					this.columns.DiagramElementTargetNode = event.targetNode;
					this.columns.DiagramElementInEdges = event.inEdges;
					this.columns.DiagramElementOutEdges = event.outEdges;
					this.columns.IsStatusEnabled = event.isStatusEnabled;
				}
			},

			/**
			 * ########## ####### DiagramElementChanged.
			 * @protected
			 * @virtual
			 */
			diagramElementChanged: function(config) {
				if (!this.isReady) {
					return;
				}
				this.isReady = false;
				this.isNew = false;
				this.initColumns(config);
				this.render();
			},

			/**
			 * ############# ## #########.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				this.sandbox.subscribe("DiagramElementChanged", this.diagramElementChanged, this,
					[this.sandbox.id]);
			},

			/**
			 * ############## ##### ##### ######## # ####### ### SchemaBuilder.
			 * @param {Function} callback ####### ######### ######.
			 * @protected
			 * @virtual
			 */
			initSchemaBuilderProperty: function(callback) {
				var config = {};
				switch (this.columns.DiagramElementCategory) {
					case PropertyEnums.DiagramElementCategory.DEFAULT:
						config = PropertyEnums.SchemaBuilderConfig.Default;
						break;
					case PropertyEnums.DiagramElementCategory.NODE:
						config = PropertyEnums.SchemaBuilderConfig.Node[this.columns.DiagramElementTypeId];
						break;
					case PropertyEnums.DiagramElementCategory.CONNECTOR:
						config = PropertyEnums.SchemaBuilderConfig.Connector;
						break;
				}
				this.columns.DiagramElementPage = config.pageSchemaName;
				this.columns.DiagramElementSchemaName = config.schemaName;
				this.columns.DiagramElementPageTypeCaption = config.pageTypeCaption;
				this.columns.DiagramElementPageIconUrl = config.pageIconUrl;
				callback();
			},

			/**
			 * ############# ######## # ViewModel ######.
			 * @protected
			 * @virtual
			 */
			setViewModelColumns: function() {
				for (var item in this.columns) {
					if (this.viewModel.columns[item]) {
						this.viewModel.set(item, this.columns[item]);
					}
				}
			},

			/**
			 * ############## # ######## ViewModel ######.
			 * @protected
			 * @virtual
			 */
			initViewModel: function() {
				this.renderTo = this.Ext.get(this.renderToId);
				var schemaBuilder = this.Ext.create("Terrasoft.SchemaBuilder");
				var config = {
					schemaName: this.columns.DiagramElementPage,
					entitySchemaName: this.columns.DiagramElementSchemaName
				};
				schemaBuilder.build(config, function(viewModelClass, viewConfig) {
					var viewModelConfig = {
						Ext: this.Ext,
						sandbox: this.sandbox,
						Terrasoft: this.Terrasoft
					};
					this.viewModel = this.Ext.create(viewModelClass, viewModelConfig);
					if (this.viewModel.beforeBind) {
						this.viewModel.beforeBind.call(this.viewModel);
					}
					var view = Ext.create("Terrasoft.Container", viewConfig[0]);
					view.bind(this.viewModel);
					this.setViewModelColumns();
					this.viewModel.init(function() {
						this.clear();
						this.view = view;
						this.view.render(this.renderTo);
						this.isReady = true;
					}, this);
				}, this);
			},

			/**
			 * ####### ####### ###### # ######## ########.
			 * @protected
			 * @virtual
			 */
			clear: function() {
				if (this.view && !this.view.destroyed) {
					this.view.destroy();
					this.view = null;
				}
			},

			/**
			 * ####### ######### ######.
			 * @virtual
			 */
			render: function() {
				if (!this.renderToId) {
					return;
				}
				if (this.isNew) {
					this.clearColumns();
				}
				this.isNew = false;
				Terrasoft.chain(
					this.initSchemaBuilderProperty,
					this.initViewModel,
					this);
			}

		});
		return Terrasoft.CampaignDiagramPropertyModule;
	});



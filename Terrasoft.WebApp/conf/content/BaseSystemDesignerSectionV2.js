Terrasoft.configuration.Structures["BaseSystemDesignerSectionV2"] = {innerHierarchyStack: ["BaseSystemDesignerSectionV2"]};
define('BaseSystemDesignerSectionV2Structure', ['BaseSystemDesignerSectionV2Resources'], function(resources) {return {schemaUId:'11d4ac38-ad67-4331-968a-5376ebb77b6f',schemaCaption: "Section base schema - System manager", parentSchemaName: "", schemaName:'BaseSystemDesignerSectionV2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseSystemDesignerSectionV2", ["terrasoft", "SystemDesignerDashboardsModule", "SystemDesignerDashboardBuilder",
		"SystemDesignerDashboardsViewModel"],
	function(Terrasoft) {
		return {
			/**
			 * #########, ########### ### ########## ############ ############ #####
			 * @type {Object}
			 */
			messages: {
				/**
				 * @message NeedHeaderCaption
				 * ######### # ############# ######### ######### ########.
				 */
				"NeedHeaderCaption": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ChangeHeaderCaption
				 * ######### ### ########## ######### ########.
				 * @param {Object} config ################ ###### #########.
				 * @param {String} config.caption ######### ########.
				 * @param {Terrasoft.Collection} config.dataViews ######### #############.
				 * @param {String} config.moduleName ######## ######.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message RerenderModule
				 * ########## ######### ############# ###### ######.
				 * @return {Boolean} ######### ###### ######.
				 */
				"RerenderModule": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * ###### ###### ############# #######
			 * @type {Object}
			 */
			methods: {
				/**
				 * ############## ######### ######### ###### #############.
				 * @protected
				 * @overridden
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ########.
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.subscribeSandboxEvents();
						this.initDashboardEnums();
						this.initMainHeaderCaption();
						callback.call(scope);
					}, this]);
				},

				/**
				 * ########## ######## ######### #######.
				 * @protected
				 */
				onRender: function() {
					this.loadDashboardModule();
				},

				/**
				 * ########## ######## ## ######### sandbox.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("NeedHeaderCaption", this.initMainHeaderCaption, this);
				},

				/**
				 * ######### ######### ######### ########.
				 * @protected
				 */
				initMainHeaderCaption: function() {
					var dataViews = this.Ext.create("Terrasoft.Collection");
					var caption = this.getCaption();
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: caption,
						dataViews: dataViews,
						moduleName: this.name
					});
				},

				/**
				 * ######### ###### ###### ### ########### ######.
				 * @protected
				 */
				loadDashboardModule: function() {
					var moduleId = this.sandbox.id + "_SystemDesignerDashboards";
					var renderTo = "SectionItemsContainer";
					var rendered = this.sandbox.publish("RerenderModule", {
						renderTo: renderTo
					}, [moduleId]);
					if (!rendered) {
						this.sandbox.loadModule("SystemDesignerDashboardsModule", {
							renderTo: renderTo,
							id: moduleId
						});
					}
				},

				/**
				 * ########## ######### #######.
				 * @virtual
				 * @return {String} ######### #######.
				 */
				getCaption: function() {
					return this.get("Resources.Strings.SectionCaption");
				},

				/**
				 * ######### ########### ### ######### ###### ####### ######## ############.
				 * @private
				 */
				initDashboardEnums: function() {
					var tileWidgetType = {
						"view": {
							"moduleName": "SystemDesignerTileModule",
							"configurationMessage": "GetSystemDesignerTileConfig"
						},
						"design": {
							"moduleName": "ConfigurationModuleV2",
							"configurationMessage": "GetSystemDesignerTileConfig",
							"resultMessage": "PostModuleConfig",
							"stateConfig": {
								"stateObj": {
									"designerSchemaName": "SystemDesignerTileConfigEdit"
								}
							}
						}
					};
					var wigetType = Terrasoft.DashboardEnums.WidgetType;
					if (!wigetType.hasOwnProperty("SystemDesignerTile")) {
						wigetType.SystemDesignerTile = tileWidgetType;
					}
				},

				/**
				 * @protected
				 * @overridden
				 */
				destroy: function() {
					var wigetType = Terrasoft.DashboardEnums.WidgetType;
					var historyState = this.sandbox.publish("GetHistoryState");
					var state = historyState.state;
					var moduleId = state.moduleId ? state.moduleId : "";
					if (wigetType.hasOwnProperty("SystemDesignerTile") && moduleId.indexOf("SystemDesigner") === -1) {
						delete wigetType.SystemDesignerTile;
					}
					this.callParent(arguments);
					this.destroyed = true;
				}
			},

			/**
			 * ############# #######
			 * @type {Object[]}
			 */
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "SectionItemsContainer",
					"values": {
						"id": "SectionItemsContainer",
						"selectors": {"wrapEl": "#SectionItemsContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["system-designer-section-container-wrapClass"],
						"items": []
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});



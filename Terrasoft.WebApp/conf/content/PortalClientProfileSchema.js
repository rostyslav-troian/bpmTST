Terrasoft.configuration.Structures["PortalClientProfileSchema"] = {innerHierarchyStack: ["PortalClientProfileSchema"], structureParent: "ClientProfileSchema"};
define('PortalClientProfileSchemaStructure', ['PortalClientProfileSchemaResources'], function(resources) {return {schemaUId:'aa37a16c-854d-4807-9ba6-52b77ac37c4b',schemaCaption: "Client profile at portal", parentSchemaName: "ClientProfileSchema", schemaName:'PortalClientProfileSchema',parentSchemaUId:'a3f04ac9-2e6c-473a-b037-d2ef016001e8',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalClientProfileSchema", ["ProfileSchemaMixin"],
		function() {
			return {
				modules: /**SCHEMA_MODULES*/{
					"AccountClientProfile": {
						"config": {
							"schemaName": "PortalClientAccountProfileSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									masterColumnName: "Account"
								}
							}
						}
					}
				}/**SCHEMA_MODULES*/,
				methods: {

					/**
					 * @inheritdoc Terrasoft.ClientProfileSchema#addEditPage
					 * @override
					 */
					addEditPage: function(masterColumnName, collection) {
						const defaultConfig = this.getMiniPageConfig(masterColumnName);
						collection.add(defaultConfig.Id, Ext.create("Terrasoft.BaseViewModel", {
							values: defaultConfig
						}));
					},

					/**
					 * Return customized config for mini page, that isn't stored in SysModuleEdit table.
					 * @protected
					 * @param {String} masterColumnName columns, which are corresponded with client multi lookup column.
					 * @returns {Object} config
					 */
					getMiniPageConfig: function(masterColumnName) {
						const id = this.Terrasoft.generateGUID();
						const captionResource = this.Ext.String.format("Resources.Strings.New{0}ButtonCaption",
							masterColumnName);
						const schemaName = this.Ext.String.format("Portal{0}MiniPage", masterColumnName);
						return {
							Id: id,
							Caption: this.get(captionResource),
							Click: {bindTo: "addRecord"},
							Tag: id,
							masterColumnName: masterColumnName,
							EntitySchemaName: masterColumnName,
							MiniPage: {
								schemaName: schemaName,
								hasAddMiniPage: true
							}
						};
					},

					/**
					 * @inheritdoc Terrasoft.MiniPageUtilities#openMiniPage
					 * @override
					 */
					openMiniPage: function(config) {
						if (!config.miniPageSchemaName) {
							const editPages = this.get("EditPages");
							const pageModel = editPages.findByAttr("EntitySchemaName", config.entitySchemaName);
							config.miniPageSchemaName = pageModel ? pageModel.$MiniPage.schemaName : undefined;
						}
						this.callParent(arguments);
					}
				},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		}
);




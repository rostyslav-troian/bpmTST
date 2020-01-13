Terrasoft.configuration.Structures["ProcessDesignerESNFeedPropertiesPage"] = {innerHierarchyStack: ["ProcessDesignerESNFeedPropertiesPage"]};
define('ProcessDesignerESNFeedPropertiesPageStructure', ['ProcessDesignerESNFeedPropertiesPageResources'], function(resources) {return {schemaUId:'a4fc3f80-20ad-4db0-bc76-ce22f54ac221',schemaCaption: "ProcessDesignerESNFeedPropertiesPage", parentSchemaName: "", schemaName:'ProcessDesignerESNFeedPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessDesignerESNFeedPropertiesPage", ["ext-base", "terrasoft",
		"ProcessDesignerESNFeedPropertiesPageResources", "ImageView"
	], function(Ext, Terrasoft) {
		return {
			mixins: {
				editable: "Terrasoft.ProcessSchemaElementEditable"
			},
			messages: {

				/**
				 * @message RerenderModule
				 * Rerender ESNFeed module message.
				 */
				"RerenderModule": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message GetRecordInfo
				 * Get information about source record message.
				 */
				"GetRecordInfo": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				"Schema": {
					dataValueType: Terrasoft.DataValueType.OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Returns sandbox identifier for ESNFeed module.
				 * @private
				 * @return {String}
				 */
				_getSocialFeedSandboxId: function() {
					return this.sandbox.id + "_ESNFeed";
				},

				/**
				 * Returns information about current record and entity schema.
				 * @private
				 * @return {Object} Information about current record and entity schema.
				 */
				_getRecordInfo: function() {
					var schema = this.get("Schema");
					var sysSchemaEntityUId = "e6e68ac1-495d-4727-a7a7-9b531ab9f849";
					return {
						channelId: schema.uId,
						channelName: schema.getCaption(),
						entitySchemaUId: sysSchemaEntityUId,
						entitySchemaName: "VwProcessLib"
					};
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.mixins.editable.init.call(this);
					var tag = this._getSocialFeedSandboxId();
					this.sandbox.subscribe("GetRecordInfo", this._getRecordInfo, this, [tag]);
					this.sandbox.loadModule("MiniPageListener");
					var schema = this.sandbox.publish("GetProcessSchema");
					this.set("Schema", schema);
					callback.call(scope);
				},

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.mixins.editable.onDestroy.call(this);
					this.callParent(arguments);
				},

				/**
				 * Loads ESNFeed module to ESNFeed container.
				 * @protected
				 */
				loadESNFeed: function() {
					var tag = this._getSocialFeedSandboxId();
					var rendered = this.sandbox.publish("RerenderModule", {renderTo: "ESNFeed"}, [tag]);
					if (!rendered) {
						var esnFeedModuleConfig = {
							renderTo: "ESNFeed",
							id: tag
						};
						var activeSocialMessageId = this.get("ActiveSocialMessageId");
						if (activeSocialMessageId) {
							esnFeedModuleConfig.parameters = {
								activeSocialMessageId: activeSocialMessageId
							};
						}
						this.sandbox.loadModule("ESNFeedModule", esnFeedModuleConfig);
					}
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ESNFeedPropertiesContainer",
					"values": {
						"id": "ESNFeedPropertiesContainer",
						"selectors": {"wrapEl": "#ESNFeedPropertiesContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["feed-properties-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ESNFeedPropertiesContainer",
					"name": "ESNFeedContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ESNFeedContainer",
					"propertyName": "items",
					"name": "ESNFeed",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "ESNFeedModule",
						"afterrender": {
							"bindTo": "loadESNFeed"
						},
						"afterrerender": {
							"bindTo": "loadESNFeed"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);



Terrasoft.configuration.Structures["BlockContentBuilder"] = {innerHierarchyStack: ["BlockContentBuilder"], structureParent: "ContentBuilder"};
define('BlockContentBuilderStructure', ['BlockContentBuilderResources'], function(resources) {return {schemaUId:'1bb54633-714a-4c8b-82b0-a0f148cd428a',schemaCaption: "BlockContentBuilder", parentSchemaName: "ContentBuilder", schemaName:'BlockContentBuilder',parentSchemaUId:'ac58e9b9-1a9b-43d2-afae-16317c8c0adb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ContentBuilder
 */
define("BlockContentBuilder", ["css!ProcessSchemaElementPropertiesEditCSS"], function() {
	return {
		messages: {
			"SetContentBuilderConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"GetContentBuilderConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"EditContentBlockDesigner": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"InitializedContentBuilder": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"SelectedContentItemChange": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * @override
			 */
			UseBlockLibrary: {
				value: false
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_onSetContentBuilderConfig: function(config) {
				this.set("ContentBuilderConfig", config);
				this.initializeSheet();
				this._selectFirstItem();
			},

			/**
			 * @private
			 */
			_onGetContentBuilderConfig: function() {
				const contentBuilderHelper = this.createContentBuilderHelper();
				const config = contentBuilderHelper.toJSON(this);
				return config;
			},

			/**
			 * @private
			 */
			_selectFirstItem: function() {
				const item = this.get("Items").first();
				if (item) {
					item.set("Selected", true);
					item.set("Movable", false);
					item.set("Removable", false);
					item.set("Clonable", false);
				}
			},

			/**
			 * @private
			 */
			_onEditContentBlockDesigner: function() {
				this.set("IsContentBlockDesignerVisible", true);
			},

			/**
			 * @private
			 */
			_subscribeOnSandboxEvents: function() {
				this.sandbox.subscribe("SetContentBuilderConfig", this._onSetContentBuilderConfig, this);
				this.sandbox.subscribe("GetContentBuilderConfig", this._onGetContentBuilderConfig, this);
				this.sandbox.subscribe("EditContentBlockDesigner", this._onEditContentBlockDesigner, this);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#init
			 * @override
			 */
			init: function(callback, scope) {
				this._subscribeOnSandboxEvents();
				this.callParent([function() {
					this.sandbox.publish("InitializedContentBuilder");
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#getContentSheetConfig
			 * @override
			 */
			getContentSheetConfig: function(callback, scope) {
				const blockConfig = this.get("ContentBuilderConfig");
				const config = {
					ItemType: "sheet",
					Items: [blockConfig]
				};
				Ext.callback(callback, scope, [config]);
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this._selectFirstItem();
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#setItemTools
			 * @override
			 */
			setItemTools: function(item) {
				item.set("Removable", false);
				item.set("Clonable", false);
				item.set("Movable", false);
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#onSelectedContentItemChange
			 * @override
			 */
			onSelectedContentItemChange: function() {
				this.callParent(arguments);
				this.sandbox.publish("SelectedContentItemChange");
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "HeaderContainer"
			}
		]/**SCHEMA_DIFF*/
	};
});



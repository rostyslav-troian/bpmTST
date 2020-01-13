Terrasoft.configuration.Structures["FileSearchRowSchema"] = {innerHierarchyStack: ["FileSearchRowSchema"], structureParent: "BaseSearchRowSchema"};
define('FileSearchRowSchemaStructure', ['FileSearchRowSchemaResources'], function(resources) {return {schemaUId:'1cbf389d-95ba-4ab5-bf87-ab153ea60c02',schemaCaption: "FileSearchRowSchema", parentSchemaName: "BaseSearchRowSchema", schemaName:'FileSearchRowSchema',parentSchemaUId:'254c5d91-bad1-44be-a75e-1d511f816dc0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileSearchRowSchema", ["ConfigurationConstants"], function(configurationConstants) {
	return {
		attributes: {
			/**
			 * Entity schema caption.
			 */
			"ParentEntityColumn": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Parent entity column name.
			 */
			"ParentEntityColumnName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#initAttributeValues
			 * @overridden
			 */
			initAttributeValues: function() {
				this.callParent(arguments);
				this.set("ParentEntityColumn", this.get(this.getParentEntityColumnName()));
			},

			/**
			 * Returns parent entity column name.
			 * @return {String} Parent entity column name.
			 */
			getParentEntityColumnName: function() {
				var parentEntityColumnName = this.get("ParentEntityColumnName");
				if (!parentEntityColumnName) {
					this.set("ParentEntityColumnName", this.entitySchemaName.replace("File", ""));
				}
				return this.get("ParentEntityColumnName");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#initSchemaCaption
			 * @overridden
			 */
			initSchemaCaption: function() {
				var moduleStructure = this.getModuleStructure(this.getParentEntityColumnName());
				this.set("EntitySchemaCaption", moduleStructure && moduleStructure.moduleCaption || "");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#onPrimaryColumnLinkClick
			 * @overridden
			 */
			onPrimaryColumnLinkClick: function() {
				var type = this.get("Type");
				var typeValue = type && type.value && type.value.toLowerCase();
				if (!this.entitySchema) {
					return;
				}
				if (typeValue === configurationConstants.FileType.File) {
					location.href = Ext.String.format("../rest/FileService/GetFile/{0}/{1}",
							this.entitySchema.uId, this.get("Id"));
				} else {
					window.open(this.get("Name"));
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#onLinkClick
			 * @overridden
			 */
			onLinkClick: function(url) {
				return this.callParent([url, this.getParentEntityColumnName()]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#getLinkUrl
			 * @overridden
			 */
			getLinkUrl: function() {
				return this.callParent([this.getParentEntityColumnName()]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#linkMouseOver
			 * @overridden
			 */
			linkMouseOver: function(options) {
				this.callParent([options, this.getParentEntityColumnName()]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSearchRowSchema#getHighlightText
			 * @overridden
			 */
			getHighlightText: function(columnName) {
				var args = columnName === "ParentEntityColumn" ? [this.getParentEntityColumnName()] :
						[columnName];
				return this.callParent(args);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getBindMap
			 * @overridden
			 */
			getBindMap: function() {
				var parentEntityColumnName = this.getParentEntityColumnName();
				var bindMap = this.callParent(arguments);
				if (bindMap && !bindMap.contains(parentEntityColumnName)) {
					bindMap.add(parentEntityColumnName, {});
				}
				return bindMap;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "ParentEntityColumn",
				"values": {
					"isLinkColumn": true,
					"caption": {"bindTo": "Resources.Strings.ParentEntityLinkCaption"},
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "merge",
				"name": "EntitySchemaCaption",
				"values": {
					"layout": {
						"column": 18,
						"row": 0,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "merge",
				"name": "FoundColumnsContainerList",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



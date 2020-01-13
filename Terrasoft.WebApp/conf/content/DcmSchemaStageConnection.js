Terrasoft.configuration.Structures["DcmSchemaStageConnection"] = {innerHierarchyStack: ["DcmSchemaStageConnection"]};
define('DcmSchemaStageConnectionStructure', ['DcmSchemaStageConnectionResources'], function(resources) {return {schemaUId:'748ae9c8-dc5b-41a0-b2d6-616cec66b2f8',schemaCaption: "DcmSchemaStageConnection", parentSchemaName: "", schemaName:'DcmSchemaStageConnection',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DcmSchemaStageConnection", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.Designers.DcmSchemaStageConnection", {
			alternateClassName: "Terrasoft.DcmSchemaStageConnection",

			mixins: {
				serializable: "Terrasoft.Serializable"
			},

			/**
			 * Uid of the stage from which connection is established.
			 * @type {String}
			 */
			source: null,

			/**
			 * Uid of the stage to which connection is established
			 * @type {String}
			 */
			target: null,

			/**
			 * Returns equality of this and given connections.
			 * @param {Terrasoft.DcmSchemaStageConnection} connection Connection to compare.
			 * @returns {boolean} True if connections are equal.
			 */
			getIsEqual: function(connection) {
				return this.source === connection.source && this.target === connection.target;
			},

			/**
			 * @inheritdoc Terrasoft.Serializable#getSerializableObject
			 * @overridden
			 */
			getSerializableObject: function(serializableObject) {
				var sourceData = this.getSerializableProperty(this.source);
				var targetData = this.getSerializableProperty(this.target);
				var config = {
					"typeName": "Terrasoft.Core.DcmProcess.DcmSchemaStageConnection",
					"source": sourceData,
					"target": targetData
				};
				serializableObject.connections.push(config);
			}
		});

		return Terrasoft.Designers.DcmSchemaStageConnection;
	}
);



Terrasoft.configuration.Structures["FunnelToFirstStageDataProvider"] = {innerHierarchyStack: ["FunnelToFirstStageDataProvider"]};
define('FunnelToFirstStageDataProviderStructure', ['FunnelToFirstStageDataProviderResources'], function(resources) {return {schemaUId:'0388bf54-8bb0-43c1-848d-93b49d7fa7de',schemaCaption: "FunnelToFirstStageDataProvider", parentSchemaName: "", schemaName:'FunnelToFirstStageDataProvider',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FunnelToFirstStageDataProvider", ["ext-base", "FunnelConversionDataProvider"],
	function(Ext) {

		/**
		 * @class Terrasoft.configuration.FunnelToFirstStageDataProvider
		 * Class to prepare filter for funnel first stage conversion.
		 */
		Ext.define("Terrasoft.configuration.FunnelToFirstStageDataProvider", {
			extend: "Terrasoft.FunnelConversionDataProvider",
			alternateClassName: "Terrasoft.FunnelToFirstStageDataProvider",

			/**
			 * @inheritdoc Terrasoft.FunnelConversionDataProvider#prepareConversionResponse
			 * @overridden
			 */
			prepareConversionResponse: function(responseCollection) {
				this.callParent(arguments);
				var firstStageValue;
				responseCollection.each(function(currentItem) {
					var itemValue = currentItem.get("yAxis") || 0;
					if (firstStageValue === undefined && itemValue !== 0) {
						firstStageValue = itemValue;
					}
					if (firstStageValue !== undefined) {
						currentItem.set("bottomConversionValue", firstStageValue);
					}
				}, this);
			}

		});
	}
);



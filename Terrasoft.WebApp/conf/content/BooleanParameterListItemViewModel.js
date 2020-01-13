Terrasoft.configuration.Structures["BooleanParameterListItemViewModel"] = {innerHierarchyStack: ["BooleanParameterListItemViewModel"]};
define('BooleanParameterListItemViewModelStructure', ['BooleanParameterListItemViewModelResources'], function(resources) {return {schemaUId:'6b5e1e51-d42b-4330-954b-15eb625b34a6',schemaCaption: "Boolean parameter list item ViewModel", parentSchemaName: "", schemaName:'BooleanParameterListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
  * View model for boolean parameter item in container list.
  */
define("BooleanParameterListItemViewModel", ["BaseParameterListItemViewModel"],
	function() {
		/**
		* @class Terrasoft.configuration.BooleanParameterListItemViewModel
		*/
		Ext.define("Terrasoft.configuration.BooleanParameterListItemViewModel", {
		extend: "Terrasoft.BaseParameterListItemViewModel",
		alternateClassName: "Terrasoft.BooleanParameterListItemViewModel",

		/**
		 * @inheritdoc Terrasoft.BaseParameterListItemViewModel#getParameterInputConfig
		 * @override
		 */
		getParameterInputConfig: function() {
			return [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["parameter-control-wrap"]
					},
					items: [
						{
							className: "Terrasoft.CheckBoxEdit",
							classes: {wrapClass: ["t-checkbox-control"]},
							markerValue: this.getControlMarkerValue(),
							checked: "$Value"
						}
					]
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["parameter-label-wrap"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: "$Caption"
						}
					]
				}
			];
		}
	});
	return Terrasoft.BooleanParameterListItemViewModel;
});



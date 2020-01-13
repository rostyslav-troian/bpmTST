Terrasoft.configuration.Structures["StringParameterListItemViewModel"] = {innerHierarchyStack: ["StringParameterListItemViewModel"]};
define('StringParameterListItemViewModelStructure', ['StringParameterListItemViewModelResources'], function(resources) {return {schemaUId:'aaf728df-1da8-4da6-a35d-bc2e001f50aa',schemaCaption: "String parameter list item ViewModel", parentSchemaName: "", schemaName:'StringParameterListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
  /**
  * View model for string parameter item in container list.
  */
define("StringParameterListItemViewModel", ["StringParameterListItemViewModelResources",
        "BaseParameterListItemViewModel"],
    function(resources) {
        /**
        * @class Terrasoft.configuration.StringParameterListItemViewModel
        */
        Ext.define("Terrasoft.configuration.StringParameterListItemViewModel", {
        extend: "Terrasoft.BaseParameterListItemViewModel",
        alternateClassName: "Terrasoft.StringParameterListItemViewModel",

        /**
         * @inheritdoc Terrasoft.BaseParameterListItemViewModel#onGetMacros
         * @override
         */
        onGetMacros: function(macros) {
            this.$Value = this.$Value ? this.$Value + macros : macros;
        },

        /**
         * @inheritdoc Terrasoft.BaseParameterListItemViewModel#getValueMenuItems
         * @override
         */
        getValueMenuItems: function() {
            var items = this.callParent();
            items.removeByKey("InputValue");
            items.add("ContactName", new Terrasoft.BaseViewModel( {
                values: {
                    Id: "ContactName",
                    Caption: resources.localizableStrings.ContactName,
                    ImageConfig: this.getImage(resources.localizableImages.ContactIcon),
                    MarkerValue: "ContactName",
                    Click: "$onSelectContactNameMacros"
                }
            }));
            items.add("DateTimeMacros", new Terrasoft.BaseViewModel( {
                values: {
                    Id: "DateTimeMacros",
                    Caption: resources.localizableStrings.DateTimeMacro,
                    ImageConfig: this.getImage(resources.localizableImages.CalendarIcon),
                    MarkerValue: "DateTimeMacros",
                    Click: "$loadDateTimeMacrosPage"
                }
            }));
            return items;
        },

        /**
         * Handles contact name macros selected.
         * @protected
         */
        onSelectContactNameMacros: function() {
            var macros = this.formatMacrosColumn("Name");
            this.onGetMacros(macros);
        }

    });
    return Terrasoft.BooleanParameterListItemViewModel;
});



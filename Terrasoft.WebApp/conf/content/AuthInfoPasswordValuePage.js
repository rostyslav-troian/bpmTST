Terrasoft.configuration.Structures["AuthInfoPasswordValuePage"] = {innerHierarchyStack: ["AuthInfoPasswordValuePage"], structureParent: "AuthInfoParameterValuePage"};
define('AuthInfoPasswordValuePageStructure', ['AuthInfoPasswordValuePageResources'], function(resources) {return {schemaUId:'9c41386d-829b-4b1d-84aa-1625e65b1fbc',schemaCaption: "AuthInfoPasswordValuePage", parentSchemaName: "AuthInfoParameterValuePage", schemaName:'AuthInfoPasswordValuePage',parentSchemaUId:'14c99d52-3f74-4839-9720-fb520db4ba10',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("AuthInfoPasswordValuePage", [], function() {
	return {
		attributes: {
			/**
			 * Name of property in auth info.
			 */
			AuthInfoPropertyName: {
				value: "password"
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterValuePage#getSysSettingsDataValueTypeFilter
			 * @protected
			 * @override
			 */
			getSysSettingsDataValueTypeFilter: function() {
				return Terrasoft.createColumnInFilterWithParameters("ValueTypeName", ["SecureText"]);
			}

		},
		diff: [
			{
				operation: "merge",
				name: "ValueCaption",
				values: {
					className: "Terrasoft.TipLabel",
					click: "$showTipOnLabelClick",
					tag: "PasswordHintVisible",
					tips: [{
						content: "$Resources.Strings.PasswordHint",
						visible: { bindTo: "PasswordHintVisible" }
					}]
				}
			},
			{
				operation: "merge",
				name: "TextValue",
				values: {controlConfig: {protect: true}}
			}
		]
	};
});



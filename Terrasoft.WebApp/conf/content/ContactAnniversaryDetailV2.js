Terrasoft.configuration.Structures["ContactAnniversaryDetailV2"] = {innerHierarchyStack: ["ContactAnniversaryDetailV2"], structureParent: "BaseAnniversaryDetailV2"};
define('ContactAnniversaryDetailV2Structure', ['ContactAnniversaryDetailV2Resources'], function(resources) {return {schemaUId:'d4c3fe4b-d6db-411d-a4f0-1dbbe8c8d333',schemaCaption: "Contact noteworthy event detail", parentSchemaName: "BaseAnniversaryDetailV2", schemaName:'ContactAnniversaryDetailV2',parentSchemaUId:'16c044af-7997-4644-a186-c00904d66f11',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactAnniversaryDetailV2", ["ConfigurationConstants"], function(ConfigurationConstants) {
	return {
		entitySchemaName: "ContactAnniversary",
		attributes: {
			/**
			 * ####, ############ ########### ######### #### ######## ## ###### "############## #######"
			 * @Type {Boolean}
			 */
			"IsBirthdayEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},
		methods: {

			/**
			 * ########## ### ####### ### ########## ## #########.
			 * @overridden
			 * @return {String} ### #######.
			 */
			getFilterDefaultColumnName: function() {
				return "AnniversaryType";
			},

			/**
			 * ############## ######## ########### ########## ### ######## ## ######.
			 * @overridden
			 */
			onDataChanged: function() {
				this.callParent(arguments);
				this.checkIsBirthdayEnabled();
			},

			/**
			 * ######### ######## ########### ###### ########## ############### ####### # ##### "#### ########".
			 * @protected
			 */
			checkIsBirthdayEnabled: function() {
				var gridData = this.getGridData();
				if (gridData && gridData.getCount() > 0) {
					gridData.each(function(item) {
						var type = item.get("AnniversaryType");
						if (type && type.value === ConfigurationConstants.AnniversaryType.Birthday) {
							this.set("IsBirthdayEnabled", false);
							return false;
						} else {
							this.set("IsBirthdayEnabled", true);
						}
					}, this);
				} else {
					this.set("IsBirthdayEnabled", true);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseAnniversaryDetailV2#getEditPages
			 * @protected
			 */
			getEditPages: function() {
				var editPages = this.callParent(arguments);
				var birthdayPage = editPages.get(ConfigurationConstants.AnniversaryType.Birthday);
				if (birthdayPage) {
					birthdayPage.set("Enabled", {"bindTo": "IsBirthdayEnabled"});
				}
				return editPages;
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});



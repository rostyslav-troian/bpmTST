Terrasoft.configuration.Structures["PartnershipParameterDetail"] = {innerHierarchyStack: ["PartnershipParameterDetail"], structureParent: "BaseGridDetailV2"};
define('PartnershipParameterDetailStructure', ['PartnershipParameterDetailResources'], function(resources) {return {schemaUId:'b4328451-ef65-495b-a95f-f702b54513c4',schemaCaption: "Detail schema: \"Partnership parameters\"", parentSchemaName: "BaseGridDetailV2", schemaName:'PartnershipParameterDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PartnershipParameterDetail", [], function() {
	return {
		entitySchemaName: "PartnershipParameter",
		attributes: {
			/**
			 * Flag pressing buttons filtration.
			 */
			IsFiltrationButtonPressed: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},
		properties: {

			/**
			 * Property key for filtration button.
			 */
			_filtrationButtonPressedProfileKey: "IsFiltrationButtonPressed"
		},
		diff: /**SCHEMA_DIFF*/[
			// Add filter button FiltrationButton for filtration by PartnershipParameterType
			{
				"operation": "insert",
				"name": "FiltrationButton",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "Resources.Strings.FiltrationButtonCaption"},
					"pressed": {"bindTo": "IsFiltrationButtonPressed"},
					"click": {"bindTo": "onFiltrationButtonClick"},
					"hint": {"bindTo": "getFiltrationButtonHint"}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getAddRecordButtonVisible
			 * @overridden
			 */
			getAddRecordButtonVisible: function() {
				return false;
			},

			getEditRecordMenuItem: Terrasoft.emptyFn,

			getCopyRecordMenuItem: Terrasoft.emptyFn,

			getDeleteRecordMenuItem: Terrasoft.emptyFn,

			/**
			 * Returns filtration button hint text.
			 * @protected
			 * @return {String} Hint text.
			 */
			getFiltrationButtonHint: function() {
				return this.get("Resources.Strings.FiltrationButtonHint");
			},

			/**
			 * Handler on click filtration button.
			 * Sets attribute that filtration button pressed, save current value to the profile
			 * and reload detail data.
			 * @protected
			 */
			onFiltrationButtonClick: function() {
				var isFiltrationButtonPressed = !this.get("IsFiltrationButtonPressed");
				var profile = this.getProfile();
				var key = this.getProfileKey();
				if (this.isNotEmpty(profile) && this.isNotEmpty(key)) {
					profile.IsFiltrationButtonPressed = isFiltrationButtonPressed;
					this.set(this.getProfileColumnName(), profile);
					this.Terrasoft.utils.saveUserProfile(key, profile, false);
				}
				this.set("IsFiltrationButtonPressed", isFiltrationButtonPressed);
				this.reloadGridData();
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilters
			 * @overridden
			 */
			getFilters: function() {
				var filterGroup = this.callParent(arguments);
				var isFiltrationButtonPressed = this.get("IsFiltrationButtonPressed");
				if (isFiltrationButtonPressed) {
					filterGroup.add("PartnershipParameterTypeFilter",
						Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "PartnershipParameterType",
							this.Terrasoft.PRMEnums.PartnershipParamType.Target, Terrasoft.DataValueType.GUID));
				}
				return filterGroup;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#initializeProfile
			 * @overridden
			 */
			initializeProfile: function(callback, scope) {
				this.callParent([function() {
					this.requireFiltrationButtonProfile(callback, scope);
				}, scope || this]);
			},

			/**
			 * Loads profile of filtration button.
			 * @param callback
			 * @param scope
			 */
			requireFiltrationButtonProfile: function(callback, scope) {
				const key = this.getProfileKey();
				this.requireProfile(function(profile) {
					this.setIsFiltrationButtonPressed(profile);
					this.Ext.callback(callback, scope);
				}, scope || this, key);
			},

			/**
			 * Sets IsFiltrationButtonPressed attribute from profile.
			 * @param {Object} profile Current user profile.
			 */
			setIsFiltrationButtonPressed: function (profile) {
				const isPressed = profile[this._filtrationButtonPressedProfileKey];
				if (!this.Ext.isEmpty(isPressed)) {
					this.set("IsFiltrationButtonPressed", isPressed);
				}
			}
		}
	};
});



Terrasoft.configuration.Structures["PRMPartnerManagerSchema"] = {innerHierarchyStack: ["PRMPartnerManagerSchema"], structureParent: "BaseEntityPage"};
define('PRMPartnerManagerSchemaStructure', ['PRMPartnerManagerSchemaResources'], function(resources) {return {schemaUId:'bc5e949c-a807-44a9-a106-5095335df1a1',schemaCaption: "PRMPartnerManagerSchema", parentSchemaName: "BaseEntityPage", schemaName:'PRMPartnerManagerSchema',parentSchemaUId:'81c2ebad-7f20-4e71-b0c6-941b1422ba62',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PRMPartnerManagerSchema", ["PRMEnums"], function() {
	return {
		entitySchemaName: "Partnership",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			/**
			 * Manager email.
			 * @type {STRING}
			 */
			"Email": {
				"dataValueType": Terrasoft.DataValueType.STRING
			},
			/**
			 * Manager email.
			 * @type {STRING}
			 */
			"Name": {
				"dataValueType": Terrasoft.DataValueType.STRING
			},
			/**
			 * Manager photo.
			 * @type: {Terrasoft.DataValueType.LOOKUP}
			 */
			"ManagerPhotoId": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"value": "00000000-0000-0000-0000-000000000000"
			}
		},
		methods: {
			/**
			 * Gets Manager photo config.
			 * @private
			 * @return {Object} Photo config.
			 */
			getManagerPhoto: function() {
				var photoId = this.get("ManagerPhotoId");
				if (this.Terrasoft.isEmptyGUID(photoId)) {
					return this.get("Resources.Images.ManagerEmptyPhoto");
				}
				var photoConfig = {
					source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: "SysImage",
						columnName: "Data",
						primaryColumnValue: photoId
					}
				};
				return {
					source: this.Terrasoft.ImageSources.URL,
					url: this.Terrasoft.ImageUrlBuilder.getUrl(photoConfig)
				};
			},

			/**
			 * Sets manager data from response.
			 * @param {Object} response Response of manager data from service item.
			 * @protected
			 */
			onPartnerServiceResponse: function(response) {
				if (response && response.GetManagerDataResult) {
					var result = Terrasoft.decode(response.GetManagerDataResult);
					this.set("ManagerPhotoId", result.PhotoId);
					this.set("Email", result.Email);
					this.set("Name", result.Name);
				}
			},

			/**
			 * Creates email for partner manager
			 * @param {String} mailActionType Type of mail action to be performed
			 * @protected
			 */
			callMailTo: function() {
				var mailTo = this.Ext.String.format("mailto:{0}", this.get("Email") || "");
				window.open(mailTo, "_self");
			},

			/**
			 * Returns service config.
			 * @protected
			 * @return {Object} Service PartnerManagerService config.
			 */
			getPartnerManagerServiceConfig: function() {
				return {
					serviceName: "PartnerManagerService",
					methodName: "GetManagerData"
				};
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				var config = this.getPartnerManagerServiceConfig();
				this.callService(config, this.onPartnerServiceResponse, this);
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "MainContainer",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["manager-main-widget-metrics-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MainContainer",
				"propertyName": "items",
				"name": "DataContainer",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["manager-widget-metrics-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "ManagerProfileContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["manager-profile-margin"]}
				}
			},
			{
				"operation": "insert",
				"name": "ManagerProfileButton",
				"parentName": "ManagerProfileContainer",
				"propertyName": "items",
				"values": {
					"id": "manager-profile-user-button",
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"selectors": {
						wrapEl: "#manager-profile-manager-button"
					},
					"classes": {
						"wrapperClass": ["photo-icon-wrapper", "photo-icon-float"],
						"imageClass": ["photo-icon"],
						"markerClass": ["profile-photo-btn-marker-class"]
					},
					"controlConfig": {
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
						"imageConfig": {
							"bindTo": "getManagerPhoto"
						}
					},
					"markerValue": "ManagerProfileButton"
				}
			},
			{
				"operation": "insert",
				"parentName": "ManagerProfileContainer",
				"propertyName": "items",
				"name": "CaptionContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER
				}
			},
			{
				"operation": "insert",
				"parentName": "CaptionContainer",
				"propertyName": "items",
				"name": "ManagerNameCaptionContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER
				}
			},
			{
				"operation": "insert",
				"parentName": "ManagerNameCaptionContainer",
				"propertyName": "items",
				"name": "ManagerTextCaption",
				"values": {
					"caption": {"bindTo": "Resources.Strings.YuorManagerText"},
					"classes": {"labelClass": ["manager-name-label"]},
					"itemType": this.Terrasoft.ViewItemType.LABEL
				}
			},

			{
				"operation": "insert",
				"name": "MailTo",
				"parentName": "ManagerProfileContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"classes": {
						"wrapperClass": ["mail-to-btn"]
					},
					"imageConfig": {"bindTo":"Resources.Images.Email"},
					"caption": {"bindTo": "Test"},
					"click": {"bindTo": "callMailTo"},
					"visible": true
				}
			},
			{
				"operation": "insert",
				"parentName": "CaptionContainer",
				"propertyName": "items",
				"name": "ProfileCaptionContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileCaptionContainer",
				"propertyName": "items",
				"name": "ManagerNameCaption",
				"values": {
					"caption": {"bindTo": "Name"},
					"classes": {"labelClass": ["manager-name-caption-label"]},
					"itemType": this.Terrasoft.ViewItemType.LABEL
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {}
	};
});



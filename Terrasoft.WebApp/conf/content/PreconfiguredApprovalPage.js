Terrasoft.configuration.Structures["PreconfiguredApprovalPage"] = {innerHierarchyStack: ["PreconfiguredApprovalPage"], structureParent: "BaseMiniPage"};
define('PreconfiguredApprovalPageStructure', ['PreconfiguredApprovalPageResources'], function(resources) {return {schemaUId:'11d047bc-4f4e-4332-8358-3e2cc7421e5c',schemaCaption: "PreconfiguredApprovalPage", parentSchemaName: "BaseMiniPage", schemaName:'PreconfiguredApprovalPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseMiniPage
 */
define("PreconfiguredApprovalPage", ["ConfigurationConstants", "PreconfiguredApprovalPageResources"],
	function(ConfigurationConstants, resources) {
		return {
			attributes: {
				/**
				 * @inheritdoc BaseMiniPage#MiniPageModes
				 * @override
				 */
				"MiniPageModes": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: [Terrasoft.ConfigurationEnums.CardOperation.EDIT]
				}
			},
			methods: {

				// region Methods: Private

				/**
				 * Initializes status.
				 * @private
				 */
				_initStatus: function() {
					var defaultValues = this.getDefaultValues();
					Terrasoft.each(defaultValues, function(defaultValue) {
						var name = defaultValue.name;
						this.set(name, defaultValue.value);
					}, this);
					var defaultStatus = this.get("DefaultStatus");
					this.set("Status", defaultStatus);
				},

				// endregion

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#init
				 * @override
				 */
				init: function(callback, scope) {
					this.callParent([
						function() {
							this._initStatus();
							this.Ext.callback(callback, scope || this);
						}, this
					]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#initEntity
				 * @override
				 */
				initEntity: function(callback, scope) {
					this.callParent([
						function() {
							var status = this.get("DefaultStatus");
							this.set("Status", status);
							this.set("SetBy", Terrasoft.SysValue.CURRENT_USER_CONTACT);
							this.set("SetDate", new Date());
							Ext.callback(callback, scope || this);
						}, this
					]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#adjustMiniPagePosition
				 * @override
				 */
				adjustMiniPagePosition: Ext.callback,

				/**
				 * Handler for click on button.
				 * @protected
				 */
				onButtonClick: function() {
					var config = arguments[3];
					var status = config.status;
					this.set("Status", status);
				},

				/**
				 * Returns background image url.
				 * @protected
				 * @return {String}
				 */
				getBackgroundImageUrl: function() {
					return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.BackgroundImage);
				},

				/**
				 * Returns dom attribute.
				 * @protected
				 * @return {Object}
				 */
				getDomAttribute: function() {
					var status = this.get("Status");
					return {
						status: status && status.value === ConfigurationConstants.VisaStatus.positive.value
							? "positive"
							: "negative"
					};
				},

				/**
				 * Returns true if pressed button status equals to current status.
				 * @protected
				 * @param {Object} buttonConfig Button config.
				 * @param {String} buttonConfig.status Button status.
				 * @return {Boolean} Check result.
				 */
				getIsPressedButton: function(buttonConfig) {
					var buttonStatus = buttonConfig.status;
					var status = this.get("Status");
					return buttonStatus.value === status.value;
				}

				// endregion

			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "remove",
					"name": "MiniPage"
				},
				{
					"operation": "remove",
					"name": "RequiredColumnsContainer"
				},
				{
					"operation": "merge",
					"name": "AlignableMiniPageContainer",
					"values": {
						"alignOrder": [Terrasoft.AlignType.TOP_LEFT],
						"autoAdjustSize": {"width": true}
					}
				},
				{
					"operation": "insert",
					"name": "ApprovePageContainer",
					"values": {
						"id": "ApprovePageContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["approve-minipage-container"],
						"domAttributes": {"bindTo": "getDomAttribute"},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "AlignableMiniPageContainer",
					"parentName": "ApprovePageContainer",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "MiniPageContentContainer",
					"propertyName": "items",
					"name": "GeneralHeaderContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header", "header-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "GeneralHeaderContainer",
					"propertyName": "items",
					"name": "HeaderCaptionContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header-caption-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HeaderBackground",
					"parentName": "GeneralHeaderContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getBackgroundImageUrl",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["background-img"]}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "HeaderCaptionContainer",
					"propertyName": "items",
					"name": "Caption",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Objective"},
						"markerValue": {"bindTo": "Objective"}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "GeneralHeaderContainer",
					"propertyName": "items",
					"name": "HeaderActionsContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header-actions-container"],
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ApproveButton",
					"parentName": "HeaderActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "Resources.Strings.ApproveButtonCaption"},
						"tag": {"status": ConfigurationConstants.VisaStatus.positive},
						"click": {"bindTo": "onButtonClick"},
						"imageConfig": {"bindTo": "Resources.Images.ApproveButtonImage"},
						"markerValue": "ApproveIconButton",
						"classes": {"wrapperClass": ["action-btn approve-btn"]},
						"pressed": {"bindTo": "getIsPressedButton"}
					}
				},
				{
					"operation": "insert",
					"name": "RejectButton",
					"parentName": "HeaderActionsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "Resources.Strings.RejectButtonCaption"},
						"tag": {"status": ConfigurationConstants.VisaStatus.negative},
						"click": {"bindTo": "onButtonClick"},
						"imageConfig": {"bindTo": "Resources.Images.RejectButtonImage"},
						"markerValue": "RejectIconButton",
						"classes": {"wrapperClass": ["action-btn reject-btn"]},
						"pressed": {"bindTo": "getIsPressedButton"}
					}
				},
				{
					"operation": "insert",
					"parentName": "MiniPageContentContainer",
					"name": "BodyContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["body-container"],
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Comment",
					"parentName": "BodyContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {"visible": false},
						"placeholder": {"bindTo": "Resources.Strings.CommentPlaceholder"},
						"wrapClass": ["square-border"]
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});



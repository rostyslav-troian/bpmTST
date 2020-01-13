Terrasoft.configuration.Structures["CampaignDiagramPropertyBasePage"] = {innerHierarchyStack: ["CampaignDiagramPropertyBasePage"]};
define('CampaignDiagramPropertyBasePageStructure', ['CampaignDiagramPropertyBasePageResources'], function(resources) {return {schemaUId:'0f24dae0-9f13-4c0d-9d7e-5ca645f2dcc8',schemaCaption: "CampaignDiagramPropertyBasePage", parentSchemaName: "", schemaName:'CampaignDiagramPropertyBasePage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyBasePage", ["terrasoft"],
		function(Terrasoft) {
			return {
				attributes: {
					/**
					* ########## ############# ######## ########.
					*/
					"DiagramElementId": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ######### ######## ########.
					*/
					"DiagramElementCategory": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ######### ######## ########.
					*/
					"DiagramElementCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ########## ############# #### ########.
					*/
					"DiagramElementTypeId": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ### #### ########.
					*/
					"DiagramElementPageTypeCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Url ##### ###### ########.
					 */
					"DiagramElementPageIconUrl": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ########## ############# ###### ######### # ########.
					*/
					"DiagramElementRecordId": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* ### ##### ########## #######.
					*/
					"DiagramElementSchemaName": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * ################ ###### ######## #########.
					 */
					"DiagramElementAddInfo": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * ####### ############### ########
					 */
					"IsStatusEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},
					/**
					 * Inforamtion button image config
					 */
					"InfoButtonImageConfig": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: "InfoButtonImageConfig"
					},
					/**
					 * Input connections of the chart element.
					 */
					"DiagramElementInEdges": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Output connections of the chart element.
					 */
					"DiagramElementOutEdges": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				methods: {
					/**
					* ######## URL ########### ## ########### ##############.
					* @param {Guid} sysImageId ########## ############# ###########.
					* @protected
					* @return {String} URL ###########.
					*/
					getSysImageUrl: function(sysImageId) {
						var imageConfig = {
							source: Terrasoft.ImageSources.SYS_IMAGE,
							params: {
								primaryColumnValue: sysImageId
							}
						};
						return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
					},

					/**
					 * Sets image config of information button
					 * @protected
					 */
					initInfoButtonImageConfig: function() {
						var informationButton = Ext.create("Terrasoft.InformationButton");
						var imageConfig = informationButton.getDefaultImageConfig();
						this.set("InfoButtonImageConfig", imageConfig);
					},

					/**
					 * ####### ############# ######.
					 * @protected
					 */
					init: function(callback, scope) {
						this.sandbox.subscribe("CardChanged", function(config) {
							this.set(config.key, config.value);
						}, this, [this.sandbox.id]);
						this.initInfoButtonImageConfig();
						if (callback) {
							callback.call(scope);
						}
					},

					getNotSelectImage: function() {
						var iconId = this.get("Resources.Strings.CatIconId");
						return this.getSysImageUrl(iconId);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "CampaignDiagramPropertyContainer",
						"values": {
							"id": "CampaignDiagramPropertyContainer",
							"selectors": {"wrapEl": "#CampaignDiagramPropertyContainer"},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["campaign-diagram-property-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "NotSelectedImage",
						"parentName": "CampaignDiagramPropertyContainer",
						"propertyName": "items",
						"values": {
							"markerValue": "NotSelectedImage",
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getNotSelectImage",
							"classes": {
								"wrapClass": ["not-selected-image"]
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "NotSelectedLabel",
						"parentName": "CampaignDiagramPropertyContainer",
						"propertyName": "items",
						"values": {
							"markerValue": "NotSelectedLabel",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["description-container"],
							"items": [
								{
									"itemType": Terrasoft.ViewItemType.LABEL,
									"classes": {
										"labelClass": [
											"description-label"
										],
										"wrapClass": [
											"description-wrap"
										]
									},
									"caption": {
										"bindTo": "Resources.Strings.EmptyPageCaption"
									}
								}
							]
						}
					}
				]/**SCHEMA_DIFF*/,
				messages:{
					/**
					 * @message CardChanged
					 * ######## ## ######### ######### ########
					 * @param {Object} config
					 * @param {String} config.key ######## ####### ###### #############
					 * @param {Object} config.value ########
					 */
					"CardChanged": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				}
			};
		});



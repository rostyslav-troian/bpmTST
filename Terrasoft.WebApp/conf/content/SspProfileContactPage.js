Terrasoft.configuration.Structures["SspProfileContactPage"] = {innerHierarchyStack: ["SspProfileContactPage"], structureParent: "BaseModulePageV2"};
define('SspProfileContactPageStructure', ['SspProfileContactPageResources'], function(resources) {return {schemaUId:'f79c8996-d0aa-4c4d-bc2e-7803bc66d929',schemaCaption: "Contact page at portal profile", parentSchemaName: "BaseModulePageV2", schemaName:'SspProfileContactPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspProfileContactPage", ["EmailHelper", "SspProfileContactPageResources", "CommunicationSynchronizerMixin"],
	function(EmailHelper, resources) {
		return {
			entitySchemaName: "Contact",
			mixins: {
				CommunicationSynchronizerMixin: "Terrasoft.CommunicationSynchronizerMixin"
			},
			attributes: {
				"Email": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"isRequired": true,
					"dependencies": [
						{
							"columns": ["Email"],
							"methodName": "syncEntityWithCommunicationDetail"
						}
					]
				},

				"MobilePhone": {
					"dependencies": [
						{
							"columns": ["MobilePhone"],
							"methodName": "syncEntityWithCommunicationDetail"
						}
					]
				},

				"Phone": {
					"dependencies": [
						{
							"columns": ["Phone"],
							"methodName": "syncEntityWithCommunicationDetail"
						}
					]
				},

				/**
				* @inheritdoc Terrasoft.BaseDataView#UseTagModule
				* @override
				*/
				"UseTagModule": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				"CommunicationDetailName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "ContactCommunication"
				},

				"JobTitle": {
					dependencies: [
						{
							columns: ["Job"],
							methodName: "jobChanged"
						}
					]
				}
			},
			messages: {
				/**
				 * @message GetCommunicationsSynchronizedByDetail
				 * Requests communications synchronized by detail.
				 */
				"GetCommunicationsSynchronizedByDetail": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message SyncCommunication
				 * Synchronizes communications.
				 */
				"SyncCommunication": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			details: /**SCHEMA_DETAILS*/{
				ContactCommunication: {
					schemaName: "SspContactCommunicationDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Contact"
					}
				},
				ContactAddress: {
					schemaName: "ContactAddressDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Contact"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "ESNTab"
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "ContactPhotoContainer",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 1
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["image-edit-container"],
						"items": []
					},
					"alias": {
						"name": "PhotoContainer",
						"excludeOperations": ["remove", "move"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ContactPhotoContainer",
					"propertyName": "items",
					"name": "Photo",
					"values": {
						"getSrcMethod": "_getContactImage",
						"onPhotoChange": "_onPhotoChange",
						"readonly": false,
						"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto),
						"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
					}
				},
				{
					"operation": "insert",
					"name": "Name",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Name"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SalutationType",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "SalutationType"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Gender",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Gender"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Job",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Job"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "JobTitle",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "JobTitle"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "MobilePhone",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "MobilePhone"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Phone",
					"values": {
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Phone"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Email",
					"values": {
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Email"
					},
					"parentName": "ProfileContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "GeneralInfoTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0,
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "ContactCommunication",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "ContactAddress",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritDoc Terrasoft.BasePageV2#save
				 * @override
				 */
				save: function() {
					this.clearChangedValuesSynchronizedByDetail();
					this.callParent(arguments);
				},

				/**
				 * @inherit#oc Terrasoft.configuration.BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("Email", EmailHelper.getEmailValidator);
				},

				jobChanged: function() {
					const job = this.get("Job");
					const jobTitle = this.get("JobTitle");
					if (this.isNotEmpty(job) && this.isEmpty(jobTitle)) {
						this.set("JobTitle", job.displayValue);
					}
				},

				_getContactImage: function() {
					const primaryImageColumnValue = this.get(this.primaryImageColumnName);
					if (primaryImageColumnValue) {
						return this.getSchemaImageUrl(primaryImageColumnValue);
					}
					return this._getContactDefaultImage();
				},

				_getContactDefaultImage: function() {
					return Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultPhoto"));
				},

				_onPhotoChange: function(photo) {
					if (!photo) {
						this.set(this.primaryImageColumnName, null);
						return;
					}
					Terrasoft.ImageApi.upload({
						file: photo,
						onComplete: this._onPhotoUploaded,
						onError: this._onPhotoChangeError,
						scope: this
					});
				},

				_onPhotoChangeError: function(imageId, error, xhr) {
					if (xhr.response) {
						const response = Terrasoft.decode(xhr.response);
						if (response.error) {
							Terrasoft.showMessage(response.error);
						}
					}
				},

				_onPhotoUploaded: function(imageId) {
					const imageData = {
						value: imageId,
						displayValue: "Photo"
					};
					this.set(this.primaryImageColumnName, imageData);
				},

				/**
				* @inheritDoc Terrasoft.BaseDataView#initActionButtonMenu
				* @override
				*/
				initActionButtonMenu: Terrasoft.emptyFn,

				/**
				 * @inheritDoc DuplicatesSearchUtilitiesV2#initPerformSearchOnSave
				 * @override
				 */
				initPerformSearchOnSave: Terrasoft.emptyFn

			}
		};
	});



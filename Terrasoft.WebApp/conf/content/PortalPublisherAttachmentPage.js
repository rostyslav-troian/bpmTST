Terrasoft.configuration.Structures["PortalPublisherAttachmentPage"] = {innerHierarchyStack: ["PortalPublisherAttachmentPage"], structureParent: "BasePublisherAttachmentPage"};
define('PortalPublisherAttachmentPageStructure', ['PortalPublisherAttachmentPageResources'], function(resources) {return {schemaUId:'10d05539-4500-4200-8ae6-4e814147f9b1',schemaCaption: "Portal publisher attachment page", parentSchemaName: "BasePublisherAttachmentPage", schemaName:'PortalPublisherAttachmentPage',parentSchemaUId:'629b4c4a-519f-4dd5-9940-2ec8741ea938',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalPublisherAttachmentPage", [],
	function() {
		return {
			entitySchemaName: "PortalMessageFile",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePublisherAttachmentPage#deleteAttachment
				 * @override
				 */
				deleteAttachment: function(callback) {
					this.Terrasoft.Features.getIsEnabled("SecurePortalMessageFileInHistory")
						? this.deleteAttachmentViaService()
							.then(this._deleteAttachFromViewModel.bind(this))
							.catch(this._showErrorInfo.bind(this))
							.finally(this.Ext.callback.bind(this, callback))
						: this.callParent(arguments);
				},

				/**
				 * @private
				 */
				_getServiceConfig: function () {
					return {
						"serviceName": "PortalMessageFileService",
						"methodName": "DeletePortalMessageFile",
						"data": {
							"portalMessageFileId": this.$Id
						}
					};
				},

				/**
				 * Delete attachments via PortalMessageFileService
				 * @protected
				 */
				deleteAttachmentViaService: function() {
					return new Promise(function(resolve, reject) {
						const serviceConfig = this._getServiceConfig();
						this.callService(serviceConfig, function(response) {
							if (response && response.DeletePortalMessageFileResult) {
								resolve();
							} else if (response.errorInfo) {
								reject(response.errorInfo.message);
							}
						}, this);
					}.bind(this));
				},

				/**
				 * Delete viewmodel from filesList which is corresponded to list of files defined as Collection in
				 * PortalMesagePublisherPage view model
				 * @private
				 */
				_deleteAttachFromViewModel: function() {
					const filesListItems = this.values.filesList;
					filesListItems.remove(filesListItems.collection.getByKey(this.$Id));
				},

				/**
				 * @private
				 * @param {String} msg Error message string.
				 */
				_showErrorInfo: function(msg) {
					return Promise.resolve(this.Terrasoft.showErrorMessage(msg));
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);



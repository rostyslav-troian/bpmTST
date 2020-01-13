Terrasoft.configuration.Structures["BaseModalBoxPage"] = {innerHierarchyStack: ["BaseModalBoxPage"]};
define('BaseModalBoxPageStructure', ['BaseModalBoxPageResources'], function(resources) {return {schemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',schemaCaption: "Base modal box page schema", parentSchemaName: "", schemaName:'BaseModalBoxPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseModalBoxPage", ["css!BaseModalBoxPageCss"],
	function() {
		return {
			messages: {
				/**
				 * @message HistoryStateChanged
				 * Will close modal window if history state changes.
				 */
				"HistoryStateChanged": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ModalBoxClosing
				 * Fires when modal box is closing.
				 */
				"ModalBoxClosing": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * Updates size of current modal box.
				 * @protected
				 * @param {Object} [size] New size. If empty, modal box will be resized to match its content.
				 * @param {Number} size.width New width.
				 * @param {Number} size.height New height.
				 */
				resize: function(size) {
					size = size || {};
					this.updateSize(size.width, size.height);
				},

				/**
				 * Returns parameters on page close.
				 * @virtual
				 */
				getModalClosingMessageArgs: Terrasoft.emptyFn,

				/**
				 * Unloads current modal box module.
				 * @protected
				 * @virtual
				 */
				close: function() {
					this.destroyModule();
				},

				/**
				 * Returns header caption from resources.
				 * @protected
				 * @virtual
				 * @return {String} Header caption.
				 */
				getHeader: function() {
					return this.get("Resources.Strings.HeaderCaption");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
				 * @override
				 */
				getProfileKey: function() {
					return this.name;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("HistoryStateChanged", this.close, this);
				},

				//endregion

				//region Methods: Public

				/**
				 * Returns modal window initial config.
				 * @virtual
				 * @return {Object}
				 * @return {Object} [return.modalBoxConfig] Modal box parameters.
				 * @return {Object} [return.initialSize] Modal box initial size.
				 * @return {Number} return.initialSize.width Initial width.
				 * @return {Number} return.initialSize.height Initial height.
				 */
				getModalBoxInitialConfig: Terrasoft.emptyFn,

				/**
				 * Fires ModalBoxClosing message.
				 */
				beforeModalBoxClosing: function() {
					this.sandbox.publish("ModalBoxClosing", this.getModalClosingMessageArgs(), [this.sandbox.id]);
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/ [{
					"operation": "insert",
					"index": 0,
					"name": "CardContentWrapper",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["modal-box-card-content-wrap"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentWrapper",
					"propertyName": "items",
					"name": "CardContentContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["modal-box-card-content-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "HeaderContainer",
					"index": 1,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header", "modal-box-page-header-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "CloseButtonContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["close-btn-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "CloseButtonContainer",
					"propertyName": "items",
					"values": {
						"click": {
							"bindTo": "close"
						},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"hint": {
							"bindTo": "Resources.Strings.CloseButtonHint"
						},
						"imageConfig": {
							"bindTo": "Resources.Images.CloseButtonImage"
						},
						"markerValue": "CloseIconButton",
						"classes": {
							"wrapperClass": ["close-btn"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "HeaderCaptionContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header-name-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "HeaderCaptionContainer",
					"propertyName": "items",
					"name": "HeaderCaption",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"markerValue": {
							"bindTo": "getHeader"
						},
						"caption": {
							"bindTo": "getHeader"
						}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});



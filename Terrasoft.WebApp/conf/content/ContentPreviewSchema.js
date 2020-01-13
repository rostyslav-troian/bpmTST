Terrasoft.configuration.Structures["ContentPreviewSchema"] = {innerHierarchyStack: ["ContentPreviewSchema"]};
define('ContentPreviewSchemaStructure', ['ContentPreviewSchemaResources'], function(resources) {return {schemaUId:'efd21b1b-be66-4b45-b1d1-a842f91b1894',schemaCaption: "ContentPreviewSchema", parentSchemaName: "", schemaName:'ContentPreviewSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentPreviewSchema", ["terrasoft"],
	function(Terrasoft) {
		return {
			messages: {

				/**
				 * ########## ######### ######### ######### ###### ######### ####### #######.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### ### ######### ########## ############# ######### #######.
				 */
				"GetColumnConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### ### ######### ########## ############# ######### #######.
				 */
				"GetSchemaColumnsNames": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### ### ######### ########## ############# ######### #######.
				 */
				"GetDesignerDisplayConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### ### ######### ############## ###### ### ##### ##### ###########.
				 */
				"GetNewLookupPackageUId": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

			},
			methods: {

				/**
				 * ######### ########### ####.
				 * @protected
				 * @virtual
				 */
				close: function() {
					this.destroyModule();
				},

				/**
				 * ######### html # iframe #############.
				 * @protected
				 * @virtual
				 * @param {String} html ##### ### ####### # iframe.
				 */
				insertHtmlToIframe: function(html) {
					var iframe = Ext.get("preview-content-iframe");
					if (!iframe) {
						return;
					}
					var headRegex = /(<head.*?>[\s\S]*<\/head>)/;
					var bodyRegex = /(<body.*?>[\s\S]*<\/body>)/;
					var headHtml = headRegex.test(html) ? headRegex.exec(html)[1] : "";
					var bodyHtml = bodyRegex.test(html) ? bodyRegex.exec(html)[1] : html;
					var iframeDocument = iframe.dom.contentWindow.document;
					iframeDocument.head.innerHTML = headHtml;
					iframeDocument.body.innerHTML = bodyHtml;
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					this.updateSize(800, 550);
					var moduleInfo = this.get("moduleInfo");
					var displayHtml = moduleInfo.displayHtml;
					this.insertHtmlToIframe(displayHtml);
					this.hideBodyMask();
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "ContentContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"styles": {
							height: "98%",
							width: "98%"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "testLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"selectors": {"wrapEl": "#preview-content-iframe"},
								"className": "Terrasoft.HtmlControl",
								"html": "<iframe id='preview-content-iframe' class='preview-content-iframe'" +
									"width='100%' height='100%'></iframe>"
							};
						}
					}
				},
				{
					"operation": "insert",
					"name": "HeaderContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "CloseButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
						"click": {"bindTo": "close"}
					}
				}
			]
		};
	});



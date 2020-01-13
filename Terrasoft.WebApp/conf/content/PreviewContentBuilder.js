Terrasoft.configuration.Structures["PreviewContentBuilder"] = {innerHierarchyStack: ["PreviewContentBuilder"]};
define('PreviewContentBuilderStructure', ['PreviewContentBuilderResources'], function(resources) {return {schemaUId:'b943baa6-dbd7-4f97-be73-296c2983ae10',schemaCaption: "PreviewContentBuilder", parentSchemaName: "", schemaName:'PreviewContentBuilder',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PreviewContentBuilder", [], function() {
	return {
		messages: {
			/**
			 * @message ClosePreviewContentBuilder
			 */
			"ClosePreviewContentBuilder": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetPreviewHtml
			 */
			"GetPreviewHtml": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			DesktopPreviewWidth: {
				dataValueType: Terrasoft.DataValueType.INTEGER
			},
			IsDesktopMode: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			PreviewHtml: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		properties: {
			/**
			 * Width in mobile preview mode.
			 * @type {Number}
			 */
			MobileWidth: 350
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_initHotKeys: function() {
				this._keyMap = new Ext.util.KeyMap(Ext.getBody(), [{
					key: Ext.EventObject.ESC,
					scope: this,
					fn: this.onCloseClick
				}]);
				this._iframeKeyMap = new Ext.util.KeyMap(Ext.get("PreviewDocumentIframe").dom.contentWindow.document.body, [{
					key: Ext.EventObject.ESC,
					scope: this,
					fn: this.onCloseClick
				}]);
			},

			// endregion

			// region Methods: protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this._initHotKeys();
			},

			/**
			 * Returns preview html.
			 * @param {Object} previewConfig Preview config.
			 * @param {Number} previewConfig.width Preview width.
			 * @return {String} Preview html
			 */
			getPreviewHtml: function(previewConfig) {
				return this.sandbox.publish("GetPreviewHtml", previewConfig);
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.$PreviewHtml = this.getPreviewHtml();
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Handler for CloseButton click.
			 */
			onCloseClick: function() {
				this.sandbox.publish("ClosePreviewContentBuilder");
			},

			/**
			 * Handler for DesktopButton click.
			 */
			onDesktopButtonClick: function() {
				this.$IsDesktopMode = true;
			},

			/**
			 * Handler for MobileButton click.
			 */
			onMobileButtonClick: function() {
				this.$IsDesktopMode = false;
			},

			/**
			 * Handler for new tab click.
			 */
			onNewTabClick: function() {
				const html = this.getPreviewHtml();
				const preview = window.open("", "_blank");
				preview.document.write(html);
				preview.document.close();
			},

			/**
			 * Returns center container style.
			 * @return {Object}
			 */
			getCenterContainerStyle: function() {
				const padding = 52;
				return {
					"style": {
						"width": this.$IsDesktopMode ? "100%" : this.MobileWidth + padding + "px"
					},
					"is-desktop-mode": this.$IsDesktopMode
				};
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this._keyMap.disable();
				this._iframeKeyMap.disable();
				this.callParent(arguments);
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"name": "Header",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-preview-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ContentDesigner",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {
						"bindTo": "Resources.Strings.ContentDesigner"
					},
					"imageConfig": {
						"bindTo": "Resources.Images.BackIcon"
					},
					"classes": {
						"wrapperClass": ["back-to-designer"]
					},
					"click": {
						"bindTo": "onCloseClick"
					}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderButtons",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-buttons-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderButtons",
				"propertyName": "items",
				"name": "DesktopButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.DesktopButtonCaption"
					},
					"click": {
						"bindTo": "onDesktopButtonClick"
					},
					"pressed": {
						"bindTo": "IsDesktopMode"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderButtons",
				"propertyName": "items",
				"name": "MobileButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.MobileButtonCaption"
					},
					"click": {
						"bindTo": "onMobileButtonClick"
					},
					"pressed": {
						"bindTo": "IsDesktopMode",
						"bindConfig": {
							"converter": "invertBooleanValue"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "NewTabButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tips": [{
						"content": {
							"bindTo": "Resources.Strings.NewTabButtonCaption"
						}
					}],
					"imageConfig": {
						"bindTo": "Resources.Images.ExpandIcon"
					},
					"classes": {
						"wrapperClass": ["new-tab-button"]
					},
					"click": {
						"bindTo": "onNewTabClick"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Center",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["center-container"],
					"id": "centerContainer",
					"selectors": {
						"wrapEl": "#centerContainer"
					},
					"domAttributes": {
						"bindTo": "getCenterContainerStyle"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Outside",
				"parentName": "Center",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["outsider-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Inside",
				"parentName": "Outside",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["inside-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Inside",
				"propertyName": "items",
				"name": "PreviewDocument",
				"values": {
					"generator": function() {
						return {
							"className": "Terrasoft.IframeControl",
							"id": "PreviewDocumentIframe",
							"iframeContent": {
								"bindTo": "PreviewHtml"
							},
							"wrapClass": ["preview-document-iframe"]
						};
					}
				}
			}
		] /**SCHEMA_DIFF*/
	};
});



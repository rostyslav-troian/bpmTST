Terrasoft.configuration.Structures["BulkEmailContentWizardPreview"] = {innerHierarchyStack: ["BulkEmailContentWizardPreview"]};
define('BulkEmailContentWizardPreviewStructure', ['BulkEmailContentWizardPreviewResources'], function(resources) {return {schemaUId:'addcd14f-3def-4da3-b56d-eea3d5e64b15',schemaCaption: "BulkEmailContentWizardPreview", parentSchemaName: "", schemaName:'BulkEmailContentWizardPreview',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailContentWizardPreview", ["BulkEmailContentWizardPreviewResources",
		"DynamicContentReplicaBuilder", "ContainerListGenerator", "ContainerList", "MultilineLabel", "css!MultilineLabel",
		"PreviewReplicaViewModel", "ImageView", "css!BulkEmailContentWizardPreviewCSS"],
	function (resources, ReplicaBuilder) {
	return {
		messages: {
			/**
			 * @message GetContentBuilderConfig
			 * Gets content builder config.
			 */
			"GetContentBuilderConfig": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetPreviewHtml
			 */
			"GetPreviewHtml": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdatePreview
			 * Gets content builder config.
			 */
			"UpdatePreview": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdatePreview
			 * Gets content builder config.
			 */
			"UpdatePreviewWithRender": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdatePreview
			 * Gets content builder config.
			 */
			"UpdateHeaders": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message BulkEmailContentWizardAction
			 * Sends specific action to content wizard.
			 */
			"BulkEmailContentWizardAction": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Collection of the replica models.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"ReplicaCollection": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"isCollection": true,
				"value": Ext.create("Terrasoft.BaseViewModelCollection")
			},

			/**
			 * Collection of the default replica model.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"DefaultReplicaCollection": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"isCollection": true,
				"value": Ext.create("Terrasoft.BaseViewModelCollection")
			},

			/**
			 * Mask of active replica.
			 * @type {Number}
			 */
			"ActiveReplicaMask": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * Active item in replica collection
			 * @type {Terrasoft.PreviewReplicaViewModel}
			 */
			"SelectedReplicaItem": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": Ext.create("Terrasoft.PreviewReplicaViewModel", {
					validateColumns: false
				})
			},

			/**
			 * Replica item with default values of headers.
			 * @type {Terrasoft.PreviewDefaultReplicaViewModel}
			 */
			"DefaultReplicaItem": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": this.Ext.create("Terrasoft.PreviewDefaultReplicaViewModel")
			},

			/**
			 * Current content to show in preview.
			 * @type {Terrasoft.CUSTOM_OBJECT}
			 */
			"PreviewHtml": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Flag to indicate that template is static content.
			 * @type {Boolean}
			 */
			"IsStaticEmail" : {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": true
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Gets dom attribute to turn off scrolling.
			 * @returns {{scrolling: string}}
			 * @private
			 */
			_getScrollingAttribute: function() {
				return {
					"scrolling": "no"
				};
			},

			/**
			 * Populates replica collection with custom headers from headers module.
			 * @private
			 */
			_populateReplicasWithHeaders: function () {
				var replicaHeaders = this.$IsStaticEmail ?
					this.$DefaultReplicaCollection :
					this.getInitialReplicaHeaders();
				this.setHeadersToReplicaCollection(replicaHeaders);
			},

			/**
			 * Sets html-content to replica model by replica masl,
			 * @param {number} mask Replica mask.
			 * @param {string} content Html content.
			 * @private
			 */
			_setReplicaContentByMask: function (mask, content) {
				var replicaModel = this._getReplicaByMask(mask);
				if (replicaModel && replicaModel.$Content !== content) {
					replicaModel.$Content = content;
				}
			},

			/**
			 * Gets replica model by given mask.
			 * @param {number} mask Replica mask.
			 * @returns {Terrasoft.PreviewReplicaViewModel} Replica model instance.
			 * @private
			 */
			_getReplicaByMask: function (mask) {
				return this.$ReplicaCollection.findByFn(function (replica) {
					return replica.$Mask === mask;
				});
			},

			_updatePreview: function(contentBuilderConfig) {
				this.initDefaultItem();
				this.generateContentReplicas(contentBuilderConfig);
				this._populateReplicasWithHeaders();
			},

			_renderContent: function () {
				if (this.$IsStaticEmail) {
					this.renderStaticEmailPreview();
				} else {
					this.renderDynamicEmailPreview();
				}
			},

			/**
			 * Handles UpdatePreview message. Initializes replica items for static or dynamic content.
			 * @param {object} contentBuilderConfig Template config.
			 * @private
			 */
			_onUpdatePreview: function (contentBuilderConfig) {
				this._updatePreview(contentBuilderConfig);
			},

			_onUpdatePreviewWithRender: function (contentBuilderConfig) {
				this._updatePreview(contentBuilderConfig);
				this._renderContent();
			},

			/**
			 * Handles UpdateHeaders message. Sets default and custom headers.
			 * @private
			 */
			_onUpdateHeaders: function() {
				this.initDefaultItem();
				var replicaHeaders = this.getInitialReplicaHeaders();
				this.setHeadersToReplicaCollection(replicaHeaders);
			},

			/**
			 * Handles test email button click. Sends action message to wizard module.
			 * @private
			 */
			_onSendTestEmailButtonClicked: function() {
				this.sandbox.publish("BulkEmailContentWizardAction",
					Terrasoft.BulkEmailContentWizardActions.ShowTestEmailDialog);
			},

			/**
			 * Handles click on mobile preview container to set it as active one.
			 * @private
			 */
			_subscribeOnMobileClick: function() {
				$(".mobile-content-document").on("click", function() {
					$(".mobile-content-document").removeClass("blur-background");
					$(".desktop-content-document").addClass("blur-background");
				});
			},

			/**
			 * Handles click on desktop preview container to set it as active one.
			 * @private
			 */
			_subscribeOnDesktopClick: function() {
				$(".desktop-content-document").on("click", function() {
					$(".desktop-content-document").removeClass("blur-background");
					$(".mobile-content-document").addClass("blur-background");
				});
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Render correct preview for static email.
			 * @protected
			 */
			renderStaticEmailPreview: function() {
				this.onReplicaMaskChange(this.$ActiveReplicaMask);
			},

			/**
			 * @inheritdoc Render correct preview for dynamic email. Flushes active list item id to rerender current
			 * selection. If neither selected - selects first.
			 * @protected
			 */
			renderDynamicEmailPreview: function() {
				var currentActiveReplicaMask = this.$ActiveReplicaMask;
				this.$ActiveReplicaMask = -1;
				if (!this._getReplicaByMask(currentActiveReplicaMask)){
					currentActiveReplicaMask = this.$ReplicaCollection.first().$Mask;
				}
				this.onReplicaMaskChange(currentActiveReplicaMask);
			},

			/**
			 * @inheritdoc Terrasoft.PreviewContentBuilder#getPreviewHtml
			 * @override
			 */
			getPreviewHtml: function (previewConfig) {
				if (Terrasoft.isEmpty(this.$ActiveReplicaMask) && !this.$ReplicaCollection.isEmpty()) {
					return this.get("Resources.Strings.SelectReplicaToPreviewContent");
				}
				var replica = this._getReplicaByMask(this.$ActiveReplicaMask);
				if (replica && replica.$Content) {
					return replica.$Content;
				}
				previewConfig = previewConfig || {};
				previewConfig.activeReplicaMask = this.$IsStaticEmail ? 0 : this.$ActiveReplicaMask;
				return this.sandbox.publish("GetPreviewHtml", previewConfig);
			},

			/**
			 * Get initial collection of replicas headers from content wizard.
			 * @protected
			 * @return {Terrasoft.BaseViewModelCollection}
			 */
			getInitialReplicaHeaders: function () {
				return this.sandbox.publish("BulkEmailContentWizardAction",
					Terrasoft.BulkEmailContentWizardActions.GetReplicaHeadersFromPreview) ||
					this.sandbox.publish("BulkEmailContentWizardAction",
						Terrasoft.BulkEmailContentWizardActions.GetReplicaHeaders);
			},

			/**
			 * Sets initial headers to replicas collection.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} initialHeaders Collection of initial headers.
			 */
			setHeadersToReplicaCollection: function (initialHeaders) {
				Terrasoft.each(this.$ReplicaCollection, function (replica) {
					if (!initialHeaders.contains(replica.$Mask)) {
						replica.bundle(this.$DefaultReplicaItem);
						return;
					}
					replica.$UseSpecialHeaders = true;
					var headers = initialHeaders.get(replica.$Mask);
					replica.$PreHeader = headers.$PreHeader;
					replica.$SenderName = headers.$SenderName;
					replica.$SenderEmail = headers.$SenderEmail;
					replica.$Subject = headers.$Subject;
				}, this);
			},

			/**
			 * Subscribe on sandbox messages.
			 * @protected
			 */
			subscribeMessages: function () {
				this.sandbox.subscribe("UpdatePreview", this._onUpdatePreview, this, ["Preview"]);
				this.sandbox.subscribe("UpdatePreviewWithRender", this._onUpdatePreviewWithRender, this, ["Preview"]);
				this.sandbox.subscribe("UpdateHeaders", this._onUpdateHeaders, this);
			},

			/**
			 * Gets replicas collection based on content builder config.
			 * @protected
			 * @param contentBuilderConfig Content builder view model as json.
			 * @returns {Array}
			 */
			getReplicasByConfig: function (contentBuilderConfig) {
				return ReplicaBuilder.generateReplicas(contentBuilderConfig);
			},

			/**
			 * Generate collection of preview content replicas based on content builder config.
			 * @protected
			 * @param {Object} contentBuilderConfig Content builder view model as json.
			 */
			generateContentReplicas: function (contentBuilderConfig) {
				var replicas = this.getReplicasByConfig(contentBuilderConfig);
				this.$IsStaticEmail = replicas.length === 1
					&& replicas[0].ReplicaMask === 0;
				if (this.$IsStaticEmail) {
					replicas[0].ReplicaMask = 1;
				}
				var actualReplicaCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(replicas, function (replica) {
					var actualReplica = this.getActualReplicaViewModel(replica);
					actualReplicaCollection.add(actualReplica.$Mask, actualReplica);
				}, this);
				this.$ReplicaCollection.clear();
				this.$ReplicaCollection.loadAll(actualReplicaCollection);
			},

			/**
			 * Gets content builder config.
			 * @protected
			 * @return {Object}
			 */
			getContentBuilderConfig: function () {
				return this.sandbox.publish("GetContentBuilderConfig");
			},

			/**
			 * Gets actual replica view model.
			 * @protected
			 * @param {Object} replica Replica item.
			 * @return {Terrasoft.PreviewReplicaViewModel} Replica preview view model.
			 */
			getActualReplicaViewModel: function (replica) {
				var viewModel = Ext.create("Terrasoft.PreviewReplicaViewModel");
				viewModel.$DefaultItem = this.$DefaultReplicaItem;
				viewModel.$Mask = replica.ReplicaMask;
				viewModel.$Caption = replica.Caption;
				viewModel.$UseSpecialHeaders = false;
				viewModel.$Content = null;
				return viewModel;
			},

			/**
			 * Sets replica selected by given mask.
			 * @param {number} mask Replica mask.
			 */
			selectReplicaByMask: function (mask) {
				var content = this.getPreviewHtml();
				this.$PreviewHtml = content;
				this._setReplicaContentByMask(mask, content);
				var selectedVm = this._getReplicaByMask(mask);
				this.$SelectedReplicaItem.bundle(selectedVm);
			},

			/**
			 * Handles current replica mask change.
			 * @protected
			 * @param {Number} mask New selected replica mask value.
			 */
			onReplicaMaskChange: function (mask) {
				this.$ActiveReplicaMask = mask;
				this.selectReplicaByMask(mask);
			},

			/**
			 * Initializes replica item for the default headers.
			 * @protected
			 */
			initDefaultItem: function () {
				var defaultHeaders = this.sandbox.publish("BulkEmailContentWizardAction",
					Terrasoft.BulkEmailContentWizardActions.GetDefaultHeadersFromPreview) ||
					this.sandbox.publish("BulkEmailContentWizardAction",
						Terrasoft.BulkEmailContentWizardActions.GetDefaultHeadersFromBulkEmail);
				this.$DefaultReplicaItem.$Subject = defaultHeaders.$Subject;
				this.$DefaultReplicaItem.$SenderEmail = defaultHeaders.$SenderEmail;
				this.$DefaultReplicaItem.$SenderName = defaultHeaders.$SenderName;
				this.$DefaultReplicaItem.$PreHeader = defaultHeaders.$PreHeader;
				this.$DefaultReplicaItem.$Caption =
					resources.localizableStrings.DefaultReplicasContainerCaption;
				this.$DefaultReplicaItem.$Mask = 1;
				this.$DefaultReplicaItem.$UseSpecialHeaders = false;
				this.$DefaultReplicaItem.$DefaultItem = this.$DefaultReplicaItem;
				this.$DefaultReplicaCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				this.$DefaultReplicaCollection.add(this.$DefaultReplicaItem.$Mask, this.$DefaultReplicaItem);
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc PreviewContentBuilder#init
			 * @override
			 */
			init: function () {
				this.$SelectedReplicaItem.sandbox = this.sandbox;
				this.subscribeMessages();
				this.initDefaultItem();
				var contentBuilderConfig = this.getContentBuilderConfig();
				this.generateContentReplicas(contentBuilderConfig);
				this._populateReplicasWithHeaders();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModule#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				if(this.$ReplicaCollection.isEmpty()) {
					return;
				}
				if (this.$IsStaticEmail) {
					this.$ActiveReplicaMask = 1;
					this.renderStaticEmailPreview();
				} else {
					this.renderDynamicEmailPreview();
				}
			},

			/**
			 * Handles download htm button click. Downloads currently selected replica's html.
			 */
			onDownloadHtmlButtonClick: function () {
				var element = document.createElement("a");
				element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(this.$PreviewHtml));
				var currentReplica = this._getReplicaByMask(this.$ActiveReplicaMask);
				element.setAttribute("download", currentReplica.$Caption + ".html");
				element.style.display = "none";
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PreviewMainContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-preview-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "LeftSideContainer",
				"parentName": "PreviewMainContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-side-container"],
					"visible": true,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainer",
				"parentName": "LeftSideContainer",
				"propertyName": "items",
				"index": 3,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["replica-caption-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainerCaptionGridLayout",
				"parentName": "ReplicasContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"classes": {
						"wrapClassName": ["replica-caption-item-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainerCaption",
				"parentName": "ReplicasContainerCaptionGridLayout",
				"propertyName": "items",
				"values": {
					"caption":  resources.localizableStrings.ReplicasContainerCaption,
					"itemType": Terrasoft.ViewItemType.LABEL,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 21,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainerCaptionInfoButton",
				"parentName": "ReplicasContainerCaptionGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": resources.localizableStrings.InboxPreviewInfoButtonCaption,
					"behaviour": {
						"displayEvent": this.Terrasoft.TipDisplayEvent.CLICK
					},
					"classes": {
						"wrapClassName": ["caption-info-button"]
					},
					"layout": {
						"column": 22,
						"row": 0,
						"colSpan": 1,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "DefaultReplicaContainerBorder",
				"parentName": "ReplicasContainerCaptionGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["replica-caption-container-border"]
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22,
						"rowSpan": 1
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainerList",
				"parentName": "ReplicasContainer",
				"propertyName": "items",
				"values": {
					"idProperty": "Mask",
					"rowCssSelector": ".replica-item",
					"itemType": this.Terrasoft.ViewItemType.GRID,
					"collection": "$ReplicaCollection",
					"generator": "ContainerListGenerator.generatePartial",
					"selectableRowCss": "replica-item",
					"classes": {
						"wrapClassName": ["replica-container-list scrollable-container"]
					},
					"itemPrefix": "View",
					"dataItemIdPrefix": "replica-item",
					"activeItem": "$ActiveReplicaMask",
					"onItemClick": "$onReplicaMaskChange",
					"defaultItemConfig": {
						"className": "Terrasoft.Container",
						"id": "replica-item-view",
						"selectors": {
							"wrapEl": "#replica-item-view"
						},
						"classes": {
							"wrapClassName": ["replica-item-wrapper-container"]
						},
						"items": [
							{
								"className": "Terrasoft.Container",
								"classes": {
									"wrapClassName": ["first-row-grid"]
								},
								"items": [
									{
										"className": "Terrasoft.Container",
										"classes": {
											"wrapClassName": ["grid-item-letter"]
										},
										"items": [
											{
												"className": "Terrasoft.ImageView",
												"classes": {
													"wrapClass": ["letter-icon-wrapper"]
												},
												"imageSrc":  "$_getLetterIcon",
												"visible": true
											}
										]
									},
									{
										"className": "Terrasoft.Container",
										"classes": {
											"wrapClassName": ["replica-item-wrapper-caption", "grid-item-replica"]
										},
										"items": [
											{
												"className": "Terrasoft.Label",
												"classes": {
													"labelClass": ["label-wrap"]
												},
												"caption": "$_getReplicaLabelCaption",
												"markerValue": "$Caption",
												"domAttributes": "$_getReplicaLabelDomAttributes"
											}
										]
									},
									{
										"className": "Terrasoft.Container",
										"classes": {
											"wrapClassName": ["grid-item-arrow"]
										},
										"items": [
											{
												"className": "Terrasoft.ImageView",
												"classes": {
													"wrapClass": ["right-arrow-icon-wrapper"]
												},
												"imageSrc":  "$_getArrowIcon",
												"visible": true
											}
										]
									}
								]
							},
							{
								"className": "Terrasoft.Container",
								"classes": {
									"wrapClassName": ["item-sender-name"]
								},
								"items": [
									{
										"className": "Terrasoft.Label",
										"classes": {
											"labelClass": ["label-wrap","headers-label"]
										},
										"caption": "$SenderName",
										"markerValue": "$SenderName",
										"tag": "SenderName",
										"domAttributes": "$_getHeaderLabelDomAttribute"
									}
								]
							},
							{
								"className": "Terrasoft.Container",
								"classes": {
									"wrapClassName": ["item-subject"]
								},
								"items": [
									{
										"className": "Terrasoft.Label",
										"classes": {
											"labelClass": ["label-wrap","headers-label"]
										},
										"caption": "$Subject",
										"markerValue": "$Subject",
										"tag": "Subject",
										"domAttributes": "$_getHeaderLabelDomAttribute"
									}
								]
							},
							{
								"className": "Terrasoft.Container",
								"classes": {
									"wrapClassName": ["item-preheader"]
								},
								"items": [
									{
										"className": "Terrasoft.Label",
										"classes": {
											"labelClass": ["label-wrap","headers-label"]
										},
										"caption": "$PreHeader",
										"markerValue": "$PreHeader",
										"tag": "PreHeader",
										"domAttributes": "$_getHeaderLabelDomAttribute"
									}
								]
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreviewCenterContainer",
				"parentName": "PreviewMainContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["preview-center-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TemplateContentContainer",
				"parentName": "PreviewCenterContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["template-content-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MobileContentContainer",
				"parentName": "TemplateContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["mobile-content-document blur-background"],
					"afterrender": {"bindTo": "_subscribeOnMobileClick"},
					"afterrerender": {"bindTo": "_subscribeOnMobileClick"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MobileHeadersContainer",
				"parentName": "MobileContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["mobile-headers-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MobileSenderLabel",
				"parentName": "MobileHeadersContainer",
				"propertyName": "items",
				"values": {
					"bindingContext": "SelectedReplicaItem",
					"caption": "$_getSenderCaption",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["label-inline sender-label"]
					},
					"domAttributes": "$_getSenderDomAttribute"
				}
			},
			{
				"operation": "insert",
				"name": "MobileSubject",
				"parentName": "MobileHeadersContainer",
				"propertyName": "items",
				"values": {
					"bindingContext": "SelectedReplicaItem",
					"caption":  "$Subject",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["subject-label"]
					},
					"tag": "Subject",
					"domAttributes": "$_getHeaderLabelDomAttribute"
				}
			},
			{
				"operation": "insert",
				"name": "DesktopContentContainer",
				"parentName": "TemplateContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["desktop-content-document"],
					"afterrender": {"bindTo": "_subscribeOnDesktopClick"},
					"afterrerender": {"bindTo": "_subscribeOnDesktopClick"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DesktopHeadersContainer",
				"parentName": "DesktopContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["desktop-headers-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DesktopPreviewContainer",
				"parentName": "DesktopContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["desktop-preview-container scrollable-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DesktopPreviewDocument",
				"parentName": "DesktopPreviewContainer",
				"propertyName": "items",
				"values": {
					"generator": function() {
						return {
							"className": "Terrasoft.IframeControl",
							"id": "DesktopPreviewDocumentIframe",
							"iframeContent": "$PreviewHtml",
							"fitHeightToContent": "true",
							"wrapClass": ["preview-document-iframe"],
							"domAttributes": "$_getScrollingAttribute"
						};
					}
				}
			},
			{
				"operation": "insert",
				"name": "DesktopButtons",
				"parentName": "DesktopHeadersContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DesktopSendTestEmail",
				"parentName": "DesktopButtons",
				"propertyName": "items",
				"values": {
					"caption": resources.localizableStrings.SendTestEmailButtonCaption,
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": "$_onSendTestEmailButtonClicked",
					"classes": {"textClass": ["desktop-small-button"]}
				}
			},
			{
				"operation": "insert",
				"name": "DesktopGetHtmlButton",
				"parentName": "DesktopButtons",
				"propertyName": "items",
				"values": {
					"caption":  resources.localizableStrings.DownloadHtmlButtonCaption,
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {"textClass": ["desktop-small-button"]},
					"click": "$onDownloadHtmlButtonClick"
				}
			},
			{
				"operation": "insert",
				"name": "DesktopSenderLabel",
				"parentName": "DesktopHeadersContainer",
				"propertyName": "items",
				"values": {
					"bindingContext": "SelectedReplicaItem",
					"caption": "$_getSenderCaption",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["label-inline sender-label"]
					},
					"domAttributes": "$_getSenderDomAttribute"
				}
			},
			{
				"operation": "insert",
				"name": "DesktopSubject",
				"parentName": "DesktopHeadersContainer",
				"propertyName": "items",
				"values": {
					"bindingContext": "SelectedReplicaItem",
					"caption":  "$Subject",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["subject-label"]
					},
					"tag": "Subject",
					"domAttributes": "$_getHeaderLabelDomAttribute"
				}
			},
			{
				"operation": "insert",
				"name": "MobilePreviewContainer",
				"parentName": "MobileContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["mobile-preview-container scrollable-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MobilePreviewDocument",
				"parentName": "MobilePreviewContainer",
				"propertyName": "items",
				"values": {
					"generator": function() {
						return {
							"domAttributes": "$_getScrollingAttribute",
							"className": "Terrasoft.IframeControl",
							"id": "MobilePreviewDocumentIframe",
							"iframeContent": "$PreviewHtml",
							"wrapClass": ["preview-document-iframe"],
							"fitHeightToContent": "true"
						};
					}
				}
			}
		] /**SCHEMA_DIFF*/
	};
});



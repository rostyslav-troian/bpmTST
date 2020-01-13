Terrasoft.configuration.Structures["EmailWithSubjectContentBuilder"] = {innerHierarchyStack: ["EmailWithSubjectContentBuilder"], structureParent: "EmailContentBuilder"};
define('EmailWithSubjectContentBuilderStructure', ['EmailWithSubjectContentBuilderResources'], function(resources) {return {schemaUId:'aa856850-57c3-4135-99c2-857eb2eb7ca2',schemaCaption: "EmailWithSubjectContentBuilder", parentSchemaName: "EmailContentBuilder", schemaName:'EmailWithSubjectContentBuilder',parentSchemaUId:'ab75212f-7de6-4f93-a268-429bfab61422',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmailWithSubjectContentBuilder", ["HorizontalAlignContainer", "ImageView",
		"css!EmailWithSubjectContentBuilderCSS"],
	function() {
		return {
			attributes: {
				/**
				 * Content subject.
				 */
				Subject: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: null
				},

				/**
				 * Email template display value.
				 */
				TemplateDisplayValue: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: null
				},

				/**
				 * Macros window open initiator.
				 */
				MacrosInsertEventSource: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: null
				},

				/**
				 * Selected text in Subject edit.
				 */
				SubjectSelectedText: {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: ""
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "RightContainer",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["right-container", "right-container-display"]
						},
						"markerValue": "$_getRightContainerMarkerValue"
					}
				},
				{
					"operation": "merge",
					"name": "RightPanelContainer",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["right-panel-container", "right-container-display", "collapsed"]
						}
					}
				},
				{
					"operation": "move",
					"name": "LeftControlGroup",
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "ButtonHeaderContainer",
					"parentName": "MainContainer",
					"index": 0,
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["button-header-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ButtonGroupContainer",
					"parentName": "ButtonHeaderContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["button-group-container"]
						},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "CancelButton",
					"parentName": "ButtonGroupContainer",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "move",
					"name": "SaveButton",
					"parentName": "ButtonGroupContainer",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CaptionContainer",
					"parentName": "ButtonHeaderContainer",
					"propertyName": "items",
					"index": 2,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["caption-container"]
						},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "Caption",
					"parentName": "CaptionContainer",
					"propertyName": "items"
				},
				{
					"operation": "merge",
					"name": "Caption",
					"parentName": "CaptionContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"wrapClassName": ["caption-label"],
							"labelClass": ["subject-page-content-builder-caption-label"]
						},
						"caption": {"bindTo": "TemplateDisplayValue"}
					}
				},
				{
					"operation": "merge",
					"name": "LeftControlGroup",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClass": ["subject-page-left-control-group", "fixed"]
						},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": ""
					}
				},
				{
					"operation": "move",
					"name": "RightButtonContainer",
					"parentName": "HeaderContainer",
					"propertyName": "items"
				},
				{
					"operation": "remove",
					"name": "LeftButtonContainer"
				},
				{
					"operation": "merge",
					"name": "FooterContainer",
					"parentName": "RightContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["footer-container", "footer-container-display"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SubjectWrapContainer",
					"parentName": "FooterContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.HorizontalAlignContainer",
						"classes": {
							"wrapClassName": ["subject-container-wrap"]
						},
						"width": {"bindTo": "Width"},
						"sheetAlign": {"bindTo": "SheetAlign"},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "SheetContainer",
					"parentName": "FooterContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "LeftSubjectContainer",
					"parentName": "SubjectWrapContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["left-subject-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RightSubjectContainer",
					"parentName": "SubjectWrapContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["right-subject-container"]
						},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "EndButtonContainer",
					"parentName": "RightSubjectContainer",
					"propertyName": "items"
				},
				{
					"operation": "move",
					"name": "SettingsContainer",
					"parentName": "RightSubjectContainer",
					"propertyName": "items"
				},
				{
					"operation": "merge",
					"name": "SettingsContainer",
					"values": {
						"wrapClass": ["content-builder-settings-container",
							"mlang-content-builder-settings-container"]
					}
				},
				{
					"operation": "merge",
					"name": "EndButtonContainer",
					"values": {
						"wrapClass": ["content-builder-settings-container",
							"mlang-content-builder-settings-container"]
					}
				},
				{
					"operation": "merge",
					"name": "SheetSelectButton",
					"values": {
						"classes": {
							"wrapperClass": ["sheet-container-tools"],
							"imageClass": ["sheet-tools-image"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "SheetSettingsButton",
					"values": {
						"classes": {
							"wrapperClass": ["sheet-container-tools"],
							"imageClass": ["sheet-tools-image"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SheetSettingsButtonGroupContainer",
					"parentName": "RightSubjectContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["settings-button-group"]
						},
						"visible": {"bindTo": "ContentSheetSelected"},
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "AlignContainer",
					"parentName": "SheetSettingsButtonGroupContainer",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "merge",
					"name": "AlignContainer",
					"parentName": "SheetSettingsButtonGroupContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["content-builder-align-container",
							"content-builder-align-container-display"]
					}
				},
				{
					"operation": "merge",
					"name": "SheetAlign",
					"parentName": "AlignContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["sheet-position-control-group-container",
							"sheet-position-control-group-container-display"]
					}
				},
				{
					"operation": "merge",
					"name": "SheetPositionLabel",
					"parentName": "AlignContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"classes": ["sheet-position-label-display"]
						}
					}
				},
				{
					"operation": "move",
					"name": "ContentSheetWidthContainer",
					"parentName": "SheetSettingsButtonGroupContainer",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "merge",
					"name": "ContentSheetWidthContainer",
					"parentName": "SheetSettingsButtonGroupContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["content-sheet-width-container",
							"content-sheet-width-container-display"]
					}
				},
				{
					"operation": "merge",
					"name": "ContentSheetWidthLabel",
					"parentName": "ContentSheetWidthContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"classes": ["",
								"content-sheet-width-label-display"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "PxLabel",
					"parentName": "ContentSheetWidthContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"classes": ["pxLabel", "pxLabel-display"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "FillSettingContainer",
					"parentName": "SheetSettingsButtonGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["background-settings-container"]
						},
						"visible": {"bindTo": "ContentSheetSelected"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SettingsColorButtonLabel",
					"parentName": "FillSettingContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.FillLabelCaption"},
						"labelConfig": {
							"classes": ["fill-setting-label"]
						},
						"visible": {"bindTo": "ContentSheetSelected"}
					}
				},
				{
					"operation": "move",
					"name": "SettingsColorButton",
					"parentName": "FillSettingContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "MLPreviewButton",
					"parentName": "EndButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "",
						"imageConfig": {"bindTo": "Resources.Images.PreviewButtonIcon"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": "actions-button-margin-right",
							"wrapperClass": ["sheet-container-tools"],
							"imageClass": ["sheet-tools-image"]
						},
						"click": "$openPreviewModule"
					}
				},
				{
					"operation": "move",
					"name": "PreviewButton",
					"parentName": "SettingsContainer",
					"propertyName": "items"
				},
				{
					"operation": "merge",
					"name": "PreviewButton",
					"parentName": "SettingsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "",
						"imageConfig": {"bindTo": "Resources.Images.PreviewButtonIcon"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"wrapperClass": ["sheet-container-tools"],
							"imageClass": ["sheet-tools-image"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SubjectComponentsContainer",
					"parentName": "LeftSubjectContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["subject-component-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EmailIcon",
					"parentName": "SubjectComponentsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {
							"bindTo": "getEmailIcon"
						},
						"classes": {
							"wrapClass": ["email-icon-image32", "email-icon-display"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SubjectEditContainer",
					"parentName": "SubjectComponentsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["subject-edit-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SubjectLabel",
					"parentName": "SubjectEditContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.SubjectLabelCaption"
						},
						"labelConfig": {
							"classes": ["subject-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "Subject",
					"parentName": "SubjectEditContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"generator": "InlineTextEditViewGenerator.generate",
						"bindTo": "Subject",
						"markerValue": "Subject",
						"selectedText": {
							"bindTo": "SubjectSelectedText"
						},
						"controlConfig": {
							"macrobuttonclicked": {
								"bindTo": "onSubjectMacroButtonClick"
							},
							"inlineTextControlConfig": {
								"id": "email-subject-edit",
								"ckeditorDefaultConfig": {
									"allowedContent": true,
									"removeButtons": "Underline,JustifyCenter,JustifyLeft,JustifyRight,Font,Link" +
									",FontSize,JustifyBlock,NumberedList,BulletedList,Bold,Italic,TextColor," +
									"Undo,Redo,Indent,Outdent,bpmonlinesource,lineheight,letterspacing,lineheightpanel,"+
									"letterspacingpanel,indentpanel"
								}
							},
							"showEmailTemplateLinkButton": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "RightHeaderContainer",
					"parentName": "ButtonHeaderContainer",
					"propertyName": "items",
					"index": 1,
					"values": {
						"id": "right-header-container",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["right-header-container-class"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RightLogoContainer",
					"parentName": "RightHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "header-logo-container",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": true,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "logoImage",
					"parentName": "RightLogoContainer",
					"propertyName": "items",
					"values": {
						"id": "logoImage",
						"itemType": Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {"bindTo": "getLogoImageUrl"}
					}
				}
			],
			methods: {

				//region Methods: Private

				/**
				 * Returns marker value name for right-container.
				 * @private
				 * @returns {string} Returns mjml marker value when mjml config enables.
				 * And regular marker value in otherwise.
				 */
				_getRightContainerMarkerValue: function() {
					return this.isMjmlConfig() ? "MjmlRightContainer" : "RightContainer";
				},

				/**
				 * Get logo link from SysSetting.
				 * @private
				 * @return {String} Logo image link.
				 */
				_getLogoImageFromSysSetting: function() {
					var config = {
						params: {
							r: "HeaderLogoImage"
						},
						source: this.Terrasoft.ImageSources.SYS_SETTING
					};
					return this.Terrasoft.ImageUrlBuilder.getUrl(config);
				},

				/**
				 * Insert macros to initiator field.
				 * @param macros Acquired macros.
				 * @param field Initiator field name.
				 * @private
				 */
				_insertMacrosIntoField: function(macros, field) {
					this.set(field + "SelectedText", macros);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritDoc Terrasoft.EmailContentBuilder#setContentSheetConfig
				 * @overridden
				 */
				setContentSheetConfig: function(entity) {
					this.set("Subject", entity.get("Subject"));
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.EmailContentBuilder#getContentSheetESQ
				 * @overridden
				 */
				getContentSheetESQ: function() {
					var esq = this.callParent(arguments);
					esq.addColumn("Subject");
					return esq;
				},

				/**
				 * @inheritDoc ContentBuilder#onGetMacros
				 * @overridden
				 */
				onGetMacros: function(macros) {
					var macrosInsertEventSource = this.get("MacrosInsertEventSource");
					if (macrosInsertEventSource) {
						this._insertMacrosIntoField(macros, macrosInsertEventSource);
						this.set("MacrosInsertEventSource", null);
						return;
					}
					this.callParent(arguments);
				},

				//endregion

				//region Methods: Public

				/**
				 * Returns logo image URL.
				 * @return {String} Logo URL.
				 * @public
				 */
				getEmailIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.EmailIcon"));
				},

				/**
				 * Subject macro button click handler.
				 * @public
				 */
				onSubjectMacroButtonClick: function() {
					this.set("MacrosInsertEventSource", "Subject");
					this.insertMacros(arguments);
				},

				/**
				 * Get image for logo.
				 * @returns {*|String} Image url.
				 * @public
				 */
				getLogoImageUrl: function() {
					return this._getLogoImageFromSysSetting();
				}

				//endregion
			}
		};
	});



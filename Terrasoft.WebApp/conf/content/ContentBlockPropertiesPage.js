Terrasoft.configuration.Structures["ContentBlockPropertiesPage"] = {innerHierarchyStack: ["ContentBlockPropertiesPage"], structureParent: "ContentItemPropertiesPage"};
define('ContentBlockPropertiesPageStructure', ['ContentBlockPropertiesPageResources'], function(resources) {return {schemaUId:'51f0e242-865f-4b98-8331-47014d72eda8',schemaCaption: "ContentBlockPropertiesPage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'ContentBlockPropertiesPage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentBlockPropertiesPage", [], function() {
	return {
		attributes: {

			/**
			 * Block vertical align.
			 */
			Valign: {
				dataValueType: Terrasoft.DataValueType.STRING,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Terrasoft.Valign.TOP,
				onChange: "_onValignChanged"
			},

			/**
			 * Block min height.
			 */
			MinHeight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onMinHeightChanged"
			},

			/**
			 * Reverse column order.
			 */
			ReverseColumnOrder: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onReverseColumnOrderChanged"
			}

		},
		properties: {
			workStyles: ["min-height"]
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_onValignChanged: function(model, valign) {
				this.$Config.Valign = valign;
				this.save();
			},

			/**
			 * @private
			 */
			_onReverseColumnOrderChanged: function(model, reverse) {
				this.$Config.ReverseColumnOrder = reverse;
				this.save();
			},

			/**
			 * @private
			 */
			_onMinHeightChanged: function(model, minHeight) {
				if (this.isChanged(this.$Config.Styles["min-height"], minHeight)) {
					this.$Config.Styles["min-height"] = minHeight;
					if (minHeight > 0 && minHeight !== "auto") {
						this.$Config.Styles["min-height"] = minHeight + "px";
					} else {
						delete this.$Config.Styles["min-height"];
					}
					this.save();
				}
			},

			/**
			 * @private
			 */
			_minHeightValidator: function(value) {
				if (Ext.isNumber(value)) {
					return Terrasoft.validateNumberRange(1, Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
				} else {
					return {
						isValid: true
					};
				}
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @overridden
			 */
			onContentItemConfigChanged: function(config) {
				if (config) {
					this.$Valign = this.$Config.Valign;
					this.$ReverseColumnOrder = config.ReverseColumnOrder;
					if (!Ext.isEmpty(this.$Config.Styles)) {
						const minHeight = this.$Config.Styles["min-height"];
						this.$MinHeight = minHeight ? parseInt(minHeight, 10) : null;
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("MinHeight", this._minHeightValidator);
			},

			// endregion

			// region Methods: Public

			/**
			 * Is ReverseColumnOrder enabled.
			 * @return {Boolean} Feature state.
			 */
			isReverseColumnOrderFeatureEnable: function() {
				return Terrasoft.Features.getIsEnabled("ReverseColumnOrderContentBuilderFeature");
			}

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "BlockPropertiesContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-styles-editor-wrapper", "content-block-control-group"]
				}
			},
			{
				"operation": "insert",
				"name": "MinHeightGroup",
				"parentName": "BlockPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.BlockHeightCaption",
					"wrapClass": ["block-height-control-group"]
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MinHeightContainer",
				"parentName": "MinHeightGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "collapse-input-label"]
				}
			},
			{
				"operation": "insert",
				"parentName": "MinHeightContainer",
				"propertyName": "items",
				"name": "MinHeight",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$MinHeight",
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "MinHeight"
					},
					"classes": {"wrapClassName": ["show-placeholder"]}
				}
			},
			{
				"operation": "insert",
				"name": "ValignLabelContainer",
				"parentName": "BlockPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["background-label-wrapper"]
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ValignLabelContainer",
				"name": "ValignLabel",
				"propertyName": "items",
				"values": {
					"classes": {"labelClass": ["background-label"]},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.BlockAlign"
				}
			},
			{
				"operation": "insert",
				"parentName": "ValignLabelContainer",
				"propertyName": "items",
				"name": "ValignInfoTip",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.ValignInfo",
					"style": Terrasoft.TipStyle.GREEN,
					"behaviour": {
						"displayEvent": Terrasoft.TipDisplayEvent.HOVER
					}
				}
			},
			{
				"operation": "insert",
				"name": "ValignGroup",
				"parentName": "BlockPropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"isHeaderVisible": false,
					"caption": "$Resources.Strings.BlockAlign",
					"wrapClass": ["control-group-no-padding"]
				},
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ValignContainer",
				"parentName": "ValignGroup",
				"propertyName": "items",
				"values": {
					"markerValue": "ValignContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["content-builder-align-container", "block-valign-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Valign",
				"parentName": "ValignContainer",
				"propertyName": "items",
				"values": {
					"value": "$Valign",
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"wrapClass": ["block-position-control-group-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TopValign",
				"parentName": "Valign",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Top",
					"value": Terrasoft.Valign.TOP,
					"classes": {
						"wrapClass": ["block-valign-top", "block-valign"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "MiddleValign",
				"parentName": "Valign",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Middle",
					"value": Terrasoft.Valign.MIDDLE,
					"classes": {
						"wrapClass": ["block-valign-middle", "block-valign"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BottomValign",
				"parentName": "Valign",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"markerValue": "Bottom",
					"value": Terrasoft.Valign.BOTTOM,
					"classes": {
						"wrapClass": ["block-valign-bottom", "block-valign"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "BlockPropertiesContainer",
				"name": "ReverseColumnOrderControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"visible": "$isReverseColumnOrderFeatureEnable"
				}
			},
			{
				"operation": "insert",
				"name": "ReverseColumnOrderContainer",
				"parentName": "ReverseColumnOrderControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper", "disable-input-label"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ReverseColumnOrderContainer",
				"propertyName": "items",
				"name": "ReverseColumnOrder",
				"values": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"controlConfig": {
						"className": "Terrasoft.CheckBoxEdit",
						"checked": "$ReverseColumnOrder"
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["style-input"]
				}
			},
			{
				"operation": "insert",
				"name": "ReverseColumnOrderLabel",
				"parentName": "ReverseColumnOrderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.ReverseColumnOrderLabel",
					"classes": {
						"labelClass": ["checkbox-right-label"]
					}
				}
			}
		]
	};
});



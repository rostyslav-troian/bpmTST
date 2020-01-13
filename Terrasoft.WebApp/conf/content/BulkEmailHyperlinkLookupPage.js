Terrasoft.configuration.Structures["BulkEmailHyperlinkLookupPage"] = {innerHierarchyStack: ["BulkEmailHyperlinkLookupPage"]};
define('BulkEmailHyperlinkLookupPageStructure', ['BulkEmailHyperlinkLookupPageResources'], function(resources) {return {schemaUId:'3d414e68-17f6-4f56-bced-b1067d6a9d73',schemaCaption: "BulkEmailHyperlinkLookupPage", parentSchemaName: "", schemaName:'BulkEmailHyperlinkLookupPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * Page to select DCAttribute item from available atribute variants.
 */
define("BulkEmailHyperlinkLookupPage", ["css!BulkEmailHyperlinkLookupPageCSS", "css!LookupPageCSS"],
	function() {
		return {
			messages: {
				/**
				 * @message HyperlinkSelected
				 * Sends selected lookup items.
				 */
				"HyperlinkSelected": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message HyperlinkSelectCancel
				 * Cancelled lookup selection.
				 */
				"HyperlinkSelectCancel": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {

				/**
				 * Unique identifier of bulk email
				 */
				"BulkEmailId": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Array of all bulk email hyperlinks
				 */
				"Hyperlinks": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: []
				},

				/**
				 * Columns of hyperlink data row
				 */
				"RowConfig": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {}
				},

				/**
				 * Array of selected hyperlinks
				 */
				"SelectedItems": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Collection of all bulk email hyperlinks
				 */
				"HyperlinkCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: this.Ext.create("Terrasoft.BaseViewModelCollection")
				}
			},
			methods: {

				// #region Methods: Private

				/**
				 * Returns true when there are no hyperlinks to show.
				 * @private
				 * @return {Boolean} True when there are no hyperlinks.
				 */
				_isGridEmpty: function() {
					return !Boolean(this.$Hyperlinks.length);
				},

				// #endregion

				// #region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @override
				 */
				init: function(callback, module) {
					this.callParent(arguments);
					this.initHyperlinkCollection();
				},

				/**
				 * Initializes collection of hyperlinks for lookup.
				 * @protected
				 */
				initHyperlinkCollection: function() {
					var hyperlinks = Ext.create("Terrasoft.BaseViewModelCollection");
					Terrasoft.each(this.$Hyperlinks, function(hyperlink) {
						hyperlinks.add(hyperlink.Id, Ext.create("Terrasoft.BaseViewModel", {
							values: hyperlink,
							rowConfig: this.$RowConfig
						}));
					}, this);
					this.$HyperlinkCollection.clear();
					this.$HyperlinkCollection.loadAll(hyperlinks);
				},

				/**
				 * Returns number of selected records.
				 * @protected
				 * @return {String} Number of records.
				 */
				getSelectedItemsCount: function() {
					return this.$Hyperlinks.length > 0
						? this.$SelectedItems.length + " / " + this.$Hyperlinks.length
						: "-";
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#onRender
				 * @override
				 */
				onRender: function() {
					this.callParent(arguments);
					var selectedLinks = this.$SelectedItems;
					this.set("SelectedItems", []);
					this.set("SelectedItems", selectedLinks);
				},

				/**
				 * Handler on select button click.
				 * Sends current selected lookup items.
				 * @public
				 */
				onSelectButtonClick: function() {
					const selectedItems = this.$SelectedItems;
					var selectedLinks = this.$HyperlinkCollection.filterByFn(function(link) {
						return selectedItems.indexOf(link.$Id) !== -1;
					});
					this.sandbox.publish("HyperlinkSelected", selectedLinks, [this.sandbox.id]);
				},

				/**
				 * Handler on lookup page close.
				 * Sends message to unload lookup page module.
				 * @public
				 */
				onCloseButtonClick: function() {
					this.sandbox.publish("HyperlinkSelectCancel", null, [this.sandbox.id]);
				}

				// #endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "BulkEmailHyperlinkLookupContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["bulkemail-hyperlink-lookup-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BulkEmailHyperlinkLookupGrid",
					"parentName": "BulkEmailHyperlinkLookupContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "HyperlinkLookupHeaderContainer",
					"parentName": "BulkEmailHyperlinkLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"wrapClass": ["hyperlink-lookup-header"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "HyperlinkHeaderLabel",
					"parentName": "HyperlinkLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.LookupCaptionText",
						"classes": {
							"labelClass": ["t-title-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "HyperlinkLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {"wrapperClass": ["close-btn-user-class"]},
						"imageConfig": "$Resources.Images.CloseIcon",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "HyperlinkLookupButtonsContainer",
					"parentName": "BulkEmailHyperlinkLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"wrapClass": ["hyperlink-lookup-buttons-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SelectButton",
					"parentName": "HyperlinkLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.SelectButtonCaption",
						"click": "$onSelectButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.GREEN
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "HyperlinkLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.CancelButtonCaption",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT
					}
				},
				{
					"operation": "insert",
					"name": "HyperlinkCountLabel",
					"parentName": "HyperlinkLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$getSelectedItemsCount",
						"classes": {
							"labelClass": ["t-count-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "HyperlinkSelectedLabel",
					"parentName": "HyperlinkLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.SelectedRecordsCaption",
						"classes": {
							"labelClass": ["t-records-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "BulkEmailHyperlinkContainer",
					"parentName": "BulkEmailHyperlinkLookupGrid",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"wrapClass": ["hyperlink-grid-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BulkEmailHyperlinkDataGrid",
					"parentName": "BulkEmailHyperlinkContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID,
						"type": this.Terrasoft.GridType.LISTED,
						"listedZebra": true,
						"multiSelect": true,
						"collection": "$HyperlinkCollection",
						"selectedRows": "$SelectedItems",
						"isEmpty": "$_isGridEmpty",
						"captionsConfig": [
							{
								cols: 10,
								name: "Title"
							},
							{
								cols: 14,
								name: "URL"
							}
						],
						"columnsConfig": [
							{
								"cols": 10,
								"key": [
									{
										"name": {"bindTo": "Caption"},
										"caption": "Caption"
									}
								]
							},
							{
								"cols": 14,
								"key": [
									{
										"name": {"bindTo": "Url"},
										"caption": "Url"
									}
								]
							}
						]
					}
				}
			]
		};
	});



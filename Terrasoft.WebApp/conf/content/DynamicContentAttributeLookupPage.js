Terrasoft.configuration.Structures["DynamicContentAttributeLookupPage"] = {innerHierarchyStack: ["DynamicContentAttributeLookupPage"]};
define('DynamicContentAttributeLookupPageStructure', ['DynamicContentAttributeLookupPageResources'], function(resources) {return {schemaUId:'6ac0ca38-67cf-4335-bb60-04bfa6fd44de',schemaCaption: "DynamicContentAttributeLookupPage", parentSchemaName: "", schemaName:'DynamicContentAttributeLookupPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page to select DCAttribute item from available atribute variants.
 */
define("DynamicContentAttributeLookupPage", ["DynamicContentAttributeLookupPageResources",
		"DynamicContentAttributeLookupItem"],
	function() {
		return {
			messages: {

				/**
				 * @message GetAvailableDcAttributes
				 * Gets DCAttribute models that are available for current lookup.
				 */
				"GetAvailableDcAttributes": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message DCAttributeSelected
				 * Sends selected lookup item.
				 */
				"DCAttributeSelected": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message SelectRuleCancel
				 * Cancelled lookup selection.
				 */
				"SelectRuleCancel": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {

				/**
				 * Available DCAttribute lookup viewmodel items collection.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				"DCAttributes": {
					"dataValueType": Terrasoft.core.enums.DataValueType.COLLECTION,
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Selected DCAttribute lookup item.
				 * @type {Object}
				 */
				"SelectedItem": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				// #region Methods: Private

				/**
				 * Creates view model item for container list based on attribute model.
				 * @private
				 * @param {Object} item DCAttribute model.
				 * @returns {Terrasoft.DynamicContentAttributeLookupItem} Item view model.
				 */
				_createLookupItemViewModel: function(item) {
					var vm = Ext.create("Terrasoft.DynamicContentAttributeLookupItem", {
						values: {
							Caption: item.Caption,
							Index: item.Index,
							Selected: this.$SelectedItem && item.Index === this.$SelectedItem.Index
						}
					});
					vm.sandbox = this.sandbox;
					return vm;
				},

				/**
				 * Inits DCAttribute collection with available attribute models.
				 * @private
				 */
				_loadAvailableAttributes: function() {
					var index =  this.$SelectedItem ? this.$SelectedItem.Index : null;
					var collection = Ext.create("Terrasoft.BaseViewModelCollection");
					var availableAttributes = this.sandbox.publish("GetAvailableDcAttributes", index);
					Terrasoft.each(availableAttributes, function(item) {
						var vm = this._createLookupItemViewModel(item);
						collection.add(item.Index, vm);
					}, this);
					collection.sort("$Caption", Terrasoft.OrderDirection.ASC);
					this.$DCAttributes = collection;
				},

				/**
				 * Flag to indicate lookup item selected or not.
				 * @private
				 * @returns {Boolean}
				 */
				_isItemSelected: function() {
					return Boolean(this.$SelectedItem);
				},

				// #endregion

				// #region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this._loadAvailableAttributes();
				},

				/**
				 * Handler on select button click.
				 * Sends current selected lookup item.
				 * @public
				 */
				onOkButtonClick: function() {
					this.sandbox.publish("DCAttributeSelected", this.$SelectedItem, [this.sandbox.id]);
				},

				/**
				 * Handler on lookup page close.
				 * Sends message to unload lookup page module.
				 * @public
				 */
				onCloseButtonClick: function() {
					this.sandbox.publish("SelectRuleCancel", null, [this.sandbox.id]);
				},

				/**
				 * Handler on selected item in container list changed.
				 * Sets new selected lookup item on list selected item.
				 * @public
				 * @param {Object} item New selected lookup item.
				 */
				onSelectedItemChanged: function(item) {
					this.$SelectedItem = {
						Index: item.$Index,
						Caption: item.$Caption
					};
				}

				// #endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "AttributeLookupContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["attribute-lookup-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributeLookupGrid",
					"parentName": "AttributeLookupContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributeLookupHeaderContainer",
					"parentName": "AttributeLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"wrapClass": ["attribute-lookup-header"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributesLabel",
					"parentName": "AttributeLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.SelectDCAttributeCaption",
						"classes": {
							"labelClass": ["t-title-label-dc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "AttributeLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": "$Resources.Images.CloseIcon",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "AttributeLookupButtonsContainer",
					"parentName": "AttributeLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"wrapClass": ["attribute-lookup-buttons-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OkButton",
					"parentName": "AttributeLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"enabled": "$_isItemSelected",
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.OkCaption",
						"click": "$onOkButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.GREEN
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "AttributeLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.CancelCaption",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT
					}
				},
				{
					"operation": "insert",
					"name": "AttributesContainerList",
					"parentName": "AttributeLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.ObservableContainerList",
						"collection": "$DCAttributes",
						"classes": {"wrapClassName": ["attribute-lookup-list-container"]},
						"idProperty": "Index",
						"onSelectedItemChanged" : "$onSelectedItemChanged",
						"itemSelectedAlways": true,
						"rowCssSelector": ".attribute-lookup-item-container.selectable",
						"defaultItemConfig": {
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["attribute-lookup-item-container"]
							},
							items: [{
								className: "Terrasoft.Label",
								caption: "$Caption"
							}]
						}
					}
				}
			]
		};
	});



Terrasoft.configuration.Structures["ProcessFunctionsMappingPage"] = {innerHierarchyStack: ["ProcessFunctionsMappingPage"]};
define('ProcessFunctionsMappingPageStructure', ['ProcessFunctionsMappingPageResources'], function(resources) {return {schemaUId:'42f4dcea-d49e-438c-9954-d33037f5a1f9',schemaCaption: "ProcessFunctionsMappingPage", parentSchemaName: "", schemaName:'ProcessFunctionsMappingPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessFunctionsMappingPage", ["terrasoft", "GridUtilitiesV2"],
	function(Terrasoft) {
		return {
			mixins: {
				GridUtilities: "Terrasoft.GridUtilities"
			},
			attributes: {
				"GridData": {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				"ActiveRow": {
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			},
			messages: {
				"GetProcessSchema": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},
				"ResultSelectedRows": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ResultActiveRow": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"GetSelectedProcessParameter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetParameterMappingInfo": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback) {
					this.callParent([function() {
						this.initGridData();
						this.initGridRowViewModel(function() {
							this.getGridCollection(function(collection) {
								this.loadGridCollection(collection);
								this.on("change:ActiveRow", this.onChangeActiveRow, this);
								this.sandbox.subscribe(
									"GetSelectedProcessParameter", this.getSelectedData, this, [this.sandbox.id]);
								callback.call(this);
							});
						}, this);
					}, this]);
				},
				/**
				 * Active row change handler.
				 * @protected
				 * @virtual
				 */
				onChangeActiveRow: function() {
					var selectedRows = this.getSelectedRows();
					this.sandbox.publish("ResultActiveRow", selectedRows, [this.sandbox.id]);
				},
				/**
				 * Returns grid collection.
				 * @protected
				 * @param {Function} callback Callback function.
				 */
				getGridCollection: function(callback) {
					var dataCollection = Terrasoft.process.constants.FUNCTIONS;
					callback.call(this, dataCollection);
				},
				/**
				 * Initialize grid data.
				 * @private
				 */
				initGridData: function() {
					this.set("GridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				},
				/**
				 * Loads grid data.
				 * @private
				 */
				loadGridCollection: function(dataCollection) {
					var collection = this.get("GridData");
					collection.clear();
					var gridRowViewModelName = this.getGridRowViewModelClassName();
					var gridRowsList = {};
					Terrasoft.each(dataCollection, function(item) {
						var value = item.value;
						var displayValue = item.displayValue;
						displayValue = displayValue.replace(Terrasoft.process.constants.FORMULA_ARGUMENTS_REGEX, "()");
						gridRowsList[value] = this.Ext.create(gridRowViewModelName, {
							rowConfig: {
								Value: {
									dataValueType: Terrasoft.DataValueType.TEXT
								},
								DisplayValue: {
									dataValueType: Terrasoft.DataValueType.TEXT
								}
							},
							values: {
								Value: value,
								DisplayValue: displayValue
							}
						});
					}, this);
					collection.loadAll(gridRowsList);
				},
				/**
				 * Returns selected function.
				 * @protected
				 * @return {Object} Selected data.
				 * @return {String} return.value Selected item value.
				 * @return {String} return.displayValue Selected item display value.
				 */
				getSelectedData: function() {
					var primaryColumnValue = this.get("ActiveRow");
					if (!primaryColumnValue) {
						return null;
					}
					var gridData = this.get("GridData");
					if (!gridData.find(primaryColumnValue)) {
						return null;
					}
					var activeRow =  gridData.get(primaryColumnValue);
					var value = activeRow.get("Value");
					var displayValue = activeRow.get("DisplayValue");
					return {
						value: value,
						displayValue: displayValue
					};
				},
				/**
				 * Returns selected data.
				 * @private
				 * @return {Object}
				 */
				getSelectedRows: function() {
					var selectedData = this.getSelectedData();
					var result = new Terrasoft.Collection();
					if (selectedData) {
						result.add(selectedData.value, selectedData);
					}
					return {
						selectedRows: result
					};
				},
				/**
				 * Handler for double click.
				 * @private
				 */
				onGridDoubleClick: function() {
					var selectedRows = this.getSelectedRows();
					this.sandbox.publish("ResultSelectedRows", selectedRows, [this.sandbox.id]);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "DataGrid",
					"propertyName": "items",
					"values": {
						"primaryColumnName": "Value",
						"primaryDisplayColumnName": "DisplayValue",
						"itemType": Terrasoft.ViewItemType.GRID,
						"type": "listed",
						"listedZebra": true,
						"collection": {"bindTo": "GridData"},
						"activeRow": {"bindTo": "ActiveRow"},
						"openRecord": {"bindTo": "onGridDoubleClick"},
						"columnsConfig": [{
							cols: 24,
							key: [{
								name: {bindTo: "DisplayValue"}
							}]
						}]
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});



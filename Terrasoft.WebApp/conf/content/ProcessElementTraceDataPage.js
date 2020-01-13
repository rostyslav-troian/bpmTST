Terrasoft.configuration.Structures["ProcessElementTraceDataPage"] = {innerHierarchyStack: ["ProcessElementTraceDataPage"]};
define('ProcessElementTraceDataPageStructure', ['ProcessElementTraceDataPageResources'], function(resources) {return {schemaUId:'7a864c62-06c8-49da-82b2-5f45fc68b4e6',schemaCaption: "ProcessElementTraceDataPage", parentSchemaName: "", schemaName:'ProcessElementTraceDataPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessElementTraceDataPage", ["ProcessModuleUtilities", "SourceCodeEditGenerator",
	"ReadDataUserTaskTraceDataTransformer", "css!ProcessElementTraceDataPageCSS"], function() {
	return {
		attributes: {
			/**
			 * Trace Data
			 */
			"TraceData": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": null
			},
			/**
			 * Process Element Log Identifier
			 */
			"ProcessElementLog": {
				"dataValueType": Terrasoft.DataValueType.GUID
			},
			/**
			 * Trace data transformer.
			 */
			"TransformerType": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": null
			}
		},
		messages: {},
		methods: {

			/**
			 * @param sysProcessElementLog
			 * @param callback
			 * @param scope
			 * @private
			 */
			_requestTraceData: function(sysProcessElementLog, callback, scope) {
				var filter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"SysProcessElementLog", sysProcessElementLog);
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysPrcElementTraceLog"
				});
				var traceEventColumn = esq.addColumn("TraceEvent");
				traceEventColumn.orderPosition = 0;
				traceEventColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				esq.addColumn("ElementData");
				esq.addColumn("ProcessData");
				esq.filters.addItem(filter);
				esq.execute(function(response) {
					Ext.callback(callback, scope, [response]);
				}, this);
			},

			/**
			 * @param parameterConfig
			 * @return {*}
			 * @private
			 */
			_getParameterCaption: function(parameterConfig) {
				return parameterConfig.Caption || parameterConfig.Name;
			},

			/**
			 * @private
			 */
			_findParameterValueByName: function(parameters, name) {
				var value = null;
				parameters.forEach(function(item) {
					if (item.Parameter.Name === name) {
						value = item.Value;
					}
				});
				return value;
			},

			/**
			 * @param dataBefore
			 * @param dataAfter
			 * @return {Array}
			 * @private
			 */
			_getParameterValues: function(dataBefore, dataAfter) {
				var result = [];
				Terrasoft.each(dataBefore, function(dataItemBefore, index) {
					var parameter = this._getParameterCaption(dataItemBefore.Parameter);
					var parameterCaption = this.get("Resources.Strings.TraceDataParameterCaption");
					var valueCaption = this.get("Resources.Strings.TraceDataParameterValueCaption");
					var item = {};
					item[parameterCaption] = parameter;
					item[valueCaption] = {};
					var beforeExecCaption = this.get("Resources.Strings.TraceDataParameterValueBeforeExecCaption");
					var afterExecCaption = this.get("Resources.Strings.TraceDataParameterValueAfterExecCaption");
					item[valueCaption][beforeExecCaption] = dataItemBefore.Value;
					item[valueCaption][afterExecCaption] = dataAfter && dataAfter[index].Value;
					result.push(item);
				}, this);
				return result;
			},

			/**
			 * @param dataBefore
			 * @param dataAfter
			 * @return {[{},{}]}
			 * @private
			 */
			_parseParameterValues: function(dataBefore, dataAfter) {
				dataBefore = Ext.JSON.decode(dataBefore, true);
				dataAfter = Ext.JSON.decode(dataAfter, true);
				return [dataBefore, dataAfter];
			},

			/**
			 * @private
			 */
			_transformTraceData: function(data) {
				var transformer;
				if (this.$TransformerType) {
					transformer = this.Ext.create(this.$TransformerType);
				}
				return transformer ? transformer.transform(data) : data;
			},

			/**
			 * @param beforeExecutionData
			 * @param afterExecutionData
			 * @return {{}}
			 * @private
			 */
			_parseTraceData: function(beforeExecutionData, afterExecutionData) {
				var result = {};
				this._parseElementTraceData(result, beforeExecutionData, afterExecutionData);
				this._parseProcessTraceData(result, beforeExecutionData, afterExecutionData);
				return result;
			},

			/**
			 * @private
			 */
			_parseElementTraceData: function (result, beforeExecutionData, afterExecutionData) {
				var elementParametersCaption = this.get("Resources.Strings.TraceDataElementCaption");
				var elementParameterValues = this._parseParameterValues(
					this._transformTraceData(beforeExecutionData.get("ElementData")),
					this._transformTraceData(afterExecutionData.get("ElementData")));
				result[elementParametersCaption] = this._getParameterValues.apply(this, elementParameterValues);
			},

			/**
			 * @private
			 */
			_parseProcessTraceData: function(result, beforeExecutionData, afterExecutionData) {
				var processParametersCaption = this.get("Resources.Strings.TraceDataProcessCaption");
				var processParameterValues = this._parseParameterValues(beforeExecutionData.get("ProcessData"),
					afterExecutionData.get("ProcessData"));
				result[processParametersCaption] = this._getParameterValues.apply(this, processParameterValues);
			},

			/**
			 * @param response
			 * @param callback
			 * @param scope
			 * @private
			 */
			_parseTraceDataResponse: function(response) {
				if (!response.success) {
					throw new Terrasoft.InvalidOperationException();
				}
				var result;
				var collection = response.collection;
				if (!collection.isEmpty()) {
					var beforeExecutionData = collection.getByIndex(0);
					var afterExecutionData = collection.getCount() > 1
						? collection.getByIndex(1)
						: new this.Terrasoft.BaseViewModel();
					result = this._parseTraceData(beforeExecutionData, afterExecutionData);
				}
				return result;
			},

			/**
			 * @param e
			 * @private
			 */
			_onException: function() {
				var message = this.get("Resources.Strings.ParseTraceResponseErrorText");
				Terrasoft.showInformation(message);
			},

			/**
			 * @param moduleInfo
			 * @private
			 */
			_validateModuleInfo: function(moduleInfo) {
				Terrasoft.each(["processElementLog"], function(property) {
					if (Ext.isEmpty(moduleInfo[property])) {
						throw new Terrasoft.InvalidObjectState();
					}
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					try {
						this.showBodyMask();
						var moduleInfo = this.get("moduleInfo") || {};
						this._validateModuleInfo(moduleInfo);
						this._requestTraceData(moduleInfo.processElementLog, function(response) {
							var traceData = this._parseTraceDataResponse(response);
							this.set("TraceData", JSON.stringify(traceData, null, "\t"));
						}, this);
					} catch (e) {
						this._onException(e);
					} finally {
						this.hideBodyMask();
						Ext.callback(callback, scope);
					}
				}, this]);
			},

			/**
			 * Close modal window
			 */
			close: function() {
				this.destroyModule();
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ModalWindow",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["process-element-trace-data-page-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "TraceData",
				"parentName": "ModalWindow",
				"values": {
					"contentType": Terrasoft.ContentType.RICH_TEXT,
					"generator": "SourceCodeEditGenerator.generate",
					"showLineNumbers": false,
					"id": "TraceData",
					"useWorker": false,
					"markerValue": "TraceData",
					"readonly": true,
					"classes": {
						"wrapClass": ["process-element-trace-data-editor"]
					}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "close-icon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["close-btn-trace-data-page"]},
					"click": {"bindTo": "close"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});



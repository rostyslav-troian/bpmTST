Terrasoft.configuration.Structures["PortalMessageFileDetail"] = {innerHierarchyStack: ["PortalMessageFileDetail"], structureParent: "HistoryMessageFilesDetail"};
define('PortalMessageFileDetailStructure', ['PortalMessageFileDetailResources'], function(resources) {return {schemaUId:'07479eda-5939-41a0-bee5-078300ba3c6b',schemaCaption: "Detail attachments in history portal messages", parentSchemaName: "HistoryMessageFilesDetail", schemaName:'PortalMessageFileDetail',parentSchemaUId:'9974184c-2720-4792-9cc6-8a532b0530c6',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalMessageFileDetail", [], function () {
	return {
		messages: {
			/**
			* @message HideFileDetailContainer
			* Switch FileDetailContainer, visibility into off mode.
			* FileDetailContainer defined in parent page.
			*/
			"HideFileDetailContainer": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		methods: {

			/**
			 * @private
			 */
			_isNeedLoadDataFromService: function() {
				return this.Terrasoft.Features.getIsEnabled("SecurePortalMessageFileInHistory");
			},

			_getLastValue: function() {
				const lastElement = this.getGridData().last();
				return lastElement ? lastElement.$Id : Terrasoft.GUID_EMPTY;
			},

			/**
			 * @private
			 */
			_getServiceConfig: function () {
				const lastValue = this._getLastValue();
				const rowsCount = this.getRowCount();
				return {
					"serviceName": "PortalMessageFileService",
					"methodName": "GetPortalMessageFiles",
					"data": {
						"portalMessageId": this.$MasterRecordId,
						"readingOptions": {
							"rowCount": rowsCount,
							"lastValue": lastValue
						}
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.FileDetailV2#loadContainerListData
			 * @override
			 */
			loadContainerListData: function(callback) {
				this._isNeedLoadDataFromService() ? this.loadFilesFromService(callback) : this.callParent(arguments);
			},

			/**
			 * Load portal message file from service.
			 * @protected
			 */
			loadFilesFromService: function(callback) {
				const config = this._getServiceConfig();
				this.callService(config, function(response) {
					if (response && response.GetPortalMessageFilesResult) {
						this.loadResponseToGrid(response.GetPortalMessageFilesResult.PortalMessageFiles);
						this.manageMasterCardContainerVisibilty();
					}
					Ext.callback(callback, this);
				}, this);
			},

			/**
			 * Load files received from web service into detail grid.
			 * @protected
			 * @param {Array} files
			 */
			loadResponseToGrid: function(files) {
				const canLoadMoreData = this.getShowMoreButtonVisibility(files.length);
				this.set("CanLoadMoreData", canLoadMoreData); 
				const viewModels = Ext.create("Terrasoft.Collection");
				Terrasoft.each(files, function (file) {
					const viewModel = this.createViewModelFromServiceResponse(file);
					viewModels.addIfNotExists(file.Id, viewModel);
				}, this);
				const gridData = this.getGridData();
				gridData.loadAll(viewModels);
			},

			/**
			 * Hide detail container in master card of no files was loaded into grid.
			 * @protected
			 */
			manageMasterCardContainerVisibilty: function() {
				const renderedItems = this.getGridData().getItems();
				if (renderedItems.length === 0) {
					this.sandbox.publish("HideFileDetailContainer", null, [this.sandbox.id]);
				}
			},

			/**
			 * Return value for CanLoadMoreData attribute.
			 * @protected
			 * @param {Number} arrayLength
			 * @returns {Boolean} True, if detail can load more data.
			 */
			getShowMoreButtonVisibility: function(arrayLength) {
				const rowCount = this.getRowCount();
				return arrayLength >= rowCount;
			},

			/**
			* Initializes ViewModel instance by query result.
			* @protected
			* @param {Object} values data for ImageListViewModel, recieved from web-service.
			* @returns {Terrasoft.ImageListViewModel} viewmodel for portal message file.
			*/
			createViewModelFromServiceResponse: function(values) {
				const viewModelClassName = this.getGridRowViewModelClassName();
				const viewModelConfig = this.getAdditionalViewModelConfig();
				viewModelConfig.values = values;
				viewModelConfig.entitySchema = this.getGridEntitySchema();
				const viewModel = Ext.create(viewModelClassName, viewModelConfig);
				this.bindItemViewModelMethods(viewModel);
				this.decorateItem(viewModel);
				return viewModel;
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


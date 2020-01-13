Terrasoft.configuration.Structures["BaseProcessSettingDetailV2"] = {innerHierarchyStack: ["BaseProcessSettingDetailV2"], structureParent: "BaseGridDetailV2"};
define('BaseProcessSettingDetailV2Structure', ['BaseProcessSettingDetailV2Resources'], function(resources) {return {schemaUId:'550e7a82-2e5e-442a-90d2-0008616e822e',schemaCaption: "Base schema - Detail with list for process library", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseProcessSettingDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseProcessSettingDetailV2", function() {
	return {
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
			 * @overridden
			 */
			getCopyRecordMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
			 * @overridden
			 */
			getEditRecordMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
			 * @overridden
			 */
			getDeleteRecordMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
			 * @overridden
			 */
			addDetailWizardMenuItems: Terrasoft.emptyFn,

			/**
			 * Returns config for process element caption binding to element name.
			 * @protected
			 * @virtual
			 * @returns {Object} Config to bind process element caption to detail column. Contains fields
			 * detailColumn - name of detail column that will be replaced with process element caption,
			 * processElementUIdColumn - name of column in entity schema that identifies process element.
			 */
			getProcessElementCaptionColumnsConfig: Terrasoft.emptyFn,

			/**
			 * Returns if process element caption binding is active.
			 * @private
			 * @returns {Boolean}
			 */
			_useProcessElementCaption: function() {
				return !Ext.isEmpty(this.getProcessElementCaptionColumnsConfig());
			},

			/**
			 * Adds process element uId column to detail esq.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} Grid data esq.
			 */
			_addProcessElementInfoColumn: function(esq) {
				var config = this.getProcessElementCaptionColumnsConfig();
				var processElementUIdColumn = Ext.create("Terrasoft.EntityQueryColumn", {
					columnPath: config.processElementUIdColumn
				});
				esq.addColumn(processElementUIdColumn, config.processElementUIdColumn);
			},

			/**
			 * Replaces process element captions for bound detail column.
			 * @private
			 * @param {Terrasof.Collection} gridData Grid data collection.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			_replaceProcessElementCaptions: function(gridData, callback, scope) {
				var config = this.getProcessElementCaptionColumnsConfig();
				Terrasoft.chain(
					function(next) { Terrasoft.ProcessFlowElementSchemaManager.initialize(next, this); },
					function(next) { Terrasoft.ProcessSchemaManager.initialize(next, this); },
					function() {
						this._findProcessInstance(function(process) {
							gridData.each(function (viewModel) {
								var processElementUId = viewModel.get(config.processElementUIdColumn);
								var processElement = process.findItemByUId(processElementUId);
								viewModel.set(config.detailColumn, processElement.getCaption());
							}, this);
							callback.call(scope);
						}, this);
					},
					this
				);
			},

			/**
			 * @param callback
			 * @param scope
			 * @private
			 */
			_findProcessInstance: function(callback, scope) {
				var processId = this.get("MasterRecordId");
				Terrasoft.ProcessSchemaManager.findInstanceByUId(processId, function(process) {
					if (Ext.isEmpty(process)) {
						Terrasoft.ProcessSchemaManager.forceGetInstanceByUId(processId, function(forcedProcess) {
							callback.call(scope, forcedProcess);
						}, this);
					} else {
						callback.call(scope, process);
					}
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#updateLoadedGridData
			 * @override
			 */
			updateLoadedGridData: function(response, callback, scope) {
				if (this._useProcessElementCaption()) {
					this._replaceProcessElementCaptions(response.collection, function () {
						callback.call(scope, response);
					}, this);
				} else {
					callback.call(scope, response);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#initQueryColumns
			 * @override
			 */
			initQueryColumns: function(esq) {
				this.callParent(arguments);
				if (this._useProcessElementCaption()) {
					this._addProcessElementInfoColumn(esq);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
			 * @override
			 */
			getAddRecordButtonVisible: function() {
				return false;
			}
		}
	};
});



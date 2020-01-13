Terrasoft.configuration.Structures["CallDetail"] = {innerHierarchyStack: ["CallDetail"], structureParent: "BaseGridDetailV2"};
define('CallDetailStructure', ['CallDetailResources'], function(resources) {return {schemaUId:'e29bfa40-6b97-4a75-8d08-3a33efb87aaa',schemaCaption: "\"Calls\" detail", parentSchemaName: "BaseGridDetailV2", schemaName:'CallDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CallDetail", ["CallRecordUtilities", "CallSectionGridRowViewModel", "css!CallSectionGridRowViewModel",
		"AudioPlayer"],
	function() {
		return {
			entitySchemaName: "Call",
			mixins: {

				/**
				 * @class Terrasoft.CallRecordUtilities Implements call records utilities.
				 */
				CallRecordUtilities: "Terrasoft.CallRecordUtilities"

			},
			attributes: {

				/**
				 * Indicates whether audio file can be downloaded.
				 * @protected
				 * @type {Boolean}
				 */
				"CanDownloadAudioFile": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			messages: {

				/**
				 * @message GetCallRecords
				 * Notifies about the need to obtain call records of conversations.
				 * @param {Object} Information about the call parameters.
				 */
				"GetCallRecords": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message HistoryTabDeactivated
				 * Fires when happens deactivation event of the "History" tab on the page.
				 * @param {String} tabName Name of the tab
				 */
				"HistoryTabDeactivated": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.mixins.CallRecordUtilities.init.call(this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addToolsButtonMenuItems
				 * @overridden
				 */
				addToolsButtonMenuItems: function(toolsButtonMenu) {
					this.callParent(arguments);
					toolsButtonMenu.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator"
					}));
					toolsButtonMenu.addItem(this.getButtonMenuItem({
						Caption: this.getCallRecordUtilitiesStringResource("SaveToFileMenuItemCaption"),
						Click: {bindTo: "onSaveToFileMenuItemClick"},
						Enabled: {bindTo: "getIsDownloadAudioFileMenuItemEnabled"}
					}));
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#getGridRowViewModelConfig
				 * @overridden
				 */
				getGridRowViewModelConfig: function() {
					var gridRowViewModelConfig = this.callParent(arguments);
					this.Ext.apply(gridRowViewModelConfig, {
						Ext: this.Ext,
						Terrasoft: this.Terrasoft,
						sandbox: this.sandbox
					});
					return gridRowViewModelConfig;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#getGridRowViewModelClassName
				 * @overridden
				 */
				getGridRowViewModelClassName: function() {
					return "Terrasoft.CallSectionGridRowViewModel";
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQueryColumns
				 * @overridden
				 */
				initQueryColumns: function(esq) {
					this.callParent(arguments);
					var integrationColumn = "IntegrationId";
					var isColumnExist = esq.columns.contains(integrationColumn);
					if (!isColumnExist) {
						esq.addColumn(integrationColumn);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseDetail#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("HistoryTabDeactivated", function() {
						this.stopPlaying();
					}, this, this.getUpdateDetailSandboxTags());
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#updateDetail
				 * @overridden
				 */
				updateDetail: function() {
					this.callParent(arguments);
					this.stopPlaying();
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#onGridDataLoaded
				 * @overridden
				 */
				onGridDataLoaded: function() {
					this.callParent(arguments);
					this.set("CanDownloadAudioFile", false);
					this.prepareRowCallRecord(null, false, function(canGetCallRecords, callRecords) {
						this.set("CanDownloadAudioFile",
							canGetCallRecords && Ext.isArray(callRecords) && (callRecords.length > 0));
					}.bind(this));
				},

				/**
				 * Indicates whether "Download audio file" menu item is enabled.
				 * @protected
				 * @return {Boolean} True if enabled, otherwise - false.
				 */
				getIsDownloadAudioFileMenuItemEnabled: function() {
					return this.isSingleSelected() && !this.get("MultiSelect") && this.get("CanDownloadAudioFile");
				},

				/**
				 * Handles the grid 'selectRow' event.
				 * @protected
				 * @param {String} primaryColumnValue Selected row primary column value.
				 */
				onRowSelected: function(primaryColumnValue) {
					this.stopPlaying();
					this.set("CanDownloadAudioFile", false);
					this.prepareRowCallRecord(primaryColumnValue, false, function(canGetCallRecords, callRecords) {
						this.set("CanDownloadAudioFile",
							canGetCallRecords && Ext.isArray(callRecords) && (callRecords.length > 0));
					}.bind(this));
				},

				/**
				 * Handles the grid 'unSelectRow' event.
				 * @protected
				 * @param {String} id The identifier of the previous record.
				 */
				onGridUnSelectRow: function(id) {
					this.stopPlaying(id);
				},

				/**
				 * Handles "Save to file" menu item click event.
				 * @protected
				 */
				onSaveToFileMenuItemClick: function() {
					this.requestAndDownloadCallRecord();
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"unSelectRow": {"bindTo": "onGridUnSelectRow"},
						"selectRow": {"bindTo": "onRowSelected"},
						"activeRowActions": [],
						"rowDataItemMarkerColumnName": "CallerId",
						"className": "Terrasoft.AudioGrid"
					}
				},
				{
					"operation": "insert",
					"name": "AudioPlayer",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"index": 1,
					"values": {
						"className": "Terrasoft.AudioPlayer",
						"selectors": {"wrapEl": "#AudioPlayer"},
						"sourceId": {"bindTo": "getSourceId"},
						"sourceUrl": {"bindTo": "SourceUrl"},
						"playbackended": {"bindTo": "onPlaybackEnded"},
						"error": {"bindTo": "onPlayError"}
					}
				},
				{
					"operation": "insert",
					"name": "PlayRecordButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"index": 1,
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"classes": {"textClass": ["audio-player-button"]},
						"visible": {"bindTo": "IsRecordPlayAvailable"},
						"caption": {"bindTo": "getPlayerButtonCaption"},
						"imageConfig": {"bindTo": "getPlayerButtonImageConfig"},
						"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
						"click": {"bindTo": "onRecordPlayerClick"},
						"markerValue": {"bindTo": "getPlayerButtonCaption"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});



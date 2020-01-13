Terrasoft.configuration.Structures["WSysAccountLookupSection"] = {innerHierarchyStack: ["WSysAccountLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('WSysAccountLookupSectionStructure', ['WSysAccountLookupSectionResources'], function(resources) {return {schemaUId:'f5ae0b53-86ef-4a85-ba76-8a3b1081ed20',schemaCaption: "Webitel accounts lookup", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'WSysAccountLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WSysAccountLookupSection", ["ConfigurationEnums", "WebitelModuleHelper"],
	function(ConfigurationEnums, WebitelModuleHelper) {
		return {

			/**
			 * ######## ##### #######.
			 * @protected
			 * @overridden
			 * @type {String}
			 */
			entitySchemaName: "WSysAccount",
			methods: {

				//region Methods: Private

				/**
				 * ####### ####### ###### ## ####### Webitel.
				 * @private
				 * @param {Object} record ###### ######.
				 */
				removeUser: function(record) {
					var login = record.get("Login");
					Ext.global.webitel.userRemove(login, WebitelModuleHelper.getHostName(), function(result) {
							if (result.status !== Ext.global.WebitelCommandResponseTypes.Success) {
								var response = result.response;
								this.error(response);
							}
						}.bind(this));
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc BaseSectionV2#initAddRecordButtonParameters
				 * @overridden
				 * TODO #CC-870 ###### ##### ####### ####### ######### SysModuleEditLcz ## ########## ######
				 */
				initAddRecordButtonParameters: function() {
					this.callParent(arguments);
					this.set("AddRecordButtonCaption", this.get("Resources.Strings.AddRecordButtonCaption"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseLookupConfigurationSection#addRecord
				 * @overridden
				 */
				addRecord: function() {
					var typeColumnValue = this.Terrasoft.GUID_EMPTY;
					var schemaName = this.getEditPageSchemaName(typeColumnValue);
					if (!schemaName) {
						return;
					}
					this.openCardInChain({
						schemaName: schemaName,
						operation: ConfigurationEnums.CardStateV2.ADD,
						moduleId: this.getChainCardModuleSandboxId(typeColumnValue),
						instanceConfig: {
							useSeparatedPageHeader: this.get("UseSeparatedPageHeader")
						}
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseLookupConfigurationSection#getModuleCaption
				 * @overridden
				 */
				getModuleCaption: function() {
					var historyState = this.sandbox.publish("GetHistoryState");
					var state = historyState.state;
					if (state && state.caption) {
						return state.caption;
					}
					return this.get("Resources.Strings.HeaderCaption");
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#onDeleteAccept
				 * @overridden
				 */
				onDeleteAccept: function() {
					var selectedItems = this.getSelectedItems();
					var gridData = this.getGridData();
					Terrasoft.each(selectedItems, function(item) {
						var record = gridData.get(item);
						if (!Ext.isEmpty(record)) {
							this.removeUser(record);
						}
					}, this);
					this.callParent(arguments);
				}

				//endregion

			}
		};
	});



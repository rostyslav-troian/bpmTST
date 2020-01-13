Terrasoft.configuration.Structures["BaseMiniPage"] = {innerHierarchyStack: ["BaseMiniPageNUI", "BaseMiniPage"], structureParent: "BaseEntityPage"};
define('BaseMiniPageNUIStructure', ['BaseMiniPageNUIResources'], function(resources) {return {schemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',schemaCaption: "BaseMiniPage", parentSchemaName: "BaseEntityPage", schemaName:'BaseMiniPageNUI',parentSchemaUId:'81c2ebad-7f20-4e71-b0c6-941b1422ba62',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseMiniPageStructure', ['BaseMiniPageResources'], function(resources) {return {schemaUId:'32ad6b2f-7a42-4822-9096-feb25f9db600',schemaCaption: "BaseMiniPage", parentSchemaName: "BaseMiniPageNUI", schemaName:'BaseMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseMiniPageNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseMiniPageNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
/**
 * Parent: BaseEntityPage
 */
define("BaseMiniPageNUI", ["BaseMiniPageResources", "sandbox", "NetworkUtilities", "RightUtilities",
	"ProcessModuleUtilities", "SecurityUtilities", "CallExtendedMenu", "AlignableContainer",
	"EmailExtendedMenu", "BaseExtendedMenu", "LinkedEntitiesExtendedMenu", "ConfigurationEnumsV2",
	"EntityResponseValidationMixin", "EntityRelatedColumnsMixin", "ConfigurationItemGenerator",
	"css!MiniPageViewGeneratorCSS", "css!BaseMiniPageCSS", "MaskHelper"
], function(resources, sandbox, NetworkUtilities, RightUtilities) {
	return {
		mixins: {
			SecurityUtilitiesMixin: "Terrasoft.configuration.mixins.SecurityUtilitiesMixin",
			CallExtendedMenu: "Terrasoft.configuration.mixins.CallExtendedMenu",
			EmailExtendedMenu: "Terrasoft.configuration.mixins.EmailExtendedMenu",
			LinkedEntitiesExtendedMenu: "Terrasoft.configuration.mixins.LinkedEntitiesExtendedMenu",
			EntityResponseValidationMixin: "Terrasoft.configuration.mixins.EntityResponseValidationMixin",
			EntityRelatedColumnsMixin: "Terrasoft.configuration.mixins.EntityRelatedColumnsMixin"
		},
		messages: {

			/**
			 * @message PushHistoryState
			 * Notify about changes in the history state chain.
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ReplaceHistoryState
			 * Message to replace current history state.
			 */
			"ReplaceHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetHistoryState
			 * Message to get current history state.
			 */
			"GetHistoryState": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetAlignToEl
			 * Notify about element to align to.
			 */
			"GetAlignToEl": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetMiniPageOperation
			 * Gets mini page operation.
			 * @type {Object}
			 */
			"GetMiniPageOperation": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetMiniPageDefaultValues
			 * Need to change mini page mode.
			 * @type {Object}
			 */
			"GetMiniPageDefaultValues": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CallCustomer
			 * Make a call for customer.
			 */
			"CallCustomer": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateResolvedButtonMenu
			 * It is need to update the collection of menu items quick save button after changing status.
			 * @param {Object} config menu
			 */
			"UpdateResolvedButtonMenu": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message OnResolvedButtonMenuClick
			 * Event menu selection buttons quick save.
			 * @param {Object} config menu
			 */
			"OnResolvedButtonMenuClick": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message CloseMiniPage
			 * Need to close mini page.
			 */
			"CloseMiniPage": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ChangeMiniPageMode
			 * Need to change mini page mode.
			 */
			"ChangeMiniPageMode": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message OpenCardInChain
			 * Opens page from MiniPage.
			 */
			"OpenCardInChain": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ReloadDashboardItems
			 * Reloads dashboard items.
			 */
			"ReloadDashboardItems": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ProcessExecDataChanged
			 * Notification that the current process item was executed.
			 */
			"ProcessExecDataChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Current MiniPage mode.
			 */
			"Mode": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Terrasoft.ConfigurationEnums.CardOperation.VIEW
			},

			/**
			 * MiniPage modes. Attribute for override SysModuleEdit.MiniPageModes.
			 */
			"MiniPageModes": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: [Terrasoft.ConfigurationEnums.CardOperation.VIEW]
			},

			/**
			 * Selector for mini page container.
			 */
			"ContainerSelector": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ".minipage-alignable-container"
			},

			/**
			 * Contains True if entity already initialized.
			 */
			"IsEntityInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Contains mini page header caption.
			 * @type {String}
			 */
			"MiniPageHeaderCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * View model collection of the required model columns.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"RequiredColumnsEntityCollection": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				value: this.Ext.create("Terrasoft.BaseViewModelCollection")
			},

			/**
			 * Required columns list.
			 * @type {Object[]}
			 */
			"RequiredColumns": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				value: []
			},

			/**
			 * MultiLookup row limit for each column.
			 * @type {Number}
			 */
			"QueryRowCount": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 3
			},

			/**
			 * Flag that indicates whether view model was rendered or not.
			 */
			"Rendered": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		properties: {
			miniPageContainerBottomOffset: 20
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getLookupComparisonType
			 * @override
			 */
			getLookupComparisonType: function() {
				return Terrasoft.ComparisonType.CONTAIN;
			},

			/**
			 * Build column lookup hyperlink url.
			 * @protected
			 * @param {String} columnName Entity column name.
			 * @return {String} HyperLink href.
			 */
			getHyperLinkHref: function(columnName) {
				if (columnName === this.primaryDisplayColumnName) {
					return this.getPrimaryDisplayColumnLink();
				}
				var link = this.getLinkUrl(columnName);
				return link ? link.url : "";
			},

			/**
			 * Returns primary display column value.
			 * @return {String} Primary display column value.
			 */
			getPrimaryDisplayColumnValue: function() {
				return this.get(this.primaryDisplayColumnName);
			},

			/**
			 * Open hyperlink url.
			 * @protected
			 * @param {Object} options DOM element options.
			 * @param {String} linkPath Link column name.
			 * @return {Boolean} Click event handler flag.
			 */
			onExternalLinkClick: function(options, linkPath) {
				var link = this.get(linkPath);
				var regHttp = /(https?|ftp):(\/\/|\\\\)/gim;
				var nMatch = link.search(regHttp);
				link = (nMatch >= 0) ? link : "http://" + link;
				window.open(link);
				return false;
			},

			/**
			 * Returns link to current entity.
			 * @return {string} Link to current entity.
			 */
			getPrimaryDisplayColumnLink: function() {
				var primaryColumnValue = this.getPrimaryColumnValue();
				var typeColumnValue = this.getTypeColumnValue(this);
				if (primaryColumnValue) {
					return "ViewModule.aspx#" + NetworkUtilities.getEntityUrl(this.entitySchemaName,
						primaryColumnValue, typeColumnValue);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
			 * @override
			 */
			getProfileKey: function() {
				return this.name + this.entitySchemaName + "_MiniPageProfile";
			},

			/**
			 * Returns card module Id.
			 * @protected
			 * @return {String} Card module Id.
			 */
			getCardModuleSandboxId: function() {
				return this.sandbox.id + "_CardModuleV2";
			},

			/**
			 * Init MinPageModes attribute value: mini-page available modes.
			 * @protected
			 */
			initMiniPageModes: function() {
				var editPages = this.getEditPages();
				var typeUId = this.getTypeColumnValue(this);
				var editPage = editPages.find(typeUId) || editPages.first();
				var miniPage = editPage && editPage.get("MiniPage");
				var modes = miniPage && miniPage.miniPageModes;
				if (!Terrasoft.isEmpty(modes)) {
					this.set("MiniPageModes", modes);
				}
			},

			/**
			 * Initialize minipage.
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.initMiniPageModes();
				var operation = this.getMiniPageOperation();
				if (!this.hasMode(operation)) {
					this.close();
					Terrasoft.MaskHelper.hideBodyMask();
					return;
				}
				var alignToEl = this.sandbox.publish("GetAlignToEl", null, [this.sandbox.id]);
				if (alignToEl && !this.Ext.get(alignToEl)) {
					return;
				}
				this.set("AlignToEl", alignToEl);
				this.changeMiniPageMode(operation);
				var parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						parentMethod.call(this, next, this);
					},
					function(next) {
						if (this.isAddMode()) {
							next();
						} else {
							this.checkCanReadRights(next, this);
						}
					},
					this.checkAvailability,
					function() {
						this.onPageInitialized(callback, scope);
					}, this
				);
			},

			/**
			 * Returns mini page operation.
			 * @private
			 * @return {String}
			 */
			getMiniPageOperation: function() {
				return this.sandbox.publish("GetMiniPageOperation", null, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc BaseViewModel#getEntitySchemaQuery
			 * @override
			 */
			getEntitySchemaQuery: function() {
				var esq = this.callParent(arguments);
				this.addRelatedEntityColumns(esq);
				return esq;
			},

			/**
			 * @inheritdoc BaseViewModel#setColumnValues
			 * @override
			 */
			setColumnValues: function(entity) {
				this.setLookupColumnValues(entity);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
			 * @override
			 */
			getLookupQuery: function(filterValue, columnName) {
				var esq = this.callParent(arguments);
				this.addRelatedColumnsToLookupQuery(esq, columnName);
				this.applyColumnsOrderToLookupQuery(esq, columnName);
				var filterGroup = this.getLookupQueryFilters(columnName);
				esq.filters.addItem(filterGroup);
				return esq;
			},

			/**
			 * @private
			 */
			_initEntityAdd: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.setDefaultValues(next, this);
					},
					function(next) {
						this.setEntityLookupDefaultValues(next, this);
					},
					function(next) {
						this.setEntityDefaultValues(next, this);
					},
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @private
			 */
			_initEntityEdit: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.setEntityDefaultValues(next, this);
					},
					function(next) {
						this.loadMiniPageEntity(next, this);
					},
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Initialize entity.
			 * @protected
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			initEntity: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						if (this.isAddMode()) {
							this._initEntityAdd(next, this);
						} else {
							this._initEntityEdit(next, this);
						}
					},
					function(next) {
						this.onEntityInitialized(next, this);
					},
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Returns selector for main grid layout input controls.
			 * @protected
			 * @return {string}
			 */
			getMiniPageGridLayoutInputSelector: function() {
				return ".minipage-content-container .grid-layout .base-edit";
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.initRequiredColumns(this.getBindMap());
				this.initColumnsLookupListConfig();
				this.initEntity(function() {
					this.adjustMiniPagePosition();
					this.addHotkeys();
					if (this.isAddMode()) {
						var selector = this.getMiniPageGridLayoutInputSelector();
						Terrasoft.focusFirstInput(selector);
					}
					this.set("Rendered", true);
					this.hideBodyMask();
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#destroy
			 * @override
			 */
			destroy: function() {
				this.removeHotkeys();
				this.callParent(arguments);
			},

			/**
			 * Subscribe for key-down event.
			 * @protected
			 */
			addHotkeys: function() {
				var doc = Ext.getDoc();
				doc.on("keydown", this.onKeyDown, this);
			},

			/**
			 * Unsubscribe from key-down event.
			 * @protected
			 */
			removeHotkeys: function() {
				var doc = Ext.getDoc();
				doc.un("keydown", this.onKeyDown, this);
			},

			/**
			 * Handler for key-down event.
			 * @protected
			 * @param {Object} event Event object.
			 * @return {Boolean}
			 */
			onKeyDown: function(event) {
				if (event.ctrlKey && _.contains([event.ENTER, event.S], event.keyCode)) {
					event.preventDefault();
					if (this.isNotViewMode()) {
						if (event.target) {
							event.target.blur();
						}
						this.save();
					}
					return false;
				}
			},

			/**
			 * Gets mini page default values.
			 * @protected
			 * @return {Object[]} List of default values.
			 */
			getDefaultValues: function() {
				var valuePairs = this.sandbox.publish("GetMiniPageDefaultValues", null, [this.sandbox.id]);
				var defaultValues = this.processDefaultValues(valuePairs);
				this.set("DefaultValues", Terrasoft.deepClone(defaultValues));
				return defaultValues;
			},

			/**
			 * Load entity.
			 * @protected
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			loadMiniPageEntity: function(callback, scope) {
				var primaryColumnValue = this.getPrimaryColumnValue();
				this.loadEntity(primaryColumnValue, function() {
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#save
			 * @override
			 */
			save: function(callback, scope) {
				this.hideBodyMask();
				this.callParent([function() {
					Terrasoft.chain(
						this.publishOnSaveEvents,
						this.onSaved,
						function() {
							Ext.callback(callback, scope);
						},
						this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#getUpdateDetailConfig
			 * @override
			 */
			getUpdateDetailConfig: function() {
				var updateConfig = {
					primaryColumnValue: this.getPrimaryColumnValue()
				};
				return updateConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#getCardModuleResponseConfig
			 * @override
			 */
			getCardModuleResponseConfig: function() {
				var primaryColumnValue = this.getPrimaryColumnValue();
				var operation = this.getMiniPageOperation();
				var updateConfig = {
					success: true,
					action: operation,
					primaryColumnValue: primaryColumnValue,
					primaryDisplayColumnValue: this.get(this.primaryDisplayColumnName),
					primaryDisplayColumnName: this.primaryDisplayColumnName
				};
				return updateConfig;
			},

			/**
			 * Processes record saved.
			 * @protected
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			onSaved: function(callback, scope) {
				this.updateDetail();
				this.cardModuleResponse();
				Ext.callback(callback, scope || this);
				this.close();
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#validateSaveEntityResponse
			 * @override
			 */
			validateSaveEntityResponse: function() {
				this.hideBodyMask({
					selector: this.get("ContainerSelector")
				});
				this.callParent(arguments);
			},

			/**
			 * Publishes events after entity save.
			 * @protected
			 * @param {Function} [callback] Callback-function.
			 * @param {Object} [scope] Callback execution context.
			 */
			publishOnSaveEvents: function(callback, scope) {
				this.sandbox.publish("ReloadDashboardItems", {
					id: this.get("Id")
				});
				this.Ext.callback(callback, scope || this);
			},

			/**
			 * Check user read rights.
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Callback execution context.
			 */
			checkCanReadRights: function(callback, scope) {
				var primaryColumnValue = this.getPrimaryColumnValue();
				RightUtilities.checkCanReadRecords({
					schemaName: this.entitySchemaName,
					primaryColumnValues: [primaryColumnValue]
				}, function(result) {
					var response = this.Ext.isEmpty(result) ? false : result[0];
					if (response && response.Value) {
						this.Ext.callback(callback, scope || this);
					}
				}, scope || this);
			},

			/**
			 * Adjusts MiniPage position.
			 * @param {Function} [callback] Callback-function.
			 * @param {Object} [scope] Callback execution context.
			 */
			adjustMiniPagePosition: function(callback, scope) {
				var container = Ext.getCmp("AlignableMiniPageContainer");
				if (this.entitySchemaName) {
					this.updateMaxHeight(container);
				}
				var isEditMode = this.get("Mode") === Terrasoft.ConfigurationEnums.CardOperation.EDIT;
				container.fireEvent("adjustPosition", {hasCenterPosition: isEditMode});
				Ext.callback(callback, scope);
			},

			/**
			 * Returns offset wich calculated from button's container and MiniPage bottom offset
			 * @private
			 * @returns {Number}
			 */
			_getMiniPageBottomOffset: function() {
				var buttonContainer = this.Ext.get("MiniPageEditButtonsContainer");
				var bottomOffset = this.miniPageContainerBottomOffset || 0;
				return buttonContainer.getHeight() + bottomOffset;

			},
			/**
			 * Updates MiniPage grid max height.
			 * @private
			 * @param {Object} container Alignable container.
			 */
			updateMaxHeight: function(container) {
				var miniPageContainer = Ext.get("MiniPageContentContainer");
				if (!miniPageContainer || !container) {
					return;
				}
				var maxHeight;
				var offsets = this._getMiniPageBottomOffset();
				var wrapEl = container.getWrapEl();
				var documentHeight = document.body.clientHeight;
				if (this.get("Mode") === Terrasoft.ConfigurationEnums.CardOperation.VIEW) {
					var alignType = Terrasoft.get(container, "alignConfig.alignConfig.alignType");
					if (!container.alignConfig || alignType === Terrasoft.AlignType.BOTTOM) {
						maxHeight = documentHeight - (wrapEl ? wrapEl.getTop(true) : 0);
					} else if (alignType === Terrasoft.AlignType.TOP) {
						maxHeight = container.alignToEl.getTop();
					} else {
						var alignContainerHeight = container.alignToEl.getHeight();
						var beforeContainerHeight = container.alignToEl.getTop() + (alignContainerHeight / 2);
						var afterContainerHeight = documentHeight - beforeContainerHeight;
						maxHeight = (beforeContainerHeight < afterContainerHeight)
							? beforeContainerHeight * 2
							: afterContainerHeight * 2;
					}
				} else {
					maxHeight = documentHeight;
				}
				maxHeight -= offsets;
				miniPageContainer.applyStyles({
					"max-height": maxHeight + "px"
				});
			},

			/**
			 * Calls after entity initialize.
			 * @protected
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Callback execution context.
			 */
			onEntityInitialized: function(callback, scope) {
				this.set("IsEntityInitialized", true);
				this.initHeader();
				this.initMultiLookup();
				this.subscribeViewModelEvents();
				this.addInitializedClass();
				Ext.callback(callback, scope);
			},

			/**
			 * Adds entity-initialized class for content container.
			 * @private
			 */
			addInitializedClass: function() {
				var miniPageContainer = this.Ext.get("MiniPageContentContainer");
				miniPageContainer.addCls("entity-initialized");
			},

			/**
			 * Sets mini page header caption.
			 * @protected
			 */
			initHeader: function() {
				var headerCaption = this.getMiniPageHeader();
				this.set("MiniPageHeaderCaption", headerCaption);
			},

			/**
			 * Returns mini page header caption.
			 * @protected
			 * @return {String} Mini page header caption.
			 */
			getMiniPageHeader: function() {
				var typeColumnName = this.get("TypeColumnName");
				var typeName = typeColumnName && this.get(typeColumnName);
				return (typeName) ? typeName.displayValue : this.entitySchema.caption;
			},

			/**
			 * Calls after schema initialize.
			 * @protected
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Callback execution context.
			 */
			onPageInitialized: function(callback, scope) {
				this.Ext.callback(callback, scope || this);
			},

			/**
			 * Returns primary column value.
			 * @return {String} Primary column value.
			 */
			getPrimaryColumnValue: function() {
				var primaryColumnName = this.entitySchema.primaryColumnName;
				return this.get(primaryColumnName) || this.get("PrimaryColumnValue");
			},

			/**
			 * Opens entity page from minipage.
			 */
			openCurrentEntityPage: function() {
				Terrasoft.chain(
					function saveIfIsNotViewMode(next) {
						if (this.isViewMode()) {
							next();
							this.close();
						} else {
							this.save(next, this);
						}
					},
					function goToFullCard() {
						var elementUId = this.get("ProcessElementId");
						if (elementUId) {
							Terrasoft.ProcessModuleUtilities.tryShowProcessCard.call(this, {
								procElUId: elementUId,
								recordId: this.get("Id")
							});
						} else {
							NetworkUtilities.openEntityPage(this.getOpenEntityPageConfig());
						}
					},
					this);
			},

			/**
			 * Returns a configuration object to be passed to NetworkUtilities.openEntityPage method.
			 * @protected
			 * @param {Object} additionalConfig Object containing additional configuration values to be applied to
			 * the generated configuration object.
			 * @return {Object} Resulting object that contains configuration values.
			 */
			getOpenEntityPageConfig: function(additionalConfig) {
				var config = {
					entityId: this.getPrimaryColumnValue(),
					entitySchemaName: this.entitySchemaName,
					typeId: this.getTypeColumnValue(this),
					sandbox: this.sandbox,
					stateObj: {
						moduleId: this.getFullPageModuleId()
					}
				};
				Ext.apply(config, additionalConfig || {});
				return config;
			},

			/**
			 * Returns a new history identifier for the module.
			 * @protected
			 * @return {String} Module identifier to be stored in history API.
			 */
			getFullPageModuleId: function() {
				var historyState = this.sandbox.publish("GetHistoryState");
				var state = historyState && historyState.state;
				var stateModuleId = state && state.moduleId;
				var moduleId = stateModuleId || this.getCardModuleSandboxId();
				var pageModuleId = Ext.String.format("{0}_Card{1}", moduleId, this.entitySchemaName);
				return pageModuleId;
			},

			/**
			 * Returns visibility for container that contain columnNames in MiniPage.
			 * @param {String} columnNames Entity column names.
			 * @return {boolean} True - if container contains smth.
			 */
			getVisibility: function(columnNames) {
				var visible = true;
				if (this.get("IsEntityInitialized") && this.isViewMode()) {
					visible = false;
					if (_.isArray(columnNames)) {
						columnNames.forEach(function(columnName) {
							if (!visible) {
								visible = !this.Ext.isEmpty(this.get(columnName));
							}
						}, this);
					}
				}
				return visible;
			},

			/**
			 * Closes mini page container.
			 * @protected
			 */
			close: function() {
				this.clearRequiredColumnsListOnClose();
				this.sandbox.publish("CloseMiniPage", null, [this.sandbox.id]);
			},

			/**
			 * Returns true if MiniPage has close button.
			 * @protected
			 * @return {Boolean} True - if MiniPage has close button.
			 */
			hasCloseButton: function() {
				return this.isNotViewMode();
			},

			/**
			 * Return true if MiniPage can be editable.
			 * @protected
			 * @return {Boolean} True - if MiniPage can be editable.
			 */
			isEditable: function() {
				var editMode = Terrasoft.ConfigurationEnums.CardOperation.EDIT;
				return this.hasMode(editMode) && this.isViewMode();
			},

			/**
			 * Changes mini page mode and publishes message about mode changing.
			 * @protected
			 * @param {String} mode Mini page mode.
			 */
			changeMiniPageMode: function(mode) {
				if (this.hasMode(mode)) {
					this.set("Mode", mode);
					this.sandbox.publish("ChangeMiniPageMode", mode, [this.sandbox.id]);
				}
			},

			/**
			 * Switches MiniPage mode.
			 * @protected
			 */
			switchMiniPageMode: function() {
				var cardOperationEnum = Terrasoft.ConfigurationEnums.CardOperation;
				var currentMode = this.get("Mode");
				switch (currentMode) {
					case cardOperationEnum.EDIT:
						this.changeMiniPageMode(cardOperationEnum.VIEW);
						break;
					case cardOperationEnum.VIEW:
						this.changeMiniPageMode(cardOperationEnum.EDIT);
						break;
					default:
						break;
				}
				this.adjustMiniPagePosition();
			},

			/**
			 * Returns True if mini page contains mode.
			 * @protected
			 * @param {String} mode Mini page mode.
			 * @return {Boolean} True - if MiniPage contains mode.
			 */
			hasMode: function(mode) {
				var modes = this.get("MiniPageModes");
				return _.contains(modes, mode);
			},

			/**
			 * Returns True if mini page is in edit mode.
			 * @protected
			 * @return {Boolean} True - if MiniPage is in edit mode.
			 */
			isEditMode: function() {
				var currentMode = this.get("Mode");
				return (currentMode === Terrasoft.ConfigurationEnums.CardOperation.EDIT);
			},

			/**
			 * Returns True if mini page is in add mode.
			 * @protected
			 * @return {Boolean} True - if MiniPage is in add mode.
			 */
			isAddMode: function() {
				var currentMode = this.get("Mode");
				return (currentMode === Terrasoft.ConfigurationEnums.CardOperation.ADD);
			},

			/**
			 * Returns True if mini page is in view mode. And if columnNames set check is have values.
			 * @protected
			 * @param {(String|String[])} [columnNames] Column name/s.
			 * @return {Boolean} True - if MiniPage is in view mode.
			 */
			isViewMode: function(columnNames) {
				var currentMode = this.get("Mode");
				var visible = (currentMode === Terrasoft.ConfigurationEnums.CardOperation.VIEW);
				if (visible && columnNames) {
					columnNames = _.isArray(columnNames) ? columnNames : [columnNames];
					columnNames = _.filter(columnNames, _.isString);
					if (columnNames.length) {
						visible = this.getVisibility(columnNames);
					}
				}
				return visible;
			},

			/**
			 * Returns True if mini page is not in view mode.
			 * @protected
			 * @return {Boolean} True - if MiniPage is not in view mode.
			 */
			isNotViewMode: function() {
				return !this.isViewMode();
			},

			/**
			 * Returns True if mini page is not in view mode.
			 * @protected
			 * @return {Boolean} True - if MiniPage is not in view mode.
			 */
			isNotAddMode: function() {
				return !this.isAddMode();
			},

			/**
			 * Checks is column required.
			 * @param {String} columnName Column name.
			 * @return {Boolean} True if column required.
			 */
			isColumnRequired: function(columnName) {
				var requiredColumns = this.getModelRequiredColumns();
				var columns = requiredColumns.filter(function(column) {
					return column.name === columnName;
				});
				return this.isNotEmpty(columns);
			},

			/**
			 * Returns additional column visibility.
			 * @param {String} columnName Column name.
			 * @return {Boolean} True if additional column is visible.
			 */
			getAdditionalColumnVisibility: function(columnName) {
				var currentMode = this.get("Mode");
				if (currentMode === Terrasoft.ConfigurationEnums.CardOperation.VIEW) {
					return false;
				}
				return this.isColumnRequired(columnName);
			},

			/**
			 * Returns model columns list.
			 * @return {Object[]} List of columns.
			 */
			getModelColumnsList: function() {
				var columnsKeys = Terrasoft.keys(this.columns);
				var columnsList = Terrasoft.getPropertyValuesArray(columnsKeys, this.columns);
				var filteredColumnsList = columnsList.filter(function(item) {
					return this.Ext.isObject(item) &&
						item.type !== Terrasoft.ViewModelColumnType.RESOURCE_COLUMN;
				}, this);
				return filteredColumnsList;
			},

			/**
			 * Filters columns list by isRequired attribute.
			 * @private
			 * @param {Object[]} columnsList List of model columns.
			 * @return {Object[]} Filtered list of the columns.
			 */
			filterRequiredColumnsList: function(columnsList) {
				return columnsList.filter(function(item) {
					return item.isRequired && item.name !== this.primaryColumnName &&
						this.isEmpty(item.defaultValue);
				}, this);
			},

			/**
			 * Returns model required columns list, excluding resource columns.
			 * @protected
			 * @return {Object[]} List of model required columns.
			 */
			getModelRequiredColumns: function() {
				var columnsList = this.getModelColumnsList();
				var requiredColumns = this.filterRequiredColumnsList(columnsList);
				return requiredColumns;
			},

			/**
			 * Initializes required columns which are not exist in page.
			 * @protected
			 * @param {Terrasoft.Collection} bindMap Binding map.
			 */
			prepareRequiredColumnsCollection: function(bindMap) {
				if (!bindMap) {
					return;
				}
				var bindItems = bindMap.getItems();
				var modelRequiredColumns = this.getModelRequiredColumns();
				var requiredColumns = modelRequiredColumns.filter(function(item) {
					return !_.find(bindItems, {value: item.name});
				}, this);
				this.set("RequiredColumns", requiredColumns);
			},

			/**
			 * Initializes RequiredColumnsEntityCollection attribute.
			 * @protected
			 */
			initializeRequiredColumnsEntityCollection: function() {
				var requiredColumns = this.get("RequiredColumns");
				var collection = this.get("RequiredColumnsEntityCollection");
				collection.clear();
				if (this.isEmpty(requiredColumns)) {
					return;
				}
				var viewModel = this;
				collection.add(viewModel.get("Id"), viewModel);
			},

			/**
			 * Returns minipage view generator instance.
			 * @return {Terrasoft.MiniPageViewGenerator}
			 */
			getViewGenerator: function() {
				return this.Ext.create("Terrasoft.MiniPageViewGenerator");
			},

			/**
			 * Initializes view config for required columns.
			 * @protected
			 * @param {Object} itemView View config.
			 * @param {Terrasoft.BaseViewModel} model View model instance.
			 */
			getRequiredColumnsViewConfig: function(itemView, model) {
				var requiredColumns = model.get("RequiredColumns");
				var items = [];
				Terrasoft.each(requiredColumns, function(column) {
					var columnConfig = this.getDefaultItemConfig(column);
					items.push(columnConfig);
				}, this);
				var viewGenerator = this.getViewGenerator();
				var typeInfo = model.getTypeInfo();
				var fullTypeName = typeInfo.fullTypeName;
				var editConfig = viewGenerator.generatePartial(
					{
						name: "RequiredColumns",
						itemType: Terrasoft.ViewItemType.CONTAINER,
						wrapClass: ["required-model-wrapper"],
						items: items
					},
					{
						schemaName: model.name,
						viewModelClass: this.Ext.ClassManager.get(fullTypeName),
						schema: {}
					}
				);
				itemView.config = editConfig[0];
			},

			/**
			 * Returns default model config for required column.
			 * @param {Object} columnInfo Column information.
			 * @return {Object} Column config.
			 */
			getDefaultItemConfig: function(columnInfo) {
				return {
					itemType: Terrasoft.ViewItemType.MODEL_ITEM,
					name: columnInfo.name,
					markerValue: columnInfo.caption,
					isMiniPageModelItem: true
				};
			},

			/**
			 * Initializes required columns.
			 * @protected
			 * @param {Terrasoft.Collection} bindMap List of the model bindings.
			 */
			initRequiredColumns: function(bindMap) {
				this.prepareRequiredColumnsCollection(bindMap);
				this.initializeRequiredColumnsEntityCollection();
			},

			/**
			 * Clears required columns list on mini page closed.
			 * @protected
			 */
			clearRequiredColumnsListOnClose: function() {
				var collection = this.get("RequiredColumnsEntityCollection");
				if (collection && collection.getCount()) {
					collection.clear();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#invertColumnValue
			 * @override
			 */
			invertColumnValue: function() {
				if (this.isNotViewMode()) {
					this.callParent(arguments);
				}
			},

			/**
			 * Handler for module container visible changed.
			 * @param {Boolean} visible Module visible property value.
			 * @param {Object} tag Module tag.
			 */
			onModuleVisibleChanged: function(visible, tag) {
				if (visible || !this.get("Rendered")) {
					return;
				}
				var id = tag.containerId;
				var renderTo = tag.containerId;
				this.sandbox.unloadModule(id, renderTo);
				var gridLayoutColumn = Ext.get(renderTo).parent();
				gridLayoutColumn.dom.style.display = "none";
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "AlignableMiniPageContainer",
				"values": {
					"id": "AlignableMiniPageContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.AlignableContainer",
					"wrapClass": ["minipage-alignable-container"],
					"alignToEl": {"bindTo": "AlignToEl"},
					"showOverlay": {"bindTo": "isNotViewMode"},
					"containerOffsets": {
						"top": {"y": -2},
						"bottom": {"y": 5}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MiniPageContentContainer",
				"parentName": "AlignableMiniPageContainer",
				"propertyName": "items",
				"values": {
					"id": "MiniPageContentContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["minipage-content-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EditButtonsContainer",
				"parentName": "AlignableMiniPageContainer",
				"propertyName": "items",
				"values": {
					"id": "MiniPageEditButtonsContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["base-minipage-edit-button-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPageContentContainer",
				"propertyName": "items",
				"name": "MiniPage",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"maskVisible": {"bindTo": "ShowMask"},
					"allowOverlap": true,
					"classes": {"wrapClassName": ["base-mini-page-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RequiredColumnsContainer",
				"parentName": "MiniPageContentContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"isAsync": false,
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"classes": {
						"wrapClassName": [
							"required-columns-container",
							"grid-layout",
							"base-mini-page-container"
						]
					},
					"collection": "RequiredColumnsEntityCollection",
					"observableRowNumber": 1,
					"onGetItemConfig": "getRequiredColumnsViewConfig",
					"visible": {"bindTo": "isNotViewMode"}
				}
			},
			{
				"operation": "insert",
				"name": "SaveEditButton",
				"parentName": "EditButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.SaveEditButtonCaption"},
					"classes": {
						"textClass": ["base-minipage-save-button"],
						"wrapperClass": ["base-minipage-save-button-wrapper"],
						"imageClass": ["base-minipage-action-button-image"]
					},
					"click": {"bindTo": "save"},
					"visible": {"bindTo": "isNotViewMode"},
					"hint": {"bindTo": "Resources.Strings.SaveEditButtonHint"}
				}
			},
			{
				"operation": "insert",
				"name": "CancelEditButton",
				"parentName": "EditButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelEditButtonCaption"},
					"classes": {
						"textClass": ["base-minipage-cancel-button"],
						"wrapperClass": ["base-minipage-cancel-button-wrapper"],
						"imageClass": ["base-minipage-action-button-image"]
					},
					"click": {"bindTo": "close"},
					"visible": {"bindTo": "isNotViewMode"}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"id": "HeaderContainer",
					"selectors": {"wrapEl": "#HeaderContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-mini-wrap"],
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "MiniPageHeaderCaption",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"labelClass": ["label-in-header-container"],
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "MiniPageHeaderCaption"},
					"visible": {"bindTo": "isAddMode"}
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OpenCurrentEntityPage",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.OpenCurrentEntityPageImage"
					},
					"click": {"bindTo": "openCurrentEntityPage"}
				}
			},
			{
				"operation": "insert",
				"name": "OpenEditMode",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.OpenEditModeImage"
					},
					"click": {"bindTo": "switchMiniPageMode"},
					"visible": {"bindTo": "isEditable"}
				}
			},
			{
				"operation": "insert",
				"name": "CloseMiniPageButton",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.CloseButtonImage"
					},
					"click": {"bindTo": "close"},
					"visible": {"bindTo": "hasCloseButton"}
				}
			}

		]/**SCHEMA_DIFF*/
	};
});

/**
 * Parent: BaseMiniPage
 */
define("BaseMiniPage", [],
	function() {
		return {
			mixins: {},
			messages: {
				/**
				 * @message SetMiniPageVisible
				 * Change mini page visibility.
				 */
				"SetMiniPageVisible": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {},
			methods: {

				/**
				 * Returns mini page entity columns filled values.
				 * @protected
				 * @returns {Object[]}
				 */
				getMiniPageColumnValues: function() {
					var values = [];
					this.Terrasoft.each(this.getEntityColumns(), function(item, key) {
						var modelValue = this.get(key);
						if (!this.Ext.isEmpty(modelValue)) {
							values.push({
								name: key, value: modelValue.value || modelValue
							});
						}
					}, this);
					return values;
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getDuplicateSearchPageConfig
				 * @overridden
				 */
				getDuplicateSearchPageConfig: function() {
					var config = this.callParent(arguments);
					config.stateObj = config.stateObj || {};
					config.stateObj.openMiniPageConfig = {
						entitySchemaName: this.entitySchemaName,
						valuePairs: this.getMiniPageColumnValues()
					};
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#loadLocalDuplicateSearchPage
				 * @overridden
				 */
				loadLocalDuplicateSearchPage: function() {
					this.callParent(arguments);
					this.sandbox.publish("SetMiniPageVisible", false, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.setDuplicates(this.Terrasoft.emptyFn);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseEntityPage#isNewMode
				 * @overridden
				 */
				isNewMode: function() {
					return this.isAddMode();
				},

				/**
				 * @inheritdoc Terrasoft.DuplicatesSearchUtilitiesV2#getCommunications
				 * @overridden
				 */
				getCommunications: Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



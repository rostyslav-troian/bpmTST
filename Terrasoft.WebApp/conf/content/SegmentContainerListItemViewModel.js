Terrasoft.configuration.Structures["SegmentContainerListItemViewModel"] = {innerHierarchyStack: ["SegmentContainerListItemViewModel"]};
define('SegmentContainerListItemViewModelStructure', ['SegmentContainerListItemViewModelResources'], function(resources) {return {schemaUId:'7eac1ec4-985e-4b05-ba57-15f0ee610771',schemaCaption: "SegmentContainerListItemViewModel", parentSchemaName: "", schemaName:'SegmentContainerListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * View model for segment item in container list.
 */
define("SegmentContainerListItemViewModel", ["SegmentContainerListItemViewModelResources",
		"ModalBox", "DynamicContentAttributeLookupPage"],
		function(resources, ModalBox) {
	/**
	 * @class Terrasoft.configuration.SegmentContainerListItemViewModel
	 */
	Ext.define("Terrasoft.configuration.SegmentContainerListItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.SegmentContainerListItemViewModel",

		attributes: {
			/**
			 * Container list item caption.
			 * @type {String}
			 */
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Priority of current segment item.
			 * @type {Number}
			 */
			"Priority": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Lookup item for selected attribute.
			 * @type {Object}
			 */
			"Attribute": {
				dataValueType: Terrasoft.DataValueType.CUCTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Flag to indicate top position by priority.
			 * @type {Boolean}
			 */
			"IsTop": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Flag to indicate last position by priority.
			 * @type {Boolean}
			 */
			"IsLast": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},

		/**
		 * Unique identifier of current page sandbox.
		 * @type {String}
		 */
		sandboxId: "SegmentContainerListItemViewModel",

		/**
		 * Segment item unique identifier.
		 * @type {Terrasoft.DataValueType.GUID}
		 */
		id: null,

		/**
		 * Source content block view model.
		 * @type {Terrasoft.DynamicContentBlockViewModel}
		 */
		source: null,

		/**
		 * Parent observable container list.
		 * @type {Terrasoft.ObservableContainerList}
		 */
		containerList: null,

		// #region Methods: Private

		/**
		 * Returns item of LookupEdit control format.
		 * @private
		 * @param {Object} item DCAttribute model.
		 * @returns {Object} Formatted item.
		 */
		_prepareItem: function(item) {
			return {
				value: item.Index,
				displayValue: item.Caption
			};
		},

		/**
		 * Returns true when item is not selected.
		 * @private
		 * @returns {Boolean} Is default state.
		 */
		_isDefaultView: function() {
			return !this._isEditView();
		},

		/**
		 * Returns true when item is selected and can be edited.
		 * @private
		 * @returns {Boolean} Is editable state.
		 */
		_isEditView: function() {
			return this.$Selected && !this.source.$IsDefault;
		},

		/**
		 * Subscribes on attribute lookup page messages.
		 * @private
		 */
		_subscribeOnMessages: function() {
			var attributeLookupModuleId = this._getAttributeLookupModuleId();
			this.sandbox.subscribe("SelectRuleCancel", this.closeModalBox,
				this, [attributeLookupModuleId]);
			this.sandbox.subscribe("DCAttributeSelected", this.onDCAttributeSelected,
				this, [attributeLookupModuleId]);
		},

		/**
		 * Returns sandbox id for attribute lookup module.
		 * @private
		 * @returns {String} Attribute lookup module sandbox id.
		 */
		_getAttributeLookupModuleId: function() {
			return this.sandbox.id + "_" + this.id + "_DynamicContentAttributeLookupModule";
		},

		/**
		 * Provides warning question on segment delete action
		 * with handler on positive result.
		 * @private
		 * @param {Terrasoft.SegmentContainerListItemViewModel} item Current view model.
		 */
		_showDeleteSegmentWarning: function(item) {
			var message = Ext.String.format(resources.localizableStrings.SegmentDeleteWarning, item.$Caption);
			var config = {
				caption: message,
				buttons: ["ok", "cancel"],
				handler: function (result) {
					if (result === "ok") {
						this.onDeleteSegment();
					}
				},
				scope: this
			};
			Terrasoft.utils.showMessage(config);
		},

		/**
		 * Flag to bind to priority up item button visibility.
		 * @private
		 * @returns {Boolean} Visibility value.
		 */
		_isNotTopPriorty: function() {
			return !this.$IsTop;
		},

		/**
		 * Flag to bind to priority down item button visibility.
		 * @private
		 * @returns {Boolean} Visibility value.
		 */
		_isNotLastPriorty: function() {
			return !this.$IsLast;
		},

		/**
		 * Returns view config for action items for main item view config.
		 * @private
		 * @returns {Object} View config.
		 */
		_getActionItemsViewConfig: function() {
			return [
				{
					className: "Terrasoft.Button",
					imageConfig: "$Resources.Images.PriorityUpIcon",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					visible: "$_isEditView",
					click: "$onPriorityUpButtonClick",
					enabled: "$_isNotTopPriorty"
				},
				{
					className: "Terrasoft.Button",
					imageConfig: "$Resources.Images.PriorityDownIcon",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					visible: "$_isEditView",
					click: "$onPriorityDownButtonClick",
					enabled: "$_isNotLastPriorty"
				},
				{
					className: "Terrasoft.Button",
					imageConfig: "$Resources.Images.DeleteIcon",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					markerValue: "deleteSegmentButton",
					classes: {
						"imageClass": ["button-background-no-repeat"],
						"wrapperClass": ["remove-button-wrapClass"]
					},
					click: "$onDeleteButtonClick"
				}
			];
		},

		/**
		 * Handler on linked attribute changed.
		 * Publishes new attribute value.
		 * If new value is empty - fallback to previous value.
		 * debounce - hack to fix callstack size overflow on fallback value.
		 * @private
		 */
		_onSelectedAttributeChanged: Terrasoft.debounce(function() {
			if (this.$Attribute) {
				this.publishUpdatedData("DynamicBlocksUpdate", {
					Attributes: [this.$Attribute.value],
					Caption: this.$Attribute.displayValue
				});
			} else {
				this.$Attribute = {
					value: this.source.$Attributes[0],
					displayValue: this.$Caption
				};
			}
		}, 200),

		// #endregion

		// #region Methods: Protected

		/**
		 * Initializes model with resources.
		 * @protected
		 * @virtual
		 * @param {Object} resourcesObj Resources object.
		 */
		initResourcesValues: function(resourcesObj) {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.on("change:Attribute", this._onSelectedAttributeChanged, this);
			this.initResourcesValues(resources);
		},

		/**
		 * Returns class name of wrapped container.
		 * @protected
		 * @returns {String} Class name.
		 */
		getWrapClassName: function() {
			var classes = ["segment-item-container"];
			if (this.$Selected) {
				classes.push("selected");
			}
			return classes;
		},

		// #endregion

		// #region Methods: Public

		/**
		 * Sets sandbox for current item and subscribes on its messages.
		 * @public
		 * @param {Object} sandbox Sandbox object.
		 */
		initSandbox: function(sandbox) {
			this.sandbox = sandbox;
			this._subscribeOnMessages();
		},

		/**
		 * Initializes source object for current item.
		 * @public
		 * @param {Terrasoft.DynamicContentBlockViewModel} source Source view model for segment item.
		 */
		setSource: function(source) {
			this.source = source;
			this.id = source.$Id;
		},

		/**
		 * Sets parent container list.
		 * @public
		 * @param {Terrasoft.EditableContainerList} containerList Parent container list.
		 */
		setContainerList: function(containerList) {
			this.containerList = containerList;
		},

		/**
		 * Sets attribute for current segment list item view model
		 * with caption info actualization.
		 * @public
		 * @param {Object} attribute Lookup attribute object.
		 */
		setAttribute: function(attribute) {
			this.$Attribute = attribute;
			this.$Caption = attribute.displayValue;
		},

		/**
		 * Publishes message with data that are updated in current view model.
		 * @public
		 * @param {String} message Message name to publish.
		 * @param {Object} data Name-Value object with changed properties.
		 */
		publishUpdatedData: function(message, data) {
			this.sandbox.publish(message, {
				id: this.get("Id"),
				data: data
			});
		},

		/**
		 * Handler on positive delete question result.
		 * Sends message to remove item from sheet and if all is good removes item from container list.
		 * @public
		 */
		onDeleteSegment: function () {
			var deleteResult = this.sandbox.publish("DynamicBlockDelete",
				this.source.$Id, [this.sandboxId]);
			if (deleteResult) {
				this.containerList.removeItem(this);
			}
		},

		/**
		 * Handler on delete segment item.
		 * Shows warning question on delete segment.
		 * @public
		 */
		onDeleteButtonClick: function() {
			this._showDeleteSegmentWarning(this);
		},

		/**
		 * Handler on up priority for segment item.
		 * Publish config to update priority for segments in group.
		 * @public
		 */
		onPriorityUpButtonClick: function() {
			this.sandbox.publish("DynamicBlockUpdatePriority", {
				id: this.get("Id"),
				isPriorityUp: true
			}, [this.sandboxId]);
		},

		/**
		 * Handler on down priority for segment item.
		 * Publish config to update priority for segments in group.
		 * @public
		 */
		onPriorityDownButtonClick: function() {
			this.sandbox.publish("DynamicBlockUpdatePriority", {
				id: this.get("Id"),
				isPriorityUp: false
			}, [this.sandboxId]);
		},

		/**
		 * Method to show lookup selection modalbox to select new value.
		 * @public
		 */
		loadVocabulary: function() {
			var moduleId = this._getAttributeLookupModuleId();
			var modalBoxContainer = ModalBox.show({
				heightPixels: 350,
				widthPixels: 500,
				boxClasses: ["dc-modal-box"]
			}, function() {
				this.sandbox.unloadModule(moduleId, modalBoxContainer.id);
			}, this);
			this.sandbox.loadModule("DynamicContentAttributeLookupModule", {
				renderTo: modalBoxContainer.id,
				id: moduleId ,
				keepAlive: false,
				parameters: {
					viewModelConfig: {
						SelectedItem: {
							Index: this.$Attribute.value,
							Caption: this.$Attribute.displayValue
						}
					}
				}
			});
		},

		/**
		 * Handler on lookup page module unloading event.
		 * @public
		*/
		closeModalBox: function() {
			ModalBox.close();
		},

		/**
		 * Handler on attribute lookup new value selected.
		 * @public
		 * @param {Object} attribute new selected DCAttribute model.
		 */
		onDCAttributeSelected: function(attribute) {
			ModalBox.close();
			var item = this._prepareItem(attribute);
			this.setAttribute(item);
		},

		/**
		 * Returns config of current item view.
		 * @public
		 * @returns {Object} View config.
		 */
		getViewConfig: function() {
			var id = Terrasoft.Component.generateId();
			return {
				className: "Terrasoft.Container",
				classes: {
					wrapClassName: this.getWrapClassName()
				},
				items: [
					{
						inputId: id,
						className: "Terrasoft.Label",
						caption: "$Caption",
						visible: "$_isDefaultView"
					},
					{
						markerValue: "dcAttributeLookupEdit",
						className: "Terrasoft.LookupEdit",
						visible: "$_isEditView",
						value: "$Attribute",
						loadVocabulary: "$loadVocabulary"
					},
					{
						className: "Terrasoft.Container",
						classes: { wrapClassName: ["segment-actions-container"] },
						visible: "$Selected",
						items: this._getActionItemsViewConfig()
					}
				]
			};
		}

		// #endregion

	});
	return Terrasoft.configuration.SegmentContainerListItemViewModel;
});



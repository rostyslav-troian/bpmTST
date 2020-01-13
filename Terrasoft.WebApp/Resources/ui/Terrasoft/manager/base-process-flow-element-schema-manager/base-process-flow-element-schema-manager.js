/**
 * @abstract
 * Base process elements schema manager.
 */
Ext.define("Terrasoft.manager.BaseProcessFlowElementSchemaManager", {
	extend: "Terrasoft.manager.BaseSchemaManager",
	alternateClassName: "Terrasoft.BaseProcessFlowElementSchemaManager",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseManager#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.ProcessFlowElementSchemaManagerItem",

	/**
	 * Array of types and initial configs for core process schema elements.
	 * Each items has string itemType property and some items has initialConfig property.
	 * @protected
	 * @type {Object[]}
	 */
	coreElementClassNames: [],

	/**
	 * Array of configuration user tasks, that must be in service items group.
	 * @protected
	 * @type {String[]}
	 */
	serviceTaskElementNames: [],

	/**
	 * Array of obsolete elements.
	 * @protected
	 * @type {String[]}
	 */
	obsoleteElementNames: [],

	/**
	 * Array of not implemented elements for beta version.
	 * @protected
	 * @type {String[]}
	 */
	notImplementedElementNames: [],

	/**
	 * Manager items instance initial configs. Property name is manager item uid and value is item initial config.
	 * Fill by {@link #coreElementClassNames}.
	 * @protected
	 */
	itemsInitialConfigs: {},

	/**
	 * Not implemented elemnents feature code.
	 * @protected
	 * @type {String}
	 */
	notImplementedElementsFeatureCode: null,

	/**
	 * Obsolete elements feature code.
	 * @protected
	 * @type {String}
	 */
	obsoleteElementsFeatureCode: null,

	/**
	 * User task schema manager name.
	 * @protected
	 * @type {String}
	 */
	userTaskSchemaManagerName: null,

	//endregion

	//region Methods: Private

	/**
	 * Returns flag that indicates implementation of item.
	 * @param {String} name Item name.
	 * @private
	 * @return {Boolean} True if item is implemented, else false.
	 */
	getIsElementNotImplemented: function(name) {
		if (Terrasoft.Features.getIsEnabled(this.notImplementedElementsFeatureCode)) {
			return false;
		}
		return this.notImplementedElementNames.indexOf(name) > -1;
	},

	/**
	 * Returns flag that indicates obsolete of item.
	 * @param {String} name Item name.
	 * @private
	 * @return {Boolean} True if item is implemented, else false.
	 */
	getIsElementObsolete: function(name) {
		if (Terrasoft.Features.getIsEnabled(this.obsoleteElementsFeatureCode)) {
			return false;
		}
		return this.obsoleteElementNames.indexOf(name) > -1;
	},

	/**
	 * Adds core process schema elements to manager.
	 * @private
	 */
	addCoreElements: function() {
		Terrasoft.each(this.coreElementClassNames, function(coreElement) {
			var itemType = coreElement.itemType;
			var item = Ext.create("Terrasoft.ProcessFlowElementSchemaManagerItem", {
				instanceClassName: itemType
			});
			var itemConfig = coreElement.initialConfig || {};
			var instance = item.createInstance(itemConfig);
			item.setInstance(instance);
			var itemName = item.instance.name;
			if (this.getIsElementNotImplemented(itemName) || this.getIsElementObsolete(itemName)) {
				return;
			}
			this.itemsInitialConfigs[item.uId] = itemConfig;
			this.addItem(item);
		}, this);
	},

	/**
	 * Search manager item by server class name.
	 * @private
	 * @param {String} typeName Full server class name.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException} If argument is empty.
	 * @throws {Terrasoft.ItemNotFoundException} If search result is empty.
	 * @return {Terrasoft.ProcessFlowElementSchemaManagerItem}.
	 */
	getItemByType: function(typeName) {
		if (!typeName) {
			throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "typeName"});
		}
		var result = this.items.filterByFn(function(item) {
			return item.instance.typeName === typeName;
		}, this);
		result = result.getItems();
		if (result.length === 0) {
			throw new Terrasoft.ItemNotFoundException({
				message: Terrasoft.Resources.Collection.ItemWithKey + " \"" + typeName + "\" " +
				Terrasoft.Resources.Collection.DoesNotExists
			});
		}
		return result[0];
	},

	/**
	 * Performs actions after user tasks are initialized.
	 * @private
	 * @param {Function} safeCallback Function to execute after user tasks are initialized.
	 */
	onUserTaskManagerInitialized: function(safeCallback) {
		this.initialized = true;
		this.initializing = false;
		safeCallback();
		this.fireEvent("initialized");
	},

	/**
	 * Returns instance of user task schema manager.
	 * @private
	 * @returns {Object} Instance of user task schema manager.
	 */
	getUserTaskManager: function() {
		var userTaskManager = Terrasoft[this.userTaskSchemaManagerName];
		return userTaskManager;
	},

	/**
	 * Initializes user task manager item and adds it to item.
	 * @private
	 * @param {Object} userTaskManagerItem Instance of user task manager item.
	 */
	initializeUserTaskManagerItem: function(userTaskManagerItem) {
		var configuration = Terrasoft.configuration || {};
		var validUserTasksByDefault = configuration.validUserTasksByDefault || [];
		var itemsInitialConfigs = this.itemsInitialConfigs;
		var itemName = userTaskManagerItem.name;
		if (this.getIsElementNotImplemented(itemName) || this.getIsElementObsolete(itemName)) {
			return;
		}
		if (this.serviceTaskElementNames.indexOf(userTaskManagerItem.name) > -1) {
			userTaskManagerItem.instance.group = Terrasoft.FlowElementGroup.ServiceTask;
		}
		var userTaskInitialConfig = {
			isValid: Ext.Array.contains(validUserTasksByDefault, userTaskManagerItem.uId)
		};
		itemsInitialConfigs[userTaskManagerItem.uId] = userTaskInitialConfig;
		this.addItem(userTaskManagerItem);
	},

	/**
	 * Initializes user task manager items.
	 * @private
	 */
	initializeUserTaskManagerItems: function() {
		var userTaskManager = this.getUserTaskManager();
		userTaskManager.items.each(function(item) {
			this.initializeUserTaskManagerItem(item);
		}, this);
	},

	/**
	 * Initializes user tasks if UserTaskManager is not null.
	 * @private
	 * @param {Function} callback Callback function.
	 */
	initializeUserTaskManager: function(callback) {
		var userTaskManager = this.getUserTaskManager();
		if (userTaskManager) {
			userTaskManager.initialize(function() {
				this.initializeUserTaskManagerItems(userTaskManager);
				Ext.callback(callback, this);
			}, this);
		} else {
			Ext.callback(callback, this);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#initialize
	 * @override
	 */
	initialize: function(callback, scope) {
		var safeCallback = this.getSafeCallback(callback, scope);
		if (this.initialized) {
			safeCallback();
			return;
		}
		if (this.initializing) {
			this.on("initialized", function() {
				safeCallback();
			}, this, {
				single: true
			});
			return;
		}
		this.initializing = true;
		this.addCoreElements();
		this.initializeUserTaskManager(function() {
			this.onUserTaskManagerInitialized(safeCallback);
		});
	},

	/**
	 * Returns item instance config. If custom item config not specified, for core elements returns predefined config.
	 * @protected
	 * see {@link #itemsInitialConfigs}.
	 * @param {String} managerItemUId Manager item uid.
	 * @param {Object} config Custom item config.
	 * @return {Object} Item instance config.
	 */
	getInstanceConfig: function(managerItemUId, config) {
		if (config) {
			return config;
		}
		return this.itemsInitialConfigs[managerItemUId] || {};
	},

	//endregion

	//region Methods: Public

	/**
	 * Creates manager item instance.
	 * @param {String} managerItemUId manager item uid.
	 * @param {Object} [config] Custom instance config.
	 * @return {Terrasoft.ProcessBaseElementSchema} Item instance.
	 */
	createInstance: function(managerItemUId, config) {
		var managerItem = this.findItem(managerItemUId);
		var itemConfig = this.getInstanceConfig(managerItemUId, config);
		if (!managerItem) {
			managerItem = this.getItemByType(itemConfig.typeName);
		}
		var instance = managerItem.createInstance(itemConfig);
		instance.managerItemUId = managerItemUId;
		instance.editPageSchemaName = managerItem.instance.editPageSchemaName;
		this.applyClientProperties(instance);
		return instance;
	},

	/**
	 * Applies client properties for process schema parameters.
	 * @private
	 * @param {Terrasoft.ProcessBaseElementSchema} Item instance.
	 */
	applyClientProperties: function(instance) {
		// TODO CRM-28908
		if (instance instanceof Terrasoft.ProcessUserTaskSchema &&
				this.getIsEmailTemplateUserTask(instance.managerItemUId)) {
			instance.parameters.each(function(item) {
				switch(item.name) {
					case "BodyConfig":
						item.forceRemove = true;
						item.skipValidation = true;
						break;
					case "Body":
						item.skipValidation = true;
						break;
					default:
						break;
				}
			}, this);
		}
	},

	/**
	 * Returns true if manger uid is email template user task manager.
	 * @param {String} managerUId Manger uId.
	 * @returns {boolean} True if manager is email.
	 */
	getIsEmailTemplateUserTask: function(managerUId) {
		var managerItems = this.items.filter(function(item) {
			return item.uId === managerUId;
		});
		var managerItem = managerItems.first();
		return managerItem.name === "EmailTemplateUserTask";
	},

	/**
	 * @inheritdoc Terrasoft.BaseManager#clear.
	 * @override
	 */
	clear: function() {
		var userTaskManager = Terrasoft[this.userTaskSchemaManagerName];
		var userTaskItems = userTaskManager.getItems();
		userTaskItems.each(function(userTask) {
			this.items.remove(userTask);
		}, this);
		userTaskManager.clear();
		this.callParent(arguments);
	}

	//endregion
});

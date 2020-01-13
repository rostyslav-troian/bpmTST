/**
 */
Ext.define("Terrasoft.manager.UserTaskSchema", {
	extend: "Terrasoft.BaseSchema",
	alternateClassName: "Terrasoft.UserTaskSchema",

	mixins: {
		parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
	},

	//region Properties: Private

	/**
	 * The name of the server class of the process item.
	 * @private
	 * @type {String}
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaUserTask",

	/**
	 * Process schema metadata.
	 * @private
	 * @type {String}
	 */
	metaData: null,

	/**
	 * The body of the user action function.
	 * @private
	 * @type {String}
	 */
	executeBody: null,

	/**
	 * Dcm parameters edit page identifier.
	 * @type {String}
	 * @private
	 */
	dcmParametersEditPageSchemaV2UId: null,

	/**
	 * Process element parameters edit page identifier.
	 * @type {String}
	 * @private
	 */
	parametersEditPageSchemaV2UId: null,

	/**
	 * Process element parameters edit page identifier.
	 * @type {String}
	 * @private
	 */
	editPageSchemaUIdPropertyName: "parametersEditPageSchemaV2UId",

	/**
	 * A flag that the item is the user action. Used for compatibility with the old designer.
	 * @type {Boolean}
	 * @private
	 */
	isUserTask: true,

	/**
	 * Technical property for compatibility with the old designer.
	 * @private
	 * @type {Object}
	 */
	enableCustomEventHandlers: null,

	//endregion

	//region Properties: Protected

	/**
	 * Manager name.
	 * @protected
	 * @type {String}
	 */
	managerName: null,

	/**
	 * Schema methods.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	methods: null,

	/**
	 * The usings collection is used for compatibility with the old designer.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	usings: null,

	/**
	 * The version of the system in which the process was created.
	 * @protected
	 * @type {String}
	 */
	createdInVersion: null,

	/**
	 * The schema ID in which the element was created.
	 * @protected
	 * @type {String}
	 */
	createdInSchemaUId: null,

	/**
	 * The schema ID in which the element was changed.
	 * @protected
	 * @type {String}
	 */
	modifiedInSchemaUId: null,

	/**
	 * The identifier of the package in which the item was created.
	 * @protected
	 * @type {String}
	 */
	createdInPackageId: null,

	/**
	 * The unique identifier of the parent schema.
	 * @protected
	 * @type {String}
	 */
	parentSchemaUId: null,

	/**
	 * Group.
	 * @protected
	 * @type {Terrasoft.ObjectCollection}
	 */
	group: null,

	/**
	 * Object unique Id.
	 * @protected
	 * @type {String}
	 */
	entitySchemaUId: null,

	/**
	 * A flag of serialization of the process in the database.
	 * @protected
	 * @type {Boolean}
	 */
	serializeToDB: false,

	/**
	 * Mode of using the process.
	 * @protected
	 * @type {Terrasoft.ProcessSchemaUsageType}
	 */
	usageType: Terrasoft.ProcessSchemaUsageType.ADVANCED,

	/**
	 * Unique Id for the parameters page.
	 * @protected
	 * @type {String}
	 */
	parametersEditPageSchemaUId: null,

	/**
	 * Localized strings.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	localizableStrings: null,

	/**
	 * The name of the parameter edit page.
	 * @protected
	 * @type {String}
	 */
	editPageSchemaName: "",

	/**
	 * Element color.
	 * @protected
	 * @type {String}
	 */
	color: null,

	/**
	 * Partial, flag that indicates how to generate user task schema.
	 * @protected
	 * @type {Boolean}
	 */
	isPartial: false,

	/**
	 * Client schemas manager.
	 * @protected
	 */
	clientUnitSchemaManager: Terrasoft.ClientUnitSchemaManager,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns editPageSchemaName by parametersEditPageSchemaV2UId from ClientUnitSchemaManager.
	 * If parametersEditPageSchemaV2UId is not defined returns default edit page.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {String} callback.editPageSchemaName Edit page schema name.
	 * @param {Object} scope Execution context.
	 */
	getEditPageSchemaName: function(callback, scope) {
		var pageSchemaUId = this[this.editPageSchemaUIdPropertyName];
		if (!this.editPageSchemaName && pageSchemaUId) {
			var clientUnitSchemaManager = this.clientUnitSchemaManager;
			clientUnitSchemaManager.getItemByUId(pageSchemaUId, function(item) {
				item.getInstance(function(pageSchemaManagerItem) {
					this.editPageSchemaName = pageSchemaManagerItem.name;
					callback.call(scope, this.editPageSchemaName);
				}, this);
			}, this);
		} else {
			this.editPageSchemaName = this.editPageSchemaName ||
				Terrasoft.process.constants.DEFAULT_EDIT_PAGE_SCHEMA_NAME;
			callback.call(scope, this.editPageSchemaName);
		}
	},

	/**
	 * Loads the localized resources of a custom action.
	 * @param {Object} localizableValues The object of localized resources.
	 * @protected
	 */
	loadLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		this.caption = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues.Caption
		});
		this.description = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues.Description
		});
		this.mixins.parametrizedProcessSchemaElement.loadParametersLocalizableValues.call(this, localizableValues);
	},

	/**
	 * Loads user task localizable values by UIds.
	 * @param {Object} localizableValues Localizable object resources.
	 * @protected
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		var uid = this.uId;
		this.caption = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues[uid + ".caption"]
		});
		this.description = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues[uid + ".description"]
		});
		this.mixins.parametrizedProcessSchemaElement.loadParametersLocalizableValuesByUIds.call(this, localizableValues);
	},

	/**
	 * Returns an object with localized resources for a custom action.
	 * @param {Object} localizableValues The object to which the localized resources are written.
	 * @protected
	 */
	getLocalizableValues: function(localizableValues) {
		var uid = this.uId;
		localizableValues[uid + ".caption"] = this.getSerializableProperty(this.caption);
		localizableValues[uid + ".description"] = this.getSerializableProperty(this.description);
		this.mixins.parametrizedProcessSchemaElement.getParametersLocalizableValues.call(this, localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaElement#internalValidate
	 * Validate parameters.
	 * @override
	 */
	internalValidate: function() {
		return this.mixins.parametrizedProcessSchemaElement.validateParameters.apply(this, arguments);
	}

	//endregion

});

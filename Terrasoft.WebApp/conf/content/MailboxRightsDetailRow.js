Terrasoft.configuration.Structures["MailboxRightsDetailRow"] = {innerHierarchyStack: ["MailboxRightsDetailRow"]};
define('MailboxRightsDetailRowStructure', ['MailboxRightsDetailRowResources'], function(resources) {return {schemaUId:'ba817360-5309-4f1d-9da3-704c92ad0e29',schemaCaption: "MailboxRightsDetailRow", parentSchemaName: "", schemaName:'MailboxRightsDetailRow',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MailboxRightsDetailRow", ["MailboxRightsDetailRowResources"], function() {
	var rightOperationTypes = Terrasoft.RightsEnums.operationTypes;
	return {
		entitySchemaName: "EmailDefRights",
		attributes: {
			/**
			 * SysAdminUnit column.
			 * @type {Object}
			 */
			"SysAdminUnit": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				lookupListConfig: {
					filter: function() {
						return this.getMailboxOwnerFilter();
					}
				}
			},
			/**
			 * Is row in edit mode flag.
			 * @type {Boolean}
			 */
			"IsEditMode": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			/**
			 * Is send from mailbox allowed flag.
			 * @type {Boolean}
			 */
			"SendAllowed": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Is mailbox content access allowed flag.
			 * @type {Boolean}
			 */
			"ContentAccessAllowed": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Is mailbox edit allowed flag.
			 * @type {Boolean}
			 */
			"MailboxEditAllowed": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Record operations array.
			 * @type {Object[]}
			 */
			"MailboxOperations": {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Record operations array.
			 * @type {Object[]}
			 */
			"EmailDefRights": {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Is row visible flag.
			 * @type {Boolean}
			 */
			"RowVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			/**
			 * Is row changes saved flag.
			 * @type {Boolean}
			 */
			"IsSaved": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Is row edit enabled flag.
			 * @type {Boolean}
			 */
			"IsEnabled": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Sets operation flags state.
			 * @private
			 */
			_setOperationFlags: function() {
				if (this.$MailboxOperations[rightOperationTypes.read]) {
					this.$SendAllowed = true;
				}
				if (this.$EmailDefRights[rightOperationTypes.read] || this.$EmailDefRights[rightOperationTypes.edit]) {
					this.$ContentAccessAllowed = true;
				}
				if (this.$MailboxOperations[rightOperationTypes.edit]) {
					this.$MailboxEditAllowed = true;
				}
			},

			/**
			 * Sets mailbox record right operation in operations array.
			 * @private
			 * @param{Integer} operation Operation code.
			 * @param {Object} operationConfig Operation configuration object.
			 */
			_setOperation: function(operation, operationConfig) {
				var config = this.$MailboxOperations[operation] || this._getNewMailboxOperation(operation);
				this.Ext.apply(config, operationConfig);
				this.$MailboxOperations[operation] = config;
			},

			/**
			 * Sets mailbox email default record operation in operations array.
			 * @private
			 * @param{Integer} operation Operation code.
			 * @param {Object} emailDefRight Email default record right operation configuration object.
			 */
			_setEmailOperation: function(operation, emailDefRight) {
				this.$EmailDefRights[operation] = emailDefRight;
			},

			/**
			 * Creates new mailbox record right operation.
			 * @private
			 * @param {Integer} operation Operation code.
			 * @return {Object} operationConfig Operation configuration object.
			 */
			_getNewMailboxOperation: function(operation) {
				return {
					"Id": this.Terrasoft.generateGUID(),
					"Operation": operation,
					"Position": 0,
					"RightLevel": this.Terrasoft.RightsEnums.rightLevels.allow.Value,
					"SysAdminUnit": this.Terrasoft.deepClone(this.$SysAdminUnit),
					"isDeleted": false,
					"isNew": true,
					"useDenyRights": false
				};
			},

			/**
			 * Sets mailbox record right operation values using current row state.
			 * @private
			 * @param {Object} operationConfig Operation configuration object.
			 */
			_setOperationValues: function(operationConfig) {
				operationConfig.isDeleted = !this._getMailboxOperationState(operationConfig.Operation)
					|| !this.$IsEnabled;
			},

			/**
			 * Returns current mailbox operation state.
			 * @private
			 * @param {Integer} operation Operation code.
			 * @return {Boolean} Current operation state.
			 */
			_getMailboxOperationState: function(operation) {
				if (operation === rightOperationTypes.read) {
						return this.$SendAllowed || this.$MailboxEditAllowed;
				}
				if (operation === rightOperationTypes.edit) {
						return this.$MailboxEditAllowed;
				}
			},

			/**
			 * Returns current mailbox email operation state.
			 * @private
			 * @return {Boolean} Current operation state.
			 */
			_getEmailOperationState: function() {
				return this.$ContentAccessAllowed;
			},

			/**
			 * Creates email default record right operation save query.
			 * @private
			 * @param {Integer} operation Operation code.
			 * @param {Guid} mailboxId Current mailbox unique identifier.
			 * @return {Terrasoft.InsertQuery|Terrasoft.UpdateQuery|Terrasoft.DeleteQuery|null} Email default record
			 * right operation save query.
			 */
			_getOperationSaveQuery: function(operation, mailboxId) {
				var emailDefRight = this.$EmailDefRights[operation];
				if (this.isEmpty(emailDefRight)) {
					if (this._getEmailOperationState(operation) && this.$IsEnabled) {
						return this._getInsertEmailDefRight(operation, mailboxId);
					} else {
						return null;
					}
				} else {
					if (!this._getEmailOperationState(operation) || !this.$IsEnabled) {
						return this._getDeleteEmailDefRight(emailDefRight);
					} else {
						return null;
					}
				}
			},

			/**
			 * Creates email default record right operation insert query.
			  * @private
			 * @param {Integer} operation Operation code.
			 * @param {Guid} mailboxId Current mailbox unique identifier.
			 * @return {Terrasoft.InsertQuery} Email default record right operation insert query.
			 */
			_getInsertEmailDefRight: function(operation, mailboxId) {
				var insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "EmailDefRights"
				});
				insert.setParameterValue("Record", mailboxId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("SysAdminUnit", this.$SysAdminUnit.value,
					this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("Operation", operation, this.Terrasoft.DataValueType.INTEGER);
				insert.setParameterValue("Position", 0, this.Terrasoft.DataValueType.INTEGER);
				insert.setParameterValue("RightLevel", this.Terrasoft.RightsEnums.rightLevels.allow.Value,
					this.Terrasoft.DataValueType.INTEGER);
				return insert;
			},

			/**
			 * Creates email default record right operation delete query.
			 * @private
			 * @param {Terrasoft.BaseViewModel} emailDefRight Emaildefault record right operation instance.
			 * @return {Terrasoft.DeleteQuery} Email default record right operation delete query.
			 */
			_getDeleteEmailDefRight: function(emailDefRight) {
				var del = this.Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: "EmailDefRights"
				});
				var filters = this.Ext.create("Terrasoft.FilterGroup");
				filters.addItem(del.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Id", emailDefRight.$Id));
				del.filters = filters;
				return del;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Sends changed event to show save settings button.
			 * @protected
			 */
			showSaveButton: function() {
				this.$IsSaved = false;
				this.fireEvent("changed", this);
			},

			/**
			 * Returns row container marker value.
			 * @protected
			 * @return {String} Row container marker value.
			 */
			getContainerMarkerValue: function() {
				return this.$SysAdminUnit && !this.$IsEditMode ? this.$SysAdminUnit.displayValue : "AddNewRight";
			},

			/**
			 * Creates mailbox owner filter for SysAdminUnit lookup.
			 * @protected
			 * @return {Terrasoft.FilterGroup} Mailbox owner filter.
			 */
			getMailboxOwnerFilter: function() {
				var mailboxOwnerFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
					"Id", this.$MailboxOwner.value);
				var filters = this.Ext.create("Terrasoft.FilterGroup");
				filters.addItem(mailboxOwnerFilter);
				return filters;
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritDoc Terrasoft.core.mixins.EntityBaseViewModelMixin#getLookupQuery
			 * @overridden
			 */
			getLookupQuery: function() {
				var esq = this.callParent(arguments);
				esq.filters.addItem(this.getMailboxOwnerFilter());
				return esq;
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#constructor.
			 * @overridden
			 */
			constructor: function() {
				this.addEvents(
					/**
					 * @event
					 * Record operation add canceled event.
					 */
					"cancel",
					/**
					 * @event
					 * Record operation changed event.
					 */
					"changed",
					/**
					 * @event
					 * Record operation saved event.
					 */
					"saved"
				);
				this.$MailboxOperations = [];
				this.$EmailDefRights = [];
				this.callParent(arguments);
			},

			/**
			 * Save button click handler.
			 */
			onSave: function() {
				if (this.isEmpty(this.$SysAdminUnit)) {
					return;
				}
				this.$IsEditMode = false;
				this.fireEvent("saved", this);
			},

			/**
			 * Cancel button click handler. Fires "cancel" event.
			 */
			onCancel: function() {
				this.fireEvent("cancel", this);
			},

			/**
			 * Delete button click handler.
			 */
			deleteRow: function() {
				this.$SendAllowed = false;
				this.$ContentAccessAllowed = false;
				this.$MailboxEditAllowed = false;
				this.$RowVisible = false;
				this.showSaveButton();
			},

			/**
			 * Sets mailbox record right operation in operations array.
			 * @param {Object} data Mailbox record right operation configuration object.
			 */
			setMailboxOperation: function(data) {
				var operationConfig = this.Terrasoft.deepClone(data);
				this._setOperation(operationConfig.Operation, operationConfig);
				this._setOperationFlags();
			},

			/**
			 * Sets mailbox email default record right operation in operations array.
			 * @param {Terrasoft.BaseViewModel} emailDefRight Email default record right operation instance.
			 */
			setEmailOperation: function(emailDefRight) {
				this._setEmailOperation(emailDefRight.$Operation, emailDefRight);
				this._setOperationFlags();
			},

			/**
			 * Returns current mailbox record right operations objects array.
			 * @return {Object[]} Current mailbox record right operations.
			 */
			getMailboxOperations: function() {
				var result = [];
				if (this.isEmpty(this.$SysAdminUnit) || this.$IsSaved || !this.$IsEnabled) {
					return result;
				}
				this.Terrasoft.each([rightOperationTypes.read, rightOperationTypes.edit], function(operation) {
					var operationConfig = this.$MailboxOperations[operation] || this._getNewMailboxOperation(operation);
					this._setOperationValues(operationConfig);
					if (!operationConfig.isNew || !operationConfig.isDeleted) {
						result.push(operationConfig);
					}
				}, this);
				return result;
			},

			/**
			 * Creates email default record right operations save queries array.
			 * @return {Terrasoft.BaseQuery[]} Email default record right operations save queries.
			 */
			getEmailDefRightsSaveQueries: function(mailboxId) {
				var result = [];
				if (this.isEmpty(this.$SysAdminUnit) || this.$IsSaved) {
					return result;
				}
				this.Terrasoft.each([rightOperationTypes.read, rightOperationTypes.edit], function(operation) {
					var emailDefRightQuery = this._getOperationSaveQuery(operation, mailboxId);
					if (this.isNotEmpty(emailDefRightQuery)) {
						result.push(emailDefRightQuery);
					}
				}, this);
				return result;
			}

			//endregion
		},
		diff: [{
				"operation": "insert",
				"name": "AdminRightsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"markerValue": {"bindTo": "getContainerMarkerValue"},
					"visible": {"bindTo": "RowVisible"},
					"wrapClass": ["admin-rights-container"]
				}
			}, {
				"operation": "insert",
				"name": "AdminRightsEditContainer",
				"parentName": "AdminRightsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {"bindTo": "IsEditMode"},
					"wrapClass": ["admin-rights-edit-container"]
				}
			}, {
				"operation": "insert",
				"name": "AdminRightsDisplayContainer",
				"parentName": "AdminRightsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "IsEditMode",
						"bindConfig": {
							converter: function(value) {
								return !value;
							}
						}
					},
					"wrapClass": ["admin-rights-display-container"]
				}
			}, {
				"operation": "insert",
				"name": "SysAdminUnitName",
				"parentName": "AdminRightsDisplayContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "SysAdminUnit"},
					"classes": {
						"labelClass": ["controlCaption"]
					}
				}
			}, {
				"operation": "insert",
				"name": "DeleteRowButton",
				"parentName": "AdminRightsDisplayContainer",
				"propertyName": "items",
				"values": {
					"click": {"bindTo": "deleteRow"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"imageClass": ["button-background-no-repeat"]
					},
					"imageConfig": {
						"bindTo": "Resources.Images.DeleteRowIcon"
					},
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"enabled": {"bindTo": "IsEnabled"}
				}
			}, {
				"operation": "insert",
				"name": "MailboxEditAllowedCheckbox",
				"parentName": "AdminRightsDisplayContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "MailboxEditAllowed",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"controlConfig": {
						"checkedchanged": {"bindTo": "showSaveButton"},
						"enabled": {"bindTo": "IsEnabled"}
					},
					"classes": {
						"wrapClassName": ["rights-checkbox"]
					}
				}
			}, {
				"operation": "insert",
				"name": "SendAllowedCheckbox",
				"parentName": "AdminRightsDisplayContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "SendAllowed",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"controlConfig": {
						"checkedchanged": {"bindTo": "showSaveButton"},
						"enabled": {"bindTo": "IsEnabled"}
					},
					"classes": {
						"wrapClassName": ["rights-checkbox"]
					}
				}
			}, {
				"operation": "insert",
				"name": "ContentAccessAllowedCheckbox",
				"parentName": "AdminRightsDisplayContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "ContentAccessAllowed",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"controlConfig": {
						"checkedchanged": {"bindTo": "showSaveButton"},
						"enabled": {"bindTo": "IsEnabled"}
					},
					"classes": {
						"wrapClassName": ["rights-checkbox"]
					}
				}
			}, {
				"operation": "insert",
				"name": "SysAdminUnit",
				"parentName": "AdminRightsEditContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"focused": true,
					"enabled": {"bindTo": "IsEnabled"}
				}
			}, {
				"operation": "insert",
				"name": "SaveButton",
				"parentName": "AdminRightsEditContainer",
				"propertyName": "items",
				"values": {
					"click": {"bindTo": "onSave"},
					"caption": {"bindTo": "Resources.Strings.Save"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
					"enabled": {"bindTo": "IsEnabled"}
				}
			}, {
				"operation": "insert",
				"name": "CancelButton",
				"parentName": "AdminRightsEditContainer",
				"propertyName": "items",
				"values": {
					"click": {"bindTo": "onCancel"},
					"caption": {"bindTo": "Resources.Strings.Cancel"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.GRAY,
					"enabled": {"bindTo": "IsEnabled"}
				}
			}]
	};
});



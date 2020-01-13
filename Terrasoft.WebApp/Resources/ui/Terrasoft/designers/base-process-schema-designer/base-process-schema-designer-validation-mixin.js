/**
 */
Ext.define("Terrasoft.core.mixins.BaseProcessSchemaDesignerValidationMixin", {
	alternateClassName: "Terrasoft.BaseProcessSchemaDesignerValidationMixin",

	//region Methods: Private

	/**
	 * Shows validation message.
	 * @private
	 * @param {String} validationMessage Validation message.
	 * @param {Function} callback Callback function, called after user close message box.
	 * @param {Boolean} callback.success Validation result.
	 * @param {Object} scope Callback function execution context.
	 */
	showValidationMessage: function(validationMessage, callback, scope) {
		if (!Ext.isEmpty(validationMessage)) {
			this.showInformationDialog(validationMessage, function() {
				callback.call(scope, false);
			});
			return;
		}
		var schema = this.get("Schema");
		var validationResults = schema.getValidationResults();
		Terrasoft.each(validationResults, function(validationInfo) {
			var element = schema.findItemByUId(validationInfo.uId);
			if (element) {
				this.fireEvent("itemIsValidChanged", element);
			}
		}, this);
		var processValidationMessage = this.getProcessSchemaValidationMessage(validationResults);
		this.showSchemaValidationMessageBox(processValidationMessage, callback, scope);
	},

	/**
	 * Validates SubProcess element schema.
	 * @private
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The context of the callback function.
	 */
	validateSubProcessSchema: function(callback, scope) {
		this.getProcessModuleUtilities(function(utilities) {
			var chainActions = [];
			var schema = this.get("Schema");
			var consts = Terrasoft.process.constants;
			schema.flowElements.each(function(item) {
				var isSubProcess = item.managerItemUId === consts.SUBPROCESS_MANAGER_ITEM_UID;
				var hasSchema = item.schemaUId && !Terrasoft.isEmptyGUID(item.schemaUId);
				if (isSubProcess) {
					if (hasSchema) {
						chainActions.push(function(next) {
							var subProcessConfig = {
								schemaUId: item.schemaUId,
								hostProcessSchemaName: item.getDisplayValue()
							};
							utilities.getInvalidElements(subProcessConfig, function(response) {
								var invalidElements = response.message;
								item.setPropertyValue("isValid", !invalidElements);
								item.validationInfoCaption = invalidElements;
								next();
							}, scope);
						});
					} else {
						item.setPropertyValue("validationInfoCaption", null);
					}
				}
			});
			chainActions.push(callback);
			Terrasoft.chain.apply(scope, chainActions);
		}, this);
	},

	/**
	 * Validator column headers process.
	 * @private
	 * @param {String} value Column value.
	 * @param {Object} column Column view model on which the validation.
	 * @return {Object} Validation result.
	 * @return {String} return.invalidMessage Validation message.
	 */
	schemaCaptionValidator: function(value, column) {
		var result = {
			invalidMessage: ""
		};
		if (Ext.isEmpty(value)) {
			result.invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
		} else {
			var size = column.size;
			var valueSize = value.length;
			if (valueSize > size) {
				var message = Terrasoft.Resources.BaseViewModel.columnIncorrectTextRangeValidationMessage;
				message += " (" + valueSize + "/" + size + ")";
				result.invalidMessage = message;
			}
		}
		return result;
	},

	/**
	 * Returns validation message by validation info object.
	 * @private
	 * @param {Object[]} itemsValidationInfo Array of items validation info
	 * (see {@link Terrasoft.ProcessSchema#forceGetItemValidationInfo}).
	 * @return {String} Validation message.
	 */
	getProcessSchemaValidationMessage: function(itemsValidationInfo) {
		var schemaInvalidElementsMessageTemplate =
			Terrasoft.Resources.ProcessSchemaDesigner.Messages.SchemaInvalidElementsMessageTemplate;
		var messages = itemsValidationInfo.map(function(itemValidationInfo) {
			return " - " + itemValidationInfo.displayValue;
		}, this);
		var invalidElements = messages.join("\n");
		return Terrasoft.getFormattedString(schemaInvalidElementsMessageTemplate, invalidElements);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Sets viewModel validation config.
	 * @protected
	 */
	setValidationConfig: function() {
		this.addColumnValidator("SchemaCaption", this.schemaCaptionValidator);
		this.addColumnValidator("Schema", this.validateSchema);
	},

	/**
	 * Add validator for specified column.
	 * @protected
	 * @param {String} columnName Column name for validation.
	 * @param {Function} validatorFn validation function.
	 */
	addColumnValidator: function(columnName, validatorFn) {
		var columnValidationConfig = this.validationConfig[columnName] ||
			(this.validationConfig[columnName] = []);
		columnValidationConfig.push(validatorFn);
	},

	/**
	 * Validate process schema.
	 * @protected
	 * @return {Object} Process schema validation info.
	 * @return {String} return.invalidMessage Validation message.
	 */
	validateSchema: function() {
		var schema = this.get("Schema");
		var isValid = schema.validate();
		var validationInfo = {
			invalidMessage: ""
		};
		if (isValid !== true) {
			validationInfo.isCustomMessage = true;
			validationInfo.invalidMessage =
				Terrasoft.Resources.ProcessSchemaDesigner.Messages.InvalidProcessSchemaMessage;
		}
		return validationInfo;
	},

	/**
	 * Shows schema validation message box.
	 * @protected
	 * @param {String} validationMessage Validation message.
	 * @param {Function} callback Callback function, called after user close message box.
	 * @param {Function} callback.doSave Whether to save the schema.
	 * @param {Object} scope Callback function execution context.
	 */
	showSchemaValidationMessageBox: function(validationMessage, callback, scope) {
		var schema = this.get("Schema");
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
		var typeCaption = schema.typeCaption.toLowerCase();
		var caption = Ext.String.format(resources.SchemaValidationMessageCaption, typeCaption);
		var saveButtonCaption = Ext.String.format(resources.SaveInvalidProcessButtonCaption, schema.typeCaption);
		var saveProcessButton = Terrasoft.getBlueButtonConfig("SaveProcess", saveButtonCaption);
		Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
			caption: caption,
			message: validationMessage,
			buttons: [saveProcessButton, Terrasoft.MessageBoxButtons.CANCEL],
			defaultButton: 0,
			handler: function(returnCode) {
				var doSave = returnCode === "SaveProcess";
				callback.call(scope, doSave);
			},
			scope: this
		});
	}

	//endregion

});

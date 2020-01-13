/**
 */
Ext.define("Terrasoft.manager.ProcessSchemaDesignerUtilities", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ProcessSchemaDesignerUtilities",
	singleton: true,

	/**
	 * Returns image Url.
	 * @param {String} imageName Image name.
	 * @return {String}
	 */
	getCoreImageUrl: function(imageName) {
		return Terrasoft.ImageUrlBuilder.getUrl({
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: "Terrasoft.Nui",
				resourceItemName: "ProcessSchemaDesigner." + imageName
			}
		});
	},

	/**
	 * Returns dataValueType image Url.
	 * @param {Terrasoft.DataValueType} dataValueType DataValueType.
	 * @return {String}
	 */
	getDataValueTypeImageUrl: function(dataValueType) {
		var imageName = Terrasoft.getImageNameByDataValueType(dataValueType);
		return this.getCoreImageUrl(imageName);
	},

	/**
	 * Returns element caption.
	 * @param {Terrasoft.ProcessBaseElementSchema} element Process schema element.
	 * @return {String}
	 */
	getElementCaption: function(element) {
		if (!element) {
			return null;
		}
		var elementCaption = element.caption;
		if (elementCaption instanceof Terrasoft.LocalizableString) {
			elementCaption = elementCaption.getValue();
		}
		elementCaption = elementCaption || element.name;
		return elementCaption;
	},

	/**
	 * Adds parameter mask.
	 * @param {String} value Value.
	 * @return {String} Value in business process engine format.
	 */
	addParameterMask: function(value) {
		var constants = Terrasoft.process.constants;
		return constants.LEFT_MACROS_BRACKET + value + constants.RIGHT_MACROS_BRACKET;
	},

	/**
	 * Removes parameter mask.
	 * @param {String} value Macros value.
	 * @returns {String} Macros without mask.
	 */
	removeParameterMask: function(value) {
		return value.slice(2, -2);
	},

	/**
	 * Returns UId of the package.
	 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
	 * @return {String}
	 */
	getPackageUId: function(element) {
		var parentSchema = element.parentSchema;
		return parentSchema.packageUId;
	},

	/**
	 * Returns modal box settings.
	 * @return {Object} Modal box settings.
	 */
	getModalBoxConfig: function() {
		return {
			heightPixels: 800,
			widthPixels: 1280,
			boxClasses: ["formula-modal-box"]
		};
	},

	/**
	 * Returns modal box settings.
	 * @return {Object} Modal box settings.
	 */
	getDateTimeModalBoxConfig: function() {
		return {
			heightPixels: 230,
			widthPixels: 460,
			boxClasses: ["date-time-modal-box"]
		};
	},

	/**
	 * Returns config object of controls to display message box.
	 * @param {String} message Message.
	 * @private
	 * @return {Object} config.
	 */
	getProcessMessageBoxControlConfig: function(message) {
		var controlConfig = {
			memo: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: message,
				customConfig: {
					className: "Terrasoft.MemoEdit",
					height: "235px",
					readonly: true,
					markerValue: "validationMessage"
				}
			}
		};
		return controlConfig;
	},

	/**
	 * Shows dialog window.
	 * @param {Object} cfg Configuration object
	 * @param {String} cfg.caption Window caption.
	 * @param {String} cfg.message Window message.
	 * @param {String} cfg.customWrapClass Custom wrap class.
	 * @param {Object} cfg.controlConfig Custom control elements configuration.
	 * Example:
	 {
		 link: {
			 dataValueType: Terrasoft.DataValueType.TEXT,
			 caption: 'Text',
			 value: 'Text'
		 },
		 checkbox: {
			 dataValueType: Terrasoft.DataValueType.BOOLEAN,
			 caption: 'Boolean',
			 value: true
		 },
		 date: {
			 dataValueType: Terrasoft.DataValueType.DATE,
			 caption: 'Date',
			 value: new Date(Date.now())
		 }
	 * @param  {Array} cfg.buttons Control buttons array, {@link Terrasoft.MessageBox#buttons}.
	 * Example:
	 * buttons: ['yes', 'no', {
			 *	className: 'Terrasoft.Button',
			 *	returnCode: 'customButton',
			 *	style: 'green',
			 *	caption: 'myButton'
			 * }]
	 * @param {Number} cfg.defaultButton Buttons array index for default button. Numeration starts from zero.
	 * @param {Function} cfg.handler ESC button press handler.
	 * @param {Object} cfg.scope Handler execution context.
	 * @param {Terrasoft.controls.MessageBoxEnums.Styles} cfg.style Control element style.
	 */
	showProcessMessageBox: function(cfg) {
		if (cfg.message) {
			cfg.customWrapClass = cfg.customWrapClass || "ts-process-message-box";
			cfg.controlConfig = cfg.controlConfig || this.getProcessMessageBoxControlConfig(cfg.message);
		}
		Terrasoft.utils.showMessage(cfg);
	},

	/**
	 * Returns parameter value source.
	 * @param {Object} parameterValue parameter source value.
	 * @return {Terrasoft.process.enums.ProcessSchemaParameterValueSource}
	 */
	getParameterValueSource: function(parameterValue) {
		var value = parameterValue || {};
		return value.source || Terrasoft.ProcessSchemaParameterValueSource.None;
	},

	/**
	 * Checks whether parameter value is mapping.
	 * @param {Object} parameterValue parameter source value.
	 * @return {Boolean}
	 */
	getIsMappingParameterValue: function(parameterValue) {
		var valueSource = this.getParameterValueSource(parameterValue);
		var noneMappingValues = [
			Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
			Terrasoft.ProcessSchemaParameterValueSource.None
		];
		return !Terrasoft.contains(noneMappingValues, valueSource);
	},

	/**
	 * Checks if elements can be removed, if not invalid remove dialog will be shown.
	 * @param {Terrasoft.BaseProcessSchema} schema Process schema tha invokes deletion.
	 * @param {Array} elements Process elements to check.
	 * @param {Function} callback Callback after check or dialog ends.
	 * @param {Object} scope Callback scope.
	 */
	validateElementRemoval: function(schema, elements, callback, scope) {
		this.processRemovalConfig(schema.canRemoveElements(elements), callback, scope);
	},

	/**
	 * Checks if parameter can be removed, if not invalid remove dialog will be shown.
	 * @param {Terrasoft.BaseProcessSchema} schema Process schema tha invokes deletion.
	 * @param {Object} parameter Process element parameter to check.
	 * @param {Function} callback Callback after check or dialog ends.
	 * @param {Object} scope Callback scope.
	 */
	validateParameterRemoval: function(schema, parameter, callback, scope) {
		this.processRemovalConfig(schema.canRemoveParameter(parameter), callback, scope);
	},

	/**
	 * Processes removal config.
	 * @private
	 * @param {Object} config Removal config.
	 * @param {Function} callback Callback of the check.
	 * @param {Object} scope Callback scope.
	 */
	processRemovalConfig: function(config, callback, scope) {
		if (config.canRemove) {
			callback.call(scope, true);
		} else {
			this.showInvalidRemoveDialog(config.validationInfo, function() {
				callback.call(scope, false);
			}, scope);
		}
	},

	/**
	 * Checks if lazy properties are loaded, if not lazy load dialog will be shown.
	 * @param {Terrasoft.BaseProcessSchema} schema Process schema tha invokes check.
	 * @param {Function} callback Callback after check or dialog ends.
	 * @param {Object} scope Callback scope.
	 */
	validateAllLazyPropertiesAreLoaded: function(schema, callback, scope) {
		if (schema.getAllLazyPropertiesAreLoaded()) {
			callback.call(scope, true);
		} else {
			this.showLoadLazyParametersDialog(schema, callback, scope);
		}
	},

	/**
	 * Shows schema lazy load dialog.
	 * @private
	 * @param {Terrasoft.BaseProcessSchema} schema Process schema tha invokes deletion.
	 * @param {Function} callback Handler for dialog events. Called after default dialog handler.
	 * @param {Object} scope Scope for dialog handler.
	 */
	showLoadLazyParametersDialog: function(schema, callback, scope) {
		var message = Terrasoft.Resources.ProcessSchemaDesigner.Messages.LazyLoadMessage;
		Terrasoft.utils.showConfirmation(message, function(returnCode) {
			if (returnCode === "yes") {
				var bodyMaskId = Terrasoft.Mask.show({timeout: 0});
				schema.loadAllLazyProperties(function() {
					Terrasoft.Mask.hide(bodyMaskId);
					Ext.callback(callback, scope, [true]);
				}, schema);
			} else {
				Ext.callback(callback, scope, [false]);
			}
		}, ["yes", "no"], this, {defaultButton: 0});
	},

	/**
	 * Shows invalid remove dialog.
	 * @private
	 * @param {String} validationInfo Error text message.
	 * @param {Function} callback Handler for dialog events.
	 * @param {Object} scope Scope for dialog handler.
	 */
	showInvalidRemoveDialog: function(validationInfo, callback, scope) {
		this.showProcessMessageBox({
			caption: Terrasoft.Resources.ProcessSchemaDesigner.Messages.InvalidRemoveElement,
			message: validationInfo,
			handler: callback,
			scope: scope
		});
	},

	/**
	 * Returns flag that indicates if parameter value has mapping.
	 * @param {Object} value Parameter value
	 * @returns {Boolean}
	 */
	hasMapping: function(value) {
		if (value && value.source) {
			var SourceEnum = Terrasoft.ProcessSchemaParameterValueSource;
			return value.source !== SourceEnum.None && value.source !== SourceEnum.ConstValue;
		}
		return false;
	},

	/**
	 * Mapping field validator.
	 * @param {Object} value Mappign value.
	 * @returns {{invalidMessage: string}}
	 */
	mappingValidator: function(value) {
		var result = {invalidMessage: ""};
		if (value && value.isValid === false && Terrasoft.ProcessSchemaDesignerUtilities.hasMapping(value)) {
			var messages = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
			result.invalidMessage = messages.InavalidMappingColumn || "Invalid formula";
		}
		return result;
	}

});

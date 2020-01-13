Ext.ns('Terrasoft.utils.controls');

/**
 * @singleton
 */

/**
 * Returns the configuration object to create the control by data type
 * @param {Terrasoft.DataValueType} dataValueType The data type for which the editor is created.
 * @return {Object} The configuration object of the control.
 */
Terrasoft.utils.controls.getControlConfigByDataValueType = function(dataValueType) {
	var controlConfig;
	switch (dataValueType) {
		case Terrasoft.DataValueType.TEXT:
			controlConfig = {
				className: 'Terrasoft.TextEdit'
			};
			break;
		case Terrasoft.DataValueType.INTEGER:
			controlConfig = {
				className: 'Terrasoft.IntegerEdit'
			};
			break;
		case Terrasoft.DataValueType.FLOAT:
			controlConfig = {
				className: 'Terrasoft.FloatEdit'
			};
			break;
		case Terrasoft.DataValueType.MONEY:
			controlConfig = {
				className: 'Terrasoft.FloatEdit',
				decimalPrecision: 2
			};
			break;
		case Terrasoft.DataValueType.DATE:
			controlConfig = {
				className: 'Terrasoft.DateEdit'
			};
			break;
		case Terrasoft.DataValueType.TIME:
			controlConfig = {
				className: 'Terrasoft.TimeEdit'
			};
			break;
		case Terrasoft.DataValueType.LOOKUP:
			controlConfig = {
				className: 'Terrasoft.LookupEdit'
			};
			break;
		case Terrasoft.DataValueType.ENUM:
			controlConfig = {
				className: 'Terrasoft.ComboBoxEdit'
			};
			break;
		case Terrasoft.DataValueType.BOOLEAN:
			controlConfig = {
				className: 'Terrasoft.CheckBoxEdit'
			};
			break;
		case Terrasoft.DataValueType.GUID:
		case Terrasoft.DataValueType.DATE_TIME:
		case Terrasoft.DataValueType.BLOB:
			controlConfig = null;
			break;
	}
	return Ext.apply({}, controlConfig);
};

/**
 * short notation for {@link Terrasoft.utils.controls#getControlConfigByDataValueType}
 * @member Terrasoft
 * @method getControlConfigByDataValueType
 * @inheritDoc Terrasoft.utils.controls#getControlConfigByDataValueType
 */
Terrasoft.getControlConfigByDataValueType = Terrasoft.utils.controls.getControlConfigByDataValueType;

/**
 * Returns instance of spinner.
 * @param {String} extraComponentClasses Extra component classes.
 * @param [String] customSpinnerClassName Spinner class name.
 * @return {Terrasoft.BaseSpinner} The instance of spinner.
 */
Terrasoft.utils.controls.getSpinner = function(extraComponentClasses, customSpinnerClassName) {
	let spinnerClassName = "Terrasoft.ProgressSpinner";
	if (Terrasoft.Features.getIsEnabled("UseAnimationSpinner")) {
		spinnerClassName = customSpinnerClassName || "Terrasoft.BubbleSpinner";
	}
	return Ext.create(spinnerClassName, {
		extraComponentClasses: extraComponentClasses
	});
};

/**
 * short notation for {@link Terrasoft.utils.controls#getSpinner}
 * @member Terrasoft
 * @method getSpinner
 * @inheritDoc Terrasoft.utils.controls#getSpinner
 */
Terrasoft.getSpinner = Terrasoft.utils.controls.getSpinner;

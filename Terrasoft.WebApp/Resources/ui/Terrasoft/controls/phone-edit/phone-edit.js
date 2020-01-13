/**
 * Class for entering phone numbers.
 */
Ext.define("Terrasoft.controls.PhoneEdit", {
	alternateClassName: "Terrasoft.PhoneEdit",
	extend: "Terrasoft.BaseEdit",

	mixins: {
		/**
		 * The rendering object of the left icon for {@link Terrasoft.PhoneEdit}.
		 */
		leftIcon: "Terrasoft.LeftIcon",

		/**
		 * The rendering object of the right icon for {@link Terrasoft.PhoneEdit}.
		 */
		rightIcon: "Terrasoft.RightIcon"
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.LeftIcon#enableLeftIcon
	 */
	enableLeftIcon: true,

	/**
	 * @override
	 * @inheritdoc Terrasoft.RightIcon#enableRightIcon
	 */
	enableRightIcon: true,

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseEdit#inputType
	 */
	inputType: "tel",

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseEdit#direction
	 */
	direction: "ltr",

	/**
	 * @override
	 * @inheritdoc Terrasoft.baseedit#init
	 */
	init: function() {
		this.callParent(arguments);
		this.mixins.rightIcon.init.apply(this, arguments);
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.baseedit#getBindConfig
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var leftIconConfig = this.mixins.leftIcon.getBindConfig();
		var rightIconConfig = this.mixins.rightIcon.getBindConfig();
		Ext.apply(bindConfig, leftIconConfig);
		Ext.apply(bindConfig, rightIconConfig);
		return bindConfig;
	}
});

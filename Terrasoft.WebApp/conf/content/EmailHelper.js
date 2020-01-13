Terrasoft.configuration.Structures["EmailHelper"] = {innerHierarchyStack: ["EmailHelper"]};
define("EmailHelper", ["ext-base", "terrasoft", "EmailHelperResources"],
		function(Ext, Terrasoft, resources) {

			/**
			 * @class Terrasoft.configuration.EmailHelper
			 * Utilities class email validation.
			 */
			Ext.define("Terrasoft.configuration.EmailHelper", {
				extend: "Terrasoft.BaseObject",
				alternateClassName: "Terrasoft.EmailHelper",

				singleton: true,

				/**
				 * Email pattern.
				 * @protected
				 * @type {String}
				 */
				emailPattern: "[а-яА-Яa-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[а-яА-Яa-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)" +
					"*@(?:[а-яА-Яa-zA-Z0-9](?:[а-яА-Яa-zA-Z0-9-]*[а-яА-Яa-zA-Z0-9])?\\.)+[а-яА-Яa-zA-Z0-9]" +
					"(?:[а-яА-Яa-zA-Z0-9-]*[а-яА-Яa-zA-Z0-9])?",

				/**
				 * Single email pattern.
				 * @protected
				 * @type {String}
				 */
				singleEmailPattern: "^[а-яА-Яa-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[а-яА-Яa-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)" +
					"*@(?:[а-яА-Яa-zA-Z0-9](?:[а-яА-Яa-zA-Z0-9-]*[а-яА-Яa-zA-Z0-9])?\\.)+[а-яА-Яa-zA-Z0-9]" +
					"(?:[а-яА-Яa-zA-Z0-9-]*[а-яА-Яa-zA-Z0-9])?$",

				/**
				 * System settings email pattern.
				 * @private
				 * @type {String}
				 */
				sysSettingsEmailPattern: null,

				/**
				 * System settings single email pattern.
				 * @private
				 * @type {String}
				 */
				sysSettingsSingleEmailPattern: null,

				/**
				 * Email domain pattern.
				 * @protected
				 * @type {String}
				 */
				emailDomainPattern: "^([-\\a-zA-Zа-яА-Я0-9]+\\.)+[\\a-zA-Zа-яА-Я0-9]{2,}$",

				/**
				 * Email login pattern.
				 * @protected
				 * @type {String}
				 */
				emailLoginPattern: "^[a-zA-Zа-яА-Я0-9._-]+$",

				/**
				 * Email with name pattern.
				 */
				emailWithNamePattern: "{0} <{1}>",

				/**
				 * Creates email helper module.
				 * @overridden
				 */
				constructor: function() {
					this.callParent(arguments);
					this.init();
				},

				/**
				 * Initializes email helper module.
				 */
				init: function() {
					Terrasoft.SysSettings.querySysSettings(["EmailPattern"], function(sysSettings) {
						if (!Ext.isEmpty(sysSettings.EmailPattern)) {
							this.emailPattern = this.sysSettingsEmailPattern = sysSettings.EmailPattern;
							this.singleEmailPattern =
									this.sysSettingsSingleEmailPattern = Ext.String.format("^{0}$", sysSettings.EmailPattern);
						}
					}, this);
				},

				/**
				 * Validates email address.
				 * @param {String} emailAddress Email address.
				 */
				isEmailAddress: function(emailAddress) {
					if (Ext.isEmpty(emailAddress)) {
						return false;
					}
					var matcher = new RegExp(this.sysSettingsSingleEmailPattern || this.singleEmailPattern);
					return matcher.test(emailAddress);
				},

				/**
				 * Validates email domain.
				 * @param {String} emailDomain Email domain.
				 */
				isEmailDomain: function(emailDomain) {
					if (Ext.isEmpty(emailDomain)) {
						return false;
					}
					var matcher = new RegExp(this.emailDomainPattern);
					return matcher.test(emailDomain);
				},

				/**
				 * Validates email login.
				 * @param {String} emailLogin Email login.
				 */
				isEmailLogin: function(emailLogin) {
					if (Ext.isEmpty(emailLogin)) {
						return false;
					}
					var matcher = new RegExp(this.emailLoginPattern);
					return matcher.test(emailLogin);
				},

				/**
				 * Extracts email address from string.
				 * @param {String} emailAddressString Email address sting.
				 * @return {String[]} Match array.
				 */
				getEmailAddresses: function(emailAddressString) {
					var matcher = new RegExp(this.sysSettingsEmailPattern || this.emailPattern);
					return matcher.exec(emailAddressString);
				},

				/**
				 * Returns email url.
				 * @param {String} emailAddress Email.
				 * @return {String} Email url.
				 */
				getEmailUrl: function(emailAddress) {
					if (this.isEmailAddress(emailAddress)) {
						return "mailto:" + emailAddress;
					}
					return "";
				},

				/**
				 * Handler for email url click.
				 * @param {String} emailAddress Email address.
				 */
				onEmailUrlClick: function(emailAddress) {
					var url = this.getEmailUrl(emailAddress);
					if (!Ext.isEmpty(url)) {
						var win = window.open(url, "", "height=1,width=1");
						setTimeout(function() {
							win.close();
						}, 1000);
					}
				},

				/**
				 * Email validator.
				 * @protected
				 * @param {Object} value Column attribute value.
				 * @return {Object} Validation email object.
				 */
				getEmailValidator: function(value) {
					return {
						invalidMessage: (value && !Terrasoft.EmailHelper.isEmailAddress(value))
								? resources.localizableStrings.WrongEmailFormat
								: ""
					};
				},

				/**
				 * Get email with name or email.
				 * @protected
				 * @param {String} email Email.
				 * @param {Object|String} [name] Email dispaly value.
				 * @return {String} Email with name.
				 */
				getEmailWithName: function(email, name) {
					var displayValue = Ext.isObject(name) ? name.displayValue : name;
					return (displayValue ? Ext.String.format(this.emailWithNamePattern, displayValue, email) : email);
				}
			});

			return Terrasoft.EmailHelper;
		});



Terrasoft.configuration.Structures["TimezoneMixin"] = {innerHierarchyStack: ["TimezoneMixin"]};
define("TimezoneMixin", ["TimezoneUtils", "TimezoneMixinResources"],
	function(TimezoneUtils, Resources) {
		/**
		 * @class Terrasoft.configuration.mixins.TimezoneMixin
		 * Time Zone mixin.
		 */
		Ext.define("Terrasoft.configuration.mixins.TimezoneMixin", {
			alternateClassName: "Terrasoft.TimezoneMixin",

			/**
			 * Initialize mixin.
			 * @param {Guid} [contactId] (optional) Identification of the contact.
			 */
			init: function(contactId) {
				this.set("TimeZoneCaption", null);
				this.set("TimeZoneCity", null);
				this.set("TimeZoneTip", Resources.localizableStrings.TipContentWithoutTimeZone);
				this.set("IsEmptyTimeZone", true);
				this.set("ShowTimeZone", true);
				contactId = contactId || this.get("PrimaryColumnValue");
				if (contactId) {
					this.Terrasoft.chain(
							this.setContactTimeConfig.bind(this, contactId),
							this.initTimeZoneParameters,
							this
					);
				}
			},

			/**
			 * Sets taken config.
			 * @param {String} contactId Id of contact.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 * @private
			 */
			setContactTimeConfig: function(contactId, callback, scope) {
				TimezoneUtils.getContactCurrentTime(contactId, function(contactTimeConfig) {
					var isValid = this.isConfigValid(contactTimeConfig);
					if (isValid) {
						this.set("ContactTimeConfig", contactTimeConfig);
						if (callback && this.Ext.isFunction(callback)) {
							callback.call(scope);
						}
					} else {
						this.log(Resources.localizableStrings.ContactTimeConfigInvalidFormatException,
								Terrasoft.LogMessageType.WARNING);
					}
				}, this);
			},

			/**
			 * Validates config.
			 * @param {Object} config Config for validate.
			 * @return {Boolean} Returns result of validation.
			 * @private
			 */
			isConfigValid: function(config) {
				var result = Boolean(config && true);
				result = result && Boolean(config.time);
				result = result && (config.equals !== undefined);
				return result;
			},

			/**
			 * Initialize timezone parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 * @private
			 */
			initTimeZoneParameters: function(callback, scope) {
				this.setTimeZoneValue();
				this.setTimeZoneCity();
				this.setNotEqualsTimeZone();
				this.set("IsEmptyTimeZone", false);
				if (callback && this.Ext.isFunction(callback)) {
					callback.call(scope);
				}
			},

			/**
			 * Sets timezone city to view model.
			 * @private
			 */
			setTimeZoneCity: function() {
				var contactTimeConfig = this.get("ContactTimeConfig");
				var city = contactTimeConfig.location;
				if (city) {
					this.set("TimeZoneCity", city);
				}
			},

			/**
			 * Sets timezone value to view model.
			 * @private
			 */
			setTimeZoneValue: function() {
				var contactTimeConfig = this.get("ContactTimeConfig");
				var time = this.Ext.Date.format(contactTimeConfig.time,
						this.Terrasoft.Resources.CultureSettings.timeFormat);
				var formattedgmt = this.getFormattedGmt(contactTimeConfig.time);
				var templateFormat = formattedgmt ? "{0} {1}," : "{0},";
				var timeZone = this.Ext.String.format(templateFormat, time, formattedgmt);
				this.set("TimeZoneCaption", timeZone);
				this.set("TimeZoneTip",  this.Ext.String.format(Resources.localizableStrings.TipContentWithTimeZone,
						time, contactTimeConfig.timeZone));
			},

			/**
			 * Returns formatted gmt.
			 * @param {Date} contactTime Time of contact.
			 * @return {String} Formatted gmt.
			 */
			getFormattedGmt: function(contactTime) {
				var result = "";
				var additionalDay = Resources.localizableStrings.ContractionDay;
				var currentTime = new Date();
				if (currentTime.getDate() !== contactTime.getDate()) {
					var sign = (currentTime > contactTime) ? "-" : "+";
					result = this.Ext.String.format("{0}1{1}", sign, additionalDay);
				}
				return result;
			},

			/**
			 * Sets flag of equals time to view model.
			 * @private
			 */
			setNotEqualsTimeZone: function() {
				var contactTimeConfig = this.get("ContactTimeConfig");
				var isEquals = contactTimeConfig && contactTimeConfig.equals;
				this.set("ShowTimeZone", !isEquals);
			}
		});

		return Terrasoft.TimezoneMixin;
	});



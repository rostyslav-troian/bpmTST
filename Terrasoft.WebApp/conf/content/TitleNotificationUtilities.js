Terrasoft.configuration.Structures["TitleNotificationUtilities"] = {innerHierarchyStack: ["TitleNotificationUtilities"]};
define("TitleNotificationUtilities", ["TitleNotificationUtilitiesResources"],
		function(resources) {
			return Ext.define("Terrasoft.configuration.mixins.TitleNotificationUtilities", {
				alternateClassName: "Terrasoft.TitleNotificationUtilities",

				//region Properties: Private

				/**
				 * The value of the header attribute.
				 * @private
				 * @type {String}
				 */
				attribute: "title",

				/**
				 * The value of the tab header by default.
				 * @private
				 * @type {String}
				 */
				defaultValue: null,

				/**
				 * The value of the tab header with notification.
				 * @private
				 * @type {String}
				 */
				notificationValue: null,

				/**
				 * Identifier of blink.
				 * @private
				 * @type {Number}
				 */
				blinkIdentificator: null,

				/**
				 * The repeat count of blink.
				 * @private
				 * @type {Number}
				 */
				counter: 0,

				//endregion

				//region Properties: Protected

				/**
				 * The intervals (in milliseconds) on how often to execute the blink.
				 * @protected
				 * @type {Number}
				 */
				blinkInterval: 1000,

				/**
				 * The number of repetitions.
				 * @protected
				 * @type {Number}
				 */
				blinkIterator: null,

				/**
				 * The state visibility of the tab.
				 * @protected
				 * @type {Boolean}
				 */
				vilibilityState: true,

				//endregion

				//region Methods: Private

				/**
				 * Sets value of the attribute.
				 * @private
				 */
				setAttributeValue: function(value) {
					if (this.Ext.isEmpty(value)) {
						value = this.defaultValue;
					}
					var dom = this.getDom();
					dom[this.attribute] = value;
				},

				/**
				 * Returns value of the attribute.
				 * @private
				 * @return {String}
				 */
				getAttributeValue: function() {
					var dom = this.getDom();
					return dom[this.attribute];
				},

				/**
				 * Returns the dom.
				 * @private
				 * @return {Object}
				 */
				getDom: function() {
					return this.Ext.getDoc().dom;
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritDoc Terrasoft.BaseSchemaModule#init
				 * @overridden
				 */
				init: function() {
					this.defaultValue = this.getAttributeValue();
					this.Ext.EventManager.addListener(window, "focus", this.onFocus.bind(this));
					this.Ext.EventManager.addListener(window, "blur", this.onBlur.bind(this));
				},

				/**
				 * The event handler when an window gets focus.
				 * @protected
				 */
				onFocus: function() {
					this.vilibilityState = true;
					this.stopBlink();
				},

				/**
				 * The event handler when an window loses focus.
				 * @protected
				 */
				onBlur: function() {
					this.vilibilityState = false;
				},

				/**
				 * Blink title.
				 * @protected
				 */
				blink: function() {
					var currentValue = this.getAttributeValue();
					var value = currentValue === this.defaultValue ? this.notificationValue : this.defaultValue;
					if (!this.Ext.isEmpty(this.blinkIterator)) {
						if (this.blinkIterator === this.counter) {
							this.stopBlink();
							return;
						}
						this.counter++;
					}
					this.setAttributeValue(value);
				},

				//endregion

				//region Methods: Public

				/**
				 * Starts blink title.
				 * @public
				 */
				startBlink: function() {
					if (this.vilibilityState) {
						return;
					}
					if (!this.Ext.isEmpty(this.blinkIdentificator)) {
						this.stopBlink();
					}
					var self = this;
					this.blinkIdentificator = setInterval(function() {
						self.blink.call(self);
					}, this.blinkInterval);
				},

				/**
				 * Stops blink title.
				 * @public
				 */
				stopBlink: function() {
					clearInterval(this.blinkIdentificator);
					this.setAttributeValue();
					this.blinkIdentificator = null;
					this.counter = 0;
				},

				/**
				 * Processor change the number of notifications.
				 * @public
				 * @param {Number} number The number of notifications.
				 */
				onChangeNumberOfNotification: function(number) {
					if (number > 0) {
						this.notificationValue = this.Ext.String.format(resources.localizableStrings.TitleNotification,
								number);
					} else {
						this.notificationValue = null;
					}
				}

				//endregion

			});
		});



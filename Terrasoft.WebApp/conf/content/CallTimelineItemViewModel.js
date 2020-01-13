Terrasoft.configuration.Structures["CallTimelineItemViewModel"] = {innerHierarchyStack: ["CallTimelineItemViewModel"]};
define("CallTimelineItemViewModel", ["ConfigurationConstants", "CallTimelineItemViewModelResources",
		"BaseTimelineItemViewModel"
	],
	function(ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.CallTimelineItemViewModel
		 * Call timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.CallTimelineItemViewModel", {
			alternateClassName: "Terrasoft.CallTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Protected

			/**
			 * Returns dom attribute with call-direction state.
			 * @protected
			 * @return {Object} Dom attribute.
			 */
			getDomAttributeWithCallDirection: function() {
				return {
					"call-direction": this.isIncomingCall() ? "incoming" : "outgoing"
				};
			},

			/**
			 * Checks if call is incoming or not.
			 * @protected
			 * @return {Boolean} Incoming call - true, not incoming call -false.
			 */
			isIncomingCall: function() {
				var callDirection = this.get("Direction");
				return callDirection &&
					callDirection.value === ConfigurationConstants.Activity.ActivityCallDirection.Incoming;
			},

			/**
			 * Returns caller column name.
			 * @protected
			 * @return {String} Caller column name.
			 */
			getCallerColumnName: function() {
				return this.isIncomingCall() ? "Contact" : this.authorColumnAlias;
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.set("ShowAuthorIcon", true);
				this.set("UseAuthorCaption", true);
				this.initCaller();
			},

			/**
			 * Initializes caller columns.
			 * @protected
			 */
			initCaller: function() {
				var callerColumnName = this.getCallerColumnName();
				var caller = callerColumnName && this.get(callerColumnName);
				this.set("Caller", caller);
				this.set("CallerName", caller && caller.displayValue)
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#getEntityIconSrc
			 * @override
			 */
			getEntityIconSrc: function() {
				var callIcon = this.isIncomingCall()
					? this.get("Resources.Images.IncomingCallIcon")
					: this.get("Resources.Images.OutgoingCallIcon");
				if (callIcon) {
					return Terrasoft.ImageUrlBuilder.getUrl(callIcon);
				} else {
					return this.callParent();
				}
			},

			/**
			 * Handles click on record contact caption.
			 */
			onContactCaptionClick: function() {
				var contact = this.get("Contact");
				if (Ext.isObject(contact)) {
					this.openEntityCard(this.authorEntitySchemaName, contact.value);
				}
				return false;
			},

			/**
			 * Returns URL for receiving record caller photo.
			 * @return {String|null} Photo URL address if caller column and photo is defined, otherwise null.
			 */
			getCallerPhotoUrl: function() {
				var caller = this.get("Caller");
				if (!Ext.isEmpty(caller)) {
					return this.getImageUrlByColumn(caller);
				}
				return null;
			},

			/**
			 * Generates hyperlink URL for timeline contact entity.
			 * @return {String|null} URL address if contact column is defined, otherwise null.
			 */
			getContactUrl: function() {
				var contact = this.get("Contact");
				if (Ext.isObject(contact)) {
					return this.getEntityUrl(this.authorEntitySchemaName, contact.value, null);
				}
				return null;
			},

			/**
			 * Returns full duration text with seconds.
			 * @param {Number} duration Call duration number value.
			 * @return {String} Full duration text with seconds.
			 */
			getFullDurationText: function(duration) {
				return duration + " " + this.get("Resources.Strings.SecondsLabel");
			},

			/**
			 * Handles on contact link mouse over.
			 * @param {Object} target Target object.
			 */
			contactLinkMouseOver: function(target) {
				var contact = this.get("Contact");
				if (!Ext.isEmpty(this.authorEntitySchemaName) && !Ext.isEmpty(contact)) {
					this.showMiniPage({
						targetId: target.targetId,
						entitySchemaName: this.authorEntitySchemaName,
						recordId: contact.value
					});
				}
			}

			// endregion

		});
	});



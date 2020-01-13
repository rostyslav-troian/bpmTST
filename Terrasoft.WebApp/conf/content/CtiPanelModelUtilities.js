Terrasoft.configuration.Structures["CtiPanelModelUtilities"] = {innerHierarchyStack: ["CtiPanelModelUtilities"]};
define("CtiPanelModelUtilities", ["ConfigurationConstants", "CtiConstants", "NetworkUtilities",
		"CtiNotificationUtilities"],
	function(ConfigurationConstants, CtiConstants, NetworkUtilities, CtiNotificationUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.CtiPanelModelUtilities
		 * Mixin of ViewModel of cti panel.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.CtiPanelModelUtilities", {
			extend: "Terrasoft.core.BaseObject",
			alternateClassName: "Terrasoft.CtiPanelModelUtilities",

			// region Properties: Private
			/**
			 * CtiNotificationUtilities module.
			 */
			ctiNotificationUtilities: CtiNotificationUtilities,

			/**
			 * Class of media-element, indicating, that video-stream is used.
			 * @private
			 * @type {String}
			 */
			useVideoMediaElementClassName: "useVideo",

			/**
			 * Maximum duration of desktop popup notification.
			 * @private
			 * @type {Number}
			 */
			maximumNotificicationDuration: 40,

			/**
			 * Desktop popup notification tags.
			 * @private
			 * @type {Object}
			 */
			desktopNotificationTags: {
				identified: "identifiedCall",
				unidentified: "unidentifiedCall",
				all: ["identifiedCall", "unidentifiedCall"]
			},

			// endregion

			//region Methods: Private

			/**
			 * Returns the sign of possibility to perform current or consult call.
			 * @private
			 * @return {Boolean} true, if there is possibility to perform current or consult call. Otherwise - false.
			 */
			getCanMakeCallOrMakeConsultCall: function() {
				if (this.getCanCall()) {
					return true;
				}
				var isTransferPrepared = this.get("IsTransferPrepared");
				return isTransferPrepared && this.getCanMakeConsultCall();
			},

			/**
			 * Gets localized string from resources.
			 * @private
			 * @param {String} stringName Name of localized string.
			 * @return {String} Localized string.
			 */
			getResourceString: function(stringName) {
				return this.get("Resources.Strings." + stringName);
			},

			/**
			 * Gets localized image from resources.
			 * @private
			 * @param {String} imageName Name of localized image.
			 * @return {Object} Localized image.
			 */
			getResourceImage: function(imageName) {
				return this.get("Resources.Images." + imageName);
			},

			/**
			 * Initializes collections of identified subscribers.
			 * @private
			 */
			initializeSubscribersCollections: function() {
				var events = ["add", "remove", "dataLoaded", "clear"];
				var identifiedSubscribers = this.get("IdentifiedSubscriberPanelCollection");
				var identifiedConsultSubscribers = this.get("IdentifiedConsultSubscriberPanelCollection");
				var searchResultSubscribers = this.get("SearchResultPanelCollection");
				Terrasoft.each(events, function(eventName) {
					identifiedSubscribers.on(eventName, function() {
						this.onIdentifiedSubscribersChanged(identifiedSubscribers, false);
					}.bind(this));
					identifiedConsultSubscribers.on(eventName, function() {
						this.onIdentifiedSubscribersChanged(identifiedConsultSubscribers, true);
					}.bind(this));
					searchResultSubscribers.on(eventName, function() {
						this.onSearchResultSubscribersChanged(searchResultSubscribers);
					}.bind(this));
				}, this);
			},

			/**
			 * Clears number entering input.
			 * @private
			 */
			clearPhoneNumber: function() {
				this.set("PhoneNumber", "");
			},

			/**
			 * Makes call (current or consult) to number, specified in field PhoneNumber.
			 * @private
			 */
			callPhoneNumber: function() {
				var number = this.get("PhoneNumber");
				this.callByNumber(number);
			},

			/**
			 * Processes event of changing of value in phone number entering field.
			 * @private
			 * @param {String} value Current value in phone number entering field.
			 */
			onPhoneNumberChanged: function(value) {
				var oldValue = this.get("PhoneNumberOldValue");
				if (value === oldValue) {
					return;
				}
				this.set("PhoneNumberOldValue", value);
				this.$PhoneNumber = value;
				if (this.isSearchValueValid(value) && !this.isPhoneNumberValid(value)) {
					this.searchSubscriberByPrimaryColumnValue(value);
				} else {
					this.set("IsSearchFinishedAndResultEmpty", false);
					this.clearSearchSubscriber();
				}
			},

			/**
			 * Updates call duration.
			 * @private
			 */
			updateCallDuration: function() {
				var ctiModel = Terrasoft.CtiModel;
				var commutationStartedOn = ctiModel.get("CommutationStartedOn");
				var currentDate = new Date();
				var timeDifference = Ext.Date.getElapsed(currentDate, commutationStartedOn);
				var secondDifference = Math.floor(timeDifference / CtiConstants.TimeScale.MillisecondsInSecond);
				var minutes = Math.floor(secondDifference / CtiConstants.TimeScale.SecondsInMinute);
				if (minutes < CtiConstants.TimeScale.MinTwoDigitNumber) {
					minutes = "0" + minutes;
				}
				var seconds = secondDifference - (minutes * CtiConstants.TimeScale.SecondsInMinute);
				if (seconds < CtiConstants.TimeScale.MinTwoDigitNumber) {
					seconds = "0" + seconds;
				}
				var msg = Ext.String.format("{0}:{1}", minutes, seconds);
				ctiModel.set("CallDuration", msg);
			},

			/**
			 * Subscribers identification callback function on current/consult call number change.
			 * @private
			 * @param {String} number Subscribers number.
			 * @param {String} identifyPropertyName Name of model`s property by which identification was performed.
			 * @param {Object[]} subscribers Array of identified subscribers.
			 * @param {String} [collectionName] Name of the collection of identified subscribers.
			 * @param {String} [subscriberKeyName] Name of the property with the key of identified subscriber.
			 */
			identifySubscriberCallback: function(number, identifyPropertyName, subscribers, collectionName,
					subscriberKeyName) {
				if (number !== this.get(identifyPropertyName)) {
					return;
				}
				this.fillSubscribersCollection(subscribers, collectionName, subscriberKeyName);
			},

			/**
			 * Closes desktop popup notifications by tags.
			 * @private
			 * @param {Array} notificationTags Array of desktop popup notification tags.
			 */
			closePopupNotifications: function(notificationTags) {
				notificationTags.forEach(function(tag) {
					this.ctiNotificationUtilities.closeCallNotification(tag);
				}, this);
			},

			/**
			 * Creates desktop popup notification for incoming call.
			 * @private
			 * @param {String} tag Desktop popup notification tag.
			 * @param {Number} lifeTime Maximum duration of popup displaying (seconds).
			 * @param {String} body Text of the message.
			 * @param {Object} currentCall Current call info.
			 */
			createPopupNotification: function(tag, lifeTime, body, currentCall) {
				var self = this;
				if (currentCall && (currentCall.direction === Terrasoft.CallDirection.IN)) {
					self.ctiNotificationUtilities.showCallNotification(tag, body, "incoming", "incoming");
					setTimeout(function() {
						self.closePopupNotifications([tag]);
					}, lifeTime * CtiConstants.TimeScale.MillisecondsInSecond);
				}
			},

			/**
			 * Updates found subscribers.
			 * @param {Boolean} [isNextPageLoaded] Flag that indicates whether next subscribers page is loading.
			 * @private
			 */
			updateSearchResults: function(isNextPageLoaded) {
				var previousValue = this.get("PhoneNumber");
				if (previousValue !== "") {
					this.searchSubscriberByPrimaryColumnValue(previousValue, isNextPageLoaded);
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * Initializes the properties of the model on telephony connection.
			 * @protected
			 */
			initOnConnected: function() {
				var capabilities = this.getProviderCapabilities();
				/*jshint bitwise:false */
				this.set("IsVideoSupported",
					(capabilities.callCapabilities & Terrasoft.CallFeaturesSet.CAN_VIDEO) !== 0);
				/*jshint bitwise:true */
			},

			/**
			 * Returns sign of wide "End call" button.
			 * @protected
			 * @return {Boolean} Returns true, if wide "End call" button required.
			 */
			getIsDropButtonLong: function() {
				var buttonsCount = this.getCanAnswer() + this.getCanHoldOrUnhold() +
					this.getCanStartOrCompleteTransfer();
				return (buttonsCount < 2);
			},

			/**
			 * Returns configuration of the image for "Hang up" button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getDropButtonImageConfig: function() {
				var imageName = this.getIsDropButtonLong() ? "DropButtonLongIcon" : "DropButtonShortIcon";
				return this.getResourceImage(imageName);
			},

			/**
			 * Returns style for "Hang up" button.
			 * @protected
			 * @return {String} Style for "Hang up" button.
			 */
			getDropButtonStyle: function() {
				var style = this.getIsDropButtonLong() ? "call-button-long" : "call-button-middle";
				return style;
			},

			/**
			 * Returns configuration for image for "Unhold/hold call" button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getHoldButtonImageConfig: function() {
				var imageName;
				switch (true) {
					case this.getCanUnhold():
						imageName = "UnholdButtonIcon";
						break;
					case this.getCanHold():
						imageName = "HoldButtonIcon";
						break;
					default:
						imageName = "HoldButtonIconDisabled";
						break;
				}
				return this.getResourceImage(imageName);
			},

			/**
			 * Returns text for hint for "Unhold/hold call" button.
			 * @protected
			 * @return {String|*} Text of the hint.
			 */
			getHoldButtonHint: function() {
				var stringName = this.getCanUnhold() ? "UnholdButtonHint" : "HoldButtonHint";
				return this.getResourceString(stringName);
			},

			/**
			 * Returns URL of the image, if there are not records, matching search criterias.
			 * @protected
			 * @return {String} URL of the image, if there are not records, matching search criterias.
			 */
			getEmptySearchResultImageUrl: function() {
				var emptySearchResultImage = this.getResourceImage("EmptySearchResultImage");
				return Terrasoft.ImageUrlBuilder.getUrl(emptySearchResultImage);
			},

			/**
			 * Forms sign of visibility of container with found customers after searching.
			 * @protected
			 * @return {Boolean} Sign of visibility of container with found customers after searching.
			 */
			getIsSearchResultItemsListContainerVisible: function() {
				return (!this.get("IsSearchResultPanelCollectionEmpty") &&
					this.getCanMakeCallOrMakeConsultCallOrGetIsOffline());
			},

			/**
			 * Identifies visibility of calls history tab.
			 * @protected
			 * @return {Boolean} true, if there is no active call and there is no text in subscribers search field.
			 * Otherwise - false.
			 */
			getIsCommunicationHistoryVisible: function() {
				return (!this.getIsIdentificationGroupContainerVisible() &&
					this.get("IsSearchResultPanelCollectionEmpty") && !this.get("IsSearchFinishedAndResultEmpty") &&
					this.getCanMakeCallOrMakeConsultCallOrGetIsOffline());
			},

			/**
			 * Returns sign of possibility to perform DTMF dial.
			 * @protected
			 * @return {Boolean} true, if it is possible to perform DTMF dial. Otherwise - false.
			 */
			getCanMakeDtmf: function() {
				var isDtmfPrepared = this.get("IsDtmfPrepared");
				return (isDtmfPrepared && this.getCanDtmf());
			},

			/**
			 * Returns sign of possibility to initiate beginning of transfer or finish transfer.
			 * @protected
			 * @return {Boolean} true, if beginning of transfer or finish transfer is possible, otherwise - false.
			 */
			getCanStartOrCompleteTransfer: function() {
				var canStartOrCompleteTransfer = this.getCanMakeConsultCall() || this.getCanBlindTransfer() ||
					this.getCanTransfer();
				return canStartOrCompleteTransfer;
			},

			/**
			 * Returns configuration of the image for "Preparing to transfer" button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getPrepareTransferButtonImageConfig: function() {
				var imageName = !this.get("IsTransferPrepared")
					? "PrepareTransferButtonIcon"
					: "PrepareTransferButtonIconDisabled";
				return this.getResourceImage(imageName);
			},

			/**
			 * Identifies, are the "Dialpad", "Mute", "Disable video" buttons visible.
			 * @protected
			 * @return {Boolean} Is button visible.
			 */
			getIsAdditionalButtonsVisible: function() {
				//TODO #CC-213 #CC-347 #CC-348 Additional panel buttons.
				return this.getCanStartOrCompleteTransfer() || this.getCanHoldOrUnhold();
			},

			/**
			 * Returns configuration of the image for show/hide DTMF input field button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getDtmfButtonImageConfig: function() {
				var imageName = this.get("IsDtmfPrepared") ? "DtmfButtonIconPressed" : "DtmfButtonIcon";
				return this.getResourceImage(imageName);
			},

			/**
			 * Identifies, is "Mute" button visible.
			 * @protected
			 * @return {Boolean} Is button visible.
			 */
			getIsMuteButtonVisible: function() {
				return this.getIsAdditionalButtonsVisible();
			},

			/**
			 * Identifies, is "Mute" button enabled.
			 * @protected
			 * @return {Boolean} Is button enabled.
			 */
			getIsMuteButtonEnabled: function() {
				return this.getCanMute();
			},

			/**
			 * Returns configuration of the image for "Mute" button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getMuteButtonImageConfig: function() {
				var canMute = this.getIsMuteButtonEnabled();
				var imageName = canMute ? "MuteButtonIcon" : "MuteButtonIconDisabled";
				return this.getResourceImage(imageName);
			},

			/**
			 * Returns hint text for "Mute" button.
			 * @protected
			 * @return {String} Text of the hint.
			 */
			getMuteButtonHint: function() {
				var canMute = false;
				var stringName = canMute ? "MuteButtonHint" : "UnmuteButtonHint";
				return this.getResourceString(stringName);
			},

			/**
			 * Returns configuration of the image for "Disable video" button.
			 * @protected
			 * @return {Object} Configuration of the image.
			 */
			getVideoButtonImageConfig: function() {
				var imageName;
				var isVideoHidden = this.get("IsVideoHidden");
				var isVideoSupported = this.get("IsVideoSupported");
				if (!isVideoSupported) {
					imageName = "VideoOffButtonIconDisabled";
				} else {
					imageName = (isVideoHidden) ? "VideoOffButtonIcon" : "VideoOnButtonIcon";
				}
				return this.getResourceImage(imageName);
			},

			/**
			 * Returns text for the hint for "Disable video" button.
			 * @protected
			 * @return {String} Text of the hint.
			 */
			getVideoButtonHint: function() {
				var isVideoHidden = this.get("IsVideoHidden");
				var stringName = isVideoHidden ? "VideoOnButtonHint" : "VideoOffButtonHint";
				return this.getResourceString(stringName);
			},

			/**
			 * Returns image configuration with subscribers photo, if subscribers
			 * is not identified - returns icon of unidentified contact.
			 * @protected
			 * @param {String} tag Tag of the control element of photo in the identification panel.
			 * @param {String} collectionName (optional) Name of the collection of identified subscribers.
			 * @param {String} subscriberKeyName (optional) Name of property with key of identified subscriber.
			 * @return {Object} Configuration of the image.
			 */
			getSubscriberPhoto: function(tag, collectionName, subscriberKeyName) {
				var subscriberPanel = this.getIdentifiedSubscriberPanel(collectionName, subscriberKeyName);
				if (!subscriberPanel) {
					return this.getResourceImage("UnidentifiedSubscriberPhoto");
				}
				var photoId = subscriberPanel.get("Photo");
				if (subscriberPanel.get("Type") === CtiConstants.SubscriberTypes.Account) {
					return this.getResourceImage("AccountIdentifiedPhoto");
				}
				if (Ext.isEmpty(photoId) || this.Terrasoft.isEmptyGUID(photoId)) {
					return this.getResourceImage("ContactEmptyPhoto");
				}
				var photoConfig = {
					source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: "SysImage",
						columnName: "Data",
						primaryColumnValue: photoId
					}
				};
				return {
					source: Terrasoft.ImageSources.URL,
					url: Terrasoft.ImageUrlBuilder.getUrl(photoConfig)
				};
			},

			/**
			 * Returns configuration of the image with subscribers photo in consult call.
			 * @protected
			 * @param {String} tag Tag of the control element of photo in the identification panel.
			 * @return {Object} Configuration of the image.
			 */
			getConsultSubscriberPhoto: function(tag) {
				return this.getSubscriberPhoto(tag, "IdentifiedConsultSubscriberPanelCollection",
					"IdentifiedConsultSubscriberKey");
			},

			/**
			 * Returns information about subscriber by the tag of the control element in the identification block.
			 * @protected
			 * @param {String} tag Tag of element of control of customer identification.
			 * @param {String} collectionName (optional) Name of the collection of identifying subscribers.
			 * @param {String} subscriberKeyName (optional) Name of the property with the key of identified subscriber.
			 * @return {String} Subscriber info.
			 */
			getSubscriberData: function(tag, collectionName, subscriberKeyName) {
				var subscriberPanel = this.getIdentifiedSubscriberPanel(collectionName, subscriberKeyName);
				if (!subscriberPanel) {
					return "";
				}
				return subscriberPanel.get(tag) || "";
			},

			/**
			 * Returns information about subscriber by the tag of the control element in the identification block
			 * of the consult call.
			 * @protected
			 * @param {String} tag Tag of element of control of customer identification.
			 * @return {String} Subscriber info.
			 */
			getConsultSubscriberData: function(tag) {
				return this.getSubscriberData(tag, "IdentifiedConsultSubscriberPanelCollection",
					"IdentifiedConsultSubscriberKey");
			},

			/**
			 * Identifies, is the identification data visible by the tag of the control element in the
			 * identification block.
			 * @protected
			 * @param {String} tag Tag of element of control of customer identification.
			 * @param {String} collectionName (optional) Name of the collection of identifying subscribers.
			 * @param {String} subscriberKeyName (optional) Name of the property with the key of identified subscriber.
			 * @return {Boolean} Visibility of identification data.
			 */
			getIsInfoLabelVisible: function(tag, collectionName, subscriberKeyName) {
				var subscriberPanel = this.getIdentifiedSubscriberPanel(collectionName, subscriberKeyName);
				if (!subscriberPanel) {
					return false;
				}
				var identificationDataLabels = this.get("IdentificationDataLabels");
				var currentIdentificationDataLabels = identificationDataLabels[subscriberPanel.get("Type")];
				var isInfoLabelVisible = (!Ext.isEmpty(subscriberPanel.get(tag)) &&
					currentIdentificationDataLabels.indexOf(tag) !== -1);
				return isInfoLabelVisible;
			},

			/**
			 * Identifies, is the identification data visible by tag of control element in the identificational block
			 * of consult call.
			 * @protected
			 * @param {String} tag Tag of element of control of customer identification.
			 * @return {Boolean} Visibility of identification data.
			 */
			getIsConsultInfoLabelVisible: function(tag) {
				return this.getIsInfoLabelVisible(tag, "IdentifiedConsultSubscriberPanelCollection",
					"IdentifiedConsultSubscriberKey");
			},

			/**
			 * Identifies, is subscriber identified, depending on parameter value with the key of collection of
			 * identified subscribers.
			 * @private
			 * @param {String} keyValue Value of the key.
			 * @return {Boolean} Is subscriber identified.
			 */
			getIsSubscriberIdentified: function(keyValue) {
				return !Ext.isEmpty(keyValue);
			},

			/**
			 * Identifies, is subscriber unknown.
			 * @protected
			 * @return {Boolean} Is subscriber unknown.
			 */
			getIsSubscriberUnknown: function() {
				var identifiedSubscriberKey = this.get("IdentifiedSubscriberKey");
				return Ext.isEmpty(identifiedSubscriberKey) && this.getIsCallExists();
			},

			/**
			 * Identifies, is consult call subscriber unknown.
			 * @protected
			 * @return {Boolean} Is subscriber unknown.
			 */
			getIsConsultSubscriberUnknown: function() {
				var identifiedSubscriberKey = this.get("IdentifiedConsultSubscriberKey");
				return Ext.isEmpty(identifiedSubscriberKey) && this.get("IsConsulting");
			},

			/**
			 * Identifies, does call exist in the model.
			 * @protected
			 * @return {Boolean} true, if call exists. Otherwise - false.
			 */
			getIsCallExists: function() {
				return !Ext.isEmpty(this.get("CurrentCall"));
			},

			/**
			 * Get unique identifier from current call.
			 * @protected
			 * @return {Guid} Call unique identifier.
			 */
			getCurrentDatabaseUId: function() {
				const currentCall = this.get("CurrentCall");
				if (Terrasoft.isEmpty(currentCall)) {
					return Terrasoft.emptyString;
				}
				return currentCall.databaseUId || Terrasoft.emptyString;
			},

			/**
			 * @inheritdoc Terrasoft.CtiModel#callStarted
			 * @protected
			 */
			getIsCallDurationVisible: function() {
				return !Ext.isEmpty(this.get("CommutationStartedOn"));
			},

			/**
			 * Identifies visibility of additional subscriber info container.
			 * @protected
			 * @return {Boolean} True, if additional subscriber info container is visible. Otherwise - false.
			 */
			getIsAdditionalSubscriberInfoContainerVisible: function() {
				return false;
			},

			/**
			 * Identifies visibility of additional call info container.
			 * @protected
			 * @return {Boolean} True, if additional call info container is visible. Otherwise - false.
			 */
			getIsAdditionalCallInfoContainerVisible: function() {
				return false;
			},

			/**
			 * Identifies visibility of message, that there are no matching search results.
			 * @protected
			 * @return {Boolean} True, if there are no matching search results. Otherwise - false.
			 */
			getIsEmptySearchResultContainerVisible: function() {
				return this.get("IsSearchFinishedAndResultEmpty") &&
					this.getCanMakeCallOrMakeConsultCallOrGetIsOffline();
			},

			/**
			 * Returns entity schema name for subscriber type.
			 * @protected
			 * @param {CtiConstants.SubscriberTypes} type Subscriber type.
			 * @return {String} Entity schema name for subscriber type.
			 */
			getEntitySchemaNameBySubscriberType: function(type) {
				return (type !== CtiConstants.SubscriberTypes.Employee)
					? type
					: CtiConstants.SubscriberTypes.Contact;
			},

			//endregion

			// region Methods: Public

			/**
			 * Returns the sign of possibility to perform current or consult call or telephony is unavailable.
			 * @return {Boolean}
			 */
			getCanMakeCallOrMakeConsultCallOrGetIsOffline: function() {
				var isTelephonyNotAvailable = this.get("IsTelephonyNotAvailable");
				if (isTelephonyNotAvailable) {
					return true;
				}
				return this.getCanMakeCallOrMakeConsultCall();
			},

			/**
			 * Makes call (current or consult) to specified number.
			 * @param {String} number Phone number.
			 */
			callByNumber: function(number) {
				number = number.replace(/\D/g, "");
				if (this.isPhoneNumberValid(number)) {
					if (this.getCanCall() && this.activeCalls.isEmpty()) {
						this.makeCall(number);
					} else if (this.getCanMakeConsultCall()) {
						this.makeConsultCall(number);
						this.set("IsTransferPrepared", false);
					}
					this.clearPhoneNumber();
				}
			},

			//endregion

			//region Events

			/**
			 * Makes switch to the current call subscriber card.
			 */
			onSubscriberNameClick: function() {
				this.onNameClick(false);
			},

			/**
			 * Makes switch to the consultation call subscriber card.
			 */
			onConsultSubscriberNameClick: function() {
				this.onNameClick(true);
			},

			/**
			 * Makes switch to subscriber card.
			 * @private
			 * @param {Boolean} isConsultSubscriber Is subscriber from consult call sign.
			 */
			onNameClick: function(isConsultSubscriber) {
				var collectionName = isConsultSubscriber
					? "IdentifiedConsultSubscriberPanelCollection"
					: "IdentifiedSubscriberPanelCollection";
				var identifiedSubscriberKeyName = isConsultSubscriber
					? "IdentifiedConsultSubscriberKey"
					: "IdentifiedSubscriberKey";
				var subscriberPanel = this.getIdentifiedSubscriberPanel(collectionName, identifiedSubscriberKeyName);
				if (!subscriberPanel) {
					return;
				}
				var schemaName = this.getEntitySchemaNameBySubscriberType(subscriberPanel.get("Type"));
				var hash = NetworkUtilities.getEntityUrl(schemaName, subscriberPanel.get("Id"));
				this.sandbox.publish("PushHistoryState", {hash: hash});
			},

			/**
			 * Handles "Preparing to transfer" button click event.
			 */
			onPrepareTransferButtonClick: function() {
				var isTransferPrepared = this.get("IsTransferPrepared");
				this.set("IsTransferPrepared", !isTransferPrepared);
				if (!isTransferPrepared) {
					this.set("IsDtmfPrepared", false);
				}
			},

			/**
			 * Handles "Dial panel" button click.
			 * @private
			 */
			onDtmfButtonClick: function() {
				var isDtmfPrepared = this.get("IsDtmfPrepared");
				this.set("IsDtmfPrepared", !isDtmfPrepared);
				if (!isDtmfPrepared) {
					this.set("IsTransferPrepared", false);
				}
			},

			/**
			 * Handles DTMF typing button click.
			 * @private
			 */
			enterDtmf: function() {
				var dtmfDigit = arguments[3];
				this.sendDtmf(dtmfDigit);
			},

			/**
			 * Handles "Mute" button click.
			 * @private
			 */
			onMuteButtonClick: function() {
				this.mute();
			},

			/**
			 * Handles "Disable video" button click.
			 * @private
			 */
			onVideoButtonClick: function() {
				var currentCall = this.get("CurrentCall");
				this.checkCurrentCallExists(currentCall);
				var isStartVideo = this.get("IsVideoHidden");
				this.setVideoState(currentCall, isStartVideo, this.onSetVideoState.bind(this));
			},

			/**
			 * Returns sign of visibility for "Internal no connection message".
			 * @private
			 * @return {Boolean} "Internal no connection message" visibility.
			 */
			getIsInternalTelephonyNotAvailable: function() {
				var buildType = this.Terrasoft.SysSettings.cachedSettings.BuildType;
				return (this.get("IsTelephonyNotAvailable") &&
					buildType.value !== ConfigurationConstants.BuildType.Public);
			},

			/**
			 * Returns sign of visibility for "Demo no connection message".
			 * @private
			 * @return {Boolean} "Demo no connection message" visibility.
			 */
			getIsDemoTelephonyNotAvailable: function() {
				var buildType = this.Terrasoft.SysSettings.cachedSettings.BuildType;
				return (this.get("IsTelephonyNotAvailable") &&
					buildType.value === ConfigurationConstants.BuildType.Public);
			},

			/**
			 * @inheritdoc Terrasoft.CtiModel#commutationStarted
			 * @private
			 */
			onCommutationStarted: function(call) {
				var currentCall = this.get("CurrentCall");
				if (currentCall && currentCall.id === call.id) {
					var durationTimerIntervalId = setInterval(this.updateCallDuration,
						CtiConstants.TalkDuration.RefreshRate);
					this.set({
						DurationTimerIntervalId: durationTimerIntervalId,
						CommutationStartedOn: new Date()
					});
				}
				this.updateHistoryOnCommutationStarted(call);
			},

			/**
			 * Handles operators change state event.
			 * @param {Backbone.Model} model Cti-model.
			 * @param {String} agentStateCode Operator state code.
			 */
			onAgentStateCodeChanged: function(model, agentStateCode) {
				this.sandbox.publish("AgentStateChanged", agentStateCode);
			},

			/**
			 * Handles current call change.
			 * @private
			 * @param {Backbone.Model} model Cti-model.
			 * @param {Terrasoft.integration.telephony.Call} call Call object.
			 */
			onChangeCurrentCall: function(model, call) {
				if (call) {
					var communicationPanelConfig = {selectedItem: "CtiPanel"};
					this.sandbox.publish("SelectCommunicationPanelItem", communicationPanelConfig);
					if (call.state === Terrasoft.GeneralizedCallState.CONNECTED && !this.$CommutationStartedOn) {
						this.onCommutationStarted(call);
					}
				}
			},

			/**
			 * Call duration changed.
			 * @private
			 * @param {Backbone.Model} model Cti-model.
			 * @param {String} callDuration Call duration in format mm:ss.
			 */
			onChangeCallDuration: function(model, callDuration) {
				this.sandbox.publish("CallDurationChanged", callDuration);
			},

			/**
			 * @inheritdoc Terrasoft.CtiModel#connected
			 */
			onConnected: function() {
				//TODO #CC-349 Implement a client status request when connecting/restart the browser
				this.initializeSubscribersCollections();
				this.sandbox.publish("CtiPanelConnected");
				this.initOnConnected();
				this.updateSearchResults();
				this.set("IsTelephonyAvailable", true);
				this.set("IsTelephonyNotAvailable", false);
			},

			/**
			 * Handles disconnect event.
			 */
			onDisconnected: function() {
				this.updateSearchResults();
				this.initializeSubscribersCollections();
				this.set("IsTelephonyAvailable", false);
				this.set("IsTelephonyNotAvailable", true);
			},

			/**
			 * Current call phone number change event handler.
			 * @private
			 * @param {Backbone.Model} model Model.
			 * @param {String} number Current call number.
			 */
			onChangeCurrentCallNumber: function(model, number) {
				var panelCollection = this.get("IdentifiedSubscriberPanelCollection");
				var currentCall = this.get("CurrentCall");
				panelCollection.clear();
				if (!Ext.isEmpty(number)) {
					this.identifySubscriber(number, "", "", this.identifySubscriberCallback.bind(this, number,
						"CurrentCallNumber"));
				}
				this.closePopupNotifications(this.desktopNotificationTags.all);
				this.createPopupNotification(this.desktopNotificationTags.unidentified,
					this.maximumNotificicationDuration, number, currentCall);
			},

			/**
			 * Change of consult call number event handler.
			 * @param {Backbone.Model} model Model.
			 * @param {String} number Number of the consult call.
			 */
			onChangeConsultCallNumber: function(model, number) {
				var panelCollection = this.get("IdentifiedConsultSubscriberPanelCollection");
				panelCollection.clear();
				if (!Ext.isEmpty(number)) {
					this.identifySubscriber(number, "IdentifiedConsultSubscriberPanelCollection",
						"IdentifiedConsultSubscriberKey", this.identifySubscriberCallback.bind(this, number,
							"ConsultCallNumber"));
				}
			},

			/**
			 * Handles identified customers key change event from current call.
			 * @param {Backbone.Model} model Cti-model.
			 * @param {String} identifiedSubscriberKey Key of identified subscriber from current call.
			 */
			onIdentifiedSubscriberKeyChanged: function(model, identifiedSubscriberKey) {
				this.updateCallByIdentifiedSubscriber("IdentifiedSubscriberPanelCollection", identifiedSubscriberKey);
				var call = this.get("CurrentCall");
				if (!identifiedSubscriberKey) {
					if (call) {
						this.fireEvent("subscriberIdentified", call.id, null);
					}
					return;
				}
				var collection = this.get("IdentifiedSubscriberPanelCollection");
				var subscriberPanel = collection.get(identifiedSubscriberKey);
				if (!subscriberPanel) {
					return;
				}
				if (!call) {
					return;
				}
				this.fireEvent("subscriberIdentified", call.id, subscriberPanel.values);
			},

			/**
			 * Handles identified customers key change event from consult call.
			 * @param {Backbone.Model} model Cti-model.
			 * @param {String} identifiedSubscriberKey Key of identified subscriber from consult call.
			 */
			onIdentifiedConsultSubscriberKeyChanged: function(model, identifiedSubscriberKey) {
				this.updateCallByIdentifiedSubscriber("IdentifiedConsultSubscriberPanelCollection",
					identifiedSubscriberKey);
				var call = this.findConsultCall();
				if (!identifiedSubscriberKey) {
					if (call) {
						this.fireEvent("subscriberIdentified", call.id, null);
					}
					return;
				}
				var collection = this.get("IdentifiedConsultSubscriberPanelCollection");
				var subscriberPanel = collection.get(identifiedSubscriberKey);
				if (!subscriberPanel) {
					return;
				}
				if (!call) {
					return;
				}
				this.fireEvent("subscriberIdentified", call.id, subscriberPanel.values);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#callSaved
			 */
			onCallSavedEvent: function(call) {
				var activeCall = this.activeCalls.find(call.id);
				if (activeCall) {
					this.updateCallByIdentificationData(activeCall);
				}
				this.updateHistoryOnCallSaved(call);
			},

			/**
			 * Event handler for change of identified subscribers of the call collection.
			 * By default is performed for the current call.
			 * @private
			 * @param {Terrasoft.Collection} subscribersCollection Collection of identified subscribers.
			 * @param {String} isConsult (optional) Sign, indicating, is call consult.
			 */
			onIdentifiedSubscribersChanged: function(subscribersCollection, isConsult) {
				var subscribersCount = subscribersCollection.getCount();
				var identifiedSubscriberKeyPropertyName = (isConsult)
					? "IdentifiedConsultSubscriberKey"
					: "IdentifiedSubscriberKey";
				var identifiedSubscriberCountPropertyName = (isConsult)
					? "IdentifiedConsultSubscribersCount"
					: "IdentifiedSubscribersCount";
				if (subscribersCount === 1) {
					var subscriberKeys = subscribersCollection.getKeys();
					this.set(identifiedSubscriberKeyPropertyName, subscriberKeys[0]);
				} else {
					this.set(identifiedSubscriberKeyPropertyName, null);
				}
				this.set(identifiedSubscriberCountPropertyName, subscribersCount);
			},

			/**
			 * Change of found subscribers collection event handler.
			 * @private
			 * @param {Terrasoft.Collection} subscribersCollection Collection of found subscribers.
			 */
			onSearchResultSubscribersChanged: function(subscribersCollection) {
				var isSubscribersCollectionEmpty = subscribersCollection.isEmpty();
				this.set("IsSearchResultPanelCollectionEmpty", isSubscribersCollectionEmpty);
			},

			/**
			 * Handler of call to the subscriber event.
			 * @param {Object} numberInfo Call parameters information.
			 * @param {String} numberInfo.number Subscribers phone number.
			 */
			onCallCustomer: function(numberInfo) {
				if (!this.get("IsConnected")) {
					this.sandbox.publish("SelectCommunicationPanelItem", {selectedItem: "CtiPanel"});
					this.logInfo(this.getResourceString("NotConnectedMessage"));
					return;
				}
				var phoneNumber = numberInfo.number;
				if (numberInfo.customerId) {
					this.set("AdvisedIdentifiedSubscriberInfo", numberInfo);
				}
				this.callByNumber(phoneNumber);
			},

			/**
			 * Event handler for the need to obtain call records of calls.
			 * @private
			 * @param {Object} callInfo Information to retrieve calls records.
			 * @param {String} callInfo.callId Identifier of the call.
			 * @param {Function} callInfo.callback Callback function.
			 * @param {Boolean} callInfo.callback.canGetCallRecords Sign, indicating possibility of retrieving
			 * call records.
			 * @param {String[]} callInfo.callback.callRecords (optional) Array of call records links.
			 */
			onGetCallRecords: function(callInfo) {
				var callId = callInfo.callId;
				var callback = callInfo.callback;
				if (Ext.isEmpty(callId)) {
					callback(false);
					return;
				}
				if (!this.get("IsConnected")) {
					this.logInfo(this.getResourceString("NotConnectedMessage"));
					callback(false);
					return;
				}
				var canGetCallRecords = this.getCanGetCallRecords();
				if (!canGetCallRecords) {
					callback(canGetCallRecords);
					return;
				}
				this.queryCallRecords(callId, function(callRecords) {
					callback(canGetCallRecords, callRecords);
				});
			},

			/**
			 * Fires on adding call to the list of active calls @link Terrasoft.CtiModel#activeCalls.
			 * @private
			 * @param {Terrasoft.integration.telephony.Call} call Call.
			 */
			onCtiPanelActiveCallAdded: function(call) {
				this.updateHistoryOnNewCall(call);
			},

			/**
			 * Fires on removing call from the list of active calls @link Terrasoft.CtiModel#activeCalls.
			 * @private
			 * @param {Terrasoft.integration.telephony.Call} call The removed call.
			 */
			onCtiPanelActiveCallRemoved: function(call) {
				if (this.activeCalls.isEmpty()) {
					this.clearPhoneNumber();
					this.onCtiPanelActiveCallsEmpty();
				}
				this.updateHistoryOnCallFinished(call);
			},

			/**
			 * Collection of active calls clearing event handler @link Terrasoft.CtiModel#activeCalls.
			 * @private
			 */
			onCtiPanelActiveCallsEmpty: function() {
				this.set({
					IsTransferPrepared: false,
					IsDtmfPrepared: false,
					DtmfDigits: "",
					CommutationStartedOn: null,
					CallDuration: null,
					IsVideoHidden: false,
					AdvisedIdentifiedSubscriber: ""
				});
				var durationTimerIntervalId = this.get("DurationTimerIntervalId");
				clearInterval(durationTimerIntervalId);
			},

			/**
			 * Fires on DTMF typing event. Sets string from last dialed numbers to property "DtmfDigits".
			 * @param {String} dtmfDigit Symbol entered during DTMF typing.
			 * @private
			 */
			onDtmfEntered: function(dtmfDigit) {
				var dtmfDigits = this.get("DtmfDigits") || "";
				if (dtmfDigits.length >= CtiConstants.DtmfMaxDisplayedDigits) {
					dtmfDigits = dtmfDigits.substr(1);
				}
				this.set("DtmfDigits", dtmfDigits + dtmfDigit);
			},

			/**
			 * Processes start of webRtc session.
			 * @param {String} sessionId Identifier of webRtc session.
			 * @param {Object} config Parameters of event.
			 * @param {String} config.mediaElementId Identifier of the dom-element, in which audio and video streams
			 * should be directed. The value must be set in the event handler.
			 * @private
			 */
			onWebRtcStarted: function(sessionId, config) {
				var videoContainer = Ext.getCmp("ctiPanelVideoContainer");
				if (!videoContainer) {
					return;
				}
				////TODO #CC-724 Webitel. Video calls. Don`t use DOM directly
				var videoNotSupportedMessage = this.getResourceString("VideoNotSupportedMessage");
				var videoTag = Ext.DomHelper.append(videoContainer.id, {
					tag: "video",
					id: Ext.String.htmlEncode(sessionId),
					controls: "controls",
					html: Ext.String.htmlEncode(videoNotSupportedMessage)
				});
				config.mediaElementId = videoTag.id;
			},

			/**
			 * Fires on webRtc videostream session start.
			 * @param {String} sessionId Identifier of webRtc session.
			 * @private
			 */
			onWebRtcVideoStarted: function(sessionId) {
				////TODO #CC-724 Webitel. Video calls. Don`t use DOM directly
				var videoTag = Ext.get(sessionId);
				if (videoTag) {
					videoTag.addCls(this.useVideoMediaElementClassName);
				}
			},

			/**
			 * Fires on webRtc session end.
			 * @param {String} sessionId Identifier of webRtc session.
			 * @private
			 */
			onWebRtcDestroyed: function(sessionId) {
				////TODO #CC-724 Webitel. Webitel. Video calls. Don`t use DOM directly
				var videoTag = Ext.get(sessionId);
				if (videoTag) {
					videoTag.remove();
				}
			},

			/**
			 * Processes changing of sign, that indicates, that video should be hidden.
			 * @private
			 * @param {Backbone.Model} model Model.
			 * @param {String} isHidden Sign, that indicates, that video should be hidden.
			 */
			onVideoHidden: function(model, isHidden) {
				var container = Ext.getCmp("ctiPanelVideoContainer");
				if (!container || !container.wrapEl) {
					return;
				}
				var containerWrapEl = container.wrapEl;
				if (isHidden) {
					containerWrapEl.addCls("video-hidden");
				} else {
					containerWrapEl.removeCls("video-hidden");
				}
			},

			/**
			 * Processes changing of state of video using, during the call.
			 * @private
			 * @param {Boolean} isVideoActive Sign of using video during the call.
			 */
			onSetVideoState: function(isVideoActive) {
				this.set("IsVideoHidden", !isVideoActive);
			},

			/**
			 * Processes event {@link CtiPanel#event-subscriberIdentified}.
			 * @inheritdoc CtiPanel#event-subscriberIdentified
			 */
			onSubscriberIdentified: function(callId, data) {
				var currentCall = this.get("CurrentCall");
				this.closePopupNotifications(this.desktopNotificationTags.all);
				if (data) {
					this.createPopupNotification(this.desktopNotificationTags.identified,
						this.maximumNotificicationDuration, data.Name, currentCall);
				}
				this.updateHistoryOnSubscriberIdentified(callId, data);
			}

			//endregion

		});
	});



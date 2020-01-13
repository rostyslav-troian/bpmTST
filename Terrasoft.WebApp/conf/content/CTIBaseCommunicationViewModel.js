Terrasoft.configuration.Structures["CTIBaseCommunicationViewModel"] = {innerHierarchyStack: ["CTIBaseCommunicationViewModel"]};
define("CTIBaseCommunicationViewModel", ["CTIBaseCommunicationViewModelResources", "CommunicationUtils",
		"BaseCommunicationViewModel"],
	function(resources, CommunicationUtils) {

		/**
		 * @class Terrasoft.configuration.ActivitySectionGridRowViewModel
		 * #####, ####### ######### ###### ############# ###### ######## #####.
		 */
		Ext.define("Terrasoft.configuration.CTIBaseCommunicationViewModel", {
			extend: "Terrasoft.BaseCommunicationViewModel",
			alternateClassName: "Terrasoft.CTIBaseCommunicationViewModel",

			/**
			 * ######### ######## ## ### ######## ##### #########.
			 * @protected
			 * @param {Object} communicationType ### ######## #####.
			 * @return {Boolean} ########## true #### ### ######## ##### ########## # #########.
			 */
			isPhoneType: function(communicationType) {
				var phoneCommunicationTypes = this.get("PhoneCommunicationTypes");
				return CommunicationUtils.isPhoneType(communicationType, phoneCommunicationTypes);
			},

			/**
			 * ######### ########### ## ########## # ##########.
			 * @protected
			 * @return {Boolean} ########## true #### ########### ########## # ##########.
			 * @deprecated
			 */
			isConnected: function() {
				var ctiModel = Terrasoft.CtiModel;
				return ctiModel && ctiModel.get("IsConnected");
			},

			/**
			 * #########, ######## ## #########.
			 * @protected
			 * @returns {Boolean} #### ######## - true, ##### - false.
			 */
			isTelephonyEnabled: function() {
				var ctiSettings = Terrasoft.SysValue.CTI;
				if (ctiSettings && !ctiSettings.isInitialized) {
					return true;
				}
				var connectionParams = ctiSettings && ctiSettings.connectionParams;
				return connectionParams && ctiSettings.canUseCti && connectionParams.disableCallCentre !== true;
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getTypeImageConfig
			 * @overridden
			 */
			getTypeImageConfig: function() {
				var imageConfig = this.callParent(arguments);
				var isDuplicated = this.getIsDuplicatedCommunication();
				if (isDuplicated) {
					return null;
				}
				var type = this.get("CommunicationType");
				if (this.isPhoneType(type.value)) {
					imageConfig = resources.localizableImages.CallIcon;
				}
				return imageConfig;
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseCommunicationViewModel#getLinkUrl
			 * @overridden
			 */
			getLinkUrl: function(value) {
				var link = this.callParent(arguments);
				var isDuplicated = this.getIsDuplicatedCommunication(value);
				if (isDuplicated) {
					return {};
				}
				var type = this.get("CommunicationType");
				if (this.isTelephonyEnabled() && type && this.isPhoneType(type.value)) {
					return {
						url: value,
						caption: value
					};
				}
				return link;
			},

			/**
			 * ############# ####### ######### ###### ########## ######.
			 * @protected
			 * @return {Boolean} ########## ####### ######### ###### ### ########## ######.
			 */
			getCallButtonVisibility: function() {
				var number = this.get("Number");
				return (Ext.isEmpty(number) || !this.isTelephonyEnabled()) ? false : true;
			},

			/**
			 * ############# ####### ######### ###### ########## ######.
			 * @overridden
			 * @return {Boolean} ########## ####### ######### ######.
			 */
			getTypeIconButtonVisibility: function() {
				var visible = this.callParent(arguments);
				var communicationType = this.get("CommunicationType");
				visible = this.isPhoneType(communicationType.value) ? this.getCallButtonVisibility() : visible;
				return visible;
			},

			/**
			 * ############ ####### ## ########### ######## ##########.
			 * @overridden
			 */
			onLinkClick: function() {
				var communicationType = this.get("CommunicationType");
				if (this.isTelephonyEnabled() && this.isPhoneType(communicationType.value)) {
					this.call();
					return false;
				}
				return this.callParent(arguments);
			},

			/**
			 * ######### ###### ## ######## ###### ########.
			 * @protected
			 */
			call: function() {
				var number = this.get("Number");
				var contact = this.$Contact && this.$Contact.value;
				var account = this.$Account && this.$Account.value;
				var customerId = contact || account;
				var entitySchemaName = contact ? "Contact" : "Account";
				this.sandbox.publish("CallCustomer", {
					number: number,
					customerId: customerId,
					entitySchemaName: entitySchemaName
				});
			},

			/**
			 * ######### ##### ######### ### ######.
			 * @overridden
			 * @return {String} ########## ##### ######### ### ###### ########## ######.
			 */
			getTypeIconButtonHintText: function() {
				var communicationType = this.get("CommunicationType");
				if (this.isTelephonyEnabled() && this.isPhoneType(communicationType.value)) {
					return this.getCallButtonHintText();
				}
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getIconTypeButtonMarkerValue: function() {
				return this.getTypeIconButtonHintText();
			},

			/**
			 * ######### ##### ######### ### ###### ########## ######.
			 * @protected
			 * @return {String} ########## ##### ######### ### ###### ########## ######.
			 */
			getCallButtonHintText: function() {
				var number = this.get("Number");
				if (Ext.isEmpty(number)) {
					return null;
				}
				return Ext.String.format(resources.localizableStrings.CallButtonHintText, number);
			}
		});
		return Terrasoft.CTIBaseCommunicationViewModel;
	});



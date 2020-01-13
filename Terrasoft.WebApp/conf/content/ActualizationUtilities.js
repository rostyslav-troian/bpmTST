Terrasoft.configuration.Structures["ActualizationUtilities"] = {innerHierarchyStack: ["ActualizationUtilities"]};
define("ActualizationUtilities", ["terrasoft", "ActualizationUtilitiesResources"],
	function(Terrasoft, resources) {
		var actualizationUtilitiesClass = Ext.define("Terrasoft.configuration.mixins.ActualizationUtilities", {

				alternateClassName: "Terrasoft.ActualizationUtilities",

				/**
				 * ######## ######, ########### ############ ############### #####.
				 * @private
				 */
				onActualizeAdminUnitInRole: function() {
					this.showBodyMask();
					var config = {
						serviceName: "AdministrationService",
						methodName: "ActualizeAdminUnitInRole",
						timeout: 600000
					};
					this.callService(config, function(response) {
						this.hideBodyMask();
						this.saveShowActualizeMessageInProfile(false);
						if (response && response.ActualizeAdminUnitInRoleResult) {
							this.showInformationDialog(resources.localizableStrings.ActualizeSuccessMessage);
						} else {
							this.showInformationDialog(resources.localizableStrings.ActualizeFailedMessage);
						}
					}, this);
				},

				/**
				 * ######### ####### ########### ######### ### ############ ###. #########.
				 * #### ######## # ####### ##### ########, ############ ##### ########
				 * ######### # ############# ######### ############.
				 * @protected
				 * @param {Boolean} value ######## ### ######## ShowActualizeMessage.
				 * @param {Object} callback ####### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				saveShowActualizeMessageInProfile: function(value, callback, scope) {
					if (!this.Ext.isEmpty(value)) {
						this.set("ShowActualizeMessage", value);
					}
					var profileKey = this.getCustomProfileKey();
					var currentProfile = this.get("UserCustomProfile") || {};
					var currentValue = this.get("ShowActualizeMessage");
					if (currentProfile.ShowActualizeMessage !== currentValue) {
						this.showInformationDialog(resources.localizableStrings.NeedActualizeRolesMessage);
						var newProfileValue = {
							"ShowActualizeMessage": currentValue
						};
						this.Ext.apply(currentProfile, newProfileValue);
						this.Terrasoft.utils.saveUserProfile(profileKey, currentProfile, false, callback, scope);
					}
				},

				/**
				 * ############# ######## ######## ShowActualizeMessage, ######### #######.
				 * @protected
				 */
				setShowActualizeMessageFromProfile: function() {
					var currentProfile = this.get("UserCustomProfile") || {};
					this.set("ShowActualizeMessage", currentProfile.ShowActualizeMessage);
				},

				/**
				 * ########## ###### "############### ####".
				 * @protected
				 * @return {Terrasoft.BaseViewModel} ########## ######.
				 */
				getActualizeAdminUnitInRoleButton: function() {
					return this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ActualizeOrgStructureButtonCaption"},
						"Click": {"bindTo": "onActualizeAdminUnitInRole"},
						"Visible": {"bindTo": "CanManageUsers"}
					});
				},

				/**
				 * ######## ###### ## #######.
				 * @protected
				 * @param {Object} callback ####### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				initCustomUserProfileData: function(callback, scope) {
					var profileKey = this.getCustomProfileKey();
					this.Terrasoft.require(["profile!" + profileKey], function(profile) {
						this.set("UserCustomProfile", profile);
						if (this.Ext.isFunction(callback)) {
							callback.call(scope, arguments);
						}
					}, this);
				},

				/**
				 * ######## #### #######.
				 * @protected
				 * @return {String} ########## #### #######.
				 */
				getCustomProfileKey: function() {
					return "SysAdminUnitSectionCustomData";
				}
			});
		return Ext.create(actualizationUtilitiesClass);
	});



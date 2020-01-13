Terrasoft.configuration.Structures["NavigateToLDAPServerConfigurationTile"] = {innerHierarchyStack: ["NavigateToLDAPServerConfigurationTile"]};
define("NavigateToLDAPServerConfigurationTile", ["NavigateToLDAPServerConfigurationTileResources"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.NavigateToLDAPServerConfigurationTileViewModel
		 * ##### ###### ############# ######.
		 */
		Ext.define("Terrasoft.configuration.NavigateToLDAPServerConfigurationTileViewModel", {
			extend: "Terrasoft.SystemDesignerTileViewModel",
			alternateClassName: "Terrasoft.NavigateToLDAPServerConfigurationTileViewModel",
			Ext: null,
			sandbox: null,
			Terrasoft: null,

			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},
			/**
			 * ####### ## ######## ######### LDAP #######
			 */
			onClick: function() {
				var LDAPHash = "ConfigurationModuleV2/LDAPServerSettings/";
				var currentModule = this.sandbox.publish("GetHistoryState").hash.historyState;
				if (currentModule !== LDAPHash) {
					this.sandbox.publish("PushHistoryState", {
						hash: LDAPHash
					});
				}
			}
		});
	});



Terrasoft.configuration.Structures["EmailModule"] = {innerHierarchyStack: ["EmailModule"]};
define("EmailModule", ["BaseSchemaModuleV2"],
	function() {
		/**
		 * @class Terrasoft.configuration.EmailModule
		 * ##### EmailModule ############ ### ######## ########## ###### ### ###### # ######.
		 */
		Ext.define("Terrasoft.configuration.EmailModule", {
			alternateClassName: "Terrasoft.EmailModule",
			extend: "Terrasoft.BaseSchemaModule",
			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 *  ############# ######### ########## ######.
			 * @overridden
			 */
			init: function() {
				this.useHistoryState = false;
				this.callParent(arguments);
			},

			/**
			 * ######## ##### ############ ########.
			 * @protected
			 * @type {String}
			 */
			schemaName: "CommunicationPanelEmailSchema",

			/**
			 * ####### ####, ### ######### ##### ########### #####.
			 * @public
			 * @type {Boolean}
			 */
			isSchemaConfigInitialized: true,

			/**
			 * ######### ########## ###### # #########.
			 * @private
			 * @overridden
			 */
			render: function() {
				this.callParent(arguments);
			}
		});
		return Terrasoft.EmailModule;
	});



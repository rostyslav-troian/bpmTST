Terrasoft.configuration.Structures["ESNFeedModule"] = {innerHierarchyStack: ["ESNFeedModule"]};
define("ESNFeedModule", ["ext-base", "terrasoft", "BaseSchemaModuleV2", "ImageView", "css!ESNFeedStyle"],
		function(Ext, Terrasoft) {
			return Ext.define("Terrasoft.configuration.SocialFeedModule", {

				extend: "Terrasoft.BaseSchemaModule",
				alternateClassName: "Terrasoft.SocialFeedModule",

				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
				 * @overridden
				 */
				generateViewContainerId: false,

				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
				 * @overridden
				 */
				initSchemaName: function() {
					this.schemaName = "SocialFeed";
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
				 * @overridden
				 */
				initHistoryState: Terrasoft.emptyFn,

				/**
				 * @inheritdoc
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initMessages();
				},

				/**
				 * ############# ######## ## ######### ######.
				 * @private
				 */
				initMessages: function() {
					this.sandbox.subscribe("RerenderModule", function(config) {
						if (this.viewModel) {
							this.render(this.Ext.get(config.renderTo));
							return true;
						}
					}, this, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
				 * @overridden
				 */
				createViewModel: function() {
					var viewModel = this.callParent(arguments);
					this.initParameters(viewModel);
					return viewModel;
				},

				/**
				 * ############# ###### ############# ########### ######.
				 * @private
				 * @param {Terrasoft.BaseViewModel} viewModel ###### #############.
				 */
				initParameters: function(viewModel) {
					var parameters = this.parameters;
					var activeSocialMessageId;
					if (parameters) {
						activeSocialMessageId = parameters.activeSocialMessageId;
					}
					viewModel.activeSocialMessageId = activeSocialMessageId;
				}
			});
		});



Terrasoft.configuration.Structures["SectionDashboardsViewModel"] = {innerHierarchyStack: ["SectionDashboardsViewModel"]};
define("SectionDashboardsViewModel", ["ext-base", "DashboardBuilder"],
	function() {
		/**
		 * @class Terrasoft.configuration.SectionDashboardsViewModel
		 * Section dashboard view model class.
		 */
		return Ext.define("Terrasoft.configuration.SectionDashboardsViewModel", {
			extend: "Terrasoft.BaseDashboardsViewModel",
			alternateClassName: "Terrasoft.SectionDashboardsViewModel",

			//region Methods: Private

			/**
			 * @private
			 */
			_onActiveViewChanged: function(activeViewName) {
				if (activeViewName !== this.$DashboardDataViewName) {
					var dashboardModuleId = this.getDashboardModuleId();
					this.sandbox.unloadModule(dashboardModuleId, "DashboardModuleContainer");
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseDashboardsViewModel#initHeader
			 * @overridden
			 */
			initHeader: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseDashboardsViewModel#getMessages
			 * @overridden
			 */
			getMessages: function() {
				var messages = this.callParent(arguments);
				return Ext.apply(messages, {
					ActiveViewChanged: {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseDashboardsViewModel#subscribeSandboxMessages
			 * @overridden
			 */
			subscribeSandboxMessages: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("ActiveViewChanged", this._onActiveViewChanged, this);
			}

			//endregion

		});
	});



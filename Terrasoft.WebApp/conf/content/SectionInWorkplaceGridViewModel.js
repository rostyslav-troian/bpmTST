Terrasoft.configuration.Structures["SectionInWorkplaceGridViewModel"] = {innerHierarchyStack: ["SectionInWorkplaceGridViewModel"]};
define("SectionInWorkplaceGridViewModel", ["BaseGridRowViewModel", "SectionServiceMixin",
	 "css!SectionInWorkplaceGridViewModel"], function() {
 
	/**
	 * @class Terrasoft.configuration.SectionInWorkplaceGridViewModel
	 */
	Ext.define("Terrasoft.configuration.SectionInWorkplaceGridViewModel", {
		extend: "Terrasoft.BaseGridRowViewModel",
		alternateClassName: "Terrasoft.SectionInWorkplaceGridViewModel",

		mixins: {
			/**
			 * @class SectionServiceMixin
			 * Section service mixin.
			 */
			SectionServiceMixin: Terrasoft.SectionServiceMixin
		},

		//region Properties: Public

		/**
		 * Sandbox instance.
		 * @type {Object}
		 */
		sandbox: null,

		//endregion

		//region Constructors: Public

		constructor: function() {
			this.callParent(arguments);
			this.initHasErrors();
			this.subscribeSandboxEvents();
		},

		//endregion

		//region Methods: Private

		/**
		 * Returns render to element for error information module.
		 * @private
		 * @return {Object} Render to element for error information module.
		 */
		_getRenderTo: function() {
			var selector = Ext.String.format("[data-item-marker*='{0}']", this.$Id);
			var tips = Ext.select(selector);
			return tips.first();
		},

		//endregion

		//region Methods: Protected
		
		callService: function(config, callback, scope) {
			return Terrasoft.ConfigurationServiceProvider.callService.call(this, config, callback, scope);
		},

		/**
		 * Sets current ssp section has rights errors flag.
		 * @protected
		 */
		initHasErrors: function() {
			var sysModule = this.$SysModule;
			if (Ext.isEmpty(sysModule)) {
				return;
			}
			this.getEntitiesWithRightsErrors(sysModule.value, function(errors) {
				this.set("HasErrors", !Ext.isEmpty(errors));
			}, this);
			
		},

		/**
		 * Returns error information module config.
		 * @protected
		 * @return {Object} Error information module config.
		 */
		getErrorsModuleConfig: function() {
			return {
				"schemaName": "SetRightsInfoSchema",
				"isSchemaConfigInitialized": true,
				"useHistoryState": false,
				"parameters": {
					"viewModelConfig": {
						"SysModule": this.$SysModule,
						"DetailId": this.sandbox.id
					}
				}
			};
		},

		/**
		 * Loads error information module to tooltip.
		 * @protected
		 */
		loadInformationModule: function() {
			var renderTo = this._getRenderTo();
			var instanceConfig = this.getErrorsModuleConfig();
			this.sandbox.loadModule("BaseSchemaModuleV2", {
				renderTo: renderTo,
				instanceConfig: instanceConfig
			});
		},

		/**
		 * Returns current section name.
		 * @protected
		 * @return {String} Current section name.
		 */
		getSysModuleName: function() {
			var sysModule = this.$SysModule || {};
			return sysModule.displayValue;
		},

		/**
		 * Returns marker value for rights error information button.
		 * @protected
		 * @return {String} Marker value for rights error information button.
		 */
		getInformationButtonMarker: function () {
			var sysModuleName = this.getSysModuleName();
			return sysModuleName + " RightsErrorsInformationButton";
		},

		/**
		 * Subscribes for current model sandbox messages.
		 * @protected
		 */
		subscribeSandboxEvents: function() {
			var sandbox = this.sandbox;
			var sysModule = this.$SysModule || {};
			sandbox.subscribe("HideRightsErrorTip", this.onHideRightsErrorTip, this, [sysModule.value]);
		},

		/**
		 * Hides right error tips.
		 * @protected
		 */
		onHideRightsErrorTip: function() {
			this.set("HasErrorsTipVisible", false);
		}

		//endregion

	});

	return Terrasoft.SectionInWorkplaceGridViewModel;
});



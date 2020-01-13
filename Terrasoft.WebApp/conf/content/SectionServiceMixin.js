Terrasoft.configuration.Structures["SectionServiceMixin"] = {innerHierarchyStack: ["SectionServiceMixin"]};
  define("SectionServiceMixin", [],
	function() {
		/**
		 * @class Terrasoft.configuration.mixins.SectionServiceMixin
		 * Section service mixin.
		 */
		Ext.define("Terrasoft.configuration.mixins.SectionServiceMixin", {
			alternateClassName: "Terrasoft.SectionServiceMixin",

			//region Methods: Protected

			/**
			 * Initializes section types.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initSectionTypes: function(callback, scope) {
				if (!this.getIsFeatureEnabled("SspSectionWizard")) {
					this.Ext.callback(callback, scope || this);
					return;
				}
				var config = {
					serviceName: "SectionService",
					methodName: "GetSectionTypes"
				};
				this.callService(config, function(result) {
					this.processedSectionTypes(result, callback, scope);
				}, this);
			},

			/**
			 * Initializes general and portal sections.
			 * @protected
			 * @param {Object} sections Sections.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initGeneralAndSspSections: function(sections, callback, scope) {
				if (!sections || sections.length === 0) {
					this.Ext.callback(callback, scope || this);
					return;
				}
				var sectionId = sections.getByIndex(0).value;
				var config = {
					data: {
						"sectionId": sectionId
					},
					serviceName: "SectionService",
					methodName: "GetGeneralAndSspSections"
				};
				this.callService(config, function(result) {
					this.processedGeneralAndSspSections(result, sections, callback, scope);
				}, this);
			},

			/**
			 * Processed receiving section types from service.
			 * @protected
			 */
			processedSectionTypes: Terrasoft.emptyFn,

			/**
			 * Processed receiving general and portal sections from service.
			 * @protected
			 */
			processedGeneralAndSspSections: Terrasoft.emptyFn,

			/**
			 * Returns ssp section related entities with rights errors.
			 * @protected
			 * @param {String} sectionId Section identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getEntitiesWithRightsErrors: function(sectionId, callback, scope) {
				var config = {
					data: {
						"sectionId": sectionId
					},
					serviceName: "SectionService",
					methodName: "GetEntitiesWithAdministrationErrors"
				};
				this.callService(config, function(result) {
					Ext.callback(callback, scope || this, [result.GetEntitiesWithAdministrationErrorsResult]);
				}, this);
			}
			
			//endregion

		});
	});



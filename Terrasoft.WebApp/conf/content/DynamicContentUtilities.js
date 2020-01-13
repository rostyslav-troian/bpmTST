Terrasoft.configuration.Structures["DynamicContentUtilities"] = {innerHierarchyStack: ["DynamicContentUtilities"]};
define("DynamicContentUtilities", ["BulkEmailHyperlinkCorrector", "DynamicContentContractBuilder",
	"ServiceHelper", "DynamicContentBuilderHelper", "BulkEmailTemplateValidator"],
	function(BulkEmailHyperlinkCorrector, ContractBuilder, ServiceHelper) {

	Ext.define("Terrasoft.configuration.DynamicContentUtilities", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.DynamicContentUtilities",

			// region Fields: Private

			/**
			 * Empty sandbox object.
			 */
			_emptySandbox: {
				subscribe: Terrasoft.emptyFn
			},

			/**
			 * BulkEmailDynamicContentBuilder feature state.
			 * @type {Boolean}
			 */
			_isDynamicContentEnabled: Terrasoft.Features.getIsEnabled("BulkEmailDynamicContentBuilder"),

			// endregion

			// region Methods: Protected

			/**
			 * Creates content builder helper.
			 * @protected
			 * @return {Terrasoft.DynamicContentBuilderHelper} Content builder helper instance.
			 */
			createContentBuilderHelper: function() {
				var contentBuilderHelper = Ext.create("Terrasoft.DynamicContentBuilderHelper", {
					sandbox: this._emptySandbox,
					isMjmlConfig: this.isMjmlConfig()
				});
				contentBuilderHelper.sheetElementProperties.push("PreHeaderText");
				return contentBuilderHelper;
			},

			/**
			 * Returns JSON object by view model instance.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} viewModel View model instance.
			 * @return {Object} JSON object.
			 */
			getContentBuilderConfig: function(viewModel) {
				var contentBuilderHelper = this.createContentBuilderHelper();
				return contentBuilderHelper.toJSON(viewModel);
			},

			/**
			 * Returns view model instance by template configuration.
			 * @protected
			 * @param {Object} templateConfig Template configuration.
			 * @return {Terrasoft.BaseViewModel} Content builder view model.
			 */
			getContentBuilderViewModel: function(templateConfig) {
				var contentBuilderHelper = this.createContentBuilderHelper();
				var viewModelConfig = contentBuilderHelper.toViewModel(templateConfig);
				return Ext.create("Terrasoft.BaseModel", {
					values: viewModelConfig
				});
			},

			/**
			 * Returns instance of BulkEmailTemplateValidator.
			 * @protected
			 * @return {Terrasoft.BulkEmailTemplateValidator} Instance of BulkEmailTemplateValidator.
			 */
			createTemplateValidator: function() {
				return Ext.create("Terrasoft.BulkEmailTemplateValidator");
			},

			/**
			 * Saves runtime data for dynamic content template.
			 * @protected
			 * @param {Object} contract Dynamic content template contract.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			callTemplateServiceForSave: function(contract, callback, scope) {
				ServiceHelper.callService("DCTemplateService", "Save", callback, contract, scope);
			},

			/**
			 * Generates DCTemplateContract object using current sheet view model.
			 * @protected
			 * @param {GUID} recordId Bulk email identifier.
			 * @param {Object} templateJson Template configuration.
			 * @return {Object} Contract for template service.
			 */
			getDcTemplateContract: function(recordId, templateJson) {
				var contract = ContractBuilder.generateTemplateContract(recordId, templateJson);
				Terrasoft.each(contract.Replicas, function(replica) {
					replica.Content = BulkEmailHyperlinkCorrector.applyBpmReplicaToHyperlinks(replica.Content,
						replica.Mask);
				}, this);
				return contract;
			},

			/**
			 * Returns hyperlinks from replicas contarct.
			 * @protected
			 * @param {Object} contract Contract for template service.
			 * @return {Array} Hyperlinks.
			 */
			extractHyperlinksFromReplicasContarct: function(contract) {
				var links = [];
				Terrasoft.each(contract.Replicas, function(replica) {
					var replicaLinks = BulkEmailHyperlinkCorrector.extractHyperlinks(replica.Content);
					Ext.merge(links, replicaLinks);
				}, this);
				return links;
			},

			/**
			 * Saves bulk email hyperlinks.
			 * @param {GUID} recordId Bulk email identifier.
			 * @param {Object} contract Contract for template service.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			saveBulkEmailHyperlinks: function(recordId, contract, callback, scope) {
				var links = this.extractHyperlinksFromReplicasContarct(contract);
				var data = {
					BulkEmailId: recordId,
					Hyperlinks: links
				};
				ServiceHelper.callService("BulkEmailTemplateService", "SaveBulkEmailHyperlinks", callback, data, scope);
			},

			//endregion

			// region Methods: Public

			/**
			 * Validates template configuration.
			 * @param {Object} templateConfig Template configuration.
			 * @param {Function} successCallbackFn Callback function for success validation.
			 * @param {Function} rejectCallbackFn Callback function for reject validation.
			 * @param {Object} scope Callback execution context.
			 */
			validateTemplateConfig: function(templateConfig, successCallbackFn, rejectCallbackFn, scope) {
				if (this._isDynamicContentEnabled) {
					var validator = this.createTemplateValidator();
					validator.validate(templateConfig, successCallbackFn, rejectCallbackFn, scope);
				} else {
					Ext.callback(successCallbackFn, scope);
				}
			},

			/**
			 * Applies BpmTrackId to Hyperlinks.
			 * @param {Object} templateConfig Template configuration.
			 */
			applyBpmTrackIdToHyperlinks: function(templateConfig) {
				if (this._isDynamicContentEnabled) {
					var viewModel = this.getContentBuilderViewModel(templateConfig);
					BulkEmailHyperlinkCorrector.applyBpmTrackIdToHyperlinks(viewModel);
					templateConfig = this.getContentBuilderConfig(viewModel);
				}
				return templateConfig;
			},

			/**
			 * Saves dynamic content template with replicas.
			 * @param {GUID} recordId Bulk email identifier.
			 * @param {String} templateConfigText Template configuration.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			saveDynamicContentTemplate: function(recordId, templateConfigText, callback, scope) {
				if (!this._isDynamicContentEnabled) {
					Ext.callback(callback, scope);
					return;
				}
				var templateJson = Terrasoft.decode(templateConfigText);
				var contract = this.getDcTemplateContract(recordId, templateJson);
				Terrasoft.chain(
					function(next) {
						this.callTemplateServiceForSave(contract, next, this);
					},
					function(next) {
						this.saveBulkEmailHyperlinks(recordId, contract, next, this);
					},
					function() {
						Ext.callback(callback, scope);
					},
					this);
			}

			// endregion

		});
	return Ext.create("Terrasoft.DynamicContentUtilities");
});



Terrasoft.configuration.Structures["BulkEmailTemplateEntriesMixin"] = {innerHierarchyStack: ["BulkEmailTemplateEntriesMixin"]};
define("BulkEmailTemplateEntriesMixin", ["BulkEmailHyperlinkCorrector", "DynamicContentContractBuilder",
	"ServiceHelper", "DynamicContentBuilderHelper", "BulkEmailTemplateValidator", "DynamicHeadersReplicaBuilder"],
	function(BulkEmailHyperlinkCorrector, ContractBuilder, ServiceHelper) {
		Ext.define("Terrasoft.configuration.BulkEmailTemplateEntriesMixin", {

			alternateClassName: "Terrasoft.BulkEmailTemplateEntriesMixin",

			// region Methods: Protected

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
			 * @param {String} bulkEmailId Bulk email identifier.
			 * @param {Object} templateJson Template configuration.
			 * @param replicaHeaders
			 * @return {Object} Contract for template service.
			 */
			getDcTemplateContract: function(bulkEmailId, templateJson, replicaHeaders) {
				if (this.$IsWizardMode) {
					var headersReplicaBuilder = Ext.create("Terrasoft.DynamicHeadersReplicaBuilder");
					headersReplicaBuilder.getHeaderFn = function(mask) {
						var headersItem = replicaHeaders.filter(function(el) {
							return el.$Mask === mask;
						});
						var foundItem = headersItem.first();
						if (foundItem) {
							return foundItem.$PreHeader;
						}
						return templateJson.PreHeaderText;
					};
					ContractBuilder.ReplicaBuilder = headersReplicaBuilder;
				}
				var contract = ContractBuilder.generateTemplateContract(bulkEmailId, templateJson);
				Terrasoft.each(contract.Replicas, function(replica) {
					replica.Content = BulkEmailHyperlinkCorrector.applyBpmReplicaToHyperlinks(replica.Content,
						replica.Mask);
				}, this);
				return contract;
			},

			/**
			 * Returns hyperlinks from replicas contract.
			 * @protected
			 * @param {Object} contract Contract for template service.
			 * @return {Array} Hyperlinks.
			 */
			extractHyperlinksFromReplicasContract: function(contract) {
				var links = [];
				Terrasoft.each(contract.Replicas, function(replica) {
					var replicaLinks = BulkEmailHyperlinkCorrector.extractHyperlinks(replica.Content);
					links = links.concat(replicaLinks);
				}, this);
				links = BulkEmailHyperlinkCorrector.getDistinctHyperlinks(links);
				return links;
			},

			/**
			 * Creates bulk email hyperlinks save request.
			 * @protected
			 * @param {String} bulkEmailId Bulk email identifier.
			 * @param {Array} hyperlinks Bulk email hyperlinks.
			 * @return {Object} Request data.
			 */
			createSaveBulkEmailHyperlinksRequest: function(bulkEmailId, hyperlinks) {
				var data = {
					BulkEmailId: bulkEmailId,
					Hyperlinks: hyperlinks
				};
				return data;
			},

			/**
			 * Returns contract data for template hyperlink save.
			 * @protected
			 * @param {String} bulkEmailId Bulk email identifier.
			 * @param {Object} dcTemplateContract Contract for template service.
			 * @return {Object} Contract data.
			 */
			getDcTemplateHyperlinkSaveContract: function(bulkEmailId, dcTemplateContract) {
				var hyperlinks = this.extractHyperlinksFromReplicasContract(dcTemplateContract);
				var data = this.createSaveBulkEmailHyperlinksRequest(bulkEmailId, hyperlinks);
				return data;
			},

			/**
			 * Returns contract data for template replicas headers save.
			 * @protected
			 * @param {String} bulkEmailId Bulk email identifier.
			 * @param {Terrasoft.Collection} headersCollection Bulk email replica headers collection.
			 */
			getDcTemplateHeadersSaveContract: function(bulkEmailId, headersCollection) {
				if (!headersCollection) {
					return null;
				}
				var headers = [];
				Terrasoft.each(headersCollection, function(header) {
					headers.push({
						ReplicaMask: header.$Mask,
						SenderName: header.$SenderName,
						SenderEmail: header.$SenderEmail,
						Subject: header.$Subject,
						Preheader: header.$PreHeader
					})
				});
				var data = this.createSaveBulkEmailHeadersRequest(bulkEmailId, headers);
				return data;
			},

			/**
			 * Returns contract data to copy template replicas headers.
			 * @protected
			 * @param {String} bulkEmailId Current email record identifier
			 * @param {String} sourceBulkEmailId Source email record identifier to copy headers from.
			 * @returns {{BulkEmailId: {String}, SourceBulkEmailId: {String}}}
			 */
			getDcTemplateHeadersCopyContract: function(bulkEmailId, sourceBulkEmailId) {
				if (!sourceBulkEmailId) {
					return;
				}
				var data = {
					BulkEmailId: bulkEmailId,
					SourceBulkEmailId: sourceBulkEmailId
				};
				return data;
			},

			/**
			 * Saves bulk email hyperlinks.
			 * @protected
			 * @param {Object} contract Contract for template service.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			callBulkEmailHyperlinksServiceForSave: function(contract, callback, scope) {
				ServiceHelper.callService("BulkEmailTemplateService", "SaveBulkEmailHyperlinks", callback, contract, scope);
			},

			/**
			 * Creates request to save bulk email headers.
			 * @protected
			 * @param {String} bulkEmailId Bulk email id.
			 * @param {Terrasoft.Collection} headers Bulk email replica headers collection.
			 */
			createSaveBulkEmailHeadersRequest: function(bulkEmailId, headers) {
				var data = {
					BulkEmailId: bulkEmailId,
					Headers: headers
				};
				return data;
			},

			/**
			 * Saves bulk email headers.
			 * @protected
			 * @param {Object} contract Contract for template service.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			callBulkEmailHeadersServiceForSave: function(contract, callback, scope) {
				ServiceHelper.callService("BulkEmailTemplateService", "SaveBulkEmailHeaders", callback, contract, scope);
			},

			/**
			 * Copies bulk email headers.
			 * @protected
			 * @param {Object} contract Contract for template service.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			callBulkEmailHeadersServiceForCopy: function(contract, callback, scope) {
				ServiceHelper.callService("BulkEmailTemplateService", "CopyBulkEmailHeaders", callback, contract, scope);
			},

			//endregion

			// region Methods: Public

			/**
			 * Saves dynamic content entries.
			 * @param {String} bulkEmailid Bulk email identifier.
			 * @param {Object} templateConfig Template configuration.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @deprecated
			 */
			saveTemplateEntries: function(bulkEmailid, templateConfig, callback, scope) {
				var templateSaveContract = this.getDcTemplateContract(bulkEmailid, templateConfig);
				var hyperlinkSaveContract = this.getDcTemplateHyperlinkSaveContract(bulkEmailid, templateSaveContract);
				Terrasoft.chain(
					function(next) {
						this.callTemplateServiceForSave(templateSaveContract, next, this);
					},
					function(next) {
						this.callBulkEmailHyperlinksServiceForSave(hyperlinkSaveContract, next, this);
					},
					function() {
						Ext.callback(callback, scope);
					},
					this);
			},

			/**
			 * Saves dynamic content template with all needed parts.
			 * @param {Object} config Template data to save.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			saveTemplateParts: function(config, callback, scope) {
				var templateSaveContract = this.getDcTemplateContract(config.bulkEmailId, config.templateConfig,
					config.replicaHeaders);
				var hyperlinkSaveContract = this.getDcTemplateHyperlinkSaveContract(config.bulkEmailId,
					templateSaveContract);
				var headersSaveContract = this.getDcTemplateHeadersSaveContract(config.bulkEmailId,
					config.replicaHeaders);
				var headersCopyContract = this.getDcTemplateHeadersCopyContract(config.bulkEmailId,
					config.sourceBulkEmailId);
				Terrasoft.chain(
					function(next) {
						this.callTemplateServiceForSave(templateSaveContract, next, this);
					},
					function(next) {
						this.callBulkEmailHyperlinksServiceForSave(hyperlinkSaveContract, next, this);
					},
					function(next) {
						if (!headersSaveContract) {
							next();
						} else {
							this.callBulkEmailHeadersServiceForSave(headersSaveContract, next, this);
						}
					},
					function(next) {
						if (!headersCopyContract) {
							next();
						} else {
							this.callBulkEmailHeadersServiceForCopy(headersCopyContract, next, this);
						}
					},
					function() {
						Ext.callback(callback, scope);
					},
					this);
			}

			// endregion

		});
	});



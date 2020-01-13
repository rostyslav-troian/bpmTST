Terrasoft.configuration.Structures["BulkEmailTemplateHelper"] = {innerHierarchyStack: ["BulkEmailTemplateHelper"]};
define("BulkEmailTemplateHelper", ["BulkEmailTemplateHelperResources", "MarketingEnums", "ServiceHelper",
		"ContentExporterFactory"],
	function(resources, MarketingEnums, ServiceHelper) {
		Ext.define("Terrasoft.configuration.BulkEmailTemplateHelper", {

			alternateClassName: "Terrasoft.BulkEmailTemplateHelper",

			/**
			 * The mebibyte.
			 * @type {Number}
			 */
			MEBIBYTE: 1048576,

			/**
			 * Current content exporter factory.
			 * @protected
			 * @type {Object}
			 */
			contentExporterFactory: Ext.create("Terrasoft.ContentExporterFactory"),

			// #region Methods: Private

			/**
			 * Returns feature state of the new content builder with MJML support.
			 * @private
			 * @return {Boolean} True when feature is enable and false in otherwise.
			 */
			_isMjmlContentBuilderEnabled: function() {
				return Terrasoft.Features.getIsEnabled("MjmlContentBuilder");
			},

			/**
			 * @private
			 */
			_isMjmlConfig: function(items) {
				if (items && items.length > 0) {
					switch (items[0].ItemType) {
						case "mjblock":
							return true;
						case "blockgroup":
							return this._isMjmlConfig(items[0].Items);
						case "block":
							return false;
						default:
							return undefined;
					}
				}
				return undefined;
			},

			/**
			 * @private
			 */
			_isOperatingWithMjml: function(config) {
				var items;
				if (!Terrasoft.isEmptyObject(config)) {
					items = config.Items;
				}
				return this._isMjmlConfig(items)
					|| (this._isMjmlConfig(items) !== false
						&& this._isMjmlContentBuilderEnabled());
			},

			/**
			 * Generates query for preview blocks.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} Query for preview blocks.
			 */
			_getBlocksEntitySchemaQuery: function(config) {
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this._isOperatingWithMjml(config) ? "ContentUserBlock" : "ContentBlock"
				});
				entitySchemaQuery.addColumn("Id");
				entitySchemaQuery.addColumn("Config", "BlockConfig");
				var esqFilter = entitySchemaQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Id",
					this._isOperatingWithMjml(config)
						? MarketingEnums.ContentBlock.MJML_UNSUBSCRIBE
						: MarketingEnums.ContentBlock.UNSUBSCRIBE);
				entitySchemaQuery.filters.add("UnsubscribeContentBlockFilter", esqFilter);
				return entitySchemaQuery;
			},

			/**
			 * Get`s unsubscribe block config.
			 * @param {Object} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @private
			 */
			_getUnsubscribeBlockConfig: function(config, callback, scope) {
				var esq = this._getBlocksEntitySchemaQuery(config);
				esq.getEntityCollection(function(response) {
					var blockConfig;
					if (response.success && !response.collection.isEmpty()) {
						var previewBlockItem  = response.collection.getByIndex(0);
						var serializedBlockConfig = previewBlockItem.get("BlockConfig");
						blockConfig = (serializedBlockConfig && Terrasoft.decode(serializedBlockConfig)) || {};
					}
					callback.call(scope, blockConfig);
				});
			},

			/**
			 * Apply`s html of unsubscribe block to email template.
			 * @param {Object} useDefaultTemplate shows is default template is needed.
			 * @param {Object} htmlTemplate html of unsubscribe block.
			 * @param {Object} config Config of email template.
			 * @private
			 */
			_applyUnsubscribeLinkForSingleBlock: function(useDefaultTemplate, htmlTemplate, config) {
				if (useDefaultTemplate) {
					htmlTemplate = resources.localizableStrings.UnsubscribeTemplate;
				}
				this.insertUnsubscribeTemplate(htmlTemplate, config);
			},

			/**
			 * Apply`s config of unsubscribe block to email template.
			 * @param {Object} useDefaultTemplate shows is default template is needed.
			 * @param {Object} blockConfig Config of unsubscribe block.
			 * @param {Object} config Config of email template.
			 * @private
			 */
			_applyUnsubscribeLinkForMultiBlock: function(useDefaultTemplate, blockConfig, config) {
				if (useDefaultTemplate) {
					var htmlTemplate = resources.localizableStrings.UnsubscribeTemplate;
					this.insertUnsubscribeTemplate(htmlTemplate, config);
				} else {
					config.Items.push(blockConfig);
				}
			},

			/**
			 * Return`s true when email template is single html block.
			 * @param {Object} config Config of email template.
			 * @private
			 */
			_isSingleHtmlBlock: function(config) {
				var emailContentExporter = this.getContentExporter(config);
				var singleHtmlBlock = emailContentExporter.findSingleHtmlBlock(config);
				var content = singleHtmlBlock && singleHtmlBlock.Content;
				return content != null;
			},

			_isExistUnsubscribeLinkInBlock: function(block, macros, emailContentExporter) {
				var config = block;
				if (block.ItemType === "mjblock") {
					var blockCopy = Terrasoft.deepClone(block);
					config = {
						ItemType: "sheet",
						Items: [
							blockCopy
						]
					};
				}
				var html = emailContentExporter.exportData(config);
				return this.hasUnsubscribeLink(html, macros);
			},

			/**
			 * Checks if there is a need to add unsubscribe link at items with type 'block'.
			 * @param {Object} config Template config.
			 * @param {Array} macros Collection of unsubscribe macros.
			 * @param {Terrasoft.BaseContentExporter} emailContentExporter Instance of content exporter.
			 * @returns {Object} Check result.
			 * - hasLink - flag to indicate that html contains unsubscribe link.
			 * - isAtDynamicBlock - flag to indicate that at least one link is in dynamic block.
			 * @private
			 */
			_checkUnsubscribeLinkForStaticBlocks: function(config, macros, emailContentExporter) {
				var hasUnsubscribeLink = false;
				var staticBlocks = Ext.Array.filter(config.Items, function(el) {
					return el.ItemType === "block"
						|| el.ItemType === "mjblock";
				}, this);
				Terrasoft.each(staticBlocks, function(block) {
					hasUnsubscribeLink = this._isExistUnsubscribeLinkInBlock(block, macros, emailContentExporter);
					return !hasUnsubscribeLink;
				}, this);
				return {
					hasLink: hasUnsubscribeLink,
					isAtDynamicBlock: false
				};
			},

			/**
			 * Checks if there is a need to add unsubscribe link at items with type 'blockgroup'.
			 * If there is no groups at template skips this validation step.
			 * @param {Object} config Template config.
			 * @param {Array} macros Collection of unsubscribe macros.
			 * @param {Terrasoft.BaseContentExporter} emailContentExporter Instance of content exporter.
			 * @returns {Object} Check result.
			 * - hasLink - flag to indicate that html contains unsubscribe link.
			 * - isAtDynamicBlock - flag to indicate that at least one link is in dynamic block.
			 * @private
			 */
			_checkUnsubscribeLinkForDynamicContent: function(config, macros, emailContentExporter) {
				var groups = Ext.Array.filter(config.Items, function(el) {
					return el.ItemType === "blockgroup";
				}, this);
				if (Terrasoft.isEmpty(groups)) {
					return {
						hasLink: false,
						isAtDynamicBlock: false
					};
				}
				return this._checkUnsubscribeLinkForDynamicBlocks(groups, macros, emailContentExporter);
			},

			/**
			 * Checks if there is a need to add unsubscribe link at items with type 'blockgroup'.
			 * Returns positive result if all blocks in blockgroup contain unsubscribe links
			 * and blockgroup has default block.
			 * @param {Array} groups Collection of groups.
			 * @param {Array} macros Collection of unsubscribe macros.
			 * @param {Terrasoft.BaseContentExporter} emailContentExporter Instance of content exporter.
			 * @returns {Object} Check result.
			 * - hasLink - flag to indicate that html contains unsubscribe link.
			 * - isAtDynamicBlock - flag to indicate that at least one link is in dynamic block.
			 * @private
			 */
			_checkUnsubscribeLinkForDynamicBlocks: function(groups, macros, emailContentExporter) {
				var hasUnsubscribeLink = false;
				var isAtDynamicBlock = false;
				Terrasoft.each(groups, function(group) {
					var groupHasLink = true;
					Terrasoft.each(group.Items, function(block) {
						var result = this._isExistUnsubscribeLinkInBlock(block, macros, emailContentExporter);
						isAtDynamicBlock = isAtDynamicBlock || result;
						groupHasLink = groupHasLink && result;
					}, this);
					hasUnsubscribeLink = hasUnsubscribeLink || groupHasLink;
					return !hasUnsubscribeLink;
				}, this);
				return {
					hasLink: hasUnsubscribeLink,
					isAtDynamicBlock: isAtDynamicBlock
				};
			},

			/**
			 * Shows max size validation error message.
			 * @private
			 * @param {Number} size Current size.
			 * @param {Number} maxSize Max size value.
			 * @param {String} messageTemplate Localizable message template.
			 */
			_showMaxSizeValidationErrorMessage: function(size, maxSize, messageTemplate) {
				var overHead = size - maxSize;
				var message = Ext.String.format(messageTemplate, this.getPrintableSize(overHead),
					this.getPrintableSize(maxSize));
				Terrasoft.utils.showInformation(message, null, this, null);
			},

			_getContentBuilderMjmlBlockConfigWithItem: function(item) {
				return {
					"ItemType": "mjblock",
					"Styles": {},
					"Items": [
						{
							"ItemType": "section",
							"Index": 1,
							"Items": [
								{
									"ItemType": "column",
									"Index": 1,
									"Width": 100,
									"Items": [
										item
									]
								}
							]
						}
					]
				};
			},

			// #endregion

			// #region Methods: Protected

			/**
			 * Checks is that unsubscribe link already exists in html code.
			 * @param {String} html Html code.
			 * @param {Array} macrosCollection Collection of macros to check.
			 * @returns {Boolean} Check result.
			 * @protected
			 */
			hasUnsubscribeLink: function(html, macrosCollection) {
				var isLinkExist = false;
				Terrasoft.each(macrosCollection, function(macros) {
					if ((html.indexOf(macros) > -1)) {
						isLinkExist = true;
						return false;
					}
				});
				return isLinkExist;
			},

			/**
			 * Appends block with the unsubscribe link into config.
			 * @param {Object} config Config of content items.
			 * @param {String} html Html code.
			 * @return {Object} Config of content items.
			 * @protected
			 */
			applyUnsubscribeBlock: function(config, html) {
				var unsubscribeBlock = this.getContentBuilderHtmlBlockConfig(html, config);
				config.Items.push(unsubscribeBlock);
			},

			/**
			 * Returns config of the content item.
			 * @param {String} html Html code.
			 * @return {Object} Config.
			 * @protected
			 */
			getContentBuilderHtmlBlockConfig: function(html, config) {
				var item = {
					"Content": html
				};
				var block = {};
				if (this._isOperatingWithMjml(config)) {
					item.ItemType = "mjraw";
					block = this._getContentBuilderMjmlBlockConfigWithItem(item);
				} else {
					Ext.apply(item, {
						"ItemType": "html",
						"Column": 0,
						"Row": 0,
						"ColSpan": 24,
						"RowSpan": 0
					});
					block = {
						"ItemType": "block",
						"Items": [item]
					};
				}
				return block;
			},

			/**
			 * Append template of the unsubscribe link  to content configuration.
			 * @param {Object} config Configuration of the content.
			 * @param {Object} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @protected
			 */
			applyUnsubscribeLink: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.checkNeedUnsubscribeLink(config, next);
					},
					function(next, unsubscribeLinkCheckResult) {
						if (unsubscribeLinkCheckResult && !unsubscribeLinkCheckResult.hasLink) {
							this._getUnsubscribeBlockConfig(config, next);
						} else {
							var emailContentExporter = this.getContentExporter(config);
							var html = emailContentExporter.exportData(config);
							callback.call(scope, config, html, false);
						}
					},
					function(next, blockConfig) {
						if (blockConfig) {
							var emailContentExporter = this.getContentExporter(config);
							var block = emailContentExporter.findSingleBlockByType(blockConfig, "text")
								|| emailContentExporter.findSingleBlockByType(blockConfig, "html")
								|| emailContentExporter.findSingleBlockByType(blockConfig, "mjraw");
							var htmlContent = block.Content;
							this.getUnsubscribeMacros(function(macros) {
								var hasUnsubscribeLink = this.hasUnsubscribeLink(htmlContent, macros);
								next.call(scope, !hasUnsubscribeLink, htmlContent, blockConfig);
							}, this);
						} else {
							next.call(scope, true, null, null);
						}
					},
					function(next, needUnsubscribeLink, unsubscribeHtmlTemplate, blockConfig) {
						var emailContentExporter = this.getContentExporter(config);
						var isSingleHtml = this._isSingleHtmlBlock(config);
						if (isSingleHtml) {
							this._applyUnsubscribeLinkForSingleBlock(needUnsubscribeLink, unsubscribeHtmlTemplate, config);
						} else {
							this._applyUnsubscribeLinkForMultiBlock(needUnsubscribeLink, blockConfig, config);
						}
						var html = emailContentExporter.exportData(config);
						callback.call(scope, config, html, true);
					}, this);
			},

			/**
			 * Checks if there is a need to add unsubscribe link.
			 * @param {Object} config Config of content items.
			 * @param {Object} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @protected
			 */
			checkNeedUnsubscribeLink: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.getUnsubscribeMacros(function(macros) {
							macros
								? next.call(scope, macros)
								: callback.call();
						}, scope);
					},
					function(next, macros) {
						var emailContentExporter = this.getContentExporter(config);
						var checkResult = this.checkHasUnsubscribeLinkByConfig(config, macros, emailContentExporter);
						var html = emailContentExporter.exportData(config);
						callback.call(scope, checkResult, html);
					},
					this
				);
			},

			/**
			 * Calls service to receive unsubscribe macros and applies callback function with response.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 * @protected
			 */
			getUnsubscribeMacros: function(callback, scope) {
				ServiceHelper.callService("BulkEmailTemplateService", "GetUnsubscribeMacros", function(response) {
					var macros = response
						&& response.GetUnsubscribeMacrosResult
						&& response.GetUnsubscribeMacrosResult.Macros;
					callback.call(scope, macros);
				}, null, this);
			},

			/**
			 * Checks if there is a need to add unsubscribe link based on template config.
			 * @param {Object} config Config of content items.
			 * @param {Object} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @returns {Object} Check result.
			 * - hasLink - flag to indicate that html contains unsubscribe link.
			 * - isAtDynamicBlock - flag to indicate that at least one link is in dynamic block.
			 * @private
			 */
			checkHasUnsubscribeLinkByConfig: function(config, macros, emailContentExporter) {
				var checkResult = this._checkUnsubscribeLinkForStaticBlocks(config, macros, emailContentExporter);
				if (!checkResult.hasLink) {
					checkResult = this._checkUnsubscribeLinkForDynamicContent(config,
						macros, emailContentExporter);
				}
				return checkResult;
			},

			/**
			 * Inserts unsubscribe link into config.
			 * @param {String} unsubscribeTemplate Unsubscribe link text.
			 * @param {Object} config Config of content items.
			 * @protected
			 */
			insertUnsubscribeTemplate: function(unsubscribeTemplate, config) {
				var emailContentExporter = this.getContentExporter(config);
				var singleHtmlBlock = emailContentExporter.findSingleHtmlBlock(config);
				var content = singleHtmlBlock && singleHtmlBlock.Content;
				if (content) {
					singleHtmlBlock.Content = this.insertUnsubscribeTemplateInHtmlBody(content, unsubscribeTemplate);
				} else {
					this.applyUnsubscribeBlock(config, unsubscribeTemplate);
				}
				return config;
			},

			/**
			 * Inserts ubsubscribe template into body of html.
			 * @param {String} html Html code.
			 * @param {String} unsubscribeTemplate Unsubscribe template code.
			 * @protected
			 */
			insertUnsubscribeTemplateInHtmlBody: function(html, unsubscribeTemplate) {
				var position = html.indexOf("</body>") +  html.indexOf("</BODY>") + 1;
				if (position === -1) {
					position = html.indexOf("</html>") + html.indexOf("</HTML>") + 1;
					if (position === -1) {
						position = html.length;
					}
				}
				html = html.substring(0, position) + unsubscribeTemplate + html.substring(position);
				return html;
			},

			/**
			 * Returns instance of the Terrasoft.BaseContentExporter.
			 * @param {Object} config Content builder template config.
			 * @returns {Terrasoft.BaseContentExporter}
			 */
			getContentExporter: function(config) {
				return this.contentExporterFactory.getExporter(config);
			},

			/**
			 * Convert html code to the item of content designer.
			 * @protected
			 * @param {String} html Html code.
			 * @return {Object} Configuration of the content.
			 */
			htmlToSheetConfig: function(html) {
				var block = this.getContentBuilderHtmlBlockConfig(html, {});
				return {
					"ItemType": "sheet",
					"Items": [block]
				};
			},

			/**
			 * Returns true if size doesn't exceed max allowable size of the template.
			 * @protected
			 * @param {Number} templateSize Size in bytes.
			 * @return {Boolean} Result of the validation.
			 */
			validateTemplateSize: function(templateSize) {
				var maxTemplateSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_SIZE;
				if (templateSize >= maxTemplateSize) {
					var messageTemplate = resources.localizableStrings.TemplateIsTooBigMessage;
					this._showMaxSizeValidationErrorMessage(templateSize, maxTemplateSize, messageTemplate);
					return false;
				}
				return true;
			},

			/**
			 * Returns true if all replicas content size for current template contract
			 * doesn't exceed max allowable size for template service.
			 * @protected
			 * @param {Number} contractSize Size in bytes.
			 * @return {Boolean} Result of the validation.
			 */
			validateTemplateContractSize: function(contractSize) {
				var maxContractSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_CONTRACT_SIZE;
				if (contractSize >= maxContractSize) {
					var messageTemplate = resources.localizableStrings.TemplateContractIsTooBigMessage;
					this._showMaxSizeValidationErrorMessage(contractSize, maxContractSize, messageTemplate);
					return false;
				}
				return true;
			},

			/**
			 * Convert size to it printable value.
			 * @param {Number} size Size in bytes.
			 * @returns {Number} Size in kilobytes.
			 */
			getPrintableSize: function(size) {
				var sizeInMegabytes = size / this.MEBIBYTE;
				return Math.round(sizeInMegabytes * 100) / 100;
			}

			// #endregion

		});
		return Ext.create("Terrasoft.configuration.BulkEmailTemplateHelper");
	}
);



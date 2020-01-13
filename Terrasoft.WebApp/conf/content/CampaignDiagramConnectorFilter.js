Terrasoft.configuration.Structures["CampaignDiagramConnectorFilter"] = {innerHierarchyStack: ["CampaignDiagramConnectorFilter"]};
define("CampaignDiagramConnectorFilter", ["LookupUtilities", "CampaignEnums"],
		function(LookupUtilities, CampaignEnums) {
	Ext.define("Terrasoft.configuration.CampaignDiagramConnectorFilter", {
		alternateClassName: "Terrasoft.CampaignDiagramConnectorFilter",
		extend: "Terrasoft.BaseViewModel",

		/**
		 * @inheritdoc Terrasoft.model.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.loadHyperlinks(this.onLoadHyperlinks, this);
		},

		/**
		 * Returns list of the selected hyperlinks.
		 */
		getBulkEmailHyperlinksList: function() {
			var hyperlinks = this.get("BulkEmailHyperlinks");
			var captionLength = 60;
			var hint = "";
			var linkTmp = "<a href=\"{0}\" target=\"_blank\">{1}<\a>\r\n";
			if (hyperlinks) {
				hint = Terrasoft.reduce(hyperlinks, function(memo, hyperlink) {
					var caption = this.cutString(hyperlink.Caption, captionLength);
					return memo + Ext.String.format(linkTmp, hyperlink.Url, caption);
				}, "", this);
			}
			return hint;
		},

		/**
		 * Cut text for certain length.
		 * @param {String} strValue Target text.
		 * @param {Number} strLength Length limit.
		 */
		cutString: function(strValue, strLength) {
			var ellipsis = Ext.String.ellipsis(strValue.substring(strLength), 0);
			return strValue.substring(0, strLength) + ellipsis;
		},

		/**
		 * Loads hyperlinks from Bulk Email.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		loadHyperlinks: function(callback, scope) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "BulkEmailHyperlink"
			});
			esq.addColumn("Caption");
			esq.addColumn("Url");
			esq.addColumn("BulkEmail");
			esq.filters.add("filterCurrentUserParams", this.getBulkEmailFilter());
			esq.getEntityCollection(callback, scope);
		},

		/**
		 * Sets Bulk Email hyperlinks in view model.
		 * @private
		 * @param {Object} response Entity schema query response.
		 */
		onLoadHyperlinks: function(response) {
			var items = response.collection.getItems();
			if (items) {
				var hyperlinks = Terrasoft.reduce(items, function(memo, hyperlink) {
					memo.push(hyperlink.values);
					return memo;
				}, []);
				this.set("AllSourceBulkEmailHyperlinks", hyperlinks);
				this.validateHyperlinks();
				var bulkEmailHyperlinks = this.get("BulkEmailHyperlinks");
				if (bulkEmailHyperlinks) {
					this.set("BulkEmailHyperlinksValue", this.getBulkEmailHyperlinksValue(bulkEmailHyperlinks));
				}
			}
		},

		/**
		 * Validates hyperlinks.
		 * @private
		 */
		validateHyperlinks: function() {
			var bulkEmailHyperlinks = this.get("BulkEmailHyperlinks");
			var allSourceBulkEmailHyperlinks = this.get("AllSourceBulkEmailHyperlinks");
			var newBulkEmailHyperlinks = [];
			Terrasoft.each(bulkEmailHyperlinks, function(bulkEmailHyperlink) {
				var hyperlink = Terrasoft.findWhere(allSourceBulkEmailHyperlinks, {
					Caption: bulkEmailHyperlink.Caption,
					Url: bulkEmailHyperlink.Url
				});
				if (!Ext.isEmpty(hyperlink)) {
					newBulkEmailHyperlinks.push(hyperlink);
				}
			}, this);
			this.set("BulkEmailHyperlinks", newBulkEmailHyperlinks);
		},

		/**
		 * Returns Bulk Email filter.
		 * @private
		 * @return {Object}
		 */
		getBulkEmailFilter: function() {
			var sourceNode = this.get("SourceNode");
			return sourceNode
					? Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL,
						"BulkEmail",
						this.getRecordIdFromNode(sourceNode))
					: null;
		},

		/**
		 * Returns true if multilookup with hyperlinks visible.
		 * @private
		 * @return {Boolean}
		 */
		getIsMultiLookupVisible: function() {
			var recordId = this.getRecordIdFromNode(this.get("SourceNode"));
			return this.get("Id") === CampaignEnums.CampaignFilter.EMAIL_CLICKED && recordId && this.get("Value");
		},

		/**
		 * Returns record unique identifier from node.
		 * @private
		 * @param {Object} node Diagram node.
		 * @return {Object}
		 */
		getRecordIdFromNode: function(node) {
			if (node && node.config.addInfo && node.config.addInfo.RecordId) {
				return node.config.addInfo.RecordId;
			}
			return null;
		},

		/**
		 * Returns string with concat hyperlinks captions.
		 * @private
		 * @param {Array} items Hyperlinks.
		 * @return {String}
		 */
		getBulkEmailHyperlinksValue: function(items) {
			return Terrasoft.reduce(items, function(memo, hyperlink) {
				return memo + hyperlink.Caption + "; ";
			}, "");
		},

		/**
		 * Returns Ids of selected hyperlinks.
		 * @private
		 * @return {Array}
		 */
		getSelectedIds: function() {
			return Terrasoft.reduce(this.get("BulkEmailHyperlinks"), function(memo, hyperlink) {
				memo.push(hyperlink.Id);
				return memo;
			}, []);
		},

		/**
		 * Opens hyperlinks multilookup.
		 * @public
		 */
		openHyperlinksLookup: function() {
			if (this.get("IsStatusEnabled")) {
				var lookup = this.getLookupConfig();
				LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
			}
		},

		/**
		 * Returns hyperlinks multilookup config.
		 * @private
		 * @return {Object}
		 */
		getLookupConfig: function() {
			var scope = this;
			var callback = function(config) { scope.onLookupSelected(config); };
			var filter = this.getBulkEmailFilter();
			var selectedValues = this.getSelectedIds();
			return {
				config: {
					entitySchemaName: "BulkEmailHyperlink",
					filters: filter,
					multiSelect: true,
					selectedValues: selectedValues,
					actionsButtonVisible: false
				},
				callback: callback
			};
		},

		/**
		 * Sets selected hyperlinks in view model.
		 * @private
		 * @param {Object} config Config with selected lookup values.
		 */
		onLookupSelected: function(config) {
			var items = config.selectedRows.getItems();
			this.set("BulkEmailHyperlinks", items);
			this.set("BulkEmailHyperlinksValue", this.getBulkEmailHyperlinksValue(items));
		}
	});
});



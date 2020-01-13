Terrasoft.configuration.Structures["DynamicContentContractBuilder"] = {innerHierarchyStack: ["DynamicContentContractBuilder"]};
define("DynamicContentContractBuilder", ["DynamicContentReplicaBuilder", "ContentExporterFactory"],
function() {
	return {
		/**
		 * Current content exporter factory instance.
		 * @protected
		 */
		ContentExporterFactory: Ext.create("Terrasoft.ContentExporterFactory"),

		/**
		 * Required properties for DCAttribute contract.
		 * @type {Array}
		 * @protected
		 */
		serializableDCAttributeProperties: ["Index", "Value", "TypeId", "Caption"],

		ReplicaBuilder: null,

		// #region Methods: Private

		_getReplicaBuilder: function() {
			return this.ReplicaBuilder || Ext.create("Terrasoft.DynamicContentReplicaBuilder");
		},

		/**
		 * Returns instance of the Terrasoft.BaseContentExporter.
		 * @private
		 * @param {Object} config Content builder template config.
		 * @returns {Terrasoft.BaseContentExporter}
		 */
		_getContentExporter: function(config) {
			return this.ContentExporterFactory.getExporter(config);
		},

		/**
		 * Prepares collections of groups' and blocks' contracts.
		 * @private
		 * @param {Object} templateJson Dynamic template config (JSON).
		 * @returns {Object} Config with lists of DCTemplateBlockContract and DCTemplateGroupContract configs.
		 */
		_getGroupsAndBlocks: function(templateJson) {
			var result = {
				groups: [],
				blocks: []
			};
			Terrasoft.each(templateJson.Items, function(group) {
				if (group.ItemType !== "blockgroup") {
					return;
				}
				Terrasoft.each(group.Items, function(block) {
					if (block.ItemType !== "block" && block.ItemType !== "mjblock") {
						return;
					}
					result.blocks.push({
						Index: block.Index,
						GroupIndex: group.Index,
						IsDefault: block.IsDefault,
						AttributeIndexes: block.Attributes,
						Priority: block.Priority
					});
				});
				result.groups.push({ Index: group.Index	});
			});
			return result;
		},

		/**
		 * Prepares a list of dynamic content attribute contracts.
		 * @private
		 * @param {Array} attributes Collection of DCAttribute models.
		 * @returns {Array} List of DCAttribute contracts.
		 */
		_getAttributes: function(attributes) {
			var results = [];
			Terrasoft.each(attributes, function(attr) {
				var dto = this._getAttributeDto(attr);
				results.push(dto);
			}, this);
			return results;
		},

		/**
		 * Returns dynamic content attribute contract based on DCAttribute model.
		 * @private
		 * @param {Object} attribute DCAttribute model.
		 * @return {Object} Dynamic content attribute contract.
		 */
		_getAttributeDto: function(attribute) {
			var result = {};
			Terrasoft.each(this.serializableDCAttributeProperties, function(prop) {
				result[prop] = attribute[prop];
			}, this);
			return result;
		},

		/**
		 * Prepares a list of replica contracts.
		 * @private
		 * @param {Object} templateJson Dynamic template config (JSON).
		 * @returns {Array} A list of DCReplicaContract configs.
		 */
		_getReplicasContracts: function(templateJson) {
			var replicaBuilder = this._getReplicaBuilder();
			const replicasConfigs = replicaBuilder.generateReplicas(templateJson);
			const contentExporter = this._getContentExporter(templateJson);
			var contracts = [];
			Terrasoft.each(replicasConfigs, function(replica) {
				const html = contentExporter.exportData(replica);
				const filteredIndexes = replica.BlockIndexes.filter(function(index) {
					return index !== 0;
				});
				const replicaContract = {
					Content: html,
					BlockIndexes: filteredIndexes,
					Mask: replica.ReplicaMask,
					Caption: replica.Caption
				};
				contracts.push(replicaContract);
			});
			return contracts;
		},

		// #endregion

		// #region Methods: Public

		/**
		 * Generates a contract using a config from the sheet.
		 * @public
		 * @param {Guid} recordId Unique identifier of the connected entity.
		 * @param {Object} templateJson Dynamic template config (JSON).
		 * @return {Object} DCTemplateContract config (JSON).
		 * @example {
		 *		"RecordId":"1627aea5-8e0a-4371-9022-9b504344e724",
		 *		"Attributes":[{
		 *			"Caption":"String",
		 *			"Index":2147483647,
		 *			"TypeId":"1627aea5-8e0a-4371-9022-9b504344e724",
		 *			"Value":"String"
		 *		}],
		 *		"Blocks":[{
		 *			"AttributeIndexes":[2147483647],
		 *			"GroupIndex":2147483647,
		 *			"Index":2147483647,
		 *			"IsDefault":true,
		 *			"Priority":2147483647
		 *		}],
		 *		"Groups":[{
		 *			"Index":2147483647
		 *		}],
		 *		"Replicas":[{
		 *			"BlockIndexes":[2147483647],
		 *			"Content":"html",
		 *			"Mask":2147483647
		 *		}]
		 *	}
		 */
		generateTemplateContract: function(recordId, templateJson) {
			const dynamicContent = this._getGroupsAndBlocks(templateJson);
			const contract = {
				RecordId: recordId,
				Attributes: this._getAttributes(templateJson.Attributes) || [],
				Blocks: dynamicContent.blocks,
				Groups: dynamicContent.groups,
				Replicas: this._getReplicasContracts(templateJson)
			};
			return contract;
		}

		// #endregion

	};
});



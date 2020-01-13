Terrasoft.configuration.Structures["DynamicContentReplicaBuilder"] = {innerHierarchyStack: ["DynamicContentReplicaBuilder"]};
define("DynamicContentReplicaBuilder", ["ext-base", "ReplicaCaptionBuilder"], function(Ext) {
	/**
	 * @class Terrasoft.DynamicContentReplicaBuilder
	 */
	Ext.define("Terrasoft.configuration.DynamicContentReplicaBuilder", {
		alternateClassName: "Terrasoft.DynamicContentReplicaBuilder",

		/**
		 * Checks that current template is static replica.
		 * @private
		 * @param {Object} templateJson Template config.
		 * @returns {Boolean} Is static replica.
		 */
		_checkStaticReplica: function(templateJson) {
			var result = true;
			Terrasoft.each(templateJson.Items, function(item) {
				if (item.ItemType === "blockgroup" && !Terrasoft.isEmpty(item.Items)) {
					result = false;
				}
			}, this);
			return result;
		},

		/**
		 * Creates and returns replica object for static template.
		 * @private
		 * @param {Object} templateJson Template config.
		 * @returns {Object} Replica config.
		 */
		_getStaticReplicaConfig: function(templateJson) {
			var replicaConfig = Terrasoft.deepClone(templateJson);
			replicaConfig.BlockIndexes = [];
			replicaConfig.ReplicaMask = 0;
			return replicaConfig;
		},

		/**
		 * Returns list of all attribute combinations.
		 * @private
		 * @param {Array} attributes Collection of DCAttribute models.
		 * @returns {Array} All attribute combinations.
		 */
		_getAllAttributeCombinations: function(attributes) {
			var combinations = [];
			var length = attributes.length;
			var count = Math.pow(2, length);
			for (var i = 0; i < count; i++) {
				var combination = [];
				for (var j = 0; j < length; j++) {
					var flag = Math.pow(2, j);
					var chechFlag = i & flag;
					if (chechFlag === flag) {
						combination.push(attributes[j].Index);
					}
				}
				combinations.push(combination);
			}
			return combinations;
		},

		/**
		 * Returns block with highest priority for current group with attribute indexes to exclude.
		 * @private
		 * @param {Array} blocks List of blocks for current group.
		 * @param {Array} excludedIndexes List of excluded attribute indexes.
		 * @returns {Object} Block item.
		 */
		_getFirstBlockByPriority: function(blocks, excludedIndexes) {
			var sortedBlocks = blocks.sort(function(a,b) {
				return a.Priority - b.Priority;
			});
			var block;
			Terrasoft.each(sortedBlocks, function(el) {
				if (!Ext.Array.contains(excludedIndexes, el.Attributes[0])) {
					block = el;
					return false;
				}
			}, this);
			return block;
		},

		/**
		 * Returns replica mask by block indexes.
		 * @private
		 * @param {Array} indexes Block indexes for current replica.
		 * @returns {Number} Replica mask.
		 */
		_getMaskByIndexes: function(indexes) {
			return Terrasoft.reduce(indexes, function(summ, current) {
				return summ + current;
			}, 0);
		},

		/**
		 * Fills replica mask property for current replica config.
		 * @private
		 * @param {Object} replicaConfig Config of current replica.
		 */
		_fillReplicaMask: function(replicaConfig) {
			var intMask = this._getMaskByIndexes(replicaConfig.BlockIndexes);
			replicaConfig.ReplicaMask = intMask;
		},

		/**
		 * Returns block indexes for groups with max priority by current segment.
		 * @private
		 * @param {Object} templateJson Source template config.
		 * @param {Array} excludedIndexes Attribute indexes to exclude for current replica.
		 * @returns {Array} List of block indexes.
		 */
		_getBlockIndexes: function(templateJson, excludedIndexes) {
			var blockIndexes = [];
			Terrasoft.each(templateJson.Items, function(item) {
				if (item.ItemType === "blockgroup") {
					var block = this._getFirstBlockByPriority(item.Items, excludedIndexes);
					if (Terrasoft.isEmpty(block)) {
						return;
					}
					blockIndexes.push(block.Index);
				}
			}, this);
			return blockIndexes;
		},

		/**
		 * Adds specified by block indexes content to current replica and fills replica parameters.
		 * @private
		 * @param {Object} replicaConfig Model of current replica.
		 * @param {Array} blocks List of group blocks to take one with max priority.
		 * @param {Array} replicaMask Array of block indexes for current replica.
		 */
		_addGroupBlockByMask: function(replicaConfig, blocks, replicaMask) {
			Terrasoft.each(blocks, function(block) {
				var blockIndex = replicaMask.find(function(index) {
					return index === block.Index;
				});
				if (Terrasoft.isEmpty(blockIndex)) {
					return;
				}
				replicaConfig.Items.push(block);
				replicaConfig.BlockIndexes.push(block.Index);
			});
		},

		/**
		 * Checks attribute usings in template dynamic blocks.
		 * @private
		 * @param {Number} index Attribute index to check.
		 * @param {Array} items Template items.
		 * @returns {Boolean} Check result.
		 */
		_checkAttributeUsings: function(index, items) {
			var result = false;
			Terrasoft.each(items, function(item) {
				if (item.ItemType === "blockgroup") {
					var block = Ext.Array.findBy(item.Items, function(el) {
						return Ext.Array.contains(el.Attributes, index);
					});
					result = Boolean(block);
				}
				return !result;
			}, this);
			return result;
		},

		/**
		 * Returns list of attributes of template which are used in dynamic blocks.
		 * @private
		 * @param {Object} templateJson Source template config.
		 * @returns {Array} Attribute models list.
		 */
		_getAttibutesInUse: function(templateJson) {
			var attributesInUse = [];
			Terrasoft.each(templateJson.Attributes, function(attr) {
				if (this._checkAttributeUsings(attr.Index, templateJson.Items)) {
					attributesInUse.push(attr);
				}
			}, this);
			return attributesInUse;
		},

		/**
		 * Returns unique masks and block indexes for all posible audience segments.
		 * @private
		 * @param {Object} templateJson Source template config.
		 * @returns {Terrasoft.Collection} Collection of unique masks with block indexes.
		 */
		_getUniqueMasksForAllCombinations: function(templateJson) {
			var attributesInUse = this._getAttibutesInUse(templateJson);
			var combinationsToExclude = this._getAllAttributeCombinations(attributesInUse);
			var masks = new Terrasoft.Collection();
			Terrasoft.each(combinationsToExclude, function(attributesToExclude) {
				var blockIndexes = this._getBlockIndexes(templateJson, attributesToExclude);
				var mask =  this._getMaskByIndexes(blockIndexes);
				masks.addIfNotExists(mask, blockIndexes);
			}, this);
			return masks;
		},

		/**
		 * Returns replica models for all correct variants of template.
		 * @private
		 * @param {Object} template Dynamic template config (JSON).
		 * @param {Terrasoft.ReplicaCaptionBuilder} captionBuilder Instance of caption builder for current template.
		 * @return {Array} Array of replica models (JSONs).
		 */
		_internalGenerateReplicas: function(templateJson, captionBuilder) {
			var replicas = [];
			var masks = this._getUniqueMasksForAllCombinations(templateJson);
			Terrasoft.each(masks, function(mask) {
				var replicaConfig = this.getReplicaConfig(templateJson, mask, captionBuilder);
				if (replicaConfig && replicaConfig.ReplicaMask) {
					replicas.push(replicaConfig);
				}
			}, this);
			return replicas;
		},

		/**
		 * Creates and returns replica object using the template and the mask.
		 * @protected
		 * @param {Object} templateJson Source template config.
		 * @param {Array} replicaMask Array of block indexes for current replica.
		 * @param {Terrasoft.ReplicaCaptionBuilder} captionBuilder Instance of caption builder for current template.
		 * @returns {Object} Replica model.
		 */
		getReplicaConfig: function(templateJson, replicaMask, captionBuilder){
			var replicaConfig = Terrasoft.deepClone(templateJson);
			replicaConfig.Items = [];
			replicaConfig.BlockIndexes = [];
			Terrasoft.each(templateJson.Items, function(group) {
				if (group.ItemType !== "blockgroup") {
					replicaConfig.Items.push(group);
					return;
				}
				this._addGroupBlockByMask(replicaConfig, group.Items, replicaMask);
			}, this);
			if (replicaConfig.Items.length > 0) {
				this._fillReplicaMask(replicaConfig);
				replicaConfig.Caption = captionBuilder.generateCaption(replicaConfig.Items);
				return replicaConfig;
			}
		},

		/**
		 * Returns instance of initialized replica caption builder for current template.
		 * @protected
		 * @param {object} template Dynamic template config (JSON).
		 * @return {Terrasoft.ReplicaCaptionBuilder} Instance of replica caption builder.
		 */
		createReplicaCaptionBuilder: function(templateJson) {
			return new Terrasoft.ReplicaCaptionBuilder(templateJson.Attributes);
		},

		/**
		 * Generates a list of all posible replicas for current template.
		 * @public
		 * @param {object} template Dynamic template config (JSON).
		 * @return {Array} Array of replica configs (JSONs).
		 */
		generateReplicas: function(templateJson) {
			var captionBuilder = this.createReplicaCaptionBuilder(templateJson);
			if (Ext.isEmpty(templateJson.Items)) {
				return [];
			}
			if (this._checkStaticReplica(templateJson)) {
				var replicaConfig = this._getStaticReplicaConfig(templateJson);
				replicaConfig.Caption = captionBuilder.generateCaption(replicaConfig.Items);
				return [replicaConfig];
			}
			return this._internalGenerateReplicas(templateJson, captionBuilder);
		},

		/**
		 * Generates a list of all posible replica masks for current template.
		 * @public
		 * @param {object} template Dynamic template config (JSON).
		 * @return {Array} List of replica masks.
		 */
		generateReplicaMasks: function(templateJson) {
			var maskCollection = this._getUniqueMasksForAllCombinations(templateJson);
			if (maskCollection.getCount() === 1 && maskCollection.getKeys()[0] === 0) {
				return [0];
			}
			return maskCollection.getKeys().filter(function(el) {
				return el > 0;
			});
		}
	});
	return Ext.create(Terrasoft.DynamicContentReplicaBuilder);
});



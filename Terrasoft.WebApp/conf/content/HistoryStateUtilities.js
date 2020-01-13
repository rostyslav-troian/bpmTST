Terrasoft.configuration.Structures["HistoryStateUtilities"] = {innerHierarchyStack: ["HistoryStateUtilities"]};
define("HistoryStateUtilities", ["ConfigurationEnums", "ConfigurationEnumsV2"], function(ConfigurationEnums) {
	/**
	 * @class Terrasoft.configuration.mixins.HistoryStateUtilities
	 * ######, ########### ###### # ####### ########## ####### ########.
	 */
	Ext.define("Terrasoft.configuration.mixins.HistoryStateUtilities", {
		alternateClassName: "Terrasoft.HistoryStateUtilities",

		/**
		 * ########### ######## # ######### ####### ########.
		 * @protected
		 * @type {String}
		 */
		delimiter: "/",

		/**
		 * ########## ########## ## ######### # ####### ######### ####### ########.
		 * @protected
		 * @return {Object} ########## ## ######### # ####### ######### ####### ########.
		 */
		getDefaultHistoryStateInfo: function() {
			return {module: "", schemas: [], operation: "", primaryColumnValue: ""};
		},

		/**
		 * ########## ########## # ####### ######### ####### ########.
		 * @protected
		 * @return {Object} ########## # ####### ######### ####### ########.
		 */
		getHistoryStateInfo: function() {
			var historyState = this.sandbox.publish("GetHistoryState");
			return this.parseHistoryState(historyState.hash.historyState);
		},

		/**
		 * ############ ####### ######### ####### ########.
		 * @protected
		 * @param {String} historyState ######### ####### ########.
		 * @return {Object} ########## ########## # ####### ######### ####### ########.
		 */
		parseHistoryState: function(historyState) {
			var result = this.getDefaultHistoryStateInfo();
			this.parse(historyState, result);
			this.initWorkAreaMode(result);
			return result;
		},

		/**
		 * ######### ########## ######### ####### ######## ########### # ####### ###### ####### #######.
		 * #### #### ######, ### #### - ##### ########### (############ ######, ########). #####, #### #### ######## -
		 * ##### ########. ##### - ##### ######.
		 * @protected
		 * @param {Object} result ########## # ####### ######### ####### ########.
		 */
		initWorkAreaMode: function(result) {
			var workAreaMode = {};
			if (result.schemas.length > 1) {
				workAreaMode = ConfigurationEnums.WorkAreaMode.COMBINED;
			} else if (result.operation) {
				workAreaMode = ConfigurationEnums.WorkAreaMode.CARD;
			} else {
				workAreaMode = ConfigurationEnums.WorkAreaMode.SECTION;
			}
			result.workAreaMode = workAreaMode;
		},

		/**
		 * Parses current browser history state.
		 * First item of history state used as module name, all following items used as schemas names, unless
		 * item is ConfigurationEnums.CardOperation member. If item is ConfigurationEnums.CardOperation enum member,
		 * than it used as operation. If operation not add operation, then item after operation is used as
		 * primaryColumnValue.
		 * Example:
		 * "SectionModule/ContactSection/ContactPage/copy/guid" - module is SectionModule,
		 * [ContactSection, ContactPage] is schemas names, copy - operation, guid - primaryColumnValue.
		 * @private
		 * @param {String} historyState Current browser history state.
		 * @param {Object} result Browser history state info.
		 * @return {Object} Returns browser history state info.
		 */
		parse: function(historyState, result) {
			historyState = this.clean(historyState);
			var historyStateItems = historyState.split(this.delimiter);
			var historyStateItemsLength = historyStateItems.length;
			var currentItemIndex = 0;
			var currentItem = historyStateItems[currentItemIndex];
			result.module = currentItem;
			var cardOperations = Terrasoft.ConfigurationEnums.CardOperation;
			var cardOperationsValues = Ext.Object.getValues(cardOperations);
			var addOperation = cardOperations.ADD;
			while (++currentItemIndex < historyStateItemsLength && !result.operation) {
				currentItem = historyStateItems[currentItemIndex];
				var schemas = result.schemas;
				var isLast = (currentItemIndex === historyStateItemsLength - 1);
				if (Terrasoft.contains(cardOperationsValues, currentItem) || (isLast && schemas.length)) {
					if (this.Terrasoft.isGUID(currentItem)) {
						result.primaryColumnValue = currentItem;
					} else {
						result.operation = currentItem;
					}
				} else {
					schemas.push(currentItem);
				}
			}
			if (result.operation && result.operation !== addOperation) {
				result.primaryColumnValue = historyStateItems[currentItemIndex];
				currentItemIndex++;
			}
			return result;
		},

		/**
		 * # ######### ######### ####### ######## ####### ######### # ######## #######,
		 * # ##### ######## ######-###########, #### ## ####.
		 * @param {String} historyState ######### ####### ########.
		 * @return {String} ################# ######### ####### ########.
		 */
		clean: function(historyState) {
			historyState = historyState.trim();
			if (historyState.substr(-1) === this.delimiter) {
				historyState = historyState.slice(0, -1);
			}
			return historyState;
		},

		/**
		 * ######### ############## ####### ######### ######### ####### ######## # ########### ## ######## #####
		 * {@link reverse}.
		 * @param {Array} items ######## ######### ####### ########.
		 * @param {Boolean} reverse True, #### ########## ######### ############## ####### ######### ######### #######
		 * ########.
		 */
		prepare: function(items, reverse) {
			if (reverse) {
				items.reverse();
			}
		},

		/**
		 * Return section info.
		 * @protected
		 * @return {Object} Section info.
		 */
		getSectionInfo: function() {
			var historyState = this.getHistoryStateInfo();
			var sectionSchema = historyState.schemas[0];
			var sectionModule = sectionSchema ? "" : historyState.module;
			var filters = [{
				property: "sectionSchema",
				value: sectionSchema
			}, {
				property: "sectionModule",
				value: sectionModule
			}];
			return this.getFilteredSectionInfo(filters);
		},

		/**
		 * Returns filtered section info.
		 * @private
		 * @param {Object[]} filters - Objects array.
		 * @param {String} filters[].property - ModuleStructure property for filter.
		 * @param {String} filters[].value - ModuleStructure property value for filter.
		 * @return {Object} Section info.
		 */
		getFilteredSectionInfo: function(filters) {
			var sectionInfo = null;
			this.Terrasoft.each(filters, function(filter) {
				if (!this.Ext.isEmpty(filter)) {
					this.Terrasoft.each(Terrasoft.configuration.ModuleStructure, function(moduleStructureItem) {
						if (moduleStructureItem.hasOwnProperty(filter.property) &&
								moduleStructureItem[filter.property] === filter.value) {
							sectionInfo = moduleStructureItem;
							return false;
						}
					}, this);
					if (sectionInfo) {
						return false;
					}
				}
			}, this);
			return sectionInfo;
		},

		/**
		 * Returns section caption.
		 * @protected
		 * @return {String} Section caption.
		 */
		getSectionCaption: function() {
			if (Terrasoft.Features.getIsEnabled("OldUI")) {
				return "";
			}
			var historyState = this.getHistoryStateInfo();
			var cardSchema = historyState.schemas[0];
			var sectionModule = cardSchema ? "" : historyState.module;
			var filters = [{
				property: "entitySchemaName",
				value: this.entitySchemaName
			}, {
				property: "cardSchema",
				value: cardSchema
			}, {
				property: "sectionSchema",
				value: cardSchema
			}, {
				property: "sectionModule",
				value: sectionModule
			}];
			var sectionInfo = this.getFilteredSectionInfo(filters);
			return sectionInfo ? sectionInfo.moduleCaption : "";
		}
	});
	return Terrasoft.HistoryStateUtilities;
});



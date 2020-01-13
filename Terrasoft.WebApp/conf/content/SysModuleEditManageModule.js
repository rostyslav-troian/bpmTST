Terrasoft.configuration.Structures["SysModuleEditManageModule"] = {innerHierarchyStack: ["SysModuleEditManageModule"]};
define("SysModuleEditManageModule", ["NetworkUtilities", "MiniPageUtilities", "BaseModule"],
	function(NetworkUtilities) {

		/**
		 * @class Terrasoft.configuration.SysModuleEditManageModule
		 * QuickAddMenuItem manage module class.
		 * To open QuickAddMenuItem from another module you need to feel another module UId in QuickAddMenuItem
		 * ModuleUId column. Module which you want to use must have public Run method.
		 */
		Ext.define("Terrasoft.configuration.SysModuleEditManageModule", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.SysModuleEditManageModule",
			mixins: {

				/**
				 * @class MiniPageUtilities Mixin, used for Mini Pages
				 * @type {String}
				 */
				MiniPageUtilities: "Terrasoft.MiniPageUtilities"
			},

			/**
			 * Gets quick menu item module id value.
			 * @private
			 * @param {Object} moduleConfig Module config.
			 * @param {String} moduleConfig.tag SysModuleEdit id value.
			 * @param {String} moduleConfig.typeColumnValue Type column id value.
			 * @return {String} Module id value.
			 */
			getModuleId: function(moduleConfig) {
				var idPrefix = "ViewModule_SectionModuleV2_CardModuleV2_chain";
				var tag = moduleConfig.tag || Terrasoft.GUID_EMPTY;
				var typeColumnValue = moduleConfig.typeColumnValue || Terrasoft.GUID_EMPTY;
				var idPostfix = Terrasoft.generateGUID();
				return Ext.String.format("{0}_{1}_{2}_{3}", idPrefix, tag, typeColumnValue, idPostfix);
			},

			/**
			 * Gets quick menu item default values.
			 * @private
			 * @param {Object} valuesConfig Default values config.
			 * @param {String} valuesConfig.typeColumnName Entity type column name.
			 * @param {String} valuesConfig.typeColumnValue Entity type column id value.
			 * @param {String} [valuesConfig.primaryDisplayColumnName] Entity display column name.
			 * @param {String} [valuesConfig.primaryDisplayColumnValue] Entity display column value.
			 * @return {Array} Default values array.
			 */
			getCardDefaultValues: function(valuesConfig) {
				var typeColumn = {
					name: valuesConfig.typeColumnName,
					value: valuesConfig.typeColumnValue
				};
				var defaultValues = [typeColumn];
				var primaryDisplayColumnName = valuesConfig.primaryDisplayColumnName;
				var primaryDisplayColumnValue = valuesConfig.primaryDisplayColumnValue;
				if (primaryDisplayColumnName && primaryDisplayColumnValue) {
					var primaryDisplayColumn = {
						name: primaryDisplayColumnName,
						value: primaryDisplayColumnValue
					};
					defaultValues.push(primaryDisplayColumn);
				}
				defaultValues.push({
					name: "IsFromQuickAddMenu",
					value: true
				});
				return defaultValues;
			},

			/**
			 * Open quick menu item add card.
			 * @param {Object} config Configuration information.
			 * @param {Terrasoft.BaseViewModel} config.item Quick menu item view model.
			 * @param {Object} config.sandbox Sandbox from module, that opens card.
			 */
			openAddCard: function(config) {
				var item = config.item;
				var typeColumnValue = item.get("TypeColumnValue");
				var entitySchemaName = item.get("EntitySchemaName");
				var moduleId = this.getModuleId({
					tag: item.get("Tag"),
					typeColumnValue: typeColumnValue
				});
				var defaultValues = this.getCardDefaultValues({
					typeColumnName: item.get("TypeColumnName"),
					typeColumnValue: typeColumnValue,
					primaryDisplayColumnName: item.get("PrimaryDisplayColumnName"),
					primaryDisplayColumnValue: item.get("PrimaryDisplayColumnValue")
				});
				var miniPage = item.get("MiniPage");
				if (miniPage && miniPage.hasAddMiniPage) {
					this.openAddMiniPage({
						entitySchemaName: entitySchemaName,
						valuePairs: defaultValues
					});
				} else {
					this.openCardInChain({
						typeId: typeColumnValue,
						sandbox: config.sandbox,
						entitySchemaName: entitySchemaName,
						schemaName: item.get("EditPageName"),
						operation: Terrasoft.ConfigurationEnums.CardOperation.ADD,
						moduleId: moduleId,
						defaultValues: defaultValues
					});
				}
			},

			/**
			 * Opens card in chain.
			 * @param {Object} config Configuration for opening card.
			 * @param {String} config.schemaName Card schema name.
			 * @param {String} config.entitySchemaName Entity schema name.
			 * @param {Object} config.sandbox Sandbox from module, that opens card.
			 * @param {String} config.id Primary column value identifier.
			 * @param {String} config.moduleId Card module identifier.
			 * @param {String} [config.typeId] Card type identifier.
			 * @param {Terrasoft.ConfigurationEnums.CardOperation} config.operation Operation, that will pass to card.
			 * @param {Array} config.defaultValues Default values for card fields.
			 */
			openCardInChain: function(config) {
				var historyState = config.sandbox.publish("GetHistoryState");
				var cardConfig = {
					sandbox: config.sandbox,
					entitySchemaName: config.entitySchemaName,
					operation: config.operation,
					historyState: historyState,
					valuePairs: config.defaultValues,
					typeId: config.typeId,
					moduleId: config.moduleId
				};
				NetworkUtilities.openCardInChain(cardConfig);
			},

			/**
			 * Opens quick menu item add card.
			 * @deprecated
			 * @param {Object} config Open card configuration information.
			 */
			Run: function(config) {
				var obsoleteMessage = Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
				window.console.warn(Ext.String.format(obsoleteMessage, "Run", "run"));
				this.run(config);
			},

			/**
			 * Opens quick menu item add card.
			 * @param {Object} config Open card configuration information.
			 */
			run: function(config) {
				this.openAddCard(config);
			}
		});
		return Ext.create("Terrasoft.SysModuleEditManageModule");
	});



Terrasoft.configuration.Structures["DetailModuleV2"] = {innerHierarchyStack: ["DetailModuleV2"]};
define("DetailModuleV2", ["BaseSchemaModuleV2", "css!SectionModuleV2", "css!BaseSectionV2CSS"], function() {
	/**
	 * @class Terrasoft.configuration.DetailModule
	 * ##### DetailModule ############ ### ######## ########## ######
	 */
	Ext.define("Terrasoft.configuration.DetailModule", {
		alternateClassName: "Terrasoft.DetailModule",
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * ########## # ######
		 */
		detailInfo: null,

		/**
		 * Prefix for elements identifier in dom tree.
		 * This prefix must be unique.
		 */
		detailElementsPrefix: null,

		/**
		 * Returns profile key.
		 * @returns {String}
		 */
		getProfileKey: function() {
			var detailInfo = this.detailInfo;
			return detailInfo.profileKey || Ext.String.format("{0}{1}", detailInfo.cardPageName, detailInfo.schemaName);
		},

		/**
		 * ############# #########, ######## #####, ########## ##### ###### ############# # #############.
		 * ##### ##### ####### # ############## ######### #############
		 * @overriden
		 */
		init: function() {
			this.subscribeMessages();
			this.initDetailInfo();
			this.callParent(arguments);
		},

		/**
		 * Subscribe to messages.
		 * @protected
		 */
		subscribeMessages: function() {
			this.sandbox.subscribe("RerenderDetail", function(config) {
				if (this.viewModel) {
					var renderTo = this.Ext.get(config.renderTo);
					if (renderTo) {
						this.render(renderTo);
						return true;
					}
				}
			}, this, [this.sandbox.id]);
		},

		/**
		 * Gets the config object of the view model.
		 * @return {Object} Config object of the view model.
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			var detailInfo = this.detailInfo;
			this.Ext.apply(viewModelConfig, {
				values: {
					MasterRecordId: detailInfo.masterRecordId,
					DetailColumnName: detailInfo.detailColumnName,
					Filter: detailInfo.filter,
					CardPageName: detailInfo.cardPageName,
					SchemaName: detailInfo.schemaName,
					DefaultValues: detailInfo.defaultValues,
					Caption: detailInfo.caption,
					UseRelationship: detailInfo.useRelationship,
					RelationType: detailInfo.relationType,
					RelationTypePath: detailInfo.relationTypePath,
					RelationshipPath: detailInfo.relationshipPath,
					IsEnabled: detailInfo.isEnabled,
					ProfileKey: detailInfo.profileKey,
					IsFromPage: detailInfo.isFromPage
				}
			});
			return viewModelConfig;
		},

		/**
		 * Initialize schema name.
		 * @protected
		 * @override
		 */
		initSchemaName: function() {
			this.schemaName = this.detailInfo.schemaName || "";
			this.entitySchemaName = this.detailInfo.entitySchemaName;
		},

		/**
		 * Initialize detail info.
		 * @protected
		 */
		initDetailInfo: function() {
			this.detailInfo = this.sandbox.publish("GetDetailInfo", null, [this.sandbox.id]) || {};
			this.detailElementsPrefix = this.detailInfo.detailElementsPrefix;
		},

		/**
		 * ######## ######### ####### # ####### #########, #### ### ############# ###### ########## ## ########
		 * @protected
		 * @overriden
		 */
		initHistoryState: Ext.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModuleV2#getElementsPrefix
		 * @override
		 */
		getElementsPrefix: function() {
			return this.detailElementsPrefix;
		}
	});

	return Terrasoft.DetailModule;
});



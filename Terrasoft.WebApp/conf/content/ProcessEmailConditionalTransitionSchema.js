Terrasoft.configuration.Structures["ProcessEmailConditionalTransitionSchema"] = {innerHierarchyStack: ["ProcessEmailConditionalTransitionSchema"], structureParent: "ProcessCampaignConditionalSequenceFlowSchema"};
define("ProcessEmailConditionalTransitionSchema", ["CampaignEnums", "ProcessEmailConditionalTransitionSchemaResources",
	"ProcessCampaignConditionalSequenceFlowSchema"],
		function(CampaignEnums) {
	Ext.define("Terrasoft.manager.ProcessEmailConditionalTransitionSchema", {
		extend: "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema",
		alternateClassName: "Terrasoft.ProcessEmailConditionalTransitionSchema",

		managerItemUId: "741B3FE3-D9C2-4032-B51E-D335F0F75F5C",

		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @override
		 */
		typeName: "Terrasoft.Configuration.EmailConditionalTransitionElement, Terrasoft.Configuration",

		/**
		 * Sequence flow name.
		 * @type {String}
		 */
		connectionUserHandleName: "EmailConditionalTransition",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 * @override
		 */
		editPageSchemaName: "EmailConditionalTransitionPropertiesPage",

		/**
		 * Type of element.
		 * @type {String}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.CONDITIONAL_TRANSITION,

		/**
		 * Array of recipient email responses.
		 * @type {String}
		 */
		emailResponseId: null,

		/**
		 * Is transition response based.
		 * @type {Boolean}
		 */
		isResponseBasedStart: false,

		/**
		 * Array of hyperlink Ids to click
		 * @type {String}
		 */
		hyperlinkId: null,

		/**
		 * Array of BPM track ids of the hyperlinks to click.
		 * @type {String}
		 */
		hyperlinkTrackId: null,

		/**
		 * @inheritdoc Terrasoft.ProcessSequenceFlowSchema#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
		},

		/**
		 * Clears clicks response from all email responses if it had been selected.
		 * @private
		 */
		_uncheckHyperlinkClicksResponse: function() {
			var responseIds = Terrasoft.decode(this.emailResponseId);
			if (Terrasoft.contains(responseIds, CampaignEnums.BulkEmailResponses.CLICKS)) {
				Ext.Array.remove(responseIds, CampaignEnums.BulkEmailResponses.CLICKS);
				this.emailResponseId = Terrasoft.encode(responseIds);
			}
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @override
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			Ext.Array.push(baseSerializableProperties, ["emailResponseId"]);
			Ext.Array.push(baseSerializableProperties, ["isResponseBasedStart"]);
			Ext.Array.push(baseSerializableProperties, ["hyperlinkId"]);
			Ext.Array.push(baseSerializableProperties, ["hyperlinkTrackId"]);
			return baseSerializableProperties;
		},

		/**
		 * Returns True if sequence flow has condition with connections on other entities.
		 * @public
		 * @returns {Boolean} Result of connections validation.
		 */
		checkDependencies: function() {
			var hyperlinkIds = Terrasoft.decode(this.hyperlinkId);
			var hyperlinkTrackIds = Terrasoft.decode(this.hyperlinkTrackId);
			return Terrasoft.isEmpty(hyperlinkIds) && Terrasoft.isEmpty(hyperlinkTrackIds);
		},

		/**
		 * Removes all connections data for current email conditional transition.
		 * @public
		 */
		clearDependentData: function() {
			if (!this.checkDependencies()) {
				this.hyperlinkId = Terrasoft.encode([]);
				this.hyperlinkTrackId = Terrasoft.encode([]);
				this._uncheckHyperlinkClicksResponse();
			}
		}
	});
	return Terrasoft.ProcessEmailConditionalTransitionSchema;
});



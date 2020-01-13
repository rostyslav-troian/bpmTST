Terrasoft.configuration.Structures["SspPageDetailsManagerItem"] = {innerHierarchyStack: ["SspPageDetailsManagerItem"]};
define("SspPageDetailsManagerItem", ["SspPageDetailsManagerItemResources", "AnalyticsManagerItem"], function() {

	/**
	 * @class Terrasoft.SspPageDetailsManagerItem
	 */

	Ext.define("Terrasoft.SspPageDetailsManagerItem", {
		extend: "Terrasoft.AnalyticsManagerItem",
		alternateClassName: "Terrasoft.SspPageDetailsManagerItem",

		// region Properties: Public

		/**
		 * Edit page schema unique identifier.
		 * @type {String}
		 */
		cardSchemaUId: null,

		/**
		 * Entity schema identifier.
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * SysDetail lookup value.
		 * @type {Object}
		 */
		sysDetail: null,

		// endregion

        // region Methods: Public

        /**
         * Returns related SysDetail identitfier.
         * @return {String} SysDetail identitfier.
         */
        getSysDetailId: function() {
			var sysDetail = this.getPropertyValue("sysDetail");
			return sysDetail && sysDetail.value;
		},

		/**
		 * Sets SysDetail identifier.
		 * @param {String} sysDetailId SysDetail identifier.
		 */
		setSysDetailId: function(sysDetailId) {
			this.setPropertyValue("sysDetail", {
				value: sysDetailId,
				displayValue: ""
			});
		},

		/**
		 * @inheritdoc Terrasoft.AnalyticsManagerItem#getModifiedString
		 * @override
		 */
		getModifiedString: function() {
			const detail = this.detail;
			const detailCaption = detail && detail.caption;
			if (!detailCaption) {
				return Terrasoft.emptyString;
			}
			return (this.getIsDeleted() ? "-" : "+") + detailCaption;
		}

		// endregion

	});

	return Terrasoft.SspPageDetailsManagerItem;
});



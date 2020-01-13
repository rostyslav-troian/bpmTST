Terrasoft.configuration.Structures["DcmSchemaStageTarget"] = {innerHierarchyStack: ["DcmSchemaStageTarget"]};
define("DcmSchemaStageTarget", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.Designers.DcmSchemaStageTarget
		 * Dcm stage target schema class.
		 */
		Ext.define("Terrasoft.Designers.DcmSchemaStageTarget", {
			extend: "Terrasoft.BaseProcessSchemaElement",
			alternateClassName: "Terrasoft.DcmSchemaStageTarget",

			//region Properties: Protected

			/**
			 * List of target stages uId.
			 * @type {Array}
			 */
			targets: null,

			//endregion

			//region Constructors: Public

			/**
			 * @inheritdoc Terrasoft.manager.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.targets = [];
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
			 * @overridden
			 */
			getSerializableProperties: function() {
				var properties = this.callParent(arguments);
				return Ext.Array.push(properties, ["targets"]);
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns source stage UId.
 			 * @return {String}
			 */
			getStageUId: function() {
				return this.uId;
			}

			//endregion

		});

		return Terrasoft.Designers.DcmSchemaStageTarget;
	}
);



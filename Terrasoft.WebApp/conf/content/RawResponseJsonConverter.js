Terrasoft.configuration.Structures["RawResponseJsonConverter"] = {innerHierarchyStack: ["RawResponseJsonConverter"]};
define("RawResponseJsonConverter", ["RawConverter", "RawJsonConverter"],
	function(RawConverter) {
		Ext.define("Terrasoft.services.RawResponseJsonConverter", {
			alternateClassName: "Terrasoft.RawResponseJsonConverter",
			extend: "Terrasoft.RawJsonConverter",

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.RawJsonConverter#convert
			 * @override
			 */
			convert: function() {
				this.rawType = RawConverter.RESPONSE;
				const result = this.callParent(arguments);
				result[this.sectionResponse] = result[this.sectionRequest];
				delete result[this.sectionRequest];
				return result;
			}

			//endregion

		});

		return Terrasoft.RawResponseJsonConverter;
});



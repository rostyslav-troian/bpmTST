define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Ext.create("Terrasoft.FloatEdit", {
				renderTo: renderTo,
				width: "300px",
				value: "-123456789.2334"
			});

			Ext.create("Terrasoft.FloatEdit", {
				renderTo: renderTo,
				width: "300px",
				placeholder: "some placeholder",
				useThousandSeparator: false
			});
		}
	};
});
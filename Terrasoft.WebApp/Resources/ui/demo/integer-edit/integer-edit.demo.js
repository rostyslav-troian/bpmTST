define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Ext.create('Terrasoft.IntegerEdit', {
				renderTo: renderTo,
				value: '0000000000012321321',
				width: '300px'
			});
			Ext.create('Terrasoft.IntegerEdit', {
				renderTo: renderTo,
				useThousandSeparator: false,
				value: '0000000000012321321',
				width: '300px'
			});
		}
	};
});
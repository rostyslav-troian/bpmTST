define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
		window.label = Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: 'Some Text for caption width = "150px" word wrap is on',
				width: '150px',
				markerValue: 'Имя'
			});
		}
	};
});
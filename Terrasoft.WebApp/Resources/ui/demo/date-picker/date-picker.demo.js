define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			window.datepicker = Ext.create('Terrasoft.DatePicker', {
				renderTo: renderTo
			});
		}
	};
});
define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var spinners = {};

			spinners.spinner1 = Ext.create('Terrasoft.ProgressSpinner', {
				extraComponentClasses: "",
				renderTo: renderTo
			});

			spinners.spinner2 = Ext.create('Terrasoft.ProgressSpinner', {
				width: "100px",
				renderTo: renderTo
			});

			spinners.spinner3 = Ext.create('Terrasoft.ProgressSpinner', {
				width: "30em",
				renderTo: renderTo
			});
		}
	};
});
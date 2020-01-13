define(["ext-base", "terrasoft"], function(Ext) {
	return {
		"render": function(renderTo) {
			var date = new Date();
			window.timeedit = Ext.create("Terrasoft.TimeEdit", {
				renderTo: renderTo,
				width: "300px",
				value: date,
				timeToFocus: "15:20"
			});
			Ext.create("Terrasoft.TimeEdit", {
				renderTo: renderTo,
				width: "300px",
				timeToFocus: "15:20"
			});
			Ext.create("Terrasoft.TimeEdit", {
				renderTo: renderTo,
				width: "75px",
				value: date,
				timeToFocus: "15:30"
			});
		}
	};
});
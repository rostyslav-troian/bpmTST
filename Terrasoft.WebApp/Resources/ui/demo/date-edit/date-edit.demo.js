define(["ext-base", "terrasoft"], function(Ext) {
	return {
		"render": function(renderTo) {
			var date = new Date();
			date.setDate(1);
			date.setMonth(date.getMonth() + 2);
			window.dateedit = Ext.create("Terrasoft.DateEdit", {
				renderTo: renderTo,
				width: "300px",
				placeholder: "Введите дату в формате dd.mm.yyyy",
				value: date
			});
			Ext.create("Terrasoft.DateEdit", {
				renderTo: renderTo,
				width: "300px",
				placeholder: "Введите дату в формате dd.mm.yyyy"
			});
			Ext.create("Terrasoft.DateEdit", {
				renderTo: renderTo,
				width: "110px",
				placeholder: "Введите дату в формате dd.mm.yyyy",
				value: date
			});
		}
	};
});
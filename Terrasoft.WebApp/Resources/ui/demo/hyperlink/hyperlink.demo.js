define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			window.hyperlink = Ext.create('Terrasoft.Hyperlink', {
				renderTo: renderTo,
				caption: 'Some Text Caption/ set - target',
				width: "300px",
				font: "22px 'Segoe UI Light', Verdana, sans-serif",
				href: 'http://google.com',
				hint: 'go to google',
				name: "#",
				target: Terrasoft.controls.HyperlinkEnums.target.SELF,
				markerValue: 'Имя'
			});
			window.hyperlink = Ext.create('Terrasoft.Hyperlink', {
				renderTo: renderTo,
				caption: 'Some Text Caption/ set - download',
				width: '250px',
				href: 'http://google.com',
				name: "#",
				markerValue: 'Имя'
			});
			window.hyperlink = Ext.create('Terrasoft.Hyperlink', {
				renderTo: renderTo,
				caption: 'Some Text Caption/ set - type',
				width: '250px',
				href: 'http://google.com',
				name: "#",
				type: "text",
				markerValue: 'Имя'
			});
		}
	};
});

define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var tool = Ext.create("Terrasoft.Button", {
				caption: "Tool",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				visible: true
			});
			window.controlgroup = Ext.create("Terrasoft.ControlGroup", {
				renderTo: renderTo,
				caption: "Control Group",
				width: "300px",
				bottomLine: false,
				captionInUppercase: false,
				wrapClass: "abababa",
				items: [
					{
						className: "Terrasoft.Label",
						caption: "caption for field",
						visible: true
					},
					{
						className: "Terrasoft.TextEdit",
						visible: true
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field",
						visible: true
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					}
				],
				tools: [
					tool
				]
			});
			Ext.create("Terrasoft.ControlGroup", {
				renderTo: renderTo,
				caption: "Control Group with captions width = 300px",
				width: "300px",
				items: [
					{
						className: "Terrasoft.Label",
						caption: "Some text in caption"
					},
					{
						className: "Terrasoft.Label",
						caption: "Some very very very very very long text in caption"
					},
					{
						className: "Terrasoft.Label",
						caption: "Short text"
					}
				]
			});
			Ext.create("Terrasoft.ControlGroup", {
				renderTo: renderTo,
				caption: "short CG",
				width: "150px",
				items: [
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					}
				]
			});
			Ext.create("Terrasoft.ControlGroup", {
				renderTo: renderTo,
				caption: "Control Group initialy opened width = 300px",
				width: "300px",
				collapsed: false,
				items: [
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					},
					{
						className: "Terrasoft.Label",
						caption: "caption for field"
					},
					{
						className: "Terrasoft.TextEdit"
					}
				]
			});
		}
	};
});
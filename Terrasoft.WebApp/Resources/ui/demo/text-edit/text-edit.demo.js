define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var errorMessage = "Неверное значение";
			Ext.create("Terrasoft.Container", {
				id: "texteditContainer",
				tpl: [
					/*jshint quotmark:false */
					'<div id="{id}" class="examples">',
					'<tpl for="items">',
					'<div class="example">',
					'<@item>',
					'</div>',
					'</tpl>',
					'</div>'
					/*jshint quotmark:double */
				],
				renderTo: renderTo,
				selectors: {
					wrapEl: "#texteditContainer"
				},
				items: [
					Ext.create("Terrasoft.TextEdit", {
						value: "Иконка через url",
						leftIconConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/gif;base64,R0lGODlhEAAQAPAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h" +
							"1HaWZCdWlsZGVyIDAuNSBieSBZdmVzIFBpZ3VldAAh+QQJDwAAACwAAAAAEAAQAAACIISPqcsWH5pDT6poD9Z" +
							"ywwWF31VNzWZmAJqVKROqslUAACH5BAkPAAAALAAAAAAQABAAAAIhhI+pyxkc4jtxVTXRdbxl8GFaA45e54Ql" +
							"poKf1K7kTCsFACH5BAkPAAAALAAAAAAQABAAAAIjhA+By6Hc3INJOWrmpBv1vmygR2IiloQcmmbodZkSm40rU" +
							"wAAIfkECQ8AAAAsAAAAABAAEAAAAiCEj6nLFh/cegiqmGxm+PQGhuL4AaV3UVumOqfptuPMFAA7"
						},
						placeholder: "Текст для пустого поля"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Иконка классом",
						leftIconClasses: ["sprite", "sprite-home_16x16"],
						placeholder: "Текст для пустого поля"
					}),
					Ext.create("Terrasoft.TextEdit", {
						validationInfo: { isValid: false, invalidMessage: errorMessage },
						leftIconClasses: ["sprite", "sprite-home_16x16"],
						placeholder: "Нет значения поля и статус ошибки"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Шрифт указан отдельно",
						fontFamily: "Verdana"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Кегель 18px",
						fontSize: "18px"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Disabled",
						leftIconClasses: ["sprite", "sprite-home_16x16"],
						enabled: false
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Readonly",
						readonly: true
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Protected",
						protect: true
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Big style",
						bigSize: true,
						leftIconClasses: ["sprite", "sprite-home_16x16"],
						placeholder: "Текст для пустого поля"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Big style without icon",
						bigSize: true,
						placeholder: "Текст для пустого поля"
					}),
					Ext.create("Terrasoft.TextEdit", {
						value: "Какой-то текст",
						placeholder: "Текст для пустого поля"
					}),
					Ext.create("Terrasoft.TextEdit", {
						hasClearIcon: true,
						value: "Текст можно удалить иконкой",
						rightIconClasses: ["sprite", "sprite-home_16x16"]
					}),
					Ext.create("Terrasoft.TextEdit", {
						hasClearIcon: true,
						value: "Текст можно удалить иконкой"
					}),
					Ext.create("Terrasoft.TextEdit", {
						hasClearIcon: true,
						value: "test",
						enabled: false
					})
				]
			});
		}
	};
});
define(["ext-base", "terrasoft"], function(Ext) {
	return {
		"render": function(renderTo) {

			Ext.create("Terrasoft.Container", {
				id: "baseeditContainer",
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
					wrapEl: "#baseeditContainer"
				},
				items: [
					Ext.create("Terrasoft.BaseEdit", {
						value: "Текст можно удалить иконкой",
						hasClearIcon: true
					}),
					Ext.create("Terrasoft.BaseEdit", {
						value: "Отображение ссылки - www.google.com.ua",
						href: "http:\\www.google.com",
						showValueAsLink: true,
						hasClearIcon: true
					}),
					Ext.create("Terrasoft.BaseEdit", {
						hasClearIcon: true,
						value: "test",
						enabled: false
					}),
					Ext.create("Terrasoft.BaseEdit", {
						value: "Текст можно удалить иконкой",
						hasClearIcon: true,
						width: "100px"
					}),
					Ext.create("Terrasoft.BaseEdit", {
						value: "Отображение ссылки - www.google.com.ua",
						href: "http:\\www.google.com",
						showValueAsLink: true,
						hasClearIcon: true,
						width: "100px"
					}),
					Ext.create("Terrasoft.BaseEdit", {
						hasClearIcon: true,
						value: "test",
						enabled: false,
						width: "100px"
					})
				]
			});
		}
	};
});
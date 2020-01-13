define(["ext-base", "terrasoft"], function(Ext) {
	return {
		"render": function(renderTo) {

			Ext.create("Terrasoft.Container", {
				id: "InlineTextEditContainer",
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
					wrapEl: "#InlineTextEditContainer"
				},
				items: [
					Ext.create("Terrasoft.InlineTextEdit", {
						placeholder: "Место для курения"
					})
				]
			});
		}
	};
});
define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			var counter = 0;
			var createElement = function(caption, group, checked, enabled) {
				counter++;
				return Ext.create('Terrasoft.Container', {
					id: 'control' + counter,
					selectors: {
						wrapEl: '#control' + counter
					},
					tpl: [
						'<div id={id}>',
							'{%this.renderLabelItem(out, values)%}',
							'{%this.renderRadiobuttonItem(out, values)%}',
						'</div>'
					],
					tplData: {
						renderLabelItem: function(buffer, renderData) {
							var self = renderData.self;
							var item = self.items.getAt(0);
							// TODO Return to normal view:

							item.inputId = self.items.getAt(1).id + '-el';
							buffer.push(item.generateHtml());
						},
						renderRadiobuttonItem: function(buffer, renderData) {
							var item = renderData.self.items.getAt(1);
							buffer.push(item.generateHtml());
						}
					},
					items: [
						Ext.create('Terrasoft.Label', {
							caption: caption
						}),
						Ext.create('Terrasoft.RadioButton', {
							enabled: enabled,
							checked: checked
						})
					]
				});
			};

			var testElement = createElement('TEST RADIOBUTTON', 'group0', false, true);
			var testCheckbox = testElement.items.getAt(1);

			Ext.create('Terrasoft.Container', {
				id: 'checkBoxContainer',
				tpl: [
					'<div id={id}>',
						'<tpl for="items">',
							'<@item>',
						'</tpl>',
					'</div>'
				],
				selectors: {
					wrapEl: '#checkBoxContainer'
				},
				renderTo: renderTo,
				items: [
					createElement('Enabled', 'group1', false, true),
					createElement('Enabled checked', 'group2', true, true),
					createElement('Disabled', 'group3', false, false),
					createElement('Disabled checked', 'group4', true, false),
					testElement,
					Ext.create('Terrasoft.Button', {
						caption: "Check",
						handler: function() {
							testCheckbox.setChecked(true);
						}
					}),
					Ext.create('Terrasoft.Button', {
						caption: "Uncheck",
						handler: function() {
							testCheckbox.setChecked(false);
						}
					}),
					Ext.create('Terrasoft.Button', {
						caption: "Enable",
						handler: function() {
							testCheckbox.setEnabled(true);
						}
					}),
					Ext.create('Terrasoft.Button', {
						caption: "Disable",
						handler: function() {
							testCheckbox.setEnabled(false);
						}
					})
				]
			});
		}
	};
});
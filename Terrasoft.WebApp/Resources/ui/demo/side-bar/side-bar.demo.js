define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
		renderTo.dom.innerHTML = '<div id="wr1" style= "display: inline-block; height: 100%; float: left; margin-right: 20px;"></div>' + 
			'<div id="wr2" style= "display: inline-block; height: 100%; float: left;"></div>';
			var wr1 = Ext.get("wr1");
			var wr2 = Ext.get("wr2");
			var sidebar = window.sidebar = Ext.create('Terrasoft.SideBar', {
				renderTo: wr1,
				items: [
					{
						caption: 'Тестовый элемент0',
						notation: '12',
						tag: 'Tag1'
					},
					{
						caption: 'Тестовый элемент1',
						notation: '11',
						visible: false
					},
					{
						caption: 'Тестовый элемент2',
						notation: '1'
					},
					{
						caption: 'Тестовый элемент3'
					},
					{
						caption: 'Тестовый элемент4'
					},
					{
						caption: 'Тестовый элемент5'
					},
					{
						caption: 'Тестовый элемент6'
					},
					{
						caption: 'Тестовый элемент7'
					},
					{
						caption: 'Тестовый элемент8'
					},
					{
						caption: 'Тестовый элемент9'
					}
				],
				selectedItemIndex: 3,
				maxWidth: '210px'
			});
			Ext.create('Terrasoft.Label', {
				renderTo: wr2,
				caption: 'Selected item'
			});
			var textedit = Ext.create('Terrasoft.TextEdit', {
				renderTo: wr2,
				width: '100px'
			});
			sidebar.on('itemSelected', function(item, tag) {
				textedit.setValue(item);
			});
		}
	};
});
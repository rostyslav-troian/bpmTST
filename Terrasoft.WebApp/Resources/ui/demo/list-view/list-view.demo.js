define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			renderTo.dom.innerHTML =
				'<div id="test-buttons"></div>' +
				'<hr>' +
				'<textarea id="console-log" rows="15" cols="150" style="font-size: 14px;"></textarea>' +
				'<hr>' +
				'<div id="listview-container"></div>'
			;

			var logTextarea = Ext.get('console-log');
			var log = function(add) {
				logTextarea.setHTML(dump(add) + "\n" + logTextarea.getValue());
			};
			var dump = function(arr,level) {
				var dumped_text = "";
				if(!level) level = 0;
				var level_padding = "";
				for(var j=0;j<level+1;j++) level_padding += "    ";
				if(typeof(arr) == 'object') { //Array/Hashes/Objects
					for(var item in arr) {
						var value = arr[item];
						if(typeof(value) == 'object') { //If it is an array,
							dumped_text += level_padding + "'" + item + "' ...\n";
							dumped_text += dump(value,level+1);
						} else {
							dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
						}
					}
				} else {
					dumped_text = arr;
				}
				return dumped_text;
			};

			var collection = Ext.create('Terrasoft.Collection');
			collection.add('key1', {Id: 1, Name: 'Киев'});
			collection.add('key2', {Id: 2, Name: 'Харьков'});
			collection.add('key3', {Id: 3, Name: 'Тернополь', ImageConfig: {
				source: Terrasoft.ImageSources.URL,
				url: 'http://www.rw-designer.com/sml/sleep.gif'
			}});
			collection.add('key4', {Id: 4, Name: 'Львов'});
			collection.add('key5', {Id: 5, Name: 'Запорожье'});
			collection.add('key6', {Id: 0, Name: 'Пустое значение 0'});
			collection.add('key7', {Id: undefined, Name: 'Пустое значение undefined'});
			collection.add('key8', {Id: null, Name: 'Пустое значение null'});

			var listview = Ext.create('Terrasoft.ListView', {
				map: {
					value: 'Id',
					displayValue: 'Name',
					imageConfig: 'ImageConfig'
				},
				alignEl: Ext.get('listview-container'),
				renderTo: Ext.get('listview-container')
			});
			listview.loadList(collection);
			listview.show();

			var showHideProgressSpinner = Ext.create('Terrasoft.Button', {
				caption: "Показать/Скрыть индикатор процесса загрузки",
				renderTo: Ext.get('test-buttons')
			});
			showHideProgressSpinner.on('click', function() {
				log('showProgressSpinner: '+ !listview.showProgressSpinner);
				listview.show({
					showProgressSpinner: !listview.showProgressSpinner
				});
			});

			var selectDown = Ext.create('Terrasoft.Button', {
				caption: 'Выбрать следующий элемент списка',
				renderTo: Ext.get('test-buttons')
			});
			selectDown.on('click', function() {
				log("fireEvent('listPressDown')");
				listview.fireEvent('listPressDown');
			});

			var selectUp = Ext.create('Terrasoft.Button', {
				caption: 'Выбрать предыдущий элемент списка',
				renderTo: Ext.get('test-buttons')
			});
			selectUp.on('click', function() {
				log("fireEvent('listPressUp')");
				listview.fireEvent('listPressUp');
			});

			var pressEnter = Ext.create('Terrasoft.Button', {
				caption: 'Нажатие клавиши "Enter"',
				renderTo: Ext.get('test-buttons')
			});
			pressEnter.on('click', function() {
				log("fireEvent('listPressEnter')");
				listview.fireEvent('listPressEnter');
			});
			listview.on('select', function(data) {
				log(data);
			});

			var loadUnloadList = Ext.create('Terrasoft.Button', {
				caption: 'Выгрузить/Загрузить коллекцию данных',
				renderTo: Ext.get('test-buttons')
			});
			loadUnloadList.on('click', function() {
				if (listview.showProgressSpinner == false) {
					log('show spinner, hide list');
					listview.listItems = [];
					listview.show({
						showProgressSpinner: true
					});
				} else {
					log('hide spinner, show list');
					listview.loadList(collection);
					listview.show({
						showProgressSpinner: false
					});
				}

			});

		}
	};
});
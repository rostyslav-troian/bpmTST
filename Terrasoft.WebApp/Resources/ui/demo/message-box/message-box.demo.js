define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
			"render": function(renderTo) {
			var handler = function(returnCode, controlData) {
				alert(returnCode);
				Terrasoft.each(controlData, function(item, key) {
					alert(item.caption + ' = ' + item.value);
				}, this);
			};
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: 'Type MessageBox caption'
			});
			var textField = Ext.create('Terrasoft.TextEdit',{
				renderTo: renderTo,
				width: '200px'
			});
			Ext.create('Terrasoft.Component',{
				renderTo: renderTo,
				html: '<br class = "deliminer"><br>',
				selectors: {
					wrapEl: '.deliminer'
				}
			});
			var button1 = Ext.create('Terrasoft.Button', {
				caption: 'show InformationDialog',
				renderTo: renderTo
			});
			Ext.create('Terrasoft.Component',{
				renderTo: renderTo,
				html: '<br class = "deliminer"><br>',
				selectors: {
					wrapEl: '.deliminer'
				}
			});
			var button3 = Ext.create('Terrasoft.Button', {
				caption: 'show InputBox',
				renderTo: renderTo
			});
			var currentDate = new Date(Ext.Date.now());
			var controlConfig = {
				text: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					caption: 'Текст',
					value: 'Текст'
				},
				checkbox: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					caption: 'Галка',
					value: true
				},
				date: {
					dataValueType: Terrasoft.DataValueType.DATE,
					caption: 'Дата',
					value: new Date(currentDate)
				},
				time: {
					dataValueType: Terrasoft.DataValueType.TIME,
					caption: 'Время',
					value: new Date(currentDate)
				},
				enum: {
					dataValueType: Terrasoft.DataValueType.ENUM,
					caption: 'Перечисление',
					value: {
						value: 'Перечисление',
						displayValue: 'Перечисление'
					}
				},
				lookup: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					caption: 'Справочник',
					value: {
						value: 'Справочник',
						displayValue: 'Справочник'
					}
				},
				integer: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					caption: 'Целое',
					value: 23
				},
				float: {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					caption: 'Дробное',
					value: 23
				},
				money: {
					dataValueType: Terrasoft.DataValueType.MONEY,
					caption: 'Деньги',
					value: 23
				}
			};
			button3.on('click', function() {
				Terrasoft.utils.inputBox(
					textField.getValue(),
					handler,
					['yes', 'no', 'cancel'],
					this,
					Terrasoft.deepClone(controlConfig),
					{
						defaultButton: 0,
						classes: {
							coverClass: ['cover-calss1', 'cover-calss2'],
							captionClass: ['caption-calss1', 'caption-calss2']
						}
					}
				 );
			});
			button1.on('click', function() {
				Terrasoft.utils.showMessage({
					caption: textField.getValue(),
					handler: handler,
					buttons: ['yes', 'no', 'cancel'],
					defaultButton: 0,
					classes: {
						coverClass: ['cover-calss1', 'cover-calss2'],
						captionClass: ['caption-calss1', 'caption-calss2']
					}
				});
			});
			Ext.create('Terrasoft.Component',{
				renderTo: renderTo,
				html: '<br class = "deliminer"><br>',
				selectors: {
					wrapEl: '.deliminer'
				}
			});
			var button2 = Ext.create('Terrasoft.Button', {
				caption: 'show ConfirmationDialog',
				renderTo: renderTo
			});
			button2.on('click', function() {
				Terrasoft.utils.showMessage({
					caption: textField.getValue(),
					handler: handler,
					buttons: ['yes', 'no', 'cancel'],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.RED
				});
			});
		}
	}
});
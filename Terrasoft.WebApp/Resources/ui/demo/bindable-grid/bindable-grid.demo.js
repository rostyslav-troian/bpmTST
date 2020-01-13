define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var Bindable = {};
			prepareModel();
			renderView();

			function prepareModel() {
				Ext.define("Terrasoft.ViewModel", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ContactEntitySchema
				});
				Ext.define("Terrasoft.DataViewModel", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ContactEntitySchema,
					primaryColumnName: 'Id',
					columns: {
						Id: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'Id',
							dataValueType: Terrasoft.core.enums.DataValueType.GUID
						},
						Title: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'Title',
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT
						},
						PersonName: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'PersonName',
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT
						},
						Department: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'Department',
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT
						}
					}
				});
				Bindable.model = Ext.create("Terrasoft.ViewModel", {
					values: {
						GridData: new Terrasoft.BaseViewModelCollection()
					},
					methods: {
						prepareDataModel: function () {
							var list = this.get('GridData');
							list.clear();
							var item1 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 1,
									Title: 'Title 1',
									PersonName: 'Контакт 1',
									Department: 'R&D'
								},
								methods: {
									GetPriority: function() {
										return this.get('Title').indexOf('Клиент') !== -1 ;
									}
								}
							});
							item1.addInfo = 'Тестовое свойство 1';
							var item2 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 2,
									Title: 'Title 2',
									PersonName: 'Контакт 2',
									Department: 'R&D'
								},
								methods: {
									GetPriority: function() {
										return this.get('Title').indexOf('Клиент') !== -1 ;
									}
								}
							});
							item2.addInfo = 'Тестовое свойство 2';
							var item3 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 3,
									Title: 'Title 3',
									PersonName: 'Контакт 3',
									Department: 'R&D'
								},
								methods: {
									GetPriority: function() {
										return this.get('Title').indexOf('Клиент') !== -1 ;
									}
								}
							});
							item3.addInfo = 'Тестовое свойство 4';
							var objs = {
								'1': item1,
								'2': item2,
								'3': item3
							};
							list.loadAll(objs);
						},
						loadData: function() {
							this.prepareDataModel();
						},
						changeData: function() {
							var collection = this.get('GridData');
							collection.collection.items[0].set('Title', 'Данные изменились');
						},
						addData: function() {
							var collection = this.get('GridData');
							var item = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 4,
									Title: 'Title 4',
									PersonName: 'Контакт 4',
									Department: 'R&D'
								},
								methods: {
									GetPriority: function() {
										return this.get('Title').indexOf('Клиент') !== -1 ;
									}
								}
							});
							collection.add(4, item);
						},
						removeData: function() {
							var collection = this.get('GridData');
							var item = collection.collection.items[0];
							collection.remove(item);
						}
					}
				});
			}
			function renderView() {
				Bindable.view = Ext.create("Terrasoft.Container", {
					renderTo: renderTo,
					id: 'content',
					selectors: {
						el: "#content",
						wrapEl: "#content"
					},
					items: [
							{
							className: 'Terrasoft.Container',
							id: 'content-left',
							selectors: {
								el: '#content-left',
								wrapEl: '#content-left'
							},
							items: [
								{
									className: 'Terrasoft.Grid',
									type: 'tiled',
									collection: {
										bindTo: 'GridData'
									},
									columnsConfig: [
										[
											{
												cols: 24,
												key: [
													{
														name: {
															bindTo: 'Title'
														},
														type: 'title'
													}
												]
											}
										],
										[
											{
												cols: 12,
												key: [
													{
														name: 'Руководитель : ',
														type: 'caption'
													},
													{
														name: {
															bindTo: 'PersonName'
														}
													}
												]
											},
											{
												cols: 12,
												key: [
													{
														name: 'Родительский департамент : ',
														type: 'caption'
													},
													{
														name: {
															bindTo: 'Department'
														}
													}
												]
											}
										]
									]
								}
							]
						},
						{
							className: 'Terrasoft.Container',
							 id: 'content-right',
							 selectors: {
								 el: '#content-right',
								 wrapEl: '#content-right'
							 },
							 items: [
								 {
									className: 'Terrasoft.Button',
									id: 'gridButton',
									caption: 'Заполнить данные реестра',
									click: {
										bindTo: 'loadData'
									}
								 },
								 {
									className: 'Terrasoft.Button',
									id: 'changeButton',
									caption: 'Изменить данные',
									click: {
										bindTo: 'changeData'
									}
								 },
								 {
									className: 'Terrasoft.Button',
									id: 'addButton',
									caption: 'Добавить данные',
									click: {
										bindTo: 'addData'
									}
								 },
								 {
									className: 'Terrasoft.Button',
									id: 'removeButton',
									caption: 'Удалить данные',
									click: {
										bindTo: 'removeData'
									}
								 },
								 {
									 className: 'Terrasoft.MemoEdit',
									id: 'consoleLog',
									height: '56px'
								 }
							 ]
						}
					]
				});
				Bindable.model.on('change', function(model, fields) {
					var consoleLog = Ext.getCmp('consoleLog');
					var value = '';
					for (var key in fields.changes) {
						var changedValue = model.changed[key];
						if (changedValue && changedValue.value) {
							changedValue = changedValue.value + ':' + changedValue.displayValue;
						}
						value += 'Changed ViewModel\'s property ' + key + ': ' + changedValue + '\r\n';
					}
					consoleLog.setValue(value);
				}, this);
				Bindable.view.bind(Bindable.model);
			}
		}
	};
});
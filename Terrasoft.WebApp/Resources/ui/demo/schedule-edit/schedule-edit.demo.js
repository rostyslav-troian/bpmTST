define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		render: function(renderTo) {
			Bindable = {};
			var startDateValue =  new Date();
			startDateValue = new Date(startDateValue.setDate(startDateValue.getDate() - 2));
			var dueDateValue =  new Date();
			dueDateValue = new Date(dueDateValue.setDate(dueDateValue.getDate() + 5));

			function prepareModel() {
				Ext.define("Terrasoft.ViewModel", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ActivityEntitySchema,
					columns: {
						SchedulerStartDate: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'SchedulerStartDate',
							dataValueType: Terrasoft.core.enums.DataValueType.DATE
						},
						SchedulerDueDate: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'SchedulerDueDate',
							dataValueType: Terrasoft.core.enums.DataValueType.DATE
						},
						SchedulerSelection: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'SchedulerSelection',
							dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
						}
					},
					getSchedulerPeriod: function() {
						return {
							startDate: this.get('SchedulerStartDate'),
							dueDate: this.get('SchedulerDueDate')
						}
					},
					getTimeScale: function() {
						return this.get('SchedulerTimeScaleLookupValue').value;
					},
					getTimeScaleList: function(filter, list) {
						list.clear();
						var objs = {
							'min5': {displayValue: '5 минут', value: Terrasoft.TimeScale.FIVE_MINUTES},
							'min10': {displayValue: '10 минут', value: Terrasoft.TimeScale.TEN_MINUTES},
							'min15': {displayValue: '15 минут', value: Terrasoft.TimeScale.FIFTEEN_MINUTES},
							'min30': {displayValue: '30 минут', value: Terrasoft.TimeScale.THIRTY_MINUTES},
							'min60': {displayValue: '60 минут', value: Terrasoft.TimeScale.SIXTY_MINUTES}
						};
						list.loadAll(objs);
					}
				});
				Ext.define("Terrasoft.DataViewModel", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ActivityEntitySchema,
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
						StartDate: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'StartDate',
							dataValueType: Terrasoft.core.enums.DataValueType.DATE_TIME
						},
						DueDate: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: 'DueDate',
							dataValueType: Terrasoft.core.enums.DataValueType.DATE_TIME
						},
						Status: {}
					}
				});
				Bindable.model = Ext.create("Terrasoft.ViewModel", {
					values: {
						ActivityData: new Terrasoft.BaseViewModelCollection(),
						FloatingItems: new Terrasoft.BaseViewModelCollection(),
						SchedulerStartDate: startDateValue,
						SchedulerDueDate: dueDateValue,
						SchedulerTimeScaleComboBoxList: new Terrasoft.Collection(),
						SchedulerTimeScaleLookupValue: {
							displayValue: '60 минут',
							value: Terrasoft.TimeScale.SIXTY_MINUTES
						},
						SchedulerSelectedItems: [],
						SchedulerSelection: null
					},
					methods: {
						onItemChange: function(itemKey) {
						},
						onScheduleItemDoubleClick: function(itemKey) {
						},
						onItemAdd: function(item) {
							var selection = this.get("SchedulerSelection");
							if (selection) {
								item.set("StartDate", selection.startDate);
								item.set("DueDate", selection.dueDate);
							}
						},
						prepareDataModel: function() {
							var acitivityCollection = this.get('ActivityData');
							acitivityCollection.on("add", this.onItemAdd, this);
							acitivityCollection.clear();
							var item1 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 1,
									Title: 'Title 1',
									StartDate: new Date((new Date()).setHours(8)),
									DueDate: new Date((new Date()).setHours(9)),
									Status: Terrasoft.ScheduleItemStatus.NEW
								}
							});
							item1.addInfo = 'Тестовое свойство 1';
							var item2 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 2,
									Title: 'Title 2',
									StartDate: new Date((new Date()).setHours(0)),
									DueDate: new Date((new Date()).setHours(3)),
									Status: Terrasoft.ScheduleItemStatus.DONE
								}
							});
							item2.addInfo = 'Тестовое свойство 2';
							var item3 = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 3,
									Title: 'Title 3',
									StartDate: new Date((new Date()).setHours(5)),
									DueDate: new Date((new Date()).setHours(6)),
									Status: Terrasoft.ScheduleItemStatus.OVERDUE
								}
							});
							item3.addInfo = 'Тестовое свойство 3';
							acitivityCollection.add(acitivityCollection.getUniqueKey(), item1);
							acitivityCollection.add(acitivityCollection.getUniqueKey(), item2);
							acitivityCollection.add(acitivityCollection.getUniqueKey(), item3);
						},
						onKeyDown: function(keyInfo) {
							var floatingItems = this.get('FloatingItems');
							floatingItems.clear();
							var item = Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: 1,
									Title: 'Title 1',
									StartDate: new Date((new Date()).setHours(8)),
									DueDate: new Date((new Date()).setHours(9)),
									Status: Terrasoft.ScheduleItemStatus.NEW
								}
							});
							item.addInfo = 'Тестовое свойство 1';
							floatingItems.add(floatingItems.getUniqueKey(), item);
						},
						loadData: function() {
							this.prepareDataModel();
						},
						floatingItemReady: function() {
							console.log("onready binding work");
						}
					}
				});
			}

			prepareModel();

			renderTo.dom.innerHTML =
					"<table style=\"width: 100%;\">" +
							"<tr>" +
							"<td style=\"font-size: 14px; text-align: center;\">Дата с</td>" +
							"<td>" +
							"<div id='startDateCntr'></div>" +
							"</td>" +
							"<td style=\"font-size: 14px; text-align: center;\">по</td>" +
							"<td>" +
							"<div id='dueDateCntr'></div>" +
							"</td>" +
							"<td style=\"font-size: 14px; text-align: center;\">Масштаб</td>" +
							"<td>" +
							"<div id='timeScaleCntr'></div>" +
							"</td>" +
							"</tr>" +
							"<tr>" +
							'<td colspan="6">' +
							'<div style="float: left; width: 10%; text-align: center; padding-top: 30px;" id="ItemCntrLeft"></div>' +
							'<div style="float: left; width: 90%" id="schedulerCntr"></div>' +
							"</td>" +
							"</tr>" +
							"</table>";
			// Scheduling Controls
			var startDateCntr = Ext.get("startDateCntr");
			var dueDateCntr = Ext.get("dueDateCntr");
			var timeScaleCntr = Ext.get("timeScaleCntr");
			var reRenderCntr = Ext.get("reRenderCntr");
			var schedulerCntr = Ext.get("schedulerCntr");
			var ItemCntrLeft = Ext.get("ItemCntrLeft");
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'Заголовок задачи'
			});
			var itemTitleC = Ext.create('Terrasoft.TextEdit', {
				renderTo: ItemCntrLeft,
				value: 'Заголовок задачи'
			});
			var itemStatusCollection = Ext.create('Terrasoft.Collection');
			itemStatusCollection.add(1, {name: 'NEW', id: Terrasoft.ScheduleItemStatus.NEW});
			itemStatusCollection.add(2, {name: 'DONE', id: Terrasoft.ScheduleItemStatus.DONE});
			itemStatusCollection.add(3, {name: 'OVERDUE', id: Terrasoft.ScheduleItemStatus.OVERDUE});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'Статус задачи'
			});
			var itemStatusC = Ext.create('Terrasoft.ComboBoxEdit', {
				renderTo: ItemCntrLeft,
				minSearchCharsCount: 0,
				listViewConfig: {
					map: {
						value: 'id',
						displayValue: 'name'
					}
				},
				value: {
					value: Terrasoft.ScheduleItemStatus.NEW,
					displayValue: 'NEW'
				}
			});
			var loadItemStatusC = (function() {
				itemStatusC.loadList(itemStatusCollection);
			});
			itemStatusC.on('prepareList', loadItemStatusC);
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'Фон задачи'
			});
			var itemBackgroundC = Ext.create('Terrasoft.TextEdit', {
				renderTo: ItemCntrLeft,
				value: ''
			});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'Цвет текста'
			});
			var itemColorC = Ext.create('Terrasoft.TextEdit', {
				renderTo: ItemCntrLeft,
				value: ''
			});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'B'
			});
			var itemBC = Ext.create('Terrasoft.CheckBoxEdit', {
				renderTo: ItemCntrLeft,
				checked: false
			});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'I'
			});
			var itemIC = Ext.create('Terrasoft.CheckBoxEdit', {
				renderTo: ItemCntrLeft,
				checked: false
			});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'U'
			});
			var itemUC = Ext.create('Terrasoft.CheckBoxEdit', {
				renderTo: ItemCntrLeft,
				checked: false
			});
			Ext.create('Terrasoft.Label', {
				renderTo: ItemCntrLeft,
				caption: 'Действия:'
			});
			var addItem = Ext.create('Terrasoft.Button', {
				renderTo: ItemCntrLeft,
				style: Terrasoft.controls.ButtonEnums.style.BLUE,
				caption: 'Добавить',
				width: 100,
				handler: function () {
					var item = Ext.create("Terrasoft.DataViewModel", {
						values: {
							Id: 111,
							Title: itemTitleC.value,
							StartDate: new Date((new Date()).setHours(9)),
							DueDate: new Date((new Date()).setHours(10)),
							Status: itemStatusC.getValue().value,
							Background: itemBackgroundC.value,
							FontColor: itemColorC.value,
							IsBold: itemBC.checked,
							IsItalic: itemIC.checked,
							IsUnderline: itemUC.checked
						}
					});
					var collection = Bindable.model.get('ActivityData');
					collection.add(collection.getUniqueKey(), item);
				}
			});
			var updateItem = Ext.create('Terrasoft.Button', {
				renderTo: ItemCntrLeft,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: 'Изменить',
				width: 100,
				handler: function () {
					var selectedItems = Bindable.model.get('SchedulerSelectedItems');
					var collection = Bindable.model.get('ActivityData').collection;
					for (var i = 0; i < selectedItems.length; i++) {
						var item = collection.getByKey(selectedItems[i]);
						item.set('Title', itemTitleC.value);
						item.set('Status', itemStatusC.getValue().value);
						item.set('Background', itemBackgroundC.value);
						item.set('FontColor', itemColorC.value);
						item.set('IsBold',  itemBC.checked);
						item.set('IsItalic',  itemIC.checked);
						item.set('IsUnderline', itemUC.checked);
					}
				}
			});
			var deleteItem = Ext.create('Terrasoft.Button', {
				renderTo: ItemCntrLeft,
				style: Terrasoft.controls.ButtonEnums.style.RED,
				caption: 'Удалить',
				width: 100,
				handler: function () {
					var selectedItems = Bindable.model.get('SchedulerSelectedItems');
					var collection = Bindable.model.get('ActivityData').collection;
					for (var i = 0; i < selectedItems.length; i++) {
						collection.removeAtKey(selectedItems[i]);
					}
				}
			});
			var startDateC = Ext.create('Terrasoft.DateEdit', {
				renderTo: startDateCntr,
				value: {
					bindTo: 'SchedulerStartDate'
				}
			});
			startDateC.bind(Bindable.model);
			var dueDateC = Ext.create('Terrasoft.DateEdit', {
				renderTo: dueDateCntr,
				value: {
					bindTo: 'SchedulerDueDate'
				}
			});
			dueDateC.bind(Bindable.model);
			var timeScaleC = Ext.create('Terrasoft.ComboBoxEdit', {
				renderTo: timeScaleCntr,
				minSearchCharsCount: 0,
				prepareList: {
					bindTo: 'getTimeScaleList'
				},
				list: {
					bindTo: 'SchedulerTimeScaleComboBoxList'
				},
				value: {
					bindTo: 'SchedulerTimeScaleLookupValue'
				}
			});
			timeScaleC.bind(Bindable.model);

			Scheduler = Ext.create('Terrasoft.ScheduleEdit', {
				displayStartHour: '8-00',
				startHour: 0,
				dueHour: 24,
				timeScale: {
					bindTo: 'getTimeScale'
				},
				period: {
					bindTo: 'getSchedulerPeriod'
				},
				timezone: [
					{
						timezoneTitle: 'Kiev',
						timezoneTime: '+2'
					}
				],
				activityCollection: {
					bindTo : 'ActivityData'
				},
				selectedItems: {
					bindTo: 'SchedulerSelectedItems'
				},
				change: {
					bindTo: 'onItemChange'
				},
				scheduleItemDoubleClick: {
					bindTo: 'onScheduleItemDoubleClick'
				},
				selection: {
					bindTo: "SchedulerSelection"
				},
				floatingItemsCollection: {
					bindTo: "FloatingItems"
				},
				floatingItemReady: {
					bindTo: "floatingItemReady"
				}
			});
			Scheduler.bind(Bindable.model);
			Bindable.model.loadData();
			Scheduler.render(schedulerCntr);
		}
	}
});
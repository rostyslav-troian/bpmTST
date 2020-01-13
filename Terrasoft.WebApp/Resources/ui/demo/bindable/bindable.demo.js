// Declare the mock module that should be available for the synchronous call require (moduleName)
define("Contact", ["base-entity-schema"] , function() {
	Ext.define('Terrasoft.data.models.ContactEntitySchema', {
		extend: 'Terrasoft.BaseEntitySchema',
		alternateClassName: 'Terrasoft.ContactEntitySchema',
		singleton: true,

		uId: '90d5bb82-da3d-4f3a-8e24-f076336c2a35',
		columns: {
			Id: {caption: 'Id', dataValueType: Terrasoft.DataValueType.GUID, isRequired: true,
				defaultValue: {
					source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
					value: 'AutoGuid'
				}
			},
			Name: {caption: 'Имя', dataValueType: Terrasoft.DataValueType.TEXT, isRequired: true,
				defaultValue: {
					source: Terrasoft.EntitySchemaColumnDefSource.CONST,
					value: 'Jhon'
				}
			},
			LastName: {caption: 'Фамилия', dataValueType: Terrasoft.DataValueType.TEXT},
			FullName: {caption: 'Полное имя', dataValueType: Terrasoft.DataValueType.TEXT},
			Age: {caption: 'Возраст', dataValueType: Terrasoft.DataValueType.INTEGER},
			ModifiedOn: { caption: 'ModifiedOn', dataValueType: Terrasoft.DataValueType.DATE_TIME},
			BirthDate: {caption: 'Дата рождения', dataValueType: Terrasoft.DataValueType.DATE},
			Account: {caption: 'Контрагент', dataValueType: Terrasoft.DataValueType.LOOKUP, isLookup: true, referenceSchemaName: 'Account'},
			Type: {caption: 'Тип', dataValueType: Terrasoft.DataValueType.LOOKUP, isLookup: true, referenceSchemaName: 'ContactType'},
			Address: {caption: 'Адрес', dataValueType: Terrasoft.DataValueType.TEXT},
			Owner: {caption: 'Ответственный', dataValueType: Terrasoft.DataValueType.LOOKUP, isLookup: true,
				referenceSchemaName: 'Contact',
				defaultValue: {
					source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
					value: 'CurrentUserContact'
				}
			},
			Phone: {caption: 'Телефон', dataValueType: Terrasoft.DataValueType.TEXT},
			Photo: {caption: 'Фотография', dataValueType: Terrasoft.DataValueType.IMAGE },
			DateTimeEditValue: {dataValueType: Terrasoft.DataValueType.DATE_TIME}
		},
		name: 'Contact',
		primaryColumnName: 'Id',
		primaryDisplayColumnName: 'Name',
		primaryImageColumnName: 'Photo'
	});
	return Terrasoft.ContactEntitySchema;
});

define(["ext-base", "terrasoft", "Contact"], function(Ext, Terrasoft, Contact) {
	return {
		"render": function(renderTo) {
			Bindable = {};
			prepareModel();
			renderView();

			function prepareModel() {
				Ext.define("Terrasoft.ViewModelMock", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ContactEntitySchema,
					columns: {
						Account: {
							type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
							isLookup: true,
							caption: 'Контрагент'
						},
						AccountType: {
							caption: 'Тип',
							dataValueType: Terrasoft.DataValueType.GUID,
							isLookup: true,
							referenceSchemaName: 'AccountType'
						},
						IsPressed: {
							caption: 'Тип',
							dataValueType: Terrasoft.DataValueType.BOOLEAN,
							referenceSchemaName: 'IsPressed'
						}
					}
				});
				window.model = Bindable.model = Ext.create("Terrasoft.ViewModelMock", {
					values: {
						Account: {},
						AccountList: new Terrasoft.Collection(),
						AccountType: {},
						SimpleLookupColumn: { value: 10, displayValue: 'SimpleValue' },
						AccountTypeList: new Terrasoft.Collection(),
						MenuItem1Visible: true,
						MenuItem1Enabled: true,
						MenuItem1Caption: 'Заголовок MenuItem1',
						MenuItem2Visible: true,
						MenuItem2Enabled: true,
						MenuItem2Caption: 'Заголовок MenuItem2',
						SubMenuItem1Visible: true,
						SubMenuItem1Enabled: true,
						SubMenuItem1Caption: 'Заголовок SubMenuItem1',
						SubMenuItem2Visible: true,
						SubMenuItem2Enabled: true,
						SubMenuItem2Caption: 'Заголовок SubMenuItem2',
						ButtonEnabled: true,
						ButtonVisible: true,
						ButtonCaption: 'Заголовок Button',
						CheckboxEnabled: true,
						CheckboxVisible: true,
						CheckboxChecked: true,
						LabelVisible: true,
						LabelEnabled: true,
						LabelCaption: 'Заголовок Label',
						DateEditEnabled: true,
						DateEditVisible: true,
						DateEditIsRequired: false,
						DateEditReadonly: false,
						DateEditValue: new Date(),
						TextEditEnabled: true,
						TextEditVisible: true,
						TextEditIsRequired: false,
						TextEditReadonly: false,
						TextEditValue: '',
						IntegerEditEnabled: true,
						IntegerEditVisible: true,
						IntegerEditIsRequired: false,
						IntegerEditReadonly: false,
						IntegerEditValue: 1,
						FloatEditEnabled: true,
						FloatEditVisible: true,
						FloatEditIsRequired: false,
						FloatEditReadonly: false,
						FloatEditValue: 2,
						MemoEditEnabled: true,
						MemoEditVisible: true,
						MemoEditIsRequired: false,
						MemoEditReadonly: false,
						MemoEditValue: 'Значение MemoEdit',
						TimeEditEnabled: true,
						TimeEditVisible: true,
						TimeEditIsRequired: false,
						TimeEditReadonly: false,
						TimeEditValue: new Date(),
						DateTimeEditEnabled: true,
						DateTimeEditVisible: true,
						DateTimeEditIsRequired: false,
						DateTimeEditReadonly: false,
						testFocused: true,
						DateTimeEditValue: new Date(),
						MenuEnabled: true,
						MenuVisible: true,
						ComboBoxList: new Terrasoft.Collection(),
						ComboBoxEditEnabled: true,
						ComboBoxEditVisible: true,
						ComboBoxEditIsRequired: false,
						ComboBoxEditReadonly: false,
						ComboBoxEditValue: {
							value: '1',
							displayValue: 'Item 1'
						},
						RBIsChecked: 'var2',
						Email: 'user@bmponline.com',
						Image: 'Resources/Terrasoft/controls/grid/photo-11069-22x22.png',
						IsPressed: false
					},
					methods: {
						getAccountType: function() {
							var obj2 = this.get('SimpleLookupColumn');
							return {
								value: obj2.value,
								displayValue: obj2.displayValue += '-' + obj2.displayValue
							};
						},
						ButtonOnClick: function(tag) {
							alert(tag + '\' was clicked');
						},
						MenuItemOnClick: function(tag) {
							alert(tag + '\' was clicked');
						},
						GetListData: function(filter, list) {
							list.clear();
							var objs = {
								'1': {value: '1', displayValue: 'Item 1'},
								'2': {value: '2', displayValue: 'Item 2'},
								'3': {value: '3', displayValue: 'Item 3'}
							};
							list.loadAll(objs);
						},
						GetLookupData: function(filter, list, column) {
							list.clear();
							var columnCaption = column.caption;
							var objs = {
								'1': {value: '1', displayValue: columnCaption + ' 1'},
								'2': {value: '2', displayValue: columnCaption + ' 2'},
								'3': {value: '3', displayValue: columnCaption + ' 3'}
							};
							list.loadAll(objs);
						}
					},
					validationConfig: {
						Email : [
							function(value) {
								var invalidMessage = '';
								var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
								if (!pattern.test(value)) {
									invalidMessage = 'Invalid email format!';
								}
								return { invalidMessage: invalidMessage };
							}
						]
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
									className: 'Terrasoft.Button',
									caption: 'Press binding',
									pressed: {
										bindTo: 'IsPressed'
									}
								},
								{
									className: 'Terrasoft.ImageEdit',
									imageSrc: {
										bindTo: 'Image'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'ComboBoxEdit mapped on abstract items'
								},
								{
									className: 'Terrasoft.ComboBoxEdit',
									enabled: {
										bindTo: 'ComboBoxEditEnabled'
									},
									visible: {
										bindTo: 'ComboBoxEditVisible'
									},
									isRequired: {
										bindTo: 'ComboBoxEditIsRequired'
									},
									readonly: {
										bindTo: 'ComboBoxEditReadonly'
									},
									value: {
										bindTo: 'ComboBoxEditValue'
									},
									list: {
										bindTo: 'ComboBoxList'
									},
									prepareList: {
										bindTo: 'GetListData'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'ComboBoxEdit mapped on lookup column'
								},
								{
									className: 'Terrasoft.ComboBoxEdit',
									enabled: {
										bindTo: 'ComboBoxEditEnabled'
									},
									visible: {
										bindTo: 'ComboBoxEditVisible'
									},
									isRequired: {
										bindTo: 'ComboBoxEditIsRequired'
									},
									readonly: {
										bindTo: 'ComboBoxEditReadonly'
									},
									value: {
										bindTo: 'AccountType'
									},
									list: {
										bindTo: 'AccountTypeList'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'ComboBoxEdit mapped on lookup column with getValue bind'
								},
								{
									className: 'Terrasoft.ComboBoxEdit',
									value: {
										bindTo: 'AccountType',
										getValue: 'getAccountType'
									},
									list: {
										bindTo: 'AccountTypeList'
									},
									prepareList: {
										bindTo: 'GetListData'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'LookupEdit mapped on lookup column'
								},
								{
									className: 'Terrasoft.LookupEdit',
									enabled: {
										bindTo: 'ComboBoxEditEnabled'
									},
									visible: {
										bindTo: 'ComboBoxEditVisible'
									},
									isRequired: {
										bindTo: 'ComboBoxEditIsRequired'
									},
									readonly: {
										bindTo: 'ComboBoxEditReadonly'
									},
									value: {
										bindTo: 'Account'
									},
									list: {
										bindTo: 'AccountList'
									}
								},
								{
									className: 'Terrasoft.Button',
									caption: "Menu",
									menu: {
										items: [
											{
												caption: {
													bindTo: 'MenuItem1Caption'
												},
												click: {
													bindTo: 'MenuItemOnClick'
												},
												tag: "MenuItem1Tag",
												enabled: {
													bindTo: 'MenuItem1Enabled'
												},
												visible: {
													bindTo: 'MenuItem1Visible'
												}
											},
											{
												caption: {
													bindTo: 'MenuItem2Caption'
												},
												enabled: {
													bindTo: 'MenuItem2Enabled'
												},
												visible: {
													bindTo: 'MenuItem2Visible'
												},
												menu: {
													items: [
														{
															tag: "SubMenuItem1Tag",
															caption: {
																bindTo: 'SubMenuItem1Caption'
															},
															click: {
																bindTo: 'MenuItemOnClick'
															},
															enabled: {
																bindTo: 'SubMenuItem1Enabled'
															},
															visible: {
																bindTo: 'SubMenuItem1Visible'
															}

														},
														{
															tag: "SubMenuItem2Tag",
															caption: {
																bindTo: 'SubMenuItem2Caption'
															},
															click: {
																bindTo: 'MenuItemOnClick'
															},
															enabled: {
																bindTo: 'SubMenuItem2Enabled'
															},
															visible: {
																bindTo: 'SubMenuItem2Visible'
															}
														}
													]
												}
											}
										]
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Button'
								},
								{
									className: 'Terrasoft.Button',
									tag: "ButtonTag",
									enabled: {
										bindTo: 'ButtonEnabled'
									},
									visible: {
										bindTo: 'ButtonVisible'
									},
									caption: {
										bindTo: 'ButtonCaption'
									},
									click: {
										bindTo: 'ButtonOnClick'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'CheckBoxEdit'
								},
								{
									className: 'Terrasoft.CheckBoxEdit',
									enabled: {
										bindTo: 'CheckboxEnabled'
									},
									visible: {
										bindTo: 'CheckboxVisible'
									},
									checked: {
										bindTo: 'CheckboxChecke}'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Label'
								},
								{
									className: 'Terrasoft.Label',
									enabled: {
										bindTo: 'LabelEnabled'
									},
									visible: {
										bindTo: 'LabelVisible'
									},
									caption: {
										bindTo: 'LabelCaption'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'TextEdit'
								},
								{
									className: 'Terrasoft.TextEdit',
									enabled: {
										bindTo: 'TextEditEnabled'
									},
									visible: {
										bindTo: 'TextEditVisible'
									},
									isRequired: {
										bindTo: 'TextEditIsRequired'
									},
									readonly: {
										bindTo: 'TextEditReadonly'
									},
									value: {
										bindTo: 'TextEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'IntegerEdit'
								},
								{
									className: 'Terrasoft.IntegerEdit',
									enabled: {
										bindTo: 'IntegerEditEnabled'
									},
									visible: {
										bindTo: 'IntegerEditVisible'
									},
									isRequired: {
										bindTo: 'IntegerEditIsRequired'
									},
									readonly: {
										bindTo: 'IntegerEditReadonly'
									},
									value: {
										bindTo: 'IntegerEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'FloatEdit'
								},
								{
									className: 'Terrasoft.FloatEdit',
									enabled: {
										bindTo: 'FloatEditEnabled'
									},
									visible: {
										bindTo: 'FloatEditVisible'
									},
									isRequired: {
										bindTo: 'FloatEditIsRequired'
									},
									readonly: {
										bindTo: '@FloatEditReadonly'
									},
									value: {
										bindTo: 'FloatEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'MemoEdit'
								},
								{
									className: 'Terrasoft.MemoEdit',
									enabled: {
										bindTo: 'MemoEditEnabled'
									},
									visible: {
										bindTo: 'MemoEditVisible'
									},
									isRequired: {
										bindTo: 'MemoEditIsRequired'
									},
									readonly: {
										bindTo: 'MemoEditReadonly'
									},
									value: {
										bindTo: 'MemoEditValue'
									},
									height: '56px'
								},
								{
									className: 'Terrasoft.Label',
									caption: 'DateEdit'
								},
								{
									className: 'Terrasoft.DateEdit',
									enabled: {
										bindTo: 'DateEditEnabled'
									},
									visible: {
										bindTo: 'DateEditVisible'
									},
									isRequired: {
										bindTo: 'DateEditIsRequired'
									},
									readonly: {
										bindTo: 'DateEditReadonly'
									},
									value: {
										bindTo: 'DateEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'TimeEdit'
								},
								{
									className: 'Terrasoft.TimeEdit',
									enabled: {
										bindTo: 'TimeEditEnabled'
									},
									visible: {
										bindTo: 'TimeEditVisible'
									},
									isRequired: {
										bindTo: 'TimeEditIsRequired'
									},
									readonly: {
										bindTo: 'TimeEditReadonly'
									},
									value: {
										bindTo: 'TimeEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'DateTimeEdit'
								},
								{
									className: 'Terrasoft.TimeEdit',
									enabled: {
										bindTo: 'DateTimeEditEnabled'
									},
									visible: {
										bindTo: 'DateTimeEditVisible'
									},
									isRequired: {
										bindTo: 'DateTimeEditIsRequired'
									},
									readonly: {
										bindTo: 'DateTimeEditReadonly'
									},
									value: {
										bindTo: 'DateTimeEditValue'
									},
									focused: {
										bindTo: 'testFocused'
									}
								},
								{
									className: 'Terrasoft.DateEdit',
									enabled: {
										bindTo: 'DateTimeEditEnabled'
									},
									visible: {
										bindTo: 'DateTimeEditVisible'
									},
									isRequired: {
										bindTo:'DateTimeEditIsRequired'
									},
									readonly: {
										bindTo: 'DateTimeEditReadonly'
									},
									value: {
										bindTo: 'DateTimeEditValue'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Вариант 1'
								},
								{
									className: 'Terrasoft.RadioButton',
									tag: 'var1',
									checked: {
										bindTo: 'RBIsChecked'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Вариант 2'
								},
								{
									className: 'Terrasoft.RadioButton',
									tag: 'var2',
									checked: {
										bindTo: 'RBIsChecked'
									}
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Вариант 3'
								},
								{
									className: 'Terrasoft.RadioButton',
									tag: 'var3',
									checked: {
										bindTo: 'RBIsChecked'
									}
								},
								{
									className: 'Terrasoft.TextEdit',
									value: {
										bindTo: 'Email'
									}
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
									className: 'Terrasoft.Label',
									caption: 'Имя класса'
								},
								{
									className: 'Terrasoft.TextEdit',
									id: 'controlEdit'
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Имя свойства'
								},
								{
									className: 'Terrasoft.TextEdit',
									id: 'propertyEdit'
								},
								{
									className: 'Terrasoft.Label',
									caption: 'Значение свойства'
								},
								{
									className: 'Terrasoft.TextEdit',
									id: 'valueEdit'
								},
								{
									className: 'Terrasoft.Button',
									id: 'commandButton',
									caption: 'Изменить значение модели'
								},
								{
									className: 'Terrasoft.Button',
									id: 'gridButton',
									caption: 'Заполнить данные реестра'
								},
								{
									className: 'Terrasoft.Button',
									id: 'timeEditButton',
									caption: 'Установить значение модели для проверки связки TimeEdit+DateEdit'
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
				var commandButton = Ext.getCmp('commandButton');
				commandButton.on('click', function(button) {
					var propertyName = Ext.getCmp('controlEdit').value + Ext.getCmp('propertyEdit').value;
					var value = Ext.getCmp('valueEdit').value;
					switch (value.toLowerCase()) {
						case "true":
							value = true;
							break;
						case "false":
							value = false;
							break;
						default:
							break;
					}
					Bindable.model.set(propertyName, value);
				}, this);
				var timeEditButton = Ext.getCmp('timeEditButton');
				timeEditButton.on('click', function(button) {
					Bindable.model.set('DateTimeEditValue', new Date());
				}, this);
				Bindable.model.on('change', function(model, options) {
					var consoleLog = Ext.getCmp('consoleLog');
					var value = '';
					for (var key in model.changedValues) {
						var changedValue = model.changedValues[key];
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
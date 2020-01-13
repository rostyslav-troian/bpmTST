define(['terrasoft'], function(Terrasoft) {
	return {
		entitySchema: 'Terrasoft.ContactEntitySchema',
		name: 'ContactViewModel',
		extend: 'Terrasoft.BaseViewModel',
		schema: {
			leftPanel: [
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Id', caption: 'Id', columnPath: 'Id', visible: false},
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Name', caption: 'Имя', columnPath: 'Name', visible: true},
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'LastName', caption: 'Фамилия', columnPath: 'LastName', visible: true},
				{type: Terrasoft.ViewModelSchemaItem.METHOD, name: 'getFullName', caption: 'Полное имя', dataValueType: Terrasoft.DataValueType.TEXT},
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Age', caption: 'Возраст', columnPath: 'Age', visible: true},
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'BirthDate', caption: 'Дата рождения', columnPath: 'BirthDate', visible: true},
				{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Address', caption: 'Адрес', columnPath: 'Address', visible: true},
				{
					type: Terrasoft.ViewModelSchemaItem.GROUP,
					name: 'controlGroup',
					caption: 'Controls Group',
					items: [
						{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Account', caption: 'Контрагент', columnPath: 'Account', visible: true,
							list: 'AccountList'
						},
						{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Owner', caption: 'Ответственный', columnPath: 'Owner', visible: true},
						{type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE, name: 'Type', caption: 'Тип', columnPath: 'Type', visible: true,
							customConfig: {
								tag: 'customTag'
							}
						}
					]
				}
			],
			rightPanel: [],
			actions: [
			],
			analytics: [
			]
		},
		methods: {
			getFullName: function() {
				return this.get('Name') + ' ' + this.get('LastName');
			},
			isOwnerEnabled: function() {
				var age = this.get('Age');
				return age > 30;
			},
			IsFullNameEnabled: function() {
				return !Ext.isEmpty(this.get('Name')) && !Ext.isEmpty(this.get('LastName'));
			},
			GetListData: function(filter, filterType, count, list) {
				list.clear();
				var objs = {
					'1': {value: '1', text: 'Item 1'},
					'2': {value: '2', text: 'Item 2'},
					'3': {value: '3', text: 'Item 3'}
				};
				list.loadAll(objs);
			}
		},
		customBindings: {
			Name: {
				params: {
					Owner: "{@Owner}"
				},
				fn: function(params, controls) {
					var control = controls['Name'][0];
					var el = control.getEl();
					el.setStyle({"background-color": params.Owner});
				}
			}
		},
		bindings: {
			Owner: {
				enabled: '{@isAccountEmpty}'
			},
			controlGroup: {
				visible: '{@isGroupVisible}'
			},
			getFullName: {
				enabled: '{@IsFullNameEnabled}'
			},
			Account: {
				prepareList: '{@GetListData}'
			}
		},
		userCode: function() {
			this.methods.isAccountEmpty = function() {
				return Ext.isEmpty(this.get('Account'));
			};
		},
		differencePackage: function() {}
	};
});
// This file must be generated automatically when you compile the \ schema publication

Ext.ns('Terrasoft.model');

Ext.define('Terrasoft.model.ContactViewModel', {
	extend: 'Terrasoft.BaseViewModel',
	alternateClassName: 'Terrasoft.ContactViewModel',
	entitySchema: Terrasoft.ContactEntitySchema,
	name: 'ContactViewModel',
	columns: {
		Id: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Id', caption: 'Id'},
		Name: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Name', caption: 'Имя'},
		LastName: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'LastName', caption: 'Фамилия'},
		FullName: {
			type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
			caption: 'Полное имя',
			dataValueType: Terrasoft.DataValueType.TEXT
		},
		Account: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Account', caption: 'Контрагент'},
		Gender: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Gender', caption: 'Пол'},
		Type: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Type', caption: 'Тип'},
		Address: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Address', caption: 'Адрес'},
		Owner: {type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN, columnPath: 'Owner', caption: 'Ответственный'}
	},

	primaryColumnName: 'Id',
	primaryDisplayColumnName: 'Name',

	onDataChange: function(obj, fields) {
		this.callParent(arguments);
		for (var key in fields.changes) {
			if (key === 'Name' || key === 'LastName') {
				this.set('FullName', this.get('Name') + ' ' + this.get('LastName'));
			}
		}
	}

});
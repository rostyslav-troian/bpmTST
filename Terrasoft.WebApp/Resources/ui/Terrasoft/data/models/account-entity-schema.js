// This file must be generated automatically when you compile the \ publication of the schema of the object.
// This is an example of a generated contact scheme class

Ext.define('Terrasoft.data.models.AccountEntitySchema', {
	extend: 'Terrasoft.BaseEntitySchema',
	alternateClassName: 'Terrasoft.AccountEntitySchema',
	singleton: true,
	columns: {
		Id: {caption: 'Id', dataValueType: Terrasoft.DataValueType.GUID, isRequired: true},
		Name: {caption: 'Имя', dataValueType: Terrasoft.DataValueType.TEXT, isRequired: true},
		Address: {caption: 'Адрес', dataValueType: Terrasoft.DataValueType.TEXT},
		Owner: {
			caption: 'Ответственный',
			dataValueType: Terrasoft.DataValueType.GUID,
			isLookup: true,
			referenceSchemaName: 'Contact'
		}
	},
	name: 'Account',
	primaryColumnName: 'Id',
	primaryDisplayColumnName: 'Name'

});
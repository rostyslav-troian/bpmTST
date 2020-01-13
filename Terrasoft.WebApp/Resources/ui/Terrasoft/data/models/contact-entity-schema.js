// This file must be generated automatically when you compile the \ publication of the schema of the object.
// This is an example of a generated contact scheme class

Ext.define('Terrasoft.data.models.ContactEntitySchema', {
	extend: 'Terrasoft.BaseEntitySchema',
	alternateClassName: 'Terrasoft.ContactEntitySchema',
	singleton: true,

	uId: '90d5bb82-da3d-4f3a-8e24-f076336c2a35',
	columns: {
		Id: {caption: 'Id', dataValueType: Terrasoft.DataValueType.GUID, isRequired: true},
		Name: {caption: 'Имя', dataValueType: Terrasoft.DataValueType.TEXT, isRequired: true},
		LastName: {caption: 'Фамилия', dataValueType: Terrasoft.DataValueType.TEXT},
		FullName: {caption: 'Полное имя', dataValueType: Terrasoft.DataValueType.TEXT},
		Age: {caption: 'Возраст', dataValueType: Terrasoft.DataValueType.INTEGER},
		ModifiedOn: { caption: 'ModifiedOn', dataValueType: Terrasoft.DataValueType.DATE_TIME},
		BirthDate: {caption: 'Дата рождения', dataValueType: Terrasoft.DataValueType.DATE},
		Account: {
			caption: 'Контрагент',
			dataValueType: Terrasoft.DataValueType.GUID,
			isLookup: true,
			referenceSchemaName: 'Account'
		},
		Type: {
			caption: 'Тип',
			dataValueType: Terrasoft.DataValueType.GUID,
			isLookup: true,
			referenceSchemaName: 'ContactType'
		},
		Address: {caption: 'Адрес', dataValueType: Terrasoft.DataValueType.TEXT},
		Owner: {
			caption: 'Ответственный',
			dataValueType: Terrasoft.DataValueType.GUID,
			isLookup: true,
			referenceSchemaName: 'Contact'
		},
		Phone: {caption: 'Телефон', dataValueType: Terrasoft.DataValueType.TEXT},
		Photo: {caption: 'Фотография', dataValueType: Terrasoft.DataValueType.IMAGE }
	},
	name: 'Contact',
	caption: 'Контакт',
	primaryColumnName: 'Id',
	primaryDisplayColumnName: 'Name',
	primaryImageColumnName: 'Photo'
});
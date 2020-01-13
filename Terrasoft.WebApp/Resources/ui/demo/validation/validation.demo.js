// Declare the mock module that should be available for the synchronous call require (moduleName)
define("Contact", ["base-entity-schema"], function() {
	Ext.define('Terrasoft.data.models.ContactEntitySchema', {
		extend: 'Terrasoft.BaseEntitySchema',
		alternateClassName: 'Terrasoft.ContactEntitySchema',
		singleton: true,

		uId: '90d5bb82-da3d-4f3a-8e24-f076336c2a35',
		columns: {
			Id: {caption: 'Id',
				dataValueType: Terrasoft.DataValueType.GUID,
				isRequired: true,
				defaultValue: {
					source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
					value: 'AutoGuid'
				}
			},
			Name: {
				caption: 'Имя',
				dataValueType: Terrasoft.DataValueType.TEXT,
				isRequired: true,
				defaultValue: {
					source: Terrasoft.EntitySchemaColumnDefSource.CONST,
					value: 'Jhon'
				}
			},
			LastName: {
				caption: 'Фамилия',
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Account: {
				caption: 'Контрагент',
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				referenceSchemaName: 'Account',
				isRequired: true
			}
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
			var Bindable = {};
			function prepareModel() {
				Ext.define("Terrasoft.ViewModelMock", {
					extend: 'Terrasoft.BaseViewModel',
					entitySchema: Terrasoft.ContactEntitySchema,
					columns: {
						AccountType: {
							caption: 'Тип',
							dataValueType: Terrasoft.DataValueType.GUID,
							isLookup: true,
							isRequired: true,
							referenceSchemaName: 'AccountType'
						}
					}
				});
				window.model = Bindable.model = Ext.create("Terrasoft.ViewModelMock", {
					values: {
						AccountType: {
							value: '2ddf83f9-2b26-4af1-903e-3e4e88e9f4e9',
							displayValue: 'Item 1'
						},
						ComboBoxList: new Terrasoft.Collection(),
						AccountTypeList: new Terrasoft.Collection(),
						ComboBoxEditValue: {
							value: '1',
							displayValue: 'Item 1'
						},
						Email: 'user@bmponline.com'
					},
					methods: {
						GetGUIDListData: function(filter, list) {
							list.clear();
							var objs = {
								'1': {value: '2ddf83f9-2b26-4af1-903e-3e4e88e9f4e9', displayValue: 'Item 1'},
								'2': {value: '2ddf83f9-2b26-4af1-903e-3e4e88e9f4e4', displayValue: 'Item 2'}
							};
							list.loadAll(objs);
						},
						GetListData: function(filter, list) {
							list.clear();
							var objs = {
								'1': {value: '1', displayValue: 'Item 1'},
								'2': {value: '2', displayValue: 'Item 2'},
								'3': {value: '3', displayValue: 'Item 3'}
							};
							list.loadAll(objs);
						}
					},
					validationConfig: {
						Email: [
							function(value) {
								var invalidMessage = '';
								if (!value) {
									return { invalidMessage: invalidMessage };
								}
								var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
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
				var spacer = {
					className: 'Terrasoft.Component',
					html: '<div class="spacer"></div>',
					selectors: {
						el: ".spacer",
						wrapEl: ".spacer"
					}
				};
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
									className: 'Terrasoft.Label',
									caption: 'ComboBoxEdit with required value'
								},
								{
									className: 'Terrasoft.ComboBoxEdit',
									value: {
										bindTo: 'AccountType'
									},
									list: {
										bindTo: 'AccountTypeList'
									},
									prepareList: {
										bindTo: 'GetGUIDListData'
									}
								}, spacer,
								{
									className: 'Terrasoft.Label',
									caption: 'Simple ComboBoxEdit'
								},
								{
									className: 'Terrasoft.ComboBoxEdit',
									value: {
										bindTo: 'ComboBoxEditValue'
									},
									list: {
										bindTo: 'ComboBoxList'
									},
									prepareList: {
										bindTo: 'GetListData'
									}
								}, spacer,
								{
									className: 'Terrasoft.Label',
									caption: 'TextEdit with email validator'
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
									caption: 'Log'
								},
								{
									className: 'Terrasoft.MemoEdit',
									id: 'consoleLog',
									height: '100px'
								}
							]
						}
					]
				});
				Bindable.view.bind(Bindable.model);
				var consoleLog = Ext.getCmp('consoleLog');
				var newLine = '\r\n';
				Bindable.model.validationInfo.on('change',
					function(obj, options) {
						var msg = "";
						var changedValues = {};
						for (var key in obj.changed) {
							changedValues[key] = obj.changed[key];
							msg += "Validation info for column: " + key + ":" + newLine ;
							msg += "isValid: " + changedValues[key].isValid + newLine;
							msg += "invalidMessage: " + changedValues[key].invalidMessage + newLine;
						}
						consoleLog.setValue(msg);
					},
					this
				);
			}

			prepareModel();
			renderView();
		}
	};
});
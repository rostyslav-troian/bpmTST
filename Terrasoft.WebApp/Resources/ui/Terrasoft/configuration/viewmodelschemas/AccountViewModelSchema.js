define(['terrasoft'], function(Terrasoft) {
	return {
		entitySchema: 'Terrasoft.AccountEntitySchema',
		name: 'AccountViewModel',
		extend: 'Terrasoft.BaseViewModel',
		schema: {
			leftPanel: [
				{type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE, name: 'Id', caption: 'Id', columnPath: 'Id', visible: false},
				{type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE, name: 'Name', caption: 'Имя', columnPath: 'Name', visible: true},
				{type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE, name: 'Address', caption: 'Адрес', columnPath: 'Address', visible: true},
				{
					type: Terrasoft.core.enums.ViewModelSchemaItem.GROUP,
					name: 'controlGroup',
					caption: 'Controls Group',
					items: [
						{type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE, name: 'Owner', caption: 'Ответственный', columnPath: 'Owner', visible: true}
					]
				}
			],
			rightPanel: [
			],
			actions: [
			],
			analytics: [
			]
		},
		methods: {
			isAddressEnabled: function() {
				return !this.isNameEmpty();
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
			Address: {
				enabled: '{@isAddressEnabled}'
			}
		},
		userCode: function() {
			this.methods.isNameEmpty = function() {
				return Ext.isEmpty(this.get('Name'));
			};
		},
		differencePackage: function() {}
	}
});
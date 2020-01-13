define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			var showButton = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Show",
				styles: {
					wrapperStyle: {
						'margin-right': '8px'
					}
				}
			});
			showButton.on('click', function() {
				viewModelMock.set('MaskValue', true);
			});
			var hideButton = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Hide"
			});
			hideButton.on('click', function() {
				viewModelMock.set('MaskValue', false);
			});
			Ext.define("Terrasoft.ViewModelMock", {
				extend: 'Terrasoft.BaseViewModel',
				columns: {
					MaskValue: {
						type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					}
				}
			});
			var viewModelMock = Ext.create("Terrasoft.ViewModelMock", {
				values: {
					MaskValue: false
				}
			});
			Ext.create('Terrasoft.Container', {
				renderTo: renderTo,
				id: 'wrap-button',
				selectors: {
					wrapEl: '#wrap-button'
				},
				items: [
					showButton,
					hideButton
				],
				styles: {
					wrapStyles: {
						margin: '5px 0'
					}
				}
			});
			var controlGroup = Ext.create('Terrasoft.ControlGroup', {
				renderTo: renderTo,
				caption: 'Control Group initialy opened width = 300px',
				width: '300px',
				collapsed: false,
				id: 'mask-demo-ct',
				maskVisible: {
					bindTo: 'MaskValue'
				},
				items: [
					{
						className: 'Terrasoft.Label',
						caption: 'caption for field'
					},
					{
						className: 'Terrasoft.TextEdit'
					},
					{
						className: 'Terrasoft.Label',
						caption: 'caption for field'
					},
					{
						className: 'Terrasoft.TextEdit'
					},
					{
						className: 'Terrasoft.Label',
						caption: 'caption for field'
					},
					{
						className: 'Terrasoft.TextEdit'
					},
					{
						className: 'Terrasoft.Label',
						caption: 'caption for field'
					},
					{
						className: 'Terrasoft.TextEdit'
					},
					{
						className: 'Terrasoft.CheckBoxEdit'
					}
				]
			});
			controlGroup.bind(viewModelMock);

			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '100%',
				markerValue: ''
			});
			var integeredit = Ext.create('Terrasoft.IntegerEdit', {
				renderTo: renderTo,
				value: '0000000000012321321',
				width: '300px',
				id: 'mask-demo-2'
			});
			integeredit.setMaskVisible(true);
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '100%',
				markerValue: ''
			});
			var memoedit = Ext.create('Terrasoft.MemoEdit', {
				renderTo: renderTo,
				width: '300px',
				height: '100px',
				id: 'mask-demo-3'
			});
			memoedit.setMaskVisible(true);
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '100%',
				markerValue: ''
			});
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '10px',
				markerValue: ''
			});

			var demoButton2 = Ext.create('Terrasoft.Button', {
				renderTo: renderTo,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Button ",
				id: "mask-demo-5"
			});
			demoButton2.setMaskVisible(true);
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '10px',
				markerValue: ''
			});
			var demoButton3 = Ext.create('Terrasoft.Button', {
				renderTo: renderTo,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Button big",
				id: "mask-demo-6"
			});
			demoButton3.setMaskVisible(true);
			Ext.create('Terrasoft.Label', {
				renderTo: renderTo,
				caption: '',
				width: '100%',
				markerValue: ''
			});
			var maskViewport = Ext.create('Terrasoft.Button', {
				renderTo: renderTo,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Show viewport mask"
			});
			var maskViewportId = null;
			maskViewport.on('click', function() {
				maskViewportId = Terrasoft.Mask.show({
					caption: "Нажмите ESC для закрытия маски"
				});
			});
			new Ext.util.KeyNav({
				target: Ext.getBody(),
				esc: function() {
					Terrasoft.Mask.hide(maskViewportId);
				}
			});

		}
	};
});
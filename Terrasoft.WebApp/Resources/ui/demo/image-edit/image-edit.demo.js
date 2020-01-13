define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		render: function(renderTo) {

			Ext.define("Terrasoft.ViewModel", {
				extend: 'Terrasoft.BaseViewModel',
				columns: {
					image: {
						type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'ImageScr',
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					}
				}
			});

			window.demo_model = model = Ext.create("Terrasoft.ViewModel", {
				values: {
					image: {name:'111'},
					enable: true
				},
				methods: {
					onPhotoChange: function(file) {
						if (file) {
							window.imageedit.getUploadImageData(file, function(url) {
								window.imageedit.setImageSrc(url);
							}, this);
						} else {
							window.imageedit.clearImage();
						}
					},
					beforeOpen: function() {
						return false;
					}
				}
			});

			window.imageedit = Ext.create('Terrasoft.ImageEdit', {
				change: {bindTo: 'onPhotoChange'},
				id: 'imageEditControl',
				//beforefileselected: {bindTo: 'beforeOpen'},
				renderTo: renderTo
			});

			window.imageedit.bind(model);
		}
	};
});
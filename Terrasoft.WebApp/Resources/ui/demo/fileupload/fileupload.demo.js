define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Ext.onReady(function() {

				var ViewModelExternal = Ext.create("Terrasoft.BaseViewModel", {
					methods: {
						click: function(files) {
							alert('files selected');
						}
					}
				});

				var button1 = Ext.create('Terrasoft.Button', {
					caption: 'My File Upload Button',
					fileUpload: true,
					filesSelected: {
						bindTo: 'click'
					}
				});

				button1.bind(ViewModelExternal);

				button1.render(renderTo);

			});
		}
	};
});
define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Bindable = {};
			prepareModel();
			renderView();

			function prepareModel() {
				Ext.define("Terrasoft.ViewModelMock", {
					extend: 'Terrasoft.BaseViewModel'
				});
				window.model = Bindable.model = Ext.create("Terrasoft.ViewModelMock", {
					methods: {
						actionLinkClick: function(id) {
							alert('Была нажата ссылка ' + id);
						},
						actionLinkInContainerClick: function(id, section) {
							alert('Была нажата ссылка ' + id + ', section: ' + section);
						}
					}
				});
			}

			function renderView() {
				Ext.create('Terrasoft.Container', {
					renderTo: renderTo,
					id: 'buttons',
					selectors: {
						el: "#buttons",
						wrapEl: "#buttons"
					},
					items: [
						{
							className: 'Terrasoft.Button',
							caption: 'setVisible(false)',
							handler: function() {
								view.setVisible(false);
							},
							style: Terrasoft.controls.ButtonEnums.style.GREEN
						},
						{
							className: 'Terrasoft.Button',
							caption: 'setVisible(true)',
							handler: function() {
								view.setVisible(true);
							},
							style: Terrasoft.controls.ButtonEnums.style.BLUE
						},
						{
							className: 'Terrasoft.Button',
							caption: 'reRender',
							handler: function() {
								view.reRender();
							},
							style: Terrasoft.controls.ButtonEnums.style.RED
						}
					]
				});

				window.view = Bindable.view = Ext.create("Terrasoft.Container", {

					renderTo: renderTo,
					id: 'content',
					selectors: {
						el: "#content",
						wrapEl: "#content"
					},
					items: [
						{
							className: 'Terrasoft.HtmlControl',
							selectors: {
								wrapEl: '#My',
								actionLinks: {
									selector: 'a.MyLink',
									attributes: ['id'],
									events: {
										click: {
											bindTo: 'actionLinkClick'
										}
									}
								}
							},
							html: '<div id="My" style="font-size:14px">' +
								'<a class="MyLink" id="link1" href="javascript:void(0)">Первый линк</a>&nbsp' +
								'<a class="MyLink" id="link2" href="javascript:void(0)">Второй линк</a></div>'
						},
						{
							className: 'Terrasoft.Container',
							id: 'SubContainer',
							selectors: {
								el: '#SubContainer',
								wrapEl: '#SubContainer'
							},
							items: [
								{
									className: 'Terrasoft.HtmlControl',
									selectors: {
										wrapEl: '#My2',
										actionLinks: {
											selector: 'a.MyLink2',
											attributes: ['id', 'data-section'],
											events: {
												click: {
													bindTo: 'actionLinkInContainerClick'
												}
											}
										}
									},
									html: '<div id="My2" style="font-size:14px">' +
										'<a class="MyLink2" id="ContainreLink1" data-section="first" href="javascript:void(0)">Линк в контейнере</a>&nbsp' +
										'<a class="MyLink2" id="ContainreLink2" data-section="second" href="javascript:void(0)">Второй линк в контейнере</a></div>'
								}
							]
						}
					]
				});
				Bindable.view.bind(Bindable.model);
				//Bindable.view.reRender();
				//view.setVisible(false);
				//view.setVisible(true);
			}
		}
	};
});
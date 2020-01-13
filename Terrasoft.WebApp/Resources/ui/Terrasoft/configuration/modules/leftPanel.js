define(["ext-base", "terrasoft", "sandbox"], function(Ext, Terrasoft, sandbox) {
	return {
		render: function(renderTo) {
			var leftPanel = Ext.create("Terrasoft.Component", {
				renderTo: renderTo,
				id: 'leftmenu-item',
				html: [
					'<ul class = "menu-list">',
					'<li class = "selected-item">',
					'Меню',
					'</li>',
					'<li>',
					'Сообщество',
					'</li>',
					'<li class = "selected-item">',
					'Уведомления<span class="notice-message">25125678932222</span><div class="spacer">&nbsp;</div>',
					'</li>',
					'<li>',
					'Контакты<div class="spacer">&nbsp;</div>',
					'</li>',
					'<li>',
					'АктивностиАктивности<span class="notice-message">25125678932222</span><div class="spacer">&nbsp;</div>',
					'</li>',
					'<li>',
					'Продажы<span class="notice-message">251</span><div class="spacer">&nbsp;</div>',
					'</li>',
					'<li>',
					'Текст',
					'</li>',
					'</ul>'
				],
				selectors: {
					el: '.menu-list',
					wrapEl: '.menu-list'
				}
			});
		}
	};
});
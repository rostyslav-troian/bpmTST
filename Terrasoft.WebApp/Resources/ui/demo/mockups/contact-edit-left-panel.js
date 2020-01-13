define(["ext-base", "terrasoft", "sandbox", "require"], function(Ext, Terrasoft, sandbox, require) {
	return {
		"render": function(renderTo) {
			Ext.create('Terrasoft.SideBar', {
				renderTo: renderTo,
				items: [
					{
						caption: 'Меню',
						tag: 'Tag1'
					},
					{
						caption: 'Сообщество',
					},
					{
						caption: 'Уведомления',
					},
					{
						caption: 'Контакты',
					},
					{
						caption: 'Контрагенты',
					},
					{
						caption: 'Активности',
					},
					{
						caption: 'Продажи',
					},
					{
						caption: 'Воздействия',
					},
					{
						caption: 'Мой профиль',
					}
				],
				selectedItemIndex: 0,
				maxWidth: '160px',
				minWidth: '160px'
			});
			sandbox.publish("render", "left panel rendered");
			var data = sandbox.publish("testPtpEvent");
			console.log("testPtpEvent:" + data.test);
			sandbox.publish("testAsyncPtpEvent", function(data) {
				console.log("testAsyncPtpEvent:" + data.test);
			});
		}
	};
});
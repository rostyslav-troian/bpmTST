define(["ext-base", "terrasoft", "sandbox", "require"], function(Ext, Terrasoft, sandbox, require) {
	return {
		"render": function(renderTo) {
			var centerPanel = Ext.create("Terrasoft.Container", {
				renderTo: renderTo,
				id: 'centerpanel',
				classes: {
					wrapClassName: ['centerpanel']
				},
				selectors: {
					el: '#centerpanel',
					wrapEl: '#centerpanel'
				},
				items: [
					{
						className: 'Terrasoft.Container',
						id: 'header',
						classes: {
							wrapClassName: ['header']
						},
						selectors: {
							el: '#header',
							wrapEl: '#header'
						},
						items: [
							{
								className: 'Terrasoft.Component',
								id: 'header-name',
								html: '<div id="header-name" class="header-name">Контакт</div>',
								selectors: {
									el: '#header-name',
									wrapEl: '#header-name'
								}
							},
							{
								className: 'Terrasoft.Component',
								id: 'header-score',
								html: '<div id="header-score" class="header-score"><div id="head-score-label">ВСЕГО БАЛЛОВ</div><div id="head-score-star">&#9733;</div><div id="head-score-digit">28</div></div>',
								selectors: {
									el: '#header-score',
									wrapEl: '#header-score'
								}
							},
							{
								className: 'Terrasoft.Container',
								id: 'header-query',
								classes: {
									wrapClassName: ['header-query']
								},
								selectors: {
									el: '#header-query',
									wrapEl: '#header-query'
								},
								items: [
									{
										className: 'Terrasoft.TextEdit',
										bigSize: true,
										value: '',
										placeholder: 'Что я могу для вас сделать?'
									}
								]
							}
						]
					},
					{
						className: 'Terrasoft.Container',
						id: 'utils',
						selectors: {
							el: '#utils',
							wrapEl: '#utils'
						},
						items: [
							{
								className: 'Terrasoft.Container',
								id: 'utils-left',
								selectors: {
									el: '#utils-left',
									wrapEl: '#utils-left'
								},
								items: [
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.GREEN,
										caption: 'Сохранить',
										margin: '0px 10px 0px 0px'
									},
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
										caption: 'Отмена',
										margin: '0px 10px 0px 0px'
									},
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
										caption: 'Перейти к',
										menu: {
											items:[{
												caption: "SingleMenuItem"
											}]
										}
									}
								]
							},
							{
								className: 'Terrasoft.Container',
								id: 'utils-right',
								selectors: {
									el: '#utils-right',
									wrapEl: '#utils-right'
								},
								items: [
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
										caption: 'Вид',
										menu: {
											items:[{
												caption: "SingleMenuItem"
											}]
										}
									},
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
										imageConfig: {
											source: Terrasoft.ImageSources.URL,
											url: require.toUrl('./images/arrow-left.gif')
										},
										margin: '0px 0px 0px 10px'
									},
									{
										className: 'Terrasoft.Button',
										style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
										imageConfig: {
											source: Terrasoft.ImageSources.URL,
											url: require.toUrl('./images/arrow-right.gif')
										},
										margin: '0px 0px 0px 5px'
									}
								]
							}
						]
					},
					{
						className: 'Terrasoft.Container',
						id: 'content',
						selectors: {
							el: '#content',
							wrapEl: '#content'
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
										className: 'Terrasoft.Component',
										id: 'avatar',
										html: '<div id="avatar" style="margin-bottom: 25px; margin-top: 1px;"></div>',
										selectors: {
											el: '#avatar',
											wrapEl: '#avatar'
										}
									},
									{
										className: 'Terrasoft.Label',
										caption: 'ФИО <font color="red">*</font>'
									},
									{
										className: 'Terrasoft.TextEdit',
										value: 'Евгений Алексеевич Мирный'
									},
									{
										className: 'Terrasoft.Component',
										id: 'hr1',
										html: '<hr id="hr1" class="space">',
										selectors: {
											el: '#hr1',
											wrapEl: '#hr1'
										}
									},
									{
										className: 'Terrasoft.Label',
										caption: 'Контрагент'
									},
									{
										className: 'Terrasoft.LookupEdit',
										value: 'Business Inc Corporation'
									},
									{
										className: 'Terrasoft.Component',
										id: 'hr2',
										html: '<hr id="hr2" class="space">',
										selectors: {
											el: '#hr2',
											wrapEl: '#hr2'
										}
									},
									{
										className: 'Terrasoft.Label',
										caption: 'Должность'
									},
									{
										className: 'Terrasoft.TextEdit',
										value: 'Директор'
									},
									{
										className: 'Terrasoft.Component',
										id: 'hr3',
										html: '<hr id="hr3">',
										selectors: {
											el: '#hr3',
											wrapEl: '#hr3'
										}
									},

									{
										className: 'Terrasoft.ControlGroup',
										caption: "СРЕДСТВА СВЯЗИ",
										collapsed: false,
										items: [
											{
												className: 'Terrasoft.Label',
												caption: 'Email'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: 'e.mirny@bicorporation.com'
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-1',
												selectors: {
													el: '#checkboxedit-wrapper-1',
													wrapEl: '#checkboxedit-wrapper-1'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox1'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Email'
													}
												]
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Телефон'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: '+7 495 305 57 28'
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-2',
												selectors: {
													el: '#checkboxedit-wrapper-2',
													wrapEl: '#checkboxedit-wrapper-2'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox2'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Телефон'
													}
												]
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Мобильный'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: ''
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-3',
												selectors: {
													el: '#checkboxedit-wrapper-3',
													wrapEl: '#checkboxedit-wrapper-3'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox3'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Мобильный'
													}
												]
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Skype'
											},
											{
												className: 'Terrasoft.LookupEdit',
												value: ''
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-4',
												selectors: {
													el: '#checkboxedit-wrapper-4',
													wrapEl: '#checkboxedit-wrapper-4'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox4'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Skype'
													}
												]
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Twitter'
											},
											{
												className: 'Terrasoft.LookupEdit',
												value: ''
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-5',
												selectors: {
													el: '#checkboxedit-wrapper-5',
													wrapEl: '#checkboxedit-wrapper-5'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox5'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Twitter'
													}
												]
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Facebook'
											},
											{
												className: 'Terrasoft.LookupEdit',
												value: ''
											},
											{
												className: 'Terrasoft.Container',
												id: 'checkboxedit-wrapper-6',
												selectors: {
													el: '#checkboxedit-wrapper-6',
													wrapEl: '#checkboxedit-wrapper-6'
												},
												items: [
													{
														className: 'Terrasoft.CheckBoxEdit',
														id: 'checkbox6'
													}, {
														className: 'Terrasoft.Label',
														caption: 'Не использовать Facebook'
													}
												]
											}
											/*{
            className: 'Terrasoft.Component',
            id: 'checkbox6',
            html: '<div id="checkbox6" class="checkboxedit"><input type="checkbox" checked="checked">&nbsp;Do not use Facebook</div><hr class="space">',
            selectors: {
            el: '#checkbox6',
            wrapEl: '#checkbox6'
            }
            }*/,
											{
												className: 'Terrasoft.Button',
												style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
												width: 350,
												caption: 'Добавить',
												menu: {items:[{caption: "SingleMenuItem"}]}
											}
										]
									},
									{
										className: 'Terrasoft.ControlGroup',
										caption: 'АДРЕСА',
										collapsed: false,
										items: [
											{
												className: 'Terrasoft.Label',
												caption: 'Юридический'
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr4',
												html: '<hr id="hr4" class="space">',
												selectors: {
													el: '#hr4',
													wrapEl: '#hr4'
												}
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Адрес'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: 'ул. Свободы 5'
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr5',
												html: '<hr id="hr5" class="space">',
												selectors: {
													el: '#hr5',
													wrapEl: '#hr5'
												}
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Страна'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: 'Россия'
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr6',
												html: '<hr id="hr6" class="space">',
												selectors: {
													el: '#hr6',
													wrapEl: '#hr6'
												}
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Город'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: 'Москва'
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr7',
												html: '<hr id="hr7" class="space">',
												selectors: {
													el: '#hr7',
													wrapEl: '#hr7'
												}
											},
											{
												className: 'Terrasoft.Label',
												caption: 'Индекс'
											},
											{
												className: 'Terrasoft.TextEdit',
												value: ''
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr8',
												html: '<hr id="hr8" class="space">',
												selectors: {
													el: '#hr8',
													wrapEl: '#hr8'
												}
											},
											{
												className: 'Terrasoft.Button',
												style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
												width: 350,
												caption: 'Добавить',
												menu: {items:[{caption: "SingleMenuItem"}]}
											}
										]
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
										className: 'Terrasoft.ControlGroup',
										caption: 'ЗНАМЕНАТЕЛЬНЫЕ СОБЫТИЯ',
										collapsed: false,
										items: [
											{
												className: 'Terrasoft.Label',
												caption: 'День рождения'
											},
											{
												className: 'Terrasoft.MemoEdit',
												value: new Date(),
												width: '300px'
											},
											{
												className: 'Terrasoft.Component',
												id: 'hr10',
												html: '<hr id="hr10" class="space">',
												selectors: {
													el: '#hr10',
													wrapEl: '#hr10'
												}
											},
											{
												className: 'Terrasoft.Button',
												style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
												width: 300,
												caption: 'Добавить',
												menu: {items:[{caption: "SingleMenuItem"}]}
											}
										]
									},
									{
										className: 'Terrasoft.ControlGroup',
										caption: 'ЗАМЕТКИ',
										collapsed: false,
										items: [
											{
												className: 'Terrasoft.MemoEdit',
												placeholder: 'Текст для пустого поля',
												width: '100%',
												height: '60px',
												value: 'Увлекается спортом.\nЛюбимый вид спорта - хоккей.'
											}
										]
									},
									{
										className: 'Terrasoft.ControlGroup',
										caption: 'ИСТОРИЯ',
										items: []
									},
									{
										className: 'Terrasoft.ControlGroup',
										caption: 'АКТИВНОСТИ',
										items: []
									}
								]
							}
						]
					}
				]
			});
		}
	};
});
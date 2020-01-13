define(["ext-base", "terrasoft", "require"], function(Ext, Terrasoft, require) {
	var root;
	return {
		"render": function(renderTo) {
			var printerUrl = require.toUrl("./images/printer.png");
			var checkImageUrl = require.toUrl("./images/menuCheckItem-checked.png");

			var menus = {};
			menus.menu4 = Ext.create('Terrasoft.Menu', {
				items: []
			});
			menus.menu4.on('prepareMenu', function() {
				return false;
			});

			var testMenuConfig = {
				items: [
					{
						caption: "caption one",
						className: 'Terrasoft.MenuSeparator'
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Move down",
						handler: function(menu, menuItem) {
							menu.moveDown(menuItem);
						}
					}, {
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Menu item #1",
						menu: {
							items: [
								{
									caption: "SubMenu item #1",
									menu: {
										items: [
											{
												caption: "SubSubMenuItem # FIRST FIRST",
												menu: {
													items: [
														{
															caption: "SubSubSubMenuItem #1",
															menu: {
																items: [
																	{
																		caption: "SubSubSubSubMenuItem #1"
																	}, {
																		caption: "SubSubSubSubMenuItem #2"
																	}
																]
															}
														}, {
															caption: "SubSubSubMenuItem #2",
															menu: {
																items: [
																	{
																		caption: "SubSubSubSubMenuItem #1"
																	}, {
																		caption: "SubSubSubSubMenuItem #2"
																	}
																]
															}
														}
													]
												}
											}, {
												caption: "SubSubMenuItem #22",
												menu: {
													items: [
														{
															caption: "SubSubSubMenuItem #1",
															menu: {
																items: [
																	{
																		caption: "SubSubSubSubMenuItem #1",
																		menu: {
																			items: [
																				{
																					caption: "SubSubSubSubSubMenuItem #1",
																					menu: {
																						items: [
																							{
																								caption: "6xSubMenuItem #1"
																							}
																						]
																					}
																				}, {
																					caption: "SubSubSubSubSubMenuItem #2"
																				}
																			]
																		}
																	}, {
																		caption: "SubSubSubSubMenuItem #2"
																	}
																]
															}
														}, {
															caption: "SubSubSubMenuItem #2",
															menu: {
																items: [
																	{
																		caption: "SubSubSubSubMenuItem #1"
																	}, {
																		caption: "SubSubSubSubMenuItem #2"
																	}
																]
															}
														}
													]
												}
											}, {
												caption: "SubSubMenu Item #333"
											}, {
												caption: "SubSubMenu Item #4444"
											}, {
												caption: "SubSubMenu Item #55555"
											}, {
												caption: "SubSubMenu Item #666666"
											}, {
												caption: "SubSubMenu Item #7777777"
											}, {
												caption: "SubSubMenu Item #88888888"
											}, {
												caption: "SubSubMenu Item #999999999"
											}, {
												caption: "SubSubMenu Item #0000000000"
											}, {
												caption: "SubSubMenu Item #11111111111"
											}, {
												caption: "SubSubMenu Item #22222222222"
											}, {
												caption: "SubSubMenu Item #333333333333"
											}, {
												caption: "SubSubMenu Item #4444444444444"
											}, {
												caption: "SubSubMenu Item #55555555555555"
											}, {
												caption: "SubSubMenu Item #666666666666666"
											}, {
												caption: "SubSubMenu Item #7777777777777777"
											}, {
												caption: "SubSubMenu Item #88888888888888888"
											}, {
												caption: "SubSubMenu Item #999999999999999999"
											}, {
												caption: "SubSubMenu Item #0000000000000000000"
											}, {
												caption: "SubSubMenu Item #1"
											}, {
												caption: "SubSubMenu Item #22"
											}, {
												caption: "SubSubMenu Item #333"
											}, {
												caption: "SubSubMenu Item #4444"
											}, {
												caption: "SubSubMenu Item #55555"
											}, {
												caption: "SubSubMenu Item #666666"
											}, {
												caption: "SubSubMenu Item #7777777"
											}, {
												caption: "SubSubMenu Item #88888888"
											}, {
												caption: "SubSubMenu Item #999999999"
											}, {
												caption: "SubSubMenu Item #0000000000"
											}, {
												caption: "SubSubMenu Item #11111111111"
											}, {
												caption: "SubSubMenu Item #222222222222"
											}, {
												caption: "SubSubMenu Item #3333333333333"
											}, {
												caption: "SubSubMenu Item #LAST LAST LAST"
											}
										]
									}
								}, {
									caption: "SubMenu item #1",
									menu: {
										items: [
											{
												caption: "SubSubMenu Item #1"
											}, {
												caption: "SubSubMenu Item #2"
											}, {
												caption: "SubSubMenu Item #3"
											}, {
												caption: "SubSubMenu Item #3"
											}, {
												caption: "SubSubMenu Item #4"
											}, {
												caption: "SubSubMenu Item #5"
											}, {
												caption: "SubSubMenu Item #6"
											}, {
												caption: "SubSubMenu Item #7"
											}, {
												caption: "SubSubMenu Item #8"
											}, {
												caption: "SubSubMenu Item #9"
											}, {
												caption: "SubSubMenu Item #10"
											}, {
												caption: "SubSubMenu Item #11"
											}, {
												caption: "SubSubMenu Item #12"
											}, {
												caption: "SubSubMenu Item #13"
											}, {
												caption: "SubSubMenu Item #14"
											}
										]
									}
								}
							]
						}
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Menu item #2",
						menu: {
							items: [
								{
									caption: "SubMenu item #2"
								}
							]
						}
					}, {
						caption: "CAPTION TWO",
						className: 'Terrasoft.MenuSeparator'
					},
					{
						showProgress: true,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Menu item #1"
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Remove item by index 5",
						handler: function(menu, menuItem) {
							menu.removeByIndex(5);
						}
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Remove this item",
						handler: function(menu, menuItem) {
							menu.removeItem(menuItem);
						}
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Insert new Item at position 3",
						handler: function(menu, menuItem) {
							var newMenuItem = Ext.create('Terrasoft.MenuItem', {
								caption: "INSERTED AT POSITION 3"
							});
							menu.addItem(newMenuItem, 3);
						}
					}, {
						showProgress: false,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: printerUrl
						},
						caption: "Move up",
						handler: function(menu, menuItem) {
							menu.moveUp(menuItem);
						}
					}, {
						caption: "Checked item",
						checked: true,
						className: Terrasoft.MenuItemType.CHECK
					}, {
						caption: "Checked item",
						checked: false,
						className: Terrasoft.MenuItemType.CHECK
					}
				]
			};
			var narezkaMenuConfig = {
				items: [
					{
						caption: "СПИСОК",
						className: 'Terrasoft.MenuSeparator'
					},
					{
						caption: 'Изменить сортировку',
						showProgress: true,
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD8SURBVDhPpZLPC0RQEMd3L/vH7wHJQTluKUmUmxyRf2DlpIiEopCflx377NvYt/aw35M3bz4z8x3vPE3T6aVxHOd5xkf8cXlqPQKAZZrmlSTXdXHO6S/A931o8qkgCDYdmqbxPM+2bWI2CjqOA+X6vl9GyrJMFEWapokGUJBhGEmS6rpegCiKKIo6yEZXULGqqgUIw/BnNkooy/INwKBgBkKfattWVVUCAIwgCLeteJ6H//AVAOa+la7reyCOY5Zl0fpkWd4tFxaIAI7jVtNFUSiKYlnWAWAYhqZpYHIx3XUdNMnzHNUmjpSmaZIkwzDs39I30+THd7BWDDwAgBYvEG+7mgEAAAAASUVORK5CYII="
						},
						menu: {
							items: [
								{
									caption: 'Изменить сортировку'
								},
								{
									caption: 'Настроить вид списка'
								},
								{
									caption: 'Показать итоги'
								}
							]
						}

					},
					{
						caption: 'Настроить вид списка'
					},
					{
						caption: 'Показать итоги'
					},
					{
						caption: "ФИЛЬТР",
						className: 'Terrasoft.MenuSeparator'
					},
					{
						caption: 'Добавить фильтр по выдилению'
					},
					{
						caption: 'Настроить вид фильтров'
					},
					{
						caption: 'Показать фильтры'
					}
				]
			};
			root = Ext.create('Terrasoft.Container', {
				id: 'menuContainer',
				selectors: {
					wrapEl: '#menuContainer'
				},
				renderTo: renderTo,
				tpl: [
					'<div id="{id}" class="menu-holder">',
						'<tpl for="items">',
							'<@item>',
						'</tpl>',
					'</div>'
				],
				items: [
					Ext.create('Terrasoft.Container', {
						id: 'menuContainer1',
						selectors: {
							wrapEl: '#menuContainer1'
						},
						tpl: [
							'<div id="{id}">',
								'<tpl for="items">',
									'<@item>',
								'</tpl>',
							'</div>'
						],
						items: [
							Ext.create('Terrasoft.Button', {
								caption: "Three separators",
								menu: {
									items: [
										{
											caption: "НАЗВАНИЕ ГРУППЫ",
											className: 'Terrasoft.MenuSeparator'
										}, {
											imageConfig: {
												source: Terrasoft.ImageSources.URL,
												url: checkImageUrl
											},
											caption: "Между"
										}, {
											caption: "Больше или равно"
										}, {
											caption: "Меньше"
										}, {
											caption: "НАЗВАНИЕ ГРУППЫ",
											className: 'Terrasoft.MenuSeparator'
										}, {
											caption: "Больше"
										}, {
											caption: "Меньше"
										}, {
											caption: "НАЗВАНИЕ ГРУППЫ",
											className: 'Terrasoft.MenuSeparator'
										}, {
											caption: "Не заполнено"
										}
									]
								}
							}),
							Ext.create('Terrasoft.Button', {
								caption: "Two separators",
								menu: {
									items: [
										{
											caption: "СПИСОК",
											className: 'Terrasoft.MenuSeparator'
										}, {
											imageConfig: {
												source: Terrasoft.ImageSources.URL,
												url: checkImageUrl
											},
											caption: "Изменить сортировку"
										}, {
											caption: "Настроить вид списка"
										}, {
											caption: "Показать итоги"
										}, {
											caption: "ФИЛЬТР",
											className: 'Terrasoft.MenuSeparator'
										}, {
											caption: "Добавить фильтр по выделению"
										}, {
											caption: "Настроить вид фильтров"
										}, {
											caption: "Показать фильтры"
										}
									]
								}
							}),
							Ext.create('Terrasoft.Button', {
								caption: "No separators",
								menu: {
									items: [
										{
											caption: "Изменить сортировку"
										}, {
											caption: "Настроить вид списка"
										}, {
											caption: "Показать итоги"
										}
									]
								}
							}),
							Ext.create('Terrasoft.Button', {
								caption: "LOADING",
								menu: menus.menu4
							}),
							Ext.create('Terrasoft.Button', {
								caption: "Button with inline config",
								menu: {
									items: [
										{
											caption: "Изменить сортировку"
										}, {
											caption: "Настроить вид списка"
										}, {
											caption: "Показать итоги"
										}
									]
								}
							}),
							Ext.create('Terrasoft.Button', {
								caption: "Radio menu items",
								menu: {
									items: [
										{
											caption: "Group 1 Item 1",
											className: Terrasoft.MenuItemType.RADIO,
											groupName: "group1",
											selected: true
										}, {
											caption: "Group 1 Item 2",
											className: Terrasoft.MenuItemType.RADIO,
											groupName: "group1"
										}, {
											caption: "Group 1 Item 3",
											className: Terrasoft.MenuItemType.RADIO,
											groupName: "group1"
										}, {
											caption: "Group 2 Item 1",
											className: Terrasoft.MenuItemType.RADIO,
											groupName: "group2"
										}, {
											caption: "Group 2 Item 2",
											className: Terrasoft.MenuItemType.RADIO,
											groupName: "group2"
										}
									]
								}
							}),
							Ext.create('Terrasoft.Button', {
								caption: "Button with menu and heavy handler",
								menu: {
									items: [
										{
											caption: "item"
										}
									]
								},
								handler: function() {
									var sum = 0;
									for (var i = 0; i < 9999; i++) {
										sum++;
									}
									alert(sum);
								}
							})
						]
					}),
					Ext.create('Terrasoft.Container', {
						id: 'menuContainer2',
						selectors: {
							wrapEl: '#menuContainer2'
						},
						tpl: [
							'<div id="{id}">',
								'<tpl for="items">',
									'<@item>',
								'</tpl>',
							'</div>'
						],
						items: [
							Ext.create('Terrasoft.Button', {
								caption: "TEST MENU",
								menu: Ext.create('Terrasoft.Menu', testMenuConfig)
							}),
							Ext.create('Terrasoft.Button', {
								caption: "TEST MENU",
								menu: Ext.create('Terrasoft.Menu', testMenuConfig)
							}),
							Ext.create('Terrasoft.Button', {
								caption: "TEST MENU",
								menu: Ext.create('Terrasoft.Menu', testMenuConfig)
							}),
							Ext.create('Terrasoft.Button', {
								caption: "Вид",
								menu: Ext.create('Terrasoft.Menu', narezkaMenuConfig)
							}),
							Ext.create('Terrasoft.Button', {
								caption: 'Удаление лишних сепараторов',
								menu: Ext.create('Terrasoft.Menu', {
									items: [{
										id: 'item-0',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-1',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-2',
										className: 'Terrasoft.MenuSeparator',
										caption: 'Separator Caption 1'
									}, {
										id: 'item-3',
										caption: 'caption 1'
									}, {
										id: 'item-4',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-5',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-6',
										className: 'Terrasoft.MenuSeparator',
										caption: 'Separator Caption 2'
									}, {
										id: 'item-7',
										className: 'Terrasoft.MenuSeparator',
										caption: 'Separator Caption 2'
									}, {
										id: 'item-8',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-9',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-10',
										caption: 'caption 2'
									}, {
										id: 'item-11',
										className: 'Terrasoft.MenuSeparator',
										caption: 'Separator Caption 3'
									}, {
										id: 'item-12',
										className: 'Terrasoft.MenuSeparator'
									}, {
										id: 'item-13',
										className: 'Terrasoft.MenuSeparator'
									}]
								})
							})
						]
					})
				]
			});
		},
		"unload": function() {
			root.destroy();
		}
	};
});
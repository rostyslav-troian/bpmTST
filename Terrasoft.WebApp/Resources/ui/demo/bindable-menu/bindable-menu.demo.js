define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var Bindable = {};

			function prepareCollection(initialCollection) {
				var collection = initialCollection || new Terrasoft.BaseViewModelCollection();
				var item1 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption 1',
						Id: '1',
						//Type: Terrasoft.MenuItemType.SEPARATOR
						Click: {
							bindTo: 'buttonClick'
						},
						Visible: {
							bindTo: 'isVisible'
						},
						Enabled: {
							bindTo: 'isEnabled'
						}
					}
				});
				var item2 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption 2',
						Id: '2',
						Items: prepareSubCollection()
					}
				});
				var item3 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption 3',
						Id: '3',
						Type: Terrasoft.MenuItemType.CHECK,
						Click: {
							bindTo: 'lastButtonClick'
						}
					}
				});
				var objs = {
					'1': item1,
					'3': item3,
					'2': item2

				};
				collection.loadAll(objs);
				return collection;
			}

			function prepareNewSubCollection(initialCollection) {
				var collection = initialCollection || new Terrasoft.BaseViewModelCollection();
				var item101 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption Sub',
						Id: '101',
						Click: {
							bindTo: 'buttonClick'
						}
					}
				});
				var item102 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption Sub',
						Id: '102',
						Click: {
							bindTo: 'lastButtonClick'
						}
					}
				});
				var item103 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption Sub',
						Id: '103',
						Items: prepareSubCollection()
					}
				});
				var subobjs = {
					'101': item101,
					'102': item102,
					'103': item103
				};
				collection.loadAll(subobjs);
				return collection;
			}

			function prepareSubCollection(initialCollection) {
				var collection = initialCollection || new Terrasoft.BaseViewModelCollection();
				var item55 = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: 'caption Sub',
						Id: '55',
						Click: {
							bindTo: 'subButtonClick'
						}
					}
				});
				var subobjs = {
					'55': item55
				};
				collection.loadAll(subobjs);
				return collection;
			}

			function prepareModel() {
				window.model = Bindable.model = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						MenuData: prepareCollection(),
						SubMenuData: prepareSubCollection(),
						NewSubMenuData: prepareNewSubCollection(),
						isVisible: true,
						isEnabled: false
					},
					methods: {
						loadData: function() {
							var list = this.get('MenuData');
							prepareCollection(list);
						},
						subLoadData: function() {
							var subList = this.get('SubMenuData');
							prepareSubCollection(subList);
						},
						changeData: function() {
							var collection = this.get('MenuData');
							collection.collection.items[0].set('Caption', 'new caption');
						},
						addData: function() {
							var collection = this.get('MenuData');
							var id = new Date().getTime().toString();
							var item = Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Caption: 'caption ' + id,
									Id: id,
									Click: {
										bindTo: 'lastButtonClick'
									}
								}
							});
							collection.add(id, item);
						},
						removeData: function() {
							var collection = this.get('MenuData');
							var lastIndex = collection.getCount() - 1;
							var item = collection.collection.items[lastIndex];
							collection.remove(item);
						},
						removeAll: function() {
							var collection = this.get('MenuData');
							collection.clear();
						},
						buttonClick: function() {
							alert('Item Clicked');
						},
						lastButtonClick: function() {
							alert('Last Item Clicked');
						},
						subButtonClick: function() {
							alert('Sub Item Clicked');
						},
						menuButtonClick: function() {
							alert('Menu Button Clicked');
						},
						addSubButton: function() {
							var collection = this.get('MenuData');
							var id = new Date().getTime().toString();
							var item = Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Caption: 'caption ' + id,
									Id: id,
									Items: prepareNewSubCollection()
								}
							});
							collection.add(id, item);
						},
						delSubButton: function() {
							var collection = this.get('MenuData');
							var lastIndex = collection.getCount() - 1;
							var item = collection.collection.items[lastIndex];
							item.set('Items', null);
						},
						reSubButton: function() {
							var collection = this.get('MenuData');
							var lastIndex = collection.getCount() - 1;
							var item = collection.collection.items[lastIndex];
							item.set('Items', prepareNewSubCollection());
						},
						unVisibleButton: function() {
							//var collection = this.get('MenuData');
							//collection.collection.items[0].set('Visible', false);
							this.set('isVisible', false);
						},
						visibleButton: function() {
							//var collection = this.get('MenuData');
							//collection.collection.items[0].set('Visible', true);
							this.set('isVisible', true);
						},
						disableButton: function() {
							//var collection = this.get('MenuData');
							//collection.collection.items[0].set('Enabled', false);
							this.set('isEnabled', false);
						},
						enableButton: function() {
							//var collection = this.get('MenuData');
							//collection.collection.items[0].set('Enabled', true);
							this.set('isEnabled', true);
						}
					}
				});
			}

			function renderView() {
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
									id: 'baton',
									className: 'Terrasoft.Button',
									caption: 'Items Array Menu',
									menu: {
										items: [{
											caption: "Move down",
											handler: function(menu, menuItem) {
												menu.moveDown(menuItem);
											}
										}, {
											caption: "Menu item #2",
											menu: {
												items: [
													{
														caption: "SubMenu item #2"
													}
												]
											}
										}, {
											caption: "Click this item",
											click: {
												bindTo: 'menuButtonClick'
											}
										}]
									}
								}, {
									className: 'Terrasoft.Button',
									caption: 'Bindable Menu',
									menu: {
										items: {
											bindTo: 'MenuData'
										}
									}/*,
									click: {
										bindTo: 'menuButtonClick'
									}  */
								}
							]
						}, {
							className: 'Terrasoft.Container',
							id: 'content-right',
							selectors: {
								el: '#content-right',
								wrapEl: '#content-right'
							},
							items: [
								{
									className: 'Terrasoft.Button',
									id: 'gridButton',
									caption: 'Заполнить меню',
									click: {
										bindTo: 'loadData'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'subButton',
									caption: 'Заполнить подменю',
									click: {
										bindTo: 'subLoadData'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'changeButton',
									caption: 'Изменить первый элемент',
									click: {
										bindTo: 'changeData'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'addButton',
									caption: 'Добавить элемент',
									click: {
										bindTo: 'addData'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'removeButton',
									caption: 'Удалить последний',
									click: {
										bindTo: 'removeData'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'removeAll',
									caption: 'Удалить все',
									click: {
										bindTo: 'removeAll'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'addSubButton',
									caption: 'Добавить элемент с подменю',
									click: {
										bindTo: 'addSubButton'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'delSubButton',
									caption: 'Удалить подменю',
									click: {
										bindTo: 'delSubButton'
									}
								},{
									className: 'Terrasoft.Button',
									id: 'reSubButton',
									caption: 'Добавить подменю заново',
									click: {
										bindTo: 'reSubButton'
									}
								},
								{
									className: 'Terrasoft.Button',
									id: 'unVisibleButton',
									caption: 'Скрыть элемент',
									click: {
										bindTo: 'unVisibleButton'
									}
								},{
									className: 'Terrasoft.Button',
									id: 'visibleButton',
									caption: 'Сделать видимым',
									click: {
										bindTo: 'visibleButton'
									}
								}, {
									className: 'Terrasoft.Button',
									id: 'disableButton',
									caption: 'Залочить элемент',
									click: {
										bindTo: 'disableButton'
									}
								},{
									className: 'Terrasoft.Button',
									id: 'enableButton',
									caption: 'Разлочить элемент',
									click: {
										bindTo: 'enableButton'
									}
								}
							]
						}
					]
				});
				Bindable.view.bind(Bindable.model);
			}
			prepareModel();
			renderView();
		}
	};
});
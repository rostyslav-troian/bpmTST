define(["ext-base", "terrasoft", "button"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			Ext.define("Terrasoft.DataViewModel", {
				extend: 'Terrasoft.BaseViewModel',
				primaryColumnName: 'Id',
				columns: {
					Id: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'Id',
						dataValueType: Terrasoft.core.enums.DataValueType.GUID
					},
					Parent: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'Parent',
						dataValueType: Terrasoft.core.enums.DataValueType.GUID
					},
					Title: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'Title',
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT
					},
					HasNesting: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: 'HasNesting',
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT
					}
				}
			});

			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1',
									HasNesting: '1'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							}),
							'4': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '4',
									Title: 'Title 4'
								}
							}),
							'5': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '5',
									Parent: '3',
									Title: 'Title 3-1'
								}
							}),
							'6': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '6',
									Parent: '3',
									Title: 'Title 3-2'
								}
							})
						};
						collection.loadAll(items);
					},
					onUpdateExpandHierarchyLevels: function(id, status) {
						var self = this;
						var collection = this.get('gridData');
						if ('1' === id) {
							var addOptions = {
								mode: 'child',
								target: '1'
							};
							var spinnerAddOptions = {
								state: status,
								options: addOptions
							};
							var spinnerRemoveOptions = {
								state: false,
								options: addOptions
							};
							this.set('isLoading', spinnerAddOptions);
							var items = {
								'2': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '2',
										Parent: '1',
										Title: 'Title 1-1',
										HasNesting: '1'
									}
								})
							};
							setTimeout(function() {
								self.set('isLoading', spinnerRemoveOptions);
								collection.loadAll({
									'2': Ext.create("Terrasoft.DataViewModel", {
										values: {
											Id: '2',
											Parent: '1',
											Title: 'Title 1-1',
											HasNesting: '1'
										}
									})
								}, addOptions);
							}, 1000);
						} else if ('2' === id) {
							var addOptions = {
								mode: 'child',
								target: '2'
							};
							var spinnerAddOptions = {
								state: status,
								options: addOptions
							};
							var spinnerRemoveOptions = {
								state: false,
								options: addOptions
							};
							this.set('isLoading', spinnerAddOptions);
							var items = {
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Parent: '2',
										Title: 'Title 1-1-1'
									}
								}),
								'8': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '8',
										Parent: '2',
										Title: 'Title 1-1-2'
									}
								})
							};
							setTimeout(function() {
								self.set('isLoading', spinnerRemoveOptions);
								collection.loadAll(items, addOptions);
							}, 1000)
						}
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'listed',
				hierarchical: true,
				multiSelect: true,
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					{
						cols: 24,
						key: [
							{ name: { bindTo: 'Title' } }
						]
					}
				],
				captionsConfig: [
					{
						cols: 24,
						name: 'Название'
					}
				],
				updateExpandHierarchyLevels: { bindTo: 'onUpdateExpandHierarchyLevels' },
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1',
									HasNesting: '1'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							}),
							'4': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '4',
									Title: 'Title 4'
								}
							}),
							'5': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '5',
									Parent: '3',
									Title: 'Title 3-1'
								}
							}),
							'6': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '6',
									Parent: '3',
									Title: 'Title 3-2'
								}
							})
						};
						collection.loadAll(items);
					},
					onUpdateExpandHierarchyLevels: function(id, status) {
						var self = this;
						var collection = this.get('gridData');
						if ('1' === id) {
							var addOptions = {
								mode: 'child',
								target: '1'
							};
							var spinnerAddOptions = {
								state: status,
								options: addOptions
							};
							var spinnerRemoveOptions = {
								state: false,
								options: addOptions
							};
							this.set('isLoading', spinnerAddOptions);
							var items = {
								'2': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '2',
										Parent: '1',
										Title: 'Title 1-1',
										HasNesting: '1'
									}
								})
							};
							setTimeout(function() {
								self.set('isLoading', spinnerRemoveOptions);
								collection.loadAll(items, addOptions);
							}, 1000);
							// add top
							setTimeout(function() {
								self.set('isLoading', { state: true, options: { mode: 'top' }});
							}, 2000);
							setTimeout(function() {
								self.set('isLoading', { state: false, options: { mode: 'top' }});
								collection.loadAll({
									'7': Ext.create("Terrasoft.DataViewModel", {
										values: {
											Id: '7',
											Title: 'Title 0'
										}
									})
								}, { mode: 'top' });
							}, 3000);
							// add bottom
							setTimeout(function() {
								self.set('isLoading', { state: true, options: { mode: 'bottom' }});
							}, 4000);
							setTimeout(function() {
								self.set('isLoading', { state: false, options: { mode: 'bottom' }});
								collection.loadAll({
									'8': Ext.create("Terrasoft.DataViewModel", {
										values: {
											Id: '8',
											Title: 'Title 5'
										}
									})
								}, { mode: 'bottom' });
							}, 5000);
							// add one item
							setTimeout(function() {
								collection.add('9',
									Ext.create("Terrasoft.DataViewModel", {
										values: {
											Id: '9',
											Title: 'add one item'
										}
									})
									, 1);
							}, 6000);
							// delete item
							setTimeout(function() {
								collection.removeByKey('9');
							}, 7000);
							// update item
							setTimeout(function() {
								var item = collection.get('8');
								item.set('Title', 'Новое значение');
							}, 8000);
						} else if ('2' === id) {
							var addOptions = {
								mode: 'child',
								target: '2'
							};
							var spinnerAddOptions = {
								state: status,
								options: addOptions
							};
							var spinnerRemoveOptions = {
								state: false,
								options: addOptions
							};
							this.set('isLoading', spinnerAddOptions);
							var items = {
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Parent: '2',
										Title: 'Title 1-1-1'
									}
								})
							};
							setTimeout(function() {
								self.set('isLoading', spinnerRemoveOptions);
								collection.loadAll(items, addOptions);
							}, 1000)
						}
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'listed',
				hierarchical: true,
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					{
						cols: 24,
						key: [
							{ name: { bindTo: 'Title' } }
						]
					}
				],
				captionsConfig: [
					{
						cols: 24,
						name: 'Название'
					}
				],
				updateExpandHierarchyLevels: { bindTo: 'onUpdateExpandHierarchyLevels' },
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							})
						};
						collection.loadAll(items);
					},
					onSelectRow: function(id) {
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'4': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '4',
										Title: 'Догружено 1'
									}
								}),
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено 2'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'6': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '6',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('6');
							item.set('Title', 'Новое значение');
						}, 8000);
					},
					onUnSelectRow: function(id) {
						var self = this;
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerRemoveOptions);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'listed',
				multiSelect: true,
				selectRow: { bindTo: 'onSelectRow' },
				unSelectRow: { bindTo: 'onUnSelectRow' },
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					{
						cols: 24,
						key: [
							{
								name: { bindTo: 'Title' }
							}
						]
					}
				],
				captionsConfig: [
					{
						cols: 24,
						name: 'Название'
					}
				],
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							})
						};
						collection.loadAll(items);
					},
					onSelectRow: function(id) {
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'4': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '4',
										Title: 'Догружено 1'
									}
								}),
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено 2'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'6': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '6',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('6');
							item.set('Title', 'Новое значение');
						}, 8000);
					},
					onUnSelectRow: function(id) {
						var self = this;
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerRemoveOptions);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'listed',
				selectRow: { bindTo: 'onSelectRow' },
				unSelectRow: { bindTo: 'onUnSelectRow' },
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					{
						cols: 24,
						key: [
							{
								name: { bindTo: 'Title' }
							}
						]
					}
				],
				captionsConfig: [
					{
						cols: 24,
						name: 'Название'
					}
				],
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2',
									HasNesting: '1'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							}),
							'4': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '4',
									Parent: '3',
									Title: 'Title 3-1'
								}
							})
						};
						collection.loadAll(items);
					},
					onUpdateExpandHierarchyLevels: function(id, status) {
						if (id !== '2') {
							return;
						}
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'child',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						if (!status) {
							self.set('isLoading', spinnerRemoveOptions);
							return;
						}
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Parent: '2',
										Title: 'Догружено 111'
									}
								}),
								'6': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '6',
										Parent: '2',
										Title: 'Догружено 222'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'8': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '8',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('8');
							item.set('Title', 'Новое значение');
						}, 8000);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'tiled',
				hierarchical: true,
				multiSelect: true,
				updateExpandHierarchyLevels: { bindTo: 'onUpdateExpandHierarchyLevels' },
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					[
						{
							cols: 24,
							key: [
								{
									name: { bindTo: 'Title' }
								}
							]
						}
					]
				],
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2',
									HasNesting: '1'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							}),
							'4': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '4',
									Parent: '3',
									Title: 'Title 3-1'
								}
							})
						};
						collection.loadAll(items);
					},
					onUpdateExpandHierarchyLevels: function(id, status) {
						if (id !== '2') {
							return;
						}
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'child',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						if (!status) {
							self.set('isLoading', spinnerRemoveOptions);
							return;
						}
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Parent: '2',
										Title: 'Догружено 1'
									}
								}),
								'6': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '6',
										Parent: '2',
										Title: 'Догружено 2'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'8': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '8',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('8');
							item.set('Title', 'Новое значение');
						}, 8000);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'tiled',
				hierarchical: true,
				updateExpandHierarchyLevels: { bindTo: 'onUpdateExpandHierarchyLevels' },
				collection: { bindTo: 'gridData' },
				columnsConfig: [
					[
						{
							cols: 24,
							key: [
								{
									name: { bindTo: 'Title' }
								}
							]
						}
					]
				],
				isLoading: { bindTo: 'isLoading' },
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							})
						};
						collection.loadAll(items);
					},
					onSelectRow: function(id) {
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'4': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '4',
										Title: 'Догружено 1'
									}
								}),
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено 2'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'8': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '8',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('8');
							item.set('Title', 'Новое значение');
						}, 8000);
					},
					onUnSelectRow: function(id) {
						var self = this;
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerRemoveOptions);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'tiled',
				multiSelect: true,
				selectRow: { bindTo: 'onSelectRow' },
				unSelectRow: { bindTo: 'onUnSelectRow' },
				collection: { bindTo: 'gridData' },
				isLoading: { bindTo: 'isLoading' },
				columnsConfig: [
					[
						{
							cols: 24,
							key: [
								{
									name: { bindTo: 'Title' }
								}
							]
						}
					]
				],
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - additional loading of data to the list

			var model = Ext.create('Terrasoft.BaseViewModel', {
				values: {
					gridData: new Terrasoft.BaseViewModelCollection(),
					isLoading: false
				},
				methods: {
					load: function() {
						var collection = this.get('gridData');
						// Collection Id and key match

						var items = {
							'1': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '1',
									Title: 'Title 1'
								}
							}),
							'2': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '2',
									Title: 'Title 2'
								}
							}),
							'3': Ext.create("Terrasoft.DataViewModel", {
								values: {
									Id: '3',
									Title: 'Title 3'
								}
							})
						};
						collection.loadAll(items);
					},
					onSelectRow: function(id) {
						var self = this;
						var collection = this.get('gridData');
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerAddOptions = {
							state: true,
							options: addOptions
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerAddOptions);
						setTimeout(function() {
							self.set('isLoading', spinnerRemoveOptions);
							collection.loadAll({
								'4': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '4',
										Title: 'Догружено 1'
									}
								}),
								'5': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '5',
										Title: 'Догружено 2'
									}
								})
							}, addOptions);
						}, 1000);
						// add top
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'top' }});
						}, 2000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'top' }});
							collection.loadAll({
								'7': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '7',
										Title: 'Догружено TOP'
									}
								})
							}, { mode: 'top' });
						}, 3000);
						// add bottom
						setTimeout(function() {
							self.set('isLoading', { state: true, options: { mode: 'bottom' }});
						}, 4000);
						setTimeout(function() {
							self.set('isLoading', { state: false, options: { mode: 'bottom' }});
							collection.loadAll({
								'8': Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '8',
										Title: 'Догружено BOTTOM'
									}
								})
							}, { mode: 'bottom' });
						}, 5000);
						// add one item
						setTimeout(function() {
							collection.add('9',
								Ext.create("Terrasoft.DataViewModel", {
									values: {
										Id: '9',
										Title: 'add one item'
									}
								})
								, 1);
						}, 6000);
						// delete item
						setTimeout(function() {
							collection.removeByKey('9');
						}, 7000);
						// update item
						setTimeout(function() {
							var item = collection.get('8');
							item.set('Title', 'Новое значение');
						}, 8000);
					},
					onUnSelectRow: function(id) {
						var self = this;
						var addOptions = {
							mode: 'after',
							target: id
						};
						var spinnerRemoveOptions = {
							state: false,
							options: addOptions
						};
						this.set('isLoading', spinnerRemoveOptions);
					}
				}
			});
			var view = Ext.create('Terrasoft.Grid', {
				renderTo: renderTo,
				type: 'tiled',
				selectRow: { bindTo: 'onSelectRow' },
				unSelectRow: { bindTo: 'onUnSelectRow' },
				collection: { bindTo: 'gridData' },
				isLoading: { bindTo: 'isLoading' },
				columnsConfig: [
					[
						{
							cols: 24,
							key: [
								{
									name: { bindTo: 'Title' }
								}
							]
						}
					]
				],
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});
			view.bind(model);
			model.load();
			// finish - additional loading of data to the list


			// start - External button demo
			Ext.define("Terrasoft.ViewModel", {
				extend: 'Terrasoft.BaseViewModel'
			});

			var ViewModelExternal = Ext.create("Terrasoft.ViewModel", {
				methods: {
					firstButton: function() {
						alert('firstButton');
					}
				}
			});

			var ViewModel = Ext.create("Terrasoft.ViewModel", {
				methods: {
					init: function(id, renderTo) {
						var View = Ext.create('Terrasoft.Container', {
							id: 'external-actions-view-' + id,
							selectors: {
								wrapEl: '#external-actions-view-' + id
							},
							items: [
								{
									className: 'Terrasoft.Button',
									id: 'firstButton-' + id,
									caption: 'Внешняя кнопка',
									click: {
										bindTo: 'firstButton'
									}
								}
							]
						});
						View.bind(ViewModelExternal);
						View.render(renderTo);
					}
				}
			});

			var grid = Ext.create('Terrasoft.Grid', {
				type: 'tiled',
				watchRowInViewport: 2,
				useRowActionsExternal: true,
				rows: [
					{
						title: 'Контрольный звонок клиенту, узнать ситуацию о финансировании отдела',
						responsibleName: 'Евгений Мирный',
						icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
						responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-32x32.png',
						priority: 'Нормальный',
						status: 'В работе'
					},
					{
						title: 'Предложить клиенту референсную встречу',
						responsibleName: 'Светлана Филимонова',
						icon: 'Resources/Terrasoft/controls/grid/icon-letter-22x22.png',
						responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png',
						countryIcon: 'Resources/Terrasoft/controls/grid/flag-spain-16x16.png',
						startDate: '25.09.2012 12:30',
						priority: 'Нормальный',
						status: 'Отменена',
						result: 'Отменена',
						resultDetailed: 'Отменена в связи с отсутствием необходимости. Клиент принял решение в нашу пользу',
						counteragent: 'Альфабизнес',
						contact: 'Вячеслав Носов',
						country: 'Испания',
						influence: 'Выставка',
						sale: '101/Альфабизнес/Комплексная продажа',
						testLinkType: {
							title: 'my test link title',
							url: 'http://terrasoft.com',
							target: '_blank'
						}
					},
					{
						title: 'Предложить клиенту референсную встречу',
						responsibleName: 'Светлана Филимонова',
						icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
						responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png',
						startDate: '28.09.2012 12:30',
						priority: 'Нормальный',
						status: 'Выполнена',
						result: 'Договорились о встрече',
						resultDetailed: 'Договорились провести встречу на следующей неделе'
					}
				],
				columnsConfig: [
					[
						{
							cols: 24,
							link: 'testLinkType',
							key: [
								{
									name: 'icon',
									type: 'grid-icon-22x22'
								},
								{
									name: 'title',
									type: 'title'
								}
							]
						}
					],
					[
						{
							cols: 9,
							minHeight: '20px',
							maxHeight: '100px',
							link: 'testLinkType',
							key: [
								{
									name: 'responsibleIcon',
									type: 'grid-icon-32x32'
								},
								{
									name: 'Ответственный',
									type: 'caption'
								},
								{
									name: 'responsibleName'
								}
							]
						},
						{
							cols: 5,
							link: 'testLinkType',
							key: [
								{
									name: 'Дата начала',
									type: 'caption'
								},
								{
									name: 'startDate'
								}
							]
						},
						{
							cols: 5,
							link: 'testLinkType',
							key: [
								{
									name: 'Приоритет',
									type: 'caption'
								},
								{
									name: 'priority'
								}
							]
						},
						{
							cols: 5,
							link: 'testLinkType',
							key: [
								{
									name: 'Состояние',
									type: 'caption'
								},
								{
									name: 'status'
								}
							]
						}
					],
					[
						{
							cols: 9,
							link: 'testLinkType',
							key:[
								{
									name: 'Результат',
									type: 'caption'
								},
								{
									name: 'result'
								}
							]
						},
						{
							cols: 15,
							link: 'testLinkType',
							key: [
								{
									name: 'Результат подробно',
									type: 'caption'
								},
								{
									name: 'resultDetailed'
								}
							]
						}
					],
					[
						{
							cols: 6,
							key: [
								{
									name: 'Контрагент',
									type: 'caption'
								},
								{
									name: 'counteragent'
								}
							]
						},
						{
							cols: 6,
							key:[
								{
									name: 'Контакт',
									type: 'caption'
								},
								{
									name: 'contact'
								}
							]
						},
						{
							cols: 6,
							key: [
								{
									name: 'Страна',
									type: 'caption'
								},
								{
									name: 'countryIcon',
									type: 'grid-flag-icon-16x16'
								},
								{
									name: 'country'
								}
							]
						},
						{
							cols: 6,
							key: [
								{
									name: 'Воздействие',
									type: 'caption'
								},
								{
									name: 'influence'
								}
							]
						}
					],
					[
						{
							cols: 24,
							key: [
								{
									name: 'Продажа',
									type: 'caption'
								},
								{
									name: 'sale'
								}
							]
						}
					]
				],
				activeRowActions: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: 'Редактировать',
						tag: 'edit'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Копировать',
						tag: 'copy'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Удалить',
						tag: 'delete'
					},
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						caption: 'Еще',
						tag: 'more',
						menu: {
							items: [
								{
									caption: 'Строка 1',
									tag: 'str1'
								},
								{
									caption: 'Строка 2',
									tag: 'str2'
								},
								{
									caption: 'Строка 3',
									tag: 'str3'
								}
							]
						}
					}
				]
			});

			grid.on('afterRowRender', ViewModel.init);

			grid.render(renderTo);
			// finish - External button demo

			Ext.create('Terrasoft.Container', {
				id: 'texteditContainer',
				tpl: [
					'<div id="{id}" class="examples">',
						'<tpl for="items">',
							'<div class="example">',
								'<@item>',
								'<br><br><br><br><br>',
							'</div>',
						'</tpl>',
					'</div>'
				],
				renderTo: renderTo,
				selectors: {
					wrapEl: '#texteditContainer'
				},
				items: [

					{
						className: 'Terrasoft.Grid',
						type: 'listed',
						hierarchical: true,
						multiSelect: true,
						primaryColumnName: 'iii',
						hierarchicalColumnName: 'ppp',
						rows: [
							{
								iii: 11,
								name: 'Alfa',
								contact: 'Timothy Sawyer',
								responsibleName: 'John Best',
								testLinkType: {
									title: 'JavaScript Alert',
									url: 'javascript:alert(1);',
									target: '_blank'
								},
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-22x22.png'
								}
							},
							{
								iii: 22,
								name: 'Alfa-business',
								contact: 'Taylor P. Johnson',
								responsibleName: 'Helen Hall',
								ppp: 11,
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-22x22.png'
								}
							},
							{
								iii: 33,
								name: 'Alfa-trade',
								contact: 'James Smith',
								responsibleName: 'Richard Clayton',
								ppp: 11,
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-0918-22x22.png'
								}
							},
							{
								iii: 44,
								name: 'Beta alfa',
								contact: 'Jane Russel',
								responsibleName: 'Alfred Cambbell',
								ppp: 22,
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-empty-22x22.png'
								}
							},
							{
								iii: 55,
								name: 'Company alfa',
								contact: 'Jason Robinson',
								responsibleName: 'Emily V. Cook',
								ppp: 22,
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-33176-22x22.png'
								}
							}
						],
						columnsConfig: [
							{
								cols: 10,
								link: 'testLinkType',
								key: [
									{
										name: 'responsibleIcon',
										type: 'grid-listed-icon-22x22'
									},
									{
										name: 'name'
									}
								]
							},
							{
								cols: 8,
								key: [
									{
										name: 'contact'
									}
								]
							},
							{
								cols: 6,
								key: [
									{
										name: 'responsibleIcon',
										type: 'grid-listed-icon-22x22'
									},
									{
										name: 'responsibleName'
									}
								]
							}
						],
						captionsConfig: [
							{
								cols: 10,
								name: 'Название',
								sortColumnDirection: Terrasoft.core.enums.OrderDirection.ASC
							},
							{
								cols: 8,
								name: 'Основной контакт',
								sortDirection: 'none'
							},
							{
								cols: 6,
								name: 'Ответственный',
								sortDirection: 'none'
							}
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'listed',
						hierarchical: true,
						rows: [
							{
								Id: 1,
								name: 'Alfa',
								contact: 'Timothy Sawyer',
								responsibleName: 'John Best',
								testLinkType: {
									title: 'my test link title',
									url: 'http://terrasoft.ru',
									target: '_blank'
								},
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-22x22.png'
								}
							},
							{
								Id: 2,
								name: 'Alfa-business',
								contact: 'Taylor P. Johnson',
								responsibleName: 'Helen Hall',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-22x22.png'
								},
								Parent: 1
							},
							{
								Id: 3,
								name: 'Alfa-trade',
								contact: 'James Smith',
								responsibleName: 'Richard Clayton',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-0918-22x22.png'
								},
								Parent: 1
							},
							{
								Id: 4,
								name: 'Beta alfa',
								contact: 'Jane Russel',
								responsibleName: 'Alfred Cambbell',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-empty-22x22.png'
								},
								Parent: 2
							},
							{
								Id: 5,
								name: 'Company alfa',
								contact: 'Jason Robinson',
								responsibleName: 'Emily V. Cook',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-33176-22x22.png'
								},
								Parent: 2
							}
						],
						columnsConfig: [
							{
								cols: 10,
								link: 'testLinkType',
								key: [
									{
										name: 'name'
									}
								]
							},
							{
								cols: 8,
								key: [
									{
										name: 'contact'
									}
								]
							},
							{
								cols: 6,
								key: [
									{
										name: 'responsibleIcon',
										type: 'grid-listed-icon-22x22'
									},
									{
										name: 'responsibleName'
									}
								]
							}
						],
						captionsConfig: [
							{
								cols: 10,
								name: 'Название'
							},
							{
								cols: 8,
								name: 'Основной контакт'
							},
							{
								cols: 6,
								name: 'Ответственный'
							}
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'listed',
						multiSelect: true,
						rows: [
							{
								name: 'Alfa',
								contact: 'Timothy Sawyer',
								responsibleName: 'John Best',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-22x22.png'
								}
							},
							{
								name: 'Alfa-business',
								contact: 'Taylor P. Johnson',
								responsibleName: 'Helen Hall',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-22x22.png'
								}
							},
							{
								name: 'Alfa-trade',
								contact: 'James Smith',
								responsibleName: 'Richard Clayton',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-0918-22x22.png'
								}
							},
							{
								name: 'Beta alfa',
								contact: 'Jane Russel',
								responsibleName: 'Alfred Cambbell',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-empty-22x22.png'
								}
							},
							{
								name: 'Company alfa',
								contact: 'Jason Robinson',
								responsibleName: 'Emily V. Cook',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-33176-22x22.png'
								}
							}
						],
						columnsConfig: [
							{
								cols: 10,
								key: [
									{
										name: 'name'
									}
								]
							},
							{
								cols: 8,
								key: [
									{
										name: 'contact'
									}
								]
							},
							{
								cols: 6,
								key: [
									{
										name: 'responsibleIcon',
										type: 'grid-listed-icon-22x22'
									},
									{
										name: 'responsibleName'
									}
								]
							}
						],
						captionsConfig: [
							{
								cols: 10,
								name: 'Название'
							},
							{
								cols: 8,
								name: 'Основной контакт'
							},
							{
								cols: 6,
								name: 'Ответственный'
							}
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'listed',
						rows: [
							{
								name: 'Alfa',
								contact: 'Timothy Sawyer',
								responsibleName: 'John Best',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-22x22.png'
								}
							},
							{
								name: 'Alfa-business',
								contact: 'Taylor P. Johnson',
								responsibleName: 'Helen Hall',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-22x22.png'
								}
							},
							{
								name: 'Alfa-trade',
								contact: 'James Smith',
								responsibleName: 'Richard Clayton',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-0918-22x22.png'
								}
							},
							{
								name: 'Beta alfa',
								contact: 'Jane Russel',
								responsibleName: 'Alfred Cambbell',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-empty-22x22.png'
								}
							},
							{
								name: 'Company alfa',
								contact: 'Jason Robinson',
								responsibleName: 'Emily V. Cook',
								keyImgExtension: {
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-33176-22x22.png'
								}
							}
						],
						columnsConfig: [
							{
								cols: 10,
								key: [
									{
										name: 'name'
									}
								]
							},
							{
								cols: 8,
								key: [
									{
										name: 'contact'
									}
								]
							},
							{
								cols: 6,
								key: [
									{
										name: 'responsibleIcon',
										type: 'grid-listed-icon-22x22'
									},
									{
										name: 'responsibleName'
									}
								]
							}
						],
						captionsConfig: [
							{
								cols: 10,
								name: 'Название'
							},
							{
								cols: 8,
								name: 'Основной контакт'
							},
							{
								cols: 6,
								name: 'Ответственный'
							}
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'tiled',
						hierarchical: true,
						multiSelect: true,
						primaryColumnName: 'prima',
						hierarchicalColumnName: 'secunda',
						rows: [
							{
								prima: 1,
								title: 'Производственный департамент',
								personName: 'Равенская Ольга',
								department: 'Производство'
							},
							{
								prima: 2,
								title: 'Логистика',
								personName: 'Пинков Вячеслав',
								department: 'Производство',
								secunda: 1
							},
							{
								prima: 3,
								title: 'Экспедирование',
								personName: 'Константиновский Константин Константинович',
								department: 'Сопровождение грузов',
								secunda: 2
							},
							{
								prima: 4,
								title: 'Экспедирование',
								personName: 'Кольский Полуостров',
								department: 'Сопровождение грузов',
								secunda: 2
							},
							{
								prima: 7,
								title: 'Экспедирование',
								personName: 'Кольский Полуостров',
								department: 'Сопровождение грузов',
								secunda: 2
							},
							{
								prima: 5,
								title: 'Производство',
								personName: 'Филин Сергей',
								department: 'Производство',
								secunda: 1
							},
							{
								prima: 6,
								title: 'Производственный департамент',
								personName: 'Константин Константиновский',
								department: 'Производство'
							}
						],
						columnsConfig: [
							[
								{
									cols: 24,
									key: [
										{
											name: 'title',
											type: 'caption'
										}
									]
								}
							],
							[
								{
									cols: 12,
									key: [
										{
											name: 'Руководитель',
											type: 'caption'
										},
										{
											name: 'personName'
										}
									]
								},
								{
									cols: 12,
									key: [
										{
											name: 'Родительский департамент',
											type: 'caption'
										},
										{
											name: 'department'
										}
									]
								}
							]
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'tiled',
						hierarchical: true,
						activeRow: '2',
						rows: [
							{
								Id: 1,
								title: 'Производственный департамент',
								personName: 'Равенская Ольга',
								department: 'Производство'
							},
							{
								Id: 2,
								title: 'Логистика',
								personName: 'Пинков Вячеслав',
								department: 'Производство',
								Parent: 1
							},
							{
								Id: 3,
								title: 'Экспедирование',
								personName: 'Константиновский Константин Константинович',
								department: 'Сопровождение грузов',
								Parent: 2
							},
							{
								Id: 4,
								title: 'Экспедирование',
								personName: 'Кольский Полуостров',
								department: 'Сопровождение грузов',
								Parent: 2
							},
							{
								Id: 7,
								title: 'Экспедирование',
								personName: 'Кольский Полуостров',
								department: 'Сопровождение грузов',
								Parent: 2
							},
							{
								Id: 5,
								title: 'Производство',
								personName: 'Филин Сергей',
								department: 'Производство',
								Parent: 1
							},
							{
								Id: 6,
								title: 'Производственный департамент',
								personName: 'Константин Константиновский',
								department: 'Производство'
							}
						],
						columnsConfig: [
							[
								{
									cols: 24,
									key: [
										{
											name: 'title',
											type: 'title'
										}
									]
								}
							],
							[
								{
									cols: 12,
									key: [
										{
											name: 'Руководитель',
											type: 'caption'
										},
										{
											name: 'personName'
										}
									]
								},
								{
									cols: 12,
									key: [
										{
											name: 'Родительский департамент',
											type: 'caption'
										},
										{
											name: 'department'
										}
									]
								}
							]
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'tiled',
						multiSelect: true,
						rows: [
							{
								title: 'Контрольный звонок клиенту, узнать ситуацию о финансировании отдела',
								responsibleName: 'Евгений Мирный',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'data:image/png;base64,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'
								},
								startDate: '26.09.2012 19:30',
								priority: 'Нормальный',
								status: 'В работе'
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-letter-22x22.png',
									responsibleIcon: 'data:image/png;base64,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',
									countryIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAChJREFUKFNjeJnsSRJiIEk1UDHpGv4/iiEJMZCkGqh4MGqgfbCSagMA6RdLADfsebUAAAAASUVORK5CYII='
								},
								startDate: '25.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Отменена',
								result: 'Отменена',
								resultDetailed: 'Отменена в связи с отсутствием необходимости. Клиент принял решение в нашу пользу',
								counteragent: 'Альфабизнес',
								contact: 'Вячеслав Носов',
								country: 'Испания',
								influence: 'Выставка',
								sale: '101/Альфабизнес/Комплексная продажа'
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAC/FJREFUSEtFlHdYE3Yeh9MbXdYOWx9FUAGtLNmGlchQtiFMZY9IIJCAyAbZWxAqCGiQIXsIwbCHREYYCSusJITsQRYjDEXv7PWO1t7d8/z+ft/Pd/0AUpFIItz89Ha3pFz2xh1XO6C+hrbWVT09HWNjQxDYxMjIAAwyMAUBobcsA/184qOjosIjbzs62t80vWlmZGMFdrE372yuP5TtSQSbYgFfLOCKBBwRjy3m8wDHXPEmXyTkSzaFB7vbSQlh5+W+lzt96rzCOU0tTW1NDQ31K6rqly5cPKusJK99VdUMbOjt4YYKCXF1hJgaXgNqq2upKxtpXQ6DeWz9jhKI+axjtJDLEnAYm1zW/wWyrW3qKslA7/L5sz+dlz8rryCnpqFx3cjAzcbCxgSoo6qkoXJBX0fFwd4qJCgwNATheMsODNQx1lM30VXVV7toYaC+tkDYlYpFPObvdDaDz6YLuMz/CjZ5R4f7ZcV5F859e/HcacULckpKCiYGekhPaHV6ZE3K/XT4bTgE5AJW97K4FuHuAHeD3DIzAF9TA19TMdFTAQPVddUUshLuHUhEx/GPgx8LeGw6/3+CbamEQ6dYgDTlT59UlD9z5bKCruZl5xvA0lh//IvcZQx6pbOC1I6eay4nNJePVhe1PIxLh7tBTdRBV+UM1OWBmsrGepecLIH0pXnJpuBTfC6Lxmczfq9AIuAf7h90t9WqKZy8eObUz4oKV6/I66vKRbmZdT1ELjQXUHuqNwabBfjurfnXMjLhHWv1/cbiwTKePf7qTWNxjL+DsabiNS1FAw15bEvttlR8TOexNriMdT6T/qfg3cHho8zEy2e/Ulb4SVVZ4Yr8d07AC9X3XQYfBhOqU1fbS2jdVTxcu2imf2d5ao86f0hfek9f+sBe+beYySUOu1gDlZV+1Lp8tq7s8fEYeCw6l0njMNZ5jE+CTcHB3l4kwk9F/qSqopziuVNaF08le17HJHsN5yOm0ImLDbm0zqfcoWbxdP8uCb+/vvhRyPzApe7RFg6Zqx/5azkxgcqKZ7VVFLub6nbFm5/obDqVy9j4Y8hCwd72TrCn49Xzp1TkTsv9+K2tlmJtjEtXFmziadzyy0JqZzmj7wV7uEUwhtlZGN6nzM33tBHaa2QUwsH64r8lzMayHEW57x0tzSmLRCGfyaOvc2gU9jr5uEt/CESCLZHI1Rp89cKPiqe/PXfyRJC5dl+GX0eSf22if2NW+GT9Y3pvHW+4+dghmu4dfV5QEuI+8SyLO4o9JBN/5VHm+tsCrYHDDWiJgMNh0rgb1D8FdOofLRJtbotEt22uq8l/J//9t6c+PwEz1x7IuIuJ96kKg6JuaoTbXOtIRdBflnFftwrxPdic+47XtTwgkOexqLmGoncbM1sro7S+xt7aivk5Ap+18YnOppK5G5RPdyB8uysrykxUOnXi9NfffPHZlx4gzZGcwLYIp1gHI3NdNTN9jWBLzY4ET8k0dmdpsjUtLA3hVZGbzpoYEBNfv2UvvaXNbFPm7C0sWhrqtgRs7gaZTVtjUFbZtD8Fm7sSCZNMsgXpnf7ii2/+8vcQK73hHL9CT5M4NzsfF2h6RGiqLyTHF8zHtR7SltZ7G5erszndz8WE/qMN0hF98TcBube1RkVZeWZkik/lsClMJoW2QV5iri99qkAgOl6kbUlFcdYPn3924m9fBZjqTBRFYDMDsWmwN/koYkX6y5RQdBB0vQP9jkneJk0w+2s5vTUHi5NHFNKHlckjBumOg200MpKxxJ4bX5wcIrTX9Ur4Yj7j969CINnkSoQ8qZDHpC7FhyG/+/org0vKQ5nIubKEhdo8GubpcmvJq4zQpnDnxee5H5jkveVpelspo+3J7kzPu+WJf67ghfNjieExxKG51RkKcYxUW/IS2zx6tPerTHII2BYLJHyukMOX8iUy8eFY35j6FXW1Sz83RHlM58Dmq1LY3ZUszNPjgdeHO89W5L2nrx4xKIzuWkI+cvNV2QGh53DpzdbqDK7rDXmavjC20lKBLUp5vkJgvN37uMnZAdBX1xfxi1yKYJd/UFlSo3rugomGjqURsCbOH5/iPV0IZ7QVrdZmN4U79CX5rlXlHy6MbZGm90iT5NaikZxgJqZcRnq9vTY7i5sjDC8NtoyXZdTVlWL4dOmW8JDH2AZQF+mMJZ6AKqwrrVY6Iw/WA7rfclNTuhxsazabFzqR4TP7GPUq3vMF3KoxyKovwWet+RfJKHaHgGPhemerspcb8o8o+G3qCvHN4mvMTGlGHTqrqbWiR8SR8VnbLKoAQFmgrc2svHrRAlLVtQXdiIShbMDm1kYgV/D1gRRfQv7dzphbj91Nijyt0XD7jlDHhfzYtaYyYlVZX1aKePSlcLJ9f2Vyjy9cW2AXplQ+jH1WFF9e/aiJQxGz6WIuQwpYxC/MDIzBnTxhzp6JIdEozyAIyAJ529PL2iHXF0oqRo7kBFQi7KJNtfKcb44UJq4PNErnJugv66WT/bsLQ1Jin2RteV96tCM9KspAF8Wjyx5UPs+pW5qkcjZEfNYWYBlPaiqpfxiVmxuXlYaK97F1cTK1TPAJyA1G+tk6VYa4zT+JHM7wx0bdrvO2HkH6rmY+oJWXCLpad5dx++RxFq5HQOUc7P26v3s0hSNlhhdWZtS/eNhIIdJZFD6bzAfM9k32N/e8qumoyHqSFhjjY+MEAZvmhYY/RkbA7Jzh1jaVyDtjOYF9SR5dCZ6DSX6zRQ9YXfW7i6Pbq6Oy5dH+8ieU2fW3+x/3pG9ZZGFZVmVGaFZrcUtHNWZtjsZc4wEWB6cJ/ZOv2wfbyxvzwpIRUG8/W2hOSHhh6L0gOyekkxfS0gwd6jiQ7j+SfXe+PInVVb01jzugEPdWxqcaSp/FJZCnyAey9wc7H2gkDra2P8LjfnlyaSwsZrxr6njXAMRePLEPP90/MdTY01RYlegbFu8JT4Mh0oJCg25BY91970GhsRCzqlDXvtTA6ceRlJZi/lDr5njXcmdNGszzaWLm/NCsbOvwQPaRQxXhMPj6ooYUVHrz05cNpZjxXgJgpuP1sWN+mDA7MDXY0F2RVvRLVPJDVEQ6PDTU0e2BV8AD7wCYhXGO763nYb5N8fCO1HBsfkJ3QXJusLf/DVvMk3p817iIu7u3+w8JVzaPIw01D7c/7yzLrSlIKq0raQJM1GOJ3aPzg1NzA5N47EhJYl5lZlFxTEouMjrSIyDJL7gq5RHCHnLPwTzdyyXT+068C+S+g2Uo5IbG6VMxPggsum2qF89eF+5Kj8Q8GZm4gcOMjrS/KUwtdzBzTUKlAgby0UOl9bgaDL6lf6y1r7YA3VZS+yy5sDguMy0kKikA1VOJQWfnuwA17tlbIG3MnPXVnPVUVX74BnhJtSg6vaeqfQE3z6YIZJIjqWCftsSZGpqb6iO86ZqMCor2d4IBGqJTq0JjWpPzuwrQJREpNTklYy+HOsubWopf1D58motKfN3cSyFQUC62SXdsUr0dXQ3Vb6idP//lX7MiktpLm+sLKom4Odaa4L3sX0cHvwmZO4Th+dbK9vC7Ee62rij3EEAFIjLBzrHAKyjZ8Q7i+s3e6raliZWprgkcdnz01TjmaetIa/8We68qLw9pBYpztbPXV1OX/8FUQ72ltKGzAtNdhelrGQhwDbrnG5YYFnvfD+ln7QzW1FU5c8FaG4xwDgA8cPVyNzRE3LQLBJndNQB3V7bx6JLVidUJ7GhHRUt+VLqflWvVo2eb64IwNycXE10TNSVNJYUAyJ1fEh9X5lUMNve1V7aH3IZba5lADK/b6F+DGhqpycmbaetbaRnchd4GmF9Rs1FVt9fWsdHQgV7RSvSCZUcnwqG3/YxvehuZuRiY2GvqW6rqND6uzU9MPf/dlxd/+Epf8QrqDiIpMCknIiM7MhUO8QhzC7ylb+oGtnAGgbTOnDVSUrLV0zZV0bDUNQaYG4HAegZgQ+PrusYBNx1g1pAAKwjMxiHQCoqCuoW7ucKhkCB7qL+FTaQP7Iahofk1INId8QAR/ygut7qg+p53UKSnT1JgJNzVK9gJinSyRWfGUEebqSNN7U+y0dnJ/wHgGNavmEVOggAAAABJRU5ErkJggg=='
								},
								startDate: '28.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Выполнена',
								result: 'Договорились о встрече',
								resultDetailed: 'Договорились провести встречу на следующей неделе'
							}
						],
						columnsConfig: [
							[
								{
									cols: 24,
									key: [
										{
											name: 'icon',
											type: 'grid-header-icon-22x22'
										},
										{
											name: 'title',
											type: 'title'
										}
									]
								}
							],
							[
								{
									cols: 9,
									key: [
										{
											name: 'responsibleIcon',
											type: 'grid-icon-32x32'
										},
										{
											name: 'Ответственный',
											type: 'caption'
										},
										{
											name: 'responsibleName'
										}
									]
								},
								{
									cols: 5,
									key: [
										{
											name: 'Дата начала',
											type: 'caption'
										},
										{
											name: 'startDate'
										}
									]
								},
								{
									cols: 5,
									key: [
										{
											name: 'Приоритет',
											type: 'caption'
										},
										{
											name: 'priority'
										}
									]
								},
								{
									cols: 5,
									key: [
										{
											name: 'Состояние',
											type: 'caption'
										},
										{
											name: 'status'
										}
									]
								}
							],
							[
								{
									cols: 9,
									key:[
										{
											name: 'Результат',
											type: 'caption'
										},
										{
											name: 'result'
										}
									]
								},
								{
									cols: 15,
									key: [
										{
											name: 'Результат подробно',
											type: 'caption'
										},
										{
											name: 'resultDetailed'
										}
									]
								}
							],
							[
								{
									cols: 6,
									key: [
										{
											name: 'Контрагент',
											type: 'caption'
										},
										{
											name: 'counteragent'
										}
									]
								},
								{
									cols: 6,
									key:[
										{
											name: 'Контакт',
											type: 'caption'
										},
										{
											name: 'contact'
										}
									]
								},
								{
									cols: 6,
									key: [
										{
											name: 'Страна',
											type: 'caption'
										},
										{
											name: 'countryIcon',
											type: 'grid-flag-icon-16x16'
										},
										{
											name: 'country'
										}
									]
								},
								{
									cols: 6,
									key: [
										{
											name: 'Воздействие',
											type: 'caption'
										},
										{
											name: 'influence'
										}
									]
								}
							],
							[
								{
									cols: 24,
									key: [
										{
											name: 'Продажа',
											type: 'caption'
										},
										{
											name: 'sale'
										}
									]
								}
							]
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'tiled',
						watchRowInViewport: 2,
						rows: [
							{
								title: 'Контрольный звонок клиенту, узнать ситуацию о финансировании отдела',
								responsibleName: 'Евгений Мирный',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-32x32.png'
								},
								priority: 'Нормальный',
								status: 'В работе'
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-letter-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png',
									countryIcon: 'Resources/Terrasoft/controls/grid/flag-spain-16x16.png'
								},
								startDate: '25.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Отменена',
								result: 'Отменена',
								resultDetailed: 'Отменена в связи с отсутствием необходимости. Клиент принял решение в нашу пользу',
								counteragent: 'Альфабизнес',
								contact: 'Вячеслав Носов',
								country: 'Испания',
								influence: 'Выставка',
								sale: '101/Альфабизнес/Комплексная продажа',
								testLinkType: {
									title: 'my test link title',
									url: 'http://terrasoft.com',
									target: '_blank'
								}
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png'
								},
								startDate: '28.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Выполнена',
								result: 'Договорились о встрече',
								resultDetailed: 'Договорились провести встречу на следующей неделе'
							}
						],
						columnsConfig: [
							[
								{
									cols: 24,
									link: 'testLinkType',
									key: [
										{
											name: 'icon',
											type: 'grid-icon-22x22'
										},
										{
											name: 'title',
											type: 'title'
										}
									]
								}
							],
							[
								{
									cols: 9,
									minHeight: '20px',
									maxHeight: '100px',
									link: 'testLinkType',
									key: [
										{
											name: 'responsibleIcon',
											type: 'grid-icon-32x32'
										},
										{
											name: 'Ответственный',
											type: 'caption'
										},
										{
											name: 'responsibleName'
										}
									]
								},
								{
									cols: 5,
									link: 'testLinkType',
									key: [
										{
											name: 'Дата начала',
											type: 'caption'
										},
										{
											name: 'startDate'
										}
									]
								},
								{
									cols: 5,
									link: 'testLinkType',
									key: [
										{
											name: 'Приоритет',
											type: 'caption'
										},
										{
											name: 'priority'
										}
									]
								},
								{
									cols: 5,
									link: 'testLinkType',
									key: [
										{
											name: 'Состояние',
											type: 'caption'
										},
										{
											name: 'status'
										}
									]
								}
							],
							[
								{
									cols: 9,
									link: 'testLinkType',
									key:[
										{
											name: 'Результат',
											type: 'caption'
										},
										{
											name: 'result'
										}
									]
								},
								{
									cols: 15,
									link: 'testLinkType',
									key: [
										{
											name: 'Результат подробно',
											type: 'caption'
										},
										{
											name: 'resultDetailed'
										}
									]
								}
							],
							[
								{
									cols: 6,
									key: [
										{
											name: 'Контрагент',
											type: 'caption'
										},
										{
											name: 'counteragent'
										}
									]
								},
								{
									cols: 6,
									key:[
										{
											name: 'Контакт',
											type: 'caption'
										},
										{
											name: 'contact'
										}
									]
								},
								{
									cols: 6,
									key: [
										{
											name: 'Страна',
											type: 'caption'
										},
										{
											name: 'countryIcon',
											type: 'grid-flag-icon-16x16'
										},
										{
											name: 'country'
										}
									]
								},
								{
									cols: 6,
									key: [
										{
											name: 'Воздействие',
											type: 'caption'
										},
										{
											name: 'influence'
										}
									]
								}
							],
							[
								{
									cols: 24,
									key: [
										{
											name: 'Продажа',
											type: 'caption'
										},
										{
											name: 'sale'
										}
									]
								}
							]
						],
						activeRowActions: [
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.BLUE,
								caption: 'Редактировать',
								tag: 'edit'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Копировать',
								tag: 'copy'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Удалить',
								tag: 'delete'
							},
							{
								className: 'Terrasoft.Button',
								style: Terrasoft.controls.ButtonEnums.style.GREY,
								caption: 'Еще',
								tag: 'more',
								menu: {
									items: [
										{
											caption: 'Строка 1',
											tag: 'str1'
										},
										{
											caption: 'Строка 2',
											tag: 'str2'
										},
										{
											caption: 'Строка 3',
											tag: 'str3'
										}
									]
								}
							}
						]
					},

					{
						className: 'Terrasoft.Grid',
						type: 'tiled',
						isEmptyRowVisible: true,
						rows: [
							{
								title: 'Контрольный звонок клиенту, узнать ситуацию о финансировании отдела',
								responsibleName: 'Евгений Мирный',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-11069-32x32.png'
								},
								priority: 'Нормальный',
								status: 'В работе'
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-letter-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png',
									countryIcon: 'Resources/Terrasoft/controls/grid/flag-spain-16x16.png'
								},
								startDate: '25.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Отменена',
								result: 'Отменена',
								resultDetailed: 'Отменена в связи с отсутствием необходимости. Клиент принял решение в нашу пользу',
								counteragent: 'Альфабизнес',
								contact: 'Вячеслав Носов',
								country: 'Испания',
								influence: 'Выставка',
								sale: '101/Альфабизнес/Комплексная продажа',
								testLinkType: {
									title: 'my test link title',
									url: 'http://terrasoft.com',
									target: '_blank'
								}
							},
							{
								title: 'Предложить клиенту референсную встречу',
								responsibleName: 'Светлана Филимонова',
								keyImgExtension: {
									icon: 'Resources/Terrasoft/controls/grid/icon-phone-22x22.png',
									responsibleIcon: 'Resources/Terrasoft/controls/grid/photo-12053-32x32.png'
								},
								startDate: '28.09.2012 12:30',
								priority: 'Нормальный',
								status: 'Выполнена',
								result: 'Договорились о встрече',
								resultDetailed: 'Договорились провести встречу на следующей неделе'
							}
						],
						columnsConfig: [
							[{
								cols: 12,
								key: [{
									name: "Заголовок",
									type: "label"
								}]
							}, {
								cols: 12,
								key: [{
									name: "title",
									type: "text"
								}]
							}],
							[{
								cols: 12,
								key: [{
									name: "Ответственный",
									type: "label"
								}]
							}, {
								cols: 12,
								key: [{
									name: "responsibleName",
									type: "text"
								}]
							}], [{
								cols: 12,
								key: [{
									name: "Контрагент",
									type: "label"
								}]
							}, {
								cols: 12,
								key: [{
									name: "counteragent",
									type: "text"
								}]
							}]
						]
					}

				]
			});
		}
	}
});
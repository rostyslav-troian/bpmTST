requirejs.config({
	paths: {
		viewModelGenerator: 'Terrasoft/configuration/modules/viewModelGenerator',
		viewGenerator: 'Terrasoft/configuration/modules/viewGenerator'
	}
});

define([
		'ext-base',
		'terrasoft',
		'sandbox',
		//'Terrasoft/configuration/modules/viewModelGenerator',
		//'Terrasoft/configuration/modules/viewGenerator'
		'viewModelGenerator',
		'viewGenerator'
],
function(Ext, Terrasoft, sandbox, viewModelGenerator, viewGenerator) {
	var exports = {};
	//------------------------------------------------------------------------------------------------------------------

	var router = Terrasoft.Router;
	var baseConfigurationModulesPath = 'Terrasoft/configuration/viewmodelschemas';
	var centerPanel;
	var isModuleLoaded = false;
	var registeredPath = {};

	function onRouterStateChanged(token) {
		if (isModuleLoaded) {
			var schemaView = centerPanel.items.getAt(2);
			schemaView.destroy();
			isModuleLoaded = false;
		}
		if (!registeredPath[token]) {
			registerPath(token);
			registeredPath[token] = true;
		}
		require([token], function(schema) {
			var viewModelConfig = viewModelGenerator.generate(schema);
			Ext.define(viewModelConfig.name, viewModelConfig);
			var viewModel = Ext.create(viewModelConfig.name);
			loadData(viewModel);

			var viewConfig = viewGenerator.generate(schema);
			var view = Ext.ComponentManager.create(viewConfig, 'container');
			view.bind(viewModel);
			centerPanel.add(view);
			isModuleLoaded = true;
		});
	}

	function registerPath(moduleName) {
		var paths = {};
		paths[moduleName] = [baseConfigurationModulesPath, moduleName].join('/');
		requirejs.config({
			paths: paths
		});
	}

	function loadData(viewModel) {
		viewModel.set('Id', '{1E913F9D-9C14-4D98-ACFD-66FAF97F48FF}');
		viewModel.set('Name', 'Иван');
		viewModel.set('LastName', 'Иванов');
		viewModel.set('Age', 25 );
		viewModel.set('BirthDate', new Date(2013, 1, 9));
		viewModel.set('Address', 'Baker Street 221B');
		viewModel.set('Account', {
			value: '{E71FD6A1-CC13-4675-B993-089A526F5697}',
			display: 'My Company'
		});
		viewModel.set('Owner', {
			value: '{EEBA90C0-FC7D-4817-A471-D6762697A9CB}',
			display: 'Somebody'
		});
		viewModel.set('Type', {
			value: '{837D1C32-E123-453D-87B9-558116C172A3}',
			display: 'Some Type'
		});
		viewModel.set('AccountList', new Terrasoft.Collection());
	}

	function getHeaderView() {
		return Ext.create("Terrasoft.Container", {
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
						wrapEl: '#header-name'
					}
				},
				{
					className: 'Terrasoft.Component',
					id: 'header-score',
					html: '<div id="header-score" class="header-score"><div id="head-score-label">ВСЕГО БАЛЛОВ</div><div id="head-score-star">&#9733;</div><div id="head-score-digit">28</div></div>',
					selectors: {
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
		});
	}

	function getUtilsView() {
		return Ext.create("Terrasoft.Container", {
			id: 'utils',
			selectors: {
				wrapEl: '#utils'
			},
			items: [
				{
					className: 'Terrasoft.Container',
					id: 'utils-left',
					selectors: {
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
									caption: "Карточке контакта",
									tag: 'ContactViewModelSchema',
									listeners: {
										click: onGoToMenuItemClick
									}
								},{
									caption: "Карточке контрагента",
									tag: 'AccountViewModelSchema',
									listeners: {
										click: onGoToMenuItemClick
									}
								}]
							}
						}
					]
				},
				{
					className: 'Terrasoft.Container',
					id: 'utils-right',
					selectors: {
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
							//image: require.toUrl('./images/arrow-left.gif'),
							caption: '<-',
							margin: '0px 0px 0px 10px'
						},
						{
							className: 'Terrasoft.Button',
							style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
							//image: require.toUrl('./images/arrow-right.gif'),
							caption: '->',
							margin: '0px 0px 0px 5px'
						}
					]
				}
			]
		});
	}

	function onGoToMenuItemClick() {
		router.pushState(null, null, this.tag);
	}

	Ext.apply(exports, {
		render: function(renderTo) {
			var rootContainer = Ext.create("Terrasoft.Container", {
				renderTo: renderTo,
				id: 'pagelayout',
				classes: {
					wrapClassName: ['container']
				},
				styles: {
					wrapStyles: {
						width: '100%',
						height: '100%'
					}
				},
				selectors: {
					el: '#pagelayout',
					wrapEl: '#pagelayout'
				}
			});
			var leftPanel = Ext.create("Terrasoft.Container", {
				id: 'leftpanel',
				classes: {
					wrapClassName: ['leftpanel']
				},
				selectors: {
					wrapEl: '#leftpanel'
				}
			});
			centerPanel = Ext.create("Terrasoft.Container", {
				id: 'centerPanel',
				classes: {
					wrapClassName: ['centerPanel']
				},
				selectors: {
					el: '#centerPanel',
					wrapEl: '#centerPanel'
				}
			});
			centerPanel.add(getHeaderView());
			centerPanel.add(getUtilsView());
			rootContainer.add([leftPanel, centerPanel]);
			sandbox.loadModule("leftPanel", {renderTo: leftPanel.getWrapEl()});
			router.on('stateChanged', onRouterStateChanged, router);
			router.startUp();
		}
	});

	//------------------------------------------------------------------------------------------------------------------
	return exports;
});
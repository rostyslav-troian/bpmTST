Terrasoft.configuration.Structures["ViewGeneratorV2"] = {innerHierarchyStack: ["ViewGeneratorV2"]};
define("ViewGeneratorV2", ["BusinessRulesApplierV2", "ext-base", "terrasoft", "ViewGeneratorV2Resources",
	"LinkColumnHelper", "GridLayoutUtils", "ModuleUtils", "ColumnUtilities", "BaseGeneratorV2"
], function(BusinessRulesApplier, Ext, Terrasoft, resources, LinkColumnHelper, GridLayoutUtils) {

	/**
	 * #####-######### #############
	 */
	Ext.define("Terrasoft.configuration.ViewGenerator", {
		extend: "Terrasoft.configuration.BaseGenerator",
		alternateClassName: "Terrasoft.ViewGenerator",

		/**
		 * ###### ############# ########### ### #########
		 * @private
		 * @type {Object}
		 */
		customGenerators: null,

		/**
		 * ##### ###### #############
		 * @private
		 * @type {Object}
		 */
		viewModelClass: null,

		/**
		 * ####### c####
		 * @protected
		 * @type {Object}
		 */
		schemaProfile: null,

		/**
		 * Css-##### ##########-####### ### ######### ###### # ##########
		 * @private
		 * @type {String[]}
		 */
		defaultModelItemClass: "control-width-15",

		/**
		 * Css-class checkbox wrap labeled model container.
		 * @protected
		 * @type {String}
		 */
		defaultCheckBoxItemClass: "checkbox-control-item",

		/**
		 * Css-##### ##########-####### ### ######### ###### ### #########
		 * @private
		 * @type {String}
		 */
		defaultModelItemClassWithoutLabel: "control-no-label",

		/**
		 * Css-##### ##########-####### ### ######### ###### # #####, #### ### ######## # ####### ##### #########
		 * @private
		 * @type {String[]}
		 */
		defaultModelItemLeftClass: "control-left",

		/**
		 * Css-##### ##########-####### ### ######### ###### # #####, #### ### ######## # ####### ###### #########
		 * @private
		 * @type {String[]}
		 */
		defaultModelItemRightClass: "control-right",

		/**
		 * Css-##### ##########-####### ######## ########## ControlGroup
		 * @private
		 * @type {String[]}
		 */
		defaultControlGroupClass: ["control-group-margin-bottom"],

		/**
		 * Css-##### ##########-####### ######## ########## # ########## #######
		 * @private
		 * @type {String[]}
		 */
		defaultLabelWrapClass: ["label-wrap"],

		/**
		 * CSS check box label wrap.
		 */
		defaultCheckBoxLabelWrapClass: "checkbox-label-wrap",

		/**
		 * Css-##### ##########-####### ######## ########## ## ######### #######
		 * @private
		 * @type {String[]}
		 */
		defaultControlWrapClass: ["control-wrap"],

		/**
		 * ####### ########## ######### ######## ##########
		 * @private
		 * @type {String}
		 */
		defaultLabelWrapSuffix: "_Label",

		/**
		 * ####### ########## ######## ##########
		 * @private
		 * @type {String}
		 */
		defaultControlWrapSuffix: "_Control",

		/**
		 * Css-##### ####### # ######## ## #########
		 * @private
		 * @type {String}
		 */
		standardTextSizeClass: "",

		/**
		 * Css-##### ####### ## ##### «#########»
		 * @private
		 * @type {String}
		 */
		largeTextSizeClass: "text-size-caption",

		/**
		 * Css-##### ########## #############
		 * @private
		 * @type {String}
		 */
		radioButtonContainerClass: ["radio-button-container"],

		/**
		 * Css-##### ########## ######
		 * @private
		 * @type {String}
		 */
		moduleClass: ["module-container"],

		/**
		 * ### ###### ###### ### ###### ######## ###########
		 * @private
		 * @type {String}
		 */
		loadVocabularyMethodName: "loadVocabulary",

		/**
		 * ### ###### ###### ### ###### ######## ###########
		 * @private
		 * @type {String}
		 */
		openMappingEditWindowName: "openMappingEditWindow",

		/**
		 * Name of prepare menu method.
		 * @private
		 * @type {String}
		 */
		defaultPrepareMenuMethodName: "onPrepareMenu",

		/**
		 * Name of change value method.
		 * @private
		 * @type {String}
		 */
		defaultChangeValueMethodName: "onValueChanged",

		/**
		 * Menu items property name.
		 * @private
		 * @type {String}
		 */
		defaultMenuItemsName: "MenuItems",

		/**
		 * ####### ##### ####### ### ##### ## #######
		 * @private
		 * @type {String}
		 */
		defaultListColumnSuffix: "List",

		/**
		 * Predictable state model attribute suffix.
		 * @private
		 * @type {String}
		 */
		_defaultPredictableColumnStateSuffix: "PredictableState",

		/**
		 * Load predictable data method name.
		 * @private
		 * @type {String}
		 */
		_defaultLoadPredictableDataMethodName: "loadPredictableData",

		/**
		 * ####### ############## ######## ##### ### ####### #############
		 * @private
		 * @type {String}
		 */
		radioButtonInputIdSuffix: "-el",

		/**
		 * ### ###### ######## ### ######## ######.
		 * @private
		 * @type {String}
		 */
		defaultLoadDetailMethodName: "loadDetail",

		/**
		 * ### ###### ######## ### ######## ######
		 * @private
		 * @type {String}
		 */
		defaultLoadModuleMethodName: "loadModule",

		/**
		 * ### ####### ######, ########### ### ########### ######## ##############
		 * @private
		 * @type {String}
		 */
		defaultFocusMethodName: "onItemFocused",

		/**
		 * The name method to invert attribute value.
		 * @private
		 * @type {String}
		 */
		defaultInvertColumnValueMethodName: "invertColumnValue",

		/**
		 * The name of event handler click on close tip button.
		 * @private
		 * @type {String}
		 */
		defaultCloseTipButtonClickMethodName: "closeTipButtonClick",

		/**
		 * The name of bind method to get tip close button image.
		 * @private
		 * @type {String}
		 */
		defaultGetCloseTipButtonImageMethodName: "getCloseTipButtonImageConfig",

		/**
		 * The classes for close tip button image.
		 * @private
		 * @type {String}
		 */
		closeTipButtonImageClasses: ["tip-tools-close-btn"],

		/**
		 * Selector for label tip.
		 * @private
		 * @type {String}
		 */
		labelTipAlignEl: "tipEl",

		/**
		 * ############ ########## ######## # #####
		 * @private
		 * @type {Number}
		 */
		maxGridLayoutColumnsCount: 24,

		/**
		 * ###### ##### ### ######## ########## ScheduleEdit # px. ############ ### ######### ############## ######
		 * ######## (###### #####). ####### ########## ScheduleEdit ##### ############### ###### 5 px.
		 * @private
		 * @type {Number}
		 */
		defaultScheduleEditBottomPadding: Terrasoft.convertEmToPx("2em"),

		/**
		 * ###### ######## ##### ###### ############# ######## # ######## ### ########### ##############.
		 * @private
		 * @type {Object}
		 */
		defaultControlSuffix: {
			"Terrasoft.GridLayout": "GridLayout",
			"Terrasoft.Grid": "Grid",
			"Terrasoft.TabPanel": "TabPanel",
			"Terrasoft.ImageTabPanel": "ImageTabPanel",
			"Terrasoft.Label": "Label",
			"Terrasoft.TipLabel": "TipLabel",
			"Terrasoft.Button": "Button",
			"Terrasoft.MemoEdit": "MemoEdit",
			"Terrasoft.TextEdit": "TextEdit",
			"Terrasoft.HtmlEdit": "HtmlEdit",
			"Terrasoft.FloatEdit": "FloatEdit",
			"Terrasoft.IntegerEdit": "IntegerEdit",
			"Terrasoft.DateEdit": "DateEdit",
			"Terrasoft.TimeEdit": "TimeEdit",
			"Terrasoft.ComboBoxEdit": "ComboBoxEdit",
			"Terrasoft.LookupEdit": "LookupEdit",
			"Terrasoft.MappingEdit": "MappingEdit",
			"Terrasoft.CheckBoxEdit": "CheckBoxEdit",
			"Terrasoft.ControlGroup": "ControlGroup",
			"Terrasoft.Container": "Container",
			"Terrasoft.RadioButton": "RadioButton",
			"Terrasoft.ScheduleEdit": "ScheduleEdit",
			"Terrasoft.BaseProgressBar": "BaseProgressBar",
			"Terrasoft.InformationButton": "InformationButton",
			"Terrasoft.Hyperlink": "Hyperlink",
			"Terrasoft.DraggableContainer": "DraggableContainer",
			"Terrasoft.Component": "Component",
			"Terrasoft.BaseSearchEdit": "SearchEdit",
			"Terrasoft.IframeControl": "Iframe",
			"Terrasoft.ExternalWidget": "ExternalWidget"
		},

		/**
		 * ############ ######### ###### ####### ## #########
		 * @private
		 * @type {Object}
		 */
		defaultGridCellCaptionConfig: {
			visible: true,
			position: Terrasoft.CaptionPositionType.ABOVE,
			align: Terrasoft.CaptionAlignType.LEFT
		},

		/**
		 * ######## ####### ######### # GridLayout ## #########
		 * @private
		 * @type {Object}
		 */
		defaultGridLayoutItemConfig: {
			colSpan: 12,
			rowSpan: 1
		},

		/**
		 * ###### ######## ######## ######### ### ############# #######
		 * @private
		 * @type {String}
		 */
		dataViewVisiblePropertyTemplate: "Is{0}Visible",

		/**
		 * ########## #######-########## ### #### #########, # ####### ####### ########## ## ##### ######
		 * @private
		 * @param {String} moduleName ### ######
		 * @param {Object} module ######### ######
		 */
		setGeneratorsByModule: function(moduleName, module) {
			var generators = this.customGenerators;
			Terrasoft.each(generators, function(generator, itemName) {
				if (Ext.isString(generator) && generator.indexOf(moduleName) === 0) {
					var methodName = generator.split(".")[1];
					var generatorFn = module[methodName];
					module.elementsPrefix = this.elementsPrefix;
					generators[itemName] = {
						generatorFn: generatorFn,
						scope: module
					};
				}
			}, this);
		},

		/**
		 * @private
		 */
		_applyLabel: function(container, config) {
			var wrapperConfig = Ext.clone(config);
			wrapperConfig.wrapClass = Ext.Array.merge(wrapperConfig.wrapClass || [],
				["item-with-label-wrapper"]);
			var resultWrapper = this.getDefaultContainerConfig(container.id, wrapperConfig);
			var labelConfig = this.generateModelItemLabel(config);
			resultWrapper.items.push(labelConfig);
			container.id = Ext.String.format("{0}-inner", container.id);
			resultWrapper.items.push(container);
			return resultWrapper;
		},

		/**
		 * ######## ######### #### #########, ############ ################ ###### #########. ########## ##########
		 * @private
		 * @param {Object} config ############ ######## ############# #####
		 * @param {Object} generators ########, ############ ################ ##########. ############ ### ########
		 */
		fillCustomGenerators: function(config, generators) {
			Terrasoft.iterateChildItems(config, function(iterationConfig) {
				var itemConfig = iterationConfig.item;
				if (this.hasItemCustomGenerator(itemConfig)) {
					var itemName = itemConfig.name;
					generators[itemName] = itemConfig.generator;
				}
			}, this);
		},

		/**
		 * ########### # ######## ### ################ #######-##########
		 * @protected
		 * @param {Object[]} viewConfig ############ #############, ############ ## #### ######## ############ #####
		 * @param {Function} callback #######-callback, # ### ########## ############### ############ #############
		 * @param {Object} scope ######## ########## ####### callback
		 */
		requireCustomGenerators: function(viewConfig, callback, scope) {
			var generators = this.customGenerators = this.generateConfig.customGenerators = {};
			this.fillCustomGenerators(viewConfig, generators);
			var modulesToRequire = [];
			Terrasoft.each(generators, function(descriptor) {
				if (Ext.isString(descriptor)) {
					var generatorModule = descriptor.split(".")[0];
					modulesToRequire.push(generatorModule);
				}
			}, this);
			if (!modulesToRequire.length) {
				Ext.callback(callback, scope);
				return;
			}
			var me = this;
			require(modulesToRequire, function() {
				var modules = arguments;
				Terrasoft.each(modulesToRequire, function(moduleName, index) {
					me.setGeneratorsByModule(moduleName, modules[index]);
				});
				Ext.callback(callback, scope);
			});
		},

		/**
		 * Appends to service properties className property if it's not Terrasoft.Label child class name.
		 * @private
		 * @param {Object} config - View config for label control.
		 * @param {Array} serviceProperties - Array of properties for exclude before label config processing.
		 */
		processLabelCustomClassName: function(config, serviceProperties) {
			var className = config.className;
			if (className) {
				var targetClass = Ext.ClassManager.get(className);
				var labelClass = Ext.ClassManager.get("Terrasoft.Label");
				var isChildOfLabel = targetClass && targetClass.prototype instanceof labelClass;
				if (!isChildOfLabel) {
					serviceProperties.push("className");
				}
			}
		},

		/**
		 * Applies properties for view config depended on enabled features.
		 * @param {Object[]} viewConfig - Target view configuration to process.
		 */
		processFeaturedView: function(viewConfig) {
			var featureConfigList = viewConfig.featuresConfig;
			if (Ext.isEmpty(featureConfigList)) {
				return;
			}
			Terrasoft.each(featureConfigList, function(featureConfig) {
				var featureName = featureConfig.featureName;
				if (Terrasoft.Features.getIsEnabled(featureName)) {
					delete featureConfig.featureName;
					Ext.apply(viewConfig, featureConfig);
				}
			});
			delete viewConfig.featuresConfig;
		},

		/**
		 * ########## ############ #############, ## ###### ####### ##### ########### ######## ##########
		 * @protected
		 * @param {Object[]} viewConfig ############ #############, ############ ## #### ######## ############ #####
		 * @return {Object[]} ########## ############### ############# #####
		 */
		generateView: function(viewConfig) {
			var resultView = [];
			Terrasoft.each(viewConfig, function(item) {
				var itemView = this.generateItem(item);
				resultView = resultView.concat(itemView);
			}, this);
			return resultView;
		},

		/**
		 * #########, ###### ## ####### ############ ################ ####### #########
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Boolean} ########## true, #### ## # ######## ################ ####### #########
		 * false # ######### ######
		 */
		hasItemCustomGenerator: function(config) {
			var customGenerator = config.generator;
			return (Ext.isString(customGenerator) || Ext.isFunction(customGenerator));
		},

		/**
		 * ########## ############ ############# ######## #####
		 * @protected
		 * @throws {Terrasoft.InvalidObjectState} ####### ########## #### ####### ## ### ############
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############### ############# ########
		 */
		generateItem: function(config) {
			var clonedConfig = Terrasoft.deepClone(config);
			this.processFeaturedView(clonedConfig);
			var result = (this.hasItemCustomGenerator(clonedConfig))
				? this.generateCustomItem(clonedConfig)
				: this.generateStandardItem(clonedConfig);
			if (Ext.isEmpty(result)) {
				var errorMessage = Ext.String.format(
					resources.localizableStrings.GeneratedItemIsEmptyMessage,
					Terrasoft.encode(clonedConfig)
				);
				throw new Terrasoft.InvalidObjectState({
					message: errorMessage
				});
			}
			return result;
		},

		/**
		 * ########## ############# ######## c ####### ################ #######
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############### ############# ########
		 */
		generateCustomItem: function(config) {
			var name = config.name;
			var generator = this.customGenerators[name];
			var generatorFn = generator.generatorFn || generator;
			var generatorScope = generator.scope || config;
			var result = generatorFn.call(generatorScope, config, this.generateConfig);
			this.generateItemTips(config, result);
			return result;
		},

		/**
		 * ########## ############# ########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############### ############# ########
		 */
		generateStandardItem: function(config) {
			var itemType = config.itemType;
			var result = null;
			switch (itemType) {
				case Terrasoft.ViewItemType.GRID_LAYOUT:
					result = this.generateGridLayout(config);
					break;
				case Terrasoft.ViewItemType.TAB_PANEL:
					result = this.generateTabPanel(config);
					break;
				case Terrasoft.ViewItemType.IMAGE_TAB_PANEL:
					result = this.generateImageTabPanel(config);
					break;
				case Terrasoft.ViewItemType.DETAIL:
					result = this.generateDetail(config);
					break;
				case Terrasoft.ViewItemType.MODULE:
					result = this.generateModule(config);
					break;
				case Terrasoft.ViewItemType.BUTTON:
					result = this.generateButton(config);
					break;
				case Terrasoft.ViewItemType.LABEL:
					result = this.generateLabel(config);
					break;
				case Terrasoft.ViewItemType.CONTAINER:
					result = this.generateContainer(config);
					break;
				case Terrasoft.ViewItemType.TIP:
					result = this.generateTip(config);
					break;
				case Terrasoft.ViewItemType.TIP_LABEL:
					result = this.generateControlLabel(config);
					break;
				case Terrasoft.ViewItemType.MENU:
					result = this.generateMenu(config);
					break;
				case Terrasoft.ViewItemType.MENU_ITEM:
					result = this.generateMenuItem(config);
					break;
				case Terrasoft.ViewItemType.MENU_SEPARATOR:
					result = this.generateSeparatorMenuItem(config);
					break;
				case Terrasoft.ViewItemType.MODEL_ITEM:
					result = this.generateModelItem(config);
					break;
				case Terrasoft.ViewItemType.SECTION_VIEWS:
					result = this.generateSectionViews(config);
					break;
				case Terrasoft.ViewItemType.SECTION_VIEW:
					result = this.generateSectionView(config);
					break;
				case Terrasoft.ViewItemType.GRID:
					result = this.generateGrid(config);
					break;
				case Terrasoft.ViewItemType.CONTROL_GROUP:
					result = this.generateControlGroup(config);
					break;
				case Terrasoft.ViewItemType.RADIO_GROUP:
					result = this.generateRadioGroup(config);
					break;
				case Terrasoft.ViewItemType.DESIGN_VIEW:
					result = this.generateDesignedView(config);
					break;
				case Terrasoft.ViewItemType.SCHEDULE_EDIT:
					result = this.generateScheduleEdit(config);
					break;
				case Terrasoft.ViewItemType.COLOR_BUTTON:
					result = this.generateColorButton(config);
					break;
				case Terrasoft.ViewItemType.HYPERLINK:
					result = this.generateHyperlink(config);
					break;
				case Terrasoft.ViewItemType.INFORMATION_BUTTON:
					result = this.generateInformationButton(config);
					break;
				case Terrasoft.ViewItemType.COMPONENT:
					result = this.generateComponent(config);
					break;
				case Terrasoft.ViewItemType.GRID_LAYOUT_EDIT:
					result = this.generateGridLayoutEdit(config);
					break;
				case Terrasoft.ViewItemType.IFRAMECONTROL:
					result = this.generateIframeControl(config);
					break;
				case Terrasoft.ViewItemType.EXTERNAL_WIDGET:
					result = this.generateExternalWidgetControl(config);
					break;
				default:
					result = this.generateModelItem(config);
					break;
			}
			return result;
		},

		/**
		 * ########## ########## ############# ######## ##########
		 * ## ###### ##### ############ ######## # ##### ######.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####.
		 * @param {String} className ### ###### ######## ##########.
		 * @return {String} ########## ############### ############# ######### #####.
		 */
		getControlId: function(config, className) {
			var elementIdPrefix = this.elementsPrefix ? this.elementsPrefix + this.schemaName : this.schemaName;
			return (elementIdPrefix + config.name + this.defaultControlSuffix[className]);
		},

		/**
		 * Adds identifier for control configuration.
		 * @protected
		 * @virtual
		 * @param {Object} control Control configuration.
		 * @param {Object} config The configuration of schema element view.
		 * @param {String} id Control identifier.
		 */
		applyControlId: function(control, config, id) {
			if (config.generateId !== false) {
				Ext.apply(control, {
					id: id
				});
			}
		},

		/**
		 * ########## ############ ######## ### ######### ##########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @param {String[]} serviceProperties ######## ######### ##########
		 * @return {Object} ########## ############ ######## ### ######### ##########
		 */
		getConfigWithoutServiceProperties: function(config, serviceProperties) {
			var result = Terrasoft.deepClone(config);
			serviceProperties = serviceProperties.concat(
				["name", "itemType", "controlConfig", "items", "layout", "contentType", "bindTo", "dataValueType",
					"generateId", "tips"
				]);
			Terrasoft.each(serviceProperties, function(propertyName) {
				delete result[propertyName];
			}, this);
			return result;
		},

		/**
		 * ########## ############ ######## ### ######## ##########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @param {String[]} properties ######## ##########
		 * @return {Object} ########## ############ ######## ### ######## ##########
		 */
		getConfigWithoutProperties: function(config, properties) {
			var result = Terrasoft.deepClone(config);
			Terrasoft.each(properties, function(propertyName) {
				delete result[propertyName];
			}, this);
			Terrasoft.each(result, function(obj) {
				if (Ext.isObject(obj) && !Ext.Object.isEmpty(obj)) {
					Terrasoft.each(properties, function(propertyName) {
						delete obj[propertyName];
					}, this);
				}
			}, this);
			return result;
		},

		/**
		 * ########## ############ ############# ### ##### {Terrasoft.ViewItemType.GRID_LAYOUT}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ #####
		 * @return {Object} ########## ############### ############# #####
		 */
		generateGridLayout: function(config) {
			var controlId = this.getControlId(config, "Terrasoft.GridLayout");
			var result = {
				className: "Terrasoft.GridLayout",
				items: [],
				markerValue: config.name
			};
			this.applyControlId(result, config, controlId);
			if (config.allowOverlap !== true) {
				config.items = GridLayoutUtils.fixItemsIntersections(config.items);
			}
			Terrasoft.each(config.items, function(childItem) {
				if (config.isViewMode) {
					childItem.enabled = false;
				}
				result.items = result.items.concat(this.generateGridLayoutItem(childItem));
			}, this);
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * Generates options for creating controls {Terrasoft.ViewItemType.GRID_LAYOUT_EDIT}.
		 * @protected
		 * @param {Object} config Options for generator.
		 * @return {Object} Options for creating controls.
		 */
		generateGridLayoutEdit: function(config) {
			const result = {
				className: "Terrasoft.GridLayoutEdit",
				items: config.items || []
			};
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ######### ######## ######### ####### # ##### ########## ## #########
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 */
		applyLayoutItemDefaults: function(config) {
			config.layout = Ext.apply({}, config.layout, this.defaultGridLayoutItemConfig);
		},

		/**
		 * ########## ############ ############# ### ######### ##### # ###### ## #########
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object[]} ########## ############### ############# ######### #####
		 */
		generateGridLayoutItem: function(config) {
			this.applyLayoutItemDefaults(config);
			var result = [];
			var items = this.generateItem(config);
			items = Ext.isArray(items) ? items : [items];
			Terrasoft.each(items, function(item) {
				result.push(Ext.apply({
					item: item
				}, config.layout));
			}, this);
			return result;
		},

		/**
		 * ########## ############ ############# ### ####### {Terrasoft.ViewItemType.TAB_PANEL}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ #######
		 * @return {Object} ########## ############### ############# #######
		 */
		generateTabPanel: function(config) {
			var tabPanel = this.generateTabPanelControl(config);
			var result = [tabPanel];
			Terrasoft.each(config.tabs, function(tab) {
				result.push(this.generateTabContent(tab));
			}, this);
			return result;
		},

		/**
		 * ########## ############ ############# ### ####### {Terrasoft.ViewItemType.IMAGE_TAB_PANEL}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ #######
		 * @return {Object} ########## ############### ############# #######
		 */
		generateImageTabPanel: function(config) {
			config.className = "Terrasoft.ImageTabPanel";
			return this.generateTabPanel(config);
		},

		/**
		 * ########## ############ ############# ### ########### ######## ########## #######
		 * {Terrasoft.ViewItemType.IMAGE_TAB_PANEL}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ #######
		 * @return {Object} ########## ############### ############# #######
		 */
		generateTabPanelControl: function(config) {
			var className = config.className || "Terrasoft.TabPanel";
			var controlId = this.getControlId(config, className);
			var tabPanel = {
				className: className,
				tabs: {
					bindTo: this.getTabsCollectionName(config)
				}
			};
			this.applyControlId(tabPanel, config, controlId);
			Ext.apply(tabPanel, this.getConfigWithoutServiceProperties(config, ["tabs", "collection"]));
			this.applyControlConfig(tabPanel, config);
			return tabPanel;
		},

		/**
		 * Generates view of one tab for {Terrasoft.ViewItemType.TAB_PANEL}
		 * @protected
		 * @virtual
		 * @param {Object} config Tab configuration.
		 * @return {Object} Generated by the container containing the elements described in the configuration
		 * with link on visibility.
		 */
		generateTabContent: function(config) {
			var tabContainerName = config.name;
			var result = this.getDefaultContainerConfig(tabContainerName, config);
			Ext.apply(result, {
				visible: {bindTo: tabContainerName},
				markerValue: "tab-content-container-marker"
			});
			Terrasoft.each(config.items, function(item) {
				result.items = result.items.concat(this.generateItem(item));
			}, this);
			return result;
		},

		/**
		 * ########## ############ ############# ### ###### {Terrasoft.ViewItemType.DETAIL}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######
		 * @return {Object} ########## ############### ############ ############# ######
		 */
		generateDetail: function(config) {
			var detailContainerId = this.getControlId(config, "Terrasoft.Container");
			var result = this.getDefaultContainerConfig(detailContainerId, config);
			result.tag = {
				detailName: config.name,
				containerId: detailContainerId
			};
			result.markerValue = config.name + "DetailContainer";
			result.afterrender = {
				bindTo: this.defaultLoadDetailMethodName
			};
			result.afterrerender = {
				bindTo: this.defaultLoadDetailMethodName
			};
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * Generates view config for module (@link Terrasoft.ViewItemType.MODULE).
		 * @protected
		 * @param {Object} config Module config.
		 * @return {Object} Configuration of module container.
		 */
		generateModule: function(config) {
			var name = config.name;
			var controlConfig = {
				wrapClass: this.moduleClass,
				generateId: config.generateId
			};
			var containerId = name;
			if (config.makeUniqueId === true) {
				containerId = this.getControlId(config, "Terrasoft.Container");
			}
			var result = this.getDefaultContainerConfig(containerId, controlConfig);
			result.tag = {
				name: name,
				containerId: result.id,
				moduleId: config.moduleId,
				moduleName: config.moduleName,
				instanceConfig: config.instanceConfig,
				reload: config.reload
			};
			result.markerValue = {
				"bindTo": name + "ModuleContainer"
			};
			if (Ext.isEmpty(config.afterrender)) {
				result.afterrender = {
					bindTo: this.defaultLoadModuleMethodName
				};
			}
			if (Ext.isEmpty(config.afterrerender)) {
				result.afterrerender = {
					bindTo: this.defaultLoadModuleMethodName
				};
			}
			var serviceProperties = ["moduleName", "makeUniqueId", "instanceConfig", "moduleId", "reload"];
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ########## ############ ############# ### ########## {Terrasoft.ViewItemType.CONTAINER}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ##########
		 * @return {Object} ########## ############### ############# ##########
		 */
		generateContainer: function(config) {
			var id = this.getControlId(config, "Terrasoft.Container");
			var container = this.getDefaultContainerConfig(id, config);
			Terrasoft.each(config.items, function(childItem) {
				if (Terrasoft.contains(config.excludeItemTypes, childItem.itemType)) {
					return;
				}
				var childItemConfig = this.generateItem(childItem);
				container.items = container.items.concat(childItemConfig);
			}, this);
			if (config.labelConfig && config.labelConfig.visible !== false) {
				container = this._applyLabel(container, config);
			}
			var serviceProperties = ["wrapClass", "styles", "excludeItemTypes", "labelConfig"];
			Ext.apply(container, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.generateItemTips(config, container);
			if (config && config.controlConfig) {
				this.addClasses(container, "wrapClassName", config.controlConfig.classes);
			}
			this.applyControlConfig(container, config);
			return container;
		},

		/**
		 * ########## ### ####### ###### ## ####### ######### ### ########### ######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {String} ########## ############### ### ####### ######
		 */
		getExpandableListName: function(config) {
			return this.getItemBindTo(config) + this.defaultListColumnSuffix;
		},

		/**
		 * ######### ### #######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {String} ######### ############# ### #######
		 */
		getMarkerValue: function(config) {
			if (config.markerValue) {
				return config.markerValue;
			}
			var caption = this.getLabelCaption(config);
			return !Ext.isString(caption) ? config.name : Ext.String.format("{0} {1}", config.name, caption);
		},

		/**
		 * Generate label configuration {Terrasoft.ViewItemType.LABEL}.
		 * @protected
		 * @virtual
		 * @param {Object} config Label config.
		 * @return {Object} Label configuration.
		 */
		generateLabel: function(config) {
			var caption = this.getLabelCaption(config);
			if (Ext.isEmpty(caption)) {
				var errorMessage = Ext.String.format(
					resources.localizableStrings.LabelCaptionNullOrEmptyMessage,
					config.name
				);
				this.log(errorMessage, Terrasoft.LogMessageType.ERROR);
			}
			var id = this.getControlId(config, "Terrasoft.Label");
			var label = {
				className: "Terrasoft.Label",
				caption: caption,
				markerValue: this.getMarkerValue(config)
			};
			this.applyControlId(label, config, id);
			this.addLabelSizeClass(label, config);
			var serviceProperties = ["labelConfig", "labelWrapConfig",
				"controlWrapConfig", "value", "textSize", "tip", "wrapClass", "menu", "hintLock"
			];
			this.processLabelCustomClassName(config, serviceProperties);
			Ext.apply(label, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.generateItemTips(config, label);
			if (config.labelConfig) {
				this.addClasses(label, "labelClass", config.labelConfig.classes);
				delete config.labelConfig.classes;
				Ext.merge(label, config.labelConfig);
			}
			return label;
		},

		/**
		 * ########## ############ ############# ### ########### {Terrasoft.ViewItemType.HYPERLINK}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ###########.
		 * @return {Object} ########## ############### ############# ###########.
		 */
		generateHyperlink: function(config) {
			var id = this.getControlId(config, "Terrasoft.Hyperlink");
			var hyperlink = {
				className: "Terrasoft.Hyperlink",
				markerValue: this.getMarkerValue(config)
			};
			this.applyControlId(hyperlink, config, id);
			this.addLabelSizeClass(hyperlink, config);
			Ext.apply(hyperlink, this.getConfigWithoutServiceProperties(config, []));
			this.generateItemTips(config, hyperlink);
			return hyperlink;
		},

		/**
		 * Adds css class, that handles label size.
		 * @protected
		 * @virtual
		 * @param {Object} label Label configurated view.
		 * @param {Object} config Configuration information.
		 */
		addLabelSizeClass: function(label, config) {
			var textSizeClasses = (config.textSize === Terrasoft.TextSize.LARGE)
				? [this.largeTextSizeClass]
				: [this.standardTextSizeClass];
			this.addClasses(label, "labelClass", textSizeClasses);
		},

		/**
		 * Generate view configuration for button {Terrasoft.ViewItemType.BUTTON}
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration information.
		 * @return {Object} Returns generated view.
		 */
		generateButton: function(config) {
			var id = this.getControlId(config, "Terrasoft.Button");
			var result = {
				className: "Terrasoft.Button",
				markerValue: config.name
			};
			this.applyControlId(result, config, id);
			var serviceProperties = [];
			if (Ext.isArray(config.menu)) {
				var menuConfig = {
					itemType: Terrasoft.ViewItemType.MENU,
					items: config.menu
				};
				if (config.menuConfig) {
					Ext.apply(menuConfig, config.menuConfig);
					serviceProperties.push("menuConfig");
				}
				result.menu = this.generateItem(menuConfig);
				serviceProperties.push("menu");
			}
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.generateItemTips(config, result);
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * Generate view configuration for IframeControl {Terrasoft.ViewItemType.IFRAMECONTROL}
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration information.
		 * @return {Object} Returns generated view.
		 */
		generateIframeControl: function(config) {
			var id = this.getControlId(config, "Terrasoft.IframeControl");
			var result = {
				className: "Terrasoft.IframeControl",
				markerValue: config.name
			};
			this.applyControlId(result, config, id);
			var serviceProperties = [];
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.generateItemTips(config, result);
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * Generate view configuration for component {Terrasoft.ViewItemType.COMPONENT}
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration information.
		 * @return {Object} Returns generated configuration view.
		 */
		generateComponent: function(config) {
			var id = this.getControlId(config, "Terrasoft.Component");
			if (config && Ext.isEmpty(config.className)) {
				return;
			}
			var result = {
				className: config.className,
				markerValue: config.name
			};
			this.applyControlId(result, config, id);
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ########## ######### ###### #####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {String} ######### ###### #####
		 */
		getControlGroupCaption: function(config) {
			var controlConfig = config.controlConfig;
			return config.caption || (controlConfig && controlConfig.caption);
		},

		/**
		 * ########## ############ ############# ### ###### ######### {Terrasoft.ViewItemType.CONTROL_GROUP}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ###### #########
		 * @return {Object} ########## ############### ############# ###### #########
		 */
		generateControlGroup: function(config) {
			var controlId = this.getControlId(config, "Terrasoft.ControlGroup");
			var result = {
				className: "Terrasoft.ControlGroup",
				markerValue: this.getControlGroupCaption(config),
				classes: {
					wrapClass: this.defaultControlGroupClass
				},
				items: [],
				tools: [],
				collapsedchanged: {
					bindTo: "onCollapsedChanged"
				},
				collapsed: {
					bindTo: "is" + controlId + "Collapsed"
				},
				tag: controlId
			};
			this.applyControlId(result, config, controlId);
			Terrasoft.each(config.items, function(childItem) {
				result.items = result.items.concat(this.generateItem(childItem));
			}, this);
			Terrasoft.each(config.tools, function(childItem) {
				result.tools = result.tools.concat(this.generateItem(childItem));
			}, this);
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["tools"]));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ########## ############ ############# ### ###### ############## {Terrasoft.ViewItemType.RADIO_GROUP}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ###### ##############
		 * @return {Object} ########## ############### ############# ###### ##############
		 */
		generateRadioGroup: function(config) {
			var containerId = this.getControlId(config, "Terrasoft.Container");
			var result = this.getDefaultContainerConfig(containerId, config);
			Terrasoft.each(config.items, function(item) {
				item.bindTo = config.value;
				result.items.push(this.generateRadioButton(item));
			}, this);
			return result;
		},

		/**
		 * ########## ############ ############# ### ############# ##### #############.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ #############.
		 * @return {Object} ########## ############### #############.
		 */
		generateDesignedView: function(config) {
			var id = config.name;
			var container = this.getDefaultContainerConfig(id, config);
			Ext.apply(container, this.getConfigWithoutServiceProperties(config, ["wrapClass", "styles"]));
			this.applyControlConfig(container, config);
			return container;
		},

		/**
		 * Generates radio button view config.
		 * @protected
		 * @virtual
		 * @param {Object} config radio button config.
		 * @return {Object} Returns radio button view config.
		 */
		generateRadioButton: function(config) {
			var containerId = this.getControlId(config, "Terrasoft.Container");
			var radioId = this.getControlId(config, "Terrasoft.RadioButton");
			var controlConfig = {
				wrapClass: this.radioButtonContainerClass,
				generateId: config.generateId
			};
			var result = this.getDefaultContainerConfig(containerId, controlConfig);
			var radioButton = {
				className: "Terrasoft.RadioButton",
				tag: config.value,
				checked: config.bindTo
			};
			this.applyControlId(radioButton, config, radioId);
			Ext.apply(radioButton, this.getConfigWithoutServiceProperties(config, ["caption", "labelConfig"]));
			this.applyControlConfig(radioButton, config);
			result.items.push(radioButton);
			if (this.isItemLabelVisible(config)) {
				var labelConfig = this.generateLabel(config);
				labelConfig.inputId = radioId + this.radioButtonInputIdSuffix;
				result.items.push(labelConfig);
			}
			return result;
		},

		/**
		 * ########## ############ ############# ### #### {Terrasoft.ViewItemType.MENU}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ####
		 * @return {Object} ########## ############### ############# ####
		 */
		generateMenu: function(config) {
			var result = {
				className: "Terrasoft.Menu",
				items: []
			};
			Terrasoft.each(config.items, function(menuItemConfig) {
				menuItemConfig.itemType = menuItemConfig.itemType || Terrasoft.ViewItemType.MENU_ITEM;
				var childItemConfig = this.generateItem(menuItemConfig);
				result.items.push(childItemConfig);
			}, this);
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["menu"]));
			return result;
		},

		/**
		 * ########## ############ ############# ### ######## #### {Terrasoft.ViewItemType.MENU_ITEM}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ####
		 * @return {Object} ########## ############### ############# ######## ####
		 */
		generateMenuItem: function(config) {
			var result = {
				className: "Terrasoft.MenuItem",
				markerValue: config.name
			};
			if (config.menu) {
				result.menu = this.generateItem({
					itemType: Terrasoft.ViewItemType.MENU,
					items: config.menu
				});
			}
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["menu"]));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ########## ############ ############# ########### # #### {Terrasoft.ViewItemType.MENU_SEPARATOR}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ########### # ####
		 * @return {Object} ########## ############### ############# ########### # ####
		 */
		generateSeparatorMenuItem: function(config) {
			var result = {
				className: "Terrasoft.MenuSeparator"
			};
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * Generates information button with tooltip.
		 * @param {Object} config Configuration of schema item.
		 * @return {Object} Configuration of information button, contains configuration of it's tips.
		 */
		generateInformationButton: function(config) {
			var tipEnums = Terrasoft.controls.TipEnums;
			var tipConfig = Ext.apply({
				name: config.name,
				initialAlignType: Terrasoft.AlignType.BOTTOM,
				showDelay: 200,
				behaviour: {
					displayEvent: tipEnums.displayEvent.HOVER | tipEnums.displayEvent.CLICK,
					hideOnMouseDown: false
				}
			}, this.getConfigWithoutServiceProperties(config, []));
			var tips = Ext.isArray(config.tips) ? config.tips : [];
			tips.push(tipConfig);
			var buttonConfig = Ext.apply({
				name: config.name,
				className: "Terrasoft.InformationButton",
				tips: tips
			}, config.controlConfig);
			return this.generateButton(buttonConfig);
		},

		/**
		 * Generates tips for schema view item if config.tips is defined.
		 * @param {Object} config Configuration of schema item.
		 * @param {Object[]} config.tips Configuration of schema view item tips.
		 * @param {Object} viewItem
		 */
		generateItemTips: function(config, viewItem) {
			if (Ext.isEmpty(config.tips)) {
				return;
			}
			viewItem.tips = [];
			Terrasoft.each(config.tips, function(tipConfig) {
				tipConfig.itemType = Terrasoft.ViewItemType.TIP;
				var tip = this.generateItem(tipConfig);
				viewItem.tips = viewItem.tips.concat(tip);
			}, this);
		},

		/**
		 * Returns array with generated tools for tip in case config.tools is defined or default close button config
		 * for tip.
		 * @param {Object} config Configuration of tip schema item.
		 * @param {Object[]} [config.tools] Configuration of schema tip tools.
		 * @return {Object[]}
		 */
		generateTipTools: function(config) {
			var tools = [];
			if (config.tools) {
				Terrasoft.each(config.tools, function(tool) {
					var toolConfig = this.generateItem(tool);
					tools = tools.concat(toolConfig);
				}, this);
			} else {
				var closeButton = this.getCloseTipButtonConfig(config, config);
				tools.push(closeButton);
			}
			return tools;
		},

		/**
		 * Returns tooltip configuration.
		 * @protected
		 * @param {Object} config Configuration of tip schema item.
		 * @return {Object} Returns tooltip configuration.
		 */
		generateTip: function(config) {
			var tip = this.getDefaultTipConfig();
			var tools = this.generateTipTools(config);
			var tipVisibleAttribute = this.getTipVisibleAttributeName(config.name);
			Ext.merge(tip, {
				tip: {
					tools: tools,
					linkClicked: {bindTo: "onTipLinkClick"},
					visible: {bindTo: tipVisibleAttribute},
					markerValue: config.name
				}
			});
			var tipConfig = this.getTipConfig(config, tip);
			if (config.items) {
				var items = [];
				Terrasoft.each(config.items, function(childItem) {
					var itemConfig = this.generateItem(childItem);
					items = items.concat(itemConfig);
				}, this);
				tipConfig.tip.items = items;
			}
			return tipConfig;
		},

		/**
		 * Generate view configuration for external widget {Terrasoft.ViewItemType.EXTERNAL_WIDGET}
		 * @protected
		 * @virtual
		 * @param {Object} config
		 * @returns {Object}
		 */
		generateExternalWidgetControl: function(config) {
			var className = "Terrasoft.ExternalWidget";
			var id = this.getControlId(config, className);
			var result = {
				className: className,
				markerValue: config.name
			};
			this.applyControlId(result, config, id);
			var serviceProperties = [];
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.generateItemTips(config, result);
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ######### controlConfig ## ##### ######## ##########
		 * @protected
		 * @param {Object} control ##### ######## ##########
		 * @param {Object} config ############ ######## ############# #####
		 */
		applyControlConfig: function(control, config) {
			config.controlConfig = config.controlConfig || {};
			this.addClasses(control, "wrapClass", config.controlConfig.classes);
			delete config.controlConfig.classes;
			Ext.merge(control, config.controlConfig);
		},

		/**
		 * Append tip to control.
		 * @protected
		 * @param {Object} control Control config.
		 * @param {Object} tipConfig The configuration for append tip.
		 * @param {Object} [config] The configuration of schema element view.
		 */
		appendTip: function(control, tipConfig, config) {
			var viewItemTipConfig = config ? config.tip : null;
			tipConfig = this.getTipConfig(viewItemTipConfig, tipConfig);
			var tips = control.tips || (control.tips = []);
			tips.push(tipConfig);
		},

		/**
		 * Returns configuration of tip for schema item. Applies tip behaviour.
		 * @protected
		 * @param {Object} [config] Configuration of the schema element view tip.
		 * @param {Object} [defTipConfig] Configuration of the tip.
		 * @return {Object}
		 */
		getTipConfig: function(config, defTipConfig) {
			defTipConfig = defTipConfig || this.getDefaultTipConfig();
			var tipConfig = config
				? this.getConfigWithoutServiceProperties(config, ["closeButtonConfig", "behaviour", "tools", "items"])
				: {};
			if (tipConfig.contextIdList) {
				defTipConfig.tip.className = "Terrasoft.ContextTip";
			}
			Ext.merge(defTipConfig.tip, tipConfig);
			var behaviour = config ? config.behaviour : null;
			if (behaviour) {
				defTipConfig.settings = Ext.merge(defTipConfig.settings || {}, behaviour);
			}
			return defTipConfig;
		},

		/**
		 * Returns Name of attribute for tips visibility.
		 * @private
		 * @param {String} attributeName Name of attribute.
		 * @return {String}
		 */
		getTipVisibleAttributeName: function(attributeName) {
			return attributeName + "TipVisible";
		},

		/**
		 * Returns config for create tips close button.
		 * @private
		 * @param {Object} config The configuration of schema element view.
		 * @param {Object} [tipConfig] The configuration of schema element tip.
		 * @return {Object} Config for create tips close button.
		 */
		getCloseTipButtonConfig: function(config, tipConfig) {
			var tag = this.getTipVisibleAttributeName(config.name);
			var buttonConfig = {
				name: config.name + "closeTipButton",
				generateId: config.generateId,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				click: {bindTo: this.defaultCloseTipButtonClickMethodName},
				classes: {imageClass: this.closeTipButtonImageClasses},
				imageConfig: {bindTo: this.defaultGetCloseTipButtonImageMethodName}
			};
			if (Ext.isEmpty(tipConfig) && config.tip) {
				tipConfig = config.tip;
			}
			if (tipConfig) {
				buttonConfig.tag = (tipConfig.visible && tipConfig.visible.bindTo) ? tipConfig.visible.bindTo : tag;
				if (tipConfig.closeButtonConfig) {
					Ext.merge(buttonConfig, tipConfig.closeButtonConfig);
				}
			}
			return this.generateButton(buttonConfig);
		},

		/**
		 * Returns default tip config.
		 * @protected
		 */
		getDefaultTipConfig: function() {
			var config = {
				tip: {
					style: Terrasoft.TipStyle.GREEN,
					displayMode: Terrasoft.TipDisplayMode.WIDE
				},
				settings: {
					displayEvent: Terrasoft.TipDisplayEvent.HOVER
				}
			};
			return config;
		},

		/**
		 * Returns Model item tip config.
		 * @private
		 * @param {Object} config The configuration of schema element view.
		 * @return {Object} Model item tip config.
		 */
		getModelItemTipConfig: function(config) {
			var defaultConfig = this.getDefaultTipConfig();
			var tools = [this.getCloseTipButtonConfig(config)];
			var tipConfig = {
				tip: {
					tools: tools,
					linkClicked: {bindTo: "onTipLinkClick"},
					visible: {bindTo: this.getTipVisibleAttributeName(config.name)},
					initialAlignType: Terrasoft.AlignType.TOP,
					markerValue: this.getMarkerValue(config)
				},
				settings: {
					alignEl: this.labelTipAlignEl
				}
			};
			Ext.merge(defaultConfig, tipConfig);
			return defaultConfig;
		},

		/**
		 * Generate view for label with tip.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration for label view.
		 * @return {Object} Returns generated view of label with tip.
		 */
		generateTipLabel: function(config) {
			var label = this.generateLabel(config);
			var id = this.getControlId(config, "Terrasoft.TipLabel");
			var tipLabelConfig = {
				className: "Terrasoft.TipLabel"
			};
			this.applyControlId(label, config, id);
			Ext.apply(label, tipLabelConfig);
			var tipConfig = this.getModelItemTipConfig(config);
			this.appendTip(label, tipConfig, config);
			return label;
		},

		/**
		 * Generate label for model item.
		 * @protected
		 * @param {Object} config The configuration of schema element view.
		 * @return {Object} Model item label config.
		 */
		generateModelItemLabel: function(config) {
			var labelWrap = this.generateControlLabelWrap(config);
			var label = this.generateControlLabel(config);
			labelWrap.items.push(label);
			return labelWrap;
		},

		/**
		 * ########## ############ ############# ### {Terrasoft.ViewItemType.MODEL_ITEM}
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############### ############# ########
		 */
		generateModelItem: function(config) {
			var modelItemWrapId = this.getControlId(config, "Terrasoft.Container");
			var modelItemWrap = this.getDefaultContainerConfig(modelItemWrapId, config);
			if (!Ext.isEmpty(config.visible)) {
				modelItemWrap.visible = config.visible;
				delete config.visible;
			}
			if (this.isItemLabelVisible(config)) {
				var labelWrap = this.generateModelItemLabel(config);
				modelItemWrap.items.push(labelWrap);
			}
			var defaultClasses = this.getModelItemContainerClasses(config);
			if (config.classes) {
				defaultClasses.push(config.classes.wrapClassName);
				delete config.classes;
			}
			this.addClasses(modelItemWrap, "wrapClassName", defaultClasses);
			var controlWrap = this.generateEditControlWrap(config);
			var editControlConfig = this.getConfigWithoutProperties(config, ["wrapClass", "wrapId"]);
			var control = this.generateEditControl(editControlConfig);
			controlWrap.items.push(control);
			modelItemWrap.items.push(controlWrap);
			this.setItemVisible(modelItemWrap, config);
			return modelItemWrap;
		},

		/**
		 * Sets item visible binding.
		 * @private
		 * @param {Object} containerConfig Element container config.
		 * @param {Object} config View schema configuration.
		 * @param {Mixed} config.bindTo Display value bind config.
		 */
		setItemVisible: function(containerConfig, config) {
			var viewModelClass = this.getViewModel();
			if (!Ext.isEmpty(containerConfig.visible) || !viewModelClass.hideEmptyModelItems) {
				return;
			}
			containerConfig.visible = {
				bindTo: this.getItemBindTo(config),
				bindConfig: {
					converter: "isNotEmpty"
				}
			};
		},

		/**
		 * ########## ########## ## ############# ############ ####### ### ########
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Boolean} ########## true #### ##### ############ #######,
		 * false # ######### ######
		 */
		isItemLabelVisible: function(config) {
			return (!config.labelConfig || config.labelConfig.visible !== false);
		},

		/**
		 * ########## ######### ####### ### ####### ### ######### ######
		 * @protected
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Array[]} ########## ######### ####### ### ####### ### ######### ######
		 */
		getModelItemContainerClasses: function(config) {
			var result = this.isItemLabelVisible(config)
				? [this.defaultModelItemClass]
				: [this.defaultModelItemClassWithoutLabel];
			var columnConfig = this.findViewModelColumn(config);
			if (columnConfig && columnConfig.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
				result.push(this.defaultCheckBoxItemClass);
			}
			if (!config.layout) {
				return result;
			}
			if (config.layout.column === 0) {
				result.push(this.defaultModelItemLeftClass);
			}
			if ((config.layout.column + config.layout.colSpan) === this.maxGridLayoutColumnsCount) {
				result.push(this.defaultModelItemRightClass);
			}
			return result;
		},

		/**
		 * Returns text header for schema element.
		 * @protected
		 * @virtual
		 * @param {Object} config The configuration of the circuit element representations.
		 * @return {String} Returns text header for schema element.
		 */
		getLabelCaption: function(config) {
			var labelConfig = config.labelConfig;
			var caption;
			if (config.caption) {
				caption = config.caption;
			} else if (labelConfig && labelConfig.caption) {
				caption = labelConfig.caption;
			} else {
				var column = this.findViewModelColumn(config);
				if (column && column.caption) {
					caption = column.caption;
				}
			}
			return caption;
		},

		_getLabelWrapClass: function(config) {
			var columnConfig = this.findViewModelColumn(config);
			var labelWrapClass = Terrasoft.deepClone(this.defaultLabelWrapClass);
			if (columnConfig && columnConfig.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
				labelWrapClass.push(this.defaultCheckBoxLabelWrapClass);
			}
			return labelWrapClass;
		},

		/**
		 * ########## ############ ########## ######### ######## ##########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############ ########## ######### ######## ##########
		 */
		generateControlLabelWrap: function(config) {
			var labelWrapId = this.getControlId(config, "Terrasoft.Container");
			if (labelWrapId) {
				labelWrapId = labelWrapId + this.defaultLabelWrapSuffix;
			}
			var controlConfig = {
				wrapClass: this._getLabelWrapClass(config),
				generateId: config.generateId
			};
			var labelWrap = this.getDefaultContainerConfig(labelWrapId, controlConfig);
			var labelWrapConfig = config.labelWrapConfig;
			if (labelWrapConfig) {
				var configClasses = labelWrapConfig.classes;
				if (configClasses) {
					var wrapClasses = configClasses.wrapClassName;
					this.addClasses(labelWrap, "wrapClassName", wrapClasses);
					delete labelWrapConfig.classes;
				}
				Ext.merge(labelWrap, labelWrapConfig);
				delete config.labelWrapConfig;
			}
			return labelWrap;
		},

		/**
		 * ########## ############ ############# ######### ######## #####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############### ############# ######### ######## #####
		 */
		generateControlLabel: function(config) {
			var columnConfig = this.findViewModelColumn(config);
			var label;
			if (config.tip) {
				label = this.generateTipLabel(config);
				label.click = {bindTo: "showTipOnLabelClick"};
				label.tag = this.getTipVisibleAttributeName(config.name);
			} else {
				label = this.generateLabel(config);
				label.tag = (columnConfig) ? columnConfig.name : "";
			}
			label.isRequired = Ext.isEmpty(label.isRequired) ? this.isItemRequired(config) : label.isRequired;
			if (columnConfig && columnConfig.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
				label.click = {bindTo: this.defaultInvertColumnValueMethodName};
			}

			delete label.href;
			delete label.linkclick;
			delete label.showValueAsLink;
			delete label.hasClearIcon;
			delete label.timeFormat;
			return label;
		},

		/**
		 * ######### ########## css ###### # ##### ######## ##########
		 * @protected
		 * @param {Object} control ##### ######## ##########
		 * @param {String} classType ### ######## ##### ####### ######## ########## ### ####### #######
		 * @param {String[]} classes ###### css #######
		 */
		addClasses: function(control, classType, classes) {
			if (Ext.isEmpty(classes)) {
				return;
			}
			var classesObject = control.classes = control.classes || {};
			var controlClasses = classesObject[classType] || [];
			classesObject[classType] = Ext.Array.merge(controlClasses, classes);
		},

		/**
		 * ########## ### ######### ###### #############, # ####### ##### ####### ####### #######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {String} ########## ### ######### ###### #############, # ####### ##### ####### ####### #######
		 */
		getItemBindTo: function(config) {
			return (config.bindTo || config.name);
		},

		/**
		 * Returns element data type.
		 * @protected
		 * @virtual
		 * @param {Object} config The configuration of the circuit element representations.
		 * @return {Terrasoft.DataValueType|null} Returns element data type.
		 */
		getItemDataValueType: function(config) {
			if (!Ext.isEmpty(config.dataValueType)) {
				return config.dataValueType;
			}
			var entitySchemaColumn = this.findViewModelColumn(config);
			if (Ext.isEmpty(entitySchemaColumn)) {
				var errorMessage = Ext.String.format(
					resources.localizableStrings.CannotFindColumnMassage,
					Terrasoft.encode(config)
				);
				this.log(errorMessage, Terrasoft.LogMessageType.ERROR);
				return null;
			}
			return entitySchemaColumn.dataValueType;
		},

		/**
		 * Returns entity column.
		 * @protected
		 * @param {Object} config Column configuration information.
		 * @return {Object}
		 */
		findViewModelColumn: function(config) {
			const viewModel = this.getViewModel();
			const bindToProperty = this.getItemBindTo(config);
			const canGetColumnByName = viewModel && Ext.isFunction(viewModel.getColumnByName);
			return canGetColumnByName ? viewModel.getColumnByName(bindToProperty) : null;
		},

		/**
		 * ########## ###### # ########### ### ########## ######## ########## ## #########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ###### # ######## ## #########
		 */
		getAutoBindings: function(config) {
			var result = {
				value: {
					bindTo: this.getItemBindTo(config)
				},
				isRequired: this.isItemRequired(config),
				markerValue: this.getMarkerValue(config),
				placeholder: resources.localizableStrings.NotFiledPlaceholderCaption
			};
			this.updateColumnCaption(config);
			if (this.schemaType === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
				result.focus = {
					bindTo: this.defaultFocusMethodName
				};
			}
			return result;
		},

		/**
		 * Update view model column caption from view labelConfig caption, if exists.
		 * @protected
		 * @param {Object} config View config.
		 */
		updateColumnCaption: function(config) {
			var labelCaption = config.labelConfig && config.labelConfig.caption;
			if (labelCaption) {
				var column = this.findViewModelColumn(config);
				if (column && !Terrasoft.isEqual(labelCaption, column.caption)) {
					column.caption = labelCaption;
				}
			}
		},

		/**
		 * ########## ######## ## ####### ############ ### ##########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Boolean} ########## ######## ## ####### ############ ### ##########
		 */
		isItemRequired: function(config) {
			var column = this.findViewModelColumn(config);
			return Ext.isEmpty(column) ? false : column.isRequired;
		},

		/**
		 * Returns column content type.
		 * @private
		 * @param {Object} config Edit control config.
		 * @return {String|null} Column content type.
		 */
		getContentTypeFromModel: function(config) {
			var column = this.findViewModelColumn(config);
			return column && Ext.isDefined(column.contentType) ? column.contentType : null;
		},

		/**
		 * @private
		 */
		_addTextLengthConstraint: function(config) {
			var viewModel = this.getViewModel();
			if (viewModel) {
				var column = viewModel.columns[config.name];
				if (column && column.size) {
					config.controlConfig = config.controlConfig || {};
					config.controlConfig.maxlength = column.size;
				}
			}
		},

		/**
		 * ########## ############ ############# ### ########## ####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# ########## ####
		 */
		generateTextEdit: function(config) {
			var className = "";
			var contentType = config.contentType;
			if (!Ext.isDefined(contentType)) {
				contentType = this.getContentTypeFromModel(config);
			}
			switch (contentType) {
				case Terrasoft.ContentType.LONG_TEXT:
					className = "Terrasoft.MemoEdit";
					this._addTextLengthConstraint(config);
					break;
				case Terrasoft.ContentType.RICH_TEXT:
					className = "Terrasoft.HtmlEdit";
					break;
				case Terrasoft.ContentType.SEARCHABLE_TEXT:
					return this.generateSearchableTextEdit(config);
				default:
					className = "Terrasoft.TextEdit";
					break;
			}
			var id = this.getControlId(config, className);
			var textEdit = {
				className: className
			};
			this.applyControlId(textEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			if (config.contentType === Terrasoft.ContentType.RICH_TEXT) {
				delete defaultBindings.placeholder;
			}
			this.applyEditControlHint(textEdit);
			Ext.apply(textEdit, defaultBindings);
			Ext.apply(textEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			this.applyControlConfig(textEdit, config);
			return textEdit;
		},

		/**
		 * ########## ############ ############# ### ############## ####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# ############## ####
		 */
		generateIntegerEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.IntegerEdit");
			var integerEdit = {
				className: "Terrasoft.IntegerEdit"
			};
			this.applyControlId(integerEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(integerEdit);
			Ext.apply(integerEdit, defaultBindings);
			Ext.apply(integerEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			this.applyControlConfig(integerEdit, config);
			return integerEdit;
		},

		/**
		 * ########## ############ ############# ### #### # ######### #######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# #### # ######### #######
		 */
		generateFloatEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.FloatEdit");
			var floatEdit = {
				className: "Terrasoft.FloatEdit"
			};
			this.applyControlId(floatEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			var column = this.findViewModelColumn(config);
			if (column && column.precision) {
				Ext.apply(floatEdit, {
					decimalPrecision: column.precision
				});
			}
			this.applyEditControlHint(floatEdit);
			Ext.apply(floatEdit, defaultBindings);
			Ext.apply(floatEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			this.applyControlConfig(floatEdit, config);
			return floatEdit;
		},

		/**
		 * Generates component view configuration for editing value of column with money data value type.
		 * @protected
		 * @virtual
		 * @param {Object} config Item configuration.
		 * @return {object} Component view configuration.
		 */
		generateMoneyEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.FloatEdit");
			var moneyEdit = {
				className: "Terrasoft.MoneyEdit"
			};
			this.applyControlId(moneyEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(moneyEdit);
			Ext.apply(moneyEdit, defaultBindings);
			Ext.apply(moneyEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			this.applyControlConfig(moneyEdit, config);
			return moneyEdit;
		},

		/**
		 * ########## ############ ############# ### #### #### # #######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# #### #### # #######
		 */
		generateDateTimeEdit: function(config) {
			var dateEdit = this.generateDateEdit(config);
			var timeEdit = this.generateTimeEdit(Ext.apply({}, {
				markerValue: Ext.String.format("{0}TimeEdit", this.getMarkerValue(config))
			}, config));
			this.applyEditControlHint(dateEdit);
			this.applyEditControlHint(timeEdit);
			this.addClasses(dateEdit, "wrapClass", ["datetime-datecontrol"]);
			this.addClasses(timeEdit, "wrapClass", ["datetime-timecontrol"]);
			var controlContainer = this.getDefaultContainerConfig(config.name + "DateTimeContainer", config);
			controlContainer.items = [dateEdit, timeEdit];
			return controlContainer;
		},

		/**
		 * ########## ############ ############# ### #### ####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# #### ####
		 */
		generateDateEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.DateEdit");
			var dateEdit = {
				className: "Terrasoft.DateEdit"
			};
			this.applyControlId(dateEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(dateEdit, config);
			Ext.apply(dateEdit, defaultBindings);
			Ext.apply(dateEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			if (config.controlConfig) {
				this.applyControlConfig(dateEdit, config.controlConfig.dateEdit || {});
				delete config.controlConfig.dateEdit;
			}
			var configWithOutTimeEdit = this.getConfigWithoutProperties(config, ["timeEdit"]);
			this.applyControlConfig(dateEdit, configWithOutTimeEdit);
			return dateEdit;
		},

		/**
		 * ########## ############ ############# ### #### #######
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# #### #######
		 */
		generateTimeEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.TimeEdit");
			var timeEdit = {
				className: "Terrasoft.TimeEdit"
			};
			this.applyControlId(timeEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(timeEdit);
			Ext.apply(timeEdit, defaultBindings);
			Ext.apply(timeEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			if (config.controlConfig) {
				this.applyControlConfig(timeEdit, config.controlConfig.timeEdit || {});
				delete config.controlConfig.timeEdit;
			}
			this.applyControlConfig(timeEdit, config);
			return timeEdit;
		},

		/**
		 * Generates enum edit control configuration.
		 * @protected
		 * @virtual
		 * @param {Object} config Configuration of schema element view.
		 * @return {object} Enum edit control configuration.
		 */
		generateEnumEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.ComboBoxEdit");
			var enumEdit = {
				className: "Terrasoft.ComboBoxEdit",
				list: {
					bindTo: this.getExpandableListName(config)
				},
				tag: this.getItemBindTo(config)
			};
			this._applyPredictableControlValues(enumEdit, config);
			this.applyControlId(enumEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(enumEdit);
			Ext.apply(enumEdit, defaultBindings);
			Ext.apply(enumEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"]));
			this.applyControlConfig(enumEdit, config);
			return enumEdit;
		},

		/**
		 * Applies predictable control config properties.
		 * @private
		 * @param {Object} controlConfig Edit control configuration.
		 * @param {Object} config Configuration of schema element view.
		 */
		_applyPredictableControlValues: function(controlConfig, config) {
			if (!this._getIsPredictableColumn(config)) {
				return;
			}
			Ext.apply(controlConfig, {
				predictableState: {
					bindTo: this._getPredictableStateAttrName(config)
				},
				enablePredictableIcon: true,
				preparePredictableList: {
					bindTo: this._defaultLoadPredictableDataMethodName
				}
			});
		},

		/**
		 * Returns model column predictable state.
		 * @private
		 * @param {Object} config Configuration of schema element view.
		 * @return {Boolean} Is predictable model column.
		 */
		_getIsPredictableColumn: function(config) {
			var column = this.findViewModelColumn(config);
			var viewModel = this.getViewModel();
			var entitySchemaName = viewModel && viewModel.entitySchemaName;
			return Terrasoft.getIsPredictableColumn(entitySchemaName, column);
		},

		/**
		 * Returns predictable state model attribute name.
		 * @private
		 * @param {Object} config Configuration of schema element view.
		 * @return {String} Predictable state model attribute name.
		 */
		_getPredictableStateAttrName: function(config) {
			return Ext.String.format("{0}{1}", this.getItemBindTo(config),
				this._defaultPredictableColumnStateSuffix);
		},

		/**
		 * Generates searchable text edit configuration.
		 * @protected
		 * @param {Object} config Searchable text edit control config.
		 * @return {Object} Searchable test edit control configuration.
		 */
		generateSearchableTextEdit: function(config) {
			var column = this.findViewModelColumn(config);
			var searchableTextConfig = column && column.searchableTextConfig || {};
			var id = this.getControlId(config, "Terrasoft.SearchableTextEdit");
			var searchableTextEdit = {
				"className": "Terrasoft.SearchableTextEdit",
				"list": {
					bindTo: searchableTextConfig.listAttribute
				},
				"prepareList": {
					bindTo: searchableTextConfig.prepareListMethod
				},
				"listViewItemRender": {
					bindTo: searchableTextConfig.listViewItemRenderMethod
				},
				"itemSelected": {
					bindTo: searchableTextConfig.itemSelectedMethod
				}
			};
			this.applyControlId(searchableTextEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(searchableTextEdit);
			Ext.apply(searchableTextEdit, defaultBindings);
			Ext.apply(searchableTextEdit, this.getConfigWithoutServiceProperties(config,
				["labelConfig", "labelWrapConfig", "caption", "textSize", "tip"]));
			this.applyControlConfig(searchableTextEdit, config);
			return searchableTextEdit;
		},

		/**
		 * Returns view model.
		 * @protected
		 * @param {Object} [viewModelClass] Optional viewModelClass.
		 * @return {Terrasoft.BaseViewModel} View model.
		 */
		getViewModel: function(viewModelClass) {
			viewModelClass = viewModelClass || this.viewModelClass;
			return viewModelClass && viewModelClass.prototype ? viewModelClass.prototype : viewModelClass;
		},

		/**
		 * ########## ############ ############# ### ########### ####.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####.
		 * @return {object} ############ ############# ########### ####.
		 */
		generateLookupEdit: function(config) {
			var contentType = config.contentType;
			if ((contentType && (contentType !== Terrasoft.ContentType.LOOKUP)) || !contentType) {
				var viewModelColumn = this.findViewModelColumn(config);
				if (viewModelColumn && viewModelColumn.isSimpleLookup) {
					contentType = Terrasoft.ContentType.ENUM;
				}
			}
			if (contentType && contentType === Terrasoft.ContentType.ENUM) {
				return this.generateEnumEdit(config);
			}
			var id = this.getControlId(config, "Terrasoft.LookupEdit");
			var lookupEdit = {
				className: "Terrasoft.LookupEdit",
				list: {
					bindTo: this.getExpandableListName(config)
				},
				tag: this.getItemBindTo(config),
				loadVocabulary: {
					bindTo: this.loadVocabularyMethodName
				},
				change: {
					bindTo: "onLookupChange"
				},
				href: {
					bindTo: "getLinkUrl"
				},
				linkclick: {
					bindTo: "onLinkClick"
				},
				linkmouseover: {
					bindTo: "linkMouseOver"
				},
				showValueAsLink: true,
				hasClearIcon: true
			};
			this._applyPredictableControlValues(lookupEdit, config);
			this.applyControlId(lookupEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(lookupEdit);
			Ext.apply(lookupEdit, defaultBindings);
			var serviceProperties = ["loadVocabularyMethodName", "labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"];
			Ext.apply(lookupEdit, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.applyControlConfig(lookupEdit, config);
			return lookupEdit;
		},

		/**
		 * ########## ############ ############# ### #### ########.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####.
		 * @return {object} ############ ############# #### ########.
		 */
		generateMappingEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.MappingEdit");
			var mappingEdit = {
				className: "Terrasoft.MappingEdit",
				openEditWindow: {
					bindTo: this.openMappingEditWindowName
				},
				prepareMenu: {
					bindTo: this.defaultPrepareMenuMethodName
				},
				change: {
					bindTo: this.defaultChangeValueMethodName
				},
				menu: {
					items: {
						bindTo: this.defaultMenuItemsName
					}
				},
				tag: this.getItemBindTo(config)
			};
			this.applyControlId(mappingEdit, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(mappingEdit);
			Ext.apply(mappingEdit, defaultBindings);
			var serviceProperties = ["openMappingEditWindowName", "labelConfig", "labelWrapConfig",
				"caption", "textSize", "tip"];
			Ext.apply(mappingEdit, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.applyControlConfig(mappingEdit, config);
			return mappingEdit;
		},

		/**
		 * ########## ############ ############# ### ########### ####
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {object} ########## ############# ########### ####
		 */
		generateBooleanEdit: function(config) {
			var id = this.getControlId(config, "Terrasoft.CheckBoxEdit");
			var checkBoxEdit = {
				className: "Terrasoft.CheckBoxEdit",
				checked: {
					bindTo: this.getItemBindTo(config)
				},
				markerValue: this.getMarkerValue(config)
			};
			this.applyControlId(checkBoxEdit, config, id);
			if (this.schemaType === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
				checkBoxEdit.focus = {
					bindTo: this.defaultFocusMethodName
				};
			}
			Ext.apply(checkBoxEdit, this.getConfigWithoutServiceProperties(config, ["labelConfig",
				"labelWrapConfig", "caption", "textSize", "tip"]));
			this.applyControlConfig(checkBoxEdit, config);
			return checkBoxEdit;
		},

		/**
		 * ########## ############ ############# ########## #########
		 * @protected
		 * @overridden
		 * @param {Object} config ############ ######## ######### #########
		 * @return {Object} ########## ############### ############# #### ######## #####
		 */
		generateStageIndicator: function(config) {
			var id = this.getControlId(config, "Terrasoft.BaseProgressBar");
			var stageIndicator = {
				className: "Terrasoft.BaseProgressBar",
				markerValue: this.getMarkerValue(config)
			};
			this.applyControlId(stageIndicator, config, id);
			var serviceProperties = ["labelConfig", "labelWrapConfig", "caption", "isRequired", "generator", "tip"];
			Ext.apply(stageIndicator, this.getConfigWithoutServiceProperties(config, serviceProperties));
			this.applyControlConfig(stageIndicator, config);
			return stageIndicator;
		},

		/**
		 * ########## ############ ########## ######## ##########
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####
		 * @return {Object} ########## ############ ########## ######## ##########
		 */
		generateEditControlWrap: function(config) {
			var controlWrapId = this.getControlId(config, "Terrasoft.Container");
			if (controlWrapId) {
				controlWrapId = controlWrapId + this.defaultControlWrapSuffix;
			}
			var controlConfig = {
				wrapClass: this.defaultControlWrapClass,
				generateId: config.generateId
			};
			var controlWrap = this.getDefaultContainerConfig(controlWrapId, controlConfig);
			var controlWrapConfig = config.controlWrapConfig;

			if (controlWrapConfig) {
				var configClasses = controlWrapConfig.classes;
				if (configClasses) {
					var wrapClasses = configClasses.wrapClassName;
					this.addClasses(controlWrap, "wrapClassName", wrapClasses);
					delete config.controlWrapConfig.classes;
				}
				Ext.merge(controlWrap, controlWrapConfig);
				delete config.controlWrapConfig;
			}
			return controlWrap;
		},

		/**
		 * Create config for tip.
		 * @protected
		 * @param {Object} config for create Tip.
		 * @return {Object} Created tip config.
		 */
		getHintConfig: function(config) {
			var defaultConfig = this.getDefaultTipConfig();
			var hintConfig = {
				tip: {
					displayMode: config.displayMode || Terrasoft.TipDisplayMode.NARROW,
					content: config.content,
					markerValue: config.content
				},
				settings: {
					alignEl: config.alignEl
				}
			};
			Ext.merge(defaultConfig, hintConfig);
			return defaultConfig;
		},

		/**
		 * Apply control config with hint config.
		 * @private
		 * @param {Object} controlConfig The configuration of the control schema.
		 * @param {Object} [config] The configuration of the element from the view.
		 * @return {Object} The configuration of the control schema with tips.
		 */
		applyEditControlHint: function(controlConfig, config) {
			var clearButtonHint = this.getHintConfig({
				content: {bindTo: "Resources.Strings.ClearButtonHint"},
				alignEl: "clearIconEl"
			});
			var fieldLockHintConfig = this._getFieldLockHintConfig(config);
			var fieldLockHint = this.getHintConfig(fieldLockHintConfig);
			var tipsConfig = {
				tips: [clearButtonHint, fieldLockHint]
			};
			Ext.apply(controlConfig, tipsConfig);
		},

		/**
		 * Returns config for create hint lock.
		 * @private
		 * @param {Object} [config] The configuration of schema element view.
		 * @return {Object} Config for create hint lock.
		 */
		_getFieldLockHintConfig: function(config) {
			var fieldLockHintConfig = {
				content: {bindTo: "Resources.Strings.FieldLockHint"},
				alignEl: "disabledElIconEl"
			};
			if (config && config.hintLock) {
				Ext.merge(fieldLockHintConfig, config.hintLock);
				delete config.hintLock;
			}
			return fieldLockHintConfig;
		},

		/**
		 * Generate edit control configuration.
		 * @protected
		 * @virtual
		 * @param {Object} config Edit control config.
		 * @return {Object/Array} Edit control configuration.
		 */
		generateEditControl: function(config) {
			var itemDataValueType = this.getItemDataValueType(config);
			var controlConfig;
			switch (itemDataValueType) {
				case null:
					config.visible = false;
					controlConfig = this.generateTextEdit(config);
					break;
				case Terrasoft.DataValueType.GUID:
					config.enabled = false;
				case Terrasoft.DataValueType.TEXT:
					controlConfig = this.generateTextEdit(config);
					break;
				case Terrasoft.DataValueType.INTEGER:
					controlConfig = this.generateIntegerEdit(config);
					break;
				case Terrasoft.DataValueType.FLOAT:
					controlConfig = this.generateFloatEdit(config);
					break;
				case Terrasoft.DataValueType.MONEY:
					controlConfig = this.generateMoneyEdit(config);
					break;
				case Terrasoft.DataValueType.DATE_TIME:
					controlConfig = this.generateDateTimeEdit(config);
					break;
				case Terrasoft.DataValueType.DATE:
					controlConfig = this.generateDateEdit(config);
					break;
				case Terrasoft.DataValueType.TIME:
					controlConfig = this.generateTimeEdit(config);
					break;
				case Terrasoft.DataValueType.LOOKUP:
					controlConfig = this.generateLookupEdit(config);
					break;
				case Terrasoft.DataValueType.MAPPING:
					controlConfig = this.generateMappingEdit(config);
					break;
				case Terrasoft.DataValueType.ENUM:
					controlConfig = this.generateEnumEdit(config);
					break;
				case Terrasoft.DataValueType.BOOLEAN:
					controlConfig = this.generateBooleanEdit(config);
					break;
				case Terrasoft.DataValueType.STAGE_INDICATOR:
					controlConfig = this.generateStageIndicator(config);
					break;
				default:
					var errorMessage = Ext.String.format(
						resources.localizableStrings.UnsupportedDataValueTypeMessage,
						Ext.Object.getKey(Terrasoft.DataValueType, itemDataValueType));
					throw new Terrasoft.UnsupportedTypeException({
						message: errorMessage
					});
			}
			return controlConfig;
		},

		/**
		 * ########## ############ ############# ########## {Terrasoft.Container}.
		 * @protected
		 * @virtual
		 * @param {String} id ########## ############# ## ########.
		 * @param {Object} config ############ ######## ############# #####.
		 * @param {String} config.wrapClass #SS ###### ##########.
		 * @param {Object} config.styles #SS ##### ##########.
		 * @return {Object} ########## ############### ############# ##########.
		 */
		getDefaultContainerConfig: function(id, config) {
			var wrapClass = config.wrapClass;
			var styles = config.styles;
			var wrapId = config.wrapId;
			var container = {
				className: "Terrasoft.Container",
				items: []
			};
			if (!Ext.isEmpty(wrapId)) {
				container.id = wrapId;
			}
			this.applyControlId(container, config, id);
			if (!Ext.isEmpty(styles)) {
				container.styles = {
					wrapStyles: styles
				};
			}
			if (!Ext.isEmpty(wrapClass)) {
				container.classes = {
					wrapClassName: wrapClass
				};
			}
			return container;
		},

		/**
		 * ########## ############ ############# ### Terrasoft.ViewItemType.SECTION_VIEWS
		 * @protected
		 * @virtual
		 * @param {Object} config ######## ######## #############
		 * @return {Object} ############ #############
		 */
		generateSectionViews: function(config) {
			return this.generateContainer(config);
		},

		/**
		 * ########## ############ ############# ### Terrasoft.ViewItemType.SECTION_VIEW
		 * @protected
		 * @virtual
		 * @param {Object} config ######## ######## #############
		 * @return {Object} ############ #############
		 */
		generateSectionView: function(config) {
			var container = this.generateContainer(config);
			var visible = Ext.String.format(this.dataViewVisiblePropertyTemplate, config.name);
			container.visible = {
				bindTo: visible
			};
			Ext.apply(container, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(container, config);
			return container;
		},

		/**
		 * ######## ######### ############ #######
		 * @private
		 * @param {Object} config ################ ######
		 * @return {Object}
		 */
		getDefaultGridConfig: function(config) {
			var className = "Terrasoft.Grid";
			var id = this.getControlId(config, className);
			var gridConfig = {
				className: className
			};
			this.applyControlId(gridConfig, config, id);
			return gridConfig;
		},

		/**
		 * ########## ############ ######### # ###### ########## #######
		 * @param {Object} gridConfig ############ #######
		 * @param {Object} columnConfig ############ ####### #######
		 * @return {Object} ########## ############ ######### # ######
		 */
		generateTiledCellCaption: function(gridConfig, columnConfig) {
			var captionConfig = Ext.apply({}, columnConfig.captionConfig, this.defaultGridCellCaptionConfig);
			if (gridConfig.type !== Terrasoft.GridType.TILED || !captionConfig.visible) {
				return null;
			}
			var name = this.getGridColumnCaption(columnConfig);
			if (!name) {
				return null;
			}
			return {
				type: gridConfig.isVertical ? Terrasoft.GridKeyType.LABEL : Terrasoft.GridKeyType.CAPTION,
				name: name
			};
		},

		/**
		 * ########## ############ ######## # ######
		 * @param {Object} config ############ #######
		 * @return {Object} ########## ############ ######## # ######
		 */
		generateGridCellValue: function(config) {
			var cellValue = {};
			var type = config.type;
			cellValue.name = config.value || {
				bindTo: config.bindTo
			};
			var caption = config.caption;
			if (caption) {
				cellValue.caption = caption;
			}
			switch (type) {
				case Terrasoft.GridCellType.LINK:
					cellValue.name = {
						bindTo: "on" + config.bindTo + "LinkClick"
					};
					cellValue.type = Terrasoft.GridKeyType.LINK;
					break;
				case Terrasoft.GridCellType.TITLE:
					cellValue.type = Terrasoft.GridKeyType.TITLE;
					break;
				default:
					cellValue.type = Terrasoft.GridKeyType.TEXT;
					break;
			}
			return cellValue;
		},

		/**
		 * ######### ######## # ###### ##### ###### ####### ## ####### ############ ###### ####.
		 * # ############ ####### ####### ########## ####### ########## ######### ## #######
		 * @protected
		 * @param {Array} columns ###### ####### ######
		 */
		sortGridRowColumns: function(columns) {
			columns.sort(function(first, second) {
				var firstColumn = first.position.column;
				var secondColumn = second.position.column;
				if (firstColumn > secondColumn) {
					return 1;
				}
				if (firstColumn < secondColumn) {
					return -1;
				}
				return 0;
			});
		},

		/**
		 * Gets grid column caption value.
		 * @protected
		 * @param {Object} config Column configuration information.
		 * @return {String} Grid column caption value.
		 */
		getGridColumnCaption: function(config) {
			var caption = config && config.caption ? config.caption : null;
			var needUseEntityCaption = !Terrasoft.ColumnUtilities.isProfileCultureEqualsUserCulture(this.schemaProfile);
			if (caption && !needUseEntityCaption) {
				return caption;
			}
			var viewModelColumn = this.findViewModelColumn(config);
			if (viewModelColumn) {
				caption = viewModelColumn.caption;
			}
			return caption;
		},

		/**
		 * ########## ############ ######### ####### ########## #######
		 * @protected
		 * @param {Object} config ############ #######
		 * @return {Object} ########## ############ ######### ####### ########## #######
		 */
		generateGridCaptionConfig: function(config) {
			var position = config.position;
			var cols = position.colSpan;
			var name = this.getGridColumnCaption(config);
			return {
				cols: cols,
				name: name
			};
		},

		/**
		 * ########## ############ ########## ########## #######
		 * @protected
		 * @param {Array} columns ############ #######
		 * @return {Array} ########## ############ ########## ########## #######
		 */
		generateGridCaptionsConfig: function(columns) {
			var captionsConfig = [];
			this.sortGridRowColumns(columns);
			Terrasoft.each(columns, function(column) {
				var captionConfig = this.generateGridCaptionConfig(column);
				captionsConfig.push(captionConfig);
			}, this);
			return captionsConfig;
		},

		/**
		 * Returns grid row columns from columns config.
		 * @protected
		 * @param {Object} config Columns config.
		 * @param {Number} rowIndex Row number.
		 * @return {Object[]} Row columns config.
		 */
		getGridRowColumns: function(config, rowIndex) {
			return Terrasoft.filter(config.items, function(column) {
				var position = column.position;
				return (position.row === rowIndex);
			}, this);
		},

		/**
		 * Generates grid row configuration.
		 * @protected
		 * @param {Object} gridConfig Grid configuration.
		 * @param {Object} columns Columns configuration.
		 * @return {Array} Grid row configuration.
		 */
		generateGridRowConfig: function(gridConfig, columns) {
			var rowConfig = [];
			this.sortGridRowColumns(columns);
			Terrasoft.each(columns, function(column) {
				var cellConfig = this.generateGridCell(gridConfig, column);
				rowConfig.push(cellConfig);
			}, this);
			return rowConfig;
		},

		/**
		 * Generates grid cell configuration.
		 * @protected
		 * @param {Object} gridConfig Grid configuration.
		 * @param {Object} columnConfig Column configuration.
		 * @param {Object} [columnConfig.orderDirection] Column order direction.
		 * @param {Object} [columnConfig.orderPosition] Column order position.
		 * @return {Object} Grid cell configuration.
		 */
		generateGridCell: function(gridConfig, columnConfig) {
			const cols = columnConfig.position.colSpan;
			const key = [];
			const cellCaption = this.generateTiledCellCaption(gridConfig, columnConfig);
			const cellValue = this.generateGridCellValue(columnConfig);
			if (gridConfig.isVertical) {
				return this.generateVerticalGridCellConfig(cellCaption, cellValue, cols);
			}
			if (cellCaption) {
				key.push(cellCaption);
			}
			if (cellValue) {
				key.push(cellValue);
			}
			const cellConfig = {
				cols: cols,
				key: key
			};
			const orderDirection = columnConfig.orderDirection;
			const orderPosition = columnConfig.orderPosition;
			if (!Ext.isEmpty(orderDirection)) {
				cellConfig.orderDirection = orderDirection;
			}
			if (!Ext.isEmpty(orderPosition)) {
				cellConfig.orderPosition = orderPosition;
			}
			const aggregationType = columnConfig.aggregationType;
			if (!Ext.isEmpty(aggregationType)) {
				cellConfig.aggregationType = aggregationType;
				cellConfig.serializedFilter = columnConfig.serializedFilter;
			}
			return cellConfig;
		},

		/**
		 * Generates vertical grid cell configuration.
		 * @protected
		 * @param {Object} cellCaption Cell caption.
		 * @param {Object} cellValue Cell value.
		 * @param {Object} colsCount Cell width.
		 * @return {Array} Vertical grid cell configuration.
		 */
		generateVerticalGridCellConfig: function(cellCaption, cellValue, colsCount) {
			var config = [];
			if (cellCaption) {
				var captionColsCount = parseInt(colsCount / 100 * 40, 10);
				config.push({
					cols: captionColsCount,
					key: [cellCaption]
				});
				colsCount -= captionColsCount;
			}
			if (cellValue) {
				config.push({
					cols: colsCount,
					key: [cellValue]
				});
			}
			return config;
		},

		/**
		 * ############# ######### ############ ####### ####### ####, ######## #####
		 * @protected
		 * @param {Object} gridConfig ############ #######
		 */
		actualizeListedGridConfig: function(gridConfig) {
			var listedConfig = gridConfig.listedConfig;
			var listedConfigItems = listedConfig.items;
			var captionsConfig = this.generateGridCaptionsConfig(listedConfigItems);
			var columnsConfig = this.generateGridRowConfig(gridConfig, listedConfigItems);
			gridConfig.listedConfig = {
				captionsConfig: captionsConfig,
				columnsConfig: columnsConfig
			};
			this.addLinks(gridConfig.listedConfig, false);
		},

		/**
		 * @private
		 */
		_getLinkBindToColumn: function(columnName) {
			return {
				bindTo: "on" + columnName + "LinkClick"
			};
		},

		/**
		 * ######### ######## link # ########
		 * @param {Object} gridConfig
		 * @param {Boolean} isTiled
		 * @param {Terrasoft.BaseViewModel} viewModelClass Custom view model.
		 */
		addLinks: function(gridConfig, isTiled, viewModelClass) {
			gridConfig.columnsConfig.forEach(function(row) {
				if (!isTiled) {
					row = gridConfig.columnsConfig;
				}
				var viewModel = this.getViewModel(viewModelClass);
				var entitySchema = viewModel.entitySchema;
				Terrasoft.each(row, function(cell) {
					var item = Ext.isArray(cell) ? cell : [cell];
					Terrasoft.each(item, function(cellItem) {
						var itemKey = cellItem.key;
						var columnName = null;
						var columnType = null;
						Terrasoft.each(itemKey, function(element) {
							if (element && element.name && element.name.bindTo) {
								columnName = element.name.bindTo.split("#")[0];
								columnType = element.type || columnType;
							}
						}, this);
						if (!columnName) {
							return;
						}
						var moduleUtils = Terrasoft.ModuleUtils;
						if (entitySchema) {
							var moduleSchemaConfig = moduleUtils.getModuleStructureByName(entitySchema.name);
							if (moduleSchemaConfig && (entitySchema.primaryDisplayColumnName === columnName ||
									LinkColumnHelper.getIsLinkColumn(entitySchema.name, columnName))) {
								cellItem.link = this._getLinkBindToColumn(columnName);
							}
						}
						var column = viewModel.columns[columnName];
						var referenceSchemaName = column && column.referenceSchemaName;
						if (column && column.isLookup && referenceSchemaName) {
							var moduleStructure = moduleUtils.getModuleStructureByName(referenceSchemaName);
							var entityStructure = moduleUtils.getEntityStructureByName[referenceSchemaName];
							if (entityStructure && moduleStructure && Ext.isArray(entityStructure.pages) &&
								entityStructure.pages.length > 0) {
								cellItem.link = this._getLinkBindToColumn(columnName);
							}
						}
						if (Ext.isEmpty(cellItem.link) && (columnType !== Terrasoft.GridKeyType.LINK)) {
							cellItem.link = this._getLinkBindToColumn(columnName);
						}
					}, this);
				}, this);
				if (!isTiled) {
					return false;
				}
			}, this);
		},

		/**
		 * ############# ######### ############ ####### ####### ####, ######## #####
		 * @protected
		 * @param {Object} gridConfig ############ #######
		 */
		actualizeTiledGridConfig: function(gridConfig) {
			var tiledConfig = gridConfig.tiledConfig;
			var columnsConfig = [];
			var initialIndex = 1;
			var rowsCount = tiledConfig.grid.rows;
			for (var rowIndex = initialIndex; rowIndex < rowsCount + initialIndex; rowIndex++) {
				var columns = this.getGridRowColumns(tiledConfig, rowIndex);
				var rowConfig = this.generateGridRowConfig(gridConfig, columns);
				if (rowConfig.length) {
					columnsConfig.push(rowConfig);
				}
			}
			gridConfig.tiledConfig = {
				columnsConfig: columnsConfig
			};
			if (!gridConfig.isVertical) {
				this.addLinks(gridConfig.tiledConfig, true);
			}
		},

		/**
		 * ############# ############ ####### ####### ####, ######## #####
		 * @protected
		 * @param {Object} config ############ #######
		 */
		actualizeGridConfig: function(config) {
			this.actualizeListedGridConfig(config);
			this.actualizeTiledGridConfig(config);
		},

		/**
		 * ########## ############ ############# ### Terrasoft.ViewItemType.GRID
		 * @protected
		 * @virtual
		 * @param {Object} config ######## ######## #############
		 * @return {Object} ############ #######
		 */
		generateGrid: function(config) {
			var gridConfig = this.getDefaultGridConfig(config);
			var profile = this.schemaProfile[config.name];
			if (profile && profile.listedConfig && profile.tiledConfig) {
				if (profile.type) {
					config.type = profile.type;
				}
				config.listedConfig = Ext.decode(profile.listedConfig);
				config.tiledConfig = Ext.decode(profile.tiledConfig);
				this.actualizeGridConfig(config);
			} else if (profile && profile.listedColumnsConfig && profile.tiledColumnsConfig) {
				config.type = profile.isTiled ? Terrasoft.GridType.TILED : Terrasoft.GridType.LISTED;
				config.listedConfig = {
					columnsConfig: Ext.decode(profile.listedColumnsConfig),
					captionsConfig: Ext.decode(profile.captionsConfig)
				};
				config.tiledConfig = {
					columnsConfig: Ext.decode(profile.tiledColumnsConfig)
				};
			} else if (config.listedConfig && config.tiledConfig) {
				this.actualizeGridConfig(config);
			}
			if (config.activeRowActions) {
				Terrasoft.each(config.activeRowActions, function(item) {
					item.markerValue = item.markerValue || item.caption;
				});
			}
			if (config.needLoadData) {
				config.watchRowInViewport = 2;
				config.watchedRowInViewport = config.needLoadData;
			}
			config.linkMouseOver = {"bindTo": "linkMouseOver"};
			Ext.apply(gridConfig, this.getConfigWithoutServiceProperties(config, ["needLoadData"]));
			this.applyControlConfig(gridConfig, config);
			return gridConfig;
		},

		/**
		 * ########## ############ ############# ### Terrasoft.ViewItemType.SCHEDULE_EDIT
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## #############
		 * @return {Object} ########## ############ ##########
		 */
		generateScheduleEdit: function(config) {
			var className = "Terrasoft.ScheduleEdit";
			var result = {
				className: className,
				bottomPadding: this.defaultScheduleEditBottomPadding
			};
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ########## ############ ############# ### ###### ###### ##### {Terrasoft.ViewItemType.COLOR_BUTTON}
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ###### #####
		 * @return {Object} ########## ############### ############# ###### #####
		 */
		generateColorButton: function(config) {
			var id = this.getControlId(config, "Terrasoft.ColorButton");
			var result = {
				className: "Terrasoft.ColorButton",
				markerValue: config.name
			};
			this.applyControlId(result, config, id);
			Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
			this.generateItemTips(config, result);
			this.applyControlConfig(result, config);
			return result;
		},

		/**
		 * ############## ########## ######### ####### # ###### ###### ############# ##########.
		 * @protected
		 * @overridden
		 * @param {Object} config ############ ########## #####.
		 */
		init: function(config) {
			this.callParent(arguments);
			var schema = config.schema;
			this.schemaProfile = schema.profile || [];
			this.viewModelClass = config.viewModelClass;
			this.customGenerators = config.customGenerators;
			this.elementsPrefix = config.elementsPrefix;
		},

		/**
		 * ######### ########## ##### #############.
		 * @param {Object} viewConfig ############ #############.
		 * @param {Object} config
		 * @param {String} config.schemaName ### #####.
		 * @param {Class} config.viewModelClass ##### ###### #############.
		 * @return {Object[]} ########## ############### ############# #####.
		 */
		generatePartial: function(viewConfig, config) {
			this.init(config);
			if (this.schemaType === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
				BusinessRulesApplier.applyRules(this.viewModelClass, viewConfig);
			}
			delete viewConfig.generator;
			var view = this.generateView([viewConfig]);
			this.clear();
			return view;
		},

		/**
		 * ####### ########## ######### #######,
		 * ################ ########### # ###### ###### ############# ##########.
		 * @protected
		 * @overridden
		 */
		clear: function() {
			this.callParent(arguments);
			this.viewModelClass = null;
			this.customGenerators = null;
			this.schemaProfile = null;
			this.elementsPrefix = null;
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseGenerator#generate
		 * @override
		 */
		generate: function(config, callback, scope) {
			var schema = config.schema;
			var combinedViewConfig = schema.viewConfig;
			this.callParent([config, function() {
				if (this.schemaType === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
					BusinessRulesApplier.applyRules(this.viewModelClass, combinedViewConfig);
				}
				this.requireCustomGenerators(combinedViewConfig, function() {
					var viewConfig = this.generateView(combinedViewConfig);
					this.clear();
					callback.call(scope, viewConfig);
				}, this);
			}, this]);
		}
	});

	return Ext.create("Terrasoft.ViewGenerator");
});



Terrasoft.configuration.Structures["MiniPageContainerViewModel"] = {innerHierarchyStack: ["MiniPageContainerViewModel"]};
define("MiniPageContainerViewModel", ["ConfigurationEnumsV2"], function() {
	Ext.define("Terrasoft.configuration.MiniPageContainerViewModel", {
		extend: "Terrasoft.BaseModel",
		alternateClassName: "Terrasoft.MiniPageContainerViewModel",

		sandbox: null,

		/**
		 * True if need load MiniPage module.
		 * @type {Boolean}
		 */
		needLoadModule: false,

		/**
		 * Id of element align to.
		 * @type {Object}
		 */
		alignToElId: null,

		/**
		 * True if mini page need be fixed.
		 * @private
		 * @type {Boolean}
		 */
		isFixed: false,

		/**
		 * Mini page open mode.
		 * @private
		 * @type {String}
		 */
		miniPageMode: "",

		/**
		 * Mini page default values.
		 * @private
		 * @type {Array}
		 */
		defaultValues: [],

		/**
		 * Extendet menu element id (BaseExtendedMenu).
		 * @type {String}
		 */
		menuElId: "ExtendedMenu-list",

		/**
		 * Show MiniPage delay.
		 * @private
		 * @type {String}
		 */
		listViewClassName: "listview",

		/**
		 * Class for tip element.
		 * @type {String}
		 */
		tipClassName: "tip",

		/**
		 * Class for date picker element.
		 * @type {String}
		 */
		datePickerClass: "ts-datepicker-container",

		/**
		 * Show MiniPage delay.
		 * @private
		 * @type {Integer}
		 */
		showMiniPageDelay: 1000,

		/**
		 * Hide MiniPage delay.
		 * @private
		 * @type {Integer}
		 */
		hideMiniPageDelay: 500,

		messages: {
			/**
			 * @message GetAlignToEl
			 * Returns alignEl on this message.
			 * @type {Object}
			 */
			"GetAlignToEl": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetMiniPageDefaultValues
			 * Returns mini page default values.
			 * @type {Object}
			 */
			"GetMiniPageDefaultValues": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetMiniPageOperation
			 * Returns mini page operation.
			 * @type {Object}
			 */
			"GetMiniPageOperation": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message CloseMiniPage
			 * Message for close mini page.
			 * @type {Object}
			 */
			"CloseMiniPage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SetMiniPageVisible
			 * Sets mini page visibility.
			 * @type {Boolean}
			 */
			"SetMiniPageVisible": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ChangeMiniPageMode
			 * Message for change mode.
			 * @type {Object}
			 */
			"ChangeMiniPageMode": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message HistoryStateChanged
			 */
			"HistoryStateChanged": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * Returns minipage schema name.
		 * @param {String} entityName Entity name.
		 * @param {String} typeId Entity type identifier.
		 * @return {String} Minipage schema name.
		 */
		getSchemaName: function(entityName, typeId) {
			var entitySchemaConfig = Terrasoft.ModuleUtils.getModuleStructureByName(entityName);
			var miniPageSchema = entitySchemaConfig && entitySchemaConfig.miniPageSchema
				? entitySchemaConfig.miniPageSchema
				: null;
			if (!miniPageSchema) {
				miniPageSchema = this.getSchemaNameFromPages(entityName);
			}
			if (entitySchemaConfig && entitySchemaConfig.attribute) {
				Terrasoft.each(entitySchemaConfig.pages, function(item) {
					if (typeId && item.UId === typeId && item.miniPageSchema) {
						miniPageSchema = item.miniPageSchema;
						return false;
					}
				}, this);
			}
			return miniPageSchema;
		},

		/**
		 * Returns minipage schema name from module structure pages.
		 * @private
		 * @param {String} entityName Entity name.
		 * @return {String} Minipage schema name from module structure pages.
		 */
		getSchemaNameFromPages: function(entityName) {
			var miniPageSchema = null;
			var entitySchemaConfig = Terrasoft.ModuleUtils.getModuleStructureByName(entityName);
			if (!entitySchemaConfig) {
				return miniPageSchema;
			}
			Terrasoft.each(entitySchemaConfig.pages, function(item) {
				if (item.miniPageSchema) {
					miniPageSchema = item.miniPageSchema;
					return false;
				}
			}, this);
			return miniPageSchema;
		},

		/**
		 * Generates module identifier.
		 * @param {String} schemaName Entity schema name.
		 * @return {String} Module identifier.
		 */
		getModuleId: function(schemaName) {
			return this.sandbox.id + "_MiniPage_" + schemaName;
		},

		/**
		 * Removes title attribute from target Url.
		 * @param {String} targetId Target Url Id.
		 */
		removeElementTitle: function(targetId) {
			var target = Ext.get(targetId);
			if (target && target.dom) {
				target.dom.setAttribute("title", "");
			}
		},

		/**
		 * Init ViewModel for MiniPageContainer.
		 * @param {Object} config Configuration information.
		 * @param {String} config.floatTo Id of element relative to which the positioning
		 * will be applied.
		 * @param {Object} config.parameters parameter object.
		 * @param {String} config.parameters.entitySchemaName Entity schema name.
		 * @param {String} config.parameters.primaryColumnValue Unique entity identifier.
		 */
		init: function(config) {
			var parameters = this.get("parameters");
			if (this.get("Visible") && parameters) {
				if (parameters.entitySchemaName === this._getEntitySchemaName(config)) {
					var sameRecord = parameters.primaryColumnValue === config.parameters.primaryColumnValue;
					if (sameRecord && this.floatTo === config.floatTo) {
						this.clearTimer(this.leaveTimerId);
						return;
					}
				}
			}
			this.clearTimer([this.leaveTimerId, this.showTimerId]);
			this.unLoadModule();
			this.prepareContainerParameters(config);
			this.removeElementTitle(config.floatTo);
			this.setSchemaParametersInfo(config);
			this.processLoadModule();
		},

		/**
		 * @private
		 */
		_getEntitySchemaName: function(config) {
			var parameters = config.parameters;
			return parameters ? parameters.entitySchemaName : null;
		},

		/**
		 * Processes mini page loading.
		 * @private
		 */
		processLoadModule: function() {
			var parameters = this.get("parameters");
			if (parameters && parameters.entitySchemaName && parameters.schemaName) {
				this.needLoadModule = true;
				var delay = Ext.isNumber(parameters.showDelay) ? parameters.showDelay : this.showMiniPageDelay;
				this.showTimerId = Ext.Function.defer(function() {
					if (this.needLoadModule) {
						this.set("Visible", true);
						this.showTimerId = null;
						this.loadModule();
					}
				}, delay, this, arguments);
			}
		},

		/**
		 * Init ViewModel for MiniPageContainer.
		 * @param {Object} config Configuration information.
		 * @param {Object} config.parameters parameter object.
		 * @param {String} config.parameters.entitySchemaName Entity schema name.
		 * @param {String} config.parameters.primaryColumnValue Unique entity identifier.
		 * @param {Number} config.showDelay Show MiniPage delay in ms.
		 * @param {String} config.moduleId Module id.
		 * @private
		 */
		setSchemaParametersInfo: function(config) {
			var entitySchemaName = this._getEntitySchemaName(config);
			var schemaName = config.miniPageSchemaName || this.getSchemaName(entitySchemaName);
			if (entitySchemaName && schemaName) {
				var parameters = Ext.apply({
					schemaName: schemaName,
					entitySchemaName: entitySchemaName,
					showDelay: config.showDelay,
					moduleId: config.moduleId,
					rowId: config.rowId,
					isSectionGrid: config.isSectionGrid,
					miniPageSourceSandboxId: config.miniPageSourceSandboxId
				}, config.parameters);
				this.set("parameters", parameters);
			}
		},

		/**
		 * Prepares container view model parameters.
		 * @private
		 * @param {Object} config Configuration information.
		 * @param {String} config.floatTo Id of element relative to which the positioning will be applied.
		 * @param {String} config.operation Mini page operation.
		 * @param {Array} config.valuePairs Entity default values.
		 * @param {Boolean} config.isFixed True if mini page need be fixed.
		 */
		prepareContainerParameters: function(config) {
			this.alignToElId = this.floatTo = config.floatTo;
			this.miniPageMode = config.operation || Terrasoft.ConfigurationEnums.CardOperation.VIEW;
			this.defaultValues = config.valuePairs;
			this.isFixed = config.isFixed;
		},

		/**
		 * @private
		 */
		_setBodyMiniPageCls: function(isOpened) {
			var bodyEl = Ext.getBody();
			isOpened ? bodyEl.addCls("ts-minipage-opened") : bodyEl.removeCls("ts-minipage-opened");
		},

		/**
		 * Unload MiniPageModule.
		 */
		unLoadModule: function() {
			var parameters = this.get("parameters");
			if (parameters) {
				this._setBodyMiniPageCls(false);
				var moduleId = parameters.moduleId || this.getModuleId(parameters.schemaName);
				this.unRegisterMessages();
				this.sandbox.unloadModule(moduleId);
			}
		},

		/**
		 * Load MiniPageModule.
		 */
		loadModule: function() {
			var parameters = this.get("parameters");
			var moduleId = parameters.moduleId || this.getModuleId(parameters.schemaName);
			this.registerMessages();
			this.subscribeOnMessages(moduleId);
			this.sandbox.loadModule("MiniPageModule", {
				renderTo: "MiniPageContainer",
				id: moduleId,
				parameters: parameters
			});
		},

		/**
		 * Register MiniPageContainer messages.
		 */
		registerMessages: function() {
			if (this.messages) {
				this.sandbox.registerMessages(this.messages);
			}
		},

		/**
		 * Subscribes on MiniPageContainer messages.
		 * @param {String} moduleId Module identifier.
		 */
		subscribeOnMessages: function(moduleId) {
			this.sandbox.subscribe("GetAlignToEl", this.getAlignElement, this, [moduleId]);
			this.sandbox.subscribe("GetMiniPageDefaultValues", this.getMiniPageDefaultValues, this, [moduleId]);
			this.sandbox.subscribe("GetMiniPageOperation", this.getMiniPageMode, this, [moduleId]);
			this.sandbox.subscribe("CloseMiniPage", this.closeMiniPage, this, [moduleId]);
			this.sandbox.subscribe("SetMiniPageVisible", this.setMiniPageVisible, this, [moduleId]);
			this.sandbox.subscribe("ChangeMiniPageMode", this.processMiniPageModeChanging, this, [moduleId]);
			this.sandbox.subscribe("HistoryStateChanged", function() {
				const isViewMode = this._isMiniPageMode(Terrasoft.ConfigurationEnums.CardOperation.VIEW);
				if (isViewMode) {
					this.closeMiniPage();
				}
			}, this);
		},

		/**
		 * Set mini page visibility attribute and toggle body mini page css class.
		 * @param {Boolean} isVisible Is mini page visible tag.
		 */
		setMiniPageVisible: function(isVisible) {
			isVisible = Boolean(isVisible);
			this.$Visible = isVisible;
			this._setBodyMiniPageCls(isVisible);
		},

		/**
		 * Gets align element identifier.
		 * @private
		 * @return {String} Align element identifier.
		 */
		getAlignElement: function() {
			return this.alignToElId;
		},

		/**
		 * Gets mini page mode.
		 * @private
		 * @return {String} Mini page mode.
		 */
		getMiniPageMode: function() {
			return this.miniPageMode;
		},

		/**
		 * @private
		 * @param {Terrasoft.ConfigurationEnums.CardOperation} mode
		 * @return {Boolean}
		 */
		_isMiniPageMode: function(mode) {
			return this.miniPageMode === mode;
		},

		/**
		 * Gets mini page default values.
		 * @private
		 * @return {Array} Mini page default values.
		 */
		getMiniPageDefaultValues: function() {
			return this.defaultValues;
		},

		/**
		 * Process mini page mode changing.
		 * @param {String} mode Mode caption.
		 * @private
		 */
		processMiniPageModeChanging: function(mode) {
			this._setBodyMiniPageCls(true);
			switch (mode) {
				case Terrasoft.ConfigurationEnums.CardOperation.EDIT:
				case Terrasoft.ConfigurationEnums.CardOperation.ADD:
					this.isFixed = true;
					Terrasoft.MiniPageListener.unSubscribeFixedGlobalEvents(this);
					break;
				default:
					break;
			}
		},

		/**
		 * Unregister MiniPageContainer messages.
		 */
		unRegisterMessages: function() {
			if (this.messages) {
				var messages = Terrasoft.keys(this.messages);
				this.sandbox.unRegisterMessages(messages);
			}
		},

		/**
		 * Hides MiniPageContainer.
		 */
		hide: function() {
			this.unLoadModule();
			this.set("Visible", false);
		},

		/**
		 * Event handler for child element mouseleave event.
		 * @param {Object} event Event object.
		 */
		childElMouseLeave: function(event) {
			this.needLoadModule = false;
			this.alignToElId = null;
			var container = Ext.get("MiniPageContainer");
			if (container && !container.contains(event.relatedTarget)) {
				this.leaveTimerId = Ext.Function.defer(function() {
					this.leaveTimerId = null;
					this.hide();
				}, this.hideMiniPageDelay, this, arguments);
			}
			this.clearTimer(this.showTimerId);
		},

		/**
		 * Event handler for align element mouseover event.
		 */
		childElMouseOver: function() {
			this.clearTimer(this.leaveTimerId);
		},

		/**
		 * Event handler for MiniPageContainer mouseleave event.
		 * @param {Object} event Event object.
		 */
		mouseLeave: function(event) {
			this.tryCloseMiniPage.call(this, event);
		},

		/**
		 * Event handler for MiniPageContainer wheel event.
		 * @param {Object} event Event object.
		 */
		mouseWheel: function(event) {
			this.tryCloseMiniPage.call(this, event);
		},

		/**
		 * Closes MiniPage if it's need.
		 * @private
		 * @param {Object} event Event object.
		 */
		tryCloseMiniPage: function(event) {
			var container = Ext.get("MiniPageContainer");
			var isWheelEventType = event.type === "wheel";
			var isNotWithinContainer = !event.within(container);
			var closedCondition = this.isFixed
				? isWheelEventType && isNotWithinContainer
				: !isWheelEventType || (isWheelEventType && isNotWithinContainer);
			if (closedCondition && this.canHide(event)) {
				this.alignToElId = null;
				this.leaveTimerId = Ext.Function.defer(function() {
					this.leaveTimerId = null;
					this.hide();
				}, this.hideMiniPageDelay, this, arguments);
			}
			this.clearTimer(this.showTimerId);
		},

		/**
		 * Event handler for MiniPageContainer mouseDown event.
		 * @private
		 * @param {Object} event Event object.
		 */
		mouseDown: function(event) {
			if (this.isFixed && !this.isClickedOnMiniPageContainer(event) && !this.isClickedOnAlignElement(event)) {
				this.alignToElId = null;
				if (this.canHide(event)) {
					this.hide();
					Terrasoft.MiniPageListener.unSubscribeGlobalEvents(this);
				}
			}
		},

		/**
		 * Returns true if event triggered on MiniPageContainer.
		 * @private
		 * @param {Object} event Event object.
		 * @return {Boolean} True if event triggered on MiniPageContainer.
		 */
		isClickedOnMiniPageContainer: function(event) {
			var container = Ext.get("MiniPageContainer");
			return event.within(container);
		},

		/**
		 * Returns true if event triggered on MiniPage align element.
		 * @private
		 * @param {Object} event Event object.
		 * @return {Boolean} True if event triggered on MiniPage align element.
		 */
		isClickedOnAlignElement: function(event) {
			return (this.alignToElId && event.within(this.alignToElId));
		},

		/**
		 * Closes MiniPage.
		 * @protected
		 */
		closeMiniPage: function() {
			this.alignToElId = null;
			this.hide();
		},

		/**
		 * Event handler for document keyPress event.
		 * @private
		 * @param {Object} event Event object.
		 */
		keyPress: function(event) {
			if (event && event.keyCode === Ext.EventObject.ESC) {
				this.closeMiniPage();
				Terrasoft.MiniPageListener.unSubscribeGlobalEvents(this);
			}
		},

		/**
		 * Check MiniPageContainer ability to hide.
		 * @param {Object} event Event object.
		 * @return {Boolean} Ability to hide.
		 */
		canHide: function(event) {
			var relatedEl = Ext.get(event.relatedTarget || event.target);
			var isMenuEl = this.hasElementInSelector(relatedEl, "#" + this.menuElId);
			var isAlignEl = this.hasElementInSelector(relatedEl, "#" + this.alignToElId);
			var isListViewEl = this.hasElementInSelector(relatedEl, "." + this.listViewClassName);
			var isTipEl = this.hasElementInSelector(relatedEl, "." + this.tipClassName);
			var isDateTimeEl = this.hasElementInSelector(relatedEl, "." + this.datePickerClass);
			this.needLoadModule = false;
			if (isMenuEl) {
				Terrasoft.MiniPageListener.subscribeMenuContainerEvents(this.isFixed);
			}
			return (!isAlignEl && !isMenuEl && !isListViewEl && !isTipEl && !isDateTimeEl && !this.isListViewEvent(event));
		},

		/**
		 * Check if selector contains element.
		 * @protected
		 * @param {Object} element Element object.
		 * @param {String} selector Selector path.
		 */
		hasElementInSelector: function(element, selector) {
			return (element && (element.is(selector) || !Ext.isEmpty(element.parent(selector))));
		},

		/**
		 * Check if event happened on list view.
		 * @param {Object} event Event object.
		 * @return {Boolean} True - if event happend on list view.
		 */
		isListViewEvent: function(event) {
			return (event && event.currentTarget && event.currentTarget.classList &&
				event.currentTarget.classList.contains(this.listViewClassName));
		},

		/**
		 * Event handler for MiniPageContainer mouseover event.
		 */
		mouseOver: function() {
			this.clearTimer(this.leaveTimerId);
		},

		/**
		 * Clear timer by Id.
		 * @param {String|Array} timers to clear.
		 */
		clearTimer: function(timers) {
			timers = Ext.isArray(timers) ? timers : [timers];
			Terrasoft.each(timers, function(timerId) {
				if (timerId) {
					clearTimeout(timerId);
				}
			}, this);
		}

	});
});



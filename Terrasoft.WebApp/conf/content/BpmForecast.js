Terrasoft.configuration.Structures["BpmForecast"] = {innerHierarchyStack: ["BpmForecast"]};
define("BpmForecast", function() {
	/**
	 * Component for rendering bpm-forecast web components
	 */
	Ext.define("Terrasoft.control.BpmForecast", {
		extend: "Terrasoft.controls.Component",
		alternateClassName: "Terrasoft.BpmForecast",

		forecastId: null,
		command: null,
		periodsId: null,
		baseUrl: null,
		imagesList: null,
		maxDisplayedRecords: null,
		domAttributes: [],

		styles: {},
		parentComponent: Ext.emptyString,

		/**
		 * Wait timespan from resize.
		 * @type {Number}
		 * @private
		 */
		_wait: 250,

		/**
		 * @inheritDoc Terrasoft.Component#tpl
		 * @override
		 */
		tpl: [
			/*jshint white:false */
			/*jshint quotmark:true */
			//jscs:disable
			'<div id=\"{id}-wrap\" style=\"{styles}\">',
			'<bpm-forecast id=\"{id}\" forecast-id = \"{forecastId}\" command = \"{command}\"',
			'base-url = \"{baseUrl}\" periods-id=\"{periodsId}\" images=\"{imagesList}\"',
			'max-displayed-records="{maxDisplayedRecords}">',
			'</bpm-forecast>',
			'</div>',
			//jscs:enable
			/*jshint quotmark:false */
			/*jshint white:true */
		],

		/**
		 * @inheritDoc Terrasoft.Component#getSelectors
		 * @override
		 */
		getSelectors: function() {
			return {
				wrapEl: "#" + this.id + "-wrap",
				bpmForecastEl: "#" + this.id
			};
		},

		/**
		 * @inheritDoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"commandFinished",
				"addColumnClicked",
				"editColumnClicked"
			);
			this.updateDirection(this.name);
			this._setStyles();
		},

		/**
		 * Sets styles.
		 * @private
		 */
		_setStyles: function() {
			const height = this.getCalculatedWrapHeight();
			if (height === 0) {
				return;
			}
			const styles = {
				height: height + "px"
			};
			Ext.apply(this.styles, styles);
		},

		/**
		 * Returns calculated wrap height.
		 * @return {Number} Calculated height.
		 */
		getCalculatedWrapHeight: function() {
			const component = Ext.getCmp(this.parentComponent);
			if (!component) {
				return 0;
			}
			let adjustmentValue = 10;
			if (Terrasoft.isDebug) {
				adjustmentValue = 0;
			}
			const el = component.getWrapEl().dom || {};
			const style = window.getComputedStyle(el, null) || {};
			const topOffset = el.offsetTop || 0;
			const marginTopOffset = parseInt(style.marginTop || 0);
			const bottomOffset = Ext.getScrollbarSize().height || 0;
			const body = Ext.getBody();
			return body.getHeight() - topOffset - marginTopOffset - bottomOffset - adjustmentValue;
		},

		/**
		 * @inheritDoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			const el = this.bpmForecastEl;
			if (el) {
				el.on("commandFinished", this.onCommandFinished, this);
				el.on("addColumnClick", this.handleAddColumnClick, this);
				el.on("editColumnClick", this.handleEditColumnClick, this);
			}

			this.debounceWindowResize = Terrasoft.debounce(this.updateWrapHeight, this._wait);
			Ext.EventManager.addListener(window, "resize", this.debounceWindowResize, this);
		},

		/**
		 * Updates wrap container height.
		 */
		updateWrapHeight: function() {
			const height = this.getCalculatedWrapHeight();
			if (height === 0) {
				return;
			}
			this.wrapEl.setStyle("height", height + "px");
		},

		/**
		 * Handles clicking on "add column" button.
		 * @param {Object} event Event data.
		 * @protected
		 */
		handleAddColumnClick: function(event) {
			this.fireEvent("addColumnClicked", event);
		},

		/**
		 * Handles clicking on "edit column" button.
		 * @param {Object} event Event data.
		 * @protected
		 */
		handleEditColumnClick: function(event) {
			const columnData = event.browserEvent.detail.column;
			this.fireEvent("editColumnClicked", event, columnData);
		},

		/**
		 * @inheritDoc Terrasoft.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			const el = this.bpmForecastEl;
			if (el) {
				el.un("commandFinished", this.onCommandFinished, this);
				el.un("addColumnClick", this.handleAddColumnClick, this);
				el.un("editColumnClick", this.handleEditColumnClick, this);
			}
			Ext.EventManager.removeListener(window, "resize", this.debounceWindowResize, this);
		},

		/**
		 * Handler of command finished.
		 * @protected
		 */
		onCommandFinished: function(event) {
			this.fireEvent("commandFinished", event);
		},

		/**
		 * @inheritDoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			const tplData = this.callParent(arguments);
			this.selectors = this.getSelectors();
			const forecastTplData = {
				forecastId: this.forecastId,
				command: this.command,
				periodsId: this.periodsId,
				baseUrl: this.baseUrl,
				imagesList: this.imagesList,
				styles: this.styles,
				maxDisplayedRecords: this.maxDisplayedRecords
			};
			Ext.apply(tplData, forecastTplData);
			return tplData;
		},

		/**
		 * @inheritDoc Terrasoft.Component#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			const bindConfig = this.callParent(arguments);
			const forecastBindConfig = {
				forecastId: {
					changeMethod: "setForecastId"
				},
				command: {
					changeMethod: "setCommand"
				},
				periodsId: {
					changeMethod: "setPeriodsId"
				},
				baseUrl: {
					changeMethod: "setBaseUrl"
				},
				imagesList: {
					changeMethod: "setImagesList"
				},
				maxDisplayedRecords: {
					changeMethod: "setMaxDisplayedRecords"
				}
			};
			Ext.apply(forecastBindConfig, bindConfig);
			return forecastBindConfig;
		},

		/**
		 * Sets forecast identifier.
		 * @param {String} forecastId Forecast identifier.
		 */
		setForecastId: function(forecastId) {
			if (this.forecastId === forecastId || Ext.isEmpty(forecastId)) {
				return;
			}
			this.forecastId = forecastId;
			this._setAttribute("forecast-id", this.forecastId);
		},

		/**
		 * Sets command.
		 * @param {String} command Command.
		 */
		setCommand: function(command) {
			if (this.command === command) {
				return;
			}
			this.command = command;
			this._setAttribute("command", this.command);
		},

		/**
		 * Sets periods identifiers.
		 * @param {String} periodsId Periods identifiers.
		 */
		setPeriodsId: function(periodsId) {
			if (this.periodsId === periodsId) {
				return;
			}
			this.periodsId = periodsId;
			this._setAttribute("periods-id", this.periodsId);
		},

		/**
		 * Sets base url.
		 * @param {String} baseUrl Base url.
		 */
		setBaseUrl: function(baseUrl) {
			if (this.baseUrl === baseUrl || Ext.isEmpty(baseUrl)) {
				return;
			}
			this.baseUrl = baseUrl;
			this._setAttribute("base-url", this.baseUrl);
		},

		/**
		 * Sets maximum displayed records.
		 * @param {Number} maxDisplayedRecords Maximum displayed records.
		 */
		setMaxDisplayedRecords: function(maxDisplayedRecords) {
			if (this.maxDisplayedRecords === maxDisplayedRecords || Ext.isEmpty(maxDisplayedRecords)) {
				return;
			}
			this.maxDisplayedRecords = maxDisplayedRecords;
			this._setAttribute("max-displayed-records", this.maxDisplayedRecords);
		},

		/**
		 * Sets images list.
		 * @param {String} imagesList List of images.
		 */
		setImagesList: function(imagesList) {
			if (this.imagesList === imagesList || Ext.isEmpty(imagesList)) {
				return;
			}
			this.imagesList = Terrasoft.encodeHtml(Terrasoft.encode(imagesList));
			this._setAttribute("images", this.imagesList);
		},

		/**
		 * @private
		 */
		_setAttribute: function(name, value) {
			if (this.rendered) {
				this.bpmForecastEl.dom.setAttribute(name, value);
			}
		}

	});

	return Terrasoft.BpmForecast;

});



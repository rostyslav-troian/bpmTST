/**
 * Predictable control icon for {@link Terrasoft.BaseEdit}.
 */
Ext.define("Terrasoft.controls.mixins.PredictableIcon", {
	alternateClassName: "Terrasoft.PredictableIcon",

	/**
	 * Prepare predictable list values event name.
	 * @private
	 * @type {String}
	 */
	_preparePredictableListEventName: "preparePredictableList",

	/**
	 * Predictable state.
	 * @protected
	 * @type {Object}
	 * @param {String} predictableState.state Enum Terrasoft.PredictableState.
	 * @param {String} predictableState.value Predictable value.
	 */
	predictableState: {
		state: Terrasoft.PredictableState.INPROGRESS,
		value: ""
	},

	/**
	 * Predictable control wrap class.
	 * @protected
	 * @type {String}
	 */
	predictableWrapClass: "predictable-edit",

	/**
	 * Predictable icon template.
	 * @protected
	 */
	predictableIconTpl: "<div id=\"{id}-predictable-icon\" " +
		"class=\"predictable-icon\" state=\"{predictableState}\"></div>",

	/**
	 * Predictable list view item template.
	 * @protected
	 */
	predictableListViewItemTpl: "<span class=\"predictable-display-value cignificance-{2}\">" +
		"{0}</span><span class=\"predictable-value\">{1}</span>",

	/**
	 * Predictable icon element.
	 * @protected
	 * @type {Ext.dom.Element}
	 */
	predictableIconEl: null,

	/**
	 * Initializes predictable icon events.
	 */
	init: function() {
		this.addEvents(this._preparePredictableListEventName);
	},

	/**
	 * On predictable icon click event handler.
	 * @protected
	 */
	onPredictableIconClick: function() {
		if (!this.enabled || this.readonly
				|| this.predictableState.state === Terrasoft.PredictableState.INPROGRESS) {
			return;
		}
		this.destroyPredictableListView();
		this.createPredictableListView();
		this.expandList(null, this._preparePredictableListEventName);
	},

	/**
	 * Creates predictable list view.
	 * @protected
	 */
	createPredictableListView: function() {
		this.listView = this.createListView();
		this.listView.on("listViewItemRender", this.onPredictableListViewItemRender, this);
		this.listView.on("hide", this.onHidePredictableList, this);
	},

	/**
	 * Change predictable state by value.
	 * @param {Object} value Selected element properties.
	 */
	valueChanged: function(value) {
		if (!this.enablePredictableIcon) {
			return;
		}
		const predictableValue = (this.predictableState.value || "").toLowerCase();
		const itemValue = value && value.value;
		if (!Ext.isEmpty(predictableValue) && !Terrasoft.isEmptyGUID(predictableValue)) {
			this.setPredictableState({
				value: predictableValue,
				state: predictableValue !== itemValue
					? Terrasoft.PredictableState.NOTEXACT
					: Terrasoft.PredictableState.EXACT
			});
		}
	},

	/**
	 * On hide predictable list event handler.
	 * @protected
	 */
	onHidePredictableList: function() {
		this.destroyPredictableListView();
	},

	/**
	 * On listViewItemRender event handler. Prepares item custom html.
	 * @protected
	 * @param {Object} listViewItem List view item.
	 */
	onPredictableListViewItemRender: function(listViewItem) {
		var predictableValue = Number(listViewItem.predictableValue * 100).toFixed(0);
		var significance = listViewItem.significance ? listViewItem.significance.toLowerCase() : "";
		listViewItem.customHtml = Ext.String.format(this.predictableListViewItemTpl,
			listViewItem.displayValue, Ext.String.format("{0}%",predictableValue), significance);
	},

	/**
	 * Destroys predictable list view.
	 * @protected
	 */
	destroyPredictableListView: function() {
		if (this.listView) {
			this.listView.destroy();
			this.listView = null;
		}
	},

	/**
	 * Render predictable icon in {@link Terrasoft.BaseEdit}.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Object} renderData Template parameters object.
	 */
	renderPredictableIcon: function(buffer, renderData) {
		var self = renderData.self;
		if (!self.enablePredictableIcon) {
			return;
		}
		var template = new Ext.Template(self.predictableIconTpl);
		var tpl = template.apply({
			id: self.id,
			predictableState: self.predictableState.state
		});
		buffer.push(tpl);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = {
			predictableState: {
				changeMethod: "setPredictableState"
			}
		};
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.getPredictableIconEl().on("click", this.onPredictableIconClick, this);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.getPredictableIconEl().un("click", this.onPredictableIconClick, this);
	},

	/**
	 * Returns predictable icon element.
	 * @protected
	 * @return {Ext.dom.Element} Predictable icon element.
	 */
	getPredictableIconEl: function() {
		var selector = Ext.String.format("#{0}-predictable-icon", this.id);
		this.predictableIconEl = this.predictableIconEl || Ext.select(selector).first();
		return this.predictableIconEl;
	},

	/**
	 * Applies wrap element style.
	 * @protected
	 */
	applyWrapStyles: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		if (this.predictableState.state === Terrasoft.PredictableState.INPROGRESS) {
			wrapEl.removeCls(this.predictableWrapClass);
		} else {
			wrapEl.addCls(this.predictableWrapClass);
		}
	},

	/**
	 * Sets predictable state value.
	 * @param {Object} value Predictable state value.
	 * @param {String} value.state Enum Terrasoft.PredictableState.
	 * @param {String} value.value Predictable value.
	 */
	setPredictableState: function(value) {
		if (Ext.isEmpty(value) || Ext.Object.equals(this.predictableState, value)) {
			return;
		}
		this.predictableState = value;
		var predictableIcon = this.getPredictableIconEl();
		if (Ext.isEmpty(predictableIcon)) {
			return;
		}
		predictableIcon.set({state: this.predictableState.state});
		this.applyWrapStyles();
	}

});

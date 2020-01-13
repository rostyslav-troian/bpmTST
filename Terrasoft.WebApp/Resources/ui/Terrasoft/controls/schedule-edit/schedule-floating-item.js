/**
 * Class for pop-up windows in the schedule
 */
Ext.define("Terrasoft.controls.ScheduleFloatingItem.ScheduleFloatingItem", {

	alternateClassName: "Terrasoft.ScheduleFloatingItem",

	extend: "Terrasoft.Component",

	/**
  * Title of the task quick add window (pop-up summary)
  * @type {String}
  */
	caption: "",

	/**
  * Link to Ext.Element that receives the contents of the task quick add window (pop-up summary)
  * @protected
  * @type {Ext.dom.Element}
  */
	contentEl: null,

	/**
  * The value of the width of the window to quickly add a task in pixels
  * @protected
  * @type {Number}
  */
	width: 320,

	/**
  * Link to the calendar object {Terrasoft.ScheduleEdit}
  * @protected
  * @type {Object}
  */
	scheduleEdit: null,

	/**
	 * @inheritdoc Terrasoft.Component#styles
	 */
	styles: {
		wrapElStyle: {}
	},

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 */
	/* jshint quotmark:false */
	tpl: [
		'<div id="{id}-schedule-floating-item" class="schedule-floating-item schedule-item" style="{wrapElStyle}">',
		'<div id="{id}-header" class="scheduler-item-caption">',
		'<label id="{id}-caption">{caption}</label>',
		'</div>',
		'<div id="{id}-content" class="content"></div>',
		'</div>'
	],
	/* jshint quotmark:true */

	/**
	 * @inheritdoc Terrasoft.Component#init
	 */
	init: function() {
		var id = this.id;
		this.selectors = {
			wrapEl: "#" + id + "-schedule-floating-item",
			captionEl: "#" + id + "-caption",
			contentEl: "#" + id + "-content"
		};
		this.addEvents(
			/**
    * Activity container display event
    * @event
    */
			"ready"
		);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 */
	initDomEvents: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.on("click", this.onClick, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(this.styles.wrapElStyle, {
			width: this.width + "px",
			"margin-left": "-" + Math.floor(this.width / 2) + "px"
		});
		Ext.apply(tplData, {
			caption: Terrasoft.encodeHtml(this.caption)
		});
		return tplData;
	},

	/**
  * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
  * @protected
  */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var floatingItemBindConfig = {
			caption: {
				changeMethod: "setCaption"
			},
			width: {
				changeMethod: "setWidth"
			}
		};
		Ext.apply(floatingItemBindConfig, bindConfig);
		return floatingItemBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.fireEvent("ready", this, this.contentEl.id);
	},

	/**
  * Handles the click event on #wrapEl.
  * @param event Event object.
  */
	onClick: function(event) {
		event.stopEvent();
	},

	/**
  * Updates the width of the Quick Add Task window Terrasoft.ScheduleFloatingItem#width
  * @param {Number} width in px
  */
	setWidth: function(width) {
		if (this.width === width) {
			return;
		}
		if (this.rendered) {
			var wrapEl = this.getWrapEl();
			wrapEl.setStyle({
				width: width + "px",
				"margin-left": "-" + Math.floor(width / 2) + "px"
			});
		}
		this.width = width;
	},

	/**
  * Updates the header parameter for the Quick Add Task window Terrasoft.ScheduleFloatingItem#caption
  * @param {String} caption the header value
  */
	setCaption: function(caption) {
		if (this.caption === caption) {
			return;
		}
		if (this.rendered) {
			this.captionEl.dom.innerHTML = Terrasoft.encodeHtml(caption);
		}
		this.caption = caption;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onDestroy
	 */
	onDestroy: function() {
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.un("click", this.onClick, this);
		}
		this.callParent(arguments);
	}

});
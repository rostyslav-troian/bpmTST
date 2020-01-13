Terrasoft.configuration.Structures["TimelineFilterMenuItem"] = {innerHierarchyStack: ["TimelineFilterMenuItem"]};
define("TimelineFilterMenuItem", ["css!TimelineFilterMenuItem"], function() {
	Ext.define("Terrasoft.controls.TimelineFilterMenuItem", {
		extend: "Terrasoft.MenuItem",
		alternateClassName: "Terrasoft.TimelineFilterMenuItem",

		// region Fields: Private

		/**
		 * Checkbox element.
		 * @private
		 * @type {Terrasoft.Component}
		 */
		_checkboxControl: null,

		// endregion

		// region Fields: Public

		/**
		 * Menu item selection.
		 * @type {Boolean}
		 */
		checked: false,

		/**
		 * Base CSS class for menu item.
		 * @type {String}
		 */
		baseMenuItemClass: "timeline-filter-menu-item",

		/**
		 * CSS class for left wrap menu item.
		 * @type {String}
		 */
		baseLeftWrapClass: "timeline-filter-menu-item-left-wrap",

		/**
		 * CSS class for right wrap menu item.
		 * @type {String}
		 */
		baseRightWrapClass: "timeline-filter-menu-item-right-wrap",

		/**
		 * CSS class for menu item image.
		 * @type {String}
		 */
		baseMenuItemImageClass: "timeline-filter-menu-item-image",

		/**
		 * Menu item image.
		 * @type {String}
		 */
		imageUrl: null,

		// endregion

		// region Fields: Protected

		/**
		 * Layout markup template of the control.
		 * @type {Array}
		 */
		/*jshint white:false */
		/*jshint quotmark: false*/
		tpl: [
			'<li id="{id}" class="{itemClass}" style="{itemStyle}"<tpl if="direction"> dir="{direction}"</tpl>>',
				'<div id="{leftWrapId}" class="{leftWrapClass}" style="{leftWrapStyle}">',
					'{%this.renderCheckboxControl(out, values)%}',
					'<tpl if="hasImage">',
						'<span id="{imageId}" class="{imageClass}" style="{imageStyle}"></span>',
					'</tpl>',
					'{caption}',
					'<tpl if="showProgress">',
						'{%this.renderLoadingProgress(out, values)%}',
					'</tpl>',
					'<tpl if="showArrow && !showProgress">',
					'	<span id="{arrowId}" class="{arrowClass}" style="{arrowStyle}">',
							'<span class="{markerClass}"></span>',
						'</span>',
					'</tpl>',
				'</div>',
				'<div id="{rightWrapId}" class="{rightWrapClass}" style="{rightWrapStyle}">',
				'</div>',
			'</li>'
		],
		/*jshint white:true */
		/*jshint quotmark: true*/

		// endregion

		// region Methods: Protected

		/**
		 * @inheritDoc Terrasoft.MenuItem#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			tplData.renderCheckboxControl = this.renderCheckboxControl;
			tplData.leftWrapId = this.id + "-menu-item-left-wrap";
			tplData.leftWrapClass = [this.baseLeftWrapClass];
			tplData.rightWrapId = this.id + "-menu-item-right-wrap";
			tplData.rightWrapClass = [this.baseRightWrapClass];
			this.tplData = tplData;
			return tplData;
		},

		/**
		 * @inheritDoc Terrasoft.BaseMenuItem#prepareTplDataStylesAndClasses
		 * @override
		 */
		prepareTplDataStylesAndClasses: function(tplData) {
			this.callParent(arguments);
			var imageUrl = this.imageUrl;
			if (imageUrl) {
				tplData.imageStyle.push("background-image: url(" + imageUrl + ");");
				tplData.hasImage = true;
			}
		},

		/**
		 * @inheritDoc Terrasoft.MenuItem#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.createCheckboxControl();
		},

		/**
		 * Used for rendering checkbox control in base template.
		 * @protected
		 * @param {String[]} buffer HTML buffer.
		 * @param {Object} renderData Configuration object.
		 */
		renderCheckboxControl: function(buffer, renderData) {
			var self = renderData.self;
			var control = self._checkboxControl;
			var html = control.generateHtml();
			Ext.DomHelper.generateMarkup(html, buffer);
		},

		/**
		 * Creates checkbox control instance.
		 * @protected
		 */
		createCheckboxControl: function() {
			this._checkboxControl = Ext.create("Terrasoft.CheckBoxEdit", {
				checked: this.checked
			});
			this._checkboxControl.added(this);
			this._checkboxControl.on("checkedchanged", this.setChecked.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.BaseMenuItem#onItemClick
		 * @override
		 */
		onItemClick: function() {
			var parentMenu = this.parentMenu;
			parentMenu.focusMenuTree();
			if (this.isInteractive) {
				this.process();
			}
		},

		/**
		 * @inheritDoc Terrasoft.MenuItem#bind
		 * @override
		 */
		bind: function() {
			this.callParent(arguments);
			this._checkboxControl.bind(this.model);
		},

		/**
		 * Sets the flag value.
		 * @protected
		 * @param {Boolean} checked New value of flag.
		 */
		setChecked: function(checked) {
			if (this.checked === checked) {
				return;
			}
			this._checkboxControl.setChecked(checked);
			this.checked = checked;
			this.fireEvent("checkedchanged", checked, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseMenuItem#onClick
		 * @override
		 */
		onClick: function(event) {
			if (!this.enabled) {
				return;
			}
			event.stopPropagation();
			this.setChecked(!this.checked);
			this.fireEvent("click", this.id, this.checked);
		},

		/**
		 * @inheritDoc Terrasoft.MenuItem#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var checkBoxBindConfig = {
				checked: {
					changeEvent: "checkedchanged",
					changeMethod: "setChecked"
				}
			};
			Ext.apply(checkBoxBindConfig, bindConfig);
			return checkBoxBindConfig;
		}

		// endregion

	});
});



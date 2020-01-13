Terrasoft.configuration.Structures["DynamicContentBlock"] = {innerHierarchyStack: ["DynamicContentBlock"]};
Ext.define("Terrasoft.controls.DynamicContentBlock", {
	extend: "Terrasoft.controls.ContentBlock",
	alternateClassName: "Terrasoft.DynamicContentBlock",

	/**
	 * Hidden block style class.
	 * @protected
	 * @type {String}
	 */
	hiddenClass: "t-content-block-hide",

	/**
	 * True when block selected in group.
	 * @protected
	 * @type {Boolean}
	 */
	isActive: true,

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.addHiddenClass(tplData);
		tplData.caption = this.caption;
		return tplData;
	},

	/**
	 * Adds hidden class to component classes.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 */
	addHiddenClass: function(tplData) {
		if (!this.isActive) {
			tplData.wrapClassName.push(this.hiddenClass);
		}
	},

	/**
	 * @inheritdoc Terrasoft.ContentBlock#renderGroupMenu
	 * @override
	 */
	renderGroupMenu: function(buffer, block) {
		var groupMenu = block.groupMenu;
		if (groupMenu) {
			var html = groupMenu.generateHtml();
			buffer.push(html);
		}
	},

	/**
	 * @inheritdoc Terrasoft.ContentBlock#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.groupMenu = this.groupMenu;
	},

	/**
	 * @inheritdoc Terrasoft.ContentBlock#applyBlockBindConfig
	 * @override
	 */
	applyBlockBindConfig: function(bindConfig) {
		this.callParent(arguments);
		Ext.apply(bindConfig, {
			isActive: {
				changeMethod: "setActive"
			},
			caption: {
				changeMethod: "setCaption"
			}
		});
	},

	/**
	 * Reloads block group menu.
	 * @protected
	 */
	reloadGroupMenu: function() {
		this.groupMenu.bindMenu(this.model);
	},

	/**
	 * Sets the indicator that the block is active.
	 * @protected
	 * @param {Boolean} isActive The indicator that the block is active.
	 */
	setActive: function(isActive) {
		if (isActive === null || this.isActive === isActive) {
			if (this.rendered) {
				this.reloadGroupMenu();
			}
			return;
		}
		this.isActive = isActive;
		var hiddenClass = this.hiddenClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl && hiddenClass && this.rendered) {
			if (isActive) {
				wrapEl.removeCls(hiddenClass);
				this.reloadGroupMenu();
			} else {
				wrapEl.addCls(hiddenClass);
			}
		}
	},

	/**
	 * Sets the block caption.
	 * @protected
	 * @param {String} caption The block caption.
	 */
	setCaption: function(caption) {
		if (this.caption === caption) {
			return;
		}
		this.caption = caption;
		if (this.rendered) {
			this.reRender();
		}
	}

});



/**
 */
Ext.define("Terrasoft.controls.ColorMenuItem", {
	extend: "Terrasoft.controls.BaseMenuItem",
	alternateClassName: "Terrasoft.ColorMenuItem",

	/**
	 * The value of the selected color.
	 * @private
	 * @type {String}
	 */
	value: "#000000",

	/**
	 * The flag responsible for the color palette display mode. If the flag is selected, the palette is displayed
	 * in a simple mode, in which there are nine colors.
	 * If the flag is unselected - an expanded palette with 36 colors is displayed
	 * @type {Boolean}
	 */
	simpleMode: true,

	/**
	 * CSS class for wrap element of the control element.
	 * @type {String}
	 * @private
	 */
	wrapClass: "ts-menu-color-item",

	/**
	 * CSS class for container element of the control element.
	 * @private
	 * @type {String}
	 */
	containerClass: "ts-menu-color-container",

	/**
	 * CSS class for the palette element of the control
	 * @private
	 * @type {String}
	 */
	paletteClass: "ts-menu-color-palette",

	/**
	 * CSS class for one color item element of the control
	 * @private
	 * @type {String}
	 */
	colorItemClass: "ts-menu-color-color",

	/**
	 * Array of colors for simpleMode mode.
	 * @private
	 * @type {String[]}
	 */
	simpleModeColors: ["#ffffff", "#fff94f", "#98ff49",
		"#4afffa", "#a3c2ff", "#c69bff",
		"#ff7f62", "#ffc659", "#d1d1d1"],

	/**
	 * Array of colors for advanced mode.
	 * @private
	 * @type {String[]}
	 */
	colors: ["#000000", "#999999", "#ffffff", "#dfdfdf",
		"#ef7e63", "#c73920", "#eba793", "#7f2910",
		"#8ecb60", "#589928", "#d1e9bd", "#2c6018",
		"#64b8df", "#3a8bb1", "#d4ebf6", "#286581",
		"#6483c3", "#46639f", "#d1dcf0", "#2b467e",
		"#5bc8c4", "#4ca6a3", "#bfe8e7", "#327b78",
		"#f8d162", "#d3ae46", "#fbe8b2", "#a8882e",
		"#fbad43", "#cc8930", "#fdd6a1", "#a16a1f",
		"#8e8eb7", "#5e5684", "#e1deed", "#3c365b"],

	/**
	 * @private
	 * @type {String[]}
	 * @inheritdoc Terrasoft.BaseMenuItem#tpl
	 */
	tpl: [
		"<li id=\"{id}-menu-color-item\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"<div id=\"{id}-menu-color-item-container\" class=\"{containerClass}\">",
		"<tpl if=\"simpleMode\">",
		"{%this.generateColorPalette(values, out)%}",
		"</tpl>",
		"<tpl if=\"!simpleMode\">",
		"{%this.generateItemsGroupHtml(values, out)%}",
		"</tpl>",
		"</div>",
		"</li>"
	],

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#getTplData
	 */
	getTplData: function() {
		var tplData = {
			id: this.id,
			tabIndex: this.tabIndex,
			generateColorItems: this.generateColorItems,
			simpleMode: this.simpleMode,
			containerClass: this.containerClass,
			paletteClass: this.paletteClass,
			colorItemClass: this.colorItemClass,
			simpleModeColors: this.simpleModeColors,
			colors: this.colors,
			generateItemsHtml: this.generateItemsHtml,
			generateItemsGroupHtml: this.generateItemsGroupHtml,
			generateColorPalette: this.generateColorPalette,
			self: this
		};
		this.updateSelectors();
		tplData.wrapClass = [this.wrapClass];
		return Ext.apply(tplData, tplData);
	},

	/**
	 * Generates a set of palettes in simpleMode mode
	 * @private
	 * @param {Object} values Data set of the template
	 * @param {String []} buffer Template buffer
	 */
	generateColorPalette: function(values, buffer) {
		var id = values.id;
		var colors = values.simpleModeColors;
		var paletteTemplate = "<div id=\"{0}-menu-color-item-palette-{1}\" class=\"{2}\" " +
			"style=\"background-color:{3};\"></div>";
		var result = "";
		for (var i = 1, len = colors.length; i <= len; i += 1) {
			var paletteClass = values.paletteClass;
			var color = colors[i - 1];
			if (color === "#ffffff") {
				paletteClass += " ts-menu-color-cell-IV-white ts-box-sizing";
			}
			result += Terrasoft.getFormattedString(paletteTemplate, id, i, paletteClass, color);
		}
		buffer.push(result);
	},

	/**
	 * Generates a set of palettes in advanced mode
	 * @private
	 * @param {Object} values Data set of the template
	 * @param {String []} buffer Template buffer
	 */
	generateItemsGroupHtml: function(values, buffer) {
		var self = values.self;
		var colors = self.colors;
		var paletteClass = values.paletteClass;
		var groupTemplate = "<div class=\"{0}\">{1}</div>";
		var result = "";
		for (var i = 1, len = colors.length; i < len; i += 4) {
			var itemsHtml = self.getItemsHtml(i);
			result += Terrasoft.getFormattedString(groupTemplate, paletteClass, itemsHtml);
		}
		buffer.push(result);
	},

	/**
	 * Generates markup of cells of one palette
	 * @private
	 * @param {Number} groupIndex palette index
	 * @return {string} html markup
	 */
	getItemsHtml: function(groupIndex) {
		var htmlTemplate = "<div id=\"{0}-menu-color-item-color-{1}\" class=\"{2}\" style=\"{3}\"></div>";
		var result = "";
		var cellClasses = ["ts-menu-color-cell-I", "ts-menu-color-cell-II", "ts-menu-color-cell-III",
			"ts-menu-color-cell-IV"];
		var colors = this.colors;
		var id = this.id;
		for (var i = 0; i < 4; i += 1) {
			var colorIndex = groupIndex + i - 1;
			var colorItemClass = [this.colorItemClass];
			colorItemClass.push(cellClasses[i]);
			if (colors[colorIndex] === "#ffffff") {
				colorItemClass.push("ts-menu-color-cell-IV-white");
				colorItemClass.push("ts-box-sizing");
			}
			var itemStyle = "background:" + colors[colorIndex];
			result += Terrasoft.getFormattedString(htmlTemplate, id, groupIndex + i, colorItemClass.join(" "),
				itemStyle);
		}
		return result;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#updateSelectors
	 */
	updateSelectors: function() {
		var selectors = this.selectors = {};
		selectors.wrapEl = "#" + this.id + "-menu-color-item";
		selectors.containerEl = "#" + this.id + "-menu-color-item-container";
		selectors.el = selectors.wrapEl;
		return selectors;
	},

	/**
	 * @protected
	 * @override
	 * @inheritdoc Terrasoft.BaseMenuItem#initDomEvents
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.wrapEl.un("mouseover", this.onMouseOver, this);
		this.wrapEl.un("mouseout", this.onMouseOut, this);
		var containerEl = this.containerEl;
		containerEl.on("click", this.onColorItemClick, this);
		this.correctParentMenuStyles();
	},

	/**
	 * Corrects the layout of the main menu by adding the required class for this control
	 * @private
	 */
	correctParentMenuStyles: function() {
		var parentMenuClasses = this.parentMenu.wrapEl.dom.getAttribute("class");
		parentMenuClasses += " ts-menu-color";
		this.parentMenu.wrapEl.dom.setAttribute("class", parentMenuClasses);
	},

	/**
	 * The handler for the color picker event
	 * @private
	 * @param {Ext.EventObjectImpl} e Event object
	 */
	onColorItemClick: function(e) {
		var elementId = e.target.id;
		var parseId = elementId.split("-");
		var index = parseId[parseId.length - 1];
		if (parseInt(index, 10)) {
			var selectedColor = (this.simpleMode) ? this.simpleModeColors[index - 1] : this.colors[index - 1];
			this.value = selectedColor;
			this.fireEvent("colorselected", this, selectedColor);
		}
	}
});

/**
 * Representation of the formatter grid cell.
 */
Ext.define("Terrasoft.controls.mixins.GridCellFormatter", {
	alternateClassName: "Terrasoft.GridCellFormatter",

	// region Properties: Private

	/**
	 * Compiled template of the span cell.
	 * @private
	 * @type {Ext.XTemplate}
	 */
	_spanCellXTemplate: null,

	// endregion

	// region Properties: Protected

	/**
	 * Regular expression of the dimensions.
	 * @type {RegExp}
	 * @protected
	 */
	dimensionsPattern: new RegExp("\\d+x\\d+", "i"),

	// endregion

	// region Methods: Private

	/**
	 * Gets column type.
	 * Like "text", "label", "title", "link", caption and etc.
	 * @private
	 * @param {Object} column Column config.
	 * @param {String} [column.type] Type of the column.
	 * @return {String} Type of the column.
	 */
	_getColumnType: function(column) {
		return column.type || "text";
	},

	/**
	 * Gets image of the cell.
	 * @private
	 * @param {Object} data Data.
	 * @param {String} type Type of the column.
	 * @param {String} columnDataKey Key of the column data.
	 * @return {String} Image of the cell.
	 */
	_getCellImage: function(data, type, columnDataKey) {
		const isIconType = Terrasoft.includes(type, "icon") && data.hasOwnProperty(columnDataKey);
		const hasImgExtension = data.hasOwnProperty("keyImgExtension")
			&& data.keyImgExtension.hasOwnProperty(columnDataKey);
		if (hasImgExtension && type !== "label") {
			return data.keyImgExtension[columnDataKey];
		} else {
			if (isIconType) {
				return data[columnDataKey];
			}
		}
		return Terrasoft.emptyString;
	},

	/**
	 * Gets link data.
	 * @private
	 * @param {Object} data Cell data.
	 * @param {String} link Link data key.
	 * @return {Mixed}
	 */
	_getLinkData: function(data, link) {
		if (link && data.hasOwnProperty(link)) {
			return data[link];
		}
		return null;
	},

	/**
	 * Gets hint of the cell.
	 * @private
	 * @param {Mixed} linkData link data.
	 * @param {Object} data Cell data.
	 * @param {String} columnDataKey Key of the column data.
	 * @return {String} Hint value of the cell.
	 */
	_getCellHint: function(linkData, data, columnDataKey) {
		const cellHint = linkData
			? Terrasoft.emptyString
			: data.cellsHintConfig && data.cellsHintConfig[columnDataKey];
		return cellHint;
	},

	/**
	 * Gets compiled template of the span cell.
	 * @private
	 * @return {Ext.XTemplate} Compiled template of the span cell.
	 */
	_getSpanCellXTemplate: function() {
		this._spanCellXTemplate = this._spanCellXTemplate || new Ext.XTemplate(this._spanCellTemplate);
		return this._spanCellXTemplate;
	},

	// endregion

	//region Methods: Protected

	/**
	 * Formats data for a cell.
	 * @protected
	 * @param {Object} cell Cell.
	 * @param {Object} data Data.
	 * @param {Object} column Column configuration.
	 * @param {Object} link Link.
	 * @param {Object} renderOptions Render options.
	 * @return {Number} The amount of data, that was added during the iteration.
	 */
	formatCellContent: function(cell, data, column, link, renderOptions) {
		const columnDataKey = this.getDataKey(column.name, renderOptions.columnBindings);
		const type = this._getColumnType(column);
		const cellData = data[columnDataKey];
		const cellImage = this._getCellImage(data, type, columnDataKey);
		const linkData = this._getLinkData(data, link);
		const cellHint = this._getCellHint(linkData, data, columnDataKey);
		const internalColumn = Ext.Array.contains(this.internalColumns, type);
		if (!cellData && !cellImage && !internalColumn) {
			return 0;
		}
		const config = {
			name: columnDataKey,
			cellData: cellData,
			cellImage: cellImage,
			cellHint: cellHint,
			linkData: linkData,
			cell: cell,
			type: type,
			renderOptions: renderOptions,
			column: column
		};
		if (columnDataKey === this.primaryDisplayColumnName) {
			cell.cls += " grid-primary-column";
		}
		if (!Terrasoft.includes(type, "icon") && cellImage) {
			this.appendIconHtml(config);
		}
		return this.appendCellHtml(config, type, cellImage);
	},

	/**
	 * A method for retrieving data from a collection.
	 * @protected
	 * @param {Object|String} name Binding config.
	 * @param {Object} [name.bindTo] Binding config.
	 * @param {Object} [columnBindings] Column bindings config.
	 * @return {Mixed}
	 */
	getDataKey: function(name, columnBindings) {
		if (Ext.isObject(name) && name.bindTo) {
			const binding = columnBindings[name.bindTo];
			if (binding) {
				return binding.modelItem;
			}
		}
		return name;
	},

	/**
	 * Generates html cell-link.
	 * @protected
	 * @param {Object} linkData Link params.
	 * @param {String} dataColumn Links data-column attribute.
	 * @param {String} innerHtml Links internal content.
	 * @return {String} Cell html.
	 */
	formatCellLink: function(linkData, dataColumn, innerHtml) {
		// jscs:disable
		/*jshint quotmark: false */
		const linkTpl = '<a href="{0}" target="{1}" title="{2}" data-column="{3}">{4}</a>';
		/*jshint quotmark: true */
		// jscs:enable
		if (linkData.customUrlsExists) {
			const urlOccurrencePattern = "url_occurrence_{0}";
			linkData.customUrls.forEach(function(url, index) {
				innerHtml = innerHtml.replace(this.encodeHtml(url), Ext.String.format(urlOccurrencePattern, index));
			}, this);
			linkData.customUrls.forEach(function(url, index) {
				innerHtml = innerHtml.replace(Ext.String.format(urlOccurrencePattern, index),
					Ext.String.format(linkTpl, url, linkData.target, this.encodeHtml(url), "", url));
			}, this);
			return innerHtml;
		}
		return Ext.String.format(linkTpl, linkData.url, linkData.target, this.encodeHtml(linkData.title),
			dataColumn, innerHtml);
	},

	/**
	 * Generates html cell-image.
	 * @protected
	 * @param {String} cellImage Image link.
	 * @param {String} type Image type.
	 * @return {String} Cell html.
	 */
	formatCellImage: function(cellImage, type) {
		// jscs:disable
		/*jshint quotmark: false */
		const imageTpl = '<img src="{0}" class="{1}">';
		/*jshint quotmark: true */
		// jscs:enable
		return Ext.String.format(imageTpl, cellImage, this.encodeHtml(type));
	},

	/**
	 * Generates html cell.
	 * @protected
	 * @param {String} dataType Cell type.
	 * @param {String} cellData Cell text.
	 * @param {String} [cellHint] Cell hint.
	 * @return {String} Cell html.
	 */
	formatCellSpan: function(dataType, cellData, cellHint) {
		const spanCellXTemplate = this._getSpanCellXTemplate();
		const valueWithoutTags = Terrasoft.removeHtmlTags(cellData);
		const cellHintWithoutTags = Terrasoft.removeHtmlTags(cellHint);
		const text = this.encodeHtml(valueWithoutTags);
		var direction = null;
		if (Terrasoft.getIsRtlMode()) {
			direction = Terrasoft.containsRtlChars(cellData) ? direction : "ltr";
		}
		const templateConfig = {
			type: dataType,
			text: text,
			direction: direction,
			title: this.encodeHtml(cellHintWithoutTags)
		};
		const html = spanCellXTemplate.apply(templateConfig);
		return html;
	},

	/**
	 * Generates html label.
	 * @protected
	 * @param {String} name Label text.
	 * @return {String} Cell html.
	 */
	formatCellLabel: function(name) {
		// jscs:disable
		/*jshint quotmark: false */
		const labelTpl = '<span class="grid-label">{0}</span>';
		/*jshint quotmark: true */
		// jscs:enable
		return Ext.String.format(labelTpl, this.encodeHtml(name));
	},

	/**
	 * HtmlEncode string and replace symbols "{}".
	 * @protected
	 * @param {String} value Changeable string.
	 * @return {String} Replaced string.
	 */
	encodeHtml: function(value) {
		var encodeValue = Terrasoft.encodeHtml(value);
		if (Ext.isString(encodeValue)) {
			encodeValue = encodeValue.replace(/{/g, "&#123;");
			encodeValue = encodeValue.replace(/}/g, "&#125;");
			encodeValue = encodeValue.replace(/\\/g, "&#92;");
			encodeValue = encodeValue.replace(/&amp;laquo;/g, "«");
			encodeValue = encodeValue.replace(/&amp;raquo;/g, "»");
		}
		return encodeValue;
	},

	/**
	 * Appends cell html.
	 * @protected
	 * @param {Object} config Config property.
	 * @param {String} type Column type.
	 * @param {String} cellImage Image of the cell.
	 * @return {Number} The amount of data, that was added during the iteration.
	 */
	appendCellHtml: function(config, type, cellImage) {
		const setFnList = {
			"text": this.appendTextCellHtml,
			"label": this.appendLabelHtml,
			"title": this.appendTitleHtml,
			"link": this.appendLinkHtml,
			"caption": this.appendCaptionHtml
		};
		const fn = setFnList[type];
		if (Ext.isFunction(fn)) {
			fn.call(this, config);
			return type === "caption" ? 0 : 1;
		}
		if (!cellImage) {
			return 0;
		}
		const setIconFnList = {
			"grid-icon": this.appendGridIconHtml,
			"flag-icon": this.appendFlagIconHtml,
			"listed-icon": this.appendListedIconHtml
		};
		for (let key in setIconFnList) {
			if (Terrasoft.includes(type, key)) {
				const setIconFn = setIconFnList[key];
				setIconFn.call(this, config);
				return 1;
			}
		}
		return 0;
	},

	/**
	 * Appends text html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendTextCellHtml: function(config) {
		const name = config.name;
		const cell = config.cell;
		const cellData = config.cellData;
		const cellHint = config.cellHint;
		const linkData = config.linkData;
		const renderOptions = config.renderOptions;
		const cellClass = renderOptions.cellsClasses[name];
		const gridType = this.type;
		let dataType = config.type;
		if (cellClass && cellClass.typeClass) {
			dataType = cellClass.typeClass;
			cell["grid-cell-type"].push(cellClass.typeClass);
		}
		if (gridType === "tiled" && cell.html.length === 0 && (renderOptions.multiSelect || this.hierarchical)) {
			cell.style = "padding-top: 5px;";
		}
		const spanHtml = this.formatCellSpan(dataType, cellData, cellHint);
		const html = linkData
			? this.formatCellLink(linkData, this.encodeHtml(name), spanHtml)
			: spanHtml;
		cell.html += html;
	},

	/**
	 * Appends caption html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendCaptionHtml: function(config) {
		const renderOptions = config.renderOptions;
		const cell = config.cell;
		const name = config.name;
		const gridType = this.type;
		const isMultiSelectorHierarchical = renderOptions.multiSelect || this.hierarchical;
		if (gridType === "tiled" && cell.html.length === 0 && isMultiSelectorHierarchical) {
			cell.style = "padding-top: 6px;";
		}
		cell.html += this.formatCellLabel(name);
	},

	/**
	 * Appends label html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendLabelHtml: function(config) {
		const linkData = config.linkData;
		const name = config.name;
		const cell = config.cell;
		const html = this.formatCellLabel(name);
		const labelHtml = linkData
			? this.formatCellLink(linkData, this.encodeHtml(name), html)
			: html;
		cell.html += labelHtml;
	},

	/**
	 * Appends title html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendTitleHtml: function(config) {
		const name = config.name;
		const cellData = config.cellData;
		const cellHint = config.cellHint;
		const linkData = config.linkData;
		const cell = config.cell;
		const type = config.type;
		const renderOptions = config.renderOptions;
		const cellClass = renderOptions.cellsClasses[name];
		let dataType = type;
		if (cellClass && cellClass.typeClass) {
			dataType = cellClass.typeClass;
			cell["grid-cell-type"].push(cellClass.typeClass);
		}
		const html = this.formatCellSpan(dataType, cellData, cellHint);
		const titleHtml = linkData
			? this.formatCellLink(linkData, this.encodeHtml(name), html)
			: html;
		cell.html += titleHtml;
		cell.cls += " grid-header";
	},

	/**
	 * Appends link html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendLinkHtml: function(config) {
		const cellData = config.cellData;
		const cell = config.cell;
		const name = config.name;
		const linkHtmlConfig = Ext.DomHelper.createHtml({
			tag: "a",
			target: cellData.target || "_blank",
			html: this.encodeHtml(cellData.caption),
			href: cellData.url,
			"data-column": this.encodeHtml(name)
		});
		cell.html += linkHtmlConfig;
	},

	/**
	 * Appends grid icon html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendGridIconHtml: function(config) {
		this.appendFlagIconHtml(config);
		const size = this.dimensionsPattern.exec(config.type)[0];
		config.cell.cls += " icon-spacer-" + size;
	},

	/**
	 * Appends flag icon html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendFlagIconHtml: function(config) {
		const cellImage = config.cellImage;
		const linkData = config.linkData;
		const html = this.formatCellImage(cellImage, config.type);
		const flagIconHtml = linkData
			? this.formatCellLink(linkData, this.encodeHtml(config.name), html)
			: html;
		config.cell.html += flagIconHtml;
	},

	/**
	 * Appends listed icon html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendListedIconHtml: function(config) {
		const linkData = config.linkData;
		const html = this.formatCellImage(config.cellImage, config.type);
		const listedIconHtml = linkData
			? this.formatCellLink(linkData, this.encodeHtml(config.name), html)
			: html;
		config.cell.html += listedIconHtml;
	},

	/**
	 * Appends icon html to cell.
	 * @protected
	 * @param {Object} config Config property.
	 */
	appendIconHtml: function(config) {
		const cell = config.cell;
		const linkData = config.linkData;
		const lookupImageType = config.column.lookupImageType || "grid-icon-fixed-32x32";
		const size = this.dimensionsPattern.exec(lookupImageType)[0];
		cell.cls += Ext.String.format(" icon-spacer-{0}", size);
		const html = this.formatCellImage(config.cellImage, lookupImageType);
		const iconHtml = linkData
			? this.formatCellLink(linkData, this.encodeHtml(config.name), html)
			: html;
		cell.html += iconHtml;
	}

	// endregion

});

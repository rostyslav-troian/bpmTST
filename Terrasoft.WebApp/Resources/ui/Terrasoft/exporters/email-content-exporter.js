/**
 * The implementation of the abstract class exporter for email.
 */
Ext.define("Terrasoft.exporters.EmailContentExporter", {
	extend: "Terrasoft.BaseContentExporter",
	alternateClassName: "Terrasoft.EmailContentExporter",

	/** Type of exported item.
	 * @protected
	 * @type {Object} */
	ExportedItemType: Object.assign({
		/** BLOCK ROW **/
		BLOCKROW: "BlockRow",
		/** BLOCK COLUMN **/
		BLOCKCOLUMN: "BlockColumn",
		/** BUTTONS GROUP **/
		BUTTONSGROUP: "ButtonsGroup"
	}, Terrasoft.ExportedItemType),

	/**
	 * The maximum number of columns in the markup.
	 * @protected
	 * @type {Number}
	 */
	maxColumnsCount: 24,

	/**
	 * Default sheet width.
	 * @protected
	 * @type {Number}
	 */
	defaulSheetWidth: 600,

	/**
	 * Default image padding.
	 * @protected
	 * @type {Number}
	 */
	defaultImagePadding: 0,

	/**
	 * Default sheet background color.
	 * @protected
	 * @type {String}
	 */
	defaulSheetBgColor: "#fff",

	/**
	 * Link styles.
	 * @protected
	 * @type {Object}
	 */
	linkCssStyles: {
		"color": "#336699",
		"font-weight": "normal",
		"text-decoration": "underline"
	},

	/**
	 * Sheet styles.
	 * @protected
	 * @type {Object}
	 */
	sheetCssStyles: {
		"color": "#444444",
		"font-family": "arial,helvetica,sans-serif",
		"font-size": "14px",
		"line-height": "initial",
		"min-width": "200px",
		"border-collapse": "collapse"
	},

	/**
	 * Text element styles.
	 * @protected
	 * @type {Object}
	 */
	textCssStyles: {
		"color": "#444444",
		"font-family": "arial,helvetica,sans-serif",
		"font-size": "14px",
		"line-height": "inherit",
		"padding": "5px",
		"text-align": "left",
		"word-wrap": "break-word",
		"word-break": "break-word",
		"-webkit-hyphens": "auto",
		"-moz-hyphens": "auto",
		"hyphens": "auto"
	},

	/**
	 * HTML element styles.
	 * @protected
	 * @type {Object}
	 */
	htmlCssStyles: {
		"color": "#444444",
		"margin": "8px",
		"font-family": "arial,helvetica,sans-serif",
		"font-size": "14px",
		"word-wrap": "break-word",
		"-ms-word-break": "break-all",
		"word-break": "break-word",
		"-webkit-hyphens": "auto",
		"-moz-hyphens": "auto",
		"hyphens": "auto",
		"overflow": "hidden"
	},

	/**
	 * Styles of the wrapper element above the image.
	 * @protected
	 * @type {Object}
	 */
	imageWrapperCssStyles: {},

	/**
	 * Image wrap paragraph styles.
	 * @protected
	 * @type {Object}
	 */
	imageParagraphCssStyles: {
		"margin": 0
	},

	/**
	 * Image styles.
	 * @protected
	 * @type {Object}
	 */
	imageCssStyles: {
		"height": "auto",
		"display": "block",
		"border": "none",
		"margin": 0,
		"padding": 0
	},

	/**
	 * Block column styles.
	 * @protected
	 * @type {Object}
	 */
	blockColumnCssStyles: {
		"vertical-align": "top",
		"width": "100%",
		"border-collapse": "collapse"
	},

	/**
	 * Block line styles.
	 * @protected
	 * @type {Object}
	 */
	blockRowCssStyles: {
		"width": "100%",
		"vertical-align": "top"
	},

	/**
	 * {@link Ext.XTemplate Template} sheet template HTML-markup.
	 * @protected
	 * @type {String[]}
	 */
	sheetTpl: [
		"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/" +
		"xhtml1-transitional.dtd\">",
		"<html>",
		"<head>",
		"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />",
		"<meta property=\"og:title\" content=\"\" />",
		"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>",
		"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>",
		"<title></title>",
		"<style type=\"text/css\">",
		"#outlook a {padding:0;}",
		"body {width:100% !important;} .ReadMsgBody {width:100%;} .ExternalClass {width:100%;}",
		".ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, " +
		".ExternalClass div {line-height: 100%;}",
		"body, table, td, p, a, li, blockquote {-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; " +
		"mso-line-height-rule:exactly;}",
		"table, td {mso-table-lspace:0pt; mso-table-rspace:0pt; border-spacing:0;}",
		"body {margin:0; padding:0;}",
		"img {border:0; line-height:100%; outline:none; text-decoration:none; " +
		"-ms-interpolation-mode:bicubic;}",
		"a[x-apple-data-detectors] {color: inherit !important;text-decoration: none !important;" +
		"font-size: inherit !important;font-family: inherit !important;font-weight: inherit !important;" +
		"line-height: inherit !important;}",
		/* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
		"table {border-collapse:collapse !important;}",
		/* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */
		"table td {border-collapse:collapse;}",
		"body {height:100% !important; margin:0; padding:0; width:100% !important;}",
		/* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */
		"@media only screen and (max-width: 480px) {" +
		".mobshow {display: table!important;overflow: visible!important;}" +
		".nomob {display: none!important;width: 0px!important;height: 0px!important;}" +
		".content-block {font-size: 16px;}",
		/* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
		"body {width:100% !important; min-width:100% !important;}",
		/* /\/\/\/\/\/\/\/\/ FRAMEWORK STYLES /\/\/\/\/\/\/\/\/ */
		"img.flexible-image {height:auto !important; width:100% !important; max-width:100% !important;}",
		"body,table,td,p,a,li,blockquote {-webkit-text-size-adjust: none !important;}",
		"}",
		"@media only screen and (max-device-width: 480px) {",
		".content-block {font-size: 16px;}",
		/* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
		"body {width:100% !important; min-width:100% !important;}",
		/* /\/\/\/\/\/\/\/\/ FRAMEWORK STYLES /\/\/\/\/\/\/\/\/ */
		"img.flexible-image {height:auto !important; width:100% !important; max-width:100% !important;}",
		"body,table,td,p,a,li,blockquote {-webkit-text-size-adjust: none !important;}",
		"}",
		".content-block td { {styles} }",
		".content-block td a:link, .content-block td a:visited, .content-block td a .yshortcuts {",
		" {contentLinkStyles}",
		"}",
		".content-block td img {display:inline; height:auto;}" +
		".text-element p, .html-element p, p {",
		"-webkit-margin-before: 0em;",
		"-webkit-margin-after: 0em;",
		"-webkit-margin-start: 0em;",
		"-webkit-margin-end: 0em;",
		"margin: 0em;",
		"}",
		`
		.separator-element, .separator-element-wrapper {
			width: 100%;
		}
		.ignore-collapse {
			border-collapse: separate!important;
		}
		.desktop-background {
			background-size: 100%;
		}
		.mobile-background {
			background-size: 0;
			background-repeat: no-repeat;
		}
		.mobile-item {
			display: none;
			visibility: collapse;
		}
		.mobile-item * {
			mso-hide: all;
		}`,
		Terrasoft.Features.getIsEnabled("EmailTemplateLegacyMarkupFeature")
		? `
		.desktop-item {
			display: table-cell;
		}`
		: `
		.hybrid-item {
			display: table-cell;
		}
		.desktop-item {
			display: table-cell;
		}`,
		`
		.button-element {
			display: inline-block;
			text-decoration: none;
		}
		.button-th {
			font-weight:normal;
		}
		@media only screen and (max-width: 480px) {
			.desktop-background {
				background-size: 0!important;
			}
			.mobile-background {
				background-size: 100%!important;
			}
			.mobile-item {
				display: table-row!important;
				visibility: visible;
			}
			.mobile-item * {
				mso-hide: none!important;
			}`,
			Terrasoft.Features.getIsEnabled("EmailTemplateLegacyMarkupFeature")
			? `
			.desktop-item {
				display: none!important;
			}`
			: `
			.desktop-item {
				display: none!important;
			}
			.hybrid-item {
				vertical-align: top!important;
				width: 100% !important;
			}`,
			`
			.adaptive-image, .adaptive-text, .adaptive-button {
				width: 100%!important;
				height: auto!important;
				max-width: 480px!important
			}
			.adaptive-sheet, .adaptive-block {
				max-width: 480px!important
			}
		}
		::-webkit-scrollbar {
			-webkit-appearance: none;
			width: 10px;
			height: 10px;
		}
		::-webkit-scrollbar-thumb {
			background: #DBDBDB;
		}
		@media only screen and (max-width: 670px) {
			.button-half-row {
				display: inline-block;
				width: 50%!important;
			}
		}
		@media only screen and (max-width: 292px) {
			.button-half-row {
				display: block;
				width: 100%!important;
			}
		}
		`,
		"</style>",
		"</head>",
		"<body leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" offset=\"0\" style=\"margin:0\">",
		"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" " +
		"style=\"border-collapse:collapse;\">",
		"<tr>",
		"<td align=\"{SheetAlign}\" valign=\"top\">",
		"<!--[if (gte mso 9)|(IE)]><table width=\"{Width}\" cellpadding=\"0\" cellspacing=\"0\" " +
		"border=\"0\"><tr><td><![endif]-->",
		"<table bgcolor=\"{BackgroundColor}\" class=\"adaptive-sheet\" style=\"{styles}\" cellspacing=\"0\"" +
		" cellpadding=\"10\" id=\"backgroundTable\">",
		"<tr>",
		"<td valign=\"top\">",
		"{%this.generateItems(out, values)%}",
		"</td>",
		"</tr>",
		"</table>",
		"<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->",
		"<br />",
		"</td>",
		"</tr>",
		"</table>",
		"</body>",
		"</html>"
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for block group.
	 * @protected
	 * @type {String[]}
	 */
	blockGroupTpl: [
		Terrasoft.EmailContentTemplates.getContainerTpl()
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for block.
	 * @protected
	 * @type {String[]}
	 */
	blockTpl: [
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({
					valign: "{valign}"
				},
				Terrasoft.EmailContentTemplates.getColumnTpl({
						style: "{columnStyles}"
					},
					Terrasoft.EmailContentTemplates.getContainerTpl()
				)
			)
		)
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for part of block.
	 * @protected
	 * @type {String[]}
	 */
	blockRowTpl: [
		`<table class="block-row" border="0" cellpadding="0" cellspacing="0" width="{Width}">
		{%this.generateBlockRowItems(out, values, parent)%}
		</table>`
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for column of block.
	 * @protected
	 * @type {String[]}
	 */
	blockCellTpl: [
		`<!--[if (gte mso 9)|(IE)]><td style="padding: {CellPadding}px;" width="{TdWidth}" valign="top" ><![endif]-->
		<table align="left" border="0" cellpadding="0" cellspacing="0" style="{styles}" class="adaptive-block
		flexible-container">
			<tr>
				<td<tpl if="Align"> align="{Align}"</tpl>>
					{%this.generateItems(out, values)%}
				</td>
			</tr>
		</table>
		<!--[if (gte mso 9)|(IE)]></td><![endif]-->`
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for element with HTML.
	 * @protected
	 * @type {String[]}
	 */
	htmlTpl: [
		`<div style="{elementStyles}">
			${
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
				Terrasoft.EmailContentTemplates.getColumnTpl({
						style: "{columnStyles}",
						class: "html-element"
					},
					`{Content}`
				)
			)
		)
		}
		</div>`
	],

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for content separator element.
	 * @protected
	 * @type {String[]}
	 */
	separatorTpl: [
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
				Terrasoft.EmailContentTemplates.getColumnTpl({
						style: "{columnStyles}"
					},
					Terrasoft.EmailContentTemplates.getSeparatorTpl()
				)
			)
		)
	],

	/**
	 * {@link Ext.XTemplate Template} Text element HTML mark-up.
	 * @protected
	 * @type {String[]}
	 */
	textTpl: [
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({
			additionalClass: "adaptive-text",
			width: "{width}"
		},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
				Terrasoft.EmailContentTemplates.getColumnTpl({
						style: "{columnStyles}",
						valign: "top",
						class: "text-element"
					},
					`{Content}`
				)
			)
		)
	],

	/**
	 * {@link Ext.XTemplate Template} Image HTML mark-up.
	 * @protected
	 * @type {String[]}
	 */
	imageTpl: [
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({
			additionalClass: "adaptive-image flexible-container",
			width: "{Width}",
			align: "Align",
		},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
				Terrasoft.EmailContentTemplates.getColumnTpl({
						style: "{columnStyles}",
						align: "{Align}",
						class: "image-element"
					},
					Terrasoft.EmailContentTemplates.getImageTpl({
						src: "{imageSrc}",
						width: "{ImageWidth}",
						height: "{ImageHeight}"
					})
				)
			)
		)
	],

	/**
	 * {@link Ext.XTemplate Template} Image HTML mark-up including markup for mobile devices.
	 * @protected
	 * @type {String[]}
	 */
	mobileImageTpl: [
		Terrasoft.EmailContentTemplates.getNotMsoTpl(
			Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({
					align: "center",
					additionalClass: "adaptive-image flexible-container mobshow mobile-item",
					style: "display: none; min-width: 0px !important;"
				},
				Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
					Terrasoft.EmailContentTemplates.getColumnTpl({
							style: "{columnStyles}",
							class: "image-element"
						},
						Terrasoft.EmailContentTemplates.getImageTpl({
							src: "{mobileImageSrc}",
							additionalClass: "mobshow"
						})
				)))
		),
		Terrasoft.EmailContentTemplates.getDesktopBackgroundTpl({
			align: "{Align}",
			additionalClass: "flexible-container nomob"
		},
			Terrasoft.EmailContentTemplates.getMobileBackgroundTpl({},
				Terrasoft.EmailContentTemplates.getColumnTpl({
					style: "{columnStyles}",
					class: "image-element"
				},
					Terrasoft.EmailContentTemplates.getImageTpl({
						src: "{imageSrc}",
						width: "{ImageWidth}",
						height: "{ImageHeight}",
						additionalClass: "nomob"
					})
			)))
	],

	/**
	 * {@link Ext.XTemplate Template} Hidden pre-header mark-up.
	 * @protected
	 * @type {String[]}
	 */
	preHeaderTpl: [
		"<div  hidden class=\"email-template-pre-header\" style=\"display:none; line-height: 1px; max-height: 0px; " +
		"max-width: 0px; opacity: 0; overflow: hidden; color: {BackgroundColor}; font-size:1px; " +
		"font-family: verdana, geneva, sans-serif;\">",
		"{PreHeaderText}",
		"</div >"
	],

	/**
	 * Class name for the pre-header element.
	 * @private
	 * @type {String}
	 */
	preHeaderClassName: "email-template-pre-header",

	/**
	 * @private
	 * @type {String}
	 */
	_butonLinkExample: Terrasoft.Resources.EmailContentExporter.ButtonLinkExampleUrl,

	/**
	 * {@link Ext.XTemplate Template} Button HTML mark-up.
	 * @protected
	 * @type {String[]}
	 */
	buttonTpl: [
		`<table width="100%" border="0" cellspacing="0" cellpadding="0" class="ignore-collapse">
			<tr>
				<td style="{margin}" align="{align}">
					<table width="{width}" height="{height}" border="0" cellspacing="0" cellpadding="0"
						class="ignore-collapse">
						<tr>
							<!--[if !mso]><!-->
							<td width="{width}" align="center">
								<a href="{Link}" target="_blank" style="display:inline-block;text-decoration:none;{border}{styles}">
							<!--<![endif]-->
							<!--[if mso]>
								<td width="{width}" height="{height}" align="center"
									style="{padding}{border}" bgcolor="{bgColor}">
								<a href="{Link}" target="_blank" style="display:inline-block;text-decoration:none;{styles}">
							<![endif]-->
									{HtmlText}
								</a>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>`
	],

	/**
	 * {@link Ext.XTemplate Template} Block row HTML mark-up for Valign = Terrasoft.Valign.TOP.
	 * @protected
	 * @type {String[]}
	 */
	rowBodyTplTopAlign: [
		`
			<tr>
			<tpl for="items">
				<td valign="{parent.valign}" width="{width}" style="display: inline-block;{parent.rowTplData.styles}"
					class="flexible-container hybrid-item">
				<!--[if (gte mso 9)|(IE)]><table width="100%" align="center" valign="top" cellpadding="0"
					cellspacing="0" border="0"><tr><![endif]-->
					{html}
				<!--[if (gte mso 9)|(IE)]></tr></table><![endif]-->
				</td>
				</tpl>
			</tr>
		`
	],

	/**
	 * {@link Ext.XTemplate Template} Block row HTML mark-up.
	 * @protected
	 * @type {String[]}
	 */
	rowBodyTpl: [
		`<tpl if="reverseColumnOrder">`,
			Terrasoft.EmailContentTemplates.getMobileRowsTpl(),
		`</tpl>`,
		Terrasoft.Features.getIsEnabled("EmailTemplateLegacyMarkupFeature")
		? `<tr class="desktop-item"><tpl for="items">
			<td valign="{parent.valign}" width="{width}" style="{parent.rowTplData.styles}" class="flexible-container">`
		: `<tr><tpl for="items">
			<td valign="{parent.valign}" width="{width}" style="{parent.rowTplData.styles}" class="flexible-container
				<tpl if="xindex === 1">hybrid-item<tpl else>desktop-item</tpl>">`,
			`	<!--[if (gte mso 9)|(IE)]><table width="100%" align="center" valign="top" cellpadding="0"
					cellspacing="0" border="0"><tr><![endif]-->
				{html}
				<!--[if (gte mso 9)|(IE)]></tr></table><![endif]-->
			</td>
		</tpl>
		</tr>`,
		`<tpl if="!reverseColumnOrder">`,
			Terrasoft.EmailContentTemplates.getMobileRowsTpl(),
		`</tpl>`
	],

	/**
	 * {@link Ext.XTemplate Template} Buttons group HTML mark-up.
	 * @protected
	 * @type {String[]}
	 */
	buttonsGroupTpl: [`
		<table align="center" cellspacing="0" cellpadding="0" width="100%" border="0" style="max-width: 100%;">
			<tbody>
				<tr><tpl for="Items"><th class="button-th button-half-row" width="{PercentWidth}%">{html}</th></tpl></tr>
			</tbody>
		</table>
	`],

	/**
	 * Allow minify exported markup.
	 * @protected
	 * @type {Boolean}
	 */
	minify: Terrasoft.Features.getIsEnabled("MinifyEmailHtml"),

	/**
	 * Default minification config.
	 * @protected
	 * @type {Object}
	 */
	minificationConfig: {
		collapseBooleanAttributes: true,
		collapseWhitespace: false,
		collapseInlineTagWhitespace: true,
		keepClosingSlash: true,
		html5: false,
		minifyCSS: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		caseSensative: true,
		removeAttributeQuotes: false
	},

	/**
	 * Generates nested elements.
	 * @protected
	 * @param {String[]} buffer HTML generation buffer.
	 * @param {Object} renderData Template parameter object.
	 */
	generateItems: function(buffer, renderData) {
		if (!Ext.isEmpty(renderData.Items)) {
			Terrasoft.each(renderData.Items, function(item) {
				const itemHtml = this.exportItem(item);
				buffer.push(itemHtml);
			}, renderData.self);
		}
	},

	/**
	 * Generates block rows.
	 * @protected
	 * @param {String[]} buffer HTML generation buffer.
	 * @param {Object} renderData Template parameter object.
	 * @param {Object} rowTplData Row template parameter object.
	 */
	generateBlockRowItems: function(buffer, renderData, rowTplData) {
		const {self, Items: items, Valign: valign} = renderData;
		let {ReverseColumnOrder: reverseColumnOrder} = renderData;
		const {rowBodyTpl, rowBodyTplTopAlign} = self;
		if (!Ext.isEmpty(items)) {
			const groupedItems = Terrasoft.Features.getIsEnabled("EmailTemplateGroupButtonsFeature")
				? self._groupRowItems(items) : items;
			const htmlItems = groupedItems.map((item) => ({
				html: self.exportItem(item),
				width: item.Width
			}));
			if (!Terrasoft.Features.getIsEnabled("ReverseColumnOrderContentBuilderFeature")) {
				reverseColumnOrder = false;
			}
			const tpl = Terrasoft.Features.getIsEnabled("ValignTopSimpleMarkupFeature")
					&& valign === Terrasoft.Valign.TOP && !reverseColumnOrder
				? rowBodyTplTopAlign
				: rowBodyTpl;
			const mobileItems = Terrasoft.Features.getIsEnabled("EmailTemplateLegacyMarkupFeature")
				? htmlItems
				: htmlItems.slice(1);
			if (reverseColumnOrder) {
				mobileItems.reverse();
			}
			buffer.push(self.generate(tpl, {
				items: htmlItems,
				mobileItems,
				rowTplData,
				valign,
				reverseColumnOrder
			}));
		}
	},

	/**
	 * Returns HTML-markup of content.
	 * @protected
	 * @param {Ext.XTemplate} tpl Render template.
	 * @param {Object} tplData Template parameter object.
	 * @return {String} exporting element mark-up.
	 */
	generate: function(tpl, tplData) {
		if (Ext.isArray(tpl)) {
			tpl = tpl.join("");
		}
		tpl = tpl.replace(/\s+/g, " ");
		Ext.apply(tplData, {
			self: this,
			generateItems: this.generateItems,
			generateBlockRowItems: this.generateBlockRowItems
		});
		var template = new Ext.XTemplate(tpl);
		this.prepareTpl(template, tplData);
		var generateHtml = [];
		template.applyOut(tplData, generateHtml);
		return generateHtml.join("");
	},

	/**
	 * The method prepares components renders template for generating HTML-markup. Because for work
	 * Class {@link Ext.XTemplate Ext.XTemplate} requires that all inline-function used in the template
	 * shoud be located in the instance of Ext.XTemplate object, here comes the installation of links to these functions
	 * from an template object parameter, tplData.
	 * @param {Ext.XTemplate} tpl Render template.
	 * @param {Object} tplData Template parameter object.
	 * @protected
	 */
	prepareTpl: function(tpl, tplData) {
		Terrasoft.each(tplData, function(property, propertyName) {
			if (Ext.isFunction(property)) {
				tpl[propertyName] = property;
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportSheet
	 * @override
	 * @protected
	 */
	exportSheet: function(config) {
		var tplData = Terrasoft.deepClone(config);
		tplData.BackgroundColor = tplData.BackgroundColor || this.defaulSheetBgColor;
		var width = (tplData.Width = (tplData.Width || this.defaulSheetWidth));
		Terrasoft.each(tplData.Items, function(item) {
			item.ParentWidth = width - 20;
		});
		var styles = Ext.apply({
			"width": "100%",
			"max-width": width + "px !important"
		}, this.sheetCssStyles);
		styles = Ext.apply(styles, tplData.Styles);
		tplData.styles = Ext.DomHelper.generateStyles(styles);
		tplData.contentLinkStyles = Ext.DomHelper.generateStyles(this.linkCssStyles);
		return this.generate(this.sheetTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportBlockgroup
	 * @override
	 * @protected
	 */
	exportBlockGroup: function(config) {
		var tplData = Terrasoft.deepClone(config);
		var styles = Ext.apply({}, tplData.Styles);
		tplData.styles = Ext.DomHelper.generateStyles(styles);
		return this.generate(this.blockGroupTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportText
	 * @override
	 * @protected
	 */
	exportText: function(config) {
		var tplData = Terrasoft.deepClone(config);
		this._applyDefaultPadding(tplData);
		var styles = Ext.apply({}, tplData.Styles, this.textCssStyles);
		tplData.width = !config.Styles || Ext.isEmpty(config.Styles.width) ? config.ParentWidth : config.Styles.width;
		Ext.apply(tplData, this._sliceStyles(styles));
		tplData.mobileBackground = tplData.BackgroundImage && tplData.BackgroundImage.mobile;
		return this.generate(this.textTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportImage
	 * @override
	 * @protected
	 */
	exportImage: function(config) {
		const tplData = Terrasoft.deepClone(config);
		this._applyDefaultPadding(tplData);
		tplData.title = config.ImageTitle;
		tplData.hasTitle = !Ext.isEmpty(config.ImageTitle);
		tplData.alt = config.Alt || "Image";
		tplData.align = config.Align;
		tplData.hasLink = !Ext.isEmpty(config.Link);
		this._prepareImage(tplData, config);
		this._prepareMobileImage(tplData, config);
		this._prepareImageElementStyles(tplData, config);
		tplData.mobileBackground = tplData.BackgroundImage && tplData.BackgroundImage.mobile;
		if (tplData.mobileImageSrc) {
			return this.generate(this.mobileImageTpl, tplData);
		} else {
			return this.generate(this.imageTpl, tplData);
		}
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportButton
	 * @override
	 * @protected
	 */
	exportButton: function(config) {
		const tplData = Terrasoft.deepClone(config);
		const styles = Ext.apply({}, tplData.Styles);
		tplData.bgColor = styles["background-color"];
		tplData.width = parseFloat(styles.width) || styles.width;
		tplData.height = parseFloat(styles.height) || styles.height;
		tplData.align = tplData.Align;
		tplData.Link = tplData.Link || this._butonLinkExample;
		tplData.margin = Ext.DomHelper.generateStyles(tplData.Padding);
		this._generateButtonBorder(tplData, styles);
		this._generateButtonPadding(tplData, styles);
		this._generateButtonWidth(styles);
		this._generateButtonHeight(styles);
		this._generateButtonHrefStyle(styles);
		tplData.styles = Ext.DomHelper.generateStyles(styles);
		return this.generate(this.buttonTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportHtml
	 * @override
	 * @protected
	 */
	exportHtml: function(config) {
		var tplData = Terrasoft.deepClone(config);
		this._applyDefaultPadding(tplData);
		var styles = Ext.apply({}, tplData.Styles);
		Ext.apply(tplData, this._sliceStyles(styles, this.htmlCssStyles));
		tplData.mobileBackground = tplData.BackgroundImage && tplData.BackgroundImage.mobile;
		return this.generate(this.htmlTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportSeparator
	 * @override
	 * @protected
	 */
	exportSeparator: function(config) {
		const tplData = Terrasoft.deepClone(config);
		const styles = Ext.apply({}, tplData.Styles);
		Ext.apply(tplData, this._sliceStyles(styles));
		const separatorStyles = {};
		separatorStyles["border-top-color"] = tplData.Color;
		separatorStyles["border-top-style"] = tplData.Style;
		separatorStyles["border-top-width"] = tplData.Thickness;
		tplData.separatorStyles = Ext.DomHelper.generateStyles(separatorStyles);
		tplData.mobileBackground = tplData.BackgroundImage && tplData.BackgroundImage.mobile;
		return this.generate(this.separatorTpl, tplData);
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportBlock
	 * @override
	 * @protected
	 */
	exportBlock: function(config) {
		const tplData = Terrasoft.deepClone(config);
		const items = this.groupBlockElements(tplData.Items);
		Terrasoft.each(items, function(item) {
			item.ParentWidth = tplData.ParentWidth - Terrasoft.calculateStylesWidth(tplData.Styles);
		});
		const styles = Ext.apply({}, tplData.Styles);
		Ext.apply(tplData, this._sliceStyles(styles));
		var layoutConfig = this.getLayoutItemsConfig(items);
		const valign = config.Valign || Terrasoft.Valign.TOP;
		tplData.Items = this.generateRows(layoutConfig, {
			reverseColumnOrder: tplData.ReverseColumnOrder,
			minRow: 0,
			maxRow: this.getRowsCount(layoutConfig),
			minColumn: 0,
			maxColumn: this.maxColumnsCount,
			valign
		});
		tplData.valign = valign;
		tplData.mobileBackground = tplData.BackgroundImage && tplData.BackgroundImage.mobile;
		return this.generate(this.blockTpl, tplData);
	},

	/**
	 * Prepared the block elements, grouping them in blocks.
	 * @protected
	 * @param {Object[]} items List of grid items.
	 * @return {Object[]} List of grid items grouped by blocks.
	 */
	groupBlockElements: function(items) {
		var resultItems = [];
		var options = {};
		var findItemsRange = function(layoutItem) {
			options.minColumn = (layoutItem.Column < options.minColumn) ? layoutItem.Column : options.minColumn;
			options.minRow = (layoutItem.Row < options.minRow) ? layoutItem.Row : options.minRow;
			var maxRow = layoutItem.Row + layoutItem.RowSpan;
			options.maxRow = (maxRow > options.maxRow) ? maxRow : options.maxRow;
			var maxColumn = layoutItem.Column + layoutItem.ColSpan;
			options.maxColumn = (maxColumn > options.maxColumn) ? maxColumn : options.maxColumn;
		};
		while (!Ext.isEmpty(items)) {
			var firstElement = items[0];
			var groupName = firstElement.GroupName;
			var groupItems = [];
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].GroupName === groupName) {
					delete items[i].GroupName;
					var splicedItems = items.splice(i, 1);
					groupItems.push(splicedItems[0]);
				}
			}
			if (!Ext.isEmpty(groupName)) {
				var layoutConfig = this.getLayoutItemsConfig(groupItems);
				Ext.apply(options, {
					minRow: 24,
					maxRow: 0,
					minColumn: 24,
					maxColumn: 0
				});
				this.eachLayoutItem(layoutConfig, {
					minRow: 0,
					maxRow: 24,
					minColumn: 0,
					maxColumn: 24
				}, findItemsRange, this);
				groupItems = [{
					"ItemType": "block",
					"Column": options.minColumn,
					"Row": options.minRow,
					"ColSpan": options.maxColumn - options.minColumn,
					"RowSpan": options.maxRow - options.minRow,
					"Items": groupItems
				}];
			}
			resultItems = resultItems.concat(groupItems);
		}
		return resultItems;
	},

	/**
	 * Exports block row.
	 * @protected
	 * @param {Object} config Element config.
	 * @return {*} The converted value.
	 */
	exportBlockRow: function(config) {
		var tplData = Terrasoft.deepClone(config);
		var styles = Ext.apply({}, tplData.Styles, this.blockRowCssStyles);
		tplData.Width = "100%";
		tplData.styles = Ext.DomHelper.generateStyles(styles);
		return this.generate(this.blockRowTpl, tplData);
	},

	/**
	 * Exports block column.
	 * @protected
	 * @param {Object} config Element config.
	 * @return {*} The converted value.
	 */
	exportBlockColumn: function(config) {
		var tplData = Terrasoft.deepClone(config);
		var styles = Ext.apply({
			"max-width": tplData.Width + "px"
		}, tplData.Styles, this.blockColumnCssStyles);
		var cellPadding = 0;
		Terrasoft.each(tplData.Items, function(item) {
			if (item.ItemType === "block") {
				item.ParentWidth = tplData.ParentWidth;
			} else {
				this._applyItemSpecificStyles(item, tplData);
				item.ParentWidth = tplData.Width;
				cellPadding = 5;
			}
		}, this);
		tplData.TdWidth = tplData.Width - cellPadding * 2;
		tplData.CellPadding = cellPadding;
		tplData.styles = Ext.DomHelper.generateStyles(styles);
		return this.generate(this.blockCellTpl, tplData);
	},

	/**
	 * Exports buttons group.
	 * @protected
	 * @param {Object} config Element config.
	 * @return {*} The converted value.
	 */
	exportButtonsGroup: function(config) {
		const tplData = Terrasoft.deepClone(config);
		tplData.Items.forEach((btnBlock) => {
			btnBlock.html = this.exportItem(btnBlock.Items[0]);
		});
		return this.generate(this.buttonsGroupTpl, tplData);
	},

	/**
	 * Generate object of part of block.
	 * @protected
	 * @param {Object} layoutItems Config of location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of row number.
	 * @param {Number} options.maxRow Maximum value of row number.
	 * @param {Number} options.minColumn Minimum value of column number.
	 * @param {Number} options.maxColumn Maximum value of column number.
	 * @param {Number} options.rowStyles Styles of row.
	 * @return {Object[]} Hierarchical object for generate template of part of block.
	 */
	generateRows: function(layoutItems, options) {
		var rows = [];
		this.eachLayoutItem(layoutItems, options, function(layoutItem, currentRow) {
			var rowHeight = this.calculateRowHeight(layoutItems, Ext.apply({}, {
				minRow: currentRow,
				maxRow: currentRow + layoutItem.RowSpan
			}, options));
			var columns = this.generateColumns(layoutItems, Ext.apply({}, {
				minRow: currentRow,
				maxRow: currentRow + rowHeight
			}, options));
			rows.push({
				ItemType: "BlockRow",
				Items: columns,
				Styles: options.rowStyles,
				Valign: options.valign,
				ReverseColumnOrder: options.reverseColumnOrder
			});
			return {
				"breakInner": true,
				"increaseOuter": rowHeight - 1
			};
		}, this);
		return rows;
	},

	/**
	 * Returns count of rows in the specified range.
	 * @protected
	 * @param {Object} layoutItems Config of location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of row number.
	 * @param {Number} options.maxRow Maximum value of row number.
	 * @param {Number} options.minColumn Minimum value of column number.
	 * @param {Number} options.maxColumn Maximum value of column number.
	 * @return {Number} Count of rows.
	 */
	getRangeRowsCount: function(layoutItems, options) {
		var rowsCount = 0;
		this.eachLayoutItem(layoutItems, options, function(layoutItem, currentRow) {
			var rowHeight = this.calculateRowHeight(layoutItems, Ext.apply({}, {
				minRow: currentRow,
				maxRow: currentRow + layoutItem.RowSpan
			}, options));
			rowsCount++;
			return {
				"breakInner": true,
				"increaseOuter": rowHeight - 1
			};
		}, this);
		return rowsCount;
	},

	/**
	 * Generate object of column of block.
	 * @protected
	 * @param {Object} layoutItems Config of location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of row number.
	 * @param {Number} options.maxRow Maximum value of row number.
	 * @param {Number} options.minColumn Minimum value of column number.
	 * @param {Number} options.maxColumn Maximum value of column number.
	 * @return {Object[]} Hierarchical object for generate template of column of block.
	 */
	generateColumns: function(layoutItems, options) {
		var columns = [];
		for (var currentColumn = options.minColumn; currentColumn < options.maxColumn; currentColumn++) {
			for (var currentRow = options.minRow; currentRow < options.maxRow; currentRow++) {
				var layoutItem = layoutItems[currentRow] ? layoutItems[currentRow][currentColumn] : null;
				if (layoutItem) {
					var columnWidth = this.getColumnWidth(layoutItems, Ext.apply({}, {
						minColumn: currentColumn,
						maxColumn: currentColumn + layoutItem.ColSpan
					}, options));
					var rowsCount = this.getRangeRowsCount(layoutItems, Ext.apply({}, {
						minColumn: currentColumn,
						maxColumn: currentColumn + columnWidth
					}, options));
					var items = null;
					if (rowsCount > 1) {
						items = this.generateRows(layoutItems, Ext.apply({}, {
							minColumn: currentColumn,
							maxColumn: currentColumn + columnWidth
						}, options));
					} else {
						items = [layoutItem];
					}
					var column = {
						"ItemType": "BlockColumn",
						"DataColspan": columnWidth,
						"ParentWidth": layoutItem.ParentWidth,
						"Items": items
					};
					columns.push(column);
					currentColumn += (columnWidth - 1);
					break;
				}
			}
		}
		columns = this.calculateColumnWidth(columns);
		return columns;
	},

	/**
	 * Do each by items located in the specified range on grid.
	 * @protected
	 * @param {Object} layoutItems Config of location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of row number.
	 * @param {Number} options.maxRow Maximum value of row number.
	 * @param {Number} options.minColumn Minimum value of column number.
	 * @param {Number} options.maxColumn Maximum value of column number.
	 * @param {Function} iterator Iterator function.
	 * @param {Object} context Context.
	 */
	eachLayoutItem: function(layoutItems, options, iterator, context) {
		var config = {
			outerFrom: options.minRow,
			outerTo: options.maxRow,
			innerFrom: options.minColumn,
			innerTo: options.maxColumn
		};
		this.eachItem(layoutItems, config, iterator, context);
	},

	/**
	 * Do each by items located in the two-level, the sparse array.
	 * @protected
	 * @param {Object[]} array Two-level, the sparse array.
	 * @param {Object} config The range of values.
	 * @param {Number} config.outerFrom Minimum value of external cycle.
	 * @param {Number} config.outerTo Maximum value of external cycle.
	 * @param {Number} config.innerFrom Minimum value of internal cycle.
	 * @param {Number} config.innerTo Maximum value of internal cycle.
	 * @param {Function} iterator Iterator function.
	 * @param {Object} context Context.
	 */
	eachItem: function(array, config, iterator, context) {
		for (var i = config.outerFrom, iLen = config.outerTo; i < iLen; i++) {
			for (var j = config.innerFrom, jLen = config.innerTo; j < jLen; j++) {
				var item = array[i] ? array[i][j] : null;
				if (item) {
					var result = iterator.call(context || this, item, i, j) || {};
					if (result.increaseOuter) {
						i += result.increaseOuter;
					}
					if (result.breakInner) {
						break;
					}
				}
			}
		}
	},

	/**
	 * Calculate width of cells in percentage by receive width of columns.
	 * Determine the sum of the widths of the cells in a row; and it is taken as 100%;
	 * then each cell receives its value as a percentage of its share in the columns.
	 * @protected
	 * @param {Object[]} columns Array of object of columns.
	 * @return {Object[]} columns Array of object of columns with width in percentage.
	 */
	calculateColumnWidth: function(columns) {
		let columnsCount = 0;
		Terrasoft.each(columns, function(column) {
			columnsCount += parseInt(column.DataColspan, 10);
		}, this);
		let i = 0;
		do {
			const column = columns[i];
			column.PercentWidth = ((column.DataColspan * 100) / columnsCount);
			column.Width = Math.round((column.DataColspan * column.ParentWidth) / this.maxColumnsCount);
			i++;
		} while (i < columns.length - 1);
		const lastColumn = Terrasoft.last(columns);
		const columnsWithoutLast = columns.filter(column => column !== lastColumn);
		if (columnsWithoutLast.length) {
			lastColumn.PercentWidth = (lastColumn.DataColspan * 100) / columnsCount;
			const otherColumnsWidthAmount = columnsWithoutLast.reduce((value, column) =>
				value + column.Width, 0);
			const parentWidth = lastColumn.ParentWidth * (columnsCount / this.maxColumnsCount);
			lastColumn.Width = Math.ceil(parentWidth - otherColumnsWidthAmount);
		}
		return columns;
	},

	/**
	 * Calculate width of cells for range of columns and rows.
	 * @protected
	 * @param {Object} layoutItems Configuration location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of number of row.
	 * @param {Number} options.maxRow Maximum value of number of row.
	 * @param {Number} options.minColumn Minimum value of number of column.
	 * @param {Number} options.maxColumn Maximum value of number of column.
	 * @return {Object[]} Width of cell.
	 */
	getColumnWidth: function(layoutItems, options) {
		var resetRowsRange = false;
		var processMaxColumn = function(layoutItem, currentRow, currentColumn) {
			var colSpan = layoutItem.ColSpan;
			if (currentColumn + colSpan > options.maxColumn) {
				options.maxColumn = currentColumn + colSpan;
				resetRowsRange = true;
			}
		};
		do {
			resetRowsRange = false;
			this.eachLayoutItem(layoutItems, options, processMaxColumn, this);
		} while (resetRowsRange);
		return options.maxColumn - options.minColumn;
	},

	/**
	 * Calculate count of row on template, which are combined in the range of rows ona columns.
	 * @protected
	 * @param {Object} layoutItems Config location items of block on grid.
	 * @param {Object} options The range of values for which are generated.
	 * @param {Number} options.minRow Minimum value of number of row.
	 * @param {Number} options.maxRow Maximum value of number of row.
	 * @param {Number} options.minColumn Minimum value of number of column.
	 * @param {Number} options.maxColumn Maximum value of number of column.
	 * @return {Number} Height of row
	 */
	calculateRowHeight: function(layoutItems, options) {
		this.eachLayoutItem(layoutItems, options, function(layoutItem, currentRow) {
			var rowSpan = currentRow + layoutItem.RowSpan;
			if (rowSpan > options.maxRow) {
				options.maxRow = rowSpan;
			}
		}, this);
		return options.maxRow - options.minRow;
	},

	/**
	 * Returns config of location by array of items of grid.
	 * @protected
	 * @param {Object[]} items Array of items of grid.
	 * @return {Object} Config of location by array of items of grid.
	 */
	getLayoutItemsConfig: function(items) {
		var layoutItems = {};
		Terrasoft.each(items, function(item) {
			if (!item.RowSpan || item.RowSpan < 1) {
				item.RowSpan = 1;
			}
			var row = item.Row;
			var layoutItemsRow = (layoutItems[row] || (layoutItems[row] = {}));
			layoutItemsRow[item.Column] = item;
		}, this);
		return layoutItems;
	},

	/**
	 * Calculate count of rows in config.
	 * @protected
	 * @return {Number} Count of rows.
	 */
	getRowsCount: function(layoutItems) {
		var rows = Ext.Object.getKeys(layoutItems);
		rows = Ext.Array.map(rows, function(row) {
			return parseInt(row, 10);
		}, this);
		var maxRowsCount = parseInt(Ext.Array.max(rows), 10);
		maxRowsCount++;
		return maxRowsCount;
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportItem
	 * @override
	 * @protected
	 */
	exportItem: function(config) {
		var itemType = config.ItemType;
		var result = null;
		switch (itemType) {
			case this.ExportedItemType.BLOCKROW:
				result = this.exportBlockRow(config);
				break;
			case this.ExportedItemType.BLOCKCOLUMN:
				result = this.exportBlockColumn(config);
				break;
			case this.ExportedItemType.BUTTONSGROUP:
				result = this.exportButtonsGroup(config);
				break;
			default:
				result = this.callParent(arguments);
		}
		return result;
	},

	/**
	 * @inheritdoc Terrasoft.exporters.BaseContentExporter#exportData
	 * @override
	 * @protected
	 */
	exportData: function(config) {
		const singleHtmlBlock = this.findSingleHtmlBlock(config);
		let html;
		if (singleHtmlBlock && singleHtmlBlock.Content) {
			html = singleHtmlBlock.Content;
		} else {
			html = this.callParent(arguments);
		}
		if (config.PreHeaderText) {
			html = this._addPreHeaderIfNotExists(html, config);
		}
		if (this.minify) {
			try {
				html = Terrasoft.utils.minifier.minify(html, this.minificationConfig);
			} catch (e) {
				this.log(`minification failed: ${e.name}, message: ${e.message}`, Terrasoft.LogMessageType.WARNING);
			}
		}
		return html;
	},

	/**
	 * Returns html with pre-header text added.
	 * @private
	 * @param {String} html HTML-block.
	 * @param {Object} config Content configuration.
	 * @return {String} HTML-block.
	 */
	_addPreHeaderIfNotExists: function(html, config) {
		var parser = new DOMParser();
		var document = parser.parseFromString(html, "text/html");
		if (document.getElementsByClassName(this.preHeaderClassName).length > 0) {
			return html;
		}
		var preHeader = document.createElement("span");
		preHeader.innerHTML = this.generate(this.preHeaderTpl, config);
		document.documentElement.insertBefore(preHeader, document.body);
		return new XMLSerializer().serializeToString(document);
	},

	/**
	 * @private
	 */
	_getImageSource: function(config) {
		return Ext.isEmpty(config.imageSrc)
			? Terrasoft.ImageUrlBuilder.getUrl(config)
			: config.imageSrc;
	},

	/**
	 * @private
	 */
	_prepareImage: function(tplData, config) {
		const imageConfig = config.ImageConfig;
		if (Ext.isEmpty(imageConfig)) {
			tplData.imageSrc = "";
		} else {
			tplData.imageSrc = this._getImageSource(imageConfig);
		}
	},

	/**
	 * @private
	 */
	_prepareMobileImage: function(tplData, config) {
		const mobileImageConfig = config.MobileImageConfig;
		if (mobileImageConfig) {
			tplData.mobileImageSrc = this._getImageSource(mobileImageConfig);
		}
	},

	/**
	 * @private
	 */
	_applyItemSpecificStyles: function(item, tplData) {
		const alignableItems = ["text", "image"];
		if (item.Align && alignableItems.includes(item.ItemType)) {
			tplData.Align = item.Align;
		}
	},

	/**
	 * @private
	 */
	_prepareImageElementStyles: function(tplData, config) {
		const styles = Ext.apply({}, tplData.Styles, this.imageWrapperCssStyles);
		const padding = this.defaultImagePadding;
		Ext.apply(tplData, this._sliceStyles(styles));
		const maxWidth = config.Width ? parseInt(config.Width, 10) + (padding * 2) : tplData.ParentWidth;
		const imageWidth = maxWidth - Terrasoft.calculateStylesWidth(tplData.Styles) - (padding * 2);
		if (config.Width || (!config.Width && !config.Height)) {
			tplData.ImageWidth = imageWidth;
		}
		tplData.Width = maxWidth === tplData.ParentWidth ? "auto" : maxWidth;
		const imageStyles = Ext.apply({
			"max-width": (imageWidth) ? (imageWidth + "px") : "100%"
		}, tplData.ImageStyles, this.imageCssStyles);
		if (!Ext.isEmpty(config.Height) && Ext.isEmpty(config.Width)) {
			imageStyles.width = "auto";
		}
		if (config.Height) {
			tplData.ImageHeight = config.Height;
			imageStyles.height = parseInt(config.Height, 10) - Terrasoft.calculateStylesHeight(tplData.Styles) + "px";
		}
		tplData.imageStyles = Ext.DomHelper.generateStyles(imageStyles);
		const paragraphStyles = Ext.apply({
			"padding": padding + "px",
			"max-width": imageWidth + "px"
		}, tplData.ParagraphStyles, this.imageParagraphCssStyles);
		tplData.paragraphStyles = Ext.DomHelper.generateStyles(paragraphStyles);
		const mobileImageStyles = Ext.apply({}, imageStyles);
		const mobileParagraphStyles = Ext.apply({}, paragraphStyles);
		Ext.apply(mobileImageStyles, {display: "none"});
		Ext.apply(mobileParagraphStyles, {display: "none"});
		tplData.mobileImageStyles = Ext.DomHelper.generateStyles(mobileImageStyles);
		tplData.mobileParagraphStyles = Ext.DomHelper.generateStyles(mobileParagraphStyles);
	},

	/**
	 * @private
	 */
	_applyDefaultPadding: function(columnStyles) {
		if (_.isUndefined(columnStyles.Styles)) {
			columnStyles.Styles = {};
		}
		if (_.isUndefined(columnStyles.Styles["padding-left"])) {
			columnStyles.Styles["padding-left"] = "5px";
		}
		if (_.isUndefined(columnStyles.Styles["padding-right"])) {
			columnStyles.Styles["padding-right"] = "5px";
		}
		if (_.isUndefined(columnStyles.Styles["padding-top"])) {
			columnStyles.Styles["padding-top"] = "5px";
		}
		if (_.isUndefined(columnStyles.Styles["padding-bottom"])) {
			columnStyles.Styles["padding-bottom"] = "5px";
		}
	},

	/**
	 * @private
	 */
	_getMobileBorderRadius: function(styles) {
		const result = {};
		if (!Ext.isEmpty(styles["border-radius"])) {
			const borderProps = ["border-left", "border-top", "border-right", "border-bottom"];
			const existedProps = borderProps.filter(prop => Boolean(styles[prop]) && !styles[prop].includes("None"));
			const maxBorder = Math.max(...existedProps.map(prop => parseInt(styles[prop], 10)), 0);
			result["border-radius"] = `${Math.max(parseInt(styles["border-radius"], 10) - maxBorder, 0)}px`;
		}
		return result;
	},

	/**
	 * @private
	 */
	_getColumnStyles: function(styles) {
		const columnStyles = this._sliceObjectByFn(styles, (key) => key.startsWith("padding"));
		if (!Ext.isEmpty(styles.height)) {
			columnStyles.height = parseInt(styles.height, 10) - Terrasoft.calculateStylesHeight(styles) + "px";
		}
		if (!Ext.isEmpty(styles["line-height"])) {
			columnStyles["line-height"] = styles["line-height"];
		}
		return columnStyles;
	},

	/**
	 * @private
	 */
	_sliceStyles: function(styles, elementStyles) {
		const columnStyles = this._getColumnStyles(styles);
		const slicedStyles = this._sliceObjectByFn(styles, (key) => !columnStyles.hasOwnProperty(key));
		const borderRadius = this._getMobileBorderRadius(styles);
		return {
			columnStyles: Ext.DomHelper.generateStyles(columnStyles),
			styles: Ext.DomHelper.generateStyles(slicedStyles),
			elementStyles: Ext.DomHelper.generateStyles(elementStyles),
			borderRadiusStyle: Ext.DomHelper.generateStyles(borderRadius)
		};
	},

	/**
	 * @private
	 */
	_sliceObjectByFn: function(source, fn) {
		return _.keys(source).filter(fn).reduce(
			(obj, key) => {
				obj[key] = source[key];
				return obj;
			}, {});
	},

	/**
	 * @private
	 */
	_generateButtonBorder: function(tplData, styles) {
		tplData.border = Ext.DomHelper.generateStyles({
			"border-left": styles["border-left"] || 0,
			"border-right": styles["border-right"] || 0,
			"border-top": styles["border-top"] || 0,
			"border-bottom": styles["border-bottom"] || 0
		});
	},

	/**
	 * @private
	 */
	_generateButtonPadding: function(tplData, styles) {
		tplData.padding = Ext.DomHelper.generateStyles({
			"padding-left": styles["padding-left"] || 0,
			"padding-right": styles["padding-right"] || 0,
			"padding-top": styles["padding-top"] || 0,
			"padding-bottom": styles["padding-bottom"] || 0
		});
	},

	/**
	 * @private
	 */
	_generateButtonWidth: function(styles) {
		if (parseFloat(styles.width) > 0) {
			styles["max-width"] = styles.width = Math.max(0,
				parseFloat(styles.width) -
				(parseFloat(styles["padding-left"]) || 0) -
				(parseFloat(styles["padding-right"]) || 0) -
				(parseFloat(styles["border-left"]) || 0) -
				(parseFloat(styles["border-right"]) || 0)) + "px";
		}
	},

	/**
	 * @private
	 */
	_generateButtonHeight: function(styles) {
		if (parseFloat(styles.height) > 0) {
			styles["max-height"] = styles.height = Math.max(0,
				parseFloat(styles.height) -
				(parseFloat(styles["padding-top"]) || 0) -
				(parseFloat(styles["padding-bottom"]) || 0) -
				(parseFloat(styles["border-bottom"]) || 0) -
				(parseFloat(styles["border-top"]) || 0)) + "px";
		}
	},

	/**
	 * @private
	 */
	_generateButtonHrefStyle: function(styles) {
		delete styles["border"];
		delete styles["border-left"];
		delete styles["border-right"];
		delete styles["border-top"];
		delete styles["border-bottom"];
	},

	/**
	 * @private
	 */
	_addButtonsGroup: function(groupedItems, group) {
		if (group.length > 1) {
			groupedItems.push({
				Items: group,
				ItemType: this.ExportedItemType.BUTTONSGROUP,
				Width: group.reduce((acc, current) => acc + current.Width, 0)
			});
		} else {
			groupedItems.push(group[0]);
		}
	},

	/**
	 * @private
	 */
	_isButtonBlock(item) {
		return item.ItemType === this.ExportedItemType.BLOCKCOLUMN &&
				item.Items.length === 1 &&
				item.Items[0].ItemType === this.ExportedItemType.BUTTON;
	},

	/**
	 * @private
	 */
	_canBeAddedToGroup: function(group, item) {
		return group.length === 0 || group[0].PercentWidth === item.PercentWidth;
	},

	/**
	 * @private
	 */
	_groupRowItems: function(items) {
		const groupedItems = [];
		let group = [];
		items.forEach((item) => {
			if (this._isButtonBlock(item)) {
				if (this._canBeAddedToGroup(group, item)) {
					group.push(item);
				} else {
					this._addButtonsGroup(groupedItems, group);
					group = [item];
				}
			} else {
				if (group.length) {
					this._addButtonsGroup(groupedItems, group);
					group = [];
				}
				groupedItems.push(item);
			}
		});
		if (group.length) {
			this._addButtonsGroup(groupedItems, group);
		}
		return groupedItems;
	}

});

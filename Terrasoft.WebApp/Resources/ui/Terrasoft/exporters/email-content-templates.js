Ext.define("Terrasoft.exporters.EmailContentTemplates", {
	alternateClassName: "Terrasoft.EmailContentTemplates",
	singleton: true,

	// region Methods: Public

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for invisible content on mso client.
	 * @public
	 * @param {String[]} children Nested elements.
	 * @return {String} Html template.
	 */
	getNotMsoTpl: function(...children) {
		return `<!--[if !mso]><!-- -->${children.join("")}<!--<![endif]-->`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for desktop background container.
	 * @public
	 * @param {Object} options Options.
	 * @param {String} options.style Inline element styles.
	 * @param {String} options.width Container width.
	 * @param {String} options.align Container align.
	 * @param {String} options.additionalClass Additional container classes.
	 * @param {String[]} children Nested elements.
	 * @return {String} Html template.
	 */
	getDesktopBackgroundTpl: function(options, ...children) {
		return `<table style="${options.style || ""} {styles}" width="${options.width || "100%"}" cellpadding="0"
		cellspacing="0" ${options.align ? `<tpl if="${options.align}"> align="{${options.align}}" </tpl>` : ``}
		<tpl if="mobileBackground"> class="${options.additionalClass || ""} ignore-collapse desktop-background">
		<tpl else>class="${options.additionalClass || ""}  ignore-collapse"></tpl>
			<tbody>
				<tr>
				${children.join("")}
				</tr>
			</tbody>
		</table>`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for mobile background container.
	 * @public
	 * @param {Object} outerColumnOptions Outer column attribute map.
	 * @param {String[]} children Nested elements.
	 * @return {String} Html template.
	 */
	getMobileBackgroundTpl: function(outerColumnOptions, ...children) {
		const mobileBackgroundTpl = this.getColumnTpl(outerColumnOptions,`
			<table width="100%" class="ignore-collapse mobile-background" cellpadding="0" cellspacing="0"
				<tpl if="mobileBackground"> style="{borderRadiusStyle};background-size: 0;
			background-image: url({mobileBackground})"</tpl>>
				<tbody>
					<tr>
						${children.join("")}
					</tr>
				</tbody>
			</table>`);
		const canSkip = Terrasoft.Features.getIsEnabled("OptimizeMobileBackgroundTemplate") &&
			Terrasoft.isEmptyObject(outerColumnOptions);
		return `
			${canSkip ? `<tpl if="mobileBackground">`: ""}
			${mobileBackgroundTpl}
			${canSkip  ? `<tpl else>${children.join("")}</tpl>` : ""}`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for table column.
	 * @public
	 * @param {Object} options Element attribute map.
	 * @param {String[]} children Nested elements.
	 * @return {String} Html template.
	 */
	getColumnTpl: function(options, ...children) {
		return `<td ${Object.keys(options).map(key => `${key}="${options[key]}"`).join(" ")}>
					${children.join("")}
				</td>`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for nested elements.
	 * @public
	 * @return {String} Html template.
	 */
	getContainerTpl: function() {
		return `{%this.generateItems(out, values)%}`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for separator element.
	 * @public
	 * @return {String} Html template.
	 */
	getSeparatorTpl: function() {
		return `
			<table border="0" cellpadding="0" cellspacing="0" width="100%"
					class="separator-element-wrapper flexible-container">
				<tbody>
					<tr>
						<td>
							<table cellpadding="0" cellspacing="0"
								border="0" width="100%"
								class="separator-element flexible-container">
								<tbody>
									<tr>
										<td style="{separatorStyles}">
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for mobile row element.
	 * @public
	 * @return {String} Html template.
	 */
	getMobileRowsTpl: function() {
		return `<tpl for="mobileItems">
			<!--[if !((gte mso 9)|(mso 9))]><!-->
				<tr style="display: none;" class="mobile-item">
					<td valign="top" style="{parent.rowTplData.styles}" class="flexible-container">
						<!--[if (gte mso 9)|(IE)]><table width="100%" align="center" valign="top" cellpadding="0"
							cellspacing="0" border="0"><tr><![endif]-->
						{html}
						<!--[if (gte mso 9)|(IE)]></tr></table><![endif]-->
					</td>
				</tr>
			<!--<![endif]-->
			</tpl>`;
	},

	/**
	 * {@link Ext.XTemplate Template} HTML-Template for image element.
	 * @public
	 * @param {Object} options Options.
	 * @param {String} options.src Image source.
	 * @param {String} options.height Image height.
	 * @param {String} options.width Image width.
	 * @param {String} options.additionalClass Additional image classes.
	 * @return {String} Html template.
	 */
	getImageTpl: function(options) {
		return `
			<p style="{paragraphStyles}" class="adaptive-image">
				<tpl if="hasLink"><a href="{Link}" target="_blank" title="{Link}"></tpl>
				<img src="${options.src}" class="adaptive-image flexible-image ${options.additionalClass || ""}"
					<tpl if="hasTitle"> title="{title}"</tpl>
					${options.width ? `width="${options.width}"` : ""} ${options.height ? `height="${options.height}"` : ""}
					mc:label="{alt}" alt="{alt}" mc:edit="{alt}" style="{imageStyles}" />
				<tpl if="hasLink"></a></tpl>
			</p>`;
	}

	// endregion

});

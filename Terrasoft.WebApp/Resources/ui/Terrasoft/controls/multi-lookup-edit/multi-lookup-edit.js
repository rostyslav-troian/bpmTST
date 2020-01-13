/**
 * Class for MultiLookupEdit.
 */
Ext.define("Terrasoft.controls.MultiLookupEdit", {
	extend: "Terrasoft.controls.ComboBoxEdit",
	alternateClassName: "Terrasoft.MultiLookupEdit",

	/**
	 * @inheritdoc Terrasoft.controls.Component#tpl
	 * @overridden
	 */
	tpl: [
		`<div id="{id}-wrap" style="{wrapStyle}" class="{wrapClassName}">
			<ul id="{id}-selected-items" class="selected-items">
				<tpl for="selectedItems">
					<li class="selected-item">
						<span id="{id}-wrapperEl" class="t-btn-wrapper t-btn-style-default">
							<span id="{id}-textEl" class="t-btn-text">{caption}</span>
							<span id="{id}-imageEl" class="t-btn-image"></span>
						</span>
					</li>
				</tpl>
				<li class="search-field">
					<input id="{id}-el" class="base-edit-input" type="{inputType}" placeholder="{placeholder}"
				</li>
			</ul>
		</div>`
	],

	enableRightIcon: false,

	/**
	 * Selected items.
	 * @type {Terrasoft.core.collections.Collection}
	 */
	selectedItems: null,

	/**
	 * @inheritdoc Terrasoft.controls.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.el.on("input", this.onElInput, this);
		this.wrapEl.on("click", this.onWrapElClick, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		Ext.apply(tplData, {
			wrapClassName: ["base-edit", "ts-box-sizing", "multi-lookup-edit"],
			placeholder: Terrasoft.encodeHtml(this.placeholder)
		});

		tplData.selectedItems = [
			{
				id: Ext.id(),
				caption: "item 1"
			},
			{
				id: Ext.id(),
				caption: "item 2"
			}
		];
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.controls.ComboBoxEdit#onMouseDownCollapse
	 * @override
	 */
	onMouseDownCollapse: function() {
		this.callParent(arguments);
		this.adjustInputWidth();
	},


	/**
	 * @protected
	 */
	onElInput: function() {
		this.adjustInputWidth();
	},

	/**
	 * @protected
	 */
	adjustInputWidth: function() {
		const text = this.el.getValue();
		const measureWidth = Ext.util.TextMetrics.measure(this.el, text, 0).width;
		Ext.util.TextMetrics.destroy();
		this.el.setWidth(measureWidth + 25);
	},

	/**
	 * @protected
	 */
	onWrapElClick: function() {
		this.el.focus();
		this.expandList();
	}

});

/**
 * Class of content builder section column.
 */
Ext.define("Terrasoft.controls.ContentMjColumn", {
	extend: "Terrasoft.controls.ContentColumn",
	alternateClassName: "Terrasoft.ContentMjColumn",

	/**
	 * A collection of toolbar items.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tools: null,

	/**
	 * Identifier of wrap group.
	 * @type {String}
	 */
	groupId: null,

	/**
	 * A collection of style classes for the tool container.
	 * @protected
	 * @type {String[]}
	 */
	toolsWrapClasses: ["column-grouping-control"],

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-column" class="{contentColumnWrap}" style="{wrapStyle}">
			<div class="content-column-element">
				<div id="{id}-inner-container" class="{innerContainerClassName}" style="{columnStyle}">` +
					`{%this.renderItems(out, values)%}` +
					`<div id="{id}-content-column-placeholder-wrap" class="{contentColumnPlaceholderWrap}">
						<div id="{id}" class="{contentColumnPlaceholder}">
							<span class="placeholder-image"></span>
							<br>
							<span>{placeholder}</span>
						</div>
					</div>
				</div>
			</div>
			<tpl if="hasTools">
				<div id="{id}-content-column-tools" class="{toolsWrapClasses}">
					<tpl for="tools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>
			</tpl>
		</div>`
	],

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.applyToolsTplData(tplData);
		tplData.groupId = this.groupId;
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = this.callParent(arguments);
		Ext.apply(selectors, {
			toolsEl: "#" + this.id + "-content-column-tools"
		});
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		this.addToolsToRenderData(renderData);
	},

	/**
	 * Handler for group id change event.
	 * @param {Boolean} groupId New value.
	 */
	setGroupingId: function(groupId) {
		this.groupId = groupId;
		this.safeRerender();
	},

	/**
	 * Handler of collection 'add' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onAddItem: function(itemModel, index) {
		this.insert(itemModel, index);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyTools();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		Ext.apply(bindConfig, {
			groupId: {
				changeMethod: "setGroupingId"
			}
		});
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.mixins.selectable.bindTools.apply(this);
	}
});

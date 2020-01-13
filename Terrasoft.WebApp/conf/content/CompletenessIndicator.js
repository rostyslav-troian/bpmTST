Terrasoft.configuration.Structures["CompletenessIndicator"] = {innerHierarchyStack: ["CompletenessIndicator"]};
define("CompletenessIndicator", ["RoundProgressBar", "CompletenessMenu", "CompletenessMenuItem",
		"css!CompletenessIndicator"],
	function() {

		/**
		 * @class Terrasoft.controls.CompletenessIndicator
		 * Round completeness indicator component class.
		 * @deprecated Use {@link #Terrasoft.RoundProgressBar}.
		 */
		var completenessIndicatorClass = Ext.define("Terrasoft.controls.CompletenessIndicator", {
			alternateClassName: "Terrasoft.CompletenessIndicator",
			extend: "Terrasoft.RoundProgressBar",

			mixins: {
				menuMixin: "Terrasoft.MenuMixin"
			},

			//region Fields: Protected

			/**
			 * @inheritdoc Terrasoft.Component#tpl
			 * @overridden
			 */
			tpl: [
				/* jshint ignore:start */
				/* jscs:disable */
				'<div id="{id}-wrap" class="{wrapClass} ts-round-progress-bar-wrap completeness-indicator-wrap" style="{wrapStyle}" progress-data="{value}">',
					'<div id="{id}-circle" class="circle" style="{circleElStyle}">',
						'<div id="{id}-firstHalf" class="half" style="{firstHalfElStyle}"></div>',
						'<div id="{id}-secondHalf" class="half" style="{secondHalfElStyle}"></div>',
					'</div>',
					'<div id="{id}-overlay" class="overlay" style="{overlayElStyle}" data-item-marker="{id}">{value}%</div>',
					'<tpl if="menu">',
						'<span id="{id}-menuWrapEl" class="{menuWrapClass}"></span>',
					'</tpl>',
				'</div>'
				/* jscs:enable */
				/* jshint ignore:end */
			],

			/**
			 * ###### ######## ############ ###### ##########.
			 * @overridden
			 */
			sectorsColors: ["#FF9584", "#FDCC65", "#B7E975"],

			/**
			 * ###### ######## ###### ###### ##########.
			 * @overridden
			 */
			sectorsBounds: [0, 25, 75, 100],

			/**
			 * @inheritdoc Terrasoft.MenuMixin#menuClass
			 * @overridden
			 */
			menuClass: "Terrasoft.CompletenessMenu",

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.Component#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.mixins.menuMixin.init.call(this);
			},

			/**
			 * ############## ####### DOM.
			 * @protected
			 * @overridden
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				var wrapEl = this.getWrapEl();
				if (wrapEl) {
					wrapEl.on({
						click: {
							fn: this.onClick,
							scope: this
						}
					});
				}
			},

			/**
			 * ############ ##### ######.
			 * @param {Ext.EventObjectImpl} e ###### #######.
			 * @protected
			 */
			onClick: function(e) {
				e.stopEvent();
				if (!this.enabled) {
					return;
				}
				var showMenu = this.menu && this.menu.items && this.menu.items.getCount() > 0;
				if (this.handler || this.hasListener("click")) {
					if (this.handler) {
						var obsoleteMessage = Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
						this.log(Ext.String.format(obsoleteMessage, "handler", "click event"));
						this.handler();
					}
					showMenu = (this.fireEvent("click", this, null, null, null) === false) && showMenu;
				}
				if (showMenu) {
					this.showMenu();
				}
			},

			/**
			 * ######### ######## #### # ######### ######.
			 * @overridden
			 */
			bind: function() {
				this.callParent(arguments);
				this.mixins.menuMixin.bindMenu.call(this, this.model);
			},

			/**
			 * @inheritdoc Terrasoft.Component#clearDomListeners
			 * @overridden
			 */
			clearDomListeners: function() {
				this.callParent(arguments);
				this.unsubscribeWindowScroll();
			}

			//endregion
		});

		return completenessIndicatorClass;
	}
);



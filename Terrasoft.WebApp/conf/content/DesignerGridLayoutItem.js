Terrasoft.configuration.Structures["DesignerGridLayoutItem"] = {innerHierarchyStack: ["DesignerGridLayoutItem"]};
define("DesignerGridLayoutItem", ["ext-base", "terrasoft", "sandbox", "DesignerGridLayoutItemResources",
	"css!DesignerGridLayoutItem"],
	function(Ext, Terrasoft, sandbox, resources) {

		/**
		 * @class Terrasoft.controls.DesignerGridLayoutItem
		 * ##### ######## ######### #####.
		 */
		var designerGridLayoutItem = Ext.define("Terrasoft.controls.DesignerGridLayoutItem", {
			extend: "Terrasoft.Label",
			alternateClassName: "Terrasoft.DesignerGridLayoutItem",

			/**
			 * ####### css-##### ### ######## ##########.
			 * @protected
			 * @virtual
			 * @type {String}
			 */
			designerGridLayoutItemClasses: "",

			/**
			 * @inheritDoc Terrasoft.Label#labelClass
			 * @overridden
			 */
			labelClass: "designerGridLayoutItem-text",

			/**
			 * @inheritDoc Terrasoft.Label#tpl
			 * @overridden
			 */
			tpl: [
				"<div id='{id}-wrap' class='{designerGridLayoutItemClasses}'>",
				"<label id = {id} class = '{labelClass}'>{caption}",
				"</label>",
				"</div>"
			],

			/**
			 * @inheritDoc Terrasoft.Label#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				var itemTplData = {
					designerGridLayoutItemClasses: this.designerGridLayoutItemClasses
				};
				Ext.apply(itemTplData, tplData, {});
				return itemTplData;
			},

			/**
			 * @inheritDoc Terrasoft.Label#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents(
						/**
						 * @event
						 * ####### ######## ####### ## ######.
						 * @param {Terrasoft.DesignerGridLayoutItem} this
						 */
						"dblclick"
				);
			},

			/**
			 * @inheritDoc Terrasoft.Label#initDomEvents
			 * @overridden
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				var el = this.getWrapEl();
				el.on("dblclick", this.onDblClick, this);
			},

			/**
			 * ########## ####### ######## ##### ## ######## ##########.
			 * @private
			 */
			onDblClick: function() {
				if (this.enabled) {
					this.fireEvent("dblclick", this);
				}
			},

			/**
			 * ######## ########### ##### onDestroy ## ########### #######.
			 */
			destroy: function() {
				if (this.rendered) {
					var el = this.getWrapEl();
					el.un("dblclick", this.onDblClick, this);
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Label#getSelectors
			 * @overridden
			 */
			getSelectors: function() {
				return {
					wrapEl: "#" + this.id + "-wrap",
					el: "#" + this.id
				};
			}
		});

		return designerGridLayoutItem;
	});



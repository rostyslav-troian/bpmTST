Terrasoft.configuration.Structures["MobileDesignerViewGenerator"] = {innerHierarchyStack: ["MobileDesignerViewGenerator"]};
define("MobileDesignerViewGenerator", ["ext-base", "terrasoft", "DesignViewGeneratorV2"],
	function(Ext, Terrasoft) {

		/**
		 * ##### ######## # ##### ######### ########## ##########.
		 * @class Terrasoft.configuration.MobileDesignerGridLayoutEditItem
		 */
		Ext.define("Terrasoft.configuration.MobileDesignerGridLayoutEditItem", {
			extend: "Terrasoft.controls.GridLayoutEditItem",
			alternateClassName: "Terrasoft.MobileDesignerGridLayoutEditItem",

			/**
			 * @inheritDoc Terrasoft.GridLayoutEditItem#b4StartDrag
			 * @overridden
			 */
			b4StartDrag: function() {
				this.callParent(arguments);
				this.wrapEl.setVisible(true);
			}
		});

		/**
		 * @class Terrasoft.configuration.MobileDesignerViewGenerator
		 * Class that generates view for mobile designer.
		 */
		var viewGenerator = Ext.define("Terrasoft.configuration.MobileDesignerViewGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.MobileDesignerViewGenerator",

			/**
			 * @private
			 */
			notConfigurable: ["SocialMessageDetailV2StandartDetail", "SocialMessageDetailV2StandardDetail"],

			/**
			 * @inheritDoc Terrasoft.ViewGenerator#generateControlGroup
			 * @overridden
			 */
			generateControlGroup: function(config) {
				var wrapClass = config.wrapClass || [];
				wrapClass.push("detail");
				var caption = config.caption;
				var controlGroup = {
					className: "Terrasoft.ControlGroup",
					caption: caption,
					collapsed: { bindTo: config.name + "Collapsed" },
					collapsedchanged: { bindTo: config.name + "CollapseChange" },
					items: [],
					wrapClass: wrapClass.join(" "),
					markerValue: caption
				};
				Terrasoft.each(config.items, function(childItem) {
					var childItemConfig = this.generateItem(childItem);
					controlGroup.items = controlGroup.items.concat(childItemConfig);
				}, this);
				if (!config.disableTools) {
					controlGroup.tools = this.generateControlGroupTools(config);
				}
				return controlGroup;
			},

			/**
			 * ########## ############ ######### ######### ### ###### #########.
			 * @protected
			 * @virtual
			 * @param {Object} config ############ ###### #########.
			 * @return {Object[]} ############### ############# ######### #########.
			 */
			generateControlGroupTools: function(config) {
				var itemName = config.name;
				var itemIsConfigurable = (!Ext.Array.contains(this.notConfigurable, itemName));
				var configurationButton = (itemIsConfigurable) ?
					this.generateButton({
						name: itemName + "Configuration",
						caption: { "bindTo": "Resources.Strings.ConfigureControlGroupButtonCaption" },
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: itemName,
						click: { bindTo: "onConfigureControlGroupButtonClick" }
					}) : null;
				var removeButton = this.generateButton({
					name: itemName + "Remove",
					caption: { "bindTo": "Resources.Strings.RemoveControlGroupButtonCaption" },
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					tag: itemName,
					click: { bindTo: "onRemoveControlGroupButtonClick" }
				});
				var result = [];
				if (configurationButton) {
					result.push(configurationButton);
				}
				if (config.useOrderTools) {
					var moveUpButton = this.generateButton({
						name: itemName + "MoveUp",
						imageConfig: { "bindTo": "Resources.Images.MoveUpButtonImage" },
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: itemName,
						click: { bindTo: "onMoveUpControlGroupButtonClick" }
					});
					result.push(moveUpButton);
					var moveDownButton = this.generateButton({
						name: itemName + "MoveDown",
						imageConfig: { "bindTo": "Resources.Images.MoveDownButtonImage" },
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: itemName,
						click: { bindTo: "onMoveDownControlGroupButtonClick" }
					});
					result.push(moveDownButton);
				}
				result.push(removeButton);
				return result;
			},

			/**
			 * ########## ############ ############# ### ##### {Terrasoft.ViewItemType.GRID_LAYOUT}.
			 * @protected
			 * @overridden
			 * @param {Object} config ############ #####.
			 * @return {Object} ############### ############# #####.
			 */
			generateGridLayout: function(config) {
				var controlId = config.name;
				var result = {
					className: "Terrasoft.GridLayoutEdit",
					itemClassName: "Terrasoft.MobileDesignerGridLayoutEditItem",
					id: controlId,
					selectors: { wrapEl: "#" + controlId },
					rows: { bindTo: config.name + "Rows" },
					columns: 1,
					items: { bindTo: config.name + "ItemsCollection" },
					selectedItemsChange: { bindTo: config.name + "SelectedItemsChange" },
					selectionChanged: { bindTo: config.name + "SelectionChanged" },
					visible: { bindTo: config.name + "Visible" },
					autoHeight: true,
					autoWidth: false,
					multipleSelection: false,
					allowItemsIntersection: false,
					changePositionForIntersectedItems: true,
					minRows: 1,
					maxRows: config.maxRows,
					selectionType: Terrasoft.GridLayoutEditSelectionType.HORIZONTAL
				};
				this.applyControlConfig(result, config);
				return result;
			}

		});
		return Ext.create(viewGenerator);
	});



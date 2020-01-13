Terrasoft.configuration.Structures["FullWidthLabelViewGenerator"] = {innerHierarchyStack: ["FullWidthLabelViewGenerator"]};
define("FullWidthLabelViewGenerator", ["ext-base", "FullWidthLabelViewGeneratorResources", "terrasoft",
		"DesignViewGeneratorV2", "CtiContainerList"],
	function(Ext, resources, Terrasoft) {
		var viewGenerator = Ext.define("Terrasoft.configuration.FullWidthLabelViewGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.FullWidthLabelViewGenerator",

			/**
			 * Generates config for label field.
			 * @param {Object} viewConfig Parent control config.
			 * @return {Object} Generated config for label.
			 */
			generateFullWidthLabel: function(viewConfig) {
				var labelConfig = viewConfig.labelConfig;
				var config = {
					"id": viewConfig.name + "Label",
					"name": viewConfig.name,
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": labelConfig.classes,
					"caption": labelConfig.caption
				};
				var label = this.generateLabel(config);
				return label;
			},

			/**
			 * Generates config for edit field.
			 * @param {Object} viewConfig Parent control config.
			 * @return {Object} Generated config for edit.
			 */
			generateEdit: function(viewConfig) {
				var listConfig = viewConfig.listConfig;
				var config = {
					"id": viewConfig.name + "Edit",
					"name": viewConfig.name,
					"className": viewConfig.className,
					"dataValueType": viewConfig.dataValueType,
					"classes": listConfig.classes
				};
				if (listConfig.list) {
					Ext.apply(config, {"list": listConfig.list});
				}
				if (listConfig.prepareList) {
					Ext.apply(config, {"prepareList": listConfig.prepareList});
				}
				Ext.apply(config, {"labelConfig": {"visible": false}});
				return this.generateModelItem(config);
			},
			/**
			 * Generates config for control.
			 * @protected
			 * @param {Object} viewConfig Control config.
			 * @param {Object} config Internal control config.
			 * @return {Object} Generated config for FullWidthLabel.
			 */
			generate: function(viewConfig, config) {
				this.init(config);
				var modelItemWrapId = this.getControlId(viewConfig, "Terrasoft.Container");
				var modelItemWrap = this.getDefaultContainerConfig(modelItemWrapId, viewConfig);
				this.addClasses(modelItemWrap, "wrapClassName", viewConfig.wrapClasses);
				var label = this.generateFullWidthLabel(viewConfig);
				var comboBox = this.generateEdit(viewConfig);
				modelItemWrap.items.push(label, comboBox);
				return modelItemWrap;
			}
		});
		return Ext.create(viewGenerator);
	});



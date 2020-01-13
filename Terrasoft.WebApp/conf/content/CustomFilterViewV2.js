Terrasoft.configuration.Structures["CustomFilterViewV2"] = {innerHierarchyStack: ["CustomFilterViewV2"]};
define("CustomFilterViewV2", ["ext-base", "terrasoft", "CustomFilterViewV2Resources"],
	function(Ext, Terrasoft, resources) {

		function generateAddSimpleFilterConfig(valueEditConfig, simpleFilterEditContainerName, customFilterId) {
			var config = valueEditConfig ? valueEditConfig : "Terrasoft.TextEdit";
			var viewConfig = {
				id: simpleFilterEditContainerName,
				selectors: {
					el: "#" + simpleFilterEditContainerName,
					wrapEl: "#" + simpleFilterEditContainerName
				},
				classes: {
					wrapClassName: "filter-inner-container simple-filter-edit-container"
				},
				items: [{
						className: "Terrasoft.ComboBoxEdit",
						markerValue: "columnEdit",
						classes: {
							wrapClass: "filter-simple-filter-edit"
						},
						value: {
							bindTo: "simpleFilterColumn"
						},
						list: {
							bindTo: "simpleFilterColumnList"
						},
						prepareList: {
							bindTo: "getSimpleFilterColumnList"
						},
						change: {
							bindTo: "simpleFilterColumnChange"
						},
						visible: {
							bindTo: "columnEditVisible"
						},
						placeholder: resources.localizableStrings.SimpleFilterEmptyColumnEditPlaceHolder
					},
					Ext.apply(getSimpleFilterValueEditConfig(config), {
						id: customFilterId
					}),
					{
						className: "Terrasoft.Button",
						markerValue: "applyButton",
						imageConfig: resources.localizableImages.ApplyButtonImage,
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						hint: resources.localizableStrings.ApplyButtonHint,
						classes: {
							wrapperClass: ["filter-element-with-right-space"]
						},
						click: {
							bindTo: "applySimpleFilter"
						}
					},
					{
						className: "Terrasoft.Button",
						markerValue: "cancelButton",
						imageConfig: resources.localizableImages.CancelButtonImage,
						hint: resources.localizableStrings.CancelButtonHint,
						click: {
							bindTo: "destroySimpleFilterAddingContainer"
						}
					}
				],
				destroy: {
					bindTo: "clearSimpleFilterProperties"
				}
			};
			return viewConfig;
		}

		function generate(config) {
			var shortFilterConfig = getShortFilterConfig(config);
			/*jshint quotmark: false */
			/* jscs:disable */
			var viewConfig = {
				id: config.customFilterContainerName,
				selectors: {
					el: "#" + config.customFilterContainerName,
					wrapEl: "#" + config.customFilterContainerName
				},
				tpl: [
					'<span id="{id}" style="{wrapStyles}" class="{wrapClassName}">',
					"{%this.renderItems(out, values)%}",
					"</span>"
				],
				classes: {
					wrapClassName: "custom-filter-container custom-filter-arrow"
				},
				items: [{
					className: "Terrasoft.Container",
					id: config.customFilterButtonContainerName,
					selectors: {
						el: "#" + config.customFilterButtonContainerName,
						wrapEl: "#" + config.customFilterButtonContainerName
					},
					classes: {
						wrapClassName: "filter-inner-container custom-filter-button-container"
					},
					items: [shortFilterConfig]
				}],
				afterrender: {
					bindTo: "initialize"
				}
			};
			/* jscs:enable */
			/*jshint quotmark: true */
			return viewConfig;
		}

		function getSimpleFilterValueEditConfig(config) {
			var controlConfig = {
				markerValue: "searchEdit",
				classes: {
					wrapClass: "filter-simple-filter-edit"
				},
				value: {
					bindTo: "simpleFilterValueColumn"
				},
				enterkeypressed: {
					bindTo: "applySimpleFilter"
				},
				placeholder: resources.localizableStrings.SimpleFilterEmptyValueEditPlaceHolder
			};
			if (config.className) {
				Ext.apply(controlConfig, config);
			} else {
				controlConfig.className = config;
			}
			return controlConfig;
		}

		/**
		 * Returns parameters for building a filter view depending on the display mode.
		 * @protected
		 * @param {Object} config [description]
		 * @param {Boolean} config.isShowShortFilterMenu Sign of displaying a filter with a drop-down menu.
		 * @param {Boolean} config.showButtonCaption Indicates the display of the button label.
		 * @return {Object} shortFilterConfig Parameters for building a filter view.
		 */
		function getShortFilterConfig(config) {
			var addConfigFilter = null;
			var shortFilterConfig = {
				className: "Terrasoft.Button",
				imageConfig: {
					bindTo: "filterIcon"
				},
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				markerValue: "filterButton"
			};
			if (!config.isShortFilterVisible) {
				addConfigFilter = {
					caption: {
						bindTo: "buttonCaption"
					},
					menu: {
						items: {
							bindTo: "ActionsMenu"
						},
						ulClass: "menu-item-image-size-16"
					}
				};
			} else {
				addConfigFilter = {
					click: {
						bindTo: "showSimpleFilter"
					}
				};
				if (config.showButtonCaption) {
					addConfigFilter.caption = {
						bindTo: "buttonCaption"
					};
				}
			}
			Ext.apply(shortFilterConfig, addConfigFilter);
			return shortFilterConfig;
		}

		return {
			generate: generate,
			generateAddSimpleFilterConfig: generateAddSimpleFilterConfig,
			getSimpleFilterValueEditConfig: getSimpleFilterValueEditConfig
		};
	});



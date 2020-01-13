Terrasoft.configuration.Structures["CheckBoxFixedFilterStyle"] = {innerHierarchyStack: ["CheckBoxFixedFilterStyle"]};
define("CheckBoxFixedFilterStyle", ["CheckBoxFixedFilterStyleResources", "ext-base", "terrasoft",
		"css!CheckBoxFixedFilterStyle"],
	function(resources, Ext, Terrasoft) {
		/**
		 * ############### ##### ### ########## # ############## #########
		 * @param {Object} scope
		 */
		function setFilterContainerStyle(scope) {
			var checkBox = Ext.get("SectionFiltersContainer");
			var isCardVisible = scope.get("IsCardVisible");
			if (checkBox) {
				var filterContainer = Ext.get("StatusFilterContainer");
				var caseSectionGridContainer = Ext.get("CaseSectionGridDataViewContainer");
				var problemSectionGridContainer = Ext.get("ProblemSectionGridDataViewContainer");
				if (isCardVisible) {
					checkBox.setStyle("display", "block");
					checkBox.setStyle("padding-left", "0");
					filterContainer.setStyle("float", "none");
					filterContainer.setStyle("top", "7px");
					if (caseSectionGridContainer) {
						caseSectionGridContainer.setStyle("padding-top", "34px");
					}
					if (problemSectionGridContainer) {
						problemSectionGridContainer.setStyle("padding-top", "34px");
					}
				} else {
					checkBox.setStyle("padding-left", "2px");
					//checkBox.setStyle("display", "inline-block");
					filterContainer.setStyle("float", "left");
					if (Ext.isIE) {
						filterContainer.setStyle("top", "-7px");
					} else {
						filterContainer.setStyle("top", "0");
					}
				}
			}
		}
		/**
		 * Set image for CheckBox
		 * @param {String} imageName - image name in resources
		 * @param {Object} scope
		 */
		function setCheckBoxBackground(imageName, scope) {
			var scopeIdParts = scope.Terrasoft.id.split("_");
			var sectionName = scopeIdParts[scopeIdParts.length - 1];
			var checkBox = Ext.get(sectionName + "IsActiveCheckBoxEdit-wrapEl");
			var imageConfig = resources.localizableImages[imageName];
			if (checkBox && imageConfig) {
				checkBox.setStyle("background-image", "url(" + Terrasoft.ImageUrlBuilder.getUrl(imageConfig) + ")");
			}
		}
		/**
		 * Handles CheckBox click
		 * @param {Boolean} value of CheckBox
		 * @param {Object} scope
		 */
		function onClick(value, scope) {
			scope.set("IsActive", value);
			scope.set("ActiveRow", null);
			scope.reloadGridData();
		}

		return {
			setCheckBoxBackground: setCheckBoxBackground,
			setFilterContainerStyle: setFilterContainerStyle,
			onClick: onClick
		};
	});



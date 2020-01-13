Terrasoft.configuration.Structures["ProjectLookupModule"] = {innerHierarchyStack: ["ProjectLookupModule"]};
define("ProjectLookupModule", ["ext-base", "terrasoft", "ProjectLookupModuleResources"],
	function(Ext, Terrasoft) {
		Ext.ns("Terrasoft.controls.ProjectLookupEdit");
		Ext.define("Terrasoft.controls.ProjectLookupEdit", {
			extend: "Terrasoft.LookupEdit",
			alternateClassName: "Terrasoft.ProjectLookupEdit",
			value: null,
			displayValue: null,
			init: function() {
				return this.callParent(arguments);
			},

			setValue: function(value) {
				var isChanged = this.changeValue(value);
				if (!isChanged || !this.rendered) {
					return;
				}
				var el = this.getEl();
				el.dom.value = (value) && value.customDisplayValue ?
					projectCaptionConverter(value.customDisplayValue) : "";
			},

			getInitValue: function() {
				var value = this.value;
				var displayValue = value && value.customDisplayValue ?
					projectCaptionConverter(value.customDisplayValue) : "";
				return displayValue ? Terrasoft.utils.string.encodeHtml(displayValue) : "";
			},
			changeValue: function(item) {
				var value = this.value;
				var isChanged;
				if (value !== null && item !== null) {
					isChanged = (value.value !== item.value)
						|| (value.displayValue !== item.displayValue)
						|| (value.customDisplayValue !== item.customDisplayValue);
				} else {
					isChanged = value !== item;
				}
				if (isChanged) {
					this.value = item;
					var returnValue = Terrasoft.deepClone(item);
					this.fireEvent("change", returnValue, this);
				}
				return isChanged;
			},
			getBindConfig: function() {
				return this.callParent(arguments);
			},
			initDomEvents: function() {
				return this.callParent(arguments);
			},
			subscribeForEvents: function() {
				return this.callParent(arguments);
			},
			destroy: function() {
				return this.callParent(arguments);
			}
		});
		function projectCaptionConverter(projectPath) {
			if (Ext.isEmpty(projectPath)) {
				return "";
			}
			var elementsCount = projectPath.length;
			if (elementsCount === 1) {
				return projectPath[0];
			}
			if (elementsCount === 2) {
				return projectPath.join("/");
			}
			if (elementsCount > 2) {
				return projectPath[0] + "/.../" + projectPath[projectPath.length-1];
			}
			return "";
		}
		return Terrasoft.ProjectLookupEdit;

	}
);



Terrasoft.configuration.Structures["ImageListGenerator"] = {innerHierarchyStack: ["ImageListGenerator"]};
define("ImageListGenerator", ["ext-base", "terrasoft", "ViewGeneratorV2", "ImageList"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.configuration.ImageListGenerator", {
			singleton: true,
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.ImageListGenerator",

			/**
			 * ########## ############ ############# ### {Terrasoft.ContainerList}.
			 * @protected
			 * @virtual
			 * @param {Object} config ######## ######## #############.
			 * @return {Object} ########## ############### ############# ContainerList.
			 */
			generateImageList: function(config) {
				var result = {
					className: "Terrasoft.ImageList",
					value: {
						bindTo: this.getItemBindTo(config)
					},
					list: {
						bindTo: this.getExpandableListName(config)
					}
				};
				Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["generator"]));
				this.applyControlConfig(result, config);
				return result;
			}
		});

		return Terrasoft.configuration.ImageListGenerator;
	});



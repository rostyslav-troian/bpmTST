Terrasoft.configuration.Structures["ViewModelWithMixins"] = {innerHierarchyStack: ["ViewModelWithMixins"], structureParent: "BaseViewModule"};
define("ViewModelWithMixins", ["PanelEmptyListMixin", "MiniPageUtilities"],
	function() {
		/**
		 * @class Terrasoft.configuration.ViewModelWithMixins
		 * The ViewModelWithMixins class is used for creating new instances of notifications view model with
		 * mixin PanelEmptyListMixin.
		 */
		Ext.define("Terrasoft.configuration.ViewModelWithMixins", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.ViewModelWithMixins",
			mixins: {
				PanelEmptyListMixin: "Terrasoft.PanelEmptyListMixin",
				/**
				 * @class MiniPageUtilities Mixin, used for Mini Pages
				 */
				MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities"
			}
		});
	});



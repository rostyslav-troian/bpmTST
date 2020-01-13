Terrasoft.configuration.Structures["ContentBuilderUserBlockViewModel"] = {innerHierarchyStack: ["ContentBuilderUserBlockViewModel"]};
define("ContentBuilderUserBlockViewModel", ["ContentBuilderUserBlockViewModelResources",
		"ContentBuilderElementViewModel"],
function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderUserBlockViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderUserBlockViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderUserBlockViewModel",

		columns: {
			"Id": {
				value: Terrasoft.emptyString
			},
			"ClassName": {
				value: "Terrasoft.ContentBuilderUserBlock"
			},
			"ItemType": {
				value: "userblock"
			},
			"Caption": {
				value: resources.localizableStrings.Caption
			},
			"Icon": {
				value: {
					source: Terrasoft.ImageSources.URL,
					url: null
				}
			},
			"BlockConfig": {
				value: Terrasoft.emptyFn
			},
			"GroupName": {
				value: ["ContentBlank"]
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * The event generated when you click on the content user block delete icon.
				 */
				"deleteiconclick"
			);
		},

		/**
		 * Handles on user block icon delete event.
		 * @protected
		 */
		onUserBlockDeleteIconClick: function() {
			this.fireEvent("deleteiconclick", this);
		}
	});
});



Terrasoft.configuration.Structures["Mood"] = {innerHierarchyStack: ["Mood"]};
define("Mood", [], function() {
	Ext.define("Terrasoft.controls.Mood", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.Mood",

		init: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * ####### ####### ## ####### ########### ########.
				 */
				'click'
			);
		},
		onClick: function(e) {
			e.stopEvent();
			this.fireEvent("click", this, null);
		},
		render: function() {

		}
	});
	return Terrasoft.Mood;
});



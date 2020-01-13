Terrasoft.configuration.Structures["SectionInWorkplaceManagerItem"] = {innerHierarchyStack: ["SectionInWorkplaceManagerItem"]};
define("SectionInWorkplaceManagerItem", [], function() {

	/**
	 * @class Terrasoft.SectionInWorkplaceManagerItem
	 * Class of section in workplace manager item.
	 */

	Ext.define("Terrasoft.SectionInWorkplaceManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.SectionInWorkplaceManagerItem",

		// region Properties: Private

		/**
		 * Position.
		 * @private
		 * @type {Number}
		 */
		position: null,

		/**
		 * Workplace.
		 * @private
		 * @type {Object}
		 */
		workplace: null,

		/**
		 * Section.
		 * @private
		 * @type {Object}
		 */
		section: null,

		// endregion

		// region Methods: Public

		/**
		 * Returns position.
		 * @return {String} Position.
		 */
		getPosition: function() {
			return this.getPropertyValue("position");
		},

		/**
		 * Sets position.
		 * @param {Number} newValue New position.
		 */
		setPosition: function(newValue) {
			this.setPropertyValue("position", newValue);
		},

		/**
		 * Returns workplace identifier.
		 * @return {String} Workplace identifier.
		 */
		getWorkplaceId: function() {
			var workplace = this.getPropertyValue("workplace");
			return workplace && workplace.value;
		},

		/**
		 * Sets workplace identifier.
		 * @param {Object} item Workplace item.
		 */
		setWorkplace: function(item) {
			if (item.value) {
				this.setPropertyValue("workplace", {
					value: item.value,
					displayValue: item.displayValue || "",
					primaryImageValue: item.primaryImageValue || ""
				});
			}
		},

		/**
		 * Returns section identifier.
		 * @return {String} Section identifier.
		 */
		getSectionId: function() {
			var section = this.getPropertyValue("section");
			return section && section.value;
		},

		/**
		 * Sets section identifier.
		 * @param {String} newValue New section identifier.
		 */
		setSectionId: function(newValue) {
			this.setPropertyValue("section", {
				value: newValue,
				displayValue: "",
				primaryImageValue: ""
			});
		},

		/**
		 * Returns workplace name.
		 * @return {String} Workplace name.
		 */
		getWorkplaceName: function() {
			var workplace = this.getPropertyValue("workplace");
			return workplace && workplace.displayValue;
		},

		/**
		 * Returns section code.
		 * @return {String} Section code.
		 */
		getSectionCode: function() {
			var section = this.getPropertyValue("section");
			return section && section.displayValue;
		}

		// endregion

	});

	return Terrasoft.SectionInWorkplaceManagerItem;
});



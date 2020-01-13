Terrasoft.configuration.Structures["EmployeePageMixin"] = {innerHierarchyStack: ["EmployeePageMixin"]};
define("EmployeePageMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.EmployeePageMixin
	 * Implements common business logic for EmployeePage and EmployeeMiniPage.
	 */
	Ext.define("Terrasoft.configuration.mixins.EmployeePageMixin", {
		alternateClassName: "Terrasoft.EmployeePageMixin",

		/**
		 * Updates name and photo fields on contact change.
		 * @protected
		 */
		contactChanged: function() {
			var contact = this.get("Contact") || {};
			this.set("Name", contact.displayValue);
			this.set("ContactPhoto", contact.Photo);
			this.set("Phone", contact.Phone);
			this.set("Email", contact.Email);
			this.set("BirthDate", contact.BirthDate);
			this.set("Gender", contact["Gender.Name"]);
		},

		/**
		 * Updates full job title field on job change.
		 * @protected
		 */
		jobChanged: function() {
			var job = this.get("Job");
			var fullJobTitle = this.get("FullJobTitle");
			if (this.isNotEmpty(job) && this.isEmpty(fullJobTitle)) {
				this.set("FullJobTitle", job.displayValue);
			}
		},

		/**
		 * Handles OrgStructureUnit changes.
		 * @protected
		 * @param {Object} model Model object.
		 * @param {Object} value Selected value.
		 */
		onChangedOrgStructureUnit: function(model, value) {
			var structure = value;
			if (structure && this.isNotEmpty(structure.FullName)) {
				var newOrgStructureUnit = this.Ext.apply(structure, {
					"displayValue": structure.FullName
				});
				this.set("OrgStructureUnit", newOrgStructureUnit);
			}
			this.setManager();
		},

		/**
		 * Sets manager.
		 * @protected
		 */
		setManager: function() {
			var id = this.getPrimaryColumnValue();
			var orgStructureUnit = this.get("OrgStructureUnit");
			var orgStrHead = (orgStructureUnit && orgStructureUnit.Head) || null;
			if (orgStrHead && orgStrHead.value === id) {
				orgStrHead = orgStructureUnit["Parent.Head"];
			}
			this.set("Manager", orgStrHead);
		}
	});
});


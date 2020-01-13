Terrasoft.configuration.Structures["TagItemViewModel"] = {innerHierarchyStack: ["TagItemViewModel"]};
define("TagItemViewModel", ["TagItemViewModelResources", "TagConstantsV2", "css!TagModuleSchemaStyles"],
	function(resources, TagConstants) {
		/**
		 * @class Terrasoft.configuration.TagItemViewModel
		 */
		Ext.define("Terrasoft.configuration.TagItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.TagItemViewModel",

			Ext: null,
			Terrasoft: null,
			sandbox: null,

			/**
			 * ############# ####### ######## ####.
			 * @protected
			 */
			init: function() {
				this.addEvents(
					/**
					 * @event
					 * ####### ######## ####.
					 * @param {Object} viewModel ###### ############# ####.
					 */
					"entityInTagDeleted"
				);
			},

			/**
			 * ######### ###### ## ######## #### # ###### #######.
			 * @private
			 * @returns {Terrasoft.DeleteQuery} ###### ## ######## ######
			 */
			getDeleteQuery: function() {
				var deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: this.get("InTagSchemaName")
				});
				deleteQuery.filters.add(this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Id", this.get("Id")
				));
				return deleteQuery;
			},

			/**
			 * ########## ##### ## ###### "####### ###" # ###### ####.
			 * ####### ### ## ####### ######## ######.
			 * @protected
			 */
			onRemoveTagFromEntityImageClick: function() {
				if (this.Terrasoft.CurrentUser.userType !== this.Terrasoft.UserType.SSP) {
					this.deleteTag();
				} else if (this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP &&
					this.get("TagTypeId") === TagConstants.TagType.Public) {
					this.showInformationDialog(resources.localizableStrings.CannotDeleteTagMessage);
				} else {
					this.deleteTag();
				}
			},

			/**
			 * ####### ### ## ######, # ########### ###### ## ######## ######## ####.
			 * @private
			 */
			deleteTag: function() {
				var deleteQuery = this.getDeleteQuery();
				deleteQuery.execute(function(response) {
					if (response.success) {
						this.fireEvent("entityInTagDeleted", this);
					}
				}, this);
			},

			/**
			 * ########## ##### ## ####.
			 * ######### ######### # ############# ###### ## ####, # #######.
			 */
			onTagItemButtonClick: function() {
				//TODO: #CRM-11301 ########## # ####### ### ####### ## ### # ######## ######
			}
		});
		return Terrasoft.TagItemViewModel;
	});



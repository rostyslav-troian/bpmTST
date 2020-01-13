Terrasoft.configuration.Structures["ProjectUtilities"] = {innerHierarchyStack: ["ProjectUtilities"]};
define("ProjectUtilities", ["ProjectUtilitiesResources"], function(resources) {

	Ext.define("Terrasoft.configuration.mixins.ProjectUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ProjectUtilities",

		projectServiceTimeout: 5 * 60 * 1000,

		projectServiceName: "ProjectService",

		callService: Terrasoft.emptyFn,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#init
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.Terrasoft.each(resources.localizableStrings, function(item, key) {
				this.set("Resources.Strings." + key, item);
			}, this);
			this.Terrasoft.each(resources.localizableImages, function(item, key) {
				this.set("Resources.Images." + key, item);
			}, this);
		},

		/**
		 * Adds a contact element in the project's resources.
		 * @param {Guid} projectId Identifier of project.
		 * @param {Object} contact Contact.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 */
		addContactToProjectResourceElement: function(projectId, contact, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId,
					"contactId": contact.value,
					"contactName": contact.displayValue
				},
				"methodName": "AddContactToProjectResourceElement"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * Returns date of the actual completion of the project.
		 * @param {Guid} projectId Identifier of project.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 */
		getProjectActualCompletion: function(projectId, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId
				},
				"methodName": "GetProjectActualCompletion"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * Checks whether there is the owner of the activity in project.
		 * @param {Guid} projectId Identifier of project.
		 * @param {Guid} contactId Identifier of contact.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Scope for the callback function.
		 */
		checkOwnerInProjectActivity: function(projectId, contactId, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId,
					"contactId": contactId
				},
				"methodName": "CheckOwnerInProjectActivity"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 *
		 * @param {Array} records - ###### ############### ########
		 * @param {Number} daysCount - ########## ####
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */

		changeProjectDates: function(records, daysCount, callback, scope) {
			var serviceConfig = {
				"data": {
					"records": records,
					"daysCount": daysCount
				},
				"methodName": "ChangeProjectDates"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ######## ############# ######### #######
		 * @param {String} projectId - ############# #######
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		getRootProjectId: function(projectId, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId
				},
				"methodName": "GetRootProjectId"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ######## ########## #### ######### #######
		 * @param {String} projectId - ############# #######
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		getActualProjectEndDate: function(projectId, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId
				},
				"methodName": "GetActualProjectEndDate"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ######## ###### #### ############ ########
		 * @param {String} projectId - ############# #######
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		getProjectParentsNames: function(projectId, callback, scope) {
			var serviceConfig = {
				"data": {
					"projectId": projectId
				},
				"methodName": "GetProjectParentsNames"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ######## ########## ######### ####### ##### ##### ###### ###### # ###### ##### #######
		 * @param {Date} startDate - #### ######
		 * @param {Date} endDate - #### #####
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		getWorkingTimeBetweenDates: function(startDate, endDate, callback, scope) {
			var serviceConfig = {
				"data": {
					data: Terrasoft.encode({
						"startDate": startDate,
						"endDate": endDate
					})
				},
				"encodeData": true,
				"methodName": "GetWorkingTimeBetweenDates"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ##### ############# ### ############# ######## ####
		 */
		syncronizeProjectManhour: function(data, callback, scope) {
			var serviceConfig = {
				"data": data,
				"methodName": "SyncronizeProjectManhour"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ######### ####### ######
		 * @param {String} projectId - ############# #######
		 * @param {Number} offset - #####
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		updateProjectPosition: function(projectId, offset, callback, scope) {
			var serviceConfig = {
				"data": {
					projectId: projectId,
					offset: offset
				},
				"methodName": "UpdateProjectPosition"
			};
			this.callProjectService(serviceConfig, callback, scope);
		},

		/**
		 * ###### ####### #######
		 * @param {Array} projects - ###### ############### ########
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		CalculateProjectFinance: function(projects, callback, scope) {
			this.showBodyMask();
			var serviceConfig = {
				"data": {
					projects: projects
				},
				"methodName": "CalculateProjectFinanceByProjectCollection",
				"timeout": this.projectServiceTimeout
			};
			this.callProjectService(serviceConfig, function(result) {
				this.hideBodyMask();
				var informationMessage = this.get("Resources.Strings.CalculateProjectFinanceActionSuccessMessage");
				scope.showInformationDialog(informationMessage, function() {
					callback.call(scope, result);
				}, {}, this);
			}, scope);
		},

		/**
		 * ###### ######### ##### #######
		 * @param {Array} projects - ###### ############### ########
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		CalculateProjectLaborPlan: function(projects, callback, scope) {
			this.showBodyMask();
			var serviceConfig = {
				"data": {
					projects: projects
				},
				"methodName": "CalculateProjectLaborPlanByProjectCollection",
				"timeout": this.projectServiceTimeout
			};
			this.callProjectService(serviceConfig, function(result) {
				this.hideBodyMask();
				var informationMessage = this.get("Resources.Strings.CalculateProjectLaborPlanActionSuccessMessage");
				this.showInformationDialog(informationMessage, function() {
					callback.call(scope, result);
				}, {}, this);
			}, this);
		},

		/**
		 * ###### ########## ###### #######
		 * @param {Array} projects - ###### ############### ########
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		CalculateProjectActualWork: function(projects, callback, scope) {
			this.showBodyMask();
			var serviceConfig = {
				"data": {
					projects: projects,
					withSheduler: true
				},
				"methodName": "CalculateProjectActualWorkByProjectCollection",
				"timeout": this.projectServiceTimeout
			};
			this.callProjectService(serviceConfig, function(result) {
				this.hideBodyMask();
				var informationMessage = this.get("Resources.Strings.CalculateProjectActualWorkActionSuccessMessage");
				this.showInformationDialog(informationMessage, function() {
					callback.call(scope, result);
				}, {}, this);
			}, this);
		},

		/**
		 * ####### ###### #######
		 * @param {Object} config - ###### #######
		 * @param callback - ####### ######### ######
		 * @param scope - ########
		 */
		callProjectService: function(config, callback, scope) {
			var serviceConfig = this.Ext.apply({}, config, {
				"serviceName": this.projectServiceName,
				"encodeData": false
			});
			this.callService(serviceConfig, function(responseObject) {
				var result = responseObject[config.methodName + "Result"];
				callback.call(scope, result);
			}, scope);
		}

	});
	return Terrasoft.ProjectUtilities;
});



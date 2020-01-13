Terrasoft.configuration.Structures["ProjectServiceHelper"] = {innerHierarchyStack: ["ProjectServiceHelper"]};
define("ProjectServiceHelper", ["ext-base", "terrasoft", "ProjectServiceHelperResources"],
		function(Ext, Terrasoft, resources) {

	var ServiceTimeout = {
		DEFAULT: 2 * 60 * 1000,
		CalculateProjectFinanceByProjectCollection: 5 * 60 * 1000,
		CalculateProjectLaborPlanByProjectCollection: 5 * 60 * 1000,
		CalculateProjectActualWorkByProjectCollection: 5 * 60 * 1000
	};

	function addContactToProjectResourceElement(projectId, contact, callback, scope) {
		callService("AddContactToProjectResourceElement", {
			"projectId": projectId,
			"contactId": contact.value,
			"contactName": contact.displayValue
		}, function(response) {
			callback.call(scope, response);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function getProjectActualCompletion(projectId, callback, scope) {
		callService("GetProjectActualCompletion", {
			"projectId": projectId
		}, function(response) {
			callback.call(scope, response);
		}, scope);
	}

	function checkOwnerInProjectActivity(projectId, contactId, callback, scope) {
		callService("CheckOwnerInProjectActivity", {
			"projectId": projectId,
			"contactId": contactId
		}, function(response) {
			callback.call(this, response.CheckOwnerInProjectActivityResult);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function changeProjectDates(records, daysCount, callback, scope) {
		scope = scope || this;
		callService("ChangeProjectDates", {
			"records": records,
			"daysCount": daysCount
		}, function(response) {
			callback.call(scope, response);
		}, scope || this, ServiceTimeout.DEFAULT);
	}

	function deleteProjectManhour(data, callback, scope) {
		callService("DeleteProjectManhour", data, function(response) {
			callback.call(scope, response);
		}, this, ServiceTimeout.DEFAULT);
	}

	function getRootProjectId(projectId, callback, scope) {
		callService("GetRootProjectId", {
			"projectId": projectId
		}, function(response) {
			callback.call(this, response.GetRootProjectIdResult);
		}, scope, ServiceTimeout.DEFAULT);
	}

	/**
	 * Gets project full name.
	 * @param {String} projectId Project identifier.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Execution context.
	 */
	function getProjectFullName(projectId, callback, scope) {
		this.getRootProjectId(projectId, function(rootProjectId) {
			var project = scope.get("Project");
			var fullProjectName = "";
			var projectName = project.displayValue;
			if (rootProjectId && rootProjectId !== projectId) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Project"
				});
				esq.addColumn("Name");
				esq.filters.add("primaryColumnFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", rootProjectId));
				esq.getEntityCollection(function(result) {
					if (result.success && result.collection.getCount()) {
						fullProjectName += result.collection.getByIndex(0).values.Name + "/../" +
							projectName;
					} else {
						fullProjectName += projectName;
					}
					this.Ext.callback(callback, scope, [fullProjectName]);
				}, this);
			} else {
				this.Ext.callback(callback, scope, [projectName]);
			}
		}, scope);
	}

	function getActualProjectEndDate(projectId, callback, scope) {
		callService("GetActualProjectEndDate", {
			"projectId": projectId
		}, function(responseObject) {
			callback.call(scope, new Date(responseObject.GetActualProjectEndDateResult));
		}, scope, ServiceTimeout.DEFAULT);
	}

	function getProjectParentsNames(projectId, callback, scope) {
		callService("GetProjectParentsNames", {
			"projectId": projectId
		}, function(responseObject) {
			callback.call(scope, responseObject.GetProjectParentsNamesResult);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function getWorkingTimeBetweenDates(startDate, endDate, callback, scope) {
		callService("GetWorkingTimeBetweenDates", {
			data: Ext.JSON.encode({
				"startDate": startDate,
				"endDate": endDate
			})
		}, function(responseObject) {
			callback.call(scope, responseObject.GetWorkingTimeBetweenDatesResult);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function syncronizeProjectManhour(data, callback, scope) {
		callService("SyncronizeProjectManhour", data, function(response) {
			callback.call(scope, response);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function roleInProjectExists(data, callback, scope) {
		callService("RoleInProjectExists", data, function(response) {
			callback.call(scope, response);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function updateProjectPosition(projectId, offset, callback, scope) {
		var jsonData = {
			"projectId": projectId,
			"offset": offset
		};
		var serviceName = "UpdateProjectPosition";
		callService(serviceName, jsonData, function(responseObject) {
			callback.call(scope, responseObject.UpdateProjectPositionResult);
		}, scope, ServiceTimeout.DEFAULT);
	}

	function CalculateProjectFinance(projects, callback, scope) {
		scope.showInformationDialog(
			resources.localizableStrings.CalculateProjectFinanceActionWaitMessage, void(0), {buttons: []}, this);
		var jsonData = {
			"projects": projects
		};
		var serviceName = "CalculateProjectFinanceByProjectCollection";
		callService(serviceName, jsonData, function(responseObject) {
			scope.showInformationDialog(
				resources.localizableStrings.CalculateProjectFinanceActionSuccessMessage, function() {
					callback.call(scope, responseObject.CalculateProjectFinanceByProjectCollectionResult);
				}, {}, this);

		}, scope, ServiceTimeout.CalculateProjectFinanceByProjectCollection);
	}

	function CalculateProjectLaborPlan(projects, callback, scope) {
		scope.showInformationDialog(
			resources.localizableStrings.CalculateProjectLaborPlanActionWaitMessage, void(0), {buttons: []}, this);
		var jsonData = {
			"projects": projects
		};
		var serviceName = "CalculateProjectLaborPlanByProjectCollection";
		callService(serviceName, jsonData, function(responseObject) {
			scope.showInformationDialog(
				resources.localizableStrings.CalculateProjectLaborPlanActionSuccessMessage, function() {
					callback.call(scope, responseObject.CalculateProjectLaborPlanByProjectCollectionResult);
				}, {}, this);

		}, scope, ServiceTimeout.CalculateProjectLaborPlanByProjectCollection);
	}

	function CalculateProjectActualWork(projects, callback, scope) {
		scope.showInformationDialog(
			resources.localizableStrings.CalculateProjectActualWorkActionWaitMessage, void(0), {buttons: []}, this);
		var jsonData = {
			"projects": projects,
			"withSheduler": true
		};
		var serviceName = "CalculateProjectActualWorkByProjectCollection";
		callService(serviceName, jsonData, function(responseObject) {
			var message = resources.localizableStrings.CalculateProjectActualWorkActionSuccessMessage;
			scope.showInformationDialog(message);
			callback.call(scope, responseObject.CalculateProjectActualWorkByProjectCollectionResult);
		}, scope, ServiceTimeout.CalculateProjectActualWorkByProjectCollection);
	}

	function callService(methodName, jsonData, callback, scope, timeout) {
		var ajaxProvider = Terrasoft.AjaxProvider;
		var data = jsonData || {};
		scope = scope || this;
		var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/ProjectService/" + methodName;
		var request = ajaxProvider.request({
			url: requestUrl,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			jsonData: data,
			callback: function(request, success, response) {
				var responseObject = {};
				if (success) {
					responseObject =  Terrasoft.decode(response.responseText);
				}
				callback.call(scope, responseObject);
			},
			scope: scope,
			timeout: timeout || ServiceTimeout.DEFAULT
		});
		return request;
	}

	return {
		resources: resources,
		addContactToProjectResourceElement: addContactToProjectResourceElement,
		getProjectActualCompletion: getProjectActualCompletion,
		changeProjectDates: changeProjectDates,
		deleteProjectManhour: deleteProjectManhour,
		GetActualProjectEndDate: getActualProjectEndDate,
		GetProjectParentsNames: getProjectParentsNames,
		GetWorkingTimeBetweenDates: getWorkingTimeBetweenDates,
		roleInProjectExists: roleInProjectExists,
		updateProjectPosition: updateProjectPosition,
		syncronizeProjectManhour: syncronizeProjectManhour,
		CalculateProjectFinance: CalculateProjectFinance,
		CalculateProjectLaborPlan: CalculateProjectLaborPlan,
		CalculateProjectActualWork: CalculateProjectActualWork,
		getRootProjectId: getRootProjectId,
		getProjectFullName: getProjectFullName,
		CheckOwnerInProjectActivity: checkOwnerInProjectActivity
	};
});



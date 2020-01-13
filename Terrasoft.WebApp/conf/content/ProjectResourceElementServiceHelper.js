Terrasoft.configuration.Structures["ProjectResourceElementServiceHelper"] = {innerHierarchyStack: ["ProjectResourceElementServiceHelper"]};
define("ProjectResourceElementServiceHelper", ['ext-base', 'terrasoft', 'ProjectResourceElementServiceHelperResources'],
		function(Ext, Terrasoft, resources) {

	var callServiceMethod = function(name, data, callback, scope) {
		var ajaxProvider = Terrasoft.AjaxProvider;
		scope = scope || this;
		var requestUrl = Terrasoft.workspaceBaseUrl + '/rest/ProjectManhourService/' + name;
		ajaxProvider.request({
			url: requestUrl,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			jsonData: data || {},
			callback: function(request, success, response) {
				var responseObject = {};
				if (success) {
					responseObject =  Terrasoft.decode(response.responseText);
				}
				callback.call(scope, responseObject);
			},
			scope: scope
		});
	};

	var checkChildProjectManhours = function(data, callback, scope) {
		callServiceMethod('CheckChildProjectManhours', data, callback, scope);
	};

	var clearManhourInformation = function(data, callback, scope) {
		callServiceMethod('ClearManhourInformation', {projectManhours: data}, callback, scope);
	};

	var getCanDelete = function(data, callback, scope) {
		callServiceMethod('GetCanDelete', {projectResources: data}, function(response) {
			callback.call(scope, response.GetCanDeleteResult);
		}, scope);
	};

	var getChildProjectManhoursSum = function(data, callback, scope) {
		callServiceMethod('GetChildProjectManhoursSum', data, callback, scope);
	};

	var insertProjectManhour = function(data, callback, scope) {
		callServiceMethod('InsertProjectManhour', data, callback, scope);
	};

	var roleInProjectExists = function(data, callback, scope) {
		callServiceMethod('RoleInProjectExists', data, callback, scope);
	};

	var restProjectManhourByRole = function(data, callback, scope) {
		callServiceMethod('RestProjectManhourByRole', data, function(response) {
			callback.call(scope, response.RestProjectManhourByRoleResult);
		}, scope);
	};

	var syncronizeParents = function(data, callback, scope) {
		callServiceMethod('SyncronizeParents', data, callback, scope);
	};

	var syncronizeProject = function(data, callback, scope) {
		callServiceMethod('SyncronizeProject', data, callback, scope);
	};

	return {
		checkChildProjectManhours: checkChildProjectManhours,
		clearManhourInformation: clearManhourInformation,
		getCanDelete: getCanDelete,
		getChildProjectManhoursSum: getChildProjectManhoursSum,
		insertProjectManhour: insertProjectManhour,
		roleInProjectExists: roleInProjectExists,
		syncronizeParents: syncronizeParents,
		syncronizeProject: syncronizeProject,
		restProjectManhourByRole: restProjectManhourByRole
	};
});



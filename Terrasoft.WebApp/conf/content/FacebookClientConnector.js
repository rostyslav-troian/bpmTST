Terrasoft.configuration.Structures["FacebookClientConnector"] = {innerHierarchyStack: ["FacebookClientConnector"]};
requirejs.config({
	paths: {
		"facebook": "//connect.facebook.net/en_US/all",
		"facebook-debug": "//connect.facebook.net/en_US/all/debug"
	},
	shim: {
		"facebook": {
			exports: "FB"
		},
		"facebook-debug": {
			exports: "FB"
		}
	}
});
define("FacebookClientConnector", ["BaseClientConnector", "FacebookServiceRequest", "ExecuteBatchRequest",
		"SearchResultViewModel"],
		function() {
	/**
	 * @class Terrasoft.configuration.social.FacebookClientConnector
	 * ##### ########### ###### # ########## ##### Facebook # #######.
	 */
	Ext.define("Terrasoft.configuration.social.FacebookClientConnector", {
		extend: "Terrasoft.configuration.social.BaseClientConnector",
		alternateClassName: "Terrasoft.FacebookClientConnector",

		//region Properties: Private

		serviceRequestClassName: "Terrasoft.FacebookServiceRequest",

		cookie: false,
		xfbml: false,

		/**
		 * Facebook client.
		 * @type {Object}
		 * @protected
		 */
		facebookClient: null,

		STATUS_CONNECTED: "connected",
		STATUS_NOT_AUTHORIZED: "not_authorized",
		STATUS_UNKNOWN: "unknown",

		pageFields: "name,picture.type(large).width(100).height(100){{url,is_silhouette}},cover,category" +
			",website,phone,location,founded,about,emails",
		userFields: "id,name,picture.type(large).width(100).height(100){{url,is_silhouette}},cover",

		//endregion

		//region Methods: Private

		/**
		 * ############## Api ### ###### # ####### ########.
		 * @private
		 */
		initApi: function() {
			this.facebookClient.init({
				appId: this.consumerKey,
				version: this.consumerVersion,
				cookie: this.cookie,
				xfbml: this.xfbml
			});
		},

		prepareBatchSearchConfig: function(config) {
			return {
				contractName: "ExecuteSearch",
				commands: [
					this.getPageSearchCommand(config),
					this.getUserSearchCommand(config)
				]
			};
		},

		fillResponseCollection: function(collection, entities) {
			Terrasoft.each(entities, function(entity) {
				var id = entity.id;
				collection.add(id, Ext.create("Terrasoft.SearchResult", {
					values: {
						Id: id,
						Name: entity.name,
						Photo: entity.imageUrl,
						IsDefaultPhoto: entity.isDefaultImage,
						Cover: entity.coverUrl,
						Category: entity.category,
						Web: entity.website,
						Phone: entity.phone,
						Country: entity.country,
						City: entity.city
					}
				}));
			}, this);
		},

		parseExecuteSearchResponse: function(response, callback, scope) {
			if (response.success) {
				var collection = response.collection = Ext.create("Terrasoft.BaseViewModelCollection");
				var text = response.text;
				var json = JSON.parse(text);
				var data = json.data || [json];
				this.fillResponseCollection(collection, data);
			}
			callback.call(scope, response);
		},

		parseExecuteBatchSearchResponse: function(response, callback, scope) {
			if (response.success) {
				var collection = response.collection = Ext.create("Terrasoft.BaseViewModelCollection");
				this.fillResponseCollection(collection, response.entities);
			}
			callback.call(scope, response);
		},

		//endregion

		//region Methods: Protected

		/**
		 * ############ #### ############ ## ####### ######.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		login: function(callback, scope) {
			this.facebookClient.login(function(response) {
				callback.call(scope, response);
			});
		},

		/**
		 * ########## ########## # ######### ########### ############ ## ####### #######.
		 * @param {Object} config ######### ######### ##########.
		 * @param {Boolean} config.force ######### ## ##, ### ########## ####### ######,
		 * # ## ############ ############## ##### ##########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		getLoginStatus: function(config, callback, scope) {
			var force = config.force;
			this.facebookClient.getLoginStatus(function(response) {
				callback.call(scope, response);
			}, force);
		},

		executeCommand: function(config, callback, scope) {
			var request = this.getServiceRequest({
				className: "Terrasoft.configuration.social.ExecuteCommandRequest",
				serviceName: "FacebookService",
				command: config.command
			});
			request.execute(function(response) {
				callback.call(scope, response);
			}, this);
		},

		executeBatchCommand: function(config, callback, scope) {
			var request = this.getServiceRequest({
				className: "Terrasoft.configuration.social.ExecuteBatchRequest",
				contractName: config.contractName,
				serviceName: "FacebookService",
				commands: config.commands
			});
			request.execute(function(response) {
				callback.call(scope, response);
			}, this);
		},

		getUserSearchCommand: function(config) {
			return {
				name: "search",
				parameters: [
					{
						name: "q",
						value: config.query
					},
					{
						name: "type",
						value: "user"
					},
					{
						name: "fields",
						value: this.userFields
					},
					{
						name: "limit",
						value: "50"
					}
				]
			};
		},

		getPageSearchCommand: function(config) {
			return {
				name: "search",
				parameters: [
					{
						name: "q",
						value: config.query
					},
					{
						name: "type",
						value: "page"
					},
					{
						name: "fields",
						value: this.pageFields
					},
					{
						name: "limit",
						value: "50"
					}
				]
			};
		},

		getSinglePageSearchCommand: function(config) {
			return {
				command: {
					name: config.page,
					parameters: [
						{
							name: "fields",
							value: this.pageFields
						}
					]
				}
			};
		},

		getSingleUserSearchCommand: function(config) {
			return {
				command: {
					name: config.id,
					parameters: [
						{
							name: "fields",
							value: this.userFields
						}
					]
				}
			};
		},

		/**
		 * Downloads Facebook client from Facebook server.
		 * @protected
		 * @virtual
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		requireFacebookClient: function(callback, scope) {
			Terrasoft.require(["facebook"], function(facebook) {
				this.facebookClient = facebook;
				callback.call(scope);
			}, this);
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		init: function(callback, scope) {
			this.callParent([function(response) {
				this.requireFacebookClient(function() {
					if (response.success) {
						this.initApi();
					}
					callback.call(scope, response);
				}, this);
			}, this]);
		},

		/**
		 * ######### ##### ####### # ########.
		 * @param {Object} config ######### ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		executeSearch: function(config, callback, scope) {
			var searchConfig = this.prepareBatchSearchConfig(config);
			this.executeBatchCommand(searchConfig, function(response) {
				this.parseExecuteBatchSearchResponse(response, callback, scope);
			}, this);
		},

		/**
		 * ######### ##### #######. ######### ###### ####: search?q=config.page&type=page.
		 * @param {Object} config ######### ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 * @deprecated 7.7.0 ### ###### ####### ########### {@link Terrasoft.FacebookClientConnector#getNodesData}.
		 */
		executeSinglePageSearch: function(config, callback, scope) {
			var searchConfig = this.getSinglePageSearchCommand(config);
			this.executeCommand(searchConfig, function(response) {
				this.parseExecuteSearchResponse(response, callback, scope);
			}, this);
		},

		/**
		 * ######### ##### ########. ######### ###### ####: search?q=config.id&type=user.
		 * @param {Object} config ######### ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 * @deprecated 7.7.0 ### ###### ######## ########### {@link Terrasoft.FacebookClientConnector#getNodesData}.
		 */
		executeSingleUserSearch: function(config, callback, scope) {
			var searchConfig = this.getSingleUserSearchCommand(config);
			this.executeCommand(searchConfig, function(response) {
				this.parseExecuteSearchResponse(response, callback, scope);
			}, this);
		},

		/**
		 * ########## ########## ## ######## Facebook.
		 * @param {Object} config ################ ########## ### ####### ###### ## ########.
		 * @param {Array} config.nodes ##### ######## Facebook.
		 * @param {Array} config.fields ###### ##### ########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ### ####### ######### ######.
		 */
		getNodesData: function(config, callback, scope) {
			var request = this.getServiceRequest({
				className: "Terrasoft.SocialNetworkServiceRequest",
				contractName: "GetNodesData",
				serviceName: "FacebookService",
				socialIds: config.nodes
			});
			request.execute(function(response) {
				callback.call(scope, response);
				if (!response.success) {
					this.throwConnectorError(response.errorInfo);
				}
			}, this);
		},

		/**
		 * ########## ####### ###### #######.
		 * @param {Object} config ######### ####### #######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		revokeCurrentAccessToken: function(config, callback, scope) {
			var request = this.getServiceRequest({
				contractName: "RevokeCurrentAccessToken"
			});
			request.execute(function(response) {
				callback.call(scope, response);
			}, this);
		},

		/**
		 * ############## ######### ####### ######## ####### ###### ## ####### #######.
		 * @param {Object} authResponse ############### ######.
		 * @param {String} authResponse.accessToken ###### #######.
		 * @param {String} authResponse.userID ############# ############ ## ####### #######.
		 * @return {Object} ######### ####### ######## ####### ###### ## ####### #######.
		 */
		prepareCreateSocialAccountConfig: function(authResponse) {
			return {
				accessToken: authResponse.accessToken,
				socialId: authResponse.userID
			};
		},

		/**
		 * ########## ####### ############## ############ # ########## ####.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		tryLoginUser: function(callback, scope) {
			var getLoginStatusConfig = {
				force: true
			};
			this.getLoginStatus(getLoginStatusConfig, function(response) {
				var responseStatus = response.status;
				if (responseStatus === this.STATUS_NOT_AUTHORIZED || responseStatus === this.STATUS_UNKNOWN) {
					this.login(function(response) {
						callback.call(scope, response.authResponse);
					}, this);
				}
				if (responseStatus === this.STATUS_CONNECTED) {
					callback.call(scope, response.authResponse);
				}
			}, this);
		},

		/**
		 * ######## ########## # ####### ####### #######.
		 * @param {Object} config ######### #########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		debugCurrentAccessToken: function(config, callback, scope) {
			var request = this.getServiceRequest({
				contractName: "DebugCurrentAccessToken"
			});
			request.execute(function(response) {
				callback.call(scope, response);
				if (!response.success) {
					this.throwConnectorError(response.errorInfo);
				}
			}, this);
		},

		/**
		 * ######## ########## # ####### #######.
		 * @param {Object} config ######### #########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		debugAccessToken: function(config, callback, scope) {
			var accessToken = config.accessToken;
			if (!accessToken) {
				throw new Terrasoft.ArgumentNullOrEmptyException({
					argumentName: "accessToken"
				});
			}
			var request = this.getServiceRequest({
				contractName: "DebugAccessToken",
				accessToken: accessToken
			});
			request.execute(function(response) {
				callback.call(scope, response);
				if (!response.success) {
					this.throwConnectorError(response.errorInfo);
				}
			}, this);
		},

		/**
		 * ######### ####### ###### #######.
		 * @param {Object} config ######### ##########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		updateAccessToken: function(config, callback, scope) {
			this.tryLoginUser(function(authResponse) {
				if (!authResponse) {
					return;
				}
				var config = {
					accessToken: authResponse.accessToken
				};
				this.debugAccessToken(config, function(response) {
					if (response.success) {
						var accessTokenInfo = response.accessTokenInfo;
						if (!accessTokenInfo.isValid) {
							throw new Terrasoft.UnknownException();
						}
						this.setAccessToken(config, callback, scope);
					}
				}, this);
			}, this);
		},

		/**
		 * ######### ########### ############## # ########## #####.
		 * @param {Object} config ######### ########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		checkCanOperate: function(config, callback, scope) {
			var request = this.getServiceRequest({
				contractName: "CheckCanOperate"
			});
			request.execute(function(response) {
				callback.call(scope, response);
			}, this);
		}

		//endregion

	});
});



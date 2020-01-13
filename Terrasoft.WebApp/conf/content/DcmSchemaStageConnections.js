Terrasoft.configuration.Structures["DcmSchemaStageConnections"] = {innerHierarchyStack: ["DcmSchemaStageConnections"]};
define("DcmSchemaStageConnections", ["ext-base", "terrasoft", "DcmSchemaStageConnection"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.Designers.DcmSchemaStageConnections", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.DcmSchemaStageConnections",

			mixins: {
				serializable: "Terrasoft.Serializable"
			},

			/**
			 * Array of existing stage connections.
			 * @type {Terrasoft.DcmSchemaStageConnection[]}
			 */
			connections: null,

			/**
			 * Initializes connection object.
			 * @param {String} source From stage.
			 * @param {String} target To stage.
			 * @returns {Object} Connection object
			 * @private
			 */
			createConnectionObject: function(source, target) {
				var connection = Ext.create("Terrasoft.DcmSchemaStageConnection");
				connection.source = source;
				connection.target = target;
				return connection;
			},

			/**
			 * Fires on change event.
			 * @private
			 */
			fireOnChange: function() {
				this.fireEvent("changed");
			},

			/**
			 * Constructor for DcmSchemaStageConnections class.
			 */
			constructor: function(config) {
				this.callParent(arguments);
				this.connections = config && config.connections || [];
				this.addEvents("changed");
			},

			/**
			 * Sets all outgoing connections for stage.
			 * All previous outgoing connections for this stage will be deleted.
			 * @param {String} stageUId Stage that will be connected to.
			 * @param {Array} outUIdArray Array of stage UIds to which main stage will be connected.
			 */
			setOutgoingConnections: function(stageUId, outUIdArray) {
				this.removeAllOutgoingConnections(stageUId);
				outUIdArray.forEach(function(outUId) {
					this.addConnection(stageUId, outUId);
				}, this);
			},

			/**
			 * Sets all incoming connections for stage.
			 * All previous incoming connections for this stage will be deleted.
			 * @param {String} stageUId Stage to which stages array will be connected.
			 * @param {Array} inUIdArray Array of stage UIds that will be connected to main stage.
			 */
			setIncomingConnections: function(stageUId, inUIdArray) {
				this.removeAllIncomingConnections(stageUId);
				inUIdArray.forEach(function(inUId) {
					this.addConnection(inUId, stageUId);
				}, this);
			},

			/**
			 * Removes all incoming connections for stage.
			 * @param {String} stageUId All incoming connections to this stage will be removed.
			 */
			removeAllIncomingConnections: function(stageUId) {
				this.connections = this.connections.filter(function(connection) {
					var isNotIncomingToStage = connection.target !== stageUId;
					return isNotIncomingToStage;
				});
				this.fireOnChange();
			},

			/**
			 * Removes all outgoing connections for stage.
			 * @param {String} stageUId All outgoing connections to this stage will be removed.
			 */
			removeAllOutgoingConnections: function(stageUId) {
				this.connections = this.connections.filter(function(connection) {
					var isNotOutgoingFromStage = connection.source !== stageUId;
					return isNotOutgoingFromStage;
				});
				this.fireOnChange();
			},

			/**
			 * Returns if stage connections already contains that type of connection.
			 * @param {Object} connection Connection object.
			 * @returns {boolean} True if stage connections already contains that type of connection.
			 */
			contains: function(connection) {
				for (var i = this.connections.length - 1; i >= 0; i--) {
					var item = this.connections[i];
					var areEqual = item.getIsEqual(connection);
					if (areEqual) {
						return true;
					}
				}
				return false;
			},

			/**
			 * Removes connection.
			 * @param {Object} connection Connection to remove.
			 */
			removeConnection: function(connection) {
				this.connections = this.connections.filter(function(item) {
					var areEqual = item.getIsEqual(connection);
					return !areEqual;
				});
				this.fireOnChange();
			},

			/**
			 * Adds connection.
			 * @param {String} source Stage UId from which connection will be established.
			 * @param {String} target Stage UId to which connection will be established.
			 */
			addConnection: function(source, target) {
				var connection = this.createConnectionObject(source, target);
				if (!this.contains(connection)) {
					this.connections.push(connection);
					this.fireOnChange();
				}
			},

			/**
			 * Removes all incoming and outgoing connections of given stage.
			 * @param {String} stageUId Any connection with this stage will be removed.
			 */
			removeStage: function(stageUId) {
				this.connections = this.connections.filter(function(connection) {
					var dontContainsAnyConnectionToStage = connection.source !== stageUId &&
						connection.target !== stageUId;
					return dontContainsAnyConnectionToStage;
				});
				this.fireOnChange();
			},

			/**
			 * Returns array of all incoming connections for given stage.
			 * @param {String} stageUId Stage to which connections will be found.
			 * @returns {Array} All incoming connections to given stage.
			 */
			getIncomingConnections: function(stageUId) {
				return this.connections.filter(function(connection) {
					var isIncomingConnectionToStage = connection.target === stageUId;
					return isIncomingConnectionToStage;
				});
			},

			/**
			 * Returns array of all outgoing connections for given stage.
			 * @param {String} stageUId Stage from which connections will be found.
			 * @returns {Array} All outgoing connections to given stage.
			 */
			getOutgoingConnections: function(stageUId) {
				return this.connections.filter(function(connection) {
					var isOutgoingConnectionFromStage = connection.source === stageUId;
					return isOutgoingConnectionFromStage;
				});
			},

			/**
			 * @inheritdoc Terrasoft.Serializable#getSerializableObject
			 * @overridden
			 */
			getSerializableObject: function(serializableObject) {
				var parameters = this.connections;
				if (Ext.isEmpty(parameters)) {
					return;
				}
				serializableObject.connections = [];
				parameters.forEach(function(parameter) {
					parameter.getSerializableObject(serializableObject);
				}, this);
			}
		});

		return Terrasoft.Designers.DcmSchemaStageConnections;
	}
);



Terrasoft.configuration.Structures["CampaignDiagramEnums"] = {innerHierarchyStack: ["CampaignDiagramEnums"]};
define("CampaignDiagramEnums", function() {
	return {
		/**
		 * ### ######### #### ##########.
		 */
		ConnectorEndpoint: {
			Source: {
				name: "sourceEndPoint",
				propertyName: "sourceNode"
			},
			Target: {
				name: "targetEndPoint",
				propertyName: "targetNode"
			}
		},

		/**
		 * ######### ## ######### ### ########### ######## ##### ########## ##### ######.
		 */
		DefaultCreateConnnectionHandleConfig: {
			size: 20,
			backgroundColor: "#FF943B",
			offset: {
				x: 15,
				y: -10
			}
		},

		/**
		 * ######### ## ######### ### ########### ########### ########## #####.
		 */
		DefaultNodeSelectionHandleConfig: {
			size: 124,
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			pathColor: "#FF943B"
		},

		/**
		 * Contains names of node connection limit properties.
		 */
		ConnectionsLimit: {
			INCOMING: "incomingConnectionsLimit",
			OUTGOING: "outgoingConnectionsLimit"
		}
	};
});



Terrasoft.configuration.Structures["AddPostModule"] = {innerHierarchyStack: ["AddPostModule"]};
define("AddPostModule", [], function() {
	/**
	 * ######### ##### # ####### ## #### #####
	 * @param config
	 */
	function addPost(config) {
		config.sandbox.publish("PushHistoryState", {
			hash: "SectionModuleV2/ESNFeedSectionV2",
			stateObj: {
				focusAddPost: true,
				moduleId: config.sandbox.id + "_ESNFeedSection"
			}
		});
	}

	return {
		Run: addPost
	};
});



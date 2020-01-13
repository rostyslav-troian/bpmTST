Terrasoft.configuration.Structures["MobileSocialMessageAssociateModelCacheManager"] = {innerHierarchyStack: ["MobileSocialMessageAssociateModelCacheManager"]};
/**
 * @class Terrasoft.configuration.SocialMessageAssociateModelCacheManager
 * Implementation of cache manager for "Feed" detail.
 */
Ext.define("Terrasoft.configuration.SocialMessageAssociateModelCacheManager", {
	extend: "Terrasoft.core.AssociateModelCacheManager",
	alternateClassName: "Terrasoft.SocialMessageAssociateModelCacheManager",

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	shouldPutToCache: function() {
		return true;
	}

});



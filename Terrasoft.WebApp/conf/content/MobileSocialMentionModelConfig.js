Terrasoft.configuration.Structures["MobileSocialMentionModelConfig"] = {innerHierarchyStack: ["MobileSocialMentionModelConfig"]};
/* globals SocialMessage: false */
SocialMessage.associations.add(Ext.data.association.Association.create({
	storeName: "SocialMentionAssocStore",
	ownerModel: SocialMessage.getName(),
	associatedModel: "SocialMention",
	type: "hasMany",
	primaryKey: "Id",
	foreignKey: "SocialMessage",
	name: "SocialMentionAssociation"
}));



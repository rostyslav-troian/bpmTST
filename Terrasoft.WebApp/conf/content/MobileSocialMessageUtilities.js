Terrasoft.configuration.Structures["MobileSocialMessageUtilities"] = {innerHierarchyStack: ["MobileSocialMessageUtilities"]};
/* globals VwMobileSysSchema: false */
/* globals SysImage: false */
/* globals Contact: false */
Ext.ns("Terrasoft.configuration.ESNUtils");

Terrasoft.configuration.ESNUtils.LinkTypes = {
	Module: "module",
	Uri: "uri",
	Email: "email",
	Phone: "phone"
};

Terrasoft.configuration.LinkTypes = Terrasoft.configuration.ESNUtils.LinkTypes;

Terrasoft.configuration.ESNUtils.getSysSchemaUIdByName = function(modelName) {
	var store = VwMobileSysSchema.Store;
	if (!store) {
		return null;
	}
	var data = store.data;
	var modelSchema = data.findBy(function(item) {
		return item.data.Name === modelName;
	});
	return modelSchema ? modelSchema.data.Id : null;
};

Terrasoft.configuration.getSysSchemaUIdByName = Terrasoft.configuration.ESNUtils.getSysSchemaUIdByName;

/**
 * Opens the link.
 * @param {Terrasoft.configuration.LinkTypes} config.type Type of link.
 * @param {Terrasoft.configuration.LinkTypes} config.type Type of the link.
 * @param {String} config.modelname Related model's name.
 * @param {String} config.recordid Related record's id.
 * @param {Object} config.url URL.
 * @param {Object} config.email E-mail.
 * @param {Object} config.phone Phone number.
 */
Terrasoft.configuration.ESNUtils.openLink = function(config) {
	var linkTypes = Terrasoft.configuration.LinkTypes;
	switch (config.type) {
		case linkTypes.Module:
			var recordId = config.recordid;
			var modelName = config.modelname;
			if (modelName !== "SocialChannel" && recordId) {
				Terrasoft.util.openPreviewPage(modelName, {
					recordId: recordId,
					isStartRecord: true
				});
			}
			break;
		case linkTypes.Uri:
			Terrasoft.util.openUrl(config.url, true);
			break;
		case linkTypes.Email:
			Terrasoft.EmailManager.sendEmail({
				to: config.email
			});
			break;
		case linkTypes.Phone:
			Terrasoft.util.callByPhone(config.phone);
			break;
		default:
			break;
	}
};

Terrasoft.configuration.openLink = Terrasoft.configuration.ESNUtils.openLink;

/**
 * Sets current user in 'CreatedBy' column and as author of social message.
 * @param {Object} config Configuration object:
 * @param {SocialMessage} config.socialMessageRecord Social message record.
 * @param {Function} config.callback Callback function.
 * @param {Object} config.scope Scope of callback function.
 * @param {String} config.cancellationId Cancellation id. If parameter is set, operation can be cancelled.
*/
Terrasoft.configuration.ESNUtils.setCreatedByForCurrentUser = function(config) {
	var record = config.record;
	Terrasoft.configuration.getCurrentUserImage({
		cancellationId: config.cancellationId,
		callback: function(image) {
			var photo = SysImage.create({
				PreviewData: image
			});
			var createdBy = record.get("CreatedBy");
			if (!(createdBy instanceof Contact)) {
				createdBy = Terrasoft.evaluateMacrosValue(Terrasoft.ValueMacros.CurrentUserContact);
				record.set("CreatedBy", createdBy);
				record.set("CreatedOn",
					Terrasoft.evaluateMacrosValue(Terrasoft.ValueMacros.CurrentDateTime));
			}
			createdBy.set("Photo", photo);
			Ext.callback(config.callback, config.scope);
		},
		scope: this
	});
};

Terrasoft.configuration.setCreatedByForCurrentUser = Terrasoft.configuration.ESNUtils.setCreatedByForCurrentUser;

/**
 * Returns true if 'Feed' works in hybrid mode.
 * @returns {Boolean} True if 'Feed' works in hybrid mode.
*/
Terrasoft.configuration.ESNUtils.isFeedInHybridMode = function() {
	return Terrasoft.Features.getIsEnabled("UseHybridModeInMobileFeed") &&
		!Terrasoft.ApplicationUtils.isOnlineMode() && Terrasoft.Connection.isOnline();
};

Terrasoft.configuration.isFeedInHybridMode = Terrasoft.configuration.ESNUtils.isFeedInHybridMode;



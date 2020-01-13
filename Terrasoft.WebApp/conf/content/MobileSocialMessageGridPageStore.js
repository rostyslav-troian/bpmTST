Terrasoft.configuration.Structures["MobileSocialMessageGridPageStore"] = {innerHierarchyStack: ["MobileSocialMessageGridPageStore"]};
Ext.define("Terrasoft.configuration.store.SocialMessageGridPage", {
	extend: "Terrasoft.store.BaseStore",
	alternateClassName: "SocialMessageGridPage.Store",

	config: {

		model: "SocialMessage",

		controller: "SocialMessageGridPage.Controller",

		shouldLoadEntitiesRecords: true

	},

	/**
	 * @private
	 */
	socialMessageEntityLoader: null,

	/**
	 * @private
	 */
	socialMessageLikeManager: null,

	socialMessageEntitiesRecords: null,

	socialMessageLikedRecordIds: null,

	socialMessageModifiedRecordIds: null,

	/**
	 * @private
	 */
	getRecordIds: function(records, lookupColumnName) {
		var ids = [];
		for (var i = 0, ln = records.length; i < ln; i++) {
			var record = records[i];
			var columnRecord = (lookupColumnName) ? record.get(lookupColumnName) : record;
			ids.push(columnRecord.getId());
		}
		return ids;
	},

	/**
	 * @private
	 */
	loadModifiedRecords: function(callback) {
		this.socialMessageModifiedRecordIds = [];
		var filters = Ext.create("Terrasoft.Filter", {
			property: "ModelName",
			value: "SocialMessage"
		});
		Terrasoft.DataUtils.loadRecords({
			isCancelable: false,
			modelName: "SysMobileLog",
			columns: ["RecordId"],
			filters: filters,
			success: function(records) {
				for (var i = 0, ln = records.length; i < ln; i++) {
					var record = records[i];
					Terrasoft.Array.pushUnique(this.socialMessageModifiedRecordIds, record.get("RecordId"));
				}
				Ext.callback(callback, this);
			},
			failure: function() {
				Ext.callback(callback, this);
			},
			scope: this
		});
	},

	/**
	 * @inheritdoc
	 */
	constructor: function() {
		this.callParent(arguments);
		this.socialMessageLikedRecordIds = [];
		this.socialMessageModifiedRecordIds = [];
		this.socialMessageEntityLoader = Ext.create("Terrasoft.Configuration.SocialMessageEntityLoader");
		this.socialMessageLikeManager = Ext.create("Terrasoft.Configuration.SocialMessageLikeManager");
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	onProxyLoad: function(operation) {
		var arg = arguments;
		var proxyType = this.getProxyType();
		var records = operation.getRecords();
		var isFirstPage = (operation.getPage() === 1);
		var callback = function() {
			this.socialMessageLikeManager.loadForCurrentUser({
				proxyType: proxyType,
				records: records,
				callback: function(loadedRecords) {
					var loadedRecordIds = this.getRecordIds(loadedRecords, "SocialMessage");
					this.socialMessageLikedRecordIds = isFirstPage ? loadedRecordIds :
						Ext.Array.merge(this.socialMessageLikedRecordIds, loadedRecordIds);
					this.loadModifiedRecords(function() {
						Terrasoft.configuration.store.SocialMessageGridPage.superclass.onProxyLoad.apply(this, arg);
					}.bind(this));
				},
				scope: this
			});
		};
		if (this.getShouldLoadEntitiesRecords()) {
			this.socialMessageEntityLoader.load({
				proxyType: proxyType,
				records: records,
				success: function(data) {
					this.socialMessageEntitiesRecords = data;
					Ext.callback(callback, this);
				},
				scope: this
			});
		} else {
			Ext.callback(callback, this);
		}
	},

	/**
	 * Updates property 'socialMessageLikedRecordIds'.
	 * @param {Object} record Instance of model.
	 * @param {Boolean} isLiked `true` to set as liked.
	 */
	updateSocialMessageLikedRecordIds: function(record, isLiked) {
		var socialMessageLikedRecordIds = this.socialMessageLikedRecordIds;
		var recordId = record.getId();
		if (!isLiked) {
			var recordIndex = socialMessageLikedRecordIds.indexOf(recordId);
			socialMessageLikedRecordIds.splice(recordIndex, 1);
		} else {
			socialMessageLikedRecordIds.push(recordId);
		}
	},

	/**
	 * Sets social message as liked.
	 * @param {Object} record Instance of model.
	 * @param {Boolean} isLiked `true` to set as liked.
	 */
	setLiked: function(record, isLiked) {
		this.socialMessageLikeManager.setLiked(record, isLiked);
		this.updateSocialMessageLikedRecordIds(record, isLiked);
	},

	/**
	 * @inheritdoc
	 */
	destroy: function() {
		this.callParent(arguments);
		this.socialMessageEntityLoader.destroy();
		this.socialMessageLikeManager.destroy();
		this.socialMessageEntityLoader = null;
		this.socialMessageLikeManager = null;
		this.socialMessageLikedRecordIds = null;
		this.socialMessageEntitiesRecords = null;
		this.socialMessageModifiedRecordIds = null;
	}

});



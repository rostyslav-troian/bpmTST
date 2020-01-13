Terrasoft.configuration.Structures["CampaignElementMixin"] = {innerHierarchyStack: ["CampaignElementMixin"]};
Ext.define("Terrasoft.configuration.mixins.CampaignElementMixin", {
	alternateClassName: "Terrasoft.CampaignElementMixin",

	/**
	 * Adds 0 to number string with one numeric.
	 * @private
	 * @param  {number} number maybe days count or month number.
	 * @return {string} string repersentation of number.
	 */
	_convertToDoubleNumeralString: function(number) {
		if (number > 9) {
			return number.toString();
		}
		return "0" + number;
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getImageConfig
	 * @overridden
	 */
	getImageConfig: function(localizableImage) {
		var imageUrl = Terrasoft.ImageUrlBuilder.getUrl(localizableImage);
		return {
			"source": Terrasoft.ImageSources.URL,
			"url": imageUrl
		};
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getSmallImage
	 * @overridden
	 */
	getImage: function(imageResource) {
		return this.getImageConfig(imageResource);
	},

	/**
	 * Creates entity schema query for linked entity. It will be use for select entity by Id.
	 * @private
	 * @param {String} rootSchemaName Name of the entity schema.
	 * @returns {Terrasoft.EntitySchemaQuery} Instance of the entity schema query.
	 */
	getEsq: function(rootSchemaName, columns) {
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: rootSchemaName
		});
		columns.forEach(function(el) {
			esq.addColumn(el);
		});
		return esq;
	},

	/**
	 * Loads linked entity
	 * @private
	 * @param {Guid} entityId Entity identifier.
	 * @param {string} rootSchemaName Name of root schema
	 * @param {Array[string]} columns array of column names
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The callback execution context.
	 */
	loadLinkedEntity: function(entityId, rootSchemaName, columns, callback, scope) {
		var esq = this.getEsq(rootSchemaName, columns);
		esq.getEntity(entityId, function(response) {
			callback.call(scope || this, response.entity || null);
		}, this);
	},

	/**
	 * Creates TimeZone entity schema query.
	 * @private
	 * @return {Terrasoft.EntitySchemaQuery} Instance of the entity schema query.
	 */
	createTimeZoneQuery: function() {
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: "TimeZone"
		});
		esq.addColumn("Id");
		esq.addColumn("Name");
		esq.addColumn("Code");
		esq.serverESQCacheParameters = {
			cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
			cacheGroup: "CampaignDesigner",
			cacheItemName: "TimeZoneList"
		};
		return esq;
	},

	/**
	 * Loads time zones from lookup.
	 * @param callback
	 * @param scope
	 */
	loadTimeZones: function(callback, scope) {
		var esq = this.createTimeZoneQuery();
		this.loadEntityCollection(esq, callback, scope);
	},

	/**
	 * Loads specific by query entity collection
	 * and calls callback with result collection.
	 * If request is failed execution is stopped.
	 * @param {Terrasoft.EntitySchemaQuery} esq Instance of the entity schema query.
	 * @param {Function} callback
	 * @param {Object} scope
	 */
	loadEntityCollection: function(esq, callback, scope) {
		esq.getEntityCollection(function(response) {
			if (!response || !response.success) {
				return;
			}
			Ext.callback(callback, scope, [response.collection]);
		}, this);
	},

	/**
	 * Returns custom string representation of Date object to send.
	 * @param  {Date} date current StartTime property date.
	 * @return {string} string representation of date.
	 */
	convertDateToString: function(date) {
		var year = date.getFullYear();
		var month = this._convertToDoubleNumeralString(date.getMonth() + 1);
		var day = this._convertToDoubleNumeralString(date.getDate());
		var hours = this._convertToDoubleNumeralString(date.getHours());
		var minutes = this._convertToDoubleNumeralString(date.getMinutes());
		var template = "{0}-{1}-{2} {3}:{4}";
		return Ext.String.format(template, year, month, day, hours, minutes);
	}
});



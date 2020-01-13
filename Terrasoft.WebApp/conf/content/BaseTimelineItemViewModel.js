Terrasoft.configuration.Structures["BaseTimelineItemViewModel"] = {innerHierarchyStack: ["BaseTimelineItemViewModel"]};
define("BaseTimelineItemViewModel", ["NetworkUtilities", "MiniPageUtilities", "BaseTimelineItemViewModelResources"],
	function(networkUtilities) {
		/**
		 * Base timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.BaseTimelineItemViewModel", {
			alternateClassName: "Terrasoft.BaseTimelineItemViewModel",
			extend: "Terrasoft.BaseModel",

			mixins: {
				/**
				 * @class MiniPageUtilities Mixin, used for open Mini Pages
				 */
				MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities"
			},

			// region Properties: Private

			/**
			 * Resource schema module suffix.
			 * @private
			 * @type {String}
			 */
			_resourcesSuffix: "Resources",

			/**
			 * Resources type object.
			 * @private
			 * @type {Object}
			 */
			_resourceType: {
				STRING: "Strings",
				IMAGE: "Images"
			},

			// endregion

			// region Properties: Protected

			/**
			 * Item unique identifier.
			 * @protected
			 * @type {GUID}
			 */
			id: null,

			/**
			 * Sandbox.
			 * @protected
			 * @type {Object}
			 */
			sandbox: null,

			/**
			 * Prefix for entity hyperlink URL generating.
			 * @protected
			 * @type {String}
			 */
			hyperlinkViewModulePrefix: "ViewModule.aspx#",

			/**
			 * Reference entity schema name of record author.
			 * @protected
			 * @type {String}
			 */
			authorEntitySchemaName: "Contact",

			/**
			 * Alias for column containing record author. The value must be loaded into this column for
			 * ability to use it. Author column will not be used if this field set to empty.
			 * @protected
			 * @type {String}
			 */
			authorColumnAlias: "Author",

			// endregion

			// region Methods: Private

			/**
			 * Returns resource class names.
			 * @private
			 * @param {Terrasoft.BaseModel} instance Instance.
			 * @return {Array} Resource class names.
			 */
			_getResourceClassNames: function(instance) {
				var result = [];
				if (!Terrasoft.isInstanceOfClass(instance, "Terrasoft.BaseModel")) {
					return;
				}
				var className = instance.alternateClassName || instance.$className;
				className = className.match(/[^.]*$/)[0];
				if (!className) {
					return;
				}
				var resourcesName = className + this._resourcesSuffix;
				result.push(resourcesName);
				var parentsResources = this._getResourceClassNames(instance.superclass);
				if (Ext.isArray(parentsResources)) {
					result = result.concat(parentsResources);
				}
				return result;
			},

			/**
			 * Initializes view model resources hierarchically.
			 * @private
			 */
			_initClassResources: function() {
				var resourceClassNames = this._getResourceClassNames(this);
				resourceClassNames = resourceClassNames.reverse();
				Terrasoft.each(resourceClassNames, function(resourceClassName) {
					var resources = require(resourceClassName);
					this._setResources(resources);
				}, this);
			},

			/**
			 * Sets resources by types.
			 * @private
			 * @param {Object} resources Resources.
			 */
			_setResources: function(resources) {
				Terrasoft.each(resources.localizableStrings, function(value, name) {
					this._setResource(name, value, this._resourceType.STRING);
				}, this);
				Terrasoft.each(resources.localizableImages, function(value, name) {
					this._setResource(name, value, this._resourceType.IMAGE);
				}, this);
			},

			/**
			 * Sets resource.
			 * @private
			 * @param {String} name Resource name.
			 * @param {String} value Resource value.
			 * @param {String} type Resource type.
			 */
			_setResource: function(name, value, type) {
				var attributeName = Ext.String.format("{0}.{1}.{2}", this._resourcesSuffix, type, name);
				this.set(attributeName, value);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.init();
			},

			/**
			 * Performs timeline item view model initializing actions.
			 * @protected
			 */
			init: function() {
				this.id = this.id || this.get("Id");
				this._initClassResources();
				this.initDefaultValues();
			},

			/**
			 * Initializes timeline item view model default attributes values.
			 * @protected
			 */
			initDefaultValues: function() {
				this.set("ShowAuthorIcon", false);
				this.set("UseAuthorCaption", false);
				this.set("AuthorName", this.getAuthorName());
				this.set("IsCollapsed", false);
				this.set("IsExpanded", true);
			},

			/**
			 * Returns author full name from 'Author' column.
			 * @protected
			 * @return {String|null} Author full name if author is not empty, otherwise null.
			 */
			getAuthorName: function() {
				if (this.authorColumnAlias) {
					var author = this.get(this.authorColumnAlias);
					return (author && author.displayValue) || null;
				}
				return null;
			},

			/**
			 * Opens edit card of specific entity.
			 * @protected
			 * @param {String} entitySchemaName Schame name of entity.
			 * @param {String} primaryColumnValue Value of entity primary column.
			 * @param {String} typeColumnValue Value of entity type column.
			 */
			openEntityCard: function(entitySchemaName, primaryColumnValue, typeColumnValue) {
				var sandbox = this.sandbox;
				networkUtilities.openCardInChain({
					entitySchemaName: entitySchemaName,
					primaryColumnValue: primaryColumnValue,
					typeId: typeColumnValue,
					operation: Terrasoft.ConfigurationEnums.CardOperation.EDIT,
					sandbox: sandbox,
					historyState: sandbox.publish("GetHistoryState")
				});
			},

			/**
			 * Generates hyperlink URL for specific entity.
			 * @protected
			 * @param {String} entitySchemaName Schame name of entity.
			 * @param {String} primaryColumnValue Value of entity primary column.
			 * @param {String} typeColumnValue Value of entity type column.
			 * @return {String} URL text.
			 */
			getEntityUrl: function(entitySchemaName, primaryColumnValue, typeColumnValue) {
				var url = networkUtilities.getEntityUrl(entitySchemaName, primaryColumnValue, typeColumnValue);
				return this.hyperlinkViewModulePrefix + url;
			},

			/**
			 * Generates initials of a contact using its full name.
			 * @protected
			 * @param {String} fullName Full name of contact.
			 * @return {String} First letters of first two words in contact full name.
			 */
			generateContactInitials: function(fullName) {
				if (!fullName) {
					return "";
				}
				var actualFullName = fullName.replace(/\s+/g, " ").trim();
				return actualFullName.split(" ", 2).map(function(value) {
					return value.substr(0, 1).toUpperCase();
				}).join("");
			},

			/**
			 * Shows mini page.
			 * @protected
			 * @param {Object} [config] Config for opening mini page.
			 */
			showMiniPage: function(config) {
				var miniPageConfig = {
					recordId: this.get("Id"),
					columnName: "Id",
					isFixed: false,
					entitySchemaName: this.get("EntitySchemaName")
				};
				if (config) {
					Ext.apply(miniPageConfig, config);
				}
				this.openMiniPage(miniPageConfig);
			},

			/**
			 * Generates URL of primary image by column.
			 * @protected
			 * @param {Object} column Entity column.
			 * @return {String|null} Image URL address if column and primaryImageValue is defined, otherwise null.
			 */
			getImageUrlByColumn: function(column) {
				if (column && column.primaryImageValue) {
					var imageConfig = {
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {
							primaryColumnValue: column.primaryImageValue
						}
					};
					return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
				}
				return null;
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns entity image.
			 * @return {String} Image URL.
			 */
			getEntityIconSrc: function() {
				return this.get("IconUrl");
			},

			/**
			 * Returns group icon image url.
			 * @deprecated
			 * @return {String} Image URL.
			 */
			getGroupIconSrc: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.GroupIcon"));
			},

			/**
			 * Check that passed value is not empty.
			 * @deprecated
			 * @param {Boolean} value Value to check.
			 * @return {Boolean} True if value is not empty, otherwise false.
			 */
			checkIsNotEmpty: function(value) {
				return !Ext.isEmpty(value);
			},

			/**
			 * Handles caption label click.
			 */
			onCaptionClick: function() {
				this.openEntityCard(this.get("EntitySchemaName"), this.get("Id"), this.get("TypeColumnValue"));
				return false;
			},

			/**
			 * Generates hyperlink URL for timeline record entity.
			 * @return {String} URL text.
			 */
			getRecordUrl: function() {
				return this.getEntityUrl(this.get("EntitySchemaName"), this.get("Id"), this.get("TypeColumnValue"));
			},

			/**
			 * Handles click on record author caption.
			 */
			onAuthorCaptionClick: function() {
				if (!Ext.isEmpty(this.authorColumnAlias)) {
					var author = this.get(this.authorColumnAlias);
					if (!Ext.isEmpty(author)) {
						this.openEntityCard(this.authorEntitySchemaName, author.value);
					}
				}
				return false;
			},

			/**
			 * Generates hyperlink URL for record author entity.
			 * @return {String|null} URL address if author column is defined, otherwise null.
			 */
			getAuthorUrl: function() {
				if (!Ext.isEmpty(this.authorColumnAlias)) {
					var author = this.get(this.authorColumnAlias);
					if (!Ext.isEmpty(author)) {
						return this.getEntityUrl(this.authorEntitySchemaName, author.value, null);
					}
				}
				return null;
			},

			/**
			 * Returns URL for receiving record author photo.
			 * @return {String|null} Photo URL address if author column and photo is defined, otherwise null.
			 */
			getAuthorPhotoUrl: function() {
				if (!Ext.isEmpty(this.authorColumnAlias)) {
					var author = this.get(this.authorColumnAlias);
					return this.getImageUrlByColumn(author);
				}
				return null;
			},

			/**
			 * Returns record author initials.
			 * @param {Object} authorName Record author name.
			 * @return {String|null} First letters of record author first name and last name if author column
			 * is defined, otherwise null.
			 */
			getAuthorInitials: function(authorName) {
				return this.generateContactInitials(authorName);
			},

			/**
			 * Checks that author initials container should be visible.
			 * @param {Object} author Author value.
			 * @return {Boolean} True if author initials should be visible, otherwise false.
			 */
			checkIsAuthorInitialsVisible: function(author) {
				if (this.checkIsAuthorPhotoVisible(author)) {
					return false;
				}
				var authorName = this.get("AuthorName");
				return !Ext.isEmpty(authorName);
			},

			/**
			 * Checks that author photo image should be visible.
			 * @param {Object} author Author value.
			 * @return {Boolean} True if author photo should be visible, otherwise false.
			 */
			checkIsAuthorPhotoVisible: function(author) {
				return !Ext.isEmpty(author) && !Ext.isEmpty(author.primaryImageValue);
			},

			/**
			 * Returns formatted date.
			 * @param {Date} date Date to format.
			 * @return {String} Formatted date.
			 */
			getFormattedDate: function(date) {
				var dateText = "";
				if (Ext.isDate(date)) {
					var cultureSettings = Terrasoft.Resources.CultureSettings;
					var dateTimeFormatTemplate = this.get("Resources.Strings.DateTimeFormatTemplate");
					var dateWithDayNameTemplate = this.get("Resources.Strings.DateWithDayNameTemplate");
					var dateTimeFormat = Ext.String.format(dateTimeFormatTemplate,
						cultureSettings.dateFormat, cultureSettings.timeFormat);
					dateText = Ext.String.format(dateWithDayNameTemplate,
						cultureSettings.shortDayNames[date.getDay()], Ext.Date.format(date, dateTimeFormat));
				}
				return dateText;
			},

			/**
			 * Returns formatted short date.
			 * @param {Date} date Date to format.
			 * @return {String} Formatted short date.
			 */
			getFormattedShortDate: function(date) {
				var dateText = "";
				if (Ext.isDate(date)) {
					var cultureSettings = Terrasoft.Resources.CultureSettings;
					dateText = Ext.Date.format(date, cultureSettings.dateFormat);
				}
				return dateText;
			},

			/**
			 * Formats floating-point number value.
			 * @param {Number} numberValue Number value to format.
			 * @return {String} String with formatted number.
			 */
			getFormattedFloatNumberValue: function(numberValue) {
				return Terrasoft.getFormattedNumberValue(numberValue, {
					"type": Terrasoft.DataValueType.FLOAT
				});
			},

			/**
			 * Returns custom DOM attributes for timeline item caption.
			 * @return {Object} Object with DOM attributes.
			 */
			getCaptionDomAttributes: function() {
				return {
					"title": this.get("Caption")
				};
			},

			/**
			 * Handles on caption link mouse over.
			 * @param {Object} target Target object.
			 */
			captionLinkMouseOver: function(target) {
				this.showMiniPage({
					targetId: target.targetId
				});
			},

			/**
			 * Handles on author link mouse over.
			 * @param {Object} target Target object.
			 */
			authorLinkMouseOver: function(target) {
				if (!Ext.isEmpty(this.authorColumnAlias)) {
					var author = this.get(this.authorColumnAlias);
					if (!Ext.isEmpty(author)) {
						this.showMiniPage({
							targetId: target.targetId,
							entitySchemaName: this.authorEntitySchemaName,
							recordId: author.value
						});
					}
				}
			}

			// endregion

		});
	});



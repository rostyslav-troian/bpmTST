Terrasoft.configuration.Structures["LeadSimilarEntitiesProfileSchemaUtilities"] = {innerHierarchyStack: ["LeadSimilarEntitiesProfileSchemaUtilities"]};
define("LeadSimilarEntitiesProfileSchemaUtilities", ["LeadSimilarEntitiesUtilities"],
	function() {
		Ext.define("Terrasoft.configuration.mixins.LeadSimilarEntitiesProfileSchemaUtilities", {
			extend: "Terrasoft.LeadSimilarEntitiesUtilities",
			alternateClassName: "Terrasoft.LeadSimilarEntitiesProfileSchemaUtilities",

			/**
			 * @inheritdoc Terrasoft.LeadSimilarEntitiesUtilities#enabledAttributeNameTemplate
			 * @overridden
			 */
			enabledAttributeNameTemplate: "SimilarButtonEnabled",

			/**
			 * @inheritdoc Terrasoft.LeadSimilarEntitiesUtilities#similarCollectionNameTemplate
			 * @overridden
			 */
			similarCollectionNameTemplate: "SimilarCollection",

			/**
			 * Initializes properties.
			 * @protected
			 */
			initializeProperties: function() {
				var labelPattern = this.getLczStringValue("SimilarButtonCaption");
				var hintText = this.getLczStringValue("SimilarButtonFoundHintText");
				var similarCollection = this.get("SimilarCollection") || [];
				var collectionIsEmpty = this.Ext.isEmpty(similarCollection);
				if (collectionIsEmpty) {
					hintText = this.getLczStringValue("SimilarButtonNotFoundHintText");
				}
				this.set("SimilarButtonHintText", hintText);
				this.set("SimilarButtonEnabled", !collectionIsEmpty);
				this.set("SimilarButtonCaption", this.Ext.String.format(labelPattern, similarCollection.length));
			},

			/**
			 * Returns value of the localizable string by name.
			 * @param {String} name Name of the localizable string.
			 * @return {String} Value.
			 */
			getLczStringValue: function(name) {
				return this.get("Resources.Strings." + name);
			},

			/**
			 * Opens lookup of the similar accounts.
			 * @protected
			 */
			onSimilarButtonClick: function() {
				this.openSimilarRecordsLookup(this.entitySchemaName, this.get("masterColumnName"));
			},

			/**
			 * @inheritdoc Terrasoft.LeadSimilarEntitiesUtilities#initSimilarEntityRecordsCollection
			 * @overridden
			 */
			initSimilarEntityRecordsCollection: function() {
				if (!this.get("MasterColumnValue")) {
					this.callParent([this.entitySchemaName, this.initializeProperties, this]);
				}
			}

		});

		return Terrasoft.LeadSimilarEntitiesProfileSchemaUtilities;
	});



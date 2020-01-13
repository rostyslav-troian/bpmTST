Terrasoft.configuration.Structures["EmailEnrichmentMixin"] = {innerHierarchyStack: ["EmailEnrichmentMixin"]};
define("EmailEnrichmentMixin", ["EmailEnrichmentMixinResources"],
		function(resources) {
			/**
			 * @class Terrasoft.configuration.mixins.EmailEnrichmentMixin
			 * The mixin which can add menu items for contact enrichment from email.
			 */
			Ext.define("Terrasoft.configuration.mixins.EmailEnrichmentMixin", {
				alternateClassName: "Terrasoft.EmailEnrichmentMixin",

				//region Methods: Protected

				/**
				 * Creates enrichment collection item.
				 * @protected
				 * @virtual
				 * @param {Object} config Item properties.
				 * @return {Terrasoft.BaseViewModel} Additional enrichment collection item.
				 */
				getEnrichmentButtonMenuItem: function(config) {
					return this.Ext.create("Terrasoft.BaseViewModel", {
						values: this.Ext.apply({}, {
							Id: this.Terrasoft.generateGUID(),
							MarkerValue: config.Caption
						}, config)
					});
				},

				/**
				 * Returns caption template for contact enrichment menu item.
				 * @private
				 * @param {String} contactId Contact unique identifier.
				 * @return {String} Caption template for contact enrichment menu item.
				 */
				getMenuItemCaptionTpl: function(contactId) {
					var createTpl = resources.localizableStrings.CreateContactCaptionTemplate;
					var enrichTpl = resources.localizableStrings.EnrichContactCaptionTemplate;
					return Terrasoft.isEmptyGUID(contactId) ? createTpl : enrichTpl;
				},

				/**
				 * Creates contact enrichment window config.
				 * @private
				 * @param {Object} contact Enrich contact properties.
				 * @param {Object} contactData Contact columns raw values.
				 * @return {Object} Contact enrichment window config.
				 */
				getOpenWindowConfig: function(contact, contactData) {
					var sourceCaller = this.get("CallerSource");
					var baseConfig = {
						contactId: contact.ContactId,
						contactName: contactData.value,
						enrchTextDataId: contact.EnrchTextDataId,
						isVisible: true,
						source: sourceCaller
					};
					return this.Ext.apply(baseConfig, this.getAdditionalWindowConfig(contact));
				},

				/**
				 * Adds enrich contact menu item to actions collection.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} collection Actions collection.
				 * @param {Object} contact Enrich contact action parameters.
				 */
				addEnrichContactAction: function(collection, contact) {
					var contactJsonData = contact.JsonData;
					var contactData = JSON.parse(contactJsonData);
					var tpl = this.getMenuItemCaptionTpl(contact.ContactId);
					var caption = this.Ext.String.format(tpl, contactData.value);
					var args = this.getOpenWindowConfig(contact, contactData);
					collection.addItem(this.getEnrichmentButtonMenuItem({
							"Caption": caption,
							"Click": {bindTo: "openEnrichmentWindow"},
							"Tag": this.Ext.encode(args),
							"ImageConfig": resources.localizableImages.Cloud
						})
					);
				},

				/**
				 * Returns additional contact enrichment window config.
				 * @protected
				 * @virtual
				 */
				getAdditionalWindowConfig: Terrasoft.emptyFn,

				/**
				 * Fills menu items collection with contact enrichment menu items.
				 * @protected
				 * @virtual
				 */
				initEnrichmentCollection: function() {
					var result = this.get("Response");
					if (result == null) {
						return;
					}
					var baseActions = this.get("ActionsMenuCollection");
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					collection.addItem(this.getEnrichmentButtonMenuItem({
							"Type": "Terrasoft.MenuSeparator",
							"Caption": resources.localizableStrings.EnrichContactMenuSeparator
						}
					));
					var contacts = result.data.slice(0, 4);
					this.Terrasoft.each(contacts, function(contact) {
						this.addEnrichContactAction(collection, contact);
					}, this);
					baseActions.each(function(item) {
						collection.add(item);
					});
					baseActions.clear();
					baseActions.loadAll(collection);
				},

				/**
				 * Opens enrich contact window.
				 * @protected
				 * @virtual
				 * @param {Object} tag Enrichment arguments.
				 * @param {Boolean} tag.isVisible Sign that contact enrichment page is visible or not.
				 * @param {Object} tag.contactId Contact identifier.
				 * @param {String} tag.contactName Contact name.
				 * @param {Object} tag.enrchTextDataId Enrichment text data identifier.
				 */
				openEnrichmentWindow: function(tag) {
					this.sandbox.publish("ContactEnrichmentPageVisibilityChanged", [tag]);
				},

				/**
				 * Returns enrich actions request config.
				 * @protected
				 * @return {Object} Enrich actions request config.
				 */
				getActionsRequestConfig: function() {
					var baseConfig = {serviceName: "EnrichContactService"};
					return this.Ext.apply(baseConfig, this.getAdditionalActionsRequestConfig());
				},

				/**
				 * Returns aditional enrich actions request config.
				 * @protected
				 * @virtual
				 * @return {Object} Aditional enrich actions request config.
				 */
				getAdditionalActionsRequestConfig: function() {
					return {
						methodName: "GetCloudStateForEmail",
						data: {
							activityId: this.get("Id")
						}
					};
				},

				/**
				 * Passes found contacts that can be enriched to the callback function.
				 * @protected
				 * @virtual
				 * @param {Object} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				getContactsFromServer: function(callback, scope) {
					var requestConfig = this.getActionsRequestConfig();
					this.callService(requestConfig, function(response) {
						this.setCloudVisibility(response);
						this.Ext.callback(callback, scope || this, [response]);
					}, this);
				},

				/**
				 * Sets visibility of enrichment image.
				 * @protected
				 * @virtual
				 * @param {Object} response Contact enrichment data returned from server.
				 */
				setCloudVisibility: function(response) {
					var result = response.CloudStateResponse;
					if (result == null) {
						return;
					}
					var resultData = result.data;
					var visibility = resultData.length > 0;
					this.set("isCloudVisible", visibility);
				},

				/**
				 * Returns visibility of enrichment image.
				 * @protected
				 * @virtual
				 * @return {Boolean} Sign of enrichment cloud visibility.
				 */
				isEnrichmentVisible: function() {
					return this.get("isCloudVisible");
				}
			});
		});



Terrasoft.configuration.Structures["PartnershipModule"] = {innerHierarchyStack: ["PartnershipModule"]};
define("PartnershipModule", ["BaseSchemaModuleV2"],
	function() {

		/**
		 * @class Terrasoft.configuration.PartnershipModule
		 * Module, which is analyze availability of active partnership and choose next view for render.
		 */
		return Ext.define("Terrasoft.configuration.PartnershipModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.PartnershipModule",
			messages: {
				/**
				 * @message PushHistoryState
				 * Notification that the history state has been changed.
				 */
				"PushHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetHistoryState
				 * Message to get current history state.
				 */
				"GetHistoryState": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				* @message ReplaceHistoryState
				* Message to replace current history state.
				*/
				"ReplaceHistoryState": {
					direction: this.Terrasoft.MessageDirectionType.PUBLISH,
					mode: this.Terrasoft.MessageMode.BROADCAST
				}
			},

			/**
			 * Default pages for rendering partnership data.
			 */
			defaultPartnershipClientSchemas: {
				sectionSchema: "PortalPartnershipSection",
				cardSchema: "PortalPartnershipPage"
			},

			/**
			* @inheritdoc Terrasoft.BaseSchemaModule#init
			* @override
			*/
			init: function() {
				this.sandbox.registerMessages(this.messages);
				this.navigatePartnerToNextView();
			},

			/**
			* Navigate partner to card of active partnership or section with message about no active partnership.
			* @protected
			*/
			navigatePartnerToNextView: function() {
				const esq = this.getActivePartnershipEsq();
				esq.getEntityCollection(function(response) {
					if (response) {
						const collection = response.collection;
						collection.isEmpty() ? this.openPartnershipSection() : this.openActivePartnership(collection);
					}
				}, this);
			},

			/**
			* Open section with message about no active partnership.
			* @protected
			*/
			openPartnershipSection: function() {
				const sectionSchema = this.getClientSchemaByName("sectionSchema");
				const path = this.Terrasoft.combinePath("SectionModuleV2", sectionSchema);
				const historyStateConfig = {hash: path};
				this.sandbox.publish("ReplaceHistoryState", historyStateConfig);
			},

			/**
			 * Returns client schemas for partnership.
			 * @protected
			 * @param {String} schemaName Name of client schema that is needed for rendering.
			 */
			getClientSchemaByName: function(schemaName) {
				const partnershipStructure = Terrasoft.configuration.ModuleStructure.Partnership;
				return partnershipStructure && partnershipStructure[schemaName]
					? partnershipStructure[schemaName] : this.defaultPartnershipClientSchemas[schemaName];
			},


			/**
			* Navigate partner to card of active partnership.
			* @protected
			* @param {Terrasoft.Collection} collection Collection of Partnership records.
			*/
			openActivePartnership: function(collection) {
				const activePartnershipId = collection.first().$Id;
				const cardSchema = this.getClientSchemaByName("cardSchema");
				const path = this.Terrasoft.combinePath("CardModuleV2", cardSchema,
					Terrasoft.ConfigurationEnums.CardOperation.EDIT, activePartnershipId);
				const historyStateConfig = {
					hash: path
				};
				this.sandbox.publish("ReplaceHistoryState", historyStateConfig);
			},

			/**
			* Returns EntitySchemaQuery for Partnership entity with filter by Active columns.
			* @protected
			* @returns {Terrasoft.EntitySchemaQuery} esq
			*/
			getActivePartnershipEsq: function() {
				const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Partnership"
				});
				esq.addColumn("Id");
				esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"IsActive", true));
				return esq;
			}
		});

	});



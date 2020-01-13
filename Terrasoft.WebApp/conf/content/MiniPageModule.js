Terrasoft.configuration.Structures["MiniPageModule"] = {innerHierarchyStack: ["MiniPageModule"]};
define("MiniPageModule", ["BusinessRulesApplierV2", "BaseSchemaModuleV2", "MiniPageViewGenerator"],
	function(BusinessRulesApplier) {
		Ext.define("Terrasoft.configuration.MiniPageModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.MiniPageModule",

			Ext: null,

			sandbox: null,

			Terrasoft: null,

			parameters: null,

			useHistoryState: false,

			showMask: true,

			messages: {

				"GetMiniPageMasterEntityInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateCardProperty
				 * Sets attributes for card.
				 * @type {Object}
				 */
				"UpdateCardProperty": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetLookupListConfig
				 * Get information about lookup column.
				 */
				"GetLookupListConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetLookupQueryFilters
				 * Get lookup query filters.
				 */
				"GetLookupQueryFilters": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var viewModelConfig = this.callParent(arguments);
				var parameters = this.parameters;
				Ext.apply(viewModelConfig, {
					values: {
						PrimaryColumnValue: parameters && parameters.primaryColumnValue,
						RowId: parameters && parameters.rowId,
						IsSectionGrid: parameters && parameters.isSectionGrid,
						MiniPageSourceSandboxId: parameters && parameters.miniPageSourceSandboxId
					}
				});
				return viewModelConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
			 * @overridden
			 */
			createViewModel: function() {
				var viewModel = this.callParent(arguments);
				BusinessRulesApplier.applyDependencies(viewModel);
				return viewModel;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#getSchemaBuilder
			 * @overridden
			 */
			getSchemaBuilder: function() {
				const parameters = this.parameters;
				const viewGeneratorClassName = (parameters && parameters.viewGeneratorClassName) ||
					"Terrasoft.MiniPageViewGenerator";
				return this.Ext.create("Terrasoft.SchemaBuilder", {
					"viewGeneratorClassName": viewGeneratorClassName
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				var parameters = this.parameters;
				this.schemaName = (parameters && parameters.schemaName) || "";
				this.entitySchemaName = (parameters && parameters.entitySchemaName) || "";
				this.registerMessages();
			},

			/**
			 * Register MiniPageModule messages.
			 * @private
			 */
			registerMessages: function() {
				if (this.messages) {
					this.sandbox.registerMessages(this.messages);
				}
			}

		});

		return Terrasoft.MiniPageModule;
	});



Terrasoft.configuration.Structures["MLPredictionPageMixin"] = {innerHierarchyStack: ["MLPredictionPageMixin"]};
define("MLPredictionPageMixin", ["terrasoft", "ModalBox", "MLPredictionExplanation"],
	function(Terrasoft, ModalBox) {
		/**
		 * @class Terrasoft.configuration.mixins.MLPredictionPageMixin
		 * Mixin for pages with ML prediction features.
		 */
		Ext.define("Terrasoft.configuration.mixins.MLPredictionPageMixin", {
			alternateClassName: "Terrasoft.MLPredictionPageMixin",

			/**
			 * @private
			 */
			_subscribeOnMLPredictionExplanationMessages: function(moduleId, scoreEntityColumnName) {
				this.sandbox.subscribe("GetMLExplanationConfig", function() {
					return {
						operation: "score",
						recordDescription: this.getPrimaryDisplayColumnValue(),
						entitySchemaUId: this.entitySchema.uId,
						entitySchemaTargetColumnUId: this.entitySchema.getColumnByName(scoreEntityColumnName).uId,
						entityId: this.$Id
					};
				}.bind(this), this, [moduleId]);
				this.sandbox.subscribe("HideMLExplanationsModule", function(newPredictedValue) {
					ModalBox.close();
					if (newPredictedValue && newPredictedValue !== this.get(scoreEntityColumnName)) {
						this.set(scoreEntityColumnName, newPredictedValue);
					}
				}, this, [moduleId]);
			},

			/**
			 * Updates predictive score and shows explanation info for ml prediction.
			 * @virtual
			 * @param {String} scoreEntityColumnName Root schema entity attribute name for storing predicted value.
			 */
			calcPredictiveScoreWithContributions: function(scoreEntityColumnName) {
				const moduleId = this.sandbox.id + "MLPredictionExplanation";
				const modalBoxConfig = {
					heightPixels: 400,
					widthPixels: 600,
					boxClasses: ["ml-modal-box"]
				};
				const renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}, this);
				const maskId = Terrasoft.Mask.show({
					timeout: 10,
					selector: ".ml-modal-box",
					clearMasks: true,
					showSpinner: true
				});
				this.sandbox.loadModule("BaseSchemaModuleV2", {
					id: moduleId,
					renderTo: renderTo.id,
					instanceConfig: {
						parameters: {
							viewModelConfig: {
								"MaskId": maskId
							}
						},
						schemaName: "MLPredictionExplanation",
						isSchemaConfigInitialized: true,
						useHistoryState: false
					}
				});
				this._subscribeOnMLPredictionExplanationMessages(moduleId, scoreEntityColumnName);
			},

			/**
			 * Checks if any ML model's prediction enabled for current page and give column.
			 * Sets result to TrainedScoreModelExists attribute.
			 * @param {String} predictedColumnName Target prediction column name.
			 * @param {String} problemType ML problem type.
			 */
			queryWasAnyModelTrained: function(predictedColumnName, problemType) {
				const entitySchema = this.entitySchema;
				const rootSchemaUId = Terrasoft.formatGUID(entitySchema.uId, "B");
				const predictiveScoreColumn = entitySchema.getColumnByName(predictedColumnName);
				const targetColumnUId = Terrasoft.formatGUID(predictiveScoreColumn.uId, "B");
				const query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MLModel",
					clientESQCacheParameters: {
						cacheItemName: this.entitySchemaName + "_" + problemType + "_" + "ModelIsTrained"
					}
				});
				query.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
				const entitySchemaFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"RootSchemaUId", rootSchemaUId);
				const targetColumnFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"TargetColumnUId", targetColumnUId);
				const predictedResultColumnFilter = query.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "PredictedResultColumnUId", targetColumnUId);
				const predictedResultColumnFilterGroup = Terrasoft.createFilterGroup();
				predictedResultColumnFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				predictedResultColumnFilterGroup.addItem(targetColumnFilter);
				predictedResultColumnFilterGroup.addItem(predictedResultColumnFilter);
				const predictionEnabledFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"PredictionEnabled", 1);
				const instanceFilter = query.createIsNotNullFilter(
					Ext.create("Terrasoft.ColumnExpression", {columnPath: "ModelInstanceUId"}));
				const modelTypeFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"MLProblemType", problemType, Terrasoft.DataValueType.GUID);
				query.filters.addItem(entitySchemaFilter);
				query.filters.addItem(predictedResultColumnFilterGroup);
				query.filters.addItem(predictionEnabledFilter);
				query.filters.addItem(instanceFilter);
				query.filters.addItem(modelTypeFilter);
				query.getEntityCollection(function(result) {
					if (result.success) {
						const entity = result.collection.first();
						this.set("TrainedScoreModelExists", entity.get("Count") > 0);
					}
				}, this);
			}
		});
	});



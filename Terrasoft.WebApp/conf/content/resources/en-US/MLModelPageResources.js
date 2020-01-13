define("MLModelPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TrainModelActionCaption: "Train model",
		TrainModelActionSucceedMessage: "Action has succeeded. Current session state: {0}",
		TrainModelActionFailedMessage: "Action has failed. You can find more details in the application log",
		ModelSettingsTabCaption: "Parameters",
		TrainingTabCaption: "Training",
		StatsTabCaption: "Usage statistics",
		NotesTabCaption: "Attachments and notes",
		ChooseObjectStepCaption: "STEP 1. Choose entity for prediction",
		AdvancedQuerySettingsGroupCaption: "Advanced tools to add columns",
		TrainingSettingsGroupCaption: "Automatic model training settings",
		ChooseObjectStepTipCaption: "Prediction will be performed for this object",
		AdvancedQuerySettingsGroupInfoButtonContent: "Optional select query for columns to be included in prediction calculation. \u003Ca target=\u0022_blank\u0022 rel=\u0022noopener noreferrer\u0022 href=\u0022https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-13\/how-implement-custom-prediction-model\u0022\u003ERead more...\u003C\/a\u003E",
		TrainingSettingsInfoButtonCaption: "Set model update parameters. Prediction quality may degrade over time.",
		RootEntityCaption: "Entity",
		MLServiceAPIAcademyLabel: "How machine learning service works",
		MLServiceAPIAcademyUrl: "https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-12\/machine-learning-service",
		MLModelSampleAcademyLabel: "How to set up machine learning model",
		MLModelSampleAcademyUrl: "https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-12\/how-implement-custom-prediction-model",
		FAQContainerCaption: "Frequently asked questions",
		RetrainLabelCaption: "Retrain after, days",
		TrainModelActionTimedOutMessage: "Training schedule takes some time, try again in few minutes",
		PedictionEnabledTip: "Enable\/disable model prediction. To set up repeat model retraining use the field [Retrain after (days)].",
		RetrainTip: "Enter number of days the model will be automatically retrained. If you need to disable model retraining, set the value to 0.",
		LowerMetricTip: "Enter lower limit beyond which the model is deemed unuseful.",
		TrainModelActionWrongConfigMessage: "Configuration error. Check values of system setting \u0022Cloud service API key\u0022 and filed [Service endpoint Url] in [ML problem type] lookup",
		PredictionSettingsStepCaption: "STEP 3. Set up prediction",
		PredictionSettingsStepTipCaption: "Visit our Academy to learn more about \u003Ca href=\u0022https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-12\/how-implement-custom-prediction-model\u0022\u003Eselect expression for prediction\u003C\/a\u003E",
		AddRootSchemaMenuItemCaption: "Object\u0027s columns",
		TrainingQueryFieldsGroupCaption: "Which columns does the predicted value depend on?",
		TrainingQueryFieldsGroupInfoButtonContent: "Creatio will determine the patterns between the values of these columns and the predicted value. These patterns will be used in prediction",
		TargetColumnGroupCaption: "What value should be predicted?",
		TargetColumnGroupInfoButtonContent: "Training dataset column that contains the predicted value (result)",
		FilterForTrainingGroupCaption: "Which records should be included in the training dataset?",
		PredictedResultColumnGroupCaption: "What column to use for saving prediction result?",
		PredictedResultColumnGroupInfoButtonContent: "Select column where to save the result",
		BatchPredictionSettingsGroupCaption: "Setting up background update of prediction results",
		TargetColumnGroup_Filters_Caption: "What records to be considered as successful?",
		TargetColumnGroupInfoButton_Filters_Content: "Filter which defines records with a successful scoring result in training dataset",
		NoData: "No data available",
		RootSchemaNotSet: "Object not selected",
		BatchPredictionStartMethodToggleEditCaption: "Perform background update of prediction results daily during the maintenance window",
		PredictionTabCaption: "Prediction",
		SavePageConfirmation: "All changes will be saved. Continue?",
		TrainModelButtonCaption_Finished: "Retrain model",
		TrainModelButtonCaption_InProgress: "Training",
		TrainModelButtonCaption_NotStarted: "Train model",
		TrainingStatusNotificationTitle: "Training finished",
		BatchPredictionFilterLabelCaption: "Update all records that match condition",
		AutomaticRetrainToggleEditCaption: "Update model automatically",
		AddRootSchemaLinkedColumnCaption: "Linked column",
		TopFeaturesCaption: "Top model parameters trained on {0}",
		NoTrainingData: "Train the model to get parameters weight information",
		MLServiceAcademyUrl: "https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-13\/machine-learning-service",
		CustomModelAcademyUrl: "https:\/\/academy.bpmonline.com\/documents\/technic-sdk\/7-13\/how-implement-custom-prediction-model",
		PredictiveAnalysisAcademyCaption: "Predictive analysis",
		ClassificationAcademyCaption: "How to create a lookup value prediction model",
		ScoringAcademyCaption: "How to add predictive score to records",
		RegressionAcademyCaption: "How to create a numeric value prediction model",
		BusinessProcessAcademyCaption: "How to use machine learning models",
		MLServiceAcademyCaption: "Machine learning service"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		FAQIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "FAQIcon",
				hash: "898f30139a1507ab891cddc467938206",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		ClearIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "ClearIcon",
				hash: "018bf133f90a321b1cae38a9d077cbca",
				resourceItemExtension: ".png"
			}
		},
		ClearIconHover: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "ClearIconHover",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		AddColumnMenuIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "AddColumnMenuIcon",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		MLIcon: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "MLIcon",
				hash: "4f57fdf4d632a5cf20224be92c743b28",
				resourceItemExtension: ".png"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "MLModelPage",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
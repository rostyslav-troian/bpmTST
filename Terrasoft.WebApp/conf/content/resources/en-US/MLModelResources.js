define("MLModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MLModelCaption: "ML model",
		IdCaption: "Id",
		CreatedOnCaption: "Created on",
		CreatedByCaption: "Created by",
		ModifiedOnCaption: "Modified on",
		ModifiedByCaption: "Modified by",
		ProcessListenersCaption: "Active processes",
		NameCaption: "Name",
		DescriptionCaption: "Description",
		TrainFrequencyCaption: "Retrain after, days",
		TrainedOnCaption: "When the model was trained",
		TriedToTrainOnCaption: "Last attempt to train date",
		MetaDataCaption: "Query metadata for selecting additional training data",
		MetaDataLczCaption: "Localizable part of metadata",
		TrainingSetQueryCaption: "Query for selecting additional training data",
		RootSchemaUIdCaption: "Object",
		StateCaption: "Status",
		InstanceMetricCaption: "Evaluation metric",
		MetricThresholdCaption: "Quality metric lower limit",
		PredictionEnabledCaption: "Prediction enabled",
		TrainSessionIdCaption: "Current training session",
		MLProblemTypeCaption: "Type",
		ModelInstanceUIdCaption: "Model instance Id",
		LastErrorCaption: "Last error message text",
		NotesCaption: "Notes",
		BatchPredictedOnCaption: "Batch prediction date",
		BatchPredictionQueryCaption: "Query for selecting additional prediction data",
		TargetColumnUIdCaption: "Outcome column",
		BatchPredictionStartMethodCaption: "Method of batch prediction start",
		TrainingMinimumRecordsCountCaption: "Minimum number of records for training",
		TrainingFilterDataCaption: "Training query filter",
		PredictedResultColumnUIdCaption: "Prediction result column",
		TrainingOutputFilterDataCaption: "Positive result condition in training dataset",
		BatchPredictionFilterDataCaption: "Batch prediction query filter"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
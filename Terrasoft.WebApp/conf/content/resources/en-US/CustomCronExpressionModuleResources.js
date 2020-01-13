define("CustomCronExpressionModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DefaultCronDescription: "Every day",
		InvalidCronPartsException: "Cron expression should starts with 0 * * characters",
		CronExpressionInfoButtonHint: "Please use \u0027Execution time\u0027 settings to set hours and minutes of Timer execution.",
		CronExpressionInfoTextPattern: "{0} \u003Ca href=\u0022http:\/\/www.quartz-scheduler.org\/documentation\/quartz-1.x\/tutorials\/crontrigger\u0022 target=\u0022_blank\u0022\u003E{1}\u003C\/a\u003E {2}."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
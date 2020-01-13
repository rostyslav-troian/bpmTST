define(["ext-base", "terrasoft"], function() {
	Terrasoft.TestStatus = {
		SUCCESS: 0,
		FAILURE: 1,
		SKIPPED: 2,
		INCONCLUSIVE: 3,
		NOT_STARTED: 4,
		STARTED: 5,
		FAILED_TO_START: 6
	};
});
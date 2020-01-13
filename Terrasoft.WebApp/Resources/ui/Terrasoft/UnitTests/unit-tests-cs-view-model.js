/* globals TestStatusLcz */
define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.UnitTestsCSViewModel", {
		extend: "Terrasoft.BaseViewModel",
		Ext: null,
		sandbox: null,
		Terrasoft: null,

		init: function() {
			Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.payload, this);
		},

		destroy: function() {
			Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.payload, this);
			this.callParent(arguments);
		},

		payload: function(scope, response) {
			var header = response.Header;
			if (header.Sender !== "UnitTest") {
				return;
			}
			var test;
			switch (header.BodyTypeName) {
				case "RunStarted":
					break;
				case "SuiteStarted":
				case "TestStarted":
					test = this.findTestById(response.Body.Payload);
					if (test) {
						test.set("Status", Terrasoft.TestStatus.STARTED);
						test.set("StatusCaption", this.getTestStatusCaption(Terrasoft.TestStatus.STARTED));
					}
					break;
				case "TestFinished":
				case "SuiteFinished":
					var testResult = response.Body.Payload;
					test = this.findTestById(testResult.Id);
					if (test) {
						test.set("Status", testResult.Status);
						test.set("StatusCaption", this.getTestStatusCaption(testResult.Status));
						test.set("Message", testResult.Message);
						test.set("StackTrace", testResult.StackTrace);
					}
					break;
				case "RunFinished":
					break;
			}
		},

		getAllTests: function() {
			return this.get("tests");
		},

		findTestById: function(id) {
			var allTests = this.getAllTests();
			var test = allTests.find(id);
			return test;
		},

		getTestsViewModelCollection: function(rawCollection) {
			var collection = {};
			var status = Terrasoft.TestStatus.NOT_STARTED;
			var statusCaption = this.getTestStatusCaption(status);
			rawCollection.forEach(function(item) {
				var itemId = item.Id;
				collection[itemId] = Ext.create("Terrasoft.TestViewModel", {
					values: {
						Id: itemId,
						Name: item.Name,
						Status: status,
						ParentId: item.ParentId,
						Message: "",
						StackTrace: "",
						StatusCaption: statusCaption
					}
				});
			});
			return collection;
		},

		changeAllTestsStatus: function(status) {
			var allTests = this.getAllTests();
			var statusCaption = this.getTestStatusCaption(status);
			allTests.each(function(test) {
				test.set("Status", status);
				test.set("StatusCaption", statusCaption);
			});
		},

		resetSelectedTest: function() {
			this.set("selectedTest", null);
			this.set("selectedTestName", "");
			this.set("selectedTestStatus", Terrasoft.TestStatus.NOT_STARTED);
			this.set("selectedTestMessage", "");
			this.set("selectedTestStackTrace", "");
		},

		onTestSelect: function(id) {
			var selectedTest = this.findTestById(id);
			if (selectedTest) {
				this.set("selectedTest", selectedTest);
				this.set("selectedTestName", selectedTest.get("Name"));
				this.set("selectedTestStatus", selectedTest.get("Status"));
				this.set("selectedTestMessage", selectedTest.get("Message"));
				this.set("selectedTestStackTrace", selectedTest.get("StackTrace"));
			}
		},

		onTestDoubleClick: function() {
			this.runSelectedTest();
		},

		runAllTests: function() {
			this.runTests();
		},

		runSelectedTest: function() {
			var selectedTest = this.get("selectedTest");
			if (selectedTest) {
				this.runTests([selectedTest.get("Id")]);
			}
		},

		loadAllTests: function() {
			var maskId = Terrasoft.Mask.show();
			this.resetSelectedTest();
			this.set("isTestsLoaded", false);
			var tests = this.getAllTests();
			tests.clear();
			Terrasoft.ServiceProvider.executeRequest("GetTests", {}, function(response) {
				if (response.success && response.Payload) {
					var preparedTestCollection = this.getTestsViewModelCollection(response.Payload);
					tests.loadAll(preparedTestCollection);
				}
				Terrasoft.Mask.hide(maskId);
				this.set("isTestsLoaded", true);
			}, this);
		},

		getTestStatusCaption: function(testStatus) {
			switch (testStatus) {
				case Terrasoft.TestStatus.SUCCESS:
					return TestStatusLcz.Success;
				case Terrasoft.TestStatus.FAILURE:
					return TestStatusLcz.Failure;
				case Terrasoft.TestStatus.SKIPPED:
					return TestStatusLcz.Skipped;
				case Terrasoft.TestStatus.INCONCLUSIVE:
					return TestStatusLcz.Inconclusive;
				case Terrasoft.TestStatus.NOT_STARTED:
					return TestStatusLcz.NotStarted;
				case Terrasoft.TestStatus.STARTED:
					return TestStatusLcz.Started;
				case Terrasoft.TestStatus.FAILED_TO_START:
					return TestStatusLcz.FailedToStart;
				default:
					return TestStatusLcz.Unknown;
			}
		},

		getTestStatusMarkerValue: function(testStatus) {
			switch (testStatus) {
				case Terrasoft.TestStatus.SUCCESS:
					return "success";
				case Terrasoft.TestStatus.FAILURE:
				case Terrasoft.TestStatus.FAILED_TO_START:
					return "failure";
				default:
					return "unknown";
			}
		},

		runTests: function(testIds) {
			var filter = {};
			if (testIds) {
				filter.TestIds = testIds;
			}
			this.resetSelectedTest();
			this.changeAllTestsStatus(Terrasoft.TestStatus.NOT_STARTED);
			Terrasoft.ServiceProvider.executeRequest("RunTests", filter, function(response) {
				if (!(response && response.success)) {
					this.changeAllTestsStatus(Terrasoft.TestStatus.FAILED_TO_START);
				}
			}, this);
		},

		isNotEmptyValue: function(value) {
			return !Ext.isEmpty(value);
		}

	});

	return Terrasoft.UnitTestsCSViewModel;
});


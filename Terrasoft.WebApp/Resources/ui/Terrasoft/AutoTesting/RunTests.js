/**
 * Run Tests
 * Usage: node RunTests.js {auto|manual} {ui|unit|all} {SiestaDir} {coverage|default|debug} [phantomjs params]
 **/
//globals process

var fs = require("fs");
var childProcess = require("child_process");
var phantomResultFile = "PhantomJSTestReport";

// Exit Codes
var resultsFileReadingError = 1;
var unknownError = 50;

// Params
var parameters = process.argv.slice(2);
var runType = parameters[0].toLowerCase();
var testMode = parameters[1].toLowerCase();
var siestaDir = parameters[2];
var coverageMode = parameters[getStandartParametersNumber(parameters)];
var phantomDebugMode = (coverageMode === "debug");
coverageMode = phantomDebugMode ? "default" : coverageMode;

var coverageModeEnabled = coverageMode === "coverage";
var isRunWithNoResult = parameters[0] === "auto-noresult";
var isOnlyResultNoRun = parameters[0] === "only-result";

function escapeStr(str) {
	if (!str) {
		return null;
	}
	var result = str.replace(/([\'\[\]\|])/g, "|$1");
	result = result.replace(/\n/g, "|n");
	result = result.replace(/\r/g, "|r");
	return result;
}

function formatStr(str, params) {
	var formatted = str;
	for (var i = 0; i < params.length; i++) {
		formatted = formatted.replace("{" + i + "}", escapeStr(params[i]));
	}
	return formatted;
}

function getStandartParametersNumber(parameters) {
	var standartParameters = 3;
	var paramsCount = parameters.length;
	if (paramsCount > 3 && parameters[3].indexOf("http://") === 0) {
		standartParameters = 4;
	}
	return standartParameters;
}

function generateShellParameters(parameters) {
	var standartParameters = getStandartParametersNumber(parameters);
	var shellParameters = " ";
	var paramsCount = parameters.length;
	if (paramsCount > standartParameters) {
		for (var i = standartParameters; i < paramsCount; i++) {
			shellParameters += parameters[i] + " ";
		}
	}
	return shellParameters;
}

function generateUrl(parameters) {
	var testPage = "";
	var testPageName = coverageMode === "coverage" ? "Tests.coverage.html" : "Tests.html";
	if (getStandartParametersNumber(parameters) === 4) {
		testPage = parameters[3];
	} else {
		var testServerPortAndSubDir = "";
		if ((runType === "auto") || isRunWithNoResult) {
			testServerPortAndSubDir = ":8081/780";
		} else {
			testServerPortAndSubDir = ":8080";
		}
		testPage = "http://localhost" + testServerPortAndSubDir + "/Terrasoft/" + testPageName;
	}
	return testPage;
}

function prepareParameters(parameters) {
	var testPage = generateUrl(parameters);
	var shell = generateShellParameters(parameters);
	var executableFileName = siestaDir + (phantomDebugMode === true ? "puppeteer.bat " : "puppeteer.bat ");
	return {
		testPage: testPage,
		shellParameters: shell,
		executableFileName: executableFileName
	};
}

var preparedParameters = prepareParameters(parameters);
var testPage = preparedParameters.testPage;
var shellParameters = preparedParameters.shellParameters;
var executableFileName = preparedParameters.executableFileName;

function executeShellCommand(commandText, showConsoleResults) {
	if (showConsoleResults) {
		childProcess.execSync(commandText, {stdio: [0, 1, 2]});
	} else {
		childProcess.execSync(commandText);
	}
}

function processTestAssertion(assertions, testSuitName) {
	var assertionLength = assertions && assertions.length;
	for (var i = 0; i < assertionLength; i++) {
		var assert = assertions[i];
		var assertType = assert.type;
		var testName;
		switch (assertType) {
			case "Siesta.Result.Diagnostic":
			case "Siesta.Result.DiagnosticV2":
				if (assert.isSpecForBDD === true) {
					saveBDDConverted(testSuitName, assert.description);
				}
				break;
			case "Siesta.Result.SubTest":
				testName = escapeStr(assert.name) || "NO_TEST_NAME";
				var duration = assert.endDate - assert.startDate;
				processTestAssertion(assert.assertions, testName);
				break;
			case "Siesta.Result.Assertion":
				testName = escapeStr(assert.description) || "NO_TEST_NAME";
				break;
			default:
				console.log("Unknown assert type: " + assertType);
				break;
		}
	}
}
function parseResultFile(fileName) {
	var content = fs.readFileSync(fileName);
	if (!content) {
		process.exit(resultsFileReadingError);
	}
	var resultObj = JSON.parse(content);
	resultObj.testCases.forEach(function(testCase) {
		var testNameParts = testCase.url.split("/");
		var testName = escapeStr(testNameParts[testNameParts.length - 1]);
		var duration = testCase.endDate - testCase.startDate;
		processTestAssertion(testCase.assertions, testName);
	});
	saveConvertedToFS();
}

function getConfigFileName() {
	var resultDir = __dirname;
	var coverageFileSuffix = coverageModeEnabled ? "-coverage" : "";
	switch (testMode) {
		case "unit":
			return resultDir + "\\core-unit" + coverageFileSuffix + ".json";
		case "ui":
			return resultDir + "\\core-ui" + coverageFileSuffix + ".json";
		case "all":
			return resultDir + "\\core-all" + coverageFileSuffix + ".json";
		default:
			return "";
	}
}

var BDDConverted = {};

function saveBDDConverted(suiteName, content) {
	BDDConverted[suiteName] = content;
}
function saveConvertedToFS() {
	for (var suiteName in BDDConverted) {
		if (BDDConverted.hasOwnProperty(suiteName)) {
			var content = BDDConverted[suiteName];
			var filePath = getBDDSuiteFileName(suiteName);
			fs.writeFileSync(filePath, content);
		}
	}
}
function getBDDSuiteFileName(suiteName) {
	var resultDir = __dirname + "\\BDDConverted\\";
	if (!fs.existsSync(resultDir)) {
		fs.mkdirSync(resultDir);
	}
	return resultDir + suiteName;
}

function getReportFileName() {
	var resultDirectory = __dirname;
	return resultDirectory + "\\" + phantomResultFile + ".json";
}
function getConfigFileShellParam() {
	var configFileName = getConfigFileName();
	var configFileShellParam = (configFileName === "") ? "" : " --config-file " + configFileName;
	return configFileShellParam;
}
function getReportShellParam() {
	var reportFileName = getReportFileName();
	var report = " --report-format JSON --report-file " + reportFileName;
	return report;
}
function getCoverageShellParam() {
	var resultDirectory = __dirname;
	var codeCoverageShellParam = coverageModeEnabled ? " --coverage-report-format html+lcov+raw --coverage-report-dir "
			+ resultDirectory + "\\CoverageReport\\" : "";
	return codeCoverageShellParam;
}

function getExecutionCommandText() {
	var configFile = getConfigFileShellParam();
	var report = getReportShellParam();
	var codeCoverage = getCoverageShellParam();
	var commandText = executableFileName + testPage + configFile + report + codeCoverage + shellParameters;
	if (runType === "auto") {
		console.log("Command text: " + commandText);
	}
	return commandText;
}

function runAutoTests() {
	var commandText = getExecutionCommandText();
	var exitCode = 0;
	try {
		executeShellCommand(commandText, true);
	} catch (e) {
		console.log("Error running command: " + commandText + "\n Error: " + e.message);
		exitCode = e.status;
	}
	var reportFileName = getReportFileName();
	if (!fs.existsSync(reportFileName)) {
		return resultsFileReadingError;
	}
	parseResultFile(reportFileName);
	return exitCode;
}

function runManualTests() {
	var commandText = getExecutionCommandText();
	var exitCode = 0;
	try {
		executeShellCommand(commandText, true);
	} catch (e) {
		console.log("Error running command: " + commandText + "\n Error: " + e.message);
		exitCode = e.status;
	}
	var reportFileName = getReportFileName();
	if (!fs.existsSync(reportFileName)) {
		return resultsFileReadingError;
	}
	parseResultFile(reportFileName);
	return exitCode;
}

function runTests() {
	var exitCode = 0;
	if ((runType === "auto") || isRunWithNoResult) {
		var startTime = new Date();
		console.log(startTime + " Running: auto mode");
		exitCode = runAutoTests();
	} else {
		exitCode = runManualTests();
	}
	return exitCode;
}
if (isOnlyResultNoRun === true) {
	var reportFileName = getReportFileName();
	if (!fs.existsSync(reportFileName)) {
		console.log(formatStr("##teamcity[message text='Report file not found at path: {0}' status='WARNING']",
				reportFileName));
		process.exit(resultsFileReadingError);
	}
	parseResultFile(reportFileName);
	process.exit(0);
} else {
	runTests();
}

/* jscs:enable */
/* jshint ignore:end */

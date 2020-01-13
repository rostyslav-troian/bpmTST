/**
 * Run Tests
 * Usage: node RunConfigurationTests.js {auto|manual|auto-noresult|only-result} {all} {SiestaDir}
 {coverage|default} {branch} {AppUrl} {PackageNames} {Conf folder URL}
 * [phantomjs params]
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
var isAutoRun = parameters[0].toLowerCase() === "auto";
var testMode = parameters[1].toLowerCase();
var siestaDir = parameters[2];
var coverageMode = parameters[3];
var branch = parameters[4];
var platform = process.platform

if (branch.indexOf("/7.11.") > 0) {
	siestaDir = "\\\\tsbuild-app\\Siesta\\4\\bin\\";
	parameters.splice(4, 1);
} else {
	parameters.splice(4, 1);
}
if (coverageMode !== "coverage" && coverageMode !== "default") {
	console.log("Require parameter CoverageMode is not set or set's not correctly");
	process.exit(unknownError);
}
var appUrl = parameters[4];
if (appUrl && appUrl.indexOf("http://") === -1) {
	console.log("Require parameter AppUrl is not set or set's not correctly");
	process.exit(unknownError);
}
var packageNames = parameters[5];
var isFilterByPackage = (packageNames && packageNames.indexOf("--filter") === -1) && coverageMode === "coverage";
var isRunWithNoResult = parameters[0] === "auto-noresult";
var isOnlyResultNoRun = parameters[0] === "only-result";
var coverageModeEnabled = coverageMode === "coverage";

var escapeStr = function(str) {
	if (!str) {
		return null;
	}
	var result = str.replace(/([\'\[\]\|])/g, "|$1");
	result = result.replace(/\n/g, "|n");
	result = result.replace(/\r/g, "|r");
	return result;
};
var formatStr = function(str) {
	var formatRe = /\{(\d+)\}/g;
	var args = [];
	if (arguments && arguments.length) {
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
	}
	return str.replace(formatRe, function(m, i) {
		return args[i];
	});
};
var getStandartParametersNumber = function(parameters) {
	var standartParameters = 6;
	var paramsCount = parameters.length;
	if (paramsCount > 4 && !isFilterByPackage) {
		standartParameters = 5;
	}
	return standartParameters;
};

var generateShellParameters = function(parameters) {
	var standartParameters = getStandartParametersNumber(parameters);
	var shellParameters = " ";
	var paramsCount = parameters.length;
	if (paramsCount > standartParameters) {
		for (var i = standartParameters; i < paramsCount; i++) {
			shellParameters += parameters[i] + " ";
		}
	}
	return shellParameters;
};

var generateUrl = function() {
	var testPage = "";
	var coverageSuffix = coverageModeEnabled ? "?harnessMode=coverage&schemaCoverageMode=byFile" : "";
	var testPageName = "Tests.html";
	if (appUrl) {
		testPage = appUrl + coverageSuffix;
	} else {
		var testServerPortAndSubDir = "";
		if (isAutoRun || isRunWithNoResult) {
			testServerPortAndSubDir = ":8081/780";
		} else {
			testServerPortAndSubDir = ":8080";
		}
		testPage = "http://localhost" + testServerPortAndSubDir + "/Terrasoft/" + testPageName;
	}
	return testPage;
};

var prepareParameters = function(parameters) {
	var pageUrl = generateUrl();
	var shell = generateShellParameters(parameters);
	var fileName = "";
	console.log(branch)
	if (branch.indexOf("/7.11.") >= 0) {
		fileName = "\"" + siestaDir + "phantomjs.bat" + "\" ";
	} else {
		fileName = "\"" + siestaDir + "puppeteer.bat" + "\" ";
	}
	if (platform == "linux"){
		fileName = "\"" + siestaDir + "puppeteer" + "\" ";
	}
	return {
		testPage: pageUrl,
		shellParameters: shell,
		executableFileName: fileName
	};
};

var preparedParameters = prepareParameters(parameters);
var testPage = preparedParameters.testPage;
var shellParameters = preparedParameters.shellParameters;
var executableFileName = preparedParameters.executableFileName;

var executeShellCommand = function(commandText, showConsoleResults) {
	if (showConsoleResults) {
		childProcess.execSync(commandText, {stdio: [0, 1, 2]});
	} else {
		childProcess.execSync(commandText);
	}
};

var processTestAssertion = function(assertions, testSuitName) {
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
};

var parseResultFile = function(fileName) {
	var content = fs.readFileSync(fileName);
	if (!content) {
		process.exit(resultsFileReadingError);
	}
	try {
		var resultObj = JSON.parse(content);
		resultObj.testCases.forEach(function(testCase) {
			var testNameParts = testCase.url.split("/");
			var testName = escapeStr(testNameParts[testNameParts.length - 1]);
			var duration = testCase.endDate - testCase.startDate;
			processTestAssertion(testCase.assertions, testName);
		});
		saveConvertedToFS();
	} catch (e) {
		console.log("Error while parsing result: " + e);
	}
};

function getConfigFileName() {
	var resultDir = __dirname;
	var fileName = "";
	var coverageFileSuffix = coverageModeEnabled ? "-coverage" : "";

	if (!testMode){
		return "";
	}

	fileName = resultDir + "\\core-" + testMode +coverageFileSuffix + ".json";

	if (platform == 'linux'){
		fileName = resultDir + "/core-" + testMode +coverageFileSuffix + ".json";
	}

	return fileName;
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
	var report = ""
	var resultDirectory = __dirname;
	report = resultDirectory + "\\" + phantomResultFile + ".json";
	if (platform == "linux"){
		report = resultDirectory + "/" + phantomResultFile + ".json";
	}
	return report;
}

function getConfigFileShellParam() {
	var configFileName = getConfigFileName();
	var configFileShellParam = (configFileName === "") ? "" : " --config-file " + configFileName;
	return configFileShellParam;
}

function getReportShellParam() {
	var reportFile = getReportFileName();
	var report = " --report-format JSON --report-file " + reportFile;
	return report;
}

function getCoverageFilterSuffix() {
	var filterSuffix = "";
	if (coverageModeEnabled && isFilterByPackage) {
		filterSuffix = "--filter \"{0}\"";
		var filters = packageNames && packageNames.split(",") || [];
		var pattern = "_{0}_Tests";
		var result = [];
		filters.forEach(function(item) {
			result.push(formatStr(pattern, item));
		}, this);
		result = result.join("|");
		filterSuffix = formatStr(filterSuffix, result);
	}
	return filterSuffix;
}

function getCoverageShellParam() {
	var codeCoverageShellParam = "";
	if (!coverageModeEnabled) {
		return codeCoverageShellParam;
	}
	var resultDirectory = __dirname;
	var coverageStr = " --coverage-report-format html+raw+lcov --coverage-report-dir {0}\\CoverageReport\\ {1}";
	var filterSuffix = getCoverageFilterSuffix();
	codeCoverageShellParam = formatStr(coverageStr, resultDirectory, filterSuffix);
	if (isFilterByPackage) {
		var shellFiltersIndex = shellParameters.indexOf("--filter");
		if (shellFiltersIndex > -1) {
			shellParameters = shellParameters.replace(/(--filter)(.([^\s]|([\s][^-]))+)/g, "");
		}
	}
	return codeCoverageShellParam;
}

function getExecutionCommandText() {
	var configFile = getConfigFileShellParam();
	var report = getReportShellParam();
	var codeCoverage = getCoverageShellParam();
	var commandText = executableFileName + "\"" + testPage + "\"" + configFile + report + codeCoverage +
			shellParameters;
	return commandText;
}

function runAutoTests() {
	var commandText = getExecutionCommandText();
	var exitCode = 0;
	try {
		console.log(commandText);
		executeShellCommand(commandText, true);
	} catch (e) {
		exitCode = e.status;
		console.log("Error message: ", e.message);
	}

	var reportFileName = getReportFileName();
	if (!fs.existsSync(reportFileName)) {
		return resultsFileReadingError;
	}
	parseResultFile(reportFileName);
	if (exitCode === 7) {
		console.log("exit code is " + exitCode);
		exitCode = 0;
	}
	return exitCode;
}

function runManualTests() {
	var commandText = getExecutionCommandText();
	var exitCode = 0;
	try {
		console.log("Command text: " + commandText);
		console.time("testsExecution");
		executeShellCommand(commandText, true);
		console.timeEnd("testsExecution");
	} catch (e) {
		console.log("Error running command: " + commandText + "\n Error: " + e.message);
		exitCode = e.status;
	}
	var reportFile = getReportFileName();
	if (!fs.existsSync(reportFile)) {
		return resultsFileReadingError;
	}
	parseResultFile(reportFile);
	return exitCode;
}

var runTests = function() {
	if (isAutoRun || isRunWithNoResult) {
		var startTime = new Date();
		console.log(startTime + ": Running: auto mode");
		var exitCode = runAutoTests();
		if (exitCode !== null) {
			process.exit(exitCode);
		}
	} else {
		runManualTests();
	}
};

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

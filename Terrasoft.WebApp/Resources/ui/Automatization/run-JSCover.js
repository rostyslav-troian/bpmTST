/* global console:false */
/* global __dirname:false */
/* global process:false */

/*
 * NodeJs JSCover launcher
 *
 * Usage: node run-JSCover.js -testRunner=[selenium|phantom] {-auto} {-verbose} {params}
 *
 * Exit codes:
 * 0 - ok
 * 1 - clean directory error
 * 2 - JSCover process files error
 * 3 - phantomJs error
 * 4 - merge reports error
 * 5 - generate report error
 * 6 - null or empty argument error
 * 7 - not supported error
 * 8 - build HtmlCoverageReport Error
 * 500 - unknown error
 */

/**
  * Code of program completions.
  */
var exitCodes = {
	ok: {
		code: 0
	},
	cleanDirectoryError: {
		code: 1,
		message: "clean directory error"
	},
	jsCoverProcessFilesError: {
		code: 2,
		message: "JSCover process files error"
	},
	phantomJsError: {
		code: 3,
		message: "phantomJs error"
	},
	mergeReportsError: {
		code: 4,
		message: "merge reports error"
	},
	generateReportError: {
		code: 5,
		message: "generate report error"
	},
	nullOrEmptyArgumentError: {
		code: 6,
		message: "null or empty argument {0}"
	},
	notSupportedError: {
		code: 7,
		message: "argument or function not supported: {0}"
	},
	buildHtmlCoverageReportError: {
		code: 8,
		message: "build HtmlCoverageReport Error"
	},
	unknownError: {
		code: 500,
		message: "unknown error"
	}
};

var fs = require("fs");
var pathModule = require("path");
var phantomLauncher = require("./siesta-phantom-launcher");
var jsCoverLauncher = require("./jscover-fs-launcher");
var reportBuilder = require("./report-builder");
var stringUtils = require("./string-utils");
var fsUtils = require("./fs-utils");

var sourcePath = pathModule.dirname(__dirname);

/**
  * Terminates execution with the passed code. If the error code is not transmitted, the program terminates with code 500.
  * @param {Object} exitCode Exit code.
  * @param {Object} [messageParams] Exit message parameters.
  */
function exit(exitCode, messageParams) {
	var unknownError = exitCodes.unknownError;
	var returnCode = exitCode || unknownError;
	if (returnCode.message) {
		console.log(stringUtils.formatString(returnCode.message, messageParams));
		console.log("exit with code " + returnCode.code);
	}
	var errorCode = returnCode.code || unknownError.code;
	process.exit(errorCode);
}

var args = process.argv;
var verbose = (args.indexOf("-verbose") > -1);
var continueOnError = (args.indexOf("-continueOnError") > -1);
var executeType = (args.indexOf("-auto") > -1) ? "auto" : "manual";
var argumentsString = args.join(" ");
var testRunnerReg = /-testrunner\s*=\s*\b(phantom|selenium)\b/gi;
var testRunnerResult = testRunnerReg.exec(argumentsString);
if (testRunnerResult == null) {
	exit(exitCodes.nullOrEmptyArgumentError, ["-testRunner"]);
}
var testRunner = testRunnerResult[1];
if (testRunner === "selenium") {
	exit(exitCodes.notSupportedError, ["Selenium TestRunner"]);
}

var siestaPath = ".\\Resources\\Terrasoft\\Siesta\\bin\\";
var jsCoverPath = pathModule.join(sourcePath, "JSCover\\JSCover-all.jar");
var jsCoverReportPath = pathModule.join(sourcePath, "JSCover\\Reports");
var coverageHtmlReportTemplatePath = pathModule.join(sourcePath, "JSCover", "reportTemplate.html");
var htmlReportFileName = "index.html";
var htmlReportArchiveName = "coverage.zip";
var htmlReportArchivePath = pathModule.join(jsCoverReportPath, htmlReportArchiveName);
var jsCoverReportName = "nui-coverage-report.json";
var processedFilesPath = pathModule.join(sourcePath, "..\\JSCover");
var testingUrlPort = (testRunner === "phantom") ? "8081" : "8082";
var testingUrlPath = (executeType === "auto") ? "/Coverage" : "";
var testingURL = stringUtils.formatString("http://localhost:{port}{path}/JSCover/Terrasoft/Tests.html", {
	port: testingUrlPort,
	path: testingUrlPath
});

var teamCityPublishArtifactMessageTemplate = "##teamcity[publishArtifacts \'{path}\']";
var teamCityBuildStatisticsMessageTemplate = "##teamcity[buildStatisticValue key=\'{keyType}\' value=\'{keyValue}\']";
var teamCityTestSuiteStartMessageTemplate = "##teamcity[testSuiteStarted name=\'{0}\']";
var teamCityTestStartMessageTemplate = "##teamcity[testStarted name=\'{0}\']";
var teamCityTestFailMessageTemplate = "##teamcity[testFailed name=\'{0}\' message=\'{1}\']";
var teamCityTestFinishMessageTemplate = "##teamcity[testFinished name=\'{0}\']";
var teamCityTestSuiteFinishMessageTemplate = "##teamcity[testSuiteFinished name=\'{0}\']";
var testFailMessageTemplate = "Code coverage {0} less than {1}";
var coverageLimitValue = 0.9;

/**
  * The method prints messages to the standard output stream if the -verbose option is enabled
  * @param {String} message Message.
  */
function logMessage(message) {
	if (verbose) {
		console.log(message);
	}
}

/**
  * The method prints the service messages of TeamCity if the -auto option is enabled.
  * @param {String} message Message.
  */
function writeTeamCityMessage(message) {
	if (executeType === "auto") {
		console.log(message);
	}
}

try {
	logMessage("clean processed files directory");
	fsUtils.cleanDir(processedFilesPath);
	logMessage("clean reports directory");
	fsUtils.cleanDir(jsCoverReportPath);
} catch (e) {
	logMessage("Error: " + e.message);
	exit(exitCodes.jsCoverProcessFilesError);
}

function writeStatistic(statisticKey, value) {
	writeTeamCityMessage(stringUtils.formatString(teamCityBuildStatisticsMessageTemplate, {
		keyType: statisticKey,
		keyValue: value
	}));
}

function convertToPercent(value) {
	if (typeof value !== "number") {
		return value;
	}
	return value * 100;
}

function writeStatisticData(statisticData) {
	var branchRate = convertToPercent(statisticData.branchData.rate);
	writeStatistic("CodeCoverageB", branchRate);
	writeStatistic("CodeCoverageAbsMTotal", statisticData.functionData.count);
	writeStatistic("CodeCoverageAbsMCovered", statisticData.functionData.hits);
	var functionRate = convertToPercent(statisticData.functionData.rate);
	writeStatistic("CodeCoverageM", functionRate);
	writeStatistic("CodeCoverageAbsLTotal", statisticData.lineData.count);
	writeStatistic("CodeCoverageAbsLCovered", statisticData.lineData.hits);
	var lineRate = convertToPercent(statisticData.lineData.rate);
	writeStatistic("CodeCoverageL", lineRate);
}

function onHtmlReportBuild(error) {
	if (error != null) {
		exit(exitCodes.buildHtmlCoverageReportError);
	}
	writeTeamCityMessage(stringUtils.formatString(teamCityPublishArtifactMessageTemplate, {
		path: htmlReportArchivePath
	}));
}

function processCoverageRates(testName, coverageData) {
	writeTeamCityMessage(stringUtils.formatString(teamCityTestStartMessageTemplate, [testName]));
	var coverageValue = coverageData.rate;
	if (coverageValue <= coverageLimitValue) {
		writeTeamCityMessage(stringUtils.formatString(teamCityTestFailMessageTemplate, [
			testName,
			stringUtils.formatString(testFailMessageTemplate, [coverageValue.toFixed(2), coverageLimitValue])
		]));
	}
	writeTeamCityMessage(stringUtils.formatString(teamCityTestFinishMessageTemplate, [testName]));
}

function processCoverageData(testSuitName, coverageSuitData) {
	writeTeamCityMessage(stringUtils.formatString(teamCityTestSuiteStartMessageTemplate, [testSuitName]));
	for (var testName in coverageSuitData) {
		if (!coverageSuitData.hasOwnProperty(testName)) {
			continue;
		}
		var coverageData = coverageSuitData[testName];
		processCoverageRates(testName, coverageData);
	}
	writeTeamCityMessage(stringUtils.formatString(teamCityTestSuiteFinishMessageTemplate, [testSuitName]));
}

function onJSCoverReportBuild(error, report) {
	if (error != null) {
		exit(exitCodes.generateReportError);
	}
	try {
		logMessage("clean processed files directory");
		fsUtils.cleanDir(processedFilesPath);
		logMessage("clean reports directory");
		fsUtils.cleanDir(jsCoverReportPath, {
			exceptPaths: [jsCoverReportName]
		});
	} catch (e) {
		logMessage("Error: " + e.message);
		exit(exitCodes.cleanDirectoryError);
	}
	var totalData = report.total;
	processCoverageData("Total", totalData);
	var filesReports = report.files;
	for (var fileName in filesReports) {
		if (!filesReports.hasOwnProperty(fileName)) {
			continue;
		}
		var fileReport = filesReports[fileName];
		processCoverageData(fileName, fileReport);
	}
	writeStatisticData(totalData);
	reportBuilder.buildHtmlReport({
		coverageData: report,
		coverageLimitValue: coverageLimitValue,
		htmlReportTemplatePath: coverageHtmlReportTemplatePath,
		htmlReportFileName: htmlReportFileName,
		htmlReportArchivePath: htmlReportArchivePath,
		verbose: verbose
	}, onHtmlReportBuild);
}

function generateReport() {
	var sourceFilePath = pathModule.join(jsCoverReportPath, "jscoverage.json");
	var destinationFilePath = pathModule.join(jsCoverReportPath, jsCoverReportName);
	reportBuilder.buildJSCoverReport({
		sourceFilePath: sourceFilePath,
		verbose: verbose,
		destinationFilePath: destinationFilePath,
		exclude: [
			"/Terrasoft/Terrasoft.tests.class.js"
		]
	}, onJSCoverReportBuild);
}

function onReportsMerged(error) {
	if (error != null) {
		if (continueOnError) {
			generateReport();
		} else {
			exit(exitCodes.mergeReportsError);
		}
	}
	generateReport();
}

function mergeReports() {
	logMessage("Prepare merging");
	var reportsPaths = [];
	/**
   * JSCover for merging reports requires that the program source folder is located in the report folder.
   */
	try {
		var reportDirs = fs.readdirSync(jsCoverReportPath);
		var originalSourcesDir = pathModule.join(processedFilesPath, "original-src");
		for (var i = 0, length = reportDirs.length; i < length; i++) {
			try {
				var reportPath = pathModule.join(jsCoverReportPath, reportDirs[i]);
				reportsPaths.push(reportPath);
				var reportSourcesDir = pathModule.join(reportPath, "original-src");
				fsUtils.copyDir(originalSourcesDir, reportSourcesDir);
			} catch (e) {
				logMessage("Error on preparing merging: " + e.message);
				continue;
			}
		}
	} catch (e) {
		logMessage("Error: " + e.message);
		exit(exitCodes.mergeReportsError);
	}
	jsCoverLauncher.mergeReports({
		jsCoverPath: jsCoverPath,
		reportsPaths: reportsPaths,
		verbose: verbose,
		destinationPath: jsCoverReportPath
	}, onReportsMerged);
}

function onPhantomjsExecuted(error, stdout, stderr) {
	if (error != null) {
		logMessage(error);
		if (continueOnError) {
			mergeReports();
		} else {
			logMessage(stdout);
			exit(exitCodes.phantomJsError);
		}
	}
	mergeReports();
}

function onJsCoverExecuted(error) {
	if (error != null) {
		exit(exitCodes.cleanDirectoryError);
	}
	phantomLauncher.launch({
		siestaPath: siestaPath,
		verbose: verbose,
		params: [
			testingURL,
			{
				"--jscover-reportpath": stringUtils.escapePath(jsCoverReportPath)
			},
			"--pause 0",
			"--noconsole"
		],
		continueOnError: continueOnError
	}, onPhantomjsExecuted);
}

jsCoverLauncher.processFiles({
	jsCoverPath: jsCoverPath,
	sourcePath: sourcePath,
	destinationPath: processedFilesPath,
	verbose: verbose,
	excludePaths: [
		"Automatization",
		"AutoTesting",
		"configuration",
		"JSCover",
		"combined",
		"demo",
		"Doc",
		"Docs"
	],
	noInstrumentPaths: [
		"/Terrasoft/amd/core-modules-object.js",
		"/Terrasoft/AutoTesting",
		"/Terrasoft/configuration",
		"/Terrasoft/tests.js",
		"/Terrasoft/loc/core-resources.js",
		"/Terrasoft/core/enums/sysenums.js",
		"/Terrasoft/data/constants/data-constants.js",
		"/Terrasoft/amd/tests/mockups/testDefinedModule.js",
		"/Terrasoft/amd/tests/mockups/testAsyncModule.js",
		"/Terrasoft/amd/tests/mockups/testModule.js",
		"/Terrasoft/integration/telephony/telephony-enums.js",
		"/Terrasoft/integration/telephony/callway/callway-enums.js",
		"/Terrasoft/integration/telephony/oktell/oktell-enums.js",
		"/Terrasoft/integration/telephony/finesse/finesse-enums.js",
		"/Terrasoft/Siesta/",
		{
			reg: ".*\\.tests\\.js$"
		}
	]
}, onJsCoverExecuted);

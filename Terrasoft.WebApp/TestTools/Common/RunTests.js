/**************************************************
*
* Run Tests
*
* Usage: cscript RunTests.js [phantomjs params]
*
**************************************************/

// Params
var parameters = WScript.Arguments;
// Consts
var toolsDir = parameters.Item(0) + '\\';
var commonDir = toolsDir + 'Common\\';
var testPage = parameters.Item(1);

var phantomResultFile = 'PhantomJSTestReport';
var availableBrowsers = ['chrome', 'firefox', 'ie', 'safari'];
var minRunTime = 120000; // ms; Minimum time to run tests. We use this to determine if a driver has hung.

// Exit Codes
var okExitCode = 0;
var resultsFileReadingError = 1;
var reportFileWritingError = 2;
var unknownError = 50;

var reportEncoding = 'utf-8';

var executableFileName = '"' + commonDir + "phantomjs.bat" + '" ';

var shellParameters = ' ';
var paramsCount = parameters.Count();
	for (var i = 0; i < paramsCount; i++) {
		shellParameters += parameters.Item(i) + ' ';
}

function runTests() {
	var resultDirectory = WScript.ScriptFullName.substr(0, WScript.ScriptFullName.length - WScript.ScriptName.length);
	var reportFileName = toolsDir + phantomResultFile + '.json';
	var commandText = executableFileName + testPage + ' --report-format JSON --report-file ' + reportFileName
		+ shellParameters;
	executeShellCommand(commandText, true);
	parseResultFile(reportFileName);
	}

function executeShellCommand(commandText, showConsoleResults) {
	var objShell = new ActiveXObject("WScript.Shell");
	if (!showConsoleResults) {
		objShell.Run(commandText, 0, true);
	} else {
		var handle = objShell.Exec(commandText);
		while (!handle.StdOut.AtEndOfStream) {
			var line = handle.StdOut.ReadLine();
			writeLine(line);
		}
	}
}

function exitWithExitCode(code) {
	WScript.Quit(code);
}

function parseResultFile(fileName) {
	var content = readFile(fileName, reportEncoding);
	if (!content) {
		exitWithExitCode(resultsFileReadingError);
	}
	var resultObj = eval('(function() { return ' + content + ' })()');
	for (var i in resultObj.testCases) {
		var testFile = resultObj.testCases[i];
		var testNameParts = testFile.url.split('/');
		var testName = escapeStr(testNameParts[testNameParts.length - 1]);
		writeLine(formatStr("##teamcity[testSuiteStarted name='{0}']", [testName]));
		processTestAssertion(testFile.assertions, testName);
		writeLine(formatStr("##teamcity[testSuiteFinished name='{0}']", [testName]));
	}
}

function processTestAssertion(assertions, testSuitName) {
	var assertionLength = assertions.length;
	for (var i = 0; i < assertionLength; i++) {
		var assert = assertions[i];
		var assertType = assert.type;
		var testName;
		switch (assertType) {
			case 'Siesta.Result.Diagnostic':
				continue;
			case 'Siesta.Result.SubTest':
				testName = escapeStr(assert.name);
				writeLine(formatStr("##teamcity[testSuiteStarted name='{0}.{1}']", [testSuitName, testName]));
				processTestAssertion(assert.assertions, testName);
				writeLine(formatStr("##teamcity[testSuiteFinished name='{0}.{1}']", [testSuitName, testName]));
				break;
			case 'Siesta.Result.Assertion':
				testName = escapeStr(assert.description);
				if (assert.isTodo) {
					writeLine(formatStr("##teamcity[testIgnored name='{0}' message='{1}']",
						[testName, 'TODO: ' + testName]));
				} else {
					writeLine(formatStr("##teamcity[testStarted name='{0}']", [testName]));
					if (!assert.passed) {
						writeLine(formatStr("##teamcity[testFailed name='{0}' message='{1}' details='{2}']",
							[testName, testName, escapeStr(assert.annotation)]));
					}
					writeLine(formatStr("##teamcity[testFinished name='{0}']", [testName]));
				}
				break;
			default:
				writeLine('Unknown assert type: ' + assertType);
				exitWithExitCode(resultsFileReadingError);
		}
	}
}

function readFile(fileName, encoding) {
	encoding = encoding || 'utf-8';
	try {
		var stream = new ActiveXObject('ADODB.Stream');
		stream.Type = 2;
		stream.Mode = 3;
		stream.Charset = encoding;
		stream.Open();
		stream.Position = 0;
		stream.LoadFromFile(fileName);
		var content = stream.ReadText();
		stream.Close();
		return content;
	} catch (e) {
		exitWithExitCode(resultsFileReadingError);
	}
}

function killHungBrowsersAndDrivers() {
	var psCmd = 'PowerShell -NoProfile -NonInteractive -file ".\\Utils\\KillBrowsers.ps1"';
	var objShell = new ActiveXObject("WScript.Shell");
	objShell.Run(psCmd, 0, true);
}

function writeLine(line) {
	WScript.StdOut.WriteLine(line);
}

function formatStr(str, params) {
	var formatted = str;
	for (i in params) {
		formatted = formatted.replace('{' + i + '}', escapeStr(params[i]));
	}
	return formatted;
}

function escapeStr(str) {
	var result = str.replace(/([\'\[\]\|])/g, '|$1');
	result = result.replace(/\n/g, '|n');
	result = result.replace(/\r/g, '|r');
	return result;
}

runTests();
exitWithExitCode(okExitCode);
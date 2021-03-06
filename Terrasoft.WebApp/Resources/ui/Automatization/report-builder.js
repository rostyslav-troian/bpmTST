var fs = require("fs");
var stringUtils = require("./string-utils");
var AdmZip = require("adm-zip");

/**
   * The function extracts data of the coverage of code blocks from the common result data object of the coverage.
   * @param {Object} reportData object with code coverage data
   * @returns {{count: number, hits: number, rate: number}}
   */
function getJSCoverBranchData(reportData) {
    var branchData = reportData.branchData;
    if (!branchData) {
        return {
            count: 0,
            hits: 0,
            rate: 0
        };
    }
    var branchCount = 0;
    var branchHits = 0;
    for (var lineNumber in branchData) {
        if (!branchData.hasOwnProperty(lineNumber)) {
            continue;
        }
        var branches = branchData[lineNumber];
        for (var i = 0, length = branches.length; i < length; i++) {
            var branch = branches[i];
            if (branch == null) {
                continue;
            }
            branchCount += 2;
            if (branch.evalFalse !== 0) {
                branchHits++;
            }
            if (branch.evalTrue !== 0) {
                branchHits++;
            }
        }
    }
    return {
        count: branchCount,
        hits: branchHits,
        rate: branchHits / branchCount
    };
}

/**
   * The function extracts the method coverage data from the common result data object of the coverage.
   * @param {Object} reportData object with code coverage data
   * @returns {{count: number, hits: number, rate: number}}
   */
function getJSCoverFunctionData(reportData) {
    var functionData = reportData.functionData;
    if (!functionData) {
        return {
            count: 0,
            hits: 0,
            rate: 0
        };
    }
    var functionCount = functionData.length;
    var functionHits = 0;
    for (var i = 0; i < functionCount; i++) {
        var functionHitsCount = functionData[i];
        if (functionHitsCount !== 0) {
            functionHits++;
        }
    }
    return {
        count: functionCount,
        hits: functionHits,
        rate: functionHits / functionCount
    };
}

/**
   * The function extracts the coverage data from the general result data object of the coverage.
   * @param {Object} reportData object with code coverage data
   * @returns {{count: number, hits: number, rate: number}}
   */
function getJSCoverLineData(reportData) {
    var lineData = reportData.lineData;
    if (!lineData) {
        return {
            count: 0,
            hits: 0,
            rate: 0
        };
    }
    var lineCount = 0;
    var lineHits = 0;
    for (var i = 0, length = lineData.length; i < length; i++) {
        var lineHitsCount = lineData[i];
        if (lineHitsCount == null) {
            continue;
        }
        lineCount++;
        if (lineHitsCount !== 0) {
            lineHits++;
        }
    }
    return {
        count: lineCount,
        hits: lineHits,
        rate: lineHits / lineCount
    };
}

/**
   * Message logging function.
   * @param {String} message message
   * @param verbose logging flag
   */
function logMessage(message, verbose) {
    if (verbose === true) {
        console.log(message);
    }
}

/**
   * The function creates an archive with a html report of the code coverage.
   * @param {Object} [config]
   * - ** reportData **: data covering the code. serialized json object
   * - ** reportFileName **: path to the file with the html-report
   * - ** destinationPath **: the path of the resulting file
   */
function createZipCoverageHtmlReport(config) {
    var zip = new AdmZip();
    zip.addFile(config.reportFileName, new Buffer(config.reportData));
    zip.writeZip(config.destinationPath);
}

module.exports = {

    /**
     * The method processes the result file of the code coverage report, obtained by the utility JSCover.
     * And creates a file with generalized information.
     * @param options The configuration object of the method
     * - ** sourceFilePath **: {String} The path to the file generated by the utility JSCover
     * - ** destinationFilePath **: {String} the path of the resulting file
     * - ** exclude **: {String []} list of files to exclude from the report
     * @param callback {Function} Callback function
     */
    buildJSCoverReport: function (options, callback) {
        var cfg = options || {};
        logMessage("ReportBuilder buildJSCoverReport: run", cfg.verbose);
        var sourceFilePath = cfg.sourceFilePath;
        var destinationFilePath = cfg.destinationFilePath;
        var exclude = cfg.exclude || [];
        var json = fs.readFileSync(sourceFilePath, {
            encoding: "ascii"
        });
        var jsCoverReport = JSON.parse(json);
        var totalBranchCount = 0;
        var totalBranchHit = 0;
        var totalLineCount = 0;
        var totalLineHit = 0;
        var totalFunctionCount = 0;
        var totalFunctionHit = 0;
        var report = {
            total: {},
            files: {}
        };
        var filesData = report.files;
        for (var fileName in jsCoverReport) {
            if (!jsCoverReport.hasOwnProperty(fileName)) {
                continue;
            }
            if (exclude.indexOf(fileName) !== -1) {
                continue;
            }
            var fileData = jsCoverReport[fileName];
            var branchData = getJSCoverBranchData(fileData);
            totalBranchCount += branchData.count;
            totalBranchHit += branchData.hits;
            var functionData = getJSCoverFunctionData(fileData);
            totalFunctionCount += functionData.count;
            totalFunctionHit += functionData.hits;
            var lineData = getJSCoverLineData(fileData);
            totalLineCount += lineData.count;
            totalLineHit += lineData.hits;
            filesData[fileName] = {
                branchData: branchData,
                functionData: functionData,
                lineData: lineData
            };
        }
        report.total = {
            branchData: {
                count: totalBranchCount,
                hits: totalBranchHit,
                rate: totalBranchHit / totalBranchCount
            },
            functionData: {
                count: totalFunctionCount,
                hits: totalFunctionHit,
                rate: totalFunctionHit / totalFunctionCount
            },
            lineData: {
                count: totalLineCount,
                hits: totalLineHit,
                rate: totalLineHit / totalLineCount
            }
        };
        fs.writeFile(destinationFilePath, JSON.stringify(report), null, function (error) {
            if (error != null) {
                logMessage("ReportBuilder buildJSCoverReport Error: " + error, cfg.verbose);
            } else {
                logMessage("ReportBuilder buildJSCoverReport: complete", cfg.verbose);
            }
            if (callback) {
                callback(error, report);
            }
        });
    },

    /**
     * The method generates an archive with the html-report of covering the kernel code with tests.
     * @param {Object} options The configuration object of the method
     * - ** coverageData **: {Object} json-data-coverage data object
     * - ** coverageLimitValue **: {String} threshold value for passing the coverage test
     * - ** htmlReportTemplatePath **: {String} path to the template for the HTML report file
     * - ** htmlReportFileName **: {String} the name of the report file in the archive. TeamCty expects a file with a specific name.
     * - ** htmlReportArchivePath **: {String} path to where to put the finished report.
     * - ** verbose **: {Boolean} the flag controls the output of debugging messages.
     * @param callback {Function} Callback function
     */
    buildHtmlReport: function (options, callback) {
        var cfg = options || {};
        logMessage("ReportBuilder buildHtmlReport: run", cfg.verbose);
        try {
            var htmlReportTemplate = fs.readFileSync(cfg.htmlReportTemplatePath, {
                encoding: "utf8"
            });
            var reportDate = new Date();
            var htmlReport = stringUtils.formatString(htmlReportTemplate, {
                coverageJsonData: JSON.stringify(cfg.coverageData),
                coverageLimitValue: cfg.coverageLimitValue,
                reportDate: reportDate.valueOf()
            });
            createZipCoverageHtmlReport({
                reportFileName: cfg.htmlReportFileName,
                reportData: htmlReport,
                destinationPath: cfg.htmlReportArchivePath
            });
        } catch (e) {
            logMessage("ReportBuilder buildHtmlReport: Error", e.message);
            if (callback) {
                callback(e);
            }
            return;
        }
        logMessage("ReportBuilder buildHtmlReport: complete", cfg.verbose);
        if (callback) {
            callback(null);
        }
    }
};

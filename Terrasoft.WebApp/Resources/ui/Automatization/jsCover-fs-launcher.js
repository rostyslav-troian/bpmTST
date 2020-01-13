var fs = require("fs");
var childProcess = require("child_process");
/**
  * List of directories in which the source files for checking code coverage are located.
  * @type {Array}
  */
var processDirs = ["Terrasoft"];
var stringUtils = require("./string-utils");

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

module.exports = {

	/**
   * The function generates files with source code for testing code coverage with tests
   * @param options {Object} The configuration object of the method
   * - ** jsCoverPath **: {String} path to the JSCover utility
   * - ** sourcePath **: {String} path to the directory with source files
   * - ** destinationPath **: {String} path to the directory where to put the prepared files
   * - ** excludePaths **: {Array (String | Object)} array of paths to be excluded from the resulting directory,
   * if the element of the array string - the path is excluded as is, if the object, then the element of the array is excluded,
   * which corresponds to the regular expression specified in the reg property
   * - ** noInstrumentPaths **: Array (String | Object) an array of paths that must be copied to
   * the resulting directory is unchanged, if the element of the array string is copied files along the specified path,
   * if the object, then the files that match the regular expression specified in the reg property are copied
   * @param callback {Function} Callback function
   */
	processFiles: function(options, callback) {
		var cfg = options || {};
		logMessage("JSCover: processFiles run", cfg.verbose);
		var jsCoverPath = cfg.jsCoverPath;
		var jsCoverArguments = [
			"java -Dfile.encoding=UTF-8 -jar",
			stringUtils.escapePath(jsCoverPath),
			"-fs"
		];
		var excludePaths = cfg.excludePaths || [];
		var noInstrumentPaths = cfg.noInstrumentPaths || [];
		var sourcePath = fs.readdirSync(cfg.sourcePath);
		var i, path;
		for (i = 0; i < excludePaths.length; i++) {
			path = excludePaths[i];
			if (typeof path === "string") {
				jsCoverArguments.push("--exclude=" + path);
			} else if (typeof path === "object") {
				jsCoverArguments.push("--exclude-reg=" + path.reg);
			}
		}
		for (i = 0; i < noInstrumentPaths.length; i++) {
			path = noInstrumentPaths[i];
			if (typeof path === "string") {
				jsCoverArguments.push("--no-instrument=" + path);
			} else if (typeof path === "object") {
				jsCoverArguments.push("--no-instrument-reg=" + path.reg);
			}
		}
		for (i = sourcePath.length; i--;) {
			path = sourcePath.pop();
			if (processDirs.indexOf(path) !== -1) {
				continue;
			}
			jsCoverArguments.push("--no-instrument=" + path);
		}
		jsCoverArguments.push(stringUtils.escapePath(cfg.sourcePath));
		jsCoverArguments.push(stringUtils.escapePath(cfg.destinationPath));
		var commandText = jsCoverArguments.join(" ");
		logMessage("JSCover processFiles Executing command: " + commandText, cfg.verbose);

		childProcess.exec(commandText, {}, function(error, stdout, stderr) {
			if (error != null) {
				logMessage("JSCover processFiles Error: " + error, cfg.verbose);
				logMessage("JSCover processFiles stderr: " + stderr, cfg.verbose);
			} else {
				logMessage("JSCover: complete", cfg.verbose);
			}
			if (callback) {
				callback(error, stdout, stderr);
			}
		});
	},

	/**
   * The function merges reports received as a result of running tests in one file
   * @param options {Object} Configuration object
   * - ** jsCoverPath **: {String} path to the JSCover utility
   * - ** reportsPaths **: {String []} Array of paths to generated report files
   * - ** destinationPath **: {String} The path to the resulting file
   * @param callback {Function} Callback function
   */
	mergeReports: function(options, callback) {
		var cfg = options || {};
		logMessage("JSCover: mergeReports run", cfg.verbose);
		var jsCoverPath = cfg.jsCoverPath;
		var jsCoverArguments = [
			"java -cp",
			stringUtils.escapePath(jsCoverPath),
			"jscover.report.Main",
			"--merge"
		];
		var reportsPaths = cfg.reportsPaths || [];
		jsCoverArguments = jsCoverArguments.concat(reportsPaths);
		jsCoverArguments.push(cfg.destinationPath);
		var commandText = jsCoverArguments.join(" ");
		childProcess.exec(commandText, {
			maxBuffer: 8000 * 1024
		}, function(error, stdout, stderr) {
			if (error != null) {
				logMessage("JSCover mergeReports Error: " + error, cfg.verbose);
				logMessage("JSCover mergeReports stderr: " + stderr, cfg.verbose);
			} else {
				logMessage("JSCover: mergeReports complete", cfg.verbose);
			}
			if (callback) {
				callback(error, stdout, stderr);
			}
		});
	}
};

var childProcess = require("child_process");
var pathModule = require("path");
var stringUtils = require("./string-utils");
var siestaPhantomjsLauncher = "phantomjs-launcher.js";
var phantomJsPath = ".\\Resources\\Terrasoft\\Siesta\\bin\\binary\\phantomjs-2.1.1-windows";
var phantomProcessBufferSize = 20000 * 1024;

/**
  * Message logging function.
  * @param {String} message Message.
  * @param {Boolean} verbose Logging flag.
  */
function logMessage(message, verbose) {
	if (verbose === true) {
		console.log(message);
	}
}

module.exports = {
	/**
  * The method runs tests via PhantomJs
  * @param options {Object} The configuration object of the method
  * - ** siestaPath **: {String} path to the Siesta directory \ bin
  * - ** params **: {Array [String | Object]} start parameters, if the array element is a string, then the parameter is added
  * as is, if the element of the array object - adds a parameter with the name of the first property and the value
  * specified in this property. the delimiter is the value specified in the delimiter property (the space is the default)
  * - ** continueOnError **: {Boolean} Specifies whether to continue execution on errors in phantomjs.
  * @param callback {Function} Callback function
  */
	launch: function(options, callback) {
		var cfg = options || {};
		logMessage("PhantomJS: run", cfg.verbose);
		var siestaPath = cfg.siestaPath;
		logMessage("Siesta Path: " + siestaPath, cfg.verbose);
		var phantomLauncher = pathModule.join(siestaPath, siestaPhantomjsLauncher);
		logMessage("Phantom Launcher: " + phantomLauncher, cfg.verbose);
		var phantomArguments = [
			"\"" + pathModule.join(phantomJsPath, "phantomjs") + "\"",
			stringUtils.escapePath(phantomLauncher),
			stringUtils.escapePath(siestaPath + "/")
		];
		var params = cfg.params || [];
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			if (typeof param === "string") {
				phantomArguments.push(param);
			} else if (typeof param === "object") {
				var delimiter = param.delimiter || " ";
				var paramString = "";
				for (var propertyName in param) {
					if (!param.hasOwnProperty(propertyName) || propertyName === "delimiter") {
						continue;
					}
					var propertyValue = param[propertyName];
					paramString = propertyName + delimiter + propertyValue;
					break;
				}
				phantomArguments.push(paramString);
			}
		}
		var phantomCommand = phantomArguments.join(" ");
		var child = childProcess.spawn("cmd.exe", [], {
			shell: false,
			cwd: "./"
		});
		child.stdout.on("data", function(data) {
			console.log(data.toString())
		});
		child.stderr.on("data", function(data) {
			console.log("stderr: " + data.toString());
		});
		child.stdin.write(phantomCommand + "\r\n" + "\r\nexit\r\n");
		child.on("close", function() {
			if (callback) {
				callback();
			}
		});
	}
};

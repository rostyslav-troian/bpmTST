/**************************************************
 *
 * Create js duck configuration file
 *
 **************************************************/

// consts
var exceptFolderList = ["tests", "amd", "autotesting", "configuration", "loc", "siesta"];
var exceptFileList = ["terrasoft.tests.class.js", "tests.js"];
var testPattern = /(\w+\.)?tests\..+/;
var sourceFilePath = "..\\..\\babel\\output\\";
var configFilePath = ".\\config.json";

var fs = require("fs");
var path = require("path");

function isStringInArray(searchString, searchArray) {
	var searchArrayLength = searchArray.length;
	var lowerSearchString = searchString.toLowerCase();
	for (var i = 0; i < searchArrayLength; i++) {
		if (lowerSearchString === searchArray[i] || testPattern.test(lowerSearchString)) {
			return true;
		}
	}
	return false;
}

function createFileList(folderSpec, result) {
	var files = fs.readdirSync(folderSpec);
	files.forEach(function(file) {
		var ext = path.extname(file);
		if (ext === ".js" && !isStringInArray(file, exceptFileList)) {
			var realPath = fs.realpathSync(folderSpec + file);
			result[realPath] = "";
		}
		if (ext === "" && !isStringInArray(file, exceptFolderList)) {
			createFileList(folderSpec + file + "\\", result);
		}
	}, this);
}

function createConfigurationFile() {
	var content = {
		"--title": "bpm'online NUI Docs",
		"--builtin-classes": "",
		"--warnings": ["-link", "-nodoc"],
		"--output": "..\\Docs",
		"--footer": "Terrasoft 2002-2016 All rights reserved",
		"--tags": ".\\meta-tags.rb",
		"--css": ".left-column { width: 32%!important; } " +
		".middle-column.middle-column { width: 32%!important;} " +
		".left-column li  { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;} " +
		".middle-column.middle-column li { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}",
		"--encoding": "bom|utf-8"
	};
	var items = {};
	createFileList(sourceFilePath, items);
	content["--"] = Object.keys(items);
	fs.writeFile(configFilePath, JSON.stringify(content, null, "\t"), null, function(error) {
		if (error !== null) {
			console.log("error");
		}
	});
}

createConfigurationFile();

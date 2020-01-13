const express = require('express')
const babel = require("@babel/core");
var fs = require('fs');
const util = require('util');
var path = require("path");
var cookieParser = require('cookie-parser')
const port = 3000

RegExp.escape=function(str) {
	if (!arguments.callee.sRE) {
		var specials = [
			'/', '.', '*', '+', '?', '|',
			'(', ')', '[', ']', '{', '}', '\\'
		];
		arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'gim');
	}
	return str.replace(arguments.callee.sRE, '\\$1');
}

const readFile = util.promisify(fs.readFile);
var getCoreModulesConfig = async function(){
	var contents = await readFile('./../amd/core-modules-object.js', 'utf8');
	var coreModules = {};
	eval(contents);
	return coreModules;
}

var handler = async (req, res, next) => {
	if (req.cookies["CoreTests.EnableCodeCoverage"] !== "true") {
		next();
		return;
	}
	var filePath = path.resolve(__dirname, "./../.." + req.path);
	var opts = {
		"filename": filePath,
		"sourceMaps": "both",
		"plugins": [
			[ "istanbul", {"relativePath": false, "useInlineSourceMaps": false} ]
		  ]
		};
	var result = await babel.transformFileAsync(filePath, opts);
	res.set('Content-Type', "application/javascript");
	var absolutePath = path.resolve(filePath).replace(/\\/g, "\\\\")
	   .replace(/\$/g, "\\$")
	   .replace(/'/g, "\\'")
	   .replace(/"/g, "\\\"");
	const resultBody = result.code + "\rwindow.parent['"+absolutePath+"']=" + JSON.stringify(result.map.sourcesContent[0]);
	const finalBody = resultBody.replace(new RegExp(RegExp.escape(absolutePath), 'g'), req.path);
	res.send(finalBody);
}
async function main() {
	const app = express();
	app.use(cookieParser())
	let coreModules = await getCoreModulesConfig();
	const coreFiles = Object.keys(coreModules)
		.map(key => { return {name: key, path: coreModules[key].path};})
		.filter(i => i.path.indexOf("Terrasoft/") === 0)
		.map(i => `/${i.path}/${i.name}.js`);
	app.get("/Terrasoft/tests.coverage.html", function(req, res, next) {
		res.cookie('CoreTests.ContentManagerClassName', "Terrasoft.Tests.ServerSideInstrumentationContentManager", { httpOnly: false, maxAge: 5000 });
		next();
	});
	coreFiles.forEach(path => app.get(path, handler));
	app.use("/", express.static("./../../"));
	app.get('/', function(req, res) {
		res.redirect('./Terrasoft/tests.html');
	  });
	app.get('/cov', function(req, res) {
		res.redirect('./Terrasoft/tests.coverage.html');
	  });
	app.listen(port, () => console.log(`Test server: http://localhost:${port}/Terrasoft/tests.html`))
}

main();
var fs = require("fs");
var pathModule = require("path");
var bufferLength = 64 * 1024;


/**
* The method clears the specified directory except for the specified files\directories
  * @param path {String} path to the directory to be cleaned
  * @param [options] {String []} an array of file names or first-level directories that you do not need to delete */
function cleanDir(path, options) {
	var items = fs.readdirSync(path);
	var cfg = options || {};
	var exceptPaths = cfg.exceptPaths || [];
	for (var i = items.length; i--;) {
		var item = items.pop();
		if (exceptPaths.indexOf(item) !== -1) {
			continue;
		}
		var itemPath = pathModule.join(path, item);
		var itemStat = fs.statSync(itemPath);
		if (itemStat.isFile() === true) {
			fs.unlinkSync(itemPath);
		} else if (itemStat.isDirectory() === true) {
			removeDirForce(itemPath);
		}
	}
}

/**
  * The method recursively deletes the directory
  * @param path {String} path to the directory to be deleted
  */
function removeDirForce(path) {
	cleanDir(path);
	fs.rmdirSync(path);
}

/**
  * Method executes synchronous copying of a file
  * @param sourceFilePath {String} path to the file being copied
  * @param destinationFilePath {String} path to copy file
  */
function copyFileSync(sourceFilePath, destinationFilePath) {
	var buffer = new Buffer(bufferLength);
	var sourceFileDescriptor = fs.openSync(sourceFilePath, "r");
	var destinationFileDescriptor = fs.openSync(destinationFilePath, "w");
	var bytesRead = 1;
	var position = 0;
	while (bytesRead > 0) {
		bytesRead = fs.readSync(sourceFileDescriptor, buffer, 0, bufferLength, position);
		fs.writeSync(destinationFileDescriptor, buffer, 0, bytesRead);
		position += bytesRead;
	}
	fs.closeSync(sourceFileDescriptor);
	fs.closeSync(destinationFileDescriptor);
}

/**
  * The method copies the directory along with subdirectories and files
  * @param sourcePath {String} path to the directory to be copied
  * @param destinationPath {String} path to where you want to copy the directory
  */
function copyDir(sourcePath, destinationPath) {
	var destinationDirExists = fs.existsSync(destinationPath);
	if (destinationDirExists) {
		removeDirForce(destinationPath);
	}
	fs.mkdirSync(destinationPath);
	var items = fs.readdirSync(sourcePath);
	for (var i = items.length; i--;) {
		var item = items.pop();
		var itemPath = pathModule.join(sourcePath, item);
		var itemStat = fs.statSync(itemPath);
		if (itemStat.isFile() === true) {
			var destinationFilePath = pathModule.join(destinationPath, item);
			var destinationFileExists = fs.existsSync(destinationFilePath);
			if (destinationFileExists) {
				fs.unlinkSync(destinationFilePath);
			}
			copyFileSync(itemPath, destinationFilePath);
		} else if (itemStat.isDirectory() === true) {
			var destinationItemPath = pathModule.join(destinationPath, item);
			copyDir(itemPath, destinationItemPath);
		}
	}
}

module.exports = {
	/**
	 * @member fs-utils
	 * @method cleanDir
	 * @inheritdoc fs-utils#cleanDir
	 */
	cleanDir: cleanDir,

	/**
	 * @member fs-utils
	 * @method removeDirForce
	 * @inheritdoc fs-utils#removeDirForce
	 */
	removeDirForce: removeDirForce,

	/**
	 * @member fs-utils
	 * @method copyFileSync
	 * @inheritdoc fs-utils#copyFileSync
	 */
	copyFileSync: copyFileSync,

	/**
	 * @member fs-utils
	 * @method copyDir
	 * @inheritdoc fs-utils#copyDir
	 */
	copyDir: copyDir
};
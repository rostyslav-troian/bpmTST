/**
  * The method escapes the string for output to TeamCity
  * @param {String} value string for escaping
  * @returns {String} Shielded string
  */
function escapeTeamCityString(value) {
	if (typeof value !== 'string') {
		return value;
	}
	var result = value.replace(/([\'\[\]\|])/g, '|$1');
	result = result.replace(/\n/g, '|n');
	result = result.replace(/\r/g, '|r');
	return result;
}

module.exports = {
	/**
	 * @member string-utils
	 * @method escapeTeamCityString
	 * @inheritdoc string-utils#escapeTeamCityString
	 */
	escapeTeamCityString: escapeTeamCityString,

	/**
  * The method executes the string according to the pattern.
  * @param {String} string Line pattern
  * @param {Object | Array} params Template options
  * @returns {String} The generated string
  */
	formatString: function(string, params) {
		var formattedString = string;
		for (var propertyName in params) {
			if (!params.hasOwnProperty(propertyName)) {
				continue;
			}
			formattedString = formattedString.replace('{' + propertyName + '}',
				escapeTeamCityString(params[propertyName]));
		}
		return formattedString;
	},

	/**
  * The method escapes the passed path enclosing it in double quotes.
  * @param {String} path The path for escaping
  * @returns {string} Shielded path
  */
	escapePath: function(path) {
		return ['"', path, '"'].join('');
	}
};
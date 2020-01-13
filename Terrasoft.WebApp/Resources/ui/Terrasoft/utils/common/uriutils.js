Ext.ns("Terrasoft.utils.uri");

/**
 * Utility class for working with URI.
 * @singleton
 */

/**
 * Returns query of the link.
 * @param {HTMLAnchorElement | String} link Link to process.
 * @return {String}.
 */
Terrasoft.utils.uri.getQueryStrig = function(link) {
	if (Ext.isString(link)) {
		var href = link;
		link = document.createElement("a");
		link.href = href;
	}
	var queryString = "";
	if (link instanceof HTMLAnchorElement) {
		queryString = link.search || "";
	}
	return queryString.substring(1);
};

/**
 * Alias for {@link Terrasoft.utils.uri#getQueryStrig}
 * @member Terrasoft
 * @method getQueryStrig
 * @inheritdoc Terrasoft.utils.uri#getQueryStrig
 */
Terrasoft.getQueryStrig = Terrasoft.utils.uri.getQueryStrig;

/**
 * Returns link with encoded query keys and values.
 * @param {String} link Link value to process.
 * @return {String}.
 */
Terrasoft.utils.uri.encodeQueryParameters = function (link) {
	var urlParts = link.split(/\?(.*)/g);
	if (urlParts.length >= 2) {
		var encodedKey, encodedValue, resultPair;
		var modifiedPairs = [];
		var pairs = urlParts[1].split(/[&;]/g);
		for (var i = 0; i < pairs.length; i++) {
			var kvp = pairs[i].split(/[=;]/g);
			encodedKey = encodeURIComponent(decodeURIComponent(kvp[0]));
			encodedValue = kvp[1] ? encodeURIComponent(decodeURIComponent(kvp[1])) : "";
			resultPair = encodedValue
				? encodedKey.concat("=", encodedValue)
				: encodedKey;
			modifiedPairs.push(resultPair);
		}
		return urlParts[0] + (modifiedPairs.length > 0 ? "?" + modifiedPairs.join("&") : "");
	}
	return link;
};

/**
 * Alias for {@link Terrasoft.utils.uri#encodeQueryParameters}
 * @member Terrasoft
 * @method encodeQueryParameters
 * @inheritdoc Terrasoft.utils.uri#encodeQueryParameters
 */
Terrasoft.encodeQueryParameters = Terrasoft.utils.uri.encodeQueryParameters;

/**
 * Removes parameters from query of the uri.
 * @param {HTMLAnchorElement | String} sourceLink Link to process.
 * @param {Array[]} parameters Array of parameter keys to delete.
 * @returns {String} uri.
 */
Terrasoft.utils.uri.removeQueryParameters = function(sourceLink, parameters) {
	function getUri(sourceLink) {
		if (sourceLink instanceof HTMLAnchorElement) {
			var hrefNode = sourceLink.attributes.getNamedItem("href");
			var uri = "";
			if (hrefNode) {
				uri = hrefNode.nodeValue;
			}
			return uri;
		} else {
			return sourceLink;
		}
	}

	var uri = getUri(sourceLink);
	if (Ext.isEmpty(uri) || !Ext.isString(uri)) {
		return "";
	}
	var link = document.createElement("a");
	link.href = uri;
	if (Ext.isEmpty(link.search)) {
		return uri;
	}
	var queryString = Terrasoft.getQueryStrig(link);
	var queryParameters = Ext.urlDecode(queryString);
	Terrasoft.removeProperties(queryParameters, parameters);
	link.search = Ext.urlEncode(queryParameters);
	var href = link.href || "";
	if (Ext.String.endsWith(href, "?")) {
		href = href.replace(/\?$/, "");
	}
	link = null;
	return href;
};

/**
 * Alias for {@link Terrasoft.utils.uri#removeQueryParameters}
 * @member Terrasoft
 * @method removeQueryParameters
 * @inheritdoc Terrasoft.utils.uri#removeQueryParameters
 */
Terrasoft.removeQueryParameters = Terrasoft.utils.uri.removeQueryParameters;

/**
 * Returns value of the named parameter from url. If not exists returns null.
 * @param {string} urlString Source url.
 * @param {string} parameterName Parameter name to get value.
 * @param {bool} decodeValue Indicates whether value should be decoded or not.
 * @returns {string} Value of the named parameter.
 */
Terrasoft.utils.uri.getQueryParameter = function(urlString, parameterName, decodeValue) {
	if (!urlString || !parameterName) {
		return null;
	}
	var match = RegExp('[?&]' + parameterName + '=([^&]*)').exec(urlString);
	return match && (decodeValue ? decodeURIComponent(match[1]) : match[1]);
};

/**
 * Alias for {@link Terrasoft.utils.uri#getQueryParameter}
 * @member Terrasoft
 * @method getQueryParameter
 * @inheritdoc Terrasoft.utils.uri#getQueryParameter
 */
Terrasoft.getQueryParameter = Terrasoft.utils.uri.getQueryParameter;

/**
 * Checks whether string is valid URL.
 * @param {String} value String representation of URL.
 * @return {Boolean} Returns true if string is valid URL.
 */
Terrasoft.utils.uri.isUrl = function(value) {
	/*jshint maxlen:170 */
	//jscs:disable maximumLineLength
	var pattern = /(((^https?)|(^ftp)):\/\/([\-\w])+(\.[a-z]{2,4})*(:[0-9]+)?(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)\/?/i;
	//jscs:enable maximumLineLength
	/*jshint maxlen:120 */
	return pattern.test(value);
};

/**
 * Alias for {@link Terrasoft.utils.uri#isUrl}
 * @member Terrasoft
 * @method isUrl
 * @inheritdoc Terrasoft.utils.uri#isUrl
 */
Terrasoft.isUrl = Terrasoft.utils.uri.isUrl;

/**
 * Returns urls from input string.
 * @param {String} value String representation of URL.
 * @return {String[]} Returns urls from input string.
 */
Terrasoft.utils.uri.getUrls = function(value) {
	if (!Ext.isString(value)) {
		return [];
	}
	/*jshint maxlen:170 */
	//jscs:disable maximumLineLength
	const pattern = /(((https?)|(ftp)):\/\/([\-\w])+(\.[a-z]{2,4})*(:[0-9]+)?(\/[%\-\w]+(\.\w{2,})?)*(([\w-.?\/+@&#;`~=%!$-_+*'(),]*)(\.\w{2,})?)*)\/?/ig;
	//jscs:enable maximumLineLength
	return value.match(pattern) || [];
};

/**
 * Alias for {@link Terrasoft.utils.uri#getUrls}
 * @member Terrasoft
 * @method getUrls
 * @inheritdoc Terrasoft.utils.uri#getUrls
 */
Terrasoft.getUrls = Terrasoft.utils.uri.getUrls;

/**
 * Adds protocol prefix for URL string.
 * @param {String} url Uniform resource locator.
 * @return {String} URL with protocol prefix.
 */
Terrasoft.utils.uri.addProtocolPrefix = function(url) {
	var rg = new RegExp("((ftp|http|https|file):\/\/)+", "i");
	return rg.test(url) ? url : "http://" + url;
};

/**
 * Alias for {@link Terrasoft.utils.uri#addProtocolPrefix}
 * @member Terrasoft
 * @method addProtocolPrefix
 * @inheritdoc Terrasoft.utils.uri#addProtocolPrefix
 */
Terrasoft.addProtocolPrefix = Terrasoft.utils.uri.addProtocolPrefix;

/**
 * Checks whether string is valid URL ignoring protocol.
 * @param {String} url String representation of URL.
 * @return {Boolean} Returns true if string is valid URL.
 */
Terrasoft.utils.uri.isAValidUrlIgnoreProtocol = function(url) {
	return new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(url);
};

/**
 * Checks whether string is valid network path.
 * @param {String} path String representation of URL.
 * @return {Boolean} Returns true if string is valid URL.
 */
Terrasoft.utils.uri.isAValidNetworkPath = function(path) {
	return new RegExp(/^\\(\\[^\s\\]+)+(\\)?$/gi).test(path);
};

/**
 * Returns Url origin.
 * @param {String} url Any valid URL.
 * @return {String} origin of the given URL.
 */
Terrasoft.utils.uri.getUrlOrigin = function(url) {
	var linkElement = document.createElement("a");
	linkElement.href = url;
	return linkElement.origin;
};

/**
 * Alias for {@link Terrasoft.utils.uri#getUrlOrigin}
 * @member Terrasoft
 * @method getUrlOrigin
 * @inheritdoc Terrasoft.utils.uri#getUrlOrigin
 */
Terrasoft.getUrlOrigin = Terrasoft.utils.uri.getUrlOrigin;

/**
 * Returns Url of empty module.
 * @return {String} Empty module url.
 */
Terrasoft.getEmptyModuleUrl = function() {
	return "../core/hash/Terrasoft/amd/empty-module";
};

/**
 * Returns domain part of url.
 * @param {String} url Any valid URL.
 * @return {String} domain part of the given URL.
 */
Terrasoft.utils.uri.getUrlDomain = function(url) {
	var domainRegex = new RegExp("^(https?:\\/\\/)?((([\\da-z\\.-]+)\\.?([a-z\\.]{2,6})?([\\w \\.-]))|" +
		"(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\.|))){4})(:\\d{1,4})?", "g");
	var domainMatches = domainRegex.exec(url);
	return domainMatches && domainMatches[0];
};

/**
 * Alias for {@link Terrasoft.utils.uri#getUrlDomain}
 * @member Terrasoft
 * @method getUrlDomain
 * @inheritdoc Terrasoft.utils.uri#getUrlDomain
 */
Terrasoft.getUrlDomain = Terrasoft.utils.uri.getUrlDomain;

/**
 * Returns hash part of url.
 * @param {String} url Any valid URL.
 * @return {String} hash part of the given URL.
 */
Terrasoft.utils.uri.getUrlHash = function(url) {
	var a = document.createElement("a");
	a.href = url;
	return a.hash;
};

/**
 * Alias for {@link Terrasoft.utils.uri#getUrlHash}
 * @member Terrasoft
 * @method getUrlHash
 * @inheritdoc Terrasoft.utils.uri#getUrlHash
 */
Terrasoft.getUrlHash = Terrasoft.utils.uri.getUrlHash;

/**
 * Returns base URL for configuration web service with respect to accessibility on Portal.
 * @returns {String} web service base URL.
 */
Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl = function() {
	const needToUseSsp = Terrasoft.CurrentUser &&
		Terrasoft.isCurrentUserSsp() &&
		Terrasoft.Features.getIsEnabled("EnableCustomPrefixRouteApi");
	if (needToUseSsp) {
		return Terrasoft.utils.common.combinePath(Terrasoft.workspaceBaseUrl, "ssp");
	}
	return Terrasoft.workspaceBaseUrl;
};

/**
 * Alias for {@link Terrasoft.utils.uri.#getConfigurationWebServiceBaseUrl}
 * @member Terrasoft
 * @method getConfigurationWebServiceBaseUrl
 * @inheritdoc Terrasoft.utils.uri.#getConfigurationWebServiceBaseUrl
 */
Terrasoft.getConfigurationWebServiceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl;

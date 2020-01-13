/**
 * The class of generating links to images by the schema and its parameters.
 * The type of the schema is indicated by the system setting Terrasoft.core.enums.ImageSources
 */
Ext.define("Terrasoft.utils.common.ImageUrlBuilder", {

	alternateClassName: "Terrasoft.ImageUrlBuilder",

	/**
	 * The schema matching object to the parameters for building the image reference.
	 * The object key is the schema type. The key in the object itself is the URL parameter of the link,
	 * and the value for this key is a parameter from the incoming data config
	 * If the inbound settings:
	 * {
  * source: Terrasoft.core.enums.ImageSources.ENTITY_COLUMN,
  * db: 'p_db',
  * schemaName: 'p_schemaName',
  * primaryColumnValue: 'p_primaryColumnValue',
  * columnName: 'p_columnName'
  *}
	 * The resultant reference is obtained, approximately, of the form
	 * <base_url> / img / entity / p_schemaName / p_columnName / p_primaryColumnValue
	 * @protected
	 */
	statics: {
		/**
		 * Diagram of the correspondence of the types of schemas to the image address parameters
		 * @protected
		 */
		urlParamsMap: (function() {
			var urlParamsMap = {};
			// TODO #191202 NUI: imageUrlBuilder. ########## ############ ########
			// images taking into account the new routing in global.asax
			// Rename the "s" parameter to new mappings
			// db -> entity
			// shm -> image-list
			// res -> resource-manager
			// scs -> source-code
			// puts -> process-usertask
			urlParamsMap[Terrasoft.ImageSources.ENTITY_COLUMN] = {
				s: "db",
				sn: "schemaName",
				scn: "columnName",
				id: "primaryColumnValue"
			};
			urlParamsMap[Terrasoft.ImageSources.IMAGE_LIST_SCHEMA] = {
				s: "shm",
				sid: "schemaUId",
				r: "itemUId"
			};
			urlParamsMap[Terrasoft.ImageSources.RESOURCE_MANAGER] = {
				s: "res",
				rm: "resourceManagerName",
				r: "resourceItemName"
			};
			urlParamsMap[Terrasoft.ImageSources.SOURCE_CODE_SCHEMA] = {
				s: "scs",
				sn: "schemaName",
				r: "resourceItemName"
			};
			urlParamsMap[Terrasoft.ImageSources.SYS_SETTING] = {
				sf: "terrasoft.axd",
				s: "nui-binary-syssetting",
				r: "resourceItemName"
			};
			urlParamsMap[Terrasoft.ImageSources.URL] =
				function(config) {
					return config.url;
				};
			urlParamsMap[Terrasoft.ImageSources.PROCESS_USERTASK_SCHEMA] = {
				s: "puts",
				sn: "schemaName",
				r: "resourceItemName"
			};
			return urlParamsMap;
		})(),

		_isStaticContentImageConfig: function(config) {
			if (!Terrasoft.useStaticFileContent) {
				return false;
			}
			var params = config.params;
			if (params && params.resourceItemExtension) {
				return true;
			}
			var message = Ext.String.format("Image config for item \"{1}\" in schema \"{0}\" " +
				"doesn't have property \"resourceItemExtension\". " +
				"It is an obsolete logic and will be removed in future versions.",
				params.schemaName,
				params.resourceItemName);
			console.warn(message);
			return false;
		},

		_getUrlForStaticContentImage: function(config) {
			var urlParts = [];
			urlParts.push(Terrasoft.workspaceBaseUrl);
			urlParts.push(Terrasoft.app.config.staticFileContent.imagesRuntimePath);
			var fileName = config.params.schemaName + "-" + config.params.resourceItemName +
				config.params.resourceItemExtension;
			urlParts.push(fileName);
			var hashParameter = config.params.hash ? "?hash=" + config.params.hash : Terrasoft.emptyString;
			return urlParts.join("/") + hashParameter;
		},

		/**
		 * Method for converting a schema into an image URL
		 * @param {Object} config
		 * @return {String}
		 */
		getUrl: function(config) {
			var source = config.source;
			var urlParamsMap = this.urlParamsMap[source];
			if (Ext.isFunction(urlParamsMap)) {
				return urlParamsMap(config);
			}
			var urlParamsData = config.params;
			if (config.hash) {
				urlParamsData.hash = config.hash;
			}
			urlParamsData.hash = urlParamsData.hash || "hash";
			var paramsList = [];
			var baseUrl = Terrasoft.workspaceBaseUrl + "/img";
			paramsList.push(baseUrl);
			switch (source) {
				case Terrasoft.core.enums.ImageSources.ENTITY_COLUMN:
					paramsList.push("entity");
					paramsList.push(urlParamsData.hash);
					paramsList.push(urlParamsData.schemaName);
					paramsList.push(urlParamsData.columnName);
					paramsList.push(urlParamsData.primaryColumnValue);
					break;
				case Terrasoft.core.enums.ImageSources.IMAGE_LIST_SCHEMA:
					paramsList.push("image-list");
					paramsList.push(urlParamsData.hash);
					paramsList.push(urlParamsData.schemaUId);
					paramsList.push(urlParamsData.itemUId);
					break;
				case Terrasoft.core.enums.ImageSources.RESOURCE_MANAGER:
					paramsList.push("resource-manager");
					paramsList.push(urlParamsData.hash);
					paramsList.push(urlParamsData.resourceManagerName);
					paramsList.push(urlParamsData.resourceItemName);
					break;
				case Terrasoft.core.enums.ImageSources.SOURCE_CODE_SCHEMA:
					if (this._isStaticContentImageConfig(config)) {
						return this._getUrlForStaticContentImage(config);
					}
					paramsList.push("source-code");
					paramsList.push(urlParamsData.hash);
					paramsList.push(urlParamsData.schemaName);
					paramsList.push(urlParamsData.resourceItemName);
					break;
				case Terrasoft.core.enums.ImageSources.PROCESS_USERTASK_SCHEMA:
					paramsList.push("process-usertask");
					paramsList.push(urlParamsData.hash);
					paramsList.push(urlParamsData.schemaName);
					paramsList.push(urlParamsData.resourceItemName);
					break;
				case Terrasoft.core.enums.ImageSources.SYS_SETTING:
					var url = [];
					var settingsCode = urlParamsData.r;
					var sourceHash = null;
					if (typeof settingsCode !== "undefined" && settingsCode !== "") {
						if (Terrasoft.hasOwnProperty("SysSettingsImageHash")) {
							sourceHash = Terrasoft.SysSettingsImageHash[settingsCode];
						}
					}
					var stringParams = [];
					for (var urlParamsMapKey in urlParamsMap) {
						if (urlParamsMapKey === "sf") {
							if (urlParamsMapKey in urlParamsData) {
								url.push(urlParamsData[urlParamsMapKey] + "?");
							} else {
								url.push(urlParamsMap[urlParamsMapKey] + "?");
							}
						} else {
							if (urlParamsMapKey in urlParamsData) {
								stringParams.push(urlParamsMapKey + "=" + urlParamsData[urlParamsMapKey]);
							} else {
								stringParams.push(urlParamsMapKey + "=" + urlParamsMap[urlParamsMapKey]);
							}
						}
					}
					if (sourceHash !== null) {
						stringParams.push("source_hash=" + sourceHash);
					}
					url.push(stringParams.join("&"));
					paramsList.push(url.join(""));
					break;
				case Terrasoft.core.enums.ImageSources.SYS_IMAGE:
					paramsList.push("entity", urlParamsData.hash, "SysImage", "Data");
					paramsList.push(urlParamsData.primaryColumnValue);
					break;
				default:
					break;
			}
			return paramsList.join("/");
		},

		/**
		 * Gets image data url by image base64 content.
		 * @param {String} imageBase64 image content in base64 format.
		 * @return {String} Image data url like "data:image/svg+xml;base64,[imageBase64Content]"
		 */
		getDataUrlByBase64: function(imageBase64) {
			let isSvg = false;
			try {
				isSvg = /^<(svg|\?xml)\s/.test(atob(imageBase64));
			} catch (e) {}
			const prefix = isSvg ? "data:image/svg+xml;base64," : "data:image/*;base64,";
			return `${prefix}${imageBase64}`;
		}
	}
});

Terrasoft.configuration.Structures["CompaniesListHelper"] = {innerHierarchyStack: ["CompaniesListHelper"]};
define("CompaniesListHelper", [
	"CompaniesListHelperResources", "GoogleTagManagerMixin", "ServiceHelper", "SearchableTextEdit",
	"css!CompaniesListCSS"
], function(resources) {
	/**
	 * @class Terrasoft.configuration.mixins.CompaniesListHelper
	 * Provides utilities functions for search and render companies list, suggested by Autocomplete service.
	 */
	Ext.define("Terrasoft.configuration.mixins.CompaniesListHelper", {
		alternateClassName: "Terrasoft.CompaniesListHelper",

		mixins: {
			GoogleTagManagerMixin: "Terrasoft.GoogleTagManagerMixin"
		},

		/**
		 * Fills expandable list by autocomplete service response.
		 * @private
		 * @param {Object} response - Suggest companies service response.
		 */
		suggestCompaniesCallback: function(response) {
			const list = this.get("CompaniesList");
			list.clear();
			if (Terrasoft.isEmptyObject(response)) {
				return true;
			}
			const companies = response.SuggestCompaniesResult;
			const itemList = {};
			if (companies && companies.length) {
				const displayGroupText = resources.localizableStrings.SuggestedCompaniesHeader;
				itemList.suggestionGroup = {
					markerValue: "companies-list-group-header",
					displayValue: displayGroupText,
					isSeparatorItem: true
				};
			}
			Terrasoft.each(companies, function(company) {
				const companyName = company.Name;
				const id = Terrasoft.generateGUID();
				itemList[id] = {
					value: id,
					markerValue: "companies-list-item",
					displayValue: companyName,
					logo: company.Logo,
					url: company.Domain
				};
			}, this);
			list.loadAll(itemList);
		},

		/**
		 * Checks required system settings for suggest companies feature.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Boolean} callback.isSet True if all settings are set. Otherwise - false.
		 */
		checkRequiredSysSettingsSet: function(callback) {
			Terrasoft.SysSettings.querySysSettings([
				"AccountEnrichmentServiceUrl", "CloudServicesAPIKey"
			],
			function(settings) {
				const hasEmptySettings = Terrasoft.some(settings, function(item) {
					return Ext.isEmpty(item);
				});
				callback.call(this, !hasEmptySettings);
			});
		},

		/**
		 * Prepares companies list.
		 * @param {String} partialName Partial company name for search.
		 * @param {Terrasoft.Collection} list Companies list.
		 */
		prepareCompaniesExpandableList: function(partialName, list) {
			if (Terrasoft.Features.getIsEnabled("DisableCompaniesSuggestion")) {
				return;
			}
			if (!partialName) {
				list.clear();
				return;
			}
			this.checkRequiredSysSettingsSet(function(isSet) {
				if (!isSet) {
					return;
				}
				this.callService({
					serviceName: "EnrichmentService",
					methodName: "SuggestCompanies",
					data: {
						name: partialName
					}
				}, this.suggestCompaniesCallback, this);
			}.bind(this));
		},

		/**
		 * Render list item event handler.
		 * @protected
		 * @param {Object} item List element.
		 */
		onCompaniesListViewItemRender: function(item) {
			const itemDisplayValue = item.displayValue.toString();
			const itemValue = item.value;
			if (item.isSeparatorItem) {
				const separatorTemplate = "<span class=\"listview-group-header company-info\" >{0}</span>";
				item.customHtml = this.Ext.String.format(separatorTemplate, itemDisplayValue);
			} else {
				const primaryTemplate =
						"<span class=\"listview-item-primaryInfo company-info\" data-value=\"{0}\">{1}</span>";
				const primaryInfoHtml = Ext.String.format(primaryTemplate, itemValue, itemDisplayValue);
				const secondaryTemplate =
						"<span class=\"listview-item-secondaryInfo company-info\" data-value=\"{0}\">{1}</span>";
				let secondaryInfoHtml = "";
				const secondaryInfo = item.url.toString();
				if (secondaryInfo) {
					secondaryInfoHtml = this.Ext.String.format(secondaryTemplate, itemValue, secondaryInfo);
				}
				const imageSrc = resources.localizableImages.DefaultLogo;
				const defaultLogoUrl = Terrasoft.ImageUrlBuilder.getUrl(imageSrc);
				const tpl = [
					"<div class=\"listview-item company-info\" data-value=\"{0}\">",
					"	<div class=\"listview-item-image company-info\" data-value=\"{0}\">",
					"<img crossOrigin=\"Anonymous\" src=\"{1}\" data-value=\"{0}\" onerror=\"this.onerror = null; this.src='{2}'\">",
					"</div>",
					"<div class=\"listview-item-info company-info\" data-value=\"{0}\">{3}{4}</div>",
					"</div>"
				].join("");
				item.customHtml = this.Ext.String.format(tpl, itemValue, item.logo, defaultLogoUrl, primaryInfoHtml,
					secondaryInfoHtml);
			}
		},

		/**
		 * Sets email from selected company.
		 * @protected
		 * @param {Object} companyListItem List element.
		 */
		onCompanyItemSelected: function(companyListItem) {
			this._sendWebAnalyticsData();
			if (Ext.isEmpty(companyListItem)) {
				return;
			}
			this.set("Web", companyListItem.url || "");
			this.setLogoFromCompanyItem(companyListItem);
		},

		/**
		 * Sends data to the web analytics server.
		 * @private
		 */
		_sendWebAnalyticsData: function() {
			const data = {action: "SuggestedCompanySelected"};
			this.sendGoogleTagManagerData(data);
		},

		/**
		 * Queries company list item's icon element in DOM.
		 * @protected
		 * @param {Object} companyListItem Company list element.
		 * @return {HtmlElement} Image element or null if image is absent.
		 */
		getItemIcon: function(companyListItem) {
			const imageSelector = Ext.String.format("img[data-value='{0}']", companyListItem.value);
			return Ext.global.document.querySelector(imageSelector);
		},

		/**
		 * Uploads and sets account logo from company item.
		 * @protected
		 * @param {Object} companyListItem Company list element.
		 */
		setLogoFromCompanyItem: function(companyListItem) {
			const image = this.getItemIcon(companyListItem);
			if (!image) {
				return;
			}
			this.Terrasoft.ImageApi.uploadFromDom({
				image: image,
				width: 128,
				height: 128,
				onComplete: this.onLogoUploaded,
				onError: this.onLogoUploadError,
				scope: this
			});
		},

		/**
		 * On logo upload error handler.
		 * @protected
		 */
		onLogoUploadError: function() {
			if (this.primaryImageColumnName) {
				this.set(this.primaryImageColumnName, null);
			}
		},

		/**
		 * On logo uploaded handler.
		 * @protected
		 * @param {String} imageId Logo image id.
		 */
		onLogoUploaded: function(imageId) {
			const primaryImageColumnName = this.primaryImageColumnName;
			if (!primaryImageColumnName) {
				return;
			}
			this.set(primaryImageColumnName, {
				value: imageId,
				displayValue: "Photo"
			});
		},

		/**
		 * Initializes mixin attributes.
		 * @virtual
		 */
		init: function() {
			const companiesList = Ext.create("Terrasoft.Collection");
			this.set("CompaniesList", companiesList);
		}
	});
	return Ext.create("Terrasoft.CompaniesListHelper");
});



define("AccountEnrichmentSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "\u003Clabel id=\u0022AccountEnrichmentSchemaEnrichmentHeaderCaptionLabel\u0022 class=\u0022t-label enrichment-header-caption\u0022 style=\u0022\u0022 title=\u0022\u0022 data-item-marker=\u0022EnrichmentHeaderCaption\u0022\u003ECreatio found new information about this account. Select data that you would like to add to the account profile and click \u0022Add\u0022.\u003C\/label\u003E",
		MaskLoadingCaption: "Data search is in process. It can take several seconds.",
		SaveButtonCaption: "Add",
		NotFoundItems: "\u003Clabel id=\u0022AccountEnrichmentSchemaEnrichmentHeaderCaptionLabel\u0022 class=\u0022t-label enrichment-header-caption\u0022 style=\u0022\u0022 title=\u0022\u0022 data-item-marker=\u0022EnrichmentHeaderCaption\u0022\u003EHm... Creatio could not find any information about this account. Try again later as we always strive for excellence and constantly improve our services. Find more \u003Ca href=\u0022{0}\u0022 \u003Ein Academy\u003C\/a\u003E.\u003C\/label\u003E",
		RefreshButtonHint: "Search new data for account enrichment",
		NotEnoughInfo: "\u003Clabel id=\u0022AccountEnrichmentSchemaEnrichmentHeaderCaptionLabel\u0022 class=\u0022t-label enrichment-header-caption\u0022 style=\u0022\u0022 title=\u0022\u0022 data-item-marker=\u0022EnrichmentHeaderCaption\u0022\u003ECreatio could not find any information about this account. Add more data on the account page (such as web address) and try again. Find more \u003Ca href=\u0022{0}\u0022 \u003Ein Academy\u003C\/a\u003E.\u003C\/label\u003E",
		NoNewData: "\u003Clabel id=\u0022AccountEnrichmentSchemaEnrichmentHeaderCaptionLabel\u0022 class=\u0022t-label enrichment-header-caption\u0022 style=\u0022\u0022 title=\u0022\u0022 data-item-marker=\u0022EnrichmentHeaderCaption\u0022\u003ECreatio couldn\u0027t find new information about this account. This means that all information in company profile is up to date. Great!\u003C\/label\u003E"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "AccountEnrichmentSchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		RefreshIcon: {
			source: 3,
			params: {
				schemaName: "AccountEnrichmentSchema",
				resourceItemName: "RefreshIcon",
				hash: "b6db25ca695ff69f5e479a3e2c967918",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
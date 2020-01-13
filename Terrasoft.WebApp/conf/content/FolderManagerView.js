Terrasoft.configuration.Structures["FolderManagerView"] = {innerHierarchyStack: ["FolderManagerView"]};
define("FolderManagerView", ["ext-base", "terrasoft", "FolderManagerViewResources", "ConfigurationConstants"],
	function(Ext, Terrasoft, resources, ConfigurationConstants) {

		/**
		 * ########## ############ ############# ######### #####
		 * @param {Object} sandbox
		 * @returns {Object}
		 */
		function generate(sandbox) {
			var closePanelImageUrl = Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.ClosePanelImageV2);
			var extendCatalogueFilterContainerId = "extendCatalogueFilterContainer_" + sandbox.id;
			/**
			 * ########## ######## ## ### ######
			 * @private
			 * @param {String} folderType
			 * @returns {boolean}
			 */
			function isMailboxType(folderType) {
				return folderType.value === ConfigurationConstants.Folder.Type.SubEmail ||
					folderType.value === ConfigurationConstants.Folder.Type.MailBox;
			}

			var viewConfig = {
				id: "folderManagerContainer",
				selectors: {wrapEl: "#folderManagerContainer"},
				items: [
					{
						className: "Terrasoft.Container",
						id: "foldersContainer",
						selectors: {wrapEl: "#foldersContainer"},
						visible: {bindTo: "IsFoldersContainerVisible"},
						items: [
							{
								className: "Terrasoft.Container",
								id: "header",
								selectors: {wrapEl: "#header"},
								classes: {wrapClassName: "folder-manager-header"},
								items: [
									{
										className: "Terrasoft.Button",
										tag: "CloseButton",
										classes: {wrapperClass: ["folder-manager-button-right"]},
										hint: resources.localizableStrings.CloseButtonHint,
										style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
										visible: {bindTo: "CloseVisible"},
										markerValue: resources.localizableStrings.CloseButtonHint,
										imageConfig: {
											source: Terrasoft.ImageSources.URL,
											url: closePanelImageUrl
										},
										click: {bindTo: "closeFolderManager"}
									}
								]
							},
							{
								className: "Terrasoft.Container",
								id: "gridContainer",
								selectors: {wrapEl: "#gridContainer"},
								classes: {wrapClassName: ["folder-manager-left-container"]},
								items: [
									{
										className: "Terrasoft.Grid",
										id: "foldersGrid",
										type: "listed",
										primaryColumnName: "Id",
										selectRow: {bindTo: "onActiveRowChanged"},
										multiSelect: {bindTo: "multiSelect"},
										hierarchical: true,
										useLevelRendering: true,
										hierarchicalColumnName: "Parent",
										columnsConfig: [
											{
												cols: 21,
												key: [
													{
														name: {bindTo: "FolderType"},
														type: Terrasoft.GridKeyType.ICON16LISTED
													},
													{
														name: {bindTo: "Name"}
													}
												]
											}
										],
										activeRowActions: [
											{
												className: "Terrasoft.Button",
												classes: {wrapperClass: "folder-catalogue-actions-icon"},
												style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
												tag: "extendFilter",
												imageConfig: resources.localizableImages.SpecificationFilterImageV2,
												visible: {
													bindTo: "IsInCatalogue",
													bindConfig: {
														converter: function(isInCatalogue) {
															return (
																isInCatalogue &&
																!Ext.isEmpty(this.get("Parent")) &&
																this.get("IsOpenFilterButtonVisible")
															);
														}
													}
												}
											},
											{
												className: "Terrasoft.Button",
												classes: {wrapperClass: "folder-favorite-actions-icon"},
												hint: resources.localizableStrings.FavouritesButtonHint,
												style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
												tag: "favorite",
												imageConfig: {
													bindTo: "IsInFavorites",
													bindConfig: {
														converter: function(isInFavorites) {
															return isInFavorites
																? resources.localizableImages.RemoveFromFavoritesV2
																: resources.localizableImages.AddToFavoritesImageV2;
														}
													}
												},
												visible: {
													bindTo: "IsInCatalogue",
													bindConfig: {
														converter: function(isInCatalogue) {
															return !isInCatalogue && !Ext.isEmpty(this.get("Parent"));
														}
													}
												}
											},
											{
												className: "Terrasoft.Button",
												classes: {wrapperClass: "folder-menu-actions-icon"},
												style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
												hint: resources.localizableStrings.ConfigurationButton,
												menu: {
													items: [
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.EditFolderFiltersV2,
															tag: "editFilter",
															visible: {
																bindTo: "FolderType",
																bindConfig: {
																	converter: function(folderType) {
																		return folderType.value ===
																			ConfigurationConstants.Folder.Type.Search;
																	}
																}
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.ConvertFolder,
															markerValue: resources.localizableStrings.ConvertFolder,
															tag: "convertFilter",
															visible: {
																bindTo: "isConvertFolderButtonVisible"
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.RenameMenuItemCaptionV2,
															tag: "renameFolder",
															visible: {
																bindTo: "FolderType",
																bindConfig: {
																	converter: function(folderType) {
																		return !isMailboxType(folderType);
																	}
																}
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.MoveMenuItemCaptionV2,
															tag: "moveFolder",
															visible: {
																bindTo: "FolderType",
																bindConfig: {
																	converter: function(folderType) {
																		return !isMailboxType(folderType);
																	}
																}
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.CopyMenuItemCaptionV2,
															tag: "copyFolder",
															markerValue: resources.localizableStrings.CopyMenuItemCaptionV2,
															visible: {
																bindTo: "FolderType",
																bindConfig: {
																	converter: function(folderType) {
																		return folderType.value ===
																			ConfigurationConstants.Folder.Type.Search;
																	}
																}
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.DeleteMenuItemCaptionV2,
															tag: "deleteButton",
															visible: {
																bindTo: "FolderType",
																bindConfig: {
																	converter: function(folderType) {
																		return !isMailboxType(folderType);
																	}
																}
															}
														},
														{
															className: "Terrasoft.MenuItem",
															caption: resources.localizableStrings.EditRightsMenuItemCaptionV2,
															tag: "editRights",
															visible: {bindTo: "administratedByRecords"}
														}
													]
												},
												imageConfig: resources.localizableImages.SettingsImageV2,
												visible: {
													bindTo: "IsInCatalogue",
													bindConfig: {
														converter: function(isInCatalogue) {
															return !isInCatalogue && !Ext.isEmpty(this.get("Parent"));
														}
													}
												},
												markerValue: "GroupActions"
											}
										],
										captionsCss: "folder-manager-grid-captions",
										collection: {bindTo: "GridData"},
										watchedRowInViewport: {bindTo: "loadNext"},
										selectedRows: {bindTo: "SelectedRows"},
										activeRow: {bindTo: "ActiveRow"},
										openRecord: {bindTo: "dblClickGrid"},
										expandHierarchyLevels: {bindTo: "expandHierarchyLevels"},
										updateExpandHierarchyLevels: {bindTo: "onExpandHierarchyLevels"},
										activeRowAction: {bindTo: "onActiveRowAction"},
										useListedLookupImages: true,
										hasNestingColumnName: "HasNesting"
									}
								]
							}
						]
					},
					{
						className: "Terrasoft.Container",
						id: extendCatalogueFilterContainerId,
						selectors: {wrapEl: "#" + extendCatalogueFilterContainerId},
						classes: {wrapClassName: ["extend-catalogue-filter-container"]},
						visible: {bindTo: "IsExtendCatalogueFilterContainerVisible"},
						items: []
					}
				]
			};
			return viewConfig;
		}
		return {generate: generate};
	});



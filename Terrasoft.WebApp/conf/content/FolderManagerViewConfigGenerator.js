Terrasoft.configuration.Structures["FolderManagerViewConfigGenerator"] = {innerHierarchyStack: ["FolderManagerViewConfigGenerator"]};
define("FolderManagerViewConfigGenerator", ["ext-base", "terrasoft",
		"FolderManagerViewConfigGeneratorResources", "ConfigurationConstants"],
	function(Ext, Terrasoft, resources, ConfigurationConstants) {

		return Ext.define("Terrasoft.FolderManagerViewConfigGenerator", {
			extend: "Terrasoft.BaseObject",

			/**
			 * Returns the view configuration of the module.
			 * @return {Object} The view configuration of the module.
			 */
			generate: function() {
				return this.getFolderManagerContainerConfig();
			},

			/**
			 * Returns folder manager container config.
			 * @return {Object} Folder manager container config.
			 */
			getFolderManagerContainerConfig: function() {
				return {
					id: "folderManagerContainer",
					selectors: {wrapEl: "#folderManagerContainer"},
					items: [this.getFolderContainerConfig()]
				};
			},

			/**
			 * Returns folder container config.
			 * @return {Object} Folder container config.
			 */
			getFolderContainerConfig: function() {
				return {
					className: "Terrasoft.Container",
					id: "foldersContainer",
					selectors: {wrapEl: "#foldersContainer"},
					items: [
						this.getHeaderConfig(),
						this.getGridContainerConfig()
					]
				};
			},

			/**
			 * Returns header config.
			 * @return {Object} Header config.
			 */
			getHeaderConfig: function() {
				return {
					className: "Terrasoft.Container",
					id: "header",
					selectors: {wrapEl: "#header"},
					classes: {wrapClassName: "folder-manager-header"},
					items: [
						{
							id: "folderHeaderLabel",
							className: "Terrasoft.Label",
							classes: {labelClass: ["folder-manager-header-name"]},
							caption: resources.localizableStrings.FoldersHeaderCaption,
							visible: false
						},
						{
							className: "Terrasoft.Button",
							tag: "CloseButton",
							markerValue: resources.localizableStrings.CloseButtonHint,
							classes: {wrapperClass: ["folder-manager-button-right"]},
							hint: resources.localizableStrings.CloseButtonHint,
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							visible: true,
							imageConfig: {
								source: Terrasoft.ImageSources.URL,
								url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.ClosePanelImage)
							},
							click: {bindTo: "closeFolderManager"}
						}
					]
				};
			},

			/**
			 * Check is folder type are search
			 * @param folderType Folder type
			 * @returns {*|boolean} true when folder type is Search
			 * @private
			 */
			_isSearchFolder: function(folderType) {
				return folderType && folderType.value ===
					ConfigurationConstants.Folder.Type.Search;
			},

			/**
			 * Returns grid container config.
			 * @return {Object} Grid container config.
			 */
			getGridContainerConfig: function() {
				return {
					className: "Terrasoft.Container",
					id: "gridContainer",
					selectors: {wrapEl: "#gridContainer"},
					classes: {wrapClassName: ["folder-manager-left-container"]},
					items: [this.getFolderGridConfig()]
				};
			},

			/**
			 * Returns folder grid config.
			 * @return {Object} Folder grid config.
			 */
			getFolderGridConfig: function() {
				return {
					className: "Terrasoft.Grid",
					id: "foldersGrid",
					type: "listed",
					primaryColumnName: "Id",
					selectRow: {bindTo: "onActiveRowChanged"},
					multiSelect: {bindTo: "multiSelect"},
					hierarchical: true,
					useLevelRendering: true,
					hierarchicalColumnName: "Parent",
					columnsConfig: [{
						cols: 21,
						key: [{
							name: {bindTo: "FolderType"},
							type: Terrasoft.GridKeyType.ICON16LISTED
						}, {
							name: {bindTo: "Name"}
						}]
					}],
					activeRowActions: this.getFolderGridActiveRowActionsConfig(),
					captionsCss: "folder-manager-grid-captions",
					collection: {bindTo: "gridData"},
					watchedRowInViewport: {bindTo: "loadNext"},
					selectedRows: {bindTo: "selectedRows"},
					activeRow: {bindTo: "activeRow"},
					openRecord: {bindTo: "dblClickGrid"},
					expandHierarchyLevels: {bindTo: "expandHierarchyLevels"},
					updateExpandHierarchyLevels: {bindTo: "onExpandHierarchyLevels"},
					activeRowAction: {bindTo: "onActiveRowAction"},
					useListedLookupImages: true
				};
			},

			/**
			 * Returns folder grid active actions config.
			 * @return {Object} Folder grid active actions config.
			 */
			getFolderGridActiveRowActionsConfig: function() {
				return [
					{
						className: "Terrasoft.Button",
						classes: {wrapperClass: "folder-favorite-actions-icon"},
						hint: resources.localizableStrings.FavouritesButtonHint,
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: "favorite",
						imageConfig: {
							bindTo: "isInFavorites",
							bindConfig: {
								converter: function(isInFavorites) {
									return isInFavorites
										? resources.localizableImages.RemoveFromFavorites
										: resources.localizableImages.AddToFavoritesImage;
								}
							}
						}
					},
					{
						className: "Terrasoft.Button",
						classes: {wrapperClass: "folder-menu-actions-icon"},
						hint: resources.localizableStrings.ConfigurationButton,
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: "folderMenuActions",
						menu: {
							items: [
								{
									className: "Terrasoft.MenuItem",
									caption: resources.localizableStrings.EditFolderFilters,
									tag: "editFilter",
									markerValue: resources.localizableStrings.EditFolderFilters,
									visible: {
										bindTo: "FolderType",
										bindConfig: {
											converter: this._isSearchFolder
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
									caption: resources.localizableStrings.RenameMenuItemCaption,
									tag: "renameFolder",
									markerValue: resources.localizableStrings.RenameMenuItemCaption,
									visible: {
										bindTo: "FolderType",
										bindConfig: {
											converter: this._isNotMailboxType
										}
									}
								},
								{
									className: "Terrasoft.MenuItem",
									caption: resources.localizableStrings.MoveMenuItemCaption,
									tag: "moveFolder",
									markerValue: resources.localizableStrings.MoveMenuItemCaption,
									visible: {
										bindTo: "FolderType",
										bindConfig: {
											converter: this._isNotMailboxType
										}
									}
								},
								{
									className: "Terrasoft.MenuItem",
									caption: resources.localizableStrings.CopyMenuItemCaption,
									tag: "copyFolder",
									markerValue: resources.localizableStrings.CopyMenuItemCaption,
									visible: {
										bindTo: "FolderType",
										bindConfig: {
											converter: this._isSearchFolder
										}
									}
								},
								{
									className: "Terrasoft.MenuItem",
									caption: resources.localizableStrings.DeleteMenuItemCaption,
									tag: "deleteButton",
									markerValue: resources.localizableStrings.DeleteMenuItemCaption,
									visible: {
										bindTo: "FolderType",
										bindConfig: {
											converter: this._isNotMailboxType
										}
									}
								},
								{
									className: "Terrasoft.MenuItem",
									caption: resources.localizableStrings.EditRightsMenuItemCaption,
									tag: "editRights",
									markerValue: resources.localizableStrings.EditRightsMenuItemCaption,
									visible: {bindTo: "administratedByRecords"}
								}
							]
						},
						imageConfig: resources.localizableImages.SettingsImage,
						markerValue: "GroupActions"
					}
				];
			},

			/**
			 * Returns true if folder type is SubEmail or MailBox.
			 * @private
			 * @param {Object} folderType Folder type.
			 * @return {Boolean}
			 */
			_isNotMailboxType: function(folderType) {
				return !(folderType.value === ConfigurationConstants.Folder.Type.SubEmail ||
					folderType.value === ConfigurationConstants.Folder.Type.MailBox);
			}
		});
	});



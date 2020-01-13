define("MainHeaderModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProfileImageButtonHintCaption: "Profile",
		ProfileMenuItemCaption: "Your profile",
		ExitMenuItemCaption: "Exit",
		SystemDesignerCaption: "System designer",
		LogoHint: "Go to Main menu",
		SystemDesignerTip: "\u003Cspan class=\u0022tip-header\u0022\u003ESystem designer\u003C\/span\u003E\u003Cbr\u003EOpens the administration and customization options\u003Cbr\u003E\u003Ca href=\u0022#\u0022 data-context-help-id=\u00221243\u0022 \u003ERead more\u003C\/a\u003E\u003Cbr\u003E\u003Ca href=\u0022https:\/\/youtu.be\/vBnvSmo1Dn8?list=PLnolcTT5TeE08u9GbWA7R29awrDDANt-5\u0022 target=\u0022_blank\u0022\u003EVideo tutorial\u003C\/a\u003E"
	};
	var localizableImages = {
		ContactEmptyPhoto: {
			source: 3,
			params: {
				schemaName: "MainHeaderModule",
				resourceItemName: "ContactEmptyPhoto",
				hash: "7b9714880757961d3d247b11ca6c92b5",
				resourceItemExtension: ".png"
			}
		},
		RemindingsIcon: {
			source: 3,
			params: {
				schemaName: "MainHeaderModule",
				resourceItemName: "RemindingsIcon",
				hash: "4e93d63be3a4318c90b686578c94386d",
				resourceItemExtension: ".png"
			}
		},
		Logo: {
			source: 3,
			params: {
				schemaName: "MainHeaderModule",
				resourceItemName: "Logo",
				hash: "fd09831c31c007e1b9a2e3ca188a5528",
				resourceItemExtension: ".png"
			}
		},
		YourProfileIcon: {
			source: 3,
			params: {
				schemaName: "MainHeaderModule",
				resourceItemName: "YourProfileIcon",
				hash: "82f755257cb28e7eee35d8bca449f2cb",
				resourceItemExtension: ".png"
			}
		},
		SystemDesignerIcon: {
			source: 3,
			params: {
				schemaName: "MainHeaderModule",
				resourceItemName: "SystemDesignerIcon",
				hash: "f8adf55dd1eb69a0bcb74af669aff305",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
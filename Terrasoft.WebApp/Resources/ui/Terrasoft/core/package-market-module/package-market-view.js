/**
 */
Ext.define("Terrasoft.core.PackageMarketView", {
	extend: "Terrasoft.BaseObject",

	/**
	 *
	 * @returns {object} view config
	 */
	getView: function() {
		return [
			{
				className: "Terrasoft.Container",
				id: "downloadbyurlpackagecontainer",
				selectors: {
					wrapEl: "#downloadbyurlpackagecontainer"
				},
				items: [
					{
						className: "Terrasoft.Label",
						id: "PackageUrlLabel",
						caption: "Package path:",
						classes: {
							labelClass: ["package-url-label"]
						}
					},
					{
						className: "Terrasoft.TextEdit",
						id: "PackageUrl-txt",
						placeholder: "Package path",
						classes: {wrapClass: "package-url-text-edit"},
						value: {
							bindTo: "UrlField"
						}
					},
					{
						className: "Terrasoft.Button",
						id: "InstallPackage-btn",
						caption: "Install",
						style: Terrasoft.controls.ButtonEnums.style.GREEN,
						click: {bindTo: "installPackage"},
						tag: "InstallPackage"
					}
				]
			}
		];
	}
});

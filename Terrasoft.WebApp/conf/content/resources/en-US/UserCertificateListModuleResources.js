define("UserCertificateListModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CertificatesListHeaderCaption: "Certificates",
		CertificatesCreateButtonCaption: "New",
		CertificatesEmptyInfoTitle: "You do not have any certificates",
		CertificatesEmptyInfoRecommendation: "Create a {0}new \u0441ertificate{1}.",
		SignUpButtonCaption: "Sign UP",
		SignUpPageAddress: "https:\/\/academy.bpmonline.com\/trainings"
	};
	var localizableImages = {
		CertificatesEmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "UserCertificateListModule",
				resourceItemName: "CertificatesEmptyInfoImage"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});
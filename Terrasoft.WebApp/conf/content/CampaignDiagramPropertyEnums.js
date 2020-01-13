Terrasoft.configuration.Structures["CampaignDiagramPropertyEnums"] = {innerHierarchyStack: ["CampaignDiagramPropertyEnums"]};
define("CampaignDiagramPropertyEnums", ["CampaignDiagramPropertyEnumsResources", "CampaignLocalizableHelper",
		"CampaignDiagramToolsModule"],
	function(resources, CampaignLocalizableHelper) {
		return {
			/**
			 * @enum
			 * Categories diagram elements
			 */
			DiagramElementCategory: {
				/** Step*/
				NODE: "node",
				/** Connector */
				CONNECTOR: "connector",
				/** Default value */
				DEFAULT: ""
			},

			/**
			 * @enum
			 * Schema page for diagram elements
			 */
			SchemaBuilderConfig: {

				/** Default value */
				Default: {
					schemaName: "",
					pageSchemaName: "CampaignDiagramPropertyBasePage",
					pageTypeCaption: "",
					pageIcon: null
				},

				/** Schema page for Connector element */
				Connector: {
					schemaName: "CampaignStepRoute",
					pageSchemaName: "CampaignDiagramPropertyConnectorPage",
					pageTypeCaption: resources.localizableStrings.PageConnectorTypeCaption,
					pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
						CampaignLocalizableHelper.localizableImages.ConnectionTypeImage)
				},

				/** Schema page for Bulk Email element */
				Node: {
					/** Email-######## */
					"0270a11d-534c-40ec-8a72-c4902d6afb09": {
						schemaName: "BulkEmail",
						pageSchemaName: "CampaignDiagramPropertyBulkEmailPage",
						pageTypeCaption: resources.localizableStrings.PageBulkEmailTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeEmailImage)
					},
					/** Schema page for Event element */
					"75b0f8d2-a3f4-4715-ad37-a501543af26c": {
						schemaName: "Event",
						pageSchemaName: "CampaignDiagramPropertyEventPage",
						pageTypeCaption: resources.localizableStrings.PageEventTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeEventImage)
					},
					/** Schema page for Audience element */
					"36503c76-9542-45b6-a934-a61f2b9bce48": {
						schemaName: "ContactFolder",
						pageSchemaName: "CampaignDiagramPropertyAudiencePage",
						pageTypeCaption: resources.localizableStrings.PageAudienceTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeAudienceImage)
					},
					/** Schema page for Target element */
					"30eb28eb-bb1f-4d18-9358-55556d80d833": {
						schemaName: "ContactFolder",
						pageSchemaName: "CampaignDiagramPropertyTargetPage",
						pageTypeCaption: resources.localizableStrings.PageAudienceTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeTargetImage)
					},
					/** Schema page for Quit element */
					"b748cdc5-b478-4ed1-8b52-51513ee49ed9": {
						schemaName: "ContactFolder",
						pageSchemaName: "CampaignDiagramPropertyQuitPage",
						pageTypeCaption: resources.localizableStrings.PageAudienceTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeExitingImage)
					},
					/** Schema page for Landing element */
					"5e9d3401-8047-4833-b9f0-c2c8d3dbbe62": {
						schemaName: "GeneratedWebForm",
						pageSchemaName: "CampaignDiagramPropertyLandingPage",
						pageTypeCaption: resources.localizableStrings.PageLandingTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeLandingImage)
					},
					/** Schema page for Create Lead element */
					"12c48da4-8305-4aa7-92a9-2c75dc5d458b": {
						schemaName: "Lead",
						pageSchemaName: "CampaignDiagramPropertyCreateLeadPage",
						pageTypeCaption: resources.localizableStrings.CreateLeadTypeCaption,
						pageIconUrl: Terrasoft.ImageUrlBuilder.getUrl(
							CampaignLocalizableHelper.localizableImages.StepTypeCreateLeadImage)
					}
				}
			},

			/** Caption for Contact Folder*/
			CampaignPropertyLabelCaption: {
				CONTACT_FOLDER: resources.localizableStrings.ContactFolderLabelCaption
			}
		};
	});



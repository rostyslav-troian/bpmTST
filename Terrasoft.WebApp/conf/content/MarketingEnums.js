Terrasoft.configuration.Structures["MarketingEnums"] = {innerHierarchyStack: ["MarketingEnums"]};
define("MarketingEnums", function() {
	return {
		/**
		 * @enum
		 * Bulk email status
		 */
		BulkEmailStatus: {
			/** Draft */
			DRAFT: "32848d61-3792-4b06-a183-eaf1d1769897",
			/** Planned */
			PLANNED: "392d3cf8-8d7a-42b1-857c-e4ef36f989af",
			/** Stopped */
			STOPPED: "a89e3500-3e51-4b68-b512-80adf19738e7",
			/** Completed */
			COMPLETED: "42328932-9ad6-4512-9950-662ffba2c53c",
			/** Started */
			STARTED: "7789ac0c-450b-40a3-b341-3d6b799649b4",
			/** Starting */
			STARTING: "c6e21ad8-e243-4656-aafc-1312f97c4521",
			/** Waiting before send */
			WAITING_BEFORE_SEND: "46de8ebd-16ce-4900-b309-0d3fc70ee20a",
			/** Breaking */
			BREAKING: "68865284-a613-4158-91bc-9cc306393d2b",
			/** Scheduled */
			START_SCHEDULED: "ee792aa5-1a7c-40ae-9c4f-b3a33ec18aea",
			/** Sending error */
			ERROR_SENDING: "48c20aa0-8277-4610-bb2c-ff934f1b1237",
			/** Active */
			ACTIVE: "c467c44f-345e-42eb-8385-8ce383699b52"
		},
		/**
		 * @enum
		 * Event response
		 */
		EventResponse: {
			/** Participation confirmed **/
			CONFIRMED: "22e4a8ae-17b6-4ffe-bc6f-a6f560217eb9",
			/** Participation canceled **/
			CANCELED: "2ea76342-b8cb-4b7d-86ce-19e14f350617",
			/** Participated **/
			PARTICIPATED: "b1e144c1-116c-4265-ae5d-edfbf6254a23",
			/** Expected **/
			EXPECTED: "c6eae023-2778-49c6-8273-6b015c1cc611",
			/** Request error */
			REQUEST_FAILED: "3356308f-3f3b-4982-b1d5-68b895092ed2"
		},
		/**
		 * @enum
		 * Segment update status
		 */
		SegmentsStatus: {
			/** Updated*/
			UPDATED: "fa360d2c-1658-49ad-9152-22479fdc0c12",
			/** Updating */
			UPDATING: "64ecd6eb-17da-472b-a000-0809d49348f3",
			/** Requires to be updated */
			REQUIERESUPDATING: "dfb4e827-1b9b-4ea7-b4eb-898f592451f9"
		},
		/**
		 * @enum
		 * Reasons of which contact communications set non actual.
		 */
		NonActualReason: {
			/** Filled manually */
			FILLED_MANUALLY: "fe0b394d-9403-4d08-bc55-068528b2de45",
			/** Soft Bounce */
			SOFT_BOUNCE: "064bbcbd-0d14-4150-9afb-d504e27ccbce",
			/** Hard Bounce */
			HARD_BOUNCE: "4b604bd3-46bf-4f3c-aedd-38d318765c5a",
			/** Rejected */
			REJECTED: "e0a76a46-c931-4553-956a-159294609a72"
		},
		/**
		 * @enum
		 * Parameters of mailing service
		 */
		MandrillParameters: {
			/** Maximum size of the template content (bytes) - 5Mb */
			MAX_TEMPLATE_SIZE: 5242880,
			/** Maximum size of the template replicas' content for contract (bytes) - 30Mb */
			MAX_TEMPLATE_CONTRACT_SIZE: 31457280
		},
		/**
		 * @enum
		 * Contact subscription status
		 */
		BulkEmailSubsStatus: {
			/** Subscriped */
			SUBSCRIBED: "1a5cd9b8-b999-4b65-b8a8-bd3168792128",
			/** Unsubscribed */
			UNSUBSCRIBED: "c8947f80-a374-412a-bbc8-ea9068a8b78e"
		},
		/**
		 * @enum
		 * Campaign status
		 */
		CampaignStatus: {
			/** Planned */
			PLANNED: "24b80784-2172-4903-94ad-ca1fddf368dd",
			/** Stopped */
			COMPLETED: "9168c6b6-68e9-469c-9792-769bb39de25f",
			/** Completed */
			STOPPED: "5b792494-d40f-4b2b-8cfd-ab75ac5d33aa",
			/** Started */
			STARTED: "49cc0a4f-75df-4b47-953b-0faa4983321d",
			/** Stopping */
			STOPPING: "d1b59429-008b-4b28-83cf-d93a6825792a",
			/* Scheduled */
			SCHEDULED: "d55a44bb-fa64-45f5-b83d-c5ef7cd76208"
		},
		/**
		 * @enum
		 * Split-test status
		 */
		BulkEmailSplitStatus: {
			/** Planned */
			PLANNED: "cb26ed70-e6f7-4e48-bc7b-560b2676fcc6",
			/** Started */
			STARTED: "30e71df7-d9f7-4a9a-861b-a6a26e59d19e",
			/** Scheduled */
			START_SCHEDULED: "069579cf-aa28-497a-ae48-7db6a61e33fc",
			/** Completed */
			COMPLETED: "43ddfb49-c9a5-4d63-8294-d54419456c0b"
		},
		/**
		 * @enum
		 * Bulk email category
		 */
		BulkEmailCategory: {
			/* Bulk email */
			MASS_MAILING: "8cec06ed-2643-46f7-ab00-352acbc3bd8a",
			/* Trigger email */
			TRIGGERED_EMAIL: "2df24c22-b596-4994-a0cd-e2fa1d8ecdeb"
		},
		/**
		 * @enum
		 * Option start Bulk email
		 */
		BulkEmailLaunchOption: {
			/* Bulk email, at a specified time */
			MASS_MAILING_SCHEDULED: "936b2d84-cf46-404f-8726-d377e4896774",
			/* Bulk email, manually */
			MASS_MAILING_MANUALY: "6f72c1b4-810b-4ef9-bc20-879372c8e2c2",
			/* Trigger email at a specified time */
			TRIGGERED_EMAIL_SHEDULED: "5a3ceb77-64b9-446e-ae64-f78d358e42a8",
			/* Trigger email instantly */
			TRIGGERED_EMAIL_IMMEDIATE: "f1e82afb-8820-4a13-8bc3-22b1a8180ab1",
			/* From campaign */
			TRIGGERED_EMAIL_HOURLY: "17ec7fb4-c709-469b-a332-59656695082e"
		},
		/**
		 * @enum
		 * Build type.
		 */
		BuildType: {
			/* Public demo*/
			DEMO_PUBLIC: "e45eb864-59cc-4325-8276-d85e1ba90c95"
		},
		/**
		 * @enum
		 * ContactFolder
		 */
		ContactFolder: {
			/* Hidden folder to store campaign filters */
			CAMPAIGN_FILTERS: "2930c953-9a31-42ba-8aaf-8de9dca1f6b9"
		},
		/**
		 * @enum
		 * Campaign fire period
		 */
		CampaignFirePeriod: {
			/* Fifteen minutes */
			FIFTEEN_MINUTES: {
				Id: "25a96f93-8589-4ce4-99d6-1fb61250235d",
				Value: 15
			},
			/* Thirty minutes */
			THIRTY_MINUTES: {
				Id: "d9e0f4ae-acbf-4a48-8f63-e2c5255aeb50",
				Value: 30
			},
			/* One hour */
			ONE_HOUR: {
				Id: "d988f849-8ff4-40e2-a1c3-3ad49bcb41ab",
				Value: 60
			},
			/* Two hours */
			TWO_HOURS: {
				Id: "bad7502d-cf3b-460c-bf69-c2800e9de6f7",
				Value: 120
			},
			/* Three hours */
			TREE_HOURS: {
				Id: "0e05fe11-4cd0-488e-94d6-42b9fc4a3f23",
				Value: 180
			},
			/* Four hours */
			FOUR_HOURS: {
				Id: "a2dc1040-d905-4c7a-b7c2-80ab2794652d",
				Value: 240
			},
			/* One day */
			ONE_DAY: {
				Id: "f26cb87f-de31-4aad-a0fa-30ad160784f8",
				Value: 1440
			}
		},

		/**
		 * @enum
		 * Landing state
		 */
		LandingState: {
			/* Inactive */
			INACTIVE: "04ad2518-408e-45f7-8967-36f2dc9bdfa5",
			/* Active */
			ACTIVE: "fbe29614-c02c-446e-ac8c-e7f62c4899ec"
		},

		/**
		 * @enum
		 * Content blocks
		 */
		ContentBlock: {
			/* Unsubscribe */
			UNSUBSCRIBE:  "d5ab9054-1cfb-445b-a7cb-fab6cd8808e9",
			/* Unsubscribe link in mjml block */
			MJML_UNSUBSCRIBE: "cd43476a-e8da-4df0-a6a6-fb604f7e73ea"
		}
	};
});



Terrasoft.configuration.Structures["EventTrackingEnums"] = {innerHierarchyStack: ["EventTrackingEnums"]};
define("EventTrackingEnums", [],
	function() {
		return {
			/**
			 * @enum
			 * Website event type.
			 */
			WebsiteEventType: {
				/* OnClick event */
				CLICK: "599b52c9-63d2-404c-b433-0def0608f86f",
				/*OnLoadPage event */
				LOAD_PAGE: "91f91131-7edf-4238-abec-113ff689ba84"
			},

			/**
			 * @enum
			 * Selector type
			 */
			SelectorType: {
				/* by id */
				BY_ID: "777247a8-2fd9-4ced-b9cd-d65eb11c31d8",
				/* by class */
				BY_CLASS: "2e5818c1-bbdc-4bd2-be7c-a10cf6c23e5f",
				/* by jquery selector */
				BY_JQUERY_SELECTOR: "d958ef8e-4f95-468e-bfa9-0d28e00360ed"
			},

			/**
			 * @enum
			 * Start tracking response result
			 */
			StartTrackingResult: {
				/* response is ok */
				OK: 0,
				/* response when api key not found */
				APIKEY_NOT_FOUND: 1,
				/* erorr response*/
				FAIL: 3,
				/* response when syssettings is empty */
				SYSSETTING_IS_EMPTY: 6,
				/* response when service url is empty */
				SERVICEURL_IS_EMPTY: 7
			}
		};
	});



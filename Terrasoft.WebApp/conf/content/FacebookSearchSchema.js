Terrasoft.configuration.Structures["FacebookSearchSchema"] = {innerHierarchyStack: ["FacebookSearchSchema"], structureParent: "SocialSearchSchema"};
define('FacebookSearchSchemaStructure', ['FacebookSearchSchemaResources'], function(resources) {return {schemaUId:'54522531-9cba-4dfb-93a0-c4c474ed4419',schemaCaption: "Search on Facebook", parentSchemaName: "SocialSearchSchema", schemaName:'FacebookSearchSchema',parentSchemaUId:'0940d81e-1b3c-4ca8-bbb4-46f24319a472',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FacebookSearchSchema", ["FacebookSearchSchemaResources", "ConfigurationConstants", "FacebookClientUtilities",
		"ExecuteCommandRequest", "css!FacebookSearch"],
	function(resources, ConfigurationConstants) {
		return {
			mixins: {
				FacebookClientUtilities: "Terrasoft.FacebookClientUtilities"
			},
			attributes: {
				/**
				 * ####### ####, ### ######### ########### ###### ######.
				 */
				"IsGridEmpty": {
					value: true
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * ############## ######### ########### ######.
				 * @private
				 */
				initCollection: function() {
					this.set("GridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				},

				/**
				 * #########, ######## ## ###### ### ###### ####### ## ######## Facebook.
				 * @private
				 * @param {String} query ###### ### ######.
				 * @return {Boolean} ######## ## ###### ### ###### ####### ## ######## Facebook.
				 */
				isLink: function(query) {
					if (this.Ext.isEmpty(query)) {
						return false;
					}
					var regex = /((https|http):\/\/)?(www.)?(facebook.com\/)/g;
					var match = query.match(regex);
					return !this.Ext.isEmpty(match);
				},

				/**
				 * ########## ############# ############ ## ########## ###### ## Facebook.
				 * @private
				 * @param {String} url ###### ## Facebook.
				 * @return {String} ############# ############.
				 */
				parseProfileId: function(url) {
					if (this.Ext.isEmpty(url)) {
						return;
					}
					var regex;
					/* jshint ignore:start */
					//jscs:disable
					regex = /((https|http):\/\/)?(www.)?(facebook.com\/)(profile.php)?((\?)([\w\d]+=[\w\d]+&)+(id=([\d]*))|((\?)?(id=)?([\d]*)))/g;
					//jscs:enable
					/* jshint ignore:end */
					var exec = regex.exec(url);
					return (exec && (exec[10] || exec[14]));
				},

				/**
				 * ########## ############# ######### ######## ## ########## ###### ## Facebook.
				 * @private
				 * @param {String} url ###### ## Facebook.
				 * @return {String} ############# ######### ########.
				 */
				parseProfilePublicName: function(url) {
					if (this.Ext.isEmpty(url)) {
						return;
					}
					var regex = /((https|http):\/\/)?(www.)?(facebook.com\/)(profile.php)?([\w.]*)/g;
					var exec = regex.exec(url);
					return (exec && exec[6]);
				},

				/**
				 * ########## ####### ##### ## ###### ###### Facebook.
				 * @private
				 */
				onSearchFacebookButtonClick: function() {
					var facebookSearchLink = this.getFacebookSearchLink(this.get("Query"));
					window.open(facebookSearchLink, "_blank");
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.SocialSearchSchema#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initCollection();
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.SocialSearchSchema#onRender
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					this.search();
					this.hideBodyMask();
				},

				/**
				 * @inheritdoc Terrasoft.SocialSearchSchema#getSelectedItems
				 * @overridden
				 */
				getSelectedItems: function() {
					var selectedItems = this.Ext.create("Terrasoft.Collection");
					var activeRowId = this.get("ActiveRow");
					var gridData = this.get("GridData");
					var activeRow = gridData.get(activeRowId);
					activeRow.set("CommunicationType", ConfigurationConstants.CommunicationTypes.Facebook);
					selectedItems.add(activeRow);
					return selectedItems;
				},

				/**
				 * @inheritdoc Terrasoft.SocialSearchSchema#getSelectButtonEnabled
				 * @overridden
				 */
				getSelectButtonEnabled: function() {
					var activeRow = this.get("ActiveRow");
					return !this.Ext.isEmpty(activeRow);
				},

				//endregion

				//region Methods: Protected

				/**
				 * ######### #####.
				 * @protected
				 */
				search: function() {
					this.clear();
					var query = this.get("Query");
					if (this.Ext.isEmpty(query)) {
						return;
					}
					this.set("IsGridLoading", true);
					this.set("IsGridEmpty", false);
					var profileId = this.parseProfileId(query);
					var profilePage = this.parseProfilePublicName(query);
					this.getFacebookConnector(function(connector) {
						if (!this.isLink(query)) {
							var batchConfig = {
								query: query
							};
							connector.executeSearch(batchConfig, this.processSearchResults, this);
						} else if (!this.Ext.isEmpty(profileId)) {
							var searchIdConfig = {
								fields: connector.userFields,
								nodes: [profileId]
							};
							connector.getNodesData(searchIdConfig, function(response) {
								connector.parseExecuteBatchSearchResponse(response, this.processSearchResults, this);
							}, this);
						} else if (!this.Ext.isEmpty(profilePage)) {
							var searchPageConfig = {
								fields: connector.pageFields,
								nodes: [profilePage]
							};
							connector.getNodesData(searchPageConfig, function(response) {
								connector.parseExecuteBatchSearchResponse(response, this.processSearchResults, this);
							}, this);
						} else {
							this.set("IsGridLoading", false);
							this.set("IsGridEmpty", true);
						}
					}, this);
				},

				/**
				 * ############ ########## ###### ## ####### ######.
				 * @protected
				 * @param {Object} response ##### ## ####### ######.
				 */
				processSearchResults: function(response) {
					if (response.success) {
						var items = response.collection;
						var collection = this.get("GridData");
						collection.clear();
						this.set("IsGridEmpty", items.isEmpty());
						collection.loadAll(items);
					} else {
						this.set("IsGridEmpty", true);
					}
					this.set("IsGridLoading", false);
				},

				/**
				 * ####### ######## ########### ######.
				 * @protected
				 */
				clear: function() {
					this.set("ActiveRow", "");
					var collection = this.get("GridData");
					var collectionIsEmpty = collection.isEmpty();
					if (!collectionIsEmpty) {
						collection.clear();
					}
					this.set("IsGridEmpty", true);
				},

				/**
				 * ########## ###### ### ###### # Facebook.
				 * @protected
				 * @param {String} searchText ##### ### ###### # Facebook.
				 * @return {String} ###### ### ###### # Facebook.
				 */
				getFacebookSearchLink: function(searchText) {
					return "https://www.facebook.com/search/results/?q=" + encodeURI(searchText) + "&type=users";
				}

				//endregion
			},
			diff: [
				{
					"operation": "insert",
					"name": "SocialSearchResultGrid",
					"parentName": "SocialSearchResultControlGroup",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"classes": {wrapClassName: ["social-search-result-grid"]},
						"listedZebra": true,
						"itemType": this.Terrasoft.ViewItemType.GRID,
						"type": "listed",
						"primaryDisplayColumnName": "Name",
						"useListedLookupImages": true,
						"activeRow": {bindTo: "ActiveRow"},
						"selectedRows": {bindTo: "SelectedRows"},
						"columnsConfig": [
							{
								cols: 1,
								key: {
									name: "Photo",
									bindTo: "Photo",
									type: "grid-listed-icon"
								}
							},
							//{
							//	cols: 2,
							//	key: {
							//		name: "Cover",
							//		bindTo: "Cover",
							//		//type: "grid-listed-icon-fixed-32x32"
							//		type: "grid-listed-icon"
							//	}
							//},
							{
								cols: 7,
								key: {
									name: "Name",
									type: "text"
								},
								link: {"bindTo": "getNameLink"}
							},
							//{
							//	cols: 8,
							//	key: {
							//		name: "Id",
							//		type: "text"
							//	}
							//},
							{
								cols: 4,
								key: {
									name: "Category",
									bindTo: "Category",
									type: "text"
								}
							},
							{
								cols: 4,
								key: {
									name: "Web",
									bindTo: "Web",
									type: "text"
								}
							},
							{
								cols: 3,
								key: {
									name: "Phone",
									bindTo: "Phone",
									type: "text"
								}
							},
							{
								cols: 3,
								key: {
									name: "Country",
									bindTo: "Country",
									type: "text"
								}
							},
							{
								cols: 2,
								key: {
									name: "City",
									bindTo: "City",
									type: "text"
								}
							}
						],
						"captionsConfig": [
							//{
							//	cols: 1,
							//	name: "Photo"
							//},
							//{
							//	cols: 2,
							//	name: "Cover"
							//},
							{
								cols: 8,
								name: resources.localizableStrings.ResultGridNameCaption
							},
							//{
							//	cols: 8,
							//	name: "Id"
							//},
							{
								cols: 4,
								name: resources.localizableStrings.ResultGridCategoryCaption
							},
							{
								cols: 4,
								name: resources.localizableStrings.ResultGridWebCaption
							},
							{
								cols: 3,
								name: resources.localizableStrings.ResultGridPhoneCaption
							},
							{
								cols: 3,
								name: resources.localizableStrings.ResultGridCountryCaption
							},
							{
								cols: 2,
								name: resources.localizableStrings.ResultGridCityCaption
							}
						],
						"isEmpty": {"bindTo": "IsGridEmpty"},
						"isLoading": {"bindTo": "IsGridLoading"},
						"collection": {"bindTo": "GridData"}
					}
				},
				{
					"operation": "insert",
					"name": "SearchFacebookButton",
					"parentName": "QueryContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SearchFacebookButtonCaption"},
						"click": {"bindTo": "onSearchFacebookButtonClick"},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.SearchFacebookButtonImage"},
						"classes": {
							"wrapperClass": "facebook-search-button",
							"imageClass": "facebook-search-button-image"
						}
					}
				},
				{
					"operation": "insert",
					"name": "SearchHelpTextLabel",
					"parentName": "QueryContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"className": "Terrasoft.MultilineLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SearchHelpText"},
						"contentVisible": true,
						"classes": {
							"labelClass": ["help-text-label"]
						}
					}
				}
			]
		};
	});



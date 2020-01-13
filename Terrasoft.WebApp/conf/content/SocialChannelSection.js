Terrasoft.configuration.Structures["SocialChannelSection"] = {innerHierarchyStack: ["SocialChannelSection"]};
define('SocialChannelSectionStructure', ['SocialChannelSectionResources'], function(resources) {return {schemaUId:'794f2913-ed47-44da-a384-b4b0e2cd9128',schemaCaption: "Channels section", parentSchemaName: "", schemaName:'SocialChannelSection',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SocialChannelSection", ["ext-base", "terrasoft", "sandbox", "SocialChannel",
	"SocialChannelSectionStructure", "SocialChannelSectionResources", "ESNConstants"],
	function(Ext, Terrasoft, sandbox, socialChannel, structure, resources, ESNConstants) {
		structure.userCode = function() {
			var socialChannelColumnsConfig = [
				[{
					cols: 10,
					key: [{
						name: {
							bindTo: "Title"
						},
						type: "title"
					}]
				}, {
					cols: 14,
					key: [{
						name: {
							bindTo: "Description"
						}
					}]
				}]
			];
			var socialChannelCaptionsConfig = [{
				name: socialChannel.columns.Title.caption,
				cols: 10
			}, {
				name: socialChannel.columns.Description.caption,
				cols: 14
			}];
			var socialChannelLoadedColumns = [{
				columnPath: "Id"
			}, {
				columnPath: "Title"
			}, {
				columnPath: "Description"
			}];
			var socialChannelEsqConfig = {
				sort: {
					columns: [
						{
							name: "Title",
							orderPosition: 0,
							orderDirection: Terrasoft.OrderDirection.ASC
						}
					]
				}
			};

			this.entitySchema = socialChannel;
			this.name = "SocialChannelSectionViewModel";
			this.columnsConfig = socialChannelColumnsConfig;
			this.captionsConfig = socialChannelCaptionsConfig;
			this.loadedColumns = socialChannelLoadedColumns;
			this.methods.esqConfig = socialChannelEsqConfig;

			this.methods.modifyGridConfig = function(gridConfig) {
				gridConfig.activeRowActions.splice(1, 1);
			};

			this.methods.getDefView = function() {
				var activeView = this.getCustomProfileValue("activeView");
				if (!Ext.isEmpty(activeView)) {
					return activeView;
				}
				return "channelView";
			};

			this.methods.getViews = function(baseGetViews) {
				var views = baseGetViews.call(this);
				views.splice(0, 2, {
					name: "channelView",
					likeMain: true,
					caption: resources.localizableStrings.ChannelViewHeaderCaption
				}, {
					name: "subscriptionView",
					likeMain: true,
					caption: resources.localizableStrings.SubscriptionViewHeaderCaption
				});
				return views;
			};

			this.methods.modifySelectQuery = function(select) {
				var tabName = this.get("currentTabName");
				if (tabName === "subscriptionView") {
					select.filters.add("currentUserFilter",
						select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"[SocialSubscription:EntityId].SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value));
					select.filters.add("channelFilter",
						select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"[SocialSubscription:EntityId].EntitySchemaUId",
							ESNConstants.ESN.SocialChannelSchemaUId));
				}
			};

		};
		return structure;
	});



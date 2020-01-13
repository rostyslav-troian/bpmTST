Terrasoft.configuration.Structures["AccountBillingInfoDetail"] = {innerHierarchyStack: ["AccountBillingInfoDetail"]};
define('AccountBillingInfoDetailStructure', function() {return {type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){}};});
define("AccountBillingInfoDetail", ['AccountBillingInfo',
	"AccountBillingInfoDetailStructure"],
	function(AccountBillingInfo, structure) {
		structure.userCode = function() {
			this.entitySchema = AccountBillingInfo;
			this.name = 'AccountBillingInfoDetailViewModel';
			this.editPageName = 'AccountBillingInfoPage';
			this.typeColumn = "Type";
			this.columnsConfig = [
				[
					{
						cols: 8,
						key: [
							{
								name: {
									bindTo: 'Name'
								},
								type: 'title'
							}
						]
					},
					{
						cols: 16,
						key: [
							{
								name: {
									bindTo: 'BillingInfo'
								}
							}
						]
					}
				]
			];
			this.loadedColumns = [
				{
					columnPath: 'Name'
				},
				{
					columnPath: 'BillingInfo'
				}
			];
			this.methods.setEntitySchema = function() {
				this.entitySchema = AccountBillingInfo;
			};

		};
		return structure;
	});



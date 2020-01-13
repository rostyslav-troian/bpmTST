Terrasoft.configuration.Structures["MobileContactAddressModelConfig"] = {innerHierarchyStack: ["MobileContactAddressModelConfig"]};
Terrasoft.sdk.Model.addBusinessRule("ContactAddress", {
	name: "ContactAddressRequirementRule",
	ruleType: Terrasoft.RuleTypes.Requirement,
	requireType: Terrasoft.RequirementTypes.OneOf,
	triggeredByColumns: ["Address", "City", "Country"],
	position: 3
});

Terrasoft.sdk.Model.addBusinessRule("ContactAddress", {
	name: "ContactAddressMutualFiltrationRule",
	ruleType: Terrasoft.RuleTypes.MutualFiltration,
	triggeredByColumns: ["Country", "Region", "City"],
	connections: [
		{
			parent: "Country",
			child: "City"
		},
		{
			parent: "Country",
			child: "Region"
		},
		{
			parent: "Region",
			child: "City"
		}
	]
});

Terrasoft.sdk.Model.setAlternativePrimaryDisplayColumnValueFunc("ContactAddress", function(record) {
	var country = record.get("Country");
	var countryValue = (!Ext.isEmpty(country)) ? country.getPrimaryDisplayColumnValue() : "";
	var city = record.get("City");
	var cityValue = (!Ext.isEmpty(city)) ? city.getPrimaryDisplayColumnValue() : "";
	var address = record.get("Address");
	var value = (!Ext.isEmpty(countryValue)) ? countryValue + ", " : "";
	value += (!Ext.isEmpty(cityValue)) ? cityValue + ", " : "";
	value += (!Ext.isEmpty(address)) ? address + ", " : "";
	return value.substring(0, value.length - 2);
});

Terrasoft.sdk.Model.addBusinessRule("ContactAddress", {
	name: "ContactAddressFiltrationRule",
	ruleType: Terrasoft.RuleTypes.Filtration,
	triggeredByColumns: ["AddressType"],
	position: 2,
	filters: Ext.create("Terrasoft.Filter", {
		type: Terrasoft.FilterTypes.Group,
		subfilters: [
			Ext.create("Terrasoft.Filter", {
				property: "ForContact",
				value: true
			})
		],
		name: "a4365c55-b393-4e26-be5f-ee0e6a7faa8c"
	})
});



define("Account", ["terrasoft", "ext-base", "AccountResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Account", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Account",
			singleton: true,
			uId: "25d7c1ab-1de0-4501-b402-02e0e5a72d6e",
			name: "Account",
			caption: resources.localizableStrings.AccountCaption,
			administratedByRecords: true,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			primaryImageColumnName: "AccountLogo",
			columns: {
				Id: {
					uId: "ae0e45ca-c495-4fe7-a39d-3ab7278e1617",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				Name: {
					uId: "7c81a01e-f59b-47df-830c-8e830f1bf889",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Owner: {
					uId: "7c85a229-8cfa-4c29-8ab9-9463560a92ec",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				CreatedOn: {
					uId: "e80190a5-03b2-4095-90f7-a193a960adee",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				CreatedBy: {
					uId: "ebf6bb93-8aa6-4a01-900d-c6ea67affe21",
					name: "CreatedBy",
					caption: resources.localizableStrings.CreatedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				ModifiedOn: {
					uId: "9928edec-4272-425a-93bb-48743fee4b04",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				ModifiedBy: {
					uId: "3015559e-cbc6-406a-88af-07f7930be832",
					name: "ModifiedBy",
					caption: resources.localizableStrings.ModifiedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Ownership: {
					uId: "dedb8f3b-4cb0-46ec-99e8-483ab92e10bb",
					name: "Ownership",
					caption: resources.localizableStrings.OwnershipCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountOwnership",
					referenceSchema: {
						name: "AccountOwnership",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PrimaryContact: {
					uId: "165072a8-b718-4490-ab89-223f30390d81",
					name: "PrimaryContact",
					caption: resources.localizableStrings.PrimaryContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Parent: {
					uId: "f25a5087-fab6-4c7a-9cd0-177325f6e715",
					name: "Parent",
					caption: resources.localizableStrings.ParentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Industry: {
					uId: "d7da954f-d0d8-4eca-a2b4-7d4f7121f6b4",
					name: "Industry",
					caption: resources.localizableStrings.IndustryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountIndustry",
					referenceSchema: {
						name: "AccountIndustry",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Code: {
					uId: "60cc5643-4ee2-4adf-b76b-06000ad0b067",
					name: "Code",
					caption: resources.localizableStrings.CodeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Type: {
					uId: "d60a9c06-1170-4cd6-9dc1-c972bc451533",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountType",
					referenceSchema: {
						name: "AccountType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Phone: {
					uId: "9dbe8164-58b4-42c9-a75e-7c568d430d50",
					name: "Phone",
					caption: resources.localizableStrings.PhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				AdditionalPhone: {
					uId: "9411651f-b785-4920-a542-e8ac11d2cf8d",
					name: "AdditionalPhone",
					caption: resources.localizableStrings.AdditionalPhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Fax: {
					uId: "40bf89ca-5927-47a6-b3fe-8955deb5f3ce",
					name: "Fax",
					caption: resources.localizableStrings.FaxCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Web: {
					uId: "a1d2ad98-d068-4fc2-8454-8a7c944cd0a1",
					name: "Web",
					caption: resources.localizableStrings.WebCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				AddressType: {
					uId: "9f5af167-9ab8-4c83-99db-7503df0eb650",
					name: "AddressType",
					caption: resources.localizableStrings.AddressTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AddressType",
					referenceSchema: {
						name: "AddressType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Address: {
					uId: "8cfabb54-64ca-413d-a4e0-81ce9d2f0c8f",
					name: "Address",
					caption: resources.localizableStrings.AddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				City: {
					uId: "13bbd624-a13b-4bc2-b05c-fff21e9f7b92",
					name: "City",
					caption: resources.localizableStrings.CityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "City",
					referenceSchema: {
						name: "City",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Region: {
					uId: "8f532bba-53fb-4f56-babd-38402cb57b2a",
					name: "Region",
					caption: resources.localizableStrings.RegionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Region",
					referenceSchema: {
						name: "Region",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Zip: {
					uId: "3fe38c61-ff55-4012-b28d-67e59d5b1986",
					name: "Zip",
					caption: resources.localizableStrings.ZipCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 50
				},
				Country: {
					uId: "2a7c00bd-0519-4742-b905-d8ce5f1b70ca",
					name: "Country",
					caption: resources.localizableStrings.CountryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Country",
					referenceSchema: {
						name: "Country",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AccountCategory: {
					uId: "0039b8f7-f5cf-44c9-8828-4b9cb2fd6634",
					name: "AccountCategory",
					caption: resources.localizableStrings.AccountCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountCategory",
					referenceSchema: {
						name: "AccountCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				EmployeesNumber: {
					uId: "8696b76a-1f0b-42a4-8279-934399c0207f",
					name: "EmployeesNumber",
					caption: resources.localizableStrings.EmployeesNumberCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountEmployeesNumber",
					referenceSchema: {
						name: "AccountEmployeesNumber",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Position"
					}
				},
				AnnualRevenue: {
					uId: "a006d013-4ef6-47a1-a000-d25346fcb392",
					name: "AnnualRevenue",
					caption: resources.localizableStrings.AnnualRevenueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountAnnualRevenue",
					referenceSchema: {
						name: "AccountAnnualRevenue",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "FromBaseCurrency"
					}
				},
				Notes: {
					uId: "0136fb47-c018-4b7f-8ed3-0eb6bd686b20",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Logo: {
					uId: "c8abae85-5c2e-45bc-826b-fd53a88660c8",
					name: "Logo",
					caption: resources.localizableStrings.LogoCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				AlternativeName: {
					uId: "e36ae687-347d-4bf7-b260-90129862e357",
					name: "AlternativeName",
					caption: resources.localizableStrings.AlternativeNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				GPSN: {
					uId: "f1f01f71-ddef-48bb-bc88-0fd2f3526ad9",
					name: "GPSN",
					caption: resources.localizableStrings.GPSNCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				GPSE: {
					uId: "2ce4d59d-2ae4-4840-b4a7-33eee33fdb60",
					name: "GPSE",
					caption: resources.localizableStrings.GPSECaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				Completeness: {
					uId: "58210e36-46cd-4a12-934c-c97e96ed4160",
					name: "Completeness",
					caption: resources.localizableStrings.CompletenessCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				PriceList: {
					uId: "fa768c13-2032-4055-9f11-4f0607f993b3",
					name: "PriceList",
					caption: resources.localizableStrings.PriceListCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Pricelist",
					referenceSchema: {
						name: "Pricelist",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AccountLogo: {
					uId: "27a77271-50e0-436f-a559-38ce3f8f7f37",
					name: "AccountLogo",
					caption: resources.localizableStrings.AccountLogoCaption,
					dataValueType: Terrasoft.DataValueType.IMAGELOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SysImage",
					referenceSchema: {
						name: "SysImage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.Account;
	});
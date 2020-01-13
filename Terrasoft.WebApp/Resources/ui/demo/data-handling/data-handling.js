define("data-handling", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		getContactSelect: function() {

//			var filters = Ext.create('Terrasoft.FilterGroup');
//			filters.rootSchemaName = 'Contact';
//   filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 'Name', 'John'));
//			var subGroup1 = Ext.create('Terrasoft.FilterGroup');
//			subGroup1.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.START_WITH, 'Phone', '1'));
//			subGroup1.addItem(Terrasoft.createColumnIsNotNullFilter('Type.CreatedBy'));
//			subGroup1.addItem(Terrasoft.createExistsFilter('[Account:Owner:Id].Id'));
//			subGroup1.addItem(Terrasoft.createColumnInFilterWithParameters('Owner',
//				['d184ed0e-31ca-478d-b7de-792e14602f5d', '29248f50-deb6-4445-b5e5-a73f986426be']));
//			filters.addItem(subGroup1);
//			Terrasoft.DataProvider.getFiltersMetaData(filters, function(result) {
//				debugger;
//			}, this);

			var select = Ext.create('Terrasoft.EntitySchemaQuery', {
				rootSchemaName: "Contact"
			});
			//select.addColumn("Id");
			select.addColumn("Phone");
			select.addColumn("BirthDate");
			select.addColumn("ModifiedOn");
			select.addColumn("Account.City");
			select.addFunctionColumn("Photo32", Terrasoft.FunctionType.LENGTH, "PhotoLength");
			select.addColumn("Photo32");
			var column = select.addColumn("Name");
			//select.isDistinct = true;
			column.orderDirection = Terrasoft.core.enums.OrderDirection.ASC;
			column.orderPosition = 1;
			column = select.addColumn("Account");
			column.orderDirection = Terrasoft.core.enums.OrderDirection.DESC;
			column.orderPosition = 2;
			return select;
		},

		getAggregationSelect: function() {
			var select = Ext.create('Terrasoft.EntitySchemaQuery', {
				rootSchemaName: "Contact"
			});
			var column = Ext.create("Terrasoft.FunctionQueryColumn", {
				functionType: Terrasoft.FunctionType.AGGREGATION,
				aggregationType: Terrasoft.AggregationType.COUNT,
				functionArgument: Ext.create("Terrasoft.FunctionExpression", {
					functionType: Terrasoft.FunctionType.DATE_PART,
					datePartType: Terrasoft.DatePartType.MONTH,
					functionArgument: Ext.create("Terrasoft.ColumnExpression", {
						columnPath: "CreatedOn"
					})
				})
			});
			select.addColumn(column, "Phone");
			select.addDatePartFunctionColumn("CreatedOn", Terrasoft.DatePartType.MONTH, "ModifiedOn").orderPosition = 1;
			select.filters.addItem(Terrasoft.createDatePartColumnFilter(Terrasoft.ComparisonType.EQUAL,
				"CreatedOn", Terrasoft.DatePartType.YEAR, 2012));
			select.getEntityCollection(function(records) {
				debugger;
				this.renderResults(records.collection.getItems());
			}, this);
		},

		getEntityCollection: function() {
			var select = this.getContactSelect();
			select.filters = this.createFiters();
			select.getEntityCollection(function(records) {
				this.renderResults(records.collection.getItems());
			}, this);
		},

		getEntity: function(primaryColumnValue) {
			var select = this.getContactSelect();
			select.getEntity(primaryColumnValue, this.renderResults, this);
		},

		insertData: function() {
			var name = Ext.fly('insert-name-edit').dom.value;
			var phone = Ext.fly('insert-phone-edit').dom.value;
			var birthDate = Ext.fly('insert-birthdate-edit').dom.value;
			birthDate = Ext.Date.parseDate(birthDate, "c", false);

			var insert = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: 'Contact'
			});
			if(!Ext.isEmpty(name)) {
				insert.setParameterValue("Name", name);
			}
			if(!Ext.isEmpty(phone)) {
				insert.setParameterValue("Phone", phone);
			}
			if(!Ext.isEmpty(birthDate)) {
				insert.setParameterValue("BirthDate", birthDate);
			}
			insert.execute(function(response) {
				this.getEntity(response.id);
			});
		},

		updateData: function() {
			var id = Ext.fly('update-id-edit').dom.value;
			var name = Ext.fly('update-name-edit').dom.value;
			var phone = Ext.fly('update-phone-edit').dom.value;
			var birthDate = Ext.fly('update-birthdate-edit').dom.value;
			birthDate = Ext.Date.parseDate(birthDate, "c", false);

			if(Ext.isEmpty(id)) {
				alert('Id изменяемой записи должен быть проставлен');
				return;
			}
			var update = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "Contact"
			});
			if(!Ext.isEmpty(name)) {
				update.setParameterValue("Name", name);
			}
			if(!Ext.isEmpty(phone)) {
				update.setParameterValue("Phone", phone);
			}
			if(!Ext.isEmpty(birthDate)) {
				update.setParameterValue("BirthDate", birthDate);
			}

			update.enablePrimaryColumnFilter(id);
			update.execute(function(response) {
				this.getEntityCollection();
			});
		},

		deleteData: function() {
			var query = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName: "Contact"
			});
			query.filters = createFiters();
			query.execute(function(response) {
				this.getEntityCollection();
			});
		},

		renderResults: function(records) {
			var template = new Ext.XTemplate(
				'<table class="data-table">',
				'<thead><tr class="data-table-header">' +
					'<td id="Id">Id</td><td id="Name">Имя</td><td id="Phone">Телефон</td>' +
					'<td id="BirthDate">Дата рождения</td>' +
					'<td id="ModifiedOn">ModifiedOn</td>' +
					'<td id="Account">Контрагент</td>' +
					'<td id="PhotoLenght">Фото</id>' +
					'<td id="Photo32">Фото (данные)</id>' +
					'</tr></thead>',
				'<tbody>',
				'<tpl for=".">',
				'<tr id="gen-row{#}" class="data-table-row {[xindex % 2 === 0 ? "even" : "odd"]} ">' +
					'<td>{[values.values.Id]}</td>' +
					'<td>{[values.values.Name]}</td>' +
					'<td>{[values.values.Phone]}</td>' +
					'<td>{[values.values.BirthDate]}</td>' +
					'<td>{[values.values.ModifiedOn]}</td>' +
					'<td>{[values.values.Account.displayValue]}</td>' +
					'<td>{[values.values.PhotoLength]}</td>' +
					'<td>{[values.values.Photo32]}</td>' +
					'</tr>',
				'</tpl>',
				'</tbody></table>'
			);
			template.compile();
			var windowBody = Ext.DomQuery.selectNode('#Result');
			windowBody.innerHTML = '';
			template.append(windowBody, records, false);
		},

		createFiters: function() {
			var filters = Ext.create("Terrasoft.FilterGroup");
			var el = this.el;
			if(!el('enable-all-filters').checked) {
				return filters;
			}
			if(el('enable-name-filter').checked) {
				var compareType = Terrasoft.ComparisonType.CONTAIN;
				if(el('enable-name-startwith-filter').checked) {
					compareType = Terrasoft.ComparisonType.START_WITH;
				}
				if(el('enable-name-endwith-filter').checked) {
					compareType = Terrasoft.ComparisonType.END_WITH;
				}
				filters.addItem(Terrasoft.createColumnFilterWithParameter(compareType, el('column-path-edit').value, el("name-edit").value));
			}
			if(el('enable-between-filter').checked) {
				alert('Between Filter Demo Not Implemented!');
			}
			if(el('enable-exists-filter').checked) {
				var existsFilter = Terrasoft.createExistsFilter(el("exists-edit").value);
				existsFilter.subFilters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, 'Name', '987wwwww'));
				existsFilter.subFilters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.START_WITH, 'Name', '98'));
				filters.addItem(existsFilter);
			}
			if (el('enable-idlist-filter').checked) {
				var id = el('idlist-edit').value;
				var ids = id.split('\n');
				for (var item in ids) {
					ids[item] = ids[item].trim();
				}
				filters.addItem(Terrasoft.createColumnInFilterWithParameters("Id", ids));
			}
			return filters;
		},

		serializeFilters: function(){
			var filters = this.createFiters();
			var json = filters.serialize();
			lastfilter = json;
			this.el('Result').innerText = json;
		},

		el: function(elementId) {
			return Ext.fly(elementId).dom;
		},

		getFromDate: function() {
			var fromDate = this.el('between-from-date-edit').value;
			var fromTime = this.el('between-from-time-edit').value;
		}
	};
});
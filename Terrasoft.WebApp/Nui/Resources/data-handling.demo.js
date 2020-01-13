define("data-handling-demo",["ext-base", "terrasoft", "sandbox"], function(Ext, Terrasoft, sandbox) {
	function getContactSelect() {
		var select = Ext.create('Terrasoft.EntitySchemaQuery', {
			rootSchema: Terrasoft.ContactEntitySchema
		});
		select.addColumn("Id");
		select.addColumn("Phone");
		select.addColumn("BirthDate");
		select.addColumn("ModifiedOn");
		select.addColumn("Account.City");
		select.addFunctionColumn("Photo", Terrsoft.FunctionType.LENGTH, "PhotoLength");
		var column = select.addColumn("Name");
		column.orderDirection = Terrasoft.core.enums.OrderDirection.ASC;
		column.orderPosition = 1;
		column = select.addColumn("Account");
		column.orderDirection = Terrasoft.core.enums.OrderDirection.DESC;
		column.orderPosition = 2;
		return select;
	}

	function getEntityCollection() {
		var select = getContactSelect();
		select.filters = createFiters();
		select.getEntityCollection(function(records) {
			renderResults(records.collection.getItems());
		}, this);
	}

	function getEntity(primaryColumnValue) {
		var select = getContactSelect();
		select.getEntity(primaryColumnValue, renderResults, this);
	}

	function insertData() {
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
			getEntity(response.id);
		});
	}

	function updateData() {
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
			rootSchema: Terrasoft.ContactEntitySchema
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
			getEntityCollection();
		});
	}

	function deleteData() {
		var query = Ext.create("Terrasoft.DeleteQuery", {
			rootSchema: Terrasoft.ContactEntitySchema
		});
		query.filters = createFiters();
		query.execute(function(response) {
			getEntityCollection();
		});
	}

	window.breakTest = false;
	function highLoadTest(count) {
		var successText = el('successText');
		var failText = el('failText');
		//innerText

		count++;
		var select = getContactSelect();
		select.cacheItemName = 'highLoadTest';
		select.getEntityCollection(function(records) {
			successText.innerText = count;
		}, this);
		if(window.breakTest) {
			return;
		}
		window.setTimeout(function() {
			highLoadTest(count)
		}, 3);
//	var contact = new Terrasoft.ContactMock();//new Ext.create('Terrasoft.BaseViewModel', { entitySchema: Terrasoft.ContactEntitySchema});
//	contact.loadEntity("223a2b12-343c-4625-8524-1b698f47e883",
//		function() {
//			successText.innerText = contact.get("Name");
//		},
//		this);
//	failText.innerText = contact.get("Name");
	}

	function breakHighLoadTest() {
		window.breakTest = true;
	}

	function renderResults(records) {
		var template = new Ext.XTemplate(
			'<table class="data-table">',
			'<thead><tr class="data-table-header">' +
				'<td id="Id">Id</td><td id="Name">Имя</td><td id="Phone">Телефон</td>' +
				'<td id="BirthDate">Дата рождения</td>' +
				'<td id="ModifiedOn">ModifiedOn</td>' +
				'<td id="Account">Контрагент</td>' +
				'<td id="PhotoLenght">Фото</id>' +
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
				'<td>{[values.values.PhotoLenght]}</td>' +
				'</tr>',
			'</tpl>',
			'</tbody></table>'
		);
		template.compile();
		var windowBody = Ext.DomQuery.selectNode('#Result');
		windowBody.innerHTML = '';
		template.append(windowBody, records, false);
	}

	function createFiters() {
		var filters = Ext.create("Terrasoft.Filters");
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
			filters.addItem(filters.createColumnFilterWithParameter(compareType, el('column-path-edit').value, el("name-edit").value));
		}
		if(el('enable-between-filter').checked) {

		}
		if(el('enable-exists-filter').checked) {
			filters.addItem(filters.createExistsFilter(el("exists-edit").value));
		}
		if(el('enable-idlist-filter').checked) {
			var id = el('idlist-edit').value;
			var ids = id.split('\n');
			for (var item in ids) {
				ids[item] = ids[item].trim();
			}
			filters.addItem(filters.createColumnInFilterWithParameters("Id", ids));
		}
		return filters;
	}

	function el(elementId) {
		return Ext.fly(elementId).dom;
	}

	function getFromDate() {
		var fromDate = el('between-from-date-edit').value;
		var fromTime = el('between-from-time-edit').value;
	}
});
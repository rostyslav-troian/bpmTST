﻿Terrasoft.configuration.Structures["ActivityUtilities"] = {innerHierarchyStack: ["ActivityUtilities"]};
define("ActivityUtilities", ['ext-base', 'terrasoft', 'ConfigurationConstants'],
	function(Ext, Terrasoft, ConfigurationConstants) {

		function customizeView(scope, viewModel, loadCardViewCallback, resources) {
			var allowedResults = viewModel.get('AllowedResult');
			var isCustomResults = allowedResults && allowedResults.length > 0;
			viewModel.set('isResultGroupVisible', isCustomResults);
			viewModel.set('isStatusGroupVisible', !isCustomResults);
			if (isCustomResults) {
				//viewModel.set('resultSelected', false);
				allowedResults = Ext.decode(viewModel.get('AllowedResult'));
				var select = Ext.create('Terrasoft.EntitySchemaQuery', {
					rootSchemaName: 'ActivityResult'
				});
				select.addColumn('Id');
				select.addColumn('Name');
				select.addColumn('Category');
				select.getEntityCollection(function(response) {
					var responseCollection = response.collection.collection;
					if (responseCollection.length > 0) {
						var allowedResultConfig = [];
						var neutralCategory = ConfigurationConstants.Activity.ResultCategory.Neutral.toLowerCase();
						var failCategory = ConfigurationConstants.Activity.ResultCategory.Fail.toLowerCase();
						Terrasoft.each(allowedResults, function(allowedResult) {
							var color = 'green';
							var index = 0;
							var activityResult = responseCollection.map[allowedResult];
							var resultCategory = activityResult.values.Category.value;
							if (Ext.isEmpty(resultCategory)) {
								resultCategory = neutralCategory;
							} else {
								resultCategory = resultCategory.toLowerCase();
							}
							if (resultCategory === failCategory) {
								color = 'red';
								index = 2;
							} else if (resultCategory === neutralCategory) {
								color = 'grey';
								index = 1;
							}
							allowedResultConfig.push({
								resultId: allowedResult,
								caption: activityResult.values.Name,
								color: color,
								index: index
							});
						}, this);
						var resultContainerIndex = 2;
						var resultContainer =
							Ext.getCmp('autoGeneratedLeftContainer').items.items[resultContainerIndex];
						resultContainer.items.items[0].add(Ext.create('Terrasoft.Container',
							GetAllowedResultConfig(allowedResultConfig, resources)));
						resultContainer.bind(viewModel);
						loadCardViewCallback();
					}
				}, this);
			} else {
				loadCardViewCallback();
			}
		}

		function GetAllowedResultConfig(allowedResults, resources) {
			var config = {
				className: 'Terrasoft.Container',
				id: 'custom-results-container',
				selectors: {
					wrapEl: '#custom-results-container'
				},
				items: []
			};
			var i = 1;
			var statusCancel = ConfigurationConstants.Activity.Status.Cancel;
			var statusDone = ConfigurationConstants.Activity.Status.Done;
			allowedResults.sort(function(a, b) {
				var comparer = a.index - b.index;
				if (comparer === 0) {
					if (a.caption < b.caption) {
						comparer = -1;
					} else if (a.caption > b.caption) {
						comparer = 1;
					}
				}
				return comparer;
			});
			Terrasoft.each(allowedResults, function(allowedResult) {
				var categoryColor = allowedResult.color;
				var statusId = categoryColor === 'red' ? statusCancel : statusDone;
				var iconUrl = Terrasoft.ImageUrlBuilder.getUrl(
					resources.localizableImages[categoryColor + 'ResultIcon']);
				config.items.push({
					className: 'Terrasoft.Container',
					id: 'custom-result-item-container' + i,
					selectors: {
						wrapEl: '#custom-result-item-container' + i
					},
					styles: {
						wrapStyles: {
							'margin-bottom': '9px'
						}
					},
					items: [
						{
							className: 'Terrasoft.Button',
							caption: allowedResult.caption,
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							imageConfig: {
								source: Terrasoft.ImageSources.URL,
								url: iconUrl
							},
							click: {
								bindTo: 'resultButtonClick'
							},
							visible: {
								bindTo: 'resultSelected',
								bindConfig: {
									converter: function(value) {
										var groupVisible = this.get('isResultGroupVisible');
										var resultId = allowedResult.resultId;
										return groupVisible && (!value || (this.get('Result').value === resultId));
									}
								}
							},
							tag: '{"result": {"value": "' + allowedResult.resultId + '"},' + '"status": {"value": "' +
								statusId + '"}}'
						}
					]
				});
				i++;
			}, this);
			config.items.push({
				className: 'Terrasoft.Label',
				visible: {
					bindTo: 'resultSelected'
				},
				caption: resources.localizableStrings.DetailedResultCaption,
				classes: {
					labelClass: 'controlCaption'
				}
			});
			config.items.push({
				className: 'Terrasoft.MemoEdit',
				height: '77px',
				visible: {
					bindTo: 'resultSelected'
				},
				value: {
					bindTo: 'DetailedResult'
				}
			});
			config.items.push({
				className: 'Terrasoft.Container',
				id: 'detailResultControlsContainer',
				classes: ['utils-left'],
				selectors: {
					wrapEl: '#detailResultControlsContainer'
				},
				items: [
					{
						className: 'Terrasoft.Button',
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: resources.localizableStrings.OkResultButtonCaption,
						click: {
							bindTo: 'save'
						},
						visible: {
							bindTo: 'resultSelected'
						}
					},
					{
						className: 'Terrasoft.Button',
						caption: resources.localizableStrings.CancelResultButtonCaption,
						click: {
							bindTo: 'cancelResultSelected'
						},
						visible: {
							bindTo: 'resultSelected'
						}
					}
				]
			});
			return config;
		}

		return {
			customizeView: customizeView
		};

	});



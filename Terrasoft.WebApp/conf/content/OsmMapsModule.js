Terrasoft.configuration.Structures["OsmMapsModule"] = {innerHierarchyStack: ["OsmMapsModule"]};
define("OsmMapsModule", ["OsmMapsModuleResources", "MapsUtilities", "ModalBox", "MapsHelper",
			"BaseSchemaModuleV2", "Leaflet", "css!Leaflet", "css!OsmMapsModule"],
		function(resources, MapsUtilities, ModalBox, MapsHelper) {
			/**
			 * ###### ### ###### # Leaflet. ## ######### window.L.
			 * @type {Object}
			 */
			var L = window.L;
			/**
			 * @class Terrasoft.configuration.OsmMapsModule.
			 * ##### MapsModule ############ ### ######## ###### #### OpenStreetMap.
			 */
			Ext.define("Terrasoft.configuration.OsmMapsModule", {
				alternateClassName: "Terrasoft.OsmMapsModule",
				extend: "Terrasoft.BaseModule",
				Ext: null,
				sandbox: null,
				Terrasoft: null,
				/**
				 * Map container unique identifier.
				 * @type {String}.
				 */
				mapContainerId: "maps-container-" + Terrasoft.generateGUID(),

				/**
				 * Initialize module.
				 */
				init: function() {
					var mapData = this.sandbox.publish("GetMapsConfig", null, [this.sandbox.id]);
					var viewModel = this.Ext.create("Terrasoft.BaseViewModel", this.generateViewModel());
					viewModel.setLocationDebounce = Terrasoft.debounce(viewModel.setLocation, 200);
					if (mapData) {
						viewModel.set("IsModalBox", mapData.isModalBox);
						viewModel.set("RenderTo", mapData.renderTo);
						viewModel.setLocationDebounce(mapData);
					}
					this.subscribeSandboxEvents.call(viewModel);
				},

				/**
				 * Subscribes on sandbox events.
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("SetMapsConfig", function(mapData) {
						this.set("Markers", []);
						if (mapData.normalizeSizeMap) {
							this.normalizeSizeMap();
						} else {
							this.setLocationDebounce(mapData);
						}
					}, this, [this.sandbox.id]);
				},

				/**
				 * Generates view for maps module.
				 * @param {Object} renderTo Render container.
				 * @return {Object} View.
				 */
				generateView: function(renderTo) {
					var view = {
						renderTo: renderTo,
						id: "osm-maps",
						selectors: {
							wrapEl: "#osm-maps"
						},
						classes: {
							wrapClassName: ["osm-maps-class"]
						},
						items: [
							{
								className: "Terrasoft.Label",
								caption: {bindTo: "HeadMessage"},
								labelClass: "head-label-user-class",
								visible: {bindTo: "IsModalBox"}
							},
							{
								className: "Terrasoft.Button",
								imageConfig: resources.localizableImages.CloseIcon,
								style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								classes: {wrapperClass: "close-btn-user-class"},
								click: {bindTo: "onClickCloseMap"},
								visible: {bindTo: "IsModalBox"}
							},
							{
								className: "Terrasoft.Container",
								id: this.mapContainerId,
								selectors: {wrapEl: "#" + this.mapContainerId},
								classes: {wrapClassName: ["maps-container-class"]},
								items: []
							}
						]
					};
					return view;
				},

				/**
				 * Generates map view model.
				 * @return {Object} Map view model.
				 */
				generateViewModel: function() {
					var finallyRender = this.finallyRender;
					var viewModel = {
						values: {
							/**
							 * ######## #####, ### ########### # ###### ###### #### #####.
							 * @type {String}.
							 */
							MapAttribution: "Map data &copy; <a href=" + "http://openstreetmap.org" +
							">OpenStreetMap</a>" + " contributors, <a href=" +
							"http://creativecommons.org/licenses/by-sa/2.0/>" + "CC-BY-SA</a>",
							/**
							 * Url ###### (######) #####.
							 * @type {String}.
							 */
							MapTiles: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
							/**
							 * #######, ########## ######### ######.
							 * @type {Boolean}.
							 */
							IsRendered: false,
							/**
							 * #######, ############# ########## ####.
							 * @type {Boolean}.
							 */
							IsModalBox: false,
							/**
							 * ###### ######## # ############ ### ########## # ####.
							 */
							SaveMapsData: null,
							/**
							 * ###### ######## ### ########### ## #####.
							 * @type {Array}.
							 */
							MapsData: [],
							/**
							 * ###### ######## ### ########### ## #####.
							 * @type {Array}.
							 */
							Markers: [],
							/**
							 * ###### ### ######### ######.
							 * @type {Object}.
							 */
							RenderTo: null,
							/**
							 * ###### ## ###### Leaflet #####.
							 * @type {Object}.
							 */
							LeafletMap: null,
							/**
							 * ###### ## ###### Leaflet ###### ########.
							 * @type {Object}.
							 */
							LeafletGroup: null,
							/**
							 * ######## #### ##### ## #########.
							 * @type {Number}.
							 */
							ScaleSize: 13,
							/**
							 * ######## ###### ####### ### ########## ###########.
							 * @type {Number}.
							 */
							ShiftLength: 0.00003,
							/**
							 * Map container unique identifier.
							 * @type {String}.
							 */
							MapContainerId: this.mapContainerId
						},
						methods: {
							Ext: Ext,
							Terrasoft: Terrasoft,
							sandbox: this.sandbox,
							setLocationDebounce: null,
							/**
							 * Module parent scope.
							 */
							parentScope: this,

							/**
							 * ############ ############# ###### ####.
							 * @param viewModel ######## ###### ############# ####.
							 */
							finallyRender: finallyRender,

							/**
							 * ########## ####### ###### #######.
							 */
							onClickCloseMap: function() {
								ModalBox.close();
							},

							/**
							 * ############# ########### ##### ## ###########.
							 * @param {Array} mapData ####### ###### ### ########### ## #####.
							 */
							setLocation: function(mapData) {
								var mapsItems = [];
								if (this.Ext.isEmpty(mapData)) {
									MapsHelper.hideMask();
									this.showInformationDialog(resources.localizableStrings.DataWithoutAddresses);
									return;
								}
								Terrasoft.chain(
										function(next) {
											this.set("MapsData", mapData.mapsData);
											if (this.checkMapsData(mapsItems, mapData)) {
												next();
											}
										},
										function(next) {
											if (!this.Ext.isEmpty(mapsItems)) {
												if (this.get("IsRendered")) {
													MapsHelper.showMask(true);
												}
												this.getCoordinates(mapsItems, function() {
													var marker = this.get("Markers")[0];
													var gpsData = marker[0];
													var geoObject = {
														lat: gpsData.lat,
														lng: gpsData.lon
													};
													this.sendCoordinates(geoObject);
													next();
												});
											} else {
												next();
											}
										},
										function(next) {
											this.finallyRender.call(this.parentScope, this);
											next();
										},
										function(next) {
											if (mapData.useCurrentUserLocation) {
												var locationView = this.getLocationFromMarkers();
												this.renderMap(next, locationView);
											} else {
												this.renderMap(next);
											}
											MapsHelper.hideMask();
											next();
										},
										function() {
											this.saveLocationCoordinates();
										},
										this);
							},

							/**
							 * ######### ###### ### ########### ## ##### ## ############# ######.
							 * ######### ###### ###### # ############# ########.
							 * @param {Array} mapsItems ######, ####### ##### ########## ## #####.
							 * @param {Array} mapData ####### ###### ### ########### ## #####.
							 * @return {Boolean} ######### ######## ############# ######.
							 */
							checkMapsData: function(mapsItems, mapData) {
								if (mapData.useDefaultLocation) {
									this.finallyRender.call(this.parentScope, this);
									this.renderMap(null, [0, 0]);
									MapsHelper.hideMask();
									return false;
								}
								Terrasoft.each(mapData.mapsData, function(item) {
									if (!this.Ext.isEmpty(item.address) || item.isCoordsItem) {
										if (item.gpsN && item.gpsE) {
											var geoObject = [
												{
													lat: item.gpsN,
													lon: item.gpsE
												}
											];
											geoObject.content = item.content;
											geoObject.useDragMarker = item.useDragMarker;
											geoObject.markerIcon = item.markerIcon;
											this.addMarker(geoObject);
										} else {
											mapsItems.push(item);
										}
									}
								}, this);
								var markers = this.get("Markers") || [];
								if (mapsItems.length === 0 && markers.length === 0) {
									this.showInformationDialog(resources.localizableStrings.DataWithoutAddresses);
									MapsHelper.hideMask();
									return false;
								}
								return true;
							},

							/**
							 * ########## ########## ####### #######.
							 * @return {Array} ########## ####### #######.
							 */
							getLocationFromMarkers: function() {
								var markers = this.get("Markers");
								if (Ext.isEmpty(markers)) {
									return [0, 0];
								}
								var marker = markers[0];
								return [marker[0].lat, marker[0].lon];
							},

							/**
							 * ######## ########## ## #### #######.
							 * @param {Array} items ###### ### ########### ## #####.
							 * @param {Function} callback ####### #### #########.
							 */
							getCoordinates: function(items, callback) {
								var item = items[0];
								this.getGeoObject(item, item.address, function(geoObjects) {
									geoObjects.content = item.content;
									geoObjects.useDragMarker = item.useDragMarker;
									geoObjects.markerIcon = item.markerIcon;
									this.addMarker(geoObjects);
									items.splice(0, 1);
									if (items.length) {
										this.getCoordinates(items, callback);
									} else {
										callback.call(this);
									}
								});
							},

							/**
							 * ######### ###### ### ########### ## #####.
							 * @param {Array} geoObjects ###### ## ####### # geo #######.
							 */
							addMarker: function(geoObjects) {
								var markers = this.get("Markers");
								if (!this.Ext.isArray(markers)) {
									markers = [];
								}
								if (geoObjects) {
									markers.push(geoObjects);
								}
								this.set("Markers", markers);
							},

							/**
							 * ######## ###### ######## #### L.marker.
							 * @return {Array} ###### ########.
							 */
							getLeafletMarkersArray: function() {
								var markerArray = [];
								this.get("Markers").forEach(function(item) {
									var icon = this.getMarkerIcon(item);
									var geoObject = item[0];
									var marker = L.marker([geoObject.lat, geoObject.lon], {
										icon: icon,
										draggable: item.useDragMarker
									});
									if (item.content) {
										marker.bindPopup(item.content);
									}
									marker.on("dragend", this.processDragEndMarker, this);
									markerArray.push(marker);
								}, this);
								return markerArray;
							},

							/**
							 * ############# ####### ####### ##### ############ ###### ########.
							 * @param {Object} map ###### #####.
							 * @param {Object} group ###### ###### ########.
							 */
							fitBoundsMap: function(map, group) {
								map.fitBounds(group.getBounds(), {
									paddingTopLeft: [50, 50],
									paddingBottomRight: [20, 0]
								});
							},

							/**
							 * ############## ##### ############ ##### ######## ##########.
							 */
							normalizeSizeMap: function() {
								var map = this.get("LeafletMap");
								var group = this.get("LeafletGroup");
								map.invalidateSize({reset: true});
								if (!this.Ext.isEmpty(group) && !this.Ext.isEmpty(group.getLayers())) {
									this.fitBoundsMap(map, group);
								}
							},

							/**
							 * ######### #####.
							 * @param {Function} callback ####### #### #########.
							 * @param {Array} locationView ##########.
							 */
							renderMap: function(callback, locationView) {
								var map = this.get("LeafletMap");
								var group = this.get("LeafletGroup");
								if (this.Ext.isEmpty(map)) {
									map = L.map(this.get("MapContainerId"));
									L.tileLayer(this.get("MapTiles"), {
										attribution: this.get("MapAttribution")
									}).addTo(map);
									map.on("resize", this.normalizeSizeMap, this);
								}
								if (!this.Ext.isEmpty(locationView)) {
									map.setView(locationView, this.get("ScaleSize"));
									this.set("LeafletMap", map);
									this.set("Markers", []);
									if (!this.Ext.isEmpty(group)) {
										group.clearLayers();
									}
									return;
								}
								var markerArray = this.getLeafletMarkersArray();
								markerArray = this.reorderSimilarMarker(markerArray, this.get("ShiftLength"));
								if (!this.Ext.isEmpty(group)) {
									group.clearLayers();
									group.addLayer(L.featureGroup(markerArray));
								} else {
									var featureGroup = new L.featureGroup(markerArray);
									group = featureGroup.addTo(map);
								}
								this.fitBoundsMap(map, group);
								this.setHeaderCaption();
								this.set("LeafletGroup", group);
								this.set("LeafletMap", map);
								this.set("Markers", []);
								if (this.get("IsModalBox")) {
									ModalBox.updateSizeByContent();
								}
								if (this.Ext.isFunction(callback)) {
									callback.call(this);
								}
							},

							/**
							 * ######### ####### # ########### ############ # ##### ## #########.
							 * @param {Array} inputMarkers ####### ###### ########.
							 * @param {number} step ######## ####### ########.
							 * @return {Array} ################## ###### ########.
							 */
							reorderSimilarMarker: function(inputMarkers, step) {
								var outputMarkers = [];
								inputMarkers.forEach(function(item) {
									var geoObject = item._latlng;
									var lat = geoObject.lat;
									var lng = geoObject.lng;
									item.delta = 0;
									outputMarkers.forEach(function(outItem) {
										if ((outItem._latlng.lat === lat) && (outItem._latlng.lng === lng)) {
											item.delta = outItem.delta + step;
										}
									});
									outputMarkers.push(item);
								});
								outputMarkers.forEach(function(item) {
									var delta = item.delta;
									var latLng = item._latlng;
									latLng.lat += delta;
									latLng.lng += delta;
								});
								return outputMarkers;
							},

							/**
							 * Returns marker icon params.
							 * @param {Object} config Map item config.
							 * @param {Object} config.markerIcon Map item marker icon.
							 * @return {Object} Marker icon params.
							 */
							getMarkerIcon: function(config) {
								config = config || {};
								var iconUrl = Terrasoft.ImageUrlBuilder.getUrl(config.markerIcon ||
										resources.localizableImages.MarkerIcon);
								var shadowUrl = Terrasoft.ImageUrlBuilder.getUrl(
										resources.localizableImages.MarkerShadow);
								return L.icon({
									iconUrl: iconUrl,
									shadowUrl: shadowUrl,
									iconSize: [25, 41],
									shadowSize: [41, 41],
									iconAnchor: [11, 41],
									shadowAnchor: [12, 41],
									popupAnchor: [1, -32]
								});
							},

							/**
							 * ############# ######### ########## ####.
							 */
							setHeaderCaption: function() {
								var mapsData = this.get("MapsData");
								var markers = this.get("Markers");
								var addressCount = mapsData.length;
								var foundedAddressCount = markers.length;
								if (addressCount === foundedAddressCount) {
									this.set("HeadMessage", resources.localizableStrings.AddressesFoundFull);
								} else {
									var message = this.Ext.String.format(resources.localizableStrings.AddressesFoundPartially,
											foundedAddressCount, addressCount);
									this.set("HeadMessage", message);
								}
							},

							/**
							 * ########## ########## ############## #######.
							 * @param {Object} marker ########## # #######.
							 */
							processDragEndMarker: function(marker) {
								var map = this.get("LeafletMap");
								var group = this.get("LeafletGroup");
								this.fitBoundsMap(map, group);
								var latLng = marker.target.getLatLng();
								this.sendCoordinates(latLng);
							},

							/**
							 * ######## ######### # ########.
							 * @param {Array} latLng ##########.
							 */
							sendCoordinates: function(latLng) {
								if (this.Ext.isEmpty(latLng)) {
									return;
								}
								this.sandbox.publish("GetCoordinates", latLng, [this.sandbox.id]);
							},

							/**
							 * ######## ########## ## ######### ###### ######### ###### Nominatim.
							 * @param {Object} mapDataItem ####### ####### ### #####.
							 * @param {Array|String} address #####.
							 * @param {Function} callback ####### #### #########.
							 */
							getGeoObject: function(mapDataItem, address, callback) {
								if (MapsHelper.getIsEmptyAddress(address)) {
									MapsHelper.hideMask();
									this.showInformationDialog(resources.localizableStrings.AddressesNotFound);
								} else {
									var options = this.getNominatimRequestOptions(mapDataItem, address, callback);
									this.Ext.data.JsonP.request(options);
								}
							},

							/**
							 * Processes response from Nominatime geo service.
							 * @param {Object} response Service response.
							 * @param {Object} mapDataItem Current map element.
							 * @param {Array|String} address Address.
							 * @param {Function} callback Callback function.
							 */
							processNominatimResponse: function(response, mapDataItem, address, callback) {
								if (!this.Ext.isEmpty(response)) {
									if (mapDataItem.updateCoordinatesConfig) {
										this.addSaveMapsData(mapDataItem, response[0]);
									}
									callback.call(this, response);
								} else {
									var newAddress = Ext.isArray(address)
											? _.compact(address).reverse().join(", ")
											: this.addressPop(address);
									this.getGeoObject(mapDataItem, newAddress, callback);
								}
							},

							/**
							 * ####### ######### ####### ## ######.
							 * @param {Array|String} address #####.
							 * @return {Array} #####.
							 */
							addressPop: function(address) {
								if (!this.Ext.isArray(address)) {
									address = address.split(", ");
								}
								address.pop();
								return address.join(", ");
							},

							/**
							 * Returns options for building Nominatim service query.
							 * @param {Object} mapDataItem Curent element for map.
							 * @param {Array|String} address Address.
							 * @param {Function} callback Callback function.
							 * @return {Object} Service request options Nominatim.
							 */
							getNominatimRequestOptions: function(mapDataItem, address, callback) {
								var callbackName = "nominatimCallback";
								var me = this;
								this.Ext.data.JsonP[callbackName] = function(response) {
									me.processNominatimResponse(response, mapDataItem, address, callback);
								};
								var url = this.getNominatimRequestUrl(callbackName);
								var params = {
									format: "json"
								};
								if (this.Ext.isArray(address)) {
									if (address[0]) {
										params.street = address[0];
									}
									if (address[1]) {
										params.city = address[1];
									}
									if (address[2]) {
										params.state = address[2];
									}
									if (address[3]) {
										params.country = address[3];
									}
									if (address[4]) {
										params.postalcode = address[4];
									}
								} else {
									params.q = address;
								}
								return {
									url: url,
									params: params,
									timeout: 15000,
									failure: function(errorType) {
										if (errorType !== "timeout") {
											me.processNominatimResponse([], mapDataItem, address, callback);
										}
									}
								};
							},

							/**
							 * ########## Url ### ########## ####### # ####### Nominatim.
							 * @param {String} callbackName ### callback #######.
							 * @param {String} engine (optional) ######## ####### ##############.
							 * @return {String} Url ####### # ####### Nominatim.
							 */
							getNominatimRequestUrl: function(callbackName, engine) {
								var params = !this.Ext.isEmpty(callbackName) ?
								"?json_callback=Ext.data.JsonP." + callbackName : "";
								var url = "";
								if (this.Ext.isEmpty(engine) || engine === "osm" || engine === "openstreetmap") {
									url = "https://nominatim.openstreetmap.org/search" + params;
								} else if (engine === "mapquest") {
									url = "//open.mapquestapi.com/nominatim/v1/search.php" + params;
								} else {
									throw new Terrasoft.UnsupportedTypeException({
										message: "Unsupported Geocoding engine"
									});
								}
								return url;
							},

							/**
							 * ######### # ###### ######## # ############ ### ########## # ####.
							 * @param {Object} mapDataItem ###### ### ###########.
							 * @param {Object} geoObject ###### # ############
							 */
							addSaveMapsData: function(mapDataItem, geoObject) {
								if (mapDataItem.gpsN === geoObject.lat && mapDataItem.gpsE === geoObject.lon) {
									return;
								}
								var saveMapsData = this.get("SaveMapsData");
								var saveMapItem = {
									id: mapDataItem.updateCoordinatesConfig.id,
									schemaName: mapDataItem.updateCoordinatesConfig.schemaName,
									gpsN: geoObject.lat,
									gpsE: geoObject.lon
								};
								if (!Ext.isArray(saveMapsData)) {
									saveMapsData = [];
								}
								saveMapsData.push(saveMapItem);
								this.set("SaveMapsData", saveMapsData);
							},

							/**
							 * ######### ########## # ####.
							 */
							saveLocationCoordinates: function() {
								var items = this.get("SaveMapsData");
								if (Ext.isEmpty(items)) {
									return;
								}
								var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
								var requestUrl = workspaceBaseUrl + "/rest/MapsService/CacheCoordinates";
								Terrasoft.AjaxProvider.request({
									url: requestUrl,
									headers: {
										"Accept": "application/json",
										"Content-Type": "application/json"
									},
									method: "POST",
									jsonData: {
										itemsJSON: Ext.JSON.encode(items)
									},
									callback: function(request, success) {
										if (success) {
											this.set("SaveMapsData", []);
										}
									},
									scope: this
								});
							}
						}
					};
					return viewModel;
				},

				/**
				 * ############ ############# ###### ####.
				 * @param {Object} viewModel ######## ###### ############# ####.
				 */
				finallyRender: function(viewModel) {
					if (viewModel.get("IsRendered")) {
						return;
					}
					var renderTo = viewModel.get("RenderTo");
					if (viewModel.get("IsModalBox")) {
						var boxSize = {
							minWidth: 20,
							maxWidth: 90,
							minHeight: 20,
							maxHeight: 90
						};
						renderTo = ModalBox.show(boxSize);
					}
					var view = this.Ext.create("Terrasoft.Container", this.generateView(renderTo));
					view.bind(viewModel);
					this.sandbox.publish("AfterRenderMap", null, [this.sandbox.id]);
					viewModel.set("IsRendered", true);
				}
			});
			return Terrasoft.OsmMapsModule;
		});



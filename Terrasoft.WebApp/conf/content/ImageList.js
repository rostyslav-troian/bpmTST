Terrasoft.configuration.Structures["ImageList"] = {innerHierarchyStack: ["ImageList"]};
define("ImageList", ["ModalBox", "ImageListResources", "ImageView", "css!ImageList"], function(modalBox, resources) {
	/**
	 * @class Terrasoft.controls.ImageList
	 * Component for displaying and selecting images.
	 */
	Ext.define("Terrasoft.controls.ImageList", {

		extend: "Terrasoft.ImageView",

		alternateClassName: "Terrasoft.ImageList",

		modalBox: modalBox,

		imageInRow: 3,

		value: null,

		list: null,

		caption: null,

		wrapClasses: ["image-list"],

		useCachedValue: true,

		initialized: false,

		listPrepareEventName: "prepareList",

		schemaName: null,

		schemaColumn: null,

		/**
		 * Default css classes for modal box DOM.
		 * @private
		 * @type {String}
		 */
		defaultModalBoxClass: "image-list-modal-box",

		/**
		 * CSS classes for modal box DOM.
		 * @type {String}
		 */
		modalBoxClasses: null,

		imageSrc: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultIcon),

		/**
		 * @inheritdoc Terrasoft.ImageView#init
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event change
				 * Change image event.
				 * @param {Terrasoft.ImageView} this
				 */
				"change",
				"prepareList"
			);
		},

		/**
		 * @inheritdoc Terrasoft.ImageView#onClick
		 * @protected
		 * @overridden
		 */
		onClick: function() {
			this.callParent(arguments);
			this.initialized = true;
			if (this.list && this.useCachedValue && this.list.getCount() > 0) {
				this.showList();
			} else {
				this.fireEvent(this.listPrepareEventName, null, this.list);
			}
		},

		getImageSrc: function(item) {
			if (!item) {
				return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultIcon);
			}
			var sysImageId = item.primaryImageValue;
			if (sysImageId &&  item.primaryImageValue.value) {
				sysImageId = item.primaryImageValue.value;
			}
			if (Ext.isEmpty(sysImageId)) {
				return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultIcon);
			}
			return Terrasoft.ImageUrlBuilder.getUrl({
				source: Terrasoft.ImageSources.SYS_IMAGE,
				params: {
					primaryColumnValue: sysImageId
				}
			});
		},

		getItemView: function(item) {
			var config = {
				className: "Terrasoft.Container",
				id: "item_container_" + item.value,
				selectors: {
					wrapEl: "#item_container_" + item.value
				},
				classes: {
					wrapClassName: ["image-list-item-container"]
				},
				items: [
					{
						className: "Terrasoft.ImageView",
						imageSrc: this.getImageSrc(item),
						wrapClasses: ["image-list-image-preview"],
						tag: item.value
					},
					{
						className: "Terrasoft.Label",
						caption: item.displayValue,
						classes: {
							labelClass: ["image-list-item-caption"]
						},
						tag: item.value
					}
				]
			};
			var itemView = Ext.create("Terrasoft.Container", config);
			itemView.items.items[0].on("click", this.onItemClick, this);
			itemView.items.items[1].on("click", this.onItemClick, this);
			return itemView;
		},

		onItemClick: function(sender) {
			var value = sender.tag;
			var selectedItem = null;
			this.list.each(function(item) {
				if (item.value === value) {
					selectedItem = item;
					return;
				}
			}, this);
			this.setValue(selectedItem);
			this.modalBox.close();
		},

		setCaption: function(value) {
			this.caption = value;
		},

		setValue: function(value) {
			if (this.value === value) {
				return;
			}
			this.value = value;
			this.setImageSrc(this.getImageSrc(this.value));
			this.fireEvent("change", value);
		},

		getModalBoxView: function() {
			var closeButton = Ext.create("Terrasoft.Button", {
				imageConfig: resources.localizableImages.CloseIcon,
				classes: {
					wrapperClass: "image-list-close-button"
				},
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT
			});
			closeButton.on("click", this.closeList, this);
			var content = Ext.create("Terrasoft.Container", {
				id: "ImageListContentcontainer",
				selectors: {
					wrapEl: "#ImageListContentcontainer"
				},
				classes: {
					wrapClassName: ["image-list-content-container"]
				},
				items: []
			});
			var headerContainer = Ext.create("Terrasoft.Container", {
				id: "listViewHeaderContainer",
				selectors: {
					wrapEl: "#listViewHeaderContainer"
				},
				classes: {
					wrapClassName: ["image-list-header-container"]
				},
				items: [
					{
						className: "Terrasoft.Label",
						caption: this.caption,
						classes: {
							labelClass: ["image-list-header-caption-label"]
						}
					}
				]
			});
			headerContainer.add(closeButton);
			content.add(headerContainer);
			var imagesContainer = this.createImagesContainer();
			content.add(imagesContainer);
			var rowIndex = 0;
			var currentRow = 0;
			var columns = [];
			for (var i = 0; i < this.imageInRow; i++) {
				var columnContainer = Ext.create("Terrasoft.Container", {
					id: "row" + i,
					classes: {
						wrapClassName: ["image-list-column-container"]
					},
					selectors: {
						wrapEl: "#row" + i
					},
					items: []
				});
				columns.push(columnContainer);
			}
			this.list.each(function(item) {
				var itemView = this.getItemView(item, rowIndex, currentRow);
				columns[rowIndex].add(itemView);
				rowIndex++;
				if (rowIndex === this.imageInRow) {
					currentRow++;
					rowIndex = 0;
					//content.add(itemsContainer);
				}
			}, this);
			Terrasoft.each(columns, function(column) {
				imagesContainer.add(column);
			});
			return content;
		},

		/**
		 * Returns container for all images in modal window.
		 * @private
		 * @return {Terrasoft.Container} Container instance
		 */
		createImagesContainer: function() {
			return Ext.create("Terrasoft.Container", {
				id: "listViewImagesContainer",
				selectors: {
					wrapEl: "#listViewImagesContainer"
				},
				classes: {
					wrapClassName: ["image-list-images-container"]
				}
			});
		},

		closeList: function() {
			this.modalBox.close();
		},

		showList: function() {
			var modalBoxClasses = Ext.Array.merge(this.modalBoxClasses, this.defaultModalBoxClass);
			var container = this.modalBox.show({
				widthPixels: "100px",
				heightPixels: "100px",
				boxClasses: modalBoxClasses
			});
			if (container) {
				var view = this.getModalBoxView();
				view.on("afterrender", this.setModalBoxSize, this);
				view.render(container);
			}
		},

		setModalBoxSize: function() {
			this.modalBox.updateSizeByContent();
		},

		loadList: function(list) {
			this.list = list;
			if (this.initialized) {
				this.showList();
			}
		},

		subscribeForEvents: function(binding, property, model) {
			this.callParent(arguments);
			var bindings = this.bindings;
			if (!bindings[this.listPrepareEventName]) {
				var lookupColumnName = bindings.value.modelItem;
				var lookupColumn = model.columns[lookupColumnName];
				var isLookup = (this.alternateClassName === "Terrasoft.LookupEdit") ? true : false;
				if (lookupColumn && lookupColumn.isLookup) {
					var modelMethodName = model.defLoadLookupDataMethod;
					var modelMethod = model[modelMethodName];
					var params = [
						lookupColumnName,
						isLookup
					];
					this.subscribeForControlEvent(this.listPrepareEventName, modelMethod, model, params);
				}
			}
		},

		getBindConfig: function() {
			var parentBindConfig = this.callParent(arguments);
			var bindConfig = {
				value: {
					changeMethod: "setValue",
					changeEvent: "change"
				},
				caption: {
					changeMethod: "setCaption"
				},
				list: {
					changeMethod: "loadList"
				}
			};
			Ext.apply(bindConfig, parentBindConfig);
			return bindConfig;
		}

	});

	return Terrasoft.controls.ImageList;
});



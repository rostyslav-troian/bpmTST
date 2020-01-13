Terrasoft.configuration.Structures["ContentBuilderUserBlock"] = {innerHierarchyStack: ["ContentBuilderUserBlock"]};
define("ContentBuilderUserBlock", ["ContentBuilderUserBlockResources", "css!ContentBuilderUserBlock",
		"ContentBuilderBlock"], function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderUserBlock
	 */
	Ext.define("Terrasoft.controls.ContentBuilderUserBlock", {
		extend: "Terrasoft.ContentBuilderBlock",
		alternateClassName: "Terrasoft.ContentBuilderUserBlock",
		/**
		 * Element parameters.
		 * @override
		 * @type {Object}
		 */
		tplConfig: {
			classes: {
				wrapClasses: ["content-builder-element-wrap"],
				imageWrapClasses: ["content-builder-element-image-wrap-class", "user-block"],
				imageClasses: ["content-builder-element-image-class", "user-block"],
				captionWrapClasses: ["content-builder-element-caption-wrap-class", "user-block"]
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @overridden
		 */
		tpl: [
			/* jscs:disable */
			/* jshint quotmark: false */
			'<div id="{id}-content-builder-element-wrap" class="{wrapClasses}">',
				'<img id="{id}-content-user-block-delete-icon" class="content-user-block-delete-image" src="' +
					Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DeleteImage) + '"' +
					'data-item-marker="delete-user-block-icon"/>',
				'<div class="{imageWrapClasses}">',
					'<img class="{imageClasses}" src="{imageUrl}"/>',
				'</div>',
				'<tpl if="!!caption">',
					'<div class="{captionWrapClasses}">',
						'{caption}',
					'</div>',
				'</tpl>',
			'</div>'
		],

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * The event generated when you click on the content user block delete icon.
				 */
				"deleteiconclick"
			);
		},

		/**
		 * @inheritDoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			var deleteIconEl = Ext.get(this.id + "-content-user-block-delete-icon");
			deleteIconEl.on("click", this.onUserBlockDeleteIconClick, this);
		},

		/**
		 * Handles on user block icon delete event.
		 * @protected
		 */
		onUserBlockDeleteIconClick: function() {
			this.fireEvent("deleteiconclick", this);
		}
	});
	return Terrasoft.ContentBuilderUserBlock;
});



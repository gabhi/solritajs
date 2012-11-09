define([
	// Libraries.
	"jquery",
	"lodash",
	"backbone",

	// Plugins.
	"plugins/backbone.layoutmanager"

	], function ($, _, Backbone) {

		// set ajax params without brackets []
		$.ajaxSettings.traditional = true;

		// Provide a global location to place configuration settings and module
		// creation.
		var app = {
			// The root path to run the application.
			root: "/",
			pushState: true,
			//solrURL: "http://localhost:8983/solr/select",
      solrURL: "http://solritajs-server.herokuapp.com/solr/select",
			defaultQuery: "*:*",
			defaultFacetFieldsArray: ["cat", "manu_exact"],
			defaultPerPage: 5,
			defaultSortField: "price desc",
			paginationSize: 3,
			perPageArray: [3, 5, 10, 15, 20, 50, 100],
			sortFieldArray: ["id asc", "id desc", "name asc", "name desc", "price asc", "price desc"]
		};

		// Localize or create a new JavaScript Template object.
		var JST = window.JST = window.JST || {};

		// Configure LayoutManager with Backbone Boilerplate defaults.
		Backbone.LayoutManager.configure({
			// Allow LayoutManager to augment Backbone.View.prototype.
			manage: true,

			prefix: "app/templates/",

			fetch: function (path) {
				// Concatenate the file extension.
				path = path + ".html";

				// If cached, use the compiled template.
				if (JST[path]) {
					return JST[path];
				}

				// Put fetch into `async-mode`.
				var done = this.async();

				// Seek out the template asynchronously.
				$.get(app.root + path, function (contents) {
					done(JST[path] = _.template(contents));
				});
			}
		});

		// Mix Backbone.Events, modules, and layout management into the app object.
		return _.extend(app, {
			// Create a custom object with a nested Views object.
			module: function (additionalProps) {
				return _.extend({
					Views: {}
				}, additionalProps);
			},

			// Helper for using layouts.
			useLayout: function (options) {
				// Create a new Layout with options.
				var layout = new Backbone.Layout(_.extend({
					el: "body"
				}, options));

				// Cache the refererence.
				return this.layout = layout;
			}
		}, Backbone.Events);

	});

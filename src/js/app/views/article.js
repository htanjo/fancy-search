/**
 * Module of article view.
 * @module article
 * @author htanjo
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery',
    'handlebars',
    'text!templates/article.tpl',
    'jq-tipsy'
], function (Backbone, $, Handlebars, template) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of article view.
     * @class Article
     * @constructor
     * @extends Backbone.View
     */
    var Article = Backbone.View.extend({

        /**
         * Construct article view.
         * @method initialize
         */
        initialize: function () {
            this.render();
        },

        /**
         * Compile HTML with template.
         * @method template
         * @param {Object}
         * @return {String}
         */
        template: Handlebars.compile(template),

        /**
         * Render article.
         * @method render
         * @return {Article}
         */
        render: function () {
            this.$el = $(this.template(this.model.toJSON()));

            // Init DOM elements.
            this.$('.status').tipsy({
                gravity: 's'
            });

            return this;
        }
    });

    return Article;

});
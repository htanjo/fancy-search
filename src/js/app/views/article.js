/**
 * Module of article view.
 * @module article
 * @author Tanjo, Hiroyuki
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
            this.updateStatus();
            this.model.on('change', this.updateStatus, this);
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
            var self = this;
            this.$el = $(this.template(this.model.toJSON()));

            // Init DOM elements.
            this.$('.status')
                .tipsy({
                    gravity: 's'
                })
                .click(function () {
                    self.model.set('fav', !self.model.get('fav'));
                });

            return this;
        },

        /**
         * Render to update status.
         * @method updateStatus
         */
        updateStatus: function () {
            if (this.model.get('fav')) {
                this.$el.addClass('fav');
            }
            else {
                this.$el.removeClass('fav');
            }
        }
    });

    return Article;

});
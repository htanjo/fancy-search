/**
 * Module of content view.
 * @module content
 * @author htanjo
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery',
    'views/article',
    'jq-masonry'
], function (Backbone, $, Article) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of content view.
     * @class Content
     * @constructor
     * @extends Backbone.View
     */
    var Content = Backbone.View.extend({

        /**
         * Construct content view.
         * @method initialize
         */
        initialize: function () {
            var self = this;

            this.$('#articles').masonry({
                itemSelector: '.article, .index',
                columnWidth: 240,
                gutterWidth: 8,
                isFitWidth: true
            });

            // Events
            this.model.get('workList').on('add', function(work) {
                self.render(work);
            });
            this.model.get('workList').on('reset', this.clearContent, this);
            this.model.on('change:loadedPage', function(application, page) {
                self.renderIndex(page);
            });
        },

        /**
         * Render content with collection.
         * @method render
         * @param {Work} work
         * @return {Content}
         */
        render: function (work) {
            var self = this,
                article = new Article({
                model: work
            });
            this.$('#articles').append(article.$el.css({opacity: 0}));
            article.$el.imagesLoaded(function () {
                self.$('#articles').masonry('appended', article.$el.css({opacity: 1}));
            });
            return this;
        },

        /**
         * Render index number.
         * @method renderIndex
         * @param {Number} number
         * @return {Content}
         */
        renderIndex: function (number) {
            var start = (number - 1) * this.model.get('requestNumber') + 1,
                end = start + this.model.get('requestNumber') - 1,
                $index = $('<div id="page' + number + '" class="index"><div class="index-page">' + number + '</div><div class="index-count">' + start + ' - ' + end + '</div></div>');
            this.$('#articles').append($index).masonry('appended', $index);
            return this;
        },

        /**
         * Clear content elements.
         * @method clearContent
         */
        clearContent: function () {
            this.$('#articles').empty().masonry('reload');
            $('html, body').scrollTop(0);
        }
    });

    return Content;

});
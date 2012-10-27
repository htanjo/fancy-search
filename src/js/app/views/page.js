/**
 * Module of application main view.
 * @module page
 * @author Tanjo, Hiroyuki
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery',
    'views/content',
    'views/search',
    'views/navigation',
    'jq-tipsy',
    'jq-modal'
], function (Backbone, $, Content, Search, Navigation) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of application main view.
     * @class Page
     * @constructor
     * @extends Backbone.View
     */
    var Page = Backbone.View.extend({

        /**
         * Application model.
         * @property model
         * @type Backbone.Model
         */
        model: null,

        /**
         * Content view.
         * @property content
         * @type Content
         */
        content: null,

        /**
         * Search view.
         * @property search
         * @type Search
         */
        search: null,

        /**
         * Navigation view.
         * @property navigation
         * @type Navigation
         */
        navigation: null,

        /**
         * Construct application main view.
         * @method initialize
         */
        initialize: function () {
            var self = this;

            // Init DOM elements.
            $('html').addClass('ready');
            $('#aboutButton')
                .tipsy({
                    gravity: 'e'
                })
                .leanModal({
                    top : 200,
                    overlay : 0.4,
                    closeButton: '.close'
                });

            // Events
            $(window).on('scroll', function () {
                self.detectScroll();
            });
            this.model.on('change:loadComplete', function (application, isComplete) {
                self.changeLoadStatus(isComplete);
            });

            // Create child views
            this.content = new Content({
                model: this.model,
                el: $('#content')
            });
            this.search = new Search({
                model: this.model,
                el: $('#search')
            });
            this.navigation = new Navigation({
                model: this.model,
                el: $('#navigation')
            });
        },

        /**
         * Change view according to all loaded or not.
         * @method changeLoadStatus
         * @param {Boolean} isComplete
         */
        changeLoadStatus: function (isComplete) {
            var $loader = $('#loader');
            if (isComplete) {
                $loader.hide();
            }
            else {
                $loader.show();
            }
        },

        /**
         * Scroll event handler.
         * @method detectScroll
         */
        detectScroll: function () {
            var scrollTop,
                docHeight,
                winHeight,
                offset;
            if (!this.model.get('isLoading') && !this.model.get('loadComplete') && this.model.get('loadedPage') !== 0) {
                scrollTop = $(window).scrollTop();
                docHeight = $(document).outerHeight();
                winHeight = $(window).height();
                offset = 500;
                if (scrollTop >= docHeight - (winHeight + offset)) {
                    this.model.loadWorks(this.model.get('query'));
                }
            }
        }
    });

    return Page;

});
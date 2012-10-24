/**
 * Module of application main router.
 * @module router
 * @author htanjo
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery',
    'models/application',
    'views/page'
], function (Backbone, $, Application, Page) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of application main router.
     * @class Router
     * @constructor
     * @extends Backbone.Router
     */
    var Router = Backbone.Router.extend({

        /**
         * Routing definitions.
         * @property routes
         * @type Object
         */
        routes: {
            '': 'home',
            '!/': 'home',
            '!/search?:params': 'search'
        },

        /**
         * Application main model.
         * @property model
         * @type Application
         */
        model: null,

        /**
         * Construct main router.
         * @method initialize
         */
        initialize: function () {
            // Start application.
            this.model = new Application();
            new Page({
                el: $('body'),
                model: this.model
            });
        },

        /**
         * Home view.
         * @method home
         */
        home: function () {
            this.model.set('query', {});
        },

        /**
         * Search view.
         * @method search
         * @param {String} params
         */
        search: function (params) {
            var query = {};
            try {
                // Convert params to Object.
                query = JSON.parse('{"' + decodeURIComponent(params.replace(/&/g, '\",\"').replace(/\=/g,'\":\"')) + '"}');
            }
            // Invalid query.
            catch (e) {
                // On error.
            }
            this.model.set('query', query);
        }

    });

    return Router;

});
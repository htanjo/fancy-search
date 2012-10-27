/**
 * Module of Application main.
 * @module application
 * @author Tanjo, Hiroyuki
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery',
    'models/work',
    'collections/worklist'
], function (Backbone, $, Work, WorkList) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of application main model.
     * @class Application
     * @constructor
     * @extends Backbone.Model
     */
    var Application = Backbone.Model.extend({

        // Default attributes.
        defaults: {

            /**
             * Showing Items.
             * @property workList
             * @type WorkList
             */
            workList: null,

            /**
             * Hit results number.
             * @property hitNumber
             * @type Number
             */
            hitNumber: 0,

            /**
             * Item number of each request.
             * @property requestNumber
             * @type Number
             */
            requestNumber: 30,

            /**
             * Loaded page number.
             * @property loadedPage
             * @type Number
             */
            loadedPage: 0,

            /**
             * All results are loaded or not.
             * @property loadComplete
             * @type Boolean
             */
            loadComplete: false,

            /**
             * Ajax loading or not.
             * @property isLoading
             * @type Boolean
             */
            isLoading: false,

            /**
             * Parameters of Ajax search request.
             * @property query
             * @type Object
             */
            query: null,

            /**
             * Active input in search box.
             * @property input
             * @type String
             */
            input: ''
        },

        /**
         * Construct application main model.
         * @method initialize
         */
        initialize: function () {
            var self = this;
            this.set('workList', new WorkList());

            // Events
            this.on('change:query', function (Application, query) {
                self.updateInput();
                self.clearWorks();
                self.loadWorks(query);
            });
        },

        /**
         * Load works data.
         * @method loadWorks
         * @param {String} [query]
         */
        loadWorks: function (query) {
            var self = this,
                request = 'http://api.rakuten.co.jp/rws/3.0/json?developerId=2221a7cc5f51e05b755ea96ecf29b297&operation=BooksTotalSearch&version=2011-12-01',
                settingParams = {
                    hits: this.get('requestNumber'),
                    page: this.get('loadedPage') + 1,
                    booksGenreId: '000',
                    sort: 'sales'
                },
                //queryParams = $.isEmptyObject(query) ? {booksGenreId: '000'} : query;
                queryParams = query;
            this.set('isLoading', true);
            $.ajax({
                url: request,
                data: $.extend({}, settingParams, queryParams),
                dataType: 'jsonp',
                jsonp: 'callBack',
                timeout: 10000,
                success: function (data) {
                    var items = data.Body.BooksTotalSearch.Items.Item,
                        count = data.Body.BooksTotalSearch.count;
                    self.set('isLoading', false);
                    self.set('hitNumber', parseInt(count, 10));
                    self.addWorks(items);
                },
                error: function () {
                    // On error
                }
            });
        },

        /**
         * Add works data.
         * @method addWorks
         * @param {Object} works
         */
        addWorks: function (works) {
            var i;
            this.set('loadedPage', this.get('loadedPage') + 1);
            for (i = 0; i < works.length; i++) {
                this.get('workList').add(new Work(works[i]));
            }
            if (this.get('workList').length >= this.get('hitNumber')) {
                this.set('loadComplete', true);
            }
        },

        /**
         * Clear works collection.
         * @method clearWorks
         */
        clearWorks: function () {
            this.set('loadedPage', 0);
            this.get('workList').reset();
            this.set('loadComplete', false);
        },

        /**
         * Update input text.
         * @method updateInput
         */
        updateInput: function () {
            var value = '',
                query = this.get('query');
            value += (query.keyword) ? query.keyword : '';
            value += (query.service) ? ' service:' + query.service : '';
            value += (query.creator) ? ' creator:' + query.creator : '';
            value += (query.technique) ? ' technique:' + query.technique : '';
            value = $.trim(value);
            this.set('input', value);
        }
    });

    return Application;

});
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
    'models/item',
    'collections/itemlist',
    'bb-localstorage'
], function (Backbone, $, Item, ItemList) {

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
             * @property itemList
             * @type ItemList
             */
            itemList: null,

            /**
             * Fav Items.
             * @property favItemList
             * @type ItemList
             */
            favItemList: null,

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
            input: '',

            /**
             * Error message. When this is blank, nothing is wrong.
             * @property errorMessage
             * @type String
             */
            errorMessage: ''
        },

        /**
         * Construct application main model.
         * @method initialize
         */
        initialize: function () {
            var self = this;
            this.set('itemList', new ItemList());
            this.set('favItemList', new ItemList());

            // Restore with Local Storage.
            this.get('favItemList').fetch();

            // Events
            this.on('change:query', function (Application, query) {
                self.updateInput();
                self.clearItems();
                self.loadItems(query);
            });
        },

        /**
         * Load items data.
         * @method loadItems
         * @param {String} [query]
         */
        loadItems: function (query) {
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
            this.clearError();
            $.ajax({
                url: request,
                data: $.extend({}, settingParams, queryParams),
                dataType: 'jsonp',
                jsonp: 'callBack',
                timeout: 10000,
                success: function (data) {
                    var items,
                        count;
                    try {
                        items = data.Body.BooksTotalSearch.Items.Item;
                        count = parseInt(data.Body.BooksTotalSearch.count, 10);
                    }
                    // Invalid response.
                    catch (error) {
                        items = [];
                        count = self.get('itemList').length;
                    }
                    self.set('isLoading', false);
                    self.set('hitNumber', count);
                    self.addItems(items);
                },
                error: function () {
                    var count = self.get('itemList').length;
                    self.detectError('Sorry. Please reload page or try again later.');
                    self.set('isLoading', false);
                    self.set('hitNumber', count);
                    self.set('loadComplete', true);
                }
            });
        },

        /**
         * Add items data.
         * @method addItems
         * @param {Object} items
         */
        addItems: function (items) {
            var self = this,
                newItem,
                i;

            function updateFavItemList(item) {
                var favItem = self.get('favItemList').get(item.id);

                // Add clone instance to fav.
                if (item.get('fav')) {
                    self.get('favItemList').create(item.clone());
                }
                // Destroy clone instance in fav.
                else if (favItem) {
                    favItem.destroy();
                }
            }

            this.set('loadedPage', this.get('loadedPage') + 1);
            for (i = 0; i < items.length; i++) {
                newItem = new Item(items[i]);
                newItem.set('id', items[i].isbn || items[i].jan);               // Set unique string to the model id. In this case, I use ISBN or JAN code.
                newItem.set('fav', this.get('favItemList').get(newItem.id));    // Set fav or not.
                newItem.on('change:fav', updateFavItemList);
                self.get('itemList').add(newItem);
            }
            if (this.get('itemList').length >= this.get('hitNumber')) {
                this.set('loadComplete', true);
            }
        },

        /**
         * Clear items collection.
         * @method clearItems
         */
        clearItems: function () {
            this.set('loadedPage', 0);
            this.get('itemList').reset();
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
        },

        /**
         * Detect error.
         * @method detectError
         * @param message
         */
        detectError: function (message) {
            this.set('errorMessage', message);
        },

        /**
         * Clear error.
         * @method clearError
         */
        clearError: function () {
            this.set('errorMessage', '');
        }
    });

    return Application;

});
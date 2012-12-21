/**
 * Module of item list collection.
 * @module itemlist
 * @author Tanjo, Hiroyuki
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'models/item',
    'bb-localstorage'
], function (Backbone, Item) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of item list collection.
     * @class ItemList
     * @constructor
     * @extends Backbone.Collection
     */
    var ItemList = Backbone.Collection.extend({

        /**
         * Associated model class.
         * @property model
         * @type Item
         */
        model: Item,

        localStorage: new Backbone.LocalStorage('fancySearchFavs'),

        /**
         * Construct item list collection.
         * @method initialize
         */
        initialize: function () {
        }

    });

    return ItemList;

});
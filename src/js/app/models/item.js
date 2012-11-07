/**
 * Module of item.
 * @module item
 * @author Tanjo, Hiroyuki
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone'
], function (Backbone) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of item model.
     * @class Item
     * @constructor
     * @extends Backbone.Model
     */
    var Item = Backbone.Model.extend({

        // Default attributes.
        defaults: {

            /**
             * Fav or not.
             * @property fav
             * @type Boolean
             */
            fav: false
        },

        /**
         * Construct item model.
         * @method initialize
         */
        initialize: function () {
        }
    });

    return Item;

});
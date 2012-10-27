/**
 * Module of work.
 * @module work
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
     * Class of work model.
     * @class Work
     * @constructor
     * @extends Backbone.Model
     */
    var Work = Backbone.Model.extend({

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
         * Construct work model.
         * @method initialize
         */
        initialize: function () {
        }
    });

    return Work;

});
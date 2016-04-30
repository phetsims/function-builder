// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function MysteryModel() {
    //TODO
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( Object, MysteryModel, {

    // @public
    reset: function() {
      //TODO delete this if there's ultimately nothing to do
    },

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      //TODO
    }
  } );
} );

// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function NumbersModel() {

    // Inputs are:
    // [-4,7]
    // show [0,3] initially

    // Functions are:
    // + 3 : rgb(235,191,109)
    // - 3  : rgb(198,231,220)
    // x ? : (x 1) : rgb(209,151,169)
    // - ? : (- 0) : rgb(255,246,187)
    // x 2 + 1 : DOUBLE : rgb(208,282,224), rgb(253,204,196)
    // ?? : (x 2) : rgb(246,181,138)
    // + ? x ? (+ 3 x 2) : DOUBLE : rgb(135,196,229), rgb(222,220,205)
    // ? ? (+ 7) : rgb(232,169,236)
    // ? ? ? ? (x 2 - 3) : DOUBLE : rgb(165,209,167), rgb(255,246,187)

    PropertySet.call( this, {} );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( PropertySet, NumbersModel );
} );
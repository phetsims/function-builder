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
    // (-4,7) inclusive
    // show (0,3) initially

    // Functions are:
    // + 3, - 3
    // x ? (x 1)
    // - ? (- 0)
    // x 2 + 1 : DOUBLE
    // ?? (x 2),
    // + ? x ? (+ 3 x 2) : DOUBLE
    // ? ? (+ 7)
    // ? ? ? ? (x 2 - 3) : DOUBLE

    PropertySet.call( this, {} );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( PropertySet, NumbersModel );
} );
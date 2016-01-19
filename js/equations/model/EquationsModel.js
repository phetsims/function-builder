// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
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
  function EquationsModel() {

    // Inputs are:
    // [-4,6], x
    // show [0,3] initially

    // Functions are:
    // + N : rgb(246,203,144)
    // - N : rgb(152,231,156)
    // x N : rgb(237,165,222)
    // ÷ N : rgb(183,200,249)
    // A : TODO : rgb(28,191,167)
    // B : TODO : rgb(252,241,157)
    //
    // N = [-3,3]

    PropertySet.call( this, {} );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( PropertySet, EquationsModel );
} );
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

    // Cards, 1 of each:
    // [-4,6], x
    // show [0,3] initially

    // Functions, 2 of each, N range is [-3,3]
    // + N : rgb( 246, 203, 144 )
    // - N : rgb( 152, 231, 156 )
    // x N : rgb( 237, 165, 222 )
    // ÷ N : rgb( 183, 200, 249 )
    // A : ? : rgb( 28, 191, 167 )
    // B : ? : rgb( 252, 241, 157 )
    //
    // N = [-3,3]

    // Builder has 3 slots

    PropertySet.call( this, {} );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( PropertySet, EquationsModel );
} );
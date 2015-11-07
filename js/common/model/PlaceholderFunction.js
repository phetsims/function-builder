// Copyright 2015, University of Colorado Boulder

/**
 * Placeholder for a function.
 * The absence of a function behaves like the identity function, will a different visual representation.
 */
define( function( require ) {
  'use strict';

  // modules
  var Identity = require( 'FUNCTION_BUILDER/common/model/Identity' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function PlaceholderFunction( options ) {

    options = _.extend( {
      name: 'placeholder',
      image: null,
      fill: null,
      stroke: 'white',
      lineDash: [ 3, 3 ]
    }, options );

    Identity.call( this, options );
  }

  return inherit( Identity, PlaceholderFunction );
} );

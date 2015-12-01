// Copyright 2015, University of Colorado Boulder

/**
 * Placeholder for a function.
 * The absence of a function behaves like an identity function.
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
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

    FBFunction.call( this, options );
  }

  functionBuilder.register( 'PlaceholderFunction', PlaceholderFunction );

  return inherit( FBFunction, PlaceholderFunction, {

    /**
     * @param {*} input
     * @returns {*}
     */
    apply: function( input ) {
      return input; //TODO should this clone the input?
    }
  } );
} );

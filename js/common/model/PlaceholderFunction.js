// Copyright 2015, University of Colorado Boulder

/**
 * Placeholder for a function.
 * It has a different look (dashed outline), and behaves like the identity function.
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
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

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'PlaceholderFunction', PlaceholderFunction );

  return inherit( AbstractFunction, PlaceholderFunction, {

    /**
     * @param {*} input
     * @returns {*} the input
     */
    apply: function( input ) {
      return input;
    }
  } );
} );

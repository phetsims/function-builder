// Copyright 2016, University of Colorado Boulder

/**
 * output = input * 2
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );

  // constants
  var LABEL_STRING = '? ?';

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Times2( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 246, 181, 138 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Times2', Times2 );

  return inherit( NumberFunction, Times2, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input * 2;
    }
  } );
} );

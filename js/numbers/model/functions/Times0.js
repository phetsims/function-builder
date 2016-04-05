// Copyright 2016, University of Colorado Boulder

/**
 * output = input * 2
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // constants
  var LABEL_STRING = StringUtils.format( '{0} 0', FBSymbols.TIMES );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Times0( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 255, 246, 187 )',
      invertible: false
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Times0', Times0 );

  return inherit( NumberFunction, Times0, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input * 0;
    }
  } );
} );

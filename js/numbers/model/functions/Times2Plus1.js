// Copyright 2016, University of Colorado Boulder

/**
 * output = ( input * 2 ) + 1
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
  var LABEL_STRING = StringUtils.format( '{0} 2 , {1} 1', FBSymbols.TIMES, FBSymbols.PLUS );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Times2Plus1( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 208, 201, 225 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Times2Plus1', Times2Plus1 );

  return inherit( NumberFunction, Times2Plus1, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return ( input * 2 ) + 1;
    }
  } );
} );

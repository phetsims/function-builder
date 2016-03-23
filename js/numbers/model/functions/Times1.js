// Copyright 2016, University of Colorado Boulder

/**
 * output = input * 1
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
  var LABEL_STRING = StringUtils.format( '{0} ?', FBSymbols.TIMES );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Times1( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 209, 151, 169 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Times1', Times1 );

  return inherit( NumberFunction, Times1, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input;
    }
  } );
} );

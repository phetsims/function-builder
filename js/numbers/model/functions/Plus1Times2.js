// Copyright 2016, University of Colorado Boulder

/**
 * output = ( input + 1 ) * 2
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
  var LABEL_STRING = StringUtils.format( '{0} 1 , {1} 2', FBSymbols.PLUS, FBSymbols.TIMES );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Plus1Times2( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 232, 169, 236 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Plus1Times2', Plus1Times2 );

  return inherit( NumberFunction, Plus1Times2, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return ( input + 1 ) * 2;
    }
  } );
} );

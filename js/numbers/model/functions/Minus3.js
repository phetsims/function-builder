// Copyright 2016, University of Colorado Boulder

/**
  * output = input - 3
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
  var LABEL_STRING = StringUtils.format( '{0} 3', FBSymbols.MINUS );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Minus3( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 135, 196, 229 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Minus3', Minus3 );

  return inherit( NumberFunction, Minus3, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input - 3;
    }
  } );
} );

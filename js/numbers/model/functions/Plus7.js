// Copyright 2016, University of Colorado Boulder

/**
 * output = input + 7
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
  function Plus7( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 232, 169, 236 )'
    } );
    NumberFunction.call( this, LABEL_STRING, options );
  }

  functionBuilder.register( 'Plus7', Plus7 );

  return inherit( NumberFunction, Plus7, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input + 7;
    }
  } );
} );

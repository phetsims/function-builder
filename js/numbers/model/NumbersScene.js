// Copyright 2016, University of Colorado Boulder

/**
 * The scene for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );

  // function modules
  var Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Minus3' );
  var Plus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus3' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScene( options ) {

    // Functions are:
    // + 3 : rgb( 235, 191, 109 )
    // - 3  : rgb( 198, 231, 220 )
    // x ? : (x 1) : rgb( 209, 151, 169 )
    // - ? : (- 0) : rgb( 255, 246, 187 )
    // x 2 + 1 : DOUBLE : rgb( 208, 282, 224 ), rgb( 253, 204, 196 )
    // ?? : (x 2) : rgb( 246, 181, 138 )
    // + ? x ? (+ 3 x 2) : DOUBLE : rgb( 135, 196, 229 ), rgb( 222, 220, 205 )
    // ? ? (+ 7) : rgb( 232, 169, 236 )
    // ? ? ? ? (x 2 - 3) : DOUBLE : rgb( 165, 209, 167 ), rgb( 255, 246, 187 )

    /**
     * Constructors for {NumberFunction} types, in the order that they appear in the function carousel.
     * @type {constructor[]}
     * @public (read-only)
     */
    this.functionConstructors = [
      Plus3,
      Minus3
      //TODO additional functions
    ];

    /**
     * Numbers for the input cards, in the order that they appear in the input carousel.
     * @type {HTMLImageElement[]}
     * @public (read-only)
     */
    this.cardNumbers = [];
    for ( var i = -4; i < 4; i++ ) {
      this.cardNumbers.push( i );
    }
    //TODO show cards 0-3 initially in carousel

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );

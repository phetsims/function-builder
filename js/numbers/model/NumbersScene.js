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
  var Minus0 = require( 'FUNCTION_BUILDER/numbers/model/functions/Minus0' );
  var Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Minus3' );
  var Plus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus3' );
  var Plus3Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus3Times2' );
  var Plus7 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus7' );
  var Times1 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times1' );
  var Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times2' );
  var Times2Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times2Minus3' );
  var Times2Plus1 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times2Plus1' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScene( options ) {

    /**
     * Constructors for {NumberFunction} types, in the order that they appear in the function carousel.
     * @type {constructor[]}
     * @public (read-only)
     */
    this.functionConstructors = [
      Plus3,
      Minus3,
      Times1,
      Minus0,
      Times2Plus1,
      Times2,
      Plus3Times2,
      Plus7,
      Times2Minus3
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

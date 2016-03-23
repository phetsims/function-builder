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
  var MysteryMinus0 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryMinus0' );
  var MysteryPlus3Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryPlus3Times2' );
  var MysteryPlus7 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryPlus7' );
  var MysteryTimes1 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryTimes1' );
  var MysteryTimes2 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryTimes2' );
  var MysteryTimes2Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryTimes2Minus3' );
  var Plus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus3' );
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
      MysteryTimes1,
      MysteryMinus0,
      Times2Plus1,
      MysteryTimes2,
      MysteryPlus3Times2,
      MysteryPlus7,
      MysteryTimes2Minus3
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

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );

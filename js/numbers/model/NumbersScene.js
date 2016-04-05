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
  var Range = require( 'DOT/Range' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );

  // function modules
  var Minus2 = require( 'FUNCTION_BUILDER/numbers/model/functions/Minus2' );
  var Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Minus3' );
  var MinusMystery0 = require( 'FUNCTION_BUILDER/numbers/model/functions/MinusMystery0' );
  var MysteryPlus3Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryPlus3Times2' );
  var MysteryPlus7 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryPlus7' );
  var TimesMystery1 = require( 'FUNCTION_BUILDER/numbers/model/functions/TimesMystery1' );
  var MysteryTimes2 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryTimes2' );
  var MysteryTimes2Minus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/MysteryTimes2Minus3' );
  var Plus1 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus1' );
  var Plus1Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus1Times2' );
  var Plus3 = require( 'FUNCTION_BUILDER/numbers/model/functions/Plus3' );
  var PlusMystery2 = require( 'FUNCTION_BUILDER/numbers/model/functions/PlusMystery2' );
  var Times0 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times0' );
  var Times2 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times2' );
  var Times2Plus1 = require( 'FUNCTION_BUILDER/numbers/model/functions/Times2Plus1' );

  // constants
  var CARD_NUMBERS_RANGE = new Range( -4, 7 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScene( options ) {

    /**
     * Numbers for the input cards, in the order that they appear in the input carousel.
     * @type {HTMLImageElement[]}
     * @public (read-only)
     */
    this.cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      this.cardNumbers.push( i );
    }

    /**
     * Constructors for {NumberFunction} types, in the order that they appear in the function carousel.
     * @type {constructor[]}
     * @public (read-only)
     */
    this.functionConstructors = [
      Plus3,
      Plus1,
      PlusMystery2,
      Minus3,
      Minus2,
      MinusMystery0,
      Times2,
      Times0,
      TimesMystery1,
      Times2Plus1,
      Plus1Times2,
      MysteryPlus3Times2,
      MysteryTimes2,
      MysteryPlus7,
      MysteryTimes2Minus3
    ];

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );

// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Disappear = require( 'FUNCTION_BUILDER/common/model/Disappear' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/common/model/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/common/model/Warhol' );

  // images
  var cherriesImage = require( 'image!FUNCTION_BUILDER/inputs/cherries.png' );

  /**
   * @constructor
   */
  function TestView() {

    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    var inputCard = new Card( 'cherries', cherriesImage );

    var functions = [
      new Disappear(),
      new Grayscale(),
      new InvertRGB(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC(),
      new Mirror(),
      new Rotate90(),
      new Rotate180(),
      new Shrink75(),
      new Warhol()
    ];

    var boxChildren = [ new CardNode( inputCard ) ];
    functions.forEach( function( functionInstance ) {
      var outputCard = functionInstance.apply( inputCard );
      boxChildren.push( new CardNode( outputCard ) );
    } );

    this.addChild( new HBox( {
      children: boxChildren,
      spacing: 15,
      center: this.layoutBounds.center
    } ) );
  }

  return inherit( ScreenView, TestView );
} );
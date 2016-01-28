// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  var PatternsView = require( 'FUNCTION_BUILDER/patterns/view/PatternsView' );
  var Screen = require( 'JOIST/Screen' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // images
  var starImage = require( 'image!FUNCTION_BUILDER/inputs/star.png' );

  // strings
  var screenPatternsString = require( 'string!FUNCTION_BUILDER/screen.patterns' );

  /**
   * Creates the icon for this screen, the Warhol function applied to the star image.
   * @returns {Node}
   */
  var createIcon = function() {
    var functionInstance = new Warhol();
    var card = ImageCard.withImage( starImage );
    var imageNode = new Image( functionInstance.apply( card.canvas ) );
    return new ScreenIcon( imageNode, { fill: 'rgb( 255, 247, 235 )' } );
  };

  /**
   * @constructor
   */
  function PatternsScreen() {

    Screen.call( this,
      screenPatternsString,
      createIcon(),
      function() { return new PatternsModel(); },
      function( model ) { return new PatternsView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'PatternsScreen', PatternsScreen );

  return inherit( Screen, PatternsScreen );
} );
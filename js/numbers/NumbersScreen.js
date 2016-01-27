// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  var NumbersView = require( 'FUNCTION_BUILDER/numbers/view/NumbersView' );
  var Screen = require( 'JOIST/Screen' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screenNumbersString = require( 'string!FUNCTION_BUILDER/screen.numbers' );

  /**
   * Creates the icon for this screen, a function piece with '+ 3' on it.
   * @returns {Node}
   */
  var createIcon = function() {
    var functionNode = new FunctionBackgroundNode( {
      fill: 'rgb( 255, 246, 187 )'
    });
    var textNode = new Text( '+ 3', {
      font: new FBFont( 36 ),
      center: functionNode.center
    } );
    var iconNode = new Node( { children: [ functionNode, textNode ] } );
    return new ScreenIcon( iconNode, {
      fill: 'rgb( 239, 255, 249 )'
    } );
  };

  /**
   * @constructor
   */
  function NumbersScreen() {

    Screen.call( this,
      screenNumbersString,
      createIcon(),
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'NumbersScreen', NumbersScreen );

  return inherit( Screen, NumbersScreen );
} );
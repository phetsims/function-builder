// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardStackNode = require( 'FUNCTION_BUILDER/common/view/CardStackNode' );
  var Carousel = require( 'SUN/Carousel' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function SingleSceneNode( model, layoutBounds, options ) {

    //TODO delete this placeholder
    var icon = new PatternsIconFactory.createSingleSceneIcon( 200 );
    icon.center = layoutBounds.center;

    // Input cards, in a vertical carousel
    var inputNodes = [];
    model.inputs.forEach( function( input ) {
      inputNodes.push( new CardStackNode( input.image, {
        numberOfCards: 2
      } ) );
    } );
    var inputsCarousel = new Carousel( inputNodes, {
      orientation: 'vertical',
      pageControlVisible: true,
      separatorsVisible: true,
      itemsPerPage: 4,
      left: layoutBounds.left + 50,
      centerY: layoutBounds.centerY
    } );

    //TODO delete Carousel test
    var colors = [ 'red', 'blue', 'green', 'yellow', 'pink', 'white', 'orange', 'magenta', 'purple', 'pink' ];
    var hItems = [];
    colors.forEach( function( color ) {
      hItems.push( new FunctionNode( { fill: color } ) );
    } );
    var hCarousel = new Carousel( hItems, {
      orientation: 'horizontal',
      pageControlVisible: true,
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 50
    } );

    options.children = [ icon, inputsCarousel, hCarousel ];
    Node.call( this, options );
  }

  return inherit( Node, SingleSceneNode );
} );

// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Carousel = require( 'SUN/Carousel' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function SingleSceneNode( layoutBounds, options ) {

    var icon = new PatternsIconFactory.createSingleSceneIcon( 200 );
    icon.center = layoutBounds.center;

    //TODO delete Carousel test
    // items
    var colors = [ 'red', 'blue', 'green', 'yellow', 'pink', 'white', 'orange', 'magenta', 'purple', 'pink' ];
    var vItems = [];
    var hItems = [];
    colors.forEach( function( color ) {
      vItems.push( new Rectangle( 0, 0, 75, 75, { fill: color, stroke: 'black' } ) );
      hItems.push( new FunctionNode( { fill: color } ) );
    } );

    var vCarousel = new Carousel( vItems, {
      orientation: 'vertical',
      pageControlVisible: true,
      separatorsVisible: true,
      itemsPerPage: 4,
      left: layoutBounds.left + 50,
      centerY: layoutBounds.centerY
    } );

    var hCarousel = new Carousel( hItems, {
      orientation: 'horizontal',
      pageControlVisible: true,
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 50
    } );

    options.children = [ icon, vCarousel, hCarousel ];
    Node.call( this, options );
  }

  return inherit( Node, SingleSceneNode );
} );

// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageCard}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {ImageCard} card
   * @param {ImageCardContainer} inputContainer
   * @param {ImageCardContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} worldNode
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, inputContainer, outputContainer, builderNode, worldNode, options ) {

    assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

    options = _.extend( {
      size: FBConstants.CARD_SIZE,
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null,
      imageScale: 0.3
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    var imageNode = new Image( card.canvas.toDataURL(), {
      initialWidth: card.canvas.width,
      initialHeight: card.canvas.height,
      scale: options.imageScale,
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, imageNode ];

    options.startDrag = function( cardNode, event, trail ) {

      var card = cardNode.movable;

      if ( inputContainer.containsNode( cardNode ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( cardNode );

        card.moveTo( inputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
      }
      else if ( outputContainer.containsNode( cardNode ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( cardNode );
        card.moveTo( outputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
      }

      worldNode.addChild( cardNode );
    };

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( cardNode, event, trail ) {

      var card = cardNode.movable;

      //TODO temporary, send the card to the closest carousel
      var xMiddle = inputContainer.carouselLocation.x + ( outputContainer.carouselLocation.x - inputContainer.carouselLocation.x ) / 2;
      if ( card.locationProperty.get().x < xMiddle ) {

        // return to input carousel
        card.animateTo( inputContainer.carouselLocation,
          function() {
            worldNode.removeChild( cardNode );
            inputContainer.addNode( cardNode );
          } );
      }
      else {

        // return to output carousel
        card.animateTo( outputContainer.carouselLocation,
          function() {
            worldNode.removeChild( cardNode );
            outputContainer.addNode( cardNode );
          } );
      }
    };

    card.locationProperty.link( function( location ) {
      //TODO change card image based on location relative to builder slots
    } );

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( MovableNode, ImageCardNode );
} );

// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageCard}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {ImageCard} card
   * @param {ImageCardContainer} inputContainer
   * @param {ImageCardContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} foregroundAnimationLayer
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer, options ) {

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

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer, options );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( CardNode, ImageCardNode );
} );

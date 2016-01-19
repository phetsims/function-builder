// Copyright 2016, University of Colorado Boulder

/**
 * Node that creates {ImageCard} instances.
 * For each type of {ImageCard}, an instance of this Node is placed in the input carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {HTMLImageElement} image - image that appears on the card when it's created
   * @param {function(Event): Vector2} viewToModelVector2 - converts a view {Event} to a model {Vector2}
   * @param {ImageCardListener} cardListener
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardCreatorNode( image, viewToModelVector2, cardListener, options ) {

    options = _.extend( {
      maxInstances: 2,
      popOutOffset: FBConstants.CARD_POP_OUT_OFFSET,
      createdListener: cardListener.createdListener.bind( cardListener ),
      endDrag: cardListener.endDrag.bind( cardListener )
    }, options );

    var createInstance = function( options ) {
      return ImageCard.withImage( image, options );
    };

    var iconNode = new ImageCardNode( createInstance() );
    var disabledIconNode = new ImageCardNode( createInstance(), {
      opacity: 0.4,
      lineDash: [ 4, 4 ]
    } );

    MovableCreatorNode.call( this, createInstance, viewToModelVector2, iconNode, disabledIconNode, options );
  }

  functionBuilder.register( 'ImageCardCreatorNode', ImageCardCreatorNode );

  return inherit( MovableCreatorNode, ImageCardCreatorNode, {

    // dispose not needed, instances of this type exist for the lifetime of the sim
  } );
} );
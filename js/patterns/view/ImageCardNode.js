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
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, options ) {

    assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

    options = _.extend( {
      size: FBConstants.CARD_SIZE,
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null,
      imageScale: 0.3,

      // dragging the Node moves it to the front
      startDrag: function( movableNode, event, trail ) {
        movableNode.moveToFront();
      }
    }, options );

    this.imageScale = options.imageScale; // @private

    // @private
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    // @private set by setCard
    this.imageNode = null;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];

    MovableNode.call( this, card, options );

    this.setCard( card );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( MovableNode, ImageCardNode, {

    //TODO temporary, to demonstrate update of cards in output carousel
    /**
     * Sets the model element displayed by this card.
     * @param {ImageCard} card
     * @public
     */
    setCard: function( card ) {

      assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

      this.card = card;

      this.imageNode && this.removeChild( this.imageNode );

      // Because this.imageNode.setImage doesn't work reliably with a data URL
      this.imageNode = new Image( card.canvas.toDataURL(), {
        initialWidth: card.canvas.width,
        initialHeight: card.canvas.height,
        scale: this.imageScale,
        center: this.backgroundNode.center
      } );
      this.addChild( this.imageNode );
    }
  } );
} );

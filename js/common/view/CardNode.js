// Copyright 2015, University of Colorado Boulder

/**
 * Cards that serve as the user interface for function inputs and outputs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Card} card
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, options ) {

    options = _.extend( {
      size: new Dimension2( 60, 60 ),
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      xMargin: 5,
      yMargin: 5,
      imageScale: 0.3
    }, options );

    this.imageScale = options.imageScale; // @private

    // @private
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, options.cornerRadius, options.cornerRadius, {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    // @private set by setCard
    this.imageNode = null;

    options.children = [ this.backgroundNode ];
    Node.call( this, options );

    this.setCard( card );
  }

  return inherit( Node, CardNode, {

    //TODO this is temporary
    /**
     * Sets the model element displayed by this card.
     * @param {Card} card
     */
    setCard: function( card ) {

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

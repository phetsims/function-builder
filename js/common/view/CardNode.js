// Copyright 2015-2016, University of Colorado Boulder

//TODO this is specific to ImageCard, generalize
/**
 * Cards that serve as the user interface for function inputs and outputs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
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

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];
    Node.call( this, options );

    // @private
    this.disposeCardNode = function() {
      //TODO
    };

    this.setCard( card );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( Node, CardNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeCardNode();
    },

    //TODO this is temporary
    /**
     * Sets the model element displayed by this card.
     * @param {Card} card
     */
    setCard: function( card ) {

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

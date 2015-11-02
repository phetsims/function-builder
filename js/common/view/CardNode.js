// Copyright 2002-2015, University of Colorado Boulder

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

    // @private
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, options.cornerRadius, options.cornerRadius, {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    // @private
    this.imageNode = new Image( card.canvas.toDataURL(), {
      initialWidth: card.canvas.width,
      initialHeight: card.canvas.height,
      scale: options.imageScale,
      center: this.backgroundNode.center
    } );

    options.children = [ this.backgroundNode, this.imageNode ];
    Node.call( this, options );
  }

  return inherit( Node, CardNode, {

    //TODO this is temporary
    setCard: function( card ) {
      this.imageNode.setImage( card.canvas.toDataURL() );
      this.imageNode.center = this.backgroundNode.center
    }
  } );
} );

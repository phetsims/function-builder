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
   * @param {HTMLImageElement|MipMapArray} image - client is responsible for ensuring that it fits on card
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( image, options ) {

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

    var background = new Rectangle( 0, 0, options.size.width, options.size.height, options.cornerRadius, options.cornerRadius, {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    var imageNode = new Image( image, {
      scale: options.imageScale,
      center: background.center
    } );

    options.children = [ background, imageNode ];
    Node.call( this, options );
  }

  return inherit( Node, CardNode );
} );

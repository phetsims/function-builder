// Copyright 2016, University of Colorado Boulder

/**
 * TODO doc
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   *
   * @param {HTMLImageElement} image
   * @param {Object} [options]
   * @constructor
   */
  function ImageGhostCard( image, options ) {

    options = _.extend( {}, FBConstants.CARD_OPTIONS, options );
    options.lineDash = [ 4, 4 ];
    options.opacity = 0.5;

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    var imageNode = new Image( image, {
      scale: FBConstants.IMAGE_CARD_SCALE,
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, imageNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'ImageGhostCard', ImageGhostCard );

  return inherit( Node, ImageGhostCard );
} );

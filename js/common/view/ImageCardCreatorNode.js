// Copyright 2016, University of Colorado Boulder

/**
 * For each type of ImageCard, an instance of this node is placed in the input carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/common/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {function} createInstance - function called to create an {ImageCard}
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardCreatorNode( createInstance, options ) {
    MovableCreatorNode.call( this, new ImageCardNode( createInstance() ), createInstance, options );
  }

  functionBuilder.register( 'ImageCardCreatorNode', ImageCardCreatorNode );

  return inherit( MovableCreatorNode, ImageCardCreatorNode );
} );
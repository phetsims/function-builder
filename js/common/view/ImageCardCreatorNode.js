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
   * @param {function} createCard - function called to create an {ImageCard}
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardCreatorNode( createCard, options ) {

    // The icon that represents the card
    var iconNode = new ImageCardNode( createCard(), {
      cursor: 'pointer'
    } );

    MovableCreatorNode.call( this, iconNode, createCard, options );
  }

  functionBuilder.register( 'ImageCardCreatorNode', ImageCardCreatorNode );

  return inherit( MovableCreatorNode, ImageCardCreatorNode );
} );
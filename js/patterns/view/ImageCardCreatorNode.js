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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {function} createInstance - function called to create an {ImageCard}
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardCreatorNode( createInstance, options ) {

    options = _.extend( {
      maxInstances: 2
    }, options );

    var iconNode = new ImageCardNode( createInstance() );
    var disabledIconNode = new ImageCardNode( createInstance(), {
      opacity: 0.2,
      lineDash: [ 3, 3 ]
    } );

    MovableCreatorNode.call( this, iconNode, disabledIconNode, createInstance, options );
  }

  functionBuilder.register( 'ImageCardCreatorNode', ImageCardCreatorNode );

  return inherit( MovableCreatorNode, ImageCardCreatorNode );
} );
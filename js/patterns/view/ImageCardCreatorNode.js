// Copyright 2016, University of Colorado Boulder

//TODO This creator should show a 'ghost' card when maxInstances have been created.
/**
 * For each type of {ImageCard}, an instance of this node is placed in the input carousel.
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
      maxInstances: 2,
      disabledIconOpacity: 0.2
    }, options );

    var iconNode = new ImageCardNode( createInstance() );

    MovableCreatorNode.call( this, iconNode, createInstance, options );
  }

  functionBuilder.register( 'ImageCardCreatorNode', ImageCardCreatorNode );

  return inherit( MovableCreatorNode, ImageCardCreatorNode );
} );
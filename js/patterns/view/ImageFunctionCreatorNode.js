// Copyright 2016, University of Colorado Boulder

/**
 * Node that creates {ImageFunction} instances.
 * For each type of {ImageFunction}, an instance of this Node is placed in the functions carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {function(Object): ImageFunction} createInstance - creates an instance
   * @param {function(Event): Vector2} viewToModelVector2 - converts a view {Event} to a model {Vector2}
   * @param {ImageFunctionCreatedListener} functionCreatedListener
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionCreatorNode( createInstance, viewToModelVector2, functionCreatedListener, options ) {

    options = _.extend( {
      maxInstances: 2,
      popOutOffset: FBConstants.FUNCTION_POP_OUT_OFFSET,
      createdListener: functionCreatedListener.createdListener.bind( functionCreatedListener ),
      endDrag: functionCreatedListener.endDrag.bind( functionCreatedListener )
    }, options );

    var iconNode = new ImageFunctionNode( createInstance() );
    var disabledIconNode = new Rectangle( 0, 0, 1, 1 ); // any non-visible Node with well-defined bounds will do here

    MovableCreatorNode.call( this, createInstance, viewToModelVector2, iconNode, disabledIconNode, options );
  }

  functionBuilder.register( 'ImageFunctionCreatorNode', ImageFunctionCreatorNode );

  return inherit( MovableCreatorNode, ImageFunctionCreatorNode );
} );
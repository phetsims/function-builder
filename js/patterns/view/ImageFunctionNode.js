// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageFunction}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {ImageFunctionContainer} container
   * @param {BuilderNode} builderNode
   * @param {Node} worldNode
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionNode( functionInstance, container, builderNode, worldNode, options ) {

    assert && assert( functionInstance instanceof ImageFunction, 'unexpected type: ' + functionInstance.constructor.name );

    options = _.extend( {
      iconScale: 0.3 // {number} scale for icon
    }, options );

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );

    var iconNode = new Image( functionInstance.image, {
      scale: options.iconScale,
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode ];

    options.startDrag = function( functionNode, event, trail ) {

      functionNode.moveToFront();

      var functionInstance = functionNode.movable;

      if ( container.containsNode( functionNode ) ) {

        // if function is in the carousel, pop it out
        container.removeNode( functionNode );
        worldNode.addChild( functionNode );
        functionInstance = functionNode.movable;
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {

        // function is in the builder, pop it out
        //TODO temporary, functionNode should be parented to builderNode
        functionInstance.moveTo( functionInstance.locationProperty.get().plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
        builderNode.builder.removeFunctionInstance( functionInstance );
      }
    };

    options.endDrag = function( functionNode, event, trail ) {

      var functionInstance = functionNode.movable;

      //TODO handle differently, re-parent to builderNode
      // try to add function to the builder
      var slotNumber = builderNode.builder.addFunctionInstance( functionInstance );

      // If the function isn't added to the builder, then return it to the container.
      if ( slotNumber === -1 ) {
        functionInstance.animateTo( container.carouselLocation,
          function() {
            worldNode.removeChild( functionNode );
            container.addNode( functionNode );
          } );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'ImageFunctionNode', ImageFunctionNode );

  return inherit( MovableNode, ImageFunctionNode );
} );
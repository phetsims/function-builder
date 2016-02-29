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

    this.container = container; // @public

    var thisNode = this;

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );

    var iconNode = new Image( functionInstance.image, {
      scale: options.iconScale,
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode ];

    options.startDrag = function( event, trail ) {

      var functionInstance = thisNode.movable;
      var builder = builderNode.builder;

      if ( container.containsNode( thisNode ) ) {

        // function is in the carousel, pop it out
        container.removeNode( thisNode );
        worldNode.addChild( thisNode );
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builder.containsFunctionInstance( functionInstance ) ) {

        // function is in the builder, pop it out
        var slotNumber = builder.getSlotNumber( functionInstance );
        var slotLocation = builder.slots[ slotNumber ].location;
        builderNode.removeFunctionNode( thisNode, slotNumber );
        worldNode.addChild( thisNode );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in the world, do nothing
      }

      assert && assert( worldNode.hasChild( thisNode ) );
    };

    options.endDrag = function( event, trail ) {

      var functionInstance = thisNode.movable;
      var builder = builderNode.builder;

      // Find the closest slot
      var slotNumber = builder.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === -1 ) {

        // return function to the carousel
        functionInstance.animateTo( container.carouselLocation,
          function() {
            worldNode.removeChild( thisNode );
            container.addNode( thisNode );
          } );
      }
      else {

        // put function in builder slot
        var slot = builder.slots[ slotNumber ];
        functionInstance.animateTo( slot.location,
          function() {

            //TODO if an adjacent slot is empty, move the occupying function there
            // If the slot is occupied, return the occupying function to the carousel.
            var occupierNode = builderNode.getFunctionNode( slotNumber );
            if ( occupierNode ) {
              builderNode.removeFunctionNode( occupierNode, slotNumber );
              worldNode.addChild( occupierNode );
              occupierNode.movable.animateTo( occupierNode.container.carouselLocation,
                function() {
                  worldNode.removeChild( occupierNode );
                  occupierNode.container.addNode( occupierNode );
                } );
            }

            worldNode.removeChild( thisNode );
            builderNode.addFunctionNode( thisNode, slotNumber );
          } );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'ImageFunctionNode', ImageFunctionNode );

  return inherit( MovableNode, ImageFunctionNode );
} );
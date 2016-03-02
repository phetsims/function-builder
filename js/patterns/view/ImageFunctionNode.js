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
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

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

    assert && assert( !options.startDrag );
    options.startDrag = function( event, trail ) {

      if ( container.containsNode( thisNode ) ) {

        // function is in the carousel, pop it out
        container.removeNode( thisNode );
        worldNode.addChild( thisNode );
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builderNode.containsFunctionNode( thisNode ) ) {

        // function is in the builder, pop it out
        var slotNumber = builderNode.getSlotNumber( thisNode );
        var slotLocation = builderNode.getSlotLocation( slotNumber );
        builderNode.removeFunctionNode( thisNode, slotNumber );
        worldNode.addChild( thisNode );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in the world, do nothing
      }

      assert && assert( worldNode.hasChild( thisNode ) );
    };

    assert && assert( !options.endDrag );
    options.endDrag = function( event, trail ) {

      // Find the closest slot
      var slotNumber = builderNode.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === -1 ) {

        // return function to the carousel
        thisNode._returnToCarousel();
      }
      else {

        // put function in builder slot
        functionInstance.animateTo( builderNode.getSlotLocation( slotNumber ),
          function() {

            //TODO if an adjacent slot is empty, move the occupying function there
            // If the slot is occupied, return the occupying function to the carousel.
            var occupierNode = builderNode.getFunctionNode( slotNumber );
            occupierNode && occupierNode.returnToCarousel();

            worldNode.removeChild( thisNode );
            builderNode.addFunctionNode( thisNode, slotNumber );
          } );
      }
    };

    // @private
    this._returnToCarousel = function( options ) {

      options = _.extend( {
        animate: true // true: animate back to carousel, false: move immediate back to carousel
      }, options );

      if ( !container.containsNode( thisNode ) ) {

        // if in the builder, move to the world
        if ( builderNode.containsFunctionNode( thisNode ) ) {
          var slotNumber = builderNode.getSlotNumber( thisNode );
          builderNode.removeFunctionNode( thisNode, slotNumber );
          worldNode.addChild( thisNode );
        }

        if ( options.animate ) {

          // animate to the carousel
          thisNode.functionInstance.animateTo( thisNode.container.carouselLocation,
            function() {
              worldNode.removeChild( thisNode );
              thisNode.container.addNode( thisNode );
            } );
        }
        else {

          // move immediately to the carousel
          worldNode.removeChild( thisNode );
          thisNode.functionInstance.moveTo( thisNode.container.carouselLocation );
          thisNode.container.addNode( thisNode );
        }
      }
    };

    FunctionNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'ImageFunctionNode', ImageFunctionNode );

  return inherit( FunctionNode, ImageFunctionNode, {

    /**
     * Returns this function to the carousel.
     *
     * @param {Object} options see _returnToCarousel
     * @public
     */
    returnToCarousel: function( options ) {
      this._returnToCarousel( options );
    }
  } );
} );
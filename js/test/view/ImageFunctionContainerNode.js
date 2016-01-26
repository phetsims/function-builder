// Copyright 2016, University of Colorado Boulder

/**
 * Container for {ImageFunction} instances.
 *
 * Responsibilities:
 *
 * - create a specified number of {ImageFunction} function instance, all of the same type
 * - create an associated Node for each instance
 * - handle dragging instances out of the container
 * - decide what to do with an instance when the user stops dragging it
 * - return an instance to the container when it's location is the same as the container
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainerNode = require( 'FUNCTION_BUILDER/test/view/MovableContainerNode' );
  var MovableImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageFunctionNode' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {ImageFunction}
   * @param {number} numberOfInstances - number of instances to create
   * @param {Node} parentNode - parent for function Nodes when they are outside the container
   * @param {PatternsScene} scene
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainerNode( FunctionConstructor, numberOfInstances, parentNode, scene, options ) {

    options = _.extend( {
      popOutOffset: FBConstants.FUNCTION_POP_OUT_OFFSET
    }, options );

    var thisNode = this;

    // Compute the size of the container, assumes all function are the same size
    var functionBackgroundNode = new FunctionBackgroundNode();
    options.size = new Dimension2( functionBackgroundNode.width, functionBackgroundNode.height );

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( functionInstance ) {

      //TODO see ImageFunctionListener
      //TODO if ( functionInstance.location === thisNode.location ) { put Node back in container; }
      //TODO else {
      //TODO    try to add to builder
      //TODO    if ( !added to builder ) { functionInstance.destination === thisNode.location; }
      //TODO }
      if ( functionInstance.locationProperty.get().distance( thisNode.location ) < 25 ) {
        //  functionInstance.destination = thisNode.location;
        functionInstance.locationProperty.set( thisNode.location ); //TODO animate, see line above
      }
    };

    MovableContainerNode.call( this, parentNode, options );

    // Populate the container
    for ( var i = 0; i < numberOfInstances; i++ ) {

      // IIFE to create a closure for each function instance
      (function() {

        // model element
        var functionInstance = new FunctionConstructor();
        scene.addFunctionInstance( functionInstance );

        // associated node
        var functionNode = new MovableImageFunctionNode( functionInstance, {
          endDrag: options.endDrag
        } );

        // put the node in the container
        thisNode.push( functionNode );

        // return the node to the container
        functionInstance.locationProperty.lazyLink( function( location ) {
          if ( !functionInstance.dragging && location.equals( thisNode.location ) ) {
            thisNode.push( functionNode );
          }
        } );
      })();
    }
  }

  return inherit( MovableContainerNode, ImageFunctionContainerNode );
} );

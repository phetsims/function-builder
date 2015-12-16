// Copyright 2015, University of Colorado Boulder

/**
 * Test for FunctionCreatorNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Bounds2} layoutBounds
   */
  function testFunctionInteractions( layoutBounds ) {

    var testParent = new Node();  // parent of all nodes in this test

    var iconNode = new FunctionNode( new Identity() );

    var returnToCreatorNode = function( functionInstance, event, trail ) {
      functionInstance.locationProperty.reset();
    };

    /**
     * Creates a function instance and wires it into the sim.
     * @param {Vector2} initialLocation
     * @returns {AbstractFunction}
     */
    var createFunctionInstance = function( initialLocation ) {

      // create the function instance
      var functionInstance = new Identity( {
        location: initialLocation,
        dragging: true
      } );

      // create an associated node
      var functionNode = new MovableFunctionNode( functionInstance, {
        endDrag: returnToCreatorNode
      } );
      testParent.addChild( functionNode );

      // when the function instance is disposed of, remove the associated node
      functionInstance.disposed.addListener( function() {
        functionNode.dispose();
        testParent.removeChild( functionNode );
      } );

      return functionInstance;
    };

    var functionCreatorNode = new FunctionCreatorNode( iconNode, createFunctionInstance, {
      maxInstances: 3,
      endDrag: returnToCreatorNode,
      center: layoutBounds.center
    } );
    testParent.addChild( functionCreatorNode );

    return testParent;
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  return testFunctionInteractions;
} );

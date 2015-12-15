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
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {Bounds2} layoutBounds
   */
  function testFunctionInteractions( layoutBounds ) {

    var testParent = new Node();  // parent of all nodes in this test

    var iconNode = new FunctionNode( new Identity() );

    /**
     * Creates a function instance and wires it into the sim.
     * @param {Vector2} initialLocation
     * @returns {AbstractFunction}
     */
    var createFunctionInstance = function( initialLocation ) {

      // create the function instance
      var functionInstance = new Identity( { location: initialLocation } );

      // create an associated node
      var functionNode = new MovableFunctionNode( functionInstance );
      functionNode.cursor = 'pointer';
      testParent.addChild( functionNode );

      // drag functionNode back to the functionCreatorNode to dispose of functionInstance
      functionNode.addInputListener( new SimpleDragHandler( {

        translate: function( translationParams ) {
          var location = functionInstance.locationProperty.get().plus( translationParams.delta );
          functionInstance.locationProperty.set( location );
        },

        end: function( event, trail ) {
          var globalTargetBounds = event.currentTarget.parentToGlobalBounds( event.currentTarget.bounds );
          var globalCreatorBounds = functionCreatorNode.parentToGlobalBounds( functionCreatorNode.bounds );
          if ( globalTargetBounds.intersectsBounds( globalCreatorBounds ) ) {
            functionInstance.dispose();
          }
        }
      } ) );

      // when the function instance is disposed of, remove the associated node
      functionInstance.disposed.addListener( function() {
        functionNode.dispose();
        testParent.removeChild( functionNode );
      } );

      return functionInstance;
    };

    var functionCreatorNode = new FunctionCreatorNode( iconNode, createFunctionInstance, {
      maxInstances: 3,
      center: layoutBounds.center
    } );
    testParent.addChild( functionCreatorNode );

    return testParent;
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  return testFunctionInteractions;
} );

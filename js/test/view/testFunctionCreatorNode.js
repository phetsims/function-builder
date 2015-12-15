// Copyright 2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Bounds2} layoutBounds
   */
  function testFunctionCreatorNode( layoutBounds ) {

    var testParent = new Node();  // parent of all nodes in this test

    var iconNode = new FunctionNode( new Identity() );

    var createFunctionInstance = function( initialLocation ) {

      // create the function instance
      var functionInstance = new Identity( { location: initialLocation } );

      // create an associated node
      var movableFunctionNode = new MovableFunctionNode( functionInstance );
      testParent.addChild( movableFunctionNode );

      // click on the function node to dispose of its associated function instances
      movableFunctionNode.addInputListener( new DownUpListener( {
        down: function() {
          functionInstance.dispose();
        }
      } ) );

      // when the function instance is disposed of, remove the associated node
      functionInstance.disposeEmitter.addListener( function() {
        movableFunctionNode.dispose();
        testParent.removeChild( movableFunctionNode );
      } );

      return functionInstance;
    };

    var functionCreatorNode = new FunctionCreatorNode( iconNode, createFunctionInstance, {
      maxInstances: 2,
      center: layoutBounds.center
    } );
    testParent.addChild( functionCreatorNode );

    return testParent;
  }

  functionBuilder.register( 'testFunctionCreatorNode', testFunctionCreatorNode );

  return testFunctionCreatorNode;
} );

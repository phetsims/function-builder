// Copyright 2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Bounds2} layoutBounds
   */
  function testFunctionCreatorNode( layoutBounds ) {

    var iconNode = new FunctionNode( new Identity() );

    var createFunctionInstance = function( initialLocation ) {
      var functionInstance = new Identity( { location: initialLocation } );
      //TODO add to model
      //TODO create associated Node
      return functionInstance;
    };

    var functionCreatorNode = new FunctionCreatorNode( iconNode, createFunctionInstance, {
      maxInstances: 2,
      center: layoutBounds.center
    } );

    return functionCreatorNode;
  }

  functionBuilder.register( 'testFunctionCreatorNode', testFunctionCreatorNode );

  return testFunctionCreatorNode;
} );

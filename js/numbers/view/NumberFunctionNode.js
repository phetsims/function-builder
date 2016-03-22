// Copyright 2016, University of Colorado Boulder

//TODO much in common with ImageFunctionNode
/**
 * Node that displays a {NumberFunction}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {NumberFunction} functionInstance
   * @param {NumberFunctionContainer} container
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunctionNode( functionInstance, container, builderNode, dragLayer, animationLayer, options ) {

    assert && assert( functionInstance instanceof NumberFunction, 'unexpected type: ' + functionInstance.constructor.name );

    var contentNode = new Text( functionInstance.labelString, {
      font: FBConstants.NUMBER_FUNCTION_FONT
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, animationLayer, options );
  }

  functionBuilder.register( 'NumberFunctionNode', NumberFunctionNode );

  return inherit( FunctionNode, NumberFunctionNode );
} );
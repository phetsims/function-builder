// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays a {EquationFunction}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var EquationFunction = require( 'FUNCTION_BUILDER/equations/model/EquationFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBNumberPicker = require( 'FUNCTION_BUILDER/equations/view/FBNumberPicker' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {EquationFunction} functionInstance
   * @param {EquationFunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function EquationFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof EquationFunction, 'unexpected type: ' + functionInstance.constructor.name );

    var operatorNode = new Text( functionInstance.labelString, {
      font: FBConstants.FUNCTION_OPERATOR_FONT
    } );

    var picker = new FBNumberPicker( functionInstance.operandProperty, functionInstance.operandRange, {
      color: functionInstance.viewOptions.pickerColor,
      font: FBConstants.FUNCTION_PICKER_FONT,
      skipZero: !functionInstance.zeroOperandValid
    } );

    // prevent clicking on the picker from starting a drag sequence for the function node
    picker.addInputListener( {
      down: function( event, trail ) {
        event.handle(); // don't propagate event to parent
      }
    } );

    var contentNode = new HBox( {
      children: [ operatorNode, picker ],
      spacing: 5
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'EquationFunctionNode', EquationFunctionNode );

  return inherit( FunctionNode, EquationFunctionNode );
} );
// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node that synchronizes with a MathFunction, and supports changing its operand via a NumberPicker.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBNumberPicker = require( 'FUNCTION_BUILDER/common/view/FBNumberPicker' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathFunction = require( 'FUNCTION_BUILDER/common/model/functions/MathFunction' );
  const Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function EditableMathFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof MathFunction );

    const operatorNode = new Text( functionInstance.operator, {
      font: FBConstants.EQUATIONS_FUNCTION_OPERATOR_FONT
    } );

    // picker for changing operand value
    const picker = new FBNumberPicker( functionInstance.operandProperty, functionInstance.operandRange, {
      color: functionInstance.viewOptions.pickerColor,
      font: FBConstants.EQUATIONS_FUNCTION_PICKER_FONT,
      arrowLineWidth: 0.5,
      skipZero: !functionInstance.zeroOperandValid
    } );

    // prevent clicking on the picker from starting a drag sequence for the function node
    picker.addInputListener( {
      down: function( event ) {
        event.handle(); // don't propagate event to parent
      }
    } );

    const contentNode = new HBox( {
      children: [ operatorNode, picker ],
      spacing: 5
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'EditableMathFunctionNode', EditableMathFunctionNode );

  return inherit( FunctionNode, EditableMathFunctionNode );
} );
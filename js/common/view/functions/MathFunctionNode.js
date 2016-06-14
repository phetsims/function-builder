// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays a mathematical function.
 * If the operand is mutable, then a picker is included.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBNumberPicker = require( 'FUNCTION_BUILDER/common/view/FBNumberPicker' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/functions/MathFunction' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function MathFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof MathFunction );

    var contentNode = null;
    if ( functionInstance.operandMutable ) {

      var operatorNode = new Text( functionInstance.operatorString, {
        font: FBConstants.EQUATIONS_FUNCTION_OPERATOR_FONT
      } );

      // picker for changing operand value
      var picker = new FBNumberPicker( functionInstance.operandProperty, functionInstance.operandRange, {
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

      contentNode = new HBox( {
        children: [ operatorNode, picker ],
        spacing: 5
      } );
    }
    else {

      var labelString = StringUtils.format( '{0} {1}',
        functionInstance.operatorString, functionInstance.operandProperty.get() );

      contentNode = new Text( labelString, {
        font: FBConstants.NUMBERS_FUNCTION_FONT
      } );
    }

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );
  }

  functionBuilder.register( 'MathFunctionNode', MathFunctionNode );

  return inherit( FunctionNode, MathFunctionNode );
} );
// Copyright 2016, University of Colorado Boulder

/**
 * Math function with immutable operand.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
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
  function ImmutableMathFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof MathFunction );

    var labelString = StringUtils.format( '{0} {1}',
      functionInstance.operatorString, functionInstance.operandProperty.get() );

    var contentNode = new Text( labelString, {
      font: FBConstants.NUMBERS_FUNCTION_FONT
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );

    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.lazyLink( function( operand ) {
      assert && assert( 'operand should not change' );
    } );
  }

  functionBuilder.register( 'ImmutableMathFunctionNode', ImmutableMathFunctionNode );

  return inherit( FunctionNode, ImmutableMathFunctionNode );
} );

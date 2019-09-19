// Copyright 2016, University of Colorado Boulder

/**
 * Node that synchronizes with a MathFunction, but does not support editing its operand.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathFunction = require( 'FUNCTION_BUILDER/common/model/functions/MathFunction' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

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

    var self = this;

    // @private updated by operandProperty observer
    var contentNode = new Text( '', {
      font: FBConstants.NUMBERS_FUNCTION_FONT
    } );

    FunctionNode.call( this, functionInstance, contentNode, container, builderNode, dragLayer, options );

    // synchronize operand with model.
    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.link( function( operand ) {
      contentNode.text = StringUtils.format( '{0} {1}', functionInstance.operator, operand );
      contentNode.center = self.backgroundNode.center;
    } );
  }

  functionBuilder.register( 'MathFunctionNode', MathFunctionNode );

  return inherit( FunctionNode, MathFunctionNode );
} );

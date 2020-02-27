// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node that synchronizes with a MathFunction, but does not support editing its operand.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MathFunction from '../../model/functions/MathFunction.js';
import FunctionNode from './FunctionNode.js';

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

  const self = this;

  // @private updated by operandProperty observer
  const contentNode = new Text( '', {
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

inherit( FunctionNode, MathFunctionNode );
export default MathFunctionNode;
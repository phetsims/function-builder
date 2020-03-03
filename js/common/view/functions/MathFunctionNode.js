// Copyright 2016-2020, University of Colorado Boulder

/**
 * Node that synchronizes with a MathFunction, but does not support editing its operand.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MathFunction from '../../model/functions/MathFunction.js';
import FunctionNode from './FunctionNode.js';

class MathFunctionNode extends FunctionNode {

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   */
  constructor( functionInstance, container, builderNode, dragLayer, options ) {

    assert && assert( functionInstance instanceof MathFunction );

    // @private updated by operandProperty observer
    const contentNode = new Text( '', {
      font: FBConstants.NUMBERS_FUNCTION_FONT
    } );

    super( functionInstance, contentNode, container, builderNode, dragLayer, options );

    // synchronize operand with model.
    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.operandProperty.link( operand => {
      contentNode.text = StringUtils.format( '{0} {1}', functionInstance.operator, operand );
      contentNode.center = this.backgroundNode.center;
    } );
  }
}

functionBuilder.register( 'MathFunctionNode', MathFunctionNode );

export default MathFunctionNode;
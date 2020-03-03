// Copyright 2016-2020, University of Colorado Boulder

/**
 * A 'slot' for a function in a builder.
 * It has the same shape as a function, but a dashed outline and no fill.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBackgroundNode from '../functions/FunctionBackgroundNode.js';

class FunctionSlotNode extends FunctionBackgroundNode {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: null,
      stroke: 'white',
      lineDash: [ 4, 4 ]
    }, options );

    super( options );
  }
}

functionBuilder.register( 'FunctionSlotNode', FunctionSlotNode );

export default FunctionSlotNode;
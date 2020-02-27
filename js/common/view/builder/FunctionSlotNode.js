// Copyright 2016-2019, University of Colorado Boulder

/**
 * A 'slot' for a function in a builder.
 * It has the same shape as a function, but a dashed outline and no fill.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBackgroundNode from '../functions/FunctionBackgroundNode.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function FunctionSlotNode( options ) {

  options = merge( {
    fill: null,
    stroke: 'white',
    lineDash: [ 4, 4 ]
  }, options );

  FunctionBackgroundNode.call( this, options );
}

functionBuilder.register( 'FunctionSlotNode', FunctionSlotNode );

inherit( FunctionBackgroundNode, FunctionSlotNode );
export default FunctionSlotNode;
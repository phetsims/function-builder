// Copyright 2016, University of Colorado Boulder

/**
 * A 'slot' for a function in a builder.
 * It has the same shape as a function, but a dashed outline and no fill.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionBackgroundNode' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionSlotNode( options ) {

    options = _.extend( {
      fill: null,
      stroke: 'white',
      lineDash: [ 4, 4 ]
    }, options );

    FunctionBackgroundNode.call( this, options );
  }

  functionBuilder.register( 'FunctionSlotNode', FunctionSlotNode );

  return inherit( FunctionBackgroundNode, FunctionSlotNode );
} );

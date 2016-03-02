// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, options ) {
    this.functionInstance = functionInstance;
    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode );
} );

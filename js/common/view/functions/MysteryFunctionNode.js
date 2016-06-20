// Copyright 2016, University of Colorado Boulder

/**
 * Function for the Mystery screen.
 * TODO describe what's different
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MutableMathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MutableMathFunctionNode' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function MysteryFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {
    MutableMathFunctionNode.call( this, functionInstance, container, builderNode, dragLayer, options );
    //TODO implement
  }

  functionBuilder.register( 'MysteryFunctionNode', MysteryFunctionNode );

  return inherit( MutableMathFunctionNode, MysteryFunctionNode );
} );

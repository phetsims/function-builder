// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  //var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {ImageFunction} card
   * @param {ImageFunctionContainer} inputContainer
   * @param {ImageFunctionContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} worldNode
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, inputContainer, outputContainer, builderNode, worldNode, options ) {

    options = options || {};

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode );
} );

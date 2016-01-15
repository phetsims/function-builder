// Copyright 2016, University of Colorado Boulder

/**
 * For each type of {ImageFunction}, an instance of this node is placed in the functions carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {function} createInstance - function called to create an {ImageFunction}
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionCreatorNode( createInstance, options ) {
    var iconNode = new ImageFunctionNode( createInstance() );
    MovableCreatorNode.call( this, iconNode, createInstance, options );
  }

  functionBuilder.register( 'ImageFunctionCreatorNode', ImageFunctionCreatorNode );

  return inherit( MovableCreatorNode, ImageFunctionCreatorNode );
} );
// Copyright 2016, University of Colorado Boulder

/**
 * Node that creates {ImageFunction} instances.
 * For each type of {ImageFunction}, an instance of this Node is placed in the functions carousel.
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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {function} createInstance - function called to create an {ImageFunction}
   * @param {Node} globalNode - a Node whose coordinate frame is equivalent to the model coordinate frame
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionCreatorNode( createInstance, globalNode, options ) {

    options = _.extend( {
      maxInstances: 2
    }, options );

    var iconNode = new ImageFunctionNode( createInstance() );
    var disabledIconNode = new Rectangle( 0, 0, 1, 1 ); // any non-visible Node with well-defined bounds will do here

    MovableCreatorNode.call( this, createInstance, globalNode, iconNode, disabledIconNode, options );
  }

  functionBuilder.register( 'ImageFunctionCreatorNode', ImageFunctionCreatorNode );

  return inherit( MovableCreatorNode, ImageFunctionCreatorNode );
} );
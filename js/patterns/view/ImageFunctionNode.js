// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageFunction}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NonInvertibleSymbolNode = require( 'FUNCTION_BUILDER/common/view/NonInvertibleSymbolNode' );
  var OpacityTo = require( 'TWIXT/OpacityTo' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {ImageFunctionContainer} container
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionNode( functionInstance, container, builderNode, dragLayer, animationLayer, options ) {

    assert && assert( functionInstance instanceof ImageFunction, 'unexpected type: ' + functionInstance.constructor.name );

    options = _.extend( {
      iconScale: 0.3 // {number} scale for icon
    }, options );

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );

    var iconNode = new Image( functionInstance.image, {
      scale: options.iconScale,
      center: backgroundNode.center
    } );

    //TODO move to FunctionNode
    // @private
    this.nonInvertibleSymbolNode = new NonInvertibleSymbolNode( {
      center: backgroundNode.center,
      visible: false
    } );

    // @private {OpacityTo} animation for nonInvertibleSymbolNode
    this.opacityTo = null;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode, this.nonInvertibleSymbolNode ];

    FunctionNode.call( this, functionInstance, container, builderNode, dragLayer, animationLayer, options );
  }

  functionBuilder.register( 'ImageFunctionNode', ImageFunctionNode );

  return inherit( FunctionNode, ImageFunctionNode, {

    //TODO move to FunctionNode
    /**
     * Shows the non-invertible symbol for a brief time, fading it out.
     * @public
     */
    showNonInvertibleSymbolNode: function() {

      // stop any animation in progress
      this.opacityTo && this.opacityTo.stop();

      // start full opaque
      var nonInvertibleSymbolNode = this.nonInvertibleSymbolNode;
      nonInvertibleSymbolNode.visible = true;

      // fade out
      this.opacityTo = new OpacityTo( nonInvertibleSymbolNode, {
        duration: 1500, // ms
        startOpacity: 1,
        endOpacity: 0,
        onStart: function() {
          nonInvertibleSymbolNode.visible = true;
        },
        onComplete: function() {
          nonInvertibleSymbolNode.visible = false;
        }
      } );
      this.opacityTo.start();
    }
  } );
} );
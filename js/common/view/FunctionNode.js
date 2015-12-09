// Copyright 2015, University of Colorado Boulder

/**
 * Node for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, options ) {

    options = _.extend( {
      backgroundWidth: 120, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.8, // {number} aspect ratio, width/height
      xInsetFactor: 0.15, // {number} x-inset of arrow-like ends of the background
      iconScale: 0.3 // {number} scale for icon
    }, options );

    // validate options
    assert && assert( options.backgroundWidth > 0 );
    assert && assert( options.aspectRatio > 0 );
    assert && assert( options.xInsetFactor >= 0 && options.xInsetFactor < 0.5 );

    options.children = [];

    var backgroundNode = new FunctionBackgroundNode( {
      fill: functionInstance.fill,
      stroke: functionInstance.stroke,
      lineWidth: functionInstance.lineWidth,
      lineDash: functionInstance.lineDash,
      backgroundWidth: options.backgroundWidth,
      aspectRatio: options.aspectRatio,
      xInsetFactor: options.xInsetFactor
    } );
    options.children.push( backgroundNode );

    if ( functionInstance.image ) {
      var iconNode = new Image( functionInstance.image, {
        scale: options.iconScale,
        center: backgroundNode.center
      } );
      options.children.push( iconNode );
    }

    Node.call( this, options );

    this.functionInstance = functionInstance; // @public (read-only)
    this.xInset = backgroundNode.xInset; // @public (read-only), needed for layout
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( Node, FunctionNode );
} );
// Copyright 2015, University of Colorado Boulder

/**
 * Node for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, options ) {

    options = _.extend( {

      // Shape
      backgroundWidth: 120, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.8, // {number} aspect ratio, width/height
      xInsetFactor: 0.15, // {number} x-inset of arrow-like ends of the background

      // optional icon
      iconScale: 0.3, // {number}
      xMarginFactor: 0.10, // {number} portion of width that determines the x-margin around the icon
      yMarginFactor: 0.05  // {number} portion of height that determines the y-margin around the icon

    }, options );

    // validate options
    assert && assert( options.backgroundWidth > 0 );
    assert && assert( options.aspectRatio > 0 );
    assert && assert( options.xInsetFactor >= 0 && options.xInsetFactor < 0.5 );
    assert && assert( options.xMarginFactor >= 0 );
    assert && assert( options.yMarginFactor >= 0 );

    options.children = [];

    // To improve readability of shape code
    var width = options.backgroundWidth;
    var height = width / options.aspectRatio;
    var xInset = options.xInsetFactor * width;

    // Background shape is described starting at left center, moving clockwise. It looks like this:
    //
    //    ---------
    //    \        \
    //    /        /
    //    ---------
    //
    var backgroundShape = new Shape()
      .moveTo( xInset, height / 2 )
      .lineTo( 0, 0 )
      .lineTo( width - xInset, 0 )
      .lineTo( width, height / 2 )
      .lineTo( width - xInset, height )
      .lineTo( 0, height )
      .close();

    var backgroundNode = new Path( backgroundShape, {
      fill: functionInstance.fill,
      stroke: functionInstance.stroke,
      lineWidth: functionInstance.lineWidth,
      lineDash: functionInstance.lineDash
    } );
    options.children.push( backgroundNode );

    // If the function has an icon ...
    if ( functionInstance.image ) {
      var wrapperNode = new Node( {
        children: [ new Image( functionInstance.image ) ],
        scale: options.iconScale
      } );
      wrapperNode.center = backgroundNode.center;
      options.children.push( wrapperNode );
    }

    Node.call( this, options );

    this.functionInstance = functionInstance; // @public (read-only)
    this.xInset = xInset; // @public (read-only), for layout
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( Node, FunctionNode );
} );
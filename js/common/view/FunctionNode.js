// Copyright 2002-2015, University of Colorado Boulder

/**
 * Node for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FunctionShape = require( 'FUNCTION_BUILDER/common/view/FunctionShape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( options ) {

    options = _.extend( {

      // FunctionShape
      backgroundWidth: 100, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.5, // {number} aspect ratio, width/height
      xInsetFactor: 0.15, // {number} x-inset of arrow-like ends of the background

      // Path
      fill: 'white', // {Color|string|null}
      stroke: 'black', // {Color|string|null}
      lineWidth: 1,

      // optional icon
      icon: null, // {Node|null}
      xMarginFactor: 0.10, // {number} portion of width that determines the x-margin around the icon
      yMarginFactor: 0.05  // {number} portion of height that determines the y-margin around the icon

    }, options );

    // validate options
    assert && assert( options.lineWidth >= 0 );
    assert && assert( options.xMarginFactor >= 0 );
    assert && assert( options.yMarginFactor >= 0 );

    options.children = [];

    // Background is shaped like a function
    var backgroundShape = new FunctionShape( {
      width: options.backgroundWidth,
      aspectRatio: options.aspectRatio,
      xInsetFactor: options.xInsetFactor
    } );
    var backgroundNode = new Path( backgroundShape, {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );
    options.children.push( backgroundNode );

    // Add optional icon
    if ( options.icon ) {

      // scale down if needed, maintain aspect ratio
      var maxWidth = backgroundNode.width - 2 * ( options.xMarginFactor * backgroundNode.width );
      var maxHeight = backgroundNode.height - 2 * ( options.yMarginFactor * backgroundNode.height );
      assert && assert( maxWidth > 0 && maxHeight > 0 );
      var scale = Math.min( 1, Math.min( maxWidth / options.icon.width, maxHeight / options.icon.height ) );
      options.icon.setScaleMagnitude( scale );

      options.children.push( options.icon );
    }

    Node.call( this, options );

    this.xInset = backgroundShape.xInset; // @public for layout
  }

  return inherit( Node, FunctionNode );
} );
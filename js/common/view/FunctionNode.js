// Copyright 2002-2015, University of Colorado Boulder

/**
 * Node for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
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

      // background
      backgroundWidth: 100, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.5, // {number} aspect ratio, width/height
      xInsetFactor: 0.15, // {number} x-inset of arrow-like ends of the background
      fill: 'white', // {Color|string}
      stroke: 'black', // {Color|string}
      lineWidth: 1,

      // optional icon
      icon: null, // {Node}
      xMarginFactor: 0.10, // {number} x-margin between the icon and left-right ends of background
      yMarginFactor: 0.05  // {number} y-margin between the icon and top/bottom the background

    }, options );
    assert && assert( 2 * options.inset < options.width );

    options.children = [];

    // To improve readability of shape code
    var width = options.backgroundWidth;
    var height = width / options.aspectRatio;
    var xInset = options.xInsetFactor * width;

    // Background shape described starting at left center, moving clockwise. Looks like this:
    //
    //    ---------
    //    \        \
    //    /        /
    //    ---------
    //
    var backgroundNode = new Path( new Shape()
      .moveTo( xInset, height / 2 )
      .lineTo( 0, 0 )
      .lineTo( width - xInset, 0 )
      .lineTo( width, height / 2 )
      .lineTo( width - xInset, height )
      .lineTo( 0, height )
      .close(), {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );
    options.children.push( backgroundNode );

    // Add optional icon
    if ( options.icon ) {

      // scale down if needed, maintain aspect ratio
      var maxWidth = width - 2 * ( options.xMarginFactor * width );
      var maxHeight = height - 2 * ( options.yMarginFactor * height );
      assert && assert( maxWidth > 0 && maxHeight > 0 );
      var scale = Math.min( 1, Math.min( maxWidth / options.icon.width, maxHeight / options.icon.height ) );
      options.icon.setScaleMagnitude( scale );

      options.children.push( options.icon );
    }

    Node.call( this, options );

    this.xInset = xInset; // @public for layout
  }

  return inherit( Node, FunctionNode );
} );
// Copyright 2002-2015, University of Colorado Boulder

/**
 * Shape for functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );

  function FunctionShape( options ) {

    options = _.extend( {
      width: 120, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.5, // {number} aspect ratio, width/height
      xInsetFactor: 0.2 // {number} x-inset of arrow-like ends of the background
    }, options );

    // validate options
    assert && assert( options.width > 0 );
    assert && assert( options.aspectRatio > 0 );
    assert && assert( options.xInsetFactor >= 0 && options.xInsetFactor < 0.5 );

    // To improve readability of shape code
    var width = options.width;
    var height = width / options.aspectRatio;
    var xInset = options.xInsetFactor * width;

    // Shape is described starting at left center, moving clockwise. Looks like this:
    //
    //    ---------
    //    \        \
    //    /        /
    //    ---------
    //
    Shape.call( this );
    this.moveTo( xInset, height / 2 )
      .lineTo( 0, 0 )
      .lineTo( width - xInset, 0 )
      .lineTo( width, height / 2 )
      .lineTo( width - xInset, height )
      .lineTo( 0, height )
      .close();

    this.xInset = xInset; // @public for layout
  }

  return inherit( Shape, FunctionShape );
} );

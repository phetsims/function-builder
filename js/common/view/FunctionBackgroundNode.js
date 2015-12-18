// Copyright 2015, University of Colorado Boulder

/**
 * Background for a function. It looks like this:
 *
 *    ---------
 *    \        \
 *    /        /
 *    ---------
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionBackgroundNode( options ) {

    options = _.extend( {

      // Shape
      backgroundWidth: FBConstants.FUNCTION_WIDTH, // {number} width, height is computed so that aspect ratio remains the same at all sizes
      aspectRatio: 1.8, // {number} aspect ratio, width/height
      xInsetFactor: 0.15, // {number} x-inset of arrow-like ends of the shape

      // Path
      fill: 'white', // {Color|string}
      stroke: 'black', // {Color|string}
      lineWidth: 1, // {number}
      lineDash: null // {number[]}

    }, options );

    // validate options
    assert && assert( options.backgroundWidth > 0 );
    assert && assert( options.aspectRatio > 0 );
    assert && assert( options.xInsetFactor >= 0 && options.xInsetFactor < 0.5 );

    // To improve readability of shape code
    var WIDTH = options.backgroundWidth;
    var HEIGHT = WIDTH / options.aspectRatio;
    var X_INSET = options.xInsetFactor * WIDTH;

    // Described from top-left, moving clockwise.
    var backgroundShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( WIDTH - X_INSET, 0 )
      .lineTo( WIDTH, HEIGHT / 2 )
      .lineTo( WIDTH - X_INSET, HEIGHT )
      .lineTo( 0, HEIGHT )
      .lineTo( X_INSET, HEIGHT / 2 )
      .close();

    Path.call( this, backgroundShape, options );

    this.xInset = X_INSET; // @public (read-only) needed for layout
  }

  functionBuilder.register( 'FunctionBackgroundNode', FunctionBackgroundNode );

  return inherit( Path, FunctionBackgroundNode );
} );

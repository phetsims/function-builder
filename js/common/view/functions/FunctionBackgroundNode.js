// Copyright 2015-2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionBackgroundNode( options ) {

    options = _.extend( {

      // Shape
      size: FBConstants.FUNCTION_SIZE, // {Dimensions2}

      // Path
      fill: 'white', // {Color|string}
      stroke: 'black', // {Color|string}
      lineWidth: 1, // {number}
      lineDash: [] // {number[]}

    }, options );

    // To improve readability of shape code
    const WIDTH = options.size.width;
    const HEIGHT = options.size.height;
    const X_INSET = FBConstants.FUNCTION_X_INSET_FACTOR * WIDTH;

    // Described from top-left, moving clockwise.
    const backgroundShape = new Shape()
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

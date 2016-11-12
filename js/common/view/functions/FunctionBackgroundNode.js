// Copyright 2015-2016, University of Colorado Boulder

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
      size: FBConstants.FUNCTION_SIZE, // {Dimensions2}

      // Path
      fill: 'white', // {Color|string}
      stroke: 'black', // {Color|string}
      lineWidth: 1, // {number}
      lineDash: [] // {number[]}

    }, options );

    // To improve readability of shape code
    var WIDTH = options.size.width;
    var HEIGHT = options.size.height;
    var X_INSET = FBConstants.FUNCTION_X_INSET_FACTOR * WIDTH;

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

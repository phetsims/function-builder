// Copyright 2015-2022, University of Colorado Boulder

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

import { Shape } from '../../../../../kite/js/imports.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Path } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';

export default class FunctionBackgroundNode extends Path {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

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

    super( backgroundShape, options );

    this.xInset = X_INSET; // @public (read-only) needed for layout
  }
}

functionBuilder.register( 'FunctionBackgroundNode', FunctionBackgroundNode );
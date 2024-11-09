// Copyright 2015-2024, University of Colorado Boulder

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

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../../phet-core/js/types/PickOptional.js';
import { Path, PathOptions } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';

type SelfOptions = {
  size?: Dimension2;
};

export type FunctionBackgroundNodeOptions = SelfOptions &
  PickOptional<PathOptions, 'fill' | 'stroke' | 'lineWidth' | 'lineDash' | 'scale'>;

export default class FunctionBackgroundNode extends Path {

  public readonly xInset: number; // needed for layout

  public constructor( providedOptions?: FunctionBackgroundNodeOptions ) {

    const options = optionize<FunctionBackgroundNodeOptions, SelfOptions, PathOptions>()( {

      // SelfOptions
      size: FBConstants.FUNCTION_SIZE,

      // PathOptions
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: []
    }, providedOptions );

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

    this.xInset = X_INSET;
  }
}

functionBuilder.register( 'FunctionBackgroundNode', FunctionBackgroundNode );
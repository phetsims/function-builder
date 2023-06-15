// Copyright 2015-2023, University of Colorado Boulder

/**
 * The identity function, creates an output that is identical to the input.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Rectangle } from '../../../../../scenery/js/imports.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

export default class Identity extends ImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.name = 'Identity';
    options.fill = 'rgb( 255, 246, 146 )';

    // The identify function has no visible icon. See https://github.com/phetsims/function-builder/issues/91
    // This decision was made late in development, and it was easier to use an invisible Rectangle than to
    // make the icon optional in the myriad places where it is currently required.
    const iconNode = new Rectangle( 0, 0, 1, 1 );

    super( iconNode, options );
  }

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  applyFunction( inputCanvas ) {

    // copy the input canvas to the output canvas
    return FBCanvasUtils.createCanvasWithImage( inputCanvas );
  }
}

functionBuilder.register( 'Identity', Identity );
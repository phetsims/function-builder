// Copyright 2016-2023, University of Colorado Boulder

/**
 * Abstract base type for 'mystery' image functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { RichText } from '../../../../../scenery/js/imports.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';

export default class MysteryImageFunction extends ImageFunction {

  /**
   * @param {TReadOnlyProperty.<string>} mysteryStringProperty - string that may contain subscripts and superscripts
   * @param {Object} [options]
   */
  constructor( mysteryStringProperty, options ) {

    const iconNode = new RichText( mysteryStringProperty, {
      subScale: 0.4, // subscript scale
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.35 * FBConstants.FUNCTION_SIZE.width
    } );

    super( iconNode, options );
  }
}

functionBuilder.register( 'MysteryImageFunction', MysteryImageFunction );
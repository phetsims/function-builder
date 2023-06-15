// Copyright 2016-2023, University of Colorado Boulder

/**
 * Abstract base type for 'mystery' image functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { RichText } from '../../../../../scenery/js/imports.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
export type MysteryImageFunctionOptions = SelfOptions & ImageFunctionOptions;

export default abstract class MysteryImageFunction extends ImageFunction {

  /**
   * @param mysteryStringProperty - string that may contain subscripts and superscripts
   * @param [providedOptions]
   */
  protected constructor( mysteryStringProperty: TReadOnlyProperty<string>, providedOptions?: MysteryImageFunctionOptions ) {

    const iconNode = new RichText( mysteryStringProperty, {
      subScale: 0.4, // subscript scale
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.35 * FBConstants.FUNCTION_SIZE.width
    } );

    super( iconNode, providedOptions );
  }
}

functionBuilder.register( 'MysteryImageFunction', MysteryImageFunction );
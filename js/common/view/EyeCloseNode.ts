// Copyright 2016-2024, University of Colorado Boulder

/**
 * Node that displays the fontawesome 'eye_close' icon.
 * Wrapper around Font Awesome to guard against changes that were made in
 * https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { NodeTranslationOptions, Path, PathOptions } from '../../../../scenery/js/imports.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import functionBuilder from '../../functionBuilder.js';

type SelfOptions = EmptySelfOptions;

type EyeCloseNodeOptions = SelfOptions & NodeTranslationOptions & PickOptional<PathOptions, 'maxHeight'>;

export default class EyeCloseNode extends Path {

  public constructor( providedOptions?: EyeCloseNodeOptions ) {
    const options = optionize<EyeCloseNodeOptions, SelfOptions, PathOptions>()( {

      // PathOptions
      fill: 'black'
    }, providedOptions );
    super( eyeSlashSolidShape, options );
  }
}

functionBuilder.register( 'EyeCloseNode', EyeCloseNode );
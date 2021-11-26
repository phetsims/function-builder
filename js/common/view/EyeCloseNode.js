// Copyright 2016-2021, University of Colorado Boulder

/**
 * Node that displays the fontawesome 'eye_close' icon.
 * Wrapper around Font Awesome to guard against changes that were made in
 * https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Path } from '../../../../scenery/js/imports.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import functionBuilder from '../../functionBuilder.js';

class EyeCloseNode extends Path {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    options = merge( {
      fill: 'black'
    }, options );
    super( eyeSlashSolidShape, options );
  }
}

functionBuilder.register( 'EyeCloseNode', EyeCloseNode );

export default EyeCloseNode;
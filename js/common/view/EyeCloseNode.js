// Copyright 2016-2020, University of Colorado Boulder

/**
 * Node that displays the fontawesome 'eye_close' icon.
 * Wrapper around FontAwesomeNode to guard against changes that were made in
 * https://github.com/phetsims/function-builder/issues/102
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import functionBuilder from '../../functionBuilder.js';

class EyeCloseNode extends FontAwesomeNode {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( 'eye_close', options );
  }
}

functionBuilder.register( 'EyeCloseNode', EyeCloseNode );

export default EyeCloseNode;
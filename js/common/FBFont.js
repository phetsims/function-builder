// Copyright 2015-2020, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 * Allows us to quickly change font properties for the entire simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import functionBuilder from '../functionBuilder.js';

class FBFont extends PhetFont {

  /**
   * @param {number|*} options font size or font options
   */
  constructor( options ) {

    // convenience for specifying font size only, e.g. new FBFont(24)
    if ( typeof options === 'number' ) {
      options = { size: options };
    }

    // font attributes, as specified in the design document
    options = merge( {
      family: 'Arial'
    }, options );

    super( options );
  }
}

functionBuilder.register( 'FBFont', FBFont );

export default FBFont;
// Copyright 2015-2019, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 * Allows us to quickly change font properties for the entire simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import functionBuilder from '../functionBuilder.js';

/**
 * @param {number|*} options font size or font options
 * @constructor
 */
function FBFont( options ) {

  // convenience for specifying font size only, e.g. new FBFont(24)
  if ( typeof options === 'number' ) {
    options = { size: options };
  }

  // font attributes, as specified in the design document
  options = merge( {
    family: 'Arial'
  }, options );

  PhetFont.call( this, options );
}

functionBuilder.register( 'FBFont', FBFont );

inherit( PhetFont, FBFont );
export default FBFont;
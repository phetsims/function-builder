// Copyright 2015-2021, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import functionBuilder from '../functionBuilder.js';

const FBQueryParameters = QueryStringMachine.getAll( {

  // Adds the 'Test' screen.
  // For internal use only.
  testScreen: { type: 'flag' },

  // Populates the output carousel with 1 card of each type.
  // For internal use only.
  populateOutput: { type: 'flag' },

  // Puts a red stroke around containers in the carousels, so that empty containers are visible.
  // For internal use only.
  showContainers: { type: 'flag' },

  // Plays all Mystery challenges, in order.
  // For internal use only.
  playAll: { type: 'flag' },

  // Shows all colors, in order that they appear in pool, for Mystery challenges.
  // For internal use only.
  showAllColors: { type: 'flag' }
} );

functionBuilder.register( 'FBQueryParameters', FBQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.functionBuilder.FBQueryParameters' );

export default FBQueryParameters;
// Copyright 2016, University of Colorado Boulder

/**
 * Shows and hides icons on functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSwitch = require( 'SUN/ABSwitch' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Property.<boolean>} functionIconsVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function FunctionIconsSwitch( functionIconsVisibleProperty, options ) {
    ABSwitch.call( this, functionIconsVisibleProperty,
      true, new FontAwesomeNode( 'eye_open' ),
      false, new FontAwesomeNode( 'eye_close' ),
      options );
  }

  return inherit( ABSwitch, FunctionIconsSwitch );
} );

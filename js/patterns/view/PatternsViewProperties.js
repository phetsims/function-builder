// Copyright 2002-2015, University of Colorado Boulder

/**
 * View-specific properties for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function PatternsViewProperties() {
    PropertySet.call( this, {
      sceneName: 'single' // {string} name of the scene that is visible, 'single'|'dual'|'composed'
    } );
  }

  return inherit( PropertySet, PatternsViewProperties );
} );
// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function EquationsModel() {
    PropertySet.call( this, {} );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( PropertySet, EquationsModel );
} );
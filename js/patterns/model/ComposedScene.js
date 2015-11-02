// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'composed' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ComposedScene() {

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 3
    } );
  }

  return inherit( Object, ComposedScene, {

    // @public
    reset: function() {
      this.builder.reset();
    }
  } );
} );

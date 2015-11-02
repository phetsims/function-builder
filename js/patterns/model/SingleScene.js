// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var inherit = require( 'PHET_CORE/inherit' );

  function SingleScene() {

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 1
    } );
  }

  return inherit( Object, SingleScene, {

    // @public
    reset: function() {
      this.builder.reset();
    }
  } );
} );

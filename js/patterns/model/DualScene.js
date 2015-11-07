// Copyright 2015, University of Colorado Boulder

/**
 * The 'dual' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var inherit = require( 'PHET_CORE/inherit' );

  function DualScene() {

    // @public
    this.builder1 = new Builder( {
      numberOfFunctions: 1
    } );
    this.builder2 = new Builder( {
      numberOfFunctions: 1
    } );
  }

  return inherit( Object, DualScene, {

    // @public
    reset: function() {
      this.builder1.reset();
      this.builder2.reset();
    }
  } );
} );

// Copyright 2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function SingleScene() {

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 1
    } );
  }

  functionBuilder.register( 'SingleScene', SingleScene );

  return inherit( Object, SingleScene, {

    // @public
    reset: function() {
      this.builder.reset();
    }
  } );
} );

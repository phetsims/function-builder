// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ComposedScene = require( 'FUNCTION_BUILDER/patterns/model/ComposedScene' );
  var DualScene = require( 'FUNCTION_BUILDER/patterns/model/DualScene' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SingleScene = require( 'FUNCTION_BUILDER/patterns/model/SingleScene' );

  /**
   * @constructor
   */
  function PatternsModel() {

    this.singleScene = new SingleScene();
    this.dualScene = new DualScene();
    this.composedScene = new ComposedScene();
  }

  return inherit( Object, PatternsModel, {

    // @public
    reset: function() {
      this.singleScene.reset();
      this.dualScene.reset();
      this.composedScene.reset();
    },

    // @public
    step: function( dt ) {
      //TODO
    }
  } );
} );
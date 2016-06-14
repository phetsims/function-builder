// Copyright 2016, University of Colorado Boulder

/**
 * Base type 'model container' for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Scene[]} scenes
   * @constructor
   */
  function FBModel( scenes ) {

    // @public (read-only)
    this.scenes = scenes;

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );
  }

  functionBuilder.register( 'FBModel', FBModel );

  return inherit( Object, FBModel, {

    // @public
    reset: function() {
      this.selectedSceneProperty.reset();
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].reset();
      }
    },

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].step( dt );
      }
    }
  } );
} );
// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base type 'model container' for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Property = require( 'AXON/Property' );

  /**
   * @param {Scene[]} scenes
   * @param {Object} [options]
   * @constructor
   */
  function FBModel( scenes, options ) {

    options = merge( {
      defaultScene: scenes[ 0 ]
    }, options );
    assert && assert( scenes.indexOf( options.defaultScene ) !== -1 );

    // @public (read-only)
    this.scenes = scenes;

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( options.defaultScene );
  }

  functionBuilder.register( 'FBModel', FBModel );

  return inherit( Object, FBModel, {

    // @public
    reset: function() {
      this.selectedSceneProperty.reset();
      for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
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
      for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].step( dt );
      }
    }
  } );
} );
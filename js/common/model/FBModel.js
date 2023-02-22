// Copyright 2016-2020, University of Colorado Boulder

/**
 * Base class 'model container' for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import functionBuilder from '../../functionBuilder.js';

export default class FBModel {

  /**
   * @param {Scene[]} scenes
   * @param {Object} [options]
   */
  constructor( scenes, options ) {

    options = merge( {
      defaultScene: scenes[ 0 ]
    }, options );
    assert && assert( scenes.indexOf( options.defaultScene ) !== -1 );

    // @public (read-only)
    this.scenes = scenes;

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( options.defaultScene );
  }

  // @public
  reset() {
    this.selectedSceneProperty.reset();
    for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
      this.scenes[ sceneIndex ].reset();
    }
  }

  /**
   * Animates the model.
   *
   * @param {number} dt - time since the previous step, in seconds
   * @public
   */
  step( dt ) {
    for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
      this.scenes[ sceneIndex ].step( dt );
    }
  }
}

functionBuilder.register( 'FBModel', FBModel );
// Copyright 2016-2023, University of Colorado Boulder

/**
 * FBModel is the base class 'model container' for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import functionBuilder from '../../functionBuilder.js';
import TModel from '../../../../joist/js/TModel.js';
import FBScene from './FBScene.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = {
  defaultScene?: FBScene;
};

export type FBModelOptions = SelfOptions;

export default class FBModel implements TModel {

  public readonly scenes: FBScene[];
  public readonly selectedSceneProperty: Property<FBScene>; // the selected scene

  protected constructor( scenes: FBScene[], providedOptions?: FBModelOptions ) {

    const options = optionize<FBModelOptions, SelfOptions>()( {

      // SelfOptions
      defaultScene: scenes[ 0 ]
    }, providedOptions );
    assert && assert( scenes.includes( options.defaultScene ) );

    this.scenes = scenes;
    this.selectedSceneProperty = new Property( options.defaultScene );
  }

  public reset(): void {
    this.selectedSceneProperty.reset();
    for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
      this.scenes[ sceneIndex ].reset();
    }
  }

  /**
   * Animates the model.
   * @param dt - time since the previous step, in seconds
   */
  public step( dt: number ): void {
    for ( let sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
      this.scenes[ sceneIndex ].step( dt );
    }
  }
}

functionBuilder.register( 'FBModel', FBModel );
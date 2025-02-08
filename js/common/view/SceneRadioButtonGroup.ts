// Copyright 2015-2025, University of Colorado Boulder

/**
 * Control for selecting a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import functionBuilder from '../../functionBuilder.js';
import FBScene from '../model/FBScene.js';

type SelfOptions = EmptySelfOptions;

type SceneRadioButtonGroupOptions = SelfOptions & NodeTranslationOptions;

export default class SceneRadioButtonGroup extends RectangularRadioButtonGroup<FBScene> {

  public constructor( selectedSceneProperty: Property<FBScene>, scenes: FBScene[], providedOptions?: SceneRadioButtonGroupOptions ) {

    const options = optionize<SceneRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'horizontal',
      spacing: 20,
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 10,
        yMargin: 16,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      }
    }, providedOptions );

    // touchArea optimized for spacing
    options.touchAreaXDilation = ( options.spacing / 2 ) - 1;
    options.touchAreaYDilation = 5;

    const content: RectangularRadioButtonGroupItem<FBScene>[] = scenes.map( scene => {
      assert && assert( scene.iconNode, 'expected iconNode for scene' );
      return {
        value: scene,
        createNode: () => scene.iconNode
      };
    } );

    super( selectedSceneProperty, content, options );
  }
}

functionBuilder.register( 'SceneRadioButtonGroup', SceneRadioButtonGroup );
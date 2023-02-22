// Copyright 2015-2023, University of Colorado Boulder

/**
 * Control for selecting a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import functionBuilder from '../../functionBuilder.js';

export default class SceneRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {Property.<Scene>} selectedSceneProperty
   * @param {Scene[]} scenes
   * @param {Object} [options]
   */
  constructor( selectedSceneProperty, scenes, options ) {

    options = merge( {
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
    }, options );

    // touchArea optimized for spacing
    options.touchAreaXDilation = ( options.spacing / 2 ) - 1;
    options.touchAreaYDilation = 5;

    const content = [];
    scenes.forEach( scene => {
      assert && assert( scene.iconNode, 'expected iconNode for scene' );
      content.push( {
        value: scene,
        createNode: () => scene.iconNode
      } );
    } );

    super( selectedSceneProperty, content, options );
  }
}

functionBuilder.register( 'SceneRadioButtonGroup', SceneRadioButtonGroup );
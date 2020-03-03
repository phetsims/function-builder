// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control for selecting a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import functionBuilder from '../../functionBuilder.js';

class SceneControl extends RadioButtonGroup {

  /**
   * @param {Property.<Scene>} selectedSceneProperty
   * @param {Scene[]} scenes
   * @param {Object} [options]
   */
  constructor( selectedSceneProperty, scenes, options ) {

    options = merge( {
      orientation: 'horizontal',
      spacing: 20,
      baseColor: 'white',
      selectedLineWidth: 2,
      buttonContentXMargin: 10,
      buttonContentYMargin: 16
    }, options );

    // touchArea optimized for spacing
    options.touchAreaXDilation = ( options.spacing / 2 ) - 1;
    options.touchAreaYDilation = 5;

    const content = [];
    scenes.forEach( scene => {
      assert && assert( scene.iconNode, 'expected iconNode for scene' );
      content.push( {
        value: scene,
        node: scene.iconNode
      } );
    } );

    super( selectedSceneProperty, content, options );
  }
}

functionBuilder.register( 'SceneControl', SceneControl );

export default SceneControl;
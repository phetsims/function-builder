// Copyright 2016-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import MysterySceneNode from './MysterySceneNode.js';

export default class MysteryScreenView extends FBScreenView {

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      sceneRadioButtonGroupYOffset: 535 // offset of SceneRadioButtonGroup from top of screen
    }, options );

    super( model, MysterySceneNode, options );
  }
}

functionBuilder.register( 'MysteryScreenView', MysteryScreenView );
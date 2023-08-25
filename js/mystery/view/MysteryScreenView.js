// Copyright 2016-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import MysteryModel from '../model/MysteryModel.js';
import MysterySceneNode from './MysterySceneNode.js';

export default class MysteryScreenView extends FBScreenView {

  /**
   * @param {MysteryModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    assert && assert( model instanceof MysteryModel );
    assert && assert( tandem instanceof Tandem );
    super( model, MysterySceneNode, {
      sceneRadioButtonGroupYOffset: 535, // offset of SceneRadioButtonGroup from top of screen
      tandem: tandem
    } );
  }
}

functionBuilder.register( 'MysteryScreenView', MysteryScreenView );
// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import FBScreenView from '../../common/view/FBScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsModel from '../model/EquationsModel.js';
import EquationsSceneNode from './EquationsSceneNode.js';

export default class EquationsScreenView extends FBScreenView {

  public constructor( model: EquationsModel, tandem: Tandem ) {
    super( model, EquationsSceneNode, {
      tandem: tandem
    } );
  }
}

functionBuilder.register( 'EquationsScreenView', EquationsScreenView );
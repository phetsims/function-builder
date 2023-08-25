// Copyright 2015-2023, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsScene from './EquationsScene.js';

export default class EquationsModel extends FBModel {

  public constructor() {
    super( [ new EquationsScene() ] );
  }
}

functionBuilder.register( 'EquationsModel', EquationsModel );
// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import EquationsScene from './EquationsScene.js';

export default class EquationsModel extends FBModel {

  constructor() {
    super( [ new EquationsScene() ] );
  }
}

functionBuilder.register( 'EquationsModel', EquationsModel );
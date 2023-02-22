// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersScene from './NumbersScene.js';

export default class NumbersModel extends FBModel {

  constructor() {
    super( [ new NumbersScene() ] );
  }
}

functionBuilder.register( 'NumbersModel', NumbersModel );
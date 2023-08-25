// Copyright 2015-2023, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersScene from './NumbersScene.js';

export default class NumbersModel extends FBModel {

  public constructor() {
    super( [ new NumbersScene() ] );
  }
}

functionBuilder.register( 'NumbersModel', NumbersModel );
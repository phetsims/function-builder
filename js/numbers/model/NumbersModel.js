// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FBModel from '../../common/model/FBModel.js';
import functionBuilder from '../../functionBuilder.js';
import NumbersScene from './NumbersScene.js';

/**
 * @constructor
 */
function NumbersModel() {
  FBModel.call( this, [ new NumbersScene() ] );
}

functionBuilder.register( 'NumbersModel', NumbersModel );

inherit( FBModel, NumbersModel );
export default NumbersModel;